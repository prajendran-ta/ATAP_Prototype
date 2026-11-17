import { FilterItem } from '@mediahub/mediahub-ui/components/TableWithFilters/FilterBanner/FilterBanner.d'

export type FilterItemWithType<T extends Record<string, any>> = FilterItem<T> & {
  type?: 'single' | 'multiple'
  optionsTagLabelKey?: string
}
