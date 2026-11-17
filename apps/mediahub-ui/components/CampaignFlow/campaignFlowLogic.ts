import {
  campaignFlowData,
  type CampaignFlowData,
  type CampaignLaunchSummary,
  type CampaignPlatform,
  type LocaleInfo,
} from './campaignFlowData'
import { defaultKeywordOptions, defaultLocationLevel } from './platformSetupOptions'
import { matrixDefaultValue, matrixValues } from './platformFieldMatrix'

export const ALL_PLATFORMS = 'all'
export const PAID_SEARCH = 'Paid search'

export const BIDDING_FIELDS = [
  'budgetPacing',
  'bidStrategy',
  'optimizationEvent',
  'targetCpa',
  'targetRoas',
  'maxCpc',
  'valueRules',
] as const

export type BiddingField = (typeof BIDDING_FIELDS)[number]

export type CampaignDraft = {
  campaignName: string
  objective: string
  campaignType: string
  startDate: string
  endDate: string
  totalBudget: number
  manageBudgetByOba: boolean
  splitBy: Record<string, string>
  // Optional secondary "Split Ad Group by" per platform (display-only; does not affect generation).
  adGroupSplitBy: Record<string, string>
  values: Record<string, string>
  extraLanguages: Record<string, string[]>
  selectedAsset: Record<string, string>
}

const PROPERTY_SPECIFIC_FIELDS = ['audience', 'brandKeywords', 'genericKeywords']

const DEFAULT_CREATIVE_FORMATS: Record<string, string> = {
  'google-ads': 'Responsive search ad',
  bing: 'Responsive search ad',
  meta: 'Single image',
  tiktok: 'In-feed video',
  linkedin: 'Single image',
  dv360: 'Display',
  'amadeus-dsp': 'Display',
  youtube: 'Video',
  yandex: 'Responsive search ad',
  baidu: 'Responsive search ad',
  demandgen: 'Single image',
  tencent: 'Single image',
  wechat: 'Single image',
  pinterest: 'Single image',
  snapchat: 'Single video',
  spotify: 'Audio',
  'tripadvisor-display': 'Native',
  quantcast: 'Display',
  amazon: 'Display',
  wego: 'Hotel metasearch listing',
  skyscanner: 'Hotel metasearch listing',
  trivago: 'Hotel metasearch listing',
  kayak: 'Hotel metasearch listing',
  'tripadvisor-meta': 'Hotel metasearch listing',
  'google-hotel-meta': 'Hotel metasearch listing',
  'bing-meta': 'Hotel metasearch listing',
  expedia: 'Hotel metasearch listing',
}

export const normalizePlatforms = (data: CampaignFlowData = campaignFlowData): CampaignPlatform[] =>
  data.platforms.map(platform => {
    const defaults = data.genericPlatformDefaults
    const googleLocation =
      data.platforms.find(defaultPlatform => defaultPlatform.id === 'google-ads')?.targeting?.location ??
      defaults.targeting.location
    const creative = { ...defaults.creative, ...platform.creative }
    return {
      id: platform.id,
      name: platform.name,
      group: platform.group,
      enabled: platform.enabled,
      recommended: platform.recommended === true,
      splitBy: platform.splitBy ?? defaults.splitBy,
      tactics: platform.tactics ?? [],
      bidding: { ...defaults.bidding, ...platform.bidding },
      targeting: { ...defaults.targeting, ...platform.targeting, location: googleLocation },
      creative: {
        ...creative,
        adFormat: DEFAULT_CREATIVE_FORMATS[platform.id] ?? creative.adFormat,
        destination: creative.destination.replace('{platform}', platform.id),
      },
    }
  })

export const enabledPlatforms = (platforms: CampaignPlatform[]) => platforms.filter(platform => platform.enabled)

// Selectable media plan. 2027 is the default plan (conversation.mediaPlanTable + basicInfo);
// 2026 is the variant stored under data.mediaPlan2026; 'us-push' is the net-new US Push plan
// (data.usPushPlan) created by the MockStay "Create US Push in new plan" growth action.
export type MediaPlanYear = '2026' | '2027' | 'us-push'

export type ResolvedMediaPlan = {
  year: MediaPlanYear
  mediaPlanName: string
  startDate: string
  endDate: string
  mediaPlanIntro: string
  mediaPlanTable: CampaignFlowData['conversation']['mediaPlanTable']
}

// Resolves a media plan variant by year. 2026 reads data.mediaPlan2026; anything else falls back
// to the default 2027 plan assembled from conversation + basicInfo.
export const resolveMediaPlan = (
  year: MediaPlanYear = '2027',
  data: CampaignFlowData = campaignFlowData,
): ResolvedMediaPlan => {
  if (year === '2026') {
    const plan = data.mediaPlan2026
    return {
      year: '2026',
      mediaPlanName: plan.mediaPlanName,
      startDate: plan.startDate,
      endDate: plan.endDate,
      mediaPlanIntro: plan.mediaPlanIntro,
      mediaPlanTable: plan.mediaPlanTable,
    }
  }
  if (year === 'us-push' && data.usPushPlan) {
    const plan = data.usPushPlan
    return {
      year: 'us-push',
      mediaPlanName: plan.mediaPlanName,
      startDate: plan.startDate,
      endDate: plan.endDate,
      mediaPlanIntro: plan.mediaPlanIntro,
      mediaPlanTable: plan.mediaPlanTable,
    }
  }
  return {
    year: '2027',
    mediaPlanName: data.basicInfo.mediaPlanName,
    startDate: data.basicInfo.startDate,
    endDate: data.basicInfo.endDate,
    mediaPlanIntro: data.conversation.mediaPlanIntro,
    mediaPlanTable: data.conversation.mediaPlanTable,
  }
}

// Infers the plan year from a media plan name / prompt text (defaults to 2027).
export const mediaPlanYearFromName = (name: string): MediaPlanYear => (/2026/.test(name) ? '2026' : '2027')

// Per-year status of a campaign-structure row. 2026 is the current live setup; 2027 is the
// closed-won next plan. A column cell is one of:
//   'exists'   = the campaign runs in that year
//   'added'    = newly introduced that year (must be created) — used for 2027-only rows
//   'paused'   = live before but not continuing into that year
//   'unpaused' = a previously-paused campaign is reactivated that year
//   'none'     = not present in that year (empty cell)
export type CampaignStructureCellStatus = 'exists' | 'added' | 'paused' | 'unpaused' | 'none'
export type CampaignStructureRow = {
  channel: string
  platformId: string
  platformName: string
  tactic: string
  status2026: CampaignStructureCellStatus
  status2027: CampaignStructureCellStatus
  // Per platform+tactic annual budget for each year (0 when the campaign isn't in that year).
  budget2026: number
  budget2027: number
}

// Builds the 2026-vs-2027 campaign-structure comparison. Rows are keyed by channel + platform +
// tactic; platform ids are resolved to names for display. Each year gets its own cell status so
// the user can see the current setup (2026) and what changes next (2027): continues, newly added,
// or paused.
export const campaignStructureComparison = (data: CampaignFlowData = campaignFlowData): CampaignStructureRow[] => {
  const platformName = (id: string) => data.platforms.find(platform => platform.id === id)?.name ?? id
  const parseBudget = (budget: string) => Number(budget.replace(/[$£€,]/g, '')) || 0
  const keysFor = (year: MediaPlanYear) => {
    const map = new Map<string, { channel: string; platformId: string; tactic: string; budget: number }>()
    resolveMediaPlan(year, data).mediaPlanTable.groups.forEach(group => {
      group.items.forEach(item => {
        // The item budget is shared evenly across its platforms (same split the allocation table uses).
        const perPlatform = item.platforms.length > 0 ? Math.round(parseBudget(item.budget) / item.platforms.length) : 0
        item.platforms.forEach(platformId => {
          map.set(`${group.channel}|${platformId}|${item.tactic}`, {
            channel: group.channel,
            platformId,
            tactic: item.tactic,
            budget: perPlatform,
          })
        })
      })
    })
    return map
  }
  const in2026 = keysFor('2026')
  const in2027 = keysFor('2027')
  const allKeys = [...new Set([...in2026.keys(), ...in2027.keys()])]

  // Preserve 2026-then-2027 ordering so the table reads channel-grouped and stable.
  const orderedKeys = [...in2026.keys(), ...allKeys.filter(key => !in2026.has(key))]

  // Per-row overrides (e.g. a campaign whose history predates the plans we model). Keyed by
  // 'channel|platformId|tactic'.
  const CELL_STATUSES = new Set<CampaignStructureCellStatus>(['exists', 'added', 'paused', 'unpaused', 'none'])
  const asCellStatus = (value: string): CampaignStructureCellStatus | undefined =>
    CELL_STATUSES.has(value as CampaignStructureCellStatus) ? (value as CampaignStructureCellStatus) : undefined
  const exceptions = new Map((data.conversation.campaignStructure.exceptions?.rows ?? []).map(row => [row.key, row]))

  // A 2027-only row that the exception marks as a 2026 Paused must still appear (it ran before 2026),
  // so include exception keys even if neither current plan contains them.
  const keysWithExceptions = [...new Set([...orderedKeys, ...exceptions.keys()])]

  // Channel display order: first-seen order across the 2026 then 2027 plans.
  const channelOrder: string[] = []
  keysWithExceptions.forEach(key => {
    const channel = (in2026.get(key) ?? in2027.get(key))?.channel ?? key.split('|')[0]
    if (!channelOrder.includes(channel)) channelOrder.push(channel)
  })

  const rows = keysWithExceptions.map(key => {
    const entry = in2026.get(key) ?? in2027.get(key)
    const [channel, platformId, tactic] = key.split('|')
    const has2026 = in2026.has(key)
    const has2027 = in2027.has(key)
    let status2026: CampaignStructureCellStatus = has2026 ? 'exists' : 'none'
    let status2027: CampaignStructureCellStatus = has2027 ? (has2026 ? 'exists' : 'added') : 'paused'

    const exception = exceptions.get(key)
    if (exception) {
      status2026 = asCellStatus(exception.status2026) ?? status2026
      status2027 = asCellStatus(exception.status2027) ?? status2027
    }

    return {
      channel: entry?.channel ?? channel,
      platformId: entry?.platformId ?? platformId,
      platformName: platformName(entry?.platformId ?? platformId),
      tactic: entry?.tactic ?? tactic,
      status2026,
      status2027,
      budget2026: in2026.get(key)?.budget ?? 0,
      budget2027: in2027.get(key)?.budget ?? 0,
    }
  })

  // Group by channel (plan order), then order rows by platform name, then tactic.
  return rows.sort((a, b) => {
    const channelDiff = channelOrder.indexOf(a.channel) - channelOrder.indexOf(b.channel)
    if (channelDiff !== 0) return channelDiff
    const platformDiff = a.platformName.localeCompare(b.platformName)
    if (platformDiff !== 0) return platformDiff
    return a.tactic.localeCompare(b.tactic)
  })
}

// --- Campaign-structure pivot (channel → platform, tactic columns, per-year rows) --------------
// A single tactic cell for one platform/year: its status + budget (undefined when the platform
// doesn't run that tactic that year).
export type StructureTacticCell = { status: CampaignStructureCellStatus; budget: number } | null

// One platform's year row: three tactic cells (left-to-right, blank where N/A) + the year total.
export type StructurePlatformYear = { cells: StructureTacticCell[]; total: number }

export type StructurePlatformEntry = {
  platformId: string
  platformName: string
  y2026: StructurePlatformYear
  y2027: StructurePlatformYear
}

// A channel section: up to three tactic column labels + its platform entries.
export type StructureChannelSection = {
  channel: string
  tacticColumns: string[]
  platforms: StructurePlatformEntry[]
}

// Fixed tactic columns per channel (max 3). No-tactic channels (Metasearch/Other) use a single
// column labelled with the channel name.
const STRUCTURE_TACTIC_COLUMNS: Record<string, string[]> = {
  'Paid Search': ['Brand', 'Generic', 'Pmax'],
  'Display Advertising': ['Prospecting', 'Remarketing'],
  Social: ['Prospecting', 'Remarketing'],
}

// Builds the pivoted campaign-structure view: channels as sections, platforms as rows with a 2026
// and 2027 line, tactics as columns, and per-year totals.
export const campaignStructurePivot = (data: CampaignFlowData = campaignFlowData): StructureChannelSection[] => {
  const rows = campaignStructureComparison(data)
  const sections: StructureChannelSection[] = []

  rows.forEach(row => {
    let section = sections.find(entry => entry.channel === row.channel)
    if (!section) {
      const configured = STRUCTURE_TACTIC_COLUMNS[row.channel]
      section = { channel: row.channel, tacticColumns: configured ?? [row.channel], platforms: [] }
      sections.push(section)
    }
    // Resolve this row's column index within the section's tactic columns.
    const isNoTactic = !row.tactic || row.tactic === 'No tactic configured'
    let columnIndex = isNoTactic ? 0 : section.tacticColumns.indexOf(row.tactic)
    if (columnIndex < 0) {
      // Tactic not in the configured set: append it (keeps data visible even if unexpected).
      if (section.tacticColumns.length < 3) section.tacticColumns.push(row.tactic)
      columnIndex = Math.max(0, section.tacticColumns.indexOf(row.tactic))
    }

    let platform = section.platforms.find(entry => entry.platformId === row.platformId)
    if (!platform) {
      platform = {
        platformId: row.platformId,
        platformName: row.platformName,
        y2026: { cells: [null, null, null], total: 0 },
        y2027: { cells: [null, null, null], total: 0 },
      }
      section.platforms.push(platform)
    }

    if (row.status2026 !== 'none') {
      platform.y2026.cells[columnIndex] = { status: row.status2026, budget: row.budget2026 }
      platform.y2026.total += row.budget2026
    }
    if (row.status2027 !== 'none') {
      platform.y2027.cells[columnIndex] = { status: row.status2027, budget: row.budget2027 }
      platform.y2027.total += row.budget2027
    }
  })

  return sections
}

export const closedWonMediaPlanPlatforms = (
  platforms: CampaignPlatform[] = normalizePlatforms(),
  data: CampaignFlowData = campaignFlowData,
  mediaPlanTable: CampaignFlowData['conversation']['mediaPlanTable'] = data.conversation.mediaPlanTable,
) => {
  const excludedChannels = new Set(['Metasearch', 'Other'])
  const mediaPlanPlatformIds = new Set(
    mediaPlanTable.groups.flatMap(group => group.items.flatMap(item => item.platforms)),
  )

  return data.channelOrder.flatMap(channel =>
    platforms.filter(
      platform =>
        platform.group === channel && !excludedChannels.has(platform.group) && mediaPlanPlatformIds.has(platform.id),
    ),
  )
}

export const recommendedPlatforms = (platforms: CampaignPlatform[]) =>
  platforms.filter(platform => platform.recommended)

export const groupPlatformsByChannel = (
  platforms: CampaignPlatform[],
  channelOrder: string[] = campaignFlowData.channelOrder,
) =>
  channelOrder
    .map(channel => ({ channel, platforms: platforms.filter(platform => platform.group === channel) }))
    .filter(group => group.platforms.length > 0)

export const usesKeywords = (platform: CampaignPlatform) => platform.group === PAID_SEARCH

export const hasPaidSearch = (platforms: CampaignPlatform[]) => enabledPlatforms(platforms).some(usesKeywords)

export const visibleWizardSteps = (platforms: CampaignPlatform[], data: CampaignFlowData = campaignFlowData) =>
  data.wizardSteps.filter(step => step.id !== 'keywords' || hasPaidSearch(platforms))

export const chipKey = (platformId: string, data: CampaignFlowData = campaignFlowData) =>
  data.platformChipKeys[platformId] ?? platformId

export const chipColor = (key: string, data: CampaignFlowData = campaignFlowData) =>
  data.platformChipColors[key] ?? '#4d5a7a'

export const chipLabel = (key: string) =>
  (({ google: 'Google Ads', bing: 'Bing Ads', meta: 'Meta', tiktok: 'TikTok' }) as Record<string, string>)[key] ?? key

export const splitList = (value: string) =>
  value
    .split(';')
    .map(item => item.trim())
    .filter(Boolean)

export const joinList = (values: string[]) => values.join('; ')

const DISPLAY_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Formats an ISO date string (YYYY-MM-DD) as dd-Mmm-yyyy, e.g. "2027-01-01" -> "01-Jan-2027".
// Returns the input unchanged when it is empty or not a recognizable ISO date.
export const formatDisplayDate = (value: string | null | undefined): string => {
  if (!value) return ''
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value)
  if (!match) return value
  const [, year, month, day] = match
  const monthLabel = DISPLAY_MONTHS[Number(month) - 1]
  if (!monthLabel) return value
  return `${day}-${monthLabel}-${year}`
}

export const fillTemplate = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match))

export const hotelName = (property: string | null, advertiser = campaignFlowData.basicInfo.advertiser) =>
  property ? property.split('—')[0].trim() : advertiser

export const propertyCity = (property: string | null) => {
  if (!property) return 'Paris'
  const parts = property.split('—')
  return (parts[1] ?? parts[0]).trim()
}

export const propertyBrandKeywords = (property: string) => {
  const name = hotelName(property)
  return [
    name,
    `${name} ${propertyCity(property)}`,
    `${name} booking`,
    `${name} rooms`,
    `${name} deals`,
    `${name} offers`,
    `${name} official`,
    `${name} reservations`,
    `${name} spa`,
    `${name} amenities`,
    `book ${name}`,
    `${name} direct`,
  ].join('\n')
}

export const propertyGenericKeywords = (property: string) => {
  const city = propertyCity(property)
  return [
    `${city} hotel`,
    `hotels in ${city}`,
    `long stay hotel ${city}`,
    `extended stay ${city}`,
    `luxury hotel ${city}`,
    `boutique hotel ${city}`,
    `city break ${city}`,
    `weekend in ${city}`,
    `spa hotel ${city}`,
    `best hotels ${city}`,
    `${city} hotel deals`,
    `business hotel ${city}`,
    `family hotel ${city}`,
  ].join('\n')
}

export const createInitialDraft = (
  platforms: CampaignPlatform[],
  data: CampaignFlowData = campaignFlowData,
): CampaignDraft => ({
  campaignName: data.basicInfo.campaignName,
  objective: data.basicInfo.objective,
  campaignType: data.basicInfo.campaignType,
  startDate: data.basicInfo.startDate,
  endDate: data.basicInfo.endDate,
  totalBudget: data.basicInfo.totalBudget,
  manageBudgetByOba: data.basicInfo.manageBudgetByOba,
  splitBy: Object.fromEntries(platforms.map(platform => [platform.id, platform.splitBy])),
  adGroupSplitBy: {},
  values: {},
  extraLanguages: {},
  selectedAsset: {},
})

export const getSplitBy = (draft: CampaignDraft, platform: CampaignPlatform) =>
  draft.splitBy[platform.id] ?? platform.splitBy

export const splitByDisplayLabel = (splitBy: string) => (splitBy === 'None (By Tactic)' ? 'Tactic' : splitBy)

// Two-level split config per platform (closed-won setup). The first split is mandatory, the second
// (ad-group / line-items / campaign / etc.) is optional. `campaignDefault`/`adGroupDefault` preselect
// a value; 'None (By Tactic)' displays as "Tactic". Display-only — does not affect campaign generation.
export type PlatformSplitConfig = {
  campaignLabel: string
  campaignDefault: string
  adGroupLabel: string
  adGroupDefault: string
}

export const PLATFORM_SPLIT_CONFIG: Record<string, PlatformSplitConfig> = {
  'google-ads': {
    campaignLabel: 'Split Campaign by',
    campaignDefault: 'None (By Tactic)',
    adGroupLabel: 'Split Ad Group by',
    adGroupDefault: '',
  },
  bing: {
    campaignLabel: 'Split Campaign by',
    campaignDefault: 'None (By Tactic)',
    adGroupLabel: 'Split Ad Group by',
    adGroupDefault: '',
  },
  dv360: {
    campaignLabel: 'Split Insertions by',
    campaignDefault: 'None (By Tactic)',
    adGroupLabel: 'Split Line Items by',
    adGroupDefault: 'Market',
  },
  'amadeus-dsp': {
    campaignLabel: 'Split Package by',
    campaignDefault: 'Market',
    adGroupLabel: 'Split Campaign by',
    adGroupDefault: 'Audience',
  },
  amazon: {
    campaignLabel: 'Split Campaign by',
    campaignDefault: 'None (By Tactic)',
    adGroupLabel: 'Split Ad Group by',
    adGroupDefault: '',
  },
  meta: {
    campaignLabel: 'Split Campaign by',
    campaignDefault: 'None (By Tactic)',
    adGroupLabel: 'Split Ad Set by',
    adGroupDefault: '',
  },
  tiktok: {
    campaignLabel: 'Split Campaign by',
    campaignDefault: 'None (By Tactic)',
    adGroupLabel: 'Split Ad Group by',
    adGroupDefault: '',
  },
  linkedin: {
    campaignLabel: 'Split Campaign Group by',
    campaignDefault: 'None (By Tactic)',
    adGroupLabel: 'Split Campaign by',
    adGroupDefault: '',
  },
  youtube: {
    campaignLabel: 'Split Insertions by',
    campaignDefault: 'None (By Tactic)',
    adGroupLabel: 'Split Line Items by',
    adGroupDefault: 'Market',
  },
}

export const getPlatformSplitConfig = (platformId: string): PlatformSplitConfig | undefined =>
  PLATFORM_SPLIT_CONFIG[platformId]

export const splitsByProperty = (draft: CampaignDraft, platform: CampaignPlatform) =>
  getSplitBy(draft, platform) === 'Property'

export const fieldKey = (platformId: string, property: string | null, field: string, campaignScope?: string) =>
  campaignScope
    ? `${platformId}|${property ?? ''}|${campaignScope}|${field}`
    : `${platformId}|${property ?? ''}|${field}`

const isPropertySpecificField = (field: string) =>
  PROPERTY_SPECIFIC_FIELDS.includes(field) || field.startsWith('headline:') || field.startsWith('description:')

// Single-select setup fields whose default is driven by the Platform Field Matrix
// (its defaultValue is guaranteed to be one of the field's available values).
const MATRIX_DEFAULT_FIELDS = new Set([
  'budgetPacing',
  'bidStrategy',
  'optimizationEvent',
  'valueRules',
  'adFormat',
  'destinationType',
])

// Numeric bid fields (stored as plain numeric strings) that get a small, stable per-campaign
// variance so each split (Brand / Generic / per-market) shows slightly different values.
const BID_NUMERIC_FIELDS = new Set(['targetCpa', 'targetRoas', 'maxCpc'])

// Deterministic hash of a string into a small signed percentage in roughly [-15%, +15%]
// (fractional, so adjacent splits rarely collide).
const scopeVariance = (seed: string): number => {
  let hash = 0
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 131 + seed.charCodeAt(i) * (i + 7)) | 0
  }
  // Map to roughly -15..+15 with a fractional step, excluding ~0 so splits differ from the base.
  const pct = ((Math.abs(hash) % 601) - 300) / 20
  return Math.abs(pct) < 1 ? pct + 2.5 : pct
}

// Applies the per-campaign variance to a base numeric string, keeping two decimals and a floor.
const varyBidValue = (base: string, field: string, platformId: string, campaignScope?: string): string => {
  if (!campaignScope || campaignScope === 'default') return base
  const baseNumber = Number(base)
  if (!base.trim() || !Number.isFinite(baseNumber)) return base
  const pct = scopeVariance(`${platformId}|${field}|${campaignScope}`)
  const varied = baseNumber * (1 + pct / 100)
  const floor = field === 'targetRoas' ? 0.1 : 0.01
  return Math.max(varied, floor).toFixed(2)
}

export const defaultFieldValue = (
  platform: CampaignPlatform,
  property: string | null,
  field: string,
  data: CampaignFlowData = campaignFlowData,
  campaignScope?: string,
): string => {
  // Prefer the matrix's per-platform default selected value for matrix-driven single selects.
  if (MATRIX_DEFAULT_FIELDS.has(field)) {
    const matrixDefault = matrixDefaultValue(platform.id, field)
    if (matrixDefault) return matrixDefault
  }

  if (BID_NUMERIC_FIELDS.has(field)) {
    return varyBidValue(platform.bidding[field as BiddingField], field, platform.id, campaignScope)
  }

  if ((BIDDING_FIELDS as readonly string[]).includes(field)) return platform.bidding[field as BiddingField]

  if (field === 'location') return platform.targeting.location
  if (field === 'placements') {
    // Prefer the matrix default ('Platform default inventory'); fall back to the sample inventory.
    return matrixDefaultValue(platform.id, 'placements') ?? platform.targeting.placements
  }
  if (field === 'destination') return platform.creative.destination
  if (field === 'negativeKeywords') return data.keywords.negative.join('\n')
  if (field === 'brandMatch') return data.defaultBrandMatchType
  if (field === 'genericMatch') return data.defaultGenericMatchType
  if (field === 'negativeMatch') return data.defaultNegativeMatchType ?? data.defaultGenericMatchType
  if (field === 'locationType') return defaultLocationLevel
  if (field === 'keywordOptions') {
    // Keyword targeting options apply to Performance Max only (Search themes); empty otherwise.
    const pmax = Boolean(campaignScope && /(^|\|)tactic:Pmax(\||$)/.test(campaignScope))
    if (!pmax) return ''
    const choices = [...matrixValues(platform.id, 'keywordOptions'), ...defaultKeywordOptions(platform)]
    const searchThemes = choices.find(option => /performance max|search theme/i.test(option))
    return searchThemes ?? choices[0] ?? ''
  }
  if (field === 'adFormat') return platform.creative.adFormat
  if (field === 'extensions') return platform.creative.extensions
  if (field === 'tracking') return platform.creative.tracking
  if (field === 'destinationType') {
    if (platform.id === 'meta') return 'Website URL'
    if (platform.id === 'tiktok') return 'Landing page URL'
    if (platform.id === 'linkedin') return 'Landing page URL'
    if (platform.id === 'dv360' || platform.id === 'amadeus-dsp') return 'Landing page URL'
    if (platform.id === 'bing' || platform.id === 'yandex' || platform.id === 'baidu') return 'Final URL'
    if (platform.id === 'cm360') return 'Click-through URL'
    if (
      platform.id === 'wego' ||
      platform.id === 'skyscanner' ||
      platform.id === 'trivago' ||
      platform.id === 'kayak'
    ) {
      return 'Booking engine URL'
    }
    return 'Final URL'
  }

  if (field === 'audience') {
    return property
      ? `Destination ${propertyCity(property)} intenders; Leisure travelers; Business travelers; Lookalike audience`
      : platform.targeting.audience
  }

  // Performance Max campaigns have no manual brand/generic keyword lists.
  const isPmaxScope = Boolean(campaignScope && /(^|\|)tactic:Pmax(\||$)/.test(campaignScope))
  if (field === 'brandKeywords') {
    if (isPmaxScope) return ''
    return property ? propertyBrandKeywords(property) : data.keywords.brand.join('\n')
  }
  if (field === 'genericKeywords') {
    if (isPmaxScope) return ''
    return property ? propertyGenericKeywords(property) : data.keywords.generic.join('\n')
  }

  const [copyField, lang = 'en'] = field.split(':')
  // Search-ad sitelinks (fields sitelinkTitle1..n / sitelinkDesc1..n, per language).
  const sitelinkField = /^sitelink(Title|Desc)(\d+)$/.exec(copyField)
  if (sitelinkField) {
    const searchAd = platform.creative.searchAd
    const links = searchAd ? ((lang !== 'en' && searchAd.localizedSitelinks?.[lang]) || searchAd.sitelinks) : []
    const link = links[Number(sitelinkField[2]) - 1]
    return link ? (sitelinkField[1] === 'Title' ? link.title : link.description) : ''
  }
  if (copyField === 'headline' || copyField === 'description') {
    if (property) {
      const name = hotelName(property, data.basicInfo.advertiser)
      return copyField === 'headline'
        ? `Stay in ${propertyCity(property)} · ${name}`
        : `Discover ${name} in ${propertyCity(property)}. Enjoy comfortable rooms, useful amenities and direct-booking benefits throughout 2027.`
    }
    const localized =
      lang === 'en'
        ? undefined
        : (data.localizedCreative[platform.id]?.[lang] ?? data.localizedCreative['google-ads']?.[lang])
    return localized?.[copyField] ?? platform.creative[copyField]
  }

  return ''
}

export const getFieldValue = (
  draft: CampaignDraft,
  platform: CampaignPlatform,
  property: string | null,
  field: string,
  data: CampaignFlowData = campaignFlowData,
  campaignScope?: string,
): string => {
  const scopedProperty = property && splitsByProperty(draft, platform) ? property : null
  const scopedValue = draft.values[fieldKey(platform.id, scopedProperty, field, campaignScope)]
  if (scopedValue !== undefined) return scopedValue
  if (scopedProperty && !isPropertySpecificField(field)) {
    const platformValue = draft.values[fieldKey(platform.id, null, field, campaignScope)]
    if (platformValue !== undefined) return platformValue
  }
  return defaultFieldValue(platform, scopedProperty, field, data, campaignScope)
}

export const setFieldValue = (
  draft: CampaignDraft,
  platform: CampaignPlatform,
  property: string | null,
  field: string,
  value: string,
  campaignScope?: string,
): CampaignDraft => {
  const scopedProperty = property && splitsByProperty(draft, platform) ? property : null
  return {
    ...draft,
    values: { ...draft.values, [fieldKey(platform.id, scopedProperty, field, campaignScope)]: value },
  }
}

export const splitValuesFor = (
  splitBy: string,
  locations: string[],
  data: CampaignFlowData = campaignFlowData,
): string[] => {
  if (splitBy === 'Property') return data.properties
  if (splitBy === 'Market') return locations.length > 0 ? locations : data.locationOptions
  return data.staticSplitValues[splitBy] ?? []
}

export const tacticsFor = (platform: CampaignPlatform, data: CampaignFlowData = campaignFlowData) =>
  data.channelTactics[platform.group] ? platform.tactics : []

// Short, stable platform codes used in generated campaign names.
const PLATFORM_NAME_CODES: Record<string, string> = {
  'google-ads': 'GADS',
  bing: 'BING',
  dv360: 'DV360',
  'amadeus-dsp': 'ADSP',
  amazon: 'AMZN',
  meta: 'META',
  tiktok: 'TTK',
  linkedin: 'LNKD',
  youtube: 'YT',
  demandgen: 'DGEN',
}

const toNameToken = (value: string) =>
  value
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const platformCode = (platform: CampaignPlatform) => PLATFORM_NAME_CODES[platform.id] ?? toNameToken(platform.name)

// Advertiser prefix + year taken from the configured naming convention (e.g. "HOS_2027_{platform}_{market}").
const namingPrefix = (data: CampaignFlowData = campaignFlowData): string => {
  const convention = data.basicInfo.namingConvention ?? ''
  const staticParts = convention.split('_').filter(part => part && !part.includes('{'))
  return staticParts.length > 0 ? staticParts.join('_') : 'CMP'
}

// Builds a realistic campaign name following {ADVERTISER}_{YEAR}_{PLATFORM}_{SEGMENTS},
// e.g. "HOS_2027_BING_BRAND" or "HOS_2027_META_PROSPECTING_PARIS".
export const buildCampaignName = (
  platform: CampaignPlatform,
  segments: Array<string | null>,
  data: CampaignFlowData = campaignFlowData,
): string => {
  const parts = [
    namingPrefix(data),
    platformCode(platform),
    ...segments.filter(Boolean).map(part => toNameToken(part as string)),
  ]
  return parts.filter(Boolean).join('_')
}

export const campaignsFor = (
  platform: CampaignPlatform,
  splitBy: string,
  locations: string[],
  campaignName: string,
  data: CampaignFlowData = campaignFlowData,
): string[] => {
  const splitValues = splitValuesFor(splitBy, locations, data)
  const tactics = tacticsFor(platform, data)

  if (tactics.length > 0) {
    return tactics.flatMap(tactic =>
      splitValues.length > 0
        ? splitValues.map(value => buildCampaignName(platform, [tactic, value], data))
        : [buildCampaignName(platform, [tactic], data)],
    )
  }

  if (splitValues.length > 0) return splitValues.map(value => buildCampaignName(platform, [value], data))
  return [buildCampaignName(platform, [campaignName], data)]
}

export const campaignsForDraft = (
  draft: CampaignDraft,
  platform: CampaignPlatform,
  data: CampaignFlowData = campaignFlowData,
) =>
  campaignsFor(
    platform,
    getSplitBy(draft, platform),
    splitList(getFieldValue(draft, platform, null, 'location', data)),
    draft.campaignName,
    data,
  )

// The effective second-level ("ad group" / "ad set" / "line item" / "campaign") split value for a
// platform: the user's choice, else the platform's configured default, else none.
export const getAdGroupSplitBy = (draft: CampaignDraft, platform: CampaignPlatform): string =>
  draft.adGroupSplitBy[platform.id] ?? getPlatformSplitConfig(platform.id)?.adGroupDefault ?? ''

// Second-level names under a single campaign, mirroring the campaign naming convention. The second
// split can never be Tactic (that is consumed by the first/campaign level). When the second split
// has values (e.g. Market → markets, Audience → audiences) there is one child per value
// (`<campaign>_<value>`); when it is empty there is exactly ONE child (the campaign itself = a
// single ad group). Display-only — does not change the created campaigns.
export const adGroupsForCampaign = (
  draft: CampaignDraft,
  platform: CampaignPlatform,
  campaignName: string,
  data: CampaignFlowData = campaignFlowData,
): string[] => {
  const adGroupSplitBy = getAdGroupSplitBy(draft, platform)
  if (!adGroupSplitBy || adGroupSplitBy === 'None (By Tactic)') return [campaignName]
  const locations = splitList(getFieldValue(draft, platform, null, 'location', data))
  const values = splitValuesFor(adGroupSplitBy, locations, data)
  if (values.length === 0) return [campaignName]
  return values.map(value => `${campaignName}_${toNameToken(value)}`)
}

export type CampaignSplitScope = { key: string; label: string; property: string | null; tactic: string | null }

export const campaignSplitScopesForDraft = (
  draft: CampaignDraft,
  platform: CampaignPlatform,
  data: CampaignFlowData = campaignFlowData,
): CampaignSplitScope[] => {
  const splitBy = getSplitBy(draft, platform)
  const splitValues = splitValuesFor(splitBy, splitList(getFieldValue(draft, platform, null, 'location', data)), data)
  const tactics = tacticsFor(platform, data)
  const campaignParts = tactics.length > 0 ? tactics : [null]
  const scopeValues: Array<string | null> = splitValues.length > 0 ? splitValues : [null]

  return campaignParts.flatMap(tactic =>
    scopeValues.map(splitValue => {
      const keyParts = [tactic ? `tactic:${tactic}` : '', splitValue ? `split:${splitValue}` : ''].filter(Boolean)
      const labelParts = [platform.name, tactic, splitValue].filter((part): part is string => Boolean(part))
      return {
        key: keyParts.join('|') || 'default',
        label: labelParts.join(' — '),
        property: splitBy === 'Property' ? splitValue : null,
        tactic,
      }
    }),
  )
}

// Writes the same field value to every provided scope on a platform (used by the "apply to all
// campaigns" affordance in the per-campaign editor). Each scope carries its own property/key, so a
// multi-value field (locations, audiences, keywords) is joined before calling this. Folds all the
// writes into a single new draft so one setState re-render reflects every change.
export const applyFieldValueToScopes = (
  draft: CampaignDraft,
  platform: CampaignPlatform,
  field: string,
  value: string,
  scopes: CampaignSplitScope[],
): CampaignDraft =>
  scopes.reduce((next, scope) => setFieldValue(next, platform, scope.property, field, value, scope.key), draft)

export const buildLaunchSummary = (
  draft: CampaignDraft,
  platforms: CampaignPlatform[],
  data: CampaignFlowData = campaignFlowData,
): CampaignLaunchSummary[] =>
  enabledPlatforms(platforms).map(platform => ({
    platform: platform.name,
    key: chipKey(platform.id, data),
    campaigns: campaignsForDraft(draft, platform, data),
  }))

export const totalCampaigns = (summary: CampaignLaunchSummary[]) =>
  summary.reduce((total, entry) => total + entry.campaigns.length, 0)

export const languageTabsFor = (
  locations: string[],
  extraLanguages: string[] = [],
  data: CampaignFlowData = campaignFlowData,
): LocaleInfo[] => {
  const tabs: LocaleInfo[] = [{ lang: 'en', label: 'English' }]
  const addTab = (locale: LocaleInfo | undefined) => {
    if (locale && !tabs.some(tab => tab.lang === locale.lang)) tabs.push(locale)
  }
  locations.forEach(location => addTab(data.localeByLocation[location]))
  extraLanguages.forEach(lang => addTab(data.creativeLanguageCatalog.find(locale => locale.lang === lang)))
  return tabs
}

export const countLines = (value: string) => value.split('\n').filter(line => line.trim()).length

// --- Campaign lifecycle status -----------------------------------------------------------------
// The "Action" chip in both the Summary table (canvas) and the AI chat campaign card — what the
// flow will DO to each campaign for the new plan. Verbs (distinct from the "Current" state column).
// Derived from the campaign's 2027 structure status so the two surfaces stay in sync:
//   added    → 'new'      "Create"  (create from scratch)
//   unpaused → 'update'   "Update"  (reactivate + refresh)
//   exists   → 'update'   "Update"  (live, but the new 2027 flight dates must be applied)
//   paused   → 'paused'   "Pause"   (stop running next year)
// After create, verbs become past-tense (Create → Created, Update → Updated).
// Note: 'noUpdate' ("No change") stays defined for completeness, but no structure status maps to it.
export type CampaignStatus = 'new' | 'update' | 'noUpdate' | 'paused'

// The "Action" column (what the flow will DO to each campaign for the new plan). Verbs here keep it
// distinct from the "Current" column (which shows a state: Live / Paused / New).
export const CAMPAIGN_STATUS_META: Record<CampaignStatus, { label: string; tone: CampaignStatus }> = {
  new: { label: 'Create', tone: 'new' },
  update: { label: 'Update', tone: 'update' },
  noUpdate: { label: 'No change', tone: 'noUpdate' },
  paused: { label: 'Pause', tone: 'paused' },
}

// Action chip meta AFTER a campaign is created/finalized: the verbs become past-tense
// (Create → Created, Update → Updated, Pause → Paused). Tone unchanged.
export const campaignStatusMetaAfterCreate = (status: CampaignStatus): { label: string; tone: CampaignStatus } => {
  const pastLabel: Record<CampaignStatus, string> = {
    new: 'Created',
    update: 'Updated',
    noUpdate: 'No change',
    paused: 'Paused',
  }
  return { label: pastLabel[status], tone: CAMPAIGN_STATUS_META[status].tone }
}

// Maps a 2027 structure cell status to its campaign lifecycle status.
const CAMPAIGN_STATUS_BY_STRUCTURE: Partial<Record<CampaignStructureCellStatus, CampaignStatus>> = {
  added: 'new',
  unpaused: 'update',
  // Existing campaigns continue into 2027 but still need the new flight dates applied, so they are
  // flagged as needing an update (not "No Update").
  exists: 'update',
  paused: 'paused',
}

// Lookup of a structure cell status keyed by `${platformCode}|${tacticToken}` (the same tokens that
// appear in generated campaign names), built from the structure comparison. `pick` chooses which
// year's status to index (2026 = current, 2027 = next).
const structureStatusByNameToken = (
  pick: (row: CampaignStructureRow) => CampaignStructureCellStatus,
  data: CampaignFlowData = campaignFlowData,
) => {
  const map = new Map<string, CampaignStructureCellStatus>()
  campaignStructureComparison(data).forEach(row => {
    const platform = data.platforms.find(entry => entry.id === row.platformId)
    // Same code generated into campaign names: PLATFORM_NAME_CODES by id, else a token of the name.
    const code = PLATFORM_NAME_CODES[row.platformId] ?? toNameToken(platform?.name ?? row.platformId)
    const tacticToken = toNameToken(row.tactic)
    map.set(`${code}|${tacticToken}`, pick(row))
    // Also key by platform alone so single-tactic / no-tactic campaigns still resolve.
    if (!map.has(code)) map.set(code, pick(row))
  })
  return map
}

// Resolves the structure cell status for a generated campaign name (e.g.
// "HOS_2027_META_PROSPECTING_PARIS"): parses the platform code (3rd segment) + tactic token (4th
// segment) and matches the lookup, falling back to the platform-only key.
const resolveStructureStatus = (
  campaignName: string,
  lookup: Map<string, CampaignStructureCellStatus>,
): CampaignStructureCellStatus | undefined => {
  const segments = campaignName.split('_')
  const code = segments[2]
  const tacticToken = segments[3]
  return (code && tacticToken && lookup.get(`${code}|${tacticToken}`)) || (code && lookup.get(code)) || undefined
}

// Lifecycle status (what will change next year), derived from the 2027 structure status.
// The US Push plan is entirely net-new, so every one of its campaigns is 'new' (Action = Create),
// regardless of what the 2026/2027 structure comparison would say.
export const campaignStatusFor = (
  campaignName: string,
  data: CampaignFlowData = campaignFlowData,
  planYear?: MediaPlanYear,
): CampaignStatus => {
  if (planYear === 'us-push') return 'new'
  const structureStatus = resolveStructureStatus(
    campaignName,
    structureStatusByNameToken(row => row.status2027, data),
  )
  return (structureStatus && CAMPAIGN_STATUS_BY_STRUCTURE[structureStatus]) ?? 'new'
}

// --- Current (present-day) campaign status -----------------------------------------------------
// The campaign's state TODAY (the 2026 / current side of the structure comparison), shown as a chip
// next to the campaign-split dropdown and in each step's mini summary. Distinct from the lifecycle
// status above (which describes what changes next year):
//   exists   → 'live'   "Live"    (currently running)
//   paused   → 'paused' "Paused"  (currently paused)
//   unpaused → 'paused' "Paused"  (was paused in 2026; reactivated next year)
//   added / none → 'new' "New"    (does not exist yet in the current setup)
export type CampaignCurrentStatus = 'live' | 'paused' | 'new'

export const CAMPAIGN_CURRENT_STATUS_META: Record<
  CampaignCurrentStatus,
  { label: string; tone: CampaignCurrentStatus }
> = {
  live: { label: 'Live', tone: 'live' },
  paused: { label: 'Paused', tone: 'paused' },
  new: { label: 'New', tone: 'new' },
}

const CAMPAIGN_CURRENT_STATUS_BY_STRUCTURE: Record<CampaignStructureCellStatus, CampaignCurrentStatus> = {
  exists: 'live',
  paused: 'paused',
  unpaused: 'paused',
  added: 'new',
  none: 'new',
}

// Current status for a specific campaign name (uses the 2026 side of the structure comparison).
// US Push campaigns are net-new, so they have no current state ('new').
export const campaignCurrentStatusFor = (
  campaignName: string,
  data: CampaignFlowData = campaignFlowData,
  planYear?: MediaPlanYear,
): CampaignCurrentStatus => {
  if (planYear === 'us-push') return 'new'
  const structureStatus = resolveStructureStatus(
    campaignName,
    structureStatusByNameToken(row => row.status2026, data),
  )
  return structureStatus ? CAMPAIGN_CURRENT_STATUS_BY_STRUCTURE[structureStatus] : 'new'
}

// Current status for a whole platform (used next to the per-platform split dropdown and the
// "All campaigns" view). Aggregates the platform's campaigns, optionally scoped to a single tactic:
// Live if any matching campaign is live, else Paused if any is paused, else New.
export const platformCurrentStatusFor = (
  platformId: string,
  tactic: string | null = null,
  data: CampaignFlowData = campaignFlowData,
  planYear?: MediaPlanYear,
): CampaignCurrentStatus => {
  // US Push is a net-new plan — its platforms have no current (live) campaigns.
  if (planYear === 'us-push') return 'new'
  const statuses = campaignStructureComparison(data)
    .filter(row => row.platformId === platformId && (tactic == null || row.tactic === tactic))
    .map(row => CAMPAIGN_CURRENT_STATUS_BY_STRUCTURE[row.status2026])
  if (statuses.includes('live')) return 'live'
  if (statuses.includes('paused')) return 'paused'
  return 'new'
}

// Builds a short status breakdown caption, e.g. "3 created" or "2 created · 1 updated · 1 paused".
export const campaignStatusBreakdown = (statuses: CampaignStatus[]): string => {
  const verbs: Record<CampaignStatus, string> = {
    new: 'created',
    update: 'updated',
    noUpdate: 'no change',
    paused: 'paused',
  }
  const order: CampaignStatus[] = ['new', 'update', 'noUpdate', 'paused']
  const counts = order
    .map(status => ({ status, count: statuses.filter(item => item === status).length }))
    .filter(entry => entry.count > 0)
  if (counts.length === 0) return '0 created'
  return counts.map(entry => `${entry.count} ${verbs[entry.status]}`).join(' · ')
}


// US-coverage status for a platform/tactic cell, derived from its location targeting (MockStay
// growth flow). 'exists' = US is targeted and live; 'paused' = US-relevant but paused; 'missing' =
// US is excluded from targeting, or there is no location-targeting entry for the cell.
export type UsLocationStatus = 'exists' | 'paused' | 'missing'
export const usLocationStatusFor = (
  platformId: string,
  tactic: string,
  data: CampaignFlowData = campaignFlowData,
): { status: UsLocationStatus; label: string } | null => {
  const map = data.locationTargeting
  if (!map) return null
  const entry = map[`${platformId}|${tactic}`]
  if (!entry) return { status: 'missing', label: 'No US targeting' }
  const usExcluded = /US excluded/i.test(entry.targeting)
  if (usExcluded) return { status: 'missing', label: entry.targeting }
  if (entry.paused) return { status: 'paused', label: entry.targeting }
  return { status: 'exists', label: entry.targeting }
}

// ===== "Create US Push in current plan" (edit-mode) summary =====
// We only create/unpause the US presence that is MISSING. Per platform/tactic, classify from the
// existing location targeting and derive the campaign + US ad-group status:
//   Only US already       -> excluded (nothing to do)
//   missing (no campaign)  -> campaign NEW (Create) + US ad group NEW (Create)
//   paused                 -> campaign UNPAUSE + US ad group UNPAUSE
//   otherwise (live: all-world / markets incl US / markets excl US)
//                          -> campaign EXISTS (Live -> Updated) + a new US ad group (Create)
// 'excluded' campaigns are dropped from the summary; only the US ad group is listed per campaign.
// Edit-mode action: create (new), update (touch existing), or unpause (reactivate a paused one).
export type UsEditAction = 'new' | 'update' | 'unpause'
export type UsEditRowStatus = { current: CampaignCurrentStatus; action: UsEditAction }
export type UsEditCampaignRow = {
  platformId: string
  platformName: string
  tactic: string
  campaignName: string
  campaignNoun: string
  adGroupNoun: string
  campaign: UsEditRowStatus
  // The single US ad group we add/unpause under the campaign.
  usAdGroupName: string
  usAdGroup: UsEditRowStatus
}

// Properties of the picked current-plan (MockStay edit flow). The plan picker maps the active plan
// to year 2026 and the scheduled plan to 2027; resolve the matching propertyMediaPlans entry and
// return its properties. Falls back to all properties if no match.
export const usCurrentPlanProperties = (year: MediaPlanYear, data: CampaignFlowData = campaignFlowData): string[] => {
  const wantStatus = year === '2026' ? 'active' : 'scheduled'
  const plan =
    data.propertyMediaPlans.find(entry => entry.status === wantStatus) ?? data.propertyMediaPlans[0]
  return plan?.properties ?? data.properties
}

// Campaigns (per platform) to show in the current-plan edit summary. `property` is used to name the
// campaign (first-level split is by Property in this flow). Excludes already-US-only tactics.
export const usCurrentPlanEditCampaigns = (
  platformId: string,
  property: string | null = null,
  data: CampaignFlowData = campaignFlowData,
): UsEditCampaignRow[] => {
  const platform = normalizePlatforms(data).find(entry => entry.id === platformId)
  if (!platform) return []
  const splitConfig = getPlatformSplitConfig(platformId)
  const levelNoun = (label: string | undefined, fallback: string) =>
    label?.replace(/^Split\s+/, '').replace(/\s+by$/, '') ?? fallback
  const campaignNoun = levelNoun(splitConfig?.campaignLabel, 'Campaign')
  const adGroupNoun = levelNoun(splitConfig?.adGroupLabel, 'Ad Group')
  const propertyToken = property ? [propertyCity(property)] : []

  const tactics = tacticsFor(platform, data)
  const columns = tactics.length > 0 ? tactics : [platform.name]
  const rows: UsEditCampaignRow[] = []
  columns.forEach(tactic => {
    const entry = data.locationTargeting?.[`${platformId}|${tactic}`]
    const targeting = entry?.targeting ?? ''
    const isOnlyUs = /^only us$/i.test(targeting.trim())
    if (isOnlyUs) return // already US-only -> nothing to create
    const paused = Boolean(entry?.paused)
    const missing = !entry
    const campaign: UsEditRowStatus = missing
      ? { current: 'new', action: 'new' }
      : paused
        ? { current: 'paused', action: 'unpause' }
        : { current: 'live', action: 'update' }
    // We always add/unpause a dedicated US ad group (it does not exist yet as a US-only ad group).
    const usAdGroup: UsEditRowStatus = paused ? { current: 'paused', action: 'unpause' } : { current: 'new', action: 'new' }
    const campaignName = buildCampaignName(platform, [tactic, ...propertyToken], data)
    rows.push({
      platformId,
      platformName: platform.name,
      tactic,
      campaignName,
      campaignNoun,
      adGroupNoun,
      campaign,
      usAdGroupName: `${campaignName}_US`,
      usAdGroup,
    })
  })
  return rows
}

// Campaign split scopes for the current-plan EDIT flow: the normal scopes, minus the tactics that
// are already US-only (those aren't created/edited, so they must not appear in the per-step editor
// either — matching the Summary step, which drops them too).
export const usCurrentPlanEditScopes = (
  draft: CampaignDraft,
  platform: CampaignPlatform,
  data: CampaignFlowData = campaignFlowData,
): CampaignSplitScope[] => {
  const isOnlyUsTactic = (tactic: string | null): boolean => {
    if (!tactic) return false
    const targeting = data.locationTargeting?.[`${platform.id}|${tactic}`]?.targeting ?? ''
    return /^only us$/i.test(targeting.trim())
  }
  return campaignSplitScopesForDraft(draft, platform, data).filter(scope => !isOnlyUsTactic(scope.tactic))
}

// Step-2 "create missing" scopes: the edit scopes restricted to tactics that have NO current
// campaign (missing). These are the US-only campaigns created when the user opts into step 2.
export const usAddMissingScopes = (
  draft: CampaignDraft,
  platform: CampaignPlatform,
  data: CampaignFlowData = campaignFlowData,
): CampaignSplitScope[] =>
  usCurrentPlanEditScopes(draft, platform, data).filter(scope => {
    if (!scope.tactic) return !data.locationTargeting?.[`${platform.id}|${platform.name}`]
    return !data.locationTargeting?.[`${platform.id}|${scope.tactic}`]
  })

// Whether a platform has any missing tactic (used to enable only those platforms in step 2).
export const platformHasMissingTactic = (platformId: string, data: CampaignFlowData = campaignFlowData): boolean => {
  const platform = normalizePlatforms(data).find(entry => entry.id === platformId)
  if (!platform) return false
  const tactics = tacticsFor(platform, data)
  const columns = tactics.length > 0 ? tactics : [platform.name]
  return columns.some(tactic => !data.locationTargeting?.[`${platformId}|${tactic}`])
}

// Resolve the current-plan edit action (new / update / unpause) for a generated campaign name, by
// parsing its tactic token (segment 3 of PREFIX_PLATFORM_TACTIC_...) and classifying from the
// existing US coverage. Returns null when the tactic can't be resolved.
export const usEditActionForCampaignName = (
  platformId: string,
  campaignName: string,
  data: CampaignFlowData = campaignFlowData,
): UsEditAction | null => {
  const platform = normalizePlatforms(data).find(entry => entry.id === platformId)
  if (!platform) return null
  const tactics = tacticsFor(platform, data)
  const tacticColumns = tactics.length > 0 ? tactics : [platform.name]
  const token = campaignName.split('_')[3] ?? ''
  const tactic = tacticColumns.find(candidate => toNameToken(candidate) === token) ?? tacticColumns[0]
  const entry = data.locationTargeting?.[`${platformId}|${tactic}`]
  const targeting = entry?.targeting ?? ''
  if (/^only us$/i.test(targeting.trim())) return null // already US-only (not created)
  if (!entry) return 'new'
  if (entry.paused) return 'unpause'
  return 'update'
}

// US-cleanup action applied to an OLD-setup campaign when the net-new US Push plan takes over the
// US feeder market, so the US isn't double-served. Derived from the campaign's location targeting:
//   'Only US' (US is the whole targeting)          -> 'pause'      (fully replaced by the Push plan)
//   US included alongside other markets            -> 'remove-us'  (keep the other markets)
//   'All world'                                     -> 'no-change'  (global reach stays)
//   US already excluded, OR paused, OR no campaign  -> 'no-change'
export type UsCleanupAction = 'pause' | 'remove-us' | 'add-us' | 'no-change'
// A second-level (market) child of a cleanup campaign. The US market child inherits the campaign's
// action (paused when the campaign is paused, removed when the campaign has US removed); every other
// market is unaffected ('no-change').
export type UsCleanupMarket = { name: string; isUs: boolean; action: UsCleanupAction }
export type UsCleanupRow = {
  channel: string
  platformId: string
  platformName: string
  tactic: string
  targetingLabel: string
  action: UsCleanupAction
  // Two realistic levels: level 1 = the tactic-split campaign (real name), level 2 = the market
  // split (one child per targeted market, real names). Nouns are per-platform display labels.
  campaignName: string
  campaignNoun: string
  marketNoun: string
  markets: UsCleanupMarket[]
}

// Cleanup mode:
//  'new-plan'      — a net-new US Push plan replaces the US: Only-US -> pause, markets+US -> remove.
//  'current-plan'  — a dedicated US ad group was added IN the campaign, so only markets+US drop US;
//                    Only-US tactics were skipped (no new ad group), so they are left unchanged.
//  'add-us'        — "Add US to current targeting": EXISTING campaigns that don't reach the US have
//                    the US added to their targeting (markets-without-US). All-world / US-included /
//                    Only-US stay as-is. (Missing campaigns are handled separately in step 2.)
export type UsCleanupMode = 'new-plan' | 'current-plan' | 'add-us'

// Resolves the cleanup action for a single old-setup cell from its location-targeting entry.
export const usCleanupActionFor = (
  platformId: string,
  tactic: string,
  data: CampaignFlowData = campaignFlowData,
  mode: UsCleanupMode = 'new-plan',
): UsCleanupAction => {
  const entry = data.locationTargeting?.[`${platformId}|${tactic}`]
  // No campaign, or an already-paused one: nothing to clean up.
  if (!entry || entry.paused) return 'no-change'
  const targeting = entry.targeting
  if (mode === 'add-us') {
    // Add US where it's missing from a live campaign (markets without US). Everything that already
    // reaches the US (all-world / US-included / Only-US) is left unchanged.
    if (/US excluded/i.test(targeting)) return 'add-us'
    return 'no-change'
  }
  // US already excluded -> US is not served here, no change needed.
  if (/US excluded/i.test(targeting)) return 'no-change'
  // US included alongside other markets -> drop US from the original (the dedicated US campaign /
  // ad group now owns it). Applies in BOTH remove modes.
  if (/US included/i.test(targeting)) return 'remove-us'
  // Only US: new-plan pauses the whole campaign; current-plan skipped it (no change).
  if (/^only us$/i.test(targeting.trim())) return mode === 'new-plan' ? 'pause' : 'no-change'
  // All world (global) -> leave as-is.
  return 'no-change'
}

// Walks the current (old) campaign-structure setup (channel -> platform -> tactic, same pivot used
// by the campaign-setup structure table) and returns the US-cleanup action for every real cell.
// Used by the final "pause old US campaigns" step of the US Push flow.
// Realistic market list for an old campaign, derived from its targeting label + the advertiser's
// market pool (locationOptions, US first-classed). "Only US" -> [US]; "N markets US included" ->
// N markets including the US; "N markets US excluded" -> N markets without the US; "All world" ->
// the full pool. Deterministic (stable order) so the same campaign always shows the same markets.
const US_MARKET = 'United States'
const marketsForTargeting = (targetingLabel: string, data: CampaignFlowData = campaignFlowData): string[] => {
  const pool = (data.locationOptions ?? []).filter(Boolean)
  const nonUs = pool.filter(market => market !== US_MARKET)
  const label = targetingLabel.trim()
  if (/^only us$/i.test(label)) return [US_MARKET]
  if (/^all world$/i.test(label)) return pool.length > 0 ? pool : [US_MARKET]
  const match = label.match(/^(\d+)\s+markets?/i)
  const count = match ? Math.max(1, Number(match[1])) : 1
  if (/US included/i.test(label)) {
    // US + the next (count-1) non-US markets, in pool order.
    return [US_MARKET, ...nonUs.slice(0, Math.max(0, count - 1))]
  }
  if (/US excluded/i.test(label)) return nonUs.slice(0, count)
  // Fallback (e.g. "No US targeting"): non-US markets.
  return nonUs.slice(0, count)
}

// Walks the current (old) campaign-structure setup (channel -> platform -> tactic, same pivot used
// by the campaign-setup structure table) and returns the US-cleanup for every real campaign.
// Two realistic levels: level 1 = tactic-split campaign, level 2 = market split (one child per
// targeted market). Used by the final "pause old US campaigns" step of the US Push flow.
export const usPushOldSetupCleanup = (
  data: CampaignFlowData = campaignFlowData,
  mode: UsCleanupMode = 'new-plan',
): UsCleanupRow[] => {
  const rows: UsCleanupRow[] = []
  // Second-level noun from the platform split label ("Split Line Items by" -> "Line Items", etc.);
  // we show the market split at that level regardless of the platform's configured split value.
  const levelNoun = (label: string | undefined, fallback: string) =>
    label?.replace(/^Split\s+/, '').replace(/\s+by$/, '') ?? fallback
  campaignStructurePivot(data).forEach(section => {
    section.platforms.forEach(platform => {
      const normalizedPlatform = normalizePlatforms(data).find(entry => entry.id === platform.platformId)
      section.tacticColumns.forEach((tactic, index) => {
        // Only include cells that actually have a 2026 (current/old) campaign.
        if (!platform.y2026.cells[index]) return
        const targetingLabel =
          data.locationTargeting?.[`${platform.platformId}|${tactic}`]?.targeting ?? 'No US targeting'
        const splitConfig = getPlatformSplitConfig(platform.platformId)
        const action = usCleanupActionFor(platform.platformId, tactic, data, mode)
        const campaignName = normalizedPlatform
          ? buildCampaignName(normalizedPlatform, [tactic], data)
          : `${platform.platformName} — ${tactic}`
        // Level 2: one child per targeted market (real names). The US market child inherits the
        // campaign action (paused / removed); other markets are unaffected.
        const markets: UsCleanupMarket[] = marketsForTargeting(targetingLabel, data).map(name => {
          const isUs = name === US_MARKET
          return { name, isUs, action: isUs ? action : 'no-change' }
        })
        // add-us: the US market is being ADDED, so it is a new child alongside the existing markets
        // (it is not part of the current targeting). Append it when it's not already present.
        if (action === 'add-us' && !markets.some(market => market.isUs)) {
          markets.push({ name: US_MARKET, isUs: true, action: 'add-us' })
        }
        rows.push({
          channel: section.channel,
          platformId: platform.platformId,
          platformName: platform.platformName,
          tactic,
          targetingLabel,
          action,
          campaignName,
          campaignNoun: levelNoun(splitConfig?.campaignLabel, 'Campaign'),
          marketNoun: levelNoun(splitConfig?.adGroupLabel, 'Ad Group'),
          markets,
        })
      })
    })
  })
  return rows
}

// "Add US to current targeting" — step 2: the platform/tactics that have NO current campaign (no
// locationTargeting entry), i.e. the ones that would be CREATED as new US-only campaigns if the
// user opts in. Walks the enabled plan platforms × their tactics. Returns one row per missing
// platform/tactic with a generated campaign name.
export type UsMissingCampaign = { platformId: string; platformName: string; tactic: string; campaignName: string }
export const usAddTargetingMissingTactics = (
  year: MediaPlanYear = '2026',
  data: CampaignFlowData = campaignFlowData,
): UsMissingCampaign[] => {
  const platforms = closedWonMediaPlanPlatforms(
    normalizePlatforms(data),
    data,
    resolveMediaPlan(year, data).mediaPlanTable,
  )
  const rows: UsMissingCampaign[] = []
  platforms.forEach(platform => {
    const tactics = tacticsFor(platform, data)
    const columns = tactics.length > 0 ? tactics : [platform.name]
    columns.forEach(tactic => {
      const entry = data.locationTargeting?.[`${platform.id}|${tactic}`]
      if (entry) return // a campaign already exists for this platform/tactic
      rows.push({
        platformId: platform.id,
        platformName: platform.name,
        tactic,
        campaignName: buildCampaignName(platform, [tactic], data),
      })
    })
  })
  return rows
}

// Compact form of a location-targeting label for the dense property table cells, e.g.
//   "5 markets US included" -> "5 markets — US in"
//   "4 markets US excluded" -> "4 markets — No US"
//   "No US targeting"       -> "No US"
//   "All world"             -> unchanged
export const shortTargetingLabel = (label: string): string => {
  if (/^no us targeting$/i.test(label)) return 'No US'
  const included = label.match(/^(\d+)\s+markets?\s+US included$/i)
  if (included) return `${included[1]} markets — US in`
  const excluded = label.match(/^(\d+)\s+markets?\s+US excluded$/i)
  if (excluded) return `${excluded[1]} markets — No US`
  return label
}
