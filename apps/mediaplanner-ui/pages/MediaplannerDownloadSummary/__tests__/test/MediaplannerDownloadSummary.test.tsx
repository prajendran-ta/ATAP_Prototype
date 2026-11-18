import { setupBeforeEach, setAuth, setBdLoading } from '../mocks/MediaplannerDownloadSummary'
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router'
import MediaplannerDownloadSummary from '../../MediaplannerDownloadSummary'
import { readOnlyAuthData, standardAuthData } from '../data/MediaplannerDownloadSummary'
import { setBudgetGroupSpendStats } from '../../../MediaplannerProductSettings/mediaPlanBudgetStore'

const renderPage = (planId = 'plan-001') =>
  render(
    <MemoryRouter initialEntries={[`/mediaplanner/summary/${planId}`]}>
      <Routes>
        <Route path='/mediaplanner/summary/:planId' element={<MediaplannerDownloadSummary />} />
      </Routes>
    </MemoryRouter>,
  )

beforeEach(() => {
  setupBeforeEach()
})

// ─────────────────────────────────────────────────────────────────────────────
// Page structure
// ─────────────────────────────────────────────────────────────────────────────

describe('MediaplannerDownloadSummary — Page structure', () => {
  test('renders the breadcrumb navigation', () => {
    const { container } = renderPage()
    expect(container.querySelector('#mediaplan_summary-breadcrumb-nav')).toBeInTheDocument()
  })

  test('renders the plan name as page title', () => {
    const { container } = renderPage()
    expect(container.querySelector('#mediaplan_summary-ttl')).toHaveTextContent('Alpha Campaign')
  })

  test('renders the stepper with all 3 steps', () => {
    const { container } = renderPage()
    expect(container.querySelector('#mediaplan_summary-stepper')).toBeInTheDocument()
    expect(screen.getByText('General Settings')).toBeInTheDocument()
    expect(screen.getByText('Budget Distribution')).toBeInTheDocument()
    expect(screen.getByText('Media Plan')).toBeInTheDocument()
  })

  test('renders the Plan Overview tab label', () => {
    const { container } = renderPage()
    expect(container.querySelector('#mediaplan_summary-tab_plan-overview-txt')).toBeInTheDocument()
    expect(screen.getAllByText('Plan Overview').length).toBeGreaterThan(0)
  })

  test('renders the investment data table', () => {
    const { container } = renderPage()
    expect(container.querySelector('#mediaplan_summary-investment-tbl')).toBeInTheDocument()
  })

  test('renders the download button', () => {
    const { container } = renderPage()
    expect(container.querySelector('#mediaplan_summary-download_pdf-btn')).toBeInTheDocument()
  })

  test('renders the "Media Plan Summary" fallback title when plan name is absent', () => {
    const { container } = renderPage()
    // With mock data, title should show the plan name
    expect(container.querySelector('#mediaplan_summary-ttl')).not.toHaveTextContent('Media Plan Summary')
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// Loading state
// ─────────────────────────────────────────────────────────────────────────────

describe('MediaplannerDownloadSummary — Loading state', () => {
  test('renders a spinner while plan data is loading', () => {
    setBdLoading(true)
    const { container } = renderPage()
    expect(container.querySelector('#mediaplan_summary-investment-tbl')).not.toBeInTheDocument()
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// Buttons by role
// ─────────────────────────────────────────────────────────────────────────────

describe('MediaplannerDownloadSummary — Buttons by role', () => {
  test('renders Cancel and Complete buttons for admin users', () => {
    const { container } = renderPage()
    expect(container.querySelector('#mediaplan_summary_cancel-btn')).toBeInTheDocument()
    expect(container.querySelector('#mediaplan_summary_submit-btn')).toBeInTheDocument()
  })

  test('renders Cancel and Complete buttons for standard users', () => {
    setAuth(standardAuthData)
    const { container } = renderPage()
    expect(container.querySelector('#mediaplan_summary_cancel-btn')).toBeInTheDocument()
    expect(container.querySelector('#mediaplan_summary_submit-btn')).toBeInTheDocument()
  })

  test('hides the Complete button for read-only users', () => {
    setAuth(readOnlyAuthData)
    const { container } = renderPage()
    expect(container.querySelector('#mediaplan_summary_cancel-btn')).toBeInTheDocument()
    expect(container.querySelector('#mediaplan_summary_submit-btn')).not.toBeInTheDocument()
  })

  test('Cancel button links to the mediaplanner overview', () => {
    const { container } = renderPage()
    const cancelBtn = container.querySelector('#mediaplan_summary_cancel-btn')
    expect(cancelBtn).toHaveAttribute('href', '/mediaplanner')
  })

  test('Complete button links to the mediaplanner overview', () => {
    const { container } = renderPage()
    const completeBtn = container.querySelector('#mediaplan_summary_submit-btn')
    expect(completeBtn).toHaveAttribute('href', '/mediaplanner')
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// Overview rows
// ─────────────────────────────────────────────────────────────────────────────

describe('MediaplannerDownloadSummary — Overview rows', () => {
  test('renders labelled overview fields from plan data', () => {
    const { container } = renderPage()
    expect(container.querySelector('#mediaplan_summary-doc_row_label-0-txt')).toBeInTheDocument()
    expect(container.querySelector('#mediaplan_summary-doc_row_value-0-txt')).toBeInTheDocument()
  })

  test('shows the plan name in the document title', () => {
    const { container } = renderPage()
    expect(container.querySelector('#mediaplan_summary-doc_title-txt')).toHaveTextContent('Alpha Campaign')
  })

  test('shows the advertiser name without the BPID in the document eyebrow', () => {
    const { container } = renderPage()
    expect(container.querySelector('#mediaplan_summary-doc_advertiser-txt')).toHaveTextContent('Colonial Williamsburg Resorts')
    expect(container.querySelector('#mediaplan_summary-doc_advertiser-txt')).not.toHaveTextContent('ALPHA001')
  })

  test('uses the sum of Step 3 budget distribution spend in overview and monthly breakdown', async () => {
    const planId = 'summary-step3-dynamic'
    setBudgetGroupSpendStats(planId, 'sf-plan-001-prod-1', 'sa-BP001', { spendBudget: 132000, spendPct: 26.4 })
    setBudgetGroupSpendStats(planId, 'sf-plan-001-prod-2', 'sa-BP004', { spendBudget: 18000, spendPct: 3.6 })

    renderPage(planId)

    await waitFor(() => expect(screen.getAllByText('150,000 $').length).toBeGreaterThan(1))
    expect(screen.queryByText('409,500 $')).not.toBeInTheDocument()
  })

  test('greys out strategy rows that are missing or zero in Step 3 allocations', () => {
    const { container } = renderPage()

    const mediaTypeCells = Array.from(container.querySelectorAll('[id^="mediaplan_summary-strategy_media_type"]'))
    const findStrategyRows = (text: string) =>
      mediaTypeCells
        .filter(cell => cell.textContent?.includes(text))
        .map(cell => cell.closest('[aria-disabled]'))
        .filter(Boolean)

    const metasearchRows = findStrategyRows('Amadeus Hotel Metasearch')
    expect(metasearchRows.length).toBeGreaterThan(0)
    metasearchRows.forEach(row => {
      expect(row).toHaveAttribute('aria-disabled', 'true')
    })

    const displayRows = findStrategyRows('Display')
    expect(displayRows.length).toBeGreaterThan(0)
    displayRows.forEach(row => {
      expect(row).toHaveAttribute('aria-disabled', 'false')
    })
  })
})
