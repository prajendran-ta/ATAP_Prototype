import React, { FC } from 'react'
import * as Styled from './StickyFooter.styled'
import { StickyFooterProps } from './StickyFooter.d'

const StickyFooter: FC<StickyFooterProps> = ({ marginBottom = 0, left, children }) => {
  return (
    <Styled.FooterContainer data-action-footer='true' marginBottom={marginBottom} left={left}>
      {children}
    </Styled.FooterContainer>
  )
}

export default StickyFooter
