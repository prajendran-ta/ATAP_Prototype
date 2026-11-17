/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Apollo link that serves The Londoner Hotel + the 10 demo advertisers' OBA data ("mock plans").
 *
 *  - Londoner-specific operations (single plan / group plan / group & campaign lookups for a Londoner
 *    plan, and every mutation on a Londoner plan) are answered ENTIRELY from the mock (no network).
 *  - LIST / lookup operations (advertiserPlans, advertiserPlanNames, advertiserNames, currencies and
 *    campaignNames without an advertiser scope) are FORWARDED to the real backend and the Londoner
 *    record(s) are appended. If the network call fails (offline) only the Londoner data is returned.
 *  - Everything else passes through untouched.
 *
 * Results are produced by projecting full fixture entities onto each query's selection set, so the
 * response always matches the selection exactly (no "missing field" cache warnings).
 */
import { isDemoFollowed } from '@mediahub/mediahub-ui/shared/londonerFollowStore'
import { ApolloLink, Observable } from '@apollo/client'
import type { FetchResult, Operation } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { Kind, valueFromASTUntyped } from 'graphql'
import type { FieldNode, FragmentDefinitionNode, OperationDefinitionNode, SelectionSetNode } from 'graphql'
import {
  MOCK_CURRENCIES,
  advertiserNameEntities,
  applyCampaignPause,
  applyGroupUpdate,
  applyPlanPause,
  applyPlanUpdate,
  campaignNameEntities,
  findGroup,
  getPlan,
  getPlans,
  groupNameEntities,
  groupPlanEntity,
  isMockAdvertiserId,
  isMockPlanId,
  planEntity,
  planLiteEntity,
  planNameEntities,
} from './londonerObaMock'

/** Set to false to disable the Londoner OBA mock entirely (all operations hit the backend). */
export const ENABLE_OBA_MOCK = true

const MOCK_LATENCY_MS = 150

// ---------------------------------------------------------------------------------------------
// Selection-set projection
// ---------------------------------------------------------------------------------------------
interface ProjectionContext {
  fragments: Record<string, FragmentDefinitionNode>
  variables: Record<string, any>
}

const isPlainObject = (v: unknown): v is Record<string, any> => !!v && typeof v === 'object' && !Array.isArray(v)

const mergeValues = (a: any, b: any): any => {
  if (a === undefined) return b
  if (isPlainObject(a) && isPlainObject(b)) {
    const out: Record<string, any> = { ...a }
    Object.keys(b).forEach(k => {
      out[k] = mergeValues(a[k], b[k])
    })
    return out
  }
  if (Array.isArray(a) && Array.isArray(b)) return b.map((item, i) => mergeValues(a[i], item))
  return b
}

const fieldArgs = (field: FieldNode, ctx: ProjectionContext): Record<string, any> => {
  const args: Record<string, any> = {}
  field.arguments?.forEach(arg => {
    args[arg.name.value] = valueFromASTUntyped(arg.value, ctx.variables)
  })
  return args
}

const collect = (src: Record<string, any>, selectionSet: SelectionSetNode, ctx: ProjectionContext, out: any) => {
  selectionSet.selections.forEach(selection => {
    if (selection.kind === Kind.FIELD) {
      const key = selection.alias?.value ?? selection.name.value
      let value = src[selection.name.value]
      if (typeof value === 'function') value = value(fieldArgs(selection, ctx))
      const projected = selection.selectionSet ? project(value, selection.selectionSet, ctx) : (value ?? null)
      out[key] = mergeValues(out[key], projected)
    } else if (selection.kind === Kind.FRAGMENT_SPREAD) {
      const fragment = ctx.fragments[selection.name.value]
      if (fragment) collect(src, fragment.selectionSet, ctx, out)
    } else if (selection.kind === Kind.INLINE_FRAGMENT) {
      collect(src, selection.selectionSet, ctx, out)
    }
  })
}

const project = (src: any, selectionSet: SelectionSetNode | undefined, ctx: ProjectionContext): any => {
  if (src === null || src === undefined) return null
  if (Array.isArray(src)) return src.map(item => project(item, selectionSet, ctx))
  if (!selectionSet || typeof src !== 'object') return src
  const out: Record<string, any> = {}
  collect(src, selectionSet, ctx, out)
  return out
}

// ---------------------------------------------------------------------------------------------
// Root field handlers
// ---------------------------------------------------------------------------------------------
type Handled = { value: unknown }

/** Operations answered fully from the mock. Return `undefined` to pass the operation through. */
const mockOnly: Record<string, (args: Record<string, any>) => Handled | undefined> = {
  advertiserPlan: ({ id }) => {
    const plan = getPlan(id)
    return plan ? { value: planEntity(plan) } : undefined
  },
  groupPlan: ({ id }) => {
    const found = findGroup(id)
    return found ? { value: groupPlanEntity(found.plan, found.group) } : undefined
  },
  groupNames: ({ filter }) => {
    if (!isMockPlanId(filter?.advertiserPlanId)) return undefined
    const q = typeof filter?.name === 'string' ? filter.name.trim().toLowerCase() : ''
    return { value: groupNameEntities(filter.advertiserPlanId).filter(g => !q || g.name.toLowerCase().includes(q)) }
  },
  campaignNames: ({ filter }) => {
    const scoped = isMockAdvertiserId(filter?.advertiserId) || isMockPlanId(filter?.advertiserPlanId)
    const groupScoped = filter?.groupId != null && !!findGroup(filter.groupId)
    return scoped || groupScoped ? { value: campaignNameEntities(filter) } : undefined
  },
  updateAdvertiserPlan: ({ input }) => {
    const plan = isMockPlanId(input?.id) ? applyPlanUpdate(input) : undefined
    return plan ? { value: planEntity(plan) } : undefined
  },
  // Deleting a demo plan is a safe no-op (the plan stays available for the demo).
  deleteAdvertiserPlan: ({ input }) => (isMockPlanId(input?.id) ? { value: null } : undefined),
  pauseAdvertiserPlan: ({ id }) => {
    const plan = isMockPlanId(id) ? applyPlanPause(id, true) : undefined
    return plan ? { value: planEntity(plan) } : undefined
  },
  unpauseAdvertiserPlan: ({ id }) => {
    const plan = isMockPlanId(id) ? applyPlanPause(id, false) : undefined
    return plan ? { value: planEntity(plan) } : undefined
  },
  pauseCampaign: ({ campaignId, groupId }) => {
    const row = findGroup(groupId) ? applyCampaignPause(campaignId, groupId, true) : undefined
    return row ? { value: row } : undefined
  },
  unpauseCampaign: ({ campaignId, groupId }) => {
    const row = findGroup(groupId) ? applyCampaignPause(campaignId, groupId, false) : undefined
    return row ? { value: row } : undefined
  },
  updateGroupPlan: ({ input }) => {
    const found = findGroup(input?.id) ? applyGroupUpdate(input) : undefined
    return found ? { value: groupPlanEntity(found.plan, found.group) } : undefined
  },
}

const textMatches = (query: unknown, ...candidates: (string | undefined)[]) => {
  const q = typeof query === 'string' ? query.trim().toLowerCase() : ''
  return !q || candidates.some(c => c?.toLowerCase().includes(q))
}

/** Lists forwarded to the backend with the Londoner record(s) appended (respecting the filter). */
const appendTo: Record<string, (args: Record<string, any>) => any[]> = {
  advertiserPlans: ({ filter }) => {
    const f = filter ?? {}
    // Only the first page carries the demo plans.
    if (f.paging?.offset) return []
    const ids: string[] = (f.ids ?? []).map(String)
    const advertiserIds: string[] = (f.advertiserIds ?? []).map(String)
    const statuses: string[] = f.status ?? []
    // LIMITATION: demo advertisers that already exist in the backend (e.g. BP-9074305, BP-9113259,
    // BP-9104332) keep their REAL advertiser ids in the UI, which the mock cannot know. So an
    // `advertiserIds` filter only matches a demo plan by its SYNTHETIC advertiser id; filtering by
    // the real id of a backend-owned demo advertiser will not surface its demo plan here.
    // "My OBA" (myAdvertisers) only includes a demo advertiser's plan while the user follows it.
    return getPlans()
      .filter(
        p =>
          (!f.myAdvertisers || isDemoFollowed(p.advertiser.bpid)) &&
          (!ids.length || ids.includes(p.id)) &&
          (!advertiserIds.length || advertiserIds.includes(p.advertiser.id)) &&
          (!statuses.length || statuses.includes(p.status)) &&
          textMatches(f.name, p.name),
      )
      .map(planLiteEntity)
  },
  advertiserPlanNames: ({ filter }) => {
    const f = filter ?? {}
    const ids: string[] = (f.ids ?? []).map(String)
    return planNameEntities().filter(p => (!ids.length || ids.includes(p.id)) && textMatches(f.name, p.name))
  },
  advertiserNames: ({ filter }) => {
    const f = filter ?? {}
    const ids: string[] = (f.ids ?? []).map(String)
    if (f.fromExistingAdvertiserPlans === false) return []
    return advertiserNameEntities().filter(
      adv => (!ids.length || ids.includes(adv.id)) && textMatches(f.name, adv.name, adv.bpid),
    )
  },
  currencies: () => MOCK_CURRENCIES,
  // Unscoped campaign lookups (no advertiser / plan / group) also offer the Londoner campaigns.
  campaignNames: ({ filter }) => {
    const f = filter ?? {}
    if (f.advertiserId != null || f.advertiserPlanId != null || f.groupId != null || f.bid != null) return []
    return campaignNameEntities(f)
  },
}

/** Like appendUnique, but the mock rows go FIRST (e.g. the followed Londoner at the top). */
const prependUnique = (existing: any[], extra: any[], key: (row: any) => string): any[] => {
  const seen = new Set(existing.map(key))
  return [...extra.filter(row => !seen.has(key(row))), ...existing]
}

/** Dedupes by `key` (existing backend entries win) while appending mock rows. */
const appendUnique = (existing: any[], extra: any[], key: (row: any) => string): any[] => {
  const seen = new Set(existing.map(key))
  return [...existing, ...extra.filter(row => !seen.has(key(row)))]
}

const keyOf = (fieldName: string) => (row: any) => (fieldName === 'currencies' ? String(row.code) : String(row.id))

// ---------------------------------------------------------------------------------------------
// Link
// ---------------------------------------------------------------------------------------------
const buildContext = (operation: Operation): ProjectionContext => {
  const fragments: Record<string, FragmentDefinitionNode> = {}
  operation.query.definitions.forEach(def => {
    if (def.kind === Kind.FRAGMENT_DEFINITION) fragments[def.name.value] = def
  })
  return { fragments, variables: operation.variables ?? {} }
}

const respond = (data: Record<string, unknown>): Observable<FetchResult> =>
  new Observable<FetchResult>(observer => {
    const timer = setTimeout(() => {
      observer.next({ data })
      observer.complete()
    }, MOCK_LATENCY_MS)
    return () => clearTimeout(timer)
  })

export const obaMockLink = new ApolloLink((operation, forward) => {
  if (!ENABLE_OBA_MOCK) return forward(operation)

  const definition = getMainDefinition(operation.query) as OperationDefinitionNode
  const rootField = definition.selectionSet.selections.find((s): s is FieldNode => s.kind === Kind.FIELD)
  if (!rootField) return forward(operation)

  const fieldName = rootField.name.value
  const responseKey = rootField.alias?.value ?? fieldName
  const ctx = buildContext(operation)
  const args = fieldArgs(rootField, ctx)

  // 1) Londoner-specific operation: answer from the mock only.
  const handled = mockOnly[fieldName]?.(args)
  if (handled) {
    return respond({ [responseKey]: project(handled.value, rootField.selectionSet, ctx) })
  }

  // 2) List / lookup: forward to the backend and append the Londoner record(s).
  const extraFactory = appendTo[fieldName]
  if (definition.operation === 'query' && extraFactory) {
    const extra = project(extraFactory(args), rootField.selectionSet, ctx) as any[]
    const key = keyOf(fieldName)
    return new Observable<FetchResult>(observer => {
      let settled = false
      const fallback = () => {
        if (settled) return
        settled = true
        observer.next({ data: { [responseKey]: extra } })
        observer.complete()
      }
      const subscription = forward(operation).subscribe({
        next: result => {
          const list = (result.data as any)?.[responseKey]
          if (result.errors?.length || !Array.isArray(list)) {
            fallback()
            return
          }
          // Plans: the Londoner goes first (top of the list); lookups keep appending.
          const merged = fieldName === 'advertiserPlans' ? prependUnique(list, extra, key) : appendUnique(list, extra, key)
          observer.next({ ...result, data: { ...result.data, [responseKey]: merged } })
        },
        error: fallback,
        complete: () => {
          if (settled) return
          settled = true
          observer.complete()
        },
      })
      return () => subscription.unsubscribe()
    })
  }

  // 3) Anything else passes through untouched.
  return forward(operation)
})
