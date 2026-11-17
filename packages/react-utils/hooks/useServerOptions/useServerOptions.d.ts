import type { SelectOption } from '@amadeus/react-design-factory/components/Select'

export type QueryPagination = { limit: number; offset: number }

export type UseServerOptionsParams = {
  queryFn: (search: string, pagination?: QueryPagination) => Promise<SelectOption[]>
  debounceMs?: number
  resetOnBlur?: boolean
  pageSize?: number
}

export type UseServerOptionsResult = {
  options: SelectOption[]
  loading: boolean
  search: string
  onSearch: (value: string) => void
  onBlur?: () => void
  onPopupScroll?: (e: React.UIEvent<HTMLDivElement>) => void
}

export type FilterValue = boolean | string | string[]
