import { LONDONER, LONDONER_PLATFORM_ADVERTISERS } from './londonerHotel'
import { DEMO_ADVERTISERS, getDemoAdvertiserByBpid } from './demoAdvertisers'

export interface SharedPlatformAdvertiser {
  id: string
  platform: string
  advertiserName: string
  advertiserId: string
  connected: boolean
}

const platformsByAdvertiser = new Map<string, SharedPlatformAdvertiser[]>()
const STORAGE_KEY = 'mediahub.advertiser-platforms.v3'

function hydrate(): void {
  if (typeof localStorage === 'undefined') return
  try {
    platformsByAdvertiser.clear()
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as Record<string, SharedPlatformAdvertiser[]>
    Object.entries(stored).forEach(([advertiserId, platforms]) => platformsByAdvertiser.set(advertiserId, platforms))
  } catch {
    localStorage.removeItem(STORAGE_KEY)
  }
}

function persist(): void {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Object.fromEntries(platformsByAdvertiser)))
}

/**
 * Prototype seed: The Londoner Hotel's platform connections. AdvertiserDetails adds the
 * 'default-amadeus-dsp' row itself, so Amadeus DSP is intentionally NOT seeded here.
 * Idempotent: only writes when the advertiser key does not exist yet (never overwrites user edits).
 */
function readStored(): Record<string, SharedPlatformAdvertiser[]> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as Record<string, SharedPlatformAdvertiser[]>
  } catch {
    return {}
  }
}

/** Platform connections of a demo advertiser, minus the synthetic default Amadeus DSP row. */
const demoPlatformRows = (bpid: string): SharedPlatformAdvertiser[] =>
  (getDemoAdvertiserByBpid(bpid)?.platformAdvertisers ?? [])
    .filter(p => p.platform !== 'Amadeus DSP')
    .map(p => ({ ...p }))

/**
 * Seeds a demo advertiser's platform connections under String(advertiserId) (the REAL backend id
 * when known, otherwise the synthetic id). Idempotent: never overwrites an existing key.
 */
export function seedDemoPlatformsFor(advertiserId: string | number, bpid: string): void {
  if (typeof localStorage === 'undefined') return
  const rows = demoPlatformRows(bpid)
  if (!rows.length) return
  const stored = readStored()
  const key = String(advertiserId)
  if (key in stored) return
  stored[key] = rows
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
}

/**
 * Prototype seed: The Londoner Hotel's + the demo advertisers' platform connections, keyed by their
 * synthetic ids. AdvertiserDetails adds the 'default-amadeus-dsp' row itself, so Amadeus DSP is
 * intentionally NOT seeded. Idempotent: only writes when the advertiser key does not exist yet.
 */
function seedLondonerPlatforms(): void {
  if (typeof localStorage === 'undefined') return
  const stored = readStored()
  let changed = false
  const londonerKey = String(LONDONER.advertiserId)
  if (!(londonerKey in stored)) {
    stored[londonerKey] = LONDONER_PLATFORM_ADVERTISERS.filter(p => p.platform !== 'Amadeus DSP').map(p => ({ ...p }))
    changed = true
  }
  DEMO_ADVERTISERS.forEach(adv => {
    const key = String(adv.advertiserId)
    if (!(key in stored)) {
      stored[key] = demoPlatformRows(adv.bpid)
      changed = true
    }
  })
  if (changed) localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
}

export function getAddedAdvertiserPlatforms(advertiserId?: string | number): SharedPlatformAdvertiser[] {
  seedLondonerPlatforms()
  hydrate()
  return [...(platformsByAdvertiser.get(String(advertiserId ?? '')) ?? [])]
}

export function setAddedAdvertiserPlatforms(
  advertiserId: string | number | undefined,
  platforms: SharedPlatformAdvertiser[],
): void {
  platformsByAdvertiser.set(String(advertiserId ?? ''), [...platforms])
  persist()
}
