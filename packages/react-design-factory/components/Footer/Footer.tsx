import React from 'react'
import { StyledFooter, FooterRow } from './Footer.styled'
import { FooterProps } from './Footer.d'
import { Text } from '../..'

const Footer: React.FC<FooterProps> = ({
  FooterIcon,
  BottomElementFooter,
  footerCopy,
  versionLabel,
  collapsed,
  left,
}) => {
  return (
    <>
      <StyledFooter collapsed={collapsed} left={left}>
        <FooterRow>
          {FooterIcon && <FooterIcon />}
          <Text.Body>{footerCopy}</Text.Body>
        </FooterRow>
        <Text.Body>{versionLabel}</Text.Body>
      </StyledFooter>
      {BottomElementFooter}
    </>
  )
}

export default Footer
