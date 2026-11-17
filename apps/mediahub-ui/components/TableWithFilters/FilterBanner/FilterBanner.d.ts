export type FilterValue = boolean | string | string[]

export type FilterItem<T extends Record<string, any>> = {
  name: keyof T | string
  label: string
  type?: 'multiple' | 'single'
  placement?: 'header' | 'banner'
  renderControl: (args: {
    name: keyof T
    value: FilterValue
    setValue: (v: FilterValue) => void
    values: Partial<Record<keyof T, FilterValue>>
  }) => React.ReactNode
  clearValue?: FilterValue
  getTagValue?: (value: FilterValue, values: Partial<Record<keyof T, FilterValue>>) => React.ReactNode
  renderTag?: (args: {
    name: keyof T
    label: string
    value: FilterValue
    onRemove: () => void
    values: Partial<Record<keyof T, FilterValue>>
  }) => React.ReactNode
  showInTags?: boolean
  options?: { label: string; value: string | number }[]
  optionsTagLabelKey?: string
  showLabel?: boolean
}

export interface FilterBannerProps<T extends Record<string, any>> {
  filters: FilterItem<T>[]
  values: Partial<Record<keyof T, FilterValue>>
  setValue: (name: keyof T, value: FilterValue) => void
  removeFilter: (name: keyof T) => void
  handleClearAll: () => void
  showTags?: boolean
  showClearAll?: boolean
  clearBtnId?: string
  /** Optional content rendered inside the filter card, below the filter inputs and above the active-filter tags (right-aligned). */
  bannerFooter?: React.ReactNode
}
