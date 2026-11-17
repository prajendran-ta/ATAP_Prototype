import styled from '@emotion/styled'
import { colors } from '@amadeus/react-design-factory'

export const DrawerContent = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 24px 16px;
`

export const Card = styled.div`
  border: 1px solid ${colors.cloud_40};
  border-radius: 6px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

// A read-only "field" that mirrors the greyed inputs in the Figma design.
export const ReadOnlyField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const ReadOnlyLabel = styled.span`
  font-size: 12px;
  color: ${colors.cloud_80};
`

export const ReadOnlyValueBox = styled.div`
  font-size: 14px;
  color: ${colors.cloud_100};
  background: ${colors.cloud_20};
  border: 1px solid ${colors.cloud_30};
  border-radius: 4px;
  padding: 6px 10px;
  min-height: 32px;
  display: flex;
  align-items: center;
`

// Grids for arranging fields two-up / three-up like the design.
export const FieldGridTwo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`

export const FieldGridThree = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
`

export const FullWidthField = styled.div`
  grid-column: 1 / -1;
`

// Generated campaign-name row: read-only value + copy icon button.
export const GeneratedNameRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
`

export const CopyButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  flex: 0 0 auto;
  border: 1px solid ${colors.cloud_40};
  background: ${colors.cloud_0};
  border-radius: 4px;
  cursor: pointer;
  color: ${colors.sky_60};

  &:hover {
    background: ${colors.cloud_20};
  }
`

export const PlaceholderNote = styled.p`
  font-size: 12px;
  color: ${colors.cloud_80};
  margin: 0;
`

export const DrawerFooter = styled.div`
  flex: 0 0 auto;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding: 12px 24px;
  background: ${colors.cloud_0};
  border-top: 1px solid ${colors.cloud_40};
`
