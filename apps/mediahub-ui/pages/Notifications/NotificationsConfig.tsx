import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, DropdownMenu, Grid, Icon, IconButton, Text, colors } from '@amadeus/react-design-factory'
import {
  AlertCategoryEnum,
  AlertLevelEnum,
  AlertModuleEnum,
  AlertStatusEnum,
  LinkTypeEnum,
  TimePeriodEnum,
} from '@mediahub/mediahub-ui/graphql/generated/shared-enums'
import { MenuProps } from 'antd'
import Dropdown from 'antd/es/dropdown/dropdown'
import { AfterFn } from './useNotificationsActions/useNotificationsActions.d'
import { useNotificationActions } from './useNotificationsActions/useNotificationsActions'
import type {
  ActionHandlers,
  ActionKey,
  LinkRouteRule,
  NotificationActionsDotsProps,
  NotificationState,
} from './Notifications.d'
import type { TFunction } from 'i18next'

export const notificationsCategoriesConfig = (t: TFunction): Record<string, { label: string; color: string }> => ({
  [AlertCategoryEnum.Contract]: { label: t('notifications:categories.contract'), color: colors.cloud_20 },
  [AlertCategoryEnum.Management]: { label: t('notifications:categories.management'), color: colors.sky_10 },
  [AlertCategoryEnum.Performance]: { label: t('notifications:categories.performance'), color: colors.sky_20 },
  [AlertCategoryEnum.Others]: { label: t('notifications:categories.others'), color: colors.violet_20 },
})

export const notificationsStatusesConfig = (t: TFunction): Record<string, { label: string }> => ({
  [AlertStatusEnum.Read]: { label: t('notifications:status.read') },
  [AlertStatusEnum.Snoozed]: { label: t('notifications:status.snoozed') },
  [AlertStatusEnum.Unread]: { label: t('notifications:status.unread') },
})

export const notificationsModulesConfig = (t: TFunction): Record<string, { label: string }> => ({
  [AlertModuleEnum.Oba]: { label: t('notifications:module.oba') },
})

export const notificationsTimePeriodConfig = (t: TFunction): Record<string, { label: string }> => ({
  [TimePeriodEnum.Last_24Hours]: { label: t('notifications:timePeriod.24h') },
  [TimePeriodEnum.Last_3Days]: { label: t('notifications:timePeriod.3d') },
  [TimePeriodEnum.Last_7Days]: { label: t('notifications:timePeriod.7d') },
  [TimePeriodEnum.Last_30Days]: { label: t('notifications:timePeriod.30d') },
})

export const notificationsLevelConfig = (t: TFunction): Record<string, { label: string; icon: React.ReactNode }> => ({
  [AlertLevelEnum.Error]: {
    label: t('notifications:alertLevel.error'),
    icon: <Icon name='timesCircle' color={colors.crimson_60} />,
  },
  [AlertLevelEnum.Info]: {
    label: t('notifications:alertLevel.info'),
    icon: <Icon name='infoCircle' color={colors.sky_40} />,
  },
  [AlertLevelEnum.Warning]: {
    label: t('notifications:alertLevel.warning'),
    icon: <Icon name='exclamationTriangle' color={colors.pumpkin_60} />,
  },
})

// ─── alertLevelOptions hook ───────────────────────────────────────────────────

export const useAlertLevelOptions = () => {
  const { t } = useTranslation('notifications')
  return [
    { label: t('alertLevel.error'), value: AlertLevelEnum.Error },
    { label: t('alertLevel.info'), value: AlertLevelEnum.Info },
    { label: t('alertLevel.warning'), value: AlertLevelEnum.Warning },
  ]
}

// Keep static version for backward compat
export const alertLevelOptions = [
  { label: AlertLevelEnum.Error, value: AlertLevelEnum.Error },
  { label: 'Info/Advisory', value: AlertLevelEnum.Info },
  { label: AlertLevelEnum.Warning, value: AlertLevelEnum.Warning },
]

// ─── renderNotificationAction ─────────────────────────────────────────────────

export const renderNotificationAction = (
  notification: SharedQL.Notification,
  handleMarkAsRead: (notification: SharedQL.Notification, afterFn: AfterFn) => Promise<void>,
  afterFn: AfterFn,
  index: number,
  t: TFunction,
) => {
  const { readStatus, snoozeStatus } = notification

  return (
    <Grid.Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
      {snoozeStatus === 'Snoozed' ? (
        <Grid.Row style={{ marginLeft: 18, alignItems: 'center' }}>
          <Icon name='alarmSnooze' color={colors.cloud_80} />{' '}
        </Grid.Row>
      ) : null}
      {readStatus === 'Read' ? (
        <Grid.Row style={{ marginLeft: 'auto', width: 150, justifyContent: 'center' }}>
          <Text.Body>{t('notifications:status.read')}</Text.Body>
        </Grid.Row>
      ) : (
        <Grid.Row style={{ marginLeft: 'auto', width: 150, justifyContent: 'center' }}>
          <Button
            id={`notification-mark_read-${index}-btn`}
            variant='text'
            onClick={() => handleMarkAsRead(notification, afterFn)}
          >
            {t('notifications:actions.markAsRead')}
          </Button>
        </Grid.Row>
      )}
    </Grid.Row>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function generateOptions<T extends { label: string; value?: string }>(
  config: Record<string, T>,
  includeKeyAsValue = false,
): { label: string; value: string }[] {
  return Object.entries(config).map(([key, { label, value }]) => ({
    label,
    value: value ?? (includeKeyAsValue ? key : ''),
  }))
}

export const LINK_ROUTE_JSON: Record<LinkTypeEnum, LinkRouteRule | null> = {
  [LinkTypeEnum.AdvertiserPlan]: {
    paramKey: 'advertiserPlanId',
    template: '/oba/plans/{advertiserPlanId}/details',
  },
  [LinkTypeEnum.Unknown]: null,
}

function fillTemplate(template: string, values: Record<string, string>): string {
  return template.replace(/\{([^}]+)\}/g, (_, k) => {
    const v = values[k]
    return v != null ? v : `{${k}}`
  })
}

export function buildHrefFromLink(link: SharedQL.Link): string | undefined {
  if (!link) return

  const rule = LINK_ROUTE_JSON[link.type]
  if (!rule) return

  const id = link.parameters?.[rule.paramKey]
  if (id == null) return

  return fillTemplate(rule.template, { [rule.paramKey]: String(id) })
}

export function getAvailableActions(state: NotificationState): ActionKey[] {
  const { readStatus, snoozeStatus } = state
  const actions: ActionKey[] = []

  if (readStatus === 'Unread' && snoozeStatus === 'Unsnoozed') actions.push('snooze')
  if (snoozeStatus === 'Snoozed') actions.push('unsnooze')
  if (readStatus === 'Read') actions.push('markAsUnread')

  return actions
}

export function NotificationActions({ state, handlers }: { state: NotificationState; handlers: ActionHandlers }) {
  const { t } = useTranslation('notifications')
  const visibleActions = getAvailableActions(state)

  const items: MenuProps['items'] = visibleActions.map(action => ({
    key: action,
    label:
      action === 'snooze'
        ? t('actions.snooze')
        : action === 'unsnooze'
          ? t('actions.unsnooze')
          : action === 'markAsUnread'
            ? t('actions.markAsUnread')
            : t('actions.markAsRead'),
  }))

  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key as ActionKey) {
      case 'snooze':
        handlers.snooze()
        break
      case 'unsnooze':
        handlers.unsnooze()
        break
      case 'markAsUnread':
        handlers.markAsUnread()
        break
      case 'markAsRead':
        handlers.markAsRead()
        break
    }
  }

  return <Dropdown menu={{ items, onClick }} />
}

export const NotificationActionsDots: React.FC<NotificationActionsDotsProps> = ({ record, afterFn, index }) => {
  const { t } = useTranslation('notifications')
  const { handleMarkAsRead, handleMarkAsUnread, handleSnooze, handleUnsnooze } = useNotificationActions()

  const { readStatus, snoozeStatus } = record
  const visibleActions = getAvailableActions({ readStatus, snoozeStatus })

  const items = visibleActions.flatMap(action => {
    switch (action) {
      case 'snooze':
        return [
          {
            key: 'snooze',
            label: <span id={`notification-snooze-${index}-txt`}>{t('actions.snooze')}</span>,
            onClick: () => handleSnooze(record, afterFn),
          },
        ]
      case 'unsnooze':
        return [
          {
            key: 'unsnooze',
            label: <span id={`notification-unsnooze-${index}-txt`}>{t('actions.unsnooze')}</span>,
            onClick: () => handleUnsnooze(record, afterFn),
          },
        ]
      case 'markAsUnread':
        return [
          {
            key: 'markAsUnread',
            label: <span id={`notification-mark_as_unread-${index}-txt`}>{t('actions.markAsUnread')}</span>,
            onClick: () => handleMarkAsUnread(record, afterFn),
          },
        ]
      case 'markAsRead':
        return [
          {
            key: 'markAsRead',
            label: <span id={'notification-mark_as_read-txt'}>{t('actions.markAsRead')}</span>,
            onClick: () => handleMarkAsRead(record, afterFn),
          },
        ]
      default:
        return []
    }
  })

  return (
    <DropdownMenu items={items}>
      <IconButton id={`notifications-vertical_dots-${index}-btn`} iconName='ellipsisVertical' color={colors.cloud_80} />
    </DropdownMenu>
  )
}

export function isBroadFilter(filters?: Record<string, any>): boolean {
  if (!filters) return false

  const { advertiserIds, timePeriod, myAdvertisers } = filters

  const noAdvertisers = !advertiserIds || advertiserIds.length === 0
  const is30Days = !timePeriod || timePeriod === TimePeriodEnum.Last_30Days
  const isAllNotifications = myAdvertisers === false

  return noAdvertisers && is30Days && isAllNotifications
}
