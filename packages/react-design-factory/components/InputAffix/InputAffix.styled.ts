import styled from '@emotion/styled'
import { colors } from '@amadeus/react-design-factory/styles'

export const Affix = styled.span<{ position: 'before' | 'after' }>`
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  height: 32px;
  padding: 0 10px;
  color: ${colors.cloud_70};
  background-color: ${colors.cloud_20};
  border: 1px solid ${colors.cloud_40};
  border-radius: ${({ position }) => (position === 'before' ? '5px 0 0 5px' : '0 5px 5px 0')};
`
