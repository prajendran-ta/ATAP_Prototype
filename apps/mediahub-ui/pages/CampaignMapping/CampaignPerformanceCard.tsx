import React, { useMemo } from 'react'
import { Text, colors } from '@amadeus/react-design-factory'
import * as Styled from './CampaignPerformanceCard.styled'

/**
 * Last-30-days performance of a campaign (impressions, clicks, spend) as three small line charts in one row.
 * Prototype data: deterministic per campaign ID, scaled to the campaign's budget and typical channel costs.
 */
type CampaignPerformanceCardProps = {
  campaignId: string
  platform: string
  status: 'live' | 'pause' | 'unknown'
  /** Campaign budget label, e.g. '£60,000' (spread over a year). */
  budget?: string
}

type DailyPoint = { date: Date; impressions: number; clicks: number; spend: number }

const DAYS = 30

// Typical cost per thousand impressions (£) and click-through rate by platform.
const CHANNEL_COSTS: Record<string, { cpm: number; ctr: number }> = {
  SA360: { cpm: 38, ctr: 0.062 },
  Bing: { cpm: 30, ctr: 0.055 },
  'Amadeus DSP': { cpm: 4.5, ctr: 0.0035 },
  CM360: { cpm: 5, ctr: 0.003 },
  DV360: { cpm: 11, ctr: 0.006 },
  DerbySoft: { cpm: 22, ctr: 0.032 },
  WIHP: { cpm: 18, ctr: 0.028 },
  Meta: { cpm: 7, ctr: 0.011 },
}

// Small seeded pseudo-random generator so a campaign always shows the same numbers.
const seededRandom = (seed: string) => {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619)
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507)
    h = Math.imul(h ^ (h >>> 13), 3266489909)
    h ^= h >>> 16
    return (h >>> 0) / 4294967296
  }
}

const parseBudget = (budget?: string) => Number((budget ?? '').replace(/[^0-9.]/g, '')) || 20000

const buildDailyPerformance = ({ campaignId, platform, status, budget }: CampaignPerformanceCardProps) => {
  const random = seededRandom(campaignId)
  const { cpm, ctr } = CHANNEL_COSTS[platform] ?? { cpm: 10, ctr: 0.01 }
  const dailySpend = parseBudget(budget) / 365
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Array.from({ length: DAYS }, (_, index): DailyPoint => {
    const date = new Date(today)
    date.setDate(today.getDate() - (DAYS - 1 - index))
    const weekend = date.getDay() === 0 || date.getDay() === 6 ? 1.18 : 1
    const trend = 0.9 + (index / DAYS) * 0.2
    // Paused campaigns stopped delivering in the last week.
    const paused = status === 'pause' && index >= DAYS - 7 ? 0.04 : 1
    const spend = dailySpend * weekend * trend * paused * (0.8 + random() * 0.4)
    const impressions = (spend / cpm) * 1000 * (0.9 + random() * 0.2)
    const clicks = impressions * ctr * (0.85 + random() * 0.3)
    return { date, impressions: Math.round(impressions), clicks: Math.round(clicks), spend }
  })
}

const compact = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 })
const whole = new Intl.NumberFormat('en-GB')
const pounds = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 })
const shortDate = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' })

type MetricKey = 'impressions' | 'clicks' | 'spend'
type Metric = {
  key: MetricKey
  label: string
  color: string
  format: (value: number) => string
  /** Short format for the y-axis labels. */
  axis: (value: number) => string
}
const METRICS: Metric[] = [
  {
    key: 'impressions',
    label: 'Impressions',
    color: colors.sky_80,
    format: v => compact.format(v),
    axis: v => compact.format(v),
  },
  { key: 'clicks', label: 'Clicks', color: colors.sky_60, format: v => whole.format(v), axis: v => compact.format(v) },
  {
    key: 'spend',
    label: 'Spend',
    color: colors.sky_50,
    format: v => pounds.format(v),
    axis: v => `£${compact.format(v)}`,
  },
]

const W = 240
const H = 80
const PAD = 2

// Rounds the axis maximum up to a tidy value (1, 2, 2.5 or 5 × 10^n) so the tick labels are round numbers.
const niceMax = (value: number) => {
  const magnitude = 10 ** Math.floor(Math.log10(Math.max(value, 1)))
  const step = [1, 2, 2.5, 5, 10].find(candidate => candidate * magnitude >= value) ?? 10
  return step * magnitude
}

const LineChart: React.FC<{ points: DailyPoint[]; metric: Metric }> = ({ points, metric }) => {
  const values = points.map(point => point[metric.key])
  const max = niceMax(Math.max(...values, 1))
  const ticks = [max, max / 2, 0]
  const step = (W - PAD * 2) / (values.length - 1)
  const x = (index: number) => PAD + index * step
  const y = (value: number) => H - PAD - (value / max) * (H - PAD * 2)
  const line = values
    .map((value, index) => `${index ? 'L' : 'M'}${x(index).toFixed(1)},${y(value).toFixed(1)}`)
    .join(' ')
  return (
    <Styled.Chart>
      <Styled.YAxis style={{ height: H }} aria-hidden>
        {ticks.map(tick => (
          <Styled.YTick key={tick} style={{ top: y(tick) }}>
            {metric.axis(tick)}
          </Styled.YTick>
        ))}
      </Styled.YAxis>
      <svg viewBox={`0 0 ${W} ${H}`} width='100%' height={H} preserveAspectRatio='none' role='img'>
        <title>{`${metric.label}, last ${DAYS} days`}</title>
        {ticks.map(tick => (
          <line
            key={tick}
            x1={0}
            x2={W}
            y1={y(tick)}
            y2={y(tick)}
            stroke={tick === 0 ? colors.cloud_50 : colors.cloud_30}
            strokeWidth={1}
            strokeDasharray={tick === 0 ? undefined : '3 3'}
            vectorEffect='non-scaling-stroke'
          />
        ))}
        <path d={line} fill='none' stroke={metric.color} strokeWidth={2} vectorEffect='non-scaling-stroke' />
        {points.map((point, index) => (
          <rect key={index} x={x(index) - step / 2} y={0} width={step} height={H} fill='transparent'>
            <title>{`${shortDate.format(point.date)}: ${metric.format(point[metric.key])}`}</title>
          </rect>
        ))}
      </svg>
      <span />
      <Styled.MetricAxis>
        <span>{shortDate.format(points[0].date)}</span>
        <span>{shortDate.format(points[points.length - 1].date)}</span>
      </Styled.MetricAxis>
    </Styled.Chart>
  )
}

export const CampaignPerformanceCard: React.FC<CampaignPerformanceCardProps> = props => {
  const { campaignId, platform, status, budget } = props
  const points = useMemo(
    () => buildDailyPerformance({ campaignId, platform, status, budget }),
    [campaignId, platform, status, budget],
  )
  return (
    <Styled.PerformanceCard id='campaign-summary-performance'>
      <Text.H5>Performance · last {DAYS} days</Text.H5>
      <Styled.MetricRow>
        {METRICS.map(metric => (
          <Styled.Metric key={metric.key} id={`campaign-summary-performance-${metric.key}`}>
            <Styled.MetricHeader>
              <Styled.MetricLabel>{metric.label}</Styled.MetricLabel>
              <Styled.MetricValue>
                {metric.format(points.reduce((sum, point) => sum + point[metric.key], 0))}
              </Styled.MetricValue>
            </Styled.MetricHeader>
            <LineChart points={points} metric={metric} />
          </Styled.Metric>
        ))}
      </Styled.MetricRow>
    </Styled.PerformanceCard>
  )
}

export default CampaignPerformanceCard
