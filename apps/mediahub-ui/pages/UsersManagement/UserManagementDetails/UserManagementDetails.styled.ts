import styled from '@emotion/styled'
import { Grid, colors } from '@amadeus/react-design-factory'

export const DrawerContent = styled(Grid.Col)`
  overflow: auto;
  margin-bottom: 70px;
`

export const FieldsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
`

export const StyledSelect = styled.div``

export const SwitchField = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
`

export const SwitchLabelField = styled.div`
  margin: auto 0px 2px 0px;
`

export const SwitchContainer = styled.div`
  display: flex;
  gap: 12px;
  height: auto;
`
