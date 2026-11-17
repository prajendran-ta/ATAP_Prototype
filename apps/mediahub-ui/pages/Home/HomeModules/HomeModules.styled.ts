import styled from '@emotion/styled'

export const GridWrapper = styled('div')`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, auto);
  align-items: start;
`
