import styled from '@emotion/styled'
import { colors, Container, Accordion } from '@amadeus/react-design-factory'

export const SectionHeader = styled.div`
  position: relative;
  height: 0;
  overflow: visible;
  display: flex;
  justify-content: flex-end;
  top: 14px;
  z-index: 1;
`

export const CustomSection = styled(Container.Section)`
  padding: 0px 24px 18px 24px !important;
`

export const SummaryCard = styled.div`
  border: 1px solid ${colors.cloud_30};
  border-radius: 8px;
  background: ${colors.cloud_0};
  padding: 12px;
  margin-bottom: 16px;
  height: 100%;

  h6 {
    font-size: 16px !important;
    font-weight: 500 !important;
  }
`

export const SummaryGridRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  align-items: stretch;
`
export const SummaryDivider = styled.li`
  height: 1px;
  background: ${colors.cloud_20};
  margin: 6px 0;
  padding: 0;
`

export const ModalBody = styled.div`
  padding: 8px 0;
`

export const ModalGroup = styled.div`
  margin-bottom: 10px;
`

export const ModalIndented = styled.div`
  margin-top: 6px;
  padding-left: 24px;
  display: grid;
  gap: 6px;
`

export const AccordionBody = styled.div`
  overflow-x: auto;
`

export const AccordionTableWrapper = styled.div`
  padding: 18px 24px;
  background-color: ${colors.cloud_0} !important;
`

export const PowerBISection = styled.div`
  width: 100%;
  min-height: 700px;
  margin-bottom: 16px;
  border: 1px solid ${colors.cloud_20};
  border-radius: 8px;
`

export const AccordionWrapper = styled(Accordion)`
  && {
    background-color: ${colors.cloud_0} !important;
  }
`

export const BoldText = styled.strong`
  font-weight: 600;
`

export const ExpandIconWrapper = styled.span<{ expanded: boolean }>`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s;
  transform: ${({ expanded }) => (expanded ? 'rotate(0deg)' : 'rotate(-90deg)')};
  margin-right: 8px;
`

export const ExpandIconSpacer = styled.span`
  display: inline-block;
  width: 14px;
  margin-right: 8px;
`

export const DrawerFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`

export const PlatformCheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
`

/* ---- Product tab bar + Step 2 -> Step 3 vertical nav ---- */

export const ProductTabsBar = styled.div`
  margin-bottom: 12px;
`

export const DistLayout = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
`

export const DistSidebar = styled.div`
  flex: 0 0 320px;
  border: 1px solid ${colors.cloud_30};
  border-radius: 8px;
  background: ${colors.cloud_0};
  padding: 8px;
  align-self: flex-start;
`

export const DistContent = styled.div`
  flex: 1 1 auto;
  min-width: 0;
`

const NavSectionTitleBase = styled.div`
  /* Section header — sky_10 background, sentence case, grey-800 semibold. */
  font-size: 13px;
  font-weight: 600;
  padding: 10px 12px;
  color: ${colors.cloud_100};
  background: ${colors.sky_10};
  border-radius: 4px;
  margin: 4px 4px 2px;
`

export const NavSectionTitleBlue = styled(NavSectionTitleBase)``

export const NavSectionTitleAmber = styled(NavSectionTitleBase)``

export const CompletedSectionToggle = styled.button`
  font-size: 13px;
  font-weight: 600;
  padding: 10px 12px;
  color: ${colors.cloud_100};
  background: ${colors.sky_10};
  border: none;
  border-radius: 4px;
  margin: 4px 4px 2px;
  width: calc(100% - 8px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  text-align: left;
`

export const CompletedSectionIcon = styled.span<{ open: boolean }>`
  display: inline-flex;
  align-items: center;
  transform: ${({ open }) => (open ? 'rotate(0deg)' : 'rotate(-90deg)')};
  transition: transform 0.15s ease;
`

export const NavItem = styled.button<{ selected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 8px;
  padding: 14px 16px;
  border: none;
  background: ${({ selected }) => (selected ? colors.cloud_10 : 'transparent')};
  width: 100%;
  text-align: left;
  cursor: pointer;
  border-left: 4px solid ${({ selected }) => (selected ? colors.sky_90 : 'transparent')};
  transition: background-color 0.15s ease;

  &:hover {
    background: ${colors.sky_20};
  }

  & + & {
    border-top: 1px solid ${colors.cloud_30};
  }
`

export const NavItemHeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
`

export const NavItemStatusIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  min-width: 18px;
  flex: 0 0 18px;

  svg {
    display: block;
    width: 18px;
    height: 18px;
  }
`

export const NavItemLabel = styled.span`
  /* Property / budget group name — semibold, grey-800. */
  font-weight: 500;
  font-size: 14px;
  color: ${colors.cloud_100};
  overflow-wrap: anywhere;
`

/* Subtext row — grey-500, Total on the left / Properties on the right. */
export const NavItemSub = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 13px;
  color: ${colors.cloud_70};
`

export const NavItemSubText = styled.span`
  font-size: 13px;
  font-weight: 400;
  color: ${colors.cloud_70};
  line-height: 18px;
`

export const NavTagRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`


/* ---- Selected budget-group summary card (above Past Consumption) ---- */

export const GroupSummaryCard = styled.div`
  border: 1px solid ${colors.cloud_30};
  border-radius: 8px;
  background: ${colors.cloud_0};
  padding: 16px;
  margin-bottom: 16px;
`

export const GroupSummaryTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.cloud_100};
  margin-bottom: 12px;
`

export const GroupSummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`

export const GroupSummaryItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const GroupSummaryLabel = styled.span`
  font-size: 12px;
  color: ${colors.cloud_70};
`

export const GroupSummaryValue = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.cloud_100};
`


/* Product tab label with a completed/total chip beside the name. */
export const ProductTabLabel = styled.span`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

export const ProductTabSub = styled.span`
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 0 8px;
  border-radius: 10px;
  background: ${colors.sky_10};
  color: ${colors.sky_60};
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
`


/* Outlined type chip (Standalone vs Budget Category), colored per type. */
export const TypeChip = styled.span<{ tone: 'category' | 'standalone' }>`
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 0 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  background: transparent;
  border: 1px solid ${({ tone }) => (tone === 'standalone' ? colors.pumpkin_60 : colors.sky_60)};
  color: ${({ tone }) => (tone === 'standalone' ? colors.pumpkin_60 : colors.sky_60)};
`


/* Outlined activity chip (Regular Campaign / F&B / ...), colored per activity. */
export const ActivityChip = styled.span<{ tone: string }>`
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 0 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  background: transparent;
  border: 1px solid ${({ tone }) => tone};
  color: ${({ tone }) => tone};
`
