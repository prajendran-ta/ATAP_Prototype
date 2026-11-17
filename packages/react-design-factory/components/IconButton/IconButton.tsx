import React, { FC } from 'react'
import { Icon } from '../..'
import type { IconButtonProps } from './IconButton.d'
import * as Styled from './IconButton.styled'

const IconButton: FC<IconButtonProps> = ({ iconName, color, status, width, height, ...buttonProps }) => {
  return (
    <Styled.IconButton {...buttonProps}>
      <Icon name={iconName} color={color} status={status} width={width} height={height} />
    </Styled.IconButton>
  )
}

export default IconButton
