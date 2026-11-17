/**
 * Builder helpers for the Monthly Breakdown tab of the Media Plan summary.
 *
 * The monthly dataset conceptually originates from Step 3 (Budget Distribution →
 * Spend Budget Distribution). Since there is no backend for the prototype, it is
 * sourced from the mock Salesforce plan (see mockSalesforcePlans.ts) and shaped
 * here into table rows/columns.
 */
import { formatNumber, formatCurrencyWithSuffixSymbol } from '../utils/number'
import type { MockMonthlyBreakdown } from '../MediaplannerProductSettings/mockSalesforcePlans'

export type MonthlyRowType =
  | 'category-header'
  | 'platform-values'
  | 'seasonality'
  | 'total'

export type MonthlyRow = {
  key: string
  /** First-column label (platform name / seasonality / total), or the full-width
   *  category name when isHeader is true. */
  label: string
  rowType: MonthlyRowType
  /** Whether this row is a full-width category header (spans all columns). */
  isHeader: boolean
  total: string
  /** Per-month cells keyed as m0, m1, ... */
  [monthKey: string]: string | boolean
}

export type MonthlyColumn = {
  key: string
  label: string
}

/** One column per month (Total is handled separately in the table config). */
export function buildMonthlyColumns(months: string[]): MonthlyColumn[] {
  return months.map((label, i) => ({ key: `m${i}`, label }))
}

const round = (value: number): number => Math.round(value)

const formatMoney = (value: number, currency: string): string => {
  try {
    return formatCurrencyWithSuffixSymbol(round(value), currency, { min: 0, max: 0 })
  } catch {
    return `${formatNumber(round(value))} ${currency}`
  }
}

/**
 * Build the monthly-breakdown rows in order:
 *  1. one row per platform,
 *  2. a seasonality row,
 *  3. a total row.
 * `currency` is accepted for signature parity with the app's monthly table
 * builders; the monthly grid renders money-less numbers.
 */
type BuildMonthlyRowsOptions = {
  totalSpend?: number
  seasonalPct?: number[]
  allocations?: MediaplannerQL.MediaAllocation[] | null
}

const normalizeChannel = (value?: string | null): string => String(value ?? '').toUpperCase()

const resolvePlatformChannels = (category: string, platform: string): string[] => {
  const value = `${category} ${platform}`.toLowerCase()
  const channels: string[] = []

  if (value.includes('metasearch')) return ['METASEARCH']
  if (value.includes('paid search') || value.includes('ppc') || value.includes('bing') || value.includes('google')) channels.push('PAID_SEARCH')
  if (value.includes('display') || value.includes('dsp') || value.includes('programmatic') || value.includes('demand gen')) channels.push('DISPLAY')
  if (value.includes('social') || value.includes('meta') || value.includes('tiktok') || value.includes('facebook') || value.includes('pinterest')) channels.push('SOCIAL')
  if (value.includes('youtube') || value.includes('video')) channels.push('VIDEO')

  return Array.from(new Set(channels))
}

const cleanUnavailablePlatformText = (label: string, spendByChannel: Map<string, number>): string => {
  let nextLabel = label

  if ((spendByChannel.get('DISPLAY') ?? 0) <= 0) {
    nextLabel = nextLabel
      .replace(/,\s*Demand Gen\s*/gi, ', ')
      .replace(/Demand Gen\s*,\s*/gi, '')
      .replace(/\s*&\s*Demand Gen/gi, '')
      .replace(/Demand Gen\s*&\s*/gi, '')
  }

  if ((spendByChannel.get('VIDEO') ?? 0) <= 0) {
    nextLabel = nextLabel
      .replace(/,\s*YouTube\s*/gi, ', ')
      .replace(/YouTube\s*,\s*/gi, '')
      .replace(/\s*&\s*YouTube/gi, '')
      .replace(/YouTube\s*&\s*/gi, '')
  }

  if ((spendByChannel.get('SOCIAL') ?? 0) <= 0) {
    nextLabel = nextLabel
      .replace(/,\s*TikTok\s*&\s*Meta Prospecting/gi, '')
      .replace(/TikTok\s*&\s*Meta Prospecting\s*,\s*/gi, '')
      .replace(/,\s*Meta Prospecting/gi, '')
      .replace(/Meta Prospecting\s*,\s*/gi, '')
      .replace(/,\s*TikTok/gi, '')
      .replace(/TikTok\s*,\s*/gi, '')
  }

  return nextLabel
    .replace(/,\s*,/g, ',')
    .replace(/\(\s*,\s*/g, '(')
    .replace(/,\s*\)/g, ')')
    .replace(/\(\s*&\s*/g, '(')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

export function buildMonthlyRows(
  breakdown: MockMonthlyBreakdown,
  currency: string,
  options: BuildMonthlyRowsOptions = {},
): MonthlyRow[] {
  const { months, seasonalPct, platforms } = breakdown
  const monthCount = months.length
  const rows: MonthlyRow[] = []
  const monthlySeasonalPct = options.seasonalPct?.length ? options.seasonalPct : seasonalPct
  const targetTotalSpend = Number(options.totalSpend ?? 0)
  const hasTargetTotalSpend = Number.isFinite(targetTotalSpend) && targetTotalSpend > 0
  const platformBaseTotals = platforms.map(platform =>
    platform.monthly.reduce((sum, value) => sum + Number(value ?? 0), 0),
  )
  const baseGrandTotal = platformBaseTotals.reduce((sum, value) => sum + value, 0)
  const allocationSpendByChannel = new Map<string, number>()
  ;(options.allocations ?? []).forEach(allocation => {
    const channel = normalizeChannel(allocation.channel)
    if (!channel) return
    const spend = (allocation.tactics ?? []).reduce((sum, tactic) => sum + Number(tactic?.spendAmount ?? 0), 0)
    allocationSpendByChannel.set(channel, (allocationSpendByChannel.get(channel) ?? 0) + spend)
  })
  const hasStep3Allocations = allocationSpendByChannel.size > 0
  const totalMonthSums = Array.from({ length: monthCount }, () => 0)

  const makeCategoryHeader = (key: string, label: string): MonthlyRow => {
    const row: MonthlyRow = { key, label, rowType: 'category-header', isHeader: true, total: '' }
    for (let i = 0; i < monthCount; i++) row[`m${i}`] = ''
    return row
  }

  // 1. Each platform: a full-width category header row (grey) above a values row
  //    whose first column holds the platform name.
  platforms.forEach((platform, platformIndex) => {
    const platformChannels = resolvePlatformChannels(platform.category, platform.platform)
    const platformTargetTotal = hasStep3Allocations
      ? platformChannels.reduce((sum, channel) => sum + (allocationSpendByChannel.get(channel) ?? 0), 0)
      : hasTargetTotalSpend && baseGrandTotal > 0
        ? (targetTotalSpend * platformBaseTotals[platformIndex]) / baseGrandTotal
        : platformBaseTotals[platformIndex]

    if (hasStep3Allocations && platformTargetTotal <= 0) return

    rows.push(makeCategoryHeader(`cat-h-${platformIndex}`, platform.category))

    const valuesRow: MonthlyRow = {
      key: `platform-v-${platformIndex}`,
      label: hasStep3Allocations
        ? cleanUnavailablePlatformText(platform.platform, allocationSpendByChannel)
        : platform.platform,
      rowType: 'platform-values',
      isHeader: false,
      total: '',
    }
    let rowTotal = 0
    for (let i = 0; i < monthCount; i++) {
      const value = hasTargetTotalSpend
        ? round((platformTargetTotal * Number(monthlySeasonalPct[i] ?? 0)) / 100)
        : round(platform.monthly[i] ?? 0)
      rowTotal += value
      totalMonthSums[i] += value
      valuesRow[`m${i}`] = formatMoney(value, currency)
    }
    valuesRow.total = formatMoney(rowTotal, currency)
    rows.push(valuesRow)
  })

  // 2. Seasonality (single row, label in first column; styled blue).
  const seasonalityRow: MonthlyRow = {
    key: 'seasonality',
    label: 'Recommended Seasonal Allocation',
    rowType: 'seasonality',
    isHeader: false,
    total: '',
  }
  let seasonalTotal = 0
  for (let i = 0; i < monthCount; i++) {
    const pct = monthlySeasonalPct[i] ?? 0
    seasonalTotal += pct
    seasonalityRow[`m${i}`] = `${pct}%`
  }
  seasonalityRow.total = `${round(seasonalTotal)}%`
  rows.push(seasonalityRow)

  // 3. Total (single row, label in first column; styled blue).
  const totalRow: MonthlyRow = {
    key: 'total',
    label: 'Total Digital Investment',
    rowType: 'total',
    isHeader: false,
    total: '',
  }
  let grandTotal = 0
  for (let i = 0; i < monthCount; i++) {
    let monthSum = hasTargetTotalSpend
      ? hasStep3Allocations
        ? totalMonthSums[i]
        : (targetTotalSpend * Number(monthlySeasonalPct[i] ?? 0)) / 100
      : 0

    if (!hasTargetTotalSpend) {
      platforms.forEach(platform => {
        monthSum += platform.monthly[i] ?? 0
      })
    }

    monthSum = round(monthSum)
    grandTotal += monthSum
    totalRow[`m${i}`] = formatMoney(monthSum, currency)
  }
  totalRow.total = formatMoney(grandTotal, currency)
  rows.push(totalRow)

  return rows
}
