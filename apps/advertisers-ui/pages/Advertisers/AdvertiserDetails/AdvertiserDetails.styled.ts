import styled from '@emotion/styled'
import { colors } from '@amadeus/react-design-factory'

export const CardHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`

export const ConnectedAdvertiserChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 4px;
  background-color: ${colors.leaf_10};
  color: ${colors.leaf_80};
  font-size: 13px;
  font-weight: 500;
`

export const DrawerActionButtons = styled.div`
  display: flex;
  gap: 8px;
`

export const DrawerActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`

export const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const FieldsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`

export const PlatformDrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const PlatformConnectionStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 4px;
  background-color: ${colors.cloud_10};
`

export const PlatformConnectionCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const PlatformInformationCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  border: 1px solid ${colors.cloud_30};
  border-radius: 4px;
  background-color: ${colors.cloud_10};
`

export const PlatformIdInputRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;
`

export const PageTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`

export const AdvertiserSectionLayout = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  gap: 24px;
`

export const AdvertiserSectionNavigation = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
  width: 180px;
  border-right: 1px solid ${colors.cloud_30};
  padding-right: 24px;
`

export const AdvertiserSectionTab = styled.button<{ active?: boolean; disabled?: boolean }>`
  padding: 8px 12px;
  text-align: left;
  border: none;
  background: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  color: ${({ active, disabled }) => {
    if (disabled) return colors.cloud_40
    return active ? colors.sky_80 : colors.cloud_80
  }};
  font-weight: ${({ active }) => (active ? 600 : 400)};
  font-size: 14px;
  border-radius: 4px;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};

  &:hover:not(:disabled) {
    background-color: ${colors.cloud_10};
  }
`

export const AdvertiserSectionContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  overflow-y: auto;

  /* Add spacing below the first heading in content */
  > h5:first-of-type {
    margin-bottom: 16px;
  }
`

export const AudienceEnabledTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 2px;
  background-color: ${colors.leaf_10};
  color: ${colors.leaf_80};
  font-size: 12px;
  font-weight: 500;
`

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
