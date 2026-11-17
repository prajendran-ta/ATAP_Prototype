import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Grid from 'antd/es/grid'
import Layout from 'antd/es/layout'
import SectionLayout from '@mediahub/mediahub-ui/pages/Home/SectionLayout'
import HomeModules from '@mediahub/mediahub-ui/pages/Home/HomeModules'
import MediaPlannerClosedWonNotification from './MediaPlannerClosedWonNotification'
import MediaPlannerGrowthOpportunityNotification from './MediaPlannerGrowthOpportunityNotification'
import { Notifications } from '@mediahub/mediahub-ui/components/Notifications'
import { CopilotWidget } from '@mediahub/mediahub-ui/components/CopilotWidget'
import { AmadeusMaxPanel } from '@mediahub/mediahub-ui/components/AmadeusMaxPanel'
import { CampaignCreationCanvas } from '@mediahub/mediahub-ui/components/CampaignCreationCanvas/CampaignCreationCanvas'
import MediaPlanCanvas from '@mediahub/mediahub-ui/components/MediaPlanCanvas/MediaPlanCanvas'
import {
  setCampaignWorkspaceOpen,
  useCampaignFlowState,
} from '@mediahub/mediahub-ui/components/CampaignFlow/campaignFlowStore'
import {
  Page,
  LeftCol,
  RightCol,
  CarouselSection,
  SidePanelViewport,
  MetricsPanel,
  MetricsPanelTitle,
  MetricsTabButton,
  MetricsTablePanelBody,
  MetricsTabs,
  MetricsTableWrap,
  MetricsTable,
  MetricsTableHeadCell,
  MetricsTableCell,
  MetricsTrend,
  MetricsVisualAxisColumn,
  MetricsVisualAxisLabel,
  MetricsVisualAxisTicks,
  MetricsVisualBar,
  MetricsVisualBarGroup,
  MetricsVisualBarsColumn,
  MetricsVisualBarsTrack,
  MetricsVisualChartRow,
  MetricsVisualChartSection,
  MetricsVisualContainer,
  MetricsVisualHeader,
  MetricsVisualLabel,
  MetricsVisualLabelsRow,
  MetricsVisualLegend,
  MetricsVisualLegendItem,
  MetricsVisualLegendSwatch,
  MetricsVisualPeriod,
  MetricsVisualUpdatedAt,
  FloatingPanelOverlay,
  HomeMaxResizeHandle,
} from './Home.styled'
import { Text } from '@amadeus/react-design-factory'
import WelcomeModal from './WelcomeModal'
import { useLocation, useNavigate } from 'react-router'

const { Content } = Layout
const { useBreakpoint } = Grid
const RIGHT_PANEL_STORAGE_KEY = 'mediahub.rightPanel.active'
const MAX_PANEL_WIDTH_STORAGE_KEY = 'mediahub.amadeusMax.panelWidth.v2'
const DEFAULT_PANEL_WIDTH = 360
const MIN_PANEL_WIDTH = 300
const MAX_PANEL_WIDTH = 800

// Largest the Amadeus Max panel can be resized to: up to MAX_PANEL_WIDTH (800px),
// but never wider than the viewport.
const getMaxPanelWidth = () => (typeof window === 'undefined' ? MAX_PANEL_WIDTH : Math.min(MAX_PANEL_WIDTH, window.innerWidth))

type RightPanelType = 'amadeus-max' | 'ai-chat' | 'notifications'

const isRightPanelType = (value: string | null): value is RightPanelType => {
  return value === 'amadeus-max' || value === 'ai-chat' || value === 'notifications'
}

type AdvertiserMetricCell = {
  value: number
  changePercent: number
}

type AdvertiserPerformanceRow = {
  advertiser: string
  impressions: AdvertiserMetricCell
  spend: AdvertiserMetricCell
  bookings: AdvertiserMetricCell
  roas: AdvertiserMetricCell
}

const chartAdvertiserPerformanceRows: AdvertiserPerformanceRow[] = [
  {
    advertiser: 'Marriott Hotels',
    impressions: { value: 1850000, changePercent: 14.2 },
    spend: { value: 25600, changePercent: -9.2 },
    bookings: { value: 385000, changePercent: 12.6 },
    roas: { value: 3.7, changePercent: 24.1 },
  },
  {
    advertiser: 'Hilton Worldwide',
    impressions: { value: 1420000, changePercent: 2.9 },
    spend: { value: 19800, changePercent: 7.0 },
    bookings: { value: 292000, changePercent: 6.2 },
    roas: { value: 3.2, changePercent: -0.8 },
  },
  {
    advertiser: 'IHG Hotels & Resorts',
    impressions: { value: 980000, changePercent: 15.3 },
    spend: { value: 13700, changePercent: -9.9 },
    bookings: { value: 201000, changePercent: 8.6 },
    roas: { value: 3.0, changePercent: 20.4 },
  },
  {
    advertiser: 'Hyatt Hotels',
    impressions: { value: 750000, changePercent: 4.2 },
    spend: { value: 10500, changePercent: 7.1 },
    bookings: { value: 158000, changePercent: 9.0 },
    roas: { value: 2.9, changePercent: 1.8 },
  },
  {
    advertiser: 'Accor Hotels',
    impressions: { value: 540000, changePercent: -6.9 },
    spend: { value: 7600, changePercent: -6.2 },
    bookings: { value: 118000, changePercent: -5.6 },
    roas: { value: 2.6, changePercent: 0.7 },
  },
  {
    advertiser: 'Wyndham Hotels',
    impressions: { value: 385000, changePercent: -3.8 },
    spend: { value: 5400, changePercent: -6.9 },
    bookings: { value: 82000, changePercent: -6.8 },
    roas: { value: 2.8, changePercent: 0.1 },
  },
  {
    advertiser: 'Choice Hotels',
    impressions: { value: 320000, changePercent: 10.3 },
    spend: { value: 4500, changePercent: 7.1 },
    bookings: { value: 68000, changePercent: 9.7 },
    roas: { value: 2.9, changePercent: 2.4 },
  },
  {
    advertiser: 'Best Western',
    impressions: { value: 295000, changePercent: -4.8 },
    spend: { value: 4100, changePercent: -4.7 },
    bookings: { value: 61000, changePercent: -6.2 },
    roas: { value: 2.7, changePercent: -1.1 },
  },
  {
    advertiser: 'Radisson Hotel Group',
    impressions: { value: 185000, changePercent: 5.7 },
    spend: { value: 2600, changePercent: 8.3 },
    bookings: { value: 38000, changePercent: 8.6 },
    roas: { value: 2.5, changePercent: -2.5 },
  },
  {
    advertiser: 'Four Seasons',
    impressions: { value: 165000, changePercent: 6.5 },
    spend: { value: 2300, changePercent: 9.5 },
    bookings: { value: 52000, changePercent: 8.3 },
    roas: { value: 2.4, changePercent: -3.2 },
  },
]

const advertiserPerformanceRows: AdvertiserPerformanceRow[] = [...chartAdvertiserPerformanceRows]

const formatCompactNumber = (value: number) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `${Math.round(value / 1000)}K`
  return `${value}`
}

const formatCurrency = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `$${Math.round(value / 1000)}K`
  return `$${value}`
}

const formatRoaS = (value: number) => `${value.toFixed(1)}x`

const getTrendKind = (
  changePercent: number,
  options?: {
    invert?: boolean
  },
) => {
  if (Math.abs(changePercent) < 0.1) return 'neutral' as const
  const isPositive = options?.invert ? changePercent < 0 : changePercent > 0
  return isPositive ? ('positive' as const) : ('negative' as const)
}

const formatChangePercent = (value: number) => `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`

const getTrendSymbol = (trendKind: 'positive' | 'negative' | 'neutral') => {
  if (trendKind === 'neutral') return '•'
  return trendKind === 'positive' ? '▲' : '▼'
}

type MetricsVisualDatum = {
  advertiser: string
  spend: {
    lastYear: number
    currentYear: number
  }
  bookings: {
    lastYear: number
    currentYear: number
  }
  roas: {
    lastYear: number
    currentYear: number
  }
  revenue: {
    lastYear: number
    currentYear: number
  }
}

type MetricsVisualKpiKey = keyof Omit<MetricsVisualDatum, 'advertiser'>

type MetricsVisualScale = {
  maxValue: number
  tickLabels: string[]
}

type MetricsVisualProfile = {
  spendCurrent: number
  spendChangePercent: number
  bookingsCurrent: number
  bookingsChangePercent: number
  roasCurrent: number
  roasChangePercent: number
}

const deriveLastYearValue = (currentValue: number, changePercent: number) => {
  const denominator = 1 + changePercent / 100
  if (denominator <= 0) return currentValue
  return currentValue / denominator
}

const metricsVisualKpis: MetricsVisualKpiKey[] = ['spend', 'bookings', 'roas', 'revenue']

const getScaleStep = (metricKey: MetricsVisualKpiKey, rawMaxValue: number) => {
  if (metricKey === 'roas') {
    if (rawMaxValue <= 2.5) return 0.25
    if (rawMaxValue <= 4.0) return 0.5
    return 1
  }

  if (metricKey === 'bookings') {
    if (rawMaxValue <= 120000) return 10000
    if (rawMaxValue <= 260000) return 25000
    return 50000
  }

  if (rawMaxValue <= 1600000) return 200000
  if (rawMaxValue <= 3500000) return 250000
  return 500000
}

const formatAxisTickLabel = (metricKey: MetricsVisualKpiKey, value: number) => {
  if (value === 0) return '0'

  if (metricKey === 'roas') {
    const rounded = value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)
    return `${rounded}x`
  }

  if (metricKey === 'bookings') {
    if (value >= 1000) {
      const inThousands = value / 1000
      return Number.isInteger(inThousands) ? `${inThousands.toFixed(0)}K` : `${inThousands.toFixed(1)}K`
    }
    return `${Math.round(value)}`
  }

  if (value >= 1000000) {
    const inMillions = value / 1000000
    return Number.isInteger(inMillions) ? `${inMillions.toFixed(0)}M` : `${inMillions.toFixed(1)}M`
  }

  const inThousands = value / 1000
  return Number.isInteger(inThousands) ? `${inThousands.toFixed(0)}K` : `${inThousands.toFixed(1)}K`
}

const buildMetricScale = (metricKey: MetricsVisualKpiKey, rawMaxValue: number): MetricsVisualScale => {
  const step = getScaleStep(metricKey, rawMaxValue)
  const maxWithHeadroom = rawMaxValue * 1.12
  const maxValue = Math.ceil(maxWithHeadroom / step) * step
  const quarterStep = maxValue / 4

  return {
    maxValue,
    tickLabels: [4, 3, 2, 1, 0].map(multiplier => formatAxisTickLabel(metricKey, quarterStep * multiplier)),
  }
}

const metricsVisualProfiles: MetricsVisualProfile[] = [
  {
    spendCurrent: 4200000,
    spendChangePercent: 11.4,
    bookingsCurrent: 402000,
    bookingsChangePercent: 12.6,
    roasCurrent: 4.1,
    roasChangePercent: 10.8,
  },
  {
    spendCurrent: 3650000,
    spendChangePercent: -3.6,
    bookingsCurrent: 338000,
    bookingsChangePercent: 5.2,
    roasCurrent: 3.7,
    roasChangePercent: -1.4,
  },
  {
    spendCurrent: 2980000,
    spendChangePercent: 7.8,
    bookingsCurrent: 276000,
    bookingsChangePercent: 8.9,
    roasCurrent: 3.4,
    roasChangePercent: 6.1,
  },
  {
    spendCurrent: 2410000,
    spendChangePercent: 2.9,
    bookingsCurrent: 221000,
    bookingsChangePercent: 4.4,
    roasCurrent: 3.1,
    roasChangePercent: 1.8,
  },
  {
    spendCurrent: 1870000,
    spendChangePercent: -6.8,
    bookingsCurrent: 178000,
    bookingsChangePercent: -4.1,
    roasCurrent: 2.8,
    roasChangePercent: -2.4,
  },
  {
    spendCurrent: 1540000,
    spendChangePercent: -2.7,
    bookingsCurrent: 146000,
    bookingsChangePercent: -1.9,
    roasCurrent: 2.9,
    roasChangePercent: 0.9,
  },
  {
    spendCurrent: 1260000,
    spendChangePercent: 4.2,
    bookingsCurrent: 119000,
    bookingsChangePercent: 6.4,
    roasCurrent: 3.0,
    roasChangePercent: 2.1,
  },
  {
    spendCurrent: 980000,
    spendChangePercent: -4.9,
    bookingsCurrent: 98000,
    bookingsChangePercent: -5.3,
    roasCurrent: 2.6,
    roasChangePercent: -1.7,
  },
  {
    spendCurrent: 760000,
    spendChangePercent: 1.6,
    bookingsCurrent: 77000,
    bookingsChangePercent: 2.2,
    roasCurrent: 2.5,
    roasChangePercent: -0.9,
  },
  {
    spendCurrent: 640000,
    spendChangePercent: -5.4,
    bookingsCurrent: 69000,
    bookingsChangePercent: -3.8,
    roasCurrent: 2.3,
    roasChangePercent: -2.6,
  },
]

const buildFallbackMetricsProfile = (row: AdvertiserPerformanceRow): MetricsVisualProfile => ({
  spendCurrent: Math.round(row.spend.value * 300),
  spendChangePercent: row.spend.changePercent,
  bookingsCurrent: Math.round(row.bookings.value),
  bookingsChangePercent: row.bookings.changePercent,
  roasCurrent: Number(row.roas.value.toFixed(2)),
  roasChangePercent: row.roas.changePercent,
})

const metricsVisualData: MetricsVisualDatum[] = chartAdvertiserPerformanceRows.map((row, index) => {
  const profile = metricsVisualProfiles[index] ?? buildFallbackMetricsProfile(row)
  const spendCurrent = profile.spendCurrent
  const spendLastYear = Math.round(deriveLastYearValue(spendCurrent, profile.spendChangePercent))

  const bookingsCurrent = profile.bookingsCurrent
  const bookingsLastYear = Math.round(deriveLastYearValue(bookingsCurrent, profile.bookingsChangePercent))

  const roasCurrent = Number(profile.roasCurrent.toFixed(2))
  const roasLastYear = Number(deriveLastYearValue(roasCurrent, profile.roasChangePercent).toFixed(2))

  const revenueCurrent = Math.round(bookingsCurrent * roasCurrent * 3.0)
  const revenueLastYear = Math.round(bookingsLastYear * roasLastYear * 3.0)

  return {
    advertiser: row.advertiser,
    spend: {
      lastYear: spendLastYear,
      currentYear: spendCurrent,
    },
    bookings: {
      lastYear: bookingsLastYear,
      currentYear: bookingsCurrent,
    },
    roas: {
      lastYear: roasLastYear,
      currentYear: roasCurrent,
    },
    revenue: {
      lastYear: revenueLastYear,
      currentYear: revenueCurrent,
    },
  }
})

const metricScales: Record<MetricsVisualKpiKey, MetricsVisualScale> = metricsVisualKpis.reduce(
  (accumulator, metricKey) => {
    const rawMaxValue = Math.max(
      ...metricsVisualData.map(dataPoint => Math.max(dataPoint[metricKey].lastYear, dataPoint[metricKey].currentYear)),
    )

    accumulator[metricKey] = buildMetricScale(metricKey, rawMaxValue)
    return accumulator
  },
  {} as Record<MetricsVisualKpiKey, MetricsVisualScale>,
)

const getPerformanceScore = (row: AdvertiserPerformanceRow) => {
  const impressionsScore = row.impressions.changePercent
  const spendScore = -row.spend.changePercent
  const bookingsScore = row.bookings.changePercent
  const roasScore = row.roas.changePercent

  return impressionsScore * 0.2 + spendScore * 0.2 + bookingsScore * 0.3 + roasScore * 0.3
}

const Home: React.FC = () => {
  const { t } = useTranslation(['home', 'common'])
  const screens = useBreakpoint()
  const twoCols = !!screens.lg
  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search)
  const selectedPanel = searchParams.get('panel')
  const selectedLayoutMode = searchParams.get('layout')
  const persistedPanel =
    !selectedPanel && typeof window !== 'undefined' ? window.sessionStorage.getItem(RIGHT_PANEL_STORAGE_KEY) : null
  const homePanel: RightPanelType = isRightPanelType(selectedPanel)
    ? selectedPanel
    : isRightPanelType(persistedPanel)
      ? persistedPanel
      : 'notifications'
  const showAmadeusMax = homePanel === 'amadeus-max'
  const showAiChat = homePanel === 'ai-chat'
  const showNotifications = !showAiChat && !showAmadeusMax
  const isFullScreenPanel = showAmadeusMax && selectedLayoutMode === 'full-screen'
  const [metricsTab, setMetricsTab] = useState<'kpi-trends' | 'top-performers' | 'underperformers' | 'comparison'>(
    'kpi-trends',
  )
  const [isFloatingMaxOpen, setIsFloatingMaxOpen] = useState(false)
  const { aiWorkspaceMode: isCampaignCanvasOpen, aiWorkspaceType } = useCampaignFlowState()
  const setIsCampaignCanvasOpen = setCampaignWorkspaceOpen
  const [maxPanelWidth, setMaxPanelWidth] = useState(() =>
    typeof window === 'undefined'
      ? 360
      : Math.max(
          MIN_PANEL_WIDTH,
          Math.min(
            getMaxPanelWidth(),
            Number(window.sessionStorage.getItem(MAX_PANEL_WIDTH_STORAGE_KEY)) || 360,
          ),
        ),
  )

  useEffect(() => {
    window.sessionStorage.setItem(MAX_PANEL_WIDTH_STORAGE_KEY, String(maxPanelWidth))
  }, [maxPanelWidth])

  const homePanelWidth = showAmadeusMax ? maxPanelWidth : DEFAULT_PANEL_WIDTH

  const handleMaxPanelResizeStart = (event: React.PointerEvent<HTMLSpanElement>) => {
    event.preventDefault()
    const startX = event.clientX
    const startWidth = maxPanelWidth

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const maxWidth = Math.max(MIN_PANEL_WIDTH, getMaxPanelWidth())
      const nextWidth = startWidth + (startX - moveEvent.clientX)
      setMaxPanelWidth(Math.min(maxWidth, Math.max(MIN_PANEL_WIDTH, nextWidth)))
    }

    const handlePointerUp = () => {
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }

    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
  }

  const rankedAdvertisers = [...advertiserPerformanceRows].sort(
    (firstRow, secondRow) => getPerformanceScore(secondRow) - getPerformanceScore(firstRow),
  )
  const needsAttentionAdvertisers = [...advertiserPerformanceRows]
    .sort((firstRow, secondRow) => firstRow.roas.changePercent - secondRow.roas.changePercent)
    .slice(0, 10)
  const topSpendersAdvertisers = [...advertiserPerformanceRows]
    .sort((firstRow, secondRow) => secondRow.spend.value - firstRow.spend.value)
    .slice(0, 10)
  const underperformers = rankedAdvertisers.slice(-4).reverse()

  const renderVisualChartRow = (metricLabel: string, metricKey: MetricsVisualKpiKey) => (
    <MetricsVisualChartRow>
      <MetricsVisualAxisColumn>
        <MetricsVisualAxisTicks>
          {metricScales[metricKey].tickLabels.map(tickLabel => (
            <div key={`${metricLabel}-${tickLabel}`}>{tickLabel}</div>
          ))}
        </MetricsVisualAxisTicks>
        <MetricsVisualAxisLabel>{metricLabel}</MetricsVisualAxisLabel>
      </MetricsVisualAxisColumn>
      <MetricsVisualBarsColumn>
        <MetricsVisualBarsTrack>
          {metricsVisualData.map((dataPoint, index) => (
            <MetricsVisualBarGroup key={`${metricLabel}-${index + 1}`}>
              <MetricsVisualBar
                kind='last-year'
                heightPercent={(dataPoint[metricKey].lastYear / metricScales[metricKey].maxValue) * 100}
              />
              <MetricsVisualBar
                kind='current-year'
                heightPercent={(dataPoint[metricKey].currentYear / metricScales[metricKey].maxValue) * 100}
              />
            </MetricsVisualBarGroup>
          ))}
        </MetricsVisualBarsTrack>
        <MetricsVisualLabelsRow>
          {metricsVisualData.map((dataPoint, index) => (
            <MetricsVisualLabel key={`${metricLabel}-label-${index + 1}`}>{dataPoint.advertiser}</MetricsVisualLabel>
          ))}
        </MetricsVisualLabelsRow>
      </MetricsVisualBarsColumn>
    </MetricsVisualChartRow>
  )

  const handleCloseChatPanel = () => {
    navigate({ pathname: '/', search: '?panel=notifications' })
  }

  const handleAmadeusMaxLayoutChange = (layoutMode: 'sidebar' | 'full-screen' | 'floating') => {
    if (layoutMode === 'floating') {
      setIsFloatingMaxOpen(true)
      navigate({ pathname: '/', search: '?panel=notifications' })
      return
    }

    setIsFloatingMaxOpen(false)
    const nextParams = new URLSearchParams(location.search)
    nextParams.set('panel', 'amadeus-max')
    nextParams.set('layout', layoutMode)
    navigate({ pathname: '/', search: `?${nextParams.toString()}` })
  }

  return (
    <>
      <WelcomeModal />
      <Page
        as={Content}
        twoCols={twoCols}
        fullScreen={isFullScreenPanel && !isCampaignCanvasOpen}
        panelWidth={homePanelWidth}
      >
        <LeftCol
          twoCols={twoCols}
          fullScreen={isFullScreenPanel && !isCampaignCanvasOpen}
          campaignCanvas={isCampaignCanvasOpen}
        >
          {isCampaignCanvasOpen ? (
            aiWorkspaceType === 'media-plan' ? <MediaPlanCanvas /> : <CampaignCreationCanvas />
          ) : null}
          <Text.H3>{'Welcome to Amadeus travel advertising platform'}</Text.H3>
          <SectionLayout title='Advertiser Performance Metrics' titleStyle={{ fontSize: 14 }}>
            <CarouselSection>
              <MetricsTabs>
                <MetricsTabButton
                  active={metricsTab === 'kpi-trends'}
                  type='button'
                  onClick={() => setMetricsTab('kpi-trends')}
                >
                  Needs attention
                </MetricsTabButton>
                <MetricsTabButton
                  active={metricsTab === 'top-performers'}
                  type='button'
                  onClick={() => setMetricsTab('top-performers')}
                >
                  Top Spenders
                </MetricsTabButton>
                <MetricsTabButton
                  active={metricsTab === 'underperformers'}
                  type='button'
                  onClick={() => setMetricsTab('underperformers')}
                >
                  Spend & Booking
                </MetricsTabButton>
                <MetricsTabButton
                  active={metricsTab === 'comparison'}
                  type='button'
                  onClick={() => setMetricsTab('comparison')}
                >
                  ROAS & Revenue
                </MetricsTabButton>
              </MetricsTabs>
              {(metricsTab === 'kpi-trends' || metricsTab === 'top-performers') && (
                <MetricsVisualPeriod>Time Period - Last 30 Days (01-Jan-2026 to 30-Jan-2026)</MetricsVisualPeriod>
              )}
              {metricsTab === 'kpi-trends' ? (
                <>
                  <MetricsTableWrap>
                    <MetricsTable>
                      <thead>
                        <tr>
                          <MetricsTableHeadCell>Advertiser</MetricsTableHeadCell>
                          <MetricsTableHeadCell>Impressions</MetricsTableHeadCell>
                          <MetricsTableHeadCell>Impr YoY</MetricsTableHeadCell>
                          <MetricsTableHeadCell>Spend</MetricsTableHeadCell>
                          <MetricsTableHeadCell>Spend YoY</MetricsTableHeadCell>
                          <MetricsTableHeadCell>Bookings</MetricsTableHeadCell>
                          <MetricsTableHeadCell>Bookings YoY</MetricsTableHeadCell>
                          <MetricsTableHeadCell>ROAS</MetricsTableHeadCell>
                          <MetricsTableHeadCell>ROAS YoY</MetricsTableHeadCell>
                        </tr>
                      </thead>
                      <tbody>
                        {needsAttentionAdvertisers.map(row => (
                          <tr key={row.advertiser}>
                            <MetricsTableCell>{row.advertiser}</MetricsTableCell>
                            <MetricsTableCell>{formatCompactNumber(row.impressions.value)}</MetricsTableCell>
                            <MetricsTableCell>
                              <MetricsTrend trendKind={getTrendKind(row.impressions.changePercent)}>
                                {getTrendSymbol(getTrendKind(row.impressions.changePercent))}{' '}
                                {formatChangePercent(row.impressions.changePercent)}
                              </MetricsTrend>
                            </MetricsTableCell>
                            <MetricsTableCell>{formatCurrency(row.spend.value)}</MetricsTableCell>
                            <MetricsTableCell>
                              <MetricsTrend trendKind={getTrendKind(row.spend.changePercent, { invert: true })}>
                                {getTrendSymbol(getTrendKind(row.spend.changePercent, { invert: true }))}{' '}
                                {formatChangePercent(row.spend.changePercent)}
                              </MetricsTrend>
                            </MetricsTableCell>
                            <MetricsTableCell>{formatCompactNumber(row.bookings.value)}</MetricsTableCell>
                            <MetricsTableCell>
                              <MetricsTrend trendKind={getTrendKind(row.bookings.changePercent)}>
                                {getTrendSymbol(getTrendKind(row.bookings.changePercent))}{' '}
                                {formatChangePercent(row.bookings.changePercent)}
                              </MetricsTrend>
                            </MetricsTableCell>
                            <MetricsTableCell>{formatRoaS(row.roas.value)}</MetricsTableCell>
                            <MetricsTableCell>
                              <MetricsTrend trendKind={getTrendKind(row.roas.changePercent)}>
                                {getTrendSymbol(getTrendKind(row.roas.changePercent))}{' '}
                                {formatChangePercent(row.roas.changePercent)}
                              </MetricsTrend>
                            </MetricsTableCell>
                          </tr>
                        ))}
                      </tbody>
                    </MetricsTable>
                  </MetricsTableWrap>
                  <MetricsVisualUpdatedAt>Data last updated on: 31-Jan-2026</MetricsVisualUpdatedAt>
                </>
              ) : metricsTab === 'top-performers' ? (
                <>
                  <MetricsPanel>
                    <MetricsTablePanelBody>
                      <MetricsTable>
                        <thead>
                          <tr>
                            <MetricsTableHeadCell>Advertiser</MetricsTableHeadCell>
                            <MetricsTableHeadCell>ROAS</MetricsTableHeadCell>
                            <MetricsTableHeadCell>ROAS YoY</MetricsTableHeadCell>
                            <MetricsTableHeadCell>Spend</MetricsTableHeadCell>
                            <MetricsTableHeadCell>Spend YoY</MetricsTableHeadCell>
                            <MetricsTableHeadCell>Impressions</MetricsTableHeadCell>
                            <MetricsTableHeadCell>Impr YoY</MetricsTableHeadCell>
                            <MetricsTableHeadCell>Bookings</MetricsTableHeadCell>
                            <MetricsTableHeadCell>Bookings YoY</MetricsTableHeadCell>
                          </tr>
                        </thead>
                        <tbody>
                          {topSpendersAdvertisers.map(row => (
                            <tr key={`top-${row.advertiser}`}>
                              <MetricsTableCell>{row.advertiser}</MetricsTableCell>
                              <MetricsTableCell>{formatRoaS(row.roas.value)}</MetricsTableCell>
                              <MetricsTableCell>
                                <MetricsTrend trendKind={getTrendKind(row.roas.changePercent)}>
                                  {getTrendSymbol(getTrendKind(row.roas.changePercent))}{' '}
                                  {formatChangePercent(row.roas.changePercent)}
                                </MetricsTrend>
                              </MetricsTableCell>
                              <MetricsTableCell>{formatCurrency(row.spend.value)}</MetricsTableCell>
                              <MetricsTableCell>
                                <MetricsTrend trendKind={getTrendKind(row.spend.changePercent, { invert: true })}>
                                  {getTrendSymbol(getTrendKind(row.spend.changePercent, { invert: true }))}{' '}
                                  {formatChangePercent(row.spend.changePercent)}
                                </MetricsTrend>
                              </MetricsTableCell>
                              <MetricsTableCell>{formatCompactNumber(row.impressions.value)}</MetricsTableCell>
                              <MetricsTableCell>
                                <MetricsTrend trendKind={getTrendKind(row.impressions.changePercent)}>
                                  {getTrendSymbol(getTrendKind(row.impressions.changePercent))}{' '}
                                  {formatChangePercent(row.impressions.changePercent)}
                                </MetricsTrend>
                              </MetricsTableCell>
                              <MetricsTableCell>{formatCompactNumber(row.bookings.value)}</MetricsTableCell>
                              <MetricsTableCell>
                                <MetricsTrend trendKind={getTrendKind(row.bookings.changePercent)}>
                                  {getTrendSymbol(getTrendKind(row.bookings.changePercent))}{' '}
                                  {formatChangePercent(row.bookings.changePercent)}
                                </MetricsTrend>
                              </MetricsTableCell>
                            </tr>
                          ))}
                        </tbody>
                      </MetricsTable>
                    </MetricsTablePanelBody>
                  </MetricsPanel>
                  <MetricsVisualUpdatedAt>Data last updated on: 31-Jan-2026</MetricsVisualUpdatedAt>
                </>
              ) : metricsTab === 'underperformers' ? (
                <MetricsVisualContainer>
                  <MetricsVisualHeader>
                    <MetricsVisualPeriod>Time Period - Last 30 Days (01-Jan-2026 to 30-Jan-2026)</MetricsVisualPeriod>
                    <MetricsVisualLegend>
                      <MetricsVisualLegendItem>
                        <MetricsVisualLegendSwatch kind='last-year' />
                        Last Year
                      </MetricsVisualLegendItem>
                      <MetricsVisualLegendItem>
                        <MetricsVisualLegendSwatch kind='current-year' />
                        Current Year
                      </MetricsVisualLegendItem>
                    </MetricsVisualLegend>
                  </MetricsVisualHeader>
                  <MetricsVisualChartSection>
                    {renderVisualChartRow('Spend', 'spend')}
                    {renderVisualChartRow('Bookings', 'bookings')}
                  </MetricsVisualChartSection>
                  <MetricsVisualUpdatedAt>Data last updated on: 31-Jan-2026</MetricsVisualUpdatedAt>
                </MetricsVisualContainer>
              ) : (
                <MetricsVisualContainer>
                  <MetricsVisualHeader>
                    <MetricsVisualPeriod>Time Period - Last 30 Days (01-Jan-2026 to 30-Jan-2026)</MetricsVisualPeriod>
                    <MetricsVisualLegend>
                      <MetricsVisualLegendItem>
                        <MetricsVisualLegendSwatch kind='last-year' />
                        Last Year
                      </MetricsVisualLegendItem>
                      <MetricsVisualLegendItem>
                        <MetricsVisualLegendSwatch kind='current-year' />
                        Current Year
                      </MetricsVisualLegendItem>
                    </MetricsVisualLegend>
                  </MetricsVisualHeader>
                  <MetricsVisualChartSection>
                    {renderVisualChartRow('ROAS', 'roas')}
                    {renderVisualChartRow('Revenue', 'revenue')}
                  </MetricsVisualChartSection>
                  <MetricsVisualUpdatedAt>Data last updated on: 31-Jan-2026</MetricsVisualUpdatedAt>
                </MetricsVisualContainer>
              )}
            </CarouselSection>
          </SectionLayout>
          <SectionLayout title={t('home:modules')}>
            <HomeModules />
          </SectionLayout>
        </LeftCol>
        <RightCol twoCols={twoCols} fullScreen={isFullScreenPanel}>
          <SidePanelViewport twoCols={twoCols} fullScreen={isFullScreenPanel}>
            {showAiChat ? (
              <CopilotWidget
                titleText='AskMia'
                displayMode='inline'
                showTrigger={false}
                onClosePanel={handleCloseChatPanel}
              />
            ) : showAmadeusMax ? (
              <AmadeusMaxPanel
                onClosePanel={handleCloseChatPanel}
                layoutMode={selectedLayoutMode === 'full-screen' ? 'full-screen' : 'sidebar'}
                onLayoutModeChange={handleAmadeusMaxLayoutChange}
                onCampaignCanvasChange={setIsCampaignCanvasOpen}
                campaignCanvasOpen={isCampaignCanvasOpen}
              />
            ) : (
              <div style={{ paddingTop: 24, paddingRight: 24 }}>
                <SectionLayout title='Notifications' link={{ enabled: true, url: '/notifications', title: 'View All' }}>
                  <Notifications
                    contractExtraContent={<MediaPlannerClosedWonNotification />}
                    performanceExtraContent={<MediaPlannerGrowthOpportunityNotification />}
                  />
                </SectionLayout>
              </div>
            )}
            {showAmadeusMax && !isFullScreenPanel && !isFloatingMaxOpen ? (
              <HomeMaxResizeHandle onPointerDown={handleMaxPanelResizeStart} aria-label='Resize Amadeus Max panel' />
            ) : null}
          </SidePanelViewport>
        </RightCol>
      </Page>
      {isFloatingMaxOpen ? (
        <FloatingPanelOverlay>
          <AmadeusMaxPanel
            onClosePanel={() => setIsFloatingMaxOpen(false)}
            layoutMode='floating'
            onLayoutModeChange={handleAmadeusMaxLayoutChange}
            onCampaignCanvasChange={setIsCampaignCanvasOpen}
            campaignCanvasOpen={isCampaignCanvasOpen}
          />
        </FloatingPanelOverlay>
      ) : null}
    </>
  )
}

export default Home