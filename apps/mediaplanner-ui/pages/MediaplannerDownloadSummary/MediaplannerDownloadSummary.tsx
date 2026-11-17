import React from 'react'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import {
  Button,
  Breadcrumb,
  Checkbox,
  Container,
  Modal,
  Spinner,
  Stepper,
  StickyFooter,
  Tab,
  Table,
  Text,
} from '@amadeus/react-design-factory'
import type { ColumnsType } from '@amadeus/react-design-factory/components/Table'
import { useNotification } from '@amadeus/react-design-factory/utils/notification'
import { useNavigate, useParams, useLocation } from 'react-router'
import { MediaplannerWrapper } from '../Mediaplanner/Mediaplanner.styled'
import { PlanTitleHeader } from '../Mediaplanner/PlanTitleHeader'
import { PlanVersionsDrawer } from '../Mediaplanner/PlanVersionsDrawer'
import { usePlanVersions, savePlanVersion, type PlanVersionSnapshot } from '../Mediaplanner/planVersionStore'
import { resolveHeaderStatus } from '../Mediaplanner/mediaplanUtils'
import { useGetMediaPlanBdQuery, useGetSpendBudgetRecommendationQuery } from '../BudgetDistribution/BudgetDistribution.queries'
import { useGetAdvertiserByIdQuery } from '@mediahub/advertisers-ui/pages/Advertisers/Advertisers.queries'
import { useAuth } from '@mediahub/mediahub-ui/context/AuthContext'
import {
  DocHeader,
  DocEyebrow,
  DocTitle,
  DocBid,
  DocTable,
  DocTableRow,
  DocTableLabel,
  DocTableValue,
  StrategyBlock,
  StrategyTitle,
  StrategyTextArea,
  StrategyTable,
  StrategyHeaderRow,
  StrategyGroupRow,
  StrategyDataRow,
  DocFooter,
  MonthlyTableWrap,
  ScreenOnly,
  PrintOnly,
  PrintPage,
  PdfTabChoices,
} from './MediaplannerDownloadSummary.styled'
import { buildMonthlyColumns, buildMonthlyRows, type MonthlyRow } from './monthlyBreakdown'
import {
  getMockSalesforcePlan,
  getSalesforceScenario,
  MOCK_SF_PLAN_ONE,
  type SalesforceScenarioId,
  PERFORMANCE_CADENCE_LABEL,
  FIRST_MONTH_REVIEW_CALL_LABEL,
} from '../MediaplannerProductSettings/mockSalesforcePlans'
import { getBudgetGroupSpendStats, getPlanScenarioId } from '../MediaplannerProductSettings/mediaPlanBudgetStore'
import { computeFeeValue } from './feeCalc'
import { formatCurrencyWithSuffixSymbol } from '../utils/number'
import { StatusEnum } from '@mediahub/mediaplanner-ui/graphql/generated/mediaplanner-enums'

type OverviewDocRow = { label: string; value: string; bold?: boolean }

type StrategyEntry = { mediaType: string; strategy: string }
type StrategyGroup = { objective: string; entries: StrategyEntry[] }

const resolveStrategyChannel = (mediaType: string): string => {
  const value = mediaType.toLowerCase()
  if (value.includes('metasearch')) return 'METASEARCH'
  if (value.includes('youtube') || value.includes('video')) return 'VIDEO'
  if (value.includes('social') || value.includes('tiktok') || value.includes('facebook')) return 'SOCIAL'
  if (value.includes('display') || value.includes('dsp') || value.includes('demand gen')) return 'DISPLAY'
  if (value.includes('ppc') || value.includes('search') || value.includes('performance max')) return 'PAID_SEARCH'
  return 'OTHER'
}

const STRATEGY_GROUPS: StrategyGroup[] = [
  {
    objective: 'Drive Direct Bookings',
    entries: [
      {
        mediaType: 'PPC Search - Brand Terms - Google',
        strategy:
          'Maximize investment in brand terms to ensure ownership of search results page when potential bookers are searching for your property in Google.',
      },
      {
        mediaType: 'Amadeus Hotel Metasearch',
        strategy:
          'Maximize direct bookings and enhance visibility by leveraging metasearch engines to capture high-intent travelers actively searching for hotel options on the booking stage of the user journey.',
      },
      {
        mediaType: 'Display - Remarketing (DRM)',
        strategy:
          'Serve banner ads to site visitors who have previously visited your site but left the site without making a reservation.',
      },
      {
        mediaType: 'Social Remarketing (FB/IG Ads)',
        strategy:
          'Serve Social Media Ads to website visitors who have previously visited your site but left without making a reservation.',
      },
      {
        mediaType: 'PPC Search - Brand Terms - Bing',
        strategy:
          'Maximize investment in brand terms to ensure ownership of search results page when potential bookers are searching for your property in Bing.',
      },
    ],
  },
  {
    objective: 'Acquire New Customers',
    entries: [
      {
        mediaType: 'PPC Search - Generic Non-brand',
        strategy: 'Investment in upper funnel keywords to attract new clients to the site.',
      },
      {
        mediaType: 'Social Prospecting (FB/IG Ads)',
        strategy:
          'Invest in Social Media Ads which will be shown to potential guests with similar behavior to your website visitors to increase brand awareness.',
      },
      {
        mediaType: 'Demand Gen - Full Funnel',
        strategy: 'AI-powered solution that engages new, high value traveler audiences across multiple Google environments.',
      },
      {
        mediaType: 'Display - Prospecting',
        strategy: 'Investment in upper funnel google display to attract new clients to the site.',
      },
      {
        mediaType: 'TikTok - Prospecting & Remarketing',
        strategy: 'Drive awareness, consideration and conversions among custom and lookalike audiences.',
      },
      {
        mediaType: 'Performance Max - Full Funnel',
        strategy:
          "Goal-based campaign which allows Amadeus to access all Google Ads inventory from a single campaign. Designed to complement your keyword-based Search campaigns to help you find more converting customers across all of Google's channels such as YouTube, Display, Search, Discover, Gmail, and Maps.",
      },
      {
        mediaType: 'Amadeus DSP - Prospecting & Remarketing',
        strategy: 'Programmatic prospecting and remarketing across premium inventory.',
      },
      {
        mediaType: 'New Channel Testing',
        strategy: 'Recommended budget leveraged for ongoing testing purposes of new channels or media technologies.',
      },
      {
        mediaType: 'YouTube',
        strategy: 'Investment in YouTube to increase brand awareness of the property and attract new customers to the site.',
      },
    ],
  },
]

const OVERALL_STRATEGY_TEXT =
  "Amadeus' objective is to maximize revenue through your direct channels. With your budget and overall business objectives, Amadeus will drive a relevant and motivated audience to your website with the below recommended media vehicles. Initial budgets shared below will shift across channels as our Omni Channel Budget allocation technology leverages AI to identify top converting channels post campaign learning phase and deploys budgets at scale aiming for optimal conversion. As such, initial budget totals by channel are observational and not final - they are guiding points for the campaign."

dayjs.extend(customParseFormat)

function MediaplannerDownloadSummary() {
  const navigate = useNavigate()
  const location = useLocation()
  const locationState = location.state as { isNewPlan?: boolean; managementFeeAmt?: number } | null
  const isNewPlan = Boolean(locationState?.isNewPlan)
  const notification = useNotification()
  const { planId } = useParams<{ planId: string }>()
  const isDetailsView = Boolean(planId)
  const [activeTabKey, setActiveTabKey] = React.useState<string>('plan-overview')
  // Overall Strategy is editable (local prototype state), seeded from the boilerplate.
  const [overallStrategy, setOverallStrategy] = React.useState<string>(OVERALL_STRATEGY_TEXT)
  // PDF export modal: which tabs to include (defaults to all four).
  const [isPdfModalOpen, setIsPdfModalOpen] = React.useState(false)
  const ALL_TAB_KEYS = ['plan-overview', 'monthly-breakdown', 'demand-360', 'google-demand'] as const
  const [pdfTabKeys, setPdfTabKeys] = React.useState<string[]>([...ALL_TAB_KEYS])
  const togglePdfTab = (key: string, on: boolean) =>
    setPdfTabKeys(prev => (on ? Array.from(new Set([...prev, key])) : prev.filter(k => k !== key)))
  const { user, isAdmin, isStandard } = useAuth()
  const userId = user?.id as number
  if (!userId) return <Spinner />
  const isReadOnly = !(isAdmin || isStandard)

  const { data: mediaPlanData, loading } = useGetMediaPlanBdQuery(planId)
  const mediaPlan = mediaPlanData?.GetMediaPlan
  const generalSettings = mediaPlan?.generalSettings
  const budgetDistribution = mediaPlan?.budgetDistribution

  const savedStatus = generalSettings?.planInformation?.status
  const isStatusLocked = isDetailsView && [StatusEnum.ClosedWon, StatusEnum.ClosedLost, StatusEnum.Archived].includes(savedStatus as StatusEnum)
  const isFormReadOnly = isReadOnly || isStatusLocked

  const advertiserId = Number(generalSettings?.advertiserInformation?.advertiserId ?? 0)
  // Existing advertiser query kept wired; the document overview sources data from the mock plan.
  useGetAdvertiserByIdQuery(advertiserId || undefined)

  const savedSpendDistribution = budgetDistribution?.spendBudgetDistribution ?? []

  const recommendationInput = React.useMemo(() => {
    if (savedSpendDistribution.length > 0) return undefined
    const advertiserId2 = generalSettings?.advertiserInformation?.advertiserId
    const advertiserBpid = generalSettings?.advertiserInformation?.advertiserBpid
    const startDate = generalSettings?.planInformation?.startDate
    const endDate = generalSettings?.planInformation?.endDate
    const totalBudget = Math.round(Number(generalSettings?.planInformation?.contractBudgetTarget ?? 0))
    if (!advertiserId2 || !advertiserBpid || !startDate || !endDate || totalBudget <= 0) return undefined
    return { advertiserId: advertiserId2, advertiserBpid, startDate, endDate, totalBudget }
  }, [savedSpendDistribution.length, generalSettings])

  const { data: recommendationData } = useGetSpendBudgetRecommendationQuery(recommendationInput)

  const recommendationDistribution = React.useMemo(() => {
    const items = recommendationData?.GetSpendBudgetRecommendation?.items ?? []
    const totalBudget = Number(recommendationInput?.totalBudget ?? 0)
    if (!items.length || totalBudget <= 0) return []

    return items.map(item => ({
      month: item.startDate,
      spendPct: Number((((item.budget ?? 0) * 100) / totalBudget).toFixed(2)),
    }))
  }, [recommendationData, recommendationInput?.totalBudget])
  const guardRedirectedRef = React.useRef(false)

  const isSavedDistributionPeriodOutOfSync = React.useMemo(() => {
    if (!isDetailsView) return false

    const startDate = generalSettings?.planInformation?.startDate
    const endDate = generalSettings?.planInformation?.endDate
    const savedDistribution = budgetDistribution?.spendBudgetDistribution ?? []

    if (!startDate || !endDate || !savedDistribution.length) return false

    const parsedStart = dayjs(String(startDate), ['DD-MMM-YYYY', 'YYYY-MM-DD'], true)
    const parsedEnd = dayjs(String(endDate), ['DD-MMM-YYYY', 'YYYY-MM-DD'], true)
    if (!parsedStart.isValid() || !parsedEnd.isValid()) return false

    const from = parsedStart.startOf('month')
    const to = parsedEnd.startOf('month')
    const rangeStart = from.isBefore(to) ? from : to
    const rangeEnd = from.isBefore(to) ? to : from

    const expectedKeys = new Set<string>()
    let cursor = rangeStart
    while (cursor.isBefore(rangeEnd) || cursor.isSame(rangeEnd, 'month')) {
      expectedKeys.add(cursor.format('YYYY-MM-01'))
      cursor = cursor.add(1, 'month')
    }

    const savedKeys = new Set<string>(
      savedDistribution
        .map(item => {
          const parsed = dayjs(String(item.month ?? ''), ['DD-MMM-YYYY', 'YYYY-MM-DD'], true)
          return parsed.isValid() ? parsed.format('YYYY-MM-01') : ''
        })
        .filter(Boolean),
    )

    if (expectedKeys.size !== savedKeys.size) return true
    for (const key of expectedKeys) {
      if (!savedKeys.has(key)) return true
    }
    return false
  }, [isDetailsView, generalSettings?.planInformation?.startDate, generalSettings?.planInformation?.endDate, budgetDistribution?.spendBudgetDistribution])

  React.useEffect(() => {
    if (!isDetailsView || !planId || loading || !isSavedDistributionPeriodOutOfSync || guardRedirectedRef.current) return

    guardRedirectedRef.current = true
    notification.error('You cannot go to the Summary step without saving Step 2 because Start Date and End Date were modified in Step 1.')
    navigate(`/mediaplanner/budget-distribution/${planId}`, { replace: true, state: { isNewPlan } })
  }, [isDetailsView, planId, loading, isSavedDistributionPeriodOutOfSync, navigate, notification])

  // Reference the existing recommendation query result so its hook stays wired.
  void recommendationDistribution
  void savedSpendDistribution

  // --- Plan versioning (prototype) -------------------------------------------------------------
  // The Media Plan step is read-only, so it offers the Versions drawer (view/save) but no inline
  // "Save as Version" footer control. Saving here captures the plan identity; viewing a version
  // from the read-only summary is a no-op on this page (no editable state to restore).
  const [isVersionsOpen, setIsVersionsOpen] = React.useState(false)
  const { versions } = usePlanVersions(planId)
  const captureVersionSnapshot = React.useCallback(
    (): PlanVersionSnapshot => (planId ? { planId } : {}),
    [planId],
  )

  // --- Media Plan document data (sourced from the mock Salesforce plan) ---
  // Resolve the SAME plan Steps 2/3 used (real seeded plan, else the Step 2 scenario persisted in
  // the store) so per-product spend reads under matching product-id keys. No persisted scenario →
  // MOCK_SF_PLAN_ONE as before.
  const persistedScenarioId = getPlanScenarioId(planId) as SalesforceScenarioId | undefined
  const plan =
    getMockSalesforcePlan(planId) ??
    (persistedScenarioId ? getSalesforceScenario(persistedScenarioId).plan : MOCK_SF_PLAN_ONE)

  const termMonths = React.useMemo(() => {
    const start = dayjs(plan.startDate, 'DD-MMM-YYYY', true)
    const end = dayjs(plan.endDate, 'DD-MMM-YYYY', true)
    if (!start.isValid() || !end.isValid()) return 1
    const months = end.diff(start, 'month')
    return months === 0 ? 1 : months
  }, [plan.startDate, plan.endDate])

  const planCurrency = plan.currency
  const backendSpendBudget = Number(budgetDistribution?.spendBudget ?? 0)

  const productSpendRows = React.useMemo(() => {
    const rows = plan.products.map(product => {
      const spendStats = getBudgetGroupSpendStats(planId, product.id)
      const spendBudget = [...spendStats.values()].reduce((sum, stats) => sum + Number(stats.spendBudget ?? 0), 0)
      return { product, spendBudget }
    })

    if (rows.some(row => row.spendBudget > 0)) return rows
    if (backendSpendBudget > 0) {
      return rows.map((row, index) => ({ ...row, spendBudget: index === 0 ? backendSpendBudget : 0 }))
    }
    return rows.map((row, index) => ({ ...row, spendBudget: index === 0 ? plan.totalSpend : 0 }))
  }, [backendSpendBudget, plan.products, plan.totalSpend, planId])

  const planTotalSpend = productSpendRows.reduce((sum, row) => sum + row.spendBudget, 0)

  const money = React.useCallback(
    (value: number) => formatCurrencyWithSuffixSymbol(Math.round(value), planCurrency, { min: 0, max: 0 }),
    [planCurrency],
  )

  const feeValues = React.useMemo(() => {
    const feeTotals = new Map<string, { fee: typeof plan.products[number]['fees'][number]; value: number }>()
    productSpendRows.forEach(({ product, spendBudget }) => {
      product.fees.forEach(fee => {
        const existing = feeTotals.get(fee.name)
        const value = computeFeeValue(fee, spendBudget, termMonths)
        feeTotals.set(fee.name, { fee, value: (existing?.value ?? 0) + value })
      })
    })
    return [...feeTotals.values()]
  }, [productSpendRows, termMonths])

  const feesTotal = feeValues.reduce((sum, f) => sum + f.value, 0)
  const contractBudget = planTotalSpend + feesTotal

  const step3MonthlyDistribution = savedSpendDistribution.length > 0 ? savedSpendDistribution : recommendationDistribution
  const dynamicMonthlyLabels = React.useMemo(
    () =>
      step3MonthlyDistribution.length > 0
        ? step3MonthlyDistribution.map(item => {
            const parsed = dayjs(String(item.month ?? ''), ['DD-MMM-YYYY', 'YYYY-MM-DD'], true)
            return parsed.isValid() ? parsed.format('MMM-YY') : String(item.month ?? '')
          })
        : plan.monthlyBreakdown.months,
    [plan.monthlyBreakdown.months, step3MonthlyDistribution],
  )
  const dynamicMonthlySeasonalPct = React.useMemo(
    () =>
      step3MonthlyDistribution.length > 0
        ? step3MonthlyDistribution.map(item => Number(item.spendPct ?? 0))
        : plan.monthlyBreakdown.seasonalPct,
    [plan.monthlyBreakdown.seasonalPct, step3MonthlyDistribution],
  )
  const dynamicMonthlyBreakdown = React.useMemo(
    () => ({
      ...plan.monthlyBreakdown,
      months: dynamicMonthlyLabels,
      seasonalPct: dynamicMonthlySeasonalPct,
    }),
    [dynamicMonthlyLabels, dynamicMonthlySeasonalPct, plan.monthlyBreakdown],
  )

  const startDateLong = React.useMemo(() => {
    const start = dayjs(plan.startDate, 'DD-MMM-YYYY', true)
    return start.isValid() ? start.format('dddd, MMMM D, YYYY') : plan.startDate
  }, [plan.startDate])

  const overviewDocRows = React.useMemo<OverviewDocRow[]>(() => {
    const rows: OverviewDocRow[] = [
      { label: 'Term (months)', value: String(termMonths) },
      { label: 'Start Date (may vary)', value: startDateLong },
      { label: 'Performance Report', value: PERFORMANCE_CADENCE_LABEL[plan.reviewSettings.performanceReport] },
      {
        label: 'Periodic Performance Review Calls',
        value: PERFORMANCE_CADENCE_LABEL[plan.reviewSettings.periodicPerformanceReviewCalls],
      },
      { label: 'First Month Review Call', value: FIRST_MONTH_REVIEW_CALL_LABEL[plan.reviewSettings.firstMonthReviewCall] },
    ]
    feeValues.forEach(({ fee, value }) => {
      rows.push({ label: fee.name, value: money(value) })
    })
    rows.push({ label: 'Budget', value: money(planTotalSpend) })
    rows.push({ label: 'Total Investment', value: money(contractBudget), bold: true })
    return rows
  }, [termMonths, startDateLong, plan.reviewSettings, feeValues, money, planTotalSpend, contractBudget])

  const monthlyColumns = React.useMemo(
    () => buildMonthlyColumns(dynamicMonthlyBreakdown.months),
    [dynamicMonthlyBreakdown.months],
  )

  const monthlyRows = React.useMemo(
    () => buildMonthlyRows(dynamicMonthlyBreakdown, planCurrency, {
      totalSpend: planTotalSpend,
      seasonalPct: dynamicMonthlySeasonalPct,
      allocations: budgetDistribution?.allocations as MediaplannerQL.MediaAllocation[] | undefined,
    }),
    [budgetDistribution?.allocations, dynamicMonthlyBreakdown, dynamicMonthlySeasonalPct, planCurrency, planTotalSpend],
  )

  const step3SpendByChannel = React.useMemo(() => {
    const spendByChannel = new Map<string, number>()
    ;(budgetDistribution?.allocations ?? []).forEach(allocation => {
      const channel = String(allocation?.channel ?? '').toUpperCase()
      if (!channel) return

      const tacticSpend = (allocation?.tactics ?? []).reduce(
        (sum, tactic) => sum + Number(tactic?.spendAmount ?? 0),
        0,
      )
      const allocationSpend = tacticSpend > 0 ? tacticSpend : Number(allocation?.budgetAmount ?? 0)
      spendByChannel.set(channel, (spendByChannel.get(channel) ?? 0) + allocationSpend)
    })
    return spendByChannel
  }, [budgetDistribution?.allocations])

  const monthlyTableColumns = React.useMemo<ColumnsType<MonthlyRow>>(() => {
    // Full row width = Media Initiative + Total + one per month. Category headers
    // span the whole table via the first column's colSpan.
    const fullColSpan = 2 + monthlyColumns.length
    const bold = (v: string) => (
      <Text.Body>
        <strong>{v}</strong>
      </Text.Body>
    )

    // First column — Media Initiative (platform name / seasonality / total labels).
    // For category-header rows it renders the full-width category label.
    const labelColumn = {
      title: <Text.Body><strong>Media Initiative</strong></Text.Body>,
      dataIndex: 'label',
      key: 'label',
      width: 260,
      render: (value: string, record: MonthlyRow) => {
        if (record.isHeader) {
          return {
            children: <Text.Body>{value}</Text.Body>,
            props: { colSpan: fullColSpan },
          }
        }
        // Platform / seasonality / total label (not bold), wraps within the fixed width.
        return <Text.Body>{value}</Text.Body>
      },
    }

    const totalColumn = {
      title: <Text.Body><strong>Total</strong></Text.Body>,
      dataIndex: 'total',
      key: 'total',
      render: (value: string, record: MonthlyRow) => {
        if (record.isHeader) return { children: null, props: { colSpan: 0 } }
        return bold(value)
      },
    }

    const monthColumnsCfg = monthlyColumns.map(column => ({
      title: <Text.Body><strong>{column.label}</strong></Text.Body>,
      dataIndex: column.key,
      key: column.key,
      render: (value: string, record: MonthlyRow) => {
        if (record.isHeader) return { children: null, props: { colSpan: 0 } }
        return bold(value)
      },
    }))

    return [labelColumn, totalColumn, ...monthColumnsCfg]
  }, [monthlyColumns])

  const monthlyRowClassName = React.useCallback((record: MonthlyRow) => {
    if (record.rowType === 'category-header') return 'mediaplan-monthly-category-header'
    if (record.rowType === 'seasonality' || record.rowType === 'total') {
      return 'mediaplan-monthly-summary-row'
    }
    return ''
  }, [])

  if (loading) return <Spinner />

  const planTitle = generalSettings?.planInformation?.planName ?? plan.planName ?? 'Media Plan'

  const planOverviewTab = (
    <Container.Section>
      <DocHeader id='mediaplan_summary-doc_header'>
        <DocEyebrow id='mediaplan_summary-doc_advertiser-txt'>{plan.advertiserName}</DocEyebrow>
        <DocTitle id='mediaplan_summary-doc_title-txt'>{planTitle}</DocTitle>
        <DocBid id='mediaplan_summary-doc_bid-txt'>BID: {plan.bid}</DocBid>
      </DocHeader>

      <DocTable id='mediaplan_summary-investment-tbl'>
        {overviewDocRows.map(({ label, value, bold }, index) => (
          <DocTableRow key={label}>
            <DocTableLabel>
              <Text.Body id={`mediaplan_summary-doc_row_label-${index}-txt`}>
                {bold ? <strong>{label}</strong> : label}
              </Text.Body>
            </DocTableLabel>
            <DocTableValue>
              <Text.Body id={`mediaplan_summary-doc_row_value-${index}-txt`}>
                {bold ? <strong>{value}</strong> : value}
              </Text.Body>
            </DocTableValue>
          </DocTableRow>
        ))}
      </DocTable>

      <StrategyBlock id='mediaplan_summary-overall_strategy-blk'>
        <StrategyTitle>Overall Strategy</StrategyTitle>
        <StrategyTextArea
          id='mediaplan_summary-overall_strategy-txt'
          value={overallStrategy}
          disabled={isFormReadOnly}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setOverallStrategy(e.target.value)}
        />
      </StrategyBlock>

      <StrategyTable id='mediaplan_summary-strategy-tbl'>
        <StrategyHeaderRow>
          <div>Objective</div>
          <div>Media Type</div>
          <div>Channel Strategy</div>
        </StrategyHeaderRow>
        {STRATEGY_GROUPS.map(group => (
          <React.Fragment key={group.objective}>
            <StrategyGroupRow>{group.objective}</StrategyGroupRow>
            {group.entries.map((entry, entryIndex) => {
              const [leadToken, ...rest] = entry.mediaType.split(' ')
              const channel = resolveStrategyChannel(entry.mediaType)
              const isDisabled = channel !== 'OTHER' && Number(step3SpendByChannel.get(channel) ?? 0) <= 0
              return (
                <StrategyDataRow
                  key={`${group.objective}-${entry.mediaType}`}
                  aria-disabled={isDisabled}
                  disabled={isDisabled}
                >
                  <div>
                    <Text.Body id={`mediaplan_summary-strategy_objective-${group.objective}-${entryIndex}-txt`} />
                  </div>
                  <div>
                    <Text.Body id={`mediaplan_summary-strategy_media_type-${group.objective}-${entryIndex}-txt`}>
                      <strong>{leadToken}</strong>
                      {rest.length ? ` ${rest.join(' ')}` : ''}
                    </Text.Body>
                  </div>
                  <div>
                    <Text.Body id={`mediaplan_summary-strategy_channel-${group.objective}-${entryIndex}-txt`}>
                      {entry.strategy}
                    </Text.Body>
                  </div>
                </StrategyDataRow>
              )
            })}
          </React.Fragment>
        ))}
      </StrategyTable>

      <DocFooter id='mediaplan_summary-doc_footer-txt'>
        *Proprietary &amp; Confidential Media Plan*&nbsp;&nbsp;&nbsp;&nbsp;Not for use with any agency other than
        Amadeus&nbsp;&nbsp;&nbsp;&nbsp;*Proprietary &amp; Confidential Media Plan*
      </DocFooter>
    </Container.Section>
  )

  const monthlyBreakdownTab = (
    <Container.Section>
      <Text.H5 id='mediaplan_summary-monthly_breakdown-ttl'>Monthly Breakdown</Text.H5>
      <MonthlyTableWrap>
        <Table
          id='mediaplan_summary-monthly_breakdown-tbl'
          columns={monthlyTableColumns}
          dataSource={monthlyRows}
          rowKey='key'
          pagination={false}
          {...({ rowClassName: monthlyRowClassName } as any)}
        />
      </MonthlyTableWrap>
    </Container.Section>
  )

  const demand360Tab = (
    <Container.Section>
      <Text.H5 id='mediaplan_summary-demand360-ttl'>Demand 360 Market Data</Text.H5>
      <Text.Body id='mediaplan_summary-demand360-txt'>Demand 360 market data coming soon.</Text.Body>
    </Container.Section>
  )

  const googleDemandTab = (
    <Container.Section>
      <Text.H5 id='mediaplan_summary-google_demand-ttl'>Google Demand Market Data</Text.H5>
      <Text.Body id='mediaplan_summary-google_demand-txt'>Google demand market data coming soon.</Text.Body>
    </Container.Section>
  )

  // Single source of truth for tabs — used by both the on-screen Tab and the PDF layout.
  const TAB_DEFS: { key: string; title: string; content: React.ReactNode }[] = [
    { key: 'plan-overview', title: 'Plan Overview', content: planOverviewTab },
    { key: 'monthly-breakdown', title: 'Monthly Breakdown', content: monthlyBreakdownTab },
    { key: 'demand-360', title: 'Demand 360 Market Data', content: demand360Tab },
    { key: 'google-demand', title: 'Google Demand Market Data', content: googleDemandTab },
  ]

  const pdfTabs = TAB_DEFS.filter(t => pdfTabKeys.includes(t.key))

  const handleDownloadPdf = () => {
    setIsPdfModalOpen(false)
    // Let the modal close + print layout mount, then invoke the browser print dialog.
    window.setTimeout(() => window.print(), 150)
  }

  return (
    <MediaplannerWrapper>
      <div id='mediaplan_summary-breadcrumb-nav'>
        <Breadcrumb defaultHome items={[{ title: 'Media Plans', href: '/mediaplanner' }, { title: isNewPlan ? 'New Media Plan' : 'Media Plan Settings' }]} />
      </div>
      <PlanTitleHeader
        titleId='mediaplan_summary-ttl'
        title={planTitle}
        status={resolveHeaderStatus(savedStatus, false)}
        versionCount={versions.length}
        onOpenVersions={() => setIsVersionsOpen(true)}
      />
      <Stepper
        id='mediaplan_summary-stepper'
        current={3}
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
            status: 'finish',
            ...(isDetailsView && { onClick: () => navigate(`/mediaplanner/budget-distribution/${planId}`, { state: { isNewPlan } }) }),
          },
          { title: 'Media Plan', status: 'finish' },
        ]}
      />

      <ScreenOnly>
        <Tab
          id='mediaplan_summary-tabs-tab'
          activeKey={activeTabKey}
          onChange={setActiveTabKey}
          items={TAB_DEFS.map(t => ({
            key: t.key,
            label: <span id={`mediaplan_summary-tab_${t.key}-txt`}>{t.title}</span>,
            children: t.content,
          }))}
          {...({
            // Right-aligned action on the tab bar (Ant tabBarExtraContent passes through).
            tabBarExtraContent: (
              <Button
                id='mediaplan_summary-download_pdf-btn'
                variant='outlined'
                onClick={() => setIsPdfModalOpen(true)}
              >
                Download PDF
              </Button>
            ),
          } as any)}
        />
      </ScreenOnly>

      {/* PDF export: choose which tabs to include. */}
      <Modal
        idPrefix='mediaplan_summary-pdf_modal'
        title='Download PDF'
        open={isPdfModalOpen}
        okText='Download'
        cancelText='Cancel'
        onOk={handleDownloadPdf}
        onCancel={() => setIsPdfModalOpen(false)}
      >
        <Text.Body>Select the tabs to include. Each tab is exported as a page.</Text.Body>
        <PdfTabChoices>
          {TAB_DEFS.map(t => (
            <Checkbox
              key={t.key}
              id={`mediaplan_summary-pdf_tab-${t.key}-chk`}
              checked={pdfTabKeys.includes(t.key)}
              onChange={(e: { target: { checked: boolean } }) => togglePdfTab(t.key, e.target.checked)}
            >
              {t.title}
            </Checkbox>
          ))}
        </PdfTabChoices>
      </Modal>

      {/* Print-only layout: selected tabs stacked as pages. */}
      <PrintOnly aria-hidden='true'>
        {pdfTabs.map(t => (
          <PrintPage key={t.key}>
            {t.content}
          </PrintPage>
        ))}
      </PrintOnly>

      <StickyFooter>
        <Button href='/mediaplanner' variant='outlined' id='mediaplan_summary_cancel-btn'>
          Cancel
        </Button>
        {!isFormReadOnly && (
          <Button href='/mediaplanner' id='mediaplan_summary_submit-btn'>
            Complete
          </Button>
        )}
      </StickyFooter>

      <PlanVersionsDrawer
        planId={planId}
        isOpen={isVersionsOpen}
        onClose={() => setIsVersionsOpen(false)}
        captureSnapshot={captureVersionSnapshot}
        onView={() => {
          /* Read-only summary — no editable state to restore in place. */
        }}
      />
    </MediaplannerWrapper>
  )
}

export default MediaplannerDownloadSummary
