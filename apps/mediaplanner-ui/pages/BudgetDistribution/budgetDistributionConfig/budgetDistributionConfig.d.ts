export type CalculationMode = MediaplannerQL.TacticAllocation['calculationMode']
export type Currency = 'EUR' | 'USD'
export type Region = `${MediaplannerQL.RegionEnum}`

export type TacticSchemaDefaults = {
  calculationMode?: CalculationMode
  marginPct?: number
  marginValue?: number
  cpmByCurrency?: {
    EUR: number | null
    USD: number | null
  }
}

export interface FormulaContext {
  totalSpend: number
  contractBudget: number
  sumFees: number
  managementFeePct: number
  platformCostCPM: number
  calculationMode: CalculationMode
  currency: Currency
  region: Region
}

export interface TacticInputs {
  spend: number
  cpm?: number | null
  marginPct?: number | null
  connectivityFee?: number | null
  setupFee?: number | null
  calculationMode?: CalculationMode
}

export interface TacticCalcResults extends TacticInputs {
  marginValue?: number
  spendPct: number
  expectedPct: number
}

export interface GlobalInputs {
  totalSpend: number
  totalMarginValue: number
  contractBudget: number
  sumFees: number
  managementFeePct: number
  contractMarginExpectedPct: number
}

export interface GlobalCalcResults {
  spendBudget: number
  contractMarginAmt: number
  contractMarginExpectedAmt: number
  contractMarginExpectedPct: number
  contractProfitTarget: number
  contractBudgetMarginAmt: number
  contractBudgetTotal: number
  contractMarginPct: number
  actualMarginPct: number
  expectedSpend: number
}

export type FieldKind = 'input' | 'calc' | 'dual' | 'toggle'

export interface FieldDef {
  key: string
  label: string
  kind: FieldKind
  inputWhenMode?: CalculationMode
}

export interface ChannelSchemaDef {
  id: string
  fields: FieldDef[]
  compute: (inputs: TacticInputs, ctx: FormulaContext) => TacticCalcResults
}