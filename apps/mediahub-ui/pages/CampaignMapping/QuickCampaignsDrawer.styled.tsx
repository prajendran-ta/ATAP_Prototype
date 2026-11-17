import styled from '@emotion/styled'
import { colors } from '@amadeus/react-design-factory'

export const QuickHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`

// Single shared column template used by BOTH the header and the data rows so they line up.
// # · Campaign (wide) · Tactic · Sub-Type · Language · C1 · C2 · C3 · delete
const GRID_COLS = `28px minmax(260px, 2.2fr) 128px 128px 120px 96px 96px 96px 36px`
const GRID_GAP = '8px'

export const QuickColHeadGrid = styled.div`
  display: grid;
  grid-template-columns: ${GRID_COLS};
  gap: ${GRID_GAP};
  align-items: end;
  margin-top: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${colors.cloud_30};
`

export const QuickColHead = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.cloud_100};
  line-height: 18px;
  white-space: normal;
  overflow-wrap: anywhere;
`

export const QuickRowGrid = styled.div`
  display: grid;
  grid-template-columns: ${GRID_COLS};
  gap: ${GRID_GAP};
  align-items: center;
  margin-top: 12px;
`

export const QuickRowNum = styled.span`
  font-size: 14px;
  color: ${colors.cloud_80};
  text-align: center;
`

export const QuickGeneratedName = styled.div`
  font-size: 12px;
  color: ${colors.cloud_80};
  margin: 4px 0 4px 36px;
`

// The DWI 48h note for a typed/own Campaign ID. Rendered full-width BELOW the row grid (not inside
// the first grid cell) so it never stretches a column or pushes the delete button onto a new line.
export const QuickRowNote = styled.p`
  font-size: 12px;
  color: ${colors.cloud_80};
  line-height: 16px;
  margin: 4px 0 0 36px;
`

export const QuickDeleteBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  color: ${colors.cloud_70};

  &:hover:not(:disabled) {
    background: ${colors.cloud_20};
    color: ${colors.crimson_60};
  }

  &:disabled {
    cursor: not-allowed;
    color: ${colors.cloud_40};
  }
`
