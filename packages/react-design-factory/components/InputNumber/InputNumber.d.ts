import type { InputNumberProps as AntdInputNumberProps } from 'antd/es/input-number'

export interface InputNumberProps extends Pick<
  AntdInputNumberProps,
  | 'id'
  | 'value'
  | 'defaultValue'
  | 'min'
  | 'max'
  | 'step'
  | 'placeholder'
  | 'required'
  | 'disabled'
  | 'status'
  | 'formatter'
  | 'parser'
  | 'onBlur'
  | 'onChange'
  | 'onPressEnter'
> {
  label?: string
  affixBefore?: React.ReactNode
  affixAfter?: React.ReactNode
  helperMessage?: string
  warningMessage?: string
  errorMessage?: string
}
