import { FC, ReactNode } from 'react'
import type {
  TableProps as AntdTableProps,
  ColumnType as AntdColumnType,
  ColumnsType as AntdColumnsType,
} from 'antd/es/table'

export type ItemType = Record<string, unknown>

export type CellRenderMapType<ItemType extends object = object> = {
  [columnKey: string]: (item: ItemType) => ReactNode
}

export interface UseExpandableRowRendererProps<RecordType, ItemType extends object = object> {
  columns: ColumnType<RecordType>[]
  getItems: (record: RecordType) => ItemType[]
  cellRenderMap: CellRenderMapType<ItemType>[]
  cellsIdPrefix?: string
  columnWidths?: Record<string, number>
}

export interface TableProps<T = unknown, ExpandableItemType extends object = object> extends Pick<
  AntdTableProps<T>,
  | 'id'
  | 'children'
  | 'style'
  | 'className'
  | 'pagination'
  | 'rowKey'
  | 'scroll'
  | 'size'
  | 'loading'
  | 'dataSource'
  | 'columns'
  | 'onChange'
  | 'rowSelection'
  | 'rowClassName'
  | 'expandable'
> {
  noBorders?: boolean
  cellsIdPrefix?: string
  pagination?: AntdTableProps<T>['pagination'] | boolean
  onUpdatePagination?: (current: number, pageSize: number) => void
  tableLayout?: 'auto' | 'fixed'
  /** @requires Please insure providing `rowKey` and `cellsIdPrefix` props on `Table` to use `expandable` properly. */
  expandable?: AntdTableProps<T>['expandable'] & {
    rowExpandable: (record: T) => boolean
    expandableRenderItems: (record: T) => ExpandableItemType[]
    cellRenderMap: CellRenderMapType<ExpandableItemType>[]
  }
}

export type ColumnType<T> = AntdColumnType<T>
export type ColumnsType<T> = AntdColumnsType<T>
