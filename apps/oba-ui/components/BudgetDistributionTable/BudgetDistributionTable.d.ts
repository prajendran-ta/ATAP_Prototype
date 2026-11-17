import { ColumnType } from '@amadeus/react-design-factory/components/Table'

export interface BudgetDistributionTableProps {
  period: ObaQL.Period
  currency: string
  groups?: GroupsData[]
}

export interface GroupsData
  extends
    Pick<ObaQL.GroupPlanInput, 'id' | 'name' | 'version' | 'monthBudgetCents'>,
    Partial<Pick<ObaQL.GroupPlan, 'monthBudgets'>> {}

export interface BudgetTableDataSource extends Pick<GroupsData, 'monthBudgets' | 'monthBudgetCents'> {
  key: string
  name: string
  allottedSum: number
  spentSum?: number
  isSummaryRow?: boolean
}

export type BudgetColumn = ColumnType<BudgetTableDataSource>
