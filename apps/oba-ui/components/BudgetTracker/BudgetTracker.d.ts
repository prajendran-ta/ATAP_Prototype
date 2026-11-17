export interface BudgetTrackerProps {
  totalBudget: number
  allocatedBudget?: number
  spentBudget?: number
  unspentBudget?: number
  currency?: string
  startDate?: ObaQL.InputMaybe<string>
  endDate?: ObaQL.InputMaybe<string>
}
