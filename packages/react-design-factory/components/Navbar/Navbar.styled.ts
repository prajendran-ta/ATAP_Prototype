import { colors } from '@amadeus/react-design-factory/styles'
import styled from '@emotion/styled'

export const StickyWrapper = styled.div<{ isSticky?: boolean }>`
  position: ${({ isSticky }) => (isSticky ? 'sticky' : 'static')};
  top: ${({ isSticky }) => (isSticky ? '0' : 'auto')};
  z-index: ${({ isSticky }) => (isSticky ? 1000 : 'auto')};
`

export const StyledHeader = styled.header`
  width: 100%;
  background-color: #fff;
  padding: 12px 24px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${colors.cloud_30};
`

export const NavbarRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const NavbarCol = styled.div`
  display: flex;
  align-items: center;
`

export const RightIcons = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`
