import styled from '@emotion/styled'
import { colors, IconButton } from '@amadeus/react-design-factory'

export const Panel = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  background: ${colors.cloud_0};
  border: 1px solid ${colors.cloud_30};
  border-radius: 6px;
  overflow: visible;
`

export const Header = styled.div`
  height: 64px;
  padding: 0 16px;
  border-bottom: 1px solid ${colors.cloud_20};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
`

export const IconTooltipTrigger = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;

  &:hover [data-icon-tooltip='true'] {
    opacity: 1;
    pointer-events: auto;
  }
`

export const IconTooltip = styled.span`
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  background: ${colors.cloud_80};
  color: ${colors.cloud_0};
  border-radius: 4px;
  padding: 3px 6px;
  font-size: 10px;
  line-height: 12px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease;
  z-index: 2000;
`

export const HeaderIconButton = styled(IconButton, {
  shouldForwardProp: propName => propName !== 'selected',
})<{ selected?: boolean }>`
  width: 30px;
  height: 30px;
  padding: 6px;
  background-color: ${({ selected }) => (selected ? colors.sky_20 : 'transparent')} !important;
  border-radius: 4px;

  &:hover {
    background-color: ${colors.sky_20} !important;
    border-radius: 4px;
  }
`

export const HeaderTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
  color: ${colors.cloud_100};
`

export const Body = styled('div', {
  shouldForwardProp: propName => !['fullScreen', 'rightPanelOpen', 'hasConversation'].includes(propName),
})<{
  fullScreen?: boolean
  rightPanelOpen?: boolean
  hasConversation?: boolean
}>`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  /* Establish a stacking context so sticky content inside the chat body (e.g. the context alert)
     stays below the panel-level overlays (layout dropdown, prompt library, recent chats). */
  position: relative;
  z-index: 0;
  padding: 24px 20px;
  padding-right: ${({ fullScreen, rightPanelOpen }) => (fullScreen && rightPanelOpen ? 'calc(420px + 20px)' : '20px')};
  display: flex;
  flex-direction: column;
  justify-content: ${({ hasConversation }) => (hasConversation ? 'flex-start' : 'center')};
`

export const BodyContent = styled.div`
  width: 100%;
  max-width: 800px;
  min-width: 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ChatView = styled.div`
  width: 100%;
  max-width: 760px;
  min-width: 0;
  margin: 0 auto;
`

export const ChatViewTitle = styled.h4`
  margin: 0 0 20px;
  font-size: 18px;
  line-height: 24px;
  font-weight: 500;
  color: ${colors.cloud_100};
`

export const ChatThread = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
`

export const ChatBubble = styled('div', {
  shouldForwardProp: propName => propName !== 'author',
})<{ author?: 'user' | 'assistant' }>`
  align-self: ${({ author }) => (author === 'user' ? 'flex-end' : 'flex-start')};
  width: ${({ author }) => (author === 'user' ? 'fit-content' : 'auto')};
  position: relative;
  max-width: 90%;
  border-radius: 10px;
  padding: 12px 14px;
  background: ${({ author }) => (author === 'user' ? colors.sky_10 : colors.cloud_0)};
  border: none;
  color: ${colors.cloud_100};
  font-size: 14px;
  line-height: 18px;
  white-space: pre-wrap;

  &:hover {
    background: ${({ author }) => (author === 'user' ? colors.sky_20 : colors.cloud_10)};
  }

  &:focus-within [data-chat-bubble-actions='true'],
  &:hover [data-chat-bubble-actions='true'] {
    opacity: 1;
    pointer-events: auto;
  }
`

export const ChatBubbleContent = styled.div`
  white-space: pre-wrap;
`

export const ChatBubbleActions = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 12px;
  padding: 2px 4px;
  box-shadow: none;
  z-index: 2;

  &[data-chat-bubble-actions='true'] {
    opacity: 0;
  }
`

// Divider + timestamp shown inside the prompt hover action row (right of the icons)
export const ChatBubbleActionsDivider = styled.span`
  width: 1px;
  height: 16px;
  background: ${colors.cloud_30};
  margin: 0 2px;
`

export const ChatBubbleActionsTime = styled.span`
  font-size: 12px;
  line-height: 16px;
  color: ${colors.cloud_60};
  white-space: nowrap;
  padding: 0 4px;
`

// Standalone timestamp below the prompt bubble (default state); hidden while the hover row shows
export const ChatBubbleTimestamp = styled.span`
  font-size: 12px;
  line-height: 16px;
  color: ${colors.cloud_60};
  white-space: nowrap;
`

export const ChatBubbleAction = styled.button`
  border: 1px solid transparent;
  background: transparent;
  color: ${colors.cloud_80};
  width: 24px;
  height: 24px;
  cursor: pointer;
  padding: 0;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:hover [data-bubble-tooltip='true'],
  &:focus-visible [data-bubble-tooltip='true'] {
    opacity: 1;
    pointer-events: auto;
  }

  &:hover {
    background: ${colors.sky_20};
    border-color: ${colors.sky_30};
  }
`

export const ChatBubbleActionTooltip = styled.span`
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  background: ${colors.cloud_80};
  color: ${colors.cloud_0};
  border-radius: 4px;
  padding: 3px 6px;
  font-size: 10px;
  line-height: 12px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease;
  z-index: 4;
`

export const ChatBubbleActionFeedback = styled.div`
  position: absolute;
  top: calc(100% + 26px);
  right: 0;
  background: ${colors.cloud_80};
  color: ${colors.cloud_0};
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 11px;
  line-height: 14px;
  white-space: nowrap;
  z-index: 3;
`

export const AssistantTurn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
`

export const AssistantPromptBubbleWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  margin-bottom: 22px;

  /* Hide the standalone (default) timestamp while the hover action row is showing,
     since the hover row carries its own timestamp. */
  &:hover [data-chat-bubble-timestamp='true'],
  &:focus-within [data-chat-bubble-timestamp='true'] {
    opacity: 0;
  }
`

export const AssistantPromptAttachmentChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 6px;
  max-width: 90%;
  min-width: 0;
`

export const AssistantPromptAttachmentChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid var(--colors/sky/sky-70, ${colors.sky_60});
  height: 20px;
  border-radius: 9px;
  background: ${colors.sky_20};
  padding: 0 9px;
  font-size: 12px;
  line-height: 18px;
  color: var(--colors/sky/sky-70, ${colors.sky_60});
  max-width: 100%;
  min-width: 0;
  white-space: nowrap;

  > span:first-of-type {
    flex-shrink: 0;
  }
`

export const AssistantPromptAttachmentName = styled.span`
  min-width: 0;
  max-width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const AssistantContent = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`

export const AssistantSectionHeader = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  line-height: 16px;
  color: ${colors.cloud_70};
  cursor: pointer;

  &:hover {
    color: ${colors.cloud_100};
  }
`

export const AssistantSectionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
`

export const AssistantSectionCaret = styled('span', {
  shouldForwardProp: propName => propName !== 'expanded',
})<{ expanded?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
  transform: ${({ expanded }) => (expanded ? 'rotate(180deg)' : 'rotate(0deg)')};
`

export const AssistantThinkingDots = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;

  > span {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    /* Dark primary blue base (sky-80), bouncing between darkest (sky-90) and mid (sky-60) */
    background: ${colors.sky_80};
    /* Gentle overshoot easing — a small, soft hop */
    animation: thinking-pulse 1s infinite cubic-bezier(0.4, 1.3, 0.5, 1);
  }

  > span:nth-of-type(1) {
    animation-delay: 0s;
  }

  > span:nth-of-type(2) {
    animation-delay: 0.15s;
  }

  > span:nth-of-type(3) {
    animation-delay: 0.3s;
  }

  @keyframes thinking-pulse {
    0%,
    100% {
      background: ${colors.sky_90};
      opacity: 0.55;
      transform: translateY(0) scale(0.9);
    }

    50% {
      background: ${colors.sky_60};
      opacity: 1;
      transform: translateY(-3px) scale(1.05);
    }
  }
`

export const AssistantBodyText = styled.p`
  margin: 0 0 8px;
  color: ${colors.cloud_100};
  font-size: 14px;
  line-height: 20px;
  max-width: 640px;
`

export const AssistantResponseCard = styled.div`
  width: 100%;
  max-width: 640px;
  border: 1px solid ${colors.cloud_30};
  border-radius: 6px;
  background: ${colors.cloud_0};
  padding: 10px 12px 4px;
  margin: 0 0 10px;
`

export const AssistantResponseList = styled.ul`
  margin: 0;
  padding-left: 20px;
`

export const AssistantResponseListItem = styled.li`
  margin: 0 0 6px;
  color: ${colors.cloud_100};
  font-size: 14px;
  line-height: 20px;
`

export const AssistantReasoningLine = styled('div', {
  shouldForwardProp: propName => propName !== 'active',
})<{ active?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 0 0 8px;
  color: ${({ active }) => (active ? colors.sky_60 : colors.cloud_100)};
  font-size: 13px;
  line-height: 18px;
  font-weight: ${({ active }) => (active ? 600 : 400)};

  span:last-child {
    color: inherit;
  }
`

export const AssistantReasoningCheck = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  min-width: 16px;
  height: 16px;
`

export const AssistantReasoningPending = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  min-width: 14px;
  height: 14px;
  border: 1px solid ${colors.cloud_70};
  border-radius: 50%;
`

export const AssistantReasoningLoader = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid ${colors.sky_20};
  border-top-color: ${colors.sky_60};
  border-radius: 50%;
  animation: assistant-reasoning-spin 0.8s linear infinite;

  @keyframes assistant-reasoning-spin {
    to {
      transform: rotate(360deg);
    }
  }
`

export const AssistantChecklist = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const AssistantChecklistItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`

export const AssistantChecklistText = styled.p`
  margin: 0;
  color: ${colors.cloud_100};
  font-size: 14px;
  line-height: 20px;
`

export const AssistantDetailsCard = styled('div', {
  shouldForwardProp: propName => !['fullWidth', 'expanded'].includes(propName),
})<{ fullWidth?: boolean; expanded?: boolean }>`
  width: 100%;
  max-width: ${({ fullWidth }) => (fullWidth ? '100%' : '640px')};
  border: 1px solid ${colors.cloud_40};
  border-radius: 8px;
  background: ${colors.cloud_10};
  padding: 10px 12px;
  margin: 2px 0 10px;
  max-height: ${({ expanded }) => (expanded ? '800px' : '0')};
  overflow: hidden;
  opacity: ${({ expanded }) => (expanded ? 1 : 0)};
  transition:
    max-height 450ms ease,
    opacity 450ms ease,
    margin 450ms ease,
    padding 450ms ease;
  padding-top: ${({ expanded }) => (expanded ? '10px' : '0')};
  padding-bottom: ${({ expanded }) => (expanded ? '10px' : '0')};
  transform-origin: top;
  animation: assistantDetailsReveal 0.18s ease-out;

  p {
    max-width: ${({ fullWidth }) => (fullWidth ? 'none' : '640px')};
  }

  @keyframes assistantDetailsReveal {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

export const AssistantDetailsHeading = styled.div`
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: ${colors.cloud_100};
  margin: 0 0 6px;
`

export const AssistantErrorStateCard = styled.div`
  width: 100%;
  max-width: 760px;
  border: 1px solid ${colors.crimson_60};
  border-left: 4px solid ${colors.crimson_60};
  border-radius: 6px;
  background: ${colors.crimson_10};
  padding: 10px 12px;
  margin: 6px 0 12px;
  display: flex;
  align-items: center;
  gap: 10px;
`

export const AssistantErrorStateIconWrap = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 999px;
  border: 1px solid ${colors.crimson_60};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

export const AssistantErrorStateTitle = styled.div`
  font-size: 12px;
  line-height: 16px;
  font-weight: 700;
  color: ${colors.cloud_100};
`

export const AssistantErrorStateText = styled.div`
  font-size: 11px;
  line-height: 14px;
  color: ${colors.cloud_100};
`

export const AssistantSuccessStateCard = styled.div`
  width: 100%;
  max-width: 760px;
  border: 1px solid ${colors.forest_60};
  border-left: 4px solid ${colors.forest_60};
  border-radius: 6px;
  background: ${colors.forest_10};
  padding: 10px 12px;
  margin: 6px 0 12px;
  display: flex;
  align-items: center;
  gap: 10px;
`

export const AssistantSuccessStateIconWrap = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 999px;
  border: 1px solid ${colors.forest_60};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

export const AssistantSuccessStateTitle = styled.div`
  font-size: 12px;
  line-height: 16px;
  font-weight: 700;
  color: ${colors.cloud_100};
`

export const AssistantSuccessStateText = styled.div`
  font-size: 11px;
  line-height: 14px;
  color: ${colors.cloud_100};
`

export const AssistantInlineSourceChips = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin: 2px 0 10px;
`

export const AssistantInlineSourceChip = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid ${colors.cloud_40};
  background: ${colors.cloud_10};
  color: ${colors.cloud_80};
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 11px;
  line-height: 14px;
  cursor: pointer;

  &:hover {
    background: ${colors.cloud_20};
  }
`

// Inline source chip + hover popover (reveals the full source list on hover/focus)
export const AssistantInlineSourceTrigger = styled.div`
  position: relative;
  display: inline-flex;

  &:hover [data-inline-source-popover='true'],
  &:focus-within [data-inline-source-popover='true'] {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translateY(0);
  }
`

export const AssistantInlineSourceChipLabel = styled.span`
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const AssistantInlineSourceChipCount = styled.span`
  color: ${colors.cloud_70};
`

export const AssistantInlineSourcePopover = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  z-index: 20;
  width: 300px;
  max-width: 90vw;
  /* Top padding bridges the visual gap so the cursor stays within the hover area
     when moving from the chip up into the popover. */
  padding: 6px 6px 6px;
  margin-bottom: -2px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateY(4px);
  transition:
    opacity 150ms ease,
    transform 150ms ease,
    visibility 150ms ease;

  /* Transparent bridge covering the 8px gap between chip and card */
  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -8px;
    height: 8px;
  }
`

export const AssistantInlineSourcePopoverCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
  padding: 6px;
  background: ${colors.cloud_0};
  border: 1px solid ${colors.cloud_30};
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 8, 53, 0.16);
`

export const AssistantInlineSourceItem = styled.button`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  text-align: left;
  border: none;
  border-radius: 6px;
  padding: 8px;
  background: transparent;
  cursor: pointer;

  &:hover {
    background: ${colors.sky_10};
  }
`

export const AssistantInlineSourceItemBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1;
`

export const AssistantInlineSourceItemTitle = styled.span`
  color: ${colors.cloud_100};
  font-size: 13px;
  font-weight: 500;
  line-height: 18px;
`

export const AssistantInlineSourceItemDescription = styled.span`
  color: ${colors.cloud_80};
  font-size: 12px;
  line-height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

export const AssistantVisualCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  max-width: 760px;
  /* Allow this card to shrink below its content width (e.g. a wide scrollable table) so nested
     overflow-x containers scroll instead of stretching the whole message column. */
  min-width: 0;

  &:hover [data-visual-actions='true'] {
    opacity: 1;
    pointer-events: auto;
  }
`

export const AssistantVisualActions = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
  gap: 6px;
  margin: 2px 0 8px;
  padding-right: 2px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease;
`

export const AssistantVisualActionButton = styled.button`
  border: 1px solid ${colors.cloud_40};
  background: ${colors.cloud_0};
  color: ${colors.cloud_80};
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 11px;
  line-height: 14px;
  cursor: pointer;

  &:hover {
    border-color: ${colors.sky_50};
    color: ${colors.sky_80};
    background: ${colors.sky_10};
  }
`

export const AssistantCampaignTable = styled.div`
  width: 100%;
  max-width: 760px;
  border: 1px solid ${colors.cloud_30};
  border-radius: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  margin: 6px 0 4px;
  background: ${colors.cloud_0};
`

export const AssistantCampaignTableHeaderRow = styled.div`
  display: grid;
  min-width: 620px;
  grid-template-columns: 1.1fr 2.4fr 1.3fr 1fr;
  gap: 0;
  background: ${colors.sky_10};
  border-bottom: 1px solid ${colors.cloud_30};
`

export const AssistantCampaignTableRow = styled.div`
  display: grid;
  min-width: 620px;
  grid-template-columns: 1.1fr 2.4fr 1.3fr 1fr;
  gap: 0;
  border-bottom: 1px solid ${colors.cloud_20};

  &:last-of-type {
    border-bottom: none;
  }
`

export const AssistantCampaignTableCell = styled.div`
  padding: 10px 12px;
  font-size: 12px;
  line-height: 16px;
  color: ${colors.cloud_100};
  display: flex;
  align-items: center;
  gap: 6px;
`

export const AssistantCampaignTableHeaderCell = styled(AssistantCampaignTableCell)`
  font-weight: 700;
  color: ${colors.cloud_80};
`

export const AssistantCampaignExpandButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${colors.cloud_100};
  font-size: 12px;
  line-height: 16px;
  cursor: pointer;
`

export const AssistantCampaignSubRows = styled.div`
  background: ${colors.cloud_10};
`

export const AssistantCampaignSubRow = styled.div`
  display: grid;
  min-width: 620px;
  grid-template-columns: 1.1fr 2.4fr 1.3fr 1fr;
  gap: 0;
  border-bottom: 1px solid ${colors.cloud_20};

  &:last-of-type {
    border-bottom: none;
  }
`

export const AssistantCampaignStatus = styled('span', {
  shouldForwardProp: propName => propName !== 'statusKind',
})<{ statusKind: 'Live' | 'Paused' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 11px;
  line-height: 14px;
  background: ${colors.cloud_0};
  border: 1px solid ${({ statusKind }) => (statusKind === 'Live' ? colors.forest_60 : colors.pumpkin_60)};
  color: ${({ statusKind }) => (statusKind === 'Live' ? colors.forest_60 : colors.pumpkin_60)};
`

// CTA button group. In the full-screen layout ($row) the buttons sit in ONE full-width row
// (equal columns); in the floating panel / side panel they stack one below the other.
export const AssistantReportButtons = styled('div', {
  shouldForwardProp: propName => propName !== '$row',
})<{ $row?: boolean }>`
  display: grid;
  grid-template-columns: ${({ $row }) => ($row ? 'repeat(auto-fit, minmax(0, 1fr))' : '1fr')};
  gap: 10px;
  width: 100%;
  margin: 10px 0 12px;
`

export const AssistantReportCtaText = styled.div`
  margin: 8px 0 6px;
  font-size: 14px;
  line-height: 20px;
  color: ${colors.cloud_100};
  max-width: 640px;
`

export const AssistantDemandChart = styled.div`
  width: 100%;
  max-width: 760px;
  border: 1px solid ${colors.cloud_30};
  border-radius: 8px;
  background: ${colors.cloud_0};
  padding: 12px;
  margin: 4px 0 4px;
  overflow-x: auto;
`

export const AssistantDemandChartTitle = styled.div`
  font-size: 13px;
  line-height: 18px;
  font-weight: 600;
  color: ${colors.cloud_100};
  margin-bottom: 8px;
`

export const AssistantDemandChartBars = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 620px;
`

export const AssistantDemandChartValue = styled('div', {
  shouldForwardProp: propName => propName !== 'alignRight',
})<{ alignRight?: boolean }>`
  width: 36px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: ${({ alignRight }) => (alignRight ? 'flex-start' : 'flex-end')};
  height: 168px;
  padding: 4px 0;
  font-size: 10px;
  line-height: 12px;
  color: ${colors.cloud_70};
`

export const AssistantDemandChartBarColumn = styled.div`
  flex: 1;
  min-width: 0;
  position: relative;
  border-left: 1px solid ${colors.cloud_20};
  border-bottom: 1px solid ${colors.cloud_30};
  height: 176px;
  padding: 4px 8px 0;
`

export const AssistantDemandChartBarFill = styled.div`
  position: absolute;
  bottom: 0;
  left: 8px;
  right: 8px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 10px;
  height: 126px;
  z-index: 1;
`

export const AssistantDemandChartLabel = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  bottom: auto;
  left: 0;
  right: 0;
  font-size: 10px;
  line-height: 12px;
  color: ${colors.cloud_80};
  text-align: center;
`

export const AssistantDemandChartLineLayer = styled.svg`
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: 0;
  width: calc(100% - 16px);
  height: 126px;
  overflow: visible;
  pointer-events: none;
  z-index: 2;
`

export const AssistantDemandChartPointsLayer = styled.div`
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: 0;
  height: 126px;
  pointer-events: none;
  z-index: 3;
`

export const AssistantDemandChartPoint = styled.div`
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${colors.violet_60};
  transform: translate(-50%, -50%);
`

export const AssistantDemandDestinationGroup = styled.div`
  position: relative;
  flex: 1;
  min-width: 78px;
  height: 100%;
  padding: 0 4px;
`

export const AssistantDemandBar = styled.div`
  width: calc(50% - 6px);
  min-width: 8px;
  border-radius: 4px 4px 0 0;
`

export const AssistantDemandChartLegend = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 28px;
  font-size: 11px;
  line-height: 14px;
  color: ${colors.cloud_80};
`

export const AssistantDemandChartLegendItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`

export const AssistantDemandChartLegendSwatch = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 2px;
  display: inline-block;
`

// Single small size everywhere. The main/primary CTA is filled sky-blue; secondary CTAs are the
// outline style. Disabled renders grey (not just dimmed).
export const AssistantReportButton = styled('button', {
  shouldForwardProp: propName => propName !== '$variant',
})<{ $variant?: 'primary' | 'secondary' }>`
  width: 100%;
  min-width: 0;
  border: 1px solid ${colors.sky_60};
  border-radius: 4px;
  font-size: 12px;
  line-height: 16px;
  padding: 6px 10px;
  cursor: pointer;
  transition:
    color 0.15s ease,
    border-color 0.15s ease,
    background-color 0.15s ease;

  ${({ $variant }) =>
    $variant === 'primary'
      ? `background: ${colors.sky_60}; color: ${colors.cloud_0};`
      : `background: ${colors.cloud_0}; color: ${colors.sky_60};`}

  &:hover {
    ${({ $variant }) =>
      $variant === 'primary'
        ? `background: ${colors.sky_80}; border-color: ${colors.sky_80}; color: ${colors.cloud_0};`
        : `background: ${colors.sky_10}; border-color: ${colors.sky_60}; color: ${colors.sky_60};`}
  }

  &:disabled {
    background: ${colors.cloud_20};
    border-color: ${colors.cloud_40};
    color: ${colors.cloud_60};
    cursor: not-allowed;
  }
`

export const AssistantCampaignCanvasButton = styled(AssistantReportButton)`
  width: 100%;
  border-color: ${colors.sky_60};
  background: ${colors.cloud_0};
  color: ${colors.sky_60};

  &:hover {
    border-color: ${colors.sky_60};
    background: ${colors.sky_10};
    color: ${colors.sky_60};
  }
`

export const AssistantActionsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  margin-bottom: 10px;
  position: relative;
`

export const AssistantActionItem = styled.div`
  position: relative;

  &:hover [data-assistant-action-tooltip='true'],
  &:focus-within [data-assistant-action-tooltip='true'] {
    opacity: 1;
    pointer-events: auto;
  }
`

// Vertical divider separating the feedback icons from the inline Sources toggle
export const AssistantActionsDivider = styled.span`
  width: 1px;
  align-self: stretch;
  min-height: 20px;
  background: ${colors.cloud_30};
  margin: 0 8px;
`

// Timestamp shown at the end of the AI response feedback row
export const AssistantActionsTime = styled.span`
  font-size: 12px;
  line-height: 16px;
  color: ${colors.cloud_60};
  white-space: nowrap;
  margin-left: 8px;
`

// Inline "Sources" toggle that lives on the feedback row (document icon + label + caret)
export const AssistantActionsSourcesButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: none;
  background: transparent;
  padding: 4px 6px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  line-height: 18px;
  color: ${colors.cloud_100};
  cursor: pointer;

  &:hover {
    background: ${colors.cloud_20};
  }
`

export const AssistantActionTooltip = styled.span`
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  background: ${colors.cloud_80};
  color: ${colors.cloud_0};
  border-radius: 4px;
  padding: 3px 6px;
  font-size: 10px;
  line-height: 12px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease;
  z-index: 4;
`

export const AssistantActionFeedback = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  background: ${colors.cloud_80};
  color: ${colors.cloud_0};
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 11px;
  line-height: 14px;
  white-space: nowrap;
  z-index: 3;
`

export const AssistantActionIconButton = styled(IconButton, {
  shouldForwardProp: propName => propName !== 'selected',
})<{ selected?: boolean }>`
  width: 30px;
  height: 30px;
  padding: 6px;
  border-radius: 4px;
  background: ${({ selected }) => (selected ? colors.sky_20 : 'transparent')};
  color: ${({ selected }) => (selected ? colors.sky_60 : colors.cloud_80)};

  &:hover {
    background: ${({ selected }) => (selected ? colors.sky_20 : colors.sky_10)};
  }
`

export const AssistantFullModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 8, 53, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  z-index: 3000;
`

export const AssistantFullModalDialog = styled.div`
  width: min(1040px, 96vw);
  max-height: 92vh;
  overflow: auto;
  background: ${colors.cloud_0};
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(128, 128, 128, 0.25);
`

export const AssistantFullModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 16px;
`

export const AssistantFullModalTitle = styled.h4`
  margin: 0;
  font-size: 20px;
  line-height: 26px;
  font-weight: 500;
  color: ${colors.cloud_100};
`

export const AssistantFullModalTitleRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`

export const AssistantFullModalIconWrap = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

export const AssistantFullModalClose = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  color: ${colors.cloud_80};
  border-radius: 2px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;

  &:hover {
    background: ${colors.cloud_10};
  }
`

export const AssistantFullModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px 24px;
`

export const AssistantFullModalDescription = styled.div`
  font-size: 14px;
  line-height: 18px;
  color: ${colors.cloud_100};
`

export const AssistantFullModalTextArea = styled.textarea`
  width: 100%;
  min-height: 112px;
  border: 1px solid ${colors.cloud_40};
  border-radius: 6px;
  padding: 10px 12px;
  resize: vertical;
  outline: none;
  font-size: 14px;
  line-height: 18px;
  color: ${colors.cloud_100};

  &::placeholder {
    color: ${colors.cloud_60};
  }

  &:focus {
    border-color: ${colors.sky_60};
  }
`

export const AssistantFullModalActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 14px;
  padding: 16px 24px 24px;
`

export const AssistantFullModalSecondaryButton = styled.button`
  border: 1px solid ${colors.sky_60};
  border-radius: 4px;
  background: ${colors.cloud_0};
  color: ${colors.sky_60};
  font-size: 14px;
  line-height: 21px;
  font-weight: 500;
  padding: 4.5px 14px;
  cursor: pointer;

  &:hover {
    color: ${colors.sky_80};
    border-color: ${colors.sky_80};
    background: ${colors.sky_20};
  }
`

export const AssistantFullModalPrimaryButton = styled.button`
  border: none;
  border-radius: 4px;
  background: ${colors.sky_60};
  color: ${colors.cloud_0};
  font-size: 14px;
  line-height: 21px;
  font-weight: 500;
  padding: 5.5px 14px;
  cursor: pointer;

  &:hover {
    background: ${colors.sky_80};
  }
`

export const AssistantSourcesHeader = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: ${colors.sky_60};
  margin-bottom: 6px;
  text-decoration: underline;
`

export const AssistantSourceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const AssistantSourceCard = styled.button`
  width: 100%;
  max-width: 300px;
  border: 1px solid ${colors.cloud_40};
  border-radius: 8px;
  background: ${colors.cloud_0};
  padding: 10px 12px;
  display: block;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: ${colors.sky_20};
    border-color: ${colors.cloud_50};
  }
`

export const AssistantSourceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const AssistantSourceMeta = styled.div`
  flex: 1;
  min-width: 0;
`

export const AssistantSourceTitle = styled.div`
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: ${colors.cloud_100};
`

export const AssistantSourceDomain = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: ${colors.sky_60};
`

/**
 * Sources panel opened from the feedback-row "Sources" toggle.
 * - full-screen layout → right-side panel (like the Prompt Library).
 * - sidebar / floating layouts → bottom sheet/slider anchored to the panel bottom.
 */
export const AssistantSourcesPanel = styled('div', {
  shouldForwardProp: propName => propName !== 'fullScreen',
})<{ fullScreen?: boolean }>`
  position: absolute;
  background: ${colors.cloud_0};
  z-index: 3;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;

  ${({ fullScreen }) =>
    fullScreen
      ? `
    top: 64px;
    right: 0;
    bottom: 0;
    width: 420px;
    border-left: 1px solid ${colors.cloud_30};
    animation: sources-slide-in-right 180ms ease;

    @keyframes sources-slide-in-right {
      from { transform: translateX(16px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `
      : `
    left: 0;
    right: 0;
    bottom: 0;
    max-height: 60%;
    border-top: 1px solid ${colors.cloud_30};
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    box-shadow: 0 -8px 24px rgba(0, 8, 53, 0.16);
    animation: sources-slide-up 180ms ease;

    @keyframes sources-slide-up {
      from { transform: translateY(16px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `}
`

export const AssistantSourcesPanelHandle = styled.div`
  display: flex;
  justify-content: center;
  padding: 8px 0 2px;

  &::before {
    content: '';
    width: 28px;
    height: 3px;
    border-radius: 999px;
    background: ${colors.cloud_40};
  }
`

export const AssistantSourcesPanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 12px 20px;
  border-bottom: 1px solid ${colors.cloud_20};
`

export const AssistantSourcesPanelTitle = styled.h4`
  margin: 0;
  font-size: 20px;
  line-height: 26px;
  font-weight: 500;
  color: ${colors.sky_90};
`

export const AssistantSourcesPanelBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 4px 0 12px;
`

export const AssistantSourcesPanelItem = styled.button`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: left;
  border: none;
  border-bottom: 1px solid ${colors.cloud_20};
  background: transparent;
  padding: 14px 20px;
  cursor: pointer;

  &:hover {
    background: ${colors.sky_10};
  }
`

export const AssistantSourcesPanelItemHeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const AssistantSourcesPanelItemTitle = styled.span`
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: ${colors.cloud_100};
`

export const AssistantSourcesPanelItemDescription = styled.span`
  font-size: 12px;
  line-height: 16px;
  color: ${colors.cloud_80};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const AssistantSuggestedPromptsSection = styled.div`
  width: 100%;
  max-width: 760px;
  margin-top: 10px;
`

export const AssistantSuggestedPromptsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  color: ${colors.cloud_60};
  font-size: 11px;
  line-height: 14px;
  margin-bottom: 6px;
`

export const AssistantSuggestedPromptsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
`

export const AssistantSuggestedPromptChip = styled.button`
  width: fit-content;
  max-width: 100%;
  align-self: flex-end;
  border: none;
  border-radius: 4px;
  background: ${colors.sky_10};
  color: ${colors.cloud_100};
  font-size: 11px;
  line-height: 14px;
  padding: 4px 8px;
  text-align: left;
  white-space: normal;
  cursor: pointer;

  &:hover {
    background: ${colors.sky_20};
  }
`

export const WelcomeTitle = styled.h4`
  margin: 0 0 48px;
  text-align: center;
  font-size: 18px;
  line-height: 24px;
  font-weight: 500;
  color: ${colors.cloud_100};
`

export const PromptList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 328px;
`

export const PromptCard = styled.button`
  width: 100%;
  border: none;
  border-radius: 8px;
  background: ${colors.sky_10};
  color: ${colors.cloud_100};
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  padding: 16px;
  cursor: pointer;

  &:hover {
    background: ${colors.sky_20};
  }
`

export const PromptToken = styled.span`
  color: ${colors.sky_60};
  font-style: italic;
`

export const PromptLibraryOverlay = styled('div', {
  shouldForwardProp: propName => propName !== 'fullScreen',
})<{ fullScreen?: boolean }>`
  position: absolute;
  top: 64px;
  right: 0;
  bottom: 0;
  left: ${({ fullScreen }) => (fullScreen ? 'auto' : '0')};
  width: ${({ fullScreen }) => (fullScreen ? '420px' : 'auto')};
  background: ${colors.cloud_0};
  z-index: 2;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
  border-left: ${({ fullScreen }) => (fullScreen ? `1px solid ${colors.cloud_30}` : 'none')};
`

export const PromptLibrarySubheader = styled('div', {
  shouldForwardProp: propName => propName !== 'fullScreen',
})<{ fullScreen?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ fullScreen }) => (fullScreen ? 'space-between' : 'flex-start')};
  gap: 4px;
  padding: 12px;
  min-height: 64px;
`

export const PromptLibrarySubheaderActions = styled.div`
  display: inline-flex;
  align-items: center;
`

export const PromptLibraryTitle = styled.h4`
  margin: 0;
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
  color: ${colors.sky_90};
`

export const PromptLibraryHeader = styled.div`
  padding: 0 24px 24px;
`

export const PromptLibrarySearch = styled.div`
  height: 36px;
  border: 1px solid ${colors.cloud_50};
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 8px;

  textarea {
    min-height: auto;
    height: 20px;
    padding: 0;
    font-style: italic;
    font-size: 14px;
    line-height: 18px;
    color: ${colors.cloud_50};
  }
`

export const PromptLibraryTabs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0 24px;
  border-bottom: 1px solid ${colors.cloud_30};
`

export const PromptLibraryTab = styled('button', {
  shouldForwardProp: propName => propName !== 'active',
})<{ active?: boolean }>`
  height: 50px;
  border: none;
  background: transparent;
  border-bottom: ${({ active }) => (active ? `3px solid ${colors.sky_90}` : '3px solid transparent')};
  font-size: 14px;
  line-height: 18px;
  font-weight: ${({ active }) => (active ? 700 : 400)};
  color: ${colors.cloud_100};
  cursor: pointer;
`

export const PromptLibraryBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const PromptLibraryItem = styled.div`
  width: 100%;
  background: transparent;
  padding: 0;
`

export const PromptLibraryItemRow = styled.div`
  width: 100%;
  cursor: pointer;
`

export const RecentChatsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const RecentChatsGroupTitle = styled.div`
  font-size: 14px;
  line-height: 18px;
  font-weight: 500;
  color: ${colors.cloud_80};
`

export const RecentChatsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const RecentChatsRow = styled('div', {
  shouldForwardProp: propName => !['active', 'editing'].includes(propName),
})<{ active?: boolean; editing?: boolean }>`
  width: 100%;
  background: ${({ active }) => (active ? colors.sky_10 : colors.cloud_0)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  text-align: left;
  border-radius: 6px;
  cursor: ${({ editing }) => (editing ? 'default' : 'pointer')};

  &:hover {
    background: ${({ editing, active }) => (editing ? (active ? colors.sky_10 : colors.cloud_0) : colors.sky_20)};
  }
`

export const RecentChatsText = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const RecentChatsRenameRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
`

export const RecentChatsTitleRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
`

export const RecentChatsTitle = styled.div`
  font-size: 14px;
  line-height: 18px;
  color: ${colors.cloud_100};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const RecentChatsRenameInput = styled.input`
  flex: 1;
  width: 100%;
  border: 1px solid ${colors.sky_40};
  border-radius: 4px;
  padding: 4px 6px;
  font-size: 14px;
  line-height: 18px;
  color: ${colors.cloud_100};
  outline: none;

  &:focus {
    border-color: ${colors.sky_60};
  }
`

export const RecentChatsRenameAction = styled('button', {
  shouldForwardProp: propName => propName !== 'variant',
})<{ variant: 'confirm' | 'cancel' }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid ${({ variant }) => (variant === 'confirm' ? colors.forest_60 : colors.crimson_60)};
  background: ${colors.cloud_0};
  color: ${({ variant }) => (variant === 'confirm' ? colors.forest_60 : colors.crimson_60)};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;

  &:hover {
    background: ${colors.sky_10};
  }
`

export const RecentChatsKebab = styled.button`
  border: none;
  background: transparent;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${colors.cloud_80};

  &:hover {
    background: ${colors.sky_20};
  }
`

export const RecentChatsActions = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`

export const RecentChatsActionFeedback = styled.div`
  position: absolute;
  right: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
  background: ${colors.cloud_80};
  color: ${colors.cloud_0};
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 11px;
  line-height: 14px;
  white-space: nowrap;
  z-index: 5;
`

export const RecentChatsMenu = styled.div`
  position: absolute;
  top: 28px;
  right: 0;
  min-width: 132px;
  background: ${colors.cloud_0};
  border: 1px solid ${colors.cloud_30};
  border-radius: 6px;
  box-shadow: 0 0 8px rgba(128, 128, 128, 0.25);
  overflow: hidden;
  z-index: 4;
`

export const RecentChatsMenuItem = styled('button', {
  shouldForwardProp: propName => propName !== 'destructive',
})<{ destructive?: boolean }>`
  width: 100%;
  border: none;
  background: transparent;
  text-align: left;
  padding: 8px 12px;
  font-size: 14px;
  line-height: 18px;
  color: ${({ destructive }) => (destructive ? colors.crimson_70 : colors.cloud_100)};
  cursor: pointer;

  &:hover {
    background: ${colors.sky_10};
  }
`

export const PromptLibraryCard = styled.div`
  border: 1px solid ${colors.cloud_30};
  border-radius: 8px;
  background: ${colors.cloud_0};
  padding: 16px;

  &:hover {
    background: ${colors.sky_20};
    border-color: ${colors.sky_20};
  }
`

export const PromptLibraryCardContent = styled.div`
  font-size: 14px;
  line-height: 18px;
  color: ${colors.cloud_100};
  margin-bottom: 16px;
`

export const PromptLibraryCardActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > div {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    color: ${colors.cloud_100};
  }
`

export const PromptLibrarySaveButton = styled.button<{ saved?: boolean }>`
  border: none;
  background: transparent;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .amadeus-icon {
    color: ${({ saved }) => (saved ? colors.sky_60 : colors.cloud_100)} !important;
  }
`

export const PromptLibrarySaveArea = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`

export const PromptLibraryActionFeedback = styled.div`
  background: ${colors.cloud_80};
  color: ${colors.cloud_0};
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 11px;
  line-height: 14px;
  white-space: nowrap;
`

export const PromptLibraryAuthor = styled.div`
  font-size: 14px;
  line-height: 18px;
  color: ${colors.cloud_60} !important;
`

export const MoreSuggestions = styled.button`
  border: none;
  background: transparent;
  margin-top: 12px;
  color: ${colors.sky_60};
  font-size: 14px;
  line-height: 18px;
  cursor: pointer;
  text-decoration: underline;
`

export const SwitchViewDropdown = styled.div`
  position: absolute;
  top: 52px;
  right: 12px;
  z-index: 3;
  width: 230px;
  background: ${colors.cloud_0};
  border-radius: 6px;
  box-shadow: 0 0 4px rgba(128, 128, 128, 0.25);
  padding: 8px 0;
`

export const DropdownTitle = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  font-size: 14px;
  line-height: 18px;
  font-weight: 700;
  color: ${colors.cloud_100};
`

export const DropdownItem = styled.button`
  width: 100%;
  height: 30px;
  border: none;
  background: transparent;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  &:hover {
    background: ${colors.sky_10};
  }
`

export const DropdownItemLeft = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  line-height: 18px;
  color: ${colors.cloud_100};
`

export const Composer = styled('div', {
  shouldForwardProp: propName => !['fullScreen', 'rightPanelOpen'].includes(propName),
})<{
  fullScreen?: boolean
  rightPanelOpen?: boolean
}>`
  border-top: 1px solid ${colors.cloud_20};
  padding: 10px 12px 12px;
  padding-right: ${({ fullScreen, rightPanelOpen }) => (fullScreen && rightPanelOpen ? 'calc(420px + 12px)' : '12px')};
`

export const ComposerContent = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`

export const ComposerBox = styled.div`
  border: 1px solid ${colors.cloud_30};
  border-radius: 6px;
  overflow: visible;
`

export const ComposerAttachments = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px 8px 0;
`

export const ComposerAttachmentChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid var(--colors/sky/sky-70, ${colors.sky_60});
  height: 20px;
  border-radius: 9px;
  background: ${colors.sky_20};
  padding: 0 6px 0 9px;
  max-width: 100%;
  min-width: 0;

  > span:first-of-type {
    flex-shrink: 0;
  }
`

export const ComposerAttachmentName = styled.span`
  font-size: 12px;
  line-height: 18px;
  color: var(--colors/sky/sky-70, ${colors.sky_60});
  max-width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const ComposerAttachmentRemove = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
  width: 14px;
  height: 14px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--colors/sky/sky-70, ${colors.sky_60});
`

export const ComposerInput = styled.textarea`
  width: 100%;
  min-height: 40px;
  max-height: 90px;
  resize: none;
  border: none;
  outline: none;
  padding: 8px;
  font-size: 12px;
  color: ${colors.cloud_100};
`

export const ComposerToolbar = styled.div`
  border-top: 1px solid ${colors.cloud_20};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px 7px;
`

export const LeftTools = styled.div`
  display: flex;
  gap: 12px;
  color: ${colors.cloud_50};
`

export const ComposerToolButton = styled('button', {
  shouldForwardProp: propName => propName !== 'active',
})<{ active?: boolean }>`
  border: none;
  padding: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: ${({ active }) => (active ? colors.sky_20 : 'transparent')};
  color: ${colors.cloud_100};

  &:hover {
    background: ${colors.sky_20};
  }
`

export const SendButton = styled.button`
  width: 22px;
  height: 22px;
  border: none;
  border-radius: 4px;
  background: ${colors.sky_60};
  color: ${colors.cloud_0};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
`

export const Disclaimer = styled.div`
  text-align: center;
  color: ${colors.cloud_50};
  font-size: 9px;
  padding-top: 6px;
`

export const DisclaimerLink = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
  font: inherit;
  font-size: 9px;
  color: ${colors.sky_60};
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: ${colors.sky_80};
  }
`

export const AssistantFullModalList = styled.ul`
  margin: 0;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const AssistantFullModalListItem = styled.li`
  color: ${colors.cloud_100};
  font-size: 14px;
  line-height: 20px;
`
