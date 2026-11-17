import { MOCK_RULES, type MockRule } from '../pages/AudienceBuilder/mockAudienceRules'

const STORAGE_KEY = 'mediahub.audience-rules'
let rules: MockRule[] = []
let seedMerged = false
/** Ids of seed (MOCK_RULES) entries already offered to this session, so deleted ones never come back. */
const SEEDED_IDS_KEY = 'mediahub.audience-rules.seeded-ids'

/**
 * Merge-safe seeding: appends seed rules whose id has never been offered to this session and is not
 * already present. Never overwrites or duplicates user-created/edited rules; deleted seeds stay deleted.
 * Runs once per module load.
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
  const known = new Set([...seededIds, ...rules.map(rule => rule.id)])
  const missing = MOCK_RULES.filter(seed => !known.has(seed.id))
  if (missing.length > 0) {
    rules = [...rules, ...missing.map(rule => ({ ...rule }))]
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(rules))
  }
  sessionStorage.setItem(SEEDED_IDS_KEY, JSON.stringify([...new Set([...seededIds, ...MOCK_RULES.map(seed => seed.id)])]))
}

function hydrate(): void {
  if (typeof sessionStorage === 'undefined') return
  if (rules.length === 0) {
    try {
      rules = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? 'null') ?? MOCK_RULES.map(rule => ({ ...rule }))
      // A fresh session is seeded with every MOCK_RULES entry, so they are all "already offered".
    } catch {
      rules = MOCK_RULES.map(rule => ({ ...rule }))
      sessionStorage.removeItem(STORAGE_KEY)
    }
  }
  mergeNewSeeds()
}

export function getSharedRules(): MockRule[] {
  hydrate()
  return rules.map(rule => ({ ...rule }))
}

export function setSharedRules(nextRules: MockRule[]): void {
  // Record seed ids as offered first, so seeds missing from `nextRules` (deleted) are not re-added later.
  if (typeof sessionStorage !== 'undefined' && !seedMerged) hydrate()
  rules = nextRules.map(rule => ({ ...rule }))
  if (typeof sessionStorage !== 'undefined') sessionStorage.setItem(STORAGE_KEY, JSON.stringify(rules))
}
