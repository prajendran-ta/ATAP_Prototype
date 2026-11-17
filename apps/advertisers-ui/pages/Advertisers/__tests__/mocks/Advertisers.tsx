import React from 'react'
import { useAuth } from '@mediahub/mediahub-ui/context/AuthContext'
import { advertisersPageMockData, advertiserOptionsMock, usersOptionsMock } from '../data/Advertisers'
import * as AdvertisersQueries from '../../Advertisers.queries'
import * as UsersQueries from '@mediahub/mediahub-ui/pages/UsersManagement/UserManagement.queries'

import { TextEncoder, TextDecoder } from 'node:util'

Object.assign(global, {
  TextDecoder,
  TextEncoder,
})

Object.defineProperty(window, 'getComputedStyle', {
  value: () =>
    ({
      getPropertyValue: () => '',
      overflow: 'scroll',
      overflowY: 'scroll',
      overflowX: 'scroll',
    }) as any,
})

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

jest.mock('../../Advertisers.queries', () => ({
  __esModule: true,
  useGetAdvertisersQuery: jest.fn(),
  useGetAdvertiserOptionsQuery: jest.fn(),
}))

jest.mock('@mediahub/mediahub-ui/pages/UsersManagement/UserManagement.queries', () => ({
  __esModule: true,
  useGetUsersOptionsQuery: jest.fn(),
}))

jest.mock('../../useAdvertiserFollowActions', () => ({
  __esModule: true,
  useAdvertiserFollowActions: () => ({
    handleFollowAll: jest.fn(),
    handleUnfollowAll: jest.fn(),
    handleToggleFollow: jest.fn(),
  }),
}))

jest.mock('@mediahub/mediahub-ui/context/AuthContext', () => ({
  useAuth: jest.fn(),
}))

export const refetchAdvertisers = jest.fn()
export const refetchAdvertiserOptions = jest.fn()
export const refetchUsers = jest.fn()

export function setupBeforeEach() {
  jest.resetAllMocks()
  ;(useAuth as unknown as jest.Mock).mockReturnValue({ user: { id: 999 } })

  refetchAdvertisers.mockResolvedValue({
    data: { advertisers: advertisersPageMockData },
  })
  ;(AdvertisersQueries.useGetAdvertisersQuery as unknown as jest.Mock).mockReturnValue({
    loading: false,
    error: undefined,
    refetch: refetchAdvertisers,
  })

  refetchAdvertiserOptions.mockResolvedValue({
    data: advertiserOptionsMock,
  })
  ;(AdvertisersQueries.useGetAdvertiserOptionsQuery as unknown as jest.Mock).mockReturnValue({
    data: advertiserOptionsMock,
    loading: false,
    error: undefined,
    refetch: refetchAdvertiserOptions,
  })

  refetchUsers.mockResolvedValue({ data: usersOptionsMock })
  ;(UsersQueries.useGetUsersOptionsQuery as unknown as jest.Mock).mockReturnValue({
    data: usersOptionsMock,
    loading: false,
    error: undefined,
    refetch: refetchUsers,
  })
}
