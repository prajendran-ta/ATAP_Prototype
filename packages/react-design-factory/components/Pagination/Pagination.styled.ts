import { colors } from '@amadeus/react-design-factory/styles'
import styled from '@emotion/styled'

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  gap: 16px;

  .anticon {
    color: ${colors.sky_60};
  }

  .amadeus-pagination-total-text {
    margin-right: auto;
  }

  .amadeus-pagination-options {
    margin-left: auto;
  }

  .amadeus-pagination-item-active {
    background-color: ${colors.sky_30};
    border: none;

    a {
      color: ${colors.cloud_100};
    }
  }
`

export const PaginationLeft = styled.div`
  font-size: 14px;
`

export const PaginationCenter = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
`

export const PaginationRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    white-space: nowrap;
    font-size: 14px;
  }
`
