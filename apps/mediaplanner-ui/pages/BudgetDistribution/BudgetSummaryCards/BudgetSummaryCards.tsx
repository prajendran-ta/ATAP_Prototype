import React, { FC } from 'react'
import { Table, Text } from '@amadeus/react-design-factory'
import * as Styled from '../BudgetDistribution.styled'
import type { GlobalCalcResults } from '../budgetDistributionConfig/budgetDistributionConfig.d'
import { FORMULAS } from '../budgetDistributionConfig/budgetDistributionConfig'
import { formatCurrencyWithSuffixSymbol, formatNumber, getCurrencySymbol } from '../../utils/number'

type ChannelSpendRow = {
  key: string
  channel: string
  spend: number
}

type FeeBreakdownRow = {
  key: string
  fee: string
  percentage: string
  total: string
}

type BudgetSummaryCardsProps = {
  channelSpends: ChannelSpendRow[]
  globalStats: GlobalCalcResults
  contractBudget: number
  feeBreakdown: FeeBreakdownRow[]
  totalMarginAmount: number
  currency: string
  expectedBudget?: number
}

export const BudgetSummaryCards: FC<BudgetSummaryCardsProps> = ({
  channelSpends,
  globalStats,
  contractBudget,
  feeBreakdown,
  totalMarginAmount,
  currency,
  expectedBudget = 0,
}) => {
  const totalMarginPct = FORMULAS.summary_marginPct(totalMarginAmount, globalStats.contractBudgetTotal)
  const contractMarginPct = FORMULAS.summary_marginPct(globalStats.contractMarginAmt, globalStats.contractBudgetTotal)
  const showExpected = expectedBudget > 0
  const expectedMarginAmount = expectedBudget * (globalStats.contractProfitTarget / 100)
  const currencySymbol = getCurrencySymbol(currency)

  return (
    <Styled.SummaryGridRow>
      <Styled.SummaryCard>
        <Text.H6 id='media_plan_budget_distribution-channel_breakdown-ttl'>Channel Breakdown</Text.H6>
        <Table
          id='media_plan_budget_distribution-channel_breakdown-tbl'
          cellsIdPrefix='media_plan_budget_distribution-channel_breakdown'
          pagination={false}
          columns={[
            {
              title: 'Channel',
              dataIndex: 'channel',
              render: (v: string, row: any) => (row.key === 'total' ? <Styled.BoldText>{v}</Styled.BoldText> : v),
            },
            {
              title: 'Spend',
              dataIndex: 'spend',
              align: 'right' as const,
              render: (v: any, row: any) => (row.key === 'total' ? <Styled.BoldText>{v}</Styled.BoldText> : v),
            },
          ]}
          dataSource={[
            ...channelSpends.map(cs => ({ ...cs, spend: formatCurrencyWithSuffixSymbol(cs.spend, currency, { min: 0, max: 0 }) })),
            { key: 'total', channel: 'Total', spend: formatCurrencyWithSuffixSymbol(globalStats.spendBudget, currency, { min: 0, max: 0 }) },
          ]}
        />
      </Styled.SummaryCard>

      <Styled.SummaryCard>
        <Text.H6 id='media_plan_budget_distribution-budget_summary-ttl'>Budget Summary</Text.H6>
        <Table
          id='media_plan_budget_distribution-budget_summary-tbl'
          cellsIdPrefix='media_plan_budget_distribution-budget_summary'
          pagination={false}
          columns={[
            { title: 'Metrics', dataIndex: 'metric' },
            ...(showExpected ? [{ title: 'Expected', dataIndex: 'expected', align: 'right' as const }] : []),
            { title: 'Total', dataIndex: 'total', align: 'right' as const },
          ]}
          dataSource={[
            {
              key: '1',
              metric: 'Spend',
              ...(showExpected && { expected: formatCurrencyWithSuffixSymbol(expectedBudget, currency, { min: 0, max: 0 }) }),
              total: formatCurrencyWithSuffixSymbol(globalStats.spendBudget, currency, { min: 0, max: 0 }),
            },
            {
              key: '2',
              metric: `Margin (${currencySymbol})`,
              ...(showExpected && { expected: formatCurrencyWithSuffixSymbol(expectedMarginAmount, currency, { min: 0, max: 0 }) }),
              total: formatCurrencyWithSuffixSymbol(totalMarginAmount, currency, { min: 0, max: 0 }),
            },
            {
              key: '3',
              metric: 'Margin (%)',
              ...(showExpected && { expected: `${formatNumber(globalStats.contractProfitTarget)}%` }),
              total: `${formatNumber(totalMarginPct)}%`,
            },
            {
              key: '4',
              metric: `Contract Margin (${currencySymbol})`,
              ...(showExpected && { expected: formatCurrencyWithSuffixSymbol(expectedMarginAmount, currency, { min: 0, max: 0 }) }),
              total: formatCurrencyWithSuffixSymbol(globalStats.contractMarginAmt, currency, { min: 0, max: 0 }),
            },
            {
              key: '5',
              metric: 'Contract Margin (%)',
              ...(showExpected && { expected: `${formatNumber(globalStats.contractProfitTarget)}%` }),
              total: `${formatNumber(contractMarginPct)}%`,
            },
            {
              key: '6',
              metric: 'Contract Budget',
              ...(showExpected && { expected: formatCurrencyWithSuffixSymbol(expectedBudget, currency, { min: 0, max: 0 }) }),
              total: formatCurrencyWithSuffixSymbol(globalStats.contractBudgetTotal, currency, { min: 0, max: 0 }),
            },
          ]}
        />
      </Styled.SummaryCard>
    </Styled.SummaryGridRow>
  )
}
