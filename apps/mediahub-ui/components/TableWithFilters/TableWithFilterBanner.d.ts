import type { FilterItem, FilterValue } from './FilterBanner/FilterBanner'
import type { ColumnType } from 'antd/es/table'
import type { TablePaginationConfig } from 'antd/es/table'
import type { SorterResult } from 'antd/es/table/interface'
import type { TableRowSelection } from 'antd/es/table/interface'

export interface TableSearchProps {
  show: boolean
  placeholder?: string
  keys?: string[]
}

export interface TableWithFilterBannerProps<T extends Record<string, any>> {
  columns: ColumnType<T>[]
  /** Optional antd table layout. Pass 'fixed' so percentage column widths are honored and wide
   *  cell content ellipsizes within the container instead of widening the table. Defaults to antd's
   *  content-based 'auto' layout when omitted (unchanged for existing callers). */
  tableLayout?: 'auto' | 'fixed'
  initialFilters?: Partial<Record<keyof T, FilterValue>>
  pageSize?: number
  id: string
  cellsIdPrefix: string
  rowKey: string
  filterMode?: 'client' | 'server'
  filterItems: FilterItem<T>[]
  /** When false, the filter banner card (filters + active-filter tags + Clear all) is not rendered.
   *  Useful for a table whose only control is an inline toggle/search (e.g. a scoped sub-table). */
  showFilterBanner?: boolean
  showTags?: boolean
  showClearAll?: boolean
  sectionTitle?: string
  tableTitle?: string
  tableTitleContent?: React.ReactNode
  summaryContent?: React.ReactNode
  titleButtons?: React.ReactNode
  tableSearch?: TableSearchProps
  tableCustomControls?: React.ReactNode
  /** Rendered in the search row, immediately left of the Search input (right side). */
  searchAdornment?: React.ReactNode
  /** When set, the table scrolls horizontally past this width (px); columns marked fixed stay sticky. */
  tableScrollX?: number
  /** Content rendered inside the filter card, below the filter inputs and above the active-filter tags (right-aligned). */
  bannerFooter?: React.ReactNode
  /** Content rendered just below the header controls row (scope/search) and above the table. */
  belowControls?: React.ReactNode
  /** Optional antd rowClassName passthrough (e.g. to grey ignored or tint sub rows). */
  rowClassName?: (record: T, index: number) => string
  rowSelection?: TableRowSelection<T>
  clientSideFilters?: Array<string>
  tableWarning?: {
    show: boolean
    component: React.ReactNode | null
  }
  queryFn: (
    filters?: Partial<Record<keyof T, FilterValue>>,
    pagination?: TablePaginationConfig,
    sorter?: SorterResult<T> | SorterResult<T>[] | null,
  ) => Promise<{ data: T[]; total: number }>
}
