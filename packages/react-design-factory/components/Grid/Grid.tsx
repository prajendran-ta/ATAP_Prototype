import { FC } from 'react'
import { Col as AntdCol, Row as AntdRow } from 'antd/es/grid'
import type { ColProps, RowProps } from './Grid.d'

export const Row: FC<RowProps> = ({ noGutter, ...props }) => {
  return <AntdRow {...(!noGutter && { gutter: 16 })} {...props} />
}

export const Col: FC<ColProps> = ({ span, ...props }) => {
  const updatedSpan = typeof span === 'number' ? span * 2 : span
  return <AntdCol span={updatedSpan} {...props} />
}
