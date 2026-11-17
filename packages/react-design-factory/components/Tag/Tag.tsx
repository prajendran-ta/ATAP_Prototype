import React, { FC } from 'react'
import { getStatusColor } from '../../utils'
import { type TagProps } from './Tag.d'
import * as Styled from './Tag.styled'

const Tag: FC<TagProps> = ({ children, color, status, onClose }) => {
  return (
    <Styled.Tag
      color={color || getStatusColor(status || 'primary')}
      closable={!!onClose}
      onClose={onClose}
      status={status}
    >
      {children}
    </Styled.Tag>
  )
}

export default Tag
