import React from 'react'
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

jest.mock('../../Notifications.queries', () => ({
  __esModule: true,
  useGetNotificationsQuery: jest.fn(() => ({
    loading: false,
    error: undefined,
    data: {
      notifications: [],
    },
    refetch: jest.fn().mockResolvedValue({
      data: {
        notifications: [],
      },
    }),
  })),
}))

jest.mock('@mediahub/advertisers-ui/pages/Advertisers/Advertisers.queries', () => ({
  __esModule: true,
  useGetAdvertiserOptionsQuery: jest.fn(() => ({
    loading: false,
    error: undefined,
    data: {
      advertisers: {
        advertisers: [],
      },
    },
    refetch: jest.fn().mockResolvedValue({
      data: {
        advertisers: {
          advertisers: [],
        },
      },
    }),
  })),
  useGetAdvertisersQuery: jest.fn(() => ({
    loading: false,
    error: undefined,
    refetch: jest.fn().mockResolvedValue({
      data: {
        advertisers: {
          advertisers: [],
        },
      },
    }),
  })),
}))

jest.mock('@mediahub/mediahub-ui/components/Notifications/Notifications.queries', () => ({
  __esModule: true,
  useNotificationGroups: jest.fn(() => ({
    loading: false,
    error: undefined,
    refetch: jest.fn().mockResolvedValue({ data: { notificationsGroups: [] } }),
  })),
}))

jest.mock('../../useNotificationsActions/useNotificationsActions', () => ({
  __esModule: true,
  useNotificationActions: () => ({
    handleMarkAsRead: jest.fn(),
    handleMarkAsUnread: jest.fn(),
    handleSnooze: jest.fn(),
    handleUnsnooze: jest.fn(),
  }),
}))

jest.mock('@mediahub/mediahub-ui/context/AuthContext', () => ({
  useAuth: jest.fn(() => ({
    user: { id: 123 },
    isReadOnly: false,
  })),
}))

jest.mock('@mediahub/advertisers-ui/AdvertisersGqlProvider', () => ({
  __esModule: true,
  client: {},
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

jest.mock('@mediahub/mediahub-ui/pages/UsersManagement/UserManagement.queries', () => ({
  __esModule: true,
  useGetUsersOptionsQuery: jest.fn(),
}))

jest.mock('@amadeus/react-design-factory/components/Icon/Icon', () => ({
  __esModule: true,
  default: () => <span data-testid='icon' />,
}))

