import styled from '@emotion/styled'
import { colors } from '@amadeus/react-design-factory'

export const CampaignsWrapper = styled.div`
  min-width: 900px;
  padding-bottom: 10px;
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

// Campaign name rendered as a link to the mapping Settings drawer (no underline, DF table-link rule).
export const NameLink = styled.button`
  padding: 0;
  border: none;
  background: transparent;
  color: ${colors.sky_60};
  cursor: pointer;
  text-align: left;
  font: inherit;

  &:hover {
    text-decoration: underline;
  }
`

// Campaign run-status dot shown before the campaign name.
export const NameCell = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`

export const StatusDot = styled.span<{ color: string }>`
  flex: 0 0 auto;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ color }) => color};
`

// Clickable offers status icon (green check / red X).
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
    background: ${colors.cloud_20};
  }

  &:focus-visible {
    outline: 2px solid ${colors.sky_60};
    outline-offset: 1px;
  }
`

// Non-interactive offers icon (grey ⊘) for platforms without offer mapping.
export const StatusIconDisabled = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  cursor: not-allowed;
`

// Offers status rollup (green/grey/red dot + count), clickable to open the Offers drawer.
export const OfferDotsBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 6px 8px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.12s ease;

  &:hover {
    background: ${colors.sky_20};
  }

  &:focus-visible {
    outline: 2px solid ${colors.sky_60};
    outline-offset: 1px;
  }
`

export const OfferDotCount = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: ${colors.cloud_80};
`

// Lightweight header row for the embedded (advertiser-scoped) Campaigns panel: title left,
// action button right. Matches the sibling Advertiser Details panels (title + action + table).
export const ScopedHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

// Inline filter row for the scoped (advertiser) Campaigns panel: platform ToggleTab on the left.
export const ScopedFilterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`

// Unmapped row: the external campaign name shown as a placeholder (no internal name yet).
// Italic + muted to signal it's the source campaign, not a generated Naming Convention String.
export const PlaceholderNameLink = styled.button`
  padding: 0;
  border: none;
  background: transparent;
  color: ${colors.sky_60};
  cursor: pointer;
  text-align: left;
  font: inherit;
  font-style: italic;

  &:hover {
    text-decoration: underline;
  }
`
