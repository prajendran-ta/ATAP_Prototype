import styled from '@emotion/styled'
import { colors } from '@amadeus/react-design-factory'

export const ProductTabsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
`

/* Prototype-only Salesforce scenario emulator strip. Styled as a clearly-temporary "tip" affordance
 * (violet accent) so it reads as a prototyping control, not part of the real intake UI. Removed when
 * the live Salesforce connection replaces the emulator. (violet is not exported in the DF `colors`
 * module — raw hex with the Figma token name noted.) */
export const ScenarioEmulatorBar = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 12px;
  margin-bottom: 12px;
  padding: 8px 12px;
  /* df/color/tip/subtle/background (violet-10) + df/color/tip/alt/default/border (violet-60) */
  background: #f8eeff;
  border: 1px dashed #9240cc;
  border-radius: 6px;
`

export const ScenarioEmulatorLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  /* violet-60 */
  color: #9240cc;
  font-size: 13px;
  font-weight: 500;
`

export const ScenarioEmulatorHint = styled.span`
  color: ${colors.cloud_70};
  font-size: 12px;
  line-height: 16px;
`

export const Card = styled.div`
  border: 1px solid ${colors.cloud_30};
  border-radius: 8px;
  background: ${colors.cloud_0};
  padding: 16px;
  margin-bottom: 16px;

  .ant-table-thead > tr > th,
  .ant-table-thead > tr > th * {
    font-size: 14px !important;
    font-weight: 500 !important;
  }
`

export const CardHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;

  h5 {
    font-size: 16px !important;
    font-weight: 500 !important;
    margin: 0;
  }
`

export const CardTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.cloud_100};
  margin-bottom: 12px;
`

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`

export const SummaryItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const SummaryLabel = styled.span`
  font-size: 12px;
  color: ${colors.cloud_70};
`

export const SummaryValue = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.cloud_100};
`

export const DrawerFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`

/**
 * Scoped override for the Property Settings drawer's reused TableWithFilterBanner:
 * the shared FilterBanner renders each filter in a narrow Grid.Col (span 2). Inside
 * the drawer we only have two filters, so widen them to fill the card (~half each)
 * and stretch the nested Select controls to full width.
 */
export const DrawerFilterTableWrap = styled.div`
  .amadeus-row > .amadeus-col {
    flex: 1 1 0 !important;
    max-width: 50% !important;
    min-width: 0 !important;
  }

  .amadeus-row > .amadeus-col .amadeus-select {
    width: 100% !important;
  }
`

export const PropertiesActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const TableHeaderText = styled.span`
  font-size: 14px;
  line-height: 18px;
  font-weight: 500;
  color: ${colors.cloud_100};
`

export const InlineCategoryRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 12px;
  margin-top: 12px;
  padding: 12px;
  border: 1px dashed ${colors.cloud_30};
  border-radius: 8px;

  /* Name input — grows to fill the remaining space. */
  > *:first-of-type {
    flex: 1 1 auto;
    min-width: 0;
  }
  /* Activity select — fixed, moderate width. */
  > *:nth-of-type(2) {
    flex: 0 0 200px;
  }
`

/* Add + Cancel grouped together so they align to the bottom of the labelled fields and sit at the
 * same height. Compact, equal-width buttons (not stretched to fill the row). */
export const InlineCategoryActions = styled.div`
  display: flex;
  gap: 8px;
  flex: 0 0 auto;

  > button {
    min-width: 80px;
  }
`

export const ExpandIconBtn = styled.span`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  margin-right: 6px;
`

export const ExpandIconSpacer = styled.span`
  display: inline-block;
  width: 18px;
`

/**
 * Scoped styling for the Properties table: parent rows (Standalone group +
 * Budget Categories) get a sky_10 background for visual hierarchy.
 */
export const PropertiesTableWrap = styled.div`
  .ant-table-thead > tr > th,
  .ant-table-thead > tr > th * {
    font-size: 14px !important;
    font-weight: 500 !important;
  }

  .mediaplan-parent-row > td {
    background: ${colors.sky_10} !important;
    font-weight: 600;
  }
`

export const PropertiesTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const AllocatedBadge = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${colors.sky_60};
  background: ${colors.sky_10};
  padding: 2px 10px;
  border-radius: 12px;
`

export const ParentLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const PropertyLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const BudgetPctHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`

/* Outlined chip marking a Salesforce-sourced (Ship_To) property. */
export const SalesforceChip = styled.span`
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 0 8px;
  border: 1px solid ${colors.sky_60};
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  color: ${colors.sky_60};
  background: transparent;
  white-space: nowrap;
`
