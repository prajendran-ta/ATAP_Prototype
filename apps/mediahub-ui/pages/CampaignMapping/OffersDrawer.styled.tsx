import styled from '@emotion/styled'
import { colors } from '@amadeus/react-design-factory'

export const DrawerBody = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 24px 0;
  min-height: 0;
`

export const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`

// One Offer-text group card.
export const GroupCard = styled.div`
  border: 1px solid ${colors.cloud_40};
  border-radius: 6px;
  display: flex;
  flex-direction: column;
`

export const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: ${colors.cloud_10};
  border-bottom: 1px solid ${colors.cloud_20};
`

export const GroupTitle = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1 1 auto;
  min-width: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  padding: 0;
  font-size: 14px;
  font-weight: 500;
  color: ${colors.cloud_100};
`

export const GroupCount = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${colors.cloud_80};
`

export const StatusSummary = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex: 0 0 auto;
`

export const StatusCount = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: ${colors.cloud_80};
`

export const GroupBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 16px;
`

export const IdRow = styled.div`
  display: grid;
  grid-template-columns: 16px 1fr auto;
  align-items: center;
  gap: 10px;
  min-height: 36px;
  padding: 6px 10px;
  border-bottom: 1px solid ${colors.cloud_30};

  /* DF table row hover = cloud_20 (#f2f2f2), fills the full row. */
  &:hover {
    background: ${colors.cloud_20};
  }

  &:last-of-type {
    border-bottom: none;
  }
`

// Column header for the revealed Offer_ID list — matches the DF table header exactly:
// white background, 14px weight-500, cloud_30 bottom stroke, 6px/10px padding.
export const IdListHead = styled.div`
  display: grid;
  grid-template-columns: 16px 1fr auto;
  align-items: center;
  gap: 10px;
  padding: 6px 10px;
  background: ${colors.cloud_0};
  border-bottom: 1px solid ${colors.cloud_30};
  font-size: 14px;
  font-weight: 500;
  color: ${colors.cloud_100};
`

export const IdMain = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 18px;
  min-width: 0;
`

export const IdLabel = styled.span`
  font-size: 14px;
  color: ${colors.cloud_100};
`

export const IdDetail = styled.span`
  font-size: 12px;
  color: ${colors.cloud_80};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const StatusDot = styled.span<{ color: string }>`
  flex: 0 0 auto;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ color }) => color};
`

export const IconBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  color: ${colors.cloud_70};

  &:hover:not(:disabled) {
    background: ${colors.cloud_20};
    color: ${colors.crimson_60};
  }
`

export const AddIdsRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
`

export const AddIdsField = styled.div`
  flex: 1 1 auto;
  min-width: 0;
`

// Row holding the "View mapped offers" secondary button (mapped offers hidden by default).
// A top divider + extra spacing separate the "add" section above from the "view existing" section.
export const ViewMappedRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
  padding-top: 12px;
  border-top: 1px solid ${colors.cloud_30};
`

export const NewTextRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
`

export const NewTextField = styled.div`
  flex: 1 1 auto;
`

export const DrawerFooter = styled.div`
  flex: 0 0 auto;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding: 12px 24px;
  background: ${colors.cloud_0};
  border-top: 1px solid ${colors.cloud_40};
`

export const EmptyState = styled.div`
  color: ${colors.cloud_70};
  font-size: 14px;
  padding: 16px 0;
`

// "New" indicator for staged (unsaved) additions — a group or Offer_ID added since the drawer
// opened and not yet committed via Save.
export const NewTag = styled.span`
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.2;
  padding: 2px 8px;
  border-radius: 9999px;
  background: ${colors.sky_60};
  color: ${colors.cloud_0};
  border: none;
`

// A new (unsaved) Offer-text group card gets a left accent so it stands out in the list.
export const GroupCardNew = styled(GroupCard)`
  border-left: 3px solid ${colors.sky_60};
`

// A newly added (unsaved) Offer_ID row — same alignment/padding as a normal row so old and new
// line up. Differentiated by a soft tint + a left accent bar (and the inline "New" tag).
export const IdRowNew = styled(IdRow)`
  background: ${colors.sky_10};
  box-shadow: inset 3px 0 0 ${colors.sky_60};

  &:hover {
    background: ${colors.sky_20};
  }
`
