import React from 'react'
import { useAuth } from '@mediahub/mediahub-ui/context/AuthContext'
import * as BdQueries from '../../../BudgetDistribution/BudgetDistribution.queries'
import * as AdvertisersQueries from '@mediahub/advertisers-ui/pages/Advertisers/Advertisers.queries'
import { adminAuthData, mockMediaPlanBdData, mockAdvertiserDetails } from '../data/MediaplannerDownloadSummary'

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

jest.mock('@amadeus/react-design-factory/utils/notification', () => ({
  __esModule: true,
  useNotification: () => ({
    error: jest.fn(),
    success: jest.fn(),
    warning: jest.fn(),
    info: jest.fn(),
  }),
}))

jest.mock('@mediahub/mediahub-ui/context/AuthContext', () => ({
  useAuth: jest.fn(),
}))

jest.mock('../../../BudgetDistribution/BudgetDistribution.queries', () => ({
  __esModule: true,
  useGetMediaPlanBdQuery: jest.fn(),
  useGetSpendBudgetRecommendationQuery: jest.fn(),
}))

jest.mock('@mediahub/advertisers-ui/pages/Advertisers/Advertisers.queries', () => ({
  __esModule: true,
  useGetAdvertiserByIdQuery: jest.fn(),
}))

jest.mock('../../download/DownloadExcelButton', () => ({
  __esModule: true,
  default: ({ id }: { id?: string }) => <button id={id}>Download CSV</button>,
}))

export function setupBeforeEach() {
  jest.resetAllMocks()

  ;(useAuth as unknown as jest.Mock).mockReturnValue(adminAuthData)

  ;(BdQueries.useGetMediaPlanBdQuery as unknown as jest.Mock).mockReturnValue({
    data: mockMediaPlanBdData,
    loading: false,
  })

  ;(BdQueries.useGetSpendBudgetRecommendationQuery as unknown as jest.Mock).mockReturnValue({
    data: undefined,
    loading: false,
  })

  ;(AdvertisersQueries.useGetAdvertiserByIdQuery as unknown as jest.Mock).mockReturnValue({
    data: mockAdvertiserDetails,
    loading: false,
  })
}

export function setAuth(authData: any) {
  ;(useAuth as unknown as jest.Mock).mockReturnValue(authData)
}

export function setBdLoading(loading: boolean) {
  ;(BdQueries.useGetMediaPlanBdQuery as unknown as jest.Mock).mockReturnValue({
    data: undefined,
    loading,
  })
}
