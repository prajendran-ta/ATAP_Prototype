import styled from '@emotion/styled'
import { Badge, Grid, colors } from '@amadeus/react-design-factory'

export const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 700px;
  gap: 16px;
  margin-bottom: 50px;
`

export const AudiencePlatformChip = styled.span<{ $isAmadeus?: boolean }>`
  display: inline-block;
  padding: 2px 12px;
  border: 1px solid ${colors.cloud_0};
  border-radius: 999px;
  background-color: ${({ $isAmadeus }) => $isAmadeus ? colors.sky_40 : '#9240CC'};
  color: ${colors.cloud_0};
  font-size: 12px;
  line-height: 18px;
  white-space: nowrap;
  height: 24px;
  margin-inline-end: 0;
`

export const AudiencePlatformChipRows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const AudiencePlatformChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`

export const AudienceEnabledTag = styled.span`
  display: inline-block;
  padding: 2px 10px;
  border: 1px solid #9240CC;
  border-radius: 999px;
  background-color: ${colors.cloud_0};
  color: #9240CC;
  font-size: 12px;
  line-height: 18px;
  white-space: nowrap;
`
export const FieldsWrapper = styled(Grid.Col)`
  display: flex;
  flex-direction: column;
  background-color: ${colors.cloud_0};
  border-radius: 5px;
  border: 1px solid ${colors.cloud_30};
  gap: 16px;
  padding: 16px;
  margin-top: 10px;
`

export const FieldsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
`

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: ${colors.cloud_0};
  padding: 16px;
  border-radius: 5px;
  border: 1px solid ${colors.cloud_30};
  min-height: 0;
`

export const CardHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`

export const PageTitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  margin: 8px 0 16px;
`

export const AdvertiserSectionLayout = styled.div`
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr);
  gap: 24px;
  align-items: start;
`

export const AdvertiserSectionNavigation = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px;
  border-right: 1px solid ${colors.cloud_30};
`

export const AdvertiserSectionTab = styled.button<{ active?: boolean }>`
  border: 0;
  border-left: 3px solid ${({ active }) => active ? colors.sky_80 : 'transparent'};
  border-radius: 4px;
  padding: 10px 12px;
  text-align: left;
  color: ${colors.cloud_100};
  background: transparent;
  font: inherit;
  font-weight: ${({ active }) => active ? 700 : 400};
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${colors.sky_20};
    color: ${colors.sky_80};
  }

  &:disabled {
    color: ${colors.cloud_50};
    cursor: not-allowed;
  }
`

export const AdvertiserSectionContent = styled.div`
  min-width: 0;
  padding-top: 16px;
`

export const PageSubtitle = styled.div`
  margin: 4px 0 20px;
  color: ${colors.cloud_70};
  font-size: 16px;
`

export const PlatformDrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 8px 0 64px;
`

export const PlatformInformationCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border: 1px solid ${colors.cloud_30};
  border-radius: 5px;
  background: ${colors.cloud_0};
`

export const DrawerActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`

export const DrawerActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
`

export const PlatformConnectionStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 18px;
`

export const PlatformConnectionCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`

export const PlatformIdInputRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;

  > div:first-child {
    flex: 1;
    min-width: 0;
  }

  > div:last-child {
    flex: 0 0 auto;
    padding-bottom: 8px;
  }
`

export const ConnectedAdvertiserChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  padding: 6px 10px;
  border-radius: 16px;
  background: ${colors.cloud_20};
  color: ${colors.cloud_100};
`

export const ActiveFiltersBadge = styled(Badge)`
  border: none;
  background: ${colors.violet_20};
  color: ${colors.cloud_100};
`
