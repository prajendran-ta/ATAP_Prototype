import { Badge, Grid, colors } from '@amadeus/react-design-factory'
import styled from '@emotion/styled'

export const NotificationsWrapper = styled.div`
  min-width: 900px;
  padding-bottom: 10px;
`

export const TableLink = styled.span`
  color: ${colors.sky_60};
  cursor: pointer;
  width: auto;
`

export const CategoryBadge = styled(Badge)<{ color?: string; fill?: boolean }>`
  border: 1px solid ${({ color }) => color};
  color: ${({ fill, color }) => (fill ? colors.cloud_100 : color)};
  background-color: ${({ fill, color }) => (fill ? color : 'transparent')};
`

export const SwitchField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const WarningContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  flex-wrap: nowrap;
`

export const IconWrapper = styled.div`
  line-height: 0;
  padding-top: 2px;
  flex-shrink: 0;
  padding: 10px;
`

export const Message = styled.div`
  flex: 1;
  min-width: 0;
  white-space: normal;
  font-size: 18px !important;
  line-height: 150%;
`

export const MessageCell = styled.div`
  white-space: normal;
  word-break: break-word;
`
