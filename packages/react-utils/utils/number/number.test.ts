import { formatNumber, formatCurrency } from './number'

// formatNumber
describe('formatNumber', () => {
  it('formats an integer with thousand separators', () => {
    expect(formatNumber(1000000)).toBe('1,000,000')
  })

  it('formats zero', () => {
    expect(formatNumber(0)).toBe('0')
  })

  it('formats a decimal number', () => {
    expect(formatNumber(1234.56)).toBe('1,234.56')
  })
})

// formatCurrency
describe('formatCurrency', () => {
  it('formats a value with a currency symbol using narrowSymbol display', () => {
    expect(formatCurrency(1500, 'USD')).toBe('$1,500')
  })

  it('uses default fraction digits (min 0, max 2) — trailing zeros omitted', () => {
    expect(formatCurrency(100, 'GBP')).toBe('£100')
  })

  it('applies custom fraction digits', () => {
    expect(formatCurrency(9.5, 'EUR', { min: 2, max: 2 })).toBe('€9.50')
  })

  it('rounds to the configured max fraction digits', () => {
    expect(formatCurrency(1.999, 'USD', { min: 0, max: 1 })).toBe('$2')
  })
})
