import { useSyncExternalStore } from 'react'
import {
  campaignFlowData,
  setActiveAdvertiser,
  setFlowAdvertiserName,
  getFlowProfile,
  type CampaignLaunchSummary,
  type CampaignPlatform,
} from './campaignFlowData'
import {
  buildCampaignName,
  campaignSplitScopesForDraft,
  closedWonMediaPlanPlatforms,
  createInitialDraft,
  fieldKey,
  fillTemplate,
  getPlatformSplitConfig,
  mediaPlanYearFromName,
  normalizePlatforms,
  platformCurrentStatusFor,
  resolveMediaPlan,
  usPushOldSetupCleanup,
  tacticsFor,
  type CampaignDraft,
  type MediaPlanYear,
} from './campaignFlowLogic'
import { LONDONER } from '../../shared/londonerHotel'

// 'pause-review' is the final step (step 11): after all in-plan platforms are created, pause the
// currently-live platforms that are NOT part of the new media plan, platform by platform.
export type ClosedWonSetupPhase = 'basic-info' | 'channels' | 'platform-setup' | 'pause-review' | 'complete'

export type FlowBlockKind =
  | 'media-plan'
  | 'market-focus'
  | 'create-media-plan'
  | 'create-campaign'
  | 'launch'
  | 'campaign-structure'
  | 'ati-insight'
  | 'campaign-setup'
  | 'us-growth-options'
  | 'us-push-plan'
  | 'us-push-plan-created'
  | 'us-current-plan-picker'
  | 'us-add-targeting'
  | 'us-growth-action'
  | 'advertiser-select'
  | 'media-plan-select'

export type FlowBlock = {
  id: string
  kind: FlowBlockKind
  userPrompt: string | null
  steps: string[]
  completedSteps: number
  revealed: boolean
  summary?: CampaignLaunchSummary[]
  timestamp: string
}

export type CampaignFlowState = {
  flowId: number
  aiFlowType: 'campaign' | null
  aiContextMessage: string
  suggestedPrompts: string[]
  blocks: FlowBlock[]
  aiWorkspaceMode: boolean
  aiWorkspaceType: 'campaign' | 'media-plan'
  selectedMediaPlanYear: MediaPlanYear
  useClosedWonMediaPlanScope: boolean
  closedWonSetupPhase: ClosedWonSetupPhase | null
  closedWonPlatformIndex: number
  closedWonPlatformId: string | null
  closedWonViewedPlatformId: string | null
  closedWonCreatedPlatformIds: string[]
  aiWorkspaceTitle: string
  aiWorkspaceLoading: boolean
  campaignLaunched: boolean
  campaignSummary: CampaignLaunchSummary[]
  draft: CampaignDraft | null
  campaignInfoConfirmed: boolean
  closedWonPlatformSplitConfirmed: boolean
  closedWonCreatingPlatformId: string | null
  closedWonCreatingCampaigns: string[]
  closedWonCreatedCampaignCount: number
  // Pause phase (step 11): a single step pausing all out-of-plan live campaigns together.
  closedWonPauseConfirmed: boolean
  closedWonPausedCampaignCount: number
  // US Push "new plan" growth flow: true once the user clicks "Create media plan" on the proposal.
  usPushPlanCreated: boolean
  // "Create US Push in current plan" edit-mode flow: campaigns are ADDED into an existing plan,
  // split by Property (level 1) + Market (level 2), US-only, with Campaign Info showing the plan.
  usCurrentPlanEdit: boolean
  // "Add US to current targeting" flow: true once the user confirms the targeting updates (step 1).
  usAddTargetingConfirmed: boolean
  /** 'Create campaigns with Max': the advertiser picked in the first step (null until confirmed). */
  flowAdvertiser: { advertiserId: string; name: string; bpid: string } | null
  advertiserConfirmed: boolean
  /** Second step: the media plan the campaigns are created for (null until confirmed). */
  flowMediaPlan: { name: string; year: MediaPlanYear } | null
  mediaPlanConfirmed: boolean
  // Reveal counter for the add-targeting step 1 row animation.
  usAddTargetingRevealCount: number
  // Step 2: true while the create flow is scoped to ONLY the missing platform/tactics (US-only).
  usAddMissingOnly: boolean
}

// Read the active advertiser's conversation copy live, so dataset swaps take effect.
const getConversation = () => campaignFlowData.conversation

// Platform ids that belong to the given plan year's media plan.
const closedWonPlatformIdsForYear = (year: MediaPlanYear): string[] =>
  closedWonMediaPlanPlatforms(normalizePlatforms(), campaignFlowData, resolveMediaPlan(year).mediaPlanTable).map(
    platform => platform.id,
  )

// Channels handled outside this flow — never pause these (managed manually).
const PAUSE_EXCLUDED_CHANNELS = new Set(['Metasearch', 'Other'])

// Platforms to pause in step 11: currently LIVE Paid-search/Display/Social platforms that are NOT
// part of the new plan (Metasearch/Other are excluded — handled manually, not part of this flow).
export const closedWonPausePlatformsForYear = (year: MediaPlanYear): CampaignPlatform[] => {
  const inPlan = new Set(closedWonPlatformIdsForYear(year))
  return normalizePlatforms().filter(
    platform =>
      !inPlan.has(platform.id) &&
      !PAUSE_EXCLUDED_CHANNELS.has(platform.group) &&
      platformCurrentStatusFor(platform.id) === 'live',
  )
}

const closedWonPausePlatformIdsForYear = (year: MediaPlanYear): string[] =>
  closedWonPausePlatformsForYear(year).map(platform => platform.id)

// The live campaigns that will be paused for a given platform: one per tactic (e.g. Brand, Generic).
export const closedWonCampaignsToPause = (platformId: string): string[] => {
  const platform = normalizePlatforms().find(item => item.id === platformId)
  if (!platform) return []
  const tactics = tacticsFor(platform)
  if (tactics.length === 0) return [buildCampaignName(platform, [platform.name])]
  return tactics.map(tactic => buildCampaignName(platform, [tactic]))
}

// All out-of-plan campaigns to pause (across every pause platform), as flat campaign names.
export const closedWonAllCampaignsToPause = (year: MediaPlanYear): string[] =>
  closedWonPausePlatformsForYear(year).flatMap(platform => closedWonCampaignsToPause(platform.id))

// Mirrors the CampaignCreationCanvas memo so the shared draft seeds with the same
// closed-won split values the canvas uses (non paid-search platforms => 'None (By Tactic)').
const buildClosedWonDraft = (year: MediaPlanYear, usCurrentPlanEdit = false): CampaignDraft => {
  const normalizedPlatforms = normalizePlatforms()
  const mediaPlanPlatformIds = new Set(
    closedWonMediaPlanPlatforms(normalizedPlatforms, campaignFlowData, resolveMediaPlan(year).mediaPlanTable).map(
      platform => platform.id,
    ),
  )
  const closedWonPlatforms = normalizedPlatforms.map(platform => {
    // Platforms with a two-level split config use their configured first-split default; others keep
    // the paid-search split or default to 'None (By Tactic)'.
    // First-level campaign split defaults to Property for the MockStay closed-won create flow
    // (both normal create and current-plan edit). Raw platform.splitBy / PLATFORM_SPLIT_CONFIG
    // data is left untouched so other advertisers/tests keep their own defaults.
    // The Londoner brief: first-level split = Tactic ('None (By Tactic)'), second level left blank.
    const splitBy = getFlowProfile() === 'londoner' ? 'None (By Tactic)' : 'Property'
    return {
      ...platform,
      enabled: mediaPlanPlatformIds.has(platform.id),
      splitBy,
    }
  })
  const draft = createInitialDraft(closedWonPlatforms)
  // Seed the optional second-level split defaults for configured platforms.
  const adGroupSplitBy: Record<string, string> = {}
  closedWonPlatforms.forEach(platform => {
    const splitConfig = getPlatformSplitConfig(platform.id)
    if (splitConfig && splitConfig.adGroupDefault) adGroupSplitBy[platform.id] = splitConfig.adGroupDefault
  })

  // The Londoner brief leaves the second-level split blank for every platform.
  if (getFlowProfile() === 'londoner') {
    Object.keys(adGroupSplitBy).forEach(platformId => delete adGroupSplitBy[platformId])
    return { ...draft, adGroupSplitBy }
  }

  // Current-plan edit mode: first level = Property (set above), second level = Market for every
  // enabled platform, and US-only location on every campaign scope.
  if (usCurrentPlanEdit) {
    const enabledPlatforms = closedWonPlatforms.filter(platform => mediaPlanPlatformIds.has(platform.id))
    enabledPlatforms.forEach(platform => {
      adGroupSplitBy[platform.id] = 'Market'
    })
    const usValues: Record<string, string> = {}
    enabledPlatforms.forEach(platform => {
      usValues[fieldKey(platform.id, null, 'location')] = 'United States'
    })
    let editDraft: CampaignDraft = { ...draft, adGroupSplitBy, values: { ...draft.values, ...usValues } }
    enabledPlatforms.forEach(platform => {
      campaignSplitScopesForDraft(editDraft, platform).forEach(scope => {
        editDraft = {
          ...editDraft,
          values: {
            ...editDraft.values,
            [fieldKey(platform.id, scope.property, 'location', scope.key)]: 'United States',
          },
        }
      })
    })
    return editDraft
  }

  // The US Push plan is a focused, net-new plan: seed the draft with its flight dates and total
  // budget, and force US-only location targeting on every enabled platform (the whole point of the
  // US Push). Other plans keep the basicInfo defaults from createInitialDraft.
  if (year === 'us-push') {
    const plan = resolveMediaPlan('us-push')
    const planTotal = Number(plan.mediaPlanTable.total.replace(/[$£€,]/g, '')) || draft.totalBudget
    const enabledPlatforms = closedWonPlatforms.filter(platform => mediaPlanPlatformIds.has(platform.id))

    // Second-level split = Market for every platform in the US Push flow (e.g. Google line items by
    // Market). With US-only location this yields a single "United States" child per campaign.
    const usAdGroupSplitBy: Record<string, string> = {}
    enabledPlatforms.forEach(platform => {
      usAdGroupSplitBy[platform.id] = 'Market'
    })

    // 1) Seed the platform-level location so defaults + scope computation are US-only.
    const usLocationValues: Record<string, string> = {}
    enabledPlatforms.forEach(platform => {
      usLocationValues[fieldKey(platform.id, null, 'location')] = 'United States'
    })
    let usPushDraft: CampaignDraft = {
      ...draft,
      // US Push-specific campaign name (not the 2027 default).
      campaignName: `${campaignFlowData.basicInfo.advertiser} US Push (6-Month)`,
      startDate: plan.startDate,
      endDate: plan.endDate,
      totalBudget: planTotal,
      adGroupSplitBy: { ...adGroupSplitBy, ...usAdGroupSplitBy },
      values: { ...draft.values, ...usLocationValues },
    }

    // 2) The canvas reads location per campaign scope (e.g. "Google Ads — Brand"), falling back to
    // the dataset default (the full location list) when a scope has no explicit value. So also seed
    // US-only for every campaign scope of every enabled platform, overriding that default.
    enabledPlatforms.forEach(platform => {
      campaignSplitScopesForDraft(usPushDraft, platform).forEach(scope => {
        usPushDraft = {
          ...usPushDraft,
          values: {
            ...usPushDraft.values,
            [fieldKey(platform.id, scope.property, 'location', scope.key)]: 'United States',
          },
        }
      })
    })

    return usPushDraft
  }

  return { ...draft, adGroupSplitBy }
}
const WORKSPACE_LOADING_MS = 1000
const CREATE_MEDIA_PLAN_STEP_MS = 900
const CREATE_CAMPAIGN_STEP_MS = 380

const initialState: CampaignFlowState = {
  flowId: 0,
  aiFlowType: null,
  aiContextMessage: '',
  suggestedPrompts: [],
  blocks: [],
  aiWorkspaceMode: false,
  aiWorkspaceType: 'campaign',
  selectedMediaPlanYear: '2027',
  useClosedWonMediaPlanScope: false,
  closedWonSetupPhase: null,
  closedWonPlatformIndex: 0,
  closedWonPlatformId: null,
  closedWonViewedPlatformId: null,
  closedWonCreatedPlatformIds: [],
  aiWorkspaceTitle: getConversation().createCampaign.workspaceTitle,
  aiWorkspaceLoading: false,
  campaignLaunched: false,
  campaignSummary: [],
  draft: null,
  campaignInfoConfirmed: false,
  closedWonPlatformSplitConfirmed: false,
  closedWonCreatingPlatformId: null,
  closedWonCreatingCampaigns: [],
  closedWonCreatedCampaignCount: 0,
  closedWonPauseConfirmed: false,
  closedWonPausedCampaignCount: 0,
  usPushPlanCreated: false,
  usCurrentPlanEdit: false,
  usAddTargetingConfirmed: false,
  flowAdvertiser: null,
  advertiserConfirmed: false,
  flowMediaPlan: null,
  mediaPlanConfirmed: false,
  usAddTargetingRevealCount: 0,
  usAddMissingOnly: false,
}

let state: CampaignFlowState = initialState
let flowTimers: number[] = []
let workspaceTimer: number | null = null
let blockCounter = 0
const listeners = new Set<() => void>()

const setState = (updater: (current: CampaignFlowState) => CampaignFlowState) => {
  state = updater(state)
  listeners.forEach(listener => listener())
}

const schedule = (callback: () => void, delay: number) => {
  flowTimers.push(window.setTimeout(callback, delay))
}

const clearFlowTimers = () => {
  flowTimers.forEach(timerId => window.clearTimeout(timerId))
  flowTimers = []
}

const clearWorkspaceTimer = () => {
  if (workspaceTimer !== null) window.clearTimeout(workspaceTimer)
  workspaceTimer = null
}

const updateBlock = (blockId: string, updater: (block: FlowBlock) => FlowBlock) =>
  setState(current => ({
    ...current,
    blocks: current.blocks.map(block => (block.id === blockId ? updater(block) : block)),
  }))

export const getCampaignFlowState = () => state

export const subscribeCampaignFlow = (listener: () => void) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export const useCampaignFlowState = () =>
  useSyncExternalStore(subscribeCampaignFlow, getCampaignFlowState, getCampaignFlowState)

export const stageStepsFor = (kind: FlowBlockKind, summary: CampaignLaunchSummary[] = []) => {
  switch (kind) {
    case 'media-plan':
      return getConversation().initialAnalysisSteps
    case 'market-focus':
      return getConversation().marketFocus.analysisSteps
    case 'create-media-plan':
      return getConversation().createMediaPlan.reasoningSteps
    case 'create-campaign':
      return getConversation().createCampaign.reasoningSteps
    case 'campaign-structure':
      return getConversation().campaignStructure.analysisSteps
    case 'ati-insight':
      return getConversation().atiInsight.analysisSteps
    case 'campaign-setup':
      return getConversation().campaignStructure.analysisSteps
    case 'us-growth-options':
    case 'us-push-plan':
    case 'us-push-plan-created':
    case 'us-current-plan-picker':
    case 'us-add-targeting':
    case 'us-growth-action':
    case 'advertiser-select':
    case 'media-plan-select':
      // Quick response — no analysis animation (options list / plan proposal / confirmation).
      return []
    default:
      return summary.map(entry =>
        fillTemplate(getConversation().afterLaunch.perPlatformProgressTemplate, {
          count: entry.campaigns.length,
          platform: entry.platform,
        }),
      )
  }
}

export const openCampaignWorkspace = (
  title: string = getConversation().createCampaign.workspaceTitle,
  workspaceType: CampaignFlowState['aiWorkspaceType'] = 'campaign',
) => {
  clearWorkspaceTimer()
  setState(current => ({
    ...current,
    aiWorkspaceMode: true,
    aiWorkspaceType: workspaceType,
    aiWorkspaceTitle: title,
    aiWorkspaceLoading: true,
  }))
  workspaceTimer = window.setTimeout(() => {
    workspaceTimer = null
    setState(current => ({ ...current, aiWorkspaceLoading: false }))
  }, WORKSPACE_LOADING_MS)
}

export const closeCampaignWorkspace = () => {
  clearWorkspaceTimer()
  setState(current => ({ ...current, aiWorkspaceMode: false, aiWorkspaceLoading: false }))
}

export const setCampaignWorkspaceOpen = (open: boolean) => {
  if (open) {
    openCampaignWorkspace(state.aiWorkspaceTitle, state.aiWorkspaceType)
    return
  }
  closeCampaignWorkspace()
}

export const runCampaignFlowStage = (
  kind: FlowBlockKind,
  userPrompt: string | null,
  summary: CampaignLaunchSummary[] = [],
  stepsOverride?: string[],
) => {
  const flowId = state.flowId
  const steps = stepsOverride ?? stageStepsFor(kind, summary)
  const stepMs = kind === 'create-media-plan' ? CREATE_MEDIA_PLAN_STEP_MS : getConversation().stepAnimationDelayMs
  blockCounter += 1
  const blockId = `campaign-flow-block-${blockCounter}`

  setState(current => ({
    ...current,
    blocks: [
      ...current.blocks,
      {
        id: blockId,
        kind,
        userPrompt,
        steps,
        completedSteps: 0,
        revealed: steps.length === 0,
        summary,
        timestamp: new Date().toISOString(),
      },
    ],
  }))

  if (steps.length === 0) return

  steps.forEach((_, index) => {
    schedule(
      () => {
        if (state.flowId !== flowId) return
        updateBlock(blockId, block => ({ ...block, completedSteps: index + 1 }))
      },
      stepMs * (index + 1),
    )
  })

  const revealDelay = stepMs * steps.length + getConversation().stepFinishDelayMs
  schedule(() => {
    if (state.flowId !== flowId) return
    updateBlock(blockId, block => ({ ...block, revealed: true }))
  }, revealDelay)

  if (kind === 'create-campaign' && !state.useClosedWonMediaPlanScope) {
    // Closed-won inline flow keeps Basic Info in the response, so the canvas stays
    // closed until the user opens it for channel/platform setup.
    schedule(() => {
      if (state.flowId !== flowId) return
      openCampaignWorkspace(getConversation().createCampaign.workspaceTitle)
    }, revealDelay + getConversation().stepAnimationDelayMs)
  }

  // The closed-won media plan now renders inline in the response (table below the summary
  // cards), so the media plan canvas is no longer auto-opened on reveal.
}

export const startCampaignFlow = (contextMessage: string = getConversation().triggerContextMessage) => {
  clearFlowTimers()
  clearWorkspaceTimer()
  setState(current => ({
    ...initialState,
    flowId: current.flowId + 1,
    aiFlowType: 'campaign',
    aiContextMessage: contextMessage,
  }))
  runCampaignFlowStage('media-plan', contextMessage)
}

export const startClosedWonMediaPlanView = (contextMessage: string) => {
  clearFlowTimers()
  clearWorkspaceTimer()
  const mediaPlanName = contextMessage.slice('View media plan '.length)
  const year = mediaPlanYearFromName(mediaPlanName)
  setState(current => ({
    ...initialState,
    flowId: current.flowId + 1,
    aiFlowType: 'campaign',
    aiContextMessage: contextMessage,
    aiWorkspaceType: 'media-plan',
    selectedMediaPlanYear: year,
    aiWorkspaceTitle: `Media plan - ${mediaPlanName}`,
  }))
  runCampaignFlowStage('media-plan', contextMessage, [], ['Fetching the Plan info'])
}

// Shows the campaign-structure comparison response (2026 vs 2027). Reached from either media plan
// view ("View campaign setup") or the welcome prompt "View existing campaign structure for ...".
export const startCampaignStructureView = (contextMessage: string) => {
  clearFlowTimers()
  clearWorkspaceTimer()
  setState(current => ({
    ...initialState,
    flowId: current.flowId + 1,
    aiFlowType: 'campaign',
    aiContextMessage: contextMessage,
  }))
  runCampaignFlowStage('campaign-structure', contextMessage)
}

// Step 1 of the "boost US market" flow: the single campaign-setup CTA opens an options response
// that asks the user HOW they want to boost the US market (several approaches, list can grow).
export const startUsGrowthOptions = (contextMessage: string) => {
  runCampaignFlowStage('us-growth-options', contextMessage)
}

// "Create US Push in new plan" step 1: propose a net-new media plan (the us-push plan). The block
// shows the proposed month-split plan + "Create media plan" / "Cancel" CTAs.
export const startUsPushPlanProposal = (contextMessage: string) => {
  setState(current => ({ ...current, usPushPlanCreated: false, selectedMediaPlanYear: 'us-push' }))
  runCampaignFlowStage('us-push-plan', contextMessage)
}

// "Create US Push in current plan" step 1: ask which existing media plan to add the US campaigns
// to (the active plan vs the scheduled plan). Picking one launches the create flow in edit mode.
export const startUsCurrentPlanPicker = (contextMessage: string) => {
  runCampaignFlowStage('us-current-plan-picker', contextMessage)
}

// "Add US to current targeting" step 1: show the existing campaigns that will have the US added to
// their targeting (per property). A standalone block (no create flow until step 2).
export const startUsAddTargeting = (contextMessage: string) => {
  setState(current => ({ ...current, usAddTargetingConfirmed: false, usAddTargetingRevealCount: 0 }))
  runCampaignFlowStage('us-add-targeting', contextMessage)
}

// Confirm the targeting updates: animate the changed rows one by one, then settle (step 2 — the
// create-missing prompt — renders in the same block once confirmed).
export const confirmUsAddTargeting = (changedCount: number) => {
  if (state.usAddTargetingConfirmed) return
  const flowId = state.flowId
  setState(current => ({ ...current, usAddTargetingConfirmed: true, usAddTargetingRevealCount: 0 }))
  if (changedCount <= 0) return
  for (let index = 0; index < changedCount; index += 1) {
    schedule(
      () => {
        if (state.flowId !== flowId) return
        setState(current => ({ ...current, usAddTargetingRevealCount: index + 1 }))
      },
      CREATE_CAMPAIGN_STEP_MS * (index + 1),
    )
  }
}

// "Create media plan" on the proposal: appends a NEW success block below (the proposal stays in the
// conversation). The new block shows the success card + "Create campaigns" CTA. Keeps
// selectedMediaPlanYear on 'us-push' so the later campaign-create flow seeds from the US Push plan.
export const confirmUsPushPlan = () => {
  if (state.usPushPlanCreated) return
  setState(current => ({ ...current, usPushPlanCreated: true, selectedMediaPlanYear: 'us-push' }))
  runCampaignFlowStage('us-push-plan-created', 'Create media plan')
}

// Step 2: the user picks one of the US-growth approaches (add US to targeting, create a US Push
// campaign, rebalance budget to US). Appends a quick confirmation block that echoes the user's
// choice and acknowledges the action — no multi-step canvas flow.
export const startUsGrowthAction = (contextMessage: string) => {
  runCampaignFlowStage('us-growth-action', contextMessage)
}

export const startClosedWonCampaignCreation = (
  contextMessage: string,
  options: { usCurrentPlanEdit?: boolean; usAddMissingOnly?: boolean; year?: MediaPlanYear } = {},
) => {
  clearFlowTimers()
  clearWorkspaceTimer()
  const usCurrentPlanEdit = options.usCurrentPlanEdit ?? false
  const usAddMissingOnly = options.usAddMissingOnly ?? false
  // Prefer a year named in the prompt (e.g. "Create campaign for plan …2027…"); otherwise keep the
  // year from the just-viewed plan.
  const year: MediaPlanYear = options.year
    ? options.year
    : /2026/.test(contextMessage)
    ? '2026'
    : /2027/.test(contextMessage)
      ? '2027'
      : state.selectedMediaPlanYear
  setState(current => ({
    ...current,
    flowId: current.flowId + 1,
    aiFlowType: 'campaign',
    aiContextMessage: contextMessage,
    suggestedPrompts: [],
    selectedMediaPlanYear: year,
    useClosedWonMediaPlanScope: true,
    closedWonSetupPhase: 'channels',
    closedWonPlatformIndex: 0,
    closedWonPlatformId: null,
    closedWonViewedPlatformId: null,
    closedWonCreatedPlatformIds: [],
    aiWorkspaceMode: false,
    aiWorkspaceType: 'campaign',
    aiWorkspaceTitle: getConversation().createCampaign.workspaceTitle,
    aiWorkspaceLoading: false,
    campaignLaunched: false,
    campaignSummary: [],
    usCurrentPlanEdit: usCurrentPlanEdit || usAddMissingOnly,
    usAddMissingOnly,
    draft: buildClosedWonDraft(year, usCurrentPlanEdit || usAddMissingOnly),
    campaignInfoConfirmed: false,
    closedWonPlatformSplitConfirmed: false,
    closedWonCreatingPlatformId: null,
    closedWonCreatingCampaigns: [],
    closedWonCreatedCampaignCount: 0,
    closedWonPauseConfirmed: false,
    closedWonPausedCampaignCount: 0,
  }))
  runCampaignFlowStage('create-campaign', contextMessage)
}

/**
 * 'Create campaigns with Max' (Campaign Setup button): first step of the flow. Max asks which
 * advertiser to create campaigns for (followed advertisers + a dropdown with the full list).
 * Confirming it (see confirmAdvertiserSelection) continues into the closed-won creation flow.
 */
export const startAdvertiserSelection = (contextMessage = 'Create campaigns with Max') => {
  setActiveAdvertiser('amadeus') // also drops any earlier advertiser override
  clearFlowTimers()
  clearWorkspaceTimer()
  setState(current => ({
    ...initialState,
    flowId: current.flowId + 1,
    aiFlowType: 'campaign',
    aiContextMessage: contextMessage,
  }))
  runCampaignFlowStage('advertiser-select', contextMessage)
}

export const confirmAdvertiserSelection = (advertiser: { advertiserId: string; name: string; bpid: string }) => {
  // The picker block stays in the chat; the media plan question is appended below it.
  setFlowAdvertiserName(advertiser.name, advertiser.bpid)
  setState(current => ({ ...current, flowAdvertiser: advertiser, advertiserConfirmed: true }))
  runCampaignFlowStage('media-plan-select', `Create campaigns for ${advertiser.name}`)
}

export type FlowMediaPlanChoice = {
  name: string
  year: MediaPlanYear
  /** When the plan comes from the Media Planner, its facts replace the dataset's 2027 plan basics. */
  override?: { startDate: string; endDate: string; totalBudget: number }
}

/** Second step confirmed: create campaigns for the chosen media plan (continues the closed-won flow). */
export const confirmMediaPlanSelection = (plan: FlowMediaPlanChoice) => {
  if (plan.override && plan.year === '2027') {
    // A signed-off Media Planner plan is a NEW setup: nothing runs yet, so the "current" (2026) side of the
    // structure comparison is empty. Every campaign then reads New / Create (not Live / Update) and there
    // is nothing to pause.
    campaignFlowData.mediaPlan2026 = {
      ...campaignFlowData.mediaPlan2026,
      mediaPlanTable: { total: '0', fees: '0', groups: [] },
    }
    // ...and the dataset's hand-written 2026-vs-2027 exceptions (e.g. LinkedIn paused then unpaused) do not apply.
    // Replace the objects (never mutate): they are shared with the pristine dataset.
    const { conversation } = campaignFlowData
    campaignFlowData.conversation = {
      ...conversation,
      campaignStructure: { ...conversation.campaignStructure, exceptions: undefined },
    }
    // Reuse the dataset's 2027 plan slot for the Media Planner plan (name, flight, budget).
    campaignFlowData.basicInfo = {
      ...campaignFlowData.basicInfo,
      mediaPlanName: plan.name,
      startDate: plan.override.startDate,
      endDate: plan.override.endDate,
      totalBudget: plan.override.totalBudget,
    }
  }
  setState(current => ({ ...current, flowMediaPlan: { name: plan.name, year: plan.year }, mediaPlanConfirmed: true }))
  startClosedWonCampaignCreation(`Create campaign for plan ${plan.name}`, { year: plan.year })
}

export const advanceClosedWonSetupStep = () => {
  setState(current => {
    if (current.closedWonSetupPhase === 'basic-info') {
      return { ...current, closedWonSetupPhase: 'channels' }
    }
    if (current.closedWonSetupPhase === 'channels') {
      return { ...current, closedWonSetupPhase: 'platform-setup' }
    }
    return current
  })
}

export const beginClosedWonPlatformSetup = () => {
  const closedWonPlatformIds = closedWonPlatformIdsForYear(state.selectedMediaPlanYear)
  if (closedWonPlatformIds.length === 0) return
  const platformId = closedWonPlatformIds[0]
  setState(current => ({
    ...current,
    closedWonSetupPhase: 'platform-setup',
    closedWonPlatformIndex: 0,
    closedWonPlatformId: platformId,
    closedWonCreatedPlatformIds: [],
    closedWonPlatformSplitConfirmed: false,
  }))
}

// Finalizes the current platform once all its campaigns have animated in: marks it created,
// clears the creating state, and advances to the next platform (or completes the flow). The
// collapse of the finished card and the appearance of the next card happen in this one update.
const finalizeClosedWonPlatform = (platformId: string, platformSummary: CampaignLaunchSummary[], flowId: number) => {
  if (state.flowId !== flowId) return
  const completedPlatformIds = [...state.closedWonCreatedPlatformIds, platformId]
  const campaignSummary = [...state.campaignSummary, ...platformSummary]
  const nextPlatformIndex = state.closedWonPlatformIndex + 1
  const closedWonPlatformIds = closedWonPlatformIdsForYear(state.selectedMediaPlanYear)
  const nextPlatformId = closedWonPlatformIds[nextPlatformIndex]

  if (nextPlatformId) {
    setState(current => ({
      ...current,
      closedWonCreatedPlatformIds: completedPlatformIds,
      closedWonPlatformIndex: nextPlatformIndex,
      closedWonPlatformId: nextPlatformId,
      campaignSummary,
      closedWonPlatformSplitConfirmed: false,
      closedWonViewedPlatformId: null,
      closedWonCreatingPlatformId: null,
      closedWonCreatingCampaigns: [],
      closedWonCreatedCampaignCount: 0,
      aiWorkspaceMode: false,
      aiWorkspaceLoading: false,
    }))
    return
  }

  // All in-plan platforms are created. If there are currently-live platforms NOT in the new plan,
  // move into the single pause step (step 11); otherwise finish. The US Push flow ALWAYS enters the
  // pause step to review the old-setup US cleanup (pause Only-US / remove US from markets+US).
  const movingToPause =
    state.selectedMediaPlanYear === 'us-push' ||
    state.usCurrentPlanEdit ||
    closedWonPausePlatformIdsForYear(state.selectedMediaPlanYear).length > 0

  setState(current => ({
    ...current,
    closedWonCreatedPlatformIds: completedPlatformIds,
    closedWonPlatformIndex: nextPlatformIndex,
    closedWonPlatformId: null,
    closedWonSetupPhase: movingToPause ? 'pause-review' : 'complete',
    campaignSummary,
    campaignLaunched: true,
    closedWonViewedPlatformId: null,
    closedWonCreatingPlatformId: null,
    closedWonCreatingCampaigns: [],
    closedWonCreatedCampaignCount: 0,
    aiWorkspaceMode: false,
    aiWorkspaceLoading: false,
  }))
  // No separate "launch" stage. The response ends with the pause step (step 11, when there are
  // out-of-plan live platforms), then the summary alert + sources + feedback once 'complete'.
}

// Triggered from the canvas "Create campaigns" action. Closes the canvas and animates the
// platform's campaigns in one by one (like the Analysis steps) before finalizing the platform.
export const completeClosedWonPlatform = (platformSummary: CampaignLaunchSummary[]) => {
  if (state.closedWonSetupPhase !== 'platform-setup' || !state.closedWonPlatformId) return
  if (state.closedWonCreatingPlatformId) return

  clearWorkspaceTimer()
  const flowId = state.flowId
  const platformId = state.closedWonPlatformId
  const campaigns = platformSummary.flatMap(entry => entry.campaigns)
  const campaignCount = campaigns.length

  // Enter the "creating" state: canvas closed, table visible with a loader, count at 0.
  setState(current => ({
    ...current,
    closedWonCreatingPlatformId: platformId,
    closedWonCreatingCampaigns: campaigns,
    closedWonCreatedCampaignCount: 0,
    aiWorkspaceMode: false,
    aiWorkspaceLoading: false,
  }))

  if (campaignCount === 0) {
    finalizeClosedWonPlatform(platformId, platformSummary, flowId)
    return
  }

  // Reveal campaigns one at a time.
  campaigns.forEach((_, index) => {
    schedule(
      () => {
        if (state.flowId !== flowId) return
        setState(current =>
          current.closedWonCreatingPlatformId === platformId
            ? { ...current, closedWonCreatedCampaignCount: index + 1 }
            : current,
        )
      },
      CREATE_CAMPAIGN_STEP_MS * (index + 1),
    )
  })

  // Once the last campaign is revealed, hold briefly on the success state, then finalize.
  schedule(
    () => {
      finalizeClosedWonPlatform(platformId, platformSummary, flowId)
    },
    CREATE_CAMPAIGN_STEP_MS * (campaignCount + 1) + 1000,
  )
}

// Step 11 (single action): the user confirms the pause table, then all out-of-plan campaigns
// animate to Paused one by one, and the flow completes.
export const confirmClosedWonPause = () => {
  if (state.closedWonSetupPhase !== 'pause-review' || state.closedWonPauseConfirmed) return

  const flowId = state.flowId
  const campaigns = closedWonAllCampaignsToPause(state.selectedMediaPlanYear)
  const campaignCount = campaigns.length

  setState(current => ({ ...current, closedWonPauseConfirmed: true, closedWonPausedCampaignCount: 0 }))

  if (campaignCount === 0) {
    setState(current => ({ ...current, closedWonSetupPhase: 'complete' }))
    return
  }

  campaigns.forEach((_, index) => {
    schedule(
      () => {
        if (state.flowId !== flowId) return
        setState(current => ({ ...current, closedWonPausedCampaignCount: index + 1 }))
      },
      CREATE_CAMPAIGN_STEP_MS * (index + 1),
    )
  })

  schedule(
    () => {
      if (state.flowId !== flowId) return
      setState(current => ({ ...current, closedWonSetupPhase: 'complete' }))
    },
    CREATE_CAMPAIGN_STEP_MS * (campaignCount + 1) + 1000,
  )
}

// US Push final step: the old-setup US cleanup. On confirm, the rows that change (Pause / Remove
// US) reveal a loading spinner one by one, then flip to their past-tense state (Paused / Updated),
// and the flow completes (green success card). Reuses closedWonPausedCampaignCount as the reveal
// counter over the CHANGED rows only.
export const confirmUsPushCleanup = () => {
  if (state.closedWonSetupPhase !== 'pause-review' || state.closedWonPauseConfirmed) return

  const flowId = state.flowId
  const mode = state.usCurrentPlanEdit ? 'current-plan' : 'new-plan'
  const changedCount = usPushOldSetupCleanup(campaignFlowData, mode).filter(row => row.action !== 'no-change').length

  setState(current => ({ ...current, closedWonPauseConfirmed: true, closedWonPausedCampaignCount: 0 }))

  if (changedCount === 0) {
    setState(current => ({ ...current, closedWonSetupPhase: 'complete' }))
    return
  }

  for (let index = 0; index < changedCount; index += 1) {
    schedule(
      () => {
        if (state.flowId !== flowId) return
        setState(current => ({ ...current, closedWonPausedCampaignCount: index + 1 }))
      },
      CREATE_CAMPAIGN_STEP_MS * (index + 1),
    )
  }

  schedule(
    () => {
      if (state.flowId !== flowId) return
      setState(current => ({ ...current, closedWonSetupPhase: 'complete' }))
    },
    CREATE_CAMPAIGN_STEP_MS * (changedCount + 1) + 1000,
  )
}

export const showClosedWonPlanPromptSuggestions = () => {
  // The closed-won notification is The Londoner's: run the Max flow with its brief.
  setFlowAdvertiserName(LONDONER.name, LONDONER.bpid)
  clearFlowTimers()
  clearWorkspaceTimer()
  const mediaPlanName = resolveMediaPlan('2027').mediaPlanName
  const mediaPlanName2026 = resolveMediaPlan('2026').mediaPlanName
  setState(current => ({
    ...initialState,
    flowId: current.flowId + 1,
    suggestedPrompts: [
      `View media plan ${mediaPlanName}`,
      `Create campaign for plan ${mediaPlanName}`,
      `View existing campaign structure for ${LONDONER.name}`,
      `View media plan ${mediaPlanName2026}`,
    ],
  }))
}

export const startAtiInsightView = (contextMessage: string) => {
  setActiveAdvertiser('mockstay')
  clearFlowTimers()
  clearWorkspaceTimer()
  setState(current => ({
    ...initialState,
    flowId: current.flowId + 1,
    aiFlowType: 'campaign',
    aiContextMessage: contextMessage,
  }))
  runCampaignFlowStage('ati-insight', contextMessage)
}

export const showGrowthOpportunityPromptSuggestions = () => {
  setActiveAdvertiser('mockstay')
  clearFlowTimers()
  clearWorkspaceTimer()
  setState(current => ({
    ...initialState,
    flowId: current.flowId + 1,
    suggestedPrompts: [
      'Show me the ATI insight on the US market growth opportunity',
      'Show me the current campaign setup for the US market',
      'Update campaigns to capture the US growth opportunity',
    ],
  }))
}

export const clearCampaignFlowSuggestedPrompts = () => {
  if (state.suggestedPrompts.length === 0) return
  setState(current => ({ ...current, suggestedPrompts: [] }))
}

export const launchCampaign = (summary: CampaignLaunchSummary[]) => {
  clearWorkspaceTimer()
  setState(current => ({
    ...current,
    campaignLaunched: true,
    campaignSummary: summary,
    aiWorkspaceMode: false,
    aiWorkspaceLoading: false,
  }))
  if (state.aiFlowType === 'campaign') {
    runCampaignFlowStage('launch', null, summary)
  }
}

export const saveCampaignDraft = (draft: CampaignDraft) => {
  // Kept outside the subscriber notification: the draft only seeds the canvas when it re-opens.
  state = { ...state, draft }
}

// Updates the shared draft THROUGH setState so inline-card subscribers re-render immediately.
export const updateDraftFields = (fields: Partial<CampaignDraft>) =>
  setState(current => ({
    ...current,
    draft: { ...(current.draft ?? createInitialDraft(normalizePlatforms())), ...fields },
  }))

// Returns the existing draft, lazily seeding one (and notifying subscribers) when none exists yet.
export const ensureDraft = (): CampaignDraft => {
  if (state.draft) return state.draft
  const seeded = createInitialDraft(normalizePlatforms())
  setState(current => ({ ...current, draft: current.draft ?? seeded }))
  return state.draft ?? seeded
}

// Marks the inline Campaign Info card as acknowledged by the user, revealing the
// checklist / canvas / sources / feedback and locking the editable fields.
export const confirmCampaignInfo = () => {
  if (state.campaignInfoConfirmed) return
  const firstPlatformId = closedWonPlatformIdsForYear(state.selectedMediaPlanYear)[0] ?? null
  setState(current => ({
    ...current,
    campaignInfoConfirmed: true,
    // Move straight into per-platform setup; the split-by card gates the canvas per platform.
    closedWonSetupPhase: firstPlatformId ? 'platform-setup' : 'complete',
    closedWonPlatformIndex: 0,
    closedWonPlatformId: firstPlatformId,
    closedWonCreatedPlatformIds: [],
    closedWonPlatformSplitConfirmed: false,
  }))
}

// Confirms the Split by selection for the current platform and opens its canvas.
export const confirmClosedWonPlatformSplit = () => {
  if (state.closedWonSetupPhase !== 'platform-setup' || !state.closedWonPlatformId) return
  if (state.closedWonPlatformSplitConfirmed) return
  const platformName =
    campaignFlowData.platforms.find(platform => platform.id === state.closedWonPlatformId)?.name ??
    state.closedWonPlatformId
  setState(current => ({
    ...current,
    closedWonPlatformSplitConfirmed: true,
    closedWonViewedPlatformId: current.closedWonPlatformId,
  }))
  openCampaignWorkspace(`Campaign setup - ${platformName}`)
}

// Updates the Split by value for a given platform on the shared draft (notifies subscribers).
export const setClosedWonPlatformSplit = (platformId: string, splitBy: string) =>
  setState(current => ({
    ...current,
    draft: {
      ...(current.draft ?? createInitialDraft(normalizePlatforms())),
      splitBy: { ...(current.draft?.splitBy ?? {}), [platformId]: splitBy },
    },
  }))

// Updates the optional "Split Ad Group by" value for a given platform (display-only).
export const setClosedWonPlatformAdGroupSplit = (platformId: string, adGroupSplitBy: string) =>
  setState(current => ({
    ...current,
    draft: {
      ...(current.draft ?? createInitialDraft(normalizePlatforms())),
      adGroupSplitBy: { ...(current.draft?.adGroupSplitBy ?? {}), [platformId]: adGroupSplitBy },
    },
  }))

// Opens a specific platform's canvas (used to review a platform that is already set up).
export const openClosedWonPlatformCanvas = (platformId: string) => {
  const platformName = campaignFlowData.platforms.find(platform => platform.id === platformId)?.name ?? platformId
  setState(current => ({ ...current, closedWonViewedPlatformId: platformId }))
  openCampaignWorkspace(`Campaign setup - ${platformName}`)
}

export const resetCampaignFlow = () => {
  clearFlowTimers()
  clearWorkspaceTimer()
  setState(current => ({ ...initialState, flowId: current.flowId + 1 }))
}

export const isCampaignFlowPrompt = (prompt: string) => prompt.trim().toLowerCase().startsWith('create campaign for')
