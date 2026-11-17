import styled from '@emotion/styled'
import { colors } from '@amadeus/react-design-factory'

export const AudienceBuilderWrapper = styled.div`
  min-width: 900px;
  padding-bottom: 10px;
`

export const AudienceBuilderDetailsWrapper = styled.div`
  min-width: 900px;
  padding-bottom: 10px;
`

export const StickyFooterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  gap: 12px;
`
export const RuleFooterActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const RuleFooterButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
`

export const CriteriaRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;

  > * {
    flex: 1;
  }
`

export const CriteriaMainRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`

export const CriteriaTypeWrap = styled.div`
  flex: 1;
`

export const CriteriaValueWrap = styled.div`
  flex: 2;
`

export const CriteriaRemoveBtnWrap = styled.div`
  flex: 0 0 auto;
  align-self: flex-start;
  padding-top: 0;
`

export const CardHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
`

// Visual hierarchy for nested place rows: continent/country -> region -> city.
const PLACE_ROW_DEPTH_BACKGROUND = [colors.sky_10, colors.cloud_10, colors.cloud_0]

export const PlaceSelectionList = styled.div`
  margin-top: 8px;
  border: 1px solid ${colors.cloud_30};
  border-radius: 6px;
  max-height: 220px;
  overflow-y: auto;
  background: ${colors.cloud_0};
`

export const PlaceSelectionRow = styled.div<{ depth?: number; summary?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 12px;
  padding-left: ${({ depth = 0 }) => 12 + depth * 20}px;
  background: ${({ depth = 0, summary }) => summary ? colors.cloud_10 : PLACE_ROW_DEPTH_BACKGROUND[Math.min(depth, PLACE_ROW_DEPTH_BACKGROUND.length - 1)]};
  border-bottom: 1px solid ${colors.cloud_30};

  &:last-child {
    border-bottom: none;
  }
`

export const PlaceSelectionChevron = styled.span<{ expanded?: boolean; invisible?: boolean }>`
  display: inline-flex;
  visibility: ${({ invisible }) => (invisible ? 'hidden' : 'visible')};
  transform: rotate(${({ expanded }) => (expanded ? 90 : 0)}deg);
  transition: transform 0.15s ease;
`

export const PlaceSelectionPath = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  color: ${colors.cloud_100};

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

export const PlaceSelectionCount = styled.span`
  color: ${colors.cloud_70};
  flex-shrink: 0;
`

export const PlaceSelectionFooter = styled.div`
  margin-top: 6px;
  color: ${colors.cloud_70};
  font-size: 12px;
`

export const CriteriaAndDivider = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 4px 0;
  color: ${colors.cloud_70};
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${colors.cloud_30};
  }
`

export const RuleSummaryCard = styled.div`
  background: ${colors.cloud_10};
  border: 1px solid ${colors.cloud_30};
  border-radius: 8px;
  padding: 18px 24px;
  margin: 16px 0;
`

export const RuleSummaryList = styled.ol`
  margin: 12px 0 0;
  padding-left: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const RuleSummaryItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const RuleSummaryChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`

export const RuleSummaryEmpty = styled.div`
  margin-top: 12px;
  color: ${colors.cloud_70};
  font-size: 13px;
`

