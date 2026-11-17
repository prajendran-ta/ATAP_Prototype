/**
 * The four Londoner campaigns created by 'Create campaigns with Max' (Google Ads Brand + Generic, Amadeus DSP
 * Prospecting + Remarketing). Kept dependency-free so mock data can use it. The names are what the flow
 * generates (buildCampaignName with the 'LON_2027_FR_{platform}' convention): keep them equal if that changes.
 */
export type MaxCampaignRef =
  | { platformId: 'google-ads'; tactic: 'Brand' | 'Generic' }
  | { platformId: 'amadeus-dsp'; tactic: 'Prospecting' | 'Remarketing' }

export const MAX_CAMPAIGN_NAMES = {
  'google-ads|Brand': 'LON_2027_FR_GADS_BRAND',
  'google-ads|Generic': 'LON_2027_FR_GADS_GENERIC',
  'amadeus-dsp|Prospecting': 'LON_2027_FR_ADSP_PROSPECTING',
  'amadeus-dsp|Remarketing': 'LON_2027_FR_ADSP_REMARKETING',
} as const

export const maxCampaignName = (ref: MaxCampaignRef): string =>
  MAX_CAMPAIGN_NAMES[`${ref.platformId}|${ref.tactic}` as keyof typeof MAX_CAMPAIGN_NAMES]
