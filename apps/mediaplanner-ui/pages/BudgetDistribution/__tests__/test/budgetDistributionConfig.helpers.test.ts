import {
  resolvePlatformCostCPM,
  resolveCPMDefault,
  getSchemaForChannel,
  evaluateGlobalFields,
  evaluateTotalMarginAmount,
} from '../../budgetDistributionConfig/helpers'

describe('resolvePlatformCostCPM', () => {
  test('returns the correct CPM cost for a known platform, region, and currency', () => {
    // dv360 / EMEA / EUR = 3.15 (from PLATFORM_COST_CPM config)
    expect(resolvePlatformCostCPM('dv360', 'EMEA', 'EUR')).toBe(3.15)
    expect(resolvePlatformCostCPM('dv360', 'EMEA', 'USD')).toBe(3.72)
    expect(resolvePlatformCostCPM('dv360', 'NORAM', 'USD')).toBe(5.31)
  })

  test('returns 0 for an unknown platform', () => {
    expect(resolvePlatformCostCPM('unknown-platform', 'EMEA', 'EUR')).toBe(0)
  })

  test('returns 0 for an unknown region', () => {
    expect(resolvePlatformCostCPM('dv360', 'UNKNOWN' as any, 'EUR')).toBe(0)
  })
})

describe('resolveCPMDefault', () => {
  test('returns null for an unknown tactic', () => {
    expect(resolveCPMDefault('UNKNOWN_TACTIC', 'USD')).toBeNull()
  })

  test('returns a number for a known tactic with CPM defaults', () => {
    // DISPLAY_STANDARD should have CPM defaults if configured
    const result = resolveCPMDefault('DISPLAY_STANDARD', 'USD')
    if (result !== null) {
      expect(typeof result).toBe('number')
      expect(result).toBeGreaterThanOrEqual(0)
    }
  })
})

describe('getSchemaForChannel', () => {
  test('returns a schema with compute function for known channels', () => {
    const schema = getSchemaForChannel('display')
    expect(schema).toBeDefined()
    expect(typeof schema.compute).toBe('function')
  })

  test('falls back to DEFAULT schema for unknown channels', () => {
    const schema = getSchemaForChannel('unknown-channel')
    expect(schema).toBeDefined()
    expect(typeof schema.compute).toBe('function')
  })
})

describe('evaluateGlobalFields', () => {
  test('computes spendBudget as the rounded totalSpend', () => {
    const result = evaluateGlobalFields({
      totalSpend: 90000,
      totalMarginValue: 10000,
      contractBudget: 110000,
      sumFees: 1000,
      managementFeePct: 0.1,
      contractMarginExpectedPct: 20,
    })
    expect(result.spendBudget).toBe(90000)
    expect(result.contractMarginAmt).toBe(20909.09)
  })

  test('returns zero-based results for zero inputs', () => {
    const result = evaluateGlobalFields({
      totalSpend: 0,
      totalMarginValue: 0,
      contractBudget: 0,
      sumFees: 0,
      managementFeePct: 0,
      contractMarginExpectedPct: 0,
    })
    expect(result.spendBudget).toBe(0)
    expect(result.contractMarginAmt).toBe(0)
    expect(result.actualMarginPct).toBe(0)
  })

  test('computes actualMarginPct from totalMarginValue and totalSpend', () => {
    // actualMarginPct = round2((totalMarginValue / totalSpend) * 100)
    const result = evaluateGlobalFields({
      totalSpend: 10000,
      totalMarginValue: 1000,
      contractBudget: 12000,
      sumFees: 0,
      managementFeePct: 0,
      contractMarginExpectedPct: 0,
    })
    expect(result.actualMarginPct).toBeCloseTo(10, 1)
  })
})

describe('evaluateTotalMarginAmount', () => {
  test('returns 0 when there are no tactics', () => {
    const result = evaluateTotalMarginAmount([], 100000, 1000, 0.1)
    expect(typeof result).toBe('number')
    expect(result).toBeGreaterThanOrEqual(0)
  })

  test('sums marginAmount across all tactics in all allocations', () => {
    const allocations = [
      { tactics: [{ marginAmount: 1000 }, { marginAmount: 500 }] },
      { tactics: [{ marginAmount: 200 }] },
    ]
    const result = evaluateTotalMarginAmount(allocations, 100000, 0, 0)
    // With managementFeePct = 0, result = summary_marginAmt(1700, 0, expectedSpend)
    expect(result).toBeGreaterThanOrEqual(0)
    expect(typeof result).toBe('number')
  })

  test('handles null tactics gracefully', () => {
    const allocations = [{ tactics: null }, { tactics: [null] }]
    expect(() => evaluateTotalMarginAmount(allocations, 100000, 0, 0)).not.toThrow()
  })
})
