import { colors } from '../../styles/colors'
import styled from '@emotion/styled'

export const ToggleTabWrapper = styled.div`
  display: flex;
  justify-content: flex-start;

  .amadeus-segmented {
    background-color: ${colors.sky_10};
    border-radius: 9999px;
    padding: 4px;

    .amadeus-segmented-item-selected {
      background-color: ${colors.sky_60} !important;
      color: ${colors.cloud_0} !important;
      border-radius: 9999px !important;
    }

    .amadeus-segmented-item {
      transition: none !important;
    }

    .amadeus-segmented-item:hover {
      background-color: ${colors.sky_20};
      color: ${colors.cloud_0};
      border-radius: 9999px;
    }

    .amadeus-segmented-thumb {
      border-radius: 9999px !important;
    }
  }

  .amadeus-segmented-disabled,
  .amadeus-segmented-item-disabled {
    background-color: ${colors.cloud_30} !important;
    color: ${colors.cloud_50} !important;
  }
  .amadeus-segmented-disabled {
    .amadeus-segmented-item-selected {
      background-color: ${colors.cloud_50} !important;
      color: ${colors.cloud_30} !important;
    }
  }
`
