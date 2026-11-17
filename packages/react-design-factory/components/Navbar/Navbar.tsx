import React from 'react'
import { StyledHeader, NavbarRow, StickyWrapper } from './Navbar.styled'
import { NavbarProps } from './Navbar.d'

const Navbar: React.FC<NavbarProps> = ({ id, NavbarComponent, BottomNavbarElement, isSticky }) => {
  return (
    <StickyWrapper isSticky={isSticky}>
      <StyledHeader id={id}>
        <NavbarRow>{NavbarComponent}</NavbarRow>
      </StyledHeader>
      {BottomNavbarElement}
    </StickyWrapper>
  )
}

export default Navbar
