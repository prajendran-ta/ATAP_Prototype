/**
 * The Londoner Hotel — single source of truth for the demo advertiser's mock data.
 *
 * The prototype has no shared mock layer: the Advertisers list/details and OBA read from live
 * GraphQL, while Campaign Setup, Media Planner and Audience use hand-authored mocks. Every
 * Londoner mock (advertiser injection link, campaign mapping rows, OBA plan, media plan, audiences)
 * imports its ids / names / budgets from HERE so the story stays consistent end to end:
 *
 *   Advertiser -> Platforms -> Media Plan -> OBA -> Campaign Setup -> Audience
 *
 * Prototype only. Currency is GBP (a London property); money is expressed in whole GBP unless a
 * field says `Cents`.
 */

export const LONDONER = {
  /** Backend-style numeric advertiser id (kept far from real ids to avoid collisions). */
  advertiserId: 910077,
  bpid: 'BP-910077',
  name: 'The Londoner Hotel',
  /** "Name (BPID)" label form used by Audience / Media Planner tables. */
  label: 'The Londoner Hotel (BP-910077)',
  status: 'ACTIVE',
  advertiserTypes: 'HOTEL',
  currency: 'GBP',
  /** Contract / plan period (ISO). */
  startDate: '2027-01-01',
  endDate: '2027-12-31',
  /** Display (dd-Mmm-yyyy) period for tables that store display strings. */
  startDateDisplay: '01-Jan-2027',
  endDateDisplay: '31-Dec-2027',
  /** Total contract / media plan / OBA budget (whole GBP). */
  totalBudget: 480000,
  /** Salesforce-style references used by the Media Planner and invoice mapping. */
  bid: '910077',
  opportunityId: 'OPP-910077',
  proposalId: 'PROP-910077',
  shipTo: 'The Londoner Hotel',
} as const

/** Names that must read identically across modules. */
export const LONDONER_NAMES = {
  mediaPlan: 'The Londoner Hotel — 2027',
  obaPlan: 'The Londoner Hotel OBA 2027',
  campaignPrefix: 'The Londoner',
} as const

export type LondonerChannelKey = 'paidSearch' | 'display' | 'video' | 'metasearch'

/**
 * The four channels / platforms of the demo and how the 2027 budget is split between them.
 * `share` sums to 1; `budget` sums to LONDONER.totalBudget.
 */
export const LONDONER_CHANNELS: Record<
  LondonerChannelKey,
  {
    label: string
    /** Platform as shown in Advertiser Details / Audience (the platform-advertiser name). */
    platform: string
    /** Campaign Setup (mapping family) platform key. */
    mappingPlatform: string
    /** DWI-derived reporting platform shown in Campaign Setup. */
    reportingPlatform: string
    /** Campaign Setup tactic label. */
    tactic: string
    share: number
    budget: number
  }
> = {
  paidSearch: {
    label: 'Paid Search - Google',
    platform: 'Google ADS',
    mappingPlatform: 'SA360',
    reportingPlatform: 'Google Ads',
    tactic: 'Paid Search',
    share: 0.4,
    budget: 192000,
  },
  display: {
    label: 'Display - Amadeus DSP',
    platform: 'Amadeus DSP',
    mappingPlatform: 'Amadeus DSP',
    reportingPlatform: 'Amadeus DSP',
    tactic: 'Display',
    share: 0.25,
    budget: 120000,
  },
  video: {
    label: 'Video - DV360',
    platform: 'Google DV360',
    mappingPlatform: 'DV360',
    reportingPlatform: 'DV360',
    tactic: 'Video',
    share: 0.2,
    budget: 96000,
  },
  metasearch: {
    label: 'Metasearch',
    platform: 'Derbysoft',
    mappingPlatform: 'DerbySoft',
    reportingPlatform: 'Google Hotel Ads',
    tactic: 'Metasearch',
    share: 0.15,
    budget: 72000,
  },
}

/** Platform-advertiser connections (Advertiser Details > Platforms, Audience platform chips). */
export interface LondonerPlatformAdvertiser {
  id: string
  platform: string
  advertiserName: string
  advertiserId: string
  connected: boolean
}

export const LONDONER_PLATFORM_ADVERTISERS: LondonerPlatformAdvertiser[] = [
  { id: 'londoner-platform-ads', platform: 'Google ADS', advertiserName: 'The Londoner Hotel Google ADS', advertiserId: 'ADS-910077', connected: true },
  { id: 'londoner-platform-dsp', platform: 'Amadeus DSP', advertiserName: 'The Londoner Hotel Amadeus DSP', advertiserId: 'DSP-910077', connected: true },
  { id: 'londoner-platform-dv360', platform: 'Google DV360', advertiserName: 'The Londoner Hotel Google DV360', advertiserId: 'DV-910077', connected: true },
  { id: 'londoner-platform-derbysoft', platform: 'Derbysoft', advertiserName: 'The Londoner Hotel Derbysoft', advertiserId: 'DS-910077', connected: true },
  { id: 'londoner-platform-whip', platform: 'WHIP', advertiserName: 'The Londoner Hotel WHIP', advertiserId: 'WHIP-910077', connected: true },
]

/** External (platform-side) advertiser ids used by Campaign Setup rows. */
export const LONDONER_EXTERNAL_ADVERTISERS = {
  SA360: { id: '8100771', name: 'The Londoner Hotel' },
  'Amadeus DSP': { id: '8100772', name: 'The Londoner Hotel' },
  DV360: { id: '8100773', name: 'The Londoner Hotel' },
  DerbySoft: { id: '8100774', name: 'The Londoner Hotel' },
  WIHP: { id: '8100775', name: 'The Londoner Hotel' },
} as const

/** Advertiser-level reporting labels (Custom 1/2/3) for Campaign Setup. */
export const LONDONER_REPORTING = { custom1: 'Market', custom2: 'Campaign Objective', custom3: 'Fiscal Year' } as const

/** True when an advertiser name / BPID / id string refers to The Londoner Hotel. */
export function isLondonerAdvertiser(value: string | number | undefined | null): boolean {
  if (value === undefined || value === null) return false
  const v = String(value).trim().toLowerCase()
  return (
    v === String(LONDONER.advertiserId) ||
    v === LONDONER.bpid.toLowerCase() ||
    v === LONDONER.name.toLowerCase() ||
    v.startsWith(`${LONDONER.name.toLowerCase()} (`)
  )
}

/**
 * Naming Convention String for the Londoner's mapped campaigns (UX-5.4):
 *   <advertiser name>_<Tactic>_<Sub-Type>_<Language>_<Custom1>_<Custom2>_<Custom3>
 * (underscore-joined, empty tokens omitted). Custom 1/2/3 follow the advertiser's Reporting
 * labels (LONDONER_REPORTING): Market / Campaign Objective / Fiscal Year.
 */
export function londonerCampaignCustoms(
  tactic: string,
  subType: string,
  language = 'EN',
): { custom1: string; custom2: string; custom3: string } {
  // Market (Custom 1) follows the targeted language: FR -> France, DE -> Germany, otherwise UK.
  const market = language === 'FR' ? 'FR' : language === 'DE' ? 'DE' : 'UK'
  const objective =
    tactic === 'Display' && subType === 'Always-on'
      ? 'Consideration'
      : subType === 'Prospecting'
        ? 'Awareness'
        : 'Conversion'
  return { custom1: market, custom2: objective, custom3: 'FY27' }
}

/** `label` is the name token for the sub-type (defaults to the sub-type itself). */
export function londonerCampaignName(tactic: string, subType: string, language: string, label?: string): string {
  const { custom1, custom2, custom3 } = londonerCampaignCustoms(tactic, subType, language)
  return [LONDONER.name, tactic, label ?? subType, language, custom1, custom2, custom3].filter(Boolean).join('_')
}
