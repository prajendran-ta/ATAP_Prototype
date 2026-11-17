import dayjs from 'dayjs'
import { Button } from '@amadeus/react-design-factory'
import { formatNumber } from '@amadeus/react-utils'
import { ColumnsType } from '@amadeus/react-design-factory/components/Table'
import * as Styled from './CampaignAllocation.styled'

const month = String(dayjs().get('month') + 1).padStart(2, '0')
const currentMonthAndYear = `${dayjs().get('year')}-${month}`

export const getGroupPlanColumns = (
  onCLickDetails: (id: number) => void,
  currency = '',
): ColumnsType<ObaQL.GroupPlan> => [
  {
    title: 'Status',
    dataIndex: 'status',
    //TODO : replace with switch case
    render: (value: string) => {
      if (value.toLowerCase() === 'active') {
        return <Styled.CheckCircleOutlined />
      } else if (value.toLowerCase() === 'incomplete') {
        return <Styled.InfoCircleOutlined />
      } else if (value.toLowerCase() === 'error') {
        return <Styled.CloseCircleOutlined />
      } else {
        return '-'
      }
    },
  },
  {
    title: 'Group Name',
    dataIndex: 'name',
  },
  {
    title: 'Total Budget Allocated',
    dataIndex: ['totalBudget', 'budgetCents'],
    render: (value: ObaQL.Budget['budgetCents']) => (value ? `${formatNumber(value / 100)} ${currency}` : '-'),
  },
  {
    title: 'Total Budget Spent',
    dataIndex: ['totalBudget', 'spentCents'],
    render: (value: ObaQL.Budget['spentCents']) => (value ? `${formatNumber(value / 100)} ${currency}` : '-'),
  },
  {
    title: 'Budget Allocated Current Month',
    dataIndex: ['monthBudgets'],
    render: (value: ObaQL.MonthBudget[]) => {
      const currentMonthBudget = value?.find(mb => mb.month === currentMonthAndYear)?.budget?.budgetCents
      return currentMonthBudget ? `${formatNumber(currentMonthBudget / 100)} ${currency}` : '-'
    },
  },
  {
    title: 'Budget Spent Current Month',
    dataIndex: ['monthBudgets'],
    render: (value: ObaQL.MonthBudget[]) => {
      const currentMonthBudgetSpent = value?.find(mb => mb.month === currentMonthAndYear)?.budget?.spentCents
      return currentMonthBudgetSpent ? `${formatNumber(currentMonthBudgetSpent / 100)} ${currency}` : '-'
    },
  },
  {
    title: 'KPI',
    dataIndex: 'kpi',
    render: (value: string | null) => value || '-',
  },
  {
    title: 'Campaigns',
    dataIndex: ['bundles'],
    render: (value: ObaQL.BundlePlan[]) => {
      const totalCampaigns = value?.reduce((acc, bundle) => acc + (bundle?.vendorCampaignIds?.length ?? 0), 0) || 0
      return totalCampaigns || '-'
    },
  },
  {
    title: '',
    dataIndex: 'details',
    render: (_: string, groupPlan: ObaQL.GroupPlan, index: number) => (
      <Button
        id={`oba-campaign_allocation-${index}-lnk`}
        variant='text'
        onClick={() => onCLickDetails(groupPlan.id || 0)}
      >
        Details
      </Button>
    ),
  },
]
