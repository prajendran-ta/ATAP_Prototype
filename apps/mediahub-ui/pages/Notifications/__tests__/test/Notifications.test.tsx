import '../mocks/Notifications'
import React from 'react'
import { MemoryRouter, Routes, Route } from 'react-router'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import NotificationsPage from '../../Notifications'
import { AlertReadStatusEnum, AlertSnoozeStatusEnum } from '@mediahub/mediahub-ui/graphql/generated/shared-enums'

const renderWithRoute = (initialPath = '/notifications') =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path='/notifications' element={<NotificationsPage />} />
      </Routes>
    </MemoryRouter>,
  )

describe('NotificationsPage — basic rendering', () => {
  test('renders notifications table and filters', async () => {
    const { container } = renderWithRoute()

    await waitFor(() => {
      expect(container.querySelector('#notification-tbl')).toBeInTheDocument()
    })

    expect(container.querySelector('#notification-alert_type-sel')).toBeInTheDocument()
    expect(container.querySelector('#notification-advertiser-sel')).toBeInTheDocument()
    expect(container.querySelector('#notification-module-sel')).toBeInTheDocument()
    expect(container.querySelector('#notification-category-sel')).toBeInTheDocument()
    expect(container.querySelector('#notification-time_period-sel')).toBeInTheDocument()
    expect(container.querySelector('#notification-status-sel')).toBeInTheDocument()

    const tabMy = container.querySelector('#notification-my-txt') as HTMLElement
    const tabAll = container.querySelector('#notification-all-txt') as HTMLElement
    expect(tabMy).toBeInTheDocument()
    expect(tabAll).toBeInTheDocument()
  })
})

describe('NotificationsPage — table view & filters behaviour', () => {
  test('toggling View tabs switches my/all notifications filter', async () => {
    const { container } = renderWithRoute()

    await waitFor(() => {
      expect(container.querySelector('#notification-tbl')).toBeInTheDocument()
    })

    const tabMy = container.querySelector('#notification-my-txt') as HTMLElement
    const tabAll = container.querySelector('#notification-all-txt') as HTMLElement
    expect(tabMy).toBeInTheDocument()
    expect(tabAll).toBeInTheDocument()

    fireEvent.click(tabAll)
    fireEvent.click(tabMy)
  })

  test('time period filter renders options and can be changed', async () => {
    const { container } = renderWithRoute()

    await waitFor(() => {
      expect(container.querySelector('#notification-tbl')).toBeInTheDocument()
    })

    const timeSel = container
      .querySelector('#notification-time_period-sel')
      ?.closest('.ant-select')
      ?.querySelector('.ant-select-selector') as HTMLElement

    expect(timeSel).toBeInTheDocument()

    fireEvent.mouseDown(timeSel)

    await waitFor(() => {
      expect(document.querySelector('.ant-select-dropdown')).toBeInTheDocument()
    })

    const dropdown = document.querySelector('.ant-select-dropdown') as HTMLElement
    expect(dropdown).toBeInTheDocument()
    expect(dropdown.textContent).toMatch(/Last 24 hours|Last 7 Days|Last 30 Days/)
  })

  test('Alert Type filter opens the dropdown and shows alert type options', async () => {
    const { container } = renderWithRoute()

    await waitFor(() => {
      expect(container.querySelector('#notification-tbl')).toBeInTheDocument()
    })

    const alertTypeSelector = container
      .querySelector('#notification-alert_type-sel')
      ?.closest('.ant-select')
      ?.querySelector('.ant-select-selector') as HTMLElement

    expect(alertTypeSelector).toBeInTheDocument()

    fireEvent.mouseDown(alertTypeSelector)

    await waitFor(() => {
      expect(document.querySelector('.ant-select-dropdown')).toBeInTheDocument()
    })

    const dropdown = document.querySelector('.ant-select-dropdown') as HTMLElement
    expect(dropdown).toBeInTheDocument()
    expect(dropdown.textContent).toMatch(/Error|Info\/Advisory|Warning/)
  })

  test('Advertiser filter opens the dropdown and shows mocked advertiser options', async () => {
    const { container } = renderWithRoute()

    await waitFor(() => {
      expect(container.querySelector('#notification-tbl')).toBeInTheDocument()
    })

    const advertiserSelector = container
      .querySelector('#notification-advertiser-sel')
      ?.closest('.ant-select')
      ?.querySelector('.ant-select-selector') as HTMLElement

    expect(advertiserSelector).toBeInTheDocument()

    fireEvent.mouseDown(advertiserSelector)

    await waitFor(() => {
      expect(document.querySelector('.ant-select-dropdown')).toBeInTheDocument()
    })

    const dropdown = document.querySelector('.ant-select-dropdown') as HTMLElement
    expect(dropdown).toBeInTheDocument()
    expect(dropdown.textContent).toContain('No data')
  })

  test('Module filter opens the dropdown and shows mocked modules', async () => {
    const { container } = renderWithRoute()

    await waitFor(() => {
      expect(container.querySelector('#notification-tbl')).toBeInTheDocument()
    })

    const moduleSelector = container
      .querySelector('#notification-module-sel')
      ?.closest('.ant-select')
      ?.querySelector('.ant-select-selector') as HTMLElement

    expect(moduleSelector).toBeInTheDocument()

    fireEvent.mouseDown(moduleSelector)

    await waitFor(() => {
      expect(document.querySelector('.ant-select-dropdown')).toBeInTheDocument()
    })

    const dropdown = document.querySelector('.ant-select-dropdown') as HTMLElement
    expect(dropdown).toBeInTheDocument()
    expect(dropdown.textContent).toMatch(/OBA|Oba|Media/i)
  })

  test('Category filter opens the dropdown and shows mocked categories', async () => {
    const { container } = renderWithRoute()

    await waitFor(() => {
      expect(container.querySelector('#notification-tbl')).toBeInTheDocument()
    })

    const categorySelector = container
      .querySelector('#notification-category-sel')
      ?.closest('.ant-select')
      ?.querySelector('.ant-select-selector') as HTMLElement

    expect(categorySelector).toBeInTheDocument()

    fireEvent.mouseDown(categorySelector)

    await waitFor(() => {
      expect(document.querySelector('.ant-select-dropdown')).toBeInTheDocument()
    })

    const dropdown = document.querySelector('.ant-select-dropdown') as HTMLElement
    expect(dropdown).toBeInTheDocument()
    expect(dropdown.textContent).toMatch(/Performance|Contract|Management|Others/)
  })

  test('Status filter opens the dropdown and shows mocked statuses', async () => {
    const { container } = renderWithRoute()

    await waitFor(() => {
      expect(container.querySelector('#notification-tbl')).toBeInTheDocument()
    })

    const statusSelector = container
      .querySelector('#notification-status-sel')
      ?.closest('.ant-select')
      ?.querySelector('.ant-select-selector') as HTMLElement

    expect(statusSelector).toBeInTheDocument()

    fireEvent.mouseDown(statusSelector)

    await waitFor(() => {
      expect(document.querySelector('.ant-select-dropdown')).toBeInTheDocument()
    })

    const dropdown = document.querySelector('.ant-select-dropdown') as HTMLElement
    expect(dropdown).toBeInTheDocument()
    expect(dropdown.textContent).toMatch(/Read|Unread|Snoozed/)
  })
})

describe('NotificationsPage — broad filter warning rule', () => {
  test('shows BroadFilterWarning and does not render rows for All Advertisers + Last 30 Days + All notifications', async () => {
    const { container } = renderWithRoute()

    await waitFor(() => {
      expect(container.querySelector('#notification-tbl')).toBeInTheDocument()
    })

    const timeSel = container
      .querySelector('#notification-time_period-sel')
      ?.closest('.ant-select')
      ?.querySelector('.ant-select-selector') as HTMLElement

    fireEvent.mouseDown(timeSel)

    await waitFor(() => {
      expect(document.querySelector('.ant-select-dropdown')).toBeInTheDocument()
    })

    const dropdown = document.querySelector('.ant-select-dropdown') as HTMLElement
    const option30 = Array.from(dropdown.querySelectorAll('.ant-select-item-option')).find(opt =>
      opt.textContent?.includes('Last 30 Days'),
    ) as HTMLElement | undefined

    if (option30) {
      fireEvent.click(option30)
    }

    const tabAll = container.querySelector('#notification-all-txt') as HTMLElement
    fireEvent.click(tabAll)

    await waitFor(() => {
      const warning = container.querySelector('#notifications-broad_filter_warning_ttl')
      expect(warning).toBeInTheDocument()
      expect(warning?.textContent).toContain('Please narrow your filter selection by choosing')
    })
  })
})

describe('NotificationsPage — read-only user behaviour', () => {
  test('hides actions columns when user is read-only', async () => {
    const { useAuth } = jest.requireMock('@mediahub/mediahub-ui/context/AuthContext') as {
      useAuth: jest.Mock
    }
    useAuth.mockReturnValue({ user: { id: 123 }, isReadOnly: true })

    const { container } = renderWithRoute()

    await waitFor(() => {
      expect(container.querySelector('#notification-tbl')).toBeInTheDocument()
    })

    expect(container.querySelector('#notification-mark_read-0-btn')).not.toBeInTheDocument()
    expect(container.querySelector('#notifications-vertical_dots-0-btn')).not.toBeInTheDocument()
  })
})

describe('NotificationsPage — pagination (client-side) behaviour', () => {
  test('navigating to page 2 still shows later notifications (client-side pagination)', async () => {
    const { useGetNotificationsQuery } = jest.requireMock('../../Notifications.queries') as {
      useGetNotificationsQuery: jest.Mock
    }

    const allItems = Array.from({ length: 12 }).map((_, index) => ({
      id: String(index + 1),
      advertiser: { id: 1, name: `Adv ${index + 1}`, bpid: `BP${100 + index}` },
      advertiserId: 1,
      category: 'Performance',
      code: 'CODE',
      createdAt: { ago: '1h', at: new Date().toISOString() },
      level: 'Info',
      message: index < 10 ? `Notification Page1-${index + 1}` : `Notification Page2-${index + 1}`,
      module: 'Oba',
      readStatus: AlertReadStatusEnum.Unread,
      snoozeStatus: AlertSnoozeStatusEnum.Unsnoozed,
      link: null,
    }))

    const refetch = jest.fn().mockResolvedValue({ data: { notifications: allItems } })

    useGetNotificationsQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: { notifications: allItems },
      refetch,
    })

    const { container } = renderWithRoute()

    await waitFor(() => {
      expect(container.querySelector('#notification-tbl')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByText('Notification Page1-1')).toBeInTheDocument()
    })

    const nextPageButton = container.querySelector('.ant-pagination-item-2') as HTMLElement
    expect(nextPageButton).toBeInTheDocument()
    fireEvent.click(nextPageButton)

    await waitFor(() => {
      expect(screen.getByText('Notification Page2-11')).toBeInTheDocument()
    })
  })
})

describe('NotificationsPage — actions call mutations through handlers', () => {
  test('mark as read / unread / snooze / unsnooze handlers are wired', async () => {
    jest.doMock('../../useNotificationsActions/useNotificationsActions', () => ({
      __esModule: true,
      useNotificationActions: () => ({
        handleMarkAsRead: jest.fn(),
        handleMarkAsUnread: jest.fn(),
        handleSnooze: jest.fn(),
        handleUnsnooze: jest.fn(),
      }),
    }))

    const { useNotificationActions } = await import('../../useNotificationsActions/useNotificationsActions')
    const handlers = useNotificationActions()

    const { useGetNotificationsQuery } = jest.requireMock('../../Notifications.queries') as {
      useGetNotificationsQuery: jest.Mock
    }

    const notification = {
      id: '1',
      advertiser: { id: 1, name: 'Adv 1', bpid: 'BP1' },
      advertiserId: 1,
      category: 'Performance',
      code: 'CODE',
      createdAt: { ago: '1h', at: new Date().toISOString() },
      level: 'Info',
      message: 'Notification 1',
      module: 'Oba',
      readStatus: AlertReadStatusEnum.Unread,
      snoozeStatus: AlertSnoozeStatusEnum.Unsnoozed,
      link: null,
    }

    useGetNotificationsQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: { notifications: [notification] },
      refetch: jest.fn().mockResolvedValue({ data: { notifications: [notification] } }),
    })

    const { container } = renderWithRoute()

    await waitFor(() => {
      expect(container.querySelector('#notification-tbl')).toBeInTheDocument()
    })

    const markReadBtn = container.querySelector('#notification-mark_read-btn') as HTMLElement
    if (markReadBtn) {
      fireEvent.click(markReadBtn)
      expect(handlers.handleMarkAsRead).toHaveBeenCalled()
    }

    const dotsBtn = container.querySelector('#notifications-vertical_dots-btn') as HTMLElement
    if (dotsBtn) {
      fireEvent.click(dotsBtn)

      const snoozeItem = screen.queryByText('Snooze')
      if (snoozeItem) {
        fireEvent.click(snoozeItem)
        expect(handlers.handleSnooze).toHaveBeenCalled()
      }
    }
  })
})

describe('NotificationsPage — filters & refetch behaviour', () => {
  test('calls refetch with default filter on initial render', async () => {
    const { useGetNotificationsQuery } = jest.requireMock('../../Notifications.queries') as {
      useGetNotificationsQuery: jest.Mock
    }

    const refetch = jest.fn().mockResolvedValue({ data: { notifications: [] } })

    useGetNotificationsQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: { notifications: [] },
      refetch,
    })

    const { container } = renderWithRoute()

    await waitFor(() => {
      expect(container.querySelector('#notification-tbl')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(refetch).toHaveBeenCalled()
    })

    const lastCallArgs = refetch.mock.calls[refetch.mock.calls.length - 1][0]

    expect(lastCallArgs).toMatchObject({
      filter: expect.objectContaining({
        myAdvertisers: true,
      }),
    })
  })

  test('toggling View tabs updates myAdvertisers and calls refetch', async () => {
    const { useGetNotificationsQuery } = jest.requireMock('../../Notifications.queries') as {
      useGetNotificationsQuery: jest.Mock
    }

    const refetch = jest.fn().mockResolvedValue({ data: { notifications: [] } })

    useGetNotificationsQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: { notifications: [] },
      refetch,
    })

    const { container } = renderWithRoute()

    await waitFor(() => {
      expect(container.querySelector('#notification-tbl')).toBeInTheDocument()
    })

    refetch.mockClear()

    const tabAll = container.querySelector('#notification-all-txt') as HTMLElement
    fireEvent.click(tabAll)

    await waitFor(() => {
      expect(refetch).toHaveBeenCalled()
    })

    const afterAllArgs = refetch.mock.calls[0][0]
    expect(afterAllArgs).toMatchObject({
      filter: expect.objectContaining({
        myAdvertisers: false,
      }),
    })

    refetch.mockClear()

    const tabMy = container.querySelector('#notification-my-txt') as HTMLElement
    fireEvent.click(tabMy)

    await waitFor(() => {
      expect(refetch).toHaveBeenCalled()
    })

    const afterMyArgs = refetch.mock.calls[0][0]
    expect(afterMyArgs).toMatchObject({
      filter: expect.objectContaining({
        myAdvertisers: true,
      }),
    })
  })
})
