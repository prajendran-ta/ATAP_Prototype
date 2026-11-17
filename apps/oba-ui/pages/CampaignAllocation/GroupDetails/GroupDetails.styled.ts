import styled from '@emotion/styled'
import { Link as RdfLink, Grid as RdfGrid } from '@amadeus/react-design-factory'

export const LinkContainer = styled.div`
  margin-left: 2px;
  display: inline-flex;
  align-items: center;
`

export const Link = styled(RdfLink)`
  margin-right: 3px;
`

export const Grid = styled(RdfGrid.Col)`
  align-content: end;
`
