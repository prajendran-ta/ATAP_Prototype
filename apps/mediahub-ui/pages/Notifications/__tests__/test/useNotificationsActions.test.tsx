import { renderHook, act } from '@testing-library/react'
import { useNotificationActions } from '../../useNotificationsActions/useNotificationsActions'
import {
  useMarkAsRead,
  useMarkAsUnread,
  useSnoozeNotification,
  useUnSnoozeNotification,
} from '../../Notifications.queries'
import { useNotification } from '@amadeus/react-design-factory'

jest.mock('../../Notifications.queries')
jest.mock('@amadeus/react-design-factory', () => ({
  useNotification: jest.fn(),
}))

describe('useNotificationActions', () => {
  const notification = { id: 123 } as any
  const afterFn = jest.fn()

  const markAsReadMock = jest.fn()
  const markAsUnreadMock = jest.fn()
  const snoozeMock = jest.fn()
  const unsnoozeMock = jest.fn()

  const successMock = jest.fn()
  const errorMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useMarkAsRead as jest.Mock).mockReturnValue([markAsReadMock, { error: undefined }])
    ;(useMarkAsUnread as jest.Mock).mockReturnValue([markAsUnreadMock, { error: undefined }])
    ;(useSnoozeNotification as jest.Mock).mockReturnValue([snoozeMock, { error: undefined }])
    ;(useUnSnoozeNotification as jest.Mock).mockReturnValue([unsnoozeMock, { error: undefined }])
    ;(useNotification as jest.Mock).mockReturnValue({
      success: successMock,
      error: errorMock,
    })
  })

  it('handleMarkAsRead calls mutation, afterFn and schedules undo with markAsUnread', async () => {
    const { result } = renderHook(() => useNotificationActions())

    await act(async () => {
      await result.current.handleMarkAsRead(notification, afterFn)
    })

    expect(markAsReadMock).toHaveBeenCalledWith({ variables: { id: String(notification.id) } })
    expect(afterFn).toHaveBeenCalledTimes(1)
    expect(successMock).toHaveBeenCalledWith('Notification has been marked as read', expect.any(Object))

    const config = successMock.mock.calls[0][1]

    await act(async () => {
      await config.onUndo()
    })

    expect(markAsUnreadMock).toHaveBeenCalledWith({ variables: { id: String(notification.id) } })
    expect(afterFn).toHaveBeenCalledTimes(2)
  })

  it('handleMarkAsUnread calls mutation, afterFn and schedules undo with markAsRead', async () => {
    const { result } = renderHook(() => useNotificationActions())

    await act(async () => {
      await result.current.handleMarkAsUnread(notification, afterFn)
    })

    expect(markAsUnreadMock).toHaveBeenCalledWith({ variables: { id: String(notification.id) } })
    expect(afterFn).toHaveBeenCalledTimes(1)
    expect(successMock).toHaveBeenCalledWith('Notification has been marked as unread.', expect.any(Object))

    const config = successMock.mock.calls[0][1]

    await act(async () => {
      await config.onUndo()
    })

    expect(markAsReadMock).toHaveBeenCalledWith({ variables: { id: String(notification.id) } })
    expect(afterFn).toHaveBeenCalledTimes(2)
  })

  it('handleSnooze calls mutation, afterFn and schedules undo with unsnooze', async () => {
    const { result } = renderHook(() => useNotificationActions())

    await act(async () => {
      await result.current.handleSnooze(notification, afterFn)
    })

    expect(snoozeMock).toHaveBeenCalledWith({ variables: { id: String(notification.id) } })
    expect(afterFn).toHaveBeenCalledTimes(1)
    expect(successMock).toHaveBeenCalledWith('Notification has been snoozed.', expect.any(Object))

    const config = successMock.mock.calls[0][1]

    await act(async () => {
      await config.onUndo()
    })

    expect(unsnoozeMock).toHaveBeenCalledWith({ variables: { id: String(notification.id) } })
    expect(afterFn).toHaveBeenCalledTimes(2)
  })

  it('handleUnsnooze calls mutation, afterFn and schedules undo with snooze', async () => {
    const { result } = renderHook(() => useNotificationActions())

    await act(async () => {
      await result.current.handleUnsnooze(notification, afterFn)
    })

    expect(unsnoozeMock).toHaveBeenCalledWith({ variables: { id: String(notification.id) } })
    expect(afterFn).toHaveBeenCalledTimes(1)
    expect(successMock).toHaveBeenCalledWith('Notification has been unsnoozed', expect.any(Object))

    const config = successMock.mock.calls[0][1]

    await act(async () => {
      await config.onUndo()
    })

    expect(snoozeMock).toHaveBeenCalledWith({ variables: { id: String(notification.id) } })
    expect(afterFn).toHaveBeenCalledTimes(2)
  })
})
