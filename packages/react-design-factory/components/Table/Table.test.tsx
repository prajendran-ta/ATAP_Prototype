import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Table from './Table'
import type { ColumnsType } from './Table.d'

const originalGetComputedStyle = window.getComputedStyle.bind(window)
beforeAll(() => {
  Object.defineProperty(window, 'getComputedStyle', {
    value: (el: Element, pseudoElt?: string | null) =>
      pseudoElt ? ({} as CSSStyleDeclaration) : originalGetComputedStyle(el),
    writable: true,
    configurable: true,
  })
})

afterAll(() => {
  Object.defineProperty(window, 'getComputedStyle', {
    value: originalGetComputedStyle,
    writable: true,
    configurable: true,
  })
})

type Row = { key: string; name: string; value: number }
type ChildItem = { id: number; name: string }
type ExpandableRowType = { key: string; value: number; items?: ChildItem[]; name: string }

const columns: ColumnsType<Row> = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Value', dataIndex: 'value', key: 'value' },
]

const buildRows = (count: number): Row[] =>
  Array.from({ length: count }, (_, i) => ({ key: `${i}`, name: `Row ${i}`, value: i }))

const dataSource: ExpandableRowType[] = [
  {
    key: '1',
    name: 'Advertiser A',
    value: 100,
    items: [
      { id: 1, name: 'External Advertiser 1' },
      { id: 2, name: 'External Advertiser 2' },
    ],
  },
  {
    key: '2',
    name: 'Advertiser B',
    value: 100,
    items: [],
  },
]

describe('Table — basic rendering', () => {
  it('renders column headers and row data', () => {
    const { container } = render(<Table dataSource={buildRows(3)} columns={columns} rowKey='key' />)

    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Value')).toBeInTheDocument()

    expect(screen.getByText('Row 0')).toBeInTheDocument()
    expect(screen.getByText('Row 1')).toBeInTheDocument()
    expect(screen.getByText('Row 2')).toBeInTheDocument()

    expect(container.querySelectorAll('tbody tr')).toHaveLength(3)
  })

  it('renders an empty table without crashing', () => {
    const { container } = render(<Table dataSource={[]} columns={columns} rowKey='key' />)

    expect(container.querySelectorAll('tbody tr')).toHaveLength(1)
    expect(container.querySelector('.ant-empty')).toBeInTheDocument()
  })
})

describe('Table — noBorders', () => {
  it('applies a distinct CSS class when noBorders is set compared to the default', () => {
    const { container: defaultContainer } = render(<Table dataSource={[]} columns={columns} rowKey='key' />)
    const { container: noBordersContainer } = render(<Table dataSource={[]} columns={columns} rowKey='key' noBorders />)
    const defaultWrapper = defaultContainer.firstChild as HTMLElement
    const noBordersWrapper = noBordersContainer.firstChild as HTMLElement

    expect(defaultWrapper.className).not.toBe(noBordersWrapper.className)
  })
})

describe('Table — cellsIdPrefix', () => {
  it('adds prefixed id attributes to body cells using the dataIndex and row index', () => {
    const { container } = render(
      <Table dataSource={buildRows(2)} columns={columns} rowKey='key' cellsIdPrefix='my-tbl' />,
    )

    expect(container.querySelector('#my-tbl-name-tbl_cell-0')).toBeInTheDocument()
    expect(container.querySelector('#my-tbl-name-tbl_cell-1')).toBeInTheDocument()
    expect(container.querySelector('#my-tbl-value-tbl_cell-0')).toBeInTheDocument()
    expect(container.querySelector('#my-tbl-value-tbl_cell-1')).toBeInTheDocument()
  })

  it('does not add id attributes to cells when cellsIdPrefix is not provided', () => {
    const { container } = render(<Table dataSource={buildRows(2)} columns={columns} rowKey='key' />)

    expect(container.querySelector('[id*="tbl_cell"]')).not.toBeInTheDocument()
  })
})

describe('Table — pagination', () => {
  it('renders default pagination with a "range of total" summary when pagination is true', () => {
    render(<Table dataSource={buildRows(25)} columns={columns} rowKey='key' pagination={true} />)

    expect(screen.getByText('10 of 25 items')).toBeInTheDocument()
  })

  it('does not render pagination UI when pagination is false', () => {
    render(<Table dataSource={buildRows(25)} columns={columns} rowKey='key' pagination={false} />)

    expect(screen.queryByText(/of \d+ items/)).not.toBeInTheDocument()
  })

  it('passes a custom pagination object through unchanged', () => {
    render(
      <Table
        dataSource={buildRows(25)}
        columns={columns}
        rowKey='key'
        pagination={{ pageSize: 5, showTotal: total => `Total: ${total}` }}
      />,
    )

    expect(screen.getByText('Total: 25')).toBeInTheDocument()
  })
})

describe('Table — onUpdatePagination', () => {
  it('calls onUpdatePagination with the new page and pageSize after a page change', () => {
    const onUpdatePagination = jest.fn()
    const { container } = render(
      <Table
        dataSource={buildRows(25)}
        columns={columns}
        rowKey='key'
        pagination={true}
        onUpdatePagination={onUpdatePagination}
      />,
    )

    const nextBtn = container.querySelector('.ant-pagination-next button') as HTMLElement
    fireEvent.click(nextBtn)

    expect(onUpdatePagination).toHaveBeenCalledWith(2, 10)
  })

  it('does not invoke onUpdatePagination when pagination is not true', () => {
    const onUpdatePagination = jest.fn()
    render(<Table dataSource={buildRows(25)} columns={columns} rowKey='key' onUpdatePagination={onUpdatePagination} />)

    expect(onUpdatePagination).not.toHaveBeenCalled()
  })
})

describe('ExtendableTable - expand behavior', () => {
  it('renders the expand icon (>) in the DOM where the row is Expandable', () => {
    const { container } = render(
      <Table<ExpandableRowType, ChildItem>
        columns={columns}
        cellsIdPrefix='test'
        dataSource={dataSource}
        rowKey='key'
        tableLayout='fixed'
        expandable={{
          rowExpandable: record => (record.items?.length ?? 0) > 0,
          expandableRenderItems: record => record.items || [],
          cellRenderMap: [{ value: item => <span>{item.name}</span> }],
        }}
      />,
    )

    const expandIcon = container.querySelector('[id^="test-1-expand-btn"]')
    fireEvent.click(expandIcon!)
    expect(expandIcon).toBeInTheDocument()
  })

  it('does not render the expand icon for Tables where the row is not Expandable', () => {
    render(<Table<ExpandableRowType> columns={columns} dataSource={dataSource} tableLayout='fixed' />)
    expect(screen.queryByTestId('expand-row-btn')).not.toBeInTheDocument()
  })

  it('toggles the row expanded state on click', () => {
    const { container } = render(
      <Table<ExpandableRowType, ChildItem>
        columns={columns}
        dataSource={dataSource}
        cellsIdPrefix='test'
        rowKey='key'
        tableLayout='fixed'
        expandable={{
          rowExpandable: record => (record.items?.length ?? 0) > 0,
          expandableRenderItems: record => record.items || [],
          cellRenderMap: [{ value: item => <span>{item.name}</span> }],
        }}
      />,
    )

    const expandIcon = container.querySelector('[id^="test-1-expand-btn"]')
    expect(expandIcon).toBeInTheDocument()
    expect(screen.queryByText('External Advertiser 1')).not.toBeInTheDocument()

    fireEvent.click(expandIcon!)
    // after click: expanded → child row content is rendered
    expect(screen.getByText('External Advertiser 1')).toBeInTheDocument()
  })

  it('renders content in the cell matching the cellRenderMap key when expanded', () => {
    const { container } = render(
      <Table<ExpandableRowType, ChildItem>
        columns={columns}
        cellsIdPrefix='test'
        dataSource={dataSource}
        rowKey='key'
        tableLayout='fixed'
        expandable={{
          rowExpandable: record => (record.items?.length ?? 0) > 0,
          expandableRenderItems: record => record.items || [],
          cellRenderMap: [{ value: item => <span>{item.name}</span> }],
        }}
      />,
    )

    const expandIcon = container.querySelector('[id^="test-1-expand-btn"]')
    fireEvent.click(expandIcon!)
    // content from items should render, matched to the 'value' column
    expect(screen.getByText('External Advertiser 1')).toBeInTheDocument()
    expect(screen.getByText('External Advertiser 2')).toBeInTheDocument()
  })
})

it('renders nothing in columns without a matching cellRenderMap key', () => {
  const { container } = render(
    <Table<ExpandableRowType, ChildItem>
      columns={columns}
      dataSource={dataSource}
      cellsIdPrefix='test'
      rowKey='key'
      tableLayout='fixed'
      expandable={{
        rowExpandable: record => (record.items?.length ?? 0) > 0,
        expandableRenderItems: record => record.items || [],
        cellRenderMap: [{ value: item => <span>{item.name}</span> }],
      }}
    />,
  )

  const expandIcon = container.querySelector('[id^="test-1-expand-btn"]')
  fireEvent.click(expandIcon!)
  const expandedRow = container.querySelector('#test-tbl_rows-0_expanded')
  expect(expandedRow).toBeInTheDocument()
  // find the cell corresponding to the 'name' column (no renderFn) and confirm it's empty
  const cells = expandedRow?.querySelectorAll('[id^="test-name-tbl_cell-0-tbl_rows-0_expanded"]')
  const nameColumnIndex = columns.findIndex(col => 'dataIndex' in col && col.dataIndex === 'name')
  expect(cells && cells[nameColumnIndex]).toBeEmptyDOMElement()
})
