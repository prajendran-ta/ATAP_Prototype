import { Button, colors } from '@amadeus/react-design-factory'
import styled from '@emotion/styled'
import type { StatusChipTone } from './mediaplanUtils'

const STATUS_CHIP_COLORS: Record<StatusChipTone, { bg: string; fg: string }> = {
  // New — freshly arrived from Salesforce (read-only); soft sky to distinguish from Submitted
  new: { bg: colors.sky_30, fg: colors.sky_90 },
  // Draft — neutral/in-progress (cloud_60 is not exported; cloud_70 is the nearest mid-grey)
  draft: { bg: colors.cloud_70, fg: colors.cloud_0 },
  // Submitted — primary/under review
  submitted: { bg: colors.sky_60, fg: colors.cloud_0 },
  // Closed Won — success
  won: { bg: colors.forest_70, fg: colors.cloud_0 },
  // Closed Lost — error
  lost: { bg: colors.crimson_60, fg: colors.cloud_0 },
  // Archived — muted/inactive
  archived: { bg: colors.cloud_40, fg: colors.cloud_100 },
}

export const StatusChip = styled.span<{ tone: StatusChipTone }>`
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 11px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  white-space: nowrap;
  background: ${({ tone }) => STATUS_CHIP_COLORS[tone].bg};
  color: ${({ tone }) => STATUS_CHIP_COLORS[tone].fg};
`

export const MediaplannerWrapper = styled.div`
  /* Fill the content area without forcing it wider than the viewport. The previous hard
     min-width: 900px pushed wide tables (long advertiser names) past the content area, clipping
     the right-hand columns. Cap to the container and scroll horizontally if content still exceeds. */
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  padding-bottom: 10px;
`

export const DropdownTrigger = styled(Button)<{ disabled: boolean }>`
  border: 1px solid ${({ disabled }) => (disabled ? colors.cloud_40 : colors.sky_60)} !important;
  color: ${({ disabled }) => (disabled ? colors.cloud_40 : colors.sky_60)} !important;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`

export const CreatePlanButton = styled(Button)`
  background-color: ${colors.sky_60} !important;
  border: 1px solid ${colors.sky_60} !important;
`

/* -------------------------------------------------------------------------------------------------
 * Plan Versions — drawer + header button (prototype)
 * ----------------------------------------------------------------------------------------------- */

export const VersionsButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border: 1px solid ${colors.cloud_40};
  border-radius: 6px;
  background: ${colors.cloud_0};
  color: ${colors.cloud_100};
  font-size: 13px;
  line-height: 18px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: ${colors.cloud_10};
    border-color: ${colors.sky_60};
    color: ${colors.sky_60};
  }
`

export const VersionsPanelSubtitle = styled.div`
  margin-top: 2px;
  color: ${colors.cloud_70};
  font-size: 12px;
  line-height: 16px;
`

export const VersionsSaveNewButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  margin: 12px 0 16px;
  padding: 10px 12px;
  border: 1px solid ${colors.sky_60};
  border-radius: 6px;
  background: ${colors.cloud_0};
  color: ${colors.sky_60};
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: ${colors.sky_10};
  }

  &:disabled {
    border-color: ${colors.cloud_40};
    color: ${colors.cloud_50};
    cursor: not-allowed;
    background: ${colors.cloud_0};
  }
`

export const VersionCard = styled.div<{ active?: boolean }>`
  position: relative;
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid ${({ active }) => (active ? colors.sky_60 : colors.cloud_30)};
  border-radius: 8px;
  background: ${({ active }) => (active ? colors.sky_10 : colors.cloud_0)};
`

export const VersionCardTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const VersionCardTitle = styled.span`
  color: ${colors.cloud_100};
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
`

export const VersionActiveBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 1px 8px;
  border-radius: 10px;
  background: ${colors.sky_60};
  color: ${colors.cloud_0};
  font-size: 11px;
  line-height: 16px;
  font-weight: 500;
  letter-spacing: 0.02em;
`

export const VersionCardTimestamp = styled.div`
  margin-left: auto;
  color: ${colors.cloud_70};
  font-size: 12px;
  line-height: 16px;
  white-space: nowrap;
`

/* Actions row: View / Set as Active / kebab on the left, timestamp pushed to the bottom-right. */
export const VersionCardActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
`

export const VersionCardActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const VersionsEmpty = styled.div`
  padding: 24px 0;
  color: ${colors.cloud_70};
  font-size: 13px;
  line-height: 18px;
  text-align: center;
`

/* Footer "Save as Version" inline name entry (shown when the planner clicks Save as Version). */
export const SaveVersionInline = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`
