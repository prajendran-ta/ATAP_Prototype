import styled from '@emotion/styled'
import { getStatusColor } from '../../utils'
import { LabelProps, TextProps } from './Text.d'
import { colors } from '../../styles'

export const H1 = styled.h1`
  font-size: 32px;
  line-height: 40px;
`

export const H2 = styled.h2`
  font-size: 24px;
  line-height: 28px;
`

export const H3 = styled.h3`
  font-size: 20px;
  line-height: 26px;
`

export const H4 = styled.h4`
  font-size: 18px;
  line-height: 24px;
`

export const H5 = styled.h5`
  font-size: 16px;
  line-height: 20px;
`

export const H6 = styled.h6`
  font-size: 14px;
  line-height: 18px;
`

export const Lead = styled.span`
  font-size: 18px;
  line-height: 150%;
  font-weight: 400;
  vertical-align: middle;
`

export const Label = styled.label<LabelProps>`
  font-size: 14px;
  line-height: 18px;
  color: ${({ status }) => getStatusColor(status)};
`

export const Body = styled.span<TextProps>`
  color: ${({ status }) => getStatusColor(status)};
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
`

export const Placeholder = styled.span`
  color: ${colors.cloud_80};
  font-style: italic;
`

export const Helper = styled.span<TextProps>`
  color: ${({ status }) => getStatusColor(status)};
  font-size: 12px;
  line-height: 20px;
`
