import styled from '@emotion/styled'
import { colors } from '../../styles/colors'
import AntdSwitch from 'antd/es/switch'

export const Toggle = styled(AntdSwitch)`
  display: inline-block;
  
  .amadeus-switch {
    background-color: ${colors.cloud_50};
    border: none;
    
    &.amadeus-switch-checked {
      background-color: ${colors.sky_60};
    }
    
    &:hover:not(.amadeus-switch-disabled) {
      background-color: ${colors.cloud_80};
      
      &.amadeus-switch-checked {
        background-color: ${colors.sky_80};
      }
    }
    
    &:focus {
      box-shadow: 0 0 0 2px ${colors.sky_20};
    }
    
    &.amadeus-switch-disabled {
      background-color: ${colors.cloud_30};
      opacity: 0.6;
      cursor: not-allowed;
      
      &.amadeus-switch-checked {
        background-color: ${colors.cloud_30};
      }
    }
    
    &.amadeus-switch-loading {
      opacity: 0.8;
    }
  }
  
  .amadeus-switch-handle {
    &::before {
      background-color: ${colors.cloud_0};
    }
  }
  
  .amadeus-switch-inner {
    color: ${colors.cloud_0};
    font-size: 12px;
    font-weight: 500;
  }

  .amadeus-switch-inner-checked,
  .amadeus-switch-inner-unchecked {
    padding-top: 2px;
  }
  
  /* Size variations */
  .amadeus-switch-small {
    min-width: 28px;
    height: 16px;
    line-height: 16px;
    
    .amadeus-switch-handle {
      width: 12px;
      height: 12px;
      top: 2px;
      
      &::before {
        border-radius: 6px;
      }
    }
    
    .amadeus-switch-inner {
      font-size: 10px;
      margin: 0 6px 0 18px;
    }
    
    &.amadeus-switch-checked .amadeus-switch-inner {
      margin: 0 18px 0 6px;
    }
  }
  

`