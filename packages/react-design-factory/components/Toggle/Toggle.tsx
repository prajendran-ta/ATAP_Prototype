import React from 'react'
import { Toggle as StyledToggle } from './Toggle.styled'
import type { ToggleProps } from './Toggle.d'

const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  disabled = false,
  size = 'default',
  checkedChildren,
  unCheckedChildren,
  loading = false,
  defaultChecked,
  id,
  ...props
}) => {
  return (
    <StyledToggle
      id={id}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      size={size}
      checkedChildren={checkedChildren}
      unCheckedChildren={unCheckedChildren}
      loading={loading}
      defaultChecked={defaultChecked}
      {...props}
    />
  )
}

export default Toggle