import React from 'react'
import { IconWrapper, WarningContainer, Message } from './Notifications.styled'
import { IconButton, colors } from '@amadeus/react-design-factory'

export const BroadFilterWarning: React.FC = () => {
  return (
    <WarningContainer >
      <IconWrapper>
        <IconButton iconName='infoCircle' width={35} height={35} color={colors.sky_60} />
      </IconWrapper>
      <Message id='notifications-broad_filter_warning_ttl'>
        <>
          Please narrow your filter selection by choosing&nbsp;
          <strong>Advertiser</strong>/s&nbsp; or reduced&nbsp;
          <strong>Time period</strong>&nbsp; to view notifications. Displaying notifications for all advertisers exceeds
          the table's capacity.
        </>
      </Message>
    </WarningContainer>
  )
}
