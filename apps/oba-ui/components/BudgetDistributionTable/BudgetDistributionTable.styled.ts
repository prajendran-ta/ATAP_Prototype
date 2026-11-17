import styled from '@emotion/styled'
import { budgetsColsWidth } from './BudgetDistributionTable.helpers'

export const TableWrapper = styled.div<{ monthsCount: number }>`
  ${({ monthsCount }) =>
    `width: ${monthsCount >= 12 ? '100%' : budgetsColsWidth.name + monthsCount * budgetsColsWidth.month}px;`}
  ${({ monthsCount }) => monthsCount > 12 && 'overflow-x: auto'};

  .amadeus-table-tbody > tr > td {
    vertical-align: top !important;
  }
`

export const TotalField = styled.div`
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  text-align: center;
`
