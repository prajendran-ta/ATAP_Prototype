import styled from '@emotion/styled'
import Card from 'antd/es/card'
import { colors } from '@amadeus/react-design-factory'

export const StyledCard = styled(Card)<{ accent: string }>`
  border-radius: 3px;
  border-left: 3px solid ${({ accent }) => accent};
  margin-bottom: 4px;
  border-right: 1px solid ${colors.cloud_40};
  border-top: 1px solid ${colors.cloud_40};
  border-bottom: 1px solid ${colors.cloud_40};

  .amadeus-card-body {
    padding: 6px 10px;
  }
`

export const Item = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

export const IconColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
  margin-right: 8px;
`

export const IconWrap = styled.div`
  margin-bottom: 8px;
`

export const Dot = styled.div`
  width: 6px;
  height: 6px;
  background-color: ${colors.sky_60};
  border-radius: 50%;
  margin-bottom: auto;
  margin-top: 8px;
`

export const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const RowsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 8px;
`

export const Message = styled.div`
  grid-column: 1 / -1;
  min-width: 0;
  word-break: break-word;
`

export const BottomContent = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
`

export const LeftSlot = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  gap: 8px;
  margin-right: auto;
`

export const LinkButtonWrapper = styled.div`
  .amadeus-btn {
    padding: 0px 6px !important;
  }
`

export const RightSlot = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
  margin-left: auto;
  white-space: nowrap;
`

export const OBAButton = styled('div')`
  border-radius: 6px;
  padding: 2px 4px;
  background-color: ${colors.sky_20};
  color: ${colors.sky_90};
  border-color: transparent;
`
