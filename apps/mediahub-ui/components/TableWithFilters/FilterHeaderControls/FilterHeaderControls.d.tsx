import type { FilterValue, FilterItem } from '../FilterBanner/FilterBanner.d'
import type { TableSearchProps } from '../TableWithFilterBanner.d'

export interface FilterHeaderControlsProps<T extends Record<string, any>> {
  searchId: string
  headerFilters?: FilterItem<T>[]
  values: Partial<Record<keyof T | string, FilterValue>>
  setValue: (name: keyof T | string, value: FilterValue) => void
  tableSearch?: TableSearchProps

  tableCustomControls?: React.ReactNode
  searchAdornment?: React.ReactNode
}
