import styled from '@emotion/styled'
import { colors } from '@amadeus/react-design-factory'

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 10px;
`

export const Description = styled.p`
  margin: 0 0 12px 0;
  color: ${colors.cloud_80};
  font-size: 13px;
  line-height: 1.4;
`

export const LinksWrapper = styled.nav`
  margin-top: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding-top: 10px;
`
