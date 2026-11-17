import matrixJson from './data/platform-field-matrix.json'

// Per-platform cell from the Unified Campaign Setup Platform Field Matrix.
export type MatrixCell = {
  defaultValue: string | null
  defaultRationale: string
  values: string[]
  instructions: string
  supported: boolean
}

export type MatrixField = {
  setupArea: string
  subLevel: string
  field: string
  platforms: Record<string, MatrixCell>
}

type MatrixFile = {
  platforms: Array<{ id: string; label: string }>
  setupAreas: string[]
  fields: MatrixField[]
}

const matrix = matrixJson as MatrixFile

// Sentinel default used by conditional/optional matrix fields. It is a real, selectable
// value in the matrix ('configure only when required'), but the UI renders it as a
// greyed placeholder rather than a chosen option.
export const NOT_SET = 'Not set'

// Matrix platform ids (the 10 canonical platforms in the matrix).
export type MatrixPlatformId =
  | 'googleAds'
  | 'metaFacebook'
  | 'microsoftAds'
  | 'linkedInAds'
  | 'tiktokAds'
  | 'dv360'
  | 'cm360'
  | 'sa360'
  | 'derbySoft'
  | 'wihp'

// Maps a campaign-flow platform id (e.g. "google-ads", "bing", "amadeus-dsp", "wego")
// to the canonical matrix platform id. Mirrors the alias grouping used elsewhere in the flow.
const FLOW_TO_MATRIX_PLATFORM: Record<string, MatrixPlatformId> = {
  'google-ads': 'googleAds',
  bing: 'microsoftAds',
  meta: 'metaFacebook',
  tiktok: 'tiktokAds',
  linkedin: 'linkedInAds',
  dv360: 'dv360',
  'amadeus-dsp': 'dv360',
  youtube: 'dv360',
  yandex: 'sa360',
  baidu: 'sa360',
  demandgen: 'metaFacebook',
  tencent: 'metaFacebook',
  wechat: 'metaFacebook',
  pinterest: 'metaFacebook',
  snapchat: 'metaFacebook',
  spotify: 'dv360',
  'tripadvisor-display': 'dv360',
  quantcast: 'dv360',
  amazon: 'dv360',
  wego: 'derbySoft',
  skyscanner: 'derbySoft',
  trivago: 'derbySoft',
  kayak: 'derbySoft',
  'tripadvisor-meta': 'derbySoft',
  'google-hotel-meta': 'derbySoft',
  'bing-meta': 'derbySoft',
  expedia: 'wihp',
}

// Maps the campaign-flow field keys (SetupOptionField + bidding keys + a few extras)
// to the matrix "field" label so the matrix can drive values/defaults.
const FLOW_FIELD_TO_MATRIX: Record<string, string> = {
  objective: 'Marketing objective',
  campaignType: 'Campaign type',
  bidStrategy: 'Bid strategy',
  optimizationEvent: 'Optimization event',
  targetCpa: 'Target CPA / cost per result',
  targetRoas: 'Target ROAS / return goal',
  maxCpc: 'Max CPC / bid cap',
  valueRules: 'Value rules / conversion value',
  budgetPacing: 'Budget and pacing',
  locationType: 'Location targeting',
  audience: 'Audience / user list',
  demographics: 'Demographic targeting',
  deviceTargeting: 'Device targeting',
  languageTargeting: 'Language targeting',
  audienceExclusions: 'Audience exclusions',
  brandSafetyExclusions: 'Content and brand-safety exclusions',
  frequencyCap: 'Frequency cap',
  dayparting: 'Dayparting',
  connectionTargeting: 'Connection and carrier targeting',
  proximityTargeting: 'Proximity and radius targeting',
  hotelTargeting: 'Hotel-specific targeting',
  keywordOptions: 'Keywords and match',
  placements: 'Placements / inventory',
  adFormat: 'Ad format',
  extensions: 'Additional assets',
  destinationType: 'Destination / landing page',
  tracking: 'Tracking parameters',
}

const fieldByLabel = new Map(matrix.fields.map(field => [field.field, field]))

export const matrixPlatformId = (flowPlatformId: string): MatrixPlatformId | undefined =>
  FLOW_TO_MATRIX_PLATFORM[flowPlatformId]

// Returns the matrix cell for a flow platform id + flow field key, or undefined
// when the matrix does not cover that platform/field.
export const matrixCell = (flowPlatformId: string, flowField: string): MatrixCell | undefined => {
  const platformId = FLOW_TO_MATRIX_PLATFORM[flowPlatformId]
  const label = FLOW_FIELD_TO_MATRIX[flowField]
  if (!platformId || !label) return undefined
  return fieldByLabel.get(label)?.platforms[platformId]
}

// Per-platform available values from the matrix (empty array when not covered).
// The NOT_SET sentinel is excluded: an unconfigured field is represented by the empty
// placeholder state, not by a selectable "Not set" option in the dropdown.
export const matrixValues = (flowPlatformId: string, flowField: string): string[] =>
  (matrixCell(flowPlatformId, flowField)?.values ?? []).filter(value => value !== NOT_SET)

// Per-platform default selected value from the matrix (null when unsupported / not covered).
export const matrixDefaultValue = (flowPlatformId: string, flowField: string): string | null =>
  matrixCell(flowPlatformId, flowField)?.defaultValue ?? null

// Whether the matrix marks this field supported on this platform.
export const matrixSupported = (flowPlatformId: string, flowField: string): boolean | undefined =>
  matrixCell(flowPlatformId, flowField)?.supported

// All distinct default values for a campaign-level field across platforms (used for
// the shared objective/campaign-type selects that are not platform-scoped).
export const matrixAllValues = (flowField: string): string[] => {
  const label = FLOW_FIELD_TO_MATRIX[flowField]
  const field = label ? fieldByLabel.get(label) : undefined
  if (!field) return []
  return [...new Set(Object.values(field.platforms).flatMap(cell => (cell.supported ? cell.values : [])))].filter(
    value => value !== NOT_SET,
  )
}
