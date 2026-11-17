import type { ColProps as AntdColProps, RowProps as AntdRowProps } from 'antd/es/grid'

export type { AntdColProps as ColProps }

export interface RowProps extends AntdRowProps {
  noGutter?: boolean
}
