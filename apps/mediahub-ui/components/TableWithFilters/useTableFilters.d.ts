import type {
  FilterValue as AntdFilterValue,
  TableCurrentDataSource,
  TablePaginationConfig,
  SorterResult,
  TableRowSelection,
  ColumnType,
} from 'antd/es/table/interface'
import { FilterValue, FilterItem } from './FilterBanner/FilterBanner.d'
import { TableSearchProps } from './TableWithFilterBanner.d'

export type FiltersRecord<T extends Record<string, any>> = Partial<Record<keyof T, FilterValue>>

export interface UseTableFiltersOptions<T extends Record<string, any>> {
  columns: ColumnType<T>[]
  pageSize: number
  filterMode: 'client' | 'server'
  filterItems: Array<FilterItem<T>>
  initialFilters: FiltersRecord<T>
  queryFn: (
    filters: FiltersRecord<T>,
    pagination: TablePaginationConfig,
    sorter: null,
  ) => Promise<{ data: T[]; total: number }>
  serverDebounceMs?: number
  clientSideFilters?: Array<keyof T>
  tableSearch?: TableSearchProps
}

export interface UseTableFiltersReturn<T extends Record<string, any>> {
  data: T[]
  loading: boolean
  pagination: TablePaginationConfig
  rowSelection?: TableRowSelection
  onTableChange: (
    pagination: TablePaginationConfig,
    filters: Record<string, AntdFilterValue | null>,
    sorter: SorterResult<T> | SorterResult<T>[] | null,
    extra?: TableCurrentDataSource<T>,
  ) => void
  setFilters: (filters: FiltersRecord<T> | ((prev: FiltersRecord<T>) => FiltersRecord<T>)) => void
  filters: FiltersRecord<T>
  removeFilter: (name: keyof T) => void
  handleClearAll: () => void
  columns: ColumnType<T>[]
  headerFilters: Array<FilterItem<T>>
  bannerFilters: Array<FilterItem<T>>
  refetchWithFilters: () => void
}

export interface NormalizeFn {
  (value: unknown): string
}

export interface GetNestedValueFn {
  (obj: any, path: string): any
}

export interface SearchWithKeysFn<T extends Record<string, any>> {
  (row: T, searchTerm: string, searchKeys: string[], normalize: NormalizeFn, getNestedValue: GetNestedValueFn): boolean
}

export interface SearchWithoutKeysFn<T extends Record<string, any>> {
  (row: T, searchTerm: string, normalize: NormalizeFn): boolean
}
