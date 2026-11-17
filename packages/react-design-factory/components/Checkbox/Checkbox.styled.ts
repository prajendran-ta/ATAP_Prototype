import { colors } from '@amadeus/react-design-factory/styles'
import styled from '@emotion/styled'
import AntdCheckbox from 'antd/es/checkbox'

export const StyledCheckbox = styled(AntdCheckbox)`
  .amadeus-checkbox .amadeus-checkbox-inner::after {
    border-width: 2px;
  }

  &.amadeus-checkbox-wrapper-disabled .amadeus-checkbox-checked .amadeus-checkbox-inner {
    background-color: ${colors.cloud_50};
    border-color: ${colors.cloud_50};
  }

  &.amadeus-checkbox-wrapper-disabled .amadeus-checkbox-checked .amadeus-checkbox-inner::after {
    border-color: ${colors.cloud_0};
  }
`
