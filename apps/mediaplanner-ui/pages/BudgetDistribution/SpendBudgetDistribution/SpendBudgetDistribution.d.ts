export type SpendBudgetDistributionProps = {
  period: string[]
  totalBudget: number
  currency: string
  treeRows?: any[]
  initialPercentages?: number[]
  recommendedPercentages?: Map<string, number>
  onDistributionChange?: (distribution: { month: string; spendPct: number }[]) => void
  errorMessage?: string | null
  disabled?: boolean
}
