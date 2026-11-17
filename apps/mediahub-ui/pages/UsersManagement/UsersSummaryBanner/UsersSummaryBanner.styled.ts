import styled from '@emotion/styled'
import { Text, colors } from '@amadeus/react-design-factory'
import { Container } from '@amadeus/react-design-factory'

export const BadgeTitle = styled(Text.H6)`
  margin-bottom: 0px;
  padding: 2px;
`

export const RolesContainerHeader = styled(Container.Header)`
  display: flex;
  justify-content: 'start';
  width: 100%;
  margin-bottom: 16px;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-bottom: 16px;
`

export const BadgeBlock = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 24px;
`

export const BadgeItem = styled.div<{ color: keyof typeof colors }>`
  background-color: ${({ color }) => colors[color]};
  padding: 4px 6px;
  border-radius: 9999px;
  min-width: 100px;
  text-align: center;
`

export const Count = styled.div`
  font-size: 20px;
  text-align: center;
  margin-top: 4px;
`
