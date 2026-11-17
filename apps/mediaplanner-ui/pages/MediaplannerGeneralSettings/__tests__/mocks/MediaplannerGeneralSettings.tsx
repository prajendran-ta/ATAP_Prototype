import React from 'react'
import { useAuth } from '@mediahub/mediahub-ui/context/AuthContext'
import * as NotificationUtils from '@amadeus/react-design-factory/utils/notification'
import * as GsQueries from '../../MediaplannerGeneralSettings.queries'
import * as MediaplannerQueries from '../../../Mediaplanner/Mediaplanner.queries'
import * as AdvertisersQueries from '@mediahub/advertisers-ui/pages/Advertisers/Advertisers.queries'
import * as SharedQueries from '@mediahub/mediahub-ui/shared/shared.queries'
import { adminAuthData, mockCurrencies } from '../data/MediaplannerGeneralSettings'

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

jest.mock('../../MediaplannerGeneralSettings.queries', () => ({
  __esModule: true,
  useGetMediaPlanGsQuery: jest.fn(),
  useCreateMediaPlanGsMutation: jest.fn(),
  useUpdateMediaPlanGsMutation: jest.fn(),
}))

jest.mock('../../../Mediaplanner/Mediaplanner.queries', () => ({
  __esModule: true,
  useGetLastDistributionLazyQuery: jest.fn(),
}))

jest.mock('@mediahub/advertisers-ui/pages/Advertisers/Advertisers.queries', () => ({
  __esModule: true,
  useGetAdvertiserOptionsQuery: jest.fn(),
  useGetAdvertiserByIdQuery: jest.fn(),
}))

jest.mock('@mediahub/mediahub-ui/shared/shared.queries', () => ({
  __esModule: true,
  useGetCurrenciesQuery: jest.fn(),
}))

jest.mock('@amadeus/react-utils/hooks/useServerOptions', () => ({
  __esModule: true,
  useServerOptions: jest.fn(),
}))

jest.mock('@amadeus/react-utils', () => ({
  __esModule: true,
  buildServerOptionsQueryFn: jest.fn().mockReturnValue(jest.fn()),
  formatNumber: (value: number) => String(value),
  parseNumber: jest.requireActual('@amadeus/react-utils').parseNumber,
}))

export const mockCreateMediaPlanGs = jest.fn()
export const mockUpdateMediaPlanGs = jest.fn()
export const mockLoadLastDistribution = jest.fn()
export const mockNotification = { error: jest.fn(), success: jest.fn(), info: jest.fn() }

export function setupBeforeEach() {
  jest.resetAllMocks()

  ;(useAuth as unknown as jest.Mock).mockReturnValue(adminAuthData)

  ;(NotificationUtils.useNotification as unknown as jest.Mock).mockReturnValue(mockNotification)

  ;(GsQueries.useGetMediaPlanGsQuery as unknown as jest.Mock).mockReturnValue({
    data: undefined,
    loading: false,
  })

  ;(GsQueries.useCreateMediaPlanGsMutation as unknown as jest.Mock).mockReturnValue([
    mockCreateMediaPlanGs,
    { loading: false },
  ])

  ;(GsQueries.useUpdateMediaPlanGsMutation as unknown as jest.Mock).mockReturnValue([
    mockUpdateMediaPlanGs,
    { loading: false },
  ])

  ;(MediaplannerQueries.useGetLastDistributionLazyQuery as unknown as jest.Mock).mockReturnValue([
    mockLoadLastDistribution,
    { loading: false },
  ])

  ;(AdvertisersQueries.useGetAdvertiserOptionsQuery as unknown as jest.Mock).mockReturnValue({
    data: { advertisers: { advertisers: [] } },
    loading: false,
    refetch: jest.fn(),
  })

  ;(AdvertisersQueries.useGetAdvertiserByIdQuery as unknown as jest.Mock).mockReturnValue({
    data: undefined,
    loading: false,
  })

  ;(SharedQueries.useGetCurrenciesQuery as unknown as jest.Mock).mockReturnValue({
    data: mockCurrencies,
    loading: false,
  })

  const { useServerOptions } = require('@amadeus/react-utils/hooks/useServerOptions')
  ;(useServerOptions as jest.Mock).mockReturnValue({
    options: [],
    loading: false,
    onSearch: jest.fn(),
    onBlur: jest.fn(),
    onPopupScroll: jest.fn(),
  })
}

export function setGsData(data: any, loading = false) {
  ;(GsQueries.useGetMediaPlanGsQuery as unknown as jest.Mock).mockReturnValue({ data, loading })
}

export function setGsLoading(loading: boolean) {
  ;(GsQueries.useGetMediaPlanGsQuery as unknown as jest.Mock).mockReturnValue({
    data: undefined,
    loading,
  })
}

export function setAuth(authData: any) {
  ;(useAuth as unknown as jest.Mock).mockReturnValue(authData)
}
