import React from 'react'
import { useAuth } from '@mediahub/mediahub-ui/context/AuthContext'
import * as BdQueries from '../../BudgetDistribution.queries'
import * as MediaplannerQueries from '../../../Mediaplanner/Mediaplanner.queries'
import * as AdvertisersQueries from '@mediahub/advertisers-ui/pages/Advertisers/Advertisers.queries'
import * as NotificationUtils from '@amadeus/react-design-factory/utils/notification'
import { adminAuthData, mockBdDataEmpty } from '../data/BudgetDistribution'

Object.defineProperty(window, 'getComputedStyle', {
  value: () =>
    ({
      getPropertyValue: () => '',
      overflow: 'scroll',
      overflowY: 'scroll',
      overflowX: 'scroll',
    }) as any,
})

// matchMedia — re-defined as a plain function so jest.resetAllMocks() (called in
// setupBeforeEach) does not clear its implementation between tests.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
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

jest.mock('@mediahub/mediahub-ui/context/AuthContext', () => ({
  useAuth: jest.fn(),
}))

jest.mock('@amadeus/react-design-factory/utils/notification', () => ({
  __esModule: true,
  useNotification: jest.fn(),
}))

jest.mock('../../BudgetDistribution.queries', () => ({
  __esModule: true,
  useGetMediaPlanBdQuery: jest.fn(),
  useUpdateMediaPlanBdMutation: jest.fn(),
  useGetSpendBudgetRecommendationQuery: jest.fn(),
}))

jest.mock('../../../Mediaplanner/Mediaplanner.queries', () => ({
  __esModule: true,
  useGetLastDistributionLazyQuery: jest.fn(),
}))

jest.mock('@mediahub/advertisers-ui/pages/Advertisers/Advertisers.queries', () => ({
  __esModule: true,
  useGetAdvertisersQuery: jest.fn(),
}))

jest.mock('@mediahub/mediahub-ui/components/PowerBI/PowerBIReport', () => ({
  __esModule: true,
  default: () => <div data-testid='powerbi-report' />,
}))

// SpendBudgetDistribution is exposed as a jest.fn() so individual tests can
// override its implementation (e.g. to render failing Form.Items for
// handleSubmitFailed coverage). The default behaviour fires onDistributionChange
// on mount and is restored by setupBeforeEach() after each jest.resetAllMocks().
jest.mock('../../SpendBudgetDistribution', () => ({
  __esModule: true,
  SpendBudgetDistribution: jest.fn(),
}))
export const mockSpendBudgetDistribution = (
  jest.requireMock('../../SpendBudgetDistribution') as { SpendBudgetDistribution: jest.Mock }
).SpendBudgetDistribution

// MediaSettingsDrawer mock exposes onSave / onClose via test-id buttons
jest.mock('../../MediaSettingsDrawer', () => ({
  __esModule: true,
  MediaSettingsDrawer: ({ onSave, onClose, isOpen }: any) =>
    isOpen ? (
      <div data-testid='media-settings-drawer'>
        <button data-testid='drawer-save-btn' onClick={onSave}>
          Save
        </button>
        <button data-testid='drawer-cancel-btn' onClick={onClose}>
          Cancel
        </button>
      </div>
    ) : null,
}))

jest.mock('../../DebouncedInputNumber', () => ({
  __esModule: true,
  DebouncedInputNumber: (props: any) => <input data-testid='debounced-input' defaultValue={props.value} />,
}))

export const mockUpdateMediaPlanBd = jest.fn()
export const mockRefetch = jest.fn()
export const mockLoadLastDistribution = jest.fn()
export const mockNotification = { error: jest.fn(), success: jest.fn(), info: jest.fn() }

export function setupBeforeEach() {
  jest.resetAllMocks()

  // Restore default SpendBudgetDistribution behaviour after jest.resetAllMocks()
  mockSpendBudgetDistribution.mockImplementation(({ onDistributionChange }: any) => {
    React.useEffect(() => {
      onDistributionChange?.([{ month: '2025-01-15', spendPct: 100 }])
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    return <div data-testid='spend-budget-distribution' />
  })

  ;(useAuth as unknown as jest.Mock).mockReturnValue(adminAuthData)

  ;(NotificationUtils.useNotification as unknown as jest.Mock).mockReturnValue(mockNotification)

  ;(BdQueries.useGetMediaPlanBdQuery as unknown as jest.Mock).mockReturnValue({
    data: mockBdDataEmpty,
    loading: false,
    refetch: mockRefetch,
  })

  ;(BdQueries.useUpdateMediaPlanBdMutation as unknown as jest.Mock).mockReturnValue([
    mockUpdateMediaPlanBd,
    { loading: false },
  ])

  ;(BdQueries.useGetSpendBudgetRecommendationQuery as unknown as jest.Mock).mockReturnValue({
    data: undefined,
    loading: false,
  })

  ;(MediaplannerQueries.useGetLastDistributionLazyQuery as unknown as jest.Mock).mockReturnValue([
    mockLoadLastDistribution,
    { loading: false },
  ])

  ;(AdvertisersQueries.useGetAdvertisersQuery as unknown as jest.Mock).mockReturnValue({
    data: {
      advertisers: {
        advertisers: [
          { advertiserId: 'adv-1', advertiserName: '12 th Knot', bpid: 'BP001' },
          { advertiserId: 'adv-2', advertiserName: 'Hotel Nova', bpid: 'BP002' },
          { advertiserId: 'adv-3', advertiserName: 'The Estate Yountville', bpid: 'BP003' },
          { advertiserId: 'adv-4', advertiserName: 'Grand Central Hotel', bpid: 'BP004' },
        ],
      },
    },
    loading: false,
  })

  mockLoadLastDistribution.mockResolvedValue({ data: { GetLastDistribution: null }, errors: undefined })
}

export function setBdData(data: any, loading = false) {
  ;(BdQueries.useGetMediaPlanBdQuery as unknown as jest.Mock).mockReturnValue({
    data,
    loading,
    refetch: mockRefetch,
  })
}

export function setBdLoading(loading: boolean) {
  ;(BdQueries.useGetMediaPlanBdQuery as unknown as jest.Mock).mockReturnValue({
    data: undefined,
    loading,
    refetch: mockRefetch,
  })
}

export function setAuth(authData: any) {
  ;(useAuth as unknown as jest.Mock).mockReturnValue(authData)
}

export function setAdvertisers(advertisers: any[]) {
  ;(AdvertisersQueries.useGetAdvertisersQuery as unknown as jest.Mock).mockReturnValue({
    data: {
      advertisers: {
        advertisers,
      },
    },
    loading: false,
  })
}
