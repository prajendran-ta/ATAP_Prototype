import type { SegmentedProps as AntdSegmentedProps } from 'antd/es/segmented'

export interface ToggleTabProps<T = string> extends Pick<
  AntdSegmentedProps<T>,
  'id' | 'value' | 'onChange' | 'disabled' | 'size'
> {
  options: { label: React.ReactNode; value: T }[]
}
