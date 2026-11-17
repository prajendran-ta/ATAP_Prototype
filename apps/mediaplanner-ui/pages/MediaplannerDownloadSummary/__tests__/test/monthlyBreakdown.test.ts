import { buildMonthlyRows } from '../../monthlyBreakdown'
import type { MockMonthlyBreakdown } from '../../../MediaplannerProductSettings/mockSalesforcePlans'

const breakdown: MockMonthlyBreakdown = {
  months: ['Jan-26', 'Feb-26'],
  seasonalPct: [50, 50],
  platforms: [
    {
      category: 'Lower Funnel',
      platform: 'Search',
      monthly: [100, 100],
    },
    {
      category: 'Upper Funnel',
      platform: 'Social',
      monthly: [300, 300],
    },
  ],
}

describe('buildMonthlyRows', () => {
  test('scales monthly totals to the Step 3 total spend', () => {
    const rows = buildMonthlyRows(breakdown, 'USD', { totalSpend: 1000, seasonalPct: [25, 75] })

    const totalRow = rows.find(row => row.key === 'total')
    expect(totalRow?.total).toContain('1,000')
    expect(totalRow?.m0).toContain('250')
    expect(totalRow?.m1).toContain('750')
  })

  test('removes platform rows missing from Step 3 allocations', () => {
    const rows = buildMonthlyRows(
      {
        months: ['Jan-26', 'Feb-26'],
        seasonalPct: [50, 50],
        platforms: [
          {
            category: 'Display',
            platform: 'Display Prospecting',
            monthly: [100, 100],
          },
          {
            category: 'Metasearch',
            platform: 'Amadeus Hotel Metasearch',
            monthly: [200, 200],
          },
        ],
      },
      'USD',
      {
        totalSpend: 1000,
        seasonalPct: [50, 50],
        allocations: [
          {
            channel: 'DISPLAY',
            tactics: [{ spendAmount: 1000 } as MediaplannerQL.TacticAllocation],
          } as MediaplannerQL.MediaAllocation,
          {
            channel: 'PAID_SEARCH',
            tactics: [{ spendAmount: 500 } as MediaplannerQL.TacticAllocation],
          } as MediaplannerQL.MediaAllocation,
        ],
      },
    )

    const displayRow = rows.find(row => row.label === 'Display Prospecting')
    const metasearchRow = rows.find(row => row.label === 'Amadeus Hotel Metasearch')

    expect(displayRow?.total).toContain('1,000')
    expect(metasearchRow).toBeUndefined()
    expect(rows.find(row => row.label === 'Metasearch')).toBeUndefined()
  })

  test('removes unavailable platform names from mixed media initiative labels', () => {
    const rows = buildMonthlyRows(
      {
        months: ['Jan-26', 'Feb-26'],
        seasonalPct: [50, 50],
        platforms: [
          {
            category: 'Acquire New Customers',
            platform: 'Acquire New Customers (Demand Gen, YouTube, TikTok & Meta Prospecting)',
            monthly: [100, 100],
          },
        ],
      },
      'USD',
      {
        totalSpend: 1000,
        seasonalPct: [50, 50],
        allocations: [
          {
            channel: 'SOCIAL',
            tactics: [{ spendAmount: 1000 } as MediaplannerQL.TacticAllocation],
          } as MediaplannerQL.MediaAllocation,
        ],
      },
    )

    const initiativeRow = rows.find(row => row.rowType === 'platform-values')
    expect(initiativeRow?.label).toBe('Acquire New Customers (TikTok & Meta Prospecting)')
    expect(initiativeRow?.label).not.toContain('Demand Gen')
    expect(initiativeRow?.label).not.toContain('YouTube')
  })
})
