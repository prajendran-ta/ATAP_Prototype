import type { CheckboxProps as AntdCheckboxProps } from 'antd/es/checkbox'

export interface CheckboxProps
  extends Pick<AntdCheckboxProps, 'checked' | 'disabled' | 'onChange' | 'children' | 'id'> {}

