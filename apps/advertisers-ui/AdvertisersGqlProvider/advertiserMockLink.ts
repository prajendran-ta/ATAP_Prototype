import { ApolloLink, Observable } from '@apollo/client'
import type { FetchResult, Operation } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import type { FieldNode, OperationDefinitionNode, SelectionNode } from 'graphql'
import { LONDONER } from '@mediahub/mediahub-ui/shared/londonerHotel'
import { DEMO_ADVERTISERS } from '@mediahub/mediahub-ui/shared/demoAdvertisers'
import { isDemoFollowed, setDemoFollowed } from '@mediahub/mediahub-ui/shared/londonerFollowStore'

/**
 * Prototype-only mock layer for the Advertisers GraphQL client.
 *
 * The Advertisers list / details / option lookups read from a live backend, so demo advertisers
 * (The Londoner Hotel + the 10 in demoAdvertisers.ts) that only exist in the mock data would never
 * appear. This link sits in front of the real HTTP link and:
 *  - adds the demo advertisers to advertiser LIST and OPTION results, respecting the filter the UI
 *    sent (ids / name search / status / following-only / followed-by / advertiser type). The
 *    Londoner always comes first, then the other demo advertisers, then the backend rows,
 *  - NEVER duplicates: if the backend already returns an advertiser with the same BPID, its real
 *    record is kept (and its follow flag is overridden from the demo follow store, so every
 *    "My ..." scope agrees). Real records seen in any response are remembered by BPID so a demo
 *    advertiser injected later reuses its REAL id,
 *  - answers by-id lookups of a demo advertiser (synthetic id) from the mock (no network),
 *  - answers Follow / Unfollow for demo advertisers from the persisted follow store,
 *  - falls back to demo-only data if the backend call fails (offline demo).
 * Everything else is forwarded untouched. Set ENABLE_ADVERTISER_MOCK to false to switch it off.
 */
export const ENABLE_ADVERTISER_MOCK = true

interface DemoRecord {
  bpid: string
  advertiserId: string
  name: string
}

/** The Londoner first (pinned to the top), then the 10 other demo advertisers. */
const DEMO_RECORDS: DemoRecord[] = [
  { bpid: LONDONER.bpid, advertiserId: String(LONDONER.advertiserId), name: LONDONER.name },
  ...DEMO_ADVERTISERS.map(a => ({ bpid: a.bpid, advertiserId: String(a.advertiserId), name: a.name })),
]

// Real backend records seen so far, by BPID (so an injected demo row reuses the REAL id when known).
const realByBpid = new Map<string, Record<string, any>>()

const recordFor = (demo: DemoRecord): Record<string, unknown> => {
  const real = realByBpid.get(demo.bpid)
  const following = isDemoFollowed(demo.bpid)
  return {
    __typename: 'Advertiser',
    advertiserId: real?.advertiserId ?? demo.advertiserId,
    advertiserName: real?.advertiserName ?? demo.name,
    bpid: demo.bpid,
    status: real?.status ?? LONDONER.status,
    advertiserTypes: real?.advertiserTypes ?? LONDONER.advertiserTypes,
    followedBy: following ? 'You' : '',
    isFollowing: following,
  }
}

type AdvertiserFilterVars = {
  ids?: Array<number | string> | null
  name?: string | null
  status?: string[] | null
  advertiserTypes?: string | null
  isFollowingOnly?: boolean | null
  followedBy?: Array<number | string> | null
  paging?: { limit?: number; offset?: number } | null
}

/** Whether a demo advertiser should be part of the result for the filter the UI sent. */
const matchesFilter = (demo: DemoRecord, filter: AdvertiserFilterVars | undefined): boolean => {
  if (!filter) return true
  const row = recordFor(demo)
  if (filter.advertiserTypes && filter.advertiserTypes !== LONDONER.advertiserTypes) return false
  if (filter.ids?.length && !filter.ids.map(String).includes(String(row.advertiserId))) return false
  if (filter.status?.length && !filter.status.includes(String(row.status))) return false
  if (filter.followedBy?.length) return false
  if (filter.isFollowingOnly && !row.isFollowing) return false
  const search = filter.name?.trim().toLowerCase()
  if (search && !`${row.advertiserName} ${demo.bpid}`.toLowerCase().includes(search)) return false
  // Paged lists: only the first page carries the injected rows.
  if (filter.paging && (filter.paging.offset ?? 0) > 0) return false
  return true
}

const findField = (selections: readonly SelectionNode[] | undefined, name: string): FieldNode | undefined =>
  selections?.find((s): s is FieldNode => s.kind === 'Field' && s.name.value === name)

/** Cut a full record down to exactly the fields the query selects (so Apollo has no missing fields). */
const pickSelected = (field: FieldNode | undefined, source: Record<string, unknown>): Record<string, unknown> => {
  if (!field?.selectionSet) return source
  const out: Record<string, unknown> = {}
  field.selectionSet.selections.forEach(selection => {
    if (selection.kind !== 'Field') return
    const key = selection.alias?.value ?? selection.name.value
    out[key] = source[selection.name.value]
  })
  if (!('__typename' in out)) out.__typename = source.__typename
  return out
}

/** The `advertisers` root field of the operation (where the list/totals live). */
const advertisersField = (operation: Operation): FieldNode | undefined => {
  const def = getMainDefinition(operation.query) as OperationDefinitionNode
  return findField(def.selectionSet.selections, 'advertisers')
}

const demoRows = (operation: Operation, filter: AdvertiserFilterVars | undefined, skipBpids = new Set<string>()) => {
  const listField = findField(advertisersField(operation)?.selectionSet?.selections, 'advertisers')
  return DEMO_RECORDS.filter(d => !skipBpids.has(d.bpid) && matchesFilter(d, filter)).map(d =>
    pickSelected(listField, recordFor(d)),
  )
}

/** Demo-only result (by-id lookups of a synthetic id, or the backend is unavailable). */
const buildDemoOnlyResult = (operation: Operation, filter: AdvertiserFilterVars | undefined): FetchResult => {
  const root = advertisersField(operation)
  const rows = demoRows(operation, filter)
  const advertisers: Record<string, unknown> = { __typename: 'Advertisers' }
  if (findField(root?.selectionSet?.selections, 'advertisers')) advertisers.advertisers = rows
  if (findField(root?.selectionSet?.selections, 'totalCount')) advertisers.totalCount = rows.length
  const toggleField = findField(root?.selectionSet?.selections, 'toggle')
  if (toggleField) {
    advertisers.toggle = pickSelected(toggleField, {
      __typename: 'TotalToggle',
      totalAdvertisers: DEMO_RECORDS.length,
      totalFollowing: DEMO_RECORDS.filter(d => isDemoFollowed(d.bpid)).length,
    })
  }
  return { data: { advertisers } }
}

/** Merge the demo advertisers into a real backend result. */
const injectIntoResult = (operation: Operation, result: FetchResult): FetchResult => {
  const data = result.data as { advertisers?: Record<string, any> } | null | undefined
  const root = data?.advertisers
  if (!root) return result

  const filter = operation.variables?.filter as AdvertiserFilterVars | undefined
  const listField = findField(advertisersField(operation)?.selectionSet?.selections, 'advertisers')
  const existing: Array<Record<string, any>> = Array.isArray(root.advertisers) ? root.advertisers : []

  // Remember the real records, then see which demo advertisers the backend already returned.
  existing.forEach(row => {
    if (row?.bpid) realByBpid.set(String(row.bpid), { ...realByBpid.get(String(row.bpid)), ...row })
  })
  const presentBpids = new Set(existing.map(row => String(row?.bpid)))
  const demoBpids = new Set(DEMO_RECORDS.map(d => d.bpid))

  let followingDelta = 0
  // Backend-owned demo advertisers: keep the real record (id, name) but use the demo follow state.
  const patched = existing.map(row => {
    if (!row || !demoBpids.has(String(row.bpid))) return row
    const following = isDemoFollowed(String(row.bpid))
    if (typeof row.isFollowing === 'boolean' && row.isFollowing !== following) followingDelta += following ? 1 : -1
    return {
      ...row,
      ...('isFollowing' in row ? { isFollowing: following } : {}),
      ...('followedBy' in row ? { followedBy: following ? 'You' : '' } : {}),
    }
  })

  const injected = listField ? demoRows(operation, filter, presentBpids) : []

  const next: Record<string, any> = { ...root }
  if (listField) {
    // Demo advertisers go FIRST on page 1 (Londoner, then the others); unpaged option lookups
    // (Media Planner, Audience...) get them at the END so index-based pickers keep resolving to
    // the same real advertisers.
    next.advertisers = filter?.paging ? [...injected, ...patched] : [...patched, ...injected]
    if (typeof root.totalCount === 'number') next.totalCount = root.totalCount + injected.length
  }
  if (root.toggle) {
    // Count the demo advertisers the backend didn't already return (approximation is fine here).
    const missing = DEMO_RECORDS.filter(d => !presentBpids.has(d.bpid))
    next.toggle = {
      ...root.toggle,
      totalAdvertisers: (root.toggle.totalAdvertisers ?? 0) + missing.length,
      totalFollowing:
        (root.toggle.totalFollowing ?? 0) + missing.filter(d => isDemoFollowed(d.bpid)).length + followingDelta,
    }
  }
  return { ...result, data: { ...data, advertisers: next } }
}

const entityResponse = (operation: Operation, name: 'followAdvertiser' | 'unfollowAdvertiser'): FetchResult => {
  const def = getMainDefinition(operation.query) as OperationDefinitionNode
  const field = findField(def.selectionSet.selections, name)
  return {
    data: {
      [name]: pickSelected(field, {
        __typename: 'EntityResponse',
        success: true,
        message: name === 'followAdvertiser' ? 'Advertiser followed successfully.' : 'Advertiser unfollowed successfully.',
      }),
    },
  }
}

const LIST_OPERATIONS = new Set(['GetAdvertisers', 'GetAdvertiserOptions'])

/** BPID of the demo advertiser an id refers to: the synthetic id, or a real id seen in the backend. */
const demoBpidForId = (id: string): string | undefined => {
  const synthetic = DEMO_RECORDS.find(d => d.advertiserId === id)
  if (synthetic) return synthetic.bpid
  for (const [bpid, real] of realByBpid) {
    if (String(real.advertiserId) === id && DEMO_RECORDS.some(d => d.bpid === bpid)) return bpid
  }
  return undefined
}

export const advertiserMockLink = new ApolloLink((operation, forward) => {
  if (!ENABLE_ADVERTISER_MOCK) return forward(operation)
  const name = operation.operationName

  // By-id lookup of a demo advertiser by its SYNTHETIC id (details page, breadcrumbs): answer
  // locally. (A backend-owned demo advertiser has its real id and is served by the backend.)
  if (name === 'GetAdvertiserById') {
    const filter = operation.variables?.filter as AdvertiserFilterVars | undefined
    const wanted = (filter?.ids ?? []).map(String)
    if (wanted.length && wanted.every(id => DEMO_RECORDS.some(d => d.advertiserId === id))) {
      return new Observable<FetchResult>(observer => {
        const root = advertisersField(operation)
        const listField = findField(root?.selectionSet?.selections, 'advertisers')
        const rows = DEMO_RECORDS.filter(d => wanted.includes(d.advertiserId)).map(d => pickSelected(listField, recordFor(d)))
        observer.next({ data: { advertisers: { __typename: 'Advertisers', advertisers: rows } } })
        observer.complete()
      })
    }
    return forward(operation)
  }

  // Follow / Unfollow: handle demo advertisers locally (persisted), forward any other ids.
  if (name === 'FollowAdvertiser' || name === 'UnfollowAdvertiser') {
    const ids: string[] = (operation.variables?.input?.advertiserId ?? []).map(String)
    const demoIds = ids.filter(id => demoBpidForId(id))
    if (demoIds.length === 0) return forward(operation)
    demoIds.forEach(id => setDemoFollowed(demoBpidForId(id)!, name === 'FollowAdvertiser'))
    const others = ids.filter(id => !demoIds.includes(id))
    const field = name === 'FollowAdvertiser' ? 'followAdvertiser' : 'unfollowAdvertiser'
    if (others.length === 0) {
      return new Observable<FetchResult>(observer => {
        observer.next(entityResponse(operation, field))
        observer.complete()
      })
    }
    operation.variables = { ...operation.variables, input: { ...operation.variables.input, advertiserId: others } }
    return forward(operation)
  }

  if (!LIST_OPERATIONS.has(name)) return forward(operation)

  const filter = operation.variables?.filter as AdvertiserFilterVars | undefined

  return new Observable<FetchResult>(observer => {
    let handled = false
    const fallback = () => {
      if (handled) return
      handled = true
      // Backend unavailable: still show the demo advertisers (the ones the filter would include).
      observer.next(buildDemoOnlyResult(operation, filter))
      observer.complete()
    }
    const sub = forward(operation).subscribe({
      next: result => {
        if (!result.data?.advertisers) return fallback()
        handled = true
        observer.next(injectIntoResult(operation, result))
      },
      error: fallback,
      complete: () => {
        if (!handled) return fallback()
        observer.complete()
      },
    })
    return () => sub.unsubscribe()
  })
})
