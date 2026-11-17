import React, { useMemo } from 'react'
import { Button } from '@amadeus/react-design-factory'
import { formatDate, formatNumber } from '@amadeus/react-utils'
import { useAdvertiserNamesQuery, useAdvertiserPlanNamesQuery } from './AdvertiserPlans.queries'
import { AdvertiserPlanStatusEnum } from '@mediahub/oba-ui/graphql/generated/oba-enums'
// Types
import type { SelectOption } from '@amadeus/react-design-factory/components/Select'
import type { ColumnsType } from '@amadeus/react-design-factory/components/Table'
import type { PlanFilter } from './AdvertiserPlans.d'

export const usePlanNameOptions = () => {
  const { planNames, ...rest } = useAdvertiserPlanNamesQuery({ filter: {} })
  const planNameOptions: SelectOption[] = useMemo(
    () => planNames?.map(({ id, name }) => ({ value: id, label: name })) || [],
    [planNames],
  )
  return { planNameOptions, ...rest }
}

export const useAdvertiserNameOptions = () => {
  const { advertiserNames, ...rest } = useAdvertiserNamesQuery({
    filter: {},
  })
  const advertiserNameOptions: SelectOption[] = useMemo(
    () =>
      advertiserNames
        ?.map(({ id, name, bpid }) => ({ value: id, label: `${name} (${bpid ?? '-'})` }))
        .sort((a, b) => a.label.localeCompare(b.label)) || [],
    [advertiserNames],
  )
  return { advertiserNameOptions, ...rest }
}

export const statusOptions: SelectOption[] = Object.values(AdvertiserPlanStatusEnum)
  .filter(value => value !== AdvertiserPlanStatusEnum.Unknown)
  .map(value => ({ value, label: value }))

export const filterNameMap: Record<PlanFilter, string> = {
  ids: 'Plan Name',
  advertiserIds: 'Advertiser',
  status: 'Status',
}

export const plansTableColumns: ColumnsType<ObaQL.AdvertiserPlanLite> = [
  { title: 'Status', dataIndex: 'status' },
  //TODO: { title: '', dataIndex: 'info-icon', align: 'center', render: () => <Icon /> }
  {
    title: 'Plan Name',
    dataIndex: 'name',
    render: (_, plan) => (
      <Button variant='text' href={`/oba/plans/${plan.id}/settings`}>
        {plan.name}
      </Button>
    ),
  },
  {
    title: 'Advertiser Name (BPID)',
    dataIndex: ['advertiser', 'name'],
    render: (_, plan) => <span>{`${plan.advertiser.name} (${plan.advertiser?.bpid ?? '-'})`}</span>,
  },
  {
    title: 'Total Budget',
    dataIndex: ['totalBudget', 'budgetCents'],
    render: (value: ObaQL.Budget['budgetCents'], { currency }) =>
      value ? `${formatNumber(value / 100)} ${currency}` : '-',
  },
  {
    title: 'Start Date',
    dataIndex: ['period', 'startDate'],
    render: (value: ObaQL.Period['startDate']) => (value ? formatDate(value) : '-'),
  },
  {
    title: 'End Date',
    dataIndex: ['period', 'endDate'],
    render: (value: ObaQL.Period['endDate']) => (value ? formatDate(value) : '-'),
  },
  {
    title: 'Total Spent',
    dataIndex: ['totalBudget', 'spentCents'],
    render: (value: ObaQL.Budget['spentCents'], { currency }) =>
      value ? `${formatNumber(value / 100)} ${currency}` : '-',
  },
  { title: 'Margin (%)', dataIndex: 'marginPercent', render: (value: number) => (value ? `${value} %` : '-') },
  { title: 'Groups', dataIndex: 'nbGroups', render: value => value || '-' },
  {
    title: '',
    dataIndex: 'details',
    align: 'center',
    render: (_, plan, index) => (
      <Button id={`details-${index}-link`} variant='text' href={`/oba/plans/${plan.id}/details`}>
        Details
      </Button>
    ),
  },
]
