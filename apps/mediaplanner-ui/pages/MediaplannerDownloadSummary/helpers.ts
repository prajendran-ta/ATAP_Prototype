import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { BUDGET_DISTRIBUTION_SCHEMA } from '../BudgetDistribution/budgetDistributionConfig/budgetDistributionConfig'
import {
  mediaplannerPlanTypeConfig,
  mediaplannerRegionConfig,
} from '../Mediaplanner/mediaplanUtils'
import type { BudgetRow } from './MediaplannerDownloadSummary.d'
import {
  formatNumber as formatNumberUtil,
  formatCurrency as formatCurrencyUtil,
  formatCurrencyWithoutSymbol as formatCurrencyWithoutSymbolUtil,
  formatCurrencyWithSuffixSymbol as formatCurrencyWithSuffixSymbolUtil,
} from '../utils/number'

dayjs.extend(customParseFormat)

export type MonthColumn = {
  key: string
  monthLabel: string
  spendPct: number
}

export type OverviewRow = {
  label: string
  value: string
}

export const DEFAULT_MONTHS = [
  'Jan 2026',
  'Feb 2026',
  'Mar 2026',
  'Apr 2026',
  'May 2026',
  'Jun 2026',
  'Jul 2026',
  'Aug 2026',
  'Sep 2026',
  'Oct 2026',
  'Nov 2026',
  'Dec 2026',
]

const formatEnumLabel = (value: string): string =>
  value
    .toLowerCase()
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')

const CHANNEL_LABELS: Record<string, string> = BUDGET_DISTRIBUTION_SCHEMA.reduce<Record<string, string>>((acc, channel) => {
  acc[String(channel.channel)] = channel.label
  return acc
}, {})

const PLATFORM_LABELS: Record<string, string> = BUDGET_DISTRIBUTION_SCHEMA.reduce<Record<string, string>>((acc, channel) => {
  channel.platforms.forEach(platform => {
    acc[platform.platform] = platform.label
  })
  return acc
}, {})

const TACTIC_LABELS: Record<string, string> = BUDGET_DISTRIBUTION_SCHEMA.reduce<Record<string, string>>((acc, channel) => {
  channel.platforms.forEach(platform => {
    if ('tactics' in platform && platform.tactics) {
      platform.tactics.forEach(tactic => {
        acc[tactic.tactic] = tactic.label
      })
    }
  })
  return acc
}, {})

const getPlatformLabel = (platform?: string | null): string => {
  if (!platform) return ''
  return PLATFORM_LABELS[platform] ?? formatEnumLabel(platform)
}

const getTacticLabel = (tactic?: string | null): string => {
  if (!tactic) return ''
  return TACTIC_LABELS[tactic] ?? formatEnumLabel(tactic)
}

export const getTacticRowLabel = (tactic: MediaplannerQL.TacticAllocation): string => {
  const platformLabel = getPlatformLabel(tactic.platform)
  const tacticLabel = getTacticLabel(tactic.tactic)

  if (platformLabel && tacticLabel) return `${platformLabel} ${tacticLabel}`
  if (platformLabel) return platformLabel
  if (tacticLabel) return tacticLabel

  if (tactic.platforms?.length) {
    return tactic.platforms.map(platform => getPlatformLabel(platform)).join(' + ')
  }

  return 'Unspecified Tactic'
}

export const formatMonthLabel = (month: string): string => {
  const parsed = dayjs(month, ['DD-MMM-YYYY', 'MMM YYYY', 'YYYY-MM-DD'], true)
  return parsed.isValid() ? parsed.format('MMM YYYY') : month
}

export const formatDate = (value?: string): string => {
  if (!value) return '—'
  const parsed = dayjs(value, ['DD-MMM-YYYY', 'YYYY-MM-DD', 'DD-MM-YYYY'], true)
  return parsed.isValid() ? parsed.format('DD-MMM-YYYY') : value
}

export const formatNumber = formatNumberUtil

export const formatPercent = (value: number): string => {
  const formatted = new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
  return `${formatted}%`
}

export const formatCurrency = (value: number, currency?: string): string => {
  if (!currency) return formatNumberUtil(Math.round(value))
  try {
    return formatCurrencyWithSuffixSymbolUtil(value, currency, { min: 0, max: 0 })
  } catch {
    return `${formatNumberUtil(Math.round(value))} ${currency}`
  }
}

export const formatCurrencyWithoutSymbol = (value: number, currency?: string): string => {
  if (!currency) return formatNumberUtil(Math.round(value))
  try {
    return formatCurrencyWithoutSymbolUtil(value, currency, { min: 0, max: 0 })
  } catch {
    return `${formatNumberUtil(Math.round(value))} ${currency}`
  }
}

type SpendBudgetMonth = {
  month: string
  spendPct?: number | null
}

export const buildMonthColumns = (distribution?: SpendBudgetMonth[] | null): MonthColumn[] => {
  const fromBackend = (distribution ?? []).map((month, index) => ({
    key: `m${index}`,
    monthLabel: formatMonthLabel(month.month),
    spendPct: Number(month.spendPct ?? 0),
  }))

  if (fromBackend.length > 0) return fromBackend

  return DEFAULT_MONTHS.map((monthLabel, index) => ({
    key: `m${index}`,
    monthLabel,
    spendPct: 0,
  }))
}

type AllocationLike = {
  channel?: string | null
  tactics?: (MediaplannerQL.TacticAllocation | null)[] | null
} | null

type BuildDataSourceParams = {
  allocations?: AllocationLike[] | null
  monthColumns: MonthColumn[]
  currency?: string
  spendBudget: number
}

export const buildBudgetDataSource = ({
  allocations,
  monthColumns,
  currency,
  spendBudget,
}: BuildDataSourceParams): BudgetRow[] => {
  const distributionPctTotal = monthColumns.reduce((sum, col) => sum + col.spendPct, 0)
  const hasDistribution = distributionPctTotal > 0
  const distributionFactor = hasDistribution ? distributionPctTotal / 100 : 1
  const percentageRow: BudgetRow = {
    key: 'pct',
    channel: '',
    total: formatPercent(distributionPctTotal),
    rowType: 'percentage',
  }

  monthColumns.forEach(col => {
    percentageRow[col.key] = formatPercent(col.spendPct)
  })

  const channelAndTacticRows: BudgetRow[] = (allocations ?? []).flatMap((allocation, allocationIndex) => {
    if (!allocation) return []

    const tacticRows = (allocation.tactics ?? []).flatMap((tactic, tacticIndex) => {
      if (!tactic) return []
      const spendAmount = Number(tactic.spendAmount ?? 0)
      if (spendAmount <= 0) return []

      const row: BudgetRow = {
        key: `allocation-${allocationIndex}-tactic-${tacticIndex}`,
        channel: `  ${getTacticRowLabel(tactic)}`,
        total: formatCurrencyWithoutSymbol(spendAmount * distributionFactor, currency),
        rowType: 'tactic',
      }
      monthColumns.forEach(col => {
        row[col.key] = formatCurrencyWithoutSymbol((spendAmount * col.spendPct) / 100, currency)
      })
      return row
    })

    if (tacticRows.length === 0) return []

    const channelTotal = (allocation.tactics ?? [])
      .filter(t => t && Number(t.spendAmount ?? 0) > 0)
      .reduce((sum, t) => sum + Number(t!.spendAmount ?? 0), 0)

    const channelLabel =
      CHANNEL_LABELS[String(allocation.channel ?? '')] ?? formatEnumLabel(String(allocation.channel ?? ''))

    const headerRow: BudgetRow = {
      key: `channel-${allocationIndex}`,
      channel: channelLabel,
      total: formatCurrencyWithoutSymbol(channelTotal * distributionFactor, currency),
      rowType: 'channel',
    }
    monthColumns.forEach(col => {
      headerRow[col.key] = formatCurrencyWithoutSymbol((channelTotal * col.spendPct) / 100, currency)
    })

    return [headerRow, ...tacticRows]
  })

  const totalSpendRow: BudgetRow = {
    key: 'total-spend',
    channel: 'Total',
    total: formatCurrencyWithoutSymbol(spendBudget * distributionFactor, currency),
    rowType: 'total',
  }
  monthColumns.forEach(col => {
    totalSpendRow[col.key] = formatCurrencyWithoutSymbol((spendBudget * col.spendPct) / 100, currency)
  })

  if (channelAndTacticRows.length === 0) {
    return [percentageRow, totalSpendRow]
  }

  return [percentageRow, ...channelAndTacticRows, totalSpendRow]
}

type BuildOverviewRowsParams = {
  planName?: string | null
  opportunityId?: string | null
  proposalId?: string | null
  hotelName?: string | number | null
  regionKey?: string | null
  bpid?: string | null
  startDate?: string | null
  endDate?: string | null
  contractBudgetTarget: number
  currency?: string
  planTypeKey?: string | null
  managementFeePct: number
  globalFeeAmount: number
  spendBudget: number
  setupFee?: number
  metasearchSetupFee?: number
  metasearchConnectivityFee?: number
  creativeFee?: number
  videoCreativeFee?: number
}

export const buildOverviewRows = ({
  planName,
  opportunityId,
  proposalId,
  hotelName,
  regionKey,
  bpid,
  startDate,
  endDate,
  contractBudgetTarget,
  currency,
  planTypeKey,
  managementFeePct,
  globalFeeAmount,
  spendBudget,
  setupFee = 0,
  metasearchSetupFee = 0,
  metasearchConnectivityFee = 0,
  creativeFee = 0,
  videoCreativeFee = 0,
}: BuildOverviewRowsParams): OverviewRow[] => [
  { label: 'Media Plan Name', value: planName ?? '—' },
  { label: 'Opportunity ID', value: opportunityId ?? '—' },
  { label: 'Proposal ID', value: proposalId ?? '—' },
  { label: 'Hotel Name', value: String(hotelName ?? '—') },
  { label: 'Region', value: mediaplannerRegionConfig[regionKey ?? '']?.label ?? regionKey ?? '—' },
  { label: 'BPID', value: bpid ?? '—' },
  { label: 'Start Date', value: formatDate(startDate ?? undefined) },
  { label: 'End Date', value: formatDate(endDate ?? undefined) },
  { label: 'Total Contract Budget', value: formatCurrency(contractBudgetTarget, currency) },
  { label: 'Plan Type', value: mediaplannerPlanTypeConfig[planTypeKey ?? '']?.label ?? planTypeKey ?? '—' },
  { label: 'Management Fee %', value: formatPercent(managementFeePct) },
  { label: 'Management Fee Amount', value: formatCurrency(globalFeeAmount, currency) },
  { label: 'Setup Fee', value: formatCurrency(setupFee, currency) },
  { label: 'Metasearch Setup Fee', value: formatCurrency(metasearchSetupFee, currency) },
  { label: 'Metasearch Connectivity Fee', value: formatCurrency(metasearchConnectivityFee, currency) },
  { label: 'Creative Fee', value: formatCurrency(creativeFee, currency) },
  { label: 'Video Creative Fee', value: formatCurrency(videoCreativeFee, currency) },
  { label: 'Spend Budget', value: formatCurrency(spendBudget, currency) },
]

type BuildCsvParams = {
  overviewRows: OverviewRow[]
  headers: string[]
  dataSource: BudgetRow[]
  monthColumns: MonthColumn[]
}

export const buildCsvContent = ({ overviewRows, headers, dataSource, monthColumns }: BuildCsvParams): string => {
  const escape = (val: string) => `"${val.replace(/"/g, '""')}"`
  const overviewSection = overviewRows.map(({ label, value }) => `${escape(label)},${escape(value)}`).join('\n')
  const tableHeaders = headers.map(escape).join(',')
  const tableRows = dataSource
    .map(row =>
      [row.channel, row.total, ...monthColumns.map(col => String(row[col.key] ?? ''))]
        .map(escape)
        .join(','),
    )
    .join('\n')

  return [overviewSection, '', tableHeaders, tableRows].join('\n')
}
