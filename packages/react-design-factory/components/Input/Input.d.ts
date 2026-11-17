import type { InputProps as AntdInputProps } from 'antd/es/input/Input'

export interface InputProps extends Pick<
  AntdInputProps,
  | 'id'
  | 'value'
  | 'defaultValue'
  | 'placeholder'
  | 'disabled'
  | 'status'
  | 'onBlur'
  | 'onFocus'
  | 'onChange'
  | 'onPressEnter'
  | 'onKeyDown'
  | 'prefix'
  | 'maxLength'
> {
  label?: string
  required?: boolean
  affixBefore?: React.ReactNode
  affixAfter?: React.ReactNode
  helperMessage?: string
  warningMessage?: string
  errorMessage?: string
}
