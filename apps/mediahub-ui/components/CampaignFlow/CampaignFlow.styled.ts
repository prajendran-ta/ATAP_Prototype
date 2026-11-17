import styled from '@emotion/styled'
import { colors } from '@amadeus/react-design-factory'

export const PlatformChip = styled('span', {
  shouldForwardProp: propName => propName !== '$color',
})<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 0 8px;
  border-radius: 10px;
  background: ${({ $color }) => $color};
  color: ${colors.cloud_0};
  font-size: 11px;
  line-height: 20px;
  font-weight: 500;
  white-space: nowrap;
`

export const PlatformChipList = styled.span`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 4px;
`

export const PlanSummaryCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  width: 100%;
  margin: 6px 0 12px;
`

export const PlanSummaryCard = styled.div`
  min-width: 0;
  padding: 8px;
  border-radius: 6px;
  background: ${colors.sky_10};
  font-family: inherit;
`

export const PlanSummaryLabel = styled.div`
  color: ${colors.cloud_80};
  font-size: 11px;
  line-height: 14px;
  overflow-wrap: anywhere;
`

export const PlanSummaryValue = styled.div`
  margin-top: 4px;
  color: ${colors.cloud_100};
  font-size: 14px;
  line-height: 18px;
  font-weight: 600;
  font-variant-numeric: proportional-nums;
`

export const AiIndicatorWrap = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
`

export const AiIndicatorButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  margin-left: 4px;
  padding: 1px 6px;
  border: 1px solid #b650ff;
  border-radius: 8px;
  color: #b650ff;
  background: #f8eeff;
  font-size: 10px;
  line-height: 14px;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background: #f4e4ff;
    outline: none;
    box-shadow: 0 0 0 2px #e4c7ff;
  }
`

export const CampaignSetupChecklistCard = styled.div`
  width: 100%;
  margin: 8px 0 12px;
  padding: 12px;
  border: 1px solid ${colors.cloud_30};
  border-radius: 6px;
  background: ${colors.cloud_0};
`

export const CampaignSetupChecklistHeading = styled.h3`
  margin: 0 0 8px;
  color: ${colors.cloud_100};
  font-size: 13px;
  line-height: 18px;
  font-weight: 600;
`

export const CampaignSetupChecklist = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
`

export const CampaignSetupChecklistItem = styled.li`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 112px;
  align-items: center;
  gap: 8px;
  color: ${colors.cloud_100};
  font-size: 12px;
  line-height: 17px;

  &[data-current='true'] {
    color: ${colors.cloud_100};
    font-weight: 500;
  }
`

export const CampaignSetupRowLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`

export const CampaignSetupStatusIcon = styled.span`
  display: inline-flex;
  flex: 0 0 16px;
  align-items: center;
  justify-content: center;
`

export const CampaignSetupPending = styled.span`
  width: 11px;
  height: 11px;
  border: 1px solid ${colors.cloud_50};
  border-radius: 50%;
`

export const CampaignSetupSpinner = styled.span`
  width: 12px;
  height: 12px;
  border: 2px solid ${colors.sky_20};
  border-top-color: ${colors.sky_60};
  border-radius: 50%;
  animation: campaignSetupSpin 700ms linear infinite;

  @keyframes campaignSetupSpin {
    to {
      transform: rotate(360deg);
    }
  }
`

export const CampaignSetupPlatformLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  color: ${colors.sky_60};
  font-size: 11px;
  line-height: 16px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export const AiPopover = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 20;
  width: 280px;
  padding: 12px;
  border: 1px solid ${colors.cloud_30};
  border-radius: 8px;
  background: ${colors.cloud_0};
  box-shadow: 0 4px 16px rgba(0, 8, 53, 0.16);
  color: ${colors.cloud_100};
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  text-align: left;
  white-space: normal;
`

export const AiPopoverHeading = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
  color: #9240cc;
  font-size: 13px;
  font-weight: 500;
`

export const AiPopoverReasons = styled.ul`
  margin: 8px 0 0;
  padding-left: 16px;

  li {
    margin-bottom: 4px;
  }
`

export const AiPopoverAction = styled.button`
  margin-top: 8px;
  padding: 0;
  border: none;
  background: transparent;
  color: ${colors.sky_60};
  font-size: 12px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

export const FlowTable = styled.div`
  width: 100%;
  max-width: 640px;
  margin: 6px 0 10px;
  border: 1px solid ${colors.cloud_30};
  border-radius: 8px;
  overflow: hidden;
  background: ${colors.cloud_0};
`

export const FlowTableRow = styled('div', {
  shouldForwardProp: propName => propName !== '$variant',
})<{ $variant?: 'header' | 'group' | 'item' | 'total' }>`
  display: grid;
  grid-template-columns: minmax(110px, 1.1fr) 2fr minmax(70px, 0.8fr);
  align-items: center;
  border-bottom: 1px solid ${colors.cloud_20};
  background: ${({ $variant }) =>
    $variant === 'header'
      ? colors.sky_10
      : $variant === 'group'
        ? colors.cloud_10
        : $variant === 'total'
          ? colors.sky_10
          : colors.cloud_0};
  font-weight: ${({ $variant }) => ($variant === 'header' || $variant === 'group' || $variant === 'total' ? 600 : 400)};

  &:last-of-type {
    border-bottom: none;
  }

  > div {
    padding: 8px 10px;
    font-size: 12px;
    line-height: 16px;
    color: ${colors.cloud_100};
    min-width: 0;
  }

  > div:last-of-type {
    text-align: right;
  }
`

export const FlowIndentedCell = styled.div`
  padding-left: 22px !important;
`

export const FlowActionsRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  margin: 4px 0 12px;

  > button {
    min-width: 0;
    flex: 0 1 auto;
    white-space: nowrap;
  }
`

export const FlowSuccessLink = styled.button`
  margin-top: 4px;
  padding: 0;
  border: none;
  background: transparent;
  color: ${colors.sky_60};
  font-size: 11px;
  line-height: 14px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

export const FlowCampaignGroup = styled.div`
  width: 100%;
  max-width: 640px;
  border: 1px solid ${colors.cloud_30};
  border-radius: 6px;
  background: ${colors.cloud_0};
  margin-bottom: 6px;
  overflow: hidden;
`

export const FlowCampaignGroupHeader = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 10px;
  border: none;
  background: transparent;
  color: ${colors.cloud_100};
  font-size: 12px;
  line-height: 16px;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: ${colors.cloud_10};
  }
`

export const FlowCampaignList = styled.ul`
  margin: 0;
  padding: 4px 10px 8px 34px;
  border-top: 1px solid ${colors.cloud_20};
  font-size: 12px;
  line-height: 18px;
  color: ${colors.cloud_80};
`

export const FlowSectionTitle = styled.div`
  margin: 6px 0;
  font-size: 13px;
  line-height: 18px;
  font-weight: 600;
  color: ${colors.cloud_100};
`

export const FlowNextStep = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 640px;
  margin: 4px 0 12px;
  padding: 8px 12px;
  border: 1px solid ${colors.sky_60};
  border-radius: 6px;
  background: ${colors.cloud_0};
  color: ${colors.sky_60};
  font-size: 12px;
  line-height: 16px;
  cursor: pointer;

  &:hover {
    background: ${colors.sky_20};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const BasicInfoCard = styled.div`
  width: 100%;
  margin: 8px 0 12px;
  padding: 14px;
  border: 1px solid ${colors.cloud_30};
  border-radius: 8px;
  background: ${colors.cloud_0};
  overflow: hidden;
`

export const PlatformCard = styled.div`
  width: 100%;
  margin: 8px 0 12px;
  border: 1px solid ${colors.cloud_30};
  border-radius: 8px;
  background: ${colors.cloud_0};
  overflow: hidden;
`

export const PlatformCardBody = styled.div`
  padding: 14px;
`

export const BasicInfoCardHeading = styled.h3`
  margin: 0 0 10px;
  color: ${colors.cloud_100};
  font-size: 13px;
  line-height: 18px;
  font-weight: 600;
`

export const BasicInfoTableWrap = styled.div`
  width: 100%;
  overflow-x: auto;
`

// Mirrors the canvas DataTable so the inline card uses the application table font and colors.
export const BasicInfoTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: ${colors.cloud_100};
  font-size: 13px;
  line-height: 18px;

  th {
    width: 38%;
    background: ${colors.cloud_10};
    color: ${colors.cloud_100};
    font-weight: 500;
    text-align: left;
    padding: 9px 10px;
    border-bottom: 1px solid ${colors.cloud_30};
    vertical-align: top;
  }

  td {
    padding: 8px 10px;
    border-bottom: 1px solid ${colors.cloud_30};
    vertical-align: middle;
    min-width: 0;
    overflow-wrap: anywhere;
  }

  tr:last-of-type th,
  tr:last-of-type td {
    border-bottom: none;
  }
`

// Label cell content: matches the canvas FieldLabel (inline-flex row with the AI chip).
export const BasicInfoLabelCell = styled.span`
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  color: ${colors.cloud_100};
  font-size: 13px;
  line-height: 18px;
  font-weight: 500;
`

export const BasicInfoRequired = styled.span`
  color: ${colors.crimson_60};
`

export const BasicInfoPropertyList = styled.ul`
  margin: 0;
  padding-left: 16px;

  li {
    margin-bottom: 2px;
  }
`

export const BasicInfoEmptyState = styled.span`
  color: ${colors.cloud_50};
`

export const BasicInfoAiField = styled.div`
  /* AI tint applies only while the field still holds the AI recommendation
     (data-ai-filled='true'); a human override flips it to 'false' and reverts to default. */
  &[data-ai-filled='true'] {
    input,
    .ant-input,
    .ant-input-affix-wrapper {
      background: #f8eeff !important;
      background-color: #f8eeff !important;
    }

    /* Select uses a selector element rather than a raw input; tint it the same way. */
    .amadeus-select-selector,
    .ant-select-selector {
      background: #f8eeff !important;
      background-color: #f8eeff !important;
      border-color: #b650ff !important;
    }
  }
`

export const BasicInfoToggleCell = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 28px;
`

export const BasicInfoFieldHint = styled.span`
  display: block;
  margin-top: 4px;
  color: ${colors.cloud_70};
  font-size: 12px;
  line-height: 16px;
`

export const BasicInfoConfirmRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin: 4px 0 12px;
`

export const BasicInfoConfirmHint = styled.p`
  margin: 0;
  color: ${colors.cloud_100};
  font-size: 14px;
  line-height: 20px;
`

export const BasicInfoConfirmButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  /* Single small size across the flow (matches AssistantReportButton). Primary = filled sky. */
  padding: 6px 10px;
  border: 1px solid ${colors.sky_60};
  border-radius: 4px;
  background: ${colors.sky_60};
  color: ${colors.cloud_0};
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: ${colors.sky_80};
    border-color: ${colors.sky_80};
  }

  &:disabled {
    background: ${colors.cloud_20};
    border-color: ${colors.cloud_40};
    color: ${colors.cloud_60};
    cursor: not-allowed;
  }
`

export const BasicInfoCardHeaderButton = styled('button', {
  shouldForwardProp: propName => propName !== 'expanded',
})<{ expanded?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  margin: 0;
  padding: 10px 14px;
  border: none;
  border-bottom: ${({ expanded }) => (expanded ? `1px solid ${colors.sky_20}` : 'none')};
  background: ${colors.sky_10};
  color: ${colors.cloud_100};
  font-size: 13px;
  line-height: 18px;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
`

export const BasicInfoCardHeaderLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`

export const BasicInfoCardCaret = styled('span', {
  shouldForwardProp: propName => propName !== 'expanded',
})<{ expanded?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
  transform: ${({ expanded }) => (expanded ? 'rotate(180deg)' : 'rotate(0deg)')};
`

export const BasicInfoCanvasButtonRow = styled.div`
  margin-top: 12px;
`

export const BasicInfoStatusAlert = styled('div', {
  shouldForwardProp: propName => propName !== 'variant',
})<{ variant: 'success' | 'failed' | 'cancelled' }>`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  padding: 10px 12px;
  border-radius: 6px;
  font-size: 13px;
  line-height: 18px;
  border: 1px solid
    ${({ variant }) =>
      variant === 'success' ? colors.forest_60 : variant === 'failed' ? colors.crimson_60 : colors.pumpkin_60};
  border-left: 4px solid
    ${({ variant }) =>
      variant === 'success' ? colors.forest_60 : variant === 'failed' ? colors.crimson_60 : colors.pumpkin_60};
  background: ${({ variant }) =>
    variant === 'success' ? colors.forest_10 : variant === 'failed' ? colors.crimson_10 : colors.pumpkin_10};
  color: ${colors.cloud_100};
`

export const BasicInfoCollapsibleBody = styled('div', {
  shouldForwardProp: propName => propName !== 'expanded',
})<{ expanded?: boolean }>`
  overflow: hidden;
  max-height: ${({ expanded }) => (expanded ? '1200px' : '0')};
  opacity: ${({ expanded }) => (expanded ? 1 : 0)};
  /* Slow, intentional collapse so the success state is readable before it tucks away. */
  transition:
    max-height 650ms ease,
    opacity 450ms ease;
`

// Multi-line completion summary (success) — one icon + line per outcome (created / updated / paused).
// Trailing margin adds breathing room before the follow-up question + CTA.
export const CompletionSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 12px 0 20px;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid ${colors.forest_60};
  border-left: 4px solid ${colors.forest_60};
  background: ${colors.forest_10};
`

export const CompletionSummaryRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  line-height: 18px;
  color: ${colors.cloud_100};
`

export const BasicInfoCampaignsCaption = styled.div`
  margin: 12px 0 6px;
  color: ${colors.cloud_100};
  font-size: 13px;
  line-height: 18px;
  font-weight: 500;
`

export const BasicInfoSecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  margin-top: 10px;
  padding: 8px 18px;
  border: 1px solid ${colors.sky_60};
  border-radius: 6px;
  background: ${colors.cloud_0};
  color: ${colors.sky_60};
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background: ${colors.sky_10};
  }
`

// Expand/collapse toggle for a campaign row in the chat card's created-campaigns list.
export const CampaignExpandToggle = styled('button', {
  shouldForwardProp: propName => propName !== 'expanded',
})<{ expanded?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  color: ${colors.cloud_100};
  font: inherit;
  text-align: left;
  cursor: pointer;

  svg {
    flex: 0 0 auto;
    transition: transform 0.15s ease;
    transform: ${({ expanded }) => (expanded ? 'rotate(0deg)' : 'rotate(-90deg)')};
  }
`

// Level label naming a row's level (campaign level vs. nested second level) in the chat card list.
// Plain muted text (not a chip) so it doesn't compete with the Current/Action status chips.
export const CampaignLevelTag = styled('span', {
  shouldForwardProp: propName => propName !== '$nested',
})<{ $nested?: boolean }>`
  display: inline-flex;
  align-items: center;
  margin-left: 8px;
  font-size: 12px;
  line-height: 14px;
  white-space: nowrap;
  color: ${({ $nested }) => ($nested ? colors.cloud_60 : colors.cloud_80)};
`

// Nested second-level (ad group / ad set / line item) row under a campaign in the chat card list.
export const CampaignAdGroupRow = styled.tr`
  background: ${colors.cloud_10};

  td:nth-of-type(2) {
    padding-left: 24px;
    color: ${colors.cloud_100};
  }

  /* In the US-cleanup table the name is the 3rd cell (caret · status · name); indent it there. */
  td.us-cleanup-name {
    padding-left: 24px;
    color: ${colors.cloud_100};
  }
`

// Campaign status chip in the AI chat campaign card (mirrors the Summary table chip).
export const CampaignStatusChip = styled('span', {
  shouldForwardProp: prop => prop !== '$tone',
})<{ $tone: 'new' | 'update' | 'noUpdate' | 'paused' }>`
  display: inline-flex;
  align-items: center;
  min-height: 20px;
  padding: 1px 8px;
  border: 1px solid;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 500;
  line-height: 14px;
  white-space: nowrap;

  ${({ $tone }) => {
    switch ($tone) {
      case 'update':
        return `border-color: ${colors.pumpkin_60}; background: ${colors.pumpkin_10}; color: ${colors.pumpkin_70};`
      case 'noUpdate':
        return `border-color: ${colors.forest_60}; background: ${colors.forest_10}; color: ${colors.forest_70};`
      case 'paused':
        return `border-color: ${colors.cloud_40}; background: ${colors.cloud_10}; color: ${colors.cloud_80};`
      case 'new':
      default:
        return `border-color: ${colors.sky_60}; background: ${colors.sky_10}; color: ${colors.sky_80};`
    }
  }}
`

// Current (pre-change) state chip in the chat campaign card — mirrors the canvas CurrentStatusChip:
// live -> forest (running), paused -> pumpkin, new -> sky (not yet created). Shown on the single
// chip WHILE the spinner loads, before it flips to the past-tense action chip.
export const CampaignCurrentStatusChip = styled('span', {
  shouldForwardProp: prop => prop !== '$tone',
})<{ $tone: 'live' | 'paused' | 'new' }>`
  display: inline-flex;
  align-items: center;
  min-height: 20px;
  padding: 1px 8px;
  border: 1px solid;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 500;
  line-height: 14px;
  white-space: nowrap;

  ${({ $tone }) => {
    switch ($tone) {
      case 'live':
        return `border-color: ${colors.forest_60}; background: ${colors.forest_10}; color: ${colors.forest_70};`
      case 'paused':
        return `border-color: ${colors.pumpkin_60}; background: ${colors.pumpkin_10}; color: ${colors.pumpkin_70};`
      case 'new':
      default:
        return `border-color: ${colors.sky_60}; background: ${colors.sky_10}; color: ${colors.sky_80};`
    }
  }}
`

// Campaign-structure comparison table (2026 vs 2027): channel/platform/tactic + per-year presence
// + a change chip. Four-column variant of the FlowTable look.
// Pivoted campaign-structure view: channels as sections, one row per platform. Each tactic group
// (+ Total) splits into 2026/2027 sub-columns, so columns = 1 (platform) + groups × 2. Horizontally
// scrollable to keep the wide grid readable in the panel.
export const StructurePivot = styled.div`
  width: 100%;
  max-width: 760px;
  border: 1px solid ${colors.cloud_30};
  border-radius: 8px;
  overflow: auto;
`

// Top labels above the pivot: Current (2026) and Next (2027) plan name + flight dates.
export const StructurePlanLabels = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  min-width: max-content;
  padding: 10px 12px;
  background: ${colors.cloud_10};
  border-bottom: 1px solid ${colors.cloud_20};
`

export const StructurePlanLabel = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;

  > .structure-plan-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  > .structure-plan-tag {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: ${colors.sky_60};
  }
  > .structure-plan-name {
    font-size: 12px;
    font-weight: 600;
    color: ${colors.cloud_100};
  }
  > .structure-plan-dates {
    font-size: 11px;
    color: ${colors.cloud_70};
  }
`

export const StructureSection = styled.div`
  min-width: max-content;

  &:not(:last-of-type) {
    border-bottom: 2px solid ${colors.cloud_30};
  }
`

// Three-slot layout shared by every section: a fixed Platform column, a fixed-width tactics span,
// and a fixed Total column. Because all three widths are constant, every section (and the whole
// table) is the same fixed width regardless of how many tactics it has. The tactics span is sized
// to hold three tactic columns; a section with fewer tactics splits that same span equally (one
// tactic fills it, three split it into thirds) — no blank placeholder columns.
const STRUCTURE_PLATFORM_WIDTH = '140px'
const STRUCTURE_TACTICS_WIDTH = '450px'
const STRUCTURE_TOTAL_WIDTH = '150px'
const structureOuterColumns = `${STRUCTURE_PLATFORM_WIDTH} ${STRUCTURE_TACTICS_WIDTH} ${STRUCTURE_TOTAL_WIDTH}`

// The middle tactics span: splits its fixed width equally across the section's actual tactic count
// (1 → fills the span, 3 → thirds). Each direct child is one tactic column with a left divider.
// Shared by the group header, sub-header, and every platform row; the children supply their own
// inner layout (label, Current/Next spans, or a value cell).
export const StructureTacticGroup = styled('div', {
  shouldForwardProp: propName => propName !== '$tactics',
})<{ $tactics: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $tactics }) => $tactics}, 1fr);
  align-items: stretch;
  min-width: 0;

  > div {
    min-width: 0;
    border-left: 1px solid ${colors.cloud_20};
  }
`

// Tier-1 header: tactic group names, each spanning its 2026/2027 pair.
export const StructureGroupHeader = styled.div`
  display: grid;
  grid-template-columns: ${structureOuterColumns};
  min-width: max-content;
  background: ${colors.sky_10};
  border-bottom: 1px solid ${colors.cloud_20};
  font-weight: 600;

  > .structure-col-platform,
  > .structure-col-total {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 8px;
    font-size: 12px;
    line-height: 16px;
    color: ${colors.cloud_100};
  }
  > .structure-col-total {
    border-left: 1px solid ${colors.cloud_20};
  }
  > .structure-col-platform {
    justify-content: flex-start;
  }

  /* Each tactic label: centered text filling its share of the tactics span. */
  > .structure-tactics-head > div {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 8px;
    font-size: 12px;
    line-height: 16px;
    color: ${colors.cloud_100};
  }
`

// Tier-2 header: Current / Next sub-headings under each tactic (and Total) group. Each group cell
// splits into two equal sub-columns so the sub-headings line up with the Current/Next values below.
export const StructureSubHeader = styled.div`
  display: grid;
  grid-template-columns: ${structureOuterColumns};
  min-width: max-content;
  background: ${colors.sky_10};
  border-bottom: 1px solid ${colors.cloud_20};

  > .structure-col-total {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-left: 1px solid ${colors.cloud_20};
  }
  > .structure-col-total > span {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 6px;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: ${colors.cloud_70};
  }
  > .structure-col-total > span:nth-of-type(2) {
    border-left: 1px dashed ${colors.cloud_30};
  }

  /* Each tactic sub-heading splits into Current | Next, matching the values below. */
  > .structure-tactics-sub > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  > .structure-tactics-sub > div > span {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 6px;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: ${colors.cloud_70};
  }
  > .structure-tactics-sub > div > span:nth-of-type(2) {
    border-left: 1px dashed ${colors.cloud_30};
  }
`

// One row per platform.
export const StructurePivotRow = styled.div`
  display: grid;
  grid-template-columns: ${structureOuterColumns};
  min-width: max-content;
  align-items: stretch;
  border-bottom: 1px solid ${colors.cloud_20};
  background: ${colors.cloud_0};

  &:last-of-type {
    border-bottom: none;
  }

  > .structure-col-platform,
  > .structure-col-total {
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    padding: 6px 8px;
    font-size: 12px;
    line-height: 16px;
    color: ${colors.cloud_100};
    min-width: 0;
  }
  > .structure-col-total {
    border-left: 1px solid ${colors.cloud_20};
  }
  > .structure-col-platform {
    justify-content: flex-start;
  }

  /* Each tactic value cell stretches full height so chips/budgets top-align. */
  > .structure-tactics-row > div {
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    padding: 6px 8px;
    font-size: 12px;
    line-height: 16px;
    color: ${colors.cloud_100};
  }
`

// Full-width channel sub-header above each section's platform rows. Acts as the collapse toggle:
// caret + channel name on the left, the channel-level budget pinned to the right end (above the
// platform Total column).
export const StructureChannelRow = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-width: max-content;
  width: 100%;
  padding: 6px 10px;
  background: ${colors.sky_20};
  border: none;
  border-bottom: 1px solid ${colors.cloud_20};
  cursor: pointer;
  text-align: left;
  font: inherit;
`

// Left cluster of the channel row: caret + channel name.
export const StructureChannelLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: ${colors.cloud_100};
`

// Channel-level budget pinned to the right end of the channel row.
export const StructureChannelBudget = styled.span`
  display: inline-flex;
  gap: 16px;
  font-size: 12px;
  font-weight: 600;
  color: ${colors.cloud_100};

  > span {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-end;
    line-height: 1.2;
  }
  > span > .structure-channel-budget-tag {
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: ${colors.cloud_70};
  }
`

// Platform name cell — plain text, top-aligned to read alongside the Current/Next values.
export const StructurePlatformName = styled.div`
  align-items: flex-start;
  justify-content: flex-start;
  font-weight: 500;
  color: ${colors.cloud_100};
`

// A tactic/total cell split into two sub-columns (Current | Next) that line up with the
// Current/Next sub-headings above.
export const StructureCellPair = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  height: 100%;

  > div:nth-of-type(2) {
    border-left: 1px dashed ${colors.cloud_30};
  }
`

// A single year's value: status chip top-aligned, stacked vertically above its budget (or a dash).
export const StructureCellValue = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 3px;
  min-width: 0;
  padding: 2px 4px 0;

  > .structure-pair-budget {
    font-size: 11px;
    color: ${colors.cloud_80};
    white-space: nowrap;
  }
  > .structure-pair-dash {
    color: ${colors.cloud_60};
  }

  .structure-pair-location {
    font-size: 10px;
    line-height: 13px;
    color: ${colors.cloud_70};
    white-space: nowrap;
  }
`

export const StructureCellBudget = styled.span`
  font-size: 11px;
  color: ${colors.cloud_70};
`

// Per-year status chip in the structure comparison. Solid chips (like the platform chips): filled
// background + white text. exists = green (running), added = blue (new, must be created),
// paused = orange (not continuing), unpaused = violet (reactivated).
export const StructureCellChip = styled('span', {
  shouldForwardProp: prop => prop !== '$tone',
})<{ $tone: 'exists' | 'added' | 'paused' | 'unpaused' | 'missing' }>`
  display: inline-flex;
  align-items: center;
  min-height: 20px;
  padding: 1px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 500;
  line-height: 14px;
  white-space: nowrap;
  color: ${colors.cloud_0};

  ${({ $tone }) => {
    switch ($tone) {
      case 'added':
        return `background: ${colors.sky_60};`
      case 'paused':
        return `background: ${colors.pumpkin_60};`
      case 'unpaused':
        // violet family (not exported in the colors module): violet-50
        return 'background: #b650ff;'
      case 'missing':
        // US targeting missing — crimson to flag the gap.
        return `background: ${colors.crimson_60};`
      case 'exists':
      default:
        return `background: ${colors.forest_60};`
    }
  }}
`

// Action chip for the US Push old-setup cleanup step: pause (Only US), remove-us (markets+US), or
// no-change (all world / US already excluded / paused).
export const UsCleanupChip = styled('span', {
  shouldForwardProp: prop => prop !== '$action',
})<{ $action: 'pause' | 'remove-us' | 'add-us' | 'no-change' }>`
  display: inline-flex;
  align-items: center;
  min-height: 20px;
  padding: 1px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 500;
  line-height: 14px;
  white-space: nowrap;

  ${({ $action }) => {
    switch ($action) {
      case 'pause':
        return `background: ${colors.pumpkin_60}; color: ${colors.cloud_0};`
      case 'remove-us':
      case 'add-us':
        return `background: ${colors.sky_60}; color: ${colors.cloud_0};`
      case 'no-change':
      default:
        return `background: ${colors.cloud_20}; color: ${colors.cloud_80};`
    }
  }}
`

// US Push old-setup cleanup table: channel groups, each listing platform — tactic rows with the
// current targeting and the cleanup action chip.
// Plain table (like the step-1 Campaign Info table) — no inner card boxes. A fixed status-icon
// column keeps Platform / Tactic / Targeting / Action aligned across every row, whether or not the
// row has a spinner/check. Channel names are full-width header rows (sky-10) between the groups.
export const UsCleanupTable = styled.table`
  width: 100%;
  max-width: 760px;
  border-collapse: collapse;
  font-size: 12px;

  td,
  th {
    padding: 8px 12px;
    text-align: left;
    vertical-align: middle;
    border-bottom: 1px solid ${colors.cloud_20};
  }

  /* Fixed narrow caret + status columns, always reserved so every row aligns. */
  .us-cleanup-caret {
    width: 24px;
    padding-right: 0;
  }

  .us-cleanup-status {
    width: 24px;
    padding-left: 4px;
    padding-right: 0;
  }

  /* Name column (campaign name at level 1, market name at level 2) fills the remaining width. */
  .us-cleanup-name {
    font-weight: 500;
    color: ${colors.cloud_100};
  }

  .us-cleanup-tactic {
    width: 110px;
    color: ${colors.cloud_80};
  }

  .us-cleanup-level {
    width: 110px;
  }

  .us-cleanup-action {
    width: 1%;
    white-space: nowrap;
    text-align: right;
  }
`

// Full-width channel header row inside the cleanup table.
export const UsCleanupChannelHeaderRow = styled.th`
  && {
    background: ${colors.sky_10};
    font-size: 13px;
    font-weight: 600;
    color: ${colors.sky_90};
  }
`

// Context alert at the top of the campaign-flow conversation (sticky) when Max is opened from a
// notification. DF "info" Alert style WITHOUT the icon: subtle sky-10 fill + 3px sky-60 left accent
// bar. Full-bleed (no top/side gaps). Displays the advertiser + media plan scope; × to dismiss.
export const ContextAlert = styled('div', {
  shouldForwardProp: prop => prop !== '$fullScreen' && prop !== '$placement',
})<{ $fullScreen?: boolean; $placement?: 'top' | 'bottom' }>`
  /* Conversation-context banner. Two placements:
       - 'top'    : pinned flush under the header inside the scroll body (sticky + negative margins).
       - 'bottom' : a static bar just above the composer (outside the scroll body).
     Width follows the layout in both cases: FULL WIDTH in sidebar/floating, centered 800px column
     in full-screen. The DF "tip" (purple) Alert look (violet-10 fill + violet-60 left accent). */
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  /* DF "tip" (purple) Alert — df/color/tip/subtle/background = violet-10 (not exported) */
  background: #f8eeff;
  /* df/color/tip/alt/default/border = violet-60 (not exported) — 3px left accent bar only */
  border-left: 3px solid #9240cc;
  font-size: 14px;
  line-height: 20px;
  color: ${colors.cloud_100};

  ${({ $placement, $fullScreen }) => {
    if ($placement === 'bottom') {
      // Static bar above the composer; a top border separates it from the scrolled content.
      const width = $fullScreen ? 'width: 100%; max-width: 800px; margin: 0 auto;' : 'margin: 0;'
      return `border-top: 1px solid ${colors.cloud_20}; ${width}`
    }
    // 'top' (default): sticky, flush under the header; negative margins cancel the Body padding.
    const base = 'position: sticky; top: -24px; z-index: 3;'
    const width = $fullScreen ? 'width: 100%; max-width: 800px; margin: -24px auto 16px;' : 'margin: -24px -20px 16px;'
    return `${base} ${width}`
  }}
`

export const ContextAlertLabel = styled.span`
  color: ${colors.cloud_80};
`

export const ContextAlertValue = styled.span`
  font-weight: 500;
  color: ${colors.cloud_100};
`

export const ContextAlertClose = styled.button`
  margin-left: auto;
  flex-shrink: 0;
  border: none;
  background: transparent;
  padding: 4px;
  border-radius: 50%;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${colors.cloud_80};

  &:hover {
    background: ${colors.sky_20};
  }
`

// ===== ATI (Amadeus Travel Intelligence) growth-opportunity insight =====

// Bordered card that frames the Top Destination chart + Available Properties table together,
// matching the Figma ATI insight layout.
export const AtiCard = styled.div`
  width: 100%;
  max-width: 760px;
  border: 1px solid ${colors.cloud_30};
  border-radius: 8px;
  padding: 16px;
  margin: 8px 0 4px;
`

export const AtiChartTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${colors.cloud_100};
  margin-bottom: 8px;
`

// Chart legend: LY (dark) / CY (light) swatches + the CY vs LY line marker.
export const AtiLegend = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
  font-size: 11px;
  color: ${colors.cloud_80};
`

export const AtiLegendItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`

export const AtiLegendSwatch = styled.span<{ $color: string; $line?: boolean }>`
  display: inline-block;
  width: 12px;
  height: ${({ $line }) => ($line ? '2px' : '10px')};
  border-radius: ${({ $line }) => ($line ? '2px' : '2px')};
  background: ${({ $color }) => $color};
`

// Two-column Destination / Available Properties table.
export const AtiPropertiesTable = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  font-size: 12px;
`

export const AtiPropertiesRow = styled('div', {
  shouldForwardProp: propName => propName !== '$header',
})<{ $header?: boolean }>`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.3fr);
  gap: 12px;
  padding: 8px 8px;
  border-bottom: 1px solid ${colors.cloud_20};
  color: ${({ $header }) => ($header ? colors.cloud_100 : colors.cloud_80)};
  font-weight: ${({ $header }) => ($header ? 600 : 400)};
  background: ${({ $header }) => ($header ? colors.sky_10 : 'transparent')};
`

// "Amadeus Travel Intelligence" source chip shown under the insight.
export const AtiSourceChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
  padding: 2px 8px;
  border: 1px solid ${colors.cloud_40};
  border-radius: 6px;
  font-size: 11px;
  color: ${colors.cloud_80};
`

// ===== Campaign setup — Property-level accordion =====
// Each advertiser property is a collapsible top-level section; expanding it reveals that property's
// channel/platform/tactic campaign structure. Scales to many properties (most stay collapsed).

export const PropertySetupList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 760px;
  /* Let this (and its sections) shrink below content width so the nested table body can
     actually engage overflow-x: auto in a narrow (side-panel) layout. */
  min-width: 0;
`

export const PropertySetupSection = styled.div`
  border: 1px solid ${colors.cloud_30};
  border-radius: 8px;
  overflow: hidden;
  min-width: 0;
`

export const PropertySetupHeader = styled('button', {
  shouldForwardProp: propName => propName !== 'expanded',
})<{ expanded?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 4px;
  padding: 10px 12px;
  /* Expanded uses a neutral grey (cloud_20) so it reads distinctly from the sky-blue
     table header row that appears just below it when open. */
  background: ${({ expanded }) => (expanded ? colors.cloud_20 : colors.cloud_10)};
  border: none;
  cursor: pointer;
  color: ${colors.cloud_100};
  text-align: left;

  &:hover {
    background: ${colors.cloud_20};
  }

  .property-name {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 13px;
    font-weight: 600;
  }
`

// First line of the property accordion header: just the caret + "Property: <name>".
export const PropertyHeaderTitleRow = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`

export const PropertySetupBody = styled.div`
  padding: 0;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  overflow-x: auto;
  border-top: 1px solid ${colors.cloud_30};
`

// Media-plan group header (top level of the campaign-setup accordion). Properties nest beneath it.
export const MediaPlanSetupHeader = styled('button', {
  shouldForwardProp: propName => propName !== 'expanded',
})<{ expanded?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: ${({ expanded }) => (expanded ? colors.sky_20 : colors.sky_10)};
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: ${colors.sky_90};
  text-align: left;

  &:hover {
    background: ${colors.sky_20};
  }

  .media-plan-name {
    flex: 1 1 auto;
    min-width: 0;
  }

  .media-plan-count {
    flex: 0 0 auto;
    font-size: 12px;
    font-weight: 500;
    color: ${colors.cloud_80};
  }
`

export const MediaPlanSetupBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px 12px 12px;
`

// Media plan tag shown alongside each property name in the property accordion header.
export const PropertyMediaPlanTag = styled.span`
  flex: 0 0 auto;
  font-size: 12px;
  font-weight: 500;
  color: ${colors.cloud_70};
  white-space: nowrap;
`


// Inline field label ("Property:" / "Media plan:") prefix inside the property accordion header.
export const PropertyFieldLabel = styled.span`
  font-weight: 400;
  color: ${colors.cloud_80};
`

// ===== Property location table (MockStay growth flow) =====
// A flat table per property: Channel | Platform | <tactic columns>. Each tactic cell shows the
// US-coverage status chip (Exists/Paused/Missing) + the location targeting value, centered. No
// per-platform/channel totals. Channel is the first column (no channel accordion).
export const LocationTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  /* Fixed layout so the Channel + Platform columns are the SAME width in every channel table,
     regardless of how many tactic columns a given channel has. Tactic columns share the rest.
     A min-width keeps the whole table readable in narrow (side-panel) layouts; the scroll
     container (PropertySetupBody, overflow-x: auto) scrolls instead of squashing the cells. */
  table-layout: fixed;
  min-width: 620px;
  font-size: 12px;

  th,
  td {
    border-bottom: 1px solid ${colors.cloud_20};
    padding: 8px 10px;
    vertical-align: middle;
    text-align: left;
  }

  /* Identical Channel/Platform column widths across all channels. */
  th.location-channel-col,
  td.location-channel {
    width: 140px;
  }

  th.location-platform-col,
  td.location-platform {
    width: 120px;
  }

  /* Each tactic column keeps a readable minimum so the chip + targeting text never overlap. */
  th.location-tactic-col,
  td.location-tactic-col {
    min-width: 120px;
  }

  thead th {
    background: ${colors.sky_10};
    font-weight: 600;
    color: ${colors.cloud_100};
    white-space: nowrap;
  }

  /* Tactic columns center the status chip + location text. */
  th.location-tactic-col,
  td.location-tactic-col {
    text-align: center;
  }

  .location-channel {
    font-weight: 600;
    color: ${colors.sky_90};
    white-space: nowrap;
  }

  .location-platform {
    white-space: nowrap;
    color: ${colors.cloud_100};
  }
`

export const LocationCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  text-align: center;

  .location-value {
    font-size: 10px;
    line-height: 13px;
    color: ${colors.cloud_70};
  }

  /* "Targeting:" prefix on the value line below the chip. */
  .location-value-label {
    font-weight: 600;
    color: ${colors.cloud_80};
  }
`


// Right-aligned meta fields in the property accordion header: property budget, US-market %,
// media plan name, media plan budget.
export const PropertyHeaderMeta = styled.span`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 12px;
  /* Second line sits under the property title and indented to align with it (past the caret).
     Kept on a single line; if the panel is too narrow it scrolls rather than wrapping. */
  padding-left: 18px;
  max-width: 100%;
  overflow-x: auto;
  font-size: 11px;
  font-weight: 400;
  color: ${colors.cloud_80};
  white-space: nowrap;

  > span {
    flex: 0 0 auto;
  }
`

// ===== US-growth options (radio-style selectable CTA list) =====
// Shown in the 'us-growth-options' response: several ways to boost the US market, each a
// selectable card with a radio marker, title (+ optional "Recommended" chip), and a description.
// Built as buttons so the whole row is clickable; the radio dot is a visual affordance only.
export const UsGrowthOptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin: 4px 0 2px;
`

export const UsGrowthOption = styled('button', {
  shouldForwardProp: propName => propName !== 'selected',
})<{ selected?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  text-align: left;
  padding: 10px 12px;
  border: 1px solid ${({ selected }) => (selected ? colors.sky_60 : colors.cloud_30)};
  border-radius: 8px;
  background: ${({ selected }) => (selected ? colors.sky_10 : colors.cloud_0)};
  cursor: pointer;
  transition:
    border-color 0.12s ease,
    background 0.12s ease;

  /* Radio marker (visual only) — styled here via a plain class rather than an emotion component
     selector, since this project's build has no emotion babel/swc plugin to resolve those.
     Selected state fills the dot with a primary ring + inner dot. */
  .us-growth-option-radio {
    position: relative;
    flex: 0 0 auto;
    width: 16px;
    height: 16px;
    margin-top: 1px;
    border-radius: 50%;
    border: 1.5px solid ${({ selected }) => (selected ? colors.sky_60 : colors.cloud_50)};
    background: ${colors.cloud_0};
  }

  .us-growth-option-radio::after {
    content: '';
    position: absolute;
    inset: 3px;
    border-radius: 50%;
    background: ${({ selected }) => (selected ? colors.sky_60 : 'transparent')};
  }

  &:hover:not(:disabled),
  &:focus-visible {
    border-color: ${colors.sky_60};
    background: ${colors.sky_10};
  }

  &:hover:not(:disabled) .us-growth-option-radio,
  &:focus-visible .us-growth-option-radio {
    border-color: ${colors.sky_60};
  }

  &:disabled {
    cursor: default;
    opacity: 0.6;
  }
`

export const UsGrowthOptionBody = styled.span`
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
`

export const UsGrowthOptionTitleRow = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`

export const UsGrowthOptionTitle = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${colors.cloud_100};
`

// Soft primary "Recommended" chip on the recommended option.
export const UsGrowthOptionRecommended = styled.span`
  display: inline-flex;
  align-items: center;
  height: 18px;
  padding: 0 8px;
  border-radius: 9px;
  background: ${colors.sky_20};
  color: ${colors.sky_60};
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
`

export const UsGrowthOptionDescription = styled.span`
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  color: ${colors.cloud_80};
`

// Neutral status tag (e.g. "Scheduled") on a plan-picker option, distinct from the sky "Active" tag.
export const PlanPickerStatusTag = styled.span`
  display: inline-flex;
  align-items: center;
  height: 18px;
  padding: 0 8px;
  border-radius: 9px;
  background: ${colors.cloud_20};
  color: ${colors.cloud_80};
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
`
