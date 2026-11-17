import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Button, DropdownMenu, Icon, IconButton, colors } from '@amadeus/react-design-factory'
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
} from '@mediahub/mediahub-ui/components/Notifications/NotificationCard/NotificationCard.styled'
import { showClosedWonPlanPromptSuggestions } from '@mediahub/mediahub-ui/components/CampaignFlow/campaignFlowStore'
import { useNavigate } from 'react-router'

const mediaPlanName = 'Amadeus Hotels All year 2027 Rooms'
const notificationMessage = `BID-1234 - Amadeus Hotels - Media plan '${mediaPlanName}' is closed-won.`

const MediaPlannerPill = styled(OBAButton)`
  background-color: ${colors.violet_20};
`

const NotificationActions = styled(LeftSlot)`
  gap: 2px;

  .amadeus-btn {
    padding-left: 4px !important;
    padding-right: 4px !important;
  }
`

const NotificationTime = styled.span`
  color: ${colors.cloud_60};
`

const MediaPlannerClosedWonNotification: React.FC = () => {
  const [isRead, setIsRead] = useState(false)
  const [isSnoozed, setIsSnoozed] = useState(false)
  const navigate = useNavigate()

  return (
    <StyledCard accent={colors.sky_60} data-testid='media-planner-closed-won-notification'>
      <Item>
        <IconColumn>
          <IconWrap>
            <Icon name='infoCircle' width={18} height={18} color={colors.sky_60} />
          </IconWrap>
          {!isRead ? <Dot data-testid='media-planner-closed-won-unread-dot' /> : null}
        </IconColumn>
        <ContentColumn>
          <RowsWrapper>
            <Message>{notificationMessage}</Message>
            <BottomContent>
              <NotificationActions>
                <Button
                  id='media-planner-notification-view-btn'
                  variant='link'
                  onClick={() => navigate('/mediaplanner/')}
                >
                  View
                </Button>
                <Button
                  id='media-planner-notification-create-with-max-btn'
                  variant='link'
                  onClick={() => {
                    showClosedWonPlanPromptSuggestions()
                    navigate('/?panel=amadeus-max')
                  }}
                >
                  Proceed with Max
                </Button>
                <DropdownMenu
                  items={[
                    {
                      key: 'toggle-read',
                      label: isRead ? 'Mark as unread' : 'Mark as read',
                      onClick: () => setIsRead(current => !current),
                    },
                    {
                      key: 'toggle-snooze',
                      label: isSnoozed ? 'Unsnooze' : 'Snooze',
                      onClick: () => setIsSnoozed(current => !current),
                    },
                  ]}
                >
                  <IconButton
                    iconName='ellipsisVertical'
                    color={colors.cloud_80}
                    title='More notification actions'
                    aria-label='More notification actions'
                  />
                </DropdownMenu>
              </NotificationActions>
              <RightSlot>
                <NotificationTime>2 hours ago</NotificationTime>
                <MediaPlannerPill>Media Planner</MediaPlannerPill>
              </RightSlot>
            </BottomContent>
          </RowsWrapper>
        </ContentColumn>
      </Item>
    </StyledCard>
  )
}

export default MediaPlannerClosedWonNotification
