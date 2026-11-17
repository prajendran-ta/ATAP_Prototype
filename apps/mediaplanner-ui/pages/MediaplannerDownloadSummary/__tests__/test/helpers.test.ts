import {
  formatNumber,
  formatPercent,
  formatCurrency,
  formatDate,
  formatMonthLabel,
  getTacticRowLabel,
  buildMonthColumns,
  buildBudgetDataSource,
  buildOverviewRows,
  buildCsvContent,
  DEFAULT_MONTHS,
} from '../../helpers'

// ─────────────────────────────────────────────────────────────────────────────
// Formatting utilities
// ─────────────────────────────────────────────────────────────────────────────

describe('formatNumber', () => {
  test('formats integer numbers with locale separators', () => {
    const result = formatNumber(1000)
    expect(typeof result).toBe('string')
    expect(result).toContain('1')
    expect(result).toContain('000')
  })

  test('formats zero', () => {
    expect(formatNumber(0)).toBe('0')
  })

  test('formats decimal numbers', () => {
    const result = formatNumber(1234.56)
    expect(result).toContain('1')
  })
})

describe('formatPercent', () => {
  test('formats a percentage with 2 decimal places', () => {
    expect(formatPercent(50)).toBe('50.00%')
  })

  test('formats zero', () => {
    expect(formatPercent(0)).toBe('0.00%')
  })

  test('formats fractional percentage', () => {
    expect(formatPercent(12.5)).toBe('12.50%')
  })
})

describe('formatCurrency', () => {
  test('formats USD with symbol suffix', () => {
    const result = formatCurrency(1000, 'USD')
    expect(result).toContain('1,000')
    expect(result).toMatch(/\$$/)
  })

  test('formats EUR with symbol suffix', () => {
    const result = formatCurrency(500, 'EUR')
    expect(result).toContain('500')
    expect(result).toMatch(/€$/)
  })

  test('falls back to formatNumber when no currency provided', () => {
    const result = formatCurrency(1000)
    expect(typeof result).toBe('string')
  })

  test('falls back gracefully for invalid currency code', () => {
    const result = formatCurrency(100, 'INVALID')
    expect(result).toContain('100')
    expect(result).toContain('INVALID')
  })
})

describe('formatDate', () => {
  test('returns "—" for undefined', () => {
    expect(formatDate(undefined)).toBe('—')
  })

  test('formats YYYY-MM-DD to DD-MMM-YYYY', () => {
    expect(formatDate('2026-01-15')).toBe('15-Jan-2026')
  })

  test('returns the value as-is for unrecognised formats', () => {
    expect(formatDate('some-garbage')).toBe('some-garbage')
  })

  test('parses existing DD-MMM-YYYY and returns same format', () => {
    const result = formatDate('01-Jan-2026')
    expect(result).toBe('01-Jan-2026')
  })
})

describe('formatMonthLabel', () => {
  test('converts YYYY-MM-DD to MMM YYYY', () => {
    expect(formatMonthLabel('2026-01-01')).toBe('Jan 2026')
  })

  test('converts DD-MMM-YYYY to MMM YYYY', () => {
    expect(formatMonthLabel('01-Mar-2026')).toBe('Mar 2026')
  })

  test('returns already-formatted labels unchanged', () => {
    expect(formatMonthLabel('Jan 2026')).toBe('Jan 2026')
  })

  test('returns unrecognised strings as-is', () => {
    expect(formatMonthLabel('garbage')).toBe('garbage')
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// getTacticRowLabel
// ─────────────────────────────────────────────────────────────────────────────

describe('getTacticRowLabel', () => {
  test('returns "Unspecified Tactic" when no identifiers are present', () => {
    const tactic = { platform: null, tactic: null, platforms: [] } as any
    expect(getTacticRowLabel(tactic)).toBe('Unspecified Tactic')
  })

  test('joins multiple platforms with " + " when platforms array is set', () => {
    const tactic = {
      platform: null,
      tactic: null,
      platforms: ['UNKNOWN_A', 'UNKNOWN_B'],
    } as any
    const result = getTacticRowLabel(tactic)
    expect(result).toContain('+')
  })

  test('returns platform label when only platform is present', () => {
    const tactic = {
      platform: 'UNKNOWN_PLATFORM',
      tactic: null,
      platforms: [],
    } as any
    const result = getTacticRowLabel(tactic)
    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(0)
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// buildMonthColumns
// ─────────────────────────────────────────────────────────────────────────────

describe('buildMonthColumns', () => {
  test('returns DEFAULT_MONTHS when distribution is empty or undefined', () => {
    const result = buildMonthColumns(undefined)
    expect(result).toHaveLength(DEFAULT_MONTHS.length)
    expect(result[0].monthLabel).toBe(DEFAULT_MONTHS[0])
    expect(result.every(m => m.spendPct === 0)).toBe(true)
  })

  test('returns DEFAULT_MONTHS when distribution is an empty array', () => {
    const result = buildMonthColumns([])
    expect(result).toHaveLength(DEFAULT_MONTHS.length)
  })

  test('maps backend distribution to month columns', () => {
    const distribution = [
      { month: '2026-01-01', spendPct: 10 },
      { month: '2026-02-01', spendPct: 20 },
    ]
    const result = buildMonthColumns(distribution)
    expect(result).toHaveLength(2)
    expect(result[0].key).toBe('m0')
    expect(result[0].monthLabel).toBe('Jan 2026')
    expect(result[0].spendPct).toBe(10)
    expect(result[1].spendPct).toBe(20)
  })

  test('treats null spendPct as 0', () => {
    const distribution = [{ month: '2026-01-01', spendPct: null }]
    const result = buildMonthColumns(distribution)
    expect(result[0].spendPct).toBe(0)
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// buildBudgetDataSource
// ─────────────────────────────────────────────────────────────────────────────

const monthColumns = [
  { key: 'm0', monthLabel: 'Jan 2026', spendPct: 50 },
  { key: 'm1', monthLabel: 'Feb 2026', spendPct: 50 },
]

describe('buildBudgetDataSource', () => {
  test('returns only a percentage row and total row when no allocations', () => {
    const result = buildBudgetDataSource({ allocations: undefined, monthColumns, currency: 'USD', spendBudget: 1000 })
    expect(result).toHaveLength(2)
    expect(result[0].key).toBe('pct')
    expect(result[result.length - 1].key).toBe('total-spend')
  })

  test('includes tactic rows between percentage and total rows', () => {
    const allocations = [
      {
        tactics: [
          { platform: 'GOOGLE', tactic: null, platforms: null, spendAmount: 5000 },
        ],
      },
    ]
    const result = buildBudgetDataSource({ allocations, monthColumns, currency: 'USD', spendBudget: 10000 })
    expect(result.length).toBeGreaterThan(2)
    expect(result[0].key).toBe('pct')
    expect(result[result.length - 1].key).toBe('total-spend')
  })

  test('omits tactic rows with zero spend amount', () => {
    const allocations = [
      {
        tactics: [
          { platform: 'GOOGLE', tactic: null, platforms: null, spendAmount: 1000 },
          { platform: 'BING', tactic: null, platforms: null, spendAmount: 0 },
        ],
      },
    ]
    const result = buildBudgetDataSource({ allocations, monthColumns, currency: 'USD', spendBudget: 1000 })
    const tacticRows = result.filter(r => r.key.startsWith('allocation-'))

    expect(tacticRows).toHaveLength(1)
    expect(tacticRows[0].channel).toContain('Google')
  })

  test('total row uses formatted spendBudget', () => {
    const result = buildBudgetDataSource({ allocations: [], monthColumns, currency: 'USD', spendBudget: 5000 })
    const totalRow = result.find(r => r.key === 'total-spend')
    expect(totalRow?.total).toContain('5,000')
  })

  test('breakdown rows do not include currency symbol', () => {
    const allocations = [
      {
        channel: 'DISPLAY',
        tactics: [{ platform: 'GOOGLE_ADS', tactic: 'BRAND', platforms: null, spendAmount: 5000 }],
      },
    ]

    const result = buildBudgetDataSource({ allocations, monthColumns, currency: 'USD', spendBudget: 5000 })
    const rowValues = result
      .filter(r => ['channel', 'tactic', 'total'].includes(r.rowType))
      .flatMap(r => [String(r.total ?? ''), String(r.m0 ?? ''), String(r.m1 ?? '')])

    rowValues.forEach(value => {
      expect(value).not.toContain('$')
    })
  })

  test('percentage row sums spendPct across month columns', () => {
    const result = buildBudgetDataSource({ allocations: [], monthColumns, currency: 'USD', spendBudget: 0 })
    const pctRow = result.find(r => r.key === 'pct')
    expect(pctRow?.total).toBe('100.00%')
  })

  test('scales tactic and total rows by cumulative seasonality percentage', () => {
    const unevenMonths = [
      { key: 'm0', monthLabel: 'Jul 2026', spendPct: 7 },
      { key: 'm1', monthLabel: 'Aug 2026', spendPct: 7 },
      { key: 'm2', monthLabel: 'Sep 2026', spendPct: 7 },
      { key: 'm3', monthLabel: 'Oct 2026', spendPct: 7 },
      { key: 'm4', monthLabel: 'Nov 2026', spendPct: 7 },
      { key: 'm5', monthLabel: 'Dec 2026', spendPct: 7 },
      { key: 'm6', monthLabel: 'Jan 2027', spendPct: 7 },
      { key: 'm7', monthLabel: 'Feb 2027', spendPct: 7 },
      { key: 'm8', monthLabel: 'Mar 2027', spendPct: 7 },
      { key: 'm9', monthLabel: 'Apr 2027', spendPct: 7 },
      { key: 'm10', monthLabel: 'May 2027', spendPct: 7 },
      { key: 'm11', monthLabel: 'Jun 2027', spendPct: 7 },
      { key: 'm12', monthLabel: 'Jul 2027', spendPct: 7 },
    ]
    const allocations = [
      {
        tactics: [{ platform: 'GOOGLE', tactic: 'BRAND', platforms: null, spendAmount: 10000 }],
      },
    ]

    const result = buildBudgetDataSource({
      allocations,
      monthColumns: unevenMonths,
      currency: 'USD',
      spendBudget: 10000,
    })

    const tacticRow = result.find(r => r.key.startsWith('allocation-'))
    const totalRow = result.find(r => r.key === 'total-spend')

    expect(tacticRow?.total).toContain('9,100')
    expect(totalRow?.total).toContain('9,100')
    expect(tacticRow?.m0).toContain('700')
    expect(totalRow?.m0).toContain('700')
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// buildOverviewRows
// ─────────────────────────────────────────────────────────────────────────────

const overviewParams = {
  planName: 'Alpha Campaign',
  opportunityId: 'SF-001',
  proposalId: 'PROP-001',
  hotelName: 'Hotel Alpha',
  regionKey: 'EMEA',
  bpid: 'BP001',
  startDate: '01-Jan-2026',
  endDate: '31-Dec-2026',
  contractBudgetTarget: 100000,
  currency: 'USD',
  planTypeKey: 'NEW',
  managementFeePct: 10,
  globalFeeAmount: 5000,
  spendBudget: 90000,
  setupFee: 500,
  metasearchSetupFee: 200,
  metasearchConnectivityFee: 150,
  creativeFee: 300,
  videoCreativeFee: 400,
}

describe('buildOverviewRows', () => {
  test('returns 18 overview rows', () => {
    const rows = buildOverviewRows(overviewParams)
    expect(rows).toHaveLength(18)
  })

  test('uses "—" as fallback for null or missing values', () => {
    const rows = buildOverviewRows({
      ...overviewParams,
      planName: null,
      opportunityId: null,
      proposalId: null,
    })
    const planNameRow = rows.find(r => r.label === 'Media Plan Name')
    expect(planNameRow?.value).toBe('—')
  })

  test('formats the plan name correctly', () => {
    const rows = buildOverviewRows(overviewParams)
    expect(rows.find(r => r.label === 'Media Plan Name')?.value).toBe('Alpha Campaign')
  })

  test('maps region key to human-readable label', () => {
    const rows = buildOverviewRows(overviewParams)
    expect(rows.find(r => r.label === 'Region')?.value).toBe('EMEA')
  })

  test('formats the total contract budget as currency', () => {
    const rows = buildOverviewRows(overviewParams)
    const budgetRow = rows.find(r => r.label === 'Total Contract Budget')
    expect(budgetRow?.value).toContain('100,000')
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// buildCsvContent
// ─────────────────────────────────────────────────────────────────────────────

describe('buildCsvContent', () => {
  const overviewRows = [
    { label: 'Plan Name', value: 'Alpha Campaign' },
    { label: 'Region', value: 'EMEA' },
  ]
  const headers = ['Channel', 'Total', 'Jan 2026']
  const dataSource = [
    { key: 'row1', channel: 'Display', total: '$5,000.00', m0: '$2,500.00' },
  ] as any
  const cols = [{ key: 'm0', monthLabel: 'Jan 2026', spendPct: 100 }]

  test('includes overview rows in the output', () => {
    const csv = buildCsvContent({ overviewRows, headers, dataSource, monthColumns: cols })
    expect(csv).toContain('Plan Name')
    expect(csv).toContain('Alpha Campaign')
    expect(csv).toContain('Region')
    expect(csv).toContain('EMEA')
  })

  test('includes column headers', () => {
    const csv = buildCsvContent({ overviewRows, headers, dataSource, monthColumns: cols })
    expect(csv).toContain('Channel')
    expect(csv).toContain('Total')
  })

  test('includes data rows', () => {
    const csv = buildCsvContent({ overviewRows, headers, dataSource, monthColumns: cols })
    expect(csv).toContain('Display')
  })

  test('escapes double quotes in values', () => {
    const rowsWithQuotes = [{ label: 'Name "quoted"', value: 'val' }]
    const csv = buildCsvContent({ overviewRows: rowsWithQuotes, headers, dataSource: [], monthColumns: [] })
    expect(csv).toContain('""quoted""')
  })
})
