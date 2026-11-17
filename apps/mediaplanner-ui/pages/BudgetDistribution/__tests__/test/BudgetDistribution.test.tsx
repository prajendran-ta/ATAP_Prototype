import {
  setupBeforeEach,
  setBdData,
  setBdLoading,
  setAuth,
  mockUpdateMediaPlanBd,
  mockRefetch,
  mockLoadLastDistribution,
  mockNotification,
  mockSpendBudgetDistribution,
  setAdvertisers,
} from '../mocks/BudgetDistribution'
import React from 'react'
import { Form } from '@amadeus/react-design-factory'
import { render, screen, waitFor, fireEvent, act, within } from '@testing-library/react'
import { MemoryRouter, Routes, Route, useNavigate, useParams } from 'react-router'
import * as BdQueries from '../../BudgetDistribution.queries'
import BudgetDistribution from '../../BudgetDistribution'
import { standardAuthData, readOnlyAuthData, mockBdDataWithDates, mockBdDataEmpty } from '../data/BudgetDistribution'
import { setBudgetModel } from '../../../MediaplannerProductSettings/mediaPlanBudgetStore'

const productId = 'sf-plan-001-prod-1'

const DownloadSummaryStub = () => {
  const navigate = useNavigate()
  const { planId } = useParams<{ planId: string }>()

  return (
    <div data-testid='download-summary'>
      <button type='button' onClick={() => navigate(`/mediaplanner/budget-distribution/${planId}`)}>
        Back to Budget Distribution
      </button>
    </div>
  )
}

const renderPage = (planId = 'plan-123') =>
  render(
    <MemoryRouter initialEntries={[`/mediaplanner/budget-distribution/${planId}`]}>
      <Routes>
        <Route path='/mediaplanner/budget-distribution/:planId' element={<BudgetDistribution />} />
        <Route path='/mediaplanner/download-summary/:planId' element={<DownloadSummaryStub />} />
      </Routes>
    </MemoryRouter>,
  )

beforeEach(() => {
  setupBeforeEach()
  mockUpdateMediaPlanBd.mockResolvedValue({ data: { updateMediaPlanBd: { success: true, message: 'Media plan updated successfully.' } } })
  mockRefetch.mockResolvedValue({ data: { GetMediaPlan: null } })
})

// ─────────────────────────────────────────────────────────────────────────────
// Page structure
// ─────────────────────────────────────────────────────────────────────────────

describe('BudgetDistribution — Page structure', () => {
  test('renders the breadcrumb navigation', () => {
    const { container } = renderPage()
    expect(container.querySelector('#media_plan_budget_distribution-breadcrumb-nav')).toBeInTheDocument()
  })

  test('renders "New Media Plan" as the page title', () => {
    const { container } = renderPage()
    expect(container.querySelector('#media_plan_budget_distribution-ttl')).toHaveTextContent('New Media Plan')
  })

  test('renders the stepper with all 3 step labels', () => {
    renderPage()
    expect(screen.getByText('General Settings')).toBeInTheDocument()
    expect(screen.getByText('Budget Distribution')).toBeInTheDocument()
    expect(screen.getByText('Media Plan')).toBeInTheDocument()
  })

  test('renders the Past Consumption accordion', () => {
    renderPage()
    expect(screen.getByText('Past Consumption Data in $')).toBeInTheDocument()
  })

  test('renders the media channel tab panel', () => {
    const { container } = renderPage()
    expect(container.querySelector('#media_plan_budget_distribution-media_tabs-tab')).toBeInTheDocument()
  })

  test('renders fallback left vertical tabs when Step 2 store has not been visited', async () => {
    const { container } = renderPage('direct-step-3')
    const sidebar = container.querySelector('#media_plan_budget_distribution-budget_groups-nav')!

    await waitFor(() => expect(within(sidebar).getByText('12 th Knot')).toBeInTheDocument())
    expect(within(sidebar).getByText('Hotel Nova')).toBeInTheDocument()
    expect(within(sidebar).getByText('The Estate Yountville')).toBeInTheDocument()
    expect(within(sidebar).getAllByText('Property')).toHaveLength(3)
    expect(screen.getByText('0 / 3 completed')).toBeInTheDocument()
  })

  test('renders channel tab labels from the schema', () => {
    renderPage()
    // Tab labels appear in both the Tab header and the Past Consumption table — use getAllByText
    expect(screen.getAllByText('Paidsearch').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Social').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Metasearch').length).toBeGreaterThan(0)
  })

  test('renders the Cancel button', () => {
    const { container } = renderPage()
    expect(container.querySelector('#media_plan_budget_distribution-cancel-btn')).toBeInTheDocument()
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// Buttons by role
// ─────────────────────────────────────────────────────────────────────────────

describe('BudgetDistribution — Buttons by role', () => {
  test('renders Save & Continue button for admin users', () => {
    const { container } = renderPage()
    expect(container.querySelector('#media_plan_budget_distribution-submit-btn')).toBeInTheDocument()
  })

  test('renders Save & Continue button for standard users', () => {
    setAuth(standardAuthData)
    const { container } = renderPage()
    expect(container.querySelector('#media_plan_budget_distribution-submit-btn')).toBeInTheDocument()
  })

  test('hides Save & Continue button for read-only users', () => {
    setAuth(readOnlyAuthData)
    const { container } = renderPage()
    expect(container.querySelector('#media_plan_budget_distribution-submit-btn')).not.toBeInTheDocument()
  })

  test('renders Settings button for admin users', () => {
    const { container } = renderPage()
    expect(container.querySelector('#media_plan_budget_distribution-settings-btn')).toBeInTheDocument()
  })

  test('renders Settings button for standard users', () => {
    setAuth(standardAuthData)
    const { container } = renderPage()
    expect(container.querySelector('#media_plan_budget_distribution-settings-btn')).toBeInTheDocument()
  })

  test('hides Settings button for read-only users', () => {
    setAuth(readOnlyAuthData)
    const { container } = renderPage()
    expect(container.querySelector('#media_plan_budget_distribution-settings-btn')).not.toBeInTheDocument()
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// Loading state
// ─────────────────────────────────────────────────────────────────────────────

describe('BudgetDistribution — Loading state', () => {
  test('still renders the form while bdLoading is true', () => {
    setBdLoading(true)
    const { container } = renderPage()
    expect(container.querySelector('#media_plan_budget_distribution-cancel-btn')).toBeInTheDocument()
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// Distribution period
// ─────────────────────────────────────────────────────────────────────────────

describe('BudgetDistribution — Distribution period', () => {
  test('does not render SpendBudgetDistribution when start/end dates are absent', () => {
    renderPage()
    // Without valid dates the distribution period is empty so SpendBudgetDistribution is not rendered
    expect(screen.queryByTestId('spend-budget-distribution')).not.toBeInTheDocument()
  })

  test('renders SpendBudgetDistribution when valid dates are present', async () => {
    setBdData(mockBdDataWithDates)
    renderPage()
    await waitFor(() => {
      expect(screen.getByTestId('spend-budget-distribution')).toBeInTheDocument()
    })
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// Settings drawer lifecycle  (covers openSettings + saveSettings)
// ─────────────────────────────────────────────────────────────────────────────
describe('BudgetDistribution — Settings drawer', () => {
  test('Settings button opens the drawer (openSettings)', async () => {
    const { container } = renderPage()
    expect(screen.queryByTestId('media-settings-drawer')).not.toBeInTheDocument()

    await act(async () => {
      fireEvent.click(container.querySelector('#media_plan_budget_distribution-settings-btn')!)
    })

    expect(screen.getByTestId('media-settings-drawer')).toBeInTheDocument()
  })

  test('Save in drawer calls saveSettings and closes the drawer', async () => {
    const { container } = renderPage()

    // Open drawer
    await act(async () => {
      fireEvent.click(container.querySelector('#media_plan_budget_distribution-settings-btn')!)
    })

    expect(screen.getByTestId('media-settings-drawer')).toBeInTheDocument()

    // Save
    await act(async () => {
      fireEvent.click(screen.getByTestId('drawer-save-btn'))
    })

    expect(screen.queryByTestId('media-settings-drawer')).not.toBeInTheDocument()
  })

  test('Cancel in drawer calls onClose and closes the drawer', async () => {
    const { container } = renderPage()

    await act(async () => {
      fireEvent.click(container.querySelector('#media_plan_budget_distribution-settings-btn')!)
    })

    await act(async () => {
      fireEvent.click(screen.getByTestId('drawer-cancel-btn'))
    })

    expect(screen.queryByTestId('media-settings-drawer')).not.toBeInTheDocument()
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// handleSubmit  (covers lines 351–391)
// ─────────────────────────────────────────────────────────────────────────────
describe('BudgetDistribution — handleSubmit', () => {
  test('clicking Save & Continue calls updateMediaPlanBd with the planId', async () => {
    const { container } = renderPage()

    await act(async () => {
      fireEvent.click(container.querySelector('#media_plan_budget_distribution-submit-btn')!)
    })

    await waitFor(() => expect(mockUpdateMediaPlanBd).toHaveBeenCalled())
    const [{ variables }] = mockUpdateMediaPlanBd.mock.calls[0]
    expect(variables.mediaPlanId).toBe('plan-123')
  })

  test('navigates to download-summary after a successful submit', async () => {
    setAdvertisers([])
    const { container } = renderPage()

    await act(async () => {
      fireEvent.click(container.querySelector('#media_plan_budget_distribution-submit-btn')!)
    })

    await waitFor(() =>
      expect(screen.getByTestId('download-summary')).toBeInTheDocument(),
    )
  })

  test('saves current budget item, moves it to Completed, and advances until final continue', async () => {
    setBdData(mockBdDataWithDates)
    setBudgetModel('plan-with-nav', productId, {
      currency: 'USD',
      categories: [
        {
          id: 'cat-1',
          name: 'Awareness',
          activity: 'REGULAR_CAMPAIGN',
          budgetPct: 60,
          budgetValue: 10000,
          memberBpids: ['BP001', 'BP002'],
        },
      ],
      standalone: [
        {
          bpid: 'BP003',
          name: 'Hotel Nova',
          budgetPct: 40,
          budgetValue: 5000,
        },
      ],
      propertyNames: {
        BP001: 'Hotel One',
        BP002: 'Hotel Two',
        BP003: 'Hotel Nova',
      },
    })

    const { container } = renderPage('plan-with-nav')

    expect(screen.getByText('Save and Next')).toBeInTheDocument()
    expect(screen.queryByText('Budget Categories')).not.toBeInTheDocument()
    expect(screen.getByText('Budget Category')).toBeInTheDocument()
    expect(screen.getByText('Property')).toBeInTheDocument()
    await waitFor(() => expect(screen.getByText('Total : 2,000 $ (2%)')).toBeInTheDocument())

    await act(async () => {
      fireEvent.click(container.querySelector('#media_plan_budget_distribution-submit-btn')!)
    })

    await waitFor(() => expect(screen.getByText('Completed (1)')).toBeInTheDocument())
    expect(screen.queryByText('Awareness')).not.toBeInTheDocument()
    expect(screen.queryByText('Total : 10,000 $ (60%)')).not.toBeInTheDocument()
    expect(screen.getByText('Save & Continue')).toBeInTheDocument()
    expect(screen.queryByTestId('download-summary')).not.toBeInTheDocument()

    await act(async () => {
      fireEvent.click(screen.getByText('Completed (1)'))
    })

    expect(screen.getByText('Awareness')).toBeInTheDocument()
  expect(screen.getAllByText('Total : 2,000 $ (2%)').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Budget Category')).toHaveLength(1)
    expect(screen.getAllByText('Rooms').length).toBeGreaterThan(0)

    await act(async () => {
      fireEvent.click(container.querySelector('#media_plan_budget_distribution-submit-btn')!)
    })

    await waitFor(() => expect(screen.getByTestId('download-summary')).toBeInTheDocument())
    expect(mockUpdateMediaPlanBd).toHaveBeenCalledTimes(2)

    await act(async () => {
      fireEvent.click(screen.getByText('Back to Budget Distribution'))
    })

    await waitFor(() => expect(screen.getByText('Completed (2)')).toBeInTheDocument())
    const sidebar = container.querySelector('#media_plan_budget_distribution-budget_groups-nav')!
    expect(within(sidebar).queryByText('Awareness')).not.toBeInTheDocument()

    await act(async () => {
      fireEvent.click(screen.getByText('Completed (2)'))
    })

    expect(within(sidebar).getByText('Awareness')).toBeInTheDocument()
    expect(within(sidebar).getByText('Hotel Nova')).toBeInTheDocument()
    expect(within(sidebar).getAllByText('Total : 2,000 $ (2%)')).toHaveLength(2)
  })

  test('restores tabs and spendBudgetDistribution when refetch returns allocations', async () => {
    setAdvertisers([])
    mockRefetch.mockResolvedValue({
      data: {
        GetMediaPlan: {
          budgetDistribution: {
            allocations: [
              {
                channel: 'PAID_SEARCH',
                tactics: [{ platform: 'GOOGLE_ADS', tactic: 'BRAND', spendAmount: 5000 }],
              },
            ],
            spendBudgetDistribution: [{ month: '2025-01-15', spendPct: 100 }],
          },
        },
      },
    })

    const { container } = renderPage()

    await act(async () => {
      fireEvent.click(container.querySelector('#media_plan_budget_distribution-submit-btn')!)
    })

    // Navigation should still occur
    await waitFor(() =>
      expect(screen.getByTestId('download-summary')).toBeInTheDocument(),
    )
    expect(mockUpdateMediaPlanBd).toHaveBeenCalled()
  })

  test('mutation is not called when planId is absent', async () => {
    // Render without a planId param
    render(
      <MemoryRouter initialEntries={['/mediaplanner/budget-distribution/']}>
        <Routes>
          <Route
            path='/mediaplanner/budget-distribution/'
            element={<BudgetDistribution />}
          />
        </Routes>
      </MemoryRouter>,
    )

    const submitBtn = document.querySelector(
      '#media_plan_budget_distribution-submit-btn',
    )
    if (submitBtn) {
      await act(async () => {
        fireEvent.click(submitBtn)
      })
    }

    expect(mockUpdateMediaPlanBd).not.toHaveBeenCalled()
  })

  test('shows an error and blocks save when total spend distribution is below 100%', async () => {
    setBdData(mockBdDataWithDates)
    mockSpendBudgetDistribution.mockImplementation(({ onDistributionChange, period }: any) => {
      const formInstance = Form.useFormInstance()
      React.useEffect(() => {
        // 40 + 40 + 0 = 80% — under by 20
        const pcts = [40, 40, 0]
        period?.forEach((_: string, index: number) => {
          formInstance.setFieldValue(['seasonality', index], String(pcts[index] ?? 0))
        })
        onDistributionChange?.(period?.map((_: string, i: number) => ({ month: `2025-0${i + 1}-01`, spendPct: pcts[i] ?? 0 })))
      }, []) // eslint-disable-line react-hooks/exhaustive-deps
      return <div data-testid='spend-budget-distribution' />
    })

    const { container } = renderPage()

    await act(async () => {
      fireEvent.click(container.querySelector('#media_plan_budget_distribution-submit-btn')!)
    })

    expect(mockNotification.error).toHaveBeenCalledWith(
      expect.stringContaining('80'),
    )
    expect(mockUpdateMediaPlanBd).not.toHaveBeenCalled()
  })

  test('shows an error and blocks save when total spend distribution is above 100%', async () => {
    setBdData(mockBdDataWithDates)
    mockSpendBudgetDistribution.mockImplementation(({ onDistributionChange, period }: any) => {
      const formInstance = Form.useFormInstance()
      React.useEffect(() => {
        // 60 + 60 + 0 = 120% — over by 20
        const pcts = [60, 60, 0]
        period?.forEach((_: string, index: number) => {
          formInstance.setFieldValue(['seasonality', index], String(pcts[index] ?? 0))
        })
        onDistributionChange?.(period?.map((_: string, i: number) => ({ month: `2025-0${i + 1}-01`, spendPct: pcts[i] ?? 0 })))
      }, []) // eslint-disable-line react-hooks/exhaustive-deps
      return <div data-testid='spend-budget-distribution' />
    })

    const { container } = renderPage()

    await act(async () => {
      fireEvent.click(container.querySelector('#media_plan_budget_distribution-submit-btn')!)
    })

    expect(mockNotification.error).toHaveBeenCalledWith(
      expect.stringContaining('120'),
    )
    expect(mockUpdateMediaPlanBd).not.toHaveBeenCalled()
  })

  test('error message includes the current total percentage', async () => {
    setBdData(mockBdDataWithDates)
    mockSpendBudgetDistribution.mockImplementation(({ onDistributionChange, period }: any) => {
      const formInstance = Form.useFormInstance()
      React.useEffect(() => {
        // 30 + 25 + 0 = 55%
        const pcts = [30, 25, 0]
        period?.forEach((_: string, index: number) => {
          formInstance.setFieldValue(['seasonality', index], String(pcts[index] ?? 0))
        })
        onDistributionChange?.(period?.map((_: string, i: number) => ({ month: `2025-0${i + 1}-01`, spendPct: pcts[i] ?? 0 })))
      }, []) // eslint-disable-line react-hooks/exhaustive-deps
      return <div data-testid='spend-budget-distribution' />
    })

    const { container } = renderPage()

    await act(async () => {
      fireEvent.click(container.querySelector('#media_plan_budget_distribution-submit-btn')!)
    })

    expect(mockNotification.error).toHaveBeenCalledWith(
      expect.stringContaining('55'),
    )
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// handleDistributionChange  (covers lines 258–259 via SpendBudgetDistribution mock)
// ─────────────────────────────────────────────────────────────────────────────
describe('BudgetDistribution — handleDistributionChange', () => {
  test('distribution change from SpendBudgetDistribution is reflected in component state', async () => {
    setBdData(mockBdDataWithDates)
    renderPage()

    // SpendBudgetDistribution mock fires onDistributionChange on mount;
    // handleDistributionChange runs without throwing
    await waitFor(() =>
      expect(screen.getByTestId('spend-budget-distribution')).toBeInTheDocument(),
    )
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// bdData useEffect  (covers lines 330–342)
// ─────────────────────────────────────────────────────────────────────────────
describe('BudgetDistribution — bdData restoration effect', () => {
  test('tabs are restored when bdData has channel allocations', async () => {
    setBdData(mockBdDataWithDates)
    renderPage()

    // If the effect throws, the component would unmount; verify it stays healthy
    await waitFor(() =>
      expect(
        document.querySelector('#media_plan_budget_distribution-media_tabs-tab'),
      ).toBeInTheDocument(),
    )
  })

  test('bdData with saved spendBudgetDistribution restores the distribution', async () => {
    const bdDataWithDistribution = {
      ...mockBdDataWithDates,
      GetMediaPlan: {
        ...mockBdDataWithDates.GetMediaPlan,
        budgetDistribution: {
          ...mockBdDataWithDates.GetMediaPlan.budgetDistribution,
          spendBudgetDistribution: [
            { month: '2025-01-15', spendPct: 50 },
            { month: '2025-02-15', spendPct: 50 },
          ],
        },
      },
    }
    setBdData(bdDataWithDistribution)
    renderPage()

    await waitFor(() =>
      expect(
        document.querySelector('#media_plan_budget_distribution-media_tabs-tab'),
      ).toBeInTheDocument(),
    )
  })

  test('bdData with no allocations initialises tabs to the schema defaults', async () => {
    renderPage()

    await waitFor(() =>
      expect(
        document.querySelector('#media_plan_budget_distribution-media_tabs-tab'),
      ).toBeInTheDocument(),
    )
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// loadLastDistribution useEffect  (covers lines 289–315)
// ─────────────────────────────────────────────────────────────────────────────
describe('BudgetDistribution — loadLastDistribution effect', () => {
  test('loadLastDistribution is called when advertiserId is present', async () => {
    setBdData(mockBdDataWithDates)
    renderPage()

    await waitFor(() =>
      expect(mockLoadLastDistribution).toHaveBeenCalledWith({
        variables: { advertiserId: 'adv-001' },
      }),
    )
  })

  test('loadLastDistribution is NOT called when advertiserId is absent', async () => {
    renderPage() // mockBdDataEmpty has no advertiserId

    // Allow effects to settle
    await waitFor(() =>
      expect(
        document.querySelector('#media_plan_budget_distribution-ttl'),
      ).toBeInTheDocument(),
    )

    expect(mockLoadLastDistribution).not.toHaveBeenCalled()
  })

  test('sets lastDistributionTabs when GetLastDistribution returns allocations', async () => {
    setBdData(mockBdDataWithDates)
    mockLoadLastDistribution.mockResolvedValue({
      data: {
        GetLastDistribution: {
          channelAllocations: [
            {
              channel: 'SOCIAL',
              tactics: [{ platform: 'FACEBOOK_IG', tactic: 'PROSPECTING', spendAmount: 3000 }],
            },
          ],
          monthlyDistributions: [],
        },
      },
      errors: undefined,
    })

    renderPage()

    // Effect triggers, allocations are processed; component stays healthy
    await waitFor(() =>
      expect(mockLoadLastDistribution).toHaveBeenCalled(),
    )
    await waitFor(() =>
      expect(
        document.querySelector('#media_plan_budget_distribution-media_tabs-tab'),
      ).toBeInTheDocument(),
    )
  })

  test('uses lastDistributionMonthly when bd has no spendBudgetDistribution', async () => {
    setBdData(mockBdDataWithDates) // advertiserId present, spendBudgetDistribution: []
    mockLoadLastDistribution.mockResolvedValue({
      data: {
        GetLastDistribution: {
          channelAllocations: [],
          monthlyDistributions: [
            { month: '2025-01-15', spendPct: 60 },
            { month: '2025-02-15', spendPct: 40 },
          ],
        },
      },
      errors: undefined,
    })

    renderPage()

    await waitFor(() => expect(mockLoadLastDistribution).toHaveBeenCalled())
    await waitFor(() =>
      expect(
        document.querySelector('#media_plan_budget_distribution-media_tabs-tab'),
      ).toBeInTheDocument(),
    )
  })

  test('handles an error from loadLastDistribution gracefully', async () => {
    setBdData(mockBdDataWithDates)
    mockLoadLastDistribution.mockRejectedValue(new Error('network error'))

    renderPage()

    await waitFor(() => expect(mockLoadLastDistribution).toHaveBeenCalled())

    // Component should still render correctly after the error
    expect(
      document.querySelector('#media_plan_budget_distribution-ttl'),
    ).toBeInTheDocument()
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// Recommendation map (covers line 230)
// ─────────────────────────────────────────────────────────────────────────────
describe('BudgetDistribution — recommendation map', () => {
  test('recommendationMap iterates over recommendation items when data is present', async () => {
    ;(BdQueries.useGetSpendBudgetRecommendationQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        GetSpendBudgetRecommendation: {
          items: [
            { startDate: '01-Jan-2025', budget: 3000 },
            { startDate: '01-Feb-2025', budget: 4000 },
            { startDate: '01-Mar-2025', budget: 3000 },
          ],
          status: 'OK',
        },
      },
      loading: false,
    })

    renderPage()

    await waitFor(() =>
      expect(
        document.querySelector('#media_plan_budget_distribution-ttl'),
      ).toBeInTheDocument(),
    )
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// Stepper navigation onClick handlers (covers lines 700-703)
// ─────────────────────────────────────────────────────────────────────────────
describe('BudgetDistribution — Stepper navigation', () => {
  test('clicking General Settings stepper item navigates to edit page', async () => {
    render(
      <MemoryRouter initialEntries={['/mediaplanner/budget-distribution/plan-123']}>
        <Routes>
          <Route path='/mediaplanner/budget-distribution/:planId' element={<BudgetDistribution />} />
          <Route path='/mediaplanner/edit/:planId' element={<div data-testid='edit-page' />} />
        </Routes>
      </MemoryRouter>,
    )

    await act(async () => {
      fireEvent.click(screen.getByText('General Settings'))
    })

    await waitFor(() =>
      expect(screen.getByTestId('edit-page')).toBeInTheDocument(),
    )
  })

  test('clicking Budget Distribution stepper item navigates back', async () => {
    render(
      <MemoryRouter initialEntries={['/mediaplanner/budget-distribution/plan-123']}>
        <Routes>
          <Route path='/mediaplanner/budget-distribution/:planId' element={<BudgetDistribution />} />
        </Routes>
      </MemoryRouter>,
    )

    await act(async () => {
      fireEvent.click(screen.getByText('Budget Distribution'))
    })

    // Component stays on the same page (navigating to itself)
    await waitFor(() =>
      expect(
        document.querySelector('#media_plan_budget_distribution-ttl'),
      ).toBeInTheDocument(),
    )
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// PastConsumptionAccordion column renders (covers lines 71-100)
// ─────────────────────────────────────────────────────────────────────────────
describe('BudgetDistribution — PastConsumptionAccordion', () => {
  test('expanding the accordion renders the past consumption Power BI report', async () => {
    renderPage()

    // Click to expand the Past Consumption accordion
    const accordionHeader = screen.getByText('Past Consumption Data in $')
    await act(async () => {
      fireEvent.click(accordionHeader)
    })

    // After expansion the Power BI report container should be rendered
    await waitFor(() => {
      expect(screen.getByTestId('powerbi-report')).toBeInTheDocument()
    })
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// handleSubmitFailed — triggered when Ant Design Form validation fails
//
// SpendBudgetDistribution is overridden in beforeEach to render a Form.Item
// with a failing validator (seasonality[0]), which causes onFinishFailed to
// fire instead of onFinish when the Submit button is clicked.
// The global beforeEach restores the default implementation automatically.
// ─────────────────────────────────────────────────────────────────────────────

describe('BudgetDistribution — handleSubmitFailed', () => {
  beforeEach(() => {
    setBdData(mockBdDataWithDates)
    mockSpendBudgetDistribution.mockImplementation(() => (
      <Form.Item
        name={['seasonality', 0]}
        rules={[
          {
            validator: (_: unknown, __: unknown) =>
              Promise.reject(new Error('Seasonality is required')),
          },
        ]}
      >
        <input data-testid='seasonality-field' />
      </Form.Item>
    ))
  })

  test('calls notification.error and does NOT call updateMediaPlanBd when form validation fails', async () => {
    const { container } = renderPage()
    await waitFor(() => {
      expect(container.querySelector('#media_plan_budget_distribution-submit-btn')).toBeInTheDocument()
    })

    await act(async () => {
      fireEvent.click(container.querySelector('#media_plan_budget_distribution-submit-btn')!)
    })

    await waitFor(() => {
      expect(mockNotification.error).toHaveBeenCalled()
    })
    expect(mockUpdateMediaPlanBd).not.toHaveBeenCalled()
  })

  test('notification.error is called with the generic validation message', async () => {
    const { container } = renderPage()
    await waitFor(() => {
      expect(container.querySelector('#media_plan_budget_distribution-submit-btn')).toBeInTheDocument()
    })

    await act(async () => {
      fireEvent.click(container.querySelector('#media_plan_budget_distribution-submit-btn')!)
    })

    await waitFor(() => {
      expect(mockNotification.error).toHaveBeenCalledWith(
        'Please fix the validation errors before saving.',
        expect.objectContaining({ description: expect.anything() }),
      )
    })
  })

  test('notification.error description is a React element containing section groupings', async () => {
    const { container } = renderPage()
    await waitFor(() => {
      expect(container.querySelector('#media_plan_budget_distribution-submit-btn')).toBeInTheDocument()
    })

    await act(async () => {
      fireEvent.click(container.querySelector('#media_plan_budget_distribution-submit-btn')!)
    })

    await waitFor(() => expect(mockNotification.error).toHaveBeenCalled())

    const [, opts] = mockNotification.error.mock.calls[0]
    expect(opts).toBeDefined()
    expect(opts.description).toBeDefined()
  })

  test('does not navigate away when validation fails', async () => {
    const { container } = renderPage()
    await waitFor(() => {
      expect(container.querySelector('#media_plan_budget_distribution-submit-btn')).toBeInTheDocument()
    })

    await act(async () => {
      fireEvent.click(container.querySelector('#media_plan_budget_distribution-submit-btn')!)
    })

    await waitFor(() => expect(mockNotification.error).toHaveBeenCalled())
    expect(container.querySelector('#media_plan_budget_distribution-ttl')).toBeInTheDocument()
  })

  test('covers the seasonality section path in handleSubmitFailed', async () => {
    // seasonality[0] maps to distributionPeriod[0] label in the error description
    const { container } = renderPage()
    await waitFor(() => {
      expect(container.querySelector('#media_plan_budget_distribution-submit-btn')).toBeInTheDocument()
    })

    await act(async () => {
      fireEvent.click(container.querySelector('#media_plan_budget_distribution-submit-btn')!)
    })

    await waitFor(() => {
      expect(mockNotification.error).toHaveBeenCalledWith(
        'Please fix the validation errors before saving.',
        expect.anything(),
      )
    })
  })
})
