import styled from '@emotion/styled'
import AntdCollapse from 'antd/es/collapse'
import { colors } from '../../styles'

export const StyledCollapse = styled(AntdCollapse)<{ ghost?: boolean }>`
  &.amadeus-collapse {
    background-color: transparent;
    border: 1px solid ${colors.cloud_40};
  }

  .amadeus-collapse-item {
    .amadeus-collapse-collapsible-header .amadeus-collapse-header-text {
      flex: 1;
    }

    .amadeus-collapse-content > .amadeus-collapse-content-box {
      padding: 4px 0px;
    }

    &.amadeus-collapse-item-disabled > .amadeus-collapse-header {
      color: ${colors.cloud_50};
      cursor: not-allowed;
      pointer-events: none;

      .amadeus-collapse-expand-icon,
      .amadeus-collapse-expand-icon svg {
        color: ${colors.cloud_50};
        fill: ${colors.cloud_50};
        stroke: ${colors.cloud_50};
      }
    }

    .amadeus-collapse-header {
      border-radius: 7px;
      cursor: pointer;
      ${({ ghost }) =>
        ghost &&
        `
        border-bottom: 1px solid ${colors.cloud_50};
        border-radius: 4px !important;
      `};

      &:hover {
        background-color: ${colors.sky_20};
        border-radius: 7px;
      }

      &:focus,
      &:focus-within {
        outline: none;
        border-radius: 8px;
        box-shadow: inset 0 0 0 2px ${colors.cloud_100};
      }

      .amadeus-collapse-expand-icon {
        margin: auto 0;
        color: ${colors.sky_60};

        svg {
          color: currentColor;
          fill: currentColor;
          stroke: currentColor;
        }
      }

      &:hover .amadeus-collapse-expand-icon {
        color: ${colors.cloud_100};
      }
    }
  }
`

export const AccordionWrapper = styled.div``

export const PanelHeader = styled.div<{ disabled?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  width: 100%;

  color: ${({ disabled }) => (disabled ? colors.cloud_50 : colors.cloud_100)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'inherit')};
`

export const HeaderIndex = styled.span`
  display: inline-flex;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  background: ${colors.cloud_50};
  color: ${colors.cloud_100};
  align-items: center;
  justify-content: center;
  font-size: 12px;
`

export const HeaderContent = styled.span`
  display: flex;
  cursor: inherit;
`

export const ExpandIconWrapper = styled.span<{ active?: boolean; disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  color: ${({ disabled }) => (disabled ? colors.cloud_50 : 'inherit')};
`
