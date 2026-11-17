import type React from 'react'
import { AlertCategoryEnum } from '@mediahub/mediahub-ui/graphql/generated/shared-enums'

export interface NotificationGroup {
  title: string
  notifications: SharedQL.GroupedNotification[]
  boldHeader?: boolean
  category?: AlertCategoryEnum
  extraContent?: React.ReactNode
}

export interface NotificationsAccordionGroupListProps {
  notificationGroups: NotificationGroup[]
}
