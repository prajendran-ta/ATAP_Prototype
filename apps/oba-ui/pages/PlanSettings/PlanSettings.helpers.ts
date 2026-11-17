import { useMemo } from 'react'
// Queries
import { useCurrenciesQuery } from './PlanSettings.queries'
// Types
import type { SelectOption } from '@amadeus/react-design-factory/components/Select'

export const useCurrencyOptions = () => {
  const { currencies, ...rest } = useCurrenciesQuery()
  const currencyOptions: SelectOption[] = useMemo(
    () =>
      currencies?.map(currency => ({
        value: currency.code,
        label: currency.name,
      })) || [],
    [currencies],
  )
  return { currencyOptions, ...rest }
}
