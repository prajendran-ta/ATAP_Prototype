import { Badge, colors } from '@amadeus/react-design-factory'
import styled from '@emotion/styled'

export const UserManagementWrapper = styled.div`
  min-width: 900px;
  padding-bottom: 10px;
`

export const TableLink = styled.span`
  color: ${colors.sky_60};
  cursor: pointer;
  width: auto;
`

export const StatusBadge = styled(Badge)<{ color?: string; fill?: boolean }>`
  border: 1px solid ${({ color }) => color};
  color: ${({ fill, color }) => (fill ? colors.cloud_100 : color)};
  background-color: ${({ fill, color }) => (fill ? color : 'transparent')};
`

export const SwitchField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`
