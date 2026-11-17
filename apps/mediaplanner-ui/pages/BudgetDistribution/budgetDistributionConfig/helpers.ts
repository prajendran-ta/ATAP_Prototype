import { MediaChannelEnum } from '@mediahub/mediaplanner-ui/graphql/generated/mediaplanner-enums'
import { BUDGET_DISTRIBUTION_SCHEMA, CHANNEL_SCHEMA_MAP, CPM_DEFAULTS_BY_TACTIC, PLATFORM_COST_CPM, CHANNEL_SCHEMAS, FORMULAS, CURRENCY_SYMBOL_BY_CODE } from './budgetDistributionConfig'
import type {
  ChannelSchemaDef,
  Currency,
  FormulaContext,
  GlobalCalcResults,
  GlobalInputs,
  Region,
  TacticCalcResults,
  TacticInputs,
  TacticSchemaDefaults,
} from './budgetDistributionConfig.d'

function round2(n: number): number {
  return Math.round(n * 100) / 100
}

function normalizeKey(value: string): string {
  return value.toLowerCase().replace(/-/g, '_')
}

type SupportedCurrency = keyof typeof CURRENCY_SYMBOL_BY_CODE

function resolveSupportedCurrency(currency: Currency): SupportedCurrency {
  return currency === 'USD' ? 'USD' : 'EUR'
}

export function resolvePlatformCostCPM(platformId: string, region: Region, currency: Currency): number {
  return PLATFORM_COST_CPM[platformId]?.[region]?.[currency] ?? 0
}

function findTacticSchemaDefaults(channelId: string, tacticId: string): TacticSchemaDefaults | undefined {
  const normalizedChannel = channelId.toLowerCase().replace(/_/g, '-')
  const normalizedTactic = normalizeKey(tacticId)

  const channelDef = BUDGET_DISTRIBUTION_SCHEMA.find(
    (entry: (typeof BUDGET_DISTRIBUTION_SCHEMA)[number]) => entry.channel.toLowerCase().replace(/_/g, '-') === normalizedChannel,
  )
  if (!channelDef) return undefined

  for (const platformDef of channelDef.platforms) {
    if (!('tactics' in platformDef) || !platformDef.tactics) continue
    for (const tacticDef of platformDef.tactics) {
      const candidate = normalizeKey(String(tacticDef.tactic))
      if (normalizedTactic === candidate || normalizedTactic.endsWith(`_${candidate}`)) {
        return 'defaults' in tacticDef ? tacticDef.defaults : undefined
      }
    }
  }

  return undefined
}

export function resolveCPMDefault(tacticId: string, currency: Currency): number | null {
  const defaults = findTacticSchemaDefaults(MediaChannelEnum.Display, tacticId)
  if (!defaults?.cpmByCurrency) return null
  return defaults.cpmByCurrency[resolveSupportedCurrency(currency)]
}

export function resolveTacticDefaults(
  channelId: string,
  tacticId: string,
  currency: Currency,
): Partial<TacticInputs> & { marginValue?: number } {
  const schemaDefaults = findTacticSchemaDefaults(channelId, tacticId)
  const defaults: Partial<TacticInputs> & { marginValue?: number } = {}
  if (!schemaDefaults) return defaults

  if ('calculationMode' in schemaDefaults && schemaDefaults.calculationMode !== undefined) {
    defaults.calculationMode = schemaDefaults.calculationMode
  }
  if ('marginPct' in schemaDefaults && schemaDefaults.marginPct !== undefined) {
    defaults.marginPct = schemaDefaults.marginPct
  }
  if ('marginValue' in schemaDefaults && schemaDefaults.marginValue !== undefined) {
    defaults.marginValue = schemaDefaults.marginValue
  }

  if ('cpmByCurrency' in schemaDefaults && schemaDefaults.cpmByCurrency) {
    defaults.cpm = schemaDefaults.cpmByCurrency[resolveSupportedCurrency(currency)] ?? 0
  }

  return defaults
}


export function getSchemaForChannel(channelId: string): ChannelSchemaDef {
  const schemaId = CHANNEL_SCHEMA_MAP[channelId] ?? 'DEFAULT'
  return CHANNEL_SCHEMAS[schemaId]
}

export function evaluateFields(schemaId: string, inputs: TacticInputs, ctx: FormulaContext): TacticCalcResults {
  const schema = CHANNEL_SCHEMAS[schemaId] ?? CHANNEL_SCHEMAS.DEFAULT
  return schema.compute(inputs, ctx)
}

export function evaluateGlobalFields(inputs: GlobalInputs): GlobalCalcResults {
  const { totalSpend, totalMarginValue, contractBudget, sumFees, managementFeePct, contractMarginExpectedPct } = inputs
  const expectedSpend = round2(FORMULAS.expectedSpend(contractBudget, sumFees, managementFeePct))
  const marginAmount = FORMULAS.summary_marginAmt(totalMarginValue, managementFeePct, expectedSpend)
  const contractMarginExpectedAmt = FORMULAS.global_contractMarginExpectedAmt(
    contractBudget,
    contractMarginExpectedPct,
    sumFees,
  )
  const contractBudgetTotal = FORMULAS.global_contractBudgetTotal(totalSpend, managementFeePct, sumFees)
  const contractMarginAmt = FORMULAS.global_contractMarginAmt(marginAmount, sumFees)

  return {
    spendBudget: FORMULAS.global_spendBudget(totalSpend),
    contractMarginAmt,
    contractMarginExpectedAmt,
    contractMarginExpectedPct: FORMULAS.global_contractMarginExpectedPct(contractMarginExpectedAmt, expectedSpend),
    contractProfitTarget: contractMarginExpectedPct,
    contractBudgetMarginAmt: FORMULAS.global_contractBudgetMarginAmt(contractBudget, contractMarginExpectedPct),
    contractBudgetTotal,
    contractMarginPct: FORMULAS.global_contractMarginPct(contractMarginAmt, contractBudgetTotal),
    actualMarginPct: FORMULAS.global_actualMarginPct(totalMarginValue, totalSpend),
    expectedSpend,
  }
}

type AllocationWithMarginAmount = {
  tactics?: Array<{ marginAmount?: number | null } | null> | null
}

export function evaluateTotalMarginAmount(
  allocations: AllocationWithMarginAmount[],
  contractBudget: number,
  sumFees: number,
  managementFeePct: number,
): number {
  const totalMarginAmount = allocations
    .flatMap(allocation => allocation.tactics ?? [])
    .reduce((sum, tactic) => sum + Number(tactic?.marginAmount ?? 0), 0)
  const expectedSpend = FORMULAS.expectedSpend(contractBudget, sumFees, managementFeePct)
  return FORMULAS.summary_marginAmt(totalMarginAmount, managementFeePct, expectedSpend)
}
