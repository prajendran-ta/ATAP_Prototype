import styled from '@emotion/styled'
import { colors } from '@amadeus/react-design-factory'
import { AdvertiserSectionLayout } from '@mediahub/advertisers-ui/pages/Advertisers/AdvertiserDetails/AdvertiserDetails.styled'

// Space between the drawer title and the tabs/content below it.
export const SummaryLayout = styled(AdvertiserSectionLayout)`
  padding-top: 24px;
`

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
`
export const TableBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
export const Note = styled.p`
  margin: 0;
  color: ${colors.cloud_80};
  font-size: 13px;
  font-style: italic;
`
export const BannerCell = styled.div`
  width: 140px;
`
