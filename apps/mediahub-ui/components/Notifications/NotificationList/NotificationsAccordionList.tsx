import React, { useEffect, useMemo, useState } from 'react'
import { Typography } from 'antd/es'
import { AccordionGroup } from '@amadeus/react-design-factory/components/AccordionGroup'
import { AlertCategoryEnum } from '@mediahub/mediahub-ui/graphql/generated/shared-enums'
import { NotificationCard } from '../NotificationCard'
import { NotificationsAccordionGroupListProps } from './NotificationsAccordionList.d'

const { Text } = Typography

// Contracts and Performance are expanded by default (the campaign flow starts from Contracts, and
// Performance surfaces growth-opportunity insights); every other notification group is collapsed on load.
const DEFAULT_EXPANDED_CATEGORIES = [AlertCategoryEnum.Contract, AlertCategoryEnum.Performance]
const getDefaultActiveKeys = (groups: NotificationsAccordionGroupListProps['notificationGroups']) =>
  groups.flatMap((g, i) =>
    g.category && DEFAULT_EXPANDED_CATEGORIES.includes(g.category) ? [`home-accordion-group-${i}`] : [],
  )

const NotificationsAccordionGroupList: React.FC<NotificationsAccordionGroupListProps> = ({ notificationGroups }) => {
  const [initialOpenKeys, setInitialOpenKeys] = useState<string[]>([])

  useEffect(() => {
    setInitialOpenKeys(getDefaultActiveKeys(notificationGroups))
  }, [notificationGroups])

  const renderGroupContent = (group: NotificationsAccordionGroupListProps['notificationGroups'][number]) => (
    <div>
      {group.notifications.map(notif => (
        <NotificationCard key={notif.id} notification={notif} />
      ))}
      {group.extraContent}
    </div>
  )

  const items = useMemo(
    () =>
      notificationGroups.map((group, index) => ({
        key: `home-accordion-group-${index}`,
        header: (
          <div>
            <Text strong={group.boldHeader}>{group.title}</Text>{' '}
            <Text>({group.notifications.length + (group.extraContent ? 1 : 0)})</Text>
          </div>
        ),
        content: renderGroupContent(group),
      })),
    [notificationGroups],
  )

  const remountKey = initialOpenKeys.join('&') || 'none'

  return (
    <React.Fragment key={remountKey}>
      <AccordionGroup
        id='home-notification_group-accordion_group'
        items={items}
        ghost={true}
        expandIconPosition='end'
        defaultActiveKey={initialOpenKeys}
        style={{ border: 'none', backgroundColor: 'transparent', paddingBottom: 40 }}
      />
    </React.Fragment>
  )
}

export default NotificationsAccordionGroupList
