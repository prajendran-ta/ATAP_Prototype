import React, { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import AntdTable from 'antd/es/table'
import { Icon } from '@amadeus/react-design-factory'
import { useExpandableRowRenderer } from './Table.helpers'
import { ColumnsType, ColumnType, TableProps } from './Table.d'
import * as Styled from './Table.styled'

const Table = <T extends object = {}, ExpandableItemType extends object = object>({
  noBorders,
  rowKey,
  cellsIdPrefix,
  columns = [],
  pagination,
  onUpdatePagination,
  tableLayout,
  expandable,
  ...props
}: TableProps<T, ExpandableItemType>) => {
  const tableWrapperRef = useRef<HTMLDivElement>(null)
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({})
  const { t } = useTranslation('design-system')
  const [clientPagination, setClientPagination] = useState<{ current: number; pageSize: number }>({
    current: 1,
    pageSize: 10,
  })

  const onChangeClientPagination = (current: number, pageSize: number) => {
    setClientPagination({ current, pageSize })
    onUpdatePagination?.(current, pageSize)
  }

  const defaultPagination: TableProps<T, ExpandableItemType>['pagination'] =
    pagination === true
      ? {
          pageSizeOptions: [10, 20, 50, 100],
          showSizeChanger: {
            showSearch: false,
          },
          position: ['bottomCenter'],
          current: clientPagination.current,
          pageSize: clientPagination.pageSize,
          showTotal: (total, range) => t('table.total', { end: range[1], total }),
          onChange: onChangeClientPagination,
        }
      : pagination

  const modifiedColumns: ColumnsType<T> = useMemo(
    () =>
      columns.map((col: ColumnType<T>) => ({
        ...col,
        ...(cellsIdPrefix &&
          col.dataIndex && {
            onCell: (_: T, rowIndex) => ({
              id: `${cellsIdPrefix}-${col.dataIndex?.toString().replace(',', '_')}-tbl_cell-${rowIndex}`,
              ...col.onCell,
            }),
          }),
        ...(expandable?.rowExpandable &&
          col.dataIndex && {
            onHeaderCell: () =>
              ({
                'data-col-key': String(col.dataIndex),
              }) as React.HTMLAttributes<HTMLElement>,
          }),
      })),
    [columns, cellsIdPrefix, expandable?.rowExpandable],
  )

  const expandableEnabled = !!expandable?.rowExpandable
  const columnKeysSignature = useMemo(
    () => modifiedColumns.map((col: ColumnType<T>) => String(col.dataIndex)).join('|'),
    [modifiedColumns],
  )

  useLayoutEffect(() => {
    const tableContainer = tableWrapperRef.current
    if (!expandableEnabled || !tableContainer) return undefined

    const measureColumnWidths = () => {
      const headerCells = tableContainer.querySelectorAll<HTMLElement>('th[data-col-key]')
      const widths: Record<string, number> = {}
      headerCells.forEach(cell => {
        const key = cell.getAttribute('data-col-key')
        if (key) {
          widths[key] = Math.round(cell.getBoundingClientRect().width)
        }
      })

      setColumnWidths(prevWidths => {
        const keys = Object.keys(widths)
        const isUnchanged =
          keys.length === Object.keys(prevWidths).length && keys.every(key => prevWidths[key] === widths[key])
        return isUnchanged ? prevWidths : widths
      })
    }

    let frameId = requestAnimationFrame(measureColumnWidths)

    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(measureColumnWidths)
    })
    resizeObserver.observe(tableContainer)

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
    }
  }, [expandableEnabled, columnKeysSignature, props.dataSource])

  const expandedRowRender = useExpandableRowRenderer<T, ExpandableItemType>({
    columns: modifiedColumns,
    getItems: record => (expandable ? expandable.expandableRenderItems(record) : []),
    cellRenderMap: expandable?.cellRenderMap ?? [],
    cellsIdPrefix,
    columnWidths,
  })

  return (
    <Styled.Table ref={tableWrapperRef} noBorders={noBorders}>
      <AntdTable
        {...props}
        rowKey={rowKey}
        columns={modifiedColumns}
        pagination={defaultPagination}
        tableLayout={tableLayout ?? 'auto'}
        expandable={
          expandable?.rowExpandable
            ? {
                ...expandable,
                expandedRowRender: expandedRowRender,
                expandIcon: ({ record, expanded, onExpand }) =>
                  expandable?.rowExpandable?.(record) && (
                    <Styled.IconButton
                      {...(cellsIdPrefix && { id: `${cellsIdPrefix}-${record[rowKey as keyof T]}-expand-btn` })}
                      size='small'
                      color='primary'
                      onClick={(event: React.MouseEvent<HTMLButtonElement>) => onExpand(record, event)}
                    >
                      <Icon name={expanded ? 'caretDown' : 'caretRight'} color='primary' width='12' height='12' />
                    </Styled.IconButton>
                  ),
              }
            : {
                // Tree data (rows with a `children` array): render a caret toggle; other rows get
                // a blank spacer so columns stay aligned. (No-op for tables without children.)
                expandIcon: ({ record, expanded, onExpand }) => {
                  const hasChildren = Array.isArray((record as { children?: unknown[] }).children)
                    && ((record as { children?: unknown[] }).children?.length ?? 0) > 0
                  if (!hasChildren) return <span style={{ display: 'inline-block', width: 28 }} />
                  return (
                    <Styled.IconButton
                      {...(cellsIdPrefix && { id: `${cellsIdPrefix}-${record[rowKey as keyof T]}-expand-btn` })}
                      size='small'
                      color='primary'
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 28,
                        height: 28,
                        padding: 4,
                      }}
                      onClick={(event: React.MouseEvent<HTMLButtonElement>) => onExpand(record, event)}
                    >
                      <Icon name={expanded ? 'caretDownSolid' : 'caretRightSolid'} color='primary' width='16' height='16' />
                    </Styled.IconButton>
                  )
                },
              }
        }
      />
    </Styled.Table>
  )
}

export default Table
