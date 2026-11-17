import styled from '@emotion/styled'
import { Text, colors } from '@amadeus/react-design-factory'

export const BoldText = styled(Text.Body)`
  font-weight: 500;
`

export const PastComsuptionText = styled.div`
  color: ${colors.cloud_80} !important;
  white-space: nowrap;
`

export const ErrorText = styled(Text.Body)`
  color: ${colors.crimson_70};
  margin-bottom: 12px;
`

export const ExpandIcon = styled.span<{ expanded: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease;
  transform: ${({ expanded }) => (expanded ? 'rotate(0deg)' : 'rotate(-90deg)')};
  margin-right: 10px;
`

export const ExpandIconSpacer = styled.span`
  display: inline-block;
  width: 14px;
  margin-right: 8px;
`

export const NoWrapSpan = styled.span`
  white-space: nowrap;
`

export const LeftAlignedCell = styled.span`
  white-space: nowrap;
  display: block;
  text-align: left;
`