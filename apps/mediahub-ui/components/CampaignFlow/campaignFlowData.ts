import rawData from './data/campaign-data.json'
import rawDataMockstay from './data/campaign-data-mockstay.json'
import { applyLondonerProfile } from './campaignFlowProfiles'
import { LONDONER } from '../../shared/londonerHotel'

export type ChannelGroup = 'Paid search' | 'Display Advertising' | 'Social' | 'Metasearch' | 'Other'

export type PlatformBidding = {
  bidStrategy: string
  optimizationEvent: string
  targetCpa: string
  targetRoas: string
  maxCpc: string
  valueRules: string
  budgetPacing: string
}

export type PlatformTargeting = {
  location: string
  audience: string
  keywords: string
  placements: string
}

// Google-style search ad preview (name + display URL + sitelinks). Optional: platforms without it keep
// the generic "Sponsored hotels" search preview.
export type SearchAdSitelink = { title: string; description: string }
export type SearchAdConfig = {
  displayName: string
  displayUrl: string
  /** Logo shown in the round avatar (served from public/). */
  logo?: string
  sitelinks: SearchAdSitelink[]
  /** Sitelinks per language code (falls back to `sitelinks`). */
  localizedSitelinks?: Record<string, SearchAdSitelink[]>
}
// An HTML5 display banner served from public/ and previewed in an iframe.
export type DisplayBanner = { id: string; size: string; width: number; height: number; path: string }

export type PlatformCreative = {
  searchAd?: SearchAdConfig
  banners?: DisplayBanner[]
  adFormat: string
  headline: string
  description: string
  assets: string
  assetImages?: string[]
  extensions: string
  destination: string
  tracking: string
}

export type RawCampaignPlatform = {
  id: string
  name: string
  group: string
  enabled: boolean
  recommended?: boolean
  splitBy?: string
  tactics?: string[]
  generic?: boolean
  bidding?: PlatformBidding
  targeting?: PlatformTargeting
  creative?: PlatformCreative
}

export type CampaignPlatform = {
  id: string
  name: string
  group: string
  enabled: boolean
  recommended: boolean
  splitBy: string
  tactics: string[]
  bidding: PlatformBidding
  targeting: PlatformTargeting
  creative: PlatformCreative
}

export type CampaignLaunchSummary = {
  platform: string
  key: string
  campaigns: string[]
}

export type LocaleInfo = { lang: string; label: string }

export type LocalizedCopy = { headline: string; description: string }

export type MediaPlanItem = { tactic: string; platforms: string[]; budget: string }

export type MediaPlanGroup = { channel: string; subtotal: string; items: MediaPlanItem[] }

// A selectable media plan variant (e.g. the 2026 plan). Mirrors the shape used by the default
// (2027) plan living in conversation.mediaPlanTable, plus its own name/year/date metadata.
export type MediaPlanTable = { total: string; fees: string; groups: MediaPlanGroup[] }
export type MediaPlanVariant = {
  mediaPlanName: string
  year: string
  startDate: string
  endDate: string
  mediaPlanIntro: string
  mediaPlanTable: MediaPlanTable
}

export type MarketPlanRow = { rank: number; market: string; budget: string }

// ATI (Amadeus Travel Intelligence) growth-opportunity insight — the "View ATI data" response.
export type AtiDestinationRow = {
  destination: string
  // Last-year and current-year demand (e.g. "205M"); cyVsLy is the CY-vs-LY growth percent label (e.g. "25%").
  ly: string
  cy: string
  cyVsLy: string
  // Mapped advertiser property for this destination, or null when none is available.
  property: string | null
}
export type LocationTargetingEntry = {
  // One of: 'Only US' | 'All world' | 'N markets US included' | 'N markets US excluded'.
  targeting: string
  paused: boolean
}

export type PropertyMediaPlan = {
  mediaPlanName: string
  properties: string[]
  // Total media plan budget (e.g. "$200,000"). Optional; shown in the campaign-setup property header.
  planBudget?: string
  // Plan picker details (MockStay "Create US Push in current plan" flow). Optional.
  status?: 'active' | 'scheduled'
  startDate?: string // ISO; displayed dd-Mmm-yyyy
  endDate?: string // ISO
  spend?: string // e.g. "$120,000"; "$0" for a not-yet-started (scheduled) plan
}

export type PropertyInfo = {
  // Per-property budget (e.g. "$38,000") and approx US-market budget share (e.g. "45%").
  budget: string
  usMarketPercent: string
}

export type AtiInsight = {
  analysisSteps: string[]
  intro: string
  chartTitle: string
  // Axis maxima for the dual-axis chart: left = demand (millions), right = growth percent.
  demandAxisMax: number
  growthAxisMaxPercent: number
  destinations: AtiDestinationRow[]
  propertiesTableTitle: string
  propertiesIntro: string
  sourceLabel: string
  primaryActions: string[]
  suggestedPrompts: string[]
}

export type SponsoredHotel = {
  name: string
  price: string
  source: string
  rating: string
  reviews: string
  deal: boolean
  image: string
}

export type CampaignFlowData = {
  basicInfo: {
    advertiser: string
    campaignName: string
    campaignId: string
    mediaPlanName: string
    objective: string
    campaignType: string
    startDate: string
    endDate: string
    namingConvention: string
    totalBudget: number
    manageBudgetByOba: boolean
  }
  objectiveOptions: string[]
  campaignTypeOptions: string[]
  properties: string[]
  propertyMediaPlans: PropertyMediaPlan[]
  // Per platform/tactic location targeting, keyed by `${platformId}|${tactic}`. Optional — only the
  // MockStay growth flow uses it to derive US-coverage status (Exists/Paused/Missing).
  locationTargeting?: Record<string, LocationTargetingEntry>
  // Per-property budget + US-market %, keyed by property name. Optional (MockStay growth flow).
  propertyInfo?: Record<string, PropertyInfo>
  channelOrder: string[]
  channelTactics: Record<string, string[]>
  splitOptions: string[]
  staticSplitValues: Record<string, string[]>
  pmaxRestrictedToPlatformId: string
  locationOptions: string[]
  audienceOptions: string[]
  matchTypes: string[]
  defaultBrandMatchType: string
  defaultGenericMatchType: string
  defaultNegativeMatchType?: string
  keywords: { brand: string[]; generic: string[]; negative: string[] }
  platforms: RawCampaignPlatform[]
  genericPlatformDefaults: {
    splitBy: string
    bidding: PlatformBidding
    targeting: PlatformTargeting
    creative: PlatformCreative
  }
  platformChipKeys: Record<string, string>
  platformChipColors: Record<string, string>
  localeByLocation: Record<string, LocaleInfo>
  creativeLanguageCatalog: LocaleInfo[]
  localizedCreative: Record<string, Record<string, LocalizedCopy>>
  sponsoredHotels: SponsoredHotel[]
  previewSitelinks: string[]
  mediaPlan2026: MediaPlanVariant
  // Net-new US Push plan (MockStay growth flow only) — a third plan on top of 2026/2027. Optional
  // because the Amadeus dataset does not define it.
  usPushPlan?: MediaPlanVariant
  conversation: {
    assistantName: string
    triggerContextMessage: string
    stepAnimationDelayMs: number
    stepFinishDelayMs: number
    initialAnalysisSteps: string[]
    mediaPlanIntro: string
    campaignStructure: {
      analysisSteps: string[]
      intro: string
      exceptions?: { rows: { key: string; status2026: string; status2027: string }[] }
    }
    mediaPlanTable: MediaPlanTable
    primaryActions: string[]
    marketFocus: {
      analysisSteps: string[]
      intro: string
      allPlatformsPerMarket: string[]
      marketPlan: MarketPlanRow[]
      total: string
      closing: string
    }
    atiInsight: AtiInsight
    createMediaPlan: {
      intro: string
      reasoningSteps: string[]
      successTitle: string
      successSubtitle: string
      closing: string
      nextAction: string
    }
    createCampaign: {
      reasoningSteps: string[]
      detailSteps: string[]
      response: string[]
      workspaceTitle: string
    }
    afterLaunch: {
      perPlatformProgressTemplate: string
      successTitleTemplate: string
      changelogTitleTemplate: string
      actions: string[]
      nextStepSuggestion: string
      editWorkspaceTitle: string
    }
  }
  wizardSteps: Array<{ id: string; label: string; perPlatform?: boolean; conditional?: string }>
}

// Advertiser-scoped datasets. The flow UI, structure, and labels are identical across advertisers;
// only the values differ. The active dataset is swapped by the launching notification
// (Amadeus Hotels = Contract/closed-won flow; MockStay Hotels = Performance growth-opportunity flow).
export type FlowAdvertiserKey = 'amadeus' | 'mockstay'

const DATASETS: Record<FlowAdvertiserKey, CampaignFlowData> = {
  amadeus: rawData as unknown as CampaignFlowData,
  mockstay: rawDataMockstay as unknown as CampaignFlowData,
}

let activeAdvertiser: FlowAdvertiserKey = 'amadeus'

// The shared, mutable data object every module imports. Its CONTENTS are swapped in place
// (not the reference) so existing `import { campaignFlowData }` references across the store,
// logic, and components all see the active advertiser's values after a swap.
export const campaignFlowData = { ...DATASETS.amadeus } as CampaignFlowData

const applyActiveDataset = (key: FlowAdvertiserKey) => {
  const next = DATASETS[key]
  // Remove keys that don't exist in the next dataset, then copy all next keys in place.
  Object.keys(campaignFlowData).forEach(k => {
    if (!(k in next)) delete (campaignFlowData as Record<string, unknown>)[k]
  })
  Object.assign(campaignFlowData, next)
}

export const getActiveAdvertiser = (): FlowAdvertiserKey => activeAdvertiser

// Advertiser the user picked in the 'Create campaigns with Max' selection step. Only the Amadeus
// Hotels closed-won dataset exists for it, so we reuse that dataset with the brand name replaced
// everywhere it appears (basic info, plan names, ad copy...). null = the dataset as authored.
let advertiserNameOverride: string | null = null
// Advertiser-specific brief layered on the dataset (see campaignFlowProfiles.ts); null = none.
export type FlowProfile = 'londoner' | null
let flowProfile: FlowProfile = null
export const getFlowProfile = (): FlowProfile => flowProfile
const DATASET_BRAND = 'Amadeus Hotels'

export const setActiveAdvertiser = (key: FlowAdvertiserKey) => {
  // Starting any other flow (notification, prompt landing...) must drop a previous override, so only
  // skip the swap when nothing changes.
  if (activeAdvertiser === key && advertiserNameOverride === null) return
  advertiserNameOverride = null
  flowProfile = null
  activeAdvertiser = key
  applyActiveDataset(key)
}

/**
 * A copy of the Amadeus dataset for an advertiser picked in Max (brand name replaced everywhere), with the
 * Londoner brief applied for The Londoner Hotel. Pure: it does not touch the live flow data.
 */
export const buildAdvertiserFlowData = (name: string, bpid?: string): CampaignFlowData => {
  const escaped = JSON.stringify(name).slice(1, -1)
  const replaced = JSON.parse(JSON.stringify(DATASETS.amadeus).split(DATASET_BRAND).join(escaped)) as CampaignFlowData
  return bpid === LONDONER.bpid ? applyLondonerProfile(replaced) : replaced
}

/** Reuse the Amadeus dataset for the advertiser picked in Max (replaces the brand name everywhere). */
export const setFlowAdvertiserName = (name: string, bpid?: string) => {
  activeAdvertiser = 'amadeus'
  applyActiveDataset('amadeus') // start from the pristine dataset
  advertiserNameOverride = name
  // The Londoner has its own brief (platforms, France targeting, keywords, creatives, splits).
  flowProfile = bpid === LONDONER.bpid ? 'londoner' : null
  Object.assign(campaignFlowData, buildAdvertiserFlowData(name, bpid))
}

export const getCampaignFlowData = (): CampaignFlowData => campaignFlowData
