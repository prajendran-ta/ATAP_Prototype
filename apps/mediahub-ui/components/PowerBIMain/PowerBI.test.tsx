import '@testing-library/jest-dom'
import React, { act } from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import PowerBIReport from './PowerBIReport'
import { useReportsQuery } from './PowerBIReport.queries'

jest.mock('./helpers', () => ({
  getInitialReportConfig: jest.fn(() => ({
    accessToken: '',
    embedUrl: '',
  })),
}))

jest.mock('./PowerBIReport.queries', () => ({
  useReportsQuery: jest.fn(),
}))

let resizeObserverCallback: ResizeObserverCallback | undefined
const observeMock = jest.fn()
const disconnectMock = jest.fn()

class ResizeObserverMock {
  constructor(callback: ResizeObserverCallback) {
    resizeObserverCallback = callback
  }

  observe = observeMock
  disconnect = disconnectMock
  unobserve = jest.fn()
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: ResizeObserverMock,
})

const mockEmbeddedReport = {
  on: jest.fn(),
  off: jest.fn(),
  getPages: jest.fn().mockResolvedValue([]),
  getFilters: jest.fn().mockResolvedValue([]),
  setPage: jest.fn().mockResolvedValue(undefined),
  refresh: jest.fn().mockResolvedValue(undefined),
}

const mockPowerBIEmbed = jest.fn((props: any) => {
  React.useEffect(() => {
    props?.getEmbeddedComponent?.(mockEmbeddedReport)
  }, [props])

  return <div data-testid='powerbi-embed'>{props?.embedConfig?.pageName}</div>
})

jest.mock('powerbi-client-react', () => ({
  PowerBIEmbed: (props: any) => mockPowerBIEmbed(props),
}))

jest.mock('@amadeus/react-design-factory', () => ({
  Text: { H6: 'h6' },
  Icon: () => <div data-testid='icon' />,
  Spinner: () => <div data-testid='spinner' />,
  Tab: ({ items, onChange }: any) => (
    <div data-testid='tabs'>
      {items?.map((item: any) => (
        <button key={item.key} onClick={() => onChange(item.key)}>
          {item.label}
        </button>
      ))}
    </div>
  ),
}))

describe('@mediahub/mediahub-ui/components/PowerBIMain/PowerBIReport', () => {
  const mockUseReportsQuery = useReportsQuery as jest.Mock
  const reportsData = [
    {
      pageName: 'NeedsAttention',
      embedURL: 'https://report/1',
      token: { value: 'token-1', expiration: 123 },
      pageId: 'page-1',
      filters: [{ name: 'advertiser', value: 'A', ids: ['1'] }],
    },
    {
      pageName: 'TopSpenders',
      embedURL: 'https://report/2',
      token: { value: 'token-2', expiration: 456 },
      pageId: 'page-2',
      filters: [{ name: 'advertiser', value: 'B', ids: ['2'] }],
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('shows spinner while query is loading', () => {
    mockUseReportsQuery.mockReturnValue({
      reportsData: undefined,
      reportsLoading: true,
      reportsError: undefined,
    })

    render(<PowerBIReport />)

    expect(screen.getByTestId('spinner')).toBeInTheDocument()
    expect(screen.getByTestId('powerbi-embed')).toBeInTheDocument()
  })

  test('renders tabs and initializes embed config from first report', async () => {
    mockUseReportsQuery.mockReturnValue({
      reportsData,
      reportsLoading: false,
      reportsError: undefined,
    })

    render(<PowerBIReport />)

    expect(screen.getByRole('button', { name: 'NeedsAttention' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'TopSpenders' })).toBeInTheDocument()

    await waitFor(() => {
      expect(mockPowerBIEmbed).toHaveBeenCalled()
    })

    expect(mockPowerBIEmbed).toHaveBeenLastCalledWith(
      expect.objectContaining({
        embedConfig: expect.objectContaining({
          accessToken: 'token-1',
          embedUrl: 'https://report/1',
          pageName: 'NeedsAttention',
        }),
      }),
    )
  })

  test('updates embed config when tab changes', async () => {
    mockUseReportsQuery.mockReturnValue({
      reportsData,
      reportsLoading: false,
      reportsError: undefined,
    })

    render(<PowerBIReport />)

    fireEvent.click(screen.getByRole('button', { name: 'TopSpenders' }))

    await waitFor(() => {
      expect(mockPowerBIEmbed).toHaveBeenLastCalledWith(
        expect.objectContaining({
          embedConfig: expect.objectContaining({
            accessToken: 'token-2',
            embedUrl: 'https://report/2',
            pageName: 'TopSpenders',
          }),
        }),
      )
    })
  })

  test('observes wrapper resize and handles resize callbacks', async () => {
    mockUseReportsQuery.mockReturnValue({
      reportsData,
      reportsLoading: false,
      reportsError: undefined,
    })

    render(<PowerBIReport />)

    await waitFor(() => {
      expect(observeMock).toHaveBeenCalled()
      expect(mockEmbeddedReport.on).toHaveBeenCalled()
    })

    const observedElement = observeMock.mock.calls[0][0] as HTMLElement

    Object.defineProperty(observedElement, 'clientWidth', {
      configurable: true,
      value: 1000,
    })

    Object.defineProperty(observedElement, 'clientHeight', {
      configurable: true,
      value: 700,
    })

    await act(async () => {
      // First tick initializes previous dimensions and should not refresh.
      resizeObserverCallback?.([], {} as ResizeObserver)
      jest.advanceTimersByTime(250)
    })

    expect(observeMock).toHaveBeenCalledTimes(1)

    Object.defineProperty(observedElement, 'clientWidth', {
      configurable: true,
      value: 1200,
    })

    Object.defineProperty(observedElement, 'clientHeight', {
      configurable: true,
      value: 700,
    })

    await act(async () => {
      // Second tick simulates sidebar width change and should refresh once.
      resizeObserverCallback?.([], {} as ResizeObserver)
      jest.advanceTimersByTime(250)
    })

    expect(mockEmbeddedReport.refresh).not.toHaveBeenCalled()
  })
})