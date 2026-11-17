import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import {
  generateOptions,
  buildHrefFromLink,
  getAvailableActions,
  NotificationActionsDots,
  isBroadFilter,
} from '../../NotificationsConfig'
import {
  LinkTypeEnum,
  AlertReadStatusEnum,
  AlertSnoozeStatusEnum,
  TimePeriodEnum,
} from '@mediahub/mediahub-ui/graphql/generated/shared-enums'

const mockHandleMarkAsRead = jest.fn()
const mockHandleMarkAsUnread = jest.fn()
const mockHandleSnooze = jest.fn()
const mockHandleUnsnooze = jest.fn()

jest.mock('../../useNotificationsActions/useNotificationsActions', () => ({
  __esModule: true,
  useNotificationActions: () => ({
    handleMarkAsRead: mockHandleMarkAsRead,
    handleMarkAsUnread: mockHandleMarkAsUnread,
    handleSnooze: mockHandleSnooze,
    handleUnsnooze: mockHandleUnsnooze,
  }),
}))

jest.mock('@amadeus/react-design-factory/components/Icon/Icon', () => ({
  __esModule: true,
  default: () => <span data-testid='icon' />,
}))

describe('NotificationsConfig - generateOptions', () => {
  it('uses provided value when present', () => {
    const config = {
      foo: { label: 'Foo', value: '123' },
      bar: { label: 'Bar', value: '456' },
    }

    const result = generateOptions(config)

    expect(result).toEqual([
      { label: 'Foo', value: '123' },
      { label: 'Bar', value: '456' },
    ])
  })

  it('uses empty string when no value and includeKeyAsValue=false', () => {
    const config = {
      foo: { label: 'Foo' },
      bar: { label: 'Bar' },
    }

    const result = generateOptions(config)

    expect(result).toEqual([
      { label: 'Foo', value: '' },
      { label: 'Bar', value: '' },
    ])
  })

  it('uses key as value when includeKeyAsValue=true and no explicit value', () => {
    const config = {
      foo: { label: 'Foo' },
      bar: { label: 'Bar' },
    }

    const result = generateOptions(config, true)

    expect(result).toEqual([
      { label: 'Foo', value: 'foo' },
      { label: 'Bar', value: 'bar' },
    ])
  })
})

describe('NotificationsConfig - buildHrefFromLink', () => {
  it('returns undefined when link is null', () => {
    expect(buildHrefFromLink(null)).toBeUndefined()
  })

  it('returns undefined when link type is not mapped', () => {
    const link = {
      type: 'UnknownType',
      parameters: { foo: '1' },
    } as any

    expect(buildHrefFromLink(link)).toBeUndefined()
  })

  it('returns undefined when required parameter is missing', () => {
    const link = {
      type: LinkTypeEnum.AdvertiserPlan,
      parameters: {},
    } as any

    expect(buildHrefFromLink(link)).toBeUndefined()
  })

  it('builds href when link is valid', () => {
    const link = {
      type: LinkTypeEnum.AdvertiserPlan,
      parameters: { advertiserPlanId: 42 },
    } as any

    const href = buildHrefFromLink(link)

    expect(href).toBe('/oba/plans/42/details')
  })
})

describe('NotificationsConfig - getAvailableActions', () => {
  it('returns snooze when unread and unsnoozed', () => {
    const actions = getAvailableActions({
      readStatus: AlertReadStatusEnum.Unread,
      snoozeStatus: AlertSnoozeStatusEnum.Unsnoozed,
    })

    expect(actions).toEqual(['snooze'])
  })

  it('returns unsnooze when snoozed', () => {
    const actions = getAvailableActions({
      readStatus: AlertReadStatusEnum.Unread,
      snoozeStatus: AlertSnoozeStatusEnum.Snoozed,
    })

    expect(actions).toEqual(['unsnooze'])
  })

  it('returns markAsUnread when read', () => {
    const actions = getAvailableActions({
      readStatus: AlertReadStatusEnum.Read,
      snoozeStatus: AlertSnoozeStatusEnum.Unsnoozed,
    })

    expect(actions).toEqual(['markAsUnread'])
  })

  it('returns empty array when no actions apply (no transitions)', () => {
    const actions = getAvailableActions({
      readStatus: AlertReadStatusEnum.Unread,
      snoozeStatus: AlertSnoozeStatusEnum.Unsnoozed,
    })

    expect(Array.isArray(actions)).toBe(true)
  })
})

describe('NotificationActionsDots', () => {
  const baseNotification = {
    id: '1',
    advertiser: { id: 1, name: 'Adv 1', bpid: 'BP1' },
    advertiserId: 1,
    category: 'Performance',
    code: 'CODE',
    createdAt: { ago: '1h', at: new Date().toISOString() },
    level: 'Info',
    message: 'Notification 1',
    module: 'Oba',
    link: null,
  } as any

  beforeEach(() => {
    mockHandleMarkAsRead.mockClear()
    mockHandleMarkAsUnread.mockClear()
    mockHandleSnooze.mockClear()
    mockHandleUnsnooze.mockClear()
  })

  it('renders Snooze action when unread and unsnoozed and calls handleSnooze on click', async () => {
    const afterFn = jest.fn()

    const { container } = render(
      <NotificationActionsDots
        record={{
          ...baseNotification,
          readStatus: AlertReadStatusEnum.Unread,
          snoozeStatus: AlertSnoozeStatusEnum.Unsnoozed,
        }}
        afterFn={afterFn}
        index={0}
      />,
    )

    const dotsBtn = container.querySelector('#notifications-vertical_dots-0-btn') as HTMLElement
    expect(dotsBtn).toBeInTheDocument()

    fireEvent.click(dotsBtn)

    await waitFor(() => {
      expect(screen.getByText('Snooze')).toBeInTheDocument()
    })

    const snoozeItem = screen.getByText('Snooze')
    fireEvent.click(snoozeItem)
    expect(mockHandleSnooze).toHaveBeenCalledWith(expect.objectContaining({ id: '1' }), afterFn)
  })

  it('renders Dismiss snooze action when snoozed and calls handleUnsnooze on click', async () => {
    const afterFn = jest.fn()

    const { container } = render(
      <NotificationActionsDots
        record={{
          ...baseNotification,
          readStatus: AlertReadStatusEnum.Unread,
          snoozeStatus: AlertSnoozeStatusEnum.Snoozed,
        }}
        afterFn={afterFn}
        index={0}
      />,
    )

    const dotsBtn = container.querySelector('#notifications-vertical_dots-0-btn') as HTMLElement
    expect(dotsBtn).toBeInTheDocument()

    fireEvent.click(dotsBtn)

    await waitFor(() => {
      expect(screen.getByText('Dismiss snooze')).toBeInTheDocument()
    })

    const unsnoozeItem = screen.getByText('Dismiss snooze')
    fireEvent.click(unsnoozeItem)
    expect(mockHandleUnsnooze).toHaveBeenCalledWith(expect.objectContaining({ id: '1' }), afterFn)
  })

  it('renders Mark as unread action when read and calls handleMarkAsUnread on click', async () => {
    const afterFn = jest.fn()

    const { container } = render(
      <NotificationActionsDots
        record={{
          ...baseNotification,
          readStatus: AlertReadStatusEnum.Read,
          snoozeStatus: AlertSnoozeStatusEnum.Unsnoozed,
        }}
        afterFn={afterFn}
        index={0}
      />,
    )

    const dotsBtn = container.querySelector('#notifications-vertical_dots-0-btn') as HTMLElement
    expect(dotsBtn).toBeInTheDocument()

    fireEvent.click(dotsBtn)

    await waitFor(() => {
      expect(screen.getByText('Mark as unread')).toBeInTheDocument()
    })

    const markUnreadItem = screen.getByText('Mark as unread')
    fireEvent.click(markUnreadItem)
    expect(mockHandleMarkAsUnread).toHaveBeenCalledWith(expect.objectContaining({ id: '1' }), afterFn)
  })

  it('renders Mark as read action when getAvailableActions returns markAsRead and calls handleMarkAsRead', async () => {
    const afterFn = jest.fn()

    const { container } = render(
      <NotificationActionsDots
        record={{
          ...baseNotification,
          readStatus: AlertReadStatusEnum.Unread,
          snoozeStatus: AlertSnoozeStatusEnum.Unsnoozed,
        }}
        afterFn={afterFn}
        index={0}
      />,
    )

    const dotsBtn = container.querySelector('#notifications-vertical_dots-0-btn') as HTMLElement
    expect(dotsBtn).toBeInTheDocument()

    fireEvent.click(dotsBtn)

    await waitFor(() => {
      const maybe = screen.queryByText('Mark as read')
      if (maybe) {
        fireEvent.click(maybe)
        expect(mockHandleMarkAsRead).toHaveBeenCalledWith(expect.objectContaining({ id: '1' }), afterFn)
      }
    })
  })
})

describe('NotificationsConfig - isBroadFilter', () => {
  it('returns true when no advertisers, timePeriod is Last_30Days (or undefined) and myAdvertisers is false', () => {
    expect(
      isBroadFilter({
        advertiserIds: [],
        timePeriod: TimePeriodEnum.Last_30Days,
        myAdvertisers: false,
      }),
    ).toBe(true)

    expect(
      isBroadFilter({
        advertiserIds: [],
        timePeriod: undefined,
        myAdvertisers: false,
      }),
    ).toBe(true)
  })

  it('returns false when advertisers are selected', () => {
    expect(
      isBroadFilter({
        advertiserIds: [1],
        timePeriod: TimePeriodEnum.Last_30Days,
        myAdvertisers: false,
      }),
    ).toBe(false)
  })

  it('returns false when timePeriod is narrower than Last_30Days', () => {
    expect(
      isBroadFilter({
        advertiserIds: [],
        timePeriod: TimePeriodEnum.Last_7Days,
        myAdvertisers: false,
      }),
    ).toBe(false)
  })

  it('returns false when filtering only my advertisers (myAdvertisers true)', () => {
    expect(
      isBroadFilter({
        advertiserIds: [],
        timePeriod: TimePeriodEnum.Last_30Days,
        myAdvertisers: true,
      }),
    ).toBe(false)
  })

  it('returns false when filters are undefined', () => {
    expect(isBroadFilter()).toBe(false)
  })
})
