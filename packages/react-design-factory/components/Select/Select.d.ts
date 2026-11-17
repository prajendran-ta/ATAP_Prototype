import type { SelectProps as AntdSelectProps, DefaultOptionType } from 'antd/es/select'
export interface SelectProps<T = string | number> extends Pick<
  AntdSelectProps<T>,
  | 'id'
  | 'mode'
  | 'options'
  | 'value'
  | 'defaultValue'
  | 'showSearch'
  | 'onChange'
  | 'placeholder'
  | 'notFoundContent'
  | 'disabled'
  | 'loading'
  | 'maxCount'
  | 'popupMatchSelectWidth'
  | 'onSearch'
  | 'onPopupScroll'
  | 'status'
> {
  onBlur?: (values: T, options?: DefaultOptionType | DefaultOptionType[]) => void
  filterMode?: 'server' | 'client'
  label?: string
  required?: boolean
  withBadges?: boolean
  allowClear?: boolean
  searchBy?: 'label' | 'value' | 'both'
  helperMessage?: string
  warningMessage?: string
  errorMessage?: string
}

export interface SelectOption<T = string | number> extends DefaultOptionType {
  label: React.ReactNode
  value: T
}
