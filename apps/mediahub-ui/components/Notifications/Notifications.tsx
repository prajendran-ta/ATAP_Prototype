import React from 'react'
import { useTranslation } from 'react-i18next'
import NotificationsAccordionGroupList from './NotificationList/NotificationsAccordionList'
import type { NotificationGroup } from './NotificationList/NotificationsAccordionList.d'
import { useNotificationGroups } from './Notifications.queries'
import { AlertCategoryEnum } from '@mediahub/mediahub-ui/graphql/generated/shared-enums'

const Notifications: React.FC<{ contractExtraContent?: React.ReactNode; performanceExtraContent?: React.ReactNode }> = ({
  contractExtraContent,
  performanceExtraContent,
}) => {
  const { t } = useTranslation('notifications')
  const { groups } = useNotificationGroups()
  const emptyNotificationsGroups: NotificationGroup[] = [
    { title: t('tabs.performance'), boldHeader: true, notifications: [], category: AlertCategoryEnum.Performance },
    { title: t('tabs.management'), boldHeader: true, notifications: [], category: AlertCategoryEnum.Management },
    { title: t('tabs.contracts'), boldHeader: true, notifications: [], category: AlertCategoryEnum.Contract },
    { title: t('tabs.others'), boldHeader: true, notifications: [], category: AlertCategoryEnum.Others },
  ]

  const mergedGroups: NotificationGroup[] = emptyNotificationsGroups.map(emptyGroup => {
    const existingGroup = groups?.find(g => g.title === emptyGroup.category)
    const group = existingGroup || emptyGroup
    if (group.category === AlertCategoryEnum.Contract) return { ...group, extraContent: contractExtraContent }
    if (group.category === AlertCategoryEnum.Performance) return { ...group, extraContent: performanceExtraContent }
    return group
  })

  return <NotificationsAccordionGroupList notificationGroups={mergedGroups} />
}

export default Notifications
