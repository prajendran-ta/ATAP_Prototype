import styled from '@emotion/styled'
import { colors } from '@amadeus/react-design-factory'

export const CardRoot = styled.article`
  background: ${colors.cloud_0};
  border: 1px solid ${colors.cloud_30};
  border-radius: 8px;
  padding: 16px 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition:
    box-shadow 0.15s ease,
    border-color 0.15s ease;
  cursor: default;

  &:hover,
  &:focus-within {
    border-color: ${colors.sky_60};
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  }
`

export const CardHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 24px;
`

export const CardBody = styled.div`
  display: grid;
  gap: 10px;

  p {
    margin: 0;
    color: ${colors.cloud_80};
    font-size: 13px;
    line-height: 1.4;
  }
`
