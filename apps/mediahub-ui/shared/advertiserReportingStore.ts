// Per-advertiser reporting settings (Custom 1/2/3) — prototype store, persisted to localStorage.
// These are the advertiser-level reporting values that mapped campaigns inherit (Req 2/3).
// There are no per-customer labels — the three values themselves are the labels.

import { LONDONER, LONDONER_REPORTING } from './londonerHotel'
import { DEMO_ADVERTISERS } from './demoAdvertisers'

export interface AdvertiserReporting {
  custom1: string
  custom2: string
  custom3: string
}

const EMPTY: AdvertiserReporting = { custom1: '', custom2: '', custom3: '' }
const STORAGE_KEY = 'mediahub.advertiser-reporting.v1'

function readAll(): Record<string, AdvertiserReporting> {
  if (typeof localStorage === 'undefined') return {}
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as Record<string, AdvertiserReporting>
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return {}
  }
}

export function getAdvertiserReporting(advertiserId?: string | number): AdvertiserReporting {
  const all = readAll()
  return { ...EMPTY, ...(all[String(advertiserId ?? '')] ?? {}) }
}

// --- Prototype seed -----------------------------------------------------------------------------
// The Advertiser module gets its advertisers from a live GraphQL endpoint, while the Campaign
// Mapping module uses a hand-authored mock (keyed by BPID). The two sets don't overlap, so without
// seeding you'd never see inherited labels in the mapping drawer. This seeds default Custom Label
// 1/2/3 for the campaign-mock BPIDs so the inheritance is demonstrable. Values ARE the labels
// (value-is-label); a blank custom falls back to the generic "Custom N" at render time.
// Example (El Palace Barcelona, BP-2850): Custom 1 = "Market", 2/3 left blank -> show "Custom 2/3".
const SEED: Record<string, AdvertiserReporting> = {
  // All 10 demo advertisers from the registry first; the explicit entries below win where both exist.
  ...Object.fromEntries(DEMO_ADVERTISERS.map(a => [a.bpid, { ...a.reporting }])),
  'BP-2850': { custom1: 'Market', custom2: '', custom3: '' }, // El Palace Barcelona
  'BP-64517': { custom1: 'Region', custom2: 'Campaign Objective', custom3: 'Fiscal Year' }, // Mulia Resort
  'BP-64518': { custom1: 'Region', custom2: 'Property Cluster', custom3: '' }, // Mulia Villa
  'BP-51546': { custom1: 'Market', custom2: 'Booking Window', custom3: '' }, // Trump Intl Hotel Las Vegas
  // Real backend advertisers (BPIDs from the live Advertisers list) — same ones seeded with
  // campaigns, so reporting labels + campaigns are consistent for the demo.
  'BP-9074305': { custom1: 'Market', custom2: 'Campaign Objective', custom3: '' }, // 11 Howard New York
  'BP-9113259': { custom1: 'Region', custom2: '', custom3: '' }, // 1 Hotel Brooklyn Bridge
  [LONDONER.bpid]: { ...LONDONER_REPORTING }, // The Londoner Hotel
  'BP-9104332': { custom1: 'Market', custom2: 'Booking Window', custom3: 'Fiscal Year' }, // 25 hours Hotel Dubai
}

let seeded = false

/**
 * Seed default reporting labels for the campaign-mapping mock advertisers, ONCE, and only for
 * BPIDs that don't already have a stored entry (never overwrite user edits). Idempotent and safe
 * to call on every drawer open. Prototype-only.
 */
export function seedAdvertiserReporting(): void {
  if (seeded || typeof localStorage === 'undefined') return
  seeded = true
  const all = readAll()
  let changed = false
  for (const [bpid, value] of Object.entries(SEED)) {
    if (!(bpid in all)) {
      all[bpid] = value
      changed = true
    }
  }
  if (changed) localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
}

export function setAdvertiserReporting(advertiserId: string | number | undefined, value: AdvertiserReporting): void {
  if (typeof localStorage === 'undefined') return
  const all = readAll()
  all[String(advertiserId ?? '')] = value
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
}
