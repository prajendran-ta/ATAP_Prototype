/**
 * Home dashboard "Advertiser Performance Metrics" data, built from the same advertisers as the rest of the app
 * (The Londoner Hotel first, then shared/demoAdvertisers.ts). Prototype only: the metrics are deterministic mock
 * numbers scaled by each advertiser's budget, so the dashboard looks the same on every load.
 */
import { LONDONER } from '../../shared/londonerHotel'
import { DEMO_ADVERTISERS } from '../../shared/demoAdvertisers'

export type AdvertiserMetricCell = {
  value: number
  changePercent: number
}

export type AdvertiserPerformanceRow = {
  advertiser: string
  impressions: AdvertiserMetricCell
  spend: AdvertiserMetricCell
  bookings: AdvertiserMetricCell
  roas: AdvertiserMetricCell
}

/** Annual figures the dashboard chart plots (last year is derived from the change percentage). */
export type MetricsVisualProfile = {
  spendCurrent: number
  spendChangePercent: number
  bookingsCurrent: number
  bookingsChangePercent: number
  roasCurrent: number
  roasChangePercent: number
}

export type AdvertiserPerformance = {
  row: AdvertiserPerformanceRow
  profile: MetricsVisualProfile
}

const USD_PER_UNIT: Record<string, number> = { USD: 1, GBP: 1.27, EUR: 1.08, AUD: 0.65, SGD: 0.74, HKD: 0.128, NZD: 0.6 }

/** Deterministic value in [0, 1) for an advertiser key and a salt (FNV-1a hash). */
const unit = (key: string, salt: number): number => {
  let hash = 2166136261 ^ salt
  for (let index = 0; index < key.length; index++) hash = Math.imul(hash ^ key.charCodeAt(index), 16777619)
  return (hash >>> 0) / 4294967296
}

const between = (key: string, salt: number, min: number, max: number, digits = 1): number =>
  Number((min + unit(key, salt) * (max - min)).toFixed(digits))

const buildPerformance = (key: string, name: string, annualSpendUsd: number): AdvertiserPerformance => {
  const spendChange = between(key, 1, -9, 12)
  const bookingsChange = between(key, 2, -7, 13)
  const roas = between(key, 3, 2.3, 4)
  const roasChange = between(key, 4, -4, 14)
  const impressionsChange = between(key, 5, -7, 15)
  const monthlySpend = Math.round(annualSpendUsd / 12 / 100) * 100
  const bookings = Math.round((annualSpendUsd * between(key, 6, 0.08, 0.11, 3)) / 1000) * 1000
  return {
    row: {
      advertiser: name,
      impressions: { value: Math.round((monthlySpend * 72) / 5000) * 5000, changePercent: impressionsChange },
      spend: { value: monthlySpend, changePercent: spendChange },
      bookings: { value: bookings, changePercent: bookingsChange },
      roas: { value: roas, changePercent: roasChange },
    },
    profile: {
      spendCurrent: annualSpendUsd,
      spendChangePercent: spendChange,
      bookingsCurrent: bookings,
      bookingsChangePercent: bookingsChange,
      roasCurrent: roas,
      roasChangePercent: roasChange,
    },
  }
}

const annualSpendUsd = (totalBudget: number, currency: string) => Math.round(totalBudget * (USD_PER_UNIT[currency] ?? 1))

const londoner = buildPerformance('londoner', LONDONER.name, annualSpendUsd(LONDONER.totalBudget, LONDONER.currency))
const others = DEMO_ADVERTISERS.map(adv => buildPerformance(adv.key, adv.name, annualSpendUsd(adv.totalBudget, adv.currency)))

/** The Londoner always comes first; `limit` counts it. */
const londonerFirst = (ranked: AdvertiserPerformance[], limit: number) => [londoner, ...ranked.slice(0, limit - 1)]

const TABLE_SIZE = 10

/** Chart: The Londoner + the 9 biggest spenders. */
export const chartAdvertisers = londonerFirst(
  [...others].sort((first, second) => second.profile.spendCurrent - first.profile.spendCurrent),
  TABLE_SIZE,
)

/** "Needs attention" table: lowest ROAS change first, The Londoner pinned on top. */
export const needsAttentionRows = londonerFirst(
  [...others].sort((first, second) => first.row.roas.changePercent - second.row.roas.changePercent),
  TABLE_SIZE,
).map(entry => entry.row)

/** "Top spenders" table: highest spend first, The Londoner pinned on top. */
export const topSpenderRows = londonerFirst(
  [...others].sort((first, second) => second.row.spend.value - first.row.spend.value),
  TABLE_SIZE,
).map(entry => entry.row)
