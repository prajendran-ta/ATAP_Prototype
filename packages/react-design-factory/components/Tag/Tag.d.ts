import type { TagProps as AntdTagProps } from 'antd/es/tag'
import { type StatusColor } from '../../helpers'

export interface TagProps extends Pick<AntdTagProps, 'color' | 'onClose' | 'children'> {
  status?: StatusColor
}
