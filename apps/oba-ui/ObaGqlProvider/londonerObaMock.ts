/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * The Londoner Hotel — OBA (Omnichannel Budget Allocation) mock data.
 *
 * Two plans (same group structure), served by `obaMockLink` without touching the backend:
 *  - "The Londoner Hotel OBA 2027" (Scheduled, 2027-01-01..2027-12-31) — cross-module plan, matches
 *    the Media Plan period; nothing is spent yet (all months are in the future).
 *  - "The Londoner Hotel OBA 2026" (Live, 2026-01-01..2026-12-31) — carries spend history so the
 *    Details / Budget Distribution screens have realistic numbers.
 *
 * Money is Int53 CENTS (GBP whole pounds x100). Months are 'YYYY-MM'. Dates are 'YYYY-MM-DD'.
 * "Today" for the demo is pinned to MOCK_TODAY so past / current / future flags are deterministic.
 *
 * Ids are NUMERIC STRINGS on purpose: the OBA pages call `+planId` / `Number(planId)`, so a
 * non-numeric id such as 'oba-plan-londoner-2027' would turn into NaN.
 *
 * Metasearch is NOT part of OBA (billed outside it): OBA total = Paid Search + Display + Video.
 *
 * Besides the Londoner's two plans, ONE plan per demo advertiser (shared/demoAdvertisers.ts) is
 * generated below ("demo plans"): ids `${advertiserId}1` (e.g. '9200011'), group ids `${planId}${n}`.
 * Live demo plans carry spend history up to MOCK_TODAY (same buildSpend as the Londoner 2026 plan);
 * Scheduled demo plans (2027) have no spend.
 */
import { LONDONER, LONDONER_CHANNELS, LONDONER_NAMES } from '@mediahub/mediahub-ui/shared/londonerHotel'
import { mappedCampaigns } from '@mediahub/mediahub-ui/pages/CampaignMapping/mockData/campaigns'
import {
  DEMO_ADVERTISERS,
  DEMO_CHANNEL_INFO,
  activeChannels,
  type DemoAdvertiser,
  type DemoChannelKey,
} from '@mediahub/mediahub-ui/shared/demoAdvertisers'
import {
  AdvertiserPlanStatusEnum,
  CampaignStatusEnum,
  ChannelEnum,
  DeliveryPlatformEnum,
  DispatchModeEnum,
  GroupStatusEnum,
  KpiEnum,
  MappingPlatformEnum,
  TacticEnum,
} from '@mediahub/oba-ui/graphql/generated/oba-enums'

/** Pinned "today" (Nov 16 2026) used to compute past / current / future month flags. */
export const MOCK_TODAY = '2026-11-16'
const MOCK_TODAY_MONTH = MOCK_TODAY.slice(0, 7)
const MOCK_TODAY_DAY = Number(MOCK_TODAY.slice(8, 10))

/**
 * OBA total budget (whole GBP) = Paid Search 192,000 + Display 120,000 + Video 96,000.
 * The full 480,000 contract (incl. 72,000 Metasearch) lives in the Media Plan, not in OBA.
 */
export const OBA_TOTAL_BUDGET = 408000
/** Budget of the 2026 plan (whole GBP). */
export const OBA_2026_TOTAL_BUDGET = 420000

export const LONDONER_OBA_PLAN_ID_2027 = '9100771'
export const LONDONER_OBA_PLAN_ID_2026 = '9100772'
export const LONDONER_OBA_PLAN_NAME_2026 = 'The Londoner Hotel OBA 2026'
export const LONDONER_OBA_PLAN_IDS = [LONDONER_OBA_PLAN_ID_2027, LONDONER_OBA_PLAN_ID_2026]
export const LONDONER_ADVERTISER_ID = String(LONDONER.advertiserId)

const CENTS = 100
const TS = '__typename'

// ---------------------------------------------------------------------------------------------
// State types (mutable, in-memory; reset on page reload)
// ---------------------------------------------------------------------------------------------
export interface MockBundle {
  id: string
  version: number
  channel: ChannelEnum
  deliveryPlatform: DeliveryPlatformEnum
  mappingPlatform: MappingPlatformEnum
  platform: { id: string; name: string }
  tactic: TacticEnum
  vendorCampaignIds: string[]
  lowerBoundPercent: number | null
  upperBoundPercent: number | null
}

export interface MockCampaign {
  id: string
  name: string
  bundleId: string
  /** Relative share of the group's budget used to derive recommendations / spend. */
  weight: number
  status: CampaignStatusEnum
  /** Status to restore on "Resume". */
  resumeStatus: CampaignStatusEnum
  statusMessage: string
  lastUpdated: string
  previousUpdated: string
}

export interface MockGroup {
  id: string
  version: number
  name: string
  status: GroupStatusEnum
  kpi: KpiEnum
  specs: string
  /** Monthly budgets in cents, aligned with the plan's period months. */
  monthBudgetCents: number[]
  /** Monthly spend in cents keyed by 'YYYY-MM' (missing = 0). */
  monthSpentCents: Record<string, number>
  bundles: MockBundle[]
  campaigns: MockCampaign[]
  channelBounds: Partial<Record<ChannelEnum, { lower: number | null; upper: number | null }>>
}

export interface MockPlan {
  id: string
  version: number
  name: string
  status: AdvertiserPlanStatusEnum
  unpausedStatus: AdvertiserPlanStatusEnum
  currency: string
  /** Advertiser that owns the plan (synthetic id; the real backend id is unknown to the mock). */
  advertiser: { id: string; name: string; bpid: string }
  marginPercent: number
  managementFeePercent: number
  dispatchOptIn: boolean
  period: { startDate: string; endDate: string }
  totalBudgetCents: number
  groups: MockGroup[]
}

// ---------------------------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------------------------
export const monthKeysOf = (period: { startDate: string; endDate: string }): string[] => {
  let [y, m] = period.startDate.slice(0, 7).split('-').map(Number)
  const [ey, em] = period.endDate.slice(0, 7).split('-').map(Number)
  const out: string[] = []
  while ((y < ey || (y === ey && m <= em)) && out.length < 120) {
    out.push(`${y}-${String(m).padStart(2, '0')}`)
    m += 1
    if (m > 12) {
      m = 1
      y += 1
    }
  }
  return out
}

/** London hotel seasonality (per mille): spring / summer peak, Christmas-market November. */
const SEASONALITY = [60, 60, 80, 85, 90, 90, 95, 90, 95, 85, 95, 75]

/**
 * Splits whole currency units across the plan's months by calendar-month seasonality; the result
 * sums EXACTLY to `units` (cents). For a Jan-Dec plan this equals the original Londoner split.
 */
const splitSeasonal = (units: number, months: string[]): number[] => {
  const weights = months.map(m => SEASONALITY[Number(m.slice(5, 7)) - 1] ?? 80)
  const total = weights.reduce((a, b) => a + b, 0) || 1
  const parts = weights.map(w => Math.floor((units * w) / total))
  let diff = units - parts.reduce((a, b) => a + b, 0)
  for (let i = 0; diff > 0 && parts.length; i = (i + 1) % parts.length, diff -= 1) parts[i] += 1
  return parts.map(p => p * CENTS)
}

const PACING = [0.99, 1.01, 0.98, 1.0, 0.97, 1.02, 0.99, 1.01, 0.98, 1.0]

/** Deterministic spend history for a plan year relative to MOCK_TODAY (past months ~on pace). */
const buildSpend = (months: string[], budgetCents: number[], groupIndex: number): Record<string, number> => {
  const spent: Record<string, number> = {}
  months.forEach((month, i) => {
    if (month < MOCK_TODAY_MONTH) {
      const pacing = PACING[(i + groupIndex) % PACING.length]
      spent[month] = Math.round((budgetCents[i] * pacing) / CENTS) * CENTS
    } else if (month === MOCK_TODAY_MONTH) {
      const daysInMonth = 30
      const elapsed = Math.max(0, MOCK_TODAY_DAY - 1) / daysInMonth
      spent[month] = Math.round((budgetCents[i] * elapsed * 0.98) / CENTS) * CENTS
    }
  })
  return spent
}

// ---------------------------------------------------------------------------------------------
// Fixture definition
// ---------------------------------------------------------------------------------------------
const PLATFORMS = {
  googleAds: { id: '91007701', name: 'Google Ads' },
  amadeusDsp: { id: '91007702', name: 'Amadeus DSP' },
  dv360: { id: '91007703', name: 'DV360' },
}

/** Campaign ids / names ARE the Londoner rows in Campaign Setup (cm-ln0xx): names follow its Naming Convention String. */
const setupName = (id: string) => mappedCampaigns.find(c => c.id === id)?.campaignName ?? id
export const LONDONER_CAMPAIGN_CATALOG: { id: string; name: string }[] = [
  'cm-ln001', 'cm-ln002', 'cm-ln003', 'cm-ln004', 'cm-ln009', 'cm-ln010', 'cm-ln011', 'cm-ln013', 'cm-ln014',
].map(id => ({ id, name: setupName(id) }))
/** id -> name for every mock campaign (Londoner catalog + generated demo campaigns). */
const CAMPAIGN_NAMES = new Map<string, string>(LONDONER_CAMPAIGN_CATALOG.map(c => [c.id, c.name]))
const campaignName = (id: string) => CAMPAIGN_NAMES.get(id) ?? id

interface CampaignDef {
  id: string
  weight: number
  status: CampaignStatusEnum
  message: string
}
interface BundleDef {
  tactic: TacticEnum
  campaigns: CampaignDef[]
}
interface GroupDef {
  name: string
  channel: ChannelEnum
  delivery: DeliveryPlatformEnum
  mapping: MappingPlatformEnum
  platform: { id: string; name: string }
  kpi: KpiEnum
  specs: string
  bundles: BundleDef[]
  pounds2027: number
  pounds2026: number
  bounds: { lower: number; upper: number }
}

const ok = (id: string, weight: number): CampaignDef => ({ id, weight, status: CampaignStatusEnum.Active, message: '' })

const GROUP_DEFS: GroupDef[] = [
  {
    name: LONDONER_CHANNELS.paidSearch.label,
    channel: ChannelEnum.PaidSearch,
    delivery: DeliveryPlatformEnum.GoogleAds,
    mapping: MappingPlatformEnum.Sa360,
    platform: PLATFORMS.googleAds,
    kpi: KpiEnum.Conversions,
    specs:
      'Brand protection, non-brand and Performance Max for The Londoner Hotel (London). ' +
      'Metasearch (GBP 72,000) is billed outside OBA and is not part of this allocation.',
    bundles: [
      { tactic: TacticEnum.Brand, campaigns: [ok('cm-ln001', 25)] },
      {
        tactic: TacticEnum.Generic,
        campaigns: [
          ok('cm-ln002', 30),
          { id: 'cm-ln004', weight: 10, status: CampaignStatusEnum.Paused, message: 'Recommendation paused' },
        ],
      },
      {
        tactic: TacticEnum.Pmax,
        campaigns: [
          {
            id: 'cm-ln003',
            weight: 35,
            status: CampaignStatusEnum.Warning,
            message: 'Campaign is limited by the platform daily budget cap',
          },
        ],
      },
    ],
    pounds2027: LONDONER_CHANNELS.paidSearch.budget,
    pounds2026: 197000,
    bounds: { lower: 90, upper: 110 },
  },
  {
    name: LONDONER_CHANNELS.display.label,
    channel: ChannelEnum.Display,
    // No Amadeus DSP value exists in DeliveryPlatformEnum / MappingPlatformEnum: DV360 is used for the
    // enum fields and the platform label ({ name: 'Amadeus DSP' }) carries the real name.
    delivery: DeliveryPlatformEnum.Dv360,
    mapping: MappingPlatformEnum.Dv360,
    platform: PLATFORMS.amadeusDsp,
    kpi: KpiEnum.Clicks,
    specs: 'Prospecting and remarketing display through Amadeus DSP targeting UK and EU leisure travellers.',
    bundles: [
      { tactic: TacticEnum.Prospecting, campaigns: [ok('cm-ln009', 50)] },
      {
        tactic: TacticEnum.Remarketing,
        campaigns: [
          {
            id: 'cm-ln010',
            weight: 30,
            status: CampaignStatusEnum.Manual,
            message: 'Budget must be updated manually in Amadeus DSP',
          },
        ],
      },
      { tactic: TacticEnum.DemandGen, campaigns: [ok('cm-ln011', 20)] },
    ],
    pounds2027: LONDONER_CHANNELS.display.budget,
    pounds2026: 123000,
    bounds: { lower: 85, upper: 115 },
  },
  {
    name: LONDONER_CHANNELS.video.label,
    channel: ChannelEnum.YouTube,
    delivery: DeliveryPlatformEnum.Dv360,
    mapping: MappingPlatformEnum.Dv360,
    platform: PLATFORMS.dv360,
    kpi: KpiEnum.Clicks,
    specs: 'Upper-funnel YouTube video (DV360) with remarketing to engaged viewers.',
    bundles: [
      { tactic: TacticEnum.Prospecting, campaigns: [ok('cm-ln013', 65)] },
      {
        tactic: TacticEnum.Remarketing,
        campaigns: [{ id: 'cm-ln014', weight: 35, status: CampaignStatusEnum.Paused, message: 'Recommendation paused' }],
      },
    ],
    pounds2027: LONDONER_CHANNELS.video.budget,
    pounds2026: 100000,
    bounds: { lower: 80, upper: 120 },
  },
]

const createPlan = (year: 2026 | 2027): MockPlan => {
  const planId = year === 2027 ? LONDONER_OBA_PLAN_ID_2027 : LONDONER_OBA_PLAN_ID_2026
  const period = { startDate: `${year}-01-01`, endDate: `${year}-12-31` }
  const months = monthKeysOf(period)
  const status = year === 2027 ? AdvertiserPlanStatusEnum.Scheduled : AdvertiserPlanStatusEnum.Live
  const updated = year === 2027 ? '2026-11-16' : '2026-11-15'
  const groups: MockGroup[] = GROUP_DEFS.map((def, gi) => {
    const groupId = `${planId}${gi + 1}`
    const monthBudgetCents = splitSeasonal(year === 2027 ? def.pounds2027 : def.pounds2026, months)
    const bundles: MockBundle[] = []
    const campaigns: MockCampaign[] = []
    def.bundles.forEach((b, bi) => {
      const bundleId = `${groupId}${bi + 1}`
      bundles.push({
        id: bundleId,
        version: 1,
        channel: def.channel,
        deliveryPlatform: def.delivery,
        mappingPlatform: def.mapping,
        platform: def.platform,
        tactic: b.tactic,
        vendorCampaignIds: b.campaigns.map(c => c.id),
        lowerBoundPercent: null,
        upperBoundPercent: null,
      })
      b.campaigns.forEach(c =>
        campaigns.push({
          id: c.id,
          name: campaignName(c.id),
          bundleId,
          weight: c.weight,
          status: c.status,
          resumeStatus: c.status === CampaignStatusEnum.Paused ? CampaignStatusEnum.Active : c.status,
          statusMessage: c.message,
          lastUpdated: updated,
          previousUpdated: '2026-11-14',
        }),
      )
    })
    return {
      id: groupId,
      version: 1,
      name: def.name,
      status: GroupStatusEnum.Active,
      kpi: def.kpi,
      specs: def.specs,
      monthBudgetCents,
      monthSpentCents: year === 2026 ? buildSpend(months, monthBudgetCents, gi) : {},
      bundles,
      campaigns,
      channelBounds: { [def.channel]: { lower: def.bounds.lower, upper: def.bounds.upper } },
    }
  })
  return {
    id: planId,
    version: 1,
    name: year === 2027 ? LONDONER_NAMES.obaPlan : LONDONER_OBA_PLAN_NAME_2026,
    status,
    unpausedStatus: status,
    currency: LONDONER.currency,
    advertiser: { id: LONDONER_ADVERTISER_ID, name: LONDONER.name, bpid: LONDONER.bpid },
    marginPercent: 12.5,
    managementFeePercent: 10,
    dispatchOptIn: false,
    period,
    totalBudgetCents: (year === 2027 ? OBA_TOTAL_BUDGET : OBA_2026_TOTAL_BUDGET) * CENTS,
    groups,
  }
}


// ---------------------------------------------------------------------------------------------
// Demo advertisers: one generated plan each
// ---------------------------------------------------------------------------------------------
type ObaChannelKey = Exclude<DemoChannelKey, 'metasearch'>

interface DemoChannelSpec {
  channel: ChannelEnum
  delivery: DeliveryPlatformEnum
  mapping: MappingPlatformEnum
  platform: { id: string; name: string }
  kpi: KpiEnum
  bounds: { lower: number; upper: number }
  specs: string
  /** [tactic, [campaign name suffix, weight][]] — only tactics the UI dropdowns allow. */
  bundles: [TacticEnum, [string, number][]][]
}

const DEMO_CHANNEL_SPECS: Record<ObaChannelKey, DemoChannelSpec> = {
  paidSearch: {
    channel: ChannelEnum.PaidSearch,
    delivery: DeliveryPlatformEnum.GoogleAds,
    mapping: MappingPlatformEnum.Sa360,
    platform: PLATFORMS.googleAds,
    kpi: KpiEnum.Conversions,
    bounds: { lower: 90, upper: 110 },
    specs: 'Brand protection, non-brand and generic paid search (Google Ads / SA360). Metasearch is billed outside OBA.',
    bundles: [
      [TacticEnum.Brand, [['Paid Search_Brand_EN', 25]]],
      [
        TacticEnum.Generic,
        [
          ['Paid Search_Non-Brand_EN', 40],
          ['Paid Search_Generic_EN', 35],
        ],
      ],
    ],
  },
  display: {
    channel: ChannelEnum.Display,
    // No Amadeus DSP value exists in the enums: DV360 is used for the enum fields (as for the Londoner).
    delivery: DeliveryPlatformEnum.Dv360,
    mapping: MappingPlatformEnum.Dv360,
    platform: PLATFORMS.amadeusDsp,
    kpi: KpiEnum.Clicks,
    bounds: { lower: 85, upper: 115 },
    specs: 'Prospecting and remarketing display through Amadeus DSP.',
    bundles: [
      [TacticEnum.Prospecting, [['Display_Prospecting_EN', 55]]],
      [TacticEnum.Remarketing, [['Display_Remarketing_EN', 45]]],
    ],
  },
  video: {
    channel: ChannelEnum.YouTube,
    delivery: DeliveryPlatformEnum.Dv360,
    mapping: MappingPlatformEnum.Dv360,
    platform: PLATFORMS.dv360,
    kpi: KpiEnum.Clicks,
    bounds: { lower: 80, upper: 120 },
    specs: 'Upper-funnel YouTube video (DV360) with remarketing to engaged viewers.',
    bundles: [
      [TacticEnum.Prospecting, [['Video_Prospecting_EN', 65]]],
      [TacticEnum.Remarketing, [['Video_Remarketing_EN', 35]]],
    ],
  },
}

/** Rotating "variety" status (one campaign per demo plan is not plain Active). */
const demoStatusFor = (advIndex: number, suffix: string): { status: CampaignStatusEnum; message: string } => {
  const kind = advIndex % 3
  if (kind === 0 && suffix === 'Paid Search_Non-Brand_EN') {
    return { status: CampaignStatusEnum.Warning, message: 'Campaign is limited by the platform daily budget cap' }
  }
  if (kind === 1 && suffix === 'Display_Remarketing_EN') {
    return { status: CampaignStatusEnum.Paused, message: 'Recommendation paused' }
  }
  if (kind === 2 && suffix === 'Display_Remarketing_EN') {
    return { status: CampaignStatusEnum.Manual, message: 'Budget must be updated manually in Amadeus DSP' }
  }
  return { status: CampaignStatusEnum.Active, message: '' }
}

export const demoPlanId = (adv: DemoAdvertiser): string => `${adv.advertiserId}1`

const createDemoPlan = (adv: DemoAdvertiser, advIndex: number): MockPlan => {
  const planId = demoPlanId(adv)
  const period = { startDate: adv.startDate, endDate: adv.endDate }
  const months = monthKeysOf(period)
  const live = adv.obaStatus === 'Live'
  const status = live ? AdvertiserPlanStatusEnum.Live : AdvertiserPlanStatusEnum.Scheduled
  const updated = live ? '2026-11-15' : '2026-11-16'
  let campaignSeq = 0
  const channels = activeChannels(adv).filter(
    (c): c is ObaChannelKey => DEMO_CHANNEL_INFO[c].inOba,
  )
  const groups: MockGroup[] = channels.map((channelKey, gi) => {
    const spec = DEMO_CHANNEL_SPECS[channelKey]
    const groupId = `${planId}${gi + 1}`
    const monthBudgetCents = splitSeasonal(adv.budgets[channelKey], months)
    const bundles: MockBundle[] = []
    const campaigns: MockCampaign[] = []
    spec.bundles.forEach(([tactic, defs], bi) => {
      const bundleId = `${groupId}${bi + 1}`
      const vendorCampaignIds: string[] = []
      defs.forEach(([suffix, weight]) => {
        campaignSeq += 1
        const id = `oba-${adv.key}-${campaignSeq}`
        const name = `${adv.campaignPrefix}_${suffix}`
        CAMPAIGN_NAMES.set(id, name)
        vendorCampaignIds.push(id)
        const { status: cStatus, message } = demoStatusFor(advIndex, suffix)
        campaigns.push({
          id,
          name,
          bundleId,
          weight,
          status: cStatus,
          resumeStatus: cStatus === CampaignStatusEnum.Paused ? CampaignStatusEnum.Active : cStatus,
          statusMessage: message,
          lastUpdated: updated,
          previousUpdated: '2026-11-14',
        })
      })
      bundles.push({
        id: bundleId,
        version: 1,
        channel: spec.channel,
        deliveryPlatform: spec.delivery,
        mappingPlatform: spec.mapping,
        platform: spec.platform,
        tactic,
        vendorCampaignIds,
        lowerBoundPercent: null,
        upperBoundPercent: null,
      })
    })
    return {
      id: groupId,
      version: 1,
      name: DEMO_CHANNEL_INFO[channelKey].label,
      status: GroupStatusEnum.Active,
      kpi: spec.kpi,
      specs: spec.specs,
      monthBudgetCents,
      monthSpentCents: live ? buildSpend(months, monthBudgetCents, gi) : {},
      bundles,
      campaigns,
      channelBounds: { [spec.channel]: { lower: spec.bounds.lower, upper: spec.bounds.upper } },
    }
  })
  return {
    id: planId,
    version: 1,
    name: adv.obaPlanName,
    status,
    unpausedStatus: status,
    currency: adv.currency,
    advertiser: { id: String(adv.advertiserId), name: adv.name, bpid: adv.bpid },
    marginPercent: 12.5,
    managementFeePercent: 10,
    dispatchOptIn: false,
    period,
    totalBudgetCents: adv.obaBudget * CENTS,
    groups,
  }
}

/**
 * In-memory plan state (mutations update it; lost on reload).
 * Order matters: the Londoner plans first, then the demo plans in DEMO_ADVERTISERS order.
 */
const plans: MockPlan[] = [createPlan(2027), createPlan(2026), ...DEMO_ADVERTISERS.map(createDemoPlan)]

/** True for any mock plan id (Londoner or demo advertiser). */
export const isMockPlanId = (id: unknown): boolean => id != null && plans.some(p => p.id === String(id))
/** True for the (synthetic) advertiser id of the Londoner or any demo advertiser. */
export const isMockAdvertiserId = (id: unknown): boolean =>
  id != null && (String(id) === LONDONER_ADVERTISER_ID || DEMO_ADVERTISERS.some(a => String(a.advertiserId) === String(id)))
export const getPlans = (): MockPlan[] => plans
/** Plans of one advertiser by BPID: the Londoner has two, a demo advertiser one, anyone else none. */
export const getPlansForAdvertiser = (bpid: string): MockPlan[] => {
  const key = String(bpid ?? '').trim().toLowerCase()
  return plans.filter(p => p.advertiser.bpid.toLowerCase() === key)
}
export const getPlan = (id: unknown): MockPlan | undefined => plans.find(p => p.id === String(id))
export const findGroup = (id: unknown): { plan: MockPlan; group: MockGroup } | undefined => {
  for (const plan of plans) {
    const group = plan.groups.find(g => g.id === String(id))
    if (group) return { plan, group }
  }
  return undefined
}

// ---------------------------------------------------------------------------------------------
// Derived numbers
// ---------------------------------------------------------------------------------------------
const sum = (values: number[]) => values.reduce((a, b) => a + b, 0)

const groupSpent = (group: MockGroup) => sum(Object.values(group.monthSpentCents))
const planSpent = (plan: MockPlan) => sum(plan.groups.map(groupSpent))
const planAllotted = (plan: MockPlan) => sum(plan.groups.map(g => sum(g.monthBudgetCents)))

const budget = (budgetCents: number, spentCents: number, allottedCents = budgetCents): any => ({
  [TS]: 'Budget',
  allocatedCents: allottedCents,
  allotedCents: allottedCents,
  allottedCents,
  budgetCents,
  originalBudgetCents: budgetCents,
  originalCents: budgetCents,
  overSpentCents: Math.max(0, spentCents - budgetCents),
  spentCents,
  unSpentCents: Math.max(0, budgetCents - spentCents),
})

const idName = (id: string, name: string): any => ({ [TS]: 'IdAndName', id, name, notFound: false })

/** Index of the month recommendations refer to: current month, else the first future month. */
const referenceMonthIndex = (months: string[]): number => {
  const current = months.indexOf(MOCK_TODAY_MONTH)
  if (current >= 0) return current
  return months.findIndex(m => m > MOCK_TODAY_MONTH)
}

// ---------------------------------------------------------------------------------------------
// Entity builders (full objects; the link prunes them to each query's selection set)
// ---------------------------------------------------------------------------------------------
const advertiserEntity = (advertiser: MockPlan['advertiser']): any => ({
  [TS]: 'AdvertiserName',
  id: advertiser.id,
  bid: advertiser.id,
  name: advertiser.name,
  bpid: advertiser.bpid,
  notFound: false,
})

const periodEntity = (plan: MockPlan): any => ({ [TS]: 'Period', ...plan.period })

const planTotalBudget = (plan: MockPlan): any =>
  budget(plan.totalBudgetCents, planSpent(plan), planAllotted(plan))

const monthBudgetEntities = (plan: MockPlan, group: MockGroup): any[] =>
  monthKeysOf(plan.period).map((month, i) => ({
    [TS]: 'MonthBudget',
    month,
    past: month < MOCK_TODAY_MONTH,
    current: month === MOCK_TODAY_MONTH,
    future: month > MOCK_TODAY_MONTH,
    budget: budget(group.monthBudgetCents[i] ?? 0, group.monthSpentCents[month] ?? 0),
  }))

const bundleEntity = (group: MockGroup, bundle: MockBundle): any => ({
  [TS]: 'BundlePlan',
  id: bundle.id,
  version: bundle.version,
  groupId: group.id,
  group: idName(group.id, group.name),
  channel: bundle.channel,
  deliveryPlatform: bundle.deliveryPlatform,
  mappingPlatform: bundle.mappingPlatform,
  platform: idName(bundle.platform.id, bundle.platform.name),
  tactic: bundle.tactic,
  vendorCampaignIds: bundle.vendorCampaignIds,
  vendorCampaigns: bundle.vendorCampaignIds.map(id => ({
    [TS]: 'VendorCampaign',
    Id: id,
    name: campaignName(id),
    Status: group.campaigns.find(c => c.id === id)?.status ?? CampaignStatusEnum.Active,
  })),
  lowerBoundPercent: bundle.lowerBoundPercent,
  upperBoundPercent: bundle.upperBoundPercent,
  updated: null,
})

const channelSettings = (group: MockGroup, channel: ChannelEnum): any => {
  const bounds = group.channelBounds[channel]
  return bounds ? { [TS]: 'ChannelSettings', lowerBoundPercent: bounds.lower, upperBoundPercent: bounds.upper } : null
}

const liteEntity = (plan: MockPlan): any => ({
  [TS]: 'AdvertiserPlanLite',
  id: plan.id,
  version: plan.version,
  name: plan.name,
  status: plan.status,
  unpausedStatus: plan.unpausedStatus,
  advertiserId: plan.advertiser.id,
  advertiser: advertiserEntity(plan.advertiser),
  currency: plan.currency,
  dispatchMode: DispatchModeEnum.Off,
  dispatchOptIn: plan.dispatchOptIn,
  managementFeePercent: plan.managementFeePercent,
  marginPercent: plan.marginPercent,
  nbGroups: plan.groups.length,
  nbCampaigns: sum(plan.groups.map(g => g.campaigns.length)),
  nbIncludedCampaigns: sum(plan.groups.map(g => g.campaigns.filter(c => c.status !== CampaignStatusEnum.Paused).length)),
  period: periodEntity(plan),
  totalBudget: planTotalBudget(plan),
  updated: null,
})

export const groupPlanEntity = (plan: MockPlan, group: MockGroup): any => ({
  [TS]: 'GroupPlan',
  id: group.id,
  version: group.version,
  advertiserPlanId: plan.id,
  advertiserPlan: liteEntity(plan),
  name: group.name,
  status: group.status,
  kpi: group.kpi,
  specs: group.specs,
  bundles: group.bundles.map(b => bundleEntity(group, b)),
  monthBudgets: monthBudgetEntities(plan, group),
  totalBudget: budget(sum(group.monthBudgetCents), groupSpent(group)),
  paidSearchChannel: channelSettings(group, ChannelEnum.PaidSearch),
  facebookChannel: channelSettings(group, ChannelEnum.Facebook),
  displayChannel: channelSettings(group, ChannelEnum.Display),
  youtubeChannel: channelSettings(group, ChannelEnum.YouTube),
  updated: null,
})

export const campaignDetailsEntity = (plan: MockPlan, group: MockGroup, campaign: MockCampaign): any => {
  const bundle = group.bundles.find(b => b.id === campaign.bundleId) ?? group.bundles[0]
  const months = monthKeysOf(plan.period)
  const refIdx = referenceMonthIndex(months)
  const totalWeight = sum(group.campaigns.map(c => c.weight)) || 1
  const share = campaign.weight / totalWeight
  const isPaused = campaign.status === CampaignStatusEnum.Paused
  let monthly: number | null = null
  let daily: number | null = null
  if (!isPaused && refIdx >= 0) {
    const refMonth = months[refIdx]
    const monthBudget = group.monthBudgetCents[refIdx] ?? 0
    monthly = Math.round((monthBudget * share) / CENTS) * CENTS
    if (refMonth === MOCK_TODAY_MONTH) {
      const remainingDays = Math.max(1, 30 - MOCK_TODAY_DAY + 1)
      const remaining = Math.max(0, monthBudget - (group.monthSpentCents[refMonth] ?? 0))
      daily = Math.round((remaining * share) / remainingDays / CENTS) * CENTS
    } else {
      daily = Math.round(monthly / 31 / CENTS) * CENTS
    }
  }
  const currentSpent = Math.round(((group.monthSpentCents[MOCK_TODAY_MONTH] ?? 0) * share) / CENTS) * CENTS
  const totalSpent = Math.round((groupSpent(group) * share) / CENTS) * CENTS
  return {
    [TS]: 'CampaignDetails',
    campaignId: campaign.id,
    groupId: group.id,
    status: campaign.status,
    statusMessage: campaign.statusMessage,
    campaign: {
      [TS]: 'CampaignName',
      id: campaign.id,
      name: campaign.name,
      notFound: false,
      bid: plan.advertiser.id,
      deliveryPlatform: bundle.deliveryPlatform,
      mappingPlatform: bundle.mappingPlatform,
      tactic: bundle.tactic,
    },
    channel: bundle.channel,
    currency: plan.currency,
    currentMonthSpentCents: currentSpent,
    dailyRecommendedCents: daily,
    deliveryPlatform: bundle.deliveryPlatform,
    deltaDailyRecommendedCents: null,
    deltaMonthlyRecommendedCents: null,
    group: idName(group.id, group.name),
    lastUpdated: campaign.lastUpdated,
    mappingPlatform: bundle.mappingPlatform,
    monthlyRecommendedCents: monthly,
    percentDailyRecommendedCents: null,
    percentMonthlyRecommendedCents: null,
    platform: idName(bundle.platform.id, bundle.platform.name),
    previousDailyRecommendedCents: null,
    previousMonthlyRecommendedCents: null,
    previousUpdated: campaign.previousUpdated,
    tactic: bundle.tactic,
    totalSpentCents: totalSpent,
  }
}

const ids = (list: unknown): string[] => (Array.isArray(list) ? list.map(String) : [])

/** `campaignDetails(filter)` — all CampaignDetailsFilter members are optional lists (empty = no filter). */
const campaignDetailsList = (plan: MockPlan, filter: any): any[] => {
  const f = filter ?? {}
  const rows: any[] = []
  plan.groups.forEach(group =>
    group.campaigns.forEach(c => rows.push(campaignDetailsEntity(plan, group, c))),
  )
  const match = (values: unknown, actual: unknown) => {
    const list = ids(values)
    return !list.length || list.includes(String(actual))
  }
  return rows.filter(
    r =>
      match(f.statuses, r.status) &&
      match(f.groupIds, r.groupId) &&
      match(f.channels, r.channel) &&
      match(f.tactics, r.tactic) &&
      match(f.vendorCampaignIds, r.campaignId) &&
      match(f.platformIds, r.platform.id) &&
      match(f.deliveryPlatforms, r.deliveryPlatform) &&
      match(f.mappingPlatforms, r.mappingPlatform),
  )
}

export const planEntity = (plan: MockPlan): any => {
  const paused = plan.status === AdvertiserPlanStatusEnum.Paused
  return {
    [TS]: 'AdvertiserPlan',
    id: plan.id,
    version: plan.version,
    name: plan.name,
    status: plan.status,
    unpausedStatus: plan.unpausedStatus,
    advertiserId: plan.advertiser.id,
    advertiser: advertiserEntity(plan.advertiser),
    currency: plan.currency,
    dispatchMode: DispatchModeEnum.Off,
    dispatchOptIn: plan.dispatchOptIn,
    managementFeePercent: plan.managementFeePercent,
    marginPercent: plan.marginPercent,
    isRunnable: plan.groups.some(g => g.bundles.length > 0),
    // `disable.pause` / `disable.resume` are "button disabled" flags used by ObaDetails.
    disable: {
      [TS]: 'AdvertiserPlanDisableStates',
      delete: plan.status !== AdvertiserPlanStatusEnum.Scheduled,
      endDate: false,
      pause: paused || plan.status === AdvertiserPlanStatusEnum.Completed,
      resume: !paused,
      startDate: plan.status === AdvertiserPlanStatusEnum.Live || plan.status === AdvertiserPlanStatusEnum.Completed,
      totalBudget: false,
    },
    period: periodEntity(plan),
    totalBudget: planTotalBudget(plan),
    groups: plan.groups.map(g => groupPlanEntity(plan, g)),
    // Field with arguments: resolved lazily by the link (`campaignDetails(filter: ...)`).
    campaignDetails: (args: any) => campaignDetailsList(plan, args?.filter),
    campaigns: null,
    recommendations: [],
    unmappedCampaigns: [],
    updated: null,
  }
}

export const planLiteEntity = liteEntity

/** Every mock advertiser (Londoner first, then the demo advertisers in order). */
export const advertiserNameEntities = (): any[] => {
  const seen = new Set<string>()
  const out: any[] = []
  plans.forEach(p => {
    if (seen.has(p.advertiser.id)) return
    seen.add(p.advertiser.id)
    out.push(advertiserEntity(p.advertiser))
  })
  return out
}

export const planNameEntities = (): any[] => plans.map(p => idName(p.id, p.name))

// ---------------------------------------------------------------------------------------------
// Lookups used by the link
// ---------------------------------------------------------------------------------------------
export const groupNameEntities = (planId: unknown): any[] => {
  const plan = getPlan(planId)
  if (!plan) return []
  return plan.groups.map(g => ({
    [TS]: 'GroupName',
    id: g.id,
    name: g.name,
    notFound: false,
    startDate: plan.period.startDate,
    endDate: plan.period.endDate,
  }))
}

export const campaignNameEntities = (filter: any): any[] => {
  const f = filter ?? {}
  const planFilter = f.advertiserPlanId != null ? getPlan(f.advertiserPlanId) : undefined
  const groupFilter = f.groupId != null ? findGroup(f.groupId) : undefined
  const idList = ids(f.ids)
  const nameQuery = typeof f.name === 'string' ? f.name.trim().toLowerCase() : ''
  const rows: any[] = []
  plans.forEach(plan => {
    if (planFilter && plan.id !== planFilter.id) return
    if (f.advertiserId != null && plan.advertiser.id !== String(f.advertiserId)) return
    plan.groups.forEach(group => {
      if (groupFilter && group.id !== groupFilter.group.id) return
      group.campaigns.forEach(c => {
        const bundle = group.bundles.find(b => b.id === c.bundleId)
        if (!bundle) return
        if (f.channel && bundle.channel !== f.channel) return
        if (f.tactic && bundle.tactic !== f.tactic) return
        if (idList.length && !idList.includes(c.id)) return
        if (nameQuery && !c.name.toLowerCase().includes(nameQuery)) return
        rows.push({
          [TS]: 'CampaignName',
          id: c.id,
          name: c.name,
          notFound: false,
          bid: plan.advertiser.id,
          deliveryPlatform: bundle.deliveryPlatform,
          mappingPlatform: bundle.mappingPlatform,
          tactic: bundle.tactic,
        })
      })
    })
  })
  // One campaign can live in several plans (same vendor id): keep a single option per id.
  return Array.from(new Map(rows.map(r => [r.id, r])).values())
}

export const GBP_CURRENCY = { [TS]: 'Currency', code: 'GBP', name: 'British Pound', symbol: '£' }
/** GBP (Londoner) plus the demo advertisers' currencies. */
export const MOCK_CURRENCIES = [
  GBP_CURRENCY,
  { [TS]: 'Currency', code: 'EUR', name: 'Euro', symbol: '€' },
  { [TS]: 'Currency', code: 'NZD', name: 'New Zealand Dollar', symbol: '$' },
  { [TS]: 'Currency', code: 'USD', name: 'US Dollar', symbol: '$' },
]

// ---------------------------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------------------------
const resizeBudgets = (values: number[], size: number): number[] =>
  Array.from({ length: size }, (_, i) => values[i] ?? 0)

export const applyPlanUpdate = (input: any): MockPlan | undefined => {
  const plan = getPlan(input?.id)
  if (!plan) return undefined
  if (typeof input.name === 'string' && input.name) plan.name = input.name
  if (typeof input.currency === 'string' && input.currency) plan.currency = input.currency
  if (typeof input.marginPercent === 'number') plan.marginPercent = input.marginPercent
  if (typeof input.managementFeePercent === 'number') plan.managementFeePercent = input.managementFeePercent
  if (typeof input.dispatchOptIn === 'boolean') plan.dispatchOptIn = input.dispatchOptIn
  if (typeof input.totalBudget === 'number') plan.totalBudgetCents = input.totalBudget
  if (input.period?.startDate || input.period?.endDate) {
    plan.period = {
      startDate: input.period.startDate ?? plan.period.startDate,
      endDate: input.period.endDate ?? plan.period.endDate,
    }
    const size = monthKeysOf(plan.period).length
    plan.groups.forEach(g => {
      g.monthBudgetCents = resizeBudgets(g.monthBudgetCents, size)
    })
  }
  if (Array.isArray(input.groups)) {
    const size = monthKeysOf(plan.period).length
    input.groups.forEach((gi: any) => {
      let group = gi?.id != null ? plan.groups.find(g => g.id === String(gi.id)) : undefined
      if (!group) {
        const seq = plan.groups.length + 1
        group = {
          id: `${plan.id}${seq}`,
          version: 1,
          name: gi?.name ?? `Group Name ${seq}`,
          status: GroupStatusEnum.Incomplete,
          kpi: KpiEnum.Conversions,
          specs: '',
          monthBudgetCents: resizeBudgets([], size),
          monthSpentCents: {},
          bundles: [],
          campaigns: [],
          channelBounds: {},
        }
        plan.groups.push(group)
      }
      if (typeof gi?.name === 'string' && gi.name) group.name = gi.name
      if (Array.isArray(gi?.monthBudgetCents)) {
        group.monthBudgetCents = resizeBudgets(
          gi.monthBudgetCents.map((v: unknown) => (typeof v === 'number' ? v : 0)),
          size,
        )
      }
      group.version += 1
    })
  }
  plan.version += 1
  return plan
}

export const applyPlanPause = (id: unknown, pause: boolean): MockPlan | undefined => {
  const plan = getPlan(id)
  if (!plan) return undefined
  if (pause && plan.status !== AdvertiserPlanStatusEnum.Paused) {
    plan.unpausedStatus = plan.status
    plan.status = AdvertiserPlanStatusEnum.Paused
  } else if (!pause && plan.status === AdvertiserPlanStatusEnum.Paused) {
    plan.status = plan.unpausedStatus
  }
  plan.version += 1
  return plan
}

export const applyCampaignPause = (campaignId: unknown, groupId: unknown, pause: boolean): any | undefined => {
  const found = findGroup(groupId)
  const campaign = found?.group.campaigns.find(c => c.id === String(campaignId))
  if (!found || !campaign) return undefined
  if (pause) {
    if (campaign.status !== CampaignStatusEnum.Paused) campaign.resumeStatus = campaign.status
    campaign.status = CampaignStatusEnum.Paused
  } else {
    campaign.status = campaign.resumeStatus === CampaignStatusEnum.Paused ? CampaignStatusEnum.Active : campaign.resumeStatus
  }
  campaign.lastUpdated = MOCK_TODAY
  return campaignDetailsEntity(found.plan, found.group, campaign)
}

const PLATFORM_BY_DELIVERY: Partial<Record<DeliveryPlatformEnum, { id: string; name: string }>> = {
  [DeliveryPlatformEnum.GoogleAds]: PLATFORMS.googleAds,
  [DeliveryPlatformEnum.Dv360]: PLATFORMS.dv360,
}

export const applyGroupUpdate = (input: any): { plan: MockPlan; group: MockGroup } | undefined => {
  const found = findGroup(input?.id)
  if (!found) return undefined
  const { plan, group } = found
  if (typeof input.name === 'string' && input.name) group.name = input.name
  if (input.kpi) group.kpi = input.kpi
  if (typeof input.specs === 'string') group.specs = input.specs
  if (Array.isArray(input.monthBudgetCents)) {
    group.monthBudgetCents = resizeBudgets(
      input.monthBudgetCents.map((v: unknown) => (typeof v === 'number' ? v : 0)),
      monthKeysOf(plan.period).length,
    )
  }
  const channelKeys: [string, ChannelEnum][] = [
    ['paidSearchChannel', ChannelEnum.PaidSearch],
    ['facebookChannel', ChannelEnum.Facebook],
    ['displayChannel', ChannelEnum.Display],
    ['youtubeChannel', ChannelEnum.YouTube],
  ]
  channelKeys.forEach(([key, channel]) => {
    if (input[key]) {
      group.channelBounds[channel] = {
        lower: input[key].lowerBoundPercent ?? null,
        upper: input[key].upperBoundPercent ?? null,
      }
    }
  })
  if (Array.isArray(input.bundles)) {
    const previousBundles = group.bundles
    const previousCampaigns = group.campaigns
    const nextBundles: MockBundle[] = []
    const nextCampaigns: MockCampaign[] = []
    input.bundles.forEach((bi: any, index: number) => {
      const existing = bi?.id != null ? previousBundles.find(b => b.id === String(bi.id)) : undefined
      const bundleId = existing?.id ?? `${group.id}${previousBundles.length + index + 1}${Date.now() % 1000}`
      const delivery: DeliveryPlatformEnum = bi.deliveryPlatform ?? existing?.deliveryPlatform ?? DeliveryPlatformEnum.Unknown
      const vendorCampaignIds: string[] = ids(bi.vendorCampaignIds)
      nextBundles.push({
        id: bundleId,
        version: (existing?.version ?? 0) + 1,
        channel: bi.channel,
        deliveryPlatform: delivery,
        mappingPlatform: bi.mappingPlatform ?? existing?.mappingPlatform ?? MappingPlatformEnum.Unknown,
        platform: existing?.platform ?? PLATFORM_BY_DELIVERY[delivery] ?? { id: `91007709`, name: String(delivery) },
        tactic: bi.tactic,
        vendorCampaignIds,
        lowerBoundPercent: bi.lowerBoundPercent ?? null,
        upperBoundPercent: bi.upperBoundPercent ?? null,
      })
      vendorCampaignIds.forEach(vid => {
        const prev = previousCampaigns.find(c => c.id === vid)
        nextCampaigns.push(
          prev
            ? { ...prev, bundleId }
            : {
                id: vid,
                name: campaignName(vid),
                bundleId,
                weight: 10,
                status: CampaignStatusEnum.Active,
                resumeStatus: CampaignStatusEnum.Active,
                statusMessage: '',
                lastUpdated: MOCK_TODAY,
                previousUpdated: MOCK_TODAY,
              },
        )
      })
    })
    group.bundles = nextBundles
    group.campaigns = nextCampaigns
    group.status = nextBundles.length ? GroupStatusEnum.Active : GroupStatusEnum.Incomplete
  }
  group.version += 1
  plan.version += 1
  return found
}
