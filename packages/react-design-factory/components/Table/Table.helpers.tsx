import React, { ReactNode } from 'react'
import type { AlignType } from 'rc-table/lib/interface'
import type { UseExpandableRowRendererProps } from './Table.d'
import * as Styled from './Table.styled'

export const alignToJustifyContentMap: Record<string, string> = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
}

export const getJustifyContent = (align?: AlignType) => alignToJustifyContentMap[align ?? 'left'] ?? 'flex-start'

export function useExpandableRowRenderer<RecordType extends object, ItemType extends object = object>({
  columns,
  getItems,
  cellRenderMap,
  cellsIdPrefix,
  columnWidths,
}: UseExpandableRowRendererProps<RecordType, ItemType>): (record: RecordType) => ReactNode {
  return (record: RecordType) => {
    const childrenItems = getItems(record) ?? []
    return childrenItems.map((child, idx) => (
      <Styled.ExpandedTableRow key={idx} {...(cellsIdPrefix && { id: `${cellsIdPrefix}-tbl_rows-${idx}_expanded` })}>
        {columns.map((col, index) => {
          const key = String(col.dataIndex)
          const renderFn = cellRenderMap.find(map => key in map)?.[key]
          return (
            <Styled.ExpandedTableCell
              key={key}
              width={columnWidths?.[key] ?? col.width}
              cellAlign={col.align}
              {...(cellsIdPrefix && {
                id: `${cellsIdPrefix}-${col.dataIndex?.toString().replace(',', '_')}-tbl_cell-${index}-tbl_rows-${idx}_expanded`,
              })}
            >
              {renderFn ? renderFn(child) : null}
            </Styled.ExpandedTableCell>
          )
        })}
      </Styled.ExpandedTableRow>
    ))
  }
}
