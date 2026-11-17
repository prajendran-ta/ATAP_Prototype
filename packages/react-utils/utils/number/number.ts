import i18next from 'i18next'

export const formatNumber = (value: number) => {
  return new Intl.NumberFormat(i18next.language || 'en').format(value)
}

export const parseNumber = (value: string): number => {
  const parts = new Intl.NumberFormat(navigator.language).formatToParts(1111.1)
  const groupSep = parts.find(p => p.type === 'group')?.value ?? ','
  const decSep = parts.find(p => p.type === 'decimal')?.value ?? '.'
  const stripped = value.replace(/[^\d\-.,]/g, '')
  const normalized = stripped.split(groupSep).join('').replace(decSep, '.')
  return parseFloat(normalized)
}

export const formatCurrency = (
  value: number,
  currency: string,
  fractionDigits: Record<'min' | 'max', number> = { min: 0, max: 2 },
) => {
  return Intl.NumberFormat(i18next.language || 'en', {
    style: 'currency',
    currency,
    minimumFractionDigits: fractionDigits.min,
    maximumFractionDigits: fractionDigits.max,
    currencyDisplay: 'narrowSymbol',
  }).format(value)
}
