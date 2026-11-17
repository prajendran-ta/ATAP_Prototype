import { Button } from 'antd'
import styled from '@emotion/styled'
import { colors } from '../../styles'
import { getJustifyContent } from './Table.helpers'
import type { AlignType } from 'rc-table/lib/interface'
import type { TableProps } from './Table.d'

export const Table = styled.div<TableProps>`
  .amadeus-table {
    font-size: 14px;
    font-weight: 400;
  }

  .amadeus-table-thead > tr > th {
    background-color: ${colors.cloud_0};
    font-weight: 500;
    border-bottom: ${({ noBorders }) => (noBorders ? 'none' : `1px solid ${colors.cloud_30}`)};
    padding: 6px 8px;
  }

  .amadeus-table-wrapper
    .amadeus-table-thead
    > tr
    > th:not(:last-child):not(.amadeus-table-selection-column):not(.amadeus-table-row-expand-icon-cell):not(
      [colspan]
    )::before {
    background-color: transparent !important;
  }

  .amadeus-table-cell,
  .amadeus-table-wrapper .amadeus-table-tbody > tr > td {
    border-bottom: ${({ noBorders }) => (noBorders ? 'none' : `1px solid ${colors.cloud_30}`)};
  }

  // Remove extra vertical padding for expanded rows
  .amadeus-table-cell:has(> tr) {
    padding: 0 10px !important;
  }

  .amadeus-table-tbody > tr > td {
    padding: 6px 10px;
    vertical-align: middle;
  }

  .amadeus-table-row {
    min-height: 36px;
  }

  .amadeus-table-row:hover {
    background-color: ${colors.cloud_20};
  }

  .amadeus-pagination {
    & > :first-of-type {
      margin-right: auto;
    }
    & > :last-of-type {
      margin-left: auto;
      &::before {
        content: 'Items per page';
        margin-right: 8px;
      }
    }

    .amadeus-pagination-item-link,
    .amadeus-select-arrow {
      color: ${colors.sky_60};
    }

    .amadeus-pagination-item:hover {
      background-color: ${colors.sky_20};
    }

    .amadeus-pagination-item-active {
      background-color: ${colors.sky_30};
      border: none;
      a {
        color: ${colors.cloud_100};
      }
    }
  }

  .amadeus-checkbox-inner {
    border-radius: 4px;
  }

  .amadeus-icon {
    font-size: 16px;
    vertical-align: middle;
  }
`

export const IconButton = styled(Button)`
  all: unset;
  &:hover {
    background: none !important;
    cursor: pointer;
  }
  transition: rotate 0.2s ease-in-out;
  color: ${colors.sky_60};
`
export const ExpandedTableRow = styled.tr`
  display: flex;
  width: 0;
  min-width: calc(100% - 26px);
  padding-left: 36px;

  &:not(:last-child) {
    border-bottom: 1px solid ${colors.cloud_30};
  }
`
export const ExpandedTableCell = styled.td<{
  width: string | number | undefined
  cellAlign?: AlignType
}>`
  ${({ width }) => {
    if (!width || width === 'auto') {
      return `flex: 1 1 0%;
              min-width:0;`
    }
    const widthValue = typeof width === 'number' ? `${width}px` : width
    return `flex: 0 0 ${widthValue}; 
            min-width: 0;
            width: ${widthValue};`
  }}
  display: flex;
  justify-content: ${({ cellAlign }) => getJustifyContent(cellAlign)};
  text-align: left;
  padding: 6px 10px;
`
