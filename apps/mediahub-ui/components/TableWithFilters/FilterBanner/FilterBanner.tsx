import React from 'react'
import { H5, Label } from '@amadeus/react-design-factory/components/Text'
import { FieldLabel, TagsRow, FilterTag, EmptyFilterTag } from './FilterBanner.styled'
import { FilterValue, FilterBannerProps } from './FilterBanner.d'
import { Button, Container, Grid } from '@amadeus/react-design-factory'

function FilterBanner<T extends Record<string, any>>({
  filters,
  values,
  setValue,
  removeFilter,
  handleClearAll,
  showTags = true,
  showClearAll = true,
  clearBtnId,
  bannerFooter,
}: FilterBannerProps<T>): React.ReactElement {
  const activeFilters = filters.filter(f => {
    const v = values[f.name] ?? ''
    return (
      (f.showInTags ?? true) &&
      v !== '' &&
      ((typeof v === 'string' && v.length > 0) || (Array.isArray(v) && v.length > 0))
    )
  })

  return (
    <Container.Section>
      <Container.Header>
        <H5>Filters</H5>
        {showClearAll && (
          <Button id={clearBtnId} variant='link' onClick={handleClearAll}>
            Clear all
          </Button>
        )}
      </Container.Header>

      <Grid.Row>
        {filters.map(f => (
          <Grid.Col span={2} key={String(f.name)}>
            {f.showLabel && <FieldLabel htmlFor={String(f.name)}>{f.label}</FieldLabel>}
            {f.renderControl({
              name: f.name,
              value: (values[f.name] ?? '') as FilterValue,
              setValue: v => setValue(f.name, v),
              values,
            })}
          </Grid.Col>
        ))}
      </Grid.Row>

      {bannerFooter ? (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>{bannerFooter}</div>
      ) : null}

      <TagsRow>
        <Label>Active filters:</Label>
        {showTags && activeFilters.length > 0 ? (
          activeFilters.map(filter => {
            const v = (values[filter.name] ?? '') as FilterValue
            const tagContent = (() => {
              if (filter.options && Array.isArray(v)) {
                return v
                  .map(val => {
                    const option = !!filter.options && filter.options.find(opt => opt.value === val)
                    return option ? option.label : val
                  })
                  .join(', ')
              }

              if (filter.options && !Array.isArray(v)) {
                return filter.options.find(opt => opt.value === v)?.label
              }

              return v
            })()
            const onRemove = () => removeFilter(filter.name)

            return (
              <FilterTag
                key={String(filter.name)}
                label={filter.label}
                content={tagContent
                  ?.toString()
                  .split(',')
                  .map(word => word.trim())
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(', ')}
                onRemove={onRemove}
              />
            )
          })
        ) : (
          <EmptyFilterTag key='void-tag' content='None' />
        )}
      </TagsRow>
    </Container.Section>
  )
}

export default FilterBanner
