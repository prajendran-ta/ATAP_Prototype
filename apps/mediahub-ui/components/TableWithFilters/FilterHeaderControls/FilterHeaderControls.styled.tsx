import { colors } from '@amadeus/react-design-factory'
import styled from '@emotion/styled'

export const HeaderControlsRoot = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: flex-start;
  padding-bottom: 12px;
`

export const LeftSide = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  flex: 1;
  order: none;
`

export const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  order: 1;
`
export const TabButton = styled.button<{ active?: boolean }>`
  background: ${({ active }) => (active ? colors.sky_60 : 'transparent')};
  color: ${({ active }) => (active ? colors.cloud_0 : colors.sky_60)};
  border: 1px solid ${colors.sky_60};
  border-radius: 9999px;
  padding: 4px 12px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background: ${colors.sky_60};
    color: ${colors.cloud_0};
  }
`
