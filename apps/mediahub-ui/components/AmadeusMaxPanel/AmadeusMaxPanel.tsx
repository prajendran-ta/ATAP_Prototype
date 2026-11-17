import React, { useEffect, useRef, useState } from 'react'
import { Icon, colors } from '@amadeus/react-design-factory'
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
  AssistantContent,
  AssistantDetailsCard,
  AssistantDetailsHeading,
  AssistantErrorStateCard,
  AssistantErrorStateIconWrap,
  AssistantErrorStateText,
  AssistantErrorStateTitle,
  AssistantSuccessStateCard,
  AssistantSuccessStateIconWrap,
  AssistantSuccessStateText,
  AssistantSuccessStateTitle,
  AssistantDemandChart,
  AssistantDemandBar,
  AssistantDemandChartBarColumn,
  AssistantDemandChartBarFill,
  AssistantDemandChartBars,
  AssistantDemandDestinationGroup,
  AssistantDemandChartLabel,
  AssistantDemandChartLegend,
  AssistantDemandChartLegendItem,
  AssistantDemandChartLegendSwatch,
  AssistantDemandChartLineLayer,
  AssistantDemandChartPoint,
  AssistantDemandChartPointsLayer,
  AssistantDemandChartTitle,
  AssistantDemandChartValue,
  AssistantFullModalClose,
  AssistantFullModalDialog,
  AssistantFullModalHeader,
  AssistantFullModalActions,
  AssistantFullModalBody,
  AssistantFullModalDescription,
  AssistantFullModalPrimaryButton,
  AssistantFullModalSecondaryButton,
  AssistantFullModalTextArea,
  AssistantFullModalTitleRow,
  AssistantFullModalOverlay,
  AssistantFullModalTitle,
  AssistantInlineSourceChip,
  AssistantInlineSourceChips,
  AssistantInlineSourceTrigger,
  AssistantInlineSourceChipLabel,
  AssistantInlineSourceChipCount,
  AssistantInlineSourcePopover,
  AssistantInlineSourcePopoverCard,
  AssistantInlineSourceItem,
  AssistantInlineSourceItemBody,
  AssistantInlineSourceItemTitle,
  AssistantInlineSourceItemDescription,
  AssistantPromptBubbleWrap,
  AssistantPromptAttachmentChip,
  AssistantPromptAttachmentChips,
  AssistantPromptAttachmentName,
  AssistantReportButton,
  AssistantReportCtaText,
  AssistantReportButtons,
  AssistantResponseCard,
  AssistantResponseList,
  AssistantResponseListItem,
  AssistantSectionCaret,
  AssistantSectionRow,
  AssistantSectionHeader,
  AssistantSourcesPanel,
  AssistantSourcesPanelHandle,
  AssistantSourcesPanelHeader,
  AssistantSourcesPanelTitle,
  AssistantSourcesPanelBody,
  AssistantSourcesPanelItem,
  AssistantSourcesPanelItemHeaderRow,
  AssistantSourcesPanelItemTitle,
  AssistantSourcesPanelItemDescription,
  AssistantSuggestedPromptChip,
  AssistantSuggestedPromptsHeader,
  AssistantSuggestedPromptsList,
  AssistantSuggestedPromptsSection,
  AssistantThinkingDots,
  AssistantTurn,
  AssistantVisualActions,
  AssistantVisualCard,
  Body,
  BodyContent,
  ChatBubble,
  ChatBubbleAction,
  ChatBubbleActionFeedback,
  ChatBubbleActionTooltip,
  ChatBubbleActions,
  ChatBubbleActionsDivider,
  ChatBubbleActionsTime,
  ChatBubbleTimestamp,
  ChatBubbleContent,
  ChatThread,
  ChatView,
  ChatViewTitle,
  Composer,
  ComposerAttachmentChip,
  ComposerAttachmentName,
  ComposerAttachmentRemove,
  ComposerAttachments,
  ComposerBox,
  ComposerContent,
  ComposerInput,
  ComposerToolButton,
  ComposerToolbar,
  Disclaimer,
  DisclaimerLink,
  AssistantFullModalList,
  AssistantFullModalListItem,
  DropdownItem,
  DropdownItemLeft,
  DropdownTitle,
  Header,
  HeaderActions,
  HeaderIconButton,
  IconTooltip,
  IconTooltipTrigger,
  HeaderLeft,
  HeaderTitle,
  LeftTools,
  MoreSuggestions,
  Panel,
  PromptCard,
  PromptLibraryAuthor,
  PromptLibraryBody,
  PromptLibraryCard,
  PromptLibraryActionFeedback,
  PromptLibraryCardActions,
  PromptLibraryCardContent,
  PromptLibraryHeader,
  PromptLibraryItem,
  PromptLibraryItemRow,
  PromptLibraryOverlay,
  PromptLibrarySearch,
  PromptLibrarySubheader,
  PromptLibrarySubheaderActions,
  PromptLibraryTab,
  PromptLibraryTabs,
  PromptLibraryTitle,
  PromptLibrarySaveButton,
  PromptLibrarySaveArea,
  PromptList,
  PromptToken,
  RecentChatsGroup,
  RecentChatsGroupTitle,
  RecentChatsActions,
  RecentChatsActionFeedback,
  RecentChatsKebab,
  RecentChatsList,
  RecentChatsMenu,
  RecentChatsMenuItem,
  RecentChatsRenameAction,
  RecentChatsRenameInput,
  RecentChatsRenameRow,
  RecentChatsRow,
  RecentChatsText,
  RecentChatsTitle,
  RecentChatsTitleRow,
  SendButton,
  SwitchViewDropdown,
  WelcomeTitle,
  AssistantCampaignStatus,
  AssistantCampaignCanvasButton,
  AssistantCampaignExpandButton,
  AssistantCampaignSubRow,
  AssistantCampaignSubRows,
  AssistantCampaignTable,
  AssistantCampaignTableCell,
  AssistantCampaignTableHeaderCell,
  AssistantCampaignTableHeaderRow,
  AssistantCampaignTableRow,
  AssistantReasoningLine,
  AssistantReasoningCheck,
  AssistantReasoningPending,
  AssistantReasoningLoader,
} from './AmadeusMaxPanel.styled'
import { CampaignFlowConversation, CampaignContextBanner } from '../CampaignFlow/CampaignFlowConversation'
import { CampaignProgressBar } from '../CampaignFlow/CampaignProgressBar'
import {
  clearCampaignFlowSuggestedPrompts,
  closeCampaignWorkspace,
  isCampaignFlowPrompt,
  resetCampaignFlow,
  startCampaignFlow,
  startAtiInsightView,
  startCampaignStructureView,
  startClosedWonCampaignCreation,
  startClosedWonMediaPlanView,
  useCampaignFlowState,
} from '../CampaignFlow/campaignFlowStore'
import AmadeusDspFlowConversation from '../AmadeusDspFlow/AmadeusDspFlowConversation'
import {
  isAmadeusDspPrompt,
  resetAmadeusDspFlow,
  startAmadeusDspFlow,
  useAmadeusDspFlowState,
} from '../AmadeusDspFlow/amadeusDspFlowStore'

type PromptItem = {
  id: string
  textBefore: string
  token: string
  textAfter: string
  author?: string
}

type RecentChatItem = {
  id: string
  title: string
  openedAt: string
  isPinned?: boolean
  messages: Array<{
    id: string
    author: 'user' | 'assistant'
    text: string
  }>
}

type ResponseSource = {
  id: string
  title: string
  domain: string
  description?: string
}

type CampaignStatus = 'Live' | 'Paused'

type CampaignDetailRow = {
  id: string
  campaignName: string
  budget: string
  period: string
  status: CampaignStatus
}

type CampaignPlatformRow = {
  id: string
  platform: string
  totalCampaigns: string
  spend: string
  status: CampaignStatus
  campaigns: CampaignDetailRow[]
}

type AssistantTurnState = {
  id: string
  prompt: string
  timestamp: string
  userAttachmentNames?: string[]
  thinkingSummary: string
  thinkingDetails: string[]
  reasoningSummary: string
  reasoningLines: string[]
  responseLines: string[]
  responseBulletCount: number
  sources: ResponseSource[]
  isThinkingExpanded: boolean
  isReasoningExpanded: boolean
  isReasoningVisible: boolean
  isSourcesExpanded: boolean
  visibleReasoningCount: number
  visibleResponseCount: number
  visibleSourcesCount: number
  showReportButtons: boolean
  showResponseActions: boolean
  responseFeedback?: 'thumbs-up' | 'thumbs-down' | null
  showDemandChart: boolean
  showDemandErrorState: boolean
  showCampaignSuccessState: boolean
  showCampaignAlreadyExistsState: boolean
  showCampaignTable: boolean
  campaignRows: CampaignPlatformRow[]
  reportPrimaryActionLabel: string
  reportSecondaryActionLabel: string
  stage: 'thinking' | 'reasoning' | 'response' | 'sources' | 'done' | 'stopped'
}

type VisualModalState = {
  turnId: string
  visualType: 'campaign-table' | 'demand-chart'
}

type ResponseFeedbackModalState = {
  turnId: string
  feedbackText: string
}

type ComposerAttachment = {
  id: string
  file: File
}

const suggestedPrompts: PromptItem[] = [
  {
    id: 'prompt-1',
    textBefore: 'Show Market analysis from Travel Intelligence for ',
    token: 'Advertiser Name',
    textAfter: '',
    author: 'Advertising',
  },
  {
    id: 'prompt-2',
    textBefore: 'List campaigns on all platforms for ',
    token: 'Advertiser Name',
    textAfter: '',
    author: 'Advertising',
  },
  {
    // Replaces the Demand360 prompt on the welcome page (easy access for the Amadeus DSP user
    // group); Demand360 stays available in the prompt library (added explicitly below).
    id: 'prompt-7',
    textBefore: 'Create campaigns in Amadeus DSP',
    token: '',
    textAfter: '',
    author: 'Advertising',
  },
  {
    id: 'prompt-6',
    textBefore: 'Create campaign for ',
    token: 'Advertiser Name',
    textAfter: '',
    author: 'Advertising',
  },
]

// Demand360 is no longer a welcome-page suggested prompt, but it remains in the prompt library.
const demand360LibraryPrompt: PromptItem = {
  id: 'prompt-3',
  textBefore: 'Show Demand360 data for ',
  token: 'Advertiser Name',
  textAfter: '',
  author: 'Advertising',
}

const promptLibraryItems: PromptItem[] = [
  ...suggestedPrompts,
  demand360LibraryPrompt,
  {
    id: 'prompt-4',
    textBefore:
      'Can you provide an overview of Nevio, including its purpose, key stakeholders, and current status within the organization?',
    token: '',
    textAfter: '',
    author: 'Nevio',
  },
  {
    id: 'prompt-5',
    textBefore: 'Recommend actionable next steps based on insights from Product Catalogue',
    token: '',
    textAfter: '',
    author: 'Product Catalogue',
  },
]

const inConversationSuggestedPrompts: PromptItem[] = suggestedPrompts

const marketAnalysisPromptText = 'Show Market analysis from Travel Intelligence for Advertiser Name'
const listCampaignsPromptText = 'List campaigns on all platforms for Advertiser Name'
const demand360PromptText = 'Show Demand360 data for Advertiser Name'

const campaignPlatformRows: CampaignPlatformRow[] = [
  {
    id: 'platform-google-ads',
    platform: 'Google Ads',
    totalCampaigns: '5 campaigns',
    spend: '$184,000',
    status: 'Live',
    campaigns: [
      {
        id: 'google-search-brand',
        campaignName: 'Brand Search - Summer Push',
        budget: '$48,000',
        period: 'Jul 01 - Sep 15',
        status: 'Live',
      },
      {
        id: 'google-pmax-us',
        campaignName: 'Performance Max - US Markets',
        budget: '$62,000',
        period: 'Jun 20 - Aug 31',
        status: 'Live',
      },
    ],
  },
  {
    id: 'platform-meta',
    platform: 'Meta',
    totalCampaigns: '4 campaigns',
    spend: '$131,500',
    status: 'Live',
    campaigns: [
      {
        id: 'meta-awareness-eu',
        campaignName: 'Awareness - Europe City Escapes',
        budget: '$39,000',
        period: 'Jul 10 - Sep 30',
        status: 'Live',
      },
      {
        id: 'meta-retargeting-global',
        campaignName: 'Retargeting - Global Interest Pool',
        budget: '$27,500',
        period: 'May 15 - Aug 20',
        status: 'Paused',
      },
    ],
  },
  {
    id: 'platform-dv360',
    platform: 'DV360',
    totalCampaigns: '3 campaigns',
    spend: '$96,200',
    status: 'Paused',
    campaigns: [
      {
        id: 'dv360-video-prospecting',
        campaignName: 'Video Prospecting - Demand Wave',
        budget: '$44,200',
        period: 'Jun 01 - Jul 31',
        status: 'Paused',
      },
      {
        id: 'dv360-ctv-premium',
        campaignName: 'CTV Premium Destinations',
        budget: '$52,000',
        period: 'Jul 05 - Oct 01',
        status: 'Live',
      },
    ],
  },
  {
    id: 'platform-linkedin',
    platform: 'LinkedIn',
    totalCampaigns: '2 campaigns',
    spend: '$38,700',
    status: 'Live',
    campaigns: [
      {
        id: 'linkedin-b2b-travel',
        campaignName: 'B2B Travel Partner Acquisition',
        budget: '$21,200',
        period: 'Jul 08 - Sep 01',
        status: 'Live',
      },
      {
        id: 'linkedin-thought-leadership',
        campaignName: 'Thought Leadership - Hospitality',
        budget: '$17,500',
        period: 'Jun 15 - Aug 30',
        status: 'Paused',
      },
    ],
  },
]

const marketDemandChartBars = [
  { label: 'New York', paxThisYear: 112, paxLastYear: 96, competitorAnalysis: 60 },
  { label: 'Paris', paxThisYear: 104, paxLastYear: 90, competitorAnalysis: 55 },
  { label: 'London', paxThisYear: 98, paxLastYear: 86, competitorAnalysis: 58 },
  { label: 'Dubai', paxThisYear: 92, paxLastYear: 80, competitorAnalysis: 52 },
  { label: 'Singapore', paxThisYear: 88, paxLastYear: 73, competitorAnalysis: 48 },
  { label: 'Barcelona', paxThisYear: 84, paxLastYear: 69, competitorAnalysis: 45 },
]

const marketDemandLeftAxisTicks = [120, 90, 60, 30, 0]
const marketDemandRightAxisTicks = [100, 75, 50, 25, 0]

const buildSmoothLinePath = (points: Array<{ x: number; y: number }>) => {
  if (points.length === 0) return ''
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`

  let path = `M ${points[0].x} ${points[0].y}`

  for (let index = 1; index < points.length; index += 1) {
    const prev = points[index - 1]
    const curr = points[index]
    const controlX = (prev.x + curr.x) / 2
    path += ` Q ${controlX} ${prev.y}, ${curr.x} ${curr.y}`
  }

  return path
}

const getPromptText = (prompt: PromptItem) => `${prompt.textBefore}${prompt.token}${prompt.textAfter}`

const promptItemsFromLabels = (labels: string[]): PromptItem[] =>
  labels.map((label, index) => ({
    id: `contextual-prompt-${index}`,
    textBefore: label,
    token: '',
    textAfter: '',
  }))
const getPromptKey = (prompt: PromptItem) => prompt.id

// Chat timestamp, e.g. "9 Aug · 6:30 PM" (time-based chat label, exempt from the dd-Mmm-yyyy date rule)
const formatTurnTimestamp = (isoTimestamp: string) => {
  const date = new Date(isoTimestamp)
  if (Number.isNaN(date.getTime())) return ''
  const day = date.getDate()
  const month = date.toLocaleString('en-US', { month: 'short' })
  const time = date.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  return `${day} ${month} · ${time}`
}

const getSourceUrl = (domain: string) => {
  const trimmedDomain = domain.trim()
  if (trimmedDomain.startsWith('http://') || trimmedDomain.startsWith('https://')) {
    return trimmedDomain
  }

  return `https://${trimmedDomain}`
}

const formatRecentDate = (date: Date) =>
  date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

const formatRecentMonth = (date: Date) =>
  date.toLocaleDateString('en-GB', {
    month: 'short',
    year: 'numeric',
  })

const getRecentChatDateLabel = (openedAt: string) => {
  const openedDate = new Date(openedAt)
  const nowDate = new Date()

  const openedDay = new Date(openedDate.getFullYear(), openedDate.getMonth(), openedDate.getDate())
  const today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate())
  const diffInDays = Math.floor((today.getTime() - openedDay.getTime()) / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) return 'Today'
  if (diffInDays >= 1 && diffInDays <= 6) return formatRecentDate(openedDay)
  if (diffInDays >= 7 && diffInDays <= 13) return 'One week ago'
  return formatRecentMonth(openedDay)
}

const selectedFigmaNodeContext = {
  nodeId: '93:11514',
  frameName: 'Proto : AI Full Screen - AI Processing',
  sections: [
    'Top navigation with Amadeus branding and user profile controls',
    'Left rail navigation with compact icon buttons',
    'Main chat thread with user prompt, assistant answer, and feedback actions',
    'Report CTA buttons: Download Report and Email Report',
    'Sources list cards below the assistant response',
    'Bottom composer with tool icons and primary send/stop action',
  ],
}

const buildAssistantResponse = (promptText: string, options: { campaignAlreadyExists?: boolean } = {}) => {
  const trimmedPrompt = promptText.trim()
  const isMarketAnalysisPrompt = trimmedPrompt.toLowerCase() === marketAnalysisPromptText.toLowerCase()
  const isListCampaignsPrompt = trimmedPrompt.toLowerCase() === listCampaignsPromptText.toLowerCase()
  const isDemand360Prompt = trimmedPrompt.toLowerCase() === demand360PromptText.toLowerCase()
  const normalizedPrompt = trimmedPrompt.toLowerCase()
  const isCreateCampaignSubmitPrompt = normalizedPrompt === 'create campaign'
  const isCreateCampaignPrompt = isCreateCampaignSubmitPrompt || normalizedPrompt.startsWith('create campaign for')
  const thinkingSummary = `Analyzing selected Figma node ${selectedFigmaNodeContext.nodeId}.`
  const thinkingDetails = [
    `Node: ${selectedFigmaNodeContext.frameName}.`,
    'Checking header, left rail, conversation area, action rows, and composer hierarchy.',
    'Validating progression pattern from processing to response and source references.',
  ]
  const reasoningSummary = 'Reasoning generated from the selected node structure.'
  const reasoningLines = [
    'Understanding your request',
    'Gathering relevant information',
    'Checking the available data',
    'Forming a clear response',
    'Preparing the final answer',
  ]
  const responseLines = isCreateCampaignSubmitPrompt
    ? [
        'Gathering campaign info',
        'Creating campaigns in Google',
        'Creating campaigns in Bing',
        'Creating campaigns in Meta',
      ]
    : isCreateCampaignPrompt
      ? [
          'Analyzing the Advertiser for the new campaign with a recommended budget.',
          'Checking for available Media Plan.',
          'Targeting settings are optimized based on the goal.',
          'Keyword settings are optimized using the keyword database for maximum reach.',
          'Audience segments have been customized for specific recommended markets.',
          'Platform strategy is fixed based on previous campaign performance.',
          'Creatives are sourced from the Content Management System to align with the platforms included in the campaign.',
        ]
      : isMarketAnalysisPrompt
        ? [
            'Collect data from Amadeus Travel Intelligence to assess overall Market performance and demand trends for the United States Market',
            'Analyze demand data from Demand 360, focusing on feeder market and comparable hotel sets, to identify key source destinations and competitive positioning.',
            'Based on data from +200m pax searches daily for insight into worldwide travel demand across 20,000 travel agents and 300 OTAs',
            '',
            'Considering different insights, the recommendation would be to increase Advertising investments to Properties located in high demand destinations markets like :',
          ]
        : isListCampaignsPrompt
          ? ['listing all the available campaigns for Advertiser name in different platforms.']
          : isDemand360Prompt
            ? ['Could not connect to Demand 360 as you are not subscribed to it.']
            : ['Would you like a detailed analysis?']
  const sources: ResponseSource[] = isCreateCampaignSubmitPrompt
    ? []
    : [
        {
          id: 'source-1',
          title: 'Amadeus Travel Intelligence',
          domain: 'ati.amadeus.com',
          description: 'Market performance and demand trends used to assess the overall Market and traveler demand.',
        },
        {
          id: 'source-2',
          title: 'Campaign Database',
          domain: 'campaigns.amadeus.com',
          description:
            'Historical and active campaign records across platforms, including delivery and performance data.',
        },
        {
          id: 'source-3',
          title: 'Content Management system',
          domain: 'cms.amadeus.com',
          description: 'Repository of creatives and product content aligned to the platforms in the campaign.',
        },
      ]

  return {
    thinkingSummary,
    thinkingDetails,
    reasoningSummary,
    reasoningLines,
    responseLines,
    sources,
    responseBulletCount: isMarketAnalysisPrompt ? 3 : 0,
    showReportButtons: !isDemand360Prompt && !isCreateCampaignSubmitPrompt,
    showDemandChart: isMarketAnalysisPrompt,
    showDemandErrorState: isDemand360Prompt,
    showCampaignSuccessState: isCreateCampaignSubmitPrompt && !options.campaignAlreadyExists,
    showCampaignAlreadyExistsState: isCreateCampaignSubmitPrompt && Boolean(options.campaignAlreadyExists),
    showCampaignTable: isListCampaignsPrompt,
    campaignRows: isListCampaignsPrompt ? campaignPlatformRows : [],
    reportPrimaryActionLabel: isCreateCampaignPrompt
      ? 'Promote campaign'
      : isMarketAnalysisPrompt || isListCampaignsPrompt
        ? 'Download data'
        : 'Download Report',
    reportSecondaryActionLabel: isCreateCampaignPrompt
      ? 'Promote campaign'
      : isMarketAnalysisPrompt || isListCampaignsPrompt
        ? 'Recommend improvements'
        : 'Email Report',
  }
}

const initialRecentChats: RecentChatItem[] = [
  {
    id: 'recent-1',
    title: 'Summarize campaign pacing issues for this week',
    openedAt: '2026-07-24T09:42:00Z',
    isPinned: false,
    messages: [
      { id: 'recent-1-user', author: 'user', text: 'Summarize campaign pacing issues for this week' },
      {
        id: 'recent-1-assistant',
        author: 'assistant',
        text: 'Top pacing issues this week are concentrated in two advertisers with under-delivery against plan. I can break this down by module or property next.',
      },
    ],
  },
  {
    id: 'recent-2',
    title: 'Draft follow-up actions from Media Hub modules',
    openedAt: '2026-07-23T18:10:00Z',
    isPinned: false,
    messages: [
      { id: 'recent-2-user', author: 'user', text: 'Draft follow-up actions from Media Hub modules' },
      {
        id: 'recent-2-assistant',
        author: 'assistant',
        text: 'Recommended follow-up: validate data freshness, align priority modules with owners, and schedule optimization reviews for low-performing modules.',
      },
    ],
  },
  {
    id: 'recent-3',
    title: 'Create optimization checklist for OBA setup',
    openedAt: '2026-07-20T11:27:00Z',
    isPinned: false,
    messages: [
      { id: 'recent-3-user', author: 'user', text: 'Create optimization checklist for OBA setup' },
      {
        id: 'recent-3-assistant',
        author: 'assistant',
        text: 'Checklist created: audience validation, budget split review, creative QA, conversion tracking checks, and pacing monitor setup.',
      },
    ],
  },
  {
    id: 'recent-4',
    title: 'Prepare one-week performance recap for stakeholders',
    openedAt: '2026-07-15T10:15:00Z',
    isPinned: false,
    messages: [
      { id: 'recent-4-user', author: 'user', text: 'Prepare one-week performance recap for stakeholders' },
      {
        id: 'recent-4-assistant',
        author: 'assistant',
        text: 'Here is a one-week recap: delivery trend, top growth module, two risks, and next actions for each owner.',
      },
    ],
  },
  {
    id: 'recent-5',
    title: 'Summarize December planning assumptions',
    openedAt: '2025-12-09T14:00:00Z',
    isPinned: false,
    messages: [
      { id: 'recent-5-user', author: 'user', text: 'Summarize December planning assumptions' },
      {
        id: 'recent-5-assistant',
        author: 'assistant',
        text: 'December assumptions include seasonal demand uplift, conservative pacing guardrails, and phased budget activation.',
      },
    ],
  },
]

type LayoutMode = 'sidebar' | 'full-screen' | 'floating'

type AmadeusMaxPanelProps = {
  onClosePanel?: () => void
  layoutMode?: LayoutMode
  onLayoutModeChange?: (mode: LayoutMode) => void
  onCampaignCanvasChange?: (open: boolean) => void
  campaignCanvasOpen?: boolean
}

type PersistedAmadeusMaxState = {
  inputValue: string
  savedPromptIds: string[]
  userPromptLibraryItems: PromptItem[]
  selectedRecentChatId: string | null
  recentChats: RecentChatItem[]
  activeTurns: AssistantTurnState[]
}

const AMADEUS_MAX_STATE_KEY = 'mediahub.amadeusMax.state.v1'
const ACCEPTED_ATTACHMENT_EXTENSIONS = ['csv', 'xls', 'xlsx', 'pdf']

const loadPersistedAmadeusMaxState = (): PersistedAmadeusMaxState | null => {
  if (typeof window === 'undefined') return null

  try {
    const rawState = window.sessionStorage.getItem(AMADEUS_MAX_STATE_KEY)
    if (!rawState) return null

    return JSON.parse(rawState) as PersistedAmadeusMaxState
  } catch {
    return null
  }
}

const AmadeusMaxPanel: React.FC<AmadeusMaxPanelProps> = ({
  onClosePanel,
  layoutMode = 'sidebar',
  onLayoutModeChange,
  onCampaignCanvasChange,
  campaignCanvasOpen = false,
}) => {
  const persistedStateRef = useRef<PersistedAmadeusMaxState | null>(null)
  if (persistedStateRef.current === null) {
    persistedStateRef.current = loadPersistedAmadeusMaxState()
  }
  const persistedState = persistedStateRef.current

  const [isSwitchOpen, setIsSwitchOpen] = useState(false)
  const [inputValue, setInputValue] = useState(persistedState?.inputValue ?? '')
  const [isPromptLibraryOpen, setIsPromptLibraryOpen] = useState(false)
  const [isRecentChatsOpen, setIsRecentChatsOpen] = useState(false)
  const [libraryTab, setLibraryTab] = useState<'suggested' | 'your-prompts'>('suggested')
  const [searchValue, setSearchValue] = useState('')
  const [recentSearchValue, setRecentSearchValue] = useState('')
  const [savedPromptIds, setSavedPromptIds] = useState<string[]>(persistedState?.savedPromptIds ?? [])
  const [userPromptLibraryItems, setUserPromptLibraryItems] = useState<PromptItem[]>(
    persistedState?.userPromptLibraryItems ?? [],
  )
  const [actionFeedback, setActionFeedback] = useState<string | null>(null)
  const [actionFeedbackTargetText, setActionFeedbackTargetText] = useState<string | null>(null)
  const [selectedRecentChatId, setSelectedRecentChatId] = useState<string | null>(
    persistedState?.selectedRecentChatId ?? null,
  )
  const [recentChats, setRecentChats] = useState<RecentChatItem[]>(persistedState?.recentChats ?? initialRecentChats)
  const [openRecentChatMenuId, setOpenRecentChatMenuId] = useState<string | null>(null)
  const [renamingRecentChatId, setRenamingRecentChatId] = useState<string | null>(null)
  const [renamingTitle, setRenamingTitle] = useState('')
  const [activeTurns, setActiveTurns] = useState<AssistantTurnState[]>(persistedState?.activeTurns ?? [])
  const [expandedCampaignRowsByTurnId, setExpandedCampaignRowsByTurnId] = useState<Record<string, string[]>>({})
  const [visualModalState, setVisualModalState] = useState<VisualModalState | null>(null)
  const [responseFeedbackModalState, setResponseFeedbackModalState] = useState<ResponseFeedbackModalState | null>(null)
  const [isAiInfoModalOpen, setIsAiInfoModalOpen] = useState(false)
  const [composerAttachments, setComposerAttachments] = useState<ComposerAttachment[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [sourcesPanelTurnId, setSourcesPanelTurnId] = useState<string | null>(null)
  const isRightPanelOpen = isPromptLibraryOpen || isRecentChatsOpen
  const attachmentInputRef = useRef<HTMLInputElement | null>(null)
  const bodyScrollRef = useRef<HTMLDivElement | null>(null)
  const assistantTurnRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const generationIdRef = useRef(0)
  const timerIdsRef = useRef<number[]>([])
  const feedbackTimerRef = useRef<number | null>(null)
  const {
    blocks: campaignFlowBlocks,
    suggestedPrompts: campaignFlowSuggestedPrompts,
    aiWorkspaceType,
  } = useCampaignFlowState()
  const hasCampaignFlow = campaignFlowBlocks.length > 0
  const { active: dspFlowActive } = useAmadeusDspFlowState()
  const hasDspFlow = dspFlowActive
  const showCampaignPromptLanding = campaignFlowSuggestedPrompts.length > 0
  const landingPrompts = showCampaignPromptLanding
    ? promptItemsFromLabels(campaignFlowSuggestedPrompts)
    : suggestedPrompts

  const scrollChatToBottom = () => {
    window.requestAnimationFrame(() => {
      const scrollContainer = bodyScrollRef.current
      if (!scrollContainer) return
      if (typeof scrollContainer.scrollTo === 'function') {
        scrollContainer.scrollTo({ top: scrollContainer.scrollHeight, behavior: 'smooth' })
        return
      }
      scrollContainer.scrollTop = scrollContainer.scrollHeight
    })
  }

  const latestTurn = activeTurns[activeTurns.length - 1]
  const latestTurnStreamingSignature = latestTurn
    ? [
        latestTurn.id,
        latestTurn.stage,
        latestTurn.visibleReasoningCount,
        latestTurn.visibleResponseCount,
        latestTurn.visibleSourcesCount,
        latestTurn.showReportButtons,
        latestTurn.showResponseActions,
      ].join('|')
    : ''

  const clearGenerationTimers = () => {
    timerIdsRef.current.forEach(timerId => window.clearTimeout(timerId))
    timerIdsRef.current = []
  }

  const schedule = (callback: () => void, delay: number) => {
    const timeoutId = window.setTimeout(callback, delay)
    timerIdsRef.current.push(timeoutId)
  }

  useEffect(() => {
    return () => {
      clearGenerationTimers()
      if (feedbackTimerRef.current) {
        window.clearTimeout(feedbackTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    // If a layout switch remounts the panel mid-generation, pending timers are lost.
    // Finalize any restored in-progress turn so chat doesn't remain stuck in reasoning.
    setActiveTurns(currentTurns =>
      currentTurns.map(turn => {
        if (turn.stage === 'done' || turn.stage === 'stopped') return turn

        return {
          ...turn,
          visibleReasoningCount: turn.reasoningLines.length,
          visibleResponseCount: turn.responseLines.length,
          visibleSourcesCount: turn.sources.length,
          isReasoningExpanded: false,
          isReasoningVisible: false,
          isSourcesExpanded: false,
          showReportButtons:
            turn.showDemandErrorState || turn.showCampaignSuccessState || turn.showCampaignAlreadyExistsState
              ? false
              : true,
          showResponseActions: true,
          stage: 'done',
        }
      }),
    )
    setIsGenerating(false)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const nextState: PersistedAmadeusMaxState = {
      inputValue,
      savedPromptIds,
      userPromptLibraryItems,
      selectedRecentChatId,
      recentChats,
      activeTurns,
    }

    window.sessionStorage.setItem(AMADEUS_MAX_STATE_KEY, JSON.stringify(nextState))
  }, [inputValue, savedPromptIds, userPromptLibraryItems, selectedRecentChatId, recentChats, activeTurns])

  useEffect(() => {
    if (!latestTurn) return

    const scrollContainer = bodyScrollRef.current
    if (!scrollContainer) return

    const rafId = window.requestAnimationFrame(() => {
      scrollContainer.scrollTop = scrollContainer.scrollHeight
    })

    return () => {
      window.cancelAnimationFrame(rafId)
    }
  }, [latestTurnStreamingSignature, isGenerating])

  const preserveScrollPosition = (anchorElement: HTMLElement | null, updater: () => void) => {
    const scrollContainer = bodyScrollRef.current
    if (!scrollContainer) {
      updater()
      return
    }

    const anchorTopBefore = anchorElement?.getBoundingClientRect().top ?? null

    updater()

    window.requestAnimationFrame(() => {
      const activeScrollContainer = bodyScrollRef.current
      if (!activeScrollContainer) return

      if (!anchorElement || anchorTopBefore === null) return

      const anchorTopAfter = anchorElement.getBoundingClientRect().top
      const delta = anchorTopAfter - anchorTopBefore
      if (delta !== 0) {
        activeScrollContainer.scrollTop += delta
      }
    })
  }

  const scrollToAssistantTurn = (turnId: string) => {
    const scrollContainer = bodyScrollRef.current
    if (!scrollContainer) return

    const turnElement = assistantTurnRefs.current[turnId]
    if (!turnElement) return

    const containerRect = scrollContainer.getBoundingClientRect()
    const turnRect = turnElement.getBoundingClientRect()
    const topOffset = turnRect.top - containerRect.top
    const nextScrollTop = Math.max(0, scrollContainer.scrollTop + topOffset - 12)

    scrollContainer.scrollTo({
      top: nextScrollTop,
      behavior: 'smooth',
    })
  }

  const showActionFeedback = (message: string, sourceText: string) => {
    setActionFeedback(message)
    setActionFeedbackTargetText(sourceText)
    if (feedbackTimerRef.current) {
      window.clearTimeout(feedbackTimerRef.current)
    }
    feedbackTimerRef.current = window.setTimeout(() => {
      setActionFeedback(null)
      setActionFeedbackTargetText(null)
      feedbackTimerRef.current = null
    }, 1800)
  }

  const handleLayoutModeSelect = (mode: LayoutMode) => {
    onLayoutModeChange?.(mode)
    setIsSwitchOpen(false)
    // Keep recent chats open when transitioning into full-screen mode.
    setIsRecentChatsOpen(prev => (mode === 'full-screen' ? prev : false))
  }

  const handlePromptSelect = (prompt: PromptItem) => {
    setInputValue(getPromptText(prompt))
    setSelectedRecentChatId(null)
    if (layoutMode !== 'full-screen') {
      setIsPromptLibraryOpen(false)
    }
  }

  const handleRecentChatSelect = (recentChat: RecentChatItem) => {
    setSelectedRecentChatId(recentChat.id)
    setInputValue('')
    setActiveTurns([])
    resetCampaignFlow()
    resetAmadeusDspFlow()
    setOpenRecentChatMenuId(null)
    setRenamingRecentChatId(null)
    if (layoutMode !== 'full-screen') {
      setIsRecentChatsOpen(false)
    }
  }

  const handleRecentChatsToggle = () => {
    setIsSwitchOpen(false)
    setIsPromptLibraryOpen(false)
    setOpenRecentChatMenuId(null)
    setRenamingRecentChatId(null)
    setIsRecentChatsOpen(prev => !prev)
  }

  const selectedRecentChat = recentChats.find(recentChat => recentChat.id === selectedRecentChatId) ?? null

  const handleRecentChatPin = (recentChatId: string) => {
    const targetChat = recentChats.find(chat => chat.id === recentChatId)
    if (!targetChat) return

    const shouldPin = !targetChat.isPinned

    setRecentChats(currentChats =>
      currentChats.map(chat => (chat.id === recentChatId ? { ...chat, isPinned: shouldPin } : chat)),
    )
    setOpenRecentChatMenuId(null)
    showActionFeedback(shouldPin ? 'Pinned chat' : 'Unpinned chat', `recent-chat:${recentChatId}`)
  }

  const handleRecentChatRenameStart = (recentChatId: string) => {
    const targetChat = recentChats.find(chat => chat.id === recentChatId)
    if (!targetChat) return
    setRenamingRecentChatId(recentChatId)
    setRenamingTitle(targetChat.title)
    setOpenRecentChatMenuId(null)
  }

  const handleRecentChatRenameSave = () => {
    if (!renamingRecentChatId) return
    const nextTitle = renamingTitle.trim()
    if (!nextTitle) {
      setRenamingRecentChatId(null)
      setRenamingTitle('')
      return
    }

    setRecentChats(currentChats =>
      currentChats.map(chat =>
        chat.id === renamingRecentChatId
          ? {
              ...chat,
              title: nextTitle,
            }
          : chat,
      ),
    )
    setRenamingRecentChatId(null)
    setRenamingTitle('')
  }

  const handleRecentChatRenameCancel = () => {
    setRenamingRecentChatId(null)
    setRenamingTitle('')
  }

  const handleRecentChatDelete = (recentChatId: string) => {
    setRecentChats(currentChats => currentChats.filter(chat => chat.id !== recentChatId))
    if (selectedRecentChatId === recentChatId) {
      setSelectedRecentChatId(null)
    }
    if (renamingRecentChatId === recentChatId) {
      setRenamingRecentChatId(null)
      setRenamingTitle('')
    }
    setOpenRecentChatMenuId(null)
  }

  const handlePromptSave = (prompt: PromptItem) => {
    const promptKey = getPromptKey(prompt)
    const isSaved = savedPromptIds.includes(promptKey)

    if (isSaved) {
      setSavedPromptIds(currentSavedIds => currentSavedIds.filter(savedPromptId => savedPromptId !== promptKey))
      showActionFeedback('Removed from prompt library', `prompt-library:${promptKey}`)
      return
    }

    setSavedPromptIds(currentSavedIds =>
      currentSavedIds.includes(promptKey) ? currentSavedIds : [...currentSavedIds, promptKey],
    )
    showActionFeedback('Saved to prompt library', `prompt-library:${promptKey}`)
  }

  const getNormalizedPromptText = (text: string) => text.trim().toLowerCase()

  const isUserPromptSaved = (messageText: string) => {
    const normalizedText = getNormalizedPromptText(messageText)
    return userPromptLibraryItems.some(
      item => getNormalizedPromptText(`${item.textBefore}${item.token}${item.textAfter}`) === normalizedText,
    )
  }

  const handleSaveUserPrompt = (messageText: string) => {
    const nextPromptText = messageText.trim()
    if (!nextPromptText) return

    const normalizedText = getNormalizedPromptText(nextPromptText)
    const isSaved = userPromptLibraryItems.some(
      item => getNormalizedPromptText(`${item.textBefore}${item.token}${item.textAfter}`) === normalizedText,
    )

    if (isSaved) {
      setUserPromptLibraryItems(currentItems =>
        currentItems.filter(
          item => getNormalizedPromptText(`${item.textBefore}${item.token}${item.textAfter}`) !== normalizedText,
        ),
      )
      showActionFeedback('Removed from prompt library', nextPromptText)
      return
    }

    const nextPrompt: PromptItem = {
      id: `user-prompt-${Date.now()}`,
      textBefore: nextPromptText,
      token: '',
      textAfter: '',
      author: 'You',
    }
    setUserPromptLibraryItems(currentItems => [nextPrompt, ...currentItems])
    showActionFeedback('Saved to prompt library', nextPromptText)
  }

  const handleCopyMessageText = async (messageText: string) => {
    try {
      await navigator.clipboard.writeText(messageText)
      showActionFeedback('Copied', messageText)
    } catch {
      showActionFeedback('Unable to copy', messageText)
    }
  }

  const replayAssistantTurnResponse = (
    turnId: string,
    currentGenerationId: number,
    reasoningLines: string[],
    responseLines: string[],
    sources: ResponseSource[],
    shouldShowReportButtons: boolean,
  ) => {
    const initialDelayMs = 2400
    const reasoningStepMs = 750
    const finalStepMs = 850

    schedule(() => {
      if (generationIdRef.current !== currentGenerationId) return
      updateAssistantTurn(turnId, turn => ({ ...turn, stage: 'reasoning' }))
      updateAssistantTurn(turnId, turn => ({ ...turn, isReasoningExpanded: true, isReasoningVisible: true }))
      reasoningLines.forEach((_, reasoningIndex) => {
        schedule(
          () => {
            if (generationIdRef.current !== currentGenerationId) return
            updateAssistantTurn(turnId, turn => ({
              ...turn,
              visibleReasoningCount: Math.max(turn.visibleReasoningCount, reasoningIndex + 1),
            }))
          },
          reasoningStepMs * (reasoningIndex + 1),
        )
      })

      const finalStartDelay = reasoningStepMs * reasoningLines.length + 200
      schedule(() => {
        if (generationIdRef.current !== currentGenerationId) return
        updateAssistantTurn(turnId, turn => ({ ...turn, stage: 'response' }))
        updateAssistantTurn(turnId, turn => ({ ...turn, isReasoningExpanded: false }))
        responseLines.forEach((_, finalIndex) => {
          schedule(
            () => {
              if (generationIdRef.current !== currentGenerationId) return
              updateAssistantTurn(turnId, turn => ({
                ...turn,
                visibleResponseCount: Math.max(turn.visibleResponseCount, finalIndex + 1),
              }))
            },
            finalStepMs * (finalIndex + 1),
          )
        })

        const reportDelay = finalStepMs * responseLines.length + 200
        schedule(() => {
          if (generationIdRef.current !== currentGenerationId) return
          if (shouldShowReportButtons && responseLines[0]?.toLowerCase().includes('analyzing the advertiser')) {
            onCampaignCanvasChange?.(true)
          }
          updateAssistantTurn(turnId, turn => ({
            ...turn,
            showReportButtons: shouldShowReportButtons,
            showResponseActions: true,
            stage: 'sources',
          }))

          if (sources.length === 0) {
            updateAssistantTurn(turnId, turn => ({ ...turn, stage: 'done' }))
            setIsGenerating(false)
            return
          }

          sources.forEach((_, sourceIndex) => {
            schedule(
              () => {
                if (generationIdRef.current !== currentGenerationId) return
                updateAssistantTurn(turnId, turn => ({
                  ...turn,
                  visibleSourcesCount: Math.max(turn.visibleSourcesCount, sourceIndex + 1),
                }))

                if (sourceIndex === sources.length - 1) {
                  updateAssistantTurn(turnId, turn => ({ ...turn, stage: 'done' }))
                  setIsGenerating(false)
                }
              },
              450 * (sourceIndex + 1),
            )
          })
        }, reportDelay)
      }, finalStartDelay)
    }, initialDelayMs)
  }

  const handleAssistantResponseAction = async (
    turn: AssistantTurnState,
    action: 'copy' | 'refresh' | 'thumbs-down' | 'thumbs-up',
  ) => {
    const feedbackTarget = `assistant-actions:${turn.id}`

    if (action === 'copy') {
      try {
        const responseText = turn.responseLines.join('\n').trim()
        await navigator.clipboard.writeText(responseText)
        showActionFeedback('Copied', feedbackTarget)
      } catch {
        showActionFeedback('Unable to copy', feedbackTarget)
      }
      return
    }

    if (action === 'refresh') {
      const currentGenerationId = generationIdRef.current + 1
      generationIdRef.current = currentGenerationId
      clearGenerationTimers()

      const nextResponse =
        turn.stage === 'stopped'
          ? buildAssistantResponse(turn.prompt)
          : {
              thinkingSummary: turn.thinkingSummary,
              thinkingDetails: turn.thinkingDetails,
              reasoningSummary: turn.reasoningSummary,
              reasoningLines: turn.reasoningLines,
              responseLines: turn.responseLines,
              responseBulletCount: turn.responseBulletCount,
              sources: turn.sources,
              showDemandChart: turn.showDemandChart,
              showDemandErrorState: turn.showDemandErrorState,
              showCampaignSuccessState: turn.showCampaignSuccessState,
              showCampaignAlreadyExistsState: turn.showCampaignAlreadyExistsState,
              showCampaignTable: turn.showCampaignTable,
              campaignRows: turn.campaignRows,
              reportPrimaryActionLabel: turn.reportPrimaryActionLabel,
              reportSecondaryActionLabel: turn.reportSecondaryActionLabel,
              showReportButtons: turn.showReportButtons,
            }

      updateAssistantTurn(turn.id, currentTurn => ({
        ...currentTurn,
        thinkingSummary: nextResponse.thinkingSummary,
        thinkingDetails: nextResponse.thinkingDetails,
        reasoningSummary: nextResponse.reasoningSummary,
        reasoningLines: nextResponse.reasoningLines,
        responseLines: nextResponse.responseLines,
        responseBulletCount: nextResponse.responseBulletCount,
        sources: nextResponse.sources,
        visibleReasoningCount: 0,
        visibleResponseCount: 0,
        visibleSourcesCount: 0,
        isReasoningExpanded: true,
        isReasoningVisible: true,
        isSourcesExpanded: false,
        showReportButtons: false,
        showResponseActions: false,
        responseFeedback: null,
        showDemandChart: nextResponse.showDemandChart,
        showDemandErrorState: nextResponse.showDemandErrorState,
        showCampaignSuccessState: nextResponse.showCampaignSuccessState,
        showCampaignAlreadyExistsState: nextResponse.showCampaignAlreadyExistsState,
        showCampaignTable: nextResponse.showCampaignTable,
        campaignRows: nextResponse.campaignRows,
        reportPrimaryActionLabel: nextResponse.reportPrimaryActionLabel,
        reportSecondaryActionLabel: nextResponse.reportSecondaryActionLabel,
        stage: 'thinking',
      }))

      window.requestAnimationFrame(() => {
        scrollToAssistantTurn(turn.id)
      })

      setIsGenerating(true)
      showActionFeedback('Regenerating response', feedbackTarget)
      replayAssistantTurnResponse(
        turn.id,
        currentGenerationId,
        nextResponse.reasoningLines,
        nextResponse.responseLines,
        nextResponse.sources,
        nextResponse.showReportButtons,
      )
      return
    }

    if (action === 'thumbs-up') {
      updateAssistantTurn(turn.id, currentTurn => ({
        ...currentTurn,
        responseFeedback: 'thumbs-up',
      }))
      showActionFeedback('Thanks for the feedback', feedbackTarget)
      return
    }

    updateAssistantTurn(turn.id, currentTurn => ({
      ...currentTurn,
      responseFeedback: 'thumbs-down',
    }))
    setResponseFeedbackModalState({
      turnId: turn.id,
      feedbackText: '',
    })
  }

  const updateAssistantTurn = (turnId: string, updater: (turn: AssistantTurnState) => AssistantTurnState) => {
    setActiveTurns(currentTurns => currentTurns.map(turn => (turn.id === turnId ? updater(turn) : turn)))
  }

  const handleToggleReasoningDetails = (turnId: string, anchorElement: HTMLElement | null) => {
    preserveScrollPosition(anchorElement, () => {
      updateAssistantTurn(turnId, turn => {
        if (turn.stage === 'thinking' || turn.stage === 'reasoning') return turn
        return { ...turn, isReasoningExpanded: !turn.isReasoningExpanded }
      })
    })
  }

  const handleToggleSourcesDetails = (turnId: string) => {
    // Open the Sources panel for this turn (bottom sheet in sidebar/floating, right panel in full-screen).
    setSourcesPanelTurnId(currentTurnId => (currentTurnId === turnId ? null : turnId))
  }

  const handleCloseSourcesPanel = () => {
    setSourcesPanelTurnId(null)
  }

  const handleStopGeneration = () => {
    generationIdRef.current += 1
    clearGenerationTimers()
    setActiveTurns(currentTurns => {
      if (currentTurns.length === 0) return currentTurns

      const lastTurnIndex = currentTurns.length - 1
      const lastTurn = currentTurns[lastTurnIndex]

      if (lastTurn.stage === 'done' || lastTurn.stage === 'stopped') {
        return currentTurns
      }

      const stoppedTurn: AssistantTurnState = {
        ...lastTurn,
        responseLines: ["Alright, I've stopped generating the response."],
        responseBulletCount: 0,
        sources: [],
        visibleReasoningCount: 0,
        visibleResponseCount: 1,
        visibleSourcesCount: 0,
        showReportButtons: false,
        showResponseActions: true,
        responseFeedback: null,
        showDemandChart: false,
        showDemandErrorState: false,
        showCampaignSuccessState: false,
        showCampaignAlreadyExistsState: false,
        showCampaignTable: false,
        campaignRows: [],
        stage: 'stopped',
      }

      return [...currentTurns.slice(0, lastTurnIndex), stoppedTurn]
    })
    setIsGenerating(false)
  }

  const handleAttachmentInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? [])
    if (selectedFiles.length === 0) return

    const supportedFiles = selectedFiles.filter(file => {
      const extension = file.name.split('.').pop()?.toLowerCase() ?? ''
      return ACCEPTED_ATTACHMENT_EXTENSIONS.includes(extension)
    })

    if (supportedFiles.length === 0) {
      event.target.value = ''
      return
    }

    setComposerAttachments(currentAttachments => {
      const existingKeys = new Set(
        currentAttachments.map(
          attachment => `${attachment.file.name}-${attachment.file.size}-${attachment.file.lastModified}`,
        ),
      )

      const uniqueIncoming = supportedFiles
        .filter(file => !existingKeys.has(`${file.name}-${file.size}-${file.lastModified}`))
        .map(file => ({
          id: `attachment-${Date.now()}-${file.name}-${file.lastModified}`,
          file,
        }))

      return [...currentAttachments, ...uniqueIncoming]
    })

    event.target.value = ''
  }

  const handleRemoveAttachment = (attachmentId: string) => {
    setComposerAttachments(currentAttachments =>
      currentAttachments.filter(attachment => attachment.id !== attachmentId),
    )
  }

  const runPrompt = (
    promptTextToSend: string,
    userAttachmentNames: string[] = [],
    options: { campaignAlreadyExists?: boolean } = {},
  ) => {
    setSelectedRecentChatId(null)
    setOpenRecentChatMenuId(null)
    const currentGenerationId = generationIdRef.current + 1
    generationIdRef.current = currentGenerationId
    clearGenerationTimers()

    if (isAmadeusDspPrompt(promptTextToSend)) {
      // The Amadeus DSP flow is a separate scripted conversation that starts a fresh thread.
      // Reset the campaign flow so only one scripted flow is ever active at a time.
      setActiveTurns([])
      setIsGenerating(false)
      resetCampaignFlow()
      startAmadeusDspFlow(promptTextToSend)
      return
    }

    if (isCampaignFlowPrompt(promptTextToSend)) {
      // The campaign flow is a scripted conversation that starts a fresh thread.
      setActiveTurns([])
      setIsGenerating(false)
      resetAmadeusDspFlow()
      startCampaignFlow(promptTextToSend)
      return
    }

    const turnId = `turn-${Date.now()}`
    const {
      thinkingSummary,
      thinkingDetails,
      reasoningSummary,
      reasoningLines,
      responseLines,
      responseBulletCount,
      sources,
      showReportButtons,
      showDemandChart,
      showDemandErrorState,
      showCampaignSuccessState,
      showCampaignAlreadyExistsState,
      showCampaignTable,
      campaignRows,
      reportPrimaryActionLabel,
      reportSecondaryActionLabel,
    } = buildAssistantResponse(promptTextToSend, options)

    setActiveTurns(currentTurns => [
      ...currentTurns,
      {
        id: turnId,
        prompt: promptTextToSend,
        timestamp: new Date().toISOString(),
        userAttachmentNames,
        thinkingSummary,
        thinkingDetails,
        reasoningSummary,
        reasoningLines,
        responseLines,
        responseBulletCount,
        sources,
        isThinkingExpanded: false,
        isReasoningExpanded: true,
        isReasoningVisible: true,
        isSourcesExpanded: false,
        visibleReasoningCount: 0,
        visibleResponseCount: 0,
        visibleSourcesCount: 0,
        showReportButtons: false,
        showResponseActions: false,
        responseFeedback: null,
        showDemandChart,
        showDemandErrorState,
        showCampaignSuccessState,
        showCampaignAlreadyExistsState,
        showCampaignTable,
        campaignRows,
        reportPrimaryActionLabel,
        reportSecondaryActionLabel,
        stage: 'thinking',
      },
    ])
    setIsGenerating(true)
    replayAssistantTurnResponse(turnId, currentGenerationId, reasoningLines, responseLines, sources, showReportButtons)
  }

  const handleSendPrompt = () => {
    if (isGenerating) {
      handleStopGeneration()
      return
    }

    const promptText = inputValue.trim()
    if (!promptText && composerAttachments.length === 0) return

    const promptTextToSend =
      promptText ||
      `Please analyze the attached file${composerAttachments.length > 1 ? 's' : ''}: ${composerAttachments
        .map(attachment => attachment.file.name)
        .join(', ')}`

    clearCampaignFlowSuggestedPrompts()
    runPrompt(
      promptTextToSend,
      composerAttachments.map(attachment => attachment.file.name),
    )
    setInputValue('')
    setComposerAttachments([])
  }

  const visiblePromptLibraryItems = [...promptLibraryItems, ...userPromptLibraryItems].filter(prompt => {
    const searchTarget = `${prompt.textBefore}${prompt.token}${prompt.textAfter}`.toLowerCase()
    if (libraryTab === 'your-prompts') {
      const isSavedPresetPrompt = savedPromptIds.includes(prompt.id)
      const isUserPrompt = prompt.id.startsWith('user-prompt-')
      const isAdvertisingPrompt = prompt.author === 'Advertising'
      return (
        (isSavedPresetPrompt || isUserPrompt || isAdvertisingPrompt) && searchTarget.includes(searchValue.toLowerCase())
      )
    }

    return searchTarget.includes(searchValue.toLowerCase())
  })

  const visibleRecentChats = recentChats.filter(recentChat => {
    const searchTarget = `${recentChat.title} ${getRecentChatDateLabel(recentChat.openedAt)}`.toLowerCase()
    return searchTarget.includes(recentSearchValue.toLowerCase())
  })

  const pinnedRecentChats = visibleRecentChats.filter(recentChat => recentChat.isPinned)
  const unpinnedRecentChats = visibleRecentChats.filter(recentChat => !recentChat.isPinned)

  const groupedRecentChats = unpinnedRecentChats.reduce<Array<{ dateLabel: string; chats: RecentChatItem[] }>>(
    (groups, recentChat) => {
      const dateLabel = getRecentChatDateLabel(recentChat.openedAt)
      const existingGroup = groups.find(group => group.dateLabel === dateLabel)
      if (existingGroup) {
        existingGroup.chats.push(recentChat)
        return groups
      }

      return [...groups, { dateLabel, chats: [recentChat] }]
    },
    [],
  )

  const visibleRecentChatGroups = [
    ...(pinnedRecentChats.length > 0 ? [{ dateLabel: 'Pinned chat', chats: pinnedRecentChats }] : []),
    ...groupedRecentChats,
  ]

  const handleToggleCampaignRow = (turnId: string, campaignRowId: string) => {
    setExpandedCampaignRowsByTurnId(currentRows => {
      const expandedRowIds = currentRows[turnId] ?? []
      const isExpanded = expandedRowIds.includes(campaignRowId)

      return {
        ...currentRows,
        [turnId]: isExpanded
          ? expandedRowIds.filter(expandedRowId => expandedRowId !== campaignRowId)
          : [...expandedRowIds, campaignRowId],
      }
    })
  }

  const marketChartPaxMax = Math.max(...marketDemandChartBars.map(item => Math.max(item.paxThisYear, item.paxLastYear)))
  const marketCompetitorLinePoints = marketDemandChartBars.map((item, index) => ({
    x: marketDemandChartBars.length === 1 ? 50 : ((index + 0.5) / marketDemandChartBars.length) * 100,
    y: Math.max(4, 100 - item.competitorAnalysis - 2),
  }))
  const marketCompetitorLinePath = buildSmoothLinePath(marketCompetitorLinePoints)

  const downloadTextContent = (fileName: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    link.click()
    window.URL.revokeObjectURL(url)
  }

  const handleVisualDownload = (turn: AssistantTurnState, visualType: 'campaign-table' | 'demand-chart') => {
    const feedbackTarget = `assistant-actions:${turn.id}`

    if (visualType === 'campaign-table') {
      const header = 'Platform,Campaigns,Spend,Status\n'
      const rows = (turn.campaignRows ?? [])
        .map(row => `${row.platform},${row.totalCampaigns},${row.spend},${row.status}`)
        .join('\n')
      const csv = `${header}${rows}`
      downloadTextContent('campaign-table.csv', csv)
      showActionFeedback('Table downloaded', feedbackTarget)
      return
    }

    const header = 'Destination,Pax This Year,Pax Last Year,Competitor Analysis\n'
    const rows = marketDemandChartBars
      .map(item => `${item.label},${item.paxThisYear},${item.paxLastYear},${item.competitorAnalysis}`)
      .join('\n')
    const csv = `${header}${rows}`
    downloadTextContent('demand-chart.csv', csv)
    showActionFeedback('Chart data downloaded', feedbackTarget)
  }

  const handleOpenVisualModal = (turnId: string, visualType: 'campaign-table' | 'demand-chart') => {
    setVisualModalState({ turnId, visualType })
  }

  // Closing the chat should also dismiss any open canvas/workspace so it doesn't linger.
  const handleClosePanel = () => {
    closeCampaignWorkspace()
    onClosePanel?.()
  }

  const handleCloseResponseFeedbackModal = () => {
    setResponseFeedbackModalState(null)
  }

  const handleSubmitResponseFeedback = () => {
    if (!responseFeedbackModalState) return

    showActionFeedback('Feedback noted', `assistant-actions:${responseFeedbackModalState.turnId}`)
    setResponseFeedbackModalState(null)
  }

  const renderVisualActions = (turn: AssistantTurnState, visualType: 'campaign-table' | 'demand-chart') => (
    <AssistantVisualActions data-visual-actions='true'>
      <AssistantActionItem>
        <AssistantActionIconButton
          iconName='download'
          color='currentColor'
          width={14}
          height={14}
          title='Download'
          onClick={() => handleVisualDownload(turn, visualType)}
        />
        <AssistantActionTooltip data-assistant-action-tooltip='true'>Download</AssistantActionTooltip>
      </AssistantActionItem>
      <AssistantActionItem>
        <AssistantActionIconButton
          iconName='expand'
          color='currentColor'
          width={14}
          height={14}
          title='Open full modal'
          onClick={() => handleOpenVisualModal(turn.id, visualType)}
        />
        <AssistantActionTooltip data-assistant-action-tooltip='true'>Open full modal</AssistantActionTooltip>
      </AssistantActionItem>
    </AssistantVisualActions>
  )

  const renderCampaignTable = (turn: AssistantTurnState, withActions: boolean) => (
    <AssistantVisualCard>
      <AssistantCampaignTable>
        <AssistantCampaignTableHeaderRow>
          <AssistantCampaignTableHeaderCell>Platform</AssistantCampaignTableHeaderCell>
          <AssistantCampaignTableHeaderCell>Campaigns</AssistantCampaignTableHeaderCell>
          <AssistantCampaignTableHeaderCell>Spend</AssistantCampaignTableHeaderCell>
          <AssistantCampaignTableHeaderCell>Status</AssistantCampaignTableHeaderCell>
        </AssistantCampaignTableHeaderRow>

        {(turn.campaignRows ?? []).map(platformRow => {
          const isExpanded = (expandedCampaignRowsByTurnId[turn.id] ?? []).includes(platformRow.id)
          return (
            <div key={`${turn.id}-${platformRow.id}`}>
              <AssistantCampaignTableRow>
                <AssistantCampaignTableCell>
                  <AssistantCampaignExpandButton
                    type='button'
                    onClick={() => handleToggleCampaignRow(turn.id, platformRow.id)}
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                        transition: 'transform 0.15s ease',
                      }}
                    >
                      <Icon name='caretDown' width={10} height={10} color={colors.cloud_70} />
                    </span>
                    {platformRow.platform}
                  </AssistantCampaignExpandButton>
                </AssistantCampaignTableCell>
                <AssistantCampaignTableCell>{platformRow.totalCampaigns}</AssistantCampaignTableCell>
                <AssistantCampaignTableCell>{platformRow.spend}</AssistantCampaignTableCell>
                <AssistantCampaignTableCell>
                  <AssistantCampaignStatus statusKind={platformRow.status}>
                    {platformRow.status}
                  </AssistantCampaignStatus>
                </AssistantCampaignTableCell>
              </AssistantCampaignTableRow>

              {isExpanded ? (
                <AssistantCampaignSubRows>
                  {platformRow.campaigns.map(campaign => (
                    <AssistantCampaignSubRow key={`${turn.id}-${platformRow.id}-${campaign.id}`}>
                      <AssistantCampaignTableCell />
                      <AssistantCampaignTableCell style={{ paddingLeft: 28 }}>
                        {campaign.campaignName}
                      </AssistantCampaignTableCell>
                      <AssistantCampaignTableCell>{campaign.budget}</AssistantCampaignTableCell>
                      <AssistantCampaignTableCell>
                        <AssistantCampaignStatus statusKind={campaign.status}>
                          {campaign.status}
                        </AssistantCampaignStatus>
                      </AssistantCampaignTableCell>
                    </AssistantCampaignSubRow>
                  ))}
                </AssistantCampaignSubRows>
              ) : null}
            </div>
          )
        })}
      </AssistantCampaignTable>
      {withActions ? renderVisualActions(turn, 'campaign-table') : null}
    </AssistantVisualCard>
  )

  const renderDemandChart = (turn: AssistantTurnState, withActions: boolean) => (
    <AssistantVisualCard>
      <AssistantDemandChart>
        <AssistantDemandChartTitle>High-demand destination markets</AssistantDemandChartTitle>
        <AssistantDemandChartBars>
          <AssistantDemandChartValue>
            {marketDemandLeftAxisTicks.map(tick => (
              <span key={`${turn.id}-left-y-${tick}`}>{tick}</span>
            ))}
          </AssistantDemandChartValue>
          <AssistantDemandChartBarColumn>
            <AssistantDemandChartLineLayer viewBox='0 0 100 100' preserveAspectRatio='none'>
              <path
                d={marketCompetitorLinePath}
                fill='none'
                stroke={colors.violet_60}
                strokeWidth='1.6'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </AssistantDemandChartLineLayer>
            <AssistantDemandChartPointsLayer>
              {marketCompetitorLinePoints.map((point, index) => {
                const item = marketDemandChartBars[index]
                return (
                  <AssistantDemandChartPoint
                    key={`${turn.id}-line-dot-${item.label}`}
                    style={{ left: `${point.x}%`, top: `${point.y}%` }}
                  />
                )
              })}
            </AssistantDemandChartPointsLayer>
            <AssistantDemandChartBarFill>
              {marketDemandChartBars.map(item => (
                <AssistantDemandDestinationGroup key={`${turn.id}-demand-${item.label}`}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-end',
                      gap: '6px',
                      height: '100%',
                      width: '70%',
                      margin: '0 auto',
                    }}
                  >
                    <AssistantDemandBar
                      style={{
                        height: `${Math.max(16, Math.round((item.paxThisYear / marketChartPaxMax) * 120))}px`,
                        background: colors.sky_60,
                      }}
                    />
                    <AssistantDemandBar
                      style={{
                        height: `${Math.max(16, Math.round((item.paxLastYear / marketChartPaxMax) * 120))}px`,
                        background: colors.sky_30,
                      }}
                    />
                  </div>
                  <AssistantDemandChartLabel>{item.label}</AssistantDemandChartLabel>
                </AssistantDemandDestinationGroup>
              ))}
            </AssistantDemandChartBarFill>
          </AssistantDemandChartBarColumn>
          <AssistantDemandChartValue alignRight>
            {marketDemandRightAxisTicks.map(tick => (
              <span key={`${turn.id}-right-y-${tick}`}>{tick}%</span>
            ))}
          </AssistantDemandChartValue>
        </AssistantDemandChartBars>
        <AssistantDemandChartLegend>
          <AssistantDemandChartLegendItem>
            <AssistantDemandChartLegendSwatch style={{ background: colors.sky_60 }} />
            Pax this year
          </AssistantDemandChartLegendItem>
          <AssistantDemandChartLegendItem>
            <AssistantDemandChartLegendSwatch style={{ background: colors.sky_30 }} />
            Pax last year
          </AssistantDemandChartLegendItem>
          <AssistantDemandChartLegendItem>
            <AssistantDemandChartLegendSwatch style={{ background: colors.violet_60, borderRadius: '999px' }} />
            Competitor analysis
          </AssistantDemandChartLegendItem>
        </AssistantDemandChartLegend>
      </AssistantDemandChart>
      {withActions ? renderVisualActions(turn, 'demand-chart') : null}
    </AssistantVisualCard>
  )

  const activeVisualModalTurn = visualModalState
    ? (activeTurns.find(turn => turn.id === visualModalState.turnId) ?? null)
    : null

  const renderActiveVisualModal = () => {
    if (!visualModalState || !activeVisualModalTurn) {
      return null
    }

    return (
      <AssistantFullModalOverlay role='dialog' aria-modal='true' onClick={() => setVisualModalState(null)}>
        <AssistantFullModalDialog onClick={event => event.stopPropagation()}>
          <AssistantFullModalHeader>
            <AssistantFullModalTitle>
              {visualModalState.visualType === 'campaign-table'
                ? 'Campaign table (full view)'
                : 'Demand chart (full view)'}
            </AssistantFullModalTitle>
            <AssistantFullModalClose type='button' onClick={() => setVisualModalState(null)}>
              <Icon name='xmark' width={14} height={14} color={colors.cloud_80} title='Close full modal' />
            </AssistantFullModalClose>
          </AssistantFullModalHeader>
          <div style={{ padding: '0 24px 24px' }}>
            {visualModalState.visualType === 'campaign-table'
              ? renderCampaignTable(activeVisualModalTurn, false)
              : renderDemandChart(activeVisualModalTurn, false)}
          </div>
        </AssistantFullModalDialog>
      </AssistantFullModalOverlay>
    )
  }

  const renderResponseFeedbackModal = () => {
    if (!responseFeedbackModalState) {
      return null
    }

    return (
      <AssistantFullModalOverlay role='dialog' aria-modal='true' onClick={handleCloseResponseFeedbackModal}>
        <AssistantFullModalDialog onClick={event => event.stopPropagation()}>
          <AssistantFullModalHeader>
            <AssistantFullModalTitleRow>
              <AssistantFullModalTitle>Help us improve this response</AssistantFullModalTitle>
            </AssistantFullModalTitleRow>
            <AssistantFullModalClose type='button' onClick={handleCloseResponseFeedbackModal}>
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
              value={responseFeedbackModalState.feedbackText}
              onChange={event =>
                setResponseFeedbackModalState(currentState =>
                  currentState
                    ? {
                        ...currentState,
                        feedbackText: event.target.value,
                      }
                    : currentState,
                )
              }
            />
          </AssistantFullModalBody>
          <AssistantFullModalActions>
            <AssistantFullModalSecondaryButton type='button' onClick={handleCloseResponseFeedbackModal}>
              Cancel
            </AssistantFullModalSecondaryButton>
            <AssistantFullModalPrimaryButton type='button' onClick={handleSubmitResponseFeedback}>
              Submit feedback
            </AssistantFullModalPrimaryButton>
          </AssistantFullModalActions>
        </AssistantFullModalDialog>
      </AssistantFullModalOverlay>
    )
  }

  const renderAiInfoModal = () => {
    if (!isAiInfoModalOpen) {
      return null
    }

    return (
      <AssistantFullModalOverlay role='dialog' aria-modal='true' onClick={() => setIsAiInfoModalOpen(false)}>
        <AssistantFullModalDialog onClick={event => event.stopPropagation()}>
          <AssistantFullModalHeader>
            <AssistantFullModalTitleRow>
              <AssistantFullModalTitle>Important information about the AI-powered assistant</AssistantFullModalTitle>
            </AssistantFullModalTitleRow>
            <AssistantFullModalClose type='button' onClick={() => setIsAiInfoModalOpen(false)}>
              <Icon name='xmark' width={14} height={14} color={colors.cloud_80} title='Close information modal' />
            </AssistantFullModalClose>
          </AssistantFullModalHeader>
          <AssistantFullModalBody>
            <AssistantFullModalList>
              <AssistantFullModalListItem>
                You are interacting with an automated system and not a human agent.
              </AssistantFullModalListItem>
              <AssistantFullModalListItem>
                Responses are generated automatically and may be inaccurate, incomplete, or outdated.
              </AssistantFullModalListItem>
              <AssistantFullModalListItem>
                Please review information carefully before relying on it for business, operational, or customer-facing
                decisions.
              </AssistantFullModalListItem>
              <AssistantFullModalListItem>
                You are solely responsible for evaluating and verifying the accuracy, completeness, and suitability of
                any information provided.
              </AssistantFullModalListItem>
              <AssistantFullModalListItem>
                Information provided by the assistant does not replace information available in authoritative systems,
                documentation, or support channels.
              </AssistantFullModalListItem>
              <AssistantFullModalListItem>
                Personal information you provide may be processed using AI, as described in the applicable Privacy
                Notice.
              </AssistantFullModalListItem>
            </AssistantFullModalList>
          </AssistantFullModalBody>
          <AssistantFullModalActions>
            <AssistantFullModalPrimaryButton type='button' onClick={() => setIsAiInfoModalOpen(false)}>
              Close
            </AssistantFullModalPrimaryButton>
          </AssistantFullModalActions>
        </AssistantFullModalDialog>
      </AssistantFullModalOverlay>
    )
  }

  const renderSourcesPanel = () => {
    if (!sourcesPanelTurnId) {
      return null
    }

    const sourcesTurn = activeTurns.find(turn => turn.id === sourcesPanelTurnId)
    if (!sourcesTurn || sourcesTurn.sources.length === 0) {
      return null
    }

    const isFullScreen = layoutMode === 'full-screen'

    return (
      <AssistantSourcesPanel fullScreen={isFullScreen} role='dialog' aria-label='Sources'>
        {isFullScreen ? null : <AssistantSourcesPanelHandle />}
        <AssistantSourcesPanelHeader>
          <AssistantSourcesPanelTitle>Sources</AssistantSourcesPanelTitle>
          <HeaderIconButton
            iconName='xmark'
            color={colors.sky_60}
            width={14}
            height={14}
            title='Close sources'
            onClick={handleCloseSourcesPanel}
          />
        </AssistantSourcesPanelHeader>
        <AssistantSourcesPanelBody>
          {sourcesTurn.sources.map(source => (
            <AssistantSourcesPanelItem
              key={`${sourcesTurn.id}-sources-panel-${source.id}`}
              type='button'
              title={`Open ${source.title} in new window`}
              onClick={() => window.open(getSourceUrl(source.domain), '_blank', 'noopener,noreferrer')}
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
    )
  }

  return (
    <Panel>
      <Header>
        <HeaderLeft>
          <Icon name='sparkles' width={14} height={14} title='Amadeus Max assistant' />
          <HeaderTitle>Amadeus Max</HeaderTitle>
        </HeaderLeft>
        <HeaderActions>
          <IconTooltipTrigger>
            <HeaderIconButton
              iconName='message-plus'
              color='currentColor'
              width={14}
              height={14}
              aria-label='Start new chat'
              onClick={() => {
                setSelectedRecentChatId(null)
                setInputValue('')
                setActiveTurns([])
                resetCampaignFlow()
                resetAmadeusDspFlow()
                setIsPromptLibraryOpen(false)
                setIsRecentChatsOpen(false)
              }}
            />
            <IconTooltip data-icon-tooltip='true'>Start new chat</IconTooltip>
          </IconTooltipTrigger>
          <IconTooltipTrigger>
            <HeaderIconButton
              iconName='clock-rotate-left'
              color='currentColor'
              width={14}
              height={14}
              aria-label='Recent chat history'
              selected={isRecentChatsOpen}
              onClick={handleRecentChatsToggle}
            />
            <IconTooltip data-icon-tooltip='true'>Recent chat history</IconTooltip>
          </IconTooltipTrigger>
          <IconTooltipTrigger>
            <HeaderIconButton
              iconName='sidebar-flip'
              color='currentColor'
              width={14}
              height={14}
              aria-label='Switch view'
              selected={isSwitchOpen}
              onClick={() => setIsSwitchOpen(prev => !prev)}
            />
            <IconTooltip data-icon-tooltip='true'>Switch view</IconTooltip>
          </IconTooltipTrigger>
          <IconTooltipTrigger>
            <HeaderIconButton
              iconName='xmark'
              color='currentColor'
              width={14}
              height={14}
              aria-label='Close chat'
              onClick={handleClosePanel}
            />
            <IconTooltip data-icon-tooltip='true'>Close chat</IconTooltip>
          </IconTooltipTrigger>
        </HeaderActions>
      </Header>

      {isSwitchOpen ? (
        <SwitchViewDropdown>
          <DropdownTitle>Switch to</DropdownTitle>
          <DropdownItem type='button' onClick={() => handleLayoutModeSelect('sidebar')}>
            <DropdownItemLeft>
              <Icon name='sidebar-flip' width={14} height={14} title='Sidebar view' />
              Sidebar
            </DropdownItemLeft>
            {layoutMode === 'sidebar' ? <Icon name='check' width={14} height={14} title='Selected layout' /> : null}
          </DropdownItem>
          <DropdownItem type='button' onClick={() => handleLayoutModeSelect('full-screen')}>
            <DropdownItemLeft>
              <Icon name='expand' width={14} height={14} title='Full screen view' />
              Full screen
            </DropdownItemLeft>
            {layoutMode === 'full-screen' ? <Icon name='check' width={14} height={14} title='Selected layout' /> : null}
          </DropdownItem>
          <DropdownItem type='button' onClick={() => handleLayoutModeSelect('floating')}>
            <DropdownItemLeft>
              <Icon name='mobile' width={14} height={14} title='Floating view' />
              Floating
            </DropdownItemLeft>
            {layoutMode === 'floating' ? <Icon name='check' width={14} height={14} title='Selected layout' /> : null}
          </DropdownItem>
        </SwitchViewDropdown>
      ) : null}

      {renderSourcesPanel()}

      {isPromptLibraryOpen ? (
        <PromptLibraryOverlay fullScreen={layoutMode === 'full-screen'}>
          <PromptLibrarySubheader fullScreen={layoutMode === 'full-screen'}>
            {layoutMode === 'full-screen' ? (
              <>
                <PromptLibraryTitle>Prompt library</PromptLibraryTitle>
                <PromptLibrarySubheaderActions>
                  <HeaderIconButton
                    iconName='xmark'
                    color='currentColor'
                    width={14}
                    height={14}
                    title='Close prompt library'
                    onClick={() => setIsPromptLibraryOpen(false)}
                  />
                </PromptLibrarySubheaderActions>
              </>
            ) : (
              <>
                <HeaderIconButton
                  iconName='arrow-left'
                  color='currentColor'
                  width={14}
                  height={14}
                  title='Back'
                  onClick={() => setIsPromptLibraryOpen(false)}
                />
                <PromptLibraryTitle>Prompt library</PromptLibraryTitle>
              </>
            )}
          </PromptLibrarySubheader>
          <PromptLibraryHeader>
            <PromptLibrarySearch>
              <Icon name='search' width={14} height={14} title='Search prompts' />
              <ComposerInput
                placeholder='Search prompt'
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
              />
            </PromptLibrarySearch>
          </PromptLibraryHeader>
          <PromptLibraryTabs>
            <PromptLibraryTab
              active={libraryTab === 'suggested'}
              type='button'
              onClick={() => setLibraryTab('suggested')}
            >
              Suggested
            </PromptLibraryTab>
            <PromptLibraryTab
              active={libraryTab === 'your-prompts'}
              type='button'
              onClick={() => setLibraryTab('your-prompts')}
            >
              Your prompts
            </PromptLibraryTab>
          </PromptLibraryTabs>
          <PromptLibraryBody>
            {visiblePromptLibraryItems.map(prompt => {
              const promptKey = getPromptKey(prompt)
              const isPromptSaved = savedPromptIds.includes(promptKey)

              return (
                <PromptLibraryItem key={prompt.id}>
                  <PromptLibraryItemRow onClick={() => handlePromptSelect(prompt)}>
                    <PromptLibraryCard>
                      <PromptLibraryCardContent>
                        {prompt.textBefore}
                        <PromptToken>{prompt.token}</PromptToken>
                        {prompt.textAfter}
                      </PromptLibraryCardContent>
                      <PromptLibraryCardActions>
                        <PromptLibraryAuthor>By {prompt.author ?? 'Prompt library'}</PromptLibraryAuthor>
                        <PromptLibrarySaveArea>
                          {actionFeedback && actionFeedbackTargetText === `prompt-library:${promptKey}` ? (
                            <PromptLibraryActionFeedback>{actionFeedback}</PromptLibraryActionFeedback>
                          ) : null}
                          <PromptLibrarySaveButton
                            type='button'
                            saved={isPromptSaved}
                            aria-label={isPromptSaved ? 'Saved prompt' : 'Save prompt'}
                            onClick={event => {
                              event.stopPropagation()
                              handlePromptSave(prompt)
                            }}
                          >
                            <Icon
                              name={isPromptSaved ? 'bookmark-solid' : 'bookmark'}
                              width={14}
                              height={14}
                              color={isPromptSaved ? colors.sky_60 : colors.cloud_100}
                              title={isPromptSaved ? 'Prompt saved' : 'Save prompt'}
                            />
                          </PromptLibrarySaveButton>
                        </PromptLibrarySaveArea>
                      </PromptLibraryCardActions>
                    </PromptLibraryCard>
                  </PromptLibraryItemRow>
                </PromptLibraryItem>
              )
            })}
          </PromptLibraryBody>
        </PromptLibraryOverlay>
      ) : null}

      {isRecentChatsOpen ? (
        <PromptLibraryOverlay fullScreen={layoutMode === 'full-screen'}>
          <PromptLibrarySubheader fullScreen={layoutMode === 'full-screen'}>
            {layoutMode === 'full-screen' ? (
              <>
                <PromptLibraryTitle>Recent chats</PromptLibraryTitle>
                <PromptLibrarySubheaderActions>
                  <HeaderIconButton
                    iconName='xmark'
                    color='currentColor'
                    width={14}
                    height={14}
                    title='Close recent chats'
                    onClick={() => setIsRecentChatsOpen(false)}
                  />
                </PromptLibrarySubheaderActions>
              </>
            ) : (
              <>
                <HeaderIconButton
                  iconName='arrow-left'
                  color='currentColor'
                  width={14}
                  height={14}
                  title='Back'
                  onClick={() => setIsRecentChatsOpen(false)}
                />
                <PromptLibraryTitle>Recent chats</PromptLibraryTitle>
              </>
            )}
          </PromptLibrarySubheader>
          <PromptLibraryHeader>
            <PromptLibrarySearch>
              <Icon name='search' width={14} height={14} title='Search recent chats' />
              <ComposerInput
                placeholder='Search chats'
                value={recentSearchValue}
                onChange={e => setRecentSearchValue(e.target.value)}
              />
            </PromptLibrarySearch>
          </PromptLibraryHeader>
          <PromptLibraryBody>
            {visibleRecentChatGroups.map(group => (
              <RecentChatsGroup key={group.dateLabel}>
                <RecentChatsGroupTitle>{group.dateLabel}</RecentChatsGroupTitle>
                <RecentChatsList>
                  {group.chats.map(recentChat => (
                    <RecentChatsRow
                      key={recentChat.id}
                      active={selectedRecentChatId === recentChat.id}
                      editing={renamingRecentChatId === recentChat.id}
                      onClick={() => {
                        if (renamingRecentChatId === recentChat.id) {
                          return
                        }
                        handleRecentChatSelect(recentChat)
                      }}
                    >
                      <RecentChatsText>
                        {renamingRecentChatId === recentChat.id ? (
                          <RecentChatsRenameRow onClick={event => event.stopPropagation()}>
                            <RecentChatsRenameInput
                              value={renamingTitle}
                              autoFocus
                              onChange={event => setRenamingTitle(event.target.value)}
                              onBlur={handleRecentChatRenameSave}
                              onKeyDown={event => {
                                if (event.key === 'Enter') {
                                  event.preventDefault()
                                  handleRecentChatRenameSave()
                                }
                                if (event.key === 'Escape') {
                                  event.preventDefault()
                                  handleRecentChatRenameCancel()
                                }
                              }}
                            />
                            <RecentChatsRenameAction
                              type='button'
                              variant='confirm'
                              aria-label='Save chat title'
                              title='Save chat title'
                              onMouseDown={event => event.preventDefault()}
                              onClick={event => {
                                event.stopPropagation()
                                handleRecentChatRenameSave()
                              }}
                            >
                              <Icon name='check' width={14} height={14} title='Save' />
                            </RecentChatsRenameAction>
                            <RecentChatsRenameAction
                              type='button'
                              variant='cancel'
                              aria-label='Cancel rename'
                              title='Cancel rename'
                              onMouseDown={event => event.preventDefault()}
                              onClick={event => {
                                event.stopPropagation()
                                handleRecentChatRenameCancel()
                              }}
                            >
                              <Icon name='xmark' width={14} height={14} title='Cancel' />
                            </RecentChatsRenameAction>
                          </RecentChatsRenameRow>
                        ) : (
                          <RecentChatsTitleRow>
                            {recentChat.isPinned ? (
                              <span style={{ display: 'inline-flex', transform: 'scaleX(-1)' }}>
                                <Icon
                                  name='thumbtack-angle-solid'
                                  width={14}
                                  height={14}
                                  color={colors.sky_60}
                                  title='Pinned chat'
                                />
                              </span>
                            ) : null}
                            <RecentChatsTitle>{recentChat.title}</RecentChatsTitle>
                          </RecentChatsTitleRow>
                        )}
                      </RecentChatsText>
                      {renamingRecentChatId === recentChat.id ? null : (
                        <RecentChatsActions>
                          <RecentChatsKebab
                            type='button'
                            aria-label='Chat options'
                            title='Chat options'
                            onClick={event => {
                              event.stopPropagation()
                              setOpenRecentChatMenuId(prev => (prev === recentChat.id ? null : recentChat.id))
                            }}
                          >
                            <Icon name='ellipsisVertical' width={14} height={14} title='More actions' />
                          </RecentChatsKebab>
                          {openRecentChatMenuId === recentChat.id ? (
                            <RecentChatsMenu>
                              <RecentChatsMenuItem
                                type='button'
                                onClick={event => {
                                  event.stopPropagation()
                                  handleRecentChatPin(recentChat.id)
                                }}
                              >
                                {recentChat.isPinned ? 'Unpin chat' : 'Pin chat'}
                              </RecentChatsMenuItem>
                              <RecentChatsMenuItem
                                type='button'
                                onClick={event => {
                                  event.stopPropagation()
                                  handleRecentChatRenameStart(recentChat.id)
                                }}
                              >
                                Rename
                              </RecentChatsMenuItem>
                              <RecentChatsMenuItem
                                type='button'
                                destructive
                                onClick={event => {
                                  event.stopPropagation()
                                  handleRecentChatDelete(recentChat.id)
                                }}
                              >
                                Delete
                              </RecentChatsMenuItem>
                            </RecentChatsMenu>
                          ) : null}
                          {actionFeedback && actionFeedbackTargetText === `recent-chat:${recentChat.id}` ? (
                            <RecentChatsActionFeedback>{actionFeedback}</RecentChatsActionFeedback>
                          ) : null}
                        </RecentChatsActions>
                      )}
                    </RecentChatsRow>
                  ))}
                </RecentChatsList>
              </RecentChatsGroup>
            ))}
          </PromptLibraryBody>
        </PromptLibraryOverlay>
      ) : null}

      {/* Stepper on top (above the scroll body). */}
      <CampaignProgressBar />
      <Body
        ref={bodyScrollRef}
        fullScreen={layoutMode === 'full-screen'}
        rightPanelOpen={isRightPanelOpen}
        hasConversation={
          // Top-align when a scoped campaign flow is active (so the context banner sits flush at
          // the top), or for any real conversation; otherwise the generic welcome stays centered.
          showCampaignPromptLanding ||
          hasCampaignFlow ||
          activeTurns.length > 0 ||
          hasDspFlow ||
          Boolean(selectedRecentChat)
        }
      >
        <BodyContent>
          {!showCampaignPromptLanding && (activeTurns.length > 0 || hasCampaignFlow || hasDspFlow) ? (
            <ChatView>
              <ChatThread>
                <CampaignFlowConversation
                  fullWidth={layoutMode === 'full-screen'}
                  onContentChange={scrollChatToBottom}
                />
                <AmadeusDspFlowConversation
                  fullWidth={layoutMode === 'full-screen'}
                  onContentChange={scrollChatToBottom}
                />
                {activeTurns.map((turn, turnIndex) => (
                  <AssistantTurn
                    key={turn.id}
                    ref={element => {
                      assistantTurnRefs.current[turn.id] = element
                    }}
                  >
                    <AssistantPromptBubbleWrap>
                      {(turn.userAttachmentNames?.length ?? 0) > 0 ? (
                        <AssistantPromptAttachmentChips>
                          {turn.userAttachmentNames?.map((fileName, index) => (
                            <AssistantPromptAttachmentChip key={`${turn.id}-attachment-${index}`}>
                              <Icon
                                name='paperclip'
                                width={10}
                                height={10}
                                color='var(--colors/sky/sky-70, #0C66E1)'
                                title='Attached file'
                              />
                              <AssistantPromptAttachmentName>{fileName}</AssistantPromptAttachmentName>
                            </AssistantPromptAttachmentChip>
                          ))}
                        </AssistantPromptAttachmentChips>
                      ) : null}
                      <ChatBubble author='user'>
                        <ChatBubbleContent>{turn.prompt}</ChatBubbleContent>
                        <ChatBubbleActions data-chat-bubble-actions='true'>
                          <ChatBubbleAction
                            type='button'
                            aria-label={
                              isUserPromptSaved(turn.prompt) ? 'Remove from your prompts' : 'Save to your prompts'
                            }
                            onClick={event => {
                              event.stopPropagation()
                              handleSaveUserPrompt(turn.prompt)
                            }}
                          >
                            <Icon
                              name={isUserPromptSaved(turn.prompt) ? 'bookmark-solid' : 'bookmark'}
                              width={14}
                              height={14}
                              color={isUserPromptSaved(turn.prompt) ? colors.sky_60 : colors.cloud_80}
                            />
                            <ChatBubbleActionTooltip data-bubble-tooltip='true'>
                              {isUserPromptSaved(turn.prompt) ? 'Remove prompt' : 'Save prompt'}
                            </ChatBubbleActionTooltip>
                          </ChatBubbleAction>
                          <ChatBubbleAction
                            type='button'
                            aria-label='Copy prompt text'
                            onClick={event => {
                              event.stopPropagation()
                              void handleCopyMessageText(turn.prompt)
                            }}
                          >
                            <Icon name='copy' width={14} height={14} color={colors.cloud_80} />
                            <ChatBubbleActionTooltip data-bubble-tooltip='true'>Copy text</ChatBubbleActionTooltip>
                          </ChatBubbleAction>
                          <ChatBubbleActionsDivider />
                          <ChatBubbleActionsTime>{formatTurnTimestamp(turn.timestamp)}</ChatBubbleActionsTime>
                        </ChatBubbleActions>
                        {actionFeedback && actionFeedbackTargetText === turn.prompt ? (
                          <ChatBubbleActionFeedback>{actionFeedback}</ChatBubbleActionFeedback>
                        ) : null}
                      </ChatBubble>
                      <ChatBubbleTimestamp data-chat-bubble-timestamp='true'>
                        {formatTurnTimestamp(turn.timestamp)}
                      </ChatBubbleTimestamp>
                    </AssistantPromptBubbleWrap>

                    <AssistantContent>
                      {turn.stage !== 'stopped' ? (
                        <>
                          <AssistantSectionRow>
                            <AssistantSectionCaret expanded={turn.isReasoningExpanded}>
                              <Icon name='caretDown' width={10} height={10} color={colors.cloud_70} />
                            </AssistantSectionCaret>
                            <AssistantSectionHeader
                              type='button'
                              onClick={event => handleToggleReasoningDetails(turn.id, event.currentTarget)}
                            >
                              Reasoning
                            </AssistantSectionHeader>
                            {turn.stage === 'thinking' || turn.stage === 'reasoning' ? (
                              <AssistantThinkingDots>
                                <span />
                                <span />
                                <span />
                              </AssistantThinkingDots>
                            ) : null}
                          </AssistantSectionRow>
                          {turn.isReasoningVisible ? (
                            <AssistantDetailsCard
                              fullWidth={layoutMode === 'full-screen'}
                              expanded={turn.isReasoningExpanded}
                            >
                              <AssistantDetailsHeading>Reasoning</AssistantDetailsHeading>
                              {turn.reasoningLines.map((step, index) => {
                                const isComplete = index < turn.visibleReasoningCount
                                const isCurrent =
                                  !isComplete &&
                                  (turn.stage === 'thinking' || turn.stage === 'reasoning') &&
                                  index === turn.visibleReasoningCount

                                return (
                                  <AssistantReasoningLine key={`${turn.id}-reasoning-step-${index}`} active={isCurrent}>
                                    <AssistantReasoningCheck>
                                      {isComplete ? (
                                        <Icon name='checkCircle' width={14} height={14} color={colors.forest_60} />
                                      ) : isCurrent ? (
                                        <AssistantReasoningLoader />
                                      ) : (
                                        <AssistantReasoningPending />
                                      )}
                                    </AssistantReasoningCheck>
                                    <span>{step}</span>
                                  </AssistantReasoningLine>
                                )
                              })}
                            </AssistantDetailsCard>
                          ) : null}
                        </>
                      ) : null}

                      {turn.visibleResponseCount > 0 ? (
                        <>
                          {turn.responseBulletCount > 0 ? (
                            <AssistantResponseCard>
                              <AssistantResponseList>
                                {turn.responseLines
                                  .slice(0, Math.min(turn.visibleResponseCount, turn.responseBulletCount))
                                  .map((line, index) => (
                                    <AssistantResponseListItem key={`${turn.id}-response-bullet-${index}`}>
                                      {line}
                                    </AssistantResponseListItem>
                                  ))}
                              </AssistantResponseList>
                            </AssistantResponseCard>
                          ) : null}
                          {turn.reportSecondaryActionLabel === 'Promote campaign' ? (
                            <AssistantResponseCard>
                              {turn.responseLines.slice(0, turn.visibleResponseCount).map((line, index) => (
                                <AssistantReasoningLine key={`${turn.id}-campaign-step-${index}`}>
                                  <AssistantReasoningCheck>
                                    <Icon
                                      name={turn.showCampaignAlreadyExistsState && index > 0 ? 'xmark' : 'checkCircle'}
                                      width={14}
                                      height={14}
                                      color={
                                        turn.showCampaignAlreadyExistsState && index > 0
                                          ? colors.crimson_60
                                          : colors.sky_60
                                      }
                                    />
                                  </AssistantReasoningCheck>
                                  <span>{line}</span>
                                </AssistantReasoningLine>
                              ))}
                            </AssistantResponseCard>
                          ) : (
                            turn.responseLines
                              .slice(turn.responseBulletCount, turn.visibleResponseCount)
                              .filter(line => line.trim().length > 0)
                              .map((line, index) => (
                                <AssistantBodyText key={`${turn.id}-response-text-${index}`}>{line}</AssistantBodyText>
                              ))
                          )}
                        </>
                      ) : null}

                      {turn.visibleResponseCount === turn.responseLines.length && turn.visibleSourcesCount > 0 ? (
                        <AssistantInlineSourceChips>
                          <AssistantInlineSourceTrigger>
                            <AssistantInlineSourceChip
                              type='button'
                              aria-label={`${turn.sources.length} source${turn.sources.length > 1 ? 's' : ''}`}
                              onClick={() =>
                                window.open(getSourceUrl(turn.sources[0].domain), '_blank', 'noopener,noreferrer')
                              }
                            >
                              <Icon name='clipboardListCheck' width={12} height={12} color={colors.cloud_70} />
                              <AssistantInlineSourceChipLabel>{turn.sources[0].title}</AssistantInlineSourceChipLabel>
                              {turn.sources.length > 1 ? (
                                <AssistantInlineSourceChipCount>
                                  +{turn.sources.length - 1}
                                </AssistantInlineSourceChipCount>
                              ) : null}
                            </AssistantInlineSourceChip>
                            <AssistantInlineSourcePopover data-inline-source-popover='true' role='menu'>
                              <AssistantInlineSourcePopoverCard>
                                {turn.sources.map(source => (
                                  <AssistantInlineSourceItem
                                    key={`${turn.id}-source-popover-${source.id}`}
                                    type='button'
                                    role='menuitem'
                                    title={`Open ${source.title} in new window`}
                                    onClick={() =>
                                      window.open(getSourceUrl(source.domain), '_blank', 'noopener,noreferrer')
                                    }
                                  >
                                    <Icon name='clipboardListCheck' width={14} height={14} color={colors.sky_60} />
                                    <AssistantInlineSourceItemBody>
                                      <AssistantInlineSourceItemTitle>{source.title}</AssistantInlineSourceItemTitle>
                                      <AssistantInlineSourceItemDescription>
                                        {source.description ?? source.domain}
                                      </AssistantInlineSourceItemDescription>
                                    </AssistantInlineSourceItemBody>
                                    <Icon name='externalLink' width={14} height={14} color={colors.sky_60} />
                                  </AssistantInlineSourceItem>
                                ))}
                              </AssistantInlineSourcePopoverCard>
                            </AssistantInlineSourcePopover>
                          </AssistantInlineSourceTrigger>
                        </AssistantInlineSourceChips>
                      ) : null}

                      {turn.showDemandErrorState && turn.visibleResponseCount === turn.responseLines.length ? (
                        <AssistantErrorStateCard>
                          <AssistantErrorStateIconWrap>
                            <Icon name='xmark' width={14} height={14} color={colors.crimson_60} />
                          </AssistantErrorStateIconWrap>
                          <div>
                            <AssistantErrorStateTitle>Access to Demand360 has been denied.</AssistantErrorStateTitle>
                            <AssistantErrorStateText>
                              Your current subscription does not include Demand360 access. Please contact your account
                              administrator to enable this module.
                            </AssistantErrorStateText>
                          </div>
                        </AssistantErrorStateCard>
                      ) : null}

                      {turn.showCampaignSuccessState && turn.visibleResponseCount === turn.responseLines.length ? (
                        <AssistantSuccessStateCard>
                          <AssistantSuccessStateIconWrap>
                            <Icon name='checkCircle' width={14} height={14} color={colors.forest_60} />
                          </AssistantSuccessStateIconWrap>
                          <div>
                            <AssistantSuccessStateTitle>Campaign created successfully.</AssistantSuccessStateTitle>
                            <AssistantSuccessStateText>
                              The campaign have been created based on the above setup.
                            </AssistantSuccessStateText>
                          </div>
                        </AssistantSuccessStateCard>
                      ) : null}

                      {turn.showCampaignAlreadyExistsState &&
                      turn.visibleResponseCount === turn.responseLines.length ? (
                        <AssistantErrorStateCard>
                          <AssistantErrorStateIconWrap>
                            <Icon name='xmark' width={14} height={14} color={colors.crimson_60} />
                          </AssistantErrorStateIconWrap>
                          <div>
                            <AssistantErrorStateTitle>Campaign already exists.</AssistantErrorStateTitle>
                            <AssistantErrorStateText>
                              The campaign could not be created as they already exist.
                            </AssistantErrorStateText>
                          </div>
                        </AssistantErrorStateCard>
                      ) : null}

                      {turn.showCampaignTable && turn.visibleResponseCount === turn.responseLines.length
                        ? renderCampaignTable(turn, true)
                        : null}

                      {turn.showDemandChart && turn.visibleResponseCount === turn.responseLines.length
                        ? renderDemandChart(turn, true)
                        : null}

                      {turn.showReportButtons ? (
                        <>
                          <AssistantReportCtaText>
                            {turn.reportSecondaryActionLabel === 'Promote campaign'
                              ? 'I’ve prepared the full campaign in your workspace. Review each section and make any changes you’d like.'
                              : 'If you want, I can help you with the following:'}
                          </AssistantReportCtaText>
                          <AssistantReportButtons>
                            {turn.reportSecondaryActionLabel === 'Promote campaign' ? (
                              <AssistantCampaignCanvasButton
                                type='button'
                                onClick={() => onCampaignCanvasChange?.(!campaignCanvasOpen)}
                              >
                                {campaignCanvasOpen
                                  ? `Close ${aiWorkspaceType === 'media-plan' ? 'media plan' : 'campaign'} canvas`
                                  : `Open ${aiWorkspaceType === 'media-plan' ? 'media plan' : 'campaign'} canvas`}
                              </AssistantCampaignCanvasButton>
                            ) : (
                              <AssistantReportButton type='button'>
                                {turn.reportSecondaryActionLabel}
                              </AssistantReportButton>
                            )}
                            {turn.showDemandChart || turn.showCampaignTable ? (
                              <AssistantReportButton type='button'>Load more insights</AssistantReportButton>
                            ) : null}
                          </AssistantReportButtons>
                        </>
                      ) : null}

                      {turn.showResponseActions ? (
                        <AssistantActionsRow>
                          {turn.stage !== 'stopped' ? (
                            <AssistantActionItem>
                              <AssistantActionIconButton
                                iconName='copy'
                                color='currentColor'
                                width={14}
                                height={14}
                                title='Copy response'
                                onClick={() => void handleAssistantResponseAction(turn, 'copy')}
                              />
                              <AssistantActionTooltip data-assistant-action-tooltip='true'>
                                Copy response
                              </AssistantActionTooltip>
                            </AssistantActionItem>
                          ) : null}
                          <AssistantActionItem>
                            <AssistantActionIconButton
                              iconName='refresh'
                              color='currentColor'
                              width={14}
                              height={14}
                              title='Regenerate response'
                              onClick={() => void handleAssistantResponseAction(turn, 'refresh')}
                            />
                            <AssistantActionTooltip data-assistant-action-tooltip='true'>
                              Regenerate response
                            </AssistantActionTooltip>
                          </AssistantActionItem>
                          <AssistantActionItem>
                            <AssistantActionIconButton
                              iconName={turn.responseFeedback === 'thumbs-down' ? 'thumbs-down-solid' : 'thumbs-down'}
                              selected={turn.responseFeedback === 'thumbs-down'}
                              color='currentColor'
                              width={14}
                              height={14}
                              title='Bad response'
                              onClick={() => void handleAssistantResponseAction(turn, 'thumbs-down')}
                            />
                            <AssistantActionTooltip data-assistant-action-tooltip='true'>
                              Bad response
                            </AssistantActionTooltip>
                          </AssistantActionItem>
                          <AssistantActionItem>
                            <AssistantActionIconButton
                              iconName={turn.responseFeedback === 'thumbs-up' ? 'thumbs-up-solid' : 'thumbs-up'}
                              selected={turn.responseFeedback === 'thumbs-up'}
                              color='currentColor'
                              width={14}
                              height={14}
                              title='Good response'
                              onClick={() => void handleAssistantResponseAction(turn, 'thumbs-up')}
                            />
                            <AssistantActionTooltip data-assistant-action-tooltip='true'>
                              Good response
                            </AssistantActionTooltip>
                          </AssistantActionItem>
                          {turn.visibleSourcesCount > 0 ? (
                            <>
                              <AssistantActionsDivider />
                              <AssistantActionsSourcesButton
                                type='button'
                                aria-expanded={sourcesPanelTurnId === turn.id}
                                onClick={() => handleToggleSourcesDetails(turn.id)}
                              >
                                <Icon name='clipboardListCheck' width={14} height={14} color={colors.cloud_100} />
                                Sources
                              </AssistantActionsSourcesButton>
                            </>
                          ) : null}
                          <AssistantActionsTime>{formatTurnTimestamp(turn.timestamp)}</AssistantActionsTime>
                          {actionFeedback && actionFeedbackTargetText === `assistant-actions:${turn.id}` ? (
                            <AssistantActionFeedback>{actionFeedback}</AssistantActionFeedback>
                          ) : null}
                        </AssistantActionsRow>
                      ) : null}

                      {turn.visibleSourcesCount > 0 ? (
                        <>
                          {turnIndex === activeTurns.length - 1 &&
                          turn.visibleSourcesCount === turn.sources.length &&
                          !turn.showReportButtons ? (
                            <AssistantSuggestedPromptsSection>
                              <AssistantSuggestedPromptsHeader>
                                <Icon
                                  name='sparkles'
                                  width={10}
                                  height={10}
                                  color={colors.cloud_60}
                                  title='Suggested prompt'
                                />
                                Suggested prompt
                              </AssistantSuggestedPromptsHeader>
                              <AssistantSuggestedPromptsList>
                                {inConversationSuggestedPrompts.map(prompt => (
                                  <AssistantSuggestedPromptChip
                                    key={prompt.id}
                                    type='button'
                                    onClick={() => setInputValue(getPromptText(prompt))}
                                  >
                                    {prompt.textBefore}
                                    <PromptToken>{prompt.token}</PromptToken>
                                    {prompt.textAfter}
                                  </AssistantSuggestedPromptChip>
                                ))}
                              </AssistantSuggestedPromptsList>
                            </AssistantSuggestedPromptsSection>
                          ) : null}
                        </>
                      ) : null}
                    </AssistantContent>
                  </AssistantTurn>
                ))}
              </ChatThread>
            </ChatView>
          ) : !showCampaignPromptLanding && selectedRecentChat ? (
            <ChatView>
              <ChatViewTitle>{selectedRecentChat?.title}</ChatViewTitle>
              <ChatThread>
                {(selectedRecentChat?.messages ?? []).map(message => (
                  <ChatBubble key={message.id} author={message.author}>
                    <ChatBubbleContent>{message.text}</ChatBubbleContent>
                    {message.author === 'user' ? (
                      <>
                        <ChatBubbleActions data-chat-bubble-actions='true'>
                          <ChatBubbleAction
                            type='button'
                            aria-label={
                              isUserPromptSaved(message.text) ? 'Remove from your prompts' : 'Save to your prompts'
                            }
                            onClick={event => {
                              event.stopPropagation()
                              handleSaveUserPrompt(message.text)
                            }}
                          >
                            <Icon
                              name={isUserPromptSaved(message.text) ? 'bookmark-solid' : 'bookmark'}
                              width={14}
                              height={14}
                              color={isUserPromptSaved(message.text) ? colors.sky_60 : colors.cloud_80}
                            />
                            <ChatBubbleActionTooltip data-bubble-tooltip='true'>
                              {isUserPromptSaved(message.text) ? 'Remove prompt' : 'Save prompt'}
                            </ChatBubbleActionTooltip>
                          </ChatBubbleAction>
                          <ChatBubbleAction
                            type='button'
                            aria-label='Copy prompt text'
                            onClick={event => {
                              event.stopPropagation()
                              void handleCopyMessageText(message.text)
                            }}
                          >
                            <Icon name='copy' width={14} height={14} color={colors.cloud_80} />
                            <ChatBubbleActionTooltip data-bubble-tooltip='true'>Copy text</ChatBubbleActionTooltip>
                          </ChatBubbleAction>
                        </ChatBubbleActions>
                        {actionFeedback && actionFeedbackTargetText === message.text ? (
                          <ChatBubbleActionFeedback>{actionFeedback}</ChatBubbleActionFeedback>
                        ) : null}
                      </>
                    ) : null}
                  </ChatBubble>
                ))}
              </ChatThread>
            </ChatView>
          ) : (
            <>
              <WelcomeTitle>
                {showCampaignPromptLanding ? 'I can help you with...' : 'How can I help you?'}
              </WelcomeTitle>

              <PromptList>
                {landingPrompts.map(prompt => (
                  <PromptCard
                    key={prompt.id}
                    type='button'
                    onClick={() => {
                      const promptText = getPromptText(prompt)
                      if (showCampaignPromptLanding && promptText.startsWith('View media plan ')) {
                        setActiveTurns([])
                        setSelectedRecentChatId(null)
                        setInputValue('')
                        startClosedWonMediaPlanView(promptText)
                        return
                      }
                      if (showCampaignPromptLanding && promptText.startsWith('Create campaign for plan ')) {
                        setActiveTurns([])
                        setSelectedRecentChatId(null)
                        setInputValue('')
                        startClosedWonCampaignCreation(promptText)
                        return
                      }
                      if (
                        showCampaignPromptLanding &&
                        promptText.startsWith('Show me the ATI insight')
                      ) {
                        setActiveTurns([])
                        setSelectedRecentChatId(null)
                        setInputValue('')
                        startAtiInsightView(promptText)
                        return
                      }
                      if (showCampaignPromptLanding && promptText.startsWith('View existing campaign structure')) {
                        setActiveTurns([])
                        setSelectedRecentChatId(null)
                        setInputValue('')
                        startCampaignStructureView(promptText)
                        return
                      }
                      setInputValue(promptText)
                    }}
                  >
                    {prompt.textBefore}
                    <PromptToken>{prompt.token}</PromptToken>
                    {prompt.textAfter}
                  </PromptCard>
                ))}
              </PromptList>

              <MoreSuggestions
                type='button'
                onClick={() => {
                  setIsRecentChatsOpen(false)
                  setIsPromptLibraryOpen(true)
                }}
              >
                See more suggestions
              </MoreSuggestions>
            </>
          )}
        </BodyContent>
      </Body>

      {/* Context banner at the bottom (above the composer). */}
      {showCampaignPromptLanding || hasCampaignFlow ? (
        <CampaignContextBanner fullScreen={layoutMode === 'full-screen'} placement='bottom' />
      ) : null}
      <Composer fullScreen={layoutMode === 'full-screen'} rightPanelOpen={isRightPanelOpen}>
        <ComposerContent>
          <ComposerBox>
            {composerAttachments.length > 0 ? (
              <ComposerAttachments>
                {composerAttachments.map(attachment => (
                  <ComposerAttachmentChip key={attachment.id}>
                    <Icon
                      name='paperclip'
                      width={10}
                      height={10}
                      color='var(--colors/sky/sky-70, #0C66E1)'
                      title='Attached file'
                    />
                    <ComposerAttachmentName>{attachment.file.name}</ComposerAttachmentName>
                    <ComposerAttachmentRemove
                      type='button'
                      aria-label={`Remove ${attachment.file.name}`}
                      title={`Remove ${attachment.file.name}`}
                      onClick={() => handleRemoveAttachment(attachment.id)}
                    >
                      <Icon name='xmark' width={10} height={10} color={colors.cloud_80} title='Remove attachment' />
                    </ComposerAttachmentRemove>
                  </ComposerAttachmentChip>
                ))}
              </ComposerAttachments>
            ) : null}
            <ComposerInput
              placeholder='Ask anything'
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={event => {
                if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
                  event.preventDefault()
                  handleSendPrompt()
                }
              }}
            />
            <input
              ref={attachmentInputRef}
              type='file'
              accept='.csv,.xls,.xlsx,.pdf,text/csv,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
              multiple
              style={{ display: 'none' }}
              onChange={handleAttachmentInputChange}
            />
            <ComposerToolbar>
              <LeftTools>
                <IconTooltipTrigger>
                  <ComposerToolButton
                    type='button'
                    aria-label='Attach file'
                    onClick={() => attachmentInputRef.current?.click()}
                  >
                    <Icon name='paperclip' width={14} height={14} />
                  </ComposerToolButton>
                  <IconTooltip data-icon-tooltip='true'>Attach document</IconTooltip>
                </IconTooltipTrigger>
                <IconTooltipTrigger>
                  <ComposerToolButton
                    type='button'
                    active={isPromptLibraryOpen}
                    aria-label='Open prompt library'
                    onClick={() => {
                      setIsRecentChatsOpen(false)
                      setIsPromptLibraryOpen(true)
                    }}
                  >
                    <Icon name='book-alt' width={14} height={14} />
                  </ComposerToolButton>
                  <IconTooltip data-icon-tooltip='true'>Prompt library</IconTooltip>
                </IconTooltipTrigger>
              </LeftTools>
              <IconTooltipTrigger>
                <SendButton
                  type='button'
                  aria-label={isGenerating ? 'Stop response' : 'Send'}
                  onClick={handleSendPrompt}
                >
                  <Icon name={isGenerating ? 'square' : 'paper-plane-top'} width={11} height={11} color='white' />
                </SendButton>
                <IconTooltip data-icon-tooltip='true'>{isGenerating ? 'Stop response' : 'Send prompt'}</IconTooltip>
              </IconTooltipTrigger>
            </ComposerToolbar>
          </ComposerBox>
          <Disclaimer>
            This is an AI-powered assistant. Responses may be inaccurate, please review.{' '}
            <DisclaimerLink type='button' onClick={() => setIsAiInfoModalOpen(true)}>
              Learn more
            </DisclaimerLink>
          </Disclaimer>
        </ComposerContent>
      </Composer>

      {renderActiveVisualModal()}
      {renderResponseFeedbackModal()}
      {renderAiInfoModal()}
    </Panel>
  )
}

export default AmadeusMaxPanel
