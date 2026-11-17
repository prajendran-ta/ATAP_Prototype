import Layout from 'antd/es/layout'
import styled from '@emotion/styled'
import { Row } from '../Grid'
import { colors } from '../../styles'

const { Footer } = Layout

export const StyledFooter = styled(Footer, {
  shouldForwardProp: propName => !['collapsed', 'left'].includes(propName),
})<{
  collapsed?: boolean
  left?: string
}>`
  display: flex;
  text-align: center;
  padding: 24px 24px;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  align-items: center;
  flex-direction: row;
  border-top: 1px solid ${colors.cloud_50};
  padding-left: ${({ collapsed, left }) => (!collapsed ? left : '84px')};
  background-color: ${colors.cloud_0};
`

export const FooterRow = styled(Row)`
  gap: 10px;
  align-items: center;
`

export const FooterLogo = styled.img`
  height: 24px;
  width: auto;
  margin-left: 80px;
  zoom: 0.7;
`

export const FooterCopy = styled.span`
  font-size: 12px;
  color: ${colors.cloud_80};
`
