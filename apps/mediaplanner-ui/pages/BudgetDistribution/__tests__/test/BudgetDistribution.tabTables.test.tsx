// Tests for the column render callbacks inside useTabTableCache and getAllTabTables
// in helpers.ts. These render functions are only executed when Ant Design's Table
// renders a data row, so they cannot be covered by the component-level tests that
// mock DebouncedInputNumber/SpendBudgetDistribution.
//
// Strategy: build MediaTab arrays with every platform/tactic enabled, then call the
// render functions directly with representative DigitalRow / MetasearchRow values.

import React from 'react'
import { render } from '@testing-library/react'
import { renderHook } from '@testing-library/react'
import {
  useTabTableCache,
  getAllTabTables,
  buildInitialTabsFromSchema,
  buildTabsFromBdResponse,
  recalculateTabs,
} from '../../helpers'
import type { MediaTab } from '../../BudgetDistribution.d'

// ── Component mocks for @amadeus/react-design-factory ────────────────────────
// Must be a COMPLETE replacement — no requireActual — because the real module
// cannot be loaded in jsdom (emotion's styled-components chain fails).

jest.mock('@amadeus/react-design-factory', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const R = require('react')
  return {
    __esModule: true,
    DropdownMenu: ({ children }: any) => R.createElement('div', { 'data-testid': 'dropdown-menu' }, children),
    IconButton: ({ id }: any) => R.createElement('button', { id, 'data-testid': 'icon-btn' }),
    InputNumber: ({ value, disabled }: any) =>
      R.createElement('input', { 'data-testid': 'input-number', defaultValue: value ?? 0, disabled: disabled ?? false, readOnly: true }),
    Text: {
      Body: ({ children }: any) => R.createElement('span', { 'data-testid': 'text-body' }, children),
    },
    colors: { neutral: { grey5: '#ccc', grey6: '#aaa', white: '#fff' }, primary: { blue: '#00f' }, secondary: {} },
    Form: {
      Item: ({ children }: any) => R.createElement('div', {}, children),
      useForm: () => [{ getFieldValue: () => undefined, setFieldValue: () => {}, validateFields: async () => ({}) }],
    },
    Select: ({ value }: any) => R.createElement('select', {}, value),
    Input: ({ value }: any) => R.createElement('input', { defaultValue: value }),
  }
})

jest.mock('@amadeus/react-design-factory/components/Icon/Icon', () => ({
  __esModule: true,
  default: () => null,
}))

// Minimal DebouncedInputNumber stand-in (no Form.Item — just renders the value)
const MockDebouncedInput = ({ value }: any) => (
  <input data-testid='d-input' defaultValue={value ?? 0} onChange={() => {}} />
)

// ── Shared helpers ────────────────────────────────────────────────────────────

const globalStats: any = {
  spendBudget: 100_000,
  expectedSpend: 90_000,
  contractMarginAmt: 10_000,
  contractMarginPct: 10,
  actualMarginPct: 9,
}

/** Enable every platform and tactic in every digital tab. */
function enableAllDigitalTabs(tabs: MediaTab[]): MediaTab[] {
  return tabs.map(tab => {
    if (tab.type === 'metasearch') return tab
    return {
      ...tab,
      platforms: tab.platforms.map(p => ({
        ...p,
        enabled: true,
        tactics: p.tactics.map(t => ({
          ...t,
          enabled: true,
          values: {
            ...t.values,
            spend: 5000,
            spendPct: 50,
            expectedPct: 55,
            cpm: 2,
            marginPct: 20,
            marginValue: 1000,
            calculationMode: 'CPM',
          },
        })),
      })),
    }
  })
}

/** Enable every metasearch platform. */
function enableMetasearchTab(tabs: MediaTab[]): MediaTab[] {
  return tabs.map(tab => {
    if (tab.type !== 'metasearch') return tab
    return {
      ...tab,
      metasearchSpend: 3000,
      metasearchConnectivityFee: 200,
      metasearchSetupFee: 150,
      metasearchPlatforms: (tab.metasearchPlatforms ?? []).map(p => ({ ...p, enabled: true })),
    }
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// useTabTableCache — digital column render functions
// ─────────────────────────────────────────────────────────────────────────────

describe('useTabTableCache — digital column render callbacks', () => {
  const tabs = enableAllDigitalTabs(buildInitialTabsFromSchema())
  const mockOnChange = jest.fn()
  const mockSetTabs = jest.fn()

  const { result } = renderHook(() =>
    useTabTableCache(tabs, globalStats, true, 'USD', 'EMEA', mockOnChange, mockSetTabs, MockDebouncedInput),
  )

  const { digitalTabTables } = result.current

  // DISPLAY channel has cpm, calculationMode (dual Mode), marginPct, marginValue
  const displayTable = digitalTabTables['display']
  const cpmCol = displayTable?.columns.find((c: any) => c.dataIndex === 'cpm') as any
  const modeCol = displayTable?.columns.find((c: any) => c.dataIndex === 'calculationMode') as any
  const marginPctCol = displayTable?.columns.find((c: any) => c.dataIndex === 'marginPct') as any
  const marginValueCol = displayTable?.columns.find((c: any) => c.dataIndex === 'marginValue') as any
  const spendPctCol = displayTable?.columns.find((c: any) => c.dataIndex === 'spendPct') as any
  const expectedPctCol = displayTable?.columns.find((c: any) => c.dataIndex === 'expectedPct') as any
  const platformCostCol = displayTable?.columns.find((c: any) => c.dataIndex === 'platformCost') as any

  const baseRow: any = {
    key: 'tactic-1',
    tabId: 'display',
    channelId: 'display',
    platformId: 'dv360',
    platform: 'DV360',
    tactic: 'Prospecting',
    spend: 5000,
    spendPct: 50,
    expectedPct: 55,
    cpm: 2,
    marginPct: 20,
    marginValue: 1000,
    calculationMode: 'CPM',
  }

  test('cpm column renders DebouncedInputNumber when calculationMode is CPM', () => {
    expect(cpmCol).toBeDefined()
    const el = cpmCol.render(2, { ...baseRow, calculationMode: 'CPM' }, 0)
    const { container } = render(el as React.ReactElement)
    expect(container.querySelector('[data-testid="d-input"]')).toBeInTheDocument()
  })

  test('cpm column renders text dash when calculationMode is MARGIN', () => {
    expect(cpmCol).toBeDefined()
    const el = cpmCol.render(2, { ...baseRow, calculationMode: 'MARGIN' }, 0)
    const { getByTestId } = render(el as React.ReactElement)
    expect(getByTestId('text-body')).toHaveTextContent('-')
  })

  test('marginPct column renders DebouncedInputNumber when kind=dual and mode=MARGIN', () => {
    expect(marginPctCol).toBeDefined()
    const el = marginPctCol.render(20, { ...baseRow, calculationMode: 'MARGIN' }, 0)
    const { container } = render(el as React.ReactElement)
    expect(container.querySelector('[data-testid="d-input"]')).toBeInTheDocument()
  })

  test('marginPct column renders disabled InputNumber when mode=CPM (calc path)', () => {
    expect(marginPctCol).toBeDefined()
    const el = marginPctCol.render(20, { ...baseRow, calculationMode: 'CPM' }, 0)
    const { container } = render(el as React.ReactElement)
    expect(container.querySelector('[data-testid="input-number"]')).toBeInTheDocument()
  })

  test('marginValue column renders disabled InputNumber', () => {
    expect(marginValueCol).toBeDefined()
    const el = marginValueCol.render(1000, baseRow, 0)
    const { container } = render(el as React.ReactElement)
    expect(container.querySelector('[data-testid="input-number"]')).toBeInTheDocument()
  })

  test('spendPct column renders disabled InputNumber', () => {
    expect(spendPctCol).toBeDefined()
    const el = spendPctCol.render(50, baseRow, 0)
    const { container } = render(el as React.ReactElement)
    expect(container.querySelector('[data-testid="input-number"]')).toBeInTheDocument()
  })

  test('expectedPct column renders disabled InputNumber (showExpectedColumns=true)', () => {
    expect(expectedPctCol).toBeDefined()
    const el = expectedPctCol.render(55, baseRow, 0)
    const { container } = render(el as React.ReactElement)
    expect(container.querySelector('[data-testid="input-number"]')).toBeInTheDocument()
  })

  test('platformCost column renders disabled InputNumber when mode=CPM', () => {
    expect(platformCostCol).toBeDefined()
    const el = platformCostCol.render(undefined, { ...baseRow, calculationMode: 'CPM' }, 0)
    const { container } = render(el as React.ReactElement)
    expect(container.querySelector('[data-testid="input-number"]')).toBeInTheDocument()
  })

  test('platformCost column renders text dash when mode=MARGIN', () => {
    expect(platformCostCol).toBeDefined()
    const el = platformCostCol.render(undefined, { ...baseRow, calculationMode: 'MARGIN' }, 0)
    const { getByTestId } = render(el as React.ReactElement)
    expect(getByTestId('text-body')).toHaveTextContent('-')
  })

  test('Mode (calculationMode) column renders DropdownMenu', () => {
    expect(modeCol).toBeDefined()
    const el = modeCol.render('CPM', baseRow, 0)
    const { getByTestId } = render(el as React.ReactElement)
    expect(getByTestId('dropdown-menu')).toBeInTheDocument()
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// useTabTableCache — metasearch column render functions
// ─────────────────────────────────────────────────────────────────────────────

describe('useTabTableCache — metasearch column render callbacks', () => {
  const tabs = enableMetasearchTab(buildInitialTabsFromSchema())
  const mockSetTabs = jest.fn()

  const { result } = renderHook(() =>
    useTabTableCache(tabs, globalStats, true, 'USD', 'EMEA', jest.fn(), mockSetTabs, MockDebouncedInput),
  )

  const metasearch = result.current.metasearch!
  expect(metasearch).toBeDefined()

  const spendCol = metasearch.columns.find((c: any) => c.dataIndex === 'spend') as any
  const spendPctCol = metasearch.columns.find((c: any) => c.dataIndex === 'spendPct') as any

  const metasearchRow: any = {
    key: 'metasearch-group',
    channel: 'Metasearch',
    platforms: 'Google Hotel, Trivago',
    spend: 3000,
    spendPct: 30,
    expectedPct: 33,
  }

  test('metasearch spend column renders DebouncedInputNumber', () => {
    const el = spendCol.render(3000, metasearchRow, 0)
    const { container } = render(el as React.ReactElement)
    expect(container.querySelector('[data-testid="d-input"]')).toBeInTheDocument()
  })

  test('metasearch spendPct column renders disabled InputNumber', () => {
    const el = spendPctCol.render(30, metasearchRow, 0)
    const { container } = render(el as React.ReactElement)
    expect(container.querySelector('[data-testid="input-number"]')).toBeInTheDocument()
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// getAllTabTables — digital column renders (cpm, marginPct, calculationMode, etc.)
// ─────────────────────────────────────────────────────────────────────────────

describe('getAllTabTables — digital column render callbacks', () => {
  // Build tabs with DISPLAY channel enabled so DISPLAY schema fields are exercised
  const displayAllocations: any = [
    {
      channel: 'DISPLAY',
      tactics: [
        { platform: 'DV360', tactic: 'PROSPECTING', spendAmount: 5000, marginPct: 0 },
        { platform: 'DV360', tactic: 'REMARKETING', spendAmount: 3000, marginPct: 0 },
      ],
    },
    {
      channel: 'SOCIAL',
      tactics: [
        { platform: 'FACEBOOK_IG', tactic: 'PROSPECTING', spendAmount: 2000, marginPct: 50 },
      ],
    },
  ]

  const rawTabs = buildTabsFromBdResponse(displayAllocations, 'USD')
  const tabs = recalculateTabs(rawTabs, 100_000, 0, 10, 'USD', 'EMEA')
  const mockOnChange = jest.fn()
  const mockSetTabs = jest.fn()

  const tables = getAllTabTables(tabs, true, mockOnChange, mockSetTabs, globalStats, 'USD', 'EMEA', MockDebouncedInput)

  // DISPLAY table — has cpm, calculationMode, marginPct, marginValue
  const displayTable = tables['display']
  const cpmCol = displayTable?.columns.find((c: any) => c.dataIndex === 'cpm') as any
  const modeCol = displayTable?.columns.find((c: any) => c.dataIndex === 'calculationMode') as any
  const marginPctCol = displayTable?.columns.find((c: any) => c.dataIndex === 'marginPct') as any
  const marginValueCol = displayTable?.columns.find((c: any) => c.dataIndex === 'marginValue') as any
  const platformCostCol = displayTable?.columns.find((c: any) => c.dataIndex === 'platformCost') as any
  const spendPctCol = displayTable?.columns.find((c: any) => c.dataIndex === 'spendPct') as any
  const expectedPctCol = displayTable?.columns.find((c: any) => c.dataIndex === 'expectedPct') as any

  const displayRow = displayTable?.dataSource?.[0] as any

  test('display table has a row from the enabled tactic', () => {
    expect(displayTable).toBeDefined()
    expect(displayTable.dataSource.length).toBeGreaterThan(0)
  })

  test('cpm column renders DebouncedInputNumber in CPM mode', () => {
    expect(cpmCol).toBeDefined()
    const el = cpmCol.render(2, { ...displayRow, calculationMode: 'CPM' }, 0)
    const { container } = render(el as React.ReactElement)
    expect(container.querySelector('[data-testid="d-input"]')).toBeInTheDocument()
  })

  test('cpm column renders dash in MARGIN mode', () => {
    const el = cpmCol.render(2, { ...displayRow, calculationMode: 'MARGIN' }, 0)
    const { getByTestId } = render(el as React.ReactElement)
    expect(getByTestId('text-body')).toHaveTextContent('-')
  })

  test('marginPct column renders DebouncedInputNumber in MARGIN mode', () => {
    expect(marginPctCol).toBeDefined()
    const el = marginPctCol.render(20, { ...displayRow, calculationMode: 'MARGIN' }, 0)
    const { container } = render(el as React.ReactElement)
    expect(container.querySelector('[data-testid="d-input"]')).toBeInTheDocument()
  })

  test('marginPct column renders disabled InputNumber in CPM mode', () => {
    const el = marginPctCol.render(20, { ...displayRow, calculationMode: 'CPM' }, 0)
    const { container } = render(el as React.ReactElement)
    expect(container.querySelector('[data-testid="input-number"]')).toBeInTheDocument()
  })

  test('marginValue column renders disabled InputNumber', () => {
    expect(marginValueCol).toBeDefined()
    const el = marginValueCol.render(1000, displayRow, 0)
    const { container } = render(el as React.ReactElement)
    expect(container.querySelector('[data-testid="input-number"]')).toBeInTheDocument()
  })

  test('spendPct column renders disabled InputNumber', () => {
    expect(spendPctCol).toBeDefined()
    const el = spendPctCol.render(50, displayRow, 0)
    const { container } = render(el as React.ReactElement)
    expect(container.querySelector('[data-testid="input-number"]')).toBeInTheDocument()
  })

  test('expectedPct column renders disabled InputNumber', () => {
    expect(expectedPctCol).toBeDefined()
    const el = expectedPctCol.render(55, displayRow, 0)
    const { container } = render(el as React.ReactElement)
    expect(container.querySelector('[data-testid="input-number"]')).toBeInTheDocument()
  })

  test('platformCost column renders InputNumber in CPM mode', () => {
    expect(platformCostCol).toBeDefined()
    const el = platformCostCol.render(undefined, { ...displayRow, calculationMode: 'CPM' }, 0)
    const { container } = render(el as React.ReactElement)
    expect(container.querySelector('[data-testid="input-number"]')).toBeInTheDocument()
  })

  test('platformCost column renders dash in MARGIN mode', () => {
    const el = platformCostCol.render(undefined, { ...displayRow, calculationMode: 'MARGIN' }, 0)
    const { getByTestId } = render(el as React.ReactElement)
    expect(getByTestId('text-body')).toHaveTextContent('-')
  })

  test('Mode column renders DropdownMenu with CPM and Margin options', () => {
    expect(modeCol).toBeDefined()
    const el = modeCol.render('CPM', displayRow, 0)
    const { getByTestId } = render(el as React.ReactElement)
    expect(getByTestId('dropdown-menu')).toBeInTheDocument()
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// getAllTabTables — metasearch column renders
// ─────────────────────────────────────────────────────────────────────────────

describe('getAllTabTables — metasearch column render callbacks', () => {
  const metasearchAllocations: any = [
    {
      channel: 'METASEARCH',
      tactics: [
        {
          platforms: ['GOOGLE_ADS', 'TRIVAGO'],
          spendAmount: 4000,
        },
      ],
    },
  ]

  const rawTabs = buildTabsFromBdResponse(metasearchAllocations, 'USD')
  const tabs = recalculateTabs(rawTabs, 100_000, 0, 10, 'USD', 'EMEA')
  const mockSetTabs = jest.fn()

  const tables = getAllTabTables(tabs, true, jest.fn(), mockSetTabs, globalStats, 'USD', 'EMEA', MockDebouncedInput)
  const metaTable = tables['metasearch']

  test('metasearch table is built from enabled platforms', () => {
    expect(metaTable).toBeDefined()
    expect(metaTable.dataSource.length).toBeGreaterThan(0)
  })

  const spendCol = metaTable?.columns.find((c: any) => c.dataIndex === 'spend') as any
  const spendPctCol = metaTable?.columns.find((c: any) => c.dataIndex === 'spendPct') as any
  const expectedPctCol = metaTable?.columns.find((c: any) => c.dataIndex === 'expectedPct') as any

  const metaRow = metaTable?.dataSource?.[0]

  test('metasearch spend column renders DebouncedInputNumber', () => {
    expect(spendCol).toBeDefined()
    const el = spendCol.render(4000, metaRow, 0)
    const { container } = render(el as React.ReactElement)
    expect(container.querySelector('[data-testid="d-input"]')).toBeInTheDocument()
  })

  test('metasearch spendPct column renders disabled InputNumber', () => {
    expect(spendPctCol).toBeDefined()
    const el = spendPctCol.render(40, metaRow, 0)
    const { container } = render(el as React.ReactElement)
    expect(container.querySelector('[data-testid="input-number"]')).toBeInTheDocument()
  })

  test('metasearch expectedPct column renders disabled InputNumber', () => {
    expect(expectedPctCol).toBeDefined()
    const el = expectedPctCol.render(44, metaRow, 0)
    const { container } = render(el as React.ReactElement)
    expect(container.querySelector('[data-testid="input-number"]')).toBeInTheDocument()
  })
})
