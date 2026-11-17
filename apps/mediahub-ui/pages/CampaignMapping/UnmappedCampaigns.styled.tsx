import styled from '@emotion/styled'
import { colors } from '@amadeus/react-design-factory'

export const UnmappedCampaignsWrapper = styled.div`
  min-width: 900px;
  padding-bottom: 10px;

  /* Facebook Ad Set sub-rows (antd tree level 1) get a soft tint vs campaign rows. */
  .amadeus-table-tbody tr.amadeus-table-row-level-1 > td {
    background: ${colors.sky_10} !important;
  }
  .amadeus-table-tbody tr.amadeus-table-row-level-1:hover > td {
    background: ${colors.sky_20} !important;
  }

  /* Ignored unmapped-advertiser campaigns: greyed + dimmed until un-ignored. */
  .mh-ignored-row > td {
    background: ${colors.cloud_10} !important;
    opacity: 0.55;
  }
  .mh-ignored-row:hover > td {
    background: ${colors.cloud_20} !important;
  }

  /* Keep the first column (Platform) on one line so the tree caret + the platform chip don't
     stack vertically on Facebook (expandable) rows. */
  .amadeus-table-tbody > tr > td:first-of-type {
    white-space: nowrap;
  }
`

export const TwoLineCell = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 18px;
`

export const SubText = styled.span`
  color: ${colors.cloud_80};
  font-size: 12px;
`

// A small campaign run-status dot shown before the External Campaign name.
export const RunStatusDot = styled.span<{ color: string }>`
  flex: 0 0 auto;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ color }) => color};
  margin-top: 4px;
`

// Row for [dot] + the two-line campaign name cell.
export const CampaignNameCell = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  min-width: 0;
`

// Clickable mapping-status icon. Looks like a plain icon but is a real button
// so users who don't realise the icon is interactive still get hover/focus affordance.
export const StatusIconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: ${colors.sky_20};
  }

  &:focus-visible {
    outline: 2px solid ${colors.sky_60};
    outline-offset: 1px;
  }
`

// Non-interactive status icon (grey X) — used when a mapping type is not available / gated.
export const StatusIconDisabled = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  cursor: not-allowed;
`

// External advertiser mapped to many ATAP advertisers (many:many) — shown italic/grey.
export const MultiAdvertiser = styled.span`
  font-style: italic;
  color: ${colors.cloud_70};
`

// Platform cell rendered as a SOLID chip; color varies per platform (bg/fg passed in).
export const PlatformChip = styled.span<{ bg: string; fg: string }>`
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 9999px;
  font-size: 14px;
  line-height: 1.4;
  background: ${({ bg }) => bg};
  color: ${({ fg }) => fg};
  white-space: nowrap;
`

// Mapping Entity cell rendered as an OUTLINE chip; color matches its row's platform chip.
export const EntityChip = styled.span<{ chipColor: string }>`
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 9999px;
  font-size: 14px;
  line-height: 1.4;
  background: ${colors.cloud_0};
  color: ${({ chipColor }) => chipColor};
  border: 1px solid ${({ chipColor }) => chipColor};
  white-space: nowrap;
`

// Campaign name in the table: a link that opens the campaign summary drawer.
export const CampaignNameLink = styled.button`
  display: block;
  max-width: 100%;
  padding: 0;
  overflow: hidden;
  border: none;
  background: transparent;
  color: ${colors.sky_60};
  cursor: pointer;
  font: inherit;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
`
