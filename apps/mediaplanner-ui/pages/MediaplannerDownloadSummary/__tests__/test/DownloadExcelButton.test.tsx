import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import DownloadExcelButton from '../../download/DownloadExcelButton'

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
;(global as any).ResizeObserver = ResizeObserverMock

// Keep all mock state inside the factory so Jest hoisting doesn't cause
// "cannot access before initialization" errors on module-level variables.
// ExcelJS is used as `new ExcelJS.Workbook()`, so we mock the Workbook class
// on the default export namespace.
jest.mock('exceljs', () => {
  const addRowMock = jest.fn().mockReturnValue({
    getCell: jest.fn().mockReturnValue({ font: {} }),
    font: {},
    fill: {},
  })
  const worksheetMock = { columns: [], addRow: addRowMock }
  const writeBufferMock = jest.fn().mockResolvedValue(new ArrayBuffer(8))
  function Workbook(this: any) {
    this.addWorksheet = jest.fn().mockReturnValue(worksheetMock)
    this.xlsx = { writeBuffer: writeBufferMock }
  }
  const defaultExport = { Workbook, __addRowMock: addRowMock, __writeBufferMock: writeBufferMock }
  return { __esModule: true, default: defaultExport }
})

// Helpers to reach the mocks after hoisting
import ExcelJSModule from 'exceljs'
const getAddRowMock = () => (ExcelJSModule as any).__addRowMock as jest.Mock
const getWriteBufferMock = () => (ExcelJSModule as any).__writeBufferMock as jest.Mock

// Mock URL methods used during download
const mockCreateObjectURL = jest.fn().mockReturnValue('blob:mock-url')
const mockRevokeObjectURL = jest.fn()
Object.defineProperty(global.URL, 'createObjectURL', { value: mockCreateObjectURL, writable: true })
Object.defineProperty(global.URL, 'revokeObjectURL', { value: mockRevokeObjectURL, writable: true })

// Prevent the synthetic anchor click from causing navigation errors;
// also capture the anchor so we can inspect its download attribute
let lastAnchor: HTMLAnchorElement | null = null
const mockAnchorClick = jest.fn()
const originalCreateElement = document.createElement.bind(document)
jest.spyOn(document, 'createElement').mockImplementation((tag: string) => {
  if (tag === 'a') {
    const anchor = originalCreateElement('a')
    anchor.click = mockAnchorClick
    lastAnchor = anchor
    return anchor
  }
  return originalCreateElement(tag)
})

const baseProps = {
  overviewRows: [{ label: 'Plan Name', value: 'Alpha Campaign' }],
  monthColumns: [
    { monthLabel: 'Jan 2025', key: 'jan-2025' },
    { monthLabel: 'Feb 2025', key: 'feb-2025' },
  ],
  dataSource: [{ channel: 'Social', total: 10000, 'jan-2025': 5000, 'feb-2025': 5000 }],
  planName: 'Alpha Campaign',
}

beforeEach(() => {
  jest.clearAllMocks()
  lastAnchor = null
  mockCreateObjectURL.mockReturnValue('blob:mock-url')
  getWriteBufferMock().mockResolvedValue(new ArrayBuffer(8))
})

describe('DownloadExcelButton — rendering', () => {
  test('renders a button with "Download CSV" label', () => {
    render(<DownloadExcelButton {...baseProps} />)
    expect(screen.getByText('Download CSV')).toBeInTheDocument()
  })

  test('uses the default id when no id prop supplied', () => {
    render(<DownloadExcelButton {...baseProps} />)
    expect(document.getElementById('mediaplan_summary_download-btn')).toBeInTheDocument()
  })

  test('uses a custom id when provided', () => {
    render(<DownloadExcelButton {...baseProps} id='custom-download-btn' />)
    expect(document.getElementById('custom-download-btn')).toBeInTheDocument()
  })
})

describe('DownloadExcelButton — download behavior', () => {
  test('calls URL.createObjectURL with a Blob after workbook is built', async () => {
    render(<DownloadExcelButton {...baseProps} />)
    fireEvent.click(screen.getByText('Download CSV'))
    await waitFor(() => expect(mockCreateObjectURL).toHaveBeenCalled())
    const [arg] = mockCreateObjectURL.mock.calls[0]
    expect(arg).toBeInstanceOf(Blob)
  })

  test('calls URL.revokeObjectURL to clean up the object URL', async () => {
    render(<DownloadExcelButton {...baseProps} />)
    fireEvent.click(screen.getByText('Download CSV'))
    await waitFor(() => expect(mockRevokeObjectURL).toHaveBeenCalledWith('blob:mock-url'))
  })

  test('triggers the anchor click to initiate the download', async () => {
    render(<DownloadExcelButton {...baseProps} />)
    fireEvent.click(screen.getByText('Download CSV'))
    await waitFor(() => expect(mockAnchorClick).toHaveBeenCalled())
  })

  test('derives the file name from planName (lowercased, spaces to dashes)', async () => {
    render(<DownloadExcelButton {...baseProps} planName='My Great Plan' />)
    fireEvent.click(screen.getByText('Download CSV'))
    await waitFor(() => expect(mockAnchorClick).toHaveBeenCalled())
    expect(lastAnchor?.download).toContain('my-great-plan')
  })

  test('falls back to "media-plan" in the file name when planName is null', async () => {
    render(<DownloadExcelButton {...baseProps} planName={null} />)
    fireEvent.click(screen.getByText('Download CSV'))
    await waitFor(() => expect(mockAnchorClick).toHaveBeenCalled())
    expect(lastAnchor?.download).toContain('media-plan')
  })

  test('strips special characters from the file name', async () => {
    render(<DownloadExcelButton {...baseProps} planName='Plan: "2025" <test>' />)
    fireEvent.click(screen.getByText('Download CSV'))
    await waitFor(() => expect(mockAnchorClick).toHaveBeenCalled())
    expect(lastAnchor?.download).not.toMatch(/[:"<>]/)
  })

  test('adds overview rows to the worksheet', async () => {
    render(<DownloadExcelButton {...baseProps} />)
    fireEvent.click(screen.getByText('Download CSV'))
    await waitFor(() => expect(getAddRowMock()).toHaveBeenCalled())
    const allArgs = getAddRowMock().mock.calls
    const overviewCall = allArgs.find((call: any[]) => call[0]?.field === 'Plan Name')
    expect(overviewCall).toBeTruthy()
  })

  test('uses "Platform-Tactic" as the first exported table header', async () => {
    render(<DownloadExcelButton {...baseProps} />)
    fireEvent.click(screen.getByText('Download CSV'))
    await waitFor(() => expect(getAddRowMock()).toHaveBeenCalled())

    const allArgs = getAddRowMock().mock.calls
    const headerCall = allArgs.find(
      (call: any[]) => Array.isArray(call[0]) && call[0][0] === 'Platform-Tactic',
    )

    expect(headerCall).toBeTruthy()
  })
})
