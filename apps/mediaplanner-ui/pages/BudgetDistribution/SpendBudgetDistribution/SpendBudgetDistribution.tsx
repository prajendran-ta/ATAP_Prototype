import { type MouseEvent, FC, useState, useMemo, useRef, useEffect } from 'react'
import { Table, Text, InputNumber, Container, Icon, colors, Form, Input } from '@amadeus/react-design-factory'
import { formatCurrencyWithSuffixSymbol, parseNumber } from '../../utils/number'
import {
  BoldText,
  PastComsuptionText,
  ExpandIcon,
  ExpandIconSpacer,
  ErrorText,
  NoWrapSpan,
  LeftAlignedCell,
} from './SpendBudgetDistribution.styled'
import type { TableProps } from 'antd/es'
import type { SpendBudgetDistributionProps } from './SpendBudgetDistribution.d'
import { normalizeMonthKey } from '../helpers'

const isNumericDraft = (value: string) => /^-?\d*[.,]?\d*$/.test(value)

const spendDistributionPercentageValidator = (_: unknown, value: string | number) => {
  if (value === undefined || value === null || value === '') return Promise.resolve()

  const num = typeof value === 'number' ? value : parseNumber(String(value))

  if (!Number.isFinite(num)) {
    return Promise.reject(new Error('Whole numbers only'))
  }

  if (num < 0) {
    return Promise.reject(new Error('Only positive numbers are allowed'))
  }

  const decimalPart = String(num).split('.')[1] ?? ''
  if (decimalPart.length > 2) {
    return Promise.reject(new Error('Up to 2 decimal places allowed'))
  }

  if (num > 100) {
    return Promise.reject(new Error('Percentage must be between 0 and 100'))
  }

  return Promise.resolve()
}


const monthLabelToApiFormat = (label: string): string => {
  const [mon, year] = label.split(' ')
  return mon && year ? `01-${mon}-${year}` : label
}

const monthLabelToKey = (label: string): string => {
  const [mon, year] = label.split(' ')
  return mon && year ? normalizeMonthKey(`01-${mon}-${year}`) : label
}

const clampInt = (value: number, min: number, max: number): number => {
  if (!Number.isFinite(value)) return min
  return Math.min(max, Math.max(min, Math.trunc(value)))
}

const samePercentages = (a: number[], b: number[]): boolean => {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return false
  }
  return true
}

const pruneZeroRows = (rows: any[]): any[] =>
  rows
    .map(row => {
      const children = Array.isArray(row.children) ? pruneZeroRows(row.children) : undefined
      const hasPositiveTotal = Number(row.rowTotal ?? 0) > 0
      const hasChildren = Boolean(children && children.length > 0)

      if (!hasPositiveTotal && !hasChildren) return null

      return {
        ...row,
        children: hasChildren ? children : undefined,
      }
    })
    .filter(Boolean) as any[]

const SpendBudgetDistribution: FC<SpendBudgetDistributionProps> = ({
  period,
  totalBudget,
  currency,
  treeRows = [],
  initialPercentages,
  recommendedPercentages,
  onDistributionChange,
  errorMessage,
  disabled = false,
}) => {
  const formInstance = Form.useFormInstance()
  const seasonalityRules = [{ validator: spendDistributionPercentageValidator }]

  const normalizePercentagesToPeriod = (values?: number[]): number[] => {
    if (!values || values.length === 0) {
      const size = period.length
      if (size === 0) return []
      const base = Math.floor(100 / size)
      const remainder = 100 - base * size
      return period.map((_, index) => (index < remainder ? base + 1 : base))
    }
    if (values.length === period.length) return values
    if (values.length > period.length) return values.slice(0, period.length)
    return [...values, ...Array(period.length - values.length).fill(0)]
  }

  const [percentages, setPercentages] = useState<number[]>(() => normalizePercentagesToPeriod(initialPercentages))
  const [percentageInputs, setPercentageInputs] = useState<string[]>(() =>
    normalizePercentagesToPeriod(initialPercentages).map(value => String(value)),
  )
  const onDistributionChangeRef = useRef(onDistributionChange)

  useEffect(() => {
    onDistributionChangeRef.current = onDistributionChange
  }, [onDistributionChange])

  const buildDistribution = (sourcePercentages: number[]) =>
    period.map((month, i) => ({
      month: monthLabelToApiFormat(month),
      spendPct: Number.isFinite(sourcePercentages[i]) ? Number(sourcePercentages[i].toFixed(2)) : 0,
    }))

  const emitDistribution = (sourcePercentages: number[]) => {
    const distribution = buildDistribution(sourcePercentages)
    onDistributionChangeRef.current?.(distribution)
  }

  useEffect(() => {
    period.forEach((_, index) => {
      const fieldName = ['seasonality', index]
      const current = formInstance.getFieldValue(fieldName)
      if (typeof current === 'string' && (current.endsWith('.') || (() => { const d = current.split('.')[1]; return Boolean(d && d.length > 2) })())) return
      const next = percentageInputs[index] ?? String(percentages[index] ?? '')
      if (current !== next) {
        formInstance.setFieldValue(fieldName, next)
      }
    })
  }, [formInstance, period, percentages, percentageInputs])

  // Keep percentages aligned with the dynamic period length.
  useEffect(() => {
    const normalized = normalizePercentagesToPeriod(percentages)
    if (!samePercentages(percentages, normalized)) {
      setPercentages(normalized)
      setPercentageInputs(normalized.map(value => String(value)))
      emitDistribution(normalized)
      return
    }

    emitDistribution(percentages)
  }, [period])

  // Sync when initialPercentages are loaded from backend after initial render
  const prevInitRef = useRef<number[] | undefined>(undefined)
  useEffect(() => {
    if (initialPercentages) {
      const normalized = normalizePercentagesToPeriod(initialPercentages)
      const prevNormalized = prevInitRef.current ? normalizePercentagesToPeriod(prevInitRef.current) : undefined

      if (!prevNormalized || !samePercentages(normalized, prevNormalized)) {
        prevInitRef.current = initialPercentages
        if (!samePercentages(percentages, normalized)) {
          setPercentages(normalized)
        }
        setPercentageInputs(normalized.map(value => String(value)))
        emitDistribution(normalized)
      }
    }
  }, [initialPercentages])

  const onChangePercent = (value: number, index: number) => {
    if (!Number.isFinite(value)) return

    const newPerc = [...percentages]
    newPerc[index] = value
    setPercentages(newPerc)
    setPercentageInputs(prev => {
      const next = [...prev]
      next[index] = String(value)
      return next
    })
    emitDistribution(newPerc)
  }

  const onChangePercentInput = (value: string, index: number) => {
    setPercentageInputs(prev => {
      const next = [...prev]
      next[index] = value
      return next
    })

    if (!isNumericDraft(value)) return
    if (value === '') { onChangePercent(0, index); return }
    if (value.endsWith('.') || value.endsWith(',')) return

    const decimalPart = value.split(/[.,]/)[1]
    if (decimalPart && decimalPart.length > 2) return

    onChangePercent(parseNumber(value), index)
  }

  const totalPercentage = useMemo(() => percentages.reduce((a, c) => a + c, 0), [percentages])

  const spendValues = useMemo(
    () => percentages.map(p => Math.round((totalBudget * p) / 100)),
    [percentages, totalBudget],
  )

  const recommendedPercentagesByMonth = useMemo(
    () =>
      period.map(month => {
        const monthKey = monthLabelToKey(month)
        return recommendedPercentages?.get(monthKey) ?? 0
      }),
    [period, recommendedPercentages],
  )

  const totalRecommendedPercentage = useMemo(
    () => recommendedPercentagesByMonth.reduce((a, c) => a + c, 0),
    [recommendedPercentagesByMonth],
  )
  const totalSpend = useMemo(() => spendValues.reduce((a, c) => a + c, 0), [spendValues])
  const visibleTreeRows = useMemo(() => pruneZeroRows(treeRows), [treeRows])

  const monthlyForRow = (rowTotal: number, index: number) => Math.round((rowTotal * percentages[index]) / 100)
  const formatAmount = (value: number) => formatCurrencyWithSuffixSymbol(value, currency, { min: 0, max: 0 })
  const formatPct = (value: number) => `${parseFloat(value.toFixed(2))}%`

  const columns = [
    {
      title: '',
      dataIndex: 'label',
      minWidth: 240,
      align: 'left',
      render: (value: string, row: any) => {
        if (row.type === 'percent') return value
        if (row.type === 'consumption') return value
        if (row.type === 'spend') return <NoWrapSpan><BoldText>{value}</BoldText></NoWrapSpan>
        if (row.type === 'tab') return <NoWrapSpan><BoldText>{value}</BoldText></NoWrapSpan>
        if (row.type === 'text') return <NoWrapSpan>{value}</NoWrapSpan>
        return <NoWrapSpan>{value}</NoWrapSpan>
      },
    },
    {
      title: <NoWrapSpan>Total</NoWrapSpan>,
      dataIndex: 'rowTotal',
      width: 120,
      align: 'left',
      render: (_: any, row: any) => {
        if (row.type === 'percent' || row.type === 'text') return formatPct(totalPercentage)
        if (row.type === 'consumption')
           return formatPct(totalRecommendedPercentage)
        if (row.type === 'spend') return <BoldText>{formatAmount(totalSpend)}</BoldText>
        if (row.rowTotal !== undefined) {
          const allocated = Math.round((row.rowTotal * totalPercentage) / 100)
          return <BoldText>{formatAmount(allocated)}</BoldText>
        }
        return null
      },
    },
    ...period.map((month, index) => ({
      title: <NoWrapSpan>{month}</NoWrapSpan>,
      dataIndex: `col-${index}`,
      minWidth: '80px',
      align: 'left',
      render: (_: any, row: any) => {
        if (row.type === 'percent') {
          return (
            <Form.Item name={['seasonality', index]} rules={seasonalityRules} validateTrigger='onChange' preserve>
              <Input
                id={`media_plan_budget_distribution-seasonality-${index}-inp`}
                onChange={event => onChangePercentInput(event.target.value, index)}
                disabled={disabled}
              />
            </Form.Item>
          )
        }
        if (row.type === 'consumption')
            return formatPct(recommendedPercentagesByMonth[index] ?? 0)
        if (row.type === 'text') return formatPct(percentages[index] ?? 0)
        if (row.type === 'spend') return <BoldText>{formatAmount(spendValues[index] ?? 0)}</BoldText>
        if (row.rowTotal !== undefined) {
          return <Text.Body>{formatAmount(monthlyForRow(row.rowTotal, index))}</Text.Body>
        }
        return null
      },
    })),
  ]

  const dataSource = [
    { key: 'pct', label: 'Seasonality (%)', type: 'percent' },
    {
      key: 'cons',
      label: 'Recommended Seasonality  (%)',
      type: 'consumption',
    },
    ...(totalBudget > 0 && totalSpend > 0
      ? [
          {
            key: 'spend',
            label: <BoldText>Total Spend</BoldText>,
            type: 'spend',
            children: visibleTreeRows.length > 0 ? visibleTreeRows : undefined,
          },
        ]
      : []),
  ]

  const expandable: TableProps<any>['expandable'] = {
    expandIcon: ({
      expanded,
      onExpand,
      record,
    }: {
      expanded: boolean
      onExpand: (r: any, e: any) => void
      record: any
    }) =>
      record.children ? (
        <ExpandIcon expanded={expanded} onClick={(e: MouseEvent<HTMLSpanElement>) => onExpand(record, e)}>
          <Icon name='chevronDown' width={12} height={12} color={colors.cloud_80} />
        </ExpandIcon>
      ) : (
        <ExpandIconSpacer />
      ),
  }

  return (
    <Container.Section>
      <Text.H5>Spend Budget Distribution</Text.H5>
      {errorMessage ? <ErrorText>{errorMessage}</ErrorText> : null}

      <Table
        id='media_plan_budget_distribution-spend-tbl'
        cellsIdPrefix='media_plan_budget_distribution'
        pagination={false}
        columns={columns as any}
        dataSource={dataSource}
        scroll={{ x: true }}
        {...({ expandable } as any)}
      />
    </Container.Section>
  )
}

export default SpendBudgetDistribution
