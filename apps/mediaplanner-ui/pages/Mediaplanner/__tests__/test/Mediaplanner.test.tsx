import { setupBeforeEach, refetchMediaPlans, setAuth } from '../mocks/Mediaplanner'
import React from 'react'
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router'
import * as DesignFactory from '@amadeus/react-design-factory'
import MediaplannerPage from '../../Mediaplanner'
import {
  adminAuthData,
  standardAuthData,
  readOnlyAuthData,
  mockGetMediaPlansResponse,
} from '../data/Mediaplanner'
import { buildMediaPlanQueryFn, buildPlanNameOptionsQueryFn, SEEDED_NEW_PLANS } from '../../mediaplanUtils'
import { TablePaginationConfig } from 'antd/es/table'
import { DEMO_ADVERTISERS } from '@mediahub/mediahub-ui/shared/demoAdvertisers'

const renderPage = (initialPath = '/mediaplanner') =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path='/mediaplanner' element={<MediaplannerPage />} />
      </Routes>
    </MemoryRouter>,
  )

beforeEach(() => {
  setupBeforeEach()
})

// ─────────────────────────────────────────────────────────────────────────────
// PAGE STRUCTURE
// ─────────────────────────────────────────────────────────────────────────────

describe('MediaplannerPage — Page structure', () => {
  test('renders the breadcrumb with "Media Plans"', () => {
    const { container } = renderPage()
    const breadcrumb = container.querySelector('#mediaplan-breadcrumb-nav')
    expect(breadcrumb).toBeInTheDocument()
    expect(breadcrumb?.textContent).toContain('Media Plans')
  })

  test('renders the table container', async () => {
    const { container } = renderPage()
    await waitFor(() => {
      expect(container.querySelector('#mediaplan-tbl')).toBeInTheDocument()
    })
  })

  test('renders "New Media Plan" button for admin users', async () => {
    const { container } = renderPage()
    await waitFor(() => {
      expect(container.querySelector('#mediaplan_create-btn')).toBeInTheDocument()
    })
  })

  test('renders "New Media Plan" button for standard users', async () => {
    setAuth(standardAuthData)
    const { container } = renderPage()
    await waitFor(() => {
      expect(container.querySelector('#mediaplan_create-btn')).toBeInTheDocument()
    })
  })

  test('hides "New Media Plan" button for read-only users', async () => {
    setAuth(readOnlyAuthData)
    const { container } = renderPage()
    await waitFor(() => {
      expect(container.querySelector('#mediaplan-tbl')).toBeInTheDocument()
    })
    expect(container.querySelector('#mediaplan_create-btn')).not.toBeInTheDocument()
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// FILTER CONTROLS
// ─────────────────────────────────────────────────────────────────────────────

describe('MediaplannerPage — Filter controls', () => {
  test('renders the Plan Name filter select', async () => {
    const { container } = renderPage()
    await waitFor(() => {
      expect(container.querySelector('#mediaplan-plan_name_filter-sel')).toBeInTheDocument()
    })
  })

  test('renders the Advertiser (BPID) filter select', async () => {
    const { container } = renderPage()
    await waitFor(() => {
      expect(container.querySelector('#mediaplan-advertiser_filter-sel')).toBeInTheDocument()
    })
  })

  test('renders the Status filter select', async () => {
    const { container } = renderPage()
    await waitFor(() => {
      expect(container.querySelector('#mediaplan-status_filter-sel')).toBeInTheDocument()
    })
  })

  test('renders the Plan Type filter select', async () => {
    const { container } = renderPage()
    await waitFor(() => {
      expect(container.querySelector('#mediaplan-plan_type_filter-sel')).toBeInTheDocument()
    })
  })

  test('renders My Plans and All Plans toggle tabs', async () => {
    const { container } = renderPage()
    await waitFor(() => {
      expect(container.querySelector('#mediaplan-view_my-tab')).toBeInTheDocument()
      expect(container.querySelector('#mediaplan-view_all-tab')).toBeInTheDocument()
    })
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// TABLE DATA
// ─────────────────────────────────────────────────────────────────────────────

describe('MediaplannerPage — Table data', () => {
  test('renders all expected column headers', async () => {
    const { container } = renderPage()
    await waitFor(() => {
      expect(container.querySelector('#mediaplan-tbl')).toBeInTheDocument()
    })
    const headerCells = container.querySelectorAll('th.ant-table-cell')
    const headerTexts = Array.from(headerCells).map(h => h.textContent?.trim())
    expect(headerTexts).toContain('Status')
    expect(headerTexts).toContain('Plan Name')
    expect(headerTexts).toContain('Advertiser (BPID)')
    expect(headerTexts).toContain('Contract Budget')
    expect(headerTexts).toContain('Start Date')
    expect(headerTexts).toContain('End Date')
    expect(headerTexts).toContain('Plan Type')
    expect(headerTexts).toContain('Opportunity ID')
    expect(headerTexts).toContain('Proposal ID')
  })

  test('renders plan name as clickable buttons after data loads', async () => {
    const { container } = renderPage()
    await waitFor(() => {
      expect(refetchMediaPlans).toHaveBeenCalled()
    })
    await waitFor(() => {
      expect(container.querySelector('#mediaplan-open-0-btn')).toBeInTheDocument()
      expect(container.querySelector('#mediaplan-open-1-btn')).toBeInTheDocument()
    })
    expect(screen.getByText('Alpha Campaign')).toBeInTheDocument()
    expect(screen.getByText('Beta Campaign')).toBeInTheDocument()
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// FILTER BEHAVIOUR
// ─────────────────────────────────────────────────────────────────────────────

describe('MediaplannerPage — Filter behaviour', () => {
  test('calls refetch with myPlansOnly: true on initial render by default', async () => {
    const { container } = renderPage()
    await waitFor(() => {
      expect(container.querySelector('#mediaplan-tbl')).toBeInTheDocument()
    })
    await waitFor(() => {
      expect(refetchMediaPlans).toHaveBeenCalled()
    })
    const lastCall = refetchMediaPlans.mock.calls[refetchMediaPlans.mock.calls.length - 1][0]
    expect(lastCall).toMatchObject({
      filter: expect.objectContaining({ myPlansOnly: true }),
    })
  })

  test('calls refetch with myPlansOnly: true when opened from home query param', async () => {
    const { container } = renderPage('/mediaplanner?myPlansOnly=true')
    await waitFor(() => {
      expect(container.querySelector('#mediaplan-tbl')).toBeInTheDocument()
    })
    await waitFor(() => {
      expect(refetchMediaPlans).toHaveBeenCalled()
    })
    const lastCall = refetchMediaPlans.mock.calls[refetchMediaPlans.mock.calls.length - 1][0]
    expect(lastCall).toMatchObject({
      filter: expect.objectContaining({ myPlansOnly: true }),
    })
  })

  test('toggling to "All Plans" calls refetch with myPlansOnly: false', async () => {
    const { container } = renderPage('/mediaplanner?myPlansOnly=true')
    await waitFor(() => {
      expect(container.querySelector('#mediaplan-view_all-tab')).toBeInTheDocument()
    })
    await waitFor(() => {
      expect(refetchMediaPlans).toHaveBeenCalled()
    })
    const callsBeforeToggle = refetchMediaPlans.mock.calls.length

    const tabAll = container.querySelector('#mediaplan-view_all-tab') as HTMLElement
    fireEvent.click(tabAll)

    await waitFor(() => {
      expect(refetchMediaPlans.mock.calls.length).toBeGreaterThan(callsBeforeToggle)
    })
    const callArgs = refetchMediaPlans.mock.calls[refetchMediaPlans.mock.calls.length - 1][0]
    expect(callArgs).toMatchObject({
      filter: expect.objectContaining({ myPlansOnly: false }),
    })
  })

  test('toggling back to "My Plans" calls refetch with myPlansOnly: true', async () => {
    const { container } = renderPage('/mediaplanner?myPlansOnly=true')
    await waitFor(() => {
      expect(container.querySelector('#mediaplan-view_all-tab')).toBeInTheDocument()
      expect(container.querySelector('#mediaplan-view_my-tab')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(refetchMediaPlans).toHaveBeenCalled()
    })

    const tabAll = container.querySelector('#mediaplan-view_all-tab') as HTMLElement
    const callsBeforeAllToggle = refetchMediaPlans.mock.calls.length
    fireEvent.click(tabAll)

    await waitFor(() => {
      expect(refetchMediaPlans.mock.calls.length).toBeGreaterThan(callsBeforeAllToggle)
    })

    refetchMediaPlans.mockClear()

    const tabMy = container.querySelector('#mediaplan-view_my-tab') as HTMLElement
    fireEvent.click(tabMy)

    await waitFor(() => {
      expect(refetchMediaPlans).toHaveBeenCalled()
    })
    const callArgs = refetchMediaPlans.mock.calls[0][0]
    expect(callArgs).toMatchObject({
      filter: expect.objectContaining({ myPlansOnly: true }),
    })
  })

  test('Status dropdown opens and shows all status options', async () => {
    const { container } = renderPage()
    await waitFor(() => {
      expect(container.querySelector('#mediaplan-status_filter-sel')).toBeInTheDocument()
    })

    const statusSelector = container
      .querySelector('#mediaplan-status_filter-sel')
      ?.closest('.ant-select')
      ?.querySelector('.ant-select-selector') as HTMLElement

    fireEvent.mouseDown(statusSelector)

    await waitFor(() => {
      expect(document.querySelector('.ant-select-dropdown')).toBeInTheDocument()
    })

    const dropdown = document.querySelector('.ant-select-dropdown') as HTMLElement
    expect(dropdown.textContent).toMatch('Draft')
    expect(dropdown.textContent).toMatch('Submitted')
    expect(dropdown.textContent).toMatch('Closed Won')
    expect(dropdown.textContent).toMatch('Closed Lost')
    expect(dropdown.textContent).toMatch('Archived')
  })

  test('Plan Type dropdown opens and shows New and Renewal options', async () => {
    const { container } = renderPage()
    await waitFor(() => {
      expect(container.querySelector('#mediaplan-plan_type_filter-sel')).toBeInTheDocument()
    })

    const planTypeSelector = container
      .querySelector('#mediaplan-plan_type_filter-sel')
      ?.closest('.ant-select')
      ?.querySelector('.ant-select-selector') as HTMLElement

    fireEvent.mouseDown(planTypeSelector)

    await waitFor(() => {
      expect(document.querySelector('.ant-select-dropdown')).toBeInTheDocument()
    })

    const dropdown = document.querySelector('.ant-select-dropdown') as HTMLElement
    expect(dropdown.textContent).toMatch('New')
    expect(dropdown.textContent).toMatch('Renewal')
  })

  test('shows loading state while queryFn is pending', async () => {
    const pendingRefetch = new Promise(() => {})
    refetchMediaPlans.mockReturnValue(pendingRefetch as any)

    const { container } = renderPage()
    await waitFor(() => {
      expect(container.querySelector('#mediaplan-tbl')).toBeInTheDocument()
    })
    await waitFor(() => {
      expect(container.querySelector('.ant-spin')).toBeInTheDocument()
    })
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// buildMediaPlanQueryFn — unit tests
// ─────────────────────────────────────────────────────────────────────────────

describe('buildMediaPlanQueryFn', () => {
  test('transforms filters and pagination into the correct refetch call', async () => {
    const mockRefetch = jest.fn().mockResolvedValue(mockGetMediaPlansResponse)
    const mockSetToggleTotals = jest.fn()
    const queryFn = buildMediaPlanQueryFn(mockRefetch, mockSetToggleTotals)

    const filters = {
      ids: ['adv-001', 'adv-002'],
      planIds: ['plan-001'],
      status: ['DRAFT', 'SUBMITTED'],
      planType: ['NEW'],
      search: '  hotel  ',
      myPlansOnly: true,
    }
    const pagination: TablePaginationConfig = { pageSize: 20, current: 2 }

    await queryFn(filters, pagination)

    expect(mockRefetch).toHaveBeenCalledWith({
      filter: expect.objectContaining({
        advertiserId: ['adv-001', 'adv-002'],
        planName: ['plan-001'],
        status: ['DRAFT', 'SUBMITTED'],
        planType: ['NEW'],
        search: 'hotel',
        myPlansOnly: true,
        paging: { limit: 20, offset: 20 },
      }),
    })
  })

  test('passes all selected plan types when multiple are chosen', async () => {
    const mockRefetch = jest.fn().mockResolvedValue(mockGetMediaPlansResponse)
    const mockSetToggleTotals = jest.fn()
    const queryFn = buildMediaPlanQueryFn(mockRefetch, mockSetToggleTotals)

    await queryFn({ planType: ['NEW', 'RENEWAL'] }, undefined)

    expect(mockRefetch).toHaveBeenCalledWith({
      filter: expect.objectContaining({
        planType: ['NEW', 'RENEWAL'],
      }),
    })
  })

  test('applies sensible defaults when filters and pagination are empty', async () => {
    const mockRefetch = jest.fn().mockResolvedValue(mockGetMediaPlansResponse)
    const mockSetToggleTotals = jest.fn()
    const queryFn = buildMediaPlanQueryFn(mockRefetch, mockSetToggleTotals)

    await queryFn({}, undefined)

    expect(mockRefetch).toHaveBeenCalledWith({
      filter: expect.objectContaining({
        advertiserId: undefined,
        planName: undefined,
        status: undefined,
        planType: undefined,
        myPlansOnly: false,
        paging: { limit: 10, offset: 0 },
      }),
    })
  })

  test('updates toggle totals from the refetch response', async () => {
    const mockRefetch = jest.fn().mockResolvedValue(mockGetMediaPlansResponse)
    const mockSetToggleTotals = jest.fn()
    const queryFn = buildMediaPlanQueryFn(mockRefetch, mockSetToggleTotals)

    await queryFn({}, undefined)

    expect(mockSetToggleTotals).toHaveBeenCalledWith({
      // Prototype seeds NEW demo plans into the "All Plans" count (prepended to the backend rows).
      allPlansCount: mockGetMediaPlansResponse.data.GetMediaPlans.allPlansCount + SEEDED_NEW_PLANS.length,
      // "My Plans" also counts the seeded plans of followed demo advertisers (default follow state):
      // The Londoner Hotel + every DEMO_ADVERTISERS entry that is followedByDefault.
      myPlansCount:
        mockGetMediaPlansResponse.data.GetMediaPlans.myPlansCount +
        1 +
        DEMO_ADVERTISERS.filter(advertiser => advertiser.followedByDefault).length,
    })
  })

  test('does not throw when refetch rejects — falls back to seeded plans only', async () => {
    const mockError = new Error('Network error')
    const mockRefetch = jest.fn().mockRejectedValue(mockError)
    const mockSetToggleTotals = jest.fn()
    const queryFn = buildMediaPlanQueryFn(mockRefetch, mockSetToggleTotals)

    // A failing backend (e.g. a 401 while navigating) must not crash the page: the queryFn resolves
    // with no backend plans (seeded prototype plans still render) instead of rejecting.
    const result = await queryFn({}, undefined)
    expect(Array.isArray(result.data)).toBe(true)
    expect(result.total).toBe(result.data.length)
    expect(mockSetToggleTotals).toHaveBeenCalled()
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// buildPlanNameOptionsQueryFn — unit tests
// ─────────────────────────────────────────────────────────────────────────────

describe('buildPlanNameOptionsQueryFn', () => {
  test('returns mapped options from refetch response', async () => {
    const mockRefetch = jest.fn().mockResolvedValue({
      data: {
        GetMediaPlans: {
          plans: [
            { id: 'plan-001', planName: 'Alpha Campaign' },
            { id: 'plan-002', planName: 'Beta Campaign' },
          ],
        },
      },
    })
    const queryFn = buildPlanNameOptionsQueryFn(mockRefetch as any)
    const options = await queryFn('', { limit: 10, offset: 0 })
    expect(options).toEqual([
      { label: 'Alpha Campaign', value: 'plan-001' },
      { label: 'Beta Campaign', value: 'plan-002' },
    ])
  })

  test('deduplicates plans with the same id', async () => {
    const mockRefetch = jest.fn().mockResolvedValue({
      data: {
        GetMediaPlans: {
          plans: [
            { id: 'plan-001', planName: 'Alpha Campaign' },
            { id: 'plan-001', planName: 'Alpha Campaign (duplicate)' },
            { id: 'plan-002', planName: 'Beta Campaign' },
          ],
        },
      },
    })
    const queryFn = buildPlanNameOptionsQueryFn(mockRefetch as any)
    const options = await queryFn('', { limit: 10, offset: 0 })
    expect(options).toHaveLength(2)
    expect(options[0].label).toBe('Alpha Campaign')
  })

  test('passes trimmed search and pagination to refetch', async () => {
    const mockRefetch = jest.fn().mockResolvedValue({
      data: { GetMediaPlans: { plans: [] } },
    })
    const queryFn = buildPlanNameOptionsQueryFn(mockRefetch as any)
    await queryFn('  hotel  ', { limit: 20, offset: 40 })
    expect(mockRefetch).toHaveBeenCalledWith({
      filter: {
        search: 'hotel',
        paging: { limit: 20, offset: 40 },
      },
    })
  })

  test('passes undefined for empty search string', async () => {
    const mockRefetch = jest.fn().mockResolvedValue({
      data: { GetMediaPlans: { plans: [] } },
    })
    const queryFn = buildPlanNameOptionsQueryFn(mockRefetch as any)
    await queryFn('', { limit: 10, offset: 0 })
    expect(mockRefetch).toHaveBeenCalledWith({
      filter: {
        search: undefined,
        paging: { limit: 10, offset: 0 },
      },
    })
  })

  test('returns empty array when plans is absent from the response', async () => {
    const mockRefetch = jest.fn().mockResolvedValue({
      data: { GetMediaPlans: {} },
    })
    const queryFn = buildPlanNameOptionsQueryFn(mockRefetch as any)
    const options = await queryFn('', { limit: 10, offset: 0 })
    expect(options).toEqual([])
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// PLAN NAVIGATION
// ─────────────────────────────────────────────────────────────────────────────

describe('MediaplannerPage — Plan navigation', () => {
  test('clicking a plan name button navigates to the edit page', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/mediaplanner']}>
        <Routes>
          <Route path='/mediaplanner' element={<MediaplannerPage />} />
          <Route path='/mediaplanner/edit/:planId' element={<div data-testid='edit-page' />} />
        </Routes>
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(container.querySelector('#mediaplan-open-0-btn')).toBeInTheDocument()
    })

    fireEvent.click(container.querySelector('#mediaplan-open-0-btn')!)

    await waitFor(() => {
      expect(screen.getByTestId('edit-page')).toBeInTheDocument()
    })
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// FILTER SELECTS — onChange handlers
// ─────────────────────────────────────────────────────────────────────────────

describe('MediaplannerPage — Filter onChange handlers', () => {
  test('selecting a Status option triggers refetch with that status', async () => {
    const { container } = renderPage()
    await waitFor(() => {
      expect(container.querySelector('#mediaplan-status_filter-sel')).toBeInTheDocument()
    })

    const statusSelector = container
      .querySelector('#mediaplan-status_filter-sel')
      ?.closest('.ant-select')
      ?.querySelector('.ant-select-selector') as HTMLElement

    fireEvent.mouseDown(statusSelector)

    await waitFor(() => {
      expect(document.querySelector('.ant-select-dropdown')).toBeInTheDocument()
    })

    refetchMediaPlans.mockClear()

    const draftOption = Array.from(
      document.querySelectorAll('.ant-select-item-option-content'),
    ).find(el => el.textContent === 'Draft') as HTMLElement

    fireEvent.click(draftOption!)

    await waitFor(() => {
      expect(refetchMediaPlans).toHaveBeenCalledWith(
        expect.objectContaining({
          filter: expect.objectContaining({ status: ['DRAFT'] }),
        }),
      )
    })
  })

  test('selecting a Plan Type option triggers refetch with that type', async () => {
    const { container } = renderPage()
    await waitFor(() => {
      expect(container.querySelector('#mediaplan-plan_type_filter-sel')).toBeInTheDocument()
    })

    const planTypeSelector = container
      .querySelector('#mediaplan-plan_type_filter-sel')
      ?.closest('.ant-select')
      ?.querySelector('.ant-select-selector') as HTMLElement

    fireEvent.mouseDown(planTypeSelector)

    await waitFor(() => {
      expect(document.querySelector('.ant-select-dropdown')).toBeInTheDocument()
    })

    refetchMediaPlans.mockClear()

    const newOption = Array.from(
      document.querySelectorAll('.ant-select-item-option-content'),
    ).find(el => el.textContent === 'New') as HTMLElement

    fireEvent.click(newOption!)

    await waitFor(() => {
      expect(refetchMediaPlans).toHaveBeenCalledWith(
        expect.objectContaining({
          filter: expect.objectContaining({ planType: ['NEW'] }),
        }),
      )
    })
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// buildServerOptionsQueryFn callbacks — lines 40-52
//
// buildServerOptionsQueryFn is mocked, so getItems and mapToOption are passed
// as arguments but never invoked by the mock. We capture the call arguments
// and exercise the callbacks directly.
// ─────────────────────────────────────────────────────────────────────────────

describe('MediaplannerPage — advertisersServerOptions callbacks (lines 40-52)', () => {
  test('getItems extracts the advertisers array from response data', async () => {
    const { buildServerOptionsQueryFn } = jest.requireMock('@amadeus/react-utils') as {
      buildServerOptionsQueryFn: jest.Mock
    }
    renderPage()
    await waitFor(() => expect(buildServerOptionsQueryFn).toHaveBeenCalled())

    const config = buildServerOptionsQueryFn.mock.calls[0][0]

    const data = { advertisers: { advertisers: [{ advertiserName: 'Hotel A', advertiserId: 1, bpid: 'HA' }] } }
    expect(config.getItems(data)).toEqual(data.advertisers.advertisers)
    // Flush pending fetchServer microtasks to avoid act() warnings
    await act(async () => {})
  })

  test('getItems returns empty array when data is null/undefined', async () => {
    const { buildServerOptionsQueryFn } = jest.requireMock('@amadeus/react-utils') as {
      buildServerOptionsQueryFn: jest.Mock
    }
    renderPage()
    await waitFor(() => expect(buildServerOptionsQueryFn).toHaveBeenCalled())

    const config = buildServerOptionsQueryFn.mock.calls[0][0]
    expect(config.getItems(null)).toEqual([])
    expect(config.getItems({})).toEqual([])
    await act(async () => {})
  })

  test('mapToOption builds label, value and bpid from an advertiser object', async () => {
    const { buildServerOptionsQueryFn } = jest.requireMock('@amadeus/react-utils') as {
      buildServerOptionsQueryFn: jest.Mock
    }
    renderPage()
    await waitFor(() => expect(buildServerOptionsQueryFn).toHaveBeenCalled())

    const config = buildServerOptionsQueryFn.mock.calls[0][0]
    const adv = { advertiserName: 'Test Hotel', advertiserId: 42, bpid: 'test-bpid' }
    const option = config.mapToOption(adv)

    expect(option.label).toBe('Test Hotel (TEST-BPID)')
    expect(option.value).toBe(42)
    expect(option.bpid).toBe('test-bpid')
    await act(async () => {})
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// Filter Select onChange handlers — lines 181-182 and 210-211
//
// Ant Design Select with filterMode='server' does not propagate onChange via
// DOM events in jsdom. Instead we spy on Select, capture the onChange prop that
// Mediaplanner.tsx passes, and invoke it directly.
// ─────────────────────────────────────────────────────────────────────────────

describe('MediaplannerPage — Filter onChange handlers (lines 181-182, 210-211)', () => {
  let selectSpy: jest.SpyInstance

  beforeEach(() => {
    selectSpy = jest
      .spyOn(DesignFactory, 'Select')
      .mockImplementation(({ id }: any) =>
        React.createElement('span', { 'data-sel-id': id }),
      )
  })

  afterEach(() => {
    selectSpy.mockRestore()
  })

  test('Plan Name filter onChange calls updateSelectedOptions (line 181-182)', async () => {
    const { updateSelectedOptions } = jest.requireMock(
      '@amadeus/react-utils',
    ) as { updateSelectedOptions: jest.Mock }

    renderPage()

    await waitFor(() => {
      expect(
        selectSpy.mock.calls.some((c: any[]) => c[0]?.id === 'mediaplan-plan_name_filter-sel'),
      ).toBe(true)
    })

    const call = selectSpy.mock.calls.find(
      (c: any[]) => c[0]?.id === 'mediaplan-plan_name_filter-sel',
    )!
    const { onChange } = call[0] as { onChange: (v: any) => void }

    act(() => {
      onChange(['plan-1'])
    })

    expect(updateSelectedOptions).toHaveBeenCalledWith(
      ['plan-1'],
      expect.anything(),
      expect.any(Function),
    )
    await act(async () => {})
  })

  test('Advertiser filter onChange calls updateSelectedOptions (line 210-211)', async () => {
    const { updateSelectedOptions } = jest.requireMock(
      '@amadeus/react-utils',
    ) as { updateSelectedOptions: jest.Mock }

    renderPage()

    await waitFor(() => {
      expect(
        selectSpy.mock.calls.some((c: any[]) => c[0]?.id === 'mediaplan-advertiser_filter-sel'),
      ).toBe(true)
    })

    const call = selectSpy.mock.calls.find(
      (c: any[]) => c[0]?.id === 'mediaplan-advertiser_filter-sel',
    )!
    const { onChange } = call[0] as { onChange: (v: any) => void }

    act(() => {
      onChange(['bpid-1'])
    })

    expect(updateSelectedOptions).toHaveBeenCalledWith(
      ['bpid-1'],
      expect.anything(),
      expect.any(Function),
    )
    await act(async () => {})
  })
})
