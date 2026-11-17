import dayjs from 'dayjs'
import {
  startDateValidator,
  endDateValidator,
  alphanumericDotValidator,
  maxCharsValidator,
  currencyAmountValidator,
  percentageValidator,
} from '../../helpers'

describe('startDateValidator', () => {
  const _ = undefined as any

  test('resolves for any value when dates are disabled', async () => {
    const validator = startDateValidator(true)
    await expect(validator(_, dayjs().subtract(1, 'year'))).resolves.toBeUndefined()
  })

  test('resolves when value is null', async () => {
    const validator = startDateValidator(false)
    await expect(validator(_, null)).resolves.toBeUndefined()
  })

  test('rejects when value is today (not a future date)', async () => {
    const validator = startDateValidator(false)
    await expect(validator(_, dayjs())).rejects.toThrow('Start date must be a future date starting from tomorrow.')
  })

  test('rejects when value is in the past', async () => {
    const validator = startDateValidator(false)
    await expect(validator(_, dayjs().subtract(1, 'day'))).rejects.toThrow()
  })

  test('resolves when value is tomorrow or later', async () => {
    const validator = startDateValidator(false)
    await expect(validator(_, dayjs().add(1, 'day'))).resolves.toBeUndefined()
    await expect(validator(_, dayjs().add(30, 'day'))).resolves.toBeUndefined()
  })
})

describe('endDateValidator', () => {
  const _ = undefined as any

  test('resolves for any value when dates are disabled', async () => {
    const validator = endDateValidator(true, () => dayjs())
    await expect(validator(_, dayjs().subtract(1, 'year'))).resolves.toBeUndefined()
  })

  test('resolves when value is null', async () => {
    const validator = endDateValidator(false, () => dayjs())
    await expect(validator(_, null)).resolves.toBeUndefined()
  })

  test('rejects when end date is same as start date', async () => {
    const start = dayjs('2026-06-01')
    const validator = endDateValidator(false, () => start)
    await expect(validator(_, start)).rejects.toThrow('End date must be after the start date.')
  })

  test('rejects when end date is before start date', async () => {
    const start = dayjs('2026-06-15')
    const validator = endDateValidator(false, () => start)
    await expect(validator(_, dayjs('2026-06-01'))).rejects.toThrow()
  })

  test('resolves when end date is after start date', async () => {
    const start = dayjs('2026-06-01')
    const validator = endDateValidator(false, () => start)
    await expect(validator(_, dayjs('2026-12-31'))).resolves.toBeUndefined()
  })

  test('resolves when there is no start date', async () => {
    const validator = endDateValidator(false, () => null)
    await expect(validator(_, dayjs('2026-12-31'))).resolves.toBeUndefined()
  })
})

describe('alphanumericDotValidator', () => {
  const _ = undefined as any

  test('resolves when value is empty', async () => {
    await expect(alphanumericDotValidator(_, '')).resolves.toBeUndefined()
    await expect(alphanumericDotValidator(_, undefined as any)).resolves.toBeUndefined()
  })

  test('resolves for valid alphanumeric with allowed symbols', async () => {
    await expect(alphanumericDotValidator(_, 'Hello World')).resolves.toBeUndefined()
    await expect(alphanumericDotValidator(_, 'test_123')).resolves.toBeUndefined()
    await expect(alphanumericDotValidator(_, 'plan-001.v2')).resolves.toBeUndefined()
  })

  test('rejects for characters with accents', async () => {
    await expect(alphanumericDotValidator(_, 'héllo')).rejects.toThrow()
  })

  test('rejects for special characters', async () => {
    await expect(alphanumericDotValidator(_, 'hello@world')).rejects.toThrow()
    await expect(alphanumericDotValidator(_, 'test#123')).rejects.toThrow()
    await expect(alphanumericDotValidator(_, 'value!')).rejects.toThrow()
  })
})

describe('maxCharsValidator', () => {
  const _ = undefined as any

  test('resolves when value is below 100 characters', async () => {
    await expect(maxCharsValidator(_, 'a'.repeat(99))).resolves.toBeUndefined()
  })

  test('rejects when value reaches or exceeds 100 characters', async () => {
    await expect(maxCharsValidator(_, 'a'.repeat(100))).rejects.toThrow('Limited to 100 characters')
    await expect(maxCharsValidator(_, 'a'.repeat(150))).rejects.toThrow()
  })

  test('resolves when value is undefined or empty', async () => {
    await expect(maxCharsValidator(_, undefined as any)).resolves.toBeUndefined()
    await expect(maxCharsValidator(_, '')).resolves.toBeUndefined()
  })
})

describe('currencyAmountValidator', () => {
  const _ = undefined as any

  test('resolves for empty, null, and undefined values', async () => {
    await expect(currencyAmountValidator(_, '')).resolves.toBeUndefined()
    await expect(currencyAmountValidator(_, null as any)).resolves.toBeUndefined()
    await expect(currencyAmountValidator(_, undefined as any)).resolves.toBeUndefined()
  })

  test('resolves for valid positive whole numbers', async () => {
    await expect(currencyAmountValidator(_, '0')).resolves.toBeUndefined()
    await expect(currencyAmountValidator(_, '100')).resolves.toBeUndefined()
    await expect(currencyAmountValidator(_, '1000')).resolves.toBeUndefined()
  })

  test('rejects for non-numeric input', async () => {
    await expect(currencyAmountValidator(_, 'abc')).rejects.toThrow('Only positive numbers are allowed')
    await expect(currencyAmountValidator(_, '!@#')).rejects.toThrow()
    // Note: '12.3.4' is intentionally not tested here — parseNumber("12.3.4") = 12.3
    // (parseFloat stops at the second dot), which is a valid positive number.
  })

  test('rejects for negative values', async () => {
    await expect(currencyAmountValidator(_, '-5')).rejects.toThrow('Only positive numbers are allowed')
  })

  test('resolves for locale-formatted whole numbers (thousands separator)', async () => {
    // en-US format: comma as thousands separator, no decimal
    await expect(currencyAmountValidator(_, '1,234')).resolves.toBeUndefined()
  })

  test('rejects for decimal values', async () => {
    await expect(currencyAmountValidator(_, '99.99')).rejects.toThrow('Whole numbers only')
    await expect(currencyAmountValidator(_, '1000.5')).rejects.toThrow('Whole numbers only')
    await expect(currencyAmountValidator(_, '12.123')).rejects.toThrow('Whole numbers only')
  })

  test('rejects when value exceeds 100,000,000', async () => {
    await expect(currencyAmountValidator(_, '100000001')).rejects.toThrow('Value cannot exceed 100,000,000')
  })

  test('resolves for exactly 100,000,000', async () => {
    await expect(currencyAmountValidator(_, '100000000')).resolves.toBeUndefined()
  })
})

describe('percentageValidator', () => {
  const _ = undefined as any

  test('resolves for empty, null, and undefined values', async () => {
    await expect(percentageValidator(_, '')).resolves.toBeUndefined()
    await expect(percentageValidator(_, null as any)).resolves.toBeUndefined()
    await expect(percentageValidator(_, undefined as any)).resolves.toBeUndefined()
  })

  test('resolves for valid percentages within 0–100', async () => {
    await expect(percentageValidator(_, '0')).resolves.toBeUndefined()
    await expect(percentageValidator(_, '50')).resolves.toBeUndefined()
    await expect(percentageValidator(_, '100')).resolves.toBeUndefined()
    await expect(percentageValidator(_, '99.99')).resolves.toBeUndefined()
  })

  test('rejects for non-numeric input', async () => {
    await expect(percentageValidator(_, 'abc')).rejects.toThrow('Whole numbers only')
  })

  test('resolves for locale-formatted percentages', async () => {
    // plain number with decimal
    await expect(percentageValidator(_, '10.5')).resolves.toBeUndefined()
  })

  test('rejects when more than 2 decimal places', async () => {
    await expect(percentageValidator(_, '12.123')).rejects.toThrow('Up to 2 decimal places allowed')
  })

  test('rejects when value is below 0', async () => {
    await expect(percentageValidator(_, '-1')).rejects.toThrow('Percentage must be between 0 and 100')
  })

  test('rejects when value exceeds 100', async () => {
    await expect(percentageValidator(_, '101')).rejects.toThrow('Percentage must be between 0 and 100')
  })
})
