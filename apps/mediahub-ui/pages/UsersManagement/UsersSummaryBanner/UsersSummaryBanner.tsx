import React from 'react'
import { BadgeBlock, BadgeItem, Count, RolesContainerHeader, BadgeTitle } from './UsersSummaryBanner.styled'
import { Container, Text } from '@amadeus/react-design-factory'

type Props = {
  totals: {
    totalAdministrators: number
    totalStandard: number
    totalReadOnly: number
  }
  margin?: string
}

const UsersSummaryBanner: React.FC<Props> = ({ totals }) => (
  <Container.Section id='user-summary-banner'>
    <RolesContainerHeader>
      <Text.H5>User Summary</Text.H5>
    </RolesContainerHeader>

    <BadgeBlock>
      <Container.Column>
        <BadgeItem color='sky_30'>
          <BadgeTitle id='user-summary-admins-ttl'>Administrator</BadgeTitle>
        </BadgeItem>
        <Count>{totals.totalAdministrators}</Count>
      </Container.Column>

      <Container.Column>
        <BadgeItem color='sky_10'>
          <BadgeTitle id='user-summary-standard-ttl'>Standard User</BadgeTitle>
        </BadgeItem>
        <Count>{totals.totalStandard}</Count>
      </Container.Column>

      <Container.Column>
        <BadgeItem color='crimson_20'>
          <BadgeTitle id='user-summary-readonly-ttl'>Read Only</BadgeTitle>
        </BadgeItem>
        <Count>{totals.totalReadOnly}</Count>
      </Container.Column>
    </BadgeBlock>
  </Container.Section>
)

export default UsersSummaryBanner
