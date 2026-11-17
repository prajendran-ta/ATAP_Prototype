import styled from '@emotion/styled'
import { colors } from '../../styles'

export const DatePickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  width: 100%;

  .amadeus-picker-suffix {
    svg {
      color: ${colors.sky_60};
    }
  }
`
