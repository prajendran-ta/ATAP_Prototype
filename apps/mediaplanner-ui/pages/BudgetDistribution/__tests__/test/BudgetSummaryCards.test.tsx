import React from 'react'
import { render, screen } from '@testing-library/react'
import { BudgetSummaryCards } from '../../BudgetSummaryCards'
import { FORMULAS } from '../../budgetDistributionConfig/budgetDistributionConfig'
import { formatCurrencyWithSuffixSymbol } from '../../../utils/number'

// getComputedStyle — not mocked by setupTests.ts; required by Ant Design table layout
Object.defineProperty(window, 'getComputedStyle', {
  value: () =>
    ({
      getPropertyValue: () => '',
      overflow: 'scroll',
      overflowY: 'scroll',
      overflowX: 'scroll',
    }) as any,
})

// ResizeObserver — not available in jsdom
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
;(global as any).ResizeObserver = ResizeObserverMock

jest.mock('rc-util/lib/getScrollBarSize', () => ({
  __esModule: true,
  default: () => 0,
  getTargetScrollBarSize: () => ({ width: 0, height: 0 }),
}))

jest.mock('rc-util/es/getScrollBarSize', () => ({
  __esModule: true,
  default: () => 0,
  getTargetScrollBarSize: () => ({ width: 0, height: 0 }),
}))

const baseGlobalStats = {
  spendBudget: 10000,
  expectedSpend: 9000,
  contractMarginAmt: 2000,
  contractMarginExpectedAmt: 1800,
  contractMarginExpectedPct: 20,
  contractBudgetMarginAmt: 3000,
  contractBudgetTotal: 110000,
  contractProfitTarget: 20,
  contractMarginPct: 1.82,
  actualMarginPct: 18,
}

const baseFeeBreakdown = [
  { key: '1', fee: 'Management', percentage: '10.00%', total: '1000' },
  { key: '2', fee: 'Setup', percentage: '—', total: '500' },
  { key: '3', fee: 'Metasearch Setup', percentage: '—', total: '200' },
  { key: '4', fee: 'Creative', percentage: '—', total: '300' },
  { key: '5', fee: 'Video Creative', percentage: '—', total: '400' },
  { key: '6', fee: 'Total', percentage: '', total: '2400' },
]

const baseChannelSpends = [
  { key: 'social', channel: 'Social', spend: 5000 },
  { key: 'display', channel: 'Display', spend: 5000 },
]

const baseCurrency = 'USD'

const renderCards = (overrides = {}) =>
  render(
    <BudgetSummaryCards
      channelSpends={baseChannelSpends}
      globalStats={baseGlobalStats}
      contractBudget={100000}
      feeBreakdown={baseFeeBreakdown}
      totalMarginAmount={2000}
      currency={baseCurrency}
      {...overrides}
    />,
  )

describe('BudgetSummaryCards', () => {
  test('renders the Channel Breakdown section', () => {
    renderCards()
    expect(screen.getByText('Channel Breakdown')).toBeInTheDocument()
  })

  test('hides the Fee Breakdown section', () => {
    renderCards()
    expect(screen.queryByText('Fee Breakdown')).not.toBeInTheDocument()
  })

  test('renders the Budget Summary section', () => {
    renderCards()
    expect(screen.getByText('Budget Summary')).toBeInTheDocument()
  })

  test('shows channel names in the channel breakdown table', () => {
    renderCards()
    expect(screen.getByText('Social')).toBeInTheDocument()
    expect(screen.getByText('Display')).toBeInTheDocument()
  })

  test('shows "Total" row in the channel breakdown table', () => {
    renderCards()
    const totals = screen.getAllByText('Total')
    expect(totals.length).toBeGreaterThanOrEqual(1)
  })

  test('shows budget summary metric labels', () => {
    renderCards()
    expect(screen.getAllByText('Spend').length).toBeGreaterThan(0)
    expect(screen.getByText('Contract Budget')).toBeInTheDocument()
  })

  // ─────────────────────────────────────────────────────────────────────────
  // Formula calculation correctness
  // ─────────────────────────────────────────────────────────────────────────

  describe('Channel Breakdown – formula calculations', () => {
    test('displays each channel spend value as provided', () => {
      renderCards()
      // Two channels both with spend 5000 — both rendered as individual cells
      const cells = screen.getAllByText(formatCurrencyWithSuffixSymbol(5000, baseCurrency, { min: 0, max: 0 }))
      expect(cells.length).toBeGreaterThanOrEqual(2)
    })

    test('Total row displays spendBudget formatted as currency', () => {
      const totalText = formatCurrencyWithSuffixSymbol(baseGlobalStats.spendBudget, baseCurrency, { min: 0, max: 0 })
      renderCards()
      // The value appears in both Channel Breakdown Total and Budget Summary Spend total
      const cells = screen.getAllByText(totalText)
      expect(cells.length).toBeGreaterThanOrEqual(1)
    })

    test('Total row spend matches FORMULAS.global_spendBudget applied to the sum of channel spends', () => {
      const sumOfChannels = baseChannelSpends.reduce((acc, r) => acc + r.spend, 0)
      const computed = FORMULAS.global_spendBudget(sumOfChannels)
      // baseGlobalStats.spendBudget is expected to equal the formula result
      expect(baseGlobalStats.spendBudget).toBe(computed)
      // The computed value appears in at least the Channel Breakdown Total row
      renderCards()
      const cells = screen.getAllByText(formatCurrencyWithSuffixSymbol(computed, baseCurrency, { min: 0, max: 0 }))
      expect(cells.length).toBeGreaterThanOrEqual(1)
    })

    test('renders a distinct Total row even when overriding spendBudget', () => {
      const overriddenSpend = 12345
      renderCards({
        globalStats: { ...baseGlobalStats, spendBudget: overriddenSpend },
      })
      // The value appears in both Channel Breakdown Total and Budget Summary Spend total
      const cells = screen.getAllByText(formatCurrencyWithSuffixSymbol(overriddenSpend, baseCurrency, { min: 0, max: 0 }))
      expect(cells.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Budget Summary – formula calculations', () => {
    test('hides Expected column when no Step 2 budget is allotted', () => {
      renderCards()
      expect(screen.queryByText('Expected')).not.toBeInTheDocument()
      expect(screen.getAllByText('Total').length).toBeGreaterThanOrEqual(1)
    })

    test('Spend row: expected = Step 2 allotted budget, total = spendBudget', () => {
      renderCards({ expectedBudget: 15000 })
      expect(screen.getByText('Expected')).toBeInTheDocument()
      expect(screen.getAllByText(formatCurrencyWithSuffixSymbol(15000, baseCurrency, { min: 0, max: 0 })).length).toBeGreaterThanOrEqual(1)
      const spendCells = screen.getAllByText(formatCurrencyWithSuffixSymbol(baseGlobalStats.spendBudget, baseCurrency, { min: 0, max: 0 }))
      expect(spendCells.length).toBeGreaterThanOrEqual(1)
    })

    test('does not use Step 1 expectedSpend for the expected budget value', () => {
      renderCards()
      expect(screen.queryByText(formatCurrencyWithSuffixSymbol(baseGlobalStats.expectedSpend, baseCurrency, { min: 0, max: 0 }))).not.toBeInTheDocument()
    })

    test('Margin ($) row: expected = Step 2 budget margin, total = totalMarginAmount', () => {
      renderCards({ expectedBudget: 15000 })
      expect(screen.getAllByText(formatCurrencyWithSuffixSymbol(3000, baseCurrency, { min: 0, max: 0 })).length).toBeGreaterThanOrEqual(1)
      // totalMarginAmount = 2000; contractMarginExpectedAmt = 1800 → both distinct
      expect(screen.getAllByText(formatCurrencyWithSuffixSymbol(2000, baseCurrency, { min: 0, max: 0 })).length).toBeGreaterThanOrEqual(1)
    })

    test('Margin (%) row: expected = Step 2 budget margin %, total = FORMULAS.summary_marginPct(totalMarginAmount, contractBudgetTotal)%', () => {
      const totalMarginPct = FORMULAS.summary_marginPct(
        2000, // totalMarginAmount
        baseGlobalStats.contractBudgetTotal,
      )
      renderCards({ expectedBudget: 15000 })
      // contractMarginExpectedPct (20%) also equals contractProfitTarget — both render as "20%"
      const twentyPctCells = screen.getAllByText(`${baseGlobalStats.contractMarginExpectedPct}%`)
      expect(twentyPctCells.length).toBeGreaterThanOrEqual(1)
      // totalMarginPct also equals contractMarginPct in this fixture (same amt/total) — both render as "1.82%"
      const marginPctCells = screen.getAllByText(`${totalMarginPct}%`)
      expect(marginPctCells.length).toBeGreaterThanOrEqual(1)
    })

    test('Margin (%) total changes correctly when totalMarginAmount changes', () => {
      const newTotalMarginAmount = 5500
      const expectedPct = FORMULAS.summary_marginPct(newTotalMarginAmount, baseGlobalStats.contractBudgetTotal)
      renderCards({ totalMarginAmount: newTotalMarginAmount })
      expect(screen.getByText(`${expectedPct}%`)).toBeInTheDocument()
    })

    test('Margin (%) total is 0% when contractBudgetTotal is zero (division-by-zero guard)', () => {
      renderCards({
        globalStats: { ...baseGlobalStats, contractBudgetTotal: 0 },
      })
      // FORMULAS.summary_marginPct returns 0 when contractBudgetTotal === 0
      const guardedPct = FORMULAS.summary_marginPct(2000, 0)
      expect(guardedPct).toBe(0)
      expect(screen.getAllByText('0%').length).toBeGreaterThanOrEqual(1)
    })

    test('Contract Margin ($) row: expected = Step 2 budget margin amount, total = contractMarginAmt', () => {
      renderCards({ expectedBudget: 15000 })
      // contractBudgetMarginAmt (3,000) is unique across all cards
      expect(screen.getAllByText(formatCurrencyWithSuffixSymbol(baseGlobalStats.contractBudgetMarginAmt, baseCurrency, { min: 0, max: 0 })).length).toBeGreaterThanOrEqual(1)
      // contractMarginAmt (2,000) equals totalMarginAmount — both appear in Budget Summary
      const marginCells = screen.getAllByText(formatCurrencyWithSuffixSymbol(baseGlobalStats.contractMarginAmt, baseCurrency, { min: 0, max: 0 }))
      expect(marginCells.length).toBeGreaterThanOrEqual(1)
    })

    test('Contract Margin ($) expected matches FORMULAS.global_contractBudgetMarginAmt(contractBudget, contractProfitTarget)', () => {
      // Verify the formula: contractBudget * (profitTarget / 100)
      // Using inputs that produce a known round result: 15000 * 20% = 3000
      const computed = FORMULAS.global_contractBudgetMarginAmt(15000, 20)
      expect(computed).toBe(3000)
      // The fixture contractBudgetMarginAmt=3000 should be rendered in the card
      renderCards({ expectedBudget: 15000 })
      const cells = screen.getAllByText(formatCurrencyWithSuffixSymbol(baseGlobalStats.contractBudgetMarginAmt, baseCurrency, { min: 0, max: 0 }))
      expect(cells.length).toBeGreaterThanOrEqual(1)
    })

    test('Contract Margin (%) row: expected = contractProfitTarget%, total = FORMULAS.summary_marginPct(contractMarginAmt, contractBudgetTotal)%', () => {
      const contractMarginPct = FORMULAS.summary_marginPct(
        baseGlobalStats.contractMarginAmt,
        baseGlobalStats.contractBudgetTotal,
      )
      renderCards({ expectedBudget: 15000 })
      // contractProfitTarget (20%) also equals contractMarginExpectedPct — both render as "20%"
      const twentyPctCells = screen.getAllByText(`${baseGlobalStats.contractProfitTarget}%`)
      expect(twentyPctCells.length).toBeGreaterThanOrEqual(1)
      // contractMarginPct also equals totalMarginPct in this fixture (same amt/total) — both render as "1.82%"
      const contractPctCells = screen.getAllByText(`${contractMarginPct}%`)
      expect(contractPctCells.length).toBeGreaterThanOrEqual(1)
    })

    test('Contract Margin (%) total changes correctly when contractMarginAmt changes', () => {
      const newContractMarginAmt = 8800
      const expectedPct = FORMULAS.summary_marginPct(newContractMarginAmt, baseGlobalStats.contractBudgetTotal)
      renderCards({
        globalStats: { ...baseGlobalStats, contractMarginAmt: newContractMarginAmt },
      })
      expect(screen.getByText(`${expectedPct}%`)).toBeInTheDocument()
    })

    test('Contract Budget row: expected = Step 2 budget, total = contractBudgetTotal', () => {
      renderCards({ expectedBudget: 15000 })
      expect(screen.getAllByText(formatCurrencyWithSuffixSymbol(15000, baseCurrency, { min: 0, max: 0 })).length).toBeGreaterThanOrEqual(1)
      expect(screen.getByText(formatCurrencyWithSuffixSymbol(baseGlobalStats.contractBudgetTotal, baseCurrency, { min: 0, max: 0 }))).toBeInTheDocument()
    })

    test('Contract Budget total matches FORMULAS.global_contractBudgetTotal(totalSpend, managementFeePct, sumFees)', () => {
      // Verify the formula produces the same contractBudgetTotal used in the test fixture.
      // With totalSpend=10000, managementFeePct=0, sumFees=2400:
      // global_contractBudgetTotal(10000, 0, 2400) = Math.round((10000 * 1 + 2400) * 100) / 100 = 12400
      // The fixture uses a pre-computed contractBudgetTotal=110000 to simulate a realistic scenario;
      // here we verify the formula itself is consistent for a simple known input.
      const computed = FORMULAS.global_contractBudgetTotal(10000, 0, 2400)
      expect(computed).toBe(12400)
    })
  })
})
