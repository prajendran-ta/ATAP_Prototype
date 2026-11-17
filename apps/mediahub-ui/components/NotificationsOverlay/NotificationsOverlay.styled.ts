import styled from '@emotion/styled'
import { IconButton, colors } from '@amadeus/react-design-factory'

export const BellWithBadge = styled(IconButton)<{ count: number }>`
  position: relative;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 31px;
  height: 28px;
  padding: 5px;
  &:hover {
    background-color: ${colors.sky_30} !important;
    border-radius: 3px;
  }
  &:hover svg {
    opacity: 1 !important;
  }
  &::after {
    content: '${({ count }) => (count > 0 ? count : '0')}';
    display: ${({ count }) => (count > 0 ? 'block' : 'none')};
    position: absolute;
    top: 0px;
    right: 0px;
    background-color: ${colors.crimson_50};
    color: black;
    font-size: 10px;
    padding: 2px;
    border-radius: 50%;
    min-width: 14px;
    text-align: center;
    line-height: 1;
  }
`

export const ContentWrapper = styled.div`
  padding: 16px 0px;
`

export const DrawerTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
