import { DEFAULT_CURRENCY, DEFAULT_REGION } from './budgetDistributionConfig/budgetDistributionConfig'
import { formatCurrencyWithSuffixSymbol, formatCurrencyWithoutSymbol, formatNumber, getCurrencySymbol } from '../utils/number'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router'
import { MediaplannerWrapper, SaveVersionInline } from '../Mediaplanner/Mediaplanner.styled'
import { PlanTitleHeader } from '../Mediaplanner/PlanTitleHeader'
import { resolveHeaderStatus } from '../Mediaplanner/mediaplanUtils'
import { PlanVersionsDrawer } from '../Mediaplanner/PlanVersionsDrawer'
import { usePlanVersions, savePlanVersion, type PlanVersionSnapshot } from '../Mediaplanner/planVersionStore'
import * as Styled from './BudgetDistribution.styled'
import { useAuth } from '@mediahub/mediahub-ui/context/AuthContext'
import {
  Accordion,
  Breadcrumb,
  Button,
  Container,
  Form,
  Grid,
  colors,
  Input,
  StickyFooter,
  Spinner,
  Table,
  Text,
  Stepper,
  Tab,
  Icon,
} from '@amadeus/react-design-factory'
import type { ColumnsType } from '@amadeus/react-design-factory/components/Table'
import { SpendBudgetDistribution } from './SpendBudgetDistribution'
import type {
  DigitalRow,
  MetasearchRow,
  MediaTab,
  PastConsumptionAccordionProps,
  DebouncedInputNumberProps,
} from './BudgetDistribution.d'
import {
  initialBudgetDistributionState,
  initialTabs,
  monthLabelToISO,
  normalizeMonthKey,
  buildPeriodFromRange,
  sameDistribution,
  buildInitialTabsFromSchema,
  buildAllocationsFromTabs,
  buildTabsFromBdResponse,
  buildTreeRows,
  getAllTabTables,
  recalculateTabs,
  useTabTableCache,
} from './helpers'
import type { BudgetDistributionState } from './helpers'
import {
  useUpdateMediaPlanBdMutation,
  useGetMediaPlanBdQuery,
  useGetSpendBudgetRecommendationQuery,
} from './BudgetDistribution.queries'
import { useNotification } from '@amadeus/react-design-factory/utils/notification'
import { evaluateFields, evaluateGlobalFields, evaluateTotalMarginAmount, getSchemaForChannel, resolvePlatformCostCPM } from './budgetDistributionConfig/helpers'
import type { FormulaContext, CalculationMode, GlobalCalcResults, Currency, Region } from './budgetDistributionConfig/budgetDistributionConfig.d'
import { useGetLastDistributionLazyQuery } from '../Mediaplanner/Mediaplanner.queries'
import { StatusEnum } from '@mediahub/mediaplanner-ui/graphql/generated/mediaplanner-enums'
import { MediaSettingsDrawer } from './MediaSettingsDrawer'
import { BudgetSummaryCards } from './BudgetSummaryCards'
import { DebouncedInputNumber } from './DebouncedInputNumber'
import PowerBIReport from '@mediahub/mediahub-ui/components/PowerBI/PowerBIReport'
import { useGetAdvertisersQuery } from '@mediahub/advertisers-ui/pages/Advertisers/Advertisers.queries'
import { useBudgetModel, getBudgetModel, getCompletedBudgetGroupKeys, setCompletedBudgetGroupKeys, getBudgetGroupSpendStats, setBudgetGroupSpendStats, getPlanScenarioId, type SharedBudgetModel } from '../MediaplannerProductSettings/mediaPlanBudgetStore'
import { getMockSalesforcePlan, getSalesforceScenario, MOCK_SF_PLAN_ONE, type SalesforceScenarioId } from '../MediaplannerProductSettings/mockSalesforcePlans'

// Activity code -> display label for the Step 3 budget-groups vertical nav.
const ACTIVITY_LABEL: Record<string, string> = {
  REGULAR_CAMPAIGN: 'Rooms',
  ROOMS: 'Rooms',
  FOOD_AND_BEVERAGE: 'F&B',
  MICE: 'MICE',
  SPA: 'Spa',
  WEDDING: 'Wedding',
  OTHERS: 'Others',
}

const staticPastTreeRows = buildTreeRows(initialTabs)
const LAST_DISTRIBUTION_ERROR_MESSAGE = 'failed to get last closed won distribution'
const SPEND_BUDGET_RECOMMENDATION_ERROR_MESSAGE = 'failed to get spend budget recommendation'

const monthLabelToApiFormat = (label: string): string => {
  const [mon, year] = label.split(' ')
  return mon && year ? `01-${mon}-${year}` : label
}

// Activity -> outline/text color (saturated enough for an outlined chip).
const ACTIVITY_TAG_COLOR: Record<string, string> = {
  REGULAR_CAMPAIGN: '#5B6BD6',
  FOOD_AND_BEVERAGE: '#9B51C4',
  ROOMS: '#5B6BD6',
  MICE: '#3B7DD8',
  SPA: '#C64B8C',
  WEDDING: '#C08A2E',
  OTHERS: '#666666',
}
const activityTagColor = (activity: string): string => ACTIVITY_TAG_COLOR[activity] ?? '#666666'

const PastConsumptionAccordion: FC<PastConsumptionAccordionProps> = ({
  showPowerBI,
  currency,
  onAccordionChange,
  mediaPlanReportFilter,
}) => {
  return (
    <Styled.AccordionWrapper
      onChange={(activeKeys) => {
        const keys = Array.isArray(activeKeys)
          ? activeKeys.map(key => String(key))
          : activeKeys
            ? [String(activeKeys)]
            : []
        onAccordionChange(keys)
      }}
        id='media_plan_budget_distribution-past_consumption-accordion'
        items={[
          {
            key: 'past-consumption',
            header: `Past Consumption Data in ${getCurrencySymbol(currency)}`,
            content: (
              <Styled.AccordionTableWrapper>
                {showPowerBI && (
                  <Styled.PowerBISection>
                    <PowerBIReport mediaPlanFilter={mediaPlanReportFilter} />
                  </Styled.PowerBISection>
                )}
              </Styled.AccordionTableWrapper>
            ),
          },
        ]}/>
  )
}

const DigitalTabTable: FC<{
  columns: ColumnsType<DigitalRow>
  dataSource: DigitalRow[]
}> = React.memo(({ columns, dataSource }) => (
  <Table
    id='media_plan_budget_distribution-digital-tbl'
    cellsIdPrefix='media_plan_budget_distribution-digital'
    noBorders
    columns={columns}
    dataSource={dataSource}
    pagination={false}
  />
))

const MetasearchTabTable: FC<{
  columns: ColumnsType<MetasearchRow>
  dataSource: MetasearchRow[]
}> = React.memo(({ columns, dataSource }) => (
  <Table
    id='media_plan_budget_distribution-metasearch-tbl'
    cellsIdPrefix='media_plan_budget_distribution-metasearch'
    noBorders
    columns={columns}
    dataSource={dataSource}
    pagination={false}
  />
))

const BudgetDistribution: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isNewPlan = Boolean((location.state as { isNewPlan?: boolean } | null)?.isNewPlan)
  const { planId } = useParams<{ planId: string }>()
  // Resolve the SAME plan Step 2 used: a real seeded SF plan wins; otherwise, if the planner picked
  // a scenario in Step 2 (persisted in the store), use that scenario's plan so product ids — and
  // therefore the store keys — match. With no persisted scenario, fall back to MOCK_SF_PLAN_ONE as
  // before. Without this, Step 3 missed Step 2's edits (added categories/properties).
  const persistedScenarioId = getPlanScenarioId(planId) as SalesforceScenarioId | undefined
  const plan =
    getMockSalesforcePlan(planId) ??
    (persistedScenarioId ? getSalesforceScenario(persistedScenarioId).plan : MOCK_SF_PLAN_ONE)
  const [activeProductId, setActiveProductId] = useState(plan.products[0]?.id)
  const storedBudgetModel = useBudgetModel(planId, activeProductId)
  const { data: advertiserData } = useGetAdvertisersQuery()
  const [activeGroupKey, setActiveGroupKey] = useState<string>()
  const notification = useNotification()
  const { isAdmin, isStandard } = useAuth()
  const isReadOnly = !(isAdmin || isStandard)
  const isDetailsView = Boolean(planId)
  const [form] = Form.useForm()
  const [tabs, setTabs] = useState<MediaTab[]>(initialTabs)
  const [activeTabId, setActiveTabId] = useState(initialTabs[0].id)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [settingsDraftTabs, setSettingsDraftTabs] = useState<MediaTab[]>(tabs)
  const [mediaPlanBd, setMediaPlanBd] = useState<BudgetDistributionState>(initialBudgetDistributionState)
  const [completedGroupKeys, setCompletedGroupKeys] = useState<Set<string>>(() => getCompletedBudgetGroupKeys(planId, activeProductId))
  const [isCompletedSectionOpen, setIsCompletedSectionOpen] = useState(false)
  const [groupSpendStats, setGroupSpendStats] = useState<Map<string, { spendBudget: number; spendPct: number }>>(() => getBudgetGroupSpendStats(planId, activeProductId))

  // Per-group isolation: each budget group (vertical-nav selection) keeps its own
  // independent { tabs, mediaPlanBd } snapshot. We swap these in/out when
  // activeGroupKey changes so editing one group never affects another.
  const perGroupStateRef = React.useRef<Record<string, { tabs: MediaTab[]; mediaPlanBd: BudgetDistributionState }>>({})
  const prevGroupKeyRef = React.useRef<string | undefined>(undefined)
  // Track the group(s) that have already been seeded from backend/defaults so the
  // backend-restore effect does not clobber per-group edits on every render.
  const hydratedGroupsRef = React.useRef<Set<string>>(new Set())
  // Refs mirroring the latest tabs / mediaPlanBd so the group-swap effect can save
  // the current values without a stale closure and without depending on them.
  const tabsRef = React.useRef(tabs)
  const mediaPlanBdRef = React.useRef(mediaPlanBd)
  tabsRef.current = tabs
  mediaPlanBdRef.current = mediaPlanBd

  // --- Plan versioning (prototype) -------------------------------------------------------------
  const [isVersionsOpen, setIsVersionsOpen] = useState(false)
  const [isSavingVersion, setIsSavingVersion] = useState(false)
  const [versionName, setVersionName] = useState('')
  const { versions } = usePlanVersions(planId)

  // Step 3 contributes its allocation slice: the current group's channel/tactic tabs + monthly
  // distribution, plus which product/group is active. (In-memory snapshot.)
  const captureSnapshot = useCallback(
    (): PlanVersionSnapshot => ({
      budgetDistribution: {
        activeProductId,
        activeGroupKey,
        tabs: tabsRef.current,
        mediaPlanBd: mediaPlanBdRef.current,
      },
    }),
    [activeProductId, activeGroupKey],
  )

  const handleViewVersion = useCallback((snapshot: PlanVersionSnapshot) => {
    const bd = snapshot.budgetDistribution as
      | { activeProductId?: string; activeGroupKey?: string; tabs?: MediaTab[]; mediaPlanBd?: BudgetDistributionState }
      | undefined
    if (!bd) return
    if (bd.activeProductId) setActiveProductId(bd.activeProductId)
    if (bd.activeGroupKey) setActiveGroupKey(bd.activeGroupKey)
    if (bd.tabs) setTabs(bd.tabs)
    if (bd.mediaPlanBd) setMediaPlanBd(bd.mediaPlanBd)
  }, [])

  const confirmSaveAsVersion = () => {
    savePlanVersion(planId, versionName.trim() || 'Untitled version', captureSnapshot())
    setIsSavingVersion(false)
    setVersionName('')
  }

  const [updateMediaPlanBd, { loading: submitting }] = useUpdateMediaPlanBdMutation()
  const [loadLastDistribution] = useGetLastDistributionLazyQuery()
  const [lastDistributionTabs, setLastDistributionTabs] = useState<MediaTab[] | null>(null)
  const [lastDistributionMonthly, setLastDistributionMonthly] = useState<MediaplannerQL.MonthlyDistribution[]>([])
  const [lastDistributionErrorMessage, setLastDistributionErrorMessage] = useState<string | null>(null)
  const [showPowerBI, setShowPowerBI] = useState(false)

  // Prefill from backend
  const { data: bdData, loading: bdLoading, refetch } = useGetMediaPlanBdQuery(planId)

  // Derive General Settings values from the BD query response
  const gs = bdData?.GetMediaPlan?.generalSettings
  const savedStatus = gs?.planInformation?.status
  const isStatusLocked = isDetailsView && [StatusEnum.ClosedWon, StatusEnum.ClosedLost, StatusEnum.Archived].includes(savedStatus as StatusEnum)
  const isFormReadOnly = isReadOnly || isStatusLocked

  const InputComponent = useMemo(() => {
    if (!isFormReadOnly) return DebouncedInputNumber
    const Disabled = (props: DebouncedInputNumberProps) =>
      React.createElement(DebouncedInputNumber, { ...props, disabled: true })
    return Disabled
  }, [isFormReadOnly])
  const prefillEnabled = Boolean(gs?.advertiserInformation?.prefillEnabled)
  const contractBudgetTarget = Number(gs?.planInformation?.contractBudgetTarget ?? 0)
  const contractMarginExpectedPct = Number(gs?.planInformation?.contractProfitTarget ?? 0)
  const contractBudget = contractBudgetTarget
  const showExpectedColumns = contractBudgetTarget > 0 && contractMarginExpectedPct > 0
  const managementFeePct = Number(gs?.priceSettings?.managementFeePct ?? 0) / 100
  const setupFee = Number(gs?.priceSettings?.setupFee ?? 0)
  const metasearchConnectivityFee = Number(gs?.priceSettings?.metasearchConnectivityFee ?? 0)
  const metasearchSetupFee = Number(gs?.priceSettings?.metasearchSetupFee ?? 0)
  const creativeFee = Number(gs?.priceSettings?.creativeFee ?? 0)
  const videoCreativeFee = Number(gs?.priceSettings?.videoCreativeFee ?? 0)
  const sumFees = setupFee + metasearchConnectivityFee + metasearchSetupFee + creativeFee + videoCreativeFee
  const region = (gs?.advertiserInformation?.region ?? DEFAULT_REGION) as Region
  const currency = (gs?.advertiserInformation?.currency ?? DEFAULT_CURRENCY) as Currency
  const currencySymbol = getCurrencySymbol(currency)
  const distributionPeriod = useMemo(
    () => buildPeriodFromRange(gs?.planInformation?.startDate, gs?.planInformation?.endDate),
    [gs?.planInformation?.startDate, gs?.planInformation?.endDate],
  )
  const hasValidDistributionPeriod = distributionPeriod.length > 0
  const mediaPlanReportFilter = useMemo<SharedQL.MediaPlanReportFilter | undefined>(() => {
    const advertiserId = Number(gs?.advertiserInformation?.advertiserId ?? 0)
    if (!advertiserId) return undefined

    return {
      advertiserId,
      startDate: gs?.planInformation?.startDate ?? undefined,
      endDate: gs?.planInformation?.endDate ?? undefined,
      currency: gs?.advertiserInformation?.currency ?? undefined,
    }
  }, [
    gs?.advertiserInformation?.advertiserId,
    gs?.advertiserInformation?.currency,
    gs?.planInformation?.startDate,
    gs?.planInformation?.endDate,
  ])

  const { treeRows, channelSpends, channelTotal } = useMemo(() => {
    const rows = buildTreeRows(tabs)
    const spends = rows.map(r => ({ key: r.key, channel: r.label, spend: Number(r.rowTotal ?? 0) }))
    const total = spends.reduce((s, r) => s + Number(r.spend ?? 0), 0)
    return { treeRows: rows, channelSpends: spends, channelTotal: total }
  }, [tabs])

  const globalStats: GlobalCalcResults = useMemo(() => {
    const totalMarginValue = tabs
      .flatMap(t =>
        t.type === 'metasearch'
          ? []
          : t.platforms.flatMap(p => p.tactics.filter(tc => tc.enabled).map(tc => tc.values.marginValue ?? 0)),
      )
      .reduce((s, v) => s + v, 0)
    return evaluateGlobalFields({
      totalSpend: channelTotal,
      totalMarginValue,
      contractBudget,
      sumFees,
      managementFeePct,
      contractMarginExpectedPct,
    })
  }, [tabs, channelTotal, contractBudget, sumFees, managementFeePct])

  const recommendationInput = useMemo(() => {
    const advertiserId = gs?.advertiserInformation?.advertiserId
    const advertiserBpid = gs?.advertiserInformation?.advertiserBpid
    const startDate = gs?.planInformation?.startDate
    const endDate = gs?.planInformation?.endDate

    if (!advertiserId || !advertiserBpid || !startDate || !endDate) {
      return undefined
    }

    return {
      advertiserId,
      advertiserBpid,
      startDate,
      endDate,
      totalBudget: 10000,
    }
  }, [
    gs?.advertiserInformation?.advertiserBpid,
    gs?.advertiserInformation?.advertiserId,
    gs?.planInformation?.endDate,
    gs?.planInformation?.startDate,
  ])

  const { data: recommendationData, error: recommendationError } = useGetSpendBudgetRecommendationQuery(recommendationInput)
  const [stableRecommendationMap, setStableRecommendationMap] = useState<Map<string, number>>(new Map())
  useEffect(() => {
    if (!recommendationData) return
    const items = recommendationData.GetSpendBudgetRecommendation?.items ?? []
    setStableRecommendationMap(
      new Map(
        items.map(item => [
          normalizeMonthKey(String(item.startDate ?? '')),
          Number(((item.budget ?? 0) / 100).toFixed(2)),
        ]),
      ),
    )
  }, [recommendationData])
  const recommendationStatus = recommendationData?.GetSpendBudgetRecommendation?.status
  const recommendationStatusFailed = !!recommendationStatus && recommendationStatus !== 'SUCCESS' && recommendationStatus !== 'OK'

  const backendSavedSpendDistribution = bdData?.GetMediaPlan?.budgetDistribution?.spendBudgetDistribution ?? []

  const recommendationMap = stableRecommendationMap

  const savedDistributionMap = useMemo(
    () =>
      new Map(
        backendSavedSpendDistribution.map(item => [normalizeMonthKey(item.month), Number(item.spendPct ?? 0)]),
      ),
    [backendSavedSpendDistribution],
  )

  const isSavedDistributionPeriodOutOfSync = useMemo(() => {
    if (!isDetailsView || !backendSavedSpendDistribution.length || !distributionPeriod.length) return false

    const expectedKeys = new Set(distributionPeriod.map(monthLabelToISO))
    const savedKeys = new Set(
      backendSavedSpendDistribution
        .map(item => normalizeMonthKey(String(item.month ?? '')))
        .filter(Boolean),
    )

    if (expectedKeys.size !== savedKeys.size) return true
    for (const key of expectedKeys) {
      if (!savedKeys.has(key)) return true
    }
    return false
  }, [isDetailsView, backendSavedSpendDistribution, distributionPeriod])
  const canNavigateToMediaPlanStep = isDetailsView && backendSavedSpendDistribution.length > 0 && !isSavedDistributionPeriodOutOfSync

  const spendDistributionInitialPercentages = useMemo(() => {
    // Use recommendation only when backend has no saved distribution
    // or the saved period doesn't match the current plan period.
    // Once user edits and saves, backendSavedSpendDistribution will be populated and
    // recommendation will no longer override. Within a session, initialPercentages
    // stabilizes after recommendation loads, so user edits in local state are preserved.
    const useRecommendation =
      backendSavedSpendDistribution.length === 0 || isSavedDistributionPeriodOutOfSync

    return distributionPeriod.map(label => {
      const monthKey = monthLabelToISO(label)

      if (!useRecommendation && savedDistributionMap.has(monthKey)) {
        return savedDistributionMap.get(monthKey) ?? 0
      }

      if (recommendationMap.has(monthKey)) return recommendationMap.get(monthKey) ?? 0
      return 0
    })
  }, [
    distributionPeriod,
    backendSavedSpendDistribution.length,
    isSavedDistributionPeriodOutOfSync,
    savedDistributionMap,
    recommendationMap,
  ])

  const handleDistributionChange = useCallback((distribution: { month: string; spendPct: number }[]) => {
    setMediaPlanBd(prev =>
      sameDistribution(prev.spendBudgetDistribution, distribution)
        ? prev
        : { ...prev, spendBudgetDistribution: distribution },
    )
  }, [])

  useEffect(() => {
    if (!prefillEnabled) {
      setLastDistributionTabs(null)
      setLastDistributionMonthly([])
      setLastDistributionErrorMessage(null)
      return
    }

    const advertiserId = bdData?.GetMediaPlan?.generalSettings?.advertiserInformation?.advertiserId
    if (!advertiserId) return

    let isCancelled = false

    const load = async () => {
      try {
        setLastDistributionErrorMessage(null)
        const { data, errors } = await loadLastDistribution({
          variables: { advertiserId },
        })

        if (isCancelled) return
        if (errors?.length) {
          setLastDistributionTabs(null)
          setLastDistributionMonthly([])
          setLastDistributionErrorMessage(LAST_DISTRIBUTION_ERROR_MESSAGE)
          return
        }

        const allocations = data?.GetLastDistribution?.channelAllocations
        const monthlyDistributions = data?.GetLastDistribution?.monthlyDistributions ?? []

        setLastDistributionMonthly(monthlyDistributions as MediaplannerQL.MonthlyDistribution[])

        if (!allocations?.length) {
          setLastDistributionTabs(null)
          return
        }

        setLastDistributionTabs(buildTabsFromBdResponse(allocations as unknown as MediaplannerQL.MediaAllocation[]))
      } catch {
        if (!isCancelled) {
          setLastDistributionTabs(null)
          setLastDistributionMonthly([])
          setLastDistributionErrorMessage(LAST_DISTRIBUTION_ERROR_MESSAGE)
        }
      }
    }

    load()

    return () => {
      isCancelled = true
    }
  }, [prefillEnabled, bdData?.GetMediaPlan?.generalSettings?.advertiserInformation?.advertiserId, loadLastDistribution])

  useEffect(() => {
    const bd = bdData?.GetMediaPlan?.budgetDistribution
    if (!bd) return

    // Per-group guard: once a group has been seeded from backend/defaults, do not
    // re-seed it on subsequent renders — that would clobber the group's per-group
    // edits. The group-swap effect is responsible for restoring the saved snapshot.
    if (activeGroupKey !== undefined && hydratedGroupsRef.current.has(activeGroupKey)) return

    // Restore tabs spend/fees from saved allocations
    if (bd.allocations?.length) {
      const restoredTabsRaw = buildTabsFromBdResponse(bd.allocations as MediaplannerQL.MediaAllocation[], currency)
      const restoredTabs = recalculateTabs(
        restoredTabsRaw,
        contractBudget,
        sumFees,
        managementFeePct,
        currency,
        region,
      )
      setTabs(restoredTabs)
      setSettingsDraftTabs(restoredTabs)
    } else {
      const defaultTabs = buildInitialTabsFromSchema(currency)
      setTabs(defaultTabs)
      setSettingsDraftTabs(defaultTabs)
    }

    // Restore spend budget distribution
    if (bd.spendBudgetDistribution?.length) {
      const restoredDistribution = bd.spendBudgetDistribution.map(d => ({
        month: d.month,
        spendPct: d.spendPct,
      }))

      setMediaPlanBd(prev => ({
        ...prev,
        spendBudgetDistribution: restoredDistribution,
      }))
    }

    // Mark this group as hydrated so we don't re-seed it and overwrite edits.
    if (activeGroupKey !== undefined) hydratedGroupsRef.current.add(activeGroupKey)
  }, [bdData, currency, lastDistributionTabs, lastDistributionMonthly, contractBudget, sumFees, managementFeePct, region, activeGroupKey])

  // Per-group state swap: when the active budget group changes, save the current
  // group's { tabs, mediaPlanBd } snapshot and load (or freshly seed) the new one.
  // Depends ONLY on activeGroupKey to avoid a save/load loop; current values are
  // read via refs to avoid stale closures.
  useEffect(() => {
    const prevKey = prevGroupKeyRef.current

    // Save the outgoing group's latest state (skip on initial mount / same key).
    if (prevKey !== undefined && prevKey !== activeGroupKey) {
      perGroupStateRef.current[prevKey] = {
        tabs: tabsRef.current,
        mediaPlanBd: mediaPlanBdRef.current,
      }
    }

    if (activeGroupKey !== undefined) {
      const snapshot = perGroupStateRef.current[activeGroupKey]
      if (snapshot) {
        // Restore the previously-edited state for this group.
        setTabs(snapshot.tabs)
        setMediaPlanBd(snapshot.mediaPlanBd)
      } else {
        // First visit to this group: seed from a DEEP COPY of the current state so the
        // group starts identical to what's already shown (it stays the same) and only
        // diverges once the user edits it — it must NOT reset to blank defaults.
        const seededTabs: MediaTab[] = JSON.parse(JSON.stringify(tabsRef.current))
        const seededBd: BudgetDistributionState = JSON.parse(JSON.stringify(mediaPlanBdRef.current))
        // No setState needed — the current tabs/mediaPlanBd already display this state;
        // we only persist an independent copy so future edits don't leak across groups.
        perGroupStateRef.current[activeGroupKey] = {
          tabs: seededTabs,
          mediaPlanBd: seededBd,
        }
      }
    }

    prevGroupKeyRef.current = activeGroupKey
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeGroupKey])

  const handleSubmit = async () => {
    if (isFormReadOnly) return
    if (!planId) return
    const seasonalityValues = form.getFieldValue('seasonality') as Array<string | number | undefined> | undefined
    const spendBudgetDistribution = distributionPeriod
      .map((monthLabel, index) => {
        const rawValue = seasonalityValues?.[index]
        const numericValue = Number(rawValue)
        if (!Number.isFinite(numericValue)) return null

        return {
          month: monthLabelToApiFormat(monthLabel),
          spendPct: Number(numericValue.toFixed(2)),
        }
      })
      .filter(Boolean) as MediaplannerQL.SpendBudgetDistributionInput[]

    if (spendBudgetDistribution.length > 0) {
      const totalSpendPct = spendBudgetDistribution.reduce((sum, d) => sum + d.spendPct, 0)
      if (Math.abs(totalSpendPct - 100) > 0.01) {
        notification.error(
          `The total spend distribution must add up to 100%. Current total is ${parseFloat(totalSpendPct.toFixed(2))}%. Please adjust the monthly percentages before saving.`,
        )
        return
      }
    }

    const { data: updateData } = await updateMediaPlanBd({
      variables: {
        mediaPlanId: planId,
        allocations,
        spendBudgetDistribution,
        spendBudget: globalStats.spendBudget,
        contractMarginAmt: globalStats.contractMarginAmt,
        contractMarginPct: globalStats.contractMarginPct,
        actualMarginPct: globalStats.actualMarginPct,
      },
    })

    const updateResult = updateData?.updateMediaPlanBd
    if (!updateResult?.success) {
      notification.error(updateResult?.message || 'An unexpected error occurred. Please try again.')
      return
    }

    notification.success(updateResult.message || 'Media plan updated successfully.')

    // Refetch latest data from backend and update local state before navigating
    const { data: newData } = await refetch()
    const bd = newData?.GetMediaPlan?.budgetDistribution
    if (bd?.allocations?.length) {
      const restoredTabsRaw = buildTabsFromBdResponse(bd.allocations as MediaplannerQL.MediaAllocation[], currency)
      const restoredTabs = recalculateTabs(
        restoredTabsRaw,
        contractBudget,
        sumFees,
        managementFeePct,
        currency,
        region,
      )
      setTabs(restoredTabs)
      setSettingsDraftTabs(restoredTabs)
    }
    if (bd?.spendBudgetDistribution?.length) {
      setMediaPlanBd(prev => ({
        ...prev,
        spendBudgetDistribution: bd.spendBudgetDistribution.map(d => ({
          month: d.month,
          spendPct: d.spendPct,
        })),
      }))
    }

    const nextCompletedGroupKeys = new Set(completedGroupKeys)
    if (activeGroupKey) nextCompletedGroupKeys.add(activeGroupKey)
    const nextGroupKey = getNextIncompleteGroupKey(activeGroupKey, nextCompletedGroupKeys)

    if (activeGroupKey) setCompletedGroupKeys(nextCompletedGroupKeys)
    if (activeGroupKey) setCompletedBudgetGroupKeys(planId, activeProductId, nextCompletedGroupKeys)
    if (nextGroupKey) {
      setActiveGroupKey(nextGroupKey)
      return
    }

    navigate(`/mediaplanner/download-summary/${planId ?? ''}`, { state: { isNewPlan, managementFeeAmt: managementFeePct * globalStats.spendBudget } })
  }

  const handleSubmitFailed = (errorInfo: any) => {
    const toLabel = (value: string) =>
      ({
        'paid-search': 'Paidsearch',
        'metasearch': 'Metasearch',
      }[value] ??
      value
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/[-_]/g, ' ')
        .replace(/^./, c => c.toUpperCase()))

    const toFieldSource = (namePath: unknown): string => {
      if (!Array.isArray(namePath) || namePath.length === 0) return 'Field'

      if (namePath[0] === 'seasonality') {
        const index = Number(namePath[1])
        const month = Number.isInteger(index) && distributionPeriod[index] ? distributionPeriod[index] : `#${index + 1}`
        return `Seasonality (${month})`
      }

      if (namePath[0] === 'budgetDistribution') {
        const rawField = String(namePath[namePath.length - 1] ?? 'field')
        const fieldLabelMap: Record<string, string> = {
          spend: 'Spend',
          cpm: 'CPM',
          marginPct: 'Margin (%)',
        }
        const fieldLabel = fieldLabelMap[rawField] ?? toLabel(rawField)

        if (namePath[1] === 'metasearch') return `Metasearch ${fieldLabel}`

        const channel = namePath[1] ? toLabel(String(namePath[1])) : 'Channel'
        return `${channel} ${fieldLabel}`
      }

      return toLabel(String(namePath[namePath.length - 1] ?? 'field'))
    }

    const toSection = (namePath: unknown): 'Budget Distribution' | 'Spend Budget Distribution' | 'Other' => {
      if (!Array.isArray(namePath) || namePath.length === 0) return 'Other'
      if (namePath[0] === 'seasonality') return 'Spend Budget Distribution'
      if (namePath[0] === 'budgetDistribution') return 'Budget Distribution'
      return 'Other'
    }

    const groupedErrors = (errorInfo?.errorFields ?? []).reduce(
      (acc: Record<string, Record<string, string[]>>, field: any) => {
        const section = toSection(field?.name)
        const source = toFieldSource(field?.name)
        const errors = (field?.errors ?? []).filter(Boolean)
        if (!source || errors.length === 0) return acc

        if (!acc[section]) acc[section] = {}
        if (!acc[section][source]) acc[section][source] = []
        errors.forEach((error: string) => {
          if (!acc[section][source].includes(error)) acc[section][source].push(error)
        })

        return acc
      },
      {},
    )

    const sectionOrder: Array<'Budget Distribution' | 'Spend Budget Distribution' | 'Other'> = [
      'Budget Distribution',
      'Spend Budget Distribution',
      'Other',
    ]
    const sections = sectionOrder.filter(section => Object.keys(groupedErrors[section] ?? {}).length > 0)

    if (sections.length === 0) {
      notification.error('Please fix the validation errors before saving.')
      return
    }

    notification.error('Please fix the validation errors before saving.', {
      description: (
        <div>
          {sections.map(section => {
            const sources = Object.keys(groupedErrors[section] ?? {})
            return (
              <div key={section} style={{ marginBottom: 10 }}>
                <Text.Body>
                  <strong>{section}</strong>
                </Text.Body>
                {sources.map(source => {
                  const errors = groupedErrors[section][source] as string[]
                  return (
                    <div key={`${section}-${source}`} style={{ marginTop: 4 }}>
                      <Text.Body>{source}</Text.Body>
                      <ul style={{ margin: '2px 0 0 16px', padding: 0 }}>
                        {errors.map((error: string) => (
                          <li key={`${section}-${source}-${error}`}>
                            <Text.Body>{error}</Text.Body>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      ),
    })
  }

  const openSettings = () => {
    setSettingsDraftTabs(tabs)
    setIsSettingsOpen(true)
  }

  const saveSettings = () => {
    const recalculatedTabs = recalculateTabs(
      settingsDraftTabs,
      contractBudget,
      sumFees,
      managementFeePct,
      currency,
      region,
    )
    setTabs(recalculatedTabs)
    setIsSettingsOpen(false)
  }

  const pastConsumptionTreeRows = useMemo(
    () => (lastDistributionTabs ? buildTreeRows(lastDistributionTabs) : staticPastTreeRows),
    [lastDistributionTabs],
  )

  const allocations = useMemo(
    () => buildAllocationsFromTabs(tabs, contractBudget, sumFees, managementFeePct),
    [tabs, contractBudget, sumFees, managementFeePct]
  )

  const totalMarginAmountFromAllocations = useMemo(
    () => evaluateTotalMarginAmount(allocations, contractBudget, sumFees, managementFeePct),
    [allocations, contractBudget, sumFees, managementFeePct]
  )

  const feeBreakdown = useMemo(() => {
    const managementFeeAmt = managementFeePct * globalStats.spendBudget
    const managementFeePctRaw = Number(gs?.priceSettings?.managementFeePct ?? 0)
    const totalFees =
      managementFeeAmt + setupFee + metasearchConnectivityFee + metasearchSetupFee + creativeFee + videoCreativeFee
    return [
          { key: '1', fee: 'Management', percentage: managementFeePctRaw > 0 ? `${formatNumber(managementFeePctRaw)}%` : '—', total: formatCurrencyWithoutSymbol(managementFeeAmt, currency, { min: 0, max: 0 }) },
      { key: '2', fee: 'Setup', percentage: '—', total: formatCurrencyWithoutSymbol(setupFee, currency, { min: 0, max: 0 }) },
      { key: '3', fee: 'Metasearch Connectivity', percentage: '—', total: formatCurrencyWithoutSymbol(metasearchConnectivityFee, currency, { min: 0, max: 0 }) },
      { key: '4', fee: 'Metasearch Setup', percentage: '—', total: formatCurrencyWithoutSymbol(metasearchSetupFee, currency, { min: 0, max: 0 }) },
      { key: '5', fee: 'Creative', percentage: '—', total: formatCurrencyWithoutSymbol(creativeFee, currency, { min: 0, max: 0 }) },
      { key: '6', fee: 'Video Creative', percentage: '—', total: formatCurrencyWithoutSymbol(videoCreativeFee, currency, { min: 0, max: 0 }) },
      { key: '7', fee: 'Total', percentage: '', total: formatCurrencyWithoutSymbol(totalFees, currency, { min: 0, max: 0 }) },
    ]
  }, [
    globalStats.spendBudget,
    managementFeePct,
    gs?.priceSettings?.managementFeePct,
    setupFee,
    metasearchConnectivityFee,
    metasearchSetupFee,
    creativeFee,
    videoCreativeFee,
  ])

  const onTacticFieldChange = (
    tabId: string,
    platformId: string,
    tacticId: string,
    field: string,
    value: number | CalculationMode,
  ) => {
    setTabs(prev => {
      const targetCurrentValue = prev
        .find(t => t.id === tabId && t.type !== 'metasearch')
        ?.platforms.find(p => p.id === platformId)
        ?.tactics.find(tc => tc.id === tacticId)?.values?.[field as keyof typeof prev[number]['platforms'][number]['tactics'][number]['values']]

      if (targetCurrentValue === value) return prev

      // Compute totalSpend across all channels (digital + metasearch) after this update
      const totalSpend = prev
        .flatMap(t =>
          t.type === 'metasearch'
            ? [t.metasearchSpend ?? 0]
            : t.platforms.flatMap(p =>
                p.tactics.map(tc =>
                  t.id === tabId && p.id === platformId && tc.id === tacticId && field === 'spend'
                    ? Number(value ?? 0)
                    : Number(tc.values.spend ?? 0),
                ),
              ),
        )
        .reduce((s, v) => s + Number(v ?? 0), 0)

      return prev.map(t =>
        t.type === 'metasearch'
          ? t
          : {
              ...t,
              platforms: t.platforms.map(p => ({
                ...p,
                tactics: p.tactics.map(tc => {
                  // Apply the field change only to the target tactic
                  const updatedValues =
                    t.id === tabId && p.id === platformId && tc.id === tacticId
                      ? { ...tc.values, [field]: value }
                      : { ...tc.values }
                  const ctx: FormulaContext = {
                    totalSpend,
                    contractBudget,
                    sumFees,
                    managementFeePct,
                    platformCostCPM: t.id === 'display' ? resolvePlatformCostCPM(p.id, region, currency) : 0,
                    calculationMode: (updatedValues.calculationMode ?? 'CPM') as CalculationMode,
                    currency,
                    region,
                  }

                  const tacticInputs = { ...updatedValues, spend: Number(updatedValues.spend ?? 0) }
                  const { spend: _s, ...calcResult } = evaluateFields(getSchemaForChannel(t.id).id, tacticInputs, ctx)
                  return { ...tc, values: { ...updatedValues, ...calcResult } }
                }),
              })),
            },
      )
    })
  }

  const { metasearch } = useTabTableCache(
    tabs,
    globalStats,
    showExpectedColumns,
    currency,
    region,
    onTacticFieldChange,
    setTabs,
    InputComponent,
  )

  const allTabTables = useMemo(
    () =>
      getAllTabTables(
        tabs,
        showExpectedColumns,
        onTacticFieldChange,
        setTabs,
        globalStats,
        currency,
        region,
        InputComponent,
      ),
    [tabs, showExpectedColumns, onTacticFieldChange, setTabs, globalStats, currency, region, InputComponent],
  )

  const advertiserOptions = useMemo(
    () =>
      (advertiserData?.advertisers?.advertisers ?? []).map((advertiser, index) => ({
        name: advertiser.advertiserName ?? `Property ${index + 1}`,
        bpid: String(advertiser.bpid ?? `BPID-${index + 1}`),
      })),
    [advertiserData],
  )

  const buildFallbackBudgetModel = useCallback(
    (productId: string | undefined): SharedBudgetModel | undefined => {
      const product = plan.products.find(item => item.id === productId) ?? plan.products[0]
      if (!product || advertiserOptions.length === 0) return undefined

      const offset = product.shipToOffset ?? 0
      // Explicit Ship_To by BPID (e.g. The Londoner Hotel) wins over the index slice.
      const shipToProperties = product.shipToBpids?.length
        ? advertiserOptions.filter(option => product.shipToBpids!.includes(option.bpid))
        : advertiserOptions.slice(offset, offset + product.shipToCount)
      if (shipToProperties.length === 0) return undefined

      return {
        currency,
        categories: [],
        standalone: shipToProperties.map(property => ({
          bpid: property.bpid,
          name: property.name,
          budgetValue: 0,
          budgetPct: 0,
        })),
        propertyNames: Object.fromEntries(shipToProperties.map(property => [property.bpid, property.name])),
      }
    },
    [advertiserOptions, currency, plan.products],
  )

  const budgetModel = storedBudgetModel ?? buildFallbackBudgetModel(activeProductId)

  // Product tab bar (visual selector) built from the mock plan's products.
  // Each tab shows a completed/total subtext: a budget group counts as "completed"
  // when it has a budget value > 0 (same rule as the vertical-nav green check).
  const productTabItems = plan.products.map(product => {
    const model = getBudgetModel(planId, product.id) ?? buildFallbackBudgetModel(product.id)
    const groups = [
      ...(model?.categories ?? []),
      ...(model?.standalone ?? []),
    ]
    const total = groups.length
    const completed = groups.filter(g => (g.budgetValue ?? 0) > 0).length
    return {
      key: product.id,
      label: (
        <Styled.ProductTabLabel id={`media_plan_budget_distribution-product_tab-${product.id}-txt`}>
          <span>{product.name}</span>
          <Styled.ProductTabSub>{`${completed} / ${total} completed`}</Styled.ProductTabSub>
        </Styled.ProductTabLabel>
      ),
      children: null,
    }
  })

  // Budget groups (categories + standalone) read from the shared Step 2 model.
  const navCurrency = budgetModel?.currency ?? currency
  const navCategories = budgetModel?.categories ?? []
  const navStandalone = budgetModel?.standalone ?? []

  const navItems = useMemo(
    () => [
      ...navCategories.map(cat => ({
        key: `cat-${cat.id}`,
        section: 'category' as const,
        name: cat.name,
        activity: cat.activity,
        typeLabel: 'Budget Category',
        budgetValue: cat.budgetValue,
        budgetPct: cat.budgetPct,
        propertyCount: cat.memberBpids.length,
      })),
      ...navStandalone.map(entry => ({
        key: `sa-${entry.bpid}`,
        section: 'standalone' as const,
        name: entry.name,
        activity: 'REGULAR_CAMPAIGN',
        typeLabel: 'Property',
        budgetValue: entry.budgetValue,
        budgetPct: entry.budgetPct,
        propertyCount: 1,
      })),
    ],
    [navCategories, navStandalone],
  )

  const completedNavItems = navItems.filter(item => completedGroupKeys.has(item.key))
  const pendingNavItems = navItems.filter(item => !completedGroupKeys.has(item.key))
  const hasBudgetGroups = navItems.length > 0

  const getNavItemSpendStats = (item: typeof navItems[number]) => {
    if (item.key === activeGroupKey) {
      return {
        spendBudget: globalStats.spendBudget,
        spendPct: contractBudget > 0 ? (globalStats.spendBudget / contractBudget) * 100 : 0,
      }
    }

    return groupSpendStats.get(item.key) ?? {
      spendBudget: item.budgetValue,
      spendPct: item.budgetPct,
    }
  }

  useEffect(() => {
    if (!activeGroupKey) return
    setGroupSpendStats(prev => {
      const spendBudget = globalStats.spendBudget
      const spendPct = contractBudget > 0 ? (spendBudget / contractBudget) * 100 : 0
      const previous = prev.get(activeGroupKey)
      if (previous?.spendBudget === spendBudget && previous.spendPct === spendPct) return prev

      const next = new Map(prev)
      const stats = { spendBudget, spendPct }
      next.set(activeGroupKey, stats)
      setBudgetGroupSpendStats(planId, activeProductId, activeGroupKey, stats)
      return next
    })
  }, [activeGroupKey, activeProductId, contractBudget, globalStats.spendBudget, planId])

  useEffect(() => {
    setCompletedGroupKeys(getCompletedBudgetGroupKeys(planId, activeProductId))
    setActiveGroupKey(undefined)
    setGroupSpendStats(getBudgetGroupSpendStats(planId, activeProductId))
  }, [planId, activeProductId])

  useEffect(() => {
    if (completedNavItems.length === 0) setIsCompletedSectionOpen(false)
  }, [completedNavItems.length])

  useEffect(() => {
    const validKeys = new Set(navItems.map(item => item.key))
    setCompletedGroupKeys(prev => {
      const next = new Set([...prev].filter(key => validKeys.has(key)))
      if (next.size === prev.size) return prev
      setCompletedBudgetGroupKeys(planId, activeProductId, next)
      return next
    })
  }, [activeProductId, navItems, planId])

  // Default the vertical-nav selection to the first category, else first standalone.
  const defaultGroupKey = pendingNavItems[0]?.key ?? navItems[0]?.key
  useEffect(() => {
    if (activeGroupKey === undefined && defaultGroupKey !== undefined) {
      setActiveGroupKey(defaultGroupKey)
      return
    }

    if (activeGroupKey !== undefined && !navItems.some(item => item.key === activeGroupKey)) {
      setActiveGroupKey(defaultGroupKey)
    }
  }, [activeGroupKey, defaultGroupKey, navItems])

  const getNextIncompleteGroupKey = useCallback(
    (currentKey: string | undefined, completedKeys: Set<string> = completedGroupKeys) => {
      if (navItems.length === 0) return undefined

      const currentIndex = navItems.findIndex(item => item.key === currentKey)
      const startIndex = currentIndex >= 0 ? currentIndex : -1

      for (let offset = 1; offset <= navItems.length; offset += 1) {
        const item = navItems[(startIndex + offset) % navItems.length]
        if (item.key !== currentKey && !completedKeys.has(item.key)) return item.key
      }

      return undefined
    },
    [completedGroupKeys, navItems],
  )

  const isLastIncompleteGroup = hasBudgetGroups && getNextIncompleteGroupKey(activeGroupKey) === undefined
  const submitButtonLabel = !hasBudgetGroups || isLastIncompleteGroup ? 'Save & Continue' : 'Save and Next'
  const activeExpectedBudget = navItems.find(item => item.key === (activeGroupKey ?? defaultGroupKey))?.budgetValue ?? 0

  // Resolve the currently selected budget group (category or standalone) for the
  // summary card. Activity + property count come from Step 2; Total Spend + Margin%
  // are reused from the live Step 3 globalStats (Budget Summary card).
  const activeGroupSummary = useMemo(() => {
    const key = activeGroupKey ?? defaultGroupKey
    if (!key) return undefined
    if (key.startsWith('cat-')) {
      const id = key.slice(4)
      const cat = navCategories.find(c => c.id === id)
      if (!cat) return undefined
      return {
        name: cat.name,
        activity: ACTIVITY_LABEL[cat.activity] ?? cat.activity,
        propertyCount: cat.memberBpids.length,
      }
    }
    if (key.startsWith('sa-')) {
      const bpid = key.slice(3)
      const entry = navStandalone.find(s => s.bpid === bpid)
      if (!entry) return undefined
      return { name: entry.name, activity: 'Rooms', propertyCount: 1 }
    }
    return undefined
  }, [activeGroupKey, defaultGroupKey, navCategories, navStandalone])

  const tabItems = tabs.map(tab => ({
    key: tab.id,
    label: <span id={`media_plan_budget_distribution-tab-${tab.id}-txt`}>{tab.label}</span>,
    children: (
      <div id={`media_plan_budget_distribution-tab_panel-${tab.id}`}>
        {tab.type === 'metasearch' && metasearch ? (
          <MetasearchTabTable
            columns={allTabTables[tab.id]?.columns ?? []}
            dataSource={allTabTables[tab.id]?.dataSource ?? []}
          />
        ) : (
          <DigitalTabTable
            columns={allTabTables[tab.id]?.columns ?? []}
            dataSource={allTabTables[tab.id]?.dataSource ?? []}
          />
        )}
      </div>
    ),
  }))

  return (
    <MediaplannerWrapper>
      {bdLoading && <Spinner />}
      <Form form={form} onFinish={handleSubmit} onFinishFailed={handleSubmitFailed}>
        <div id='media_plan_budget_distribution-breadcrumb-nav'>
          <Breadcrumb
            defaultHome
            items={[{ title: 'Media Plans', href: '/mediaplanner' }, { title: isNewPlan ? 'New Media Plan' : 'Media Plan Settings' }]}
          />
        </div>

        <PlanTitleHeader
          titleId='media_plan_budget_distribution-ttl'
          // While a saved plan's data loads, show an empty title and no chip rather than flashing
          // the "New Media Plan" / Draft fallback and then swapping to the real name.
          title={isDetailsView && bdLoading ? '' : gs?.planInformation?.planName || 'New Media Plan'}
          status={isDetailsView && bdLoading ? undefined : resolveHeaderStatus(savedStatus, false)}
          versionCount={versions.length}
          onOpenVersions={() => setIsVersionsOpen(true)}
        />

        <Stepper
          id='media_plan_budget_distribution-stepper'
          current={2}
          items={[
            {
              title: 'General Settings',
              status: 'finish',
              ...(isDetailsView && { onClick: () => navigate(`/mediaplanner/edit/${planId}`, { state: { isNewPlan } }) }),
            },
            {
              title: 'Product Settings',
              status: 'finish',
              ...(isDetailsView && { onClick: () => navigate(`/mediaplanner/product-settings/${planId}`, { state: { isNewPlan } }) }),
            },
            {
              title: 'Budget Distribution',
              status: backendSavedSpendDistribution.length > 0 ? 'finish' : 'process',
              ...(isDetailsView && { onClick: () => navigate(`/mediaplanner/budget-distribution/${planId}`, { state: { isNewPlan } }) }),
            },
            {
              title: 'Media Plan',
              status: canNavigateToMediaPlanStep ? 'finish' : 'wait',
              ...(canNavigateToMediaPlanStep && { onClick: () => navigate(`/mediaplanner/download-summary/${planId}`, { state: { isNewPlan } }) }),
            },
          ]}
        />

        {/* Product tab bar — visual selector across the plan's products. */}
        <Styled.ProductTabsBar>
          <Tab
            id='media_plan_budget_distribution-product_tabs-tab'
            activeKey={activeProductId}
            onChange={setActiveProductId}
            items={productTabItems}
          />
        </Styled.ProductTabsBar>

        {/* Two-column layout: budget-groups vertical nav (from Step 2) + existing content. */}
        <Styled.DistLayout>
          <Styled.DistSidebar id='media_plan_budget_distribution-budget_groups-nav'>
            {completedNavItems.length > 0 && (
              <>
                <Styled.CompletedSectionToggle
                  type='button'
                  aria-expanded={isCompletedSectionOpen}
                  onClick={() => setIsCompletedSectionOpen(open => !open)}
                >
                  <span>{`Completed (${completedNavItems.length})`}</span>
                  <Styled.CompletedSectionIcon open={isCompletedSectionOpen}>
                    <Icon name='chevronDown' width={12} height={12} color={colors.cloud_80} />
                  </Styled.CompletedSectionIcon>
                </Styled.CompletedSectionToggle>
                {isCompletedSectionOpen && completedNavItems.map(item => {
                  const spendStats = getNavItemSpendStats(item)
                  return (
                    <Styled.NavItem
                      key={item.key}
                      type='button'
                      selected={activeGroupKey === item.key}
                      onClick={() => setActiveGroupKey(item.key)}
                    >
                      <Styled.NavItemHeaderRow>
                        <Styled.NavItemStatusIcon>
                          <Icon
                            name='checkCircle'
                            width={18}
                            height={18}
                            color={colors.forest_60}
                          />
                        </Styled.NavItemStatusIcon>
                        <Styled.NavItemLabel>{item.name}</Styled.NavItemLabel>
                      </Styled.NavItemHeaderRow>
                      <Styled.NavItemSub>
                        <Styled.NavItemSubText>{`Total : ${formatCurrencyWithSuffixSymbol(spendStats.spendBudget, navCurrency, { min: 0, max: 0 })} (${formatNumber(spendStats.spendPct)}%)`}</Styled.NavItemSubText>
                        <Styled.NavItemSubText>{`Properties: ${item.propertyCount}`}</Styled.NavItemSubText>
                      </Styled.NavItemSub>
                      <Styled.NavTagRow>
                        <Styled.TypeChip tone={item.section === 'standalone' ? 'standalone' : 'category'}>
                          {item.typeLabel}
                        </Styled.TypeChip>
                        <Styled.ActivityChip tone={activityTagColor(item.activity)}>
                          {ACTIVITY_LABEL[item.activity] ?? item.activity}
                        </Styled.ActivityChip>
                      </Styled.NavTagRow>
                    </Styled.NavItem>
                  )
                })}
              </>
            )}

            {pendingNavItems.map(item => {
              const complete = item.budgetValue > 0
              const spendStats = getNavItemSpendStats(item)
              return (
                <Styled.NavItem
                  key={item.key}
                  type='button'
                  selected={activeGroupKey === item.key}
                  onClick={() => setActiveGroupKey(item.key)}
                >
                  <Styled.NavItemHeaderRow>
                    <Styled.NavItemStatusIcon>
                      <Icon
                        name={complete ? 'checkCircle' : 'timesCircle'}
                        width={18}
                        height={18}
                        color={complete ? colors.forest_60 : colors.crimson_60}
                      />
                    </Styled.NavItemStatusIcon>
                    <Styled.NavItemLabel>{item.name}</Styled.NavItemLabel>
                  </Styled.NavItemHeaderRow>
                  <Styled.NavItemSub>
                    <Styled.NavItemSubText>{`Total : ${formatCurrencyWithSuffixSymbol(spendStats.spendBudget, navCurrency, { min: 0, max: 0 })} (${formatNumber(spendStats.spendPct)}%)`}</Styled.NavItemSubText>
                    <Styled.NavItemSubText>{`Properties: ${item.propertyCount}`}</Styled.NavItemSubText>
                  </Styled.NavItemSub>
                  <Styled.NavTagRow>
                    <Styled.TypeChip tone={item.section === 'standalone' ? 'standalone' : 'category'}>
                      {item.typeLabel}
                    </Styled.TypeChip>
                    <Styled.ActivityChip tone={activityTagColor(item.activity)}>
                      {ACTIVITY_LABEL[item.activity] ?? item.activity}
                    </Styled.ActivityChip>
                  </Styled.NavTagRow>
                </Styled.NavItem>
              )
            })}
          </Styled.DistSidebar>

          <Styled.DistContent>
        {activeGroupSummary && (
          <Styled.GroupSummaryCard id='media_plan_budget_distribution-group_summary-card'>
            <Styled.GroupSummaryTitle id='media_plan_budget_distribution-group_summary-ttl'>
              {activeGroupSummary.name}
            </Styled.GroupSummaryTitle>
            <Styled.GroupSummaryGrid>
              <Styled.GroupSummaryItem>
                <Styled.GroupSummaryLabel>Total Spend</Styled.GroupSummaryLabel>
                <Styled.GroupSummaryValue>{formatCurrencyWithSuffixSymbol(globalStats.spendBudget, currency, { min: 0, max: 0 })}</Styled.GroupSummaryValue>
              </Styled.GroupSummaryItem>
              <Styled.GroupSummaryItem>
                <Styled.GroupSummaryLabel>Margin</Styled.GroupSummaryLabel>
                <Styled.GroupSummaryValue>{`${formatNumber(globalStats.actualMarginPct)}%`}</Styled.GroupSummaryValue>
              </Styled.GroupSummaryItem>
              <Styled.GroupSummaryItem>
                <Styled.GroupSummaryLabel>Activity</Styled.GroupSummaryLabel>
                <Styled.GroupSummaryValue>{activeGroupSummary.activity}</Styled.GroupSummaryValue>
              </Styled.GroupSummaryItem>
              <Styled.GroupSummaryItem>
                <Styled.GroupSummaryLabel>Properties</Styled.GroupSummaryLabel>
                <Styled.GroupSummaryValue>{activeGroupSummary.propertyCount}</Styled.GroupSummaryValue>
              </Styled.GroupSummaryItem>
            </Styled.GroupSummaryGrid>
          </Styled.GroupSummaryCard>
        )}
        <Grid.Row>
          <Grid.Col span={12}>
            <PastConsumptionAccordion
              treeRows={pastConsumptionTreeRows}
              showPowerBI={showPowerBI}
              currency={currency}
              mediaPlanReportFilter={mediaPlanReportFilter}
              onAccordionChange={(keys) => {
                if (keys.includes('past-consumption')) {
                  setShowPowerBI(true)
                }
              }}
            />
          </Grid.Col>
        </Grid.Row>

        <Grid.Row>
          <Grid.Col span={12}>
            <Styled.CustomSection>
              <Styled.SectionHeader>
                {!isFormReadOnly && (
                  <Button id='media_plan_budget_distribution-settings-btn' size='small' variant='outlined' onClick={openSettings}>
                    Settings
                  </Button>
                )}
              </Styled.SectionHeader>
              {prefillEnabled && lastDistributionErrorMessage && (
                <Text.Body style={{ color: colors.crimson_70, marginBottom: '12px' }}>
                  {lastDistributionErrorMessage}
                </Text.Body>
              )}
              <Tab id='media_plan_budget_distribution-media_tabs-tab' activeKey={activeTabId} onChange={setActiveTabId} items={tabItems} />
            </Styled.CustomSection>
          </Grid.Col>
        </Grid.Row>

        <BudgetSummaryCards
          channelSpends={channelSpends}
          globalStats={globalStats}
          contractBudget={contractBudget}
          feeBreakdown={feeBreakdown}
          totalMarginAmount={totalMarginAmountFromAllocations}
          currency={currency}
          expectedBudget={activeExpectedBudget}
        />

        <Grid.Row>
          <Grid.Col span={12}>
            {hasValidDistributionPeriod ? (
              <SpendBudgetDistribution
                period={distributionPeriod}
                totalBudget={globalStats.spendBudget}
                currency={currency}
                treeRows={treeRows}
                initialPercentages={spendDistributionInitialPercentages}
                recommendedPercentages={recommendationMap}
                onDistributionChange={handleDistributionChange}
                errorMessage={
                  recommendationError
                    ? (recommendationError.graphQLErrors?.[0]?.message ?? recommendationError.message ?? SPEND_BUDGET_RECOMMENDATION_ERROR_MESSAGE)
                    : recommendationStatusFailed
                      ? `${SPEND_BUDGET_RECOMMENDATION_ERROR_MESSAGE} (${recommendationStatus?.toLowerCase().replace(/_/g, ' ')})`
                      : null
                }
                disabled={isFormReadOnly}
              />
            ) : (
              <Container.Section>
                <Spinner />
              </Container.Section>
            )}
          </Grid.Col>
        </Grid.Row>
          </Styled.DistContent>
        </Styled.DistLayout>

        <StickyFooter>
          <Button
            href='/mediaplanner'
            variant='outlined'
            color='primary'
            id='media_plan_budget_distribution-cancel-btn'
            disabled={isSavingVersion}
          >
            Cancel
          </Button>
          {!isFormReadOnly &&
            (isSavingVersion ? (
              <SaveVersionInline>
                <Input
                  id='media_plan_budget_distribution-save_version_name-inp'
                  placeholder='Version name'
                  value={versionName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVersionName(e.target.value)}
                />
                <Button
                  id='media_plan_budget_distribution-save_version_confirm-btn'
                  variant='solid'
                  color='primary'
                  onClick={confirmSaveAsVersion}
                >
                  Save
                </Button>
                <Button
                  id='media_plan_budget_distribution-save_version_cancel-btn'
                  variant='outlined'
                  color='primary'
                  aria-label='Cancel saving version'
                  onClick={() => setIsSavingVersion(false)}
                >
                  ×
                </Button>
              </SaveVersionInline>
            ) : (
              <Button
                id='media_plan_budget_distribution-save_as_version-btn'
                variant='outlined'
                color='primary'
                onClick={() => {
                  setVersionName('')
                  setIsSavingVersion(true)
                }}
              >
                Save as Version
              </Button>
            ))}
          {!isFormReadOnly && (
            <Button
              htmlType='submit'
              id='media_plan_budget_distribution-submit-btn'
              loading={submitting}
              disabled={isSavingVersion}
            >
              {submitButtonLabel}
            </Button>
          )}
        </StickyFooter>
      </Form>

      {!isFormReadOnly && (
        <MediaSettingsDrawer
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          onSave={saveSettings}
          settingsDraftTabs={settingsDraftTabs}
          setSettingsDraftTabs={setSettingsDraftTabs}
        />
      )}

      <PlanVersionsDrawer
        planId={planId}
        isOpen={isVersionsOpen}
        onClose={() => setIsVersionsOpen(false)}
        captureSnapshot={captureSnapshot}
        onView={handleViewVersion}
      />
    </MediaplannerWrapper>
  )
}

export default BudgetDistribution
