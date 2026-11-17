import React from 'react'
import Segmented from 'antd/es/segmented'
import { ToggleTabWrapper } from './ToggleTab.styled'
import { ToggleTabProps } from './ToggleTab.d'

function ToggleTab<T = string>({ id, options, value, onChange, disabled, size }: ToggleTabProps<T>) {
  return (
    <ToggleTabWrapper>
      <Segmented<T> id={id} options={options} value={value} onChange={onChange} disabled={disabled} size={size} />
    </ToggleTabWrapper>
  )
}

export default ToggleTab
