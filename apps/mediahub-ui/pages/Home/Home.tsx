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
import { chartAdvertisers, needsAttentionRows, topSpenderRows } from './advertiserPerformance'
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

const metricsVisualData: MetricsVisualDatum[] = chartAdvertisers.map(({ row, profile }) => {
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
                        {needsAttentionRows.map(row => (
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
                          {topSpenderRows.map(row => (
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