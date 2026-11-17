import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Form } from '@amadeus/react-design-factory'
import SpendBudgetDistribution from '../../SpendBudgetDistribution/SpendBudgetDistribution'

Object.defineProperty(window, 'getComputedStyle', {
  value: () =>
    ({
      getPropertyValue: () => '',
      overflow: 'scroll',
      overflowY: 'scroll',
      overflowX: 'scroll',
    }) as any,
})

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

jest.mock('@amadeus/react-design-factory/components/Icon/Icon', () => ({
  __esModule: true,
  default: () => <span data-testid='icon' />,
}))

const THREE_MONTHS = ['Jan 2025', 'Feb 2025', 'Mar 2025']

const renderWithForm = (ui: React.ReactElement) => render(<Form>{ui}</Form>)

const renderComponent = (overrides: Partial<React.ComponentProps<typeof SpendBudgetDistribution>> = {}) =>
  renderWithForm(
    <SpendBudgetDistribution
      period={THREE_MONTHS}
      totalBudget={90000}
      currency='EUR'
      onDistributionChange={jest.fn()}
      {...overrides}
    />,
  )

describe('SpendBudgetDistribution — structure', () => {
  test('renders the "Spend Budget Distribution" section title', () => {
    renderComponent()
    expect(screen.getByText('Spend Budget Distribution')).toBeInTheDocument()
  })

  test('renders the distribution table', () => {
    const { container } = renderComponent()
    expect(container.querySelector('#media_plan_budget_distribution-spend-tbl')).toBeInTheDocument()
  })

  test('renders the Seasonality (%) row', () => {
    renderComponent()
    expect(screen.getByText('Seasonality (%)')).toBeInTheDocument()
  })

  test('renders the Recommended Seasonality row', () => {
    renderComponent()
    expect(screen.getByText(/Recommended Seasonality/i)).toBeInTheDocument()
  })

  test('renders the Total Spend row', () => {
    renderComponent()
    expect(screen.getByText('Total Spend')).toBeInTheDocument()
  })

  test('renders a column header for each month in the period', () => {
    renderComponent()
    // AntD Table renders measure cells alongside header cells — use getAllByText
    expect(screen.getAllByText('Jan 2025').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Feb 2025').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Mar 2025').length).toBeGreaterThan(0)
  })

  test('renders a seasonality input for each month', () => {
    renderComponent()
    const inputs = document.querySelectorAll('[id^="media_plan_budget_distribution-seasonality-"]')
    expect(inputs).toHaveLength(THREE_MONTHS.length)
  })

  test('renders spend amounts with currency symbol', () => {
    renderComponent({ totalBudget: 90000, initialPercentages: [34, 33, 33] })

    expect(screen.getByText('90,000 €')).toBeInTheDocument()
  })
})

describe('SpendBudgetDistribution — distribution logic', () => {
  test('calls onDistributionChange on mount with an entry per month', async () => {
    const onDistributionChange = jest.fn()
    renderComponent({ onDistributionChange })
    await waitFor(() => expect(onDistributionChange).toHaveBeenCalled())
    const [distribution] = onDistributionChange.mock.calls[0]
    expect(distribution).toHaveLength(THREE_MONTHS.length)
    distribution.forEach((entry: { month: string; spendPct: number }) => {
      expect(entry).toHaveProperty('month')
      expect(entry).toHaveProperty('spendPct')
    })
  })

  test('initial percentages sum to 100 across three months', async () => {
    const onDistributionChange = jest.fn()
    renderComponent({ onDistributionChange })
    await waitFor(() => expect(onDistributionChange).toHaveBeenCalled())
    const [distribution] = onDistributionChange.mock.calls[0]
    const sum = distribution.reduce((a: number, d: { spendPct: number }) => a + d.spendPct, 0)
    expect(sum).toBe(100)
  })

  test('uses initialPercentages when provided', async () => {
    const onDistributionChange = jest.fn()
    renderComponent({ initialPercentages: [20, 30, 50], onDistributionChange })
    await waitFor(() => expect(onDistributionChange).toHaveBeenCalled())
    const distributions = onDistributionChange.mock.calls.flatMap((c: any) => c[0]) as Array<{
      month: string
      spendPct: number
    }>
    // The last call should reflect the supplied percentages
    const last = onDistributionChange.mock.calls[onDistributionChange.mock.calls.length - 1][0]
    const percents = last.map((d: { spendPct: number }) => d.spendPct)
    expect(percents).toEqual([20, 30, 50])
  })

  test('calls onDistributionChange when a seasonality input changes', async () => {
    const onDistributionChange = jest.fn()
    renderComponent({ onDistributionChange })
    const inputs = document.querySelectorAll<HTMLInputElement>('[id^="media_plan_budget_distribution-seasonality-"]')
    onDistributionChange.mockClear()
    fireEvent.change(inputs[0], { target: { value: '40' } })
    await waitFor(() => expect(onDistributionChange).toHaveBeenCalled())
  })

  test('renders without error when treeRows are provided', () => {
    const treeRows = [
      { key: 'social', label: 'Social', type: 'tab', rowTotal: 5000, 'col-0': 1667, 'col-1': 1667, 'col-2': 1666 },
    ]
    // Should not throw; Total Spend row still renders
    renderComponent({ treeRows })
    expect(screen.getByText('Total Spend')).toBeInTheDocument()
  })

  test('shows empty period gracefully (no seasonality inputs)', () => {
    const onDistributionChange = jest.fn()
    renderComponent({ period: [], onDistributionChange })
    const inputs = document.querySelectorAll('[id^="media_plan_budget_distribution-seasonality-"]')
    expect(inputs).toHaveLength(0)
  })

  test('hides Total Spend row when total budget is zero', () => {
    renderComponent({ totalBudget: 0, initialPercentages: [20, 30, 50] })
    expect(screen.queryByText('Total Spend')).not.toBeInTheDocument()
  })

  test('shows validation error when letters are entered in seasonality inputs', async () => {
    renderComponent()
    const input = document.querySelector('[id^="media_plan_budget_distribution-seasonality-"]') as HTMLInputElement

    fireEvent.change(input, { target: { value: 'abc' } })

    await waitFor(() => {
      expect(screen.getByText('Whole numbers only')).toBeInTheDocument()
    })
  })

  test('shows positive-number validation error when negative values are entered', async () => {
    renderComponent()
    const input = document.querySelector('[id^="media_plan_budget_distribution-seasonality-"]') as HTMLInputElement

    fireEvent.change(input, { target: { value: '-10' } })

    await waitFor(() => {
      expect(screen.getByText('Only positive numbers are allowed')).toBeInTheDocument()
    })
  })
})
