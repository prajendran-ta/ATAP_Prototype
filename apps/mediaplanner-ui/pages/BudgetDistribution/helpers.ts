import React, { useMemo } from 'react'
import {
  DropdownMenu,
  IconButton,
  InputNumber,
  Text,
  colors,
} from '@amadeus/react-design-factory'
import type { ColumnsType } from '@amadeus/react-design-factory/components/Table'
import {
  CalculationModeEnum,
  MediaChannelEnum,
  MediaPlatformEnum,
  MediaTacticEnum,
} from '@mediahub/mediaplanner-ui/graphql/generated/mediaplanner-enums'
import type {
  MediaTab,
  TacticItem,
  PlatformItem,
  MetasearchPlatformItem,
  BudgetDistributionState,
  AllocationState,
  SpendBudgetDistributionState,
} from './BudgetDistribution.d'
import type { MediaAllocationInputVars, TacticAllocationInputVars } from './BudgetDistribution.queries'
import { BUDGET_DISTRIBUTION_SCHEMA, CURRENCY_SYMBOL_BY_CODE, DEFAULT_CURRENCY, FORMULAS } from './budgetDistributionConfig/budgetDistributionConfig'
import { evaluateFields, getSchemaForChannel, resolvePlatformCostCPM, resolveTacticDefaults } from './budgetDistributionConfig/helpers'
import type { CalculationMode, Currency, FieldDef, FormulaContext, GlobalCalcResults, Region } from './budgetDistributionConfig/budgetDistributionConfig.d'
import type { DebouncedInputNumberProps, DigitalRow, MetasearchRow } from './BudgetDistribution.d'
import { managementFeeRules } from '../helpers'
import { parseNumber } from '@amadeus/react-utils'
import { formatCurrencyWithSuffixSymbol, formatNumber } from '../utils/number'

export type { BudgetDistributionState, AllocationState, SpendBudgetDistributionState }

export const initialBudgetDistributionState: BudgetDistributionState = {
  allocations: [],
  spendBudgetDistribution: [],
}

const budgetDistributionCurrencyValidator = (_: unknown, value: string | number) => {
  if (value === undefined || value === null || value === '') return Promise.resolve()

  const num = typeof value === 'number' ? value : parseNumber(String(value))

  if (!Number.isFinite(num)) {
    return Promise.reject(new Error('Whole numbers only'))
  }

  if (num < 0) {
    return Promise.reject(new Error('Only positive numbers are allowed'))
  }

  if (num % 1 !== 0) {
    return Promise.reject(new Error('Whole numbers only'))
  }

  if (num > MAX_CURRENCY_AMOUNT) {
    return Promise.reject(new Error('Value cannot exceed 100,000,000'))
  }

  return Promise.resolve()
}

export const PAST_MONTHS = [
  'Jan 2025',
  'Feb 2025',
  'Mar 2025',
  'Apr 2025',
  'May 2025',
  'Jun 2025',
  'Jul 2025',
  'Aug 2025',
  'Sep 2025',
  'Oct 2025',
  'Nov 2025',
  'Dec 2025',
]

export const MONTH_NAME_TO_NUM: Record<string, string> = {
  Jan: '01',
  Feb: '02',
  Mar: '03',
  Apr: '04',
  May: '05',
  Jun: '06',
  Jul: '07',
  Aug: '08',
  Sep: '09',
  Oct: '10',
  Nov: '11',
  Dec: '12',
}

export function monthLabelToISO(label: string): string {
  const [mon, year] = label.split(' ')
  const m = MONTH_NAME_TO_NUM[mon]
  return m && year ? `${year}-${m}-01` : label
}

export function normalizeMonthKey(value: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (match) {
    const [, year, month] = match
    return `${year}-${month}-01`
  }

  const [day, mon, year] = value.split('-')
  const monthNum = MONTH_NAME_TO_NUM[mon]
  if (day && monthNum && year) return `${year}-${monthNum}-01`

  return value
}

export function buildPeriodFromRange(startDate?: string, endDate?: string): string[] {
  if (!startDate || !endDate) return []

  const start = new Date(startDate)
  const end = new Date(endDate)
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return []

  const from = new Date(start.getFullYear(), start.getMonth(), 1)
  const to = new Date(end.getFullYear(), end.getMonth(), 1)
  const [rangeStart, rangeEnd] = from <= to ? [from, to] : [to, from]

  const period: string[] = []
  const cursor = new Date(rangeStart)
  while (cursor <= rangeEnd) {
    period.push(cursor.toLocaleString('en-US', { month: 'short', year: 'numeric' }))
    cursor.setMonth(cursor.getMonth() + 1)
  }

  return period
}

export const initialTabs: MediaTab[] = buildInitialTabsFromSchema()
export const MAX_CURRENCY_AMOUNT = 100_000_000

export function sameDistribution(
  a: { month: string; spendPct: number }[],
  b: { month: string; spendPct: number }[],
): boolean {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i += 1) {
    if (a[i].month !== b[i].month || a[i].spendPct !== b[i].spendPct) return false
  }
  return true
}



export function getCurrencySymbol(currency: Currency): '€' | '$' {
  return CURRENCY_SYMBOL_BY_CODE[currency] ?? CURRENCY_SYMBOL_BY_CODE[DEFAULT_CURRENCY]
}

export function buildTreeRows(sourceTabs: MediaTab[], monthsCount = 12): any[] {
  return sourceTabs.map(tab => {
    if (tab.type === 'metasearch') {
      const enabledPlatforms = (tab.metasearchPlatforms ?? []).filter(p => p.enabled)
      const tabSpend = tab.metasearchSpend ?? 0
      const platformChildren = enabledPlatforms.map(p => {
        const platformSpend = enabledPlatforms.length > 0 ? Math.round(tabSpend / enabledPlatforms.length) : 0
        const row: any = { key: p.id, label: p.label, type: 'platform', rowTotal: platformSpend }
        Array.from({ length: monthsCount }, () => Math.round(platformSpend / monthsCount)).forEach((v, mi) => {
          row[`col-${mi}`] = v
        })
        return row
      })
      const row: any = {
        key: tab.id,
        label: tab.label,
        type: 'tab',
        rowTotal: tabSpend,
        children: platformChildren.length > 0 ? platformChildren : undefined,
      }
      Array.from({ length: monthsCount }, () => Math.round(tabSpend / monthsCount)).forEach((v, mi) => {
        row[`col-${mi}`] = v
      })
      return row
    }

    const enabledPlatforms = tab.platforms.filter(p => p.enabled)
    const platformChildren = enabledPlatforms.map(p => {
      const enabledTactics = p.tactics.filter(t => t.enabled)
      const tacticChildren = enabledTactics.map(t => {
        const tacticSpend = Number(t.values.spend ?? 0)
        const row: any = { key: t.id, label: t.label, type: 'tactic', rowTotal: tacticSpend }
        Array.from({ length: monthsCount }, () => Math.round(tacticSpend / monthsCount)).forEach((v, mi) => {
          row[`col-${mi}`] = v
        })
        return row
      })
      const platSpend = enabledTactics.reduce((s, t) => s + Number(t.values.spend ?? 0), 0)
      const row: any = {
        key: p.id,
        label: p.label,
        type: 'platform',
        rowTotal: platSpend,
        children: tacticChildren.length > 0 ? tacticChildren : undefined,
      }
      Array.from({ length: monthsCount }, () => Math.round(platSpend / monthsCount)).forEach((v, mi) => {
        row[`col-${mi}`] = v
      })
      return row
    })

    const tabSpend = enabledPlatforms
      .flatMap(p => p.tactics.filter(t => t.enabled))
      .reduce((s, t) => s + Number(t.values.spend ?? 0), 0)
    const row: any = {
      key: tab.id,
      label: tab.label,
      type: 'tab',
      rowTotal: tabSpend,
      children: platformChildren.length > 0 ? platformChildren : undefined,
    }
    Array.from({ length: monthsCount }, () => Math.round(tabSpend / monthsCount)).forEach((v, mi) => {
      row[`col-${mi}`] = v
    })
    return row
  })
}

export function getFullSchemaTabs(): MediaTab[] {
  return buildInitialTabsFromSchema()
}

export function useTabTableCache(
  tabs: MediaTab[],
  globalStats: GlobalCalcResults,
  showExpectedColumns: boolean,
  currency: Currency,
  region: Region,
  onTacticFieldChange: (
    tabId: string,
    platformId: string,
    tacticId: string,
    field: string,
    value: number | CalculationMode,
  ) => void,
  setTabs: React.Dispatch<React.SetStateAction<MediaTab[]>>,
  DebouncedInputNumber: React.ComponentType<DebouncedInputNumberProps>,
) {
  const digitalTabTables = useMemo(() => {
    const result: Record<string, { columns: ColumnsType<DigitalRow>; dataSource: DigitalRow[] }> = {}

    tabs
      .filter((t: MediaTab) => t.type !== 'metasearch')
      .forEach((tab: MediaTab) => {
        const schema = getSchemaForChannel(tab.id)
        const hasField = (key: string) => schema.fields.some((field: FieldDef) => field.key === key)
        const columns: ColumnsType<DigitalRow> = [
          { title: 'Platform', dataIndex: 'platform', fixed: 'left', width: '50%', ellipsis: true },
          { title: 'Tactic', dataIndex: 'tactic', fixed: 'left', width: 160 },
          {
            title: `Spend (${getCurrencySymbol(currency)})`,
            dataIndex: 'spend',
            width: 130,
            render: (v: number, row: DigitalRow) =>
              React.createElement(DebouncedInputNumber, {
                value: v,
                min: 0,
                onChange: (val: number) => onTacticFieldChange(tab.id, row.platformId, row.key, 'spend', val),
              }),
          },
        ]

        if (hasField('cpm')) {
          columns.push({
            title: `CPM (${getCurrencySymbol(currency)})`,
            dataIndex: 'cpm',
            width: 130,
            render: (v: number | undefined, row: DigitalRow) => {
              if (row.calculationMode === 'MARGIN') return React.createElement(Text.Body, null, '-')
              return React.createElement(DebouncedInputNumber, {
                value: v,
                min: 0,
                onChange: (val: number) => onTacticFieldChange(tab.id, row.platformId, row.key, 'cpm', val),
              })
            },
          })
        }

        if (hasField('calculationMode')) {
          // Platform cost is shown at the end, right before Mode
        }

        if (hasField('marginPct')) {
          const marginField = schema.fields.find((field: FieldDef) => field.key === 'marginPct')!
          columns.push({
            title: 'Margin (%)',
            dataIndex: 'marginPct',
            width: 130,
            render: (v: number | undefined, row: DigitalRow) => {
              const isInput = marginField.kind === 'input' || (marginField.kind === 'dual' && row.calculationMode === 'MARGIN')
              if (isInput) {
                return React.createElement(DebouncedInputNumber, {
                  value: v,
                  min: 0,
                  max: 100,
                  onChange: (val: number) => onTacticFieldChange(tab.id, row.platformId, row.key, 'marginPct', val),
                })
              }
              return React.createElement(InputNumber, { value: v ?? 0, disabled: true })
            },
          })
        }

        if (hasField('marginValue')) {
          columns.push({
            title: `Margin (${getCurrencySymbol(currency)})`,
            dataIndex: 'marginValue',
            width: 130,
            render: (v: number | undefined) => React.createElement(InputNumber, { value: v ?? 0, disabled: true }),
          })
        }

        columns.push({
          title: 'Spend (%)',
          dataIndex: 'spendPct',
          width: 130,
          render: (v: number) => React.createElement(InputNumber, { value: v, disabled: true }),
        })

        if (showExpectedColumns) {
          columns.push({
            title: '% of Expected',
            dataIndex: 'expectedPct',
            width: 150,
            render: (v: number) => React.createElement(InputNumber, { value: v, disabled: true }),
          })
        }

        if (hasField('calculationMode')) {
          columns.push({
            title: `Platform Cost (${getCurrencySymbol(currency)})`,
            dataIndex: 'platformCost',
            width: 150,
            render: (_: number | undefined, row: DigitalRow) => {
              if (row.calculationMode !== 'CPM') return React.createElement(Text.Body, null, '-')
              const platformCost = resolvePlatformCostCPM(row.platformId, region, currency)
              return React.createElement(InputNumber, {
                value: platformCost,
                disabled: true,
                formatter: (val: any) =>
                  val != null && val !== '' && Number.isFinite(Number(val))
                    ? formatCurrencyWithSuffixSymbol(Number(val), currency, { min: 0, max: 0 })
                    : String(val ?? ''),
              })
            },
          })
          columns.push({
            title: 'Mode',
            dataIndex: 'calculationMode',
            width: 90,
            render: (_v: CalculationMode | undefined, row: DigitalRow) =>
              React.createElement(
                DropdownMenu,
                {
                  items: [
                    {
                      key: 'use-cpm',
                      label: React.createElement('span', { id: `budget_distribution-use_cpm-${row.key}-txt` }, 'Use CPM'),
                      onClick: () => onTacticFieldChange(tab.id, row.platformId, row.key, 'calculationMode', 'CPM'),
                    },
                    {
                      key: 'use-margin',
                      label: React.createElement('span', { id: `budget_distribution-use_margin-${row.key}-txt` }, 'Use Margin'),
                      onClick: () => onTacticFieldChange(tab.id, row.platformId, row.key, 'calculationMode', 'MARGIN'),
                    },
                  ],
                },
                React.createElement(IconButton, {
                  id: `budget_distribution-mode-${row.key}-btn`,
                  iconName: 'ellipsisVertical',
                  color: colors.cloud_80,
                }),
              ),
          })
        }

        const dataSource: DigitalRow[] = tab.platforms
          .filter(p => p.enabled)
          .flatMap(p =>
            p.tactics
              .filter(t => t.enabled)
              .map(t => ({
                key: t.id,
                tabId: tab.id,
                channelId: tab.id,
                platformId: p.id,
                platform: p.label,
                tactic: t.label,
                spend: t.values.spend,
                spendPct: t.values.spendPct,
                expectedPct: t.values.expectedPct,
                cpm: t.values.cpm,
                marginPct: t.values.marginPct,
                marginValue: t.values.marginValue,
                calculationMode: t.values.calculationMode,
              })),
          )

        result[tab.id] = { columns, dataSource }
      })

    return result
  }, [tabs, onTacticFieldChange, currency, region])

  const metasearchTab = tabs.find((t: MediaTab) => t.id === 'metasearch')
  const metasearch: { columns: ColumnsType<MetasearchRow>; dataSource: MetasearchRow[] } | undefined = useMemo(() => {
    if (!metasearchTab || !metasearchTab.metasearchPlatforms) return undefined
    const enabledPlatforms = metasearchTab.metasearchPlatforms.filter(p => p.enabled)
    if (enabledPlatforms.length === 0) return undefined

    const columns: ColumnsType<MetasearchRow> = [
      { title: 'Channel', dataIndex: 'channel', fixed: 'left', width: 120 },
      { title: 'Platform', dataIndex: 'platforms', width: 320 },
      {
        title: `Spend (${getCurrencySymbol(currency)})`,
        dataIndex: 'spend',
        width: 130,
        render: (v: number) =>
          React.createElement(DebouncedInputNumber, {
            value: v,
            min: 0,
            onChange: (val: number) =>
              setTabs((prev: MediaTab[]) => prev.map((t: MediaTab) => (t.id !== 'metasearch' ? t : { ...t, metasearchSpend: val }))),
          }),
      },
      {
        title: 'Spend (%)',
        dataIndex: 'spendPct',
        width: 120,
        render: (v: number) =>
          React.createElement(InputNumber, {
            value: v,
            disabled: true,
          }),
      },
    ]

    if (showExpectedColumns) {
      columns.push({
        title: '% of Expected',
        dataIndex: 'expectedPct',
        width: 150,
        render: (v: number) =>
          React.createElement(InputNumber, {
            value: v,
            disabled: true,
          }),
      })
    }

    const spend = metasearchTab.metasearchSpend ?? 0
    const spendPct = FORMULAS.spendPct(spend, globalStats.spendBudget || 1)
    const expectedPct = FORMULAS.expectedPct(spend, globalStats.expectedSpend || 1)

    return {
      columns,
      dataSource: [
        {
          key: 'metasearch-group',
          channel: 'Metasearch',
          platforms: enabledPlatforms.map(p => p.label).join(', '),
          spend,
          spendPct,
          expectedPct,
        },
      ],
    }
  }, [metasearchTab, globalStats, setTabs, showExpectedColumns, currency])

  return { digitalTabTables, metasearch }
}

export function getAllTabTables(
  tabs: MediaTab[],
  showExpectedColumns: boolean,
  onTacticFieldChange: (
    tabId: string,
    platformId: string,
    tacticId: string,
    field: string,
    value: number | CalculationMode,
  ) => void,
  setTabs: React.Dispatch<React.SetStateAction<MediaTab[]>>,
  globalStats: GlobalCalcResults,
  currency: Currency,
  region: Region,
  DebouncedInputNumber: React.ComponentType<DebouncedInputNumberProps>,
): Record<string, { columns: ColumnsType<any>; dataSource: any[] }> {
  const result: Record<string, { columns: ColumnsType<any>; dataSource: any[] }> = {}

  for (const tab of tabs) {
    if (tab.type === 'metasearch') {
      const enabledPlatforms = tab.metasearchPlatforms?.filter(p => p.enabled) ?? []
      if (enabledPlatforms.length === 0) continue

      const columns: ColumnsType<MetasearchRow> = [
        { title: 'Channel', dataIndex: 'channel', fixed: 'left', width: 120 },
        { title: 'Platform', dataIndex: 'platforms', width: 320 },
        {
          title: `Spend (${getCurrencySymbol(currency)})`,
          dataIndex: 'spend',
          width: 130,
          render: (v: number) =>
            React.createElement(DebouncedInputNumber, {
              id: 'media_plan_budget_distribution-metasearch-spend-inp',
              name: ['budgetDistribution', 'metasearch', 'spend'],
              value: v,
              formatAsCurrency: true,
              currency,
              min: 0,
              max: MAX_CURRENCY_AMOUNT,
              precision: 0,
              rules: [{ validator: budgetDistributionCurrencyValidator }],
              onChange: (val: number) =>
                setTabs((prev: MediaTab[]) =>
                  prev.map((t: MediaTab) => (t.id !== 'metasearch' ? t : { ...t, metasearchSpend: val })),
                ),
            }),
        },
        {
          title: 'Spend (%)',
          dataIndex: 'spendPct',
          width: 120,
          render: (v: number) =>
            React.createElement(InputNumber, {
              value: v,
              disabled: true,
              formatter: (val: any) =>
                val != null && val !== '' && Number.isFinite(Number(val))
                  ? formatNumber(Number(val))
                  : String(val ?? ''),
            }),
        },
      ]

      if (showExpectedColumns) {
        columns.push({
          title: '% of Expected',
          dataIndex: 'expectedPct',
          width: 150,
          render: (v: number) =>
            React.createElement(InputNumber, {
              value: v,
              disabled: true,
              formatter: (val: any) =>
                val != null && val !== '' && Number.isFinite(Number(val))
                  ? formatNumber(Number(val))
                  : String(val ?? ''),
            }),
        })
      }

      const spend = tab.metasearchSpend ?? 0
      const spendPct = FORMULAS.spendPct(spend, globalStats.spendBudget || 1)
      const expectedPct = FORMULAS.expectedPct(spend, globalStats.expectedSpend || 1)

      result[tab.id] = {
        columns,
        dataSource: [
          {
            key: 'metasearch-group',
            channel: 'Metasearch',
            platforms: enabledPlatforms.map(p => p.label).join(', '),
            spend,
            spendPct,
            expectedPct,
          },
        ],
      }

      continue
    }

    const schema = getSchemaForChannel(tab.id)
    const hasField = (key: string) => schema.fields.some((field: FieldDef) => field.key === key)
    const columns: ColumnsType<DigitalRow> = [
      { title: 'Platform', dataIndex: 'platform', fixed: 'left', width: '12%', ellipsis: true },
      { title: 'Tactic', dataIndex: 'tactic', fixed: 'left', width: '12%', ellipsis: true },
      {
        title: `Spend (${getCurrencySymbol(currency)})`,
        dataIndex: 'spend',
        width: 130,
        render: (v: number, row: DigitalRow) =>
          React.createElement(DebouncedInputNumber, {
            id: `media_plan_budget_distribution-${tab.id}-${row.platformId}-${row.key}-spend-inp`,
            name: ['budgetDistribution', tab.id, row.platformId, row.key, 'spend'],
            value: v,
            formatAsCurrency: true,
            currency,
            min: 0,
            max: MAX_CURRENCY_AMOUNT,
            precision: 0,
            rules: [{ validator: budgetDistributionCurrencyValidator }],
            onChange: (val: number) => onTacticFieldChange(tab.id, row.platformId, row.key, 'spend', val),
          }),
      },
    ]

    if (hasField('cpm')) {
      columns.push({
        title: `CPM (${getCurrencySymbol(currency)})`,
        dataIndex: 'cpm',
        width: 130,
        render: (v: number | undefined, row: DigitalRow) => {
          if (row.calculationMode === 'MARGIN') return React.createElement(Text.Body, null, '-')
          return React.createElement(DebouncedInputNumber, {
            id: `media_plan_budget_distribution-${tab.id}-${row.platformId}-${row.key}-cpm-inp`,
            name: ['budgetDistribution', tab.id, row.platformId, row.key, 'cpm'],
            value: v,
            formatAsCurrency: true,
            currency,
            min: 0,
            max: MAX_CURRENCY_AMOUNT,
            precision: 0,
            rules: [{ validator: budgetDistributionCurrencyValidator }],
            onChange: (val: number) => onTacticFieldChange(tab.id, row.platformId, row.key, 'cpm', val),
          })
        },
      })
    }

    if (hasField('marginPct')) {
      const marginField = schema.fields.find((field: FieldDef) => field.key === 'marginPct')!
      columns.push({
        title: 'Margin (%)',
        dataIndex: 'marginPct',
        width: 130,
        render: (v: number | undefined, row: DigitalRow) => {
          const isInput = marginField.kind === 'input' || (marginField.kind === 'dual' && row.calculationMode === 'MARGIN')
          if (isInput) {
            return React.createElement(DebouncedInputNumber, {
              id: `media_plan_budget_distribution-${tab.id}-${row.platformId}-${row.key}-margin_pct-inp`,
              name: ['budgetDistribution', tab.id, row.platformId, row.key, 'marginPct'],
              value: v,
              min: 0,
              max: 100,
              precision: 2,
              rules: managementFeeRules,
              onChange: (val: number) => onTacticFieldChange(tab.id, row.platformId, row.key, 'marginPct', val),
            })
          }
          return React.createElement(InputNumber, {
            id: `media_plan_budget_distribution-${tab.id}-${row.platformId}-${row.key}-margin_pct-inp`,
            value: v ?? 0,
            disabled: true,
            formatter: (val: any) =>
              val != null && val !== '' && Number.isFinite(Number(val)) ? formatNumber(Number(val)) : String(val ?? ''),
          })
        },
      })
    }

    if (hasField('marginValue')) {
      columns.push({
        title: `Margin (${getCurrencySymbol(currency)})`,
        dataIndex: 'marginValue',
        width: 130,
        render: (v: number | undefined, row: DigitalRow) =>
          React.createElement(InputNumber, {
            id: `media_plan_budget_distribution-${tab.id}-${row.platformId}-${row.key}-margin_value-inp`,
            value: v ?? 0,
            disabled: true,
            formatter: (val: any) =>
              val != null && val !== '' && Number.isFinite(Number(val))
                ? formatCurrencyWithSuffixSymbol(Number(val), currency, { min: 0, max: 0 })
                : String(val ?? ''),
          }),
      })
    }

    columns.push({
      title: 'Spend (%)',
      dataIndex: 'spendPct',
      width: 130,
      render: (v: number, row: DigitalRow) =>
        React.createElement(InputNumber, {
          id: `media_plan_budget_distribution-${tab.id}-${row.platformId}-${row.key}-spend_pct-inp`,
          value: v,
          disabled: true,
          formatter: (val: any) =>
            val != null && val !== '' && Number.isFinite(Number(val)) ? formatNumber(Number(val)) : String(val ?? ''),
        }),
    })

    if (showExpectedColumns) {
      columns.push({
        title: '% of Expected',
        dataIndex: 'expectedPct',
        width: 150,
        render: (v: number, row: DigitalRow) =>
          React.createElement(InputNumber, {
            id: `media_plan_budget_distribution-${tab.id}-${row.platformId}-${row.key}-expected_pct-inp`,
            value: v,
            disabled: true,
            formatter: (val: any) =>
              val != null && val !== '' && Number.isFinite(Number(val)) ? formatNumber(Number(val)) : String(val ?? ''),
          }),
      })
    }

    if (hasField('calculationMode')) {
      columns.push({
        title: `Platform Cost (${getCurrencySymbol(currency)})`,
        dataIndex: 'platformCost',
        width: 150,
        render: (_: number | undefined, row: DigitalRow) => {
          if (row.calculationMode !== 'CPM') return React.createElement(Text.Body, null, '-')
          const platformCost = resolvePlatformCostCPM(row.platformId, region, currency)
          return React.createElement(InputNumber, {
            id: `media_plan_budget_distribution-${tab.id}-${row.platformId}-${row.key}-platform_cost-inp`,
            value: platformCost,
            disabled: true,
            formatter: (val: any) =>
              val != null && val !== '' && Number.isFinite(Number(val))
                ? formatCurrencyWithSuffixSymbol(Number(val), currency, { min: 0, max: 0 })
                : String(val ?? ''),
          })
        },
      })
      columns.push({
        title: 'Mode',
        dataIndex: 'calculationMode',
        width: 90,
        render: (_v: CalculationMode | undefined, row: DigitalRow) =>
          React.createElement(
            DropdownMenu,
            {
              items: [
                {
                  key: 'use-cpm',
                  label: React.createElement('span', { id: `budget_distribution-use_cpm-${row.key}-txt` }, 'Use CPM'),
                  onClick: () => onTacticFieldChange(tab.id, row.platformId, row.key, 'calculationMode', 'CPM'),
                },
                {
                  key: 'use-margin',
                  label: React.createElement('span', { id: `budget_distribution-use_margin-${row.key}-txt` }, 'Use Margin'),
                  onClick: () => onTacticFieldChange(tab.id, row.platformId, row.key, 'calculationMode', 'MARGIN'),
                },
              ],
            },
            React.createElement(IconButton, {
              id: `budget_distribution-mode-${row.key}-btn`,
              iconName: 'ellipsisVertical',
              color: colors.cloud_80,
            }),
          ),
      })
    }

    const dataSource: DigitalRow[] = tab.platforms
      .filter(p => p.enabled)
      .flatMap(p =>
        p.tactics
          .filter(t => t.enabled)
          .map(t => ({
            key: t.id,
            tabId: tab.id,
            channelId: tab.id,
            platformId: p.id,
            platform: p.label,
            tactic: t.label,
            spend: t.values.spend,
            spendPct: t.values.spendPct,
            expectedPct: t.values.expectedPct,
            cpm: t.values.cpm,
            platformCost: tab.id === 'display' ? resolvePlatformCostCPM(p.id, region, currency) : undefined,
            marginPct: t.values.marginPct,
            marginValue: t.values.marginValue,
            calculationMode: t.values.calculationMode,
          })),
      )

    result[tab.id] = { columns, dataSource }
  }

  return result
}

export function recalculateTabs(
  tabsToRecalc: MediaTab[],
  contractBudget: number,
  sumFees: number,
  managementFeePct: number,
  currency: Currency,
  region: Region,
): MediaTab[] {
  const totalSpend = tabsToRecalc
    .flatMap(t =>
      t.type === 'metasearch'
        ? [t.metasearchSpend ?? 0]
        : t.platforms.flatMap(p => p.tactics.filter(tc => tc.enabled).map(tc => Number(tc.values.spend ?? 0))),
    )
    .reduce((s, v) => s + v, 0)

  return tabsToRecalc.map(tab => {
    if (tab.type === 'metasearch') return tab
    const schema = getSchemaForChannel(tab.id)

    return {
      ...tab,
      platforms: tab.platforms.map(p => ({
        ...p,
        tactics: p.tactics.map(tc => {
          if (!tc.enabled) return tc

          const ctx: FormulaContext = {
            totalSpend,
            contractBudget,
            sumFees,
            managementFeePct,
            platformCostCPM: tab.id === 'display' ? resolvePlatformCostCPM(p.id, region, currency) : 0,
            calculationMode: (tc.values.calculationMode ?? 'CPM') as CalculationMode,
            currency,
            region,
          }

          const tacticInputs = { ...tc.values, spend: Number(tc.values.spend ?? 0) }
          const { spend: _s, ...calcResult } = evaluateFields(schema.id, tacticInputs, ctx)
          return { ...tc, values: { ...tc.values, ...calcResult } }
        }),
      })),
    }
  })
}

// buildInitialTabsFromSchema
// Converts BUDGET_DISTRIBUTION_SCHEMA into MediaTab[] state with spend = 0.
export function buildInitialTabsFromSchema(currency: Currency = DEFAULT_CURRENCY): MediaTab[] {
  return BUDGET_DISTRIBUTION_SCHEMA.map(channelDef => {
    const isMetasearch = channelDef.channel === MediaChannelEnum.Metasearch

    if (isMetasearch) {
      const metasearchPlatforms: MetasearchPlatformItem[] = channelDef.platforms.map(p => ({
        id: p.platform.toLowerCase().replace(/_/g, '-'),
        label: p.label,
        enabled: true,
        spend: 0,
        spendPct: 0,
        expectedPct: 0,
      }))

      return {
        id: channelDef.channel.toLowerCase().replace(/_/g, '-'),
        label: channelDef.label,
        enabled: true,
        type: 'metasearch' as const,
        platforms: [],
        metasearchSpend: undefined,
        metasearchPlatforms,
      }
    }

    const platforms: PlatformItem[] = channelDef.platforms.map(platformDef => {
      const tactics: TacticItem[] = (platformDef.tactics ?? []).map(tacticDef => {
        const defaultValues = resolveTacticDefaults(channelDef.channel, tacticDef.tactic, currency)

        return {
          id: `${platformDef.platform}-${tacticDef.tactic}`.toLowerCase().replace(/_/g, '-'),
          label: tacticDef.label,
          enabled: true,
          values: {
            spend: undefined,
            spendPct: 0,
            expectedPct: 0,
            ...defaultValues,
          },
        }
      })

      return {
        id: platformDef.platform.toLowerCase().replace(/_/g, '-'),
        label: platformDef.label,
        enabled: true,
        tactics,
      }
    })

    return {
      id: channelDef.channel.toLowerCase().replace(/_/g, '-'),
      label: channelDef.label,
      enabled: true,
      platforms,
    }
  })
}

// buildTabsFromBdResponse
// Merges a GetMediaPlanBd response into the initial MediaTab[] structure.
//
// Persistence contract:
//   - Everything starts disabled.
//   - Only tactics/platforms present in the backend response are enabled.
//   - If a tactic was unchecked in Settings and saved, it will not
//     appear in the response and therefore will not be re-enabled on reload.
export function buildTabsFromBdResponse(
  bdAllocations: MediaplannerQL.MediaAllocation[],
  currency: Currency = DEFAULT_CURRENCY,
): MediaTab[] {
  const base = buildInitialTabsFromSchema(currency)
  const normalizeEnumId = (value?: string | null) => value?.toLowerCase().replace(/_/g, '-')

  // Disable everything by default - only what's in the response gets enabled
  base.forEach(tab => {
    if (tab.type === 'metasearch') {
      ;(tab.metasearchPlatforms ?? []).forEach(p => {
        p.enabled = false
      })
    } else {
      tab.platforms.forEach(p => {
        p.enabled = false
        p.tactics.forEach(tc => {
          tc.enabled = false
        })
      })
    }
  })

  for (const allocation of bdAllocations) {
    const channelId = normalizeEnumId(allocation.channel)
    const tab = base.find(t => t.id === channelId)
    if (!tab) continue

    if (tab.type === 'metasearch') {
      const tactic = allocation.tactics?.[0]
      if (!tactic) continue
      tab.metasearchSpend = tactic.spendAmount ?? undefined
      const platformIds = (tactic.platforms ?? []).map(platform => normalizeEnumId(platform))
      ;(tab.metasearchPlatforms ?? []).forEach(p => {
        if (platformIds.includes(p.id)) {
          p.enabled = true
        }
      })
      continue
    }

    for (const tactic of allocation.tactics ?? []) {
      const platformId = normalizeEnumId(tactic.platform)
      const tacticSuffix = normalizeEnumId(tactic.tactic)
      if (!platformId || !tacticSuffix) continue

      const platform = tab.platforms.find(p => p.id === platformId)
      if (!platform) continue

      const tacticItem = platform.tactics.find(tc => tc.id.endsWith(`-${tacticSuffix}`))
      if (!tacticItem) continue

      // Enable this tactic and its parent platform
      tacticItem.enabled = true
      platform.enabled = true

      tacticItem.values = {
        ...tacticItem.values,
        spend: tactic.spendAmount ?? undefined,
        ...(tactic.calculationMode != null ? { calculationMode: tactic.calculationMode as 'CPM' | 'MARGIN' } : {}),
        ...(tactic.cpmAmount != null ? { cpm: tactic.cpmAmount } : {}),
        ...(tactic.marginPct != null ? { marginPct: tactic.marginPct } : {}),
      }
    }
  }

  return base
}

// buildAllocationsFromTabs
// Maps the UI MediaTab[] state into MediaAllocationInput[] for the GQL mutation.
//
// Persistence contract:
//   - All enabled tactics are included, even with spend = 0.
//     This is how the drawer selections are persisted in the backend.
//   - Disabled tactics are omitted and will not appear on next reload.
export function buildAllocationsFromTabs(
  tabs: MediaTab[],
  contractBudget: number,
  sumFees: number,
  managementFeePct: number,
): MediaAllocationInputVars[] {
  const allocations: MediaAllocationInputVars[] = []

  const totalSpend =
    tabs
      .flatMap(t =>
        t.type === 'metasearch'
          ? [t.metasearchSpend ?? 0]
          : t.platforms.flatMap(p => p.tactics.filter(tc => tc.enabled).map(tc => Number(tc.values.spend ?? 0))),
      )
      .reduce((s, v) => s + v, 0) || 1

  const expectedDenom = FORMULAS.expectedSpend(contractBudget, sumFees, managementFeePct) || 1

  for (const tab of tabs) {
    if (tab.type === 'metasearch') {
      const enabledPlatforms = (tab.metasearchPlatforms ?? []).filter(p => p.enabled)
      if (enabledPlatforms.length === 0) continue

      const spend = Number(tab.metasearchSpend ?? 0)
      const spendPct = FORMULAS.spendPct(spend, totalSpend)
      const pctOfExpected = FORMULAS.expectedPct(spend, expectedDenom)

      allocations.push({
        channel: MediaChannelEnum.Metasearch,
        budgetAmount: spend,
        budgetPct: spendPct,
        tactics: [
          {
            platforms: enabledPlatforms.map(p => p.id.toUpperCase().replace(/-/g, '_') as MediaPlatformEnum),
            spendAmount: spend,
            spendPct,
            pctOfExpected,
          },
        ],
      })
      continue
    }

    const channelTactics: TacticAllocationInputVars[] = []
    let channelTotalSpend = 0

    for (const platform of tab.platforms.filter(p => p.enabled)) {
      for (const tactic of platform.tactics.filter(t => t.enabled)) {
        // Always include enabled tactics; send 0 when spend is empty (schema requires Float!).        
        const spend = Number(tactic.values.spend ?? 0)
        channelTotalSpend += spend
        const spendPct = FORMULAS.spendPct(spend, totalSpend)
        const pctOfExpected = FORMULAS.expectedPct(spend, expectedDenom)

        const tacticEntry: TacticAllocationInputVars = {
          platform: platform.id.toUpperCase().replace(/-/g, '_') as MediaPlatformEnum,
          tactic: tactic.id
            .slice(platform.id.length + 1)
            .toUpperCase()
            .replace(/-/g, '_') as MediaTacticEnum,
          spendAmount: spend,
          spendPct,
          pctOfExpected,
        }

        if (tab.id === 'display' && tactic.values.calculationMode !== undefined) {
          tacticEntry.calculationMode =
            tactic.values.calculationMode === 'MARGIN' ? CalculationModeEnum.Margin : CalculationModeEnum.Cpm
        }

        if (tactic.values.cpm !== undefined) tacticEntry.cpmAmount = tactic.values.cpm
        if (tactic.values.marginPct !== undefined) {
          const marginPct = tactic.values.marginPct ?? 0
          tacticEntry.marginPct = marginPct
          tacticEntry.marginAmount = FORMULAS.tactic_marginValue(spend, marginPct)
        }

        channelTactics.push(tacticEntry)
      }
    }

    // Always include channel when it has enabled tactics.
    if (channelTactics.length === 0) continue

    const budgetPct = FORMULAS.spendPct(channelTotalSpend, totalSpend)
    allocations.push({
      channel: tab.id.toUpperCase().replace(/-/g, '_') as MediaChannelEnum,
      budgetAmount: channelTotalSpend,
      budgetPct,
      tactics: channelTactics,
    })
  }

  return allocations
}
