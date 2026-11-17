import styled from '@emotion/styled'
import { Steps } from 'antd'
import { colors } from '../../styles'
import type { StepperProps } from './Stepper.d'

export const Stepper = styled(Steps, { shouldForwardProp: propName => propName !== 'fullWidth' })<StepperProps>`
  margin: 24px;
  justify-self: center;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : '80%')};

  .amadeus-steps-item-icon {
    background-color: transparent !important;
    .amadeus-steps-icon {
      font-size: 18px;
      vertical-align: text-top;
    }
  }

  .amadeus-steps-item-title {
    &::after {
      background-color: ${colors.cloud_40} !important;
    }
  }

  .amadeus-steps-item-clickable {
    :not(.amadeus-steps-item-active) {
      :not(.amadeus-steps-item-finish) {
        .amadeus-steps-item-icon {
          border-color: ${colors.sky_60} !important;
          .amadeus-steps-icon {
            color: ${colors.sky_60} !important;
          }
        }
      }
      .amadeus-steps-item-title {
        &:hover {
          text-decoration: underline;
          cursor: pointer;
          color: ${colors.sky_80} !important;
          background-color: ${colors.sky_20} !important;
          background-clip: content-box;
        }
        color: ${colors.sky_60} !important;
      }
    }
  }

  .amadeus-steps-item-wait {
    .amadeus-steps-item-title {
      color: ${colors.cloud_80} !important;
    }
    .amadeus-steps-item-icon {
      border-color: ${colors.cloud_80} !important;
      .amadeus-steps-icon {
        color: ${colors.cloud_80};
      }
    }
  }

  .amadeus-steps-item-finish {
    .amadeus-steps-item-title {
      color: ${colors.sky_60} !important;
    }
    .amadeus-steps-item-icon {
      background-color: ${colors.sky_60} !important;
      .amadeus-steps-icon {
        color: ${colors.cloud_0};
      }
    }
  }

  .amadeus-steps-item-active {
    &.amadeus-steps-item-wait,
    &.amadeus-steps-item-finish {
      .amadeus-steps-item-title {
        color: ${colors.sky_90} !important;
      }
    }

    &.amadeus-steps-item-process,
    &.amadeus-steps-item-wait {
      .amadeus-steps-item-icon {
        border-color: ${colors.sky_90} !important;
        .amadeus-steps-icon {
          color: ${colors.sky_90};
        }
      }
    }

    &.amadeus-steps-item-finish {
      .amadeus-steps-item-icon {
        background-color: ${colors.sky_90} !important;
      }
    }
  }
`
