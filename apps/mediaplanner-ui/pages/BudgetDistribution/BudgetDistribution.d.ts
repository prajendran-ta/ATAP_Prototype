type TacticAllocation = MediaplannerQL.TacticAllocation
type TacticAllocationInput = MediaplannerQL.TacticAllocationInput
type SpendBudgetDistributionInput = MediaplannerQL.SpendBudgetDistributionInput
import type { CalculationMode, Currency } from './budgetDistributionConfig/budgetDistributionConfig.d'

export type TacticValues = {
  spend: TacticAllocationInput['spendAmount'] | undefined
  spendPct: TacticAllocation['spendPct']
  expectedPct: TacticAllocation['pctOfExpected']
  cpm?: TacticAllocation['cpmAmount']
  platformCost?: TacticAllocation['platformCost']
  marginPct?: TacticAllocation['marginPct']
  marginValue?: TacticAllocation['marginAmount']
  calculationMode?: CalculationMode
}

export type DigitalRow = {
  key: string
  tabId: string
  platformId: string
  platform: string
  tactic: string
  spend: TacticValues['spend']
  spendPct: TacticValues['spendPct']
  expectedPct: TacticValues['expectedPct']
  cpm?: TacticValues['cpm']
  platformCost?: TacticValues['platformCost']
  marginPct?: TacticValues['marginPct']
  marginValue?: TacticValues['marginValue']
  calculationMode?: TacticValues['calculationMode']
  channelId: string
}

export type MetasearchRow = {
  key: string
  channel: string
  platforms: string
  spend: TacticAllocationInput['spendAmount'] | undefined
  spendPct: TacticAllocation['spendPct']
  expectedPct: TacticAllocation['pctOfExpected']
}

export type TacticItem = {
  id: string
  label: string
  enabled: boolean
  values: TacticValues
}

export type PlatformItem = {
  id: string
  label: string
  enabled: boolean
  tactics: TacticItem[]
}

export type MetasearchPlatformItem = {
  id: string
  label: string
  enabled: boolean
  spend: TacticAllocationInput['spendAmount'] | undefined
  spendPct: TacticAllocation['spendPct']
  expectedPct: TacticAllocation['pctOfExpected']
}

export type MediaTab = {
  id: string
  label: string
  enabled: boolean
  type?: 'digital' | 'metasearch'
  platforms: PlatformItem[]
  metasearchPlatforms?: MetasearchPlatformItem[]
  metasearchSpend?: number
}

export type PastConsumptionAccordionProps = {
  treeRows: Array<Record<string, unknown>>
  showPowerBI: boolean
  currency: Currency
  onAccordionChange: (keys: string[]) => void
  mediaPlanReportFilter?: SharedQL.MediaPlanReportFilter
}

export type DebouncedInputNumberProps = {
  name?: (string | number)[]
  id?: string
  value?: number
  formatAsCurrency?: boolean
  currency?: MediaplannerQL.CurrencyEnum
  min?: number
  max?: number
  precision?: number
  rules?: any[]
  disabled?: boolean
  onChange: (val: number) => void
  delay?: number
}

// Utils state types

export type AllocationState = {
  channel: string
  platform?: string
  platforms?: string[]
  tactic?: string
  spend: TacticAllocationInput['spendAmount']
  spendPct: TacticAllocationInput['spendPct']
  expectedPct: TacticAllocationInput['pctOfExpected']
  marginPct?: TacticAllocationInput['marginPct']
  cpm?: TacticAllocationInput['cpmAmount']
}

export type SpendBudgetDistributionState = Pick<SpendBudgetDistributionInput, 'month' | 'spendPct'>

export type BudgetDistributionState = {
  allocations: AllocationState[]
  spendBudgetDistribution: SpendBudgetDistributionState[]
}
