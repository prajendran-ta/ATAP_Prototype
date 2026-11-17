import { type DatePickerProps as AntdDatePickerProps } from 'antd/es/date-picker'

export interface DatePickerProps
  extends Pick<
    AntdDatePickerProps,
    | 'id'
    | 'value'
    | 'defaultValue'
    | 'minDate'
    | 'maxDate'
    | 'picker'
    | 'format'
    | 'placeholder'
    | 'disabled'
    | 'status'
    | 'showNow'
    | 'onBlur'
    | 'onChange'
  > {
  label?: string
  required?: boolean
  allowClear?: boolean
  helperMessage?: string
  warningMessage?: string
  errorMessage?: string
}
