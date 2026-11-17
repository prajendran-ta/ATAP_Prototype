import React from 'react'
import type { CheckboxProps } from './Checkbox.d'
import { StyledCheckbox } from './Checkbox.styled'

const Checkbox: React.FC<CheckboxProps> = ({ children, ...props }) => {
  return <StyledCheckbox {...props}>{children}</StyledCheckbox>
}

export default Checkbox
