import { LONDONER, isLondonerAdvertiser } from './londonerHotel'
import { DEMO_ADVERTISERS, findDemoAdvertiser } from './demoAdvertisers'

/**
 * Follow state for the demo advertisers (The Londoner Hotel + the 19 in demoAdvertisers.ts).
 *
 * The real follow state lives in the Advertisers backend, which doesn't know the mock advertisers,
 * so the Advertisers mock link keeps it here instead. Every "My ..." scope (My Campaigns, My Plans,
 * My OBA, My Audience, the Advertisers "following" toggle) reads this one store so they all agree.
 * It is persisted (localStorage) as { [BPID]: boolean } so it survives a reload. The Londoner
 * defaults to followed; each demo advertiser uses its `followedByDefault`.
 *
 * Kept in this file (its original name) so existing imports keep working.
 */
const STORAGE_KEY = 'mediahub.demo-advertiser-following'
const LEGACY_LONDONER_KEY = 'mediahub.londoner-following'

const readAll = (): Record<string, boolean> => {
  if (typeof localStorage === 'undefined') return {}
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as Record<string, boolean>
    // Migrate the earlier Londoner-only key once.
    const legacy = localStorage.getItem(LEGACY_LONDONER_KEY)
    if (legacy !== null && !(LONDONER.bpid in stored)) stored[LONDONER.bpid] = legacy !== 'false'
    return stored
  } catch {
    return {}
  }
}

const defaultFor = (bpid: string): boolean => {
  if (bpid === LONDONER.bpid) return true
  return DEMO_ADVERTISERS.find(a => a.bpid === bpid)?.followedByDefault ?? false
}

/** Follow state of a demo advertiser by BPID. Returns false for non-demo BPIDs (not managed here). */
export function isDemoFollowed(bpid: string): boolean {
  const stored = readAll()
  return bpid in stored ? stored[bpid] : defaultFor(bpid)
}

export function setDemoFollowed(bpid: string, following: boolean): void {
  if (typeof localStorage === 'undefined') return
  const stored = readAll()
  stored[bpid] = following
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
}

/** BPID of the demo advertiser a name / 'Name (BPID)' / BPID / synthetic id refers to, if any. */
export function demoBpidOf(value: string | number | undefined | null): string | undefined {
  if (isLondonerAdvertiser(value)) return LONDONER.bpid
  return findDemoAdvertiser(value)?.bpid
}

/** True when the value is a demo advertiser AND the user follows it. */
export function isFollowedDemoAdvertiser(value: string | number | undefined | null): boolean {
  const bpid = demoBpidOf(value)
  return !!bpid && isDemoFollowed(bpid)
}

// ---- Londoner-specific aliases (kept for existing call sites) ------------------------------------

export function isLondonerFollowed(): boolean {
  return isDemoFollowed(LONDONER.bpid)
}

export function setLondonerFollowed(following: boolean): void {
  setDemoFollowed(LONDONER.bpid, following)
}

/** True when the advertiser name / BPID / id is the Londoner AND the user follows it. */
export function isFollowedLondoner(advertiser: string | number | undefined | null): boolean {
  return isLondonerAdvertiser(advertiser) && isLondonerFollowed()
}

/**
 * Stable sort that floats The Londoner Hotel rows to the top (other rows keep their order).
 * (Only the Londoner is pinned; the other demo advertisers sort normally below it.)
 */
export function londonerFirst<T>(rows: T[], isLondonerRow: (row: T) => boolean): T[] {
  return rows
    .map((row, index) => ({ row, index }))
    .sort((a, b) => Number(isLondonerRow(b.row)) - Number(isLondonerRow(a.row)) || a.index - b.index)
    .map(x => x.row)
}
