import React, { useEffect, useMemo, useRef, useState } from 'react'
import dayjs, { type Dayjs } from 'dayjs'
import {
  Button,
  DatePicker,
  DropdownMenu,
  Icon,
  IconButton,
  Input,
  InputNumber,
  Select,
  Spinner,
  Stepper,
  Tab,
  Toggle,
  colors,
  useNotification,
} from '@amadeus/react-design-factory'
import { AiIndicator, PlatformChip } from '../CampaignFlow/AiIndicator'
import { campaignFlowData, type CampaignPlatform } from '../CampaignFlow/campaignFlowData'
import { CampaignCreativeAsset } from '../CampaignFlow/CampaignCreativeAsset'
import {
  defaultKeywordOptions,
  optionsForCampaignField,
  optionsForPlatformField,
  platformSupportsSetupField,
  targetingFieldGuidance,
  type SetupOptionField,
} from '../CampaignFlow/platformSetupOptions'
import { matrixSupported, NOT_SET } from '../CampaignFlow/platformFieldMatrix'
import {
  ALL_PLATFORMS,
  buildLaunchSummary,
  CAMPAIGN_STATUS_META,
  CAMPAIGN_CURRENT_STATUS_META,
  campaignStatusFor,
  campaignCurrentStatusFor,
  usCurrentPlanEditCampaigns,
  usCurrentPlanProperties,
  platformCurrentStatusFor,
  type CampaignStatus,
  adGroupsForCampaign,
  applyFieldValueToScopes,
  getAdGroupSplitBy,
  getPlatformSplitConfig,
  campaignsForDraft,
  campaignSplitScopesForDraft,
  usCurrentPlanEditScopes,
  usAddMissingScopes,
  platformHasMissingTactic,
  chipKey,
  closedWonMediaPlanPlatforms,
  countLines,
  createInitialDraft,
  defaultFieldValue,
  enabledPlatforms,
  formatDisplayDate,
  getFieldValue,
  getSplitBy,
  groupPlatformsByChannel,
  joinList,
  languageTabsFor,
  normalizePlatforms,
  resolveMediaPlan,
  setFieldValue,
  splitList,
  splitByDisplayLabel,
  splitsByProperty,
  usesKeywords,
  visibleWizardSteps,
  type CampaignDraft,
  type CampaignSplitScope,
} from '../CampaignFlow/campaignFlowLogic'
import {
  advanceClosedWonSetupStep,
  beginClosedWonPlatformSetup,
  completeClosedWonPlatform,
  closeCampaignWorkspace,
  getCampaignFlowState,
  launchCampaign,
  saveCampaignDraft,
  useCampaignFlowState,
} from '../CampaignFlow/campaignFlowStore'
import { CampaignAdPreview, ScaledBanner } from './CampaignAdPreview'
import { platformBudgetAllocation } from '../MediaPlanCanvas/MediaPlanAllocationTable'
import * as Styled from './CampaignCreationCanvas.styled'

type AiHint = { summary: string; reasons?: string[]; showSources?: boolean }

const data = campaignFlowData

// Label + chip tone for the current-plan edit summary actions. 'unpause' reuses the update (blue)
// tone since the StatusChip tone set has no dedicated unpause tone.
const US_EDIT_ACTION_META: Record<'new' | 'update' | 'unpause', { label: string; tone: CampaignStatus }> = {
  new: { label: 'Create', tone: 'new' },
  update: { label: 'Update', tone: 'update' },
  unpause: { label: 'Unpause', tone: 'update' },
}
const ALL_CAMPAIGNS = '__all_campaigns__'
const CREATIVE_SOURCE = 'Content Management System (auto-adapted per platform)'
const CLOSED_WON_EXCLUDED_CHANNELS = ['Metasearch', 'Other']
const closedWonExcludedChannelsNote = CLOSED_WON_EXCLUDED_CHANNELS.map(channel => {
  const platforms = data.platforms.filter(platform => platform.group === channel).map(platform => platform.name)
  return `${channel} (${platforms.join(', ')})`
}).join(' and ')

const AI_HINTS: Record<string, AiHint> = {
  campaignName: {
    summary: 'Named for the advertiser and the full-year 2027 campaign period.',
    reasons: [
      `Follows the naming convention ${data.basicInfo.namingConvention}`,
      'Keeps reporting aligned with the media plan',
    ],
  },
  objective: {
    summary: 'Website conversions best matches the package goal of driving direct bookings.',
    reasons: ['Package is bookable on Brand.com', 'Comparable campaigns converted best with this objective'],
    showSources: true,
  },
  oba: {
    summary: 'Optimized Budget Allocation moves spend to the best-performing platforms automatically.',
    reasons: [
      'Spend is allocated across the platforms in the media plan',
      'Past campaigns improved ROAS with OBA enabled',
    ],
  },
  splitBy: { summary: 'Split recommended from previous campaign performance on this platform.' },
  bidStrategy: { summary: 'Bid strategy chosen to maximise bookings within the flight dates.', showSources: true },
  optimizationEvent: { summary: 'Optimises toward the booking event tracked on the property site.' },
  location: {
    summary: 'Top 10 feeder markets ranked by demand and conversion potential.',
    reasons: ['Amadeus Travel Intelligence demand data', 'Comp set feeder market analysis'],
    showSources: true,
  },
  audience: { summary: 'Audiences customised for the recommended markets and the package theme.' },
  placements: { summary: 'Placements recommended from previous campaign performance.' },
  brandKeywords: { summary: 'Brand keywords generated from the property name and city.', showSources: true },
  genericKeywords: {
    summary: 'Generic keywords sourced from the keyword database for maximum reach.',
    showSources: true,
  },
  creativeSource: { summary: 'Creatives are sourced from the CMS and adapted to each platform format.' },
  headline: { summary: 'Headline written for the package and localised for the targeted markets.' },
  description: { summary: 'Description highlights the package benefits and drives direct booking.' },
  mediaAssets: { summary: 'Images selected from the CMS that match the package theme.' },
}

const toOptions = (values: string[]) => values.map(value => ({ label: value, value }))

type LabelProps = {
  htmlFor?: string
  text: string
  required?: boolean
  badge?: string
  ai?: AiHint
}

const FieldLabel: React.FC<LabelProps> = ({ htmlFor, text, required, badge, ai }) => (
  <Styled.FieldLabel>
    <label htmlFor={htmlFor}>
      {text}
      {required ? <Styled.Required> *</Styled.Required> : null}
    </label>
    {badge ? <Styled.Badge>{badge}</Styled.Badge> : null}
    {ai ? <AiIndicator summary={ai.summary} reasons={ai.reasons} showSources={ai.showSources} /> : null}
  </Styled.FieldLabel>
)

type ChipsEditorProps = {
  id: string
  label: string
  values: string[]
  options: string[]
  onChange: (values: string[]) => void
  aiRecommended?: boolean
}

const ChipsEditor: React.FC<ChipsEditorProps> = ({ id, label, values, options, onChange, aiRecommended = false }) => (
  <Styled.MultiSelectControl data-ai-recommended={String(aiRecommended)} data-ai-filled={String(values.length > 0)}>
    <Select<string[]>
      id={id}
      mode='multiple'
      showSearch
      withBadges
      placeholder={`Select ${label.toLowerCase()}`}
      value={values}
      options={toOptions(options)}
      onChange={(selectedValues: string[]) => onChange(selectedValues)}
    />
  </Styled.MultiSelectControl>
)

const ReadOnlyChips: React.FC<{ values: string[] }> = ({ values }) => (
  <Styled.ChipList>
    {values.map(value => (
      <Styled.ReadOnlyChip key={value}>{value}</Styled.ReadOnlyChip>
    ))}
  </Styled.ChipList>
)

type SummaryColumn = {
  header: string
  ai?: AiHint
  render: (platform: CampaignPlatform, property: string | null) => React.ReactNode
}

type AddLanguageDropdownProps = {
  id: string
  languages: Array<{ lang: string; label: string }>
  onSelect: (lang: string) => void
}

// Outlined secondary button (Design Factory outline/primary) that opens a menu of selectable
// languages, used as the last item in the creatives language tab group.
const AddLanguageDropdown: React.FC<AddLanguageDropdownProps> = ({ id, languages, onSelect }) => {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open) return
    const handlePointerDown = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <Styled.AddLanguageControl ref={wrapRef}>
      <Styled.AddLanguageButton
        id={id}
        type='button'
        disabled={languages.length === 0}
        aria-expanded={open}
        onClick={() => setOpen(current => !current)}
      >
        Add language
        <Icon name='caretDown' width={12} height={12} aria-hidden='true' />
      </Styled.AddLanguageButton>
      {open ? (
        <Styled.AddLanguageMenu role='menu'>
          {languages.map(locale => (
            <Styled.AddLanguageMenuItem
              key={locale.lang}
              type='button'
              role='menuitem'
              onClick={() => {
                onSelect(locale.lang)
                setOpen(false)
              }}
            >
              {locale.label}
            </Styled.AddLanguageMenuItem>
          ))}
        </Styled.AddLanguageMenu>
      ) : null}
    </Styled.AddLanguageControl>
  )
}

const VALUE_LIST_PREVIEW_COUNT = 5

// Renders a multi-value field (e.g. keywords, locations, audiences) as a readable bulleted list
// inside a summary cell, with a "+N more" / "Show less" toggle when the list is long.
const ValueListCell: React.FC<{ values: string[]; noun?: string }> = ({ values, noun = 'items' }) => {
  const [expanded, setExpanded] = useState(false)
  if (values.length === 0) return <>{'\u2014'}</>
  const visible = expanded ? values : values.slice(0, VALUE_LIST_PREVIEW_COUNT)
  const hiddenCount = values.length - visible.length
  return (
    <div>
      <Styled.SummaryValueList>
        {visible.map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </Styled.SummaryValueList>
      {values.length > VALUE_LIST_PREVIEW_COUNT ? (
        <Styled.SummaryShowMore type='button' onClick={() => setExpanded(current => !current)}>
          {expanded ? 'Show less' : `+${hiddenCount} more ${noun}`}
        </Styled.SummaryShowMore>
      ) : null}
    </div>
  )
}

// Additional-targeting types available in the rule builder, in display order. 'kind' selects the
// value editor: 'multi' = ChipsEditor (multiple values), 'single' = Select (one value).
type AdditionalTargetingDef = { field: SetupOptionField; label: string; kind: 'multi' | 'single' }

const ADDITIONAL_TARGETING_FIELDS: AdditionalTargetingDef[] = [
  { field: 'placements', label: 'Placements / inventory', kind: 'multi' },
  { field: 'demographics', label: 'Demographic targeting', kind: 'multi' },
  { field: 'deviceTargeting', label: 'Device targeting', kind: 'multi' },
  { field: 'languageTargeting', label: 'Language targeting', kind: 'multi' },
  { field: 'audienceExclusions', label: 'Audience exclusions', kind: 'multi' },
  { field: 'brandSafetyExclusions', label: 'Content and brand-safety exclusions', kind: 'multi' },
  { field: 'frequencyCap', label: 'Frequency cap', kind: 'single' },
  { field: 'dayparting', label: 'Dayparting', kind: 'multi' },
  { field: 'connectionTargeting', label: 'Connection and carrier targeting', kind: 'multi' },
  { field: 'proximityTargeting', label: 'Proximity and radius targeting', kind: 'multi' },
  { field: 'hotelTargeting', label: 'Hotel-specific targeting', kind: 'multi' },
]

export const CampaignCreationCanvas: React.FC = () => {
  const {
    aiWorkspaceTitle,
    aiWorkspaceLoading,
    useClosedWonMediaPlanScope,
    closedWonSetupPhase,
    closedWonPlatformId: closedWonActivePlatformId,
    closedWonViewedPlatformId,
    selectedMediaPlanYear,
    usCurrentPlanEdit,
    usAddMissingOnly,
  } = useCampaignFlowState()
  // The canvas renders whichever platform the user opened for review, defaulting to the active one.
  const closedWonPlatformId = closedWonViewedPlatformId ?? closedWonActivePlatformId
  const notification = useNotification()
  const platforms = useMemo(() => {
    const normalizedPlatforms = normalizePlatforms()
    if (!useClosedWonMediaPlanScope) return normalizedPlatforms

    // Enable exactly the platforms in the ACTIVE plan (2026/2027/us-push), so the US Push plan
    // enables only its own platforms (Google, Bing, DV360, Meta, TikTok) rather than the 2027 set.
    const mediaPlanPlatformIds = new Set(
      closedWonMediaPlanPlatforms(
        normalizedPlatforms,
        undefined,
        resolveMediaPlan(selectedMediaPlanYear).mediaPlanTable,
      ).map(platform => platform.id),
    )
    return normalizedPlatforms.map(platform => ({
      ...platform,
      // Step 2 (missing-only): enable only plan platforms that actually have a missing tactic.
      enabled: mediaPlanPlatformIds.has(platform.id) && (!usAddMissingOnly || platformHasMissingTactic(platform.id)),
      splitBy: 'Property',
    }))
  }, [useClosedWonMediaPlanScope, selectedMediaPlanYear, usAddMissingOnly])
  const allActivePlatforms = useMemo(() => enabledPlatforms(platforms), [platforms])
  const isClosedWonPlatformSetup = useClosedWonMediaPlanScope && closedWonSetupPhase === 'platform-setup'
  // The closed-won single-platform view: the first two wizard steps (Basic info, Channels) are
  // hidden and the canvas is scoped to one platform. True during platform setup AND when reviewing a
  // created platform afterwards (phase 'complete' with a viewed platform), so the post-creation
  // review matches the create flow exactly (same steps, same per-platform scope, same settings).
  const isClosedWonPlatformView =
    useClosedWonMediaPlanScope &&
    (isClosedWonPlatformSetup ||
      // Reviewing a created platform after setup finishes: 'complete', or 'pause-review' (the final
      // cleanup step) — both scope the canvas to the single viewed platform.
      ((closedWonSetupPhase === 'complete' || closedWonSetupPhase === 'pause-review') && !!closedWonPlatformId))
  const activePlatforms = useMemo(
    () =>
      isClosedWonPlatformView && closedWonPlatformId
        ? allActivePlatforms.filter(platform => platform.id === closedWonPlatformId)
        : allActivePlatforms,
    [allActivePlatforms, closedWonPlatformId, isClosedWonPlatformView],
  )
  const steps = useMemo(() => visibleWizardSteps(platforms), [platforms])
  const [draft, setDraft] = useState<CampaignDraft>(() => getCampaignFlowState().draft ?? createInitialDraft(platforms))
  const [stepId, setStepId] = useState(() => {
    if (closedWonSetupPhase === 'channels') return 'channels'
    if (closedWonSetupPhase === 'platform-setup') return 'budget'
    return steps[0].id
  })
  const [platformTab, setPlatformTab] = useState<string>(
    closedWonSetupPhase === 'platform-setup' && closedWonPlatformId ? closedWonPlatformId : ALL_PLATFORMS,
  )
  const [propertyTab, setPropertyTab] = useState<string | null>(null)
  const [selectedCampaignScopeKey, setSelectedCampaignScopeKey] = useState<string | null>(null)
  // Summary step: which campaign rows are expanded to show their second-level (ad group) rows.
  const [expandedSummaryCampaigns, setExpandedSummaryCampaigns] = useState<Record<string, boolean>>({})
  const [activeLanguage, setActiveLanguage] = useState<Record<string, string>>({})
  const [removedLanguages, setRemovedLanguages] = useState<Record<string, string[]>>({})
  // Additional-targeting rule builder: per platform+scope, the ordered list of targeting types
  // the user has added (so the long list isn't shown all at once).
  const [targetingRules, setTargetingRules] = useState<Record<string, SetupOptionField[]>>({})
  // Transient per-field confirmation after an "apply to all" action: field key → short message.
  // Cleared automatically after a moment so the bar returns to its default links.
  const [applyToAllDone, setApplyToAllDone] = useState<Record<string, string>>({})
  // Which field+scope cells the user has actually edited, so the "apply to all" chips only appear
  // after an edit (not on every field). Keyed `${platformId}|${scopeKey}|${field}`.
  const [editedFieldKeys, setEditedFieldKeys] = useState<Set<string>>(() => new Set())

  useEffect(() => {
    saveCampaignDraft(draft)
  }, [draft])

  useEffect(() => {
    if (!useClosedWonMediaPlanScope) return
    if (closedWonSetupPhase === 'basic-info') {
      setStepId('basic')
      setPlatformTab(ALL_PLATFORMS)
    } else if (closedWonSetupPhase === 'channels') {
      setStepId('channels')
      setPlatformTab(ALL_PLATFORMS)
    } else if (closedWonSetupPhase === 'platform-setup') {
      setStepId('budget')
      setPlatformTab(closedWonPlatformId ?? ALL_PLATFORMS)
      setPropertyTab(null)
      setSelectedCampaignScopeKey(null)
    } else if (closedWonSetupPhase === 'complete' && closedWonPlatformId) {
      // Reviewing a created platform: land on the first visible step of the closed-won stepper
      // (Budget) and scope to that platform, mirroring the create flow.
      setStepId('budget')
      setPlatformTab(closedWonPlatformId)
      setPropertyTab(null)
      setSelectedCampaignScopeKey(null)
    }
  }, [closedWonPlatformId, closedWonSetupPhase, useClosedWonMediaPlanScope])

  const stepIndex = Math.max(
    0,
    steps.findIndex(step => step.id === stepId),
  )
  const currentStep = steps[stepIndex]
  const isLastStep = stepIndex === steps.length - 1
  const isClosedWonIntroStep =
    useClosedWonMediaPlanScope && (closedWonSetupPhase === 'basic-info' || closedWonSetupPhase === 'channels')
  const visibleStepperSteps = isClosedWonPlatformView ? steps.slice(2) : steps
  const visibleStepperIndex = isClosedWonPlatformView ? Math.max(0, stepIndex - 2) : stepIndex
  const activePlatform = platforms.find(platform => platform.id === platformTab) ?? null
  const campaignSplitScopes =
    isClosedWonPlatformView && activePlatform
      ? usAddMissingOnly
        ? usAddMissingScopes(draft, activePlatform)
        : usCurrentPlanEdit
          ? usCurrentPlanEditScopes(draft, activePlatform)
          : campaignSplitScopesForDraft(draft, activePlatform)
      : []
  // "All campaigns" is the default per-step view: a read-only summary across every split. A specific
  // scope key selects that one campaign's editable fields. null key => All campaigns.
  const selectedCampaignScope = campaignSplitScopes.find(scope => scope.key === selectedCampaignScopeKey) ?? null
  const isAllCampaignsView = isClosedWonPlatformView && campaignSplitScopes.length > 0 && !selectedCampaignScope
  const campaignScopeForPlatform = (platform: CampaignPlatform) =>
    isClosedWonPlatformView && platform.id === closedWonPlatformId ? selectedCampaignScope : null
  const campaignPropertyForPlatform = (platform: CampaignPlatform, property: string | null) =>
    campaignScopeForPlatform(platform)?.property ?? property
  const basicInfoValid =
    draft.campaignName.trim().length > 0 && Boolean(draft.startDate) && Boolean(draft.endDate) && draft.totalBudget > 0

  const goToStep = (index: number) => {
    const nextStep = steps[Math.min(Math.max(index, 0), steps.length - 1)]
    setStepId(nextStep.id)
    setPlatformTab(isClosedWonPlatformView ? (closedWonPlatformId ?? ALL_PLATFORMS) : ALL_PLATFORMS)
    setPropertyTab(null)
    // Each step defaults to the "All campaigns" summary view.
    setSelectedCampaignScopeKey(null)
  }

  const selectPlatform = (platformId: string, property: string | null = null) => {
    setPlatformTab(platformId)
    const platform = platforms.find(item => item.id === platformId)
    if (!platform || !splitsByProperty(draft, platform)) {
      setPropertyTab(null)
      return
    }
    setPropertyTab(property ?? data.properties[0])
  }

  const value = (platform: CampaignPlatform, field: string, property: string | null = propertyTab) =>
    getFieldValue(
      draft,
      platform,
      campaignPropertyForPlatform(platform, property),
      field,
      undefined,
      campaignScopeForPlatform(platform)?.key,
    )

  // AI styling (tint + chip) applies only while a field still holds the AI-recommended value
  // (its computed default). Once a human sets a different value, the field reverts to default styling.
  const isAiValue = (platform: CampaignPlatform, field: string, property: string | null = propertyTab) =>
    value(platform, field, property) ===
    defaultFieldValue(platform, campaignPropertyForPlatform(platform, property), field)

  // Identifies one editable field cell (platform + selected campaign scope + field) for edit tracking.
  const editKey = (platform: CampaignPlatform, field: string) =>
    `${platform.id}|${campaignScopeForPlatform(platform)?.key ?? 'platform'}|${field}`

  const update = (platform: CampaignPlatform, field: string, nextValue: string) => {
    // Mark this field+scope as user-edited so the "apply to all" chips reveal — only when a specific
    // campaign scope is selected (editing in the per-campaign view, not the aggregate).
    if (campaignScopeForPlatform(platform)) {
      setEditedFieldKeys(current => {
        const key = editKey(platform, field)
        if (current.has(key)) return current
        const next = new Set(current)
        next.add(key)
        return next
      })
    }
    setDraft(current =>
      setFieldValue(
        current,
        platform,
        campaignPropertyForPlatform(platform, propertyTab),
        field,
        nextValue,
        campaignScopeForPlatform(platform)?.key,
      ),
    )
  }

  const updateDraft = <K extends keyof CampaignDraft>(key: K, nextValue: CampaignDraft[K]) =>
    setDraft(current => ({ ...current, [key]: nextValue }))

  // --- "Apply this edit to all campaigns" propagation ------------------------------------------
  // After editing a field on one campaign scope, the user can push that value to every campaign on
  // the platform, or every campaign across all enabled platforms. Each target gets the SAME stored
  // value (the current scope's value), scoped to its own key so per-campaign overrides stay intact
  // until re-applied. A field whose value matches the AI recommendation keeps its AI chip in sync
  // on each target automatically (summary chips are driven by the per-scope value).
  const applyFieldToAllOnPlatform = (platform: CampaignPlatform, field: string, nextValue: string) =>
    setDraft(current =>
      applyFieldValueToScopes(current, platform, field, nextValue, campaignSplitScopesForDraft(current, platform)),
    )

  const applyFieldToAllPlatforms = (field: string, nextValue: string) =>
    setDraft(current =>
      allActivePlatforms.reduce(
        (next, platform) =>
          applyFieldValueToScopes(next, platform, field, nextValue, campaignSplitScopesForDraft(next, platform)),
        current,
      ),
    )

  const flashApplyToAllDone = (field: string, message: string) => {
    setApplyToAllDone(current => ({ ...current, [field]: message }))
    window.setTimeout(() => {
      setApplyToAllDone(current => {
        if (!(field in current)) return current
        const rest = { ...current }
        delete rest[field]
        return rest
      })
    }, 2600)
  }

  // The inline "apply to all campaigns" bar beneath an edited field. Only renders in the
  // per-campaign editor (a specific scope selected) and when there is more than one target to apply
  // to. `getValue` reads the value to propagate (already joined for multi-value fields).
  const ApplyToAllControls: React.FC<{ platform: CampaignPlatform; field: string; getValue: () => string }> = ({
    platform,
    field,
    getValue,
  }) => {
    const scope = campaignScopeForPlatform(platform)
    if (!scope) return null

    // Only show once the user has actually edited this field in this campaign scope.
    if (!editedFieldKeys.has(editKey(platform, field))) return null

    const platformScopeCount = campaignSplitScopes.length
    const allPlatformsScopeCount = allActivePlatforms.reduce(
      (total, item) => total + campaignSplitScopesForDraft(draft, item).length,
      0,
    )
    // Nothing to propagate to if this platform has a single campaign and it's the only platform.
    if (platformScopeCount <= 1 && allActivePlatforms.length <= 1) return null

    const done = applyToAllDone[field]
    if (done) {
      return (
        <Styled.ApplyToAllDone role='status'>
          <Icon name='checkCircle' width={12} height={12} />
          {done}
        </Styled.ApplyToAllDone>
      )
    }

    const campaignWord = (count: number) => `${count} campaign${count === 1 ? '' : 's'}`
    const canApplyAllPlatforms = allActivePlatforms.length > 1

    return (
      <Styled.ApplyToAllBar>
        <Styled.ApplyToAllLabel>Apply to:</Styled.ApplyToAllLabel>
        {platformScopeCount > 1 ? (
          <Styled.ApplyToAllChip
            type='button'
            title={`Apply to all ${campaignWord(platformScopeCount)} on ${platform.name}`}
            onClick={() => {
              applyFieldToAllOnPlatform(platform, field, getValue())
              flashApplyToAllDone(field, `Applied to all ${campaignWord(platformScopeCount)} on ${platform.name}`)
            }}
          >
            This platform
          </Styled.ApplyToAllChip>
        ) : null}
        {canApplyAllPlatforms ? (
          <Styled.ApplyToAllChip
            type='button'
            title={`Apply to all ${campaignWord(allPlatformsScopeCount)} across ${allActivePlatforms.length} platforms`}
            onClick={() => {
              applyFieldToAllPlatforms(field, getValue())
              flashApplyToAllDone(
                field,
                `Applied to all ${campaignWord(allPlatformsScopeCount)} across ${allActivePlatforms.length} platforms`,
              )
            }}
          >
            All platforms
          </Styled.ApplyToAllChip>
        ) : null}
      </Styled.ApplyToAllBar>
    )
  }

  // Per platform+scope key for the additional-targeting rule list.
  const targetingRuleStateKey = (platform: CampaignPlatform) =>
    `${platform.id}|${campaignScopeForPlatform(platform)?.key ?? 'platform'}`

  // Additional-targeting types this platform supports (unsupported ones never appear in the builder).
  const supportedTargetingDefs = (platform: CampaignPlatform) =>
    ADDITIONAL_TARGETING_FIELDS.filter(def => platformSupportsSetupField(platform, def.field))

  // The ordered list of rules currently added for this platform+scope. Starts empty — the user
  // adds targeting (including Placements / inventory) on demand via the "Add targeting" button.
  const activeTargetingRules = (platform: CampaignPlatform): SetupOptionField[] =>
    targetingRules[targetingRuleStateKey(platform)] ?? []

  const setActiveTargetingRules = (platform: CampaignPlatform, nextRules: SetupOptionField[]) =>
    setTargetingRules(current => ({ ...current, [targetingRuleStateKey(platform)]: nextRules }))

  // Adds a new rule (for the first supported type not already added) at the top of the list.
  const addTargetingRule = (platform: CampaignPlatform) => {
    const used = new Set(activeTargetingRules(platform))
    const nextDef = supportedTargetingDefs(platform).find(def => !used.has(def.field))
    if (nextDef) setActiveTargetingRules(platform, [nextDef.field, ...activeTargetingRules(platform)])
  }

  // Removes a rule row and clears any value stored for that field.
  const removeTargetingRule = (platform: CampaignPlatform, field: SetupOptionField) => {
    setActiveTargetingRules(
      platform,
      activeTargetingRules(platform).filter(rule => rule !== field),
    )
    update(platform, field, '')
  }

  // Changes a row's targeting type: swap the type and clear the previous field's value.
  const changeTargetingRuleType = (platform: CampaignPlatform, index: number, nextField: SetupOptionField) => {
    const current = activeTargetingRules(platform)
    const previousField = current[index]
    if (previousField === nextField) return
    const nextRules = current.map((rule, ruleIndex) => (ruleIndex === index ? nextField : rule))
    setActiveTargetingRules(platform, nextRules)
    if (previousField) update(platform, previousField, '')
  }

  // Fields metadata keyed by field, for summary labels.
  const additionalTargetingLabel = (field: SetupOptionField) =>
    ADDITIONAL_TARGETING_FIELDS.find(def => def.field === field)?.label ?? field

  // Rules stored for a specific platform + campaign-scope key (used by the per-campaign summary,
  // which spans every scope rather than the currently selected one).
  const targetingRulesForScopeKey = (platform: CampaignPlatform, scopeKey: string): SetupOptionField[] =>
    targetingRules[`${platform.id}|${scopeKey}`] ?? []

  // Ordered union of additional-targeting fields set across every campaign split of a platform.
  const activeAdditionalFieldsAcrossScopes = (
    platform: CampaignPlatform,
    scopes: CampaignSplitScope[],
  ): SetupOptionField[] => {
    const order = ADDITIONAL_TARGETING_FIELDS.map(def => def.field)
    const active = new Set<SetupOptionField>()
    scopes.forEach(scope => {
      targetingRulesForScopeKey(platform, scope.key).forEach(field => {
        const raw = getFieldValue(draft, platform, scope.property, field, undefined, scope.key)
        if (raw.trim() !== '' && raw !== NOT_SET) active.add(field)
      })
    })
    return order.filter(field => active.has(field))
  }

  // Ordered union of additional-targeting fields that are actually set (added as a rule AND holding
  // a value) across the given platforms — drives which columns the summary shows.
  const activeAdditionalTargetingFields = (platformList: CampaignPlatform[]): SetupOptionField[] => {
    const order = ADDITIONAL_TARGETING_FIELDS.map(def => def.field)
    const active = new Set<SetupOptionField>()
    platformList.forEach(platform => {
      activeTargetingRules(platform).forEach(field => {
        const properties = splitsByProperty(draft, platform) ? data.properties : [null]
        const hasValue = properties.some(property => {
          const raw = value(platform, field, property)
          return raw.trim() !== '' && raw !== NOT_SET
        })
        if (hasValue) active.add(field)
      })
    })
    return order.filter(field => active.has(field))
  }

  const handleLaunch = () => {
    const summary = buildLaunchSummary(draft, activePlatforms)
    if (isClosedWonPlatformSetup) {
      completeClosedWonPlatform(summary)
      return
    }
    launchCampaign(summary)
  }

  const handleNextStep = () => {
    if (isClosedWonIntroStep) {
      if (closedWonSetupPhase === 'channels') {
        beginClosedWonPlatformSetup()
        return
      }
      advanceClosedWonSetupStep()
      return
    }
    goToStep(stepIndex + 1)
  }

  const handleSaveDraft = () => {
    notification.success('Draft saved: Campaign')
  }

  const renderPlatformToolbar = (platformList: CampaignPlatform[]) => (
    <Styled.Toolbar>
      <div>
        <FieldLabel htmlFor='campaign-canvas-platform-sel' text='Platform' />
        <Select<string>
          id='campaign-canvas-platform-sel'
          value={platformTab}
          options={[
            { label: 'All platforms', value: ALL_PLATFORMS },
            ...platformList.map(platform => ({ label: platform.name, value: platform.id })),
          ]}
          onChange={(platformId: string) =>
            platformId === ALL_PLATFORMS ? goToStep(stepIndex) : selectPlatform(platformId)
          }
        />
      </div>
      {activePlatform && splitsByProperty(draft, activePlatform) ? (
        <div>
          <FieldLabel htmlFor='campaign-canvas-property-sel' text='Property' />
          <Select<string>
            id='campaign-canvas-property-sel'
            value={propertyTab ?? data.properties[0]}
            options={toOptions(data.properties)}
            onChange={(property: string) => setPropertyTab(property)}
          />
        </div>
      ) : null}
    </Styled.Toolbar>
  )

  const renderPropertyContext = () =>
    activePlatform && propertyTab && splitsByProperty(draft, activePlatform) ? (
      <Styled.ContextChip>
        <Icon name='home' width={10} height={10} />
        {`Settings for ${propertyTab}`}
      </Styled.ContextChip>
    ) : null

  const renderSummaryTable = (caption: string, platformList: CampaignPlatform[], columns: SummaryColumn[]) => {
    const showProperty = platformList.some(platform => splitsByProperty(draft, platform))
    const rows = platformList.flatMap(platform =>
      splitsByProperty(draft, platform)
        ? data.properties.map(property => ({ platform, property }))
        : [{ platform, property: null as string | null }],
    )

    return (
      <Styled.TableWrap>
        <Styled.DataTable aria-label={caption}>
          <thead>
            <tr>
              <th>Platform</th>
              {showProperty ? <th>Property</th> : null}
              {columns.map(column => (
                <th key={column.header}>{column.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ platform, property }) => (
              <tr key={`${platform.id}-${property ?? 'all'}`}>
                <td>
                  <Styled.LinkButton type='button' onClick={() => selectPlatform(platform.id, property)}>
                    {platform.name}
                  </Styled.LinkButton>
                </td>
                {showProperty ? <td>{property ?? '—'}</td> : null}
                {columns.map(column => {
                  const renderedValue = column.render(platform, property)
                  const hasRecommendedValue =
                    column.ai &&
                    renderedValue !== null &&
                    renderedValue !== undefined &&
                    renderedValue !== '' &&
                    renderedValue !== '—'
                  return (
                    <td key={column.header}>
                      <Styled.CellWithIndicator data-ai-filled={String(Boolean(hasRecommendedValue))}>
                        {renderedValue}
                        {column.ai ? <AiIndicator summary={column.ai.summary} /> : null}
                      </Styled.CellWithIndicator>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </Styled.DataTable>
      </Styled.TableWrap>
    )
  }

  // Read a field value for a specific campaign split scope (used by the All-campaigns summary).
  const valueForScope = (field: string, scope: CampaignSplitScope) =>
    activePlatform ? getFieldValue(draft, activePlatform, scope.property, field, undefined, scope.key) : ''

  // Whether a field still holds its AI-recommended value for a specific campaign scope. Mirrors
  // isAiValue but scoped to a split (so the summary chip stays in sync with the individual
  // settings: overriding a value in that campaign's editor removes the chip here too). A field
  // whose recommendation is empty for the scope (e.g. keywords on Performance Max) is not "AI".
  const scopeFieldIsAi = (field: string, scope: CampaignSplitScope) => {
    if (!activePlatform) return false
    const recommended = defaultFieldValue(activePlatform, scope.property, field, undefined, scope.key)
    if (recommended.trim() === '') return false
    return valueForScope(field, scope) === recommended
  }

  // "All campaigns" per-step summary: one row per split scope, columns = this step's key fields.
  // A column may provide a custom `render(scope)` cell; otherwise it reads `field` as text.
  // Clicking a row opens that campaign's editable fields for the step.
  const renderCampaignSummary = (
    caption: string,
    fields: Array<{
      header: string
      field?: string
      width?: string
      // When set, the column shows an AI chip for a scope while that scope's value still equals the
      // AI recommendation (via scopeFieldIsAi on `aiField`, defaulting to `field`). No background
      // tint — the chip alone marks the recommendation, kept in sync with the per-campaign editor.
      ai?: AiHint
      aiField?: string
      render?: (scope: CampaignSplitScope) => React.ReactNode
    }>,
  ) => (
    <Styled.TableWrap>
      <Styled.DataTable aria-label={caption}>
        <thead>
          <tr>
            <th>Campaign / split</th>
            <th>Current</th>
            {fields.map(column => (
              <th key={column.header} style={column.width ? { width: column.width } : undefined}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {campaignSplitScopes.map(scope => {
            const currentMeta = activePlatform
              ? CAMPAIGN_CURRENT_STATUS_META[
                  platformCurrentStatusFor(activePlatform.id, scope.tactic, data, selectedMediaPlanYear)
                ]
              : null
            return (
              <tr key={scope.key}>
                <td>
                  <Styled.LinkButton type='button' onClick={() => setSelectedCampaignScopeKey(scope.key)}>
                    {scope.label}
                  </Styled.LinkButton>
                </td>
                <td>
                  {currentMeta ? (
                    <Styled.CurrentStatusChip $tone={currentMeta.tone}>{currentMeta.label}</Styled.CurrentStatusChip>
                  ) : (
                    '—'
                  )}
                </td>
                {fields.map(column => {
                  const cellValue = column.render
                    ? column.render(scope)
                    : valueForScope(column.field ?? '', scope) || '—'
                  // Chip only (no tint). Shown while this scope's value still matches the AI
                  // recommendation, so overriding it in the campaign editor hides the chip here too.
                  const isAiRecommended =
                    Boolean(column.ai) && scopeFieldIsAi(column.aiField ?? column.field ?? '', scope)
                  return (
                    <td key={column.header} style={column.width ? { width: column.width } : undefined}>
                      {column.ai && isAiRecommended ? (
                        <Styled.CellWithAiChip>
                          {cellValue}
                          <AiIndicator summary={column.ai.summary} />
                        </Styled.CellWithAiChip>
                      ) : (
                        cellValue
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </Styled.DataTable>
    </Styled.TableWrap>
  )

  const renderBasicInfo = () => (
    <>
      <Styled.SectionTitle>Basic info</Styled.SectionTitle>
      <Styled.FieldGrid>
        <Styled.Field>
          <FieldLabel htmlFor='campaign-canvas-advertiser-inp' text='Advertiser' />
          <Input id='campaign-canvas-advertiser-inp' value={data.basicInfo.advertiser} disabled />
        </Styled.Field>
        <Styled.AiField data-ai-filled={String(draft.campaignName.trim().length > 0)}>
          <FieldLabel htmlFor='campaign-canvas-name-inp' text='Campaign name' required ai={AI_HINTS.campaignName} />
          <Input
            id='campaign-canvas-name-inp'
            value={draft.campaignName}
            status={draft.campaignName.trim() ? undefined : 'error'}
            errorMessage={draft.campaignName.trim() ? undefined : 'Campaign name is required'}
            onChange={event => updateDraft('campaignName', event.target.value)}
          />
        </Styled.AiField>
        <Styled.Field>
          <FieldLabel htmlFor='campaign-canvas-id-inp' text='Campaign ID' />
          <Input id='campaign-canvas-id-inp' value={data.basicInfo.campaignId} disabled />
        </Styled.Field>
        <Styled.Field>
          <FieldLabel htmlFor='campaign-canvas-media-plan-inp' text='Media plan' badge='Read only' />
          <Input id='campaign-canvas-media-plan-inp' value={data.basicInfo.mediaPlanName} disabled />
        </Styled.Field>
        <Styled.AiField data-ai-filled={String(Boolean(draft.objective))}>
          <FieldLabel htmlFor='campaign-canvas-objective-sel' text='Marketing objective' ai={AI_HINTS.objective} />
          <Select<string>
            id='campaign-canvas-objective-sel'
            value={draft.objective}
            showSearch
            options={toOptions(optionsForCampaignField('objective', draft.objective))}
            onChange={(objective: string) => updateDraft('objective', objective)}
          />
        </Styled.AiField>
        <Styled.Field>
          <FieldLabel htmlFor='campaign-canvas-type-sel' text='Campaign type' />
          <Select<string>
            id='campaign-canvas-type-sel'
            value={draft.campaignType}
            showSearch
            options={toOptions(optionsForCampaignField('campaignType', draft.campaignType))}
            onChange={(campaignType: string) => updateDraft('campaignType', campaignType)}
          />
        </Styled.Field>
        <Styled.Field>
          <FieldLabel htmlFor='campaign-canvas-start-date' text='Flight start date' required />
          <DatePicker
            id='campaign-canvas-start-date'
            format='DD-MMM-YYYY'
            value={draft.startDate ? dayjs(draft.startDate) : null}
            onChange={(date: Dayjs | null) => updateDraft('startDate', date ? date.format('YYYY-MM-DD') : '')}
          />
        </Styled.Field>
        <Styled.Field>
          <FieldLabel htmlFor='campaign-canvas-end-date' text='Flight end date' required />
          <DatePicker
            id='campaign-canvas-end-date'
            format='DD-MMM-YYYY'
            value={draft.endDate ? dayjs(draft.endDate) : null}
            minDate={draft.startDate ? dayjs(draft.startDate) : undefined}
            onChange={(date: Dayjs | null) => updateDraft('endDate', date ? date.format('YYYY-MM-DD') : '')}
          />
        </Styled.Field>
        <Styled.Field>
          <FieldLabel htmlFor='campaign-canvas-budget' text='Total budget ($)' required />
          <InputNumber
            id='campaign-canvas-budget'
            value={draft.totalBudget}
            min={0}
            affixBefore='$'
            onChange={nextValue => updateDraft('totalBudget', Number(nextValue ?? 0))}
          />
        </Styled.Field>
        <Styled.AiField data-ai-filled={String(draft.manageBudgetByOba)}>
          <FieldLabel htmlFor='campaign-canvas-oba' text='Manage budget by OBA' ai={AI_HINTS.oba} />
          <Styled.ToggleRow>
            <Toggle
              id='campaign-canvas-oba'
              checked={draft.manageBudgetByOba}
              onChange={(checked: boolean) => updateDraft('manageBudgetByOba', checked)}
            />
            <Styled.FieldHint>
              Optimized Budget Allocation distributes spend across platforms automatically based on performance.
            </Styled.FieldHint>
          </Styled.ToggleRow>
        </Styled.AiField>
        <Styled.FullWidthField>
          <Styled.TableWrap>
            <Styled.DataTable aria-label='Properties'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Property</th>
                </tr>
              </thead>
              <tbody>
                {data.properties.map((property, index) => (
                  <tr key={property}>
                    <td>{index + 1}</td>
                    <td>{property}</td>
                  </tr>
                ))}
              </tbody>
            </Styled.DataTable>
          </Styled.TableWrap>
        </Styled.FullWidthField>
      </Styled.FieldGrid>
    </>
  )

  const renderChannels = () => (
    <>
      <Styled.SectionTitle>Channels &amp; platforms</Styled.SectionTitle>
      <Styled.Hint>Channels, platforms and tactics are set from the media plan.</Styled.Hint>
      {groupPlatformsByChannel(activePlatforms).map(group => (
        <React.Fragment key={group.channel}>
          <Styled.SubsectionTitle>{group.channel}</Styled.SubsectionTitle>
          <Styled.TableWrap>
            <Styled.ChannelDataTable aria-label={`${group.channel} platforms`}>
              <thead>
                <tr>
                  <th>Platform</th>
                  <th>Tactics</th>
                  <th>Split by</th>
                </tr>
              </thead>
              <tbody>
                {group.platforms.map(platform => (
                  <tr key={platform.id}>
                    <td>{platform.name}</td>
                    <td>{platform.tactics.length > 0 ? platform.tactics.join(', ') : '—'}</td>
                    <td>
                      <Styled.ChannelSplitCell>
                        <Styled.AiSelectControl
                          style={{ width: '100%' }}
                          data-ai-filled={String(Boolean(getSplitBy(draft, platform)))}
                        >
                          <Select<string>
                            id={`campaign-canvas-split-${platform.id}-sel`}
                            value={getSplitBy(draft, platform)}
                            options={data.splitOptions.map(option => ({
                              label: splitByDisplayLabel(option),
                              value: option,
                            }))}
                            onChange={(splitBy: string) =>
                              setDraft(current => ({
                                ...current,
                                splitBy: { ...current.splitBy, [platform.id]: splitBy },
                              }))
                            }
                          />
                        </Styled.AiSelectControl>
                        <AiIndicator summary={AI_HINTS.splitBy.summary} />
                        {(() => {
                          const meta =
                            CAMPAIGN_CURRENT_STATUS_META[
                              platformCurrentStatusFor(platform.id, null, data, selectedMediaPlanYear)
                            ]
                          return (
                            <Styled.CurrentStatusChip $tone={meta.tone} title='Current status of this campaign'>
                              {meta.label}
                            </Styled.CurrentStatusChip>
                          )
                        })()}
                      </Styled.ChannelSplitCell>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Styled.ChannelDataTable>
          </Styled.TableWrap>
        </React.Fragment>
      ))}
      {useClosedWonMediaPlanScope ? (
        <Styled.Hint data-testid='closed-won-excluded-channels-note'>
          {closedWonExcludedChannelsNote} are excluded from this flow.
        </Styled.Hint>
      ) : null}
    </>
  )

  const renderTextField = (
    platform: CampaignPlatform,
    field: string,
    label: string,
    options: { required?: boolean; ai?: AiHint } = {},
  ) => {
    const fieldValue = value(platform, field)
    const aiActive = Boolean(options.ai) && isAiValue(platform, field)
    const Wrapper = options.ai ? Styled.AiField : Styled.Field
    const id = `campaign-canvas-${platform.id}-${field}-inp`
    return (
      <Wrapper key={field} {...(options.ai ? { 'data-ai-filled': String(aiActive) } : {})}>
        <FieldLabel htmlFor={id} text={label} required={options.required} ai={aiActive ? options.ai : undefined} />
        <Input
          id={id}
          value={fieldValue}
          status={options.required && !fieldValue.trim() ? 'error' : undefined}
          errorMessage={options.required && !fieldValue.trim() ? `${label} is required` : undefined}
          onChange={event => update(platform, field, event.target.value)}
        />
        <ApplyToAllControls platform={platform} field={field} getValue={() => value(platform, field)} />
      </Wrapper>
    )
  }

  // Formats a stored numeric string for read-only summaries: '$48.00', '5.0x', or '—' when empty.
  // Read-only money format for summaries: two decimals with a trailing $ (e.g. "48.00 $").
  const formatMoney = (raw: string) => (raw.trim() ? `${Number(raw).toFixed(2)} $` : '')
  // Read-only ratio format for summaries: two decimals, no affix (ROAS, e.g. "5.00").
  const formatRatio = (raw: string) => (raw.trim() ? Number(raw).toFixed(2) : '')

  // Numeric bid/budget field with a currency ($) or ratio affix, mirroring the OBA currency
  // inputs. The value is stored as a plain numeric string; an empty value clears it. With
  // twoDecimals the displayed value is always fixed to two decimals (e.g. 48.00).
  const renderNumberField = (
    platform: CampaignPlatform,
    field: string,
    label: string,
    options: {
      affixBefore?: string
      affixAfter?: string
      min?: number
      step?: number
      twoDecimals?: boolean
      ai?: AiHint
    } = {},
  ) => {
    const raw = value(platform, field)
    const numericValue = raw === '' ? undefined : Number(raw)
    const aiActive = Boolean(options.ai) && isAiValue(platform, field)
    const Wrapper = options.ai ? Styled.AiField : Styled.Field
    const id = `campaign-canvas-${platform.id}-${field}-inp`
    return (
      <Wrapper key={field} {...(options.ai ? { 'data-ai-filled': String(aiActive) } : {})}>
        <FieldLabel htmlFor={id} text={label} ai={aiActive ? options.ai : undefined} />
        <InputNumber
          id={id}
          value={Number.isFinite(numericValue) ? numericValue : undefined}
          min={options.min ?? 0}
          step={options.step}
          affixBefore={options.affixBefore}
          affixAfter={options.affixAfter}
          formatter={
            options.twoDecimals
              ? formattedValue => (formattedValue ? Number(formattedValue).toFixed(2) : '')
              : undefined
          }
          onChange={nextValue =>
            update(platform, field, nextValue === null || nextValue === undefined ? '' : String(nextValue))
          }
        />
        <ApplyToAllControls platform={platform} field={field} getValue={() => value(platform, field)} />
      </Wrapper>
    )
  }

  const renderOptionField = (
    platform: CampaignPlatform,
    field: SetupOptionField,
    label: string,
    options: { ai?: AiHint; required?: boolean } = {},
  ) => {
    const selectedValue = value(platform, field)
    const aiActive = Boolean(options.ai) && isAiValue(platform, field)
    const Wrapper = options.ai ? Styled.AiField : Styled.Field
    const id = `campaign-canvas-${platform.id}-${field}-sel`
    // "Not set" is the matrix default for conditional/optional fields: show it as the empty
    // greyed placeholder (nothing chosen yet). It is not offered as a selectable dropdown item.
    const isUnset = selectedValue === NOT_SET
    const displayValue = isUnset ? '' : selectedValue
    const selectOptions = optionsForPlatformField(platform, field, displayValue ? [displayValue] : [])
    const missingRequired = Boolean(options.required) && !displayValue.trim()
    return (
      <Wrapper key={field} {...(options.ai ? { 'data-ai-filled': String(aiActive) } : {})}>
        <FieldLabel htmlFor={id} text={label} required={options.required} ai={aiActive ? options.ai : undefined} />
        <Select<string>
          id={id}
          showSearch
          value={displayValue}
          placeholder={isUnset ? NOT_SET : undefined}
          options={toOptions(selectOptions)}
          required={options.required}
          status={missingRequired ? 'error' : undefined}
          errorMessage={missingRequired ? `${label} is required` : undefined}
          onChange={(nextValue: string) => update(platform, field, nextValue)}
        />
        <ApplyToAllControls platform={platform} field={field} getValue={() => value(platform, field)} />
      </Wrapper>
    )
  }

  const renderBudget = () => {
    if (!activePlatform) {
      return (
        <>
          <Styled.Hint>Budget based on the media plan.</Styled.Hint>
          {renderSummaryTable('Budget strategy summary', activePlatforms, [
            {
              header: 'Bid strategy',
              ai: AI_HINTS.bidStrategy,
              render: (platform, property) => value(platform, 'bidStrategy', property),
            },
            { header: 'Budget & pacing', render: (platform, property) => value(platform, 'budgetPacing', property) },
          ])}
        </>
      )
    }

    if (isAllCampaignsView) {
      return renderCampaignSummary('Budget strategy by campaign', [
        { header: 'Budget & pacing', field: 'budgetPacing' },
        { header: 'Bid strategy', field: 'bidStrategy', ai: AI_HINTS.bidStrategy },
        { header: 'Optimization event', field: 'optimizationEvent', ai: AI_HINTS.optimizationEvent },
        { header: 'Target CPA', render: scope => formatMoney(valueForScope('targetCpa', scope)) || '—' },
        { header: 'Target ROAS', render: scope => formatRatio(valueForScope('targetRoas', scope)) || '—' },
        { header: 'Max CPC', render: scope => formatMoney(valueForScope('maxCpc', scope)) || '—' },
      ])
    }

    return (
      <>
        {renderPropertyContext()}
        <Styled.FieldGrid>
          {renderOptionField(activePlatform, 'budgetPacing', 'Budget & pacing', { required: true })}
          {renderOptionField(activePlatform, 'bidStrategy', 'Bid strategy', { ai: AI_HINTS.bidStrategy })}
          {renderOptionField(activePlatform, 'optimizationEvent', 'Optimization event', {
            ai: AI_HINTS.optimizationEvent,
          })}
          {renderNumberField(activePlatform, 'targetCpa', 'Target CPA / cost per result', {
            affixAfter: '$',
            step: 0.01,
            twoDecimals: true,
          })}
          {matrixSupported(activePlatform.id, 'targetRoas') !== false
            ? renderNumberField(activePlatform, 'targetRoas', 'Target ROAS', { step: 0.1, twoDecimals: true })
            : null}
          {renderNumberField(activePlatform, 'maxCpc', 'Max CPC / bid cap', {
            affixAfter: '$',
            step: 0.01,
            twoDecimals: true,
          })}
          {renderOptionField(activePlatform, 'valueRules', 'Value rules / conversion value')}
        </Styled.FieldGrid>
      </>
    )
  }

  // Rule-builder for the "Additional targeting" section: one row per added targeting type, each
  // with a type picker, a matching value editor, a kebab menu, and the type's guidance subtext.
  // Renders the value editor for a targeting field (single Select or multi ChipsEditor).
  const renderTargetingValueEditor = (
    platform: CampaignPlatform,
    def: AdditionalTargetingDef,
    rowId: string,
    aiRecommended = false,
  ) => {
    if (def.kind === 'single') {
      const selectedValue = value(platform, def.field)
      const isUnset = !selectedValue || selectedValue === NOT_SET
      return (
        <Select<string>
          id={`${rowId}-value-sel`}
          showSearch
          value={isUnset ? undefined : selectedValue}
          placeholder='Not set (recommended for conversion campaigns)'
          options={toOptions(optionsForPlatformField(platform, def.field, isUnset ? [] : [selectedValue]))}
          onChange={(nextValue: string) => update(platform, def.field, nextValue)}
        />
      )
    }
    return (
      <ChipsEditor
        id={`${rowId}-value`}
        label={def.label}
        values={splitList(value(platform, def.field))}
        options={optionsForPlatformField(platform, def.field, splitList(value(platform, def.field)))}
        aiRecommended={aiRecommended}
        onChange={nextValues => update(platform, def.field, joinList(nextValues))}
      />
    )
  }

  const renderAdditionalTargeting = (platform: CampaignPlatform) => {
    const supportedDefs = supportedTargetingDefs(platform)
    const rules = activeTargetingRules(platform)
    const usedFields = new Set(rules)
    const canAddMore = supportedDefs.some(def => !usedFields.has(def.field))

    return (
      <>
        <Styled.RuleHeader>
          <Styled.SubsectionTitle>Additional targeting</Styled.SubsectionTitle>
          <Button
            id={`campaign-canvas-${platform.id}-add-targeting-btn`}
            size='small'
            variant='outlined'
            disabled={!canAddMore}
            onClick={() => addTargetingRule(platform)}
          >
            Add targeting
          </Button>
        </Styled.RuleHeader>
        <Styled.RuleBuilder>
          {rules.length === 0 ? (
            <Styled.RuleEmptyState data-testid={`campaign-canvas-${platform.id}-targeting-empty`}>
              No additional targeting set. Add targeting with the “Add targeting” button above.
            </Styled.RuleEmptyState>
          ) : null}
          {rules.map((field, index) => {
            const def = supportedDefs.find(item => item.field === field)
            if (!def) return null
            // The type dropdown offers this row's current type plus any not-yet-used types.
            const typeOptions = supportedDefs.filter(item => item.field === field || !usedFields.has(item.field))
            const rowId = `campaign-canvas-${platform.id}-rule-${index}`
            // The value may be AI-recommended (e.g. Placements default): tint only the value field
            // to signal that, while leaving the targeting-type dropdown unstyled (user-chosen type).
            const aiRecommendedValue = def.field === 'placements' && isAiValue(platform, 'placements')
            return (
              <Styled.RuleRow key={`${field}-${index}`}>
                <Styled.RuleControls>
                  <Select<string>
                    id={`${rowId}-type-sel`}
                    showSearch
                    value={def.field}
                    options={typeOptions.map(item => ({ label: item.label, value: item.field }))}
                    onChange={(nextField: string) =>
                      changeTargetingRuleType(platform, index, nextField as SetupOptionField)
                    }
                  />
                  <Styled.RuleValueCell>
                    {renderTargetingValueEditor(platform, def, rowId, aiRecommendedValue)}
                    {targetingFieldGuidance[def.field] ? (
                      <Styled.RuleHint>{targetingFieldGuidance[def.field]}</Styled.RuleHint>
                    ) : null}
                  </Styled.RuleValueCell>
                  <Styled.RuleRowAside>
                    <DropdownMenu
                      menuType='kebab'
                      items={[
                        {
                          key: 'remove',
                          label: `Remove ${def.label.toLowerCase()}`,
                          onClick: () => removeTargetingRule(platform, def.field),
                        },
                      ]}
                    />
                  </Styled.RuleRowAside>
                </Styled.RuleControls>
              </Styled.RuleRow>
            )
          })}
        </Styled.RuleBuilder>
      </>
    )
  }

  const renderTargeting = () => {
    if (!activePlatform) {
      // Section 1: Location + Audience. Section 2: Additional targeting — only shown when something
      // is set, and only the targeting types actually added (as rules with a value).
      const activeAdditionalFields = activeAdditionalTargetingFields(activePlatforms)
      return (
        <>
          <Styled.SubsectionTitle>Location &amp; audience</Styled.SubsectionTitle>
          {renderSummaryTable('Location and audience summary', activePlatforms, [
            {
              header: 'Locations',
              ai: AI_HINTS.location,
              render: (platform, property) => value(platform, 'location', property),
            },
            {
              header: 'Audiences',
              ai: AI_HINTS.audience,
              render: (platform, property) => value(platform, 'audience', property),
            },
          ])}
          {activeAdditionalFields.length > 0 ? (
            <>
              <Styled.SubsectionTitle>Additional targeting</Styled.SubsectionTitle>
              {renderSummaryTable(
                'Additional targeting summary',
                activePlatforms,
                activeAdditionalFields.map(field => ({
                  header: additionalTargetingLabel(field),
                  render: (platform: CampaignPlatform, property: string | null) => value(platform, field, property),
                })),
              )}
            </>
          ) : null}
        </>
      )
    }

    if (isAllCampaignsView) {
      // Columns: Location + Audience always, then one per additional-targeting type actually set
      // across the platform's campaign splits (so edits per campaign are reflected, not a fixed list).
      const perCampaignAdditionalFields = activePlatform
        ? activeAdditionalFieldsAcrossScopes(activePlatform, campaignSplitScopes)
        : []
      return renderCampaignSummary('Targeting by campaign', [
        {
          header: 'Locations',
          ai: AI_HINTS.location,
          aiField: 'location',
          render: scope => <ValueListCell values={splitList(valueForScope('location', scope))} noun='locations' />,
        },
        {
          header: 'Audiences',
          ai: AI_HINTS.audience,
          aiField: 'audience',
          render: scope => <ValueListCell values={splitList(valueForScope('audience', scope))} noun='audiences' />,
        },
        ...perCampaignAdditionalFields.map(field => ({
          header: additionalTargetingLabel(field),
          render: (scope: CampaignSplitScope) => (
            <ValueListCell values={splitList(valueForScope(field, scope))} noun='values' />
          ),
        })),
      ])
    }

    const byProperty = splitsByProperty(draft, activePlatform)
    return (
      <>
        {renderPropertyContext()}
        <Styled.FieldGrid>
          <Styled.AiFullWidthField data-ai-filled={String(isAiValue(activePlatform, 'location'))}>
            <FieldLabel
              htmlFor={`campaign-canvas-${activePlatform.id}-location`}
              text='Location targeting'
              ai={isAiValue(activePlatform, 'location') ? AI_HINTS.location : undefined}
            />
            <ChipsEditor
              id={`campaign-canvas-${activePlatform.id}-location`}
              label='Location'
              values={splitList(value(activePlatform, 'location'))}
              options={data.locationOptions}
              aiRecommended={isAiValue(activePlatform, 'location')}
              onChange={values => update(activePlatform, 'location', joinList(values))}
            />
            <ApplyToAllControls
              platform={activePlatform}
              field='location'
              getValue={() => value(activePlatform, 'location')}
            />
          </Styled.AiFullWidthField>
          <Styled.AiFullWidthField data-ai-filled={String(isAiValue(activePlatform, 'audience'))}>
            <FieldLabel
              htmlFor={`campaign-canvas-${activePlatform.id}-audience`}
              text='Audience / user list'
              ai={isAiValue(activePlatform, 'audience') ? AI_HINTS.audience : undefined}
            />
            {byProperty ? (
              <ReadOnlyChips values={splitList(value(activePlatform, 'audience'))} />
            ) : (
              <ChipsEditor
                id={`campaign-canvas-${activePlatform.id}-audience`}
                label='Audience'
                values={splitList(value(activePlatform, 'audience'))}
                options={optionsForPlatformField(activePlatform, 'audience', [
                  ...data.audienceOptions,
                  ...splitList(value(activePlatform, 'audience')),
                ])}
                aiRecommended={isAiValue(activePlatform, 'audience')}
                onChange={values => update(activePlatform, 'audience', joinList(values))}
              />
            )}
            {byProperty ? null : (
              <ApplyToAllControls
                platform={activePlatform}
                field='audience'
                getValue={() => value(activePlatform, 'audience')}
              />
            )}
          </Styled.AiFullWidthField>
          {renderAdditionalTargeting(activePlatform)}
        </Styled.FieldGrid>
      </>
    )
  }

  const renderKeywordArea = (
    platform: CampaignPlatform,
    field: string,
    label: string,
    ai?: AiHint,
    matchField?: string,
  ) => {
    const id = `campaign-canvas-${platform.id}-${field}`
    const aiActive = Boolean(ai) && isAiValue(platform, field)
    const Wrapper = ai ? Styled.AiFullWidthField : Styled.FullWidthField
    const fieldValue = value(platform, field)
    const textarea = (
      <Styled.Textarea id={id} value={fieldValue} onChange={event => update(platform, field, event.target.value)} />
    )
    return (
      <Wrapper {...(ai ? { 'data-ai-filled': String(aiActive) } : {})}>
        <FieldLabel htmlFor={id} text={`${label} (${countLines(fieldValue)})`} ai={aiActive ? ai : undefined} />
        {matchField ? (
          <Styled.MatchTypeRow>
            {textarea}
            <Select<string>
              id={`${id}-match-sel`}
              value={value(platform, matchField)}
              options={toOptions(data.matchTypes)}
              onChange={(matchType: string) => update(platform, matchField, matchType)}
            />
          </Styled.MatchTypeRow>
        ) : (
          textarea
        )}
        <ApplyToAllControls platform={platform} field={field} getValue={() => value(platform, field)} />
      </Wrapper>
    )
  }

  const renderKeywords = () => {
    const keywordPlatforms = activePlatforms.filter(usesKeywords)

    if (!activePlatform) {
      const reference = keywordPlatforms[0]
      if (!reference) return <Styled.Hint>No paid search platform is enabled.</Styled.Hint>
      return (
        <Styled.TableWrap>
          <Styled.DataTable aria-label='Keywords summary'>
            <thead>
              <tr>
                <th>Type</th>
                <th>Match type</th>
                <th>Keywords</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Brand</td>
                <td>{`${value(reference, 'brandMatch', null)} match`}</td>
                <td>
                  <Styled.CellWithIndicator>
                    {`${countLines(value(reference, 'brandKeywords', null))} keywords`}
                    <AiIndicator summary={AI_HINTS.brandKeywords.summary} />
                  </Styled.CellWithIndicator>
                </td>
              </tr>
              <tr>
                <td>Generic</td>
                <td>{`${value(reference, 'genericMatch', null)} match`}</td>
                <td>
                  <Styled.CellWithIndicator>
                    {`${countLines(value(reference, 'genericKeywords', null))} keywords`}
                    <AiIndicator summary={AI_HINTS.genericKeywords.summary} />
                  </Styled.CellWithIndicator>
                </td>
              </tr>
              <tr>
                <td>Negative</td>
                <td>{`${value(reference, 'negativeMatch', null)} match`}</td>
                <td>{`${countLines(value(reference, 'negativeKeywords', null))} keywords`}</td>
              </tr>
            </tbody>
          </Styled.DataTable>
        </Styled.TableWrap>
      )
    }

    if (!usesKeywords(activePlatform)) {
      return <Styled.Hint>{`${activePlatform.name} does not use keywords.`}</Styled.Hint>
    }

    if (isAllCampaignsView) {
      const keywordLines = (field: string, scope: CampaignSplitScope) =>
        valueForScope(field, scope)
          .split('\n')
          .map(line => line.trim())
          .filter(Boolean)
      // Renders a keyword cell as a match-type chip above the keyword list (empty cells show a dash).
      const keywordCell = (field: string, matchField: string, scope: CampaignSplitScope) => {
        const lines = keywordLines(field, scope)
        if (lines.length === 0) return <>{'\u2014'}</>
        const match = valueForScope(matchField, scope)
        return (
          <>
            {match ? (
              <Styled.ChipList>
                <Styled.Chip>{`${match} match`}</Styled.Chip>
              </Styled.ChipList>
            ) : null}
            <ValueListCell values={lines} noun='keywords' />
          </>
        )
      }
      return renderCampaignSummary('Keywords by campaign', [
        {
          header: 'Brand keywords',
          ai: AI_HINTS.brandKeywords,
          aiField: 'brandKeywords',
          render: scope => keywordCell('brandKeywords', 'brandMatch', scope),
        },
        {
          header: 'Generic keywords',
          ai: AI_HINTS.genericKeywords,
          aiField: 'genericKeywords',
          render: scope => keywordCell('genericKeywords', 'genericMatch', scope),
        },
        { header: 'Negative keywords', render: scope => keywordCell('negativeKeywords', 'negativeMatch', scope) },
        { header: 'Keyword options', field: 'keywordOptions', width: '160px' },
      ])
    }

    // A campaign scope is Performance Max when its tactic is Pmax. PMax has no manual brand/generic
    // keyword lists; it uses a campaign-level keyword targeting option (Search themes) instead.
    const isPmaxScope = campaignScopeForPlatform(activePlatform)?.tactic === 'Pmax'
    const pmaxKeywordOptionChoices = optionsForPlatformField(activePlatform, 'keywordOptions', [
      ...defaultKeywordOptions(activePlatform),
      ...splitList(value(activePlatform, 'keywordOptions')),
    ])
    // Default the PMax select to the user's chosen value, else a Search themes / Performance Max option.
    const pmaxKeywordOption =
      splitList(value(activePlatform, 'keywordOptions'))[0] ??
      pmaxKeywordOptionChoices.find(option => /performance max|search theme/i.test(option)) ??
      pmaxKeywordOptionChoices[0]

    return (
      <>
        {renderPropertyContext()}
        <Styled.FieldGrid>
          {isPmaxScope ? (
            // Performance Max: no manual brand/generic keyword lists — only the campaign-level
            // keyword targeting option (Search themes). Negatives are still allowed.
            <Styled.AiFullWidthField data-ai-filled={String(isAiValue(activePlatform, 'keywordOptions'))}>
              <FieldLabel
                htmlFor={`campaign-canvas-${activePlatform.id}-keyword-options`}
                text='Keyword targeting options'
                ai={isAiValue(activePlatform, 'keywordOptions') ? AI_HINTS.genericKeywords : undefined}
              />
              <Styled.AiSelectControl
                data-ai-recommended={String(isAiValue(activePlatform, 'keywordOptions'))}
                data-ai-filled={String(isAiValue(activePlatform, 'keywordOptions'))}
              >
                <Select<string>
                  id={`campaign-canvas-${activePlatform.id}-keyword-options-sel`}
                  showSearch
                  value={pmaxKeywordOption}
                  options={toOptions(pmaxKeywordOptionChoices)}
                  onChange={(nextValue: string) => update(activePlatform, 'keywordOptions', nextValue)}
                />
              </Styled.AiSelectControl>
            </Styled.AiFullWidthField>
          ) : (
            <>
              {renderKeywordArea(
                activePlatform,
                'brandKeywords',
                'Brand keywords',
                AI_HINTS.brandKeywords,
                'brandMatch',
              )}
              {renderKeywordArea(
                activePlatform,
                'genericKeywords',
                'Generic keywords',
                AI_HINTS.genericKeywords,
                'genericMatch',
              )}
            </>
          )}
          {renderKeywordArea(activePlatform, 'negativeKeywords', 'Negative keywords', undefined, 'negativeMatch')}
        </Styled.FieldGrid>
      </>
    )
  }

  const renderCreatives = () => {
    if (!activePlatform) {
      return (
        <>
          <Styled.FieldGrid>
            <Styled.AiField data-ai-filled={String(CREATIVE_SOURCE.trim().length > 0)}>
              <FieldLabel
                htmlFor='campaign-canvas-creative-source-inp'
                text='Creative source'
                ai={AI_HINTS.creativeSource}
              />
              <Input id='campaign-canvas-creative-source-inp' value={CREATIVE_SOURCE} disabled />
            </Styled.AiField>
          </Styled.FieldGrid>
          <Styled.SubsectionTitle>Creatives by platform</Styled.SubsectionTitle>
          {renderSummaryTable('Creatives summary', activePlatforms, [
            { header: 'Ad format', render: platform => platform.creative.adFormat },
            { header: 'Destination', render: (platform, property) => value(platform, 'destination', property) },
          ])}
        </>
      )
    }

    if (isAllCampaignsView) {
      const creativeImages = activePlatform?.creative.assetImages ?? []
      const languagesForScope = (scope: CampaignSplitScope) => {
        const scopeKey = `${activePlatform?.id ?? ''}|${scope.key}`
        const locations = splitList(
          getFieldValue(draft, activePlatform!, scope.property, 'location', undefined, scope.key),
        )
        return languageTabsFor(locations, draft.extraLanguages[scopeKey] ?? [])
          .map(tab => tab.label)
          .join(', ')
      }
      return renderCampaignSummary('Creatives by campaign', [
        { header: 'Ad format', field: 'adFormat' },
        {
          header: 'Destination',
          render: scope => (
            <Styled.SummaryTruncateCell title={valueForScope('destination', scope)}>
              {valueForScope('destination', scope) || '—'}
            </Styled.SummaryTruncateCell>
          ),
        },
        { header: 'Languages', render: scope => languagesForScope(scope) || '—' },
        {
          header: 'Creatives',
          render: () =>
            (activePlatform?.creative.banners?.length ?? 0) > 0 ? (
              `${activePlatform?.creative.banners?.length} HTML5 banners`
            ) : creativeImages.length > 0 ? (
              <Styled.SummaryThumbStrip>
                {creativeImages.map((image, index) => (
                  <Styled.SummaryThumb key={`${image}-${index}`}>
                    <CampaignCreativeAsset assetPath={image} alt='' />
                  </Styled.SummaryThumb>
                ))}
              </Styled.SummaryThumbStrip>
            ) : (
              '—'
            ),
        },
      ])
    }

    const platform = activePlatform
    const creativeStateKey = `${platform.id}|${campaignScopeForPlatform(platform)?.key ?? 'platform'}`
    const allLanguageTabs = languageTabsFor(
      splitList(value(platform, 'location')),
      draft.extraLanguages[creativeStateKey] ?? [],
    )
    const removedForScope = removedLanguages[creativeStateKey] ?? []
    const visibleLanguageTabs = allLanguageTabs.filter(tab => !removedForScope.includes(tab.lang))
    // Never remove the last tab.
    const languageTabs = visibleLanguageTabs.length > 0 ? visibleLanguageTabs : [allLanguageTabs[0]]
    const canRemoveLanguage = languageTabs.length > 1
    const removeLanguage = (lang: string) => {
      setRemovedLanguages(current => ({
        ...current,
        [creativeStateKey]: [...(current[creativeStateKey] ?? []), lang],
      }))
      // If an extra (added) language is removed, drop it from the draft too.
      setDraft(current => ({
        ...current,
        extraLanguages: {
          ...current.extraLanguages,
          [creativeStateKey]: (current.extraLanguages[creativeStateKey] ?? []).filter(item => item !== lang),
        },
      }))
      setActiveLanguage(current => {
        if (current[creativeStateKey] !== lang) return current
        const next = languageTabs.find(tab => tab.lang !== lang)
        return next ? { ...current, [creativeStateKey]: next.lang } : current
      })
    }
    const language = languageTabs.some(tab => tab.lang === activeLanguage[creativeStateKey])
      ? activeLanguage[creativeStateKey]
      : languageTabs[0].lang
    const headlineField = `headline:${language}`
    const descriptionField = `description:${language}`
    const images = platform.creative.assetImages ?? []
    const selectedImage = draft.selectedAsset[creativeStateKey] ?? images[0]
    // HTML5 display banners (e.g. Amadeus DSP): the banners carry the messaging, so there are no
    // headline / description fields; the media assets are the banner sizes.
    const banners = platform.creative.banners ?? []
    const selectedBanner = banners.find(banner => banner.id === draft.selectedAsset[creativeStateKey]) ?? banners[0]
    // Search ads with sitelinks (e.g. Google Ads): editable per language, mirrored in the preview.
    const sitelinkCount = platform.creative.searchAd?.sitelinks.length ?? 0
    const sitelinks = Array.from({ length: sitelinkCount }, (_, index) => ({
      title: value(platform, `sitelinkTitle${index + 1}:${language}`),
      description: value(platform, `sitelinkDesc${index + 1}:${language}`),
    }))
    const addableLanguages = data.creativeLanguageCatalog.filter(
      locale => !languageTabs.some(tab => tab.lang === locale.lang),
    )

    return (
      <>
        {renderPropertyContext()}
        <Styled.LanguageBar>
          <Tab
            id={`campaign-canvas-${platform.id}-languages`}
            activeKey={language}
            items={languageTabs.map(tab => ({
              key: tab.lang,
              label: (
                <Styled.LanguageTabLabel>
                  {tab.label}
                  {canRemoveLanguage ? (
                    <Styled.LanguageTabRemove
                      type='button'
                      aria-label={`Remove ${tab.label}`}
                      onClick={(event: React.MouseEvent) => {
                        event.stopPropagation()
                        removeLanguage(tab.lang)
                      }}
                    >
                      <Icon name='xmark' width={10} height={10} aria-hidden='true' />
                    </Styled.LanguageTabRemove>
                  ) : null}
                </Styled.LanguageTabLabel>
              ),
            }))}
            onChange={(lang: string) => setActiveLanguage(current => ({ ...current, [creativeStateKey]: lang }))}
          />
          <AddLanguageDropdown
            id={`campaign-canvas-${platform.id}-add-language`}
            languages={addableLanguages.map(locale => ({ lang: locale.lang, label: locale.label }))}
            onSelect={lang => {
              setRemovedLanguages(current => ({
                ...current,
                [creativeStateKey]: (current[creativeStateKey] ?? []).filter(item => item !== lang),
              }))
              setDraft(current => ({
                ...current,
                extraLanguages: {
                  ...current.extraLanguages,
                  [creativeStateKey]: [...(current.extraLanguages[creativeStateKey] ?? []), lang],
                },
              }))
              setActiveLanguage(current => ({ ...current, [creativeStateKey]: lang }))
            }}
          />
        </Styled.LanguageBar>
        <Styled.CreativeLayout>
          <Styled.CreativeFields>
            {renderOptionField(platform, 'adFormat', 'Ad format')}
            {banners.length === 0
              ? renderTextField(platform, headlineField, 'Headline / primary text', { ai: AI_HINTS.headline })
              : null}
            {banners.length === 0 ? (
              <Styled.AiField data-ai-filled={String(isAiValue(platform, descriptionField))}>
                <FieldLabel
                  htmlFor={`campaign-canvas-${platform.id}-description`}
                  text='Description'
                  ai={isAiValue(platform, descriptionField) ? AI_HINTS.description : undefined}
                />
                <Styled.Textarea
                  id={`campaign-canvas-${platform.id}-description`}
                  value={value(platform, descriptionField)}
                  onChange={event => update(platform, descriptionField, event.target.value)}
                />
              </Styled.AiField>
            ) : null}
            {sitelinkCount > 0 ? (
              <Styled.FullWidthField>
                <Styled.SubsectionTitle>Sitelinks</Styled.SubsectionTitle>
                {sitelinks.map((_, index) => (
                  <Styled.FieldGrid key={`sitelink-${index}`}>
                    {renderTextField(platform, `sitelinkTitle${index + 1}:${language}`, `Sitelink ${index + 1} title`)}
                    {renderTextField(
                      platform,
                      `sitelinkDesc${index + 1}:${language}`,
                      `Sitelink ${index + 1} description`,
                    )}
                  </Styled.FieldGrid>
                ))}
              </Styled.FullWidthField>
            ) : null}
            <Styled.AiField data-ai-filled={String(Boolean(selectedImage) && selectedImage === images[0])}>
              <FieldLabel
                text='Media assets'
                ai={Boolean(selectedImage) && selectedImage === images[0] ? AI_HINTS.mediaAssets : undefined}
              />
              {banners.length > 0 ? (
                <Styled.BannerGrid>
                  {banners.map(banner => (
                    <Styled.BannerTile
                      key={banner.id}
                      type='button'
                      $selected={banner.id === selectedBanner?.id}
                      aria-pressed={banner.id === selectedBanner?.id}
                      aria-label={`Select banner ${banner.size}`}
                      onClick={() =>
                        setDraft(current => ({
                          ...current,
                          selectedAsset: { ...current.selectedAsset, [creativeStateKey]: banner.id },
                        }))
                      }
                    >
                      <ScaledBanner banner={banner} boxHeight={72} />
                      <span>{banner.size}</span>
                    </Styled.BannerTile>
                  ))}
                </Styled.BannerGrid>
              ) : images.length > 0 ? (
                <Styled.AssetGrid>
                  {images.map((image, index) => (
                    <Styled.AssetTile
                      key={image}
                      type='button'
                      $selected={image === selectedImage}
                      aria-pressed={image === selectedImage}
                      aria-label={`Select asset ${index + 1}`}
                      onClick={() =>
                        setDraft(current => ({
                          ...current,
                          selectedAsset: { ...current.selectedAsset, [creativeStateKey]: image },
                        }))
                      }
                    >
                      <CampaignCreativeAsset assetPath={image} alt={`${platform.name} creative ${index + 1}`} />
                      {image === selectedImage ? (
                        <Styled.AssetCheck>
                          <Icon name='check' width={10} height={10} color={colors.cloud_0} />
                        </Styled.AssetCheck>
                      ) : null}
                    </Styled.AssetTile>
                  ))}
                  <Styled.AddAssetTile type='button'>+ Add image</Styled.AddAssetTile>
                </Styled.AssetGrid>
              ) : (
                <Styled.FieldHint>{platform.creative.assets}</Styled.FieldHint>
              )}
            </Styled.AiField>
            <Styled.AiFullWidthField data-ai-filled={String(isAiValue(platform, 'extensions'))}>
              <FieldLabel
                htmlFor={`campaign-canvas-${platform.id}-extensions`}
                text='Additional assets'
                ai={isAiValue(platform, 'extensions') ? AI_HINTS.mediaAssets : undefined}
              />
              <ChipsEditor
                id={`campaign-canvas-${platform.id}-extensions`}
                label='Additional asset'
                values={splitList(value(platform, 'extensions'))}
                options={optionsForPlatformField(platform, 'extensions', splitList(value(platform, 'extensions')))}
                aiRecommended={isAiValue(platform, 'extensions')}
                onChange={values => update(platform, 'extensions', joinList(values))}
              />
            </Styled.AiFullWidthField>
            {renderTextField(platform, 'destination', 'Destination / landing page', { required: true })}
            <Styled.FullWidthField>
              <FieldLabel htmlFor={`campaign-canvas-${platform.id}-tracking`} text='Tracking parameters' />
              <ChipsEditor
                id={`campaign-canvas-${platform.id}-tracking`}
                label='Tracking parameter'
                values={splitList(value(platform, 'tracking'))}
                options={optionsForPlatformField(platform, 'tracking', splitList(value(platform, 'tracking')))}
                onChange={values => update(platform, 'tracking', joinList(values))}
              />
            </Styled.FullWidthField>
          </Styled.CreativeFields>
          <Styled.PreviewPanel>
            <Styled.PreviewLabel>Ad preview</Styled.PreviewLabel>
            <CampaignAdPreview
              platform={platform}
              headline={value(platform, headlineField)}
              description={value(platform, descriptionField)}
              image={selectedImage}
              language={language}
              sitelinks={sitelinkCount > 0 ? sitelinks : undefined}
              banner={selectedBanner}
            />
          </Styled.PreviewPanel>
        </Styled.CreativeLayout>
      </>
    )
  }

  const renderSummary = () => {
    const summaryPlatform = activePlatform ?? activePlatforms[0] ?? null
    const budget = summaryPlatform
      ? platformBudgetAllocation(summaryPlatform.id, resolveMediaPlan(selectedMediaPlanYear))
      : null
    return (
      <>
        <Styled.SectionTitle>Summary</Styled.SectionTitle>
        <Styled.SummaryGrid>
          <Styled.SummaryStat>
            Channel / Platform
            <strong>{summaryPlatform ? `${summaryPlatform.group} — ${summaryPlatform.name}` : '—'}</strong>
          </Styled.SummaryStat>
          <Styled.SummaryStat>
            Flight dates<strong>{`${formatDisplayDate(draft.startDate)} → ${formatDisplayDate(draft.endDate)}`}</strong>
          </Styled.SummaryStat>
          <Styled.SummaryStat>
            Platform budget<strong>{`$${(budget?.annual ?? 0).toLocaleString('en-US')}`}</strong>
          </Styled.SummaryStat>
        </Styled.SummaryGrid>
        {budget ? (
          <Styled.SummaryMonthGrid aria-label='Monthly budget split for this platform'>
            {budget.monthly.map(entry => (
              <Styled.SummaryMonthCard key={entry.month}>
                {entry.month}
                <strong>{`$${entry.amount.toLocaleString('en-US')}`}</strong>
              </Styled.SummaryMonthCard>
            ))}
          </Styled.SummaryMonthGrid>
        ) : null}
        {activePlatforms.map(platform => {
          // Current-plan edit mode: show only the US presence we create/unpause (campaign + US ad
          // group), dropping tactics that are already US-only. See usCurrentPlanEditCampaigns.
          if (usCurrentPlanEdit) {
            // First level is split by Property, so build the US campaigns per property × tactic.
            const editProperties = usCurrentPlanProperties(selectedMediaPlanYear)
            const editRows = editProperties
              .flatMap(property => usCurrentPlanEditCampaigns(platform.id, property))
              // Step 2 (missing-only): keep just the campaigns that are newly created.
              .filter(row => (usAddMissingOnly ? row.campaign.action === 'new' : true))
            return (
              <Styled.SummaryPlatformCard key={platform.id}>
                <Styled.SummaryPlatformHeader>
                  <PlatformChip chipKey={chipKey(platform.id)} label={platform.name} />
                  <span>{`${editRows.length} campaign${editRows.length === 1 ? '' : 's'}`}</span>
                  <Styled.FieldHint>US-only — added to the existing plan</Styled.FieldHint>
                </Styled.SummaryPlatformHeader>
                <Styled.TableWrap>
                  <Styled.DataTable aria-label={`US campaigns for ${platform.name}`}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Level</th>
                        <th>Current</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {editRows.length === 0 ? (
                        <tr>
                          <td colSpan={4}>
                            <Styled.Hint>US is already covered on every campaign — nothing to create.</Styled.Hint>
                          </td>
                        </tr>
                      ) : null}
                      {editRows.map(row => {
                        const campMeta = US_EDIT_ACTION_META[row.campaign.action]
                        const campCurrent = CAMPAIGN_CURRENT_STATUS_META[row.campaign.current]
                        const agMeta = US_EDIT_ACTION_META[row.usAdGroup.action]
                        const agCurrent = CAMPAIGN_CURRENT_STATUS_META[row.usAdGroup.current]
                        const expandKey = `${platform.id}:${row.campaignName}`
                        const isExpanded = expandedSummaryCampaigns[expandKey] ?? false
                        return (
                          <React.Fragment key={row.campaignName}>
                            <tr>
                              <td>
                                <Styled.CampaignExpandToggle
                                  type='button'
                                  expanded={isExpanded}
                                  aria-expanded={isExpanded}
                                  aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${row.campaignName}`}
                                  onClick={() =>
                                    setExpandedSummaryCampaigns(current => ({ ...current, [expandKey]: !isExpanded }))
                                  }
                                >
                                  <Icon name='caretDown' width={12} height={12} color={colors.cloud_70} />
                                  {row.campaignName}
                                </Styled.CampaignExpandToggle>
                              </td>
                              <td>
                                <Styled.LevelTag>{row.campaignNoun}</Styled.LevelTag>
                              </td>
                              <td>
                                <Styled.CurrentStatusChip $tone={campCurrent.tone}>
                                  {campCurrent.label}
                                </Styled.CurrentStatusChip>
                              </td>
                              <td>
                                <Styled.StatusChip $tone={campMeta.tone}>{campMeta.label}</Styled.StatusChip>
                              </td>
                            </tr>
                            {isExpanded ? (
                              <Styled.AdGroupRow>
                                <td>{row.usAdGroupName}</td>
                                <td>
                                  <Styled.LevelTag $nested>{row.adGroupNoun}</Styled.LevelTag>
                                </td>
                                <td>
                                  <Styled.CurrentStatusChip $tone={agCurrent.tone}>
                                    {agCurrent.label}
                                  </Styled.CurrentStatusChip>
                                </td>
                                <td>
                                  <Styled.StatusChip $tone={agMeta.tone}>{agMeta.label}</Styled.StatusChip>
                                </td>
                              </Styled.AdGroupRow>
                            ) : null}
                          </React.Fragment>
                        )
                      })}
                    </tbody>
                  </Styled.DataTable>
                </Styled.TableWrap>
              </Styled.SummaryPlatformCard>
            )
          }
          const campaigns = campaignsForDraft(draft, platform)
          const splitConfig = getPlatformSplitConfig(platform.id)
          // Level nouns derived from the per-platform split labels ("Split Campaign by" → "Campaign",
          // "Split Ad Set by" → "Ad Set", etc.).
          const levelNoun = (label: string | undefined, fallback: string) =>
            label?.replace(/^Split\s+/, '').replace(/\s+by$/, '') ?? fallback
          const campaignNoun = levelNoun(splitConfig?.campaignLabel, 'Campaign')
          const adGroupNoun = levelNoun(splitConfig?.adGroupLabel, 'Ad Group')
          const adGroupSplitValue = getAdGroupSplitBy(draft, platform)
          return (
            <Styled.SummaryPlatformCard key={platform.id}>
              <Styled.SummaryPlatformHeader>
                <PlatformChip chipKey={chipKey(platform.id)} label={platform.name} />
                <span>{`${campaigns.length} campaign${campaigns.length === 1 ? '' : 's'}`}</span>
                <Styled.FieldHint>
                  {`Split Campaign by: ${splitByDisplayLabel(getSplitBy(draft, platform))}`}
                  {splitConfig
                    ? ` · ${adGroupNoun} by: ${adGroupSplitValue ? splitByDisplayLabel(adGroupSplitValue) : 'None'}`
                    : ''}
                </Styled.FieldHint>
              </Styled.SummaryPlatformHeader>
              <Styled.TableWrap>
                <Styled.DataTable aria-label={`Campaigns for ${platform.name}`}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Level</th>
                      <th>Current</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map(campaign => {
                      const status: CampaignStatus = campaignStatusFor(campaign, data, selectedMediaPlanYear)
                      const meta = CAMPAIGN_STATUS_META[status]
                      const currentMeta =
                        CAMPAIGN_CURRENT_STATUS_META[campaignCurrentStatusFor(campaign, data, selectedMediaPlanYear)]
                      const adGroups = adGroupsForCampaign(draft, platform, campaign)
                      const expandKey = `${platform.id}:${campaign}`
                      const isExpanded = expandedSummaryCampaigns[expandKey] ?? false
                      return (
                        <React.Fragment key={campaign}>
                          <tr>
                            <td>
                              <Styled.CampaignExpandToggle
                                type='button'
                                expanded={isExpanded}
                                aria-expanded={isExpanded}
                                aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${campaign}`}
                                onClick={() =>
                                  setExpandedSummaryCampaigns(current => ({
                                    ...current,
                                    [expandKey]: !isExpanded,
                                  }))
                                }
                              >
                                <Icon name='caretDown' width={12} height={12} color={colors.cloud_70} />
                                {campaign}
                              </Styled.CampaignExpandToggle>
                            </td>
                            <td>
                              <Styled.LevelTag>{campaignNoun}</Styled.LevelTag>
                            </td>
                            <td>
                              <Styled.CurrentStatusChip $tone={currentMeta.tone}>
                                {currentMeta.label}
                              </Styled.CurrentStatusChip>
                            </td>
                            <td>
                              <Styled.StatusChip $tone={meta.tone}>{meta.label}</Styled.StatusChip>
                            </td>
                          </tr>
                          {isExpanded
                            ? adGroups.map(adGroup => (
                                <Styled.AdGroupRow key={adGroup}>
                                  <td>{adGroup}</td>
                                  <td>
                                    <Styled.LevelTag $nested>{adGroupNoun}</Styled.LevelTag>
                                  </td>
                                  <td>
                                    <Styled.CurrentStatusChip $tone={currentMeta.tone}>
                                      {currentMeta.label}
                                    </Styled.CurrentStatusChip>
                                  </td>
                                  <td>
                                    <Styled.StatusChip $tone={meta.tone}>{meta.label}</Styled.StatusChip>
                                  </td>
                                </Styled.AdGroupRow>
                              ))
                            : null}
                        </React.Fragment>
                      )
                    })}
                  </tbody>
                </Styled.DataTable>
              </Styled.TableWrap>
            </Styled.SummaryPlatformCard>
          )
        })}
      </>
    )
  }

  const renderStep = () => {
    switch (currentStep.id) {
      case 'basic':
        return renderBasicInfo()
      case 'channels':
        return renderChannels()
      case 'budget':
        return renderBudget()
      case 'targeting':
        return renderTargeting()
      case 'keywords':
        return renderKeywords()
      case 'creatives':
        return renderCreatives()
      default:
        return renderSummary()
    }
  }

  const perPlatformList = currentStep.id === 'keywords' ? activePlatforms.filter(usesKeywords) : activePlatforms

  return (
    <Styled.Canvas data-testid='campaign-creation-canvas' data-campaign-canvas='true'>
      <Styled.CanvasInner>
        <Styled.CanvasHeader>
          <Styled.CanvasTitle>
            <Icon name='sparkles' width={18} height={18} color={colors.violet_60} />
            {aiWorkspaceTitle}
          </Styled.CanvasTitle>
          <Styled.CanvasHeaderActions>
            <IconButton
              iconName='xmark'
              color='currentColor'
              width={14}
              height={14}
              title='Close campaign canvas'
              onClick={closeCampaignWorkspace}
            />
          </Styled.CanvasHeaderActions>
        </Styled.CanvasHeader>

        {aiWorkspaceLoading ? (
          <Styled.LoadingState role='status'>
            <Spinner />
            Preparing your workspace…
          </Styled.LoadingState>
        ) : (
          <>
            {!isClosedWonIntroStep ? (
              <Styled.StepperWrap>
                <Stepper
                  id='campaign-creation-stepper'
                  current={visibleStepperIndex}
                  onChange={(index: number) => goToStep(isClosedWonPlatformView ? index + 2 : index)}
                  items={visibleStepperSteps.map((step, index) => ({
                    title: step.label,
                    status: index < visibleStepperIndex ? 'finish' : index === visibleStepperIndex ? 'process' : 'wait',
                  }))}
                />
              </Styled.StepperWrap>
            ) : null}

            <Styled.FormCard>
              {currentStep.perPlatform ? (
                <>
                  <Styled.SectionTitle>{currentStep.label}</Styled.SectionTitle>
                  {isClosedWonPlatformView ? (
                    <Styled.Toolbar>
                      <div>
                        <FieldLabel htmlFor='campaign-canvas-campaign-split-sel' text='Campaign / split' />
                        <Styled.SplitWithStatus>
                          <Select<string>
                            id='campaign-canvas-campaign-split-sel'
                            value={selectedCampaignScope?.key ?? ALL_CAMPAIGNS}
                            options={[
                              { label: 'All campaigns', value: ALL_CAMPAIGNS },
                              ...campaignSplitScopes.map(scope => ({ label: scope.label, value: scope.key })),
                            ]}
                            onChange={(scopeKey: string) =>
                              setSelectedCampaignScopeKey(scopeKey === ALL_CAMPAIGNS ? null : scopeKey)
                            }
                          />
                          {activePlatform && selectedCampaignScope
                            ? (() => {
                                // Only show the status chip for a specific campaign scope. In the
                                // "All campaigns" view the chip is hidden (the aggregate status is
                                // already shown per-campaign in the Current column of the summary).
                                const currentStatus = platformCurrentStatusFor(
                                  activePlatform.id,
                                  selectedCampaignScope.tactic ?? null,
                                  data,
                                  selectedMediaPlanYear,
                                )
                                const meta = CAMPAIGN_CURRENT_STATUS_META[currentStatus]
                                return (
                                  <Styled.CurrentStatusChip $tone={meta.tone} title='Current status of this campaign'>
                                    {meta.label}
                                  </Styled.CurrentStatusChip>
                                )
                              })()
                            : null}
                        </Styled.SplitWithStatus>
                      </div>
                    </Styled.Toolbar>
                  ) : (
                    renderPlatformToolbar(perPlatformList)
                  )}
                </>
              ) : null}
              {renderStep()}
              <Styled.Footer>
                <Styled.FooterGroup>
                  {stepIndex > (isClosedWonPlatformView ? 2 : 0) ? (
                    <Button size='small' variant='outlined' onClick={() => goToStep(stepIndex - 1)}>
                      Back
                    </Button>
                  ) : null}
                </Styled.FooterGroup>
                <Styled.FooterGroup>
                  {isLastStep ? (
                    <>
                      {isClosedWonPlatformSetup ? (
                        <Button size='small' onClick={handleLaunch}>
                          {`Create campaigns for ${activePlatforms[0]?.name ?? 'platform'}`}
                        </Button>
                      ) : (
                        <>
                          <Button size='small' variant='outlined' onClick={handleSaveDraft}>
                            Save draft
                          </Button>
                          <Button size='small' disabled={!basicInfoValid} onClick={handleLaunch}>
                            Launch campaign
                          </Button>
                        </>
                      )}
                    </>
                  ) : isClosedWonIntroStep ? (
                    <Button
                      size='small'
                      disabled={currentStep.id === 'basic' && !basicInfoValid}
                      onClick={handleNextStep}
                    >
                      OK
                    </Button>
                  ) : (
                    <Button
                      size='small'
                      disabled={currentStep.id === 'basic' && !basicInfoValid}
                      onClick={handleNextStep}
                    >
                      Next
                    </Button>
                  )}
                </Styled.FooterGroup>
              </Styled.Footer>
            </Styled.FormCard>
          </>
        )}
      </Styled.CanvasInner>
    </Styled.Canvas>
  )
}

export default CampaignCreationCanvas
