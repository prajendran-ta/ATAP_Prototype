import styled from '@emotion/styled'
import { colors } from '@amadeus/react-design-factory'

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
`
export const TableBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
export const Note = styled.p`
  margin: 0;
  color: ${colors.cloud_80};
  font-size: 13px;
  font-style: italic;
`
export const BannerCell = styled.div`
  width: 140px;
`
