import styled from '@emotion/styled'
import AntdTag, { TagProps as AntdTagProps } from 'antd/es/tag'
import { getStatusFontColor } from '../../utils'
import { TagProps } from './Tag.d'

export const Tag = styled(AntdTag)<TagProps & AntdTagProps>`
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 0 9px;
  border-radius: 9px;
  font-size: 12px;
  ${({ status }) => status && `color: ${getStatusFontColor(status)} !important;`}
`
