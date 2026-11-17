import React from 'react'
import { HeaderControlsRoot, LeftSide, RightSide } from './FilterHeaderControls.styled'
import type { FilterHeaderControlsProps } from './FilterHeaderControls.d'
import { Search } from '@amadeus/react-design-factory'

function FilterHeaderControls<T extends Record<string, any>>({
  searchId,
  values,
  setValue,
  tableSearch,
  tableCustomControls,
  searchAdornment,
  headerFilters,
}: FilterHeaderControlsProps<T>): React.ReactElement {
  return (
    <HeaderControlsRoot>
      {(!!tableSearch?.show || !!searchAdornment) && (
        <RightSide>
          {searchAdornment}
          {!!tableSearch?.show && (
            <Search
              id={searchId}
              placeholder={`${tableSearch?.placeholder || ''}`}
              onSearch={value => setValue('search', value)}
            />
          )}
        </RightSide>
      )}

      <LeftSide>
        {!!headerFilters &&
          headerFilters.map(f => (
            <div key={String(f.name)}>
              {f.renderControl({
                name: f.name,
                value: values[f.name] ?? '',
                setValue: v => setValue(f.name, v),
                values,
              })}
            </div>
          ))}
        {!!tableCustomControls && tableCustomControls}
      </LeftSide>
    </HeaderControlsRoot>
  )
}

export default FilterHeaderControls
