import { MediaChannelEnum, MediaPlatformEnum, MediaTacticEnum, RegionEnum } from '@mediahub/mediaplanner-ui/graphql/generated/mediaplanner-enums'
import type {
  ChannelSchemaDef,
  Currency,
  FormulaContext,
  Region,
  TacticInputs,
  TacticSchemaDefaults,
} from './budgetDistributionConfig.d'
export const DEFAULT_CURRENCY: Currency = 'EUR'
export const DEFAULT_REGION: Region = RegionEnum.Emea
export const PAIDSEARCH_MARGIN_PCT = -0.6
export const CURRENCY_SYMBOL_BY_CODE: Record<Currency, '€' | '$'> = {
  EUR: '€',
  USD: '$',
}

export const FORMULAS = {
  expectedSpend: (contractBudget: number, sumFees: number, managementFeePct: number): number =>
    (contractBudget - sumFees) / (1 + managementFeePct),
  spendPct: (spend: number, totalSpend: number): number =>
    totalSpend > 0 ? Math.round((spend / totalSpend) * 10000) / 100 : 0,
  expectedPct: (spend: number, expectedSpend: number): number =>
    expectedSpend > 0 ? Math.round((spend / expectedSpend) * 10000) / 100 : 0,
  display_marginPct_fromCPM: (cpm: number, platformCostCPM: number): number =>
    cpm > 0 ? Math.round(((cpm - platformCostCPM) / cpm) * 10000) / 100 : 0,
  tactic_marginValue: (spend: number, marginPct: number): number => Math.round(spend * (marginPct / 100) * 100) / 100,
  summary_marginAmt: (totalMarginAmount: number, managementFeePct: number, expectedSpend: number): number =>
    Math.round((totalMarginAmount + managementFeePct * expectedSpend) * 100) / 100,
  summary_marginPct: (marginAmt: number, contractBudgetTotal: number): number =>
    contractBudgetTotal > 0 ? Math.round((marginAmt / contractBudgetTotal) * 10000) / 100 : 0,
  global_spendBudget: (totalSpend: number): number => Math.round(totalSpend * 100) / 100,
  global_contractMarginAmt: (marginAmount: number, sumFees: number): number =>
    Math.round((marginAmount + sumFees) * 100) / 100,
  global_contractMarginExpectedAmt: (
    contractBudget: number,
    contractMarginExpectedPct: number,
    sumFees: number,
  ): number => Math.round((contractBudget * (contractMarginExpectedPct / 100) - sumFees) * 100) / 100,
  global_contractMarginExpectedPct: (contractMarginExpectedAmt: number, expectedSpend: number): number =>
    expectedSpend > 0 ? Math.round((contractMarginExpectedAmt / expectedSpend) * 10000) / 100 : 0,
  global_contractBudgetMarginAmt: (contractBudget: number, contractProfitTarget: number): number =>
    Math.round(contractBudget * (contractProfitTarget / 100) * 100) / 100,
  global_contractBudgetTotal: (totalSpend: number, managementFeePct: number, sumFees: number): number =>
    Math.round((totalSpend * (1 + managementFeePct) + sumFees) * 100) / 100,
  global_contractMarginPct: (contractMarginAmt: number, contractBudgetTotal: number): number =>
    contractBudgetTotal > 0 ? Math.round((contractMarginAmt / contractBudgetTotal) * 10000) / 100 : 0,
  global_actualMarginPct: (totalMarginValue: number, totalSpend: number): number =>
    totalSpend > 0 ? Math.round((totalMarginValue / totalSpend) * 10000) / 100 : 0,
} as const

export const PLATFORM_COST_CPM: Record<string, Record<Region, Record<Currency, number>>> = {
  dv360: {
    [RegionEnum.Aspac]: { EUR: 2.79, USD: 3.29 },
    [RegionEnum.Emea]: { EUR: 3.15, USD: 3.72 },
    [RegionEnum.Latam]: { EUR: 3.15, USD: 3.72 },
    [RegionEnum.Noram]: { EUR: 4.5, USD: 5.31 },
  },
  'amadeus-dsp': {
    [RegionEnum.Aspac]: { EUR: 2.0, USD: 2.4 },
    [RegionEnum.Emea]: { EUR: 2.0, USD: 2.4 },
    [RegionEnum.Latam]: { EUR: 2.0, USD: 2.4 },
    [RegionEnum.Noram]: { EUR: 2.0, USD: 2.4 },
  },
}

export const CPM_DEFAULTS_BY_TACTIC = {
  prospecting: { EUR: 13, USD: 15 },
  remarketing: { EUR: 9, USD: 10 },
  demand_gen: { EUR: null, USD: null },
} as const

export const BUDGET_DISTRIBUTION_SCHEMA = [
  {
    channel: MediaChannelEnum.PaidSearch,
    label: 'Paidsearch',
    platforms: [
      {
        platform: MediaPlatformEnum.GoogleAds,
        label: 'Google Ads',
        tactics: [
          { tactic: MediaTacticEnum.Brand, label: 'Brand' },
          { tactic: MediaTacticEnum.Generic, label: 'Generic' },
          { tactic: MediaTacticEnum.Pmax, label: 'PMax' },
        ],
      },
      {
        platform: MediaPlatformEnum.Bing,
        label: 'Bing',
        tactics: [
          { tactic: MediaTacticEnum.Brand, label: 'Brand' },
          { tactic: MediaTacticEnum.Generic, label: 'Generic' },
        ],
      },
    ],
  },
  {
    channel: MediaChannelEnum.Display,
    label: 'Display',
    platforms: [
      {
        platform: MediaPlatformEnum.Dv360,
        label: 'DV360',
        tactics: [
          {
            tactic: MediaTacticEnum.Prospecting,
            label: 'Prospecting',
            defaults: {
              calculationMode: 'CPM',
              marginPct: 0,
              marginValue: 0,
              cpmByCurrency: CPM_DEFAULTS_BY_TACTIC.prospecting,
            },
          },
          {
            tactic: MediaTacticEnum.Remarketing,
            label: 'Remarketing',
            defaults: {
              calculationMode: 'CPM',
              marginPct: 0,
              marginValue: 0,
              cpmByCurrency: CPM_DEFAULTS_BY_TACTIC.remarketing,
            },
          },
          {
            tactic: MediaTacticEnum.DemandGen,
            label: 'Demand Gen',
            defaults: {
              calculationMode: 'CPM',
              marginPct: 0,
              marginValue: 0,
              cpmByCurrency: CPM_DEFAULTS_BY_TACTIC.demand_gen,
            },
          },
        ],
      },
      {
        platform: MediaPlatformEnum.AmadeusDsp,
        label: 'Amadeus DSP',
        tactics: [
          {
            tactic: MediaTacticEnum.Prospecting,
            label: 'Prospecting',
            defaults: {
              calculationMode: 'CPM',
              marginPct: 0,
              marginValue: 0,
              cpmByCurrency: CPM_DEFAULTS_BY_TACTIC.prospecting,
            },
          },
          {
            tactic: MediaTacticEnum.Remarketing,
            label: 'Remarketing',
            defaults: {
              calculationMode: 'CPM',
              marginPct: 0,
              marginValue: 0,
              cpmByCurrency: CPM_DEFAULTS_BY_TACTIC.remarketing,
            },
          },
        ],
      },
    ],
  },
  {
    channel: MediaChannelEnum.Social,
    label: 'Social',
    platforms: [
      {
        platform: MediaPlatformEnum.FacebookIg,
        label: 'Facebook/IG',
        tactics: [
          { tactic: MediaTacticEnum.Prospecting, label: 'Prospecting', defaults: { marginPct: 50, marginValue: 0 } },
          { tactic: MediaTacticEnum.Remarketing, label: 'Remarketing', defaults: { marginPct: 50, marginValue: 0 } },
          { tactic: MediaTacticEnum.AdvantagePlus, label: 'Advantage+', defaults: { marginPct: 50, marginValue: 0 } },
        ],
      },
      {
        platform: MediaPlatformEnum.Tiktok,
        label: 'TikTok',
        tactics: [
          { tactic: MediaTacticEnum.Prospecting, label: 'Prospecting', defaults: { marginPct: 50, marginValue: 0 } },
          { tactic: MediaTacticEnum.Remarketing, label: 'Remarketing', defaults: { marginPct: 50, marginValue: 0 } },
        ],
      },
      {
        platform: MediaPlatformEnum.Linkedin,
        label: 'LinkedIn',
        tactics: [
          { tactic: MediaTacticEnum.Prospecting, label: 'Prospecting', defaults: { marginPct: 50, marginValue: 0 } },
          { tactic: MediaTacticEnum.Remarketing, label: 'Remarketing', defaults: { marginPct: 50, marginValue: 0 } },
        ],
      },
      {
        platform: MediaPlatformEnum.Pinterest,
        label: 'Pinterest',
        tactics: [
          { tactic: MediaTacticEnum.Prospecting, label: 'Prospecting', defaults: { marginPct: 50, marginValue: 0 } },
          { tactic: MediaTacticEnum.Remarketing, label: 'Remarketing', defaults: { marginPct: 50, marginValue: 0 } },
        ],
      },
    ],
  },
  {
    channel: MediaChannelEnum.Video,
    label: 'Video',
    platforms: [
      {
        platform: MediaPlatformEnum.Youtube,
        label: 'YouTube',
        tactics: [
          { tactic: MediaTacticEnum.Prospecting, label: 'Prospecting', defaults: { marginPct: 50, marginValue: 0 } },
          { tactic: MediaTacticEnum.Remarketing, label: 'Remarketing', defaults: { marginPct: 50, marginValue: 0 } },
        ],
      },
    ],
  },
  {
    channel: MediaChannelEnum.Metasearch,
    label: 'Metasearch',
    platforms: [
      { platform: MediaPlatformEnum.GoogleAds, label: 'Google Hotel' },
      { platform: MediaPlatformEnum.Trivago, label: 'Trivago' },
      { platform: MediaPlatformEnum.Kayak, label: 'Kayak' },
      { platform: MediaPlatformEnum.Tripadvisor, label: 'Tripadvisor' },
    ],
  },
] as const satisfies Array<{
  channel: string
  label: string
  platforms: Array<{
    platform: string
    label: string
    tactics?: Array<{ tactic: string; label: string; defaults?: TacticSchemaDefaults }>
  }>
}>

export const CHANNEL_SCHEMA_MAP: Record<string, string> = {
  paidsearch: 'PAIDSEARCH',
  'paid-search': 'PAIDSEARCH',
  paid_search: 'PAIDSEARCH',
  display: 'DISPLAY',
  social: 'SOCIAL_VIDEO',
  video: 'SOCIAL_VIDEO',
  metasearch: 'METASEARCH',
}

export const CHANNEL_SCHEMAS: Record<string, ChannelSchemaDef> = {
  DEFAULT: {
    id: 'DEFAULT',
    fields: [
      { key: 'spend', label: 'Spend ($)', kind: 'input' },
      { key: 'spendPct', label: 'Spend (%)', kind: 'calc' },
      { key: 'expectedPct', label: '% of Expected', kind: 'calc' },
    ],
    compute(inputs: TacticInputs, ctx: FormulaContext) {
      const spend = inputs.spend ?? 0
      const expectedSpend = FORMULAS.expectedSpend(ctx.contractBudget, ctx.sumFees, ctx.managementFeePct)
      return {
        ...inputs,
        spendPct: FORMULAS.spendPct(spend, ctx.totalSpend),
        expectedPct: FORMULAS.expectedPct(spend, expectedSpend),
      }
    },
  },
  PAIDSEARCH: {
    id: 'PAIDSEARCH',
    fields: [
      { key: 'spend', label: 'Spend ($)', kind: 'input' },
      { key: 'spendPct', label: 'Spend (%)', kind: 'calc' },
      { key: 'expectedPct', label: '% of Expected', kind: 'calc' },
    ],
    compute(inputs: TacticInputs, ctx: FormulaContext) {
      const spend = inputs.spend ?? 0
      const expectedSpend = FORMULAS.expectedSpend(ctx.contractBudget, ctx.sumFees, ctx.managementFeePct)
      return {
        ...inputs,
        marginPct: PAIDSEARCH_MARGIN_PCT,
        marginValue: FORMULAS.tactic_marginValue(spend, PAIDSEARCH_MARGIN_PCT),
        spendPct: FORMULAS.spendPct(spend, ctx.totalSpend),
        expectedPct: FORMULAS.expectedPct(spend, expectedSpend),
      }
    },
  },
  DISPLAY: {
    id: 'DISPLAY',
    fields: [
      { key: 'spend', label: 'Spend ($)', kind: 'input' },
      { key: 'calculationMode', label: 'Mode', kind: 'toggle' },
      { key: 'cpm', label: 'CPM ($)', kind: 'input' },
      { key: 'marginPct', label: 'Margin (%)', kind: 'dual', inputWhenMode: 'MARGIN' },
      { key: 'marginValue', label: 'Margin ($)', kind: 'calc' },
      { key: 'spendPct', label: 'Spend (%)', kind: 'calc' },
      { key: 'expectedPct', label: '% of Expected', kind: 'calc' },
    ],
    compute(inputs: TacticInputs, ctx: FormulaContext) {
      const spend = inputs.spend ?? 0
      const cpm = inputs.cpm ?? 0
      const expectedSpend = FORMULAS.expectedSpend(ctx.contractBudget, ctx.sumFees, ctx.managementFeePct)
      const marginPct =
        ctx.calculationMode === 'CPM'
          ? FORMULAS.display_marginPct_fromCPM(cpm, ctx.platformCostCPM)
          : (inputs.marginPct ?? 0)
      return {
        ...inputs,
        cpm,
        marginPct,
        marginValue: FORMULAS.tactic_marginValue(spend, marginPct),
        spendPct: FORMULAS.spendPct(spend, ctx.totalSpend),
        expectedPct: FORMULAS.expectedPct(spend, expectedSpend),
      }
    },
  },
  SOCIAL_VIDEO: {
    id: 'SOCIAL_VIDEO',
    fields: [
      { key: 'spend', label: 'Spend ($)', kind: 'input' },
      { key: 'marginPct', label: 'Margin (%)', kind: 'input' },
      { key: 'marginValue', label: 'Margin ($)', kind: 'calc' },
      { key: 'spendPct', label: 'Spend (%)', kind: 'calc' },
      { key: 'expectedPct', label: '% of Expected', kind: 'calc' },
    ],
    compute(inputs: TacticInputs, ctx: FormulaContext) {
      const spend = inputs.spend ?? 0
      const marginPct = inputs.marginPct ?? 50
      const expectedSpend = FORMULAS.expectedSpend(ctx.contractBudget, ctx.sumFees, ctx.managementFeePct)
      return {
        ...inputs,
        marginPct,
        marginValue: FORMULAS.tactic_marginValue(spend, marginPct),
        spendPct: FORMULAS.spendPct(spend, ctx.totalSpend),
        expectedPct: FORMULAS.expectedPct(spend, expectedSpend),
      }
    },
  },
  METASEARCH: {
    id: 'METASEARCH',
    fields: [
      { key: 'spend', label: 'Spend ($)', kind: 'input' },
      { key: 'spendPct', label: 'Spend (%)', kind: 'calc' },
      { key: 'expectedPct', label: '% of Expected', kind: 'calc' },
    ],
    compute(inputs: TacticInputs, ctx: FormulaContext) {
      const spend = inputs.spend ?? 0
      const expectedSpend = FORMULAS.expectedSpend(ctx.contractBudget, ctx.sumFees, ctx.managementFeePct)
      return {
        ...inputs,
        spendPct: FORMULAS.spendPct(spend, ctx.totalSpend),
        expectedPct: FORMULAS.expectedPct(spend, expectedSpend),
      }
    },
  },
}