/**
 * Mediaplanner-scoped number utilities.
 * Uses navigator.language so numbers and currencies reflect the user's locale.
 * Re-exports parseNumber from @amadeus/react-utils so callers can import
 * everything from this single path.
 */
export { parseNumber } from '@amadeus/react-utils'

export const formatNumber = (value: number): string =>
  new Intl.NumberFormat(navigator.language).format(value)

export const formatCurrency = (
  value: number,
  currency: string,
  fractionDigits: Record<'min' | 'max', number> = { min: 0, max: 2 },
): string => {
  const parts = new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency,
    minimumFractionDigits: fractionDigits.min,
    maximumFractionDigits: fractionDigits.max,
    currencyDisplay: 'narrowSymbol',
  }).formatToParts(value)

  const symbol = parts.find(p => p.type === 'currency')?.value ?? currency
  const sign = value < 0 ? '-' : ''
  const numberPart = parts
    .filter(p => !['currency', 'literal', 'minusSign'].includes(p.type))
    .map(p => p.value)
    .join('')

  return `${sign}${symbol}${numberPart}`
}

export const formatCurrencyWithSuffixSymbol = (
  value: number,
  currency: string,
  fractionDigits: Record<'min' | 'max', number> = { min: 0, max: 2 },
): string => {
  const parts = new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency,
    minimumFractionDigits: fractionDigits.min,
    maximumFractionDigits: fractionDigits.max,
    currencyDisplay: 'narrowSymbol',
  }).formatToParts(value)

  const symbol = parts.find(p => p.type === 'currency')?.value ?? currency
  const sign = value < 0 ? '-' : ''
  const numberPart = parts
    .filter(p => !['currency', 'literal', 'minusSign'].includes(p.type))
    .map(p => p.value)
    .join('')

  return `${sign}${numberPart} ${symbol}`
}

export const getCurrencySymbol = (currency: string): string => {
  try {
    const parts = new Intl.NumberFormat(navigator.language, {
      style: 'currency',
      currency,
      currencyDisplay: 'narrowSymbol',
    }).formatToParts(0)

    return parts.find(p => p.type === 'currency')?.value ?? currency
  } catch {
    return currency
  }
}

export const formatCurrencyWithoutSymbol = (
  value: number,
  currency: string,
  fractionDigits: Record<'min' | 'max', number> = { min: 0, max: 2 },
): string =>
  formatCurrency(value, currency, fractionDigits)
    .replace(/^(-?)\s*[^\d-]+/, '$1')
    .replace(/\s*[^\d.,\s]+\s*$/, '')
    .trim()
