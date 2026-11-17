import { FilterItem } from '@mediahub/mediahub-ui/components/TableWithFilters/FilterBanner/FilterBanner.d'

export type FilterItemWithType<T extends Record<string, any>> = FilterItem<T> & { type?: 'single' | 'multiple' }

export type GroupedNotificationWithStatuses = SharedQL.GroupedNotification & {
  readStatus: AlertReadStatusEnum.Unread
  snoozeStatus: AlertSnoozeStatusEnum.Unsnoozed
}

export type NotificationActionsDotsProps = {
  record: SharedQL.Notification | GroupedNotificationWithStatuses
  afterFn: AfterFn
  index?: number
}

export type LinkRouteRule = {
  paramKey: string
  template: string
}

export type ActionKey = 'snooze' | 'unsnooze' | 'markAsUnread' | 'markAsRead'

export interface NotificationState {
  readStatus: SharedQL.Notification['readStatus']
  snoozeStatus: SharedQL.Notification['snoozeStatus']
}

export interface ActionHandlers {
  snooze: () => void
  unsnooze: () => void
  markAsUnread: () => void
  markAsRead: () => void
}
