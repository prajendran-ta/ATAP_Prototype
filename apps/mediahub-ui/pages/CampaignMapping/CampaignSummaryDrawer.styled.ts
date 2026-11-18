import styled from '@emotion/styled'
import { colors } from '@amadeus/react-design-factory'
import {
  AdvertiserSectionLayout,
  AdvertiserSectionNavigation,
} from '@mediahub/advertisers-ui/pages/Advertisers/AdvertiserDetails/AdvertiserDetails.styled'

// Space between the drawer title and the tabs/content below it.
// Bottom padding keeps the end of long content (e.g. keyword tables) clear of the drawer edge.
export const SummaryLayout = styled(AdvertiserSectionLayout)`
  padding-top: 24px;
  padding-bottom: 48px;
`

// The vertical tabs stay in view while the drawer body scrolls the content.
export const SummaryNavigation = styled(AdvertiserSectionNavigation)`
  position: sticky;
  top: 24px;
  z-index: 1;
  background: ${colors.cloud_0};
`

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
`
export const Card = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
  padding: 16px;
  border: 1px solid ${colors.cloud_30};
  border-radius: 5px;
  background: ${colors.cloud_0};
`
export const Note = styled.p`
  margin: 0;
  color: ${colors.cloud_80};
  font-size: 13px;
  font-style: italic;
`
export const ImageStrip = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`
export const ImageThumb = styled.img`
  display: block;
  width: 96px;
  height: 96px;
  object-fit: cover;
  border: 1px solid ${colors.cloud_30};
  border-radius: 4px;
`
export const VideoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`
export const VideoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`
export const VideoThumb = styled.img`
  display: block;
  width: 160px;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 4px;
`
export const VideoInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  font-size: 14px;
  a {
    color: ${colors.sky_60};
    overflow-wrap: anywhere;
  }
  span {
    color: ${colors.cloud_70};
    font-size: 12px;
  }
`
export const BannerCell = styled.div`
  width: 140px;
`

// Drawer heading: campaign name with status and reporting platform chips, advertiser name below.
export const DrawerTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`

export const DrawerTitleRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;

  .ant-tag {
    margin-inline-end: 0;
  }
`

export const DrawerTitleName = styled.span`
  overflow-wrap: anywhere;
`

export const DrawerSubtitle = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${colors.cloud_70};
`
