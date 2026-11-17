import { formatDate, formatToISODate } from './date'

// formatDate
describe('formatDate', () => {
  it('formats an ISO date string to DD-MMM-YYYY', () => {
    expect(formatDate('2025-01-01')).toBe('01-Jan-2025')
  })

  it('formats a leap-year date correctly', () => {
    expect(formatDate('2024-02-29')).toBe('29-Feb-2024')
  })

  it('formats DatePicker-like MM-DD-YYYY strings', () => {
    expect(formatDate('01-08-2026')).toBe('08-Jan-2026')
  })
})

// formatToISODate
describe('formatToISODate', () => {
  it('returns an ISO date string unchanged', () => {
    expect(formatToISODate('2025-01-01')).toBe('2025-01-01')
  })

  it('converts a DD-MMM-YYYY string to YYYY-MM-DD', () => {
    expect(formatToISODate('01-Jan-2025')).toBe('2025-01-01')
  })

  it('handles a leap-year date', () => {
    expect(formatToISODate('2024-02-29')).toBe('2024-02-29')
  })

  it('converts DatePicker-like MM-DD-YYYY strings to ISO', () => {
    expect(formatToISODate('01-08-2026')).toBe('2026-01-08')
  })

  it('handles Date objects serialized as ISO strings from pickers', () => {
    const pickerValue = '2026-01-08T00:00:00.000Z'
    expect(formatToISODate(pickerValue)).toBe('2026-01-08')
  })

  it('converts DatePicker-like MM/DD/YYYY slash-separated strings to ISO', () => {
    expect(formatToISODate('01/08/2026')).toBe('2026-01-08')
  })
})

describe('dayjs fallback paths', () => {
  afterEach(() => {
    jest.resetModules()
    jest.dontMock('dayjs')
  })

  it('falls back to Intl formatter for formatDate when dayjs load fails', () => {
    jest.resetModules()
    jest.doMock('dayjs', () => {
      throw new Error('dayjs unavailable')
    })

    const { formatDate: formatDateWithFallback } = require('./date')
    expect(formatDateWithFallback('2025-01-01')).toBe('01-Jan-2025')
  })

  it('falls back to native Date conversion for formatToISODate when dayjs load fails', () => {
    jest.resetModules()
    jest.doMock('dayjs', () => {
      throw new Error('dayjs unavailable')
    })

    const { formatToISODate: formatToISODateWithFallback } = require('./date')
    expect(formatToISODateWithFallback('2026-01-08T00:00:00.000Z')).toBe('2026-01-08')
  })
})
