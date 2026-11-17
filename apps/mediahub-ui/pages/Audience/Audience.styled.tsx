import styled from '@emotion/styled'
import { colors, Tag } from '@amadeus/react-design-factory'

export const AudienceWrapper = styled.div`
  min-width: 900px;
  padding-bottom: 10px;
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

export const AudienceNoWrap = styled.div`
  white-space: nowrap;
`

export const AudiencePlatformChipRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 4px;
`

export const AudienceDrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 8px 0 64px;
`

export const AudienceInformationCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border: 1px solid ${colors.cloud_30};
  border-radius: 5px;
  background: ${colors.cloud_0};
  margin-bottom: 20px;
`

export const AudienceSettingsCard = AudienceInformationCard

export const AudienceSettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  & > div {
    margin-bottom: 0;
  }
`

export const AudienceFormSections = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  & > div {
    margin-bottom: 0;
  }
`

export const SelectedRulesChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`

export const AudienceDrawerFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  width: 100%;
`

export const AudienceDrawerActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
`
