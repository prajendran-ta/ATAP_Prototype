import type { MockAudience } from '../pages/Audience/mockAudiences'

import { MOCK_AUDIENCES } from '../pages/Audience/mockAudiences'

let audiences: MockAudience[] = []
let seedMerged = false
const STORAGE_KEY = 'mediahub.audiences'
/** Ids of seed (MOCK_AUDIENCES) entries already offered to this session, so deleted ones never come back. */
const SEEDED_IDS_KEY = 'mediahub.audiences.seeded-ids'

const cloneAudience = (audience: MockAudience): MockAudience => ({
  ...audience,
  platformAdvertisers: audience.platformAdvertisers.map(platform => ({ ...platform })),
  audienceRuleIds: [...audience.audienceRuleIds],
})

/**
 * Merge-safe seeding: appends seed audiences whose id has never been offered to this session and is
 * not already present. Never overwrites or duplicates user-created/edited items, and a seed the user
 * deleted is not re-added (its id stays recorded). Runs once per module load.
 */
function mergeNewSeeds(): void {
  if (seedMerged) return
  seedMerged = true
  let seededIds: string[] = []
  try {
    seededIds = JSON.parse(sessionStorage.getItem(SEEDED_IDS_KEY) ?? '[]') as string[]
  } catch {
    seededIds = []
  }
  const known = new Set([...seededIds, ...audiences.map(audience => audience.id)])
  const missing = MOCK_AUDIENCES.filter(seed => !known.has(seed.id))
  if (missing.length > 0) {
    audiences = [...audiences, ...missing.map(cloneAudience)]
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(audiences))
  }
  sessionStorage.setItem(SEEDED_IDS_KEY, JSON.stringify([...new Set([...seededIds, ...MOCK_AUDIENCES.map(seed => seed.id)])]))
}

function hydrate(): void {
  if (typeof sessionStorage === 'undefined') return
  if (audiences.length === 0) {
    try {
      audiences = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? '[]') as MockAudience[]
    } catch {
      sessionStorage.removeItem(STORAGE_KEY)
    }
  }
  mergeNewSeeds()
}

export function getSharedAudiences(): MockAudience[] {
  hydrate()
  return audiences.map(audience => ({
    ...audience,
    platformAdvertisers: audience.platformAdvertisers.map(platform => ({ ...platform })),
    audienceRuleIds: [...audience.audienceRuleIds],
  }))
}

export function setSharedAudiences(nextAudiences: MockAudience[]): void {
  // Record seed ids as offered first, so seeds missing from `nextAudiences` (deleted) are not re-added later.
  if (typeof sessionStorage !== 'undefined' && !seedMerged) hydrate()
  audiences = nextAudiences.map(audience => ({
    ...audience,
    platformAdvertisers: audience.platformAdvertisers.map(platform => ({ ...platform })),
    audienceRuleIds: [...audience.audienceRuleIds],
  }))
  if (typeof sessionStorage !== 'undefined') sessionStorage.setItem(STORAGE_KEY, JSON.stringify(audiences))
}
