import styled from '@emotion/styled'
import { injectGlobal } from '@emotion/css'
import { colors } from '../../styles'
import type { SelectProps } from './Select.d'
import { Icon } from '../Icon'

// Injecting Select dropdown styles as they are rendered in a portal
injectGlobal`
  .amadeus-select-dropdown {
    .amadeus-select-item:hover {
      background-color: ${colors.sky_20} !important;
    }
    // Increasing specificity to override hover styles
    .amadeus-select-item.amadeus-select-item-option-selected {
      background-color: ${colors.sky_30} !important;
      font-weight: 400 !important;
    }
  }
`

export const SelectWrapper = styled.div<SelectProps>`
  display: flex;
  flex-direction: column;
  gap: 7px;
  width: 100%;
  min-width: 0;

  .amadeus-select-selector {
    overflow: hidden;
  }

  .amadeus-select-selection-overflow {
    min-width: 0;
    max-width: 100%;
    overflow: hidden;
  }

  .amadeus-select-selection-overflow-item {
    min-width: 0;
    max-width: 100%;
  }

  // Clear button (x)
  .amadeus-select-clear {
    ${({ allowClear }) =>
      allowClear &&
      `
      opacity: 1 !important;
      visibility: visible !important;
    `}
    margin-right: 20px;
    font-size: 12px;
    font-weight: 300;
  }

  .amadeus-select-selection-item {
    min-width: 0;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    ${({ withBadges }) =>
      withBadges &&
      `
      font-size: 12px;
      border-radius: 9px !important;
      background: ${colors.cloud_30} !important;
    `}
  }
`

export const OptionContainer = styled.div<{ disabled?: boolean }>`
  display: flex;
  gap: 8px;
  ${({ disabled }) =>
    disabled &&
    `
    color: ${colors.cloud_50};
    cursor: not-allowed;
  `}
`

export const OptionLabel = styled.span`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 8px;
`

export const TagSummary = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  min-width: 0;
`

export const TagCount = styled.span`
  flex: 0 0 auto;
  white-space: nowrap;
  padding-right: 8px;
`

export const SuffixIcon = styled(Icon)<{ disabled?: boolean }>`
  color: ${({ disabled }) => (disabled ? 'currentColor' : colors.cloud_80)};
`
