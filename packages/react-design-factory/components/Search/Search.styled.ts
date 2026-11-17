import styled from '@emotion/styled'
import { Input } from '@amadeus/react-design-factory'

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

export const SearchInput = styled(Input)`
  .amadeus-input-outlined {
    padding: 5px 10px;
  }

  .amadeus-input-group-addon {
    background-color: transparent !important;
    padding-right: 5px;
    border: none;
  }
`
