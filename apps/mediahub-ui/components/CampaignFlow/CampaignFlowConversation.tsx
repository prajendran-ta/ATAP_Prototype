import React, { useEffect, useRef, useState } from 'react'
import { Icon, Select, colors } from '@amadeus/react-design-factory'
import { externalLinks } from '@mediahub/mediahub-ui/api'
import {
  AssistantActionFeedback,
  AssistantActionIconButton,
  AssistantActionItem,
  AssistantActionTooltip,
  AssistantActionsRow,
  AssistantActionsDivider,
  AssistantActionsTime,
  AssistantActionsSourcesButton,
  AssistantBodyText,
  AssistantCampaignCanvasButton,
  AssistantContent,
  AssistantDetailsCard,
  AssistantFullModalActions,
  AssistantFullModalBody,
  AssistantFullModalClose,
  AssistantFullModalDescription,
  AssistantFullModalDialog,
  AssistantFullModalHeader,
  AssistantFullModalOverlay,
  AssistantFullModalPrimaryButton,
  AssistantFullModalSecondaryButton,
  AssistantFullModalTextArea,
  AssistantFullModalTitle,
  AssistantFullModalTitleRow,
  AssistantPromptBubbleWrap,
  AssistantReasoningCheck,
  AssistantReasoningLine,
  AssistantReasoningLoader,
  AssistantReasoningPending,
  AssistantReportButton,
  AssistantReportButtons,
  AssistantReportCtaText,
  AssistantSectionCaret,
  AssistantSectionHeader,
  AssistantSectionRow,
  AssistantSourcesPanel,
  AssistantSourcesPanelHandle,
  AssistantSourcesPanelHeader,
  AssistantSourcesPanelTitle,
  AssistantSourcesPanelBody,
  AssistantSourcesPanelItem,
  AssistantSourcesPanelItemHeaderRow,
  AssistantSourcesPanelItemTitle,
  AssistantSourcesPanelItemDescription,
  AssistantSuccessStateCard,
  AssistantSuccessStateIconWrap,
  AssistantSuccessStateText,
  AssistantSuccessStateTitle,
  AssistantThinkingDots,
  AssistantTurn,
  AssistantVisualActions,
  AssistantVisualCard,
  ChatBubble,
  ChatBubbleAction,
  ChatBubbleActionFeedback,
  ChatBubbleActionTooltip,
  ChatBubbleActions,
  ChatBubbleActionsDivider,
  ChatBubbleActionsTime,
  ChatBubbleTimestamp,
  ChatBubbleContent,
  HeaderIconButton,
} from '../AmadeusMaxPanel/AmadeusMaxPanel.styled'
import { campaignFlowData, getActiveAdvertiser, type CampaignLaunchSummary, type CampaignPlatform } from './campaignFlowData'
import {
  campaignStructureComparison,
  campaignStructurePivot,
  type CampaignStructureRow,
  type StructureTacticCell,
  closedWonMediaPlanPlatforms,
  createInitialDraft,
  fillTemplate,
  getPlatformSplitConfig,
  adGroupsForCampaign,
  resolveMediaPlan,
  formatDisplayDate,
  getSplitBy,
  normalizePlatforms,
  platformCurrentStatusFor,
  usLocationStatusFor,
  usPushOldSetupCleanup,
  usAddTargetingMissingTactics,
  usEditActionForCampaignName,
  type UsEditAction,
  type CampaignCurrentStatus,
  type UsCleanupAction,
  type UsCleanupMode,
  type UsCleanupRow,
  shortTargetingLabel,
  splitByDisplayLabel,
  totalCampaigns,
  CAMPAIGN_STATUS_META,
  campaignStatusMetaAfterCreate,
  campaignStatusBreakdown,
  campaignStatusFor,
} from './campaignFlowLogic'
import {
  closeCampaignWorkspace,
  confirmClosedWonPlatformSplit,
  openCampaignWorkspace,
  openClosedWonPlatformCanvas,
  confirmClosedWonPause,
  confirmUsPushCleanup,
  closedWonCampaignsToPause,
  runCampaignFlowStage,
  startCampaignStructureView,
  startUsGrowthOptions,
  startUsPushPlanProposal,
  confirmUsPushPlan,
  startUsCurrentPlanPicker,
  startUsAddTargeting,
  confirmUsAddTargeting,
  startUsGrowthAction,
  setClosedWonPlatformSplit,
  setClosedWonPlatformAdGroupSplit,
  startClosedWonCampaignCreation,
  startAdvertiserSelection,
  startAtiInsightView,
  useCampaignFlowState,
  type FlowBlock,
} from './campaignFlowStore'
import { AiIndicator, PlatformChip } from './AiIndicator'
import { InlineBasicInfoCard } from './InlineBasicInfoCard'
import { AtiTopDestinationChart } from './AtiTopDestinationChart'
import { MediaPlanAllocationTable } from '../MediaPlanCanvas/MediaPlanAllocationTable'
import * as Styled from './CampaignFlow.styled'

const conversation = campaignFlowData.conversation

// The single campaign-setup CTA that opens the "how do you want to boost US?" options response.
const BOOST_US_PROMPT = 'Create/update campaigns to boost US market'

// Ways to boost the US market, shown as a selectable list under the options response. Each has a
// short title (the option CTA), a one-line description, the user prompt it posts when chosen, the
// AI acknowledgement, and an optional `recommended` flag. This list is expected to grow.
type UsGrowthAction = {
  title: string
  description: string
  prompt: string
  ack: string
  recommended?: boolean
  // When true, choosing this option loads the full campaign-create flow (seeded with the plan's
  // platforms) instead of posting a quick acknowledgement block.
  createsCampaign?: boolean
  // When true, choosing this option first proposes a net-new media plan (the us-push plan) before
  // the campaign-create flow, rather than creating campaigns directly in an existing plan.
  newPlan?: boolean
  // When true, choosing this option first asks which EXISTING plan to add the US campaigns to
  // (the plan picker), then runs the create flow in edit mode against that plan.
  currentPlan?: boolean
  // When true, choosing this option adds the US to the EXISTING campaigns' targeting (no new
  // campaigns in step 1); step 2 offers to create the missing ones.
  addTargeting?: boolean
}

const US_GROWTH_ACTIONS: UsGrowthAction[] = [
  {
    title: 'Create US Push in current plan',
    description: 'Add a US Push campaign inside the current media plan, reallocating from the existing plan budget (no budget increase).',
    prompt: 'Create a US Push campaign in the current media plan, keeping the existing plan budget',
    ack: 'Done — a US Push campaign has been drafted inside the current media plan, funded by reallocating from the existing plan budget. It is ready for your review before launch.',
    createsCampaign: true,
    currentPlan: true,
  },
  {
    title: 'Create US Push in new plan',
    description: 'Create a US Push campaign under a new media plan with its own added budget, on top of the current plan.',
    prompt: 'Create a US Push campaign in a new media plan with a new budget',
    ack: 'Done — a new media plan with its own budget has been drafted for a US Push campaign, added on top of the current plan. It is ready for your review before launch.',
    recommended: true,
    createsCampaign: true,
    newPlan: true,
  },
  {
    title: 'Add US to current targeting',
    description: 'Extend the existing campaigns that exclude the US so they also reach the US market.',
    prompt: 'Add US market to targeting in the current setup',
    ack: 'Done — US has been added to the location targeting of the existing campaigns that currently exclude it. Those platforms/tactics will now reach the US feeder market alongside their current locations.',
    addTargeting: true,
  },
  {
    title: 'Shift budget toward US',
    description: 'Update the location bid strategy to allocate a larger share of spend to US locations.',
    prompt: 'Change the location bid strategy to allocate more budget to US',
    ack: 'Done — the location bid strategy has been updated to weight spend toward the US market, shifting a larger share of each campaign\'s budget to US locations while keeping the other markets live.',
  },
]

// Resolves the acknowledgement text for a us-growth-action block from the prompt it posted.
const usGrowthActionAck = (prompt: string | null): string =>
  US_GROWTH_ACTIONS.find(action => action.prompt === prompt)?.ack ??
  'Done — the requested change has been applied to the current campaign setup.'

// Chat campaign-creation card chip meta for the current-plan edit flow. Present-tense before
// creation, past-tense once finalized. Reuses the structure chip tones (new/update).
const US_EDIT_CHIP_META: Record<UsEditAction, { label: string; tone: 'new' | 'update' }> = {
  new: { label: 'Create', tone: 'new' },
  update: { label: 'Update', tone: 'update' },
  unpause: { label: 'Unpause', tone: 'update' },
}
const US_EDIT_CHIP_META_DONE: Record<UsEditAction, { label: string; tone: 'new' | 'update' }> = {
  new: { label: 'Created', tone: 'new' },
  update: { label: 'Updated', tone: 'update' },
  unpause: { label: 'Unpaused', tone: 'update' },
}

// The CURRENT (pre-change) state shown on the single chat-card chip WHILE the spinner is loading,
// before it flips to the past-tense action. Mirrors the canvas "Current" column:
//   update (touch a live campaign) -> Live ; new (create) -> New ; unpause -> Paused.
const US_EDIT_CURRENT_META: Record<UsEditAction, { label: string; tone: CampaignCurrentStatus }> = {
  update: { label: 'Live', tone: 'live' },
  new: { label: 'New', tone: 'new' },
  unpause: { label: 'Paused', tone: 'paused' },
}

type FlowSource = { title: string; domain: string; description?: string }

const AdvertiserSelectCard = React.lazy(() => import('./AdvertiserSelectCard'))
const MediaPlanSelectCard = React.lazy(() => import('./MediaPlanSelectCard'))

const SOURCES: Record<FlowBlock['kind'], FlowSource[]> = {
  'media-plan': [
    {
      title: 'System Documentation',
      domain: 'docs.atap.amadeus.com',
      description: 'Reference material covering platform features, workflows, and setup guidelines.',
    },
    {
      title: 'Performance Dashboard',
      domain: 'dashboard.atap.amadeus.com',
      description: 'Live delivery and performance metrics used to assess the plan.',
    },
  ],
  'market-focus': [
    {
      title: 'Amadeus Travel Intelligence',
      domain: 'ati.amadeus.com',
      description: 'Market performance and demand trends for the selected market.',
    },
    {
      title: 'Campaign Performance Data',
      domain: 'campaigns.amadeus.com',
      description: 'Historical campaign delivery and outcomes across platforms.',
    },
  ],
  'create-media-plan': [
    {
      title: 'ATAP',
      domain: 'atap.amadeus.com',
      description: 'Travel Advertising Platform configuration and plan records.',
    },
    {
      title: 'Salesforce Campaign Records',
      domain: 'salesforce.com',
      description: 'Closed-won opportunity and campaign records tied to the plan.',
    },
  ],
  'create-campaign': [
    {
      title: 'Campaign Database',
      domain: 'campaigns.amadeus.com',
      description: 'Existing and active campaign records across platforms.',
    },
    {
      title: 'Content Management System',
      domain: 'cms.amadeus.com',
      description: 'Creatives and product content aligned to the campaign platforms.',
    },
  ],
  launch: [
    {
      title: 'ATAP',
      domain: 'atap.amadeus.com',
      description: 'Travel Advertising Platform configuration used to launch the campaign.',
    },
    {
      title: 'Campaign Database',
      domain: 'campaigns.amadeus.com',
      description: 'Campaign records updated as each platform is created.',
    },
  ],
  'campaign-structure': [
    {
      title: 'Campaign Database',
      domain: 'campaigns.amadeus.com',
      description: 'Campaign records used to derive the structure comparison.',
    },
    {
      title: 'ATAP',
      domain: 'atap.amadeus.com',
      description: 'Travel Advertising Platform configuration for the structure view.',
    },
  ],
  'campaign-setup': [
    {
      title: 'Campaign Database',
      domain: 'campaigns.amadeus.com',
      description: 'Campaign records for the current media plan.',
    },
    {
      title: 'ATAP',
      domain: 'atap.amadeus.com',
      description: 'Travel Advertising Platform configuration for the campaign setup view.',
    },
  ],
  'us-push-plan': [
    {
      title: 'Amadeus Travel Intelligence',
      domain: 'ati.amadeus.com',
      description: 'US-market demand and growth signals used to size the new plan.',
    },
    {
      title: 'ATAP',
      domain: 'atap.amadeus.com',
      description: 'Travel Advertising Platform configuration for the new media plan.',
    },
  ],
  'us-add-targeting': [
    {
      title: 'ATAP',
      domain: 'atap.amadeus.com',
      description: 'Existing campaigns and their location targeting.',
    },
    {
      title: 'Campaign Database',
      domain: 'campaigns.amadeus.com',
      description: 'Live campaigns updated to include the US market.',
    },
  ],
  'media-plan-select': [
    {
      title: 'ATAP',
      domain: 'atap.amadeus.com',
      description: 'Media plans available for this advertiser.',
    },
  ],
  'advertiser-select': [
    {
      title: 'ATAP',
      domain: 'atap.amadeus.com',
      description: 'Advertisers you follow and the full advertiser list.',
    },
  ],
  'us-current-plan-picker': [
    {
      title: 'ATAP',
      domain: 'atap.amadeus.com',
      description: 'Media plans available to add the US campaigns to.',
    },
    {
      title: 'Campaign Database',
      domain: 'campaigns.amadeus.com',
      description: 'Current plan status, flight dates, budget and spend.',
    },
  ],
  'us-push-plan-created': [
    {
      title: 'ATAP',
      domain: 'atap.amadeus.com',
      description: 'Travel Advertising Platform configuration for the created media plan.',
    },
    {
      title: 'Campaign Database',
      domain: 'campaigns.amadeus.com',
      description: 'Campaign records for the new US Push plan.',
    },
  ],
  'us-growth-options': [
    {
      title: 'ATAP',
      domain: 'atap.amadeus.com',
      description: 'Travel Advertising Platform configuration used to plan the US-growth options.',
    },
    {
      title: 'Campaign Database',
      domain: 'campaigns.amadeus.com',
      description: 'Current campaigns and location targeting used to shape the options.',
    },
  ],
  'us-growth-action': [
    {
      title: 'ATAP',
      domain: 'atap.amadeus.com',
      description: 'Travel Advertising Platform configuration updated by this action.',
    },
    {
      title: 'Campaign Database',
      domain: 'campaigns.amadeus.com',
      description: 'Campaign records and location targeting affected by this action.',
    },
  ],
  'ati-insight': [
    {
      title: 'Amadeus Travel Intelligence',
      domain: 'docs.amadeus.com',
      description: 'Worldwide travel demand and market performance insights.',
    },
    {
      title: 'Campaign Database',
      domain: 'api.amadeus.com',
      description: 'Advertiser properties and existing campaign records.',
    },
  ],
}

// Chat timestamp, e.g. "9 Aug · 6:30 PM" (time-based chat label, exempt from the dd-Mmm-yyyy rule)
const formatTurnTimestamp = (isoTimestamp: string) => {
  const date = new Date(isoTimestamp)
  if (Number.isNaN(date.getTime())) return ''
  const day = date.getDate()
  const month = date.toLocaleString('en-US', { month: 'short' })
  const time = date.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  return `${day} ${month} · ${time}`
}

const getFlowSourceUrl = (domain: string) => {
  const trimmedDomain = domain.trim()
  if (trimmedDomain.startsWith('http://') || trimmedDomain.startsWith('https://')) {
    return trimmedDomain
  }
  return `https://${trimmedDomain}`
}

const PLATFORM_KEY_BY_NAME: Record<string, string> = {
  'Google Ads': 'google',
  'Bing Ads': 'bing',
  Meta: 'meta',
  TikTok: 'tiktok',
}

/** Renders copy that contains `<strong>` markup from the seed data without injecting HTML. */
export const renderRichText = (text: string) =>
  text.split(/(<strong>.*?<\/strong>)/g).map((part, index) => {
    const match = part.match(/^<strong>(.*?)<\/strong>$/)
    return match ? <strong key={index}>{match[1]}</strong> : <React.Fragment key={index}>{part}</React.Fragment>
  })

const StepList: React.FC<{ steps: string[]; completedSteps: number; animating: boolean }> = ({
  steps,
  completedSteps,
  animating,
}) => (
  <>
    {steps.map((step, index) => {
      const isDone = index < completedSteps
      const isActive = animating && index === completedSteps
      return (
        <AssistantReasoningLine key={step} active={isActive}>
          <AssistantReasoningCheck>
            {isDone ? (
              <Icon name='checkCircle' width={14} height={14} color={colors.forest_60} />
            ) : isActive ? (
              <AssistantReasoningLoader aria-label='In progress' />
            ) : (
              <AssistantReasoningPending />
            )}
          </AssistantReasoningCheck>
          <span>{step}</span>
        </AssistantReasoningLine>
      )
    })}
  </>
)

const PlatformSetupCard: React.FC<{
  platformId: string
  position: number
  total: number
}> = ({ platformId, position, total }) => {
  const {
    draft,
    closedWonPlatformId,
    closedWonViewedPlatformId,
    closedWonPlatformSplitConfirmed,
    closedWonCreatedPlatformIds,
    closedWonCreatingPlatformId,
    closedWonCreatingCampaigns,
    closedWonCreatedCampaignCount,
    campaignSummary,
    aiWorkspaceMode,
    selectedMediaPlanYear,
    usCurrentPlanEdit,
  } = useCampaignFlowState()
  const platform = normalizePlatforms().find(item => item.id === platformId)
  // In the current-plan edit flow the chip meta comes from the US edit action (Create/Update/
  // Unpause), not the 2026/2027 structure comparison.
  const editMeta = (campaign: string, done: boolean) => {
    const action = usEditActionForCampaignName(platformId, campaign) ?? 'new'
    return done ? US_EDIT_CHIP_META_DONE[action] : US_EDIT_CHIP_META[action]
  }
  // The US ad group's OWN action (mirrors usCurrentPlanEditCampaigns.usAdGroup): it is NEW (Create)
  // unless the campaign is paused, in which case it is Unpaused — independent of the campaign's
  // Update action. So an Updated campaign still has a newly Created US ad group.
  const usAdGroupEditAction = (campaign: string): UsEditAction => {
    const campaignAction = usEditActionForCampaignName(platformId, campaign) ?? 'new'
    return campaignAction === 'unpause' ? 'unpause' : 'new'
  }
  const usAdGroupName = (campaign: string) => `${campaign}_US`
  const platformName = platform?.name ?? platformId
  const activeDraft = draft ?? createInitialDraft(normalizePlatforms())
  const splitValue = platform ? getSplitBy(activeDraft, platform) : (activeDraft.splitBy[platformId] ?? '')

  // Two-level split config (first = mandatory, second = optional), per platform. When present it
  // drives both labels and the AI-recommended baseline (first-split default).
  const splitConfig = getPlatformSplitConfig(platformId)
  const hasAdGroupSplit = Boolean(splitConfig)
  const campaignSplitLabel = splitConfig?.campaignLabel ?? 'Split by'
  // The AI-recommended split mirrors the seeded default: the platform's config default when it has
  // one, else paid-search keeps its own split and every other channel defaults to 'None (By Tactic)'.
  const recommendedSplit = splitConfig
    ? splitConfig.campaignDefault
    : platform
      ? platform.group === 'Paid search'
        ? platform.splitBy
        : 'None (By Tactic)'
      : ''
  const splitMatchesAi = splitValue === recommendedSplit

  const adGroupSplitValue = activeDraft.adGroupSplitBy[platformId] ?? ''
  // Ad Group options exclude whatever is picked for the first split (no overlap).
  const adGroupSplitOptions = campaignFlowData.splitOptions.filter(option => option !== splitValue)

  const isCreated = closedWonCreatedPlatformIds.includes(platformId)
  const isCreating = closedWonCreatingPlatformId === platformId
  const isActive = closedWonPlatformId === platformId && !isCreated && !isCreating
  const splitLocked = isCreated || isCreating || closedWonPlatformSplitConfirmed
  // Canvas button shows for the active confirmed platform and for review once created; hidden while creating.
  const showCanvasButton = isCreated || (isActive && closedWonPlatformSplitConfirmed)
  const viewedPlatformId = closedWonViewedPlatformId ?? closedWonPlatformId
  const isCanvasOpenForThis = aiWorkspaceMode && viewedPlatformId === platformId
  // Campaigns to display: the live animating list while creating, else the finalized summary.
  const createdCampaigns = isCreating
    ? closedWonCreatingCampaigns
    : (campaignSummary.find(entry => entry.platform === platformName)?.campaigns ?? [])
  const showCampaignsTable = isCreating || isCreated
  const allCampaignsRevealed =
    isCreated || (isCreating && createdCampaigns.length > 0 && closedWonCreatedCampaignCount >= createdCampaigns.length)

  // Expanded while active or creating; collapses the moment the platform finalizes (as the next
  // card opens). Users can expand/collapse any card freely afterwards.
  const [expanded, setExpanded] = useState(true)
  const userToggledRef = useRef(false)

  // Per-campaign expand state for the created list's second-level (ad group) rows, plus the level
  // nouns derived from the platform's split config (mirrors the canvas Summary).
  const [expandedCampaigns, setExpandedCampaigns] = useState<Record<string, boolean>>({})
  const platformSplitConfig = getPlatformSplitConfig(platformId)
  const splitLevelNoun = (label: string | undefined, fallback: string) =>
    label?.replace(/^Split\s+/, '').replace(/\s+by$/, '') ?? fallback
  const campaignLevelNoun = splitLevelNoun(platformSplitConfig?.campaignLabel, 'Campaign')
  const adGroupLevelNoun = splitLevelNoun(platformSplitConfig?.adGroupLabel, 'Ad Group')

  useEffect(() => {
    if (isCreating || isActive) {
      setExpanded(true)
      userToggledRef.current = false
    } else if (isCreated && !userToggledRef.current) {
      setExpanded(false)
    }
  }, [isCreating, isActive, isCreated])

  const handleToggle = () => {
    userToggledRef.current = true
    setExpanded(current => !current)
  }

  return (
    <Styled.PlatformCard data-testid={`platform-setup-card-${platformId}`}>
      <Styled.BasicInfoCardHeaderButton
        type='button'
        expanded={expanded}
        aria-expanded={expanded}
        onClick={handleToggle}
      >
        <Styled.BasicInfoCardHeaderLabel>
          {`(${position}/${total}) ${platformName}`}
          {isCreated ? (
            <Icon name='checkCircle' width={14} height={14} color={colors.forest_60} aria-label='Created' />
          ) : null}
        </Styled.BasicInfoCardHeaderLabel>
        <Styled.BasicInfoCardCaret expanded={expanded}>
          <Icon name='caretDown' width={12} height={12} color={colors.cloud_70} />
        </Styled.BasicInfoCardCaret>
      </Styled.BasicInfoCardHeaderButton>

      <Styled.BasicInfoCollapsibleBody expanded={expanded} aria-hidden={!expanded}>
        <Styled.PlatformCardBody>
          <Styled.BasicInfoTableWrap>
            <Styled.BasicInfoTable aria-label={`Setup for ${platformName}`}>
              <tbody>
                <tr>
                  <th scope='row'>
                    <Styled.BasicInfoLabelCell>Channel</Styled.BasicInfoLabelCell>
                  </th>
                  <td>{platform?.group ?? '—'}</td>
                </tr>
                <tr>
                  <th scope='row'>
                    <Styled.BasicInfoLabelCell>Platform</Styled.BasicInfoLabelCell>
                  </th>
                  <td>{platformName}</td>
                </tr>
                <tr>
                  <th scope='row'>
                    <Styled.BasicInfoLabelCell>
                      <label htmlFor={`platform-split-${platformId}-sel`}>{campaignSplitLabel}</label>
                      {hasAdGroupSplit ? (
                        <Styled.BasicInfoRequired aria-hidden='true'> *</Styled.BasicInfoRequired>
                      ) : null}
                      {splitLocked || !splitMatchesAi ? null : (
                        <AiIndicator summary='Split recommended from previous campaign performance on this platform.' />
                      )}
                    </Styled.BasicInfoLabelCell>
                  </th>
                  <td>
                    {splitLocked ? (
                      splitByDisplayLabel(splitValue)
                    ) : (
                      <Styled.BasicInfoAiField data-ai-filled={String(splitMatchesAi)}>
                        <Select<string>
                          id={`platform-split-${platformId}-sel`}
                          value={splitValue}
                          options={campaignFlowData.splitOptions.map(option => ({
                            label: splitByDisplayLabel(option),
                            value: option,
                          }))}
                          onChange={(nextValue: string) => setClosedWonPlatformSplit(platformId, nextValue)}
                        />
                      </Styled.BasicInfoAiField>
                    )}
                  </td>
                </tr>
                {hasAdGroupSplit ? (
                  <tr>
                    <th scope='row'>
                      <Styled.BasicInfoLabelCell>
                        <label htmlFor={`platform-adgroup-split-${platformId}-sel`}>
                          {splitConfig?.adGroupLabel ?? 'Split Ad Group by'}
                        </label>
                      </Styled.BasicInfoLabelCell>
                    </th>
                    <td>
                      {splitLocked ? (
                        adGroupSplitValue ? (
                          splitByDisplayLabel(adGroupSplitValue)
                        ) : (
                          '—'
                        )
                      ) : (
                        <Select<string>
                          id={`platform-adgroup-split-${platformId}-sel`}
                          value={adGroupSplitValue}
                          placeholder='None (optional)'
                          allowClear
                          options={adGroupSplitOptions.map(option => ({
                            label: splitByDisplayLabel(option),
                            value: option,
                          }))}
                          onChange={(nextValue: string) =>
                            setClosedWonPlatformAdGroupSplit(platformId, nextValue ?? '')
                          }
                        />
                      )}
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </Styled.BasicInfoTable>
          </Styled.BasicInfoTableWrap>

          {showCanvasButton ? (
            <Styled.BasicInfoCanvasButtonRow>
              <AssistantCampaignCanvasButton
                type='button'
                onClick={() =>
                  isCanvasOpenForThis ? closeCampaignWorkspace() : openClosedWonPlatformCanvas(platformId)
                }
              >
                {isCanvasOpenForThis ? 'Close campaign canvas' : isCreated ? 'Edit Campaign' : 'Open campaign canvas'}
              </AssistantCampaignCanvasButton>
            </Styled.BasicInfoCanvasButtonRow>
          ) : null}

          {showCampaignsTable && createdCampaigns.length > 0 ? (
            <>
              <Styled.BasicInfoCampaignsCaption>
                {isCreating
                  ? `Creating campaigns (${closedWonCreatedCampaignCount}/${createdCampaigns.length})`
                  : usCurrentPlanEdit
                    ? `${createdCampaigns.length} campaign${createdCampaigns.length === 1 ? '' : 's'} added (US-only)`
                    : campaignStatusBreakdown(createdCampaigns.map(campaign => campaignStatusFor(campaign, campaignFlowData, selectedMediaPlanYear)))}
              </Styled.BasicInfoCampaignsCaption>
              {isCreated ? (
                <VisualWithActions
                  title={`Campaigns created in ${platformName}`}
                  downloadFileName={`campaigns-${platformId}.csv`}
                  getCsvRows={() => [
                    ['Campaign', 'Status'],
                    ...createdCampaigns.map(campaign => [
                      campaign,
                      usCurrentPlanEdit
                        ? editMeta(campaign, true).label
                        : CAMPAIGN_STATUS_META[campaignStatusFor(campaign, campaignFlowData, selectedMediaPlanYear)].label,
                    ]),
                  ]}
                >
                  <Styled.BasicInfoTableWrap>
                    <Styled.BasicInfoTable aria-label={`Campaigns for ${platformName}`}>
                      <tbody>
                        {createdCampaigns.map(campaign => {
                          // Finalized list: the Action verb reads as past-tense (e.g. Update → Updated).
                          const meta = usCurrentPlanEdit
                            ? editMeta(campaign, true)
                            : campaignStatusMetaAfterCreate(campaignStatusFor(campaign, campaignFlowData, selectedMediaPlanYear))
                          const adGroups = platform ? adGroupsForCampaign(activeDraft, platform, campaign) : [campaign]
                          const isCampaignExpanded = expandedCampaigns[campaign] ?? false
                          return (
                            <React.Fragment key={campaign}>
                              <tr>
                                <td style={{ width: 28 }}>
                                  <Styled.CampaignSetupStatusIcon>
                                    <Icon
                                      name='checkCircle'
                                      width={14}
                                      height={14}
                                      color={colors.forest_60}
                                      aria-hidden='true'
                                    />
                                  </Styled.CampaignSetupStatusIcon>
                                </td>
                                <td>
                                  <Styled.CampaignExpandToggle
                                    type='button'
                                    expanded={isCampaignExpanded}
                                    aria-expanded={isCampaignExpanded}
                                    aria-label={`${isCampaignExpanded ? 'Collapse' : 'Expand'} ${campaign}`}
                                    onClick={() =>
                                      setExpandedCampaigns(current => ({
                                        ...current,
                                        [campaign]: !isCampaignExpanded,
                                      }))
                                    }
                                  >
                                    <Icon name='caretDown' width={12} height={12} color={colors.cloud_70} />
                                    <span>{campaign}</span>
                                    <Styled.CampaignLevelTag>{campaignLevelNoun}</Styled.CampaignLevelTag>
                                  </Styled.CampaignExpandToggle>
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                  <Styled.CampaignStatusChip $tone={meta.tone}>{meta.label}</Styled.CampaignStatusChip>
                                </td>
                              </tr>
                              {isCampaignExpanded
                                ? // Edit mode shows the single US ad group with ITS OWN status
                                  // (Created, or Unpaused) — independent of the campaign's Updated.
                                  (usCurrentPlanEdit
                                    ? [{ name: usAdGroupName(campaign), tone: US_EDIT_CHIP_META_DONE[usAdGroupEditAction(campaign)].tone, label: US_EDIT_CHIP_META_DONE[usAdGroupEditAction(campaign)].label }]
                                    : adGroups.map(adGroup => ({ name: adGroup, tone: meta.tone, label: meta.label }))
                                  ).map(ag => (
                                    <Styled.CampaignAdGroupRow key={ag.name}>
                                      <td />
                                      <td>
                                        <span>{ag.name}</span>
                                        <Styled.CampaignLevelTag $nested>{adGroupLevelNoun}</Styled.CampaignLevelTag>
                                      </td>
                                      <td style={{ textAlign: 'right' }}>
                                        <Styled.CampaignStatusChip $tone={ag.tone}>{ag.label}</Styled.CampaignStatusChip>
                                      </td>
                                    </Styled.CampaignAdGroupRow>
                                  ))
                                : null}
                            </React.Fragment>
                          )
                        })}
                      </tbody>
                    </Styled.BasicInfoTable>
                  </Styled.BasicInfoTableWrap>
                </VisualWithActions>
              ) : (
                <Styled.BasicInfoTableWrap>
                  <Styled.BasicInfoTable aria-label={`Campaigns for ${platformName}`}>
                    <tbody>
                      {createdCampaigns.map((campaign, index) => {
                        const done = index < closedWonCreatedCampaignCount
                        // Once a campaign is created (done), "needs update" reads as "Updated".
                        const status = campaignStatusFor(campaign, campaignFlowData, selectedMediaPlanYear)
                        // Edit mode: the single chip shows the CURRENT state while the spinner loads,
                        // then flips to the past-tense action once done. The helper picks the chip.
                        const editAction = usCurrentPlanEdit
                          ? usEditActionForCampaignName(platformId, campaign) ?? 'new'
                          : null
                        const meta = usCurrentPlanEdit
                          ? editMeta(campaign, done)
                          : done
                            ? campaignStatusMetaAfterCreate(status)
                            : CAMPAIGN_STATUS_META[status]
                        const renderStatusChip = () =>
                          editAction && !done ? (
                            <Styled.CampaignCurrentStatusChip $tone={US_EDIT_CURRENT_META[editAction].tone}>
                              {US_EDIT_CURRENT_META[editAction].label}
                            </Styled.CampaignCurrentStatusChip>
                          ) : (
                            <Styled.CampaignStatusChip $tone={meta.tone}>{meta.label}</Styled.CampaignStatusChip>
                          )
                        // The US ad group has its OWN action (New/Create or Unpause), shown as the
                        // current state while loading then its past-tense action when done.
                        const adGroupAction = editAction ? usAdGroupEditAction(campaign) : null
                        const renderAdGroupChip = () =>
                          adGroupAction && !done ? (
                            <Styled.CampaignCurrentStatusChip $tone={US_EDIT_CURRENT_META[adGroupAction].tone}>
                              {US_EDIT_CURRENT_META[adGroupAction].label}
                            </Styled.CampaignCurrentStatusChip>
                          ) : adGroupAction ? (
                            <Styled.CampaignStatusChip $tone={US_EDIT_CHIP_META_DONE[adGroupAction].tone}>
                              {US_EDIT_CHIP_META_DONE[adGroupAction].label}
                            </Styled.CampaignStatusChip>
                          ) : (
                            <Styled.CampaignStatusChip $tone={meta.tone}>{meta.label}</Styled.CampaignStatusChip>
                          )
                        const adGroups = usCurrentPlanEdit
                          ? [usAdGroupName(campaign)]
                          : platform
                            ? adGroupsForCampaign(activeDraft, platform, campaign)
                            : [campaign]
                        const isCampaignExpanded = expandedCampaigns[campaign] ?? false
                        return (
                          <React.Fragment key={campaign}>
                            <tr>
                              <td style={{ width: 28 }}>
                                <Styled.CampaignSetupStatusIcon>
                                  {done ? (
                                    <Icon
                                      name='checkCircle'
                                      width={14}
                                      height={14}
                                      color={colors.forest_60}
                                      aria-hidden='true'
                                    />
                                  ) : (
                                    <Styled.CampaignSetupSpinner aria-label='Creating' />
                                  )}
                                </Styled.CampaignSetupStatusIcon>
                              </td>
                              <td>
                                <Styled.CampaignExpandToggle
                                  type='button'
                                  expanded={isCampaignExpanded}
                                  aria-expanded={isCampaignExpanded}
                                  aria-label={`${isCampaignExpanded ? 'Collapse' : 'Expand'} ${campaign}`}
                                  onClick={() =>
                                    setExpandedCampaigns(current => ({
                                      ...current,
                                      [campaign]: !isCampaignExpanded,
                                    }))
                                  }
                                >
                                  <Icon name='caretDown' width={12} height={12} color={colors.cloud_70} />
                                  <span>{campaign}</span>
                                  <Styled.CampaignLevelTag>{campaignLevelNoun}</Styled.CampaignLevelTag>
                                </Styled.CampaignExpandToggle>
                              </td>
                              <td style={{ textAlign: 'right' }}>{renderStatusChip()}</td>
                            </tr>
                            {isCampaignExpanded
                              ? adGroups.map(adGroup => (
                                  <Styled.CampaignAdGroupRow key={adGroup}>
                                    <td />
                                    <td>
                                      <span>{adGroup}</span>
                                      <Styled.CampaignLevelTag $nested>{adGroupLevelNoun}</Styled.CampaignLevelTag>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>{renderAdGroupChip()}</td>
                                  </Styled.CampaignAdGroupRow>
                                ))
                              : null}
                          </React.Fragment>
                        )
                      })}
                    </tbody>
                  </Styled.BasicInfoTable>
                </Styled.BasicInfoTableWrap>
              )}
            </>
          ) : null}

          {allCampaignsRevealed ? (
            <>
              <Styled.BasicInfoStatusAlert
                variant='success'
                role='status'
                data-testid={`platform-created-alert-${platformId}`}
              >
                <Icon name='checkCircle' width={16} height={16} color={colors.forest_60} aria-hidden='true' />
                {`Campaign created in ${platformName}.`}
              </Styled.BasicInfoStatusAlert>
              <Styled.BasicInfoSecondaryButton
                href={externalLinks.campaignManagement.cmt}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={`View campaign for ${platformName} (opens in new tab)`}
              >
                View campaign
                <Icon name='externalLink' width={14} height={14} aria-hidden='true' />
              </Styled.BasicInfoSecondaryButton>
            </>
          ) : null}
        </Styled.PlatformCardBody>
      </Styled.BasicInfoCollapsibleBody>
    </Styled.PlatformCard>
  )
}

// Step 11 — pause card for a platform NOT in the new media plan, mirroring PlatformSetupCard but
// Step 11 — a single Basic-Info-style table listing the out-of-plan platforms (e.g. Yandex, Baidu)
// and all their currently-live campaigns to be paused, with one Confirm action for the whole step.
const PauseCampaignsTable: React.FC<{ platforms: CampaignPlatform[] }> = ({ platforms }) => {
  const { closedWonSetupPhase, closedWonPauseConfirmed, closedWonPausedCampaignCount } = useCampaignFlowState()

  // Flat list of { platformName, campaign } across all pause platforms, in order.
  const rows = platforms.flatMap(platform =>
    closedWonCampaignsToPause(platform.id).map(campaign => ({ platformName: platform.name, campaign })),
  )
  const channel = platforms[0]?.group ?? '—'
  const isComplete = closedWonSetupPhase === 'complete'
  const isActive = closedWonSetupPhase === 'pause-review' && !closedWonPauseConfirmed

  return (
    <Styled.BasicInfoCard data-testid='pause-campaigns-card'>
      <Styled.BasicInfoCardHeading>Pause out-of-plan campaigns</Styled.BasicInfoCardHeading>

      <Styled.BasicInfoTableWrap>
        <Styled.BasicInfoTable aria-label='Campaigns to be paused'>
          <tbody>
            <tr>
              <th scope='row'>
                <Styled.BasicInfoLabelCell>Channel</Styled.BasicInfoLabelCell>
              </th>
              <td>{channel}</td>
            </tr>
            <tr>
              <th scope='row'>
                <Styled.BasicInfoLabelCell>Platforms</Styled.BasicInfoLabelCell>
              </th>
              <td>{platforms.map(platform => platform.name).join(', ')}</td>
            </tr>
            <tr>
              <th scope='row'>
                <Styled.BasicInfoLabelCell>Campaigns</Styled.BasicInfoLabelCell>
              </th>
              <td>
                {rows.map((row, index) => {
                  const done = isComplete || index < closedWonPausedCampaignCount
                  return (
                    <div key={row.campaign} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '2px 0' }}>
                      {closedWonPauseConfirmed ? (
                        <Styled.CampaignSetupStatusIcon>
                          {done ? (
                            <Icon
                              name='pauseCircle'
                              width={14}
                              height={14}
                              color={colors.pumpkin_60}
                              aria-hidden='true'
                            />
                          ) : (
                            <Styled.CampaignSetupSpinner aria-label='Pausing' />
                          )}
                        </Styled.CampaignSetupStatusIcon>
                      ) : null}
                      <span style={{ flex: 1 }}>{row.campaign}</span>
                    </div>
                  )
                })}
              </td>
            </tr>
            <tr>
              <th scope='row'>
                <Styled.BasicInfoLabelCell>Status</Styled.BasicInfoLabelCell>
              </th>
              <td>
                <Styled.CampaignStatusChip $tone='paused'>Paused</Styled.CampaignStatusChip>
              </td>
            </tr>
          </tbody>
        </Styled.BasicInfoTable>
      </Styled.BasicInfoTableWrap>

      {isActive ? (
        <Styled.BasicInfoConfirmRow>
          <Styled.BasicInfoConfirmHint>Confirm campaigns to be paused</Styled.BasicInfoConfirmHint>
          <Styled.BasicInfoConfirmButton
            type='button'
            onClick={() => confirmClosedWonPause()}
            data-testid='pause-campaigns-confirm'
          >
            Confirm
          </Styled.BasicInfoConfirmButton>
        </Styled.BasicInfoConfirmRow>
      ) : null}
    </Styled.BasicInfoCard>
  )
}

const US_CLEANUP_ACTION_LABEL: Record<UsCleanupAction, string> = {
  pause: 'Pause',
  'remove-us': 'Remove US',
  'add-us': 'Add US',
  'no-change': 'No change',
}

// Final step of the "Create US Push in new plan" flow: show the OLD campaign setup (channel →
// platform → tactic, like the campaign-setup structure) and the US cleanup applied to each live
// campaign so the US isn't double-served by the new US Push plan. Only-US → Pause; markets+US →
// Remove US; all-world / US-excluded / paused → No change. Confirm advances to the final summary.
// Past-tense label once a changed row has been applied: Pause -> Paused, Remove US -> Updated.
const US_CLEANUP_DONE_LABEL: Record<UsCleanupAction, string> = {
  pause: 'Paused',
  'remove-us': 'Updated',
  'add-us': 'Updated',
  'no-change': 'No change',
}

// Status icon for a cleanup row/child, given its action and whether it has been applied yet.
// No-change rows always show a grey tick; changing rows show a spinner until done, then their
// outcome icon (pause = pumpkin pause-circle, remove-us = sky check-circle).
const UsCleanupStatusIcon: React.FC<{ action: UsCleanupAction; applied: boolean; animating: boolean }> = ({
  action,
  applied,
  animating,
}) => {
  if (action === 'no-change') {
    return <Icon name='checkCircle' width={14} height={14} color={colors.cloud_50} aria-hidden='true' />
  }
  if (animating && !applied) {
    return <Styled.CampaignSetupSpinner aria-label={action === 'pause' ? 'Pausing' : 'Updating'} />
  }
  return (
    <Icon
      name={action === 'pause' ? 'pauseCircle' : 'checkCircle'}
      width={14}
      height={14}
      color={action === 'pause' ? colors.pumpkin_60 : colors.sky_60}
      aria-hidden='true'
    />
  )
}

// The per-property cleanup table: channel groups → tactic-split campaign (level 1, expandable) →
// market-split children (level 2). Columns: caret · status · name · tactic · level · targeting chip.
const UsCleanupPropertyTable: React.FC<{
  propertyKey: string
  rows: UsCleanupRow[]
  confirmed: boolean
  isComplete: boolean
  revealCount: number
}> = ({ propertyKey, rows, confirmed, isComplete, revealCount }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  // Group by channel, preserving pivot order. The reveal index is keyed to the changed CAMPAIGN
  // order (shared across properties) so the animation stays in sync everywhere.
  const channels: { channel: string; rows: UsCleanupRow[] }[] = []
  rows.forEach(row => {
    let group = channels.find(entry => entry.channel === row.channel)
    if (!group) {
      group = { channel: row.channel, rows: [] }
      channels.push(group)
    }
    group.rows.push(row)
  })
  let changeIndex = -1
  const chipLabel = (action: UsCleanupAction, applied: boolean) =>
    applied ? US_CLEANUP_DONE_LABEL[action] : US_CLEANUP_ACTION_LABEL[action]

  return (
    <Styled.BasicInfoTableWrap>
      <Styled.UsCleanupTable aria-label={`US cleanup for ${propertyKey}`}>
        <tbody>
          {channels.map(group => (
            <React.Fragment key={group.channel}>
              <tr>
                <Styled.UsCleanupChannelHeaderRow scope='colgroup' colSpan={6}>
                  {group.channel}
                </Styled.UsCleanupChannelHeaderRow>
              </tr>
              {group.rows.map(row => {
                const changes = row.action !== 'no-change'
                const rowChangeIndex = changes ? (changeIndex += 1) : -1
                const applied = !changes || isComplete || rowChangeIndex < revealCount
                const expandKey = `${propertyKey}|${row.platformId}|${row.tactic}`
                const isExpanded = expanded[expandKey] ?? false
                return (
                  <React.Fragment key={expandKey}>
                    <tr>
                      <td className='us-cleanup-caret'>
                        <Styled.CampaignExpandToggle
                          type='button'
                          expanded={isExpanded}
                          aria-expanded={isExpanded}
                          aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${row.campaignName}`}
                          onClick={() => setExpanded(current => ({ ...current, [expandKey]: !isExpanded }))}
                        >
                          <Icon name='caretDown' width={12} height={12} color={colors.cloud_70} />
                        </Styled.CampaignExpandToggle>
                      </td>
                      <td className='us-cleanup-status'>
                        <Styled.CampaignSetupStatusIcon>
                          <UsCleanupStatusIcon action={row.action} applied={applied} animating={confirmed} />
                        </Styled.CampaignSetupStatusIcon>
                      </td>
                      <td className='us-cleanup-name'>{row.campaignName}</td>
                      <td className='us-cleanup-tactic'>{row.tactic}</td>
                      <td className='us-cleanup-level'>
                        <Styled.CampaignLevelTag>{row.campaignNoun}</Styled.CampaignLevelTag>
                      </td>
                      <td className='us-cleanup-action'>
                        <Styled.UsCleanupChip $action={row.action}>
                          {chipLabel(row.action, applied)}
                        </Styled.UsCleanupChip>
                      </td>
                    </tr>
                    {isExpanded
                      ? row.markets.map(market => {
                          const marketApplied = market.action === 'no-change' || applied
                          return (
                            <Styled.CampaignAdGroupRow key={`${expandKey}|${market.name}`}>
                              <td className='us-cleanup-caret' />
                              <td className='us-cleanup-status'>
                                <Styled.CampaignSetupStatusIcon>
                                  <UsCleanupStatusIcon
                                    action={market.action}
                                    applied={marketApplied}
                                    animating={confirmed}
                                  />
                                </Styled.CampaignSetupStatusIcon>
                              </td>
                              <td className='us-cleanup-name'>{market.name}</td>
                              <td className='us-cleanup-tactic' />
                              <td className='us-cleanup-level'>
                                <Styled.CampaignLevelTag $nested>{row.marketNoun}</Styled.CampaignLevelTag>
                              </td>
                              <td className='us-cleanup-action'>
                                <Styled.UsCleanupChip $action={market.action}>
                                  {chipLabel(market.action, marketApplied)}
                                </Styled.UsCleanupChip>
                              </td>
                            </Styled.CampaignAdGroupRow>
                          )
                        })
                      : null}
                  </React.Fragment>
                )
              })}
            </React.Fragment>
          ))}
        </tbody>
      </Styled.UsCleanupTable>
    </Styled.BasicInfoTableWrap>
  )
}

// Final step of the "Create US Push in new plan" flow: show the OLD campaign setup per property
// (property accordion → channel → tactic-split campaign → market children) and the US cleanup
// applied so the US isn't double-served by the new US Push plan. Only-US → Pause; markets+US →
// Remove US; all-world / US-excluded / paused → No change. Confirm advances to the final summary.
const UsPushCleanupCard: React.FC<{ mode?: UsCleanupMode }> = ({ mode = 'new-plan' }) => {
  const { closedWonSetupPhase, closedWonPauseConfirmed, closedWonPausedCampaignCount } = useCampaignFlowState()
  const rows = usPushOldSetupCleanup(campaignFlowData, mode)
  // Every property carries the same old-setup campaigns; list them so the cleanup is shown for all.
  const properties = campaignFlowData.propertyMediaPlans.flatMap(plan => plan.properties)
  // All property accordions start COLLAPSED; a green check on each header signals the cleanup is
  // applied for that property once confirmed/complete.
  const [expandedProperties, setExpandedProperties] = useState<string[]>([])
  const isComplete = closedWonSetupPhase === 'complete'
  const applied = closedWonPauseConfirmed || isComplete
  const changeCount = rows.filter(row => row.action !== 'no-change').length
  const isActive = closedWonSetupPhase === 'pause-review' && !closedWonPauseConfirmed

  const toggleProperty = (property: string) =>
    setExpandedProperties(current =>
      current.includes(property) ? current.filter(entry => entry !== property) : [...current, property],
    )

  return (
    <Styled.BasicInfoCard data-testid='us-push-cleanup-card'>
      <Styled.BasicInfoCardHeading>Clean up US in the existing setup</Styled.BasicInfoCardHeading>
      <AssistantBodyText>
        {changeCount > 0
          ? mode === 'current-plan'
            ? `A dedicated US ad group now covers the US in each campaign. For each property, ${changeCount} existing campaign${
                changeCount === 1 ? '' : 's'
              } will have the US removed from the original targeting so it is not served twice.`
            : `The new US Push plan now owns the US feeder market. For each property, ${changeCount} existing campaign${
                changeCount === 1 ? '' : 's'
              } will be adjusted so the US is not served twice. All-world campaigns are left unchanged.`
          : 'No existing campaigns need changes.'}
      </AssistantBodyText>
      <Styled.PropertySetupList>
        {properties.map(property => {
          const isOpen = expandedProperties.includes(property)
          return (
            <Styled.PropertySetupSection key={property}>
              <Styled.PropertySetupHeader
                type='button'
                expanded={isOpen}
                aria-expanded={isOpen}
                onClick={() => toggleProperty(property)}
              >
                <Styled.PropertyHeaderTitleRow>
                  <AssistantSectionCaret expanded={isOpen}>
                    <Icon name='caretDown' width={10} height={10} color={colors.cloud_80} />
                  </AssistantSectionCaret>
                  {applied ? (
                    <Icon name='checkCircle' width={14} height={14} color={colors.forest_60} aria-hidden='true' />
                  ) : null}
                  <span className='property-name'>Property: {property}</span>
                </Styled.PropertyHeaderTitleRow>
              </Styled.PropertySetupHeader>
              {isOpen ? (
                <Styled.PropertySetupBody>
                  <UsCleanupPropertyTable
                    propertyKey={property}
                    rows={rows}
                    confirmed={closedWonPauseConfirmed}
                    isComplete={isComplete}
                    revealCount={closedWonPausedCampaignCount}
                  />
                </Styled.PropertySetupBody>
              ) : null}
            </Styled.PropertySetupSection>
          )
        })}
      </Styled.PropertySetupList>

      {isActive ? (
        <Styled.BasicInfoConfirmRow>
          <Styled.BasicInfoConfirmHint>Confirm the US cleanup on the existing campaigns</Styled.BasicInfoConfirmHint>
          <Styled.BasicInfoConfirmButton
            type='button'
            onClick={() => confirmUsPushCleanup()}
            data-testid='us-push-cleanup-confirm'
          >
            Confirm
          </Styled.BasicInfoConfirmButton>
        </Styled.BasicInfoConfirmRow>
      ) : null}
    </Styled.BasicInfoCard>
  )
}

// "Add US to current targeting" — Step 1: show the existing campaigns (per property) that will have
// the US ADDED to their targeting. Reuses the per-property cleanup table with the 'add-us' rule:
// US-excluded campaigns get a new US market (Add US / Updated); all-world / US-included / Only-US
// are unchanged. Confirm animates the changed rows; Step 2 (create-missing) renders after confirm.
const UsAddTargetingCard: React.FC = () => {
  const { usAddTargetingConfirmed, usAddTargetingRevealCount } = useCampaignFlowState()
  const rows = usPushOldSetupCleanup(campaignFlowData, 'add-us')
  const properties = campaignFlowData.propertyMediaPlans.flatMap(plan => plan.properties)
  const [expandedProperties, setExpandedProperties] = useState<string[]>([])
  const changeCount = rows.filter(row => row.action !== 'no-change').length
  const toggleProperty = (property: string) =>
    setExpandedProperties(current =>
      current.includes(property) ? current.filter(entry => entry !== property) : [...current, property],
    )

  return (
    <Styled.BasicInfoCard data-testid='us-add-targeting-card'>
      <Styled.BasicInfoCardHeading>Add the US to existing campaigns</Styled.BasicInfoCardHeading>
      <AssistantBodyText>
        {changeCount > 0
          ? `For each property, the US will be added to the targeting of ${changeCount} existing campaign${
              changeCount === 1 ? '' : 's'
            } that don't currently reach it. All-world and US-targeted campaigns are left unchanged.`
          : 'Every existing campaign already reaches the US — no targeting changes needed.'}
      </AssistantBodyText>
      <Styled.PropertySetupList>
        {properties.map(property => {
          const isOpen = expandedProperties.includes(property)
          return (
            <Styled.PropertySetupSection key={property}>
              <Styled.PropertySetupHeader
                type='button'
                expanded={isOpen}
                aria-expanded={isOpen}
                onClick={() => toggleProperty(property)}
              >
                <Styled.PropertyHeaderTitleRow>
                  <AssistantSectionCaret expanded={isOpen}>
                    <Icon name='caretDown' width={10} height={10} color={colors.cloud_80} />
                  </AssistantSectionCaret>
                  {usAddTargetingConfirmed ? (
                    <Icon name='checkCircle' width={14} height={14} color={colors.forest_60} aria-hidden='true' />
                  ) : null}
                  <span className='property-name'>Property: {property}</span>
                </Styled.PropertyHeaderTitleRow>
              </Styled.PropertySetupHeader>
              {isOpen ? (
                <Styled.PropertySetupBody>
                  <UsCleanupPropertyTable
                    propertyKey={property}
                    rows={rows}
                    confirmed={usAddTargetingConfirmed}
                    isComplete={false}
                    revealCount={usAddTargetingRevealCount}
                  />
                </Styled.PropertySetupBody>
              ) : null}
            </Styled.PropertySetupSection>
          )
        })}
      </Styled.PropertySetupList>

      {!usAddTargetingConfirmed ? (
        <Styled.BasicInfoConfirmRow>
          <Styled.BasicInfoConfirmHint>Confirm adding the US to these campaigns</Styled.BasicInfoConfirmHint>
          <Styled.BasicInfoConfirmButton
            type='button'
            onClick={() => confirmUsAddTargeting(changeCount)}
            data-testid='us-add-targeting-confirm'
          >
            Confirm
          </Styled.BasicInfoConfirmButton>
        </Styled.BasicInfoConfirmRow>
      ) : null}
    </Styled.BasicInfoCard>
  )
}

// Conversation-context banner (advertiser + media plan scope). Rendered both on the Max welcome/
// prompt-landing page AND at the top of the campaign-flow conversation, for every scoped flow
// (MockStay growth + Amadeus Hotels closed-won). The MockStay growth flow spans multiple media
// plans, so it shows the advertiser only. Dismissible per mount.
export const CampaignContextBanner: React.FC<{ fullScreen?: boolean; placement?: 'top' | 'bottom' }> = ({
  fullScreen = false,
  placement = 'top',
}) => {
  const { selectedMediaPlanYear, blocks, advertiserConfirmed, mediaPlanConfirmed } = useCampaignFlowState()
  const [visible, setVisible] = useState(true)
  // While the user is still choosing the advertiser there is no context to show yet.
  const pickingAdvertiser = blocks.some(block => block.kind === 'advertiser-select') && !advertiserConfirmed
  // ...and the media plan (the 'Media plan:' part of the banner) is not known until it is confirmed.
  const pickingMediaPlan = blocks.some(block => block.kind === 'media-plan-select') && !mediaPlanConfirmed
  if (!visible || pickingAdvertiser || pickingMediaPlan) return null
  const advertiser = campaignFlowData.basicInfo.advertiser
  const mediaPlanName = resolveMediaPlan(selectedMediaPlanYear).mediaPlanName
  const showMediaPlan = getActiveAdvertiser() !== 'mockstay'
  return (
    <Styled.ContextAlert role='note' $fullScreen={fullScreen} $placement={placement}>
      {/* violet-60 #9240cc (df/color/tip/alt/default/foreground) — not exported in colors */}
      <Icon name='crosshairs' width={14} height={14} color='#9240cc' title='Conversation context' />
      <span>
        <Styled.ContextAlertLabel>Advertiser:</Styled.ContextAlertLabel>{' '}
        <Styled.ContextAlertValue>{advertiser}</Styled.ContextAlertValue>
        {showMediaPlan ? (
          <>
            {' '}·{' '}
            <Styled.ContextAlertLabel>Media plan:</Styled.ContextAlertLabel>{' '}
            <Styled.ContextAlertValue>{mediaPlanName}</Styled.ContextAlertValue>
          </>
        ) : null}
      </span>
      <Styled.ContextAlertClose type='button' aria-label='Dismiss context' onClick={() => setVisible(false)}>
        <Icon name='xmark' width={14} height={14} color={colors.cloud_80} title='Dismiss context' />
      </Styled.ContextAlertClose>
    </Styled.ContextAlert>
  )
}

// User prompt bubble with the standard hover actions (Pin + Copy) + timestamp, matching the panel.

// User prompt bubble with the standard hover actions (Pin + Copy) + timestamp, matching the panel.

// User prompt bubble with the standard hover actions (Pin + Copy) + timestamp, matching the panel.
const PromptBubble: React.FC<{ prompt: string; timestamp: string }> = ({ prompt, timestamp }) => {
  const [pinned, setPinned] = useState(false)
  const [bubbleFeedback, setBubbleFeedback] = useState<string | null>(null)

  useEffect(() => {
    if (!bubbleFeedback) return
    const timerId = window.setTimeout(() => setBubbleFeedback(null), 1600)
    return () => window.clearTimeout(timerId)
  }, [bubbleFeedback])

  return (
    <AssistantPromptBubbleWrap>
      <ChatBubble author='user'>
        <ChatBubbleContent>{prompt}</ChatBubbleContent>
        <ChatBubbleActions data-chat-bubble-actions='true'>
          <ChatBubbleAction
            type='button'
            aria-label={pinned ? 'Unpin prompt' : 'Pin prompt'}
            onClick={event => {
              event.stopPropagation()
              setPinned(current => !current)
              setBubbleFeedback(pinned ? 'Unpinned' : 'Pinned')
            }}
          >
            <Icon
              name={pinned ? 'bookmark-solid' : 'bookmark'}
              width={14}
              height={14}
              color={pinned ? colors.sky_60 : colors.cloud_80}
            />
            <ChatBubbleActionTooltip data-bubble-tooltip='true'>
              {pinned ? 'Unpin prompt' : 'Pin prompt'}
            </ChatBubbleActionTooltip>
          </ChatBubbleAction>
          <ChatBubbleAction
            type='button'
            aria-label='Copy prompt text'
            onClick={event => {
              event.stopPropagation()
              void navigator.clipboard?.writeText(prompt)
              setBubbleFeedback('Copied')
            }}
          >
            <Icon name='copy' width={14} height={14} color={colors.cloud_80} />
            <ChatBubbleActionTooltip data-bubble-tooltip='true'>Copy text</ChatBubbleActionTooltip>
          </ChatBubbleAction>
          <ChatBubbleActionsDivider />
          <ChatBubbleActionsTime>{formatTurnTimestamp(timestamp)}</ChatBubbleActionsTime>
        </ChatBubbleActions>
        {bubbleFeedback ? <ChatBubbleActionFeedback>{bubbleFeedback}</ChatBubbleActionFeedback> : null}
      </ChatBubble>
      <ChatBubbleTimestamp data-chat-bubble-timestamp='true'>{formatTurnTimestamp(timestamp)}</ChatBubbleTimestamp>
    </AssistantPromptBubbleWrap>
  )
}

// Wraps a chart/table so it exposes the standard hover actions (Download + Full screen) and a
// full-screen modal, per the project interaction-affordance rule.
const downloadCsv = (fileName: string, rows: string[][]) => {
  const csv = rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.click()
  window.URL.revokeObjectURL(url)
}

const VisualWithActions: React.FC<{
  title: string
  downloadFileName: string
  getCsvRows: () => string[][]
  children: React.ReactNode
}> = ({ title, downloadFileName, getCsvRows, children }) => {
  const [fullScreen, setFullScreen] = useState(false)
  return (
    <>
      <AssistantVisualCard>
        {children}
        <AssistantVisualActions data-visual-actions='true'>
          <AssistantActionItem>
            <AssistantActionIconButton
              iconName='download'
              color='currentColor'
              width={14}
              height={14}
              title='Download'
              onClick={() => downloadCsv(downloadFileName, getCsvRows())}
            />
            <AssistantActionTooltip data-assistant-action-tooltip='true'>Download</AssistantActionTooltip>
          </AssistantActionItem>
          <AssistantActionItem>
            <AssistantActionIconButton
              iconName='expand'
              color='currentColor'
              width={14}
              height={14}
              title='Full screen'
              onClick={() => setFullScreen(true)}
            />
            <AssistantActionTooltip data-assistant-action-tooltip='true'>Full screen</AssistantActionTooltip>
          </AssistantActionItem>
        </AssistantVisualActions>
      </AssistantVisualCard>
      {fullScreen ? (
        <AssistantFullModalOverlay role='dialog' aria-modal='true' onClick={() => setFullScreen(false)}>
          <AssistantFullModalDialog onClick={event => event.stopPropagation()}>
            <AssistantFullModalHeader>
              <AssistantFullModalTitleRow>
                <AssistantFullModalTitle>{title}</AssistantFullModalTitle>
              </AssistantFullModalTitleRow>
              <AssistantFullModalClose type='button' onClick={() => setFullScreen(false)}>
                <Icon name='xmark' width={14} height={14} color={colors.cloud_80} title='Close full screen' />
              </AssistantFullModalClose>
            </AssistantFullModalHeader>
            <AssistantFullModalBody>{children}</AssistantFullModalBody>
          </AssistantFullModalDialog>
        </AssistantFullModalOverlay>
      ) : null}
    </>
  )
}

const RESPONSE_FEEDBACK_RESET_MS = 1600

const ResponseActionBar: React.FC<{ sources?: FlowSource[]; timestamp?: string; fullWidth?: boolean }> = ({
  sources = [],
  timestamp,
  fullWidth = false,
}) => {
  const [feedback, setFeedback] = useState<string | null>(null)
  const [rating, setRating] = useState<'up' | 'down' | null>(null)
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false)
  const [feedbackText, setFeedbackText] = useState('')
  const [isSourcesPanelOpen, setIsSourcesPanelOpen] = useState(false)

  useEffect(() => {
    if (!feedback) return
    const timerId = window.setTimeout(() => setFeedback(null), RESPONSE_FEEDBACK_RESET_MS)
    return () => window.clearTimeout(timerId)
  }, [feedback])

  // Standard four-action feedback bar: Copy, Regenerate, Bad (opens modal), Good (inline).
  const actions: Array<{
    key: string
    icon: React.ComponentProps<typeof AssistantActionIconButton>['iconName']
    label: string
    onClick: () => void
    selected?: boolean
  }> = [
    { key: 'copy', icon: 'copy', label: 'Copy response', onClick: () => setFeedback('Copied') },
    {
      key: 'refresh',
      icon: 'refresh',
      label: 'Regenerate response',
      onClick: () => setFeedback('Response is up to date'),
    },
    {
      key: 'dislike',
      icon: rating === 'down' ? 'thumbs-down-solid' : 'thumbs-down',
      label: 'Bad response',
      selected: rating === 'down',
      onClick: () => {
        setRating('down')
        setFeedbackText('')
        setFeedbackModalOpen(true)
      },
    },
    {
      key: 'like',
      icon: rating === 'up' ? 'thumbs-up-solid' : 'thumbs-up',
      label: 'Good response',
      selected: rating === 'up',
      onClick: () => {
        setRating('up')
        setFeedback('Thanks for the feedback')
      },
    },
  ]

  const closeFeedbackModal = () => setFeedbackModalOpen(false)
  const submitFeedback = () => {
    setFeedbackModalOpen(false)
    setFeedback('Thanks for the feedback')
  }

  return (
    <>
      <AssistantActionsRow>
        {actions.map(action => (
          <AssistantActionItem key={action.key}>
            <AssistantActionIconButton
              iconName={action.icon}
              color='currentColor'
              width={14}
              height={14}
              title={action.label}
              selected={action.selected}
              onClick={action.onClick}
            />
            <AssistantActionTooltip data-assistant-action-tooltip='true'>{action.label}</AssistantActionTooltip>
          </AssistantActionItem>
        ))}
        {sources.length > 0 ? (
          <>
            <AssistantActionsDivider />
            <AssistantActionsSourcesButton
              type='button'
              aria-expanded={isSourcesPanelOpen}
              onClick={() => setIsSourcesPanelOpen(current => !current)}
            >
              <Icon name='clipboardListCheck' width={14} height={14} color={colors.cloud_100} />
              Sources
            </AssistantActionsSourcesButton>
          </>
        ) : null}
        {timestamp ? <AssistantActionsTime>{formatTurnTimestamp(timestamp)}</AssistantActionsTime> : null}
        {feedback ? <AssistantActionFeedback>{feedback}</AssistantActionFeedback> : null}
      </AssistantActionsRow>
      {isSourcesPanelOpen && sources.length > 0 ? (
        <AssistantSourcesPanel fullScreen={fullWidth} role='dialog' aria-label='Sources'>
          {fullWidth ? null : <AssistantSourcesPanelHandle />}
          <AssistantSourcesPanelHeader>
            <AssistantSourcesPanelTitle>Sources</AssistantSourcesPanelTitle>
            <HeaderIconButton
              iconName='xmark'
              color={colors.sky_60}
              width={14}
              height={14}
              title='Close sources'
              onClick={() => setIsSourcesPanelOpen(false)}
            />
          </AssistantSourcesPanelHeader>
          <AssistantSourcesPanelBody>
            {sources.map(source => (
              <AssistantSourcesPanelItem
                key={source.title}
                type='button'
                title={`Open ${source.title} in new window`}
                onClick={() => window.open(getFlowSourceUrl(source.domain), '_blank', 'noopener,noreferrer')}
              >
                <AssistantSourcesPanelItemHeaderRow>
                  <Icon name='clipboardListCheck' width={14} height={14} color={colors.sky_60} />
                  <AssistantSourcesPanelItemTitle>{source.title}</AssistantSourcesPanelItemTitle>
                </AssistantSourcesPanelItemHeaderRow>
                <AssistantSourcesPanelItemDescription>
                  {source.description ?? source.domain}
                </AssistantSourcesPanelItemDescription>
              </AssistantSourcesPanelItem>
            ))}
          </AssistantSourcesPanelBody>
        </AssistantSourcesPanel>
      ) : null}
      {feedbackModalOpen ? (
        <AssistantFullModalOverlay role='dialog' aria-modal='true' onClick={closeFeedbackModal}>
          <AssistantFullModalDialog onClick={event => event.stopPropagation()}>
            <AssistantFullModalHeader>
              <AssistantFullModalTitleRow>
                <AssistantFullModalTitle>Help us improve this response</AssistantFullModalTitle>
              </AssistantFullModalTitleRow>
              <AssistantFullModalClose type='button' onClick={closeFeedbackModal}>
                <Icon name='xmark' width={14} height={14} color={colors.cloud_80} title='Close feedback modal' />
              </AssistantFullModalClose>
            </AssistantFullModalHeader>
            <AssistantFullModalBody>
              <AssistantFullModalDescription>
                Tell us what was missing, incorrect, or unhelpful in this answer. Your feedback helps improve the next
                response.
              </AssistantFullModalDescription>
              <AssistantFullModalTextArea
                placeholder='Add feedback'
                value={feedbackText}
                onChange={event => setFeedbackText(event.target.value)}
              />
            </AssistantFullModalBody>
            <AssistantFullModalActions>
              <AssistantFullModalSecondaryButton type='button' onClick={closeFeedbackModal}>
                Cancel
              </AssistantFullModalSecondaryButton>
              <AssistantFullModalPrimaryButton type='button' onClick={submitFeedback}>
                Submit feedback
              </AssistantFullModalPrimaryButton>
            </AssistantFullModalActions>
          </AssistantFullModalDialog>
        </AssistantFullModalOverlay>
      ) : null}
    </>
  )
}

// Resolves a media-plan table's platform ids into platform records for chip rendering.
const resolveMediaPlanGroups = (table: { groups: typeof conversation.mediaPlanTable.groups }) =>
  table.groups.map(group => ({
    ...group,
    items: group.items.map(item => ({
      ...item,
      platforms: item.platforms.flatMap(platformId => {
        const platform = campaignFlowData.platforms.find(availablePlatform => availablePlatform.id === platformId)
        return platform ? [platform] : []
      }),
    })),
  }))

const MediaPlanTable: React.FC<{ table: typeof conversation.mediaPlanTable }> = ({ table }) => (
  <Styled.FlowTable role='table' aria-label='Media plan'>
    <Styled.FlowTableRow $variant='header' role='row'>
      <div role='columnheader'>Channel / tactic</div>
      <div role='columnheader'>Platforms</div>
      <div role='columnheader'>Budget split</div>
    </Styled.FlowTableRow>
    {resolveMediaPlanGroups(table).map(group => (
      <React.Fragment key={group.channel}>
        <Styled.FlowTableRow $variant='group' role='row'>
          <div role='cell'>{group.channel}</div>
          <div role='cell' />
          <div role='cell'>{group.subtotal}</div>
        </Styled.FlowTableRow>
        {group.items.map(item => (
          <Styled.FlowTableRow key={`${group.channel}-${item.tactic}`} role='row'>
            <Styled.FlowIndentedCell role='cell'>{item.tactic}</Styled.FlowIndentedCell>
            <div role='cell'>
              <Styled.PlatformChipList>
                {item.platforms.map(platform => (
                  <PlatformChip
                    key={platform.id}
                    chipKey={campaignFlowData.platformChipKeys[platform.id] ?? platform.id}
                    label={platform.name}
                  />
                ))}
              </Styled.PlatformChipList>
            </div>
            <div role='cell'>{item.budget}</div>
          </Styled.FlowTableRow>
        ))}
      </React.Fragment>
    ))}
    <Styled.FlowTableRow $variant='group' role='row'>
      <div role='cell'>Added fees</div>
      <div role='cell' />
      <div role='cell'>{table.fees}</div>
    </Styled.FlowTableRow>
    <Styled.FlowTableRow $variant='total' role='row'>
      <div role='cell'>Total</div>
      <div role='cell' />
      <div role='cell'>{table.total}</div>
    </Styled.FlowTableRow>
  </Styled.FlowTable>
)

// Per-year cell status → chip label/tone for the campaign-structure comparison.
const STRUCTURE_CELL_META: Record<
  Exclude<CampaignStructureRow['status2026'], 'none'> | 'missing',
  { label: string; tone: 'exists' | 'added' | 'paused' | 'unpaused' | 'missing' }
> = {
  exists: { label: 'Exists', tone: 'exists' },
  added: { label: 'New', tone: 'added' },
  paused: { label: 'Paused', tone: 'paused' },
  unpaused: { label: 'Unpaused', tone: 'unpaused' },
  missing: { label: 'Missing', tone: 'missing' },
}

const formatStructureBudget = (amount: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount)

// One year's cell: status chip stacked vertically above the budget, or a dash when the platform
// does not run that tactic that year. Current/Next are now column sub-headings, not inline tags.
const StructureCellSide: React.FC<{ cell: StructureTacticCell }> = ({ cell }) => {
  const meta = cell ? STRUCTURE_CELL_META[cell.status as Exclude<CampaignStructureRow['status2026'], 'none'>] : null
  return (
    <Styled.StructureCellValue>
      {meta && cell ? (
        <>
          <Styled.StructureCellChip $tone={meta.tone}>{meta.label}</Styled.StructureCellChip>
          {cell.budget > 0 ? <span className='structure-pair-budget'>{formatStructureBudget(cell.budget)}</span> : null}
        </>
      ) : (
        <span className='structure-pair-dash' aria-label='Not applicable'>
          {'\u2014'}
        </span>
      )}
    </Styled.StructureCellValue>
  )
}

// Location-targeting cell (MockStay growth flow): shows the US-coverage status chip (Exists/Paused/
// Missing) derived from the platform/tactic location targeting, with the targeting value beneath.
const LocationCellSide: React.FC<{ platformId: string; tactic: string }> = ({ platformId, tactic }) => {
  const result = usLocationStatusFor(platformId, tactic)
  if (!result) {
    return (
      <Styled.StructureCellValue>
        <span className='structure-pair-dash' aria-label='Not applicable'>
          {'\u2014'}
        </span>
      </Styled.StructureCellValue>
    )
  }
  const meta = STRUCTURE_CELL_META[result.status]
  return (
    <Styled.StructureCellValue>
      <Styled.StructureCellChip $tone={meta.tone}>{meta.label}</Styled.StructureCellChip>
      <span className='structure-pair-location'>{result.label}</span>
    </Styled.StructureCellValue>
  )
}

// A tactic cell places the Current year and the Next year side by side (one per sub-heading).
const StructurePairCellView: React.FC<{
  current: StructureTacticCell
  next: StructureTacticCell
  currentOnly?: boolean
  locationMode?: boolean
  platformId?: string
  tactic?: string
}> = ({ current, next, currentOnly, locationMode, platformId, tactic }) => (
  <Styled.StructureCellPair>
    {locationMode && platformId && tactic ? (
      current ? (
        <LocationCellSide platformId={platformId} tactic={tactic} />
      ) : (
        <Styled.StructureCellValue>
          <span className='structure-pair-dash' aria-label='Not applicable'>
            {'—'}
          </span>
        </Styled.StructureCellValue>
      )
    ) : (
      <StructureCellSide cell={current} />
    )}
    {!currentOnly ? <StructureCellSide cell={next} /> : null}
  </Styled.StructureCellPair>
)

// A total cell places the Current total next to the Next total (budgets only, no chips).
const StructureTotalPairCell: React.FC<{ current: number; next: number; currentOnly?: boolean }> = ({ current, next, currentOnly }) => {
  const money = (amount: number) => (amount > 0 ? formatStructureBudget(amount) : '\u2014')
  return (
    <Styled.StructureCellPair>
      <Styled.StructureCellValue>
        <span className='structure-pair-budget'>{money(current)}</span>
      </Styled.StructureCellValue>
      {!currentOnly ? (
        <Styled.StructureCellValue>
          <span className='structure-pair-budget'>{money(next)}</span>
        </Styled.StructureCellValue>
      ) : null}
    </Styled.StructureCellPair>
  )
}

// Pivoted campaign-structure comparison: channels as sections, one row per platform. Each tactic
// (up to 3) + the Total is a single column; Current and Next are stacked inside each cell so the
// table fits the docked side panel. Status chips: Exists (running), New (to create),
// Paused (ending), Unpaused (reactivated).
const CampaignStructureTable: React.FC<{ currentOnly?: boolean; locationMode?: boolean }> = ({ currentOnly = false, locationMode = false }) => {
  const allSections = campaignStructurePivot()
  // When showing only the current plan, drop platforms that have no 2026 presence (2027-only rows).
  const sections = currentOnly
    ? allSections
        .map(section => ({
          ...section,
          platforms: section.platforms.filter(platform => platform.y2026.total > 0),
        }))
        .filter(section => section.platforms.length > 0)
    : allSections
  const money = (amount: number) => (amount > 0 ? formatStructureBudget(amount) : '\u2014')
  // Current = 2026 (active plan), Next = 2027 (closed-won plan). Labels pull the plan name + flight dates.
  const currentPlan = resolveMediaPlan('2026')
  const nextPlan = resolveMediaPlan('2027')
  const flight = (plan: { startDate: string; endDate: string }) =>
    `${formatDisplayDate(plan.startDate)} \u2013 ${formatDisplayDate(plan.endDate)}`
  // All channels start expanded; the channel header toggles its platform rows.
  const [collapsed, setCollapsed] = useState<string[]>([])
  const toggleChannel = (channel: string) =>
    setCollapsed(current =>
      current.includes(channel) ? current.filter(entry => entry !== channel) : [...current, channel],
    )
  return (
    <Styled.StructurePivot role='table' aria-label='Campaign structure current vs next'>
      {!currentOnly ? (
        <Styled.StructurePlanLabels>
          <Styled.StructurePlanLabel>
            <span className='structure-plan-tag'>Current</span>
            <span className='structure-plan-name'>{currentPlan.mediaPlanName}</span>
            <span className='structure-plan-dates'>{flight(currentPlan)}</span>
          </Styled.StructurePlanLabel>
          <Styled.StructurePlanLabel>
            <span className='structure-plan-tag'>Next</span>
            <span className='structure-plan-name'>{nextPlan.mediaPlanName}</span>
            <span className='structure-plan-dates'>{flight(nextPlan)}</span>
          </Styled.StructurePlanLabel>
        </Styled.StructurePlanLabels>
      ) : null}
      {sections.map(section => {
        // Only the section's real tactics render; the middle span is shared across sections (fixed
        // Platform + Total columns on either side), and the tactics split that span equally — one
        // tactic fills it, three split it into thirds. No blank placeholder columns.
        const tactics = section.tacticColumns
        const isCollapsed = collapsed.includes(section.channel)
        // Channel-level budget: sum of each platform per-year totals.
        const channel2026 = section.platforms.reduce((sum, platform) => sum + platform.y2026.total, 0)
        const channel2027 = section.platforms.reduce((sum, platform) => sum + platform.y2027.total, 0)
        return (
          <Styled.StructureSection key={section.channel}>
            <Styled.StructureChannelRow
              type='button'
              aria-expanded={!isCollapsed}
              onClick={() => toggleChannel(section.channel)}
            >
              <Styled.StructureChannelLabel>
                <AssistantSectionCaret expanded={!isCollapsed}>
                  <Icon name='caretDown' width={10} height={10} color={colors.cloud_80} />
                </AssistantSectionCaret>
                {section.channel}
              </Styled.StructureChannelLabel>
              <Styled.StructureChannelBudget>
                <span>
                  {!currentOnly ? <span className='structure-channel-budget-tag'>Current</span> : null}
                  {money(channel2026)}
                </span>
                {!currentOnly ? (
                  <span>
                    <span className='structure-channel-budget-tag'>Next</span>
                    {money(channel2027)}
                  </span>
                ) : null}
              </Styled.StructureChannelBudget>
            </Styled.StructureChannelRow>
            {isCollapsed ? null : (
              <>
                <Styled.StructureGroupHeader>
                  <div className='structure-col-platform'>Platform</div>
                  <Styled.StructureTacticGroup $tactics={tactics.length} className='structure-tactics-head'>
                    {tactics.map((label, index) => (
                      <div key={`group-${index}`}>{label}</div>
                    ))}
                  </Styled.StructureTacticGroup>
                  <div className='structure-col-total'>Total</div>
                </Styled.StructureGroupHeader>
                <Styled.StructureSubHeader>
                  <div className='structure-col-platform' aria-hidden='true' />
                  <Styled.StructureTacticGroup $tactics={tactics.length} className='structure-tactics-sub'>
                    {tactics.map((label, index) => (
                      <div key={`subgroup-${index}`}>
                        {!currentOnly ? <span>Current</span> : null}
                        {!currentOnly ? <span>Next</span> : null}
                      </div>
                    ))}
                  </Styled.StructureTacticGroup>
                  <div className='structure-col-total'>
                    {!currentOnly ? <span>Current</span> : null}
                    {!currentOnly ? <span>Next</span> : null}
                  </div>
                </Styled.StructureSubHeader>
                {section.platforms.map(platform => (
                  <Styled.StructurePivotRow key={platform.platformId}>
                    <Styled.StructurePlatformName className='structure-col-platform'>
                      {platform.platformName}
                    </Styled.StructurePlatformName>
                    <Styled.StructureTacticGroup $tactics={tactics.length} className='structure-tactics-row'>
                      {tactics.map((label, index) => (
                        <div key={`cell-${index}`}>
                          <StructurePairCellView
                            current={platform.y2026.cells[index]}
                            next={platform.y2027.cells[index]}
                            currentOnly={currentOnly}
                            locationMode={locationMode}
                            platformId={platform.platformId}
                            tactic={label}
                          />
                        </div>
                      ))}
                    </Styled.StructureTacticGroup>
                    <div className='structure-col-total'>
                      <StructureTotalPairCell current={platform.y2026.total} next={platform.y2027.total} currentOnly={currentOnly} />
                    </div>
                  </Styled.StructurePivotRow>
                ))}
              </>
            )}
          </Styled.StructureSection>
        )
      })}
    </Styled.StructurePivot>
  )
}

// Flat per-property location table: Channel is the leading column (no channel accordion); each
// channel block has its own tactic column headers; every platform/tactic cell shows the US-coverage
// status chip (Exists/Paused/Missing, centered) + the location targeting value. Empty cells (no
// campaign for that platform/tactic) show a Missing chip. No per-platform/channel budget totals.
const PropertyLocationTable: React.FC = () => {
  const sections = campaignStructurePivot()
    .map(section => ({
      ...section,
      platforms: section.platforms.filter(platform => platform.y2026.total > 0),
    }))
    .filter(section => section.platforms.length > 0)

  return (
    <>
      {sections.map(section => {
        const tactics = section.tacticColumns
        return (
          <Styled.LocationTable key={section.channel} role='table' aria-label={`${section.channel} campaign setup`}>
            <thead>
              <tr>
                <th className='location-channel-col'>Channel</th>
                <th className='location-platform-col'>Platform</th>
                {tactics.map((label, index) => (
                  <th key={`th-${index}`} className='location-tactic-col'>
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.platforms.map((platform, rowIndex) => (
                <tr key={platform.platformId}>
                  {rowIndex === 0 ? (
                    <td className='location-channel' rowSpan={section.platforms.length}>
                      {section.channel}
                    </td>
                  ) : null}
                  <td className='location-platform'>{platform.platformName}</td>
                  {tactics.map((label, index) => {
                    const cell = platform.y2026.cells[index]
                    const result = usLocationStatusFor(platform.platformId, label)
                    // A platform/tactic with no 2026 campaign, or no location entry, is Missing.
                    const status = !cell ? 'missing' : result ? result.status : 'missing'
                    const locationLabel = shortTargetingLabel(result ? result.label : 'No US targeting')
                    const meta = STRUCTURE_CELL_META[status]
                    return (
                      <td key={`cell-${index}`} className='location-tactic-col'>
                        <Styled.LocationCell>
                          <Styled.StructureCellChip $tone={meta.tone}>{meta.label}</Styled.StructureCellChip>
                          <span className='location-value'>
                            <span className='location-value-label'>Targeting:</span> {locationLabel}
                          </span>
                        </Styled.LocationCell>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </Styled.LocationTable>
        )
      })}
    </>
  )
}

// Approx US-market spend = property budget x US-market %. Both are display strings
// ("$38,000" and "45%"); parse the digits, multiply, and reformat as a rounded $ string.
// Returns '' when either value is missing/unparseable.
const approxUsSpend = (budget?: string, usMarketPercent?: string): string => {
  if (!budget || !usMarketPercent) return ''
  const budgetValue = Number(budget.replace(/[^0-9.]/g, ''))
  const percentValue = Number(usMarketPercent.replace(/[^0-9.]/g, ''))
  if (!Number.isFinite(budgetValue) || !Number.isFinite(percentValue)) return ''
  const spend = Math.round((budgetValue * percentValue) / 100)
  return `$${spend.toLocaleString('en-US')}`
}

// Campaign setup: flat property accordion. The header's first line is just "Property: <name>";
// a second (smaller) line carries the plan + budget meta: Media plan, Media plan budget,
// Property split (the property budget), and Approx US market spend (budget x US-market %, a
// smaller derived figure). Expanding a property shows its channel-first location table.
const PropertyCampaignSetup: React.FC = () => {
  const mediaPlans = campaignFlowData.propertyMediaPlans
  const propertyInfo = campaignFlowData.propertyInfo ?? {}
  const items = mediaPlans.flatMap(plan =>
    plan.properties.map(property => ({
      property,
      mediaPlanName: plan.mediaPlanName,
      planBudget: plan.planBudget ?? '',
    })),
  )
  const [expanded, setExpanded] = useState<string[]>(() => (items.length > 0 ? [items[0].property] : []))
  const toggle = (property: string) =>
    setExpanded(current =>
      current.includes(property) ? current.filter(entry => entry !== property) : [...current, property],
    )
  return (
    <Styled.PropertySetupList>
      {items.map(({ property, mediaPlanName, planBudget }) => {
        const isExpanded = expanded.includes(property)
        const info = propertyInfo[property]
        const usSpend = approxUsSpend(info?.budget, info?.usMarketPercent)
        return (
          <Styled.PropertySetupSection key={property}>
            <Styled.PropertySetupHeader
              type='button'
              expanded={isExpanded}
              aria-expanded={isExpanded}
              onClick={() => toggle(property)}
            >
              <Styled.PropertyHeaderTitleRow>
                <AssistantSectionCaret expanded={isExpanded}>
                  <Icon name='caretDown' width={10} height={10} color={colors.cloud_80} />
                </AssistantSectionCaret>
                <span className='property-name'>Property: {property}</span>
              </Styled.PropertyHeaderTitleRow>
              <Styled.PropertyHeaderMeta>
                <span>
                  <Styled.PropertyFieldLabel>Media plan:</Styled.PropertyFieldLabel> {mediaPlanName}
                </span>
                {planBudget ? (
                  <span>
                    <Styled.PropertyFieldLabel>Plan budget:</Styled.PropertyFieldLabel> {planBudget}
                  </span>
                ) : null}
                {info ? (
                  <>
                    <span>
                      <Styled.PropertyFieldLabel>Property split:</Styled.PropertyFieldLabel> {info.budget}
                    </span>
                    {usSpend ? (
                      <span>
                        <Styled.PropertyFieldLabel>Approx US spend:</Styled.PropertyFieldLabel> {usSpend} ({info.usMarketPercent})
                      </span>
                    ) : null}
                  </>
                ) : null}
              </Styled.PropertyHeaderMeta>
            </Styled.PropertySetupHeader>
            {isExpanded ? (
              <Styled.PropertySetupBody>
                <PropertyLocationTable />
              </Styled.PropertySetupBody>
            ) : null}
          </Styled.PropertySetupSection>
        )
      })}
    </Styled.PropertySetupList>
  )
}

const MarketPlanTable: React.FC = () => (
  <Styled.FlowTable role='table' aria-label='Market focus media plan'>
    <Styled.FlowTableRow $variant='header' role='row'>
      <div role='columnheader'>Market</div>
      <div role='columnheader'>Platforms</div>
      <div role='columnheader'>Budget</div>
    </Styled.FlowTableRow>
    {conversation.marketFocus.marketPlan.map(row => (
      <Styled.FlowTableRow key={row.market} role='row'>
        <div role='cell'>{`${row.rank}. ${row.market}`}</div>
        <div role='cell'>
          <Styled.PlatformChipList>
            {conversation.marketFocus.allPlatformsPerMarket.map(platform => (
              <PlatformChip key={platform} chipKey={PLATFORM_KEY_BY_NAME[platform] ?? platform} label={platform} />
            ))}
          </Styled.PlatformChipList>
        </div>
        <div role='cell'>{row.budget}</div>
      </Styled.FlowTableRow>
    ))}
    <Styled.FlowTableRow $variant='total' role='row'>
      <div role='cell'>Total</div>
      <div role='cell' />
      <div role='cell'>{conversation.marketFocus.total}</div>
    </Styled.FlowTableRow>
  </Styled.FlowTable>
)

// ATI (Amadeus Travel Intelligence) growth-opportunity insight body. The Top Destination chart and
// the Available Properties table each sit in their OWN VisualWithActions card, so each exposes the
// standard hover actions (Download data + Full screen) per the project interaction-affordance rule.
// A source chip is shown beneath. Reads the active advertiser's atiInsight content live.
const AtiInsightResult: React.FC = () => {
  const insight = campaignFlowData.conversation.atiInsight
  return (
    <>
      <VisualWithActions
        title={insight.chartTitle}
        downloadFileName='ati-top-destination-demand.csv'
        getCsvRows={() => [
          ['Destination', 'LY demand', 'CY demand', 'CY vs LY'],
          ...insight.destinations.map(row => [row.destination, row.ly, row.cy, row.cyVsLy]),
        ]}
      >
        <Styled.AtiCard>
          <Styled.AtiChartTitle>{insight.chartTitle}</Styled.AtiChartTitle>
          <Styled.AtiLegend aria-hidden='true'>
            <Styled.AtiLegendItem>
              <Styled.AtiLegendSwatch $color={colors.sky_90} />
              LY
            </Styled.AtiLegendItem>
            <Styled.AtiLegendItem>
              <Styled.AtiLegendSwatch $color={colors.sky_40} />
              CY
            </Styled.AtiLegendItem>
            <Styled.AtiLegendItem>
              <Styled.AtiLegendSwatch $color='#9240cc' $line />
              CY vs LY
            </Styled.AtiLegendItem>
          </Styled.AtiLegend>
          <AtiTopDestinationChart insight={insight} />
        </Styled.AtiCard>
      </VisualWithActions>

      <AssistantBodyText>{insight.propertiesIntro}</AssistantBodyText>
      <VisualWithActions
        title={insight.propertiesTableTitle}
        downloadFileName='ati-available-properties.csv'
        getCsvRows={() => [
          ['Destination', insight.propertiesTableTitle],
          ...insight.destinations.map(row => [row.destination, row.property ?? '']),
        ]}
      >
        <Styled.AtiCard>
          <Styled.AtiChartTitle>{insight.propertiesTableTitle}</Styled.AtiChartTitle>
          <Styled.AtiPropertiesTable role='table' aria-label={insight.propertiesTableTitle}>
            <Styled.AtiPropertiesRow $header role='row'>
              <div role='columnheader'>Destination</div>
              <div role='columnheader'>{insight.propertiesTableTitle}</div>
            </Styled.AtiPropertiesRow>
            {insight.destinations.map(row => (
              <Styled.AtiPropertiesRow key={row.destination} role='row'>
                <div role='cell'>{row.destination}</div>
                <div role='cell'>{row.property ?? '—'}</div>
              </Styled.AtiPropertiesRow>
            ))}
          </Styled.AtiPropertiesTable>
        </Styled.AtiCard>
      </VisualWithActions>
    </>
  )
}

const SuccessCard: React.FC<{ title: string; subtitle?: string; linkLabel: string }> = ({
  title,
  subtitle,
  linkLabel,
}) => (
  <AssistantSuccessStateCard role='status'>
    <AssistantSuccessStateIconWrap>
      <Icon name='check' width={12} height={12} color={colors.forest_60} />
    </AssistantSuccessStateIconWrap>
    <div>
      <AssistantSuccessStateTitle>{title}</AssistantSuccessStateTitle>
      {subtitle ? <AssistantSuccessStateText>{subtitle}</AssistantSuccessStateText> : null}
      <Styled.FlowSuccessLink type='button'>{linkLabel}</Styled.FlowSuccessLink>
    </div>
  </AssistantSuccessStateCard>
)

const CampaignGroups: React.FC<{ summary: CampaignLaunchSummary[] }> = ({ summary }) => {
  const [expanded, setExpanded] = useState<string[]>([])
  return (
    <>
      {summary.map(entry => {
        const isExpanded = expanded.includes(entry.platform)
        return (
          <Styled.FlowCampaignGroup key={entry.platform}>
            <Styled.FlowCampaignGroupHeader
              type='button'
              aria-expanded={isExpanded}
              onClick={() =>
                setExpanded(current =>
                  isExpanded ? current.filter(platform => platform !== entry.platform) : [...current, entry.platform],
                )
              }
            >
              <AssistantSectionCaret expanded={isExpanded}>
                <Icon name='caretDown' width={10} height={10} color={colors.cloud_70} />
              </AssistantSectionCaret>
              <PlatformChip chipKey={entry.key} label={entry.platform} />
              <span>{`${entry.campaigns.length} campaign${entry.campaigns.length === 1 ? '' : 's'}`}</span>
            </Styled.FlowCampaignGroupHeader>
            {isExpanded ? (
              <Styled.FlowCampaignList>
                {entry.campaigns.map(campaign => (
                  <li key={campaign}>{campaign}</li>
                ))}
              </Styled.FlowCampaignList>
            ) : null}
          </Styled.FlowCampaignGroup>
        )
      })}
    </>
  )
}

// 'Create campaigns with Max' first step: advertiser picker + Confirm. The picker is lazy-loaded (it pulls
// in the Advertisers GraphQL client); the feedback row / sources only appear once the user has confirmed,
// so later content stays gated behind the Confirm (see ai-response-structure: inline action gates).
const AdvertiserSelectBlock: React.FC<{ block: FlowBlock; fullWidth: boolean; actionsDisabled: boolean }> = ({
  block,
  fullWidth,
  actionsDisabled,
}) => {
  const { advertiserConfirmed } = useCampaignFlowState()
  return (
    <>
      <React.Suspense fallback={null}>
        <AdvertiserSelectCard fullWidth={fullWidth} actionsDisabled={actionsDisabled} />
      </React.Suspense>
      {advertiserConfirmed ? (
        <ResponseActionBar sources={SOURCES[block.kind]} timestamp={block.timestamp} fullWidth={fullWidth} />
      ) : null}
    </>
  )
}

// 'Create campaigns with Max' second step: which media plan to create campaigns for. Same gating as above.
const MediaPlanSelectBlock: React.FC<{ block: FlowBlock; fullWidth: boolean; actionsDisabled: boolean }> = ({
  block,
  fullWidth,
  actionsDisabled,
}) => {
  const { mediaPlanConfirmed } = useCampaignFlowState()
  return (
    <>
      <React.Suspense fallback={null}>
        <MediaPlanSelectCard fullWidth={fullWidth} actionsDisabled={actionsDisabled} />
      </React.Suspense>
      {mediaPlanConfirmed ? (
        <ResponseActionBar sources={SOURCES[block.kind]} timestamp={block.timestamp} fullWidth={fullWidth} />
      ) : null}
    </>
  )
}

const FlowBlockView: React.FC<{ block: FlowBlock; isLatest: boolean; fullWidth: boolean }> = ({
  block,
  isLatest,
  fullWidth,
}) => {
  const [detailsExpanded, setDetailsExpanded] = useState(true)
  const [lastAction, setLastAction] = useState<string | null>(null)
  // 'Create campaigns for another advertiser?' (end of the Max flow started from Campaign Setup).
  const [anotherAdvertiserAnswer, setAnotherAdvertiserAnswer] = useState<'no' | null>(null)
  // Selected option in the 'us-growth-options' radio list (null until the user picks one).
  const [selectedUsGrowthPrompt, setSelectedUsGrowthPrompt] = useState<string | null>(
    () => US_GROWTH_ACTIONS.find(action => action.recommended)?.prompt ?? null,
  )
  // Selected plan in the 'us-current-plan-picker' (defaults to the active plan).
  const [selectedCurrentPlan, setSelectedCurrentPlan] = useState<string | null>(
    () =>
      campaignFlowData.propertyMediaPlans.find(plan => plan.status === 'active')?.mediaPlanName ??
      campaignFlowData.propertyMediaPlans[0]?.mediaPlanName ??
      null,
  )
  const {
    aiWorkspaceMode,
    useClosedWonMediaPlanScope,
    selectedMediaPlanYear,
    closedWonSetupPhase,
    closedWonPlatformId,
    closedWonCreatedPlatformIds,
    campaignInfoConfirmed,
    closedWonPlatformSplitConfirmed,
    closedWonCreatingPlatformId,
    campaignSummary,
    usPushPlanCreated,
    usCurrentPlanEdit,
    usAddTargetingConfirmed,
    advertiserConfirmed,
  } = useCampaignFlowState()
  const animating = !block.revealed
  const actionsDisabled = !isLatest
  // Submit the chosen US-growth option. "Create US Push campaign" loads the full campaign-create
  // flow seeded with the current plan's platforms; the other options post a quick acknowledgement.
  const submitUsGrowthChoice = (prompt: string | null) => {
    const action = US_GROWTH_ACTIONS.find(entry => entry.prompt === prompt)
    if (!action) return
    if (action.newPlan) {
      // Propose a net-new media plan first; campaigns are created after the plan is confirmed.
      startUsPushPlanProposal(action.prompt)
      return
    }
    if (action.currentPlan) {
      // Ask which existing plan to add the US campaigns to, then run the create flow in edit mode.
      startUsCurrentPlanPicker(action.prompt)
      return
    }
    if (action.addTargeting) {
      // Add US to the existing campaigns' targeting (step 1), then offer to create the missing ones.
      startUsAddTargeting(action.prompt)
      return
    }
    if (action.createsCampaign) {
      startClosedWonCampaignCreation(action.prompt)
      return
    }
    startUsGrowthAction(action.prompt)
  }
  const isClosedWonPlanView = block.kind === 'media-plan' && block.userPrompt?.startsWith('View media plan ')
  const isClosedWonCampaign = block.kind === 'create-campaign' && useClosedWonMediaPlanScope
  // Active media plan (2026 or default 2027) for this view/flow.
  const activePlan = resolveMediaPlan(selectedMediaPlanYear)
  const closedWonPlatforms = closedWonMediaPlanPlatforms(undefined, undefined, activePlan.mediaPlanTable)
  const closedWonPlatformName = campaignFlowData.platforms.find(platform => platform.id === closedWonPlatformId)?.name
  // Step 11 — currently-live platforms NOT in the new plan, to pause platform by platform.
  const inPlanPlatformIds = new Set(closedWonPlatforms.map(platform => platform.id))
  const closedWonPausePlatforms = normalizePlatforms().filter(
    platform => !inPlanPlatformIds.has(platform.id) && platformCurrentStatusFor(platform.id) === 'live',
  )
  // Final summary: counts + the platforms involved in each outcome, for a 3-line completion summary.
  // Created = 'new' lifecycle, Updated = 'update' lifecycle (both from created campaigns); Paused =
  // the out-of-plan platforms' Brand/Generic campaigns.
  const formatPlatformList = (names: string[]) => {
    const unique = [...new Set(names)]
    if (unique.length === 0) return ''
    if (unique.length === 1) return unique[0]
    return `${unique.slice(0, -1).join(', ')} and ${unique[unique.length - 1]}`
  }
  let newlyCreatedCount = 0
  let updatedCount = 0
  const createdPlatformNames: string[] = []
  const updatedPlatformNames: string[] = []
  campaignSummary.forEach(entry => {
    entry.campaigns.forEach(name => {
      const status = campaignStatusFor(name)
      if (status === 'new') {
        newlyCreatedCount += 1
        createdPlatformNames.push(entry.platform)
      } else if (status === 'update') {
        updatedCount += 1
        updatedPlatformNames.push(entry.platform)
      }
    })
  })
  const pausedCampaignNames = closedWonPausePlatforms.flatMap(platform => closedWonCampaignsToPause(platform.id))
  const pausedCount = pausedCampaignNames.length
  const pausedPlatformNames = closedWonPausePlatforms.map(platform => platform.name)
  useEffect(() => {
    if (block.revealed) setDetailsExpanded(false)
  }, [block.revealed])

  const detailLines =
    block.kind === 'create-campaign' && block.revealed ? conversation.createCampaign.detailSteps : block.steps
  const summary = block.summary ?? []
  const total = totalCampaigns(summary)

  const renderResult = () => {
    switch (block.kind) {
      case 'campaign-setup':
        return (
          <>
            <AssistantBodyText>
              {`Here is the current campaign setup for ${campaignFlowData.basicInfo.advertiser}, showing campaigns based on location targeting.`}
            </AssistantBodyText>
            <VisualWithActions
              title='Current campaign setup'
              downloadFileName='campaign-setup-current.csv'
              getCsvRows={() => {
                const label = (status: string) =>
                  status === 'exists' ? 'Active' : status === 'paused' ? 'Paused' : status === 'none' ? '' : status
                const money = (amount: number) => (amount > 0 ? formatStructureBudget(amount) : '')
                const structureRows = campaignStructureComparison().filter(row => row.budget2026 > 0 || row.status2026 !== 'none')
                // One block of structure rows per property, grouped under its media plan.
                return [
                  ['Media plan', 'Property', 'Channel', 'Platform', 'Tactic', 'Status', 'Budget'],
                  ...campaignFlowData.propertyMediaPlans.flatMap(plan =>
                    plan.properties.flatMap(property =>
                      structureRows.map(row => [
                        plan.mediaPlanName,
                        property,
                        row.channel,
                        row.platformName,
                        row.tactic,
                        label(row.status2026),
                        money(row.budget2026),
                      ]),
                    ),
                  ),
                ]
              }}
            >
              <PropertyCampaignSetup />
            </VisualWithActions>
            <AssistantReportButtons $row={fullWidth}>
              <AssistantReportButton
                type='button'
                $variant='primary'
                disabled={actionsDisabled}
                onClick={() => startUsGrowthOptions(BOOST_US_PROMPT)}
              >
                Boost US market
              </AssistantReportButton>
            </AssistantReportButtons>
            <ResponseActionBar sources={SOURCES[block.kind]} timestamp={block.timestamp} fullWidth={fullWidth} />
          </>
        )
      case 'us-growth-options':
        return (
          <>
            <AssistantBodyText>
              You can boost the US market in a few different ways. How would you like to proceed?
            </AssistantBodyText>
            <Styled.UsGrowthOptionList role='radiogroup' aria-label='Ways to boost the US market'>
              {US_GROWTH_ACTIONS.map(action => {
                const isSelected = selectedUsGrowthPrompt === action.prompt
                return (
                  <Styled.UsGrowthOption
                    key={action.prompt}
                    type='button'
                    role='radio'
                    aria-checked={isSelected}
                    selected={isSelected}
                    disabled={actionsDisabled}
                    onClick={() => setSelectedUsGrowthPrompt(action.prompt)}
                  >
                    <span className='us-growth-option-radio' aria-hidden='true' />
                    <Styled.UsGrowthOptionBody>
                      <Styled.UsGrowthOptionTitleRow>
                        <Styled.UsGrowthOptionTitle>{action.title}</Styled.UsGrowthOptionTitle>
                        {action.recommended ? (
                          <Styled.UsGrowthOptionRecommended>Recommended</Styled.UsGrowthOptionRecommended>
                        ) : null}
                      </Styled.UsGrowthOptionTitleRow>
                      <Styled.UsGrowthOptionDescription>{action.description}</Styled.UsGrowthOptionDescription>
                    </Styled.UsGrowthOptionBody>
                  </Styled.UsGrowthOption>
                )
              })}
            </Styled.UsGrowthOptionList>
            <AssistantReportButtons $row={fullWidth}>
              <AssistantReportButton
                type='button'
                $variant='primary'
                disabled={actionsDisabled || !selectedUsGrowthPrompt}
                onClick={() => submitUsGrowthChoice(selectedUsGrowthPrompt)}
              >
                Submit
              </AssistantReportButton>
            </AssistantReportButtons>
            <ResponseActionBar sources={SOURCES[block.kind]} timestamp={block.timestamp} fullWidth={fullWidth} />
          </>
        )
      case 'us-push-plan': {
        const usPushPlan = resolveMediaPlan('us-push')
        // Proposal stays in the conversation after creation. Once the plan is created the CTAs are
        // disabled (the success + "Create campaigns" appear as a new block below), so the plan table
        // is never replaced. CTAs are also disabled on non-latest turns.
        const planCtasDisabled = actionsDisabled || usPushPlanCreated
        return (
          <>
            <AssistantBodyText>
              First, let&apos;s create a media plan for the US Push. Here is the proposed plan — a focused 6-month
              plan with its own budget, on top of your current plans.
            </AssistantBodyText>
            <AssistantBodyText>{usPushPlan.mediaPlanIntro}</AssistantBodyText>
            <VisualWithActions
              title={`${usPushPlan.mediaPlanName} — budget allocation`}
              downloadFileName='us-push-media-plan.csv'
              getCsvRows={() => [
                ['Channel', 'Tactic', 'Platforms', 'Budget'],
                ...usPushPlan.mediaPlanTable.groups.flatMap(group =>
                  group.items.map(item => [group.channel, item.tactic, item.platforms.join(' / '), item.budget]),
                ),
                ['Added fees', '', '', usPushPlan.mediaPlanTable.fees],
                ['Total', '', '', usPushPlan.mediaPlanTable.total],
              ]}
            >
              <MediaPlanAllocationTable plan={usPushPlan} />
            </VisualWithActions>
            <AssistantReportButtons $row={fullWidth}>
              <AssistantReportButton type='button' $variant='primary' disabled={planCtasDisabled} onClick={() => confirmUsPushPlan()}>
                Create media plan
              </AssistantReportButton>
              <AssistantReportButton
                type='button'
                disabled={planCtasDisabled}
                onClick={() => startUsGrowthOptions(BOOST_US_PROMPT)}
              >
                Cancel
              </AssistantReportButton>
            </AssistantReportButtons>
            <ResponseActionBar sources={SOURCES[block.kind]} timestamp={block.timestamp} fullWidth={fullWidth} />
          </>
        )
      }
      case 'us-push-plan-created': {
        const usPushPlan = resolveMediaPlan('us-push')
        return (
          <>
            <SuccessCard
              title={`${usPushPlan.mediaPlanName} created`}
              subtitle={`${usPushPlan.mediaPlanTable.total} over 6 months, dedicated to the US feeder market.`}
              linkLabel='View media plan'
            />
            <AssistantBodyText>
              The new media plan is in place. Next, let&apos;s create the US Push campaigns across its platforms.
            </AssistantBodyText>
            <AssistantReportButtons $row={fullWidth}>
              <AssistantReportButton
                type='button'
                $variant='primary'
                disabled={actionsDisabled}
                onClick={() => startClosedWonCampaignCreation(`Create campaign for plan ${usPushPlan.mediaPlanName}`)}
              >
                Create campaigns
              </AssistantReportButton>
            </AssistantReportButtons>
            <ResponseActionBar sources={SOURCES[block.kind]} timestamp={block.timestamp} fullWidth={fullWidth} />
          </>
        )
      }
      case 'media-plan-select':
        return <MediaPlanSelectBlock block={block} fullWidth={fullWidth} actionsDisabled={actionsDisabled} />
      case 'advertiser-select':
        return <AdvertiserSelectBlock block={block} fullWidth={fullWidth} actionsDisabled={actionsDisabled} />
      case 'us-current-plan-picker': {
        const plans = campaignFlowData.propertyMediaPlans
        const launchForPlan = (planName: string) => {
          const plan = plans.find(entry => entry.mediaPlanName === planName)
          // Map the picked plan to its year so the create flow scopes to it (Always-On=2026,
          // 6-Month Promotion=2027). The prompt carries the year for startClosedWonCampaignCreation.
          const year = plan?.status === 'scheduled' ? '2027' : '2026'
          startClosedWonCampaignCreation(`Create campaign for plan ${planName} ${year}`, { usCurrentPlanEdit: true })
        }
        return (
          <>
            <AssistantBodyText>
              You have two media plans for this advertiser. Which one would you like to add the US campaigns to?
            </AssistantBodyText>
            <Styled.UsGrowthOptionList role='radiogroup' aria-label='Select a media plan'>
              {plans.map(plan => {
                const isSelected = selectedCurrentPlan === plan.mediaPlanName
                const statusLabel = plan.status === 'active' ? 'Active' : 'Scheduled'
                const dates =
                  plan.startDate && plan.endDate
                    ? `${formatDisplayDate(plan.startDate)} → ${formatDisplayDate(plan.endDate)}`
                    : ''
                return (
                  <Styled.UsGrowthOption
                    key={plan.mediaPlanName}
                    type='button'
                    role='radio'
                    aria-checked={isSelected}
                    selected={isSelected}
                    disabled={actionsDisabled}
                    onClick={() => setSelectedCurrentPlan(plan.mediaPlanName)}
                  >
                    <span className='us-growth-option-radio' aria-hidden='true' />
                    <Styled.UsGrowthOptionBody>
                      <Styled.UsGrowthOptionTitleRow>
                        <Styled.UsGrowthOptionTitle>{plan.mediaPlanName}</Styled.UsGrowthOptionTitle>
                        {plan.status === 'active' ? (
                          <Styled.UsGrowthOptionRecommended>{statusLabel}</Styled.UsGrowthOptionRecommended>
                        ) : (
                          <Styled.PlanPickerStatusTag>{statusLabel}</Styled.PlanPickerStatusTag>
                        )}
                      </Styled.UsGrowthOptionTitleRow>
                      <Styled.UsGrowthOptionDescription>
                        {`Flight ${dates} · Total budget ${plan.planBudget ?? '—'} · Spend ${plan.spend ?? '—'}`}
                      </Styled.UsGrowthOptionDescription>
                    </Styled.UsGrowthOptionBody>
                  </Styled.UsGrowthOption>
                )
              })}
            </Styled.UsGrowthOptionList>
            <AssistantReportButtons $row={fullWidth}>
              <AssistantReportButton
                type='button'
                $variant='primary'
                disabled={actionsDisabled || !selectedCurrentPlan}
                onClick={() => selectedCurrentPlan && launchForPlan(selectedCurrentPlan)}
              >
                Continue
              </AssistantReportButton>
            </AssistantReportButtons>
            <ResponseActionBar sources={SOURCES[block.kind]} timestamp={block.timestamp} fullWidth={fullWidth} />
          </>
        )
      }
      case 'us-add-targeting': {
        const missingCampaigns = usAddTargetingMissingTactics('2026')
        return (
          <>
            <AssistantBodyText>
              I&apos;ll add the US to the targeting of your existing campaigns that don&apos;t reach it yet.
            </AssistantBodyText>
            <UsAddTargetingCard />
            {/* Step 2: once the targeting updates are confirmed, offer to create the missing campaigns. */}
            {usAddTargetingConfirmed && missingCampaigns.length > 0 ? (
              <>
                <AssistantBodyText>
                  {`${missingCampaigns.length} platform/tactic combination${
                    missingCampaigns.length === 1 ? '' : 's'
                  } have no campaign yet (e.g. ${missingCampaigns
                    .slice(0, 3)
                    .map(entry => `${entry.platformName} — ${entry.tactic}`)
                    .join(', ')}${missingCampaigns.length > 3 ? '…' : ''}). Create them as new US-only campaigns?`}
                </AssistantBodyText>
                <AssistantReportButtons $row={fullWidth}>
                  <AssistantReportButton
                    type='button'
                    $variant='primary'
                    disabled={actionsDisabled}
                    onClick={() =>
                      startClosedWonCampaignCreation('Create campaign for plan Always-On 2026', {
                        usAddMissingOnly: true,
                      })
                    }
                  >
                    Create missing campaigns
                  </AssistantReportButton>
                  <AssistantReportButton
                    type='button'
                    $variant='secondary'
                    disabled={actionsDisabled}
                    onClick={() => setLastAction('skip-missing')}
                  >
                    Not now
                  </AssistantReportButton>
                </AssistantReportButtons>
                {lastAction === 'skip-missing' ? (
                  <AssistantBodyText>No problem — the missing campaigns were left as-is.</AssistantBodyText>
                ) : null}
              </>
            ) : null}
            <ResponseActionBar sources={SOURCES[block.kind]} timestamp={block.timestamp} fullWidth={fullWidth} />
          </>
        )
      }
      case 'us-growth-action':
        return (
          <>
            <AssistantBodyText>{usGrowthActionAck(block.userPrompt)}</AssistantBodyText>
            <ResponseActionBar sources={SOURCES[block.kind]} timestamp={block.timestamp} fullWidth={fullWidth} />
          </>
        )
      case 'ati-insight': {
        const insight = campaignFlowData.conversation.atiInsight
        return (
          <>
            <AssistantBodyText>{insight.intro}</AssistantBodyText>
            <AtiInsightResult />
            <AssistantReportButtons $row={fullWidth}>
              {/* Primary CTA first (left): Show Campaign Setup; then the secondary one. */}
              <AssistantReportButton
                type='button'
                $variant='primary'
                disabled={actionsDisabled}
                onClick={() => runCampaignFlowStage('campaign-setup', insight.primaryActions[1])}
              >
                {insight.primaryActions[1]}
              </AssistantReportButton>
              <AssistantReportButton
                type='button'
                $variant='secondary'
                disabled={actionsDisabled}
                onClick={() => runCampaignFlowStage('market-focus', insight.primaryActions[0])}
              >
                {insight.primaryActions[0]}
              </AssistantReportButton>
            </AssistantReportButtons>
            <ResponseActionBar sources={SOURCES[block.kind]} timestamp={block.timestamp} fullWidth={fullWidth} />
          </>
        )
      }
      case 'campaign-structure':
        return (
          <>
            <AssistantBodyText>{conversation.campaignStructure.intro}</AssistantBodyText>
            <VisualWithActions
              title='Campaign structure — 2026 vs 2027'
              downloadFileName='campaign-structure-2026-vs-2027.csv'
              getCsvRows={() => {
                const label = (status: string) =>
                  status === 'exists'
                    ? 'Exists'
                    : status === 'added'
                      ? 'New'
                      : status === 'paused'
                        ? 'Paused'
                        : status === 'unpaused'
                          ? 'Unpaused'
                          : '—'
                const money = (amount: number) => (amount > 0 ? formatStructureBudget(amount) : '')
                return [
                  ['Channel', 'Platform', 'Tactic', '2026 status', '2026 budget', '2027 status', '2027 budget'],
                  ...campaignStructureComparison().map(row => [
                    row.channel,
                    row.platformName,
                    row.tactic,
                    label(row.status2026),
                    money(row.budget2026),
                    label(row.status2027),
                    money(row.budget2027),
                  ]),
                ]
              }}
            >
              <CampaignStructureTable />
            </VisualWithActions>
            <AssistantBodyText>
              {`Would you like to continue to campaign setup for the next media plan — ${resolveMediaPlan('2027').mediaPlanName}?`}
            </AssistantBodyText>
            <AssistantReportButtons $row={fullWidth}>
              <AssistantReportButton
                type='button'
                disabled={actionsDisabled}
                $variant='primary'
                onClick={() =>
                  startClosedWonCampaignCreation(`Create campaign for plan ${resolveMediaPlan('2027').mediaPlanName}`)
                }
              >
                Create/update campaigns
              </AssistantReportButton>
            </AssistantReportButtons>
            <ResponseActionBar sources={SOURCES[block.kind]} timestamp={block.timestamp} fullWidth={fullWidth} />
          </>
        )
      case 'media-plan':
        return (
          <>
            {isClosedWonPlanView ? (
              <AssistantBodyText>
                {`The closed-won media plan - ${block.userPrompt?.slice('View media plan '.length) ?? ''} for Amadeus Hotels is here.`}
              </AssistantBodyText>
            ) : (
              <>
                <AssistantBodyText>{activePlan.mediaPlanIntro}</AssistantBodyText>
                <AssistantBodyText>Here is your Media plan</AssistantBodyText>
                <MediaPlanTable table={activePlan.mediaPlanTable} />
              </>
            )}
            {isClosedWonPlanView ? (
              <>
                <Styled.PlanSummaryCards data-testid='closed-won-plan-summary-cards'>
                  <Styled.PlanSummaryCard data-testid='closed-won-contract-budget-card'>
                    <Styled.PlanSummaryLabel>Contract budget</Styled.PlanSummaryLabel>
                    <Styled.PlanSummaryValue>{activePlan.mediaPlanTable.total}</Styled.PlanSummaryValue>
                  </Styled.PlanSummaryCard>
                  <Styled.PlanSummaryCard data-testid='closed-won-fees-card'>
                    <Styled.PlanSummaryLabel>Fees</Styled.PlanSummaryLabel>
                    <Styled.PlanSummaryValue>{activePlan.mediaPlanTable.fees}</Styled.PlanSummaryValue>
                  </Styled.PlanSummaryCard>
                  <Styled.PlanSummaryCard data-testid='closed-won-margin-card'>
                    <Styled.PlanSummaryLabel>Amadeus Margin</Styled.PlanSummaryLabel>
                    <Styled.PlanSummaryValue>28%</Styled.PlanSummaryValue>
                  </Styled.PlanSummaryCard>
                </Styled.PlanSummaryCards>
                {/* The media plan allocation table renders inline below the cards (no canvas). */}
                <VisualWithActions
                  title={`Media plan budget allocation for ${activePlan.year}`}
                  downloadFileName={`media-plan-allocation-${activePlan.year}.csv`}
                  getCsvRows={() => [
                    ['Channel / Platform / Tactic', 'Annual total'],
                    ...activePlan.mediaPlanTable.groups.map(group => [group.channel, group.subtotal]),
                    ['Added fees', activePlan.mediaPlanTable.fees],
                    ['Total', activePlan.mediaPlanTable.total],
                  ]}
                >
                  <MediaPlanAllocationTable plan={activePlan} />
                </VisualWithActions>
              </>
            ) : null}
            <ResponseActionBar sources={SOURCES[block.kind]} timestamp={block.timestamp} fullWidth={fullWidth} />
            <AssistantReportCtaText>I can help you with the following:</AssistantReportCtaText>
            {isClosedWonPlanView ? (
              <AssistantReportButtons $row={fullWidth}>
                {/* 2026 plan: campaigns already exist, so only offer to view the setup (no create). */}
                {activePlan.year !== '2026' ? (
                  <AssistantReportButton
                    type='button'
                    $variant='primary'
                    disabled={actionsDisabled}
                    onClick={() =>
                      startClosedWonCampaignCreation(
                        `Create campaign for plan ${block.userPrompt?.slice('View media plan '.length) ?? ''}`,
                      )
                    }
                  >
                    Create campaign
                  </AssistantReportButton>
                ) : null}
                <AssistantReportButton
                  type='button'
                  $variant={activePlan.year === '2026' ? 'primary' : 'secondary'}
                  disabled={actionsDisabled}
                  onClick={() => startCampaignStructureView('View existing campaign structure for Amadeus Hotels')}
                >
                  View campaign setup
                </AssistantReportButton>
              </AssistantReportButtons>
            ) : (
              <AssistantReportButtons $row={fullWidth}>
                <AssistantReportButton
                  type='button'
                  $variant='primary'
                  disabled={actionsDisabled}
                  onClick={() => runCampaignFlowStage('create-media-plan', conversation.primaryActions[0])}
                >
                  {conversation.primaryActions[0]}
                </AssistantReportButton>
                <AssistantReportButton
                  type='button'
                  $variant='secondary'
                  disabled={actionsDisabled}
                  onClick={() => runCampaignFlowStage('market-focus', conversation.primaryActions[1])}
                >
                  {conversation.primaryActions[1]}
                </AssistantReportButton>
              </AssistantReportButtons>
            )}
          </>
        )
      case 'market-focus':
        return (
          <>
            <AssistantBodyText>{conversation.marketFocus.intro}</AssistantBodyText>
            <MarketPlanTable />
            <AssistantBodyText>{conversation.marketFocus.closing}</AssistantBodyText>
            <AssistantReportButtons $row={fullWidth}>
              <AssistantReportButton
                type='button'
                $variant='primary'
                disabled={actionsDisabled}
                onClick={() => runCampaignFlowStage('create-media-plan', conversation.primaryActions[0])}
              >
                {conversation.primaryActions[0]}
              </AssistantReportButton>
            </AssistantReportButtons>
            <ResponseActionBar sources={SOURCES[block.kind]} timestamp={block.timestamp} fullWidth={fullWidth} />
          </>
        )
      case 'create-media-plan':
        return (
          <>
            <SuccessCard
              title={conversation.createMediaPlan.successTitle}
              subtitle={conversation.createMediaPlan.successSubtitle}
              linkLabel='View media plan'
            />
            <AssistantBodyText>{conversation.createMediaPlan.closing}</AssistantBodyText>
            <AssistantReportButtons $row={fullWidth}>
              <AssistantReportButton
                type='button'
                $variant='primary'
                disabled={actionsDisabled}
                onClick={() => runCampaignFlowStage('create-campaign', conversation.createMediaPlan.nextAction)}
              >
                {conversation.createMediaPlan.nextAction}
              </AssistantReportButton>
            </AssistantReportButtons>
            <ResponseActionBar sources={SOURCES[block.kind]} timestamp={block.timestamp} fullWidth={fullWidth} />
          </>
        )
      case 'create-campaign':
        return isClosedWonCampaign ? (
          <>
            <AssistantBodyText>
              {`Let's set up the campaign for ${block.userPrompt?.replace(/^Create campaign for plan /, '') ?? 'this media plan'}.`}
            </AssistantBodyText>
            <InlineBasicInfoCard />
            {campaignInfoConfirmed ? (
              <>
                <AssistantBodyText>
                  Great, the campaign info is confirmed. Let&apos;s move on to creating the campaigns on the different
                  platforms.
                </AssistantBodyText>
                {closedWonPlatforms.map((platform, index) => {
                  const isCreated = closedWonCreatedPlatformIds.includes(platform.id)
                  const isActive = closedWonSetupPhase === 'platform-setup' && closedWonPlatformId === platform.id
                  // Render a card for every created platform and the current active one; keep them visible.
                  if (!isCreated && !isActive) return null
                  return (
                    <React.Fragment key={platform.id}>
                      {isActive && index > 0 ? (
                        <AssistantBodyText>Moving on to the next platform.</AssistantBodyText>
                      ) : null}
                      <PlatformSetupCard
                        platformId={platform.id}
                        position={index + 1}
                        total={closedWonPlatforms.length}
                      />
                    </React.Fragment>
                  )
                })}
                {closedWonSetupPhase === 'platform-setup' &&
                closedWonPlatformSplitConfirmed &&
                aiWorkspaceMode &&
                !closedWonCreatingPlatformId ? (
                  <>
                    <AssistantBodyText>
                      No campaigns will be created until you approve. Opening the campaign canvas for your review…
                    </AssistantBodyText>
                    <AssistantBodyText>
                      {`I've set up the campaigns for ${closedWonPlatformName ?? 'this platform'} in the canvas. Review each step and make any changes you'd like.`}
                    </AssistantBodyText>
                    <AssistantBodyText>
                      When you&apos;re ready, click <strong>Create campaigns</strong> on the Summary step.
                    </AssistantBodyText>
                  </>
                ) : null}
                {/* Split-by confirmation action lives outside the active card. */}
                {closedWonSetupPhase === 'platform-setup' && closedWonPlatformId && !closedWonPlatformSplitConfirmed ? (
                  <Styled.BasicInfoConfirmRow>
                    <Styled.BasicInfoConfirmHint>
                      {`Confirm the split for ${closedWonPlatformName ?? 'this platform'} to open the canvas and set up its campaigns.`}
                    </Styled.BasicInfoConfirmHint>
                    <Styled.BasicInfoConfirmButton
                      type='button'
                      onClick={() => confirmClosedWonPlatformSplit()}
                      data-testid={`platform-split-confirm-${closedWonPlatformId}`}
                    >
                      Confirm split
                    </Styled.BasicInfoConfirmButton>
                  </Styled.BasicInfoConfirmRow>
                ) : null}
                {closedWonSetupPhase === 'pause-review' || closedWonSetupPhase === 'complete' ? (
                  <>
                    {/* Final step. US Push: clean up the US in the OLD setup (pause Only-US / remove
                        US from markets+US). Other plans: pause out-of-plan live platforms. */}
                    {selectedMediaPlanYear === 'us-push' ? (
                      <>
                        <AssistantBodyText>
                          Final step: review how the existing campaigns are adjusted now that the new US Push plan owns
                          the US feeder market.
                        </AssistantBodyText>
                        <UsPushCleanupCard />
                      </>
                    ) : usCurrentPlanEdit ? (
                      <>
                        <AssistantBodyText>
                          Final step: a dedicated US ad group now covers the US in each campaign. Remove the US from the
                          original targeting so it is not served twice.
                        </AssistantBodyText>
                        <UsPushCleanupCard mode='current-plan' />
                      </>
                    ) : closedWonPausePlatforms.length > 0 ? (
                      <>
                        <AssistantBodyText>
                          Final step: {closedWonPausePlatforms.length} platform(s) are currently live but not part of
                          the new media plan. Confirm the campaigns to pause.
                        </AssistantBodyText>
                        <PauseCampaignsTable platforms={closedWonPausePlatforms} />
                      </>
                    ) : null}

                    {closedWonSetupPhase === 'complete' ? (
                      <>
                        <Styled.CompletionSummary role='status' data-testid='closed-won-final-alert'>
                          {newlyCreatedCount > 0 ? (
                            <Styled.CompletionSummaryRow>
                              <Icon
                                name='checkCircle'
                                width={16}
                                height={16}
                                color={colors.forest_60}
                                aria-hidden='true'
                              />
                              <span>
                                {`${newlyCreatedCount} campaign${newlyCreatedCount === 1 ? '' : 's'} created across platforms ${formatPlatformList(createdPlatformNames)}.`}
                              </span>
                            </Styled.CompletionSummaryRow>
                          ) : null}
                          {updatedCount > 0 ? (
                            <Styled.CompletionSummaryRow>
                              <Icon name='refresh' width={16} height={16} color={colors.sky_60} aria-hidden='true' />
                              <span>
                                {`${updatedCount} campaign${updatedCount === 1 ? '' : 's'} updated in platforms ${formatPlatformList(updatedPlatformNames)}.`}
                              </span>
                            </Styled.CompletionSummaryRow>
                          ) : null}
                          {pausedCount > 0 ? (
                            <Styled.CompletionSummaryRow>
                              <Icon
                                name='pauseCircle'
                                width={16}
                                height={16}
                                color={colors.pumpkin_60}
                                aria-hidden='true'
                              />
                              <span>
                                {`${pausedCount} campaign${pausedCount === 1 ? '' : 's'} paused in platforms ${formatPlatformList(pausedPlatformNames)}.`}
                              </span>
                            </Styled.CompletionSummaryRow>
                          ) : null}
                        </Styled.CompletionSummary>
                        <AssistantBodyText>Would you like to map the newly created campaigns?</AssistantBodyText>
                        <AssistantReportButtons $row={fullWidth}>
                          <AssistantReportButton
                            type='button'
                            $variant='primary'
                            disabled={actionsDisabled}
                            onClick={() => setLastAction('Campaign mapping')}
                          >
                            Campaign mapping
                          </AssistantReportButton>
                        </AssistantReportButtons>
                        {lastAction === 'Campaign mapping' ? (
                          <AssistantBodyText>
                            Campaign mapping requested — this is a prototype, so no mapping was performed.
                          </AssistantBodyText>
                        ) : null}
                        {/* Only when the flow was started from Campaign Setup (the advertiser was picked in Max). */}
                        {advertiserConfirmed ? (
                          <>
                            <AssistantBodyText>Would you like to create campaigns for another advertiser?</AssistantBodyText>
                            <AssistantReportButtons $row={fullWidth}>
                              <AssistantReportButton
                                type='button'
                                $variant='primary'
                                disabled={actionsDisabled}
                                data-testid='another-advertiser-yes'
                                // A fresh advertiser step: the previous campaigns are done, so start the flow over.
                                onClick={() => startAdvertiserSelection()}
                              >
                                Yes, another advertiser
                              </AssistantReportButton>
                              <AssistantReportButton
                                type='button'
                                $variant='secondary'
                                disabled={actionsDisabled || anotherAdvertiserAnswer === 'no'}
                                data-testid='another-advertiser-no'
                                onClick={() => setAnotherAdvertiserAnswer('no')}
                              >
                                No, I&apos;m done
                              </AssistantReportButton>
                            </AssistantReportButtons>
                            {anotherAdvertiserAnswer === 'no' ? (
                              <AssistantBodyText>
                                All set. Start again from <strong>Create campaigns with Max</strong> whenever you need more campaigns.
                              </AssistantBodyText>
                            ) : null}
                          </>
                        ) : null}
                        <ResponseActionBar
                          sources={SOURCES[block.kind]}
                          timestamp={block.timestamp}
                          fullWidth={fullWidth}
                        />
                      </>
                    ) : null}
                  </>
                ) : null}
              </>
            ) : null}
          </>
        ) : (
          <>
            {conversation.createCampaign.response.map((line, index) => (
              <AssistantBodyText key={line}>
                {index === conversation.createCampaign.response.length - 1 ? (
                  <>
                    When you&apos;re ready, click <strong>Launch campaign</strong> on the Summary step.
                  </>
                ) : (
                  line
                )}
              </AssistantBodyText>
            ))}
            <AssistantReportButtons $row={fullWidth}>
              <AssistantCampaignCanvasButton
                type='button'
                onClick={() => openCampaignWorkspace(conversation.createCampaign.workspaceTitle)}
              >
                Open campaign workspace
              </AssistantCampaignCanvasButton>
            </AssistantReportButtons>
            <ResponseActionBar sources={SOURCES[block.kind]} timestamp={block.timestamp} fullWidth={fullWidth} />
          </>
        )
      default:
        return (
          <>
            <SuccessCard
              title={fillTemplate(conversation.afterLaunch.successTitleTemplate, {
                total,
                platforms: summary.length,
              })}
              linkLabel='View campaign ↗'
            />
            <Styled.FlowSectionTitle>
              {fillTemplate(conversation.afterLaunch.changelogTitleTemplate, { total })}
            </Styled.FlowSectionTitle>
            <CampaignGroups summary={summary} />
            <Styled.FlowActionsRow data-testid='campaign-flow-launch-actions'>
              {conversation.afterLaunch.actions.map(action => (
                <AssistantReportButton
                  key={action}
                  type='button'
                  style={{ width: 'auto' }}
                  onClick={() => {
                    setLastAction(action)
                    if (action === 'Edit campaign') openCampaignWorkspace(conversation.afterLaunch.editWorkspaceTitle)
                  }}
                >
                  {action}
                </AssistantReportButton>
              ))}
            </Styled.FlowActionsRow>
            {lastAction && lastAction !== 'Edit campaign' ? (
              <AssistantBodyText>{`${lastAction} requested — this is a prototype, no campaigns were changed.`}</AssistantBodyText>
            ) : null}
            <Styled.FlowNextStep type='button'>
              <span>{conversation.afterLaunch.nextStepSuggestion}</span>
              <Icon name='chartLine' width={12} height={12} color={colors.sky_60} />
            </Styled.FlowNextStep>
            <ResponseActionBar sources={SOURCES[block.kind]} timestamp={block.timestamp} fullWidth={fullWidth} />
          </>
        )
    }
  }

  return (
    <AssistantTurn data-testid={`campaign-flow-${block.kind}`}>
      {block.userPrompt ? <PromptBubble prompt={block.userPrompt} timestamp={block.timestamp} /> : null}
      <AssistantContent>
        {block.kind === 'create-media-plan' ? (
          <AssistantBodyText>{renderRichText(conversation.createMediaPlan.intro)}</AssistantBodyText>
        ) : null}
        {block.steps.length > 0 ? (
          <>
            <AssistantSectionRow>
              <Icon name='sparkles' width={12} height={12} color={colors.violet_60} />
              <AssistantSectionCaret expanded={detailsExpanded}>
                <Icon name='caretDown' width={10} height={10} color={colors.cloud_70} />
              </AssistantSectionCaret>
              <AssistantSectionHeader
                type='button'
                aria-expanded={detailsExpanded}
                onClick={() => {
                  if (!animating) setDetailsExpanded(current => !current)
                }}
              >
                {block.kind === 'launch' ? 'Launch progress' : 'Analysis details'}
              </AssistantSectionHeader>
              {animating ? (
                <AssistantThinkingDots aria-label={`${conversation.assistantName} is working`}>
                  <span />
                  <span />
                  <span />
                </AssistantThinkingDots>
              ) : null}
            </AssistantSectionRow>
            <AssistantDetailsCard fullWidth={fullWidth} expanded={detailsExpanded}>
              <StepList
                steps={detailLines}
                completedSteps={block.revealed ? detailLines.length : block.completedSteps}
                animating={animating}
              />
            </AssistantDetailsCard>
          </>
        ) : null}
        {block.revealed ? renderResult() : null}
      </AssistantContent>
    </AssistantTurn>
  )
}

type CampaignFlowConversationProps = {
  fullWidth?: boolean
  onContentChange?: () => void
}

export const CampaignFlowConversation: React.FC<CampaignFlowConversationProps> = ({
  fullWidth = false,
  onContentChange,
}) => {
  const {
    blocks,
    campaignInfoConfirmed,
    closedWonSetupPhase,
    closedWonPlatformId,
    closedWonPlatformSplitConfirmed,
    closedWonCreatedPlatformIds,
    closedWonCreatingPlatformId,
    closedWonCreatedCampaignCount,
    closedWonPauseConfirmed,
    closedWonPausedCampaignCount,
    selectedMediaPlanYear,
    advertiserConfirmed,
    flowAdvertiser,
    mediaPlanConfirmed,
    flowMediaPlan,
  } = useCampaignFlowState()
  // Include closed-won setup state so the chat auto-scrolls when the inline flow advances
  // (confirming campaign info, confirming a platform split, creating a campaign, etc.).
  const signature = [
    blocks.map(block => `${block.id}:${block.completedSteps}:${block.revealed}`).join('|'),
    `confirmed:${campaignInfoConfirmed}`,
    `phase:${closedWonSetupPhase ?? ''}`,
    `platform:${closedWonPlatformId ?? ''}`,
    `split:${closedWonPlatformSplitConfirmed}`,
    `created:${closedWonCreatedPlatformIds.join(',')}`,
    `creating:${closedWonCreatingPlatformId ?? ''}:${closedWonCreatedCampaignCount}`,
    `pause:${closedWonPauseConfirmed}:${closedWonPausedCampaignCount}`,
    `advertiser:${advertiserConfirmed}:${flowAdvertiser?.bpid ?? ''}`,
    `mediaplan:${mediaPlanConfirmed}:${flowMediaPlan?.name ?? ''}`,
  ].join('||')

  useEffect(() => {
    if (blocks.length > 0) onContentChange?.()
  }, [signature])

  if (blocks.length === 0) return null

  return (
    <>
      {blocks.map((block, index) => (
        <FlowBlockView key={block.id} block={block} isLatest={index === blocks.length - 1} fullWidth={fullWidth} />
      ))}
    </>
  )
}

export default CampaignFlowConversation
