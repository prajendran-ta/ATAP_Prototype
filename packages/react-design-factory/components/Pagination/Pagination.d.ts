import type { PaginationProps } from 'antd/es/pagination'

export type CustomPaginationProps = Pick<
  PaginationProps,
  'current' | 'total' | 'onChange' | 'showSizeChanger' | 'showTotal' | 'pageSize' | 'pageSizeOptions'
>
