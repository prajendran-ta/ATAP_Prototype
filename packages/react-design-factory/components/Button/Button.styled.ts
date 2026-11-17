import styled from '@emotion/styled'
import AntdButton from 'antd/es/button'
import { colors } from '../../styles'

export const Button = styled(AntdButton)`
  box-shadow: none;

  &.amadeus-btn-color-primary {
    &:disabled {
      color: ${colors.cloud_50} !important;
      background-color: ${colors.cloud_30} !important;
    }

    &.amadeus-btn-variant-link,
    &.amadeus-btn-variant-text:hover {
      text-decoration: underline;
    }

    &.amadeus-btn-variant-text,
    &.amadeus-btn-variant-link,
    &.amadeus-btn-variant-outlined {
      &:hover {
        color: ${colors.sky_80} !important;
        background-color: ${colors.sky_20} !important;
      }
      &:active {
        color: ${colors.sky_90} !important;
        background-color: ${colors.sky_30} !important;
      }
      &:disabled {
        color: ${colors.cloud_50} !important;
        background-color: transparent !important;
      }
    }
  }

  &.amadeus-btn-color-danger {
    &.amadeus-btn-variant-outlined {
      &:hover {
        color: ${colors.crimson_80} !important;
        border-color: ${colors.crimson_80} !important;
        background-color: ${colors.crimson_20} !important;
      }
      &:active {
        color: ${colors.crimson_90} !important;
        border-color: ${colors.crimson_90} !important;
        background-color: ${colors.crimson_30} !important;
      }
      &:disabled {
        color: ${colors.cloud_50} !important;
        background-color: ${colors.cloud_0} !important;
        border-color: ${colors.cloud_50} !important;
      }
    }

    &.amadeus-btn-variant-text {
      &:hover {
        color: ${colors.crimson_80} !important;
        background-color: ${colors.crimson_20} !important;
      }
      &:active {
        color: ${colors.crimson_90} !important;
        background-color: ${colors.crimson_30} !important;
      }
      &:disabled {
        color: ${colors.cloud_50} !important;
        background-color: ${colors.cloud_0} !important;
      }
    }
  }
`
