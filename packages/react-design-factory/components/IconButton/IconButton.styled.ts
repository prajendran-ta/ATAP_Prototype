import styled from '@emotion/styled'
import AntdButton from 'antd/es/button'
import type { ButtonProps } from '../Button/Button.d'

export const IconButton = styled(AntdButton)<ButtonProps>`
  padding: 0;
  border: none;
  background: transparent !important;
  box-shadow: none;

  &:hover {
    background: transparent !important;

    svg {
      opacity: 0.65;
    }
  }
`
