import React from 'react'
import { useAuth } from '@mediahub/mediahub-ui/context/AuthContext'
import * as MediaplannerQueries from '../../Mediaplanner.queries'
import * as AdvertisersQueries from '@mediahub/advertisers-ui/pages/Advertisers/Advertisers.queries'
import { adminAuthData, mockGetMediaPlansResponse } from '../data/Mediaplanner'

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

jest.mock('../../Mediaplanner.queries', () => ({
  __esModule: true,
  useGetMediaplansQuery: jest.fn(),
  useGetMediaplansOptionsQuery: jest.fn(),
  useGetLastDistributionLazyQuery: jest.fn(),
}))

jest.mock('@mediahub/advertisers-ui/pages/Advertisers/Advertisers.queries', () => ({
  __esModule: true,
  useGetAdvertiserOptionsQuery: jest.fn(),
}))

jest.mock('@amadeus/react-utils/hooks/useServerOptions', () => ({
  __esModule: true,
  useServerOptions: jest.fn(),
  updateSelectedOptions: jest.fn(),
  mergeWithSelected: jest.fn(),
}))

// Mediaplanner.tsx imports updateSelectedOptions and mergeWithSelected from the
// direct file (not the index), so this mock must also exist.
jest.mock('@amadeus/react-utils/hooks/useServerOptions/useServerOptions', () => ({
  __esModule: true,
  default: jest.fn(),
  updateSelectedOptions: jest.fn(),
  mergeWithSelected: jest.fn(),
}))

jest.mock('@amadeus/react-utils', () => ({
  __esModule: true,
  buildServerOptionsQueryFn: jest.fn().mockReturnValue(jest.fn()),
  formatNumber: (value: number) => String(value),
  useDebounce: (value: unknown) => value,
  useServerOptions: jest.fn(),
  updateSelectedOptions: jest.fn(),
  mergeWithSelected: jest.fn(),
}))

export const refetchMediaPlans = jest.fn()
export const refetchMediaPlansOptions = jest.fn()
export const refetchAdvertisers = jest.fn()

export function setupBeforeEach() {
  jest.resetAllMocks()

  ;(useAuth as unknown as jest.Mock).mockReturnValue(adminAuthData)

  refetchMediaPlans.mockResolvedValue(mockGetMediaPlansResponse)
  ;(MediaplannerQueries.useGetMediaplansQuery as unknown as jest.Mock).mockReturnValue({
    loading: false,
    refetch: refetchMediaPlans,
  })

  refetchMediaPlansOptions.mockResolvedValue(mockGetMediaPlansResponse)
  ;(MediaplannerQueries.useGetMediaplansOptionsQuery as unknown as jest.Mock).mockReturnValue({
    loading: false,
    refetch: refetchMediaPlansOptions,
  })

  ;(MediaplannerQueries.useGetLastDistributionLazyQuery as unknown as jest.Mock).mockReturnValue([
    jest.fn(),
    { loading: false },
  ])

  refetchAdvertisers.mockResolvedValue({ data: { advertisers: { advertisers: [] } } })
  ;(AdvertisersQueries.useGetAdvertiserOptionsQuery as unknown as jest.Mock).mockReturnValue({
    data: { advertisers: { advertisers: [] } },
    loading: false,
    refetch: refetchAdvertisers,
  })

  const { useServerOptions, mergeWithSelected } = require('@amadeus/react-utils')
  ;(useServerOptions as jest.Mock).mockReturnValue({
    options: [],
    loading: false,
    onSearch: jest.fn(),
    onBlur: jest.fn(),
    onPopupScroll: jest.fn(),
  })
  // Default: return the first argument (options) merged with selected — keeps existing tests intact
  ;(mergeWithSelected as jest.Mock).mockImplementation((options: any[]) => options)

  // Set up the direct-file mock for mergeWithSelected (used by Mediaplanner.tsx)
  const { mergeWithSelected: mergeWithSelectedUtil } = require('@amadeus/react-utils')
  ;(mergeWithSelectedUtil as jest.Mock).mockImplementation((options: any[]) => options)
}

export function setAuth(authData: any) {
  ;(useAuth as unknown as jest.Mock).mockReturnValue(authData)
}
