import dayjs from 'dayjs'
import type { GroupsData } from './BudgetDistributionTable.d'

export const budgetsColsWidth = {
  name: 200,
  month: Math.round(screen.width * 0.063),
}

export const getMonthLabels = (period: ObaQL.Period): string[] => {
  const { startDate, endDate } = period
  const monthsCount = dayjs(endDate).startOf('month').diff(dayjs(startDate).startOf('month'), 'month') + 1
  return Array.from({ length: monthsCount }, (_, i) => dayjs(startDate).add(i, 'month').format('MMM YYYY'))
}

export const getTotalAllocatedBudget = (groups?: GroupsData[]): number => {
  if (!groups) return 0

  const total = groups.reduce(
    (totalSum, group) =>
      totalSum +
      (group.monthBudgetCents?.reduce((groupSum, monthValue) => Number(groupSum) + (monthValue ?? 0), 0) || 0),
    0,
  )
  return Math.round(total * 100) / 100
}
