/**
 * Mocked Salesforce intake data for the prototype.
 *
 * There is no backend for the v2 multi-product data, so Salesforce-originated
 * plans are represented here as seeded fixtures. Ship_To properties are matched
 * to real hotel advertisers at render time (see MediaplannerProductSettings.tsx).
 */

import { LONDONER, LONDONER_CHANNELS, LONDONER_NAMES } from '@mediahub/mediahub-ui/shared/londonerHotel'
import {
  DEMO_ADVERTISERS,
  DEMO_CHANNEL_INFO,
  activeChannels,
  getDemoAdvertiserByBpid,
  type DemoAdvertiser,
  type DemoChannelKey,
} from '@mediahub/mediahub-ui/shared/demoAdvertisers'

export type PricingModel =
  | 'PERFORMANCE_BASED'
  | 'MANAGEMENT_FEE_ON_CONSUMPTION'
  | 'MONTHLY_RETAINER'
  | 'DIGITAL_ADVERTISING_ENTERPRISE_RETAINER'
  | 'METASEARCH_ADVERTISING'

export type BaseProductType =
  | 'DIGITAL_ADVERTISING_AGENCY'
  | 'DIGITAL_ADVERTISING_ENTERPRISE'
  | 'AMADEUS_METASEARCH'

export type ChargeType = 'PERCENTAGE_FEE' | 'FIXED_RECURRING' | 'THRESHOLD' | 'ONE_TIME_SETUP'

export interface MockFee {
  name: string
  mandatory: boolean
  chargeType: ChargeType
  /** Display string for the "amount / rate" column, e.g. "15.00%" or "$2,000". */
  display: string
  /** Optional human-readable formula/how-charged note. */
  note?: string
  /**
   * Numeric inputs used to compute the fee's total value on the Media Plan page.
   *  - ratePct: for PERCENTAGE_FEE, the percent (e.g. 15 for 15%).
   *  - amount: flat amount for FIXED_RECURRING (per month), ONE_TIME_SETUP, THRESHOLD.
   * Fee value rules (against total spend + term months):
   *  - PERCENTAGE_FEE  = ratePct% × totalSpend
   *  - FIXED_RECURRING = amount × termMonths
   *  - ONE_TIME_SETUP  = amount
   *  - THRESHOLD       = amount
   */
  ratePct?: number
  amount?: number
}

export interface MockShipTo {
  /** Matches an advertiser's bpid so we can resolve a real hotel at render time. */
  propertyName: string
  propertyBpid: string
}

export interface MockBillTo {
  name: string
  accountReference: string
}

export interface MockProduct {
  id: string
  /** Product label, e.g. "Digital Advertising Agency". */
  name: string
  baseProductType: BaseProductType
  pricingModel: PricingModel
  pricingModelLabel: string
  fees: MockFee[]
  /** Read-only billing info supplied by Salesforce (informational only). */
  billTo: MockBillTo
  /**
   * Ship_To count — how many of the available hotel advertisers to attach as
   * this product's properties. Resolved to real advertisers at render time.
   */
  shipToCount: number
  /**
   * Optional explicit Ship_To by BPID. When set it wins over shipToCount/shipToOffset, so a plan
   * can point at a specific property (e.g. The Londoner Hotel) instead of an index into the list.
   */
  shipToBpids?: string[]
  /**
   * Offset into the advertiser list where this product's Ship_To slice begins.
   * Lets products pick DISTINCT (non-overlapping) properties. Defaults to 0.
   */
  shipToOffset?: number
}

export type PerformanceCadence = 'MONTHLY' | 'WEEKLY' | 'QUARTERLY'
export type FirstMonthReviewCall = 'INCLUDED' | 'CHARGEABLE'

/** Review Settings (new General Settings card). Prototype defaults live on the plan. */
export interface MockReviewSettings {
  performanceReport: PerformanceCadence
  periodicPerformanceReviewCalls: PerformanceCadence
  firstMonthReviewCall: FirstMonthReviewCall
}

export const PERFORMANCE_CADENCE_LABEL: Record<PerformanceCadence, string> = {
  MONTHLY: 'Monthly',
  WEEKLY: 'Weekly',
  QUARTERLY: 'Quarterly',
}
export const FIRST_MONTH_REVIEW_CALL_LABEL: Record<FirstMonthReviewCall, string> = {
  INCLUDED: 'Included',
  CHARGEABLE: 'Chargeable',
}

/** One platform's monthly spend row for the Monthly Breakdown tab. */
export interface MockMonthlyPlatformRow {
  /** Strategic category header shown above this platform's row, e.g. 'Metasearch'. */
  category: string
  /** Display label, e.g. 'Paid Search - Google'. */
  platform: string
  /** One spend value per month, same length/order as monthlyBreakdown.months. */
  monthly: number[]
}

/** Mock monthly-breakdown dataset (conceptually from Step 3 Spend Budget Distribution). */
export interface MockMonthlyBreakdown {
  /** Month labels, e.g. ['Oct-26','Nov-26',...]. */
  months: string[]
  /** Per-month recommended seasonal allocation %, same length; sums to ~100. */
  seasonalPct: number[]
  /** Platform spend rows. */
  platforms: MockMonthlyPlatformRow[]
}

export interface MockSalesforcePlan {
  id: string
  planName: string
  /** Advertiser (hotel) display name shown on the Media Plan document. */
  advertiserName: string
  advertiserType: 'HOTEL'
  planType: 'NEW' | 'RENEWAL'
  currency: string
  /** Plan-level budget from General Settings (Step 1); base for % <-> value conversion. */
  contractBudgetTarget: number
  /** BID shown on the Media Plan document header. */
  bid: string
  /** Plan period (General Settings Step 1). Term months is derived from these. */
  startDate: string
  endDate: string
  /** Total spend from Budget Distribution (Step 3) — mocked for the prototype. */
  totalSpend: number
  /** Review Settings defaults (new General Settings card). */
  reviewSettings: MockReviewSettings
  opportunityId: string
  proposalId: string
  status: 'NEW'
  products: MockProduct[]
  /** Monthly breakdown dataset (mocked; offline source for the Monthly Breakdown tab). */
  monthlyBreakdown: MockMonthlyBreakdown
}

export const BASE_PRODUCT_TYPE_LABEL: Record<BaseProductType, string> = {
  DIGITAL_ADVERTISING_AGENCY: 'Digital Advertising Agency',
  DIGITAL_ADVERTISING_ENTERPRISE: 'Digital Advertising Enterprise',
  AMADEUS_METASEARCH: 'Amadeus Metasearch',
}

/**
 * Plan One — a single Agency product on the "Management Fee on Consumption"
 * pricing model, with 10 hotel Ship_To properties. Fees are illustrative.
 */
export const MOCK_SF_PLAN_ONE: MockSalesforcePlan = {
  id: 'sf-plan-001',
  planName: 'SF Plan One — Agency (Mgmt Fee on Consumption)',
  advertiserName: 'Colonial Williamsburg Resorts',
  advertiserType: 'HOTEL',
  planType: 'NEW',
  currency: 'USD',
  contractBudgetTarget: 500000,
  bid: '121955',
  startDate: '01-Oct-2026',
  endDate: '30-Sep-2027',
  totalSpend: 409500,
  reviewSettings: {
    performanceReport: 'MONTHLY',
    periodicPerformanceReviewCalls: 'MONTHLY',
    firstMonthReviewCall: 'INCLUDED',
  },
  opportunityId: 'OPP-100001',
  proposalId: 'PROP-100001',
  status: 'NEW',
  monthlyBreakdown: {
    months: ['Oct-26', 'Nov-26', 'Dec-26', 'Jan-27', 'Feb-27', 'Mar-27', 'Apr-27', 'May-27', 'Jun-27', 'Jul-27', 'Aug-27', 'Sep-27'],
    seasonalPct: [10, 8, 6, 6, 7, 9, 9, 8, 8, 9, 10, 10],
    platforms: [
      {
        category: 'Drive Direct Bookings (Lower-Funnel Tactics)',
        platform: 'Paid Search - Google & Bing (Brand, Generic, PMax, Display & Meta Remarketing)',
        // total ~189,000, distributed proportional to seasonalPct
        monthly: [18900, 15120, 11340, 11340, 13230, 17010, 17010, 15120, 15120, 17010, 18900, 18900],
      },
      {
        category: 'Metasearch',
        platform: 'Amadeus Hotel Metasearch (Google Hotel Ads, Tripadvisor & Kayak)',
        // total ~54,000
        monthly: [5400, 4320, 3240, 3240, 3780, 4860, 4860, 4320, 4320, 4860, 5400, 5400],
      },
      {
        category: 'Acquire New Customers (Upper/Mid-Funnel Tactics to Drive Branding, Awareness & Website Traffic)',
        platform: 'Acquire New Customers (Demand Gen, YouTube, TikTok & Meta Prospecting)',
        // total ~119,700
        monthly: [11970, 9576, 7182, 7182, 8379, 10773, 10773, 9576, 9576, 10773, 11970, 11970],
      },
      {
        category: 'Meetings, Events & F&B',
        platform: 'Meetings, Events & F&B (Weddings Advertising — Google, Meta, TikTok, Pinterest, et al.)',
        // total ~46,800
        monthly: [4680, 3744, 2808, 2808, 3276, 4212, 4212, 3744, 3744, 4212, 4680, 4680],
      },
    ],
  },
  products: [
    {
      id: 'sf-plan-001-prod-1',
      name: BASE_PRODUCT_TYPE_LABEL.DIGITAL_ADVERTISING_AGENCY,
      baseProductType: 'DIGITAL_ADVERTISING_AGENCY',
      pricingModel: 'MANAGEMENT_FEE_ON_CONSUMPTION',
      pricingModelLabel: 'Management Fee on Consumption',
      shipToCount: 3,
      shipToOffset: 0,
      billTo: {
        name: 'Amadeus Hospitality Americas, Inc.',
        accountReference: 'BILL-100001',
      },
      fees: [
        {
          name: 'Management Fee',
          mandatory: true,
          chargeType: 'PERCENTAGE_FEE',
          display: '15.00%',
          note: 'Management Fee % × Consumed Budget',
          ratePct: 15,
        },
        {
          name: 'Monthly Minimum',
          mandatory: true,
          chargeType: 'THRESHOLD',
          display: '$3,000',
          note: 'MAX(Management Fee, Minimum)',
          amount: 3000,
        },
        {
          name: 'Platform Integration & Trafficking Fee',
          mandatory: true,
          chargeType: 'PERCENTAGE_FEE',
          display: '2.50%',
          note: '% × Consumed Budget (replaces setup fee)',
          ratePct: 2.5,
        },
        {
          name: 'Channel Billing Service Fee',
          mandatory: false,
          chargeType: 'PERCENTAGE_FEE',
          display: '0.50%',
          note: 'Optional add-on',
          ratePct: 0.5,
        },
        {
          name: 'Creative Fee',
          mandatory: false,
          chargeType: 'ONE_TIME_SETUP',
          display: '$1,500',
          note: 'Optional one-time',
          amount: 1500,
        },
      ],
    },
    {
      id: 'sf-plan-001-prod-2',
      name: `${BASE_PRODUCT_TYPE_LABEL.DIGITAL_ADVERTISING_AGENCY} MICE`,
      baseProductType: 'DIGITAL_ADVERTISING_AGENCY',
      pricingModel: 'MONTHLY_RETAINER',
      pricingModelLabel: 'Monthly Retainer',
      shipToCount: 1,
      shipToOffset: 3,
      billTo: {
        name: 'Amadeus Hospitality Americas, Inc.',
        accountReference: 'BILL-100001-M',
      },
      fees: [
        {
          name: 'Monthly Retainer',
          mandatory: true,
          chargeType: 'FIXED_RECURRING',
          display: '$4,000 / month',
          note: 'Fixed monthly retainer × term (months)',
          amount: 4000,
        },
        {
          name: 'Management Fee',
          mandatory: true,
          chargeType: 'PERCENTAGE_FEE',
          display: '12.00%',
          note: 'Management Fee % × Consumed Budget',
          ratePct: 12,
        },
        {
          name: 'Platform Integration & Trafficking Fee',
          mandatory: true,
          chargeType: 'PERCENTAGE_FEE',
          display: '2.50%',
          note: '% × Consumed Budget',
          ratePct: 2.5,
        },
        {
          name: 'Creative Fee',
          mandatory: false,
          chargeType: 'ONE_TIME_SETUP',
          display: '$1,500',
          note: 'Optional one-time',
          amount: 1500,
        },
      ],
    },
  ],
}

/**
 * Plan Two — same Agency product, but with NO contract budget (0). Used to verify the
 * Step 2 Budget %/Value toggle gating: with no contract budget, % cannot be computed,
 * so the toggle is forced to Value and disabled.
 */
export const MOCK_SF_PLAN_TWO: MockSalesforcePlan = {
  id: 'sf-plan-002',
  planName: 'SF Plan Two — Agency (no contract budget)',
  advertiserName: 'The Grove Resort Orlando',
  advertiserType: 'HOTEL',
  planType: 'NEW',
  currency: 'USD',
  contractBudgetTarget: 0,
  bid: '121956',
  startDate: '01-Nov-2026',
  endDate: '30-Apr-2027',
  totalSpend: 180000,
  reviewSettings: {
    performanceReport: 'MONTHLY',
    periodicPerformanceReviewCalls: 'MONTHLY',
    firstMonthReviewCall: 'INCLUDED',
  },
  opportunityId: 'OPP-100002',
  proposalId: 'PROP-100002',
  status: 'NEW',
  monthlyBreakdown: {
    // 6 months derived from startDate 01-Nov-2026.
    months: ['Nov-26', 'Dec-26', 'Jan-27', 'Feb-27', 'Mar-27', 'Apr-27'],
    seasonalPct: [20, 18, 16, 16, 15, 15],
    platforms: [
      {
        category: 'Drive Direct Bookings (Lower-Funnel Tactics)',
        platform: 'Paid Search - Google & Bing',
        // total ~90,000
        monthly: [18000, 16200, 14400, 14400, 13500, 13500],
      },
      {
        category: 'Metasearch',
        platform: 'Amadeus Hotel Metasearch',
        // total ~60,000
        monthly: [12000, 10800, 9600, 9600, 9000, 9000],
      },
    ],
  },
  products: [
    {
      id: 'sf-plan-002-prod-1',
      name: BASE_PRODUCT_TYPE_LABEL.DIGITAL_ADVERTISING_AGENCY,
      baseProductType: 'DIGITAL_ADVERTISING_AGENCY',
      pricingModel: 'MANAGEMENT_FEE_ON_CONSUMPTION',
      pricingModelLabel: 'Management Fee on Consumption',
      shipToCount: 6,
      billTo: {
        name: 'Amadeus Hospitality Americas, Inc.',
        accountReference: 'BILL-100002',
      },
      fees: [
        {
          name: 'Management Fee',
          mandatory: true,
          chargeType: 'PERCENTAGE_FEE',
          display: '15.00%',
          note: 'Management Fee % × Consumed Budget',
          ratePct: 15,
        },
        {
          name: 'Monthly Minimum',
          mandatory: true,
          chargeType: 'THRESHOLD',
          display: '$3,000',
          note: 'MAX(Management Fee, Minimum)',
          amount: 3000,
        },
        {
          name: 'Platform Integration & Trafficking Fee',
          mandatory: true,
          chargeType: 'PERCENTAGE_FEE',
          display: '2.50%',
          note: '% × Consumed Budget (replaces setup fee)',
          ratePct: 2.5,
        },
      ],
    },
  ],
}

/**
 * The Londoner Hotel — demo plan (GBP, single property, 2 products: Agency + Metasearch).
 * Ids/names/budgets come from the shared Londoner source of truth. Monthly rows are
 * seasonalPct × channel budget (all exact integers, each row sums to its channel budget).
 */
export const MOCK_SF_PLAN_LONDONER: MockSalesforcePlan = {
  id: 'sf-plan-londoner',
  planName: LONDONER_NAMES.mediaPlan,
  advertiserName: LONDONER.name,
  advertiserType: 'HOTEL',
  planType: 'NEW',
  currency: LONDONER.currency,
  contractBudgetTarget: LONDONER.totalBudget,
  bid: LONDONER.bid,
  startDate: LONDONER.startDateDisplay,
  endDate: LONDONER.endDateDisplay,
  totalSpend: LONDONER.totalBudget,
  reviewSettings: {
    performanceReport: 'MONTHLY',
    periodicPerformanceReviewCalls: 'MONTHLY',
    firstMonthReviewCall: 'INCLUDED',
  },
  opportunityId: LONDONER.opportunityId,
  proposalId: LONDONER.proposalId,
  status: 'NEW',
  monthlyBreakdown: {
    months: ['Jan-27', 'Feb-27', 'Mar-27', 'Apr-27', 'May-27', 'Jun-27', 'Jul-27', 'Aug-27', 'Sep-27', 'Oct-27', 'Nov-27', 'Dec-27'],
    // London hotel seasonality: summer + early autumn peak, Q4 pre-Christmas lift.
    seasonalPct: [6, 6, 7, 8, 9, 10, 10, 9, 10, 10, 8, 7],
    platforms: [
      {
        category: 'Drive Direct Bookings (Lower-Funnel Tactics)',
        platform: LONDONER_CHANNELS.paidSearch.label,
        // total 192,000
        monthly: [11520, 11520, 13440, 15360, 17280, 19200, 19200, 17280, 19200, 19200, 15360, 13440],
      },
      {
        category: 'Metasearch',
        platform: 'Amadeus Hotel Metasearch (Google Hotel Ads, Tripadvisor & Kayak)',
        // total 72,000
        monthly: [4320, 4320, 5040, 5760, 6480, 7200, 7200, 6480, 7200, 7200, 5760, 5040],
      },
      {
        category: 'Acquire New Customers (Upper/Mid-Funnel Tactics to Drive Branding, Awareness & Website Traffic)',
        platform: LONDONER_CHANNELS.display.label,
        // total 120,000
        monthly: [7200, 7200, 8400, 9600, 10800, 12000, 12000, 10800, 12000, 12000, 9600, 8400],
      },
      {
        category: 'Acquire New Customers (Upper/Mid-Funnel Tactics to Drive Branding, Awareness & Website Traffic)',
        platform: LONDONER_CHANNELS.video.label,
        // total 96,000
        monthly: [5760, 5760, 6720, 7680, 8640, 9600, 9600, 8640, 9600, 9600, 7680, 6720],
      },
    ],
  },
  products: [
    {
      id: 'sf-plan-londoner-prod-1',
      name: BASE_PRODUCT_TYPE_LABEL.DIGITAL_ADVERTISING_AGENCY,
      baseProductType: 'DIGITAL_ADVERTISING_AGENCY',
      pricingModel: 'MANAGEMENT_FEE_ON_CONSUMPTION',
      pricingModelLabel: 'Management Fee on Consumption',
      shipToCount: 1,
      shipToOffset: 0,
      shipToBpids: [LONDONER.bpid],
      billTo: {
        name: 'Amadeus Hospitality UK Ltd',
        accountReference: 'BILL-910077',
      },
      fees: [
        {
          name: 'Management Fee',
          mandatory: true,
          chargeType: 'PERCENTAGE_FEE',
          display: '15.00%',
          note: 'Management Fee % × Consumed Budget',
          ratePct: 15,
        },
        {
          name: 'Monthly Minimum',
          mandatory: true,
          chargeType: 'THRESHOLD',
          display: '£3,000',
          note: 'MAX(Management Fee, Minimum)',
          amount: 3000,
        },
        {
          name: 'Platform Integration & Trafficking Fee',
          mandatory: true,
          chargeType: 'PERCENTAGE_FEE',
          display: '2.50%',
          note: '% × Consumed Budget (replaces setup fee)',
          ratePct: 2.5,
        },
        {
          name: 'Creative Fee',
          mandatory: false,
          chargeType: 'ONE_TIME_SETUP',
          display: '£1,500',
          note: 'Optional one-time',
          amount: 1500,
        },
      ],
    },
    {
      id: 'sf-plan-londoner-prod-2',
      name: BASE_PRODUCT_TYPE_LABEL.AMADEUS_METASEARCH,
      baseProductType: 'AMADEUS_METASEARCH',
      pricingModel: 'METASEARCH_ADVERTISING',
      pricingModelLabel: 'Metasearch Advertising',
      shipToCount: 1,
      shipToOffset: 0,
      shipToBpids: [LONDONER.bpid],
      billTo: {
        name: 'Amadeus Hospitality UK Ltd',
        accountReference: 'BILL-910077-M',
      },
      fees: [
        {
          name: 'Metasearch Setup Fee',
          mandatory: true,
          chargeType: 'ONE_TIME_SETUP',
          display: '£1,000',
          note: 'One-time setup',
          amount: 1000,
        },
        {
          name: 'Connectivity Fee',
          mandatory: true,
          chargeType: 'FIXED_RECURRING',
          display: '£250 / month',
          note: 'Fixed monthly connectivity fee × term (months)',
          amount: 250,
        },
        {
          name: 'Metasearch Fee',
          mandatory: true,
          chargeType: 'PERCENTAGE_FEE',
          display: '10.00%',
          note: '% × Consumed Budget',
          ratePct: 10,
        },
      ],
    },
  ],
}

/* -------------------------------------------------------------------------------------------------
 * Demo advertiser plans (the 19 advertisers in shared/demoAdvertisers.ts)
 *
 * Generated deterministically from the registry so the plan matches the advertiser everywhere:
 * name / budget / currency / BID / opportunity / proposal / period. Each channel's monthly row is
 * built from a market-specific seasonality curve and sums EXACTLY to adv.budgets[channel].
 * ----------------------------------------------------------------------------------------------- */

const MONTH_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** ISO 'YYYY-MM-DD' -> 'DD-Mon-YYYY' (the display format used by the existing plans). */
const isoToDisplay = (iso: string): string => {
  const [y, m, d] = iso.split('-')
  return `${d}-${MONTH_ABBR[Number(m) - 1]}-${y}`
}

/** 12 month labels ('Jul-26' ...) starting at the plan's start month. */
const monthLabelsFrom = (startIso: string): string[] => {
  const [y, m] = startIso.split('-').map(Number)
  return Array.from({ length: 12 }, (_, i) => {
    const index = m - 1 + i
    const year = y + Math.floor(index / 12)
    return `${MONTH_ABBR[index % 12]}-${String(year).slice(-2)}`
  })
}

/** Calendar-month (Jan..Dec) seasonality per market; every curve sums to 100. */
const MARKET_SEASONALITY: Record<string, number[]> = {
  'New York': [5, 5, 7, 8, 9, 10, 10, 10, 10, 10, 8, 8],
  Dubai: [11, 11, 11, 9, 6, 4, 4, 4, 6, 9, 12, 13],
  Bali: [8, 7, 7, 8, 8, 9, 11, 11, 9, 8, 6, 8],
  Barcelona: [5, 5, 7, 9, 10, 11, 11, 11, 10, 8, 7, 6],
  'Las Vegas': [8, 9, 10, 10, 8, 6, 6, 6, 8, 10, 10, 9],
  Auckland: [11, 11, 10, 8, 6, 5, 5, 5, 6, 8, 11, 14],
  Queenstown: [10, 9, 8, 6, 5, 10, 12, 11, 7, 5, 7, 10],
  Wellington: [10, 10, 10, 8, 7, 6, 6, 6, 7, 8, 10, 12],
  Rotorua: [10, 10, 9, 8, 7, 6, 7, 8, 8, 8, 9, 10],
}
const FLAT_SEASONALITY = [8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 8, 8]

const seasonalityFrom = (market: string, startIso: string): number[] => {
  const curve = MARKET_SEASONALITY[market] ?? FLAT_SEASONALITY
  const startMonth = Number(startIso.split('-')[1]) - 1
  return Array.from({ length: 12 }, (_, i) => curve[(startMonth + i) % 12])
}

/** Spread `total` over `pct` (sums to 100); any rounding remainder goes to the peak month. */
const spreadByPct = (total: number, pct: number[]): number[] => {
  const monthly = pct.map(p => Math.floor((total * p) / 100))
  const remainder = total - monthly.reduce((a, b) => a + b, 0)
  monthly[pct.indexOf(Math.max(...pct))] += remainder
  return monthly
}

const CURRENCY_SYMBOL: Record<string, string> = {
  USD: '$',
  EUR: '€',
  NZD: 'NZ$',
  GBP: '£',
  AUD: 'A$',
  SGD: 'S$',
  HKD: 'HK$',
}
const formatMoney = (currency: string, amount: number): string =>
  `${CURRENCY_SYMBOL[currency] ?? `${currency} `}${amount.toLocaleString('en-US')}`

const DEMO_BILL_TO: Record<string, string> = {
  USD: 'Amadeus Hospitality Americas, Inc.',
  EUR: 'Amadeus Hospitality Iberia S.L.',
  GBP: 'Amadeus Hospitality UK Ltd',
  NZD: 'Amadeus Hospitality ANZ Pty Ltd',
  AUD: 'Amadeus Hospitality ANZ Pty Ltd',
  SGD: 'Amadeus Hospitality APAC Pte Ltd',
  HKD: 'Amadeus Hospitality APAC Pte Ltd',
}
const MGMT_FEE_PCT = [15, 14, 16, 15, 13, 15, 14, 16, 15, 14]
const METASEARCH_FEE_PCT = [10, 9, 10, 11, 8, 10, 9, 10, 11, 9]

const MONTHLY_CATEGORY: Record<DemoChannelKey, string> = {
  paidSearch: 'Drive Direct Bookings (Lower-Funnel Tactics)',
  metasearch: 'Metasearch',
  display: 'Acquire New Customers (Upper/Mid-Funnel Tactics to Drive Branding, Awareness & Website Traffic)',
  video: 'Acquire New Customers (Upper/Mid-Funnel Tactics to Drive Branding, Awareness & Website Traffic)',
}
const MONTHLY_PLATFORM_LABEL: Record<DemoChannelKey, string> = {
  paidSearch: DEMO_CHANNEL_INFO.paidSearch.label,
  metasearch: 'Amadeus Hotel Metasearch (Google Hotel Ads, Tripadvisor & Kayak)',
  display: DEMO_CHANNEL_INFO.display.label,
  video: DEMO_CHANNEL_INFO.video.label,
}
/** Row order matches the Londoner plan: search, metasearch, then the upper-funnel channels. */
const MONTHLY_CHANNEL_ORDER: DemoChannelKey[] = ['paidSearch', 'metasearch', 'display', 'video']

const buildDemoAdvertiserPlan = (adv: DemoAdvertiser, index: number): MockSalesforcePlan => {
  const planId = `sf-plan-${adv.key}`
  const money = (amount: number) => formatMoney(adv.currency, amount)
  const billName = DEMO_BILL_TO[adv.currency] ?? DEMO_BILL_TO.USD
  const billRef = `BILL-${adv.advertiserId}`
  const seasonalPct = seasonalityFrom(adv.market, adv.startDate)
  const active = new Set(activeChannels(adv))
  const mgmtPct = MGMT_FEE_PCT[index % MGMT_FEE_PCT.length]
  const monthlyMinimum = 2000 + (index % 5) * 500
  const creativeFee = 1000 + (index % 3) * 500
  const metaPct = METASEARCH_FEE_PCT[index % METASEARCH_FEE_PCT.length]
  const connectivity = 200 + (index % 4) * 50
  const metaSetup = 750 + (index % 3) * 250

  const agencyProduct: MockProduct = {
    id: `${planId}-prod-1`,
    name: BASE_PRODUCT_TYPE_LABEL.DIGITAL_ADVERTISING_AGENCY,
    baseProductType: 'DIGITAL_ADVERTISING_AGENCY',
    pricingModel: 'MANAGEMENT_FEE_ON_CONSUMPTION',
    pricingModelLabel: 'Management Fee on Consumption',
    shipToCount: 1,
    shipToOffset: 0,
    shipToBpids: [adv.bpid],
    billTo: { name: billName, accountReference: billRef },
    fees: [
      {
        name: 'Management Fee',
        mandatory: true,
        chargeType: 'PERCENTAGE_FEE',
        display: `${mgmtPct.toFixed(2)}%`,
        note: 'Management Fee % × Consumed Budget',
        ratePct: mgmtPct,
      },
      {
        name: 'Monthly Minimum',
        mandatory: true,
        chargeType: 'THRESHOLD',
        display: money(monthlyMinimum),
        note: 'MAX(Management Fee, Minimum)',
        amount: monthlyMinimum,
      },
      {
        name: 'Platform Integration & Trafficking Fee',
        mandatory: true,
        chargeType: 'PERCENTAGE_FEE',
        display: '2.50%',
        note: '% × Consumed Budget (replaces setup fee)',
        ratePct: 2.5,
      },
      {
        name: 'Creative Fee',
        mandatory: false,
        chargeType: 'ONE_TIME_SETUP',
        display: money(creativeFee),
        note: 'Optional one-time',
        amount: creativeFee,
      },
    ],
  }

  const metasearchProduct: MockProduct = {
    id: `${planId}-prod-2`,
    name: BASE_PRODUCT_TYPE_LABEL.AMADEUS_METASEARCH,
    baseProductType: 'AMADEUS_METASEARCH',
    pricingModel: 'METASEARCH_ADVERTISING',
    pricingModelLabel: 'Metasearch Advertising',
    shipToCount: 1,
    shipToOffset: 0,
    shipToBpids: [adv.bpid],
    billTo: { name: billName, accountReference: `${billRef}-M` },
    fees: [
      {
        name: 'Metasearch Setup Fee',
        mandatory: true,
        chargeType: 'ONE_TIME_SETUP',
        display: money(metaSetup),
        note: 'One-time setup',
        amount: metaSetup,
      },
      {
        name: 'Connectivity Fee',
        mandatory: true,
        chargeType: 'FIXED_RECURRING',
        display: `${money(connectivity)} / month`,
        note: 'Fixed monthly connectivity fee × term (months)',
        amount: connectivity,
      },
      {
        name: 'Metasearch Fee',
        mandatory: true,
        chargeType: 'PERCENTAGE_FEE',
        display: `${metaPct.toFixed(2)}%`,
        note: '% × Consumed Budget',
        ratePct: metaPct,
      },
    ],
  }

  return {
    id: planId,
    planName: adv.mediaPlanName,
    advertiserName: adv.name,
    advertiserType: 'HOTEL',
    planType: 'NEW',
    currency: adv.currency,
    contractBudgetTarget: adv.totalBudget,
    bid: adv.bid,
    startDate: isoToDisplay(adv.startDate),
    endDate: isoToDisplay(adv.endDate),
    totalSpend: adv.totalBudget,
    reviewSettings: {
      performanceReport: 'MONTHLY',
      periodicPerformanceReviewCalls: 'MONTHLY',
      firstMonthReviewCall: 'INCLUDED',
    },
    opportunityId: adv.opportunityId,
    proposalId: adv.proposalId,
    status: 'NEW',
    monthlyBreakdown: {
      months: monthLabelsFrom(adv.startDate),
      seasonalPct,
      platforms: MONTHLY_CHANNEL_ORDER.filter(channel => active.has(channel)).map(channel => ({
        category: MONTHLY_CATEGORY[channel],
        platform: MONTHLY_PLATFORM_LABEL[channel],
        monthly: spreadByPct(adv.budgets[channel], seasonalPct),
      })),
    },
    products: adv.budgets.metasearch > 0 ? [agencyProduct, metasearchProduct] : [agencyProduct],
  }
}

/** One mocked Salesforce plan per demo advertiser (`sf-plan-<key>`). */
export const MOCK_SF_DEMO_ADVERTISER_PLANS: MockSalesforcePlan[] = DEMO_ADVERTISERS.map(buildDemoAdvertiserPlan)

export const MOCK_SF_PLANS: MockSalesforcePlan[] = [
  MOCK_SF_PLAN_ONE,
  MOCK_SF_PLAN_TWO,
  MOCK_SF_PLAN_LONDONER,
  ...MOCK_SF_DEMO_ADVERTISER_PLANS,
]

export function getMockSalesforcePlan(planId?: string): MockSalesforcePlan | undefined {
  if (!planId) return undefined
  return MOCK_SF_PLANS.find(p => p.id === planId)
}

/** The mocked Salesforce plan for a demo advertiser (The Londoner Hotel or one of the 10), by BPID. */
export function getMockSalesforcePlanForAdvertiser(bpid: string): MockSalesforcePlan | undefined {
  const normalized = String(bpid ?? '').trim().toLowerCase()
  if (!normalized) return undefined
  if (normalized === LONDONER.bpid.toLowerCase()) return MOCK_SF_PLAN_LONDONER
  const adv = getDemoAdvertiserByBpid(normalized)
  return adv ? MOCK_SF_DEMO_ADVERTISER_PLANS.find(plan => plan.id === `sf-plan-${adv.key}`) : undefined
}

/* -------------------------------------------------------------------------------------------------
 * Salesforce scenario emulator (PROTOTYPE ONLY)
 *
 * Until the real Salesforce connection exists, Step 2 offers a temporary dropdown to switch the
 * emulated intake between the shape variations the planner needs to prototype against:
 *   - Single product, single property
 *   - Single product, multi property
 *   - Multi product, multi property
 * "Property mode" is expressed by a product's Ship_To count (1 = single property, >1 = multi).
 * These fixtures reuse the fee/billing shapes above so the rest of Step 2/3/4 render unchanged.
 * This whole block is removed once the SF connection replaces the emulator.
 * ----------------------------------------------------------------------------------------------- */

export type SalesforceScenarioId = 'SINGLE_SINGLE' | 'SINGLE_MULTI' | 'MULTI_MULTI'

/** Single product with exactly ONE Ship_To property (single-product / single-property). */
export const MOCK_SF_SCENARIO_SINGLE_SINGLE: MockSalesforcePlan = {
  ...MOCK_SF_PLAN_TWO,
  id: 'sf-scenario-single-single',
  planName: 'The Grove Resort Orlando — 2027 Media Plan',
  advertiserName: 'The Grove Resort Orlando',
  contractBudgetTarget: 500000,
  opportunityId: 'OPP-900001',
  proposalId: 'PROP-900001',
  products: [
    {
      ...MOCK_SF_PLAN_TWO.products[0],
      id: 'sf-scenario-single-single-prod-1',
      shipToCount: 1,
      shipToOffset: 0,
    },
  ],
}

/** Single product with MULTIPLE Ship_To properties (single-product / multi-property). */
export const MOCK_SF_SCENARIO_SINGLE_MULTI: MockSalesforcePlan = {
  ...MOCK_SF_PLAN_TWO,
  id: 'sf-scenario-single-multi',
  planName: 'The Grove Resort Orlando Collection — 2027 Media Plan',
  advertiserName: 'The Grove Resort Orlando',
  contractBudgetTarget: 500000,
  opportunityId: 'OPP-900002',
  proposalId: 'PROP-900002',
  products: [
    {
      ...MOCK_SF_PLAN_TWO.products[0],
      id: 'sf-scenario-single-multi-prod-1',
      shipToCount: 5,
      shipToOffset: 0,
    },
  ],
}

/** Multiple products, each with multiple Ship_To properties (multi-product / multi-property). */
export const MOCK_SF_SCENARIO_MULTI_MULTI: MockSalesforcePlan = {
  ...MOCK_SF_PLAN_ONE,
  id: 'sf-scenario-multi-multi',
  planName: 'Colonial Williamsburg Resorts — 2027 Media Plan',
  opportunityId: 'OPP-900003',
  proposalId: 'PROP-900003',
  products: [
    {
      ...MOCK_SF_PLAN_ONE.products[0],
      id: 'sf-scenario-multi-multi-prod-1',
      shipToCount: 3,
      shipToOffset: 0,
    },
    {
      ...MOCK_SF_PLAN_ONE.products[1],
      id: 'sf-scenario-multi-multi-prod-2',
      shipToCount: 3,
      shipToOffset: 3,
    },
  ],
}

export interface SalesforceScenario {
  id: SalesforceScenarioId
  label: string
  plan: MockSalesforcePlan
}

/** Scenario registry powering the Step 2 emulator dropdown (prototype only). */
export const MOCK_SF_SCENARIOS: SalesforceScenario[] = [
  { id: 'SINGLE_SINGLE', label: 'Single product, single property', plan: MOCK_SF_SCENARIO_SINGLE_SINGLE },
  { id: 'SINGLE_MULTI', label: 'Single product, multi property', plan: MOCK_SF_SCENARIO_SINGLE_MULTI },
  { id: 'MULTI_MULTI', label: 'Multi product, multi property', plan: MOCK_SF_SCENARIO_MULTI_MULTI },
]

export const DEFAULT_SF_SCENARIO_ID: SalesforceScenarioId = 'MULTI_MULTI'

export function getSalesforceScenario(id: SalesforceScenarioId): SalesforceScenario {
  return MOCK_SF_SCENARIOS.find(s => s.id === id) ?? MOCK_SF_SCENARIOS[MOCK_SF_SCENARIOS.length - 1]
}
