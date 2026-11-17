import {
  monthLabelToISO,
  normalizeMonthKey,
  buildPeriodFromRange,
  sameDistribution,
  getCurrencySymbol,
  buildTreeRows,
  buildInitialTabsFromSchema,
  buildTabsFromBdResponse,
  buildAllocationsFromTabs,
  recalculateTabs,
} from '../../helpers'

// ─────────────────────────────────────────────────────────────────────────────
// monthLabelToISO
// ─────────────────────────────────────────────────────────────────────────────
describe('monthLabelToISO', () => {
  test('converts "Jan 2025" to ISO string', () => {
    expect(monthLabelToISO('Jan 2025')).toBe('2025-01-01')
  })

  test('converts "Dec 2024" to ISO string', () => {
    expect(monthLabelToISO('Dec 2024')).toBe('2024-12-01')
  })

  test('converts all month abbreviations correctly', () => {
    expect(monthLabelToISO('Feb 2025')).toBe('2025-02-01')
    expect(monthLabelToISO('Jun 2025')).toBe('2025-06-01')
    expect(monthLabelToISO('Sep 2026')).toBe('2026-09-01')
  })

  test('returns the original string when month abbreviation is unknown', () => {
    expect(monthLabelToISO('Unknown 2025')).toBe('Unknown 2025')
  })

  test('returns the original string when there is no space', () => {
    expect(monthLabelToISO('2025-01-01')).toBe('2025-01-01')
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// normalizeMonthKey
// ─────────────────────────────────────────────────────────────────────────────
describe('normalizeMonthKey', () => {
  test('normalizes ISO date with any day to the first of the month', () => {
    expect(normalizeMonthKey('2025-01-15')).toBe('2025-01-01')
    expect(normalizeMonthKey('2025-12-31')).toBe('2025-12-01')
  })

  test('returns an already-normalized ISO date unchanged', () => {
    expect(normalizeMonthKey('2025-06-01')).toBe('2025-06-01')
  })

  test('converts DD-MMM-YYYY format to ISO first-of-month', () => {
    expect(normalizeMonthKey('01-Jan-2025')).toBe('2025-01-01')
    expect(normalizeMonthKey('15-Dec-2024')).toBe('2024-12-01')
  })

  test('returns value as-is for unrecognized formats', () => {
    expect(normalizeMonthKey('unknown')).toBe('unknown')
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// buildPeriodFromRange
// ─────────────────────────────────────────────────────────────────────────────
describe('buildPeriodFromRange', () => {
  test('returns empty array when start is undefined', () => {
    expect(buildPeriodFromRange(undefined, '2025-03-01')).toEqual([])
  })

  test('returns empty array when end is undefined', () => {
    expect(buildPeriodFromRange('2025-01-01', undefined)).toEqual([])
  })

  test('returns empty array for invalid date strings', () => {
    expect(buildPeriodFromRange('invalid', 'invalid')).toEqual([])
  })

  test('builds correct month labels for a 3-month range', () => {
    // Use mid-month dates to avoid UTC-to-local timezone edge cases
    const result = buildPeriodFromRange('2025-01-15', '2025-03-15')
    expect(result).toEqual(['Jan 2025', 'Feb 2025', 'Mar 2025'])
  })

  test('returns a single month label when start and end are in the same month', () => {
    expect(buildPeriodFromRange('2025-06-10', '2025-06-20')).toEqual(['Jun 2025'])
  })

  test('builds ascending range even when end is before start (swaps order)', () => {
    const result = buildPeriodFromRange('2025-03-15', '2025-01-15')
    expect(result).toEqual(['Jan 2025', 'Feb 2025', 'Mar 2025'])
  })

  test('spans year boundary correctly', () => {
    const result = buildPeriodFromRange('2025-11-15', '2026-01-15')
    expect(result).toEqual(['Nov 2025', 'Dec 2025', 'Jan 2026'])
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// sameDistribution
// ─────────────────────────────────────────────────────────────────────────────
describe('sameDistribution', () => {
  test('returns true for two empty arrays', () => {
    expect(sameDistribution([], [])).toBe(true)
  })

  test('returns false when lengths differ', () => {
    expect(sameDistribution([{ month: '2025-01-01', spendPct: 10 }], [])).toBe(false)
  })

  test('returns true for identical distributions', () => {
    const a = [
      { month: '2025-01-01', spendPct: 50 },
      { month: '2025-02-01', spendPct: 50 },
    ]
    const b = [
      { month: '2025-01-01', spendPct: 50 },
      { month: '2025-02-01', spendPct: 50 },
    ]
    expect(sameDistribution(a, b)).toBe(true)
  })

  test('returns false when a month value differs', () => {
    const a = [{ month: '2025-01-01', spendPct: 50 }]
    const b = [{ month: '2025-02-01', spendPct: 50 }]
    expect(sameDistribution(a, b)).toBe(false)
  })

  test('returns false when a spendPct value differs', () => {
    const a = [{ month: '2025-01-01', spendPct: 50 }]
    const b = [{ month: '2025-01-01', spendPct: 100 }]
    expect(sameDistribution(a, b)).toBe(false)
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// getCurrencySymbol
// ─────────────────────────────────────────────────────────────────────────────
describe('getCurrencySymbol', () => {
  test('returns $ for USD', () => {
    expect(getCurrencySymbol('USD' as any)).toBe('$')
  })

  test('returns € for EUR', () => {
    expect(getCurrencySymbol('EUR' as any)).toBe('€')
  })

  test('falls back to the default currency symbol (€) for an unknown currency code', () => {
    expect(getCurrencySymbol('XXX' as any)).toBe('€')
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// buildInitialTabsFromSchema
// ─────────────────────────────────────────────────────────────────────────────
describe('buildInitialTabsFromSchema', () => {
  test('returns a non-empty array', () => {
    expect(buildInitialTabsFromSchema().length).toBeGreaterThan(0)
  })

  test('all digital tactics start with empty spend', () => {
    const tabs = buildInitialTabsFromSchema()
    tabs
      .filter(t => t.type !== 'metasearch')
      .forEach(tab => tab.platforms.forEach(p => p.tactics.forEach(tc => expect(tc.values.spend).toBeUndefined())))
  })

  test('all digital tactics start enabled', () => {
    const tabs = buildInitialTabsFromSchema()
    tabs
      .filter(t => t.type !== 'metasearch')
      .forEach(tab => tab.platforms.forEach(p => p.tactics.forEach(tc => expect(tc.enabled).toBe(true))))
  })

  test('includes a metasearch tab', () => {
    expect(buildInitialTabsFromSchema().some(t => t.id === 'metasearch')).toBe(true)
  })

  test('includes a paid-search tab', () => {
    expect(buildInitialTabsFromSchema().some(t => t.id === 'paid-search')).toBe(true)
  })

  test('produces the same number of tabs regardless of currency', () => {
    const usd = buildInitialTabsFromSchema('USD' as any)
    const eur = buildInitialTabsFromSchema('EUR' as any)
    expect(eur).toHaveLength(usd.length)
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// buildTreeRows
// ─────────────────────────────────────────────────────────────────────────────
describe('buildTreeRows', () => {
  test('returns one row per tab', () => {
    const tabs = buildInitialTabsFromSchema()
    expect(buildTreeRows(tabs)).toHaveLength(tabs.length)
  })

  test('all row totals are 0 for fresh tabs', () => {
    const tabs = buildInitialTabsFromSchema()
    buildTreeRows(tabs).forEach(row => expect(row.rowTotal).toBe(0))
  })

  test('row total reflects tactic spend correctly', () => {
    const tabs = buildInitialTabsFromSchema()
    const socialTab = tabs.find(t => t.id === 'social')!
    const fbPlatform = socialTab.platforms.find(p => p.id === 'facebook-ig')!
    const prosp = fbPlatform.tactics.find(t => t.id.endsWith('-prospecting'))!
    prosp.values.spend = 5000
    const socialRow = buildTreeRows(tabs).find(r => r.key === 'social')!
    expect(socialRow.rowTotal).toBe(5000)
  })

  test('metasearch row has type "tab" and monthly columns', () => {
    const tabs = buildInitialTabsFromSchema()
    const row = buildTreeRows(tabs).find(r => r.key === 'metasearch')!
    expect(row.type).toBe('tab')
    expect(row).toHaveProperty('col-0')
    expect(row).toHaveProperty('col-11')
  })

  test('disabled platform tactics are excluded from children', () => {
    const tabs = buildInitialTabsFromSchema()
    const psTab = tabs.find(t => t.id === 'paid-search')!
    psTab.platforms.forEach(p => {
      p.enabled = false
      p.tactics.forEach(tc => { tc.enabled = false })
    })
    const psRow = buildTreeRows(tabs).find(r => r.key === 'paid-search')!
    expect(psRow.children).toBeUndefined()
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// buildTabsFromBdResponse
// ─────────────────────────────────────────────────────────────────────────────
describe('buildTabsFromBdResponse', () => {
  test('disables all digital platforms and tactics when allocations is empty', () => {
    const tabs = buildTabsFromBdResponse([])
    tabs
      .filter(t => t.type !== 'metasearch')
      .forEach(tab =>
        tab.platforms.forEach(p => {
          expect(p.enabled).toBe(false)
          p.tactics.forEach(tc => expect(tc.enabled).toBe(false))
        }),
      )
  })

  test('enables the correct platform and tactic from a PAID_SEARCH allocation', () => {
    const allocs = [
      { channel: 'PAID_SEARCH', tactics: [{ platform: 'GOOGLE_ADS', tactic: 'BRAND', spendAmount: 3000 }] },
    ]
    const tabs = buildTabsFromBdResponse(allocs as any)
    const psTab = tabs.find(t => t.id === 'paid-search')!
    const gAds = psTab.platforms.find(p => p.id === 'google-ads')!
    expect(gAds.enabled).toBe(true)
    const brand = gAds.tactics.find(tc => tc.id === 'google-ads-brand')!
    expect(brand.enabled).toBe(true)
    expect(brand.values.spend).toBe(3000)
  })

  test('sets cpm and marginPct from allocation when provided', () => {
    const allocs = [
      {
        channel: 'DISPLAY',
        tactics: [
          { platform: 'DV360', tactic: 'PROSPECTING', spendAmount: 1000, cpmAmount: 5.5, marginPct: 20, calculationMode: 'CPM' },
        ],
      },
    ]
    const tabs = buildTabsFromBdResponse(allocs as any)
    const displayTab = tabs.find(t => t.id === 'display')!
    const dv360 = displayTab.platforms.find(p => p.id === 'dv360')!
    const prosp = dv360.tactics.find(tc => tc.id.endsWith('-prospecting'))!
    expect(prosp.values.cpm).toBe(5.5)
    expect(prosp.values.marginPct).toBe(20)
    expect(prosp.values.calculationMode).toBe('CPM')
  })

  test('maps underscored backend tactics to hyphenated UI ids', () => {
    const allocs = [
      {
        channel: 'DISPLAY',
        tactics: [{ platform: 'DV360', tactic: 'DEMAND_GEN', spendAmount: 10, cpmAmount: 0, calculationMode: 'CPM' }],
      },
      {
        channel: 'SOCIAL',
        tactics: [{ platform: 'FACEBOOK_IG', tactic: 'ADVANTAGE_PLUS', spendAmount: 20, marginPct: 50 }],
      },
    ]

    const tabs = buildTabsFromBdResponse(allocs as any)
    const demandGen = tabs
      .find(t => t.id === 'display')!
      .platforms.find(p => p.id === 'dv360')!
      .tactics.find(tc => tc.id === 'dv360-demand-gen')!
    const advantagePlus = tabs
      .find(t => t.id === 'social')!
      .platforms.find(p => p.id === 'facebook-ig')!
      .tactics.find(tc => tc.id === 'facebook-ig-advantage-plus')!

    expect(demandGen.enabled).toBe(true)
    expect(demandGen.values.spend).toBe(10)
    expect(advantagePlus.enabled).toBe(true)
    expect(advantagePlus.values.spend).toBe(20)
  })

  test('enables correct metasearch platforms', () => {
    const allocs = [{ channel: 'METASEARCH', tactics: [{ platforms: ['TRIVAGO'], spendAmount: 5000 }] }]
    const tabs = buildTabsFromBdResponse(allocs as any)
    const metaTab = tabs.find(t => t.id === 'metasearch')!
    const trivago = metaTab.metasearchPlatforms!.find(p => p.id === 'trivago')!
    expect(trivago.enabled).toBe(true)
    expect(metaTab.metasearchSpend).toBe(5000)
  })

  test('ignores unknown channel names gracefully', () => {
    const allocs = [{ channel: 'UNKNOWN_CHANNEL', tactics: [] }]
    const tabs = buildTabsFromBdResponse(allocs as any)
    expect(tabs).toHaveLength(buildInitialTabsFromSchema().length)
  })

  test('leaves other channels disabled when only one channel is in the response', () => {
    const allocs = [
      { channel: 'SOCIAL', tactics: [{ platform: 'FACEBOOK_IG', tactic: 'PROSPECTING', spendAmount: 1000 }] },
    ]
    const tabs = buildTabsFromBdResponse(allocs as any)
    const psTab = tabs.find(t => t.id === 'paid-search')!
    psTab.platforms.forEach(p => expect(p.enabled).toBe(false))
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// buildAllocationsFromTabs
// ─────────────────────────────────────────────────────────────────────────────
describe('buildAllocationsFromTabs', () => {
  test('returns empty array when no tactics are enabled', () => {
    const tabs = buildTabsFromBdResponse([])
    expect(buildAllocationsFromTabs(tabs, 100000, 0, 0.1)).toHaveLength(0)
  })

  test('returns an allocation for an enabled SOCIAL tactic', () => {
    const allocs = [
      {
        channel: 'SOCIAL',
        tactics: [{ platform: 'FACEBOOK_IG', tactic: 'PROSPECTING', spendAmount: 2000, marginPct: 50 }],
      },
    ]
    const tabs = buildTabsFromBdResponse(allocs as any)
    const result = buildAllocationsFromTabs(tabs, 100000, 0, 0.1)
    const socialAlloc = result.find(a => a.channel === 'SOCIAL')!
    expect(socialAlloc).toBeDefined()
    expect(socialAlloc.budgetAmount).toBe(2000)
    expect(socialAlloc.tactics[0].spendAmount).toBe(2000)
  })

  test('includes a METASEARCH allocation when metasearch platforms are enabled', () => {
    const allocs = [{ channel: 'METASEARCH', tactics: [{ platforms: ['TRIVAGO'], spendAmount: 5000 }] }]
    const tabs = buildTabsFromBdResponse(allocs as any)
    const result = buildAllocationsFromTabs(tabs, 100000, 0, 0.1)
    const metaAlloc = result.find(a => a.channel === 'METASEARCH')!
    expect(metaAlloc).toBeDefined()
    expect(metaAlloc.budgetAmount).toBe(5000)
  })

  test('spendPct values sum to 100 when multiple tactics share the spend', () => {
    const allocs = [
      {
        channel: 'SOCIAL',
        tactics: [
          { platform: 'FACEBOOK_IG', tactic: 'PROSPECTING', spendAmount: 5000 },
          { platform: 'FACEBOOK_IG', tactic: 'REMARKETING', spendAmount: 5000 },
        ],
      },
    ]
    const tabs = buildTabsFromBdResponse(allocs as any)
    const result = buildAllocationsFromTabs(tabs, 100000, 0, 0)
    const totalSpendPct = result.flatMap(a => a.tactics).reduce((s, t) => s + t.spendPct, 0)
    expect(Math.round(totalSpendPct)).toBe(100)
  })

  test('includes calculationMode for DISPLAY channel tactics', () => {
    const allocs = [
      {
        channel: 'DISPLAY',
        tactics: [{ platform: 'DV360', tactic: 'PROSPECTING', spendAmount: 1000, calculationMode: 'CPM', cpmAmount: 3 }],
      },
    ]
    const tabs = buildTabsFromBdResponse(allocs as any)
    const result = buildAllocationsFromTabs(tabs, 100000, 0, 0.1)
    const displayAlloc = result.find(a => a.channel === 'DISPLAY')!
    expect(displayAlloc.tactics[0].calculationMode).toBeDefined()
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// recalculateTabs
// ─────────────────────────────────────────────────────────────────────────────
describe('recalculateTabs', () => {
  test('returns the same number of tabs', () => {
    const tabs = buildInitialTabsFromSchema()
    expect(recalculateTabs(tabs, 100000, 0, 0.1, 'USD', 'EMEA')).toHaveLength(tabs.length)
  })

  test('returns the metasearch tab by reference unchanged', () => {
    const tabs = buildInitialTabsFromSchema()
    const metaBefore = tabs.find(t => t.id === 'metasearch')!
    const result = recalculateTabs(tabs, 100000, 0, 0.1, 'USD', 'EMEA')
    expect(result.find(t => t.id === 'metasearch')).toBe(metaBefore)
  })

  test('preserves platform count for each digital tab', () => {
    const tabs = buildInitialTabsFromSchema()
    const result = recalculateTabs(tabs, 100000, 0, 0.1, 'USD', 'EMEA')
    result
      .filter(t => t.type !== 'metasearch')
      .forEach((tab, i) => expect(tab.platforms).toHaveLength(tabs[i].platforms.length))
  })

  test('recalculated tactic values still have spend property', () => {
    const allocs = [
      { channel: 'SOCIAL', tactics: [{ platform: 'FACEBOOK_IG', tactic: 'PROSPECTING', spendAmount: 5000, marginPct: 50 }] },
    ]
    const tabs = buildTabsFromBdResponse(allocs as any)
    const result = recalculateTabs(tabs, 100000, 0, 0.1, 'USD', 'EMEA')
    const socialTab = result.find(t => t.id === 'social')!
    const fbPlatform = socialTab.platforms.find(p => p.id === 'facebook-ig')!
    const prosp = fbPlatform.tactics.find(tc => tc.id.endsWith('-prospecting'))!
    expect(prosp.values).toHaveProperty('spend')
    expect(prosp.values.spend).toBe(5000)
  })
})
