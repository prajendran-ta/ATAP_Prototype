import styled from '@emotion/styled'
import { colors } from '../../styles'

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px 16px;
  padding: 18px 24px;
  margin: 16px 0;
  background-color: ${colors.cloud_0};
  border: 1px solid ${colors.cloud_30};
  border-radius: 5px;
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`
