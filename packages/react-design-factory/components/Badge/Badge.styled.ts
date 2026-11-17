import styled from '@emotion/styled'
import { colors } from '../../styles/colors'

export const Badge = styled.span<{ color?: string }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 16px;
  border: 1px solid ${({ color }) => color || 'none'};
  font-size: 13px;
  font-weight: 500;
  background-color: transparent;
  color: ${({ color }) => color || 'none'};

  svg {
    margin-right: 6px;
    font-size: 14px;
  }
`

export const StyledLabel = styled.span<{ color?: string }>`
  white-space: nowrap;
  min-width: fit-content;
`

export const CloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 9999px;
  border: none;
  background: transparent;
  color: ${colors.cloud_0};
  cursor: pointer;
  font-size: 12px;
  line-height: 1;
  padding: 0;
`
