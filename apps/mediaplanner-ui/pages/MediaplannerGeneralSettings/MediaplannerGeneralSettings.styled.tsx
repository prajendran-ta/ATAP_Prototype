import { Toggle } from '@amadeus/react-design-factory'
import styled from '@emotion/styled'

export const ToggleButton = styled(Toggle)`
    margin-top: 25px; 
`
export const SwitchField = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
`

export const SwitchLabelField = styled.div`
  margin: auto 0px 2px 0px;
  font-weight: bold; 
  font-size: 16px;  
`

export const SwitchContainer = styled.div`
  display: flex;
  gap: 12px;
  height: auto;
`

export const StatusSelectWrapper = styled.div`
  .amadeus-select-single {
    height: 34px !important;
  }

  .amadeus-select-single .amadeus-select-selector {
    height: 34px !important;
    min-height: 34px !important;
  }
`

export const PrefillSummaryCard = styled.div`
  margin-top: 12px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  background: #fafafa;
`

export const PrefillSummaryRow = styled.div`
  margin-top: 4px;
`
