import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  useMarkAsRead,
  useMarkAsUnread,
  useSnoozeNotification,
  useUnSnoozeNotification,
} from '../Notifications.queries'
import type { AfterFn, NotificationOrGrouped } from './useNotificationsActions.d'
import { useNotification } from '@amadeus/react-design-factory'

export function useNotificationActions() {
  const { t } = useTranslation('notifications')
  const notificationRdf = useNotification()

  const [markAsRead, { error: markAsReadError }] = useMarkAsRead()
  const [markAsUnread, { error: markAsUnreadError }] = useMarkAsUnread()
  const [snoozeNotification, { error: snoozeNotificationError }] = useSnoozeNotification()
  const [unsnoozeNotification, { error: unsnoozeNotificationError }] = useUnSnoozeNotification()

  const handleMarkAsRead = async (notification: NotificationOrGrouped, afterFn: AfterFn) => {
    await markAsRead({ variables: { id: String(notification.id) } })
    await afterFn()
    notificationRdf.success(t('toast.markedRead'), {
      onUndo: async () => {
        await markAsUnread({ variables: { id: String(notification.id) } })
        await afterFn()
      },
    })
  }

  useEffect(() => {
    if (markAsReadError) notificationRdf.error(markAsReadError.message)
  }, [markAsReadError])

  const handleMarkAsUnread = async (notification: NotificationOrGrouped, afterFn: AfterFn) => {
    await markAsUnread({ variables: { id: String(notification.id) } })
    await afterFn()
    notificationRdf.success(t('toast.markedUnread'), {
      onUndo: async () => {
        await markAsRead({ variables: { id: String(notification.id) } })
        await afterFn()
      },
    })
  }

  useEffect(() => {
    if (markAsUnreadError) notificationRdf.error(markAsUnreadError.message)
  }, [markAsUnreadError])

  const handleSnooze = async (notification: NotificationOrGrouped, afterFn: AfterFn) => {
    await snoozeNotification({ variables: { id: String(notification.id) } })
    await afterFn()
    notificationRdf.success(t('toast.snoozed'), {
      onUndo: async () => {
        await unsnoozeNotification({ variables: { id: String(notification.id) } })
        await afterFn()
      },
    })
  }

  useEffect(() => {
    if (snoozeNotificationError) notificationRdf.error(snoozeNotificationError.message)
  }, [snoozeNotificationError])

  const handleUnsnooze = async (notification: NotificationOrGrouped, afterFn: AfterFn) => {
    await unsnoozeNotification({ variables: { id: String(notification.id) } })
    await afterFn()
    notificationRdf.success(t('toast.unsnoozed'), {
      onUndo: async () => {
        await snoozeNotification({ variables: { id: String(notification.id) } })
        await afterFn()
      },
    })
  }

  useEffect(() => {
    if (unsnoozeNotificationError) notificationRdf.error(unsnoozeNotificationError.message)
  }, [unsnoozeNotificationError])

  return {
    handleMarkAsRead,
    handleMarkAsUnread,
    handleSnooze,
    handleUnsnooze,
  }
}
