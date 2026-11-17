import React from 'react'
import Text from 'antd/es/typography/Text'
import { getNotificationConfig } from '../NotificationsConfig'
import {
  StyledCard,
  Item,
  IconColumn,
  IconWrap,
  Dot,
  ContentColumn,
  RowsWrapper,
  Message,
  BottomContent,
  LeftSlot,
  RightSlot,
  OBAButton,
  LinkButtonWrapper,
} from './NotificationCard.styled'
import {
  NotificationActionsDots,
  buildHrefFromLink,
} from '@mediahub/mediahub-ui/pages/Notifications/NotificationsConfig'
import { useNotificationActions } from '@mediahub/mediahub-ui/pages/Notifications/useNotificationsActions/useNotificationsActions'
import { Button } from '@amadeus/react-design-factory'
import { AlertReadStatusEnum, AlertSnoozeStatusEnum } from '@mediahub/mediahub-ui/graphql/generated/shared-enums'
import { useNotificationGroups } from '../Notifications.queries'
import { LinkActionProps, NotificationCardProps } from './NotificationCard.d'
import { useAuth } from '@mediahub/mediahub-ui/context/AuthContext'

export const LinkAction: React.FC<LinkActionProps> = ({ id, href, onClick, children }) => {
  return (
    <LinkButtonWrapper>
      <Button id={id} variant='link' href={href} onClick={onClick}>
        {children}
      </Button>
    </LinkButtonWrapper>
  )
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => {
  const { refetch: refetchGrouped } = useNotificationGroups()
  const config = getNotificationConfig(String(notification.level ?? 'default').toLowerCase())
  const { handleMarkAsRead } = useNotificationActions()
  const { isExternal } = useAuth()

  const message = isExternal
    ? notification.message.replace(/^(BID\/BPID|BID)\s+[^-]+-[^-]+-\s*/, '')
    : notification.message

  const refetchGroupedAndSingle = async () => {
    await refetchGrouped()
    if (typeof window !== 'undefined' && window.location.pathname.includes('/notifications')) {
      const url = new URL(window.location.href)
      url.searchParams.set('refetch', 'notifications')
      window.history.replaceState({}, '', url.toString())
    }
  }

  return (
    <StyledCard accent={config.color}>
      <Item>
        <IconColumn>
          <IconWrap>{config.icon}</IconWrap>
          {notification.new && <Dot />}
        </IconColumn>

        <ContentColumn>
          <RowsWrapper>
            <Message>
              <Text>{message}</Text>
            </Message>

            <BottomContent>
              <LeftSlot>
                {notification?.nb > 1 ? (
                  <LinkButtonWrapper>
                    <Button
                      id='home-notification_card-link'
                      variant='link'
                      href={buildHrefFromLink(notification.link as SharedQL.Link)}
                    >
                      {'More details'}
                    </Button>
                  </LinkButtonWrapper>
                ) : (
                  <>
                    <LinkAction
                      id='home-notification_card-link'
                      href={buildHrefFromLink(notification.link as SharedQL.Link)}
                    >
                      {'View'}
                    </LinkAction>
                    <LinkAction
                      id='home-notification_card-link'
                      onClick={async () => handleMarkAsRead(notification, refetchGroupedAndSingle)}
                    >
                      {'Mark as read'}
                    </LinkAction>
                    <NotificationActionsDots
                      record={{
                        ...notification,
                        snoozeStatus: AlertSnoozeStatusEnum.Unsnoozed,
                        readStatus: AlertReadStatusEnum.Unread,
                      }}
                      afterFn={refetchGroupedAndSingle}
                    />
                  </>
                )}
              </LeftSlot>

              <RightSlot>
                {notification.createdAt.ago && <Text type='secondary'>{notification.createdAt.ago}</Text>}
                {notification.module && <OBAButton>{notification.module}</OBAButton>}
              </RightSlot>
            </BottomContent>
          </RowsWrapper>
        </ContentColumn>
      </Item>
    </StyledCard>
  )
}

export default NotificationCard
