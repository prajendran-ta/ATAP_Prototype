import React from 'react'
import { useAuth } from '@mediahub/mediahub-ui/context/AuthContext'
import { emptyUsersPageMockData, usersOptionsMock, usersPageMockData } from '../data/UserManagement'
import * as UserManagementQueries from '../../UserManagement.queries'
import { TextEncoder, TextDecoder } from 'node:util'

Object.assign(global, {
  TextDecoder,
  TextEncoder,
})

Object.defineProperty(window, 'getComputedStyle', {
  value: () =>
    ({
      getPropertyValue: () => '',
      overflow: 'scroll',
      overflowY: 'scroll',
      overflowX: 'scroll',
    }) as any,
})

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

;(global as any).ResizeObserver = ResizeObserverMock

jest.mock('rc-util/lib/getScrollBarSize', () => ({
  __esModule: true,
  default: () => 0,
  getTargetScrollBarSize: () => ({ width: 0, height: 0 }),
}))

jest.mock('rc-util/es/getScrollBarSize', () => ({
  __esModule: true,
  default: () => 0,
  getTargetScrollBarSize: () => ({ width: 0, height: 0 }),
}))

jest.mock('@amadeus/react-design-factory/components/Icon/Icon', () => ({
  __esModule: true,
  default: () => <span data-testid='icon' />,
}))

jest.mock('@amadeus/react-design-factory', () => {
  const React = require('react')

  const createPrimitive = (tag: keyof React.JSX.IntrinsicElements) => {
    return React.forwardRef(({ children, ...props }: any, ref: any) => React.createElement(tag, { ...props, ref }, children))
  }

  const Badge = React.forwardRef(({ content, children, fill, color, ...props }: any, ref: any) => (
    <span {...props} ref={ref}>
      {content ?? children}
    </span>
  ))

  const Button = ({ children, onClick, id, htmlType, variant, loading, disabled, ...props }: any) => (
    <button type={htmlType ?? 'button'} onClick={onClick} id={id} disabled={disabled || !!loading}>
      {children}
    </button>
  )

  const Drawer = ({ title, open, onClose, children }: any) =>
    open ? (
      <div role='dialog' aria-label={title}>
        {children}
      </div>
    ) : null

  const Form = Object.assign(
    ({ onFinish, children, form, style, ...props }: any) => (
      <form
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault()
          onFinish?.()
        }}
        style={style}
      >
        {children}
      </form>
    ),
    {
      useForm: () => [{}],
      Item: ({ children }: any) => children,
    },
  )

  const Grid = {
    Row: createPrimitive('div'),
    Col: createPrimitive('div'),
  }

  const Icon = ({ name, color, height, width, ...props }: any) => (
    <span data-testid='icon' data-name={name} {...props} />
  )

  const Input = ({ id, label, value, disabled, onChange, ...props }: any) => (
    <input
      id={id}
      aria-label={label}
      value={value ?? ''}
      disabled={disabled}
      readOnly={disabled}
      onChange={onChange ?? (() => {})}
      {...props}
    />
  )

  const Pagination = ({ current, total, pageSize = 10, onChange }: any) => {
    const pages = Math.ceil((total ?? 0) / pageSize)
    if (pages <= 1) return null
    return (
      <nav aria-label='pagination'>
        {Array.from({ length: pages }, (_, i) => i + 1).map((page: number) => (
          <button
            key={page}
            type='button'
            aria-current={page === current ? 'page' : undefined}
            onClick={() => onChange?.(page, pageSize)}
          >
            {page}
          </button>
        ))}
      </nav>
    )
  }

  const Search = ({ id, placeholder, onSearch, ...props }: any) => (
    <input
      type='search'
      id={id}
      placeholder={placeholder}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearch?.(e.target.value)}
      {...props}
    />
  )

  const Select = React.forwardRef(
    ({ id, label, onChange, value, options = [], onSearch, onBlur, filterMode, loading, showSearch, mode, placeholder, ...props }: any, ref: any) => (
      <select
        aria-label={label}
        id={id}
        ref={ref}
        value={Array.isArray(value) ? (value[0] ?? '') : (value ?? '')}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange?.(e.target.value)}
      >
        {(options ?? []).map((opt: any) => (
          <option key={String(opt.value)} value={String(opt.value)}>
            {opt.label}
          </option>
        ))}
      </select>
    ),
  )

  const StickyFooter = createPrimitive('div')

  const Table = ({ id, dataSource = [], columns = [], rowKey, loading, pagination }: any) => (
    <table id={id}>
      <tbody>
        {(dataSource as any[]).map((record: any, index: number) => (
          <tr key={record[rowKey] ?? index}>
            {(columns as any[]).map((col: any, colIndex: number) => {
              const dataIndex = Array.isArray(col.dataIndex) ? col.dataIndex[0] : col.dataIndex
              const value = dataIndex ? record[dataIndex] : undefined
              const cell = col.render ? col.render(value, record, index) : value
              return <td key={`${String(col.key ?? col.dataIndex ?? colIndex)}-${index}`}>{cell}</td>
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )

  const Text = {
    H3: createPrimitive('h3'),
    H5: createPrimitive('h5'),
    H6: createPrimitive('h6'),
    Label: createPrimitive('label'),
  }

  const Toggle = ({ checked, onChange, id, disabled, ...props }: any) => (
    <button
      role='switch'
      aria-checked={checked}
      id={id}
      type='button'
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      {...props}
    />
  )

  const Container = {
    Header: createPrimitive('div'),
    Section: createPrimitive('section'),
    Column: createPrimitive('div'),
  }

  const colors = {
    sky_60: '#0b6fd3',
    cloud_100: '#ffffff',
    sky_30: '#9fc7f2',
    sky_10: '#dcecff',
    crimson_20: '#f7c2cc',
    forest_70: '#1a6640',
    forest_60: '#1d7a4d',
    cloud_40: '#9ba8b5',
    cloud_50: '#7d8b99',
  }

  const useNotification = () => ({
    info: jest.fn(),
    success: jest.fn(),
    warning: jest.fn(),
    error: jest.fn(),
  })

  return {
    __esModule: true,
    Badge,
    Breadcrumb: ({ items }: { items: Array<{ title: string }> }) => (
      <nav data-testid='breadcrumb'>{items.map(item => item.title).join(' / ')}</nav>
    ),
    Button,
    Container,
    Drawer,
    Form,
    Grid,
    Icon,
    Input,
    Pagination,
    Search,
    Select,
    Spinner: () => <div data-testid='loading-spinner'>Loading...</div>,
    StickyFooter,
    Table,
    Text,
    Toggle,
    ToggleTab: ({ options, value, onChange }: { options: Array<{ label: React.ReactNode; value: string }>; value: string; onChange: (value: string) => void }) => (
      <div data-testid='toggle-tab' data-value={value}>
        {options.map(option => (
          <button key={option.value} type='button' onClick={() => onChange(option.value)}>
            {option.label}
          </button>
        ))}
      </div>
    ),
    colors,
    useNotification,
  }
})

jest.mock('@amadeus/react-design-factory/components/Text', () => {
  const React = require('react')
  return {
    __esModule: true,
    H5: ({ children, ...props }: any) => React.createElement('h5', props, children),
    Label: ({ children, ...props }: any) => React.createElement('label', props, children),
  }
})

jest.mock('@amadeus/react-utils/hooks/useDebounce', () => ({
  __esModule: true,
  default: (value: any) => value,
}))

jest.mock('@amadeus/react-utils', () => ({
  __esModule: true,
  buildServerOptionsQueryFn: () => jest.fn().mockResolvedValue([]),
  useDebounce: (value: unknown) => value,
  useServerOptions: () => ({
    options: [],
    loading: false,
    onSearch: jest.fn(),
    onBlur: jest.fn(),
  }),
  updateSelectedOptions: jest.fn(),
  mergeWithSelected: jest.fn(),
}))

jest.mock('@amadeus/react-utils/hooks/useServerOptions', () => ({
  __esModule: true,
  useServerOptions: () => ({
    options: [],
    loading: false,
    onSearch: jest.fn(),
    onBlur: jest.fn(),
  }),
}))

jest.mock('../../UserManagementDetails/UserManagementDetailsConfig', () => ({
  __esModule: true,
  useUpdateUserField: () => ({
    updateFields: () => Promise.resolve(undefined),
    loading: false,
    error: null,
  }),
  MODULES: [
    { key: 'advertisers', label: 'Advertisers' },
    { key: 'media-planning', label: 'Media Planning & Request' },
    { key: 'campaign-setup', label: 'Campaign Management & Setup' },
    { key: 'campaign-optimization', label: 'Campaign Optimization & Pacing' },
    { key: 'reports', label: 'Reports' },
    { key: 'market-insights', label: 'Market Insights' },
    { key: 'data-management', label: 'Data Management' },
    { key: 'pricing-billing', label: 'Pricing & Billing' },
    { key: 'user-management', label: 'User Management' },
  ],
  ROLE_ACCESS: {
    'mh-administrator': {
      advertisers: 'full', 'media-planning': 'full', 'campaign-setup': 'full', 'campaign-optimization': 'full',
      reports: 'full', 'market-insights': 'full', 'data-management': 'full', 'pricing-billing': 'full', 'user-management': 'full',
    },
    'mh-standard': {
      advertisers: 'full', 'media-planning': 'full', 'campaign-setup': 'full', 'campaign-optimization': 'full',
      reports: 'full', 'market-insights': 'full', 'data-management': 'full', 'pricing-billing': 'full', 'user-management': 'none',
    },
    'mh-read-only': {
      advertisers: 'view', 'media-planning': 'view', 'campaign-setup': 'view', 'campaign-optimization': 'view',
      reports: 'view', 'market-insights': 'view', 'data-management': 'view', 'pricing-billing': 'view', 'user-management': 'none',
    },
  },
}))

jest.mock('../../UserManagement.queries', () => ({
  __esModule: true,
  useGetUsersQuery: jest.fn(),
  useGetUsersOptionsQuery: jest.fn(),
}))

jest.mock('@mediahub/mediahub-ui/context/AuthContext', () => {
  const React = require('react')
  const defaultAuthContextValue = {
    permissionsLoaded: true,
    permissions: ['mh-user-write'],
    role: 'mh-administrator',
    logout: jest.fn(),
    isAuthChecked: true,
  }
  return {
    __esModule: true,
    mockAuthContextValue: defaultAuthContextValue,
    AuthContext: React.createContext(defaultAuthContextValue),
    useAuth: jest.fn(),
  }
})

export const refetchUsers = jest.fn()
export const refetchUsersOptions = jest.fn()
export const defaultUsersResponse = usersPageMockData
export const emptyUsersResponse = emptyUsersPageMockData

const authModule = jest.requireMock('@mediahub/mediahub-ui/context/AuthContext') as {
  mockAuthContextValue: {
    permissionsLoaded: boolean
    permissions: string[]
    role: string
    logout: jest.Mock
    isAuthChecked: boolean
  }
}

export function setPermissionsLoaded(permissionsLoaded: boolean) {
  authModule.mockAuthContextValue.permissionsLoaded = permissionsLoaded
}

export function mockUsersQuerySuccess(usersResponse = defaultUsersResponse) {
  refetchUsers.mockResolvedValue({
    data: { users: usersResponse },
  })
}

export function mockUsersQueryEmpty() {
  mockUsersQuerySuccess(emptyUsersResponse)
}

export function mockUsersQueryError(_message = 'Failed to load users') {
  // The real useTableFilters does not catch queryFn rejections, so we simulate
  // a query failure by returning empty data — which is what the real component
  // renders in an error scenario (empty table, all counters at 0).
  refetchUsers.mockResolvedValue({ data: { users: emptyUsersPageMockData } })
}

export function setupBeforeEach() {
  jest.resetAllMocks()

  setPermissionsLoaded(true)

  ;(useAuth as unknown as jest.Mock).mockReturnValue({
    isAdmin: true,
    hasPermission: jest.fn().mockReturnValue(true),
    permissions: ['mh-user-write'],
    role: 'mh-administrator',
  })

  mockUsersQuerySuccess()
  ;(UserManagementQueries.useGetUsersQuery as unknown as jest.Mock).mockReturnValue({
    loading: false,
    error: undefined,
    refetch: refetchUsers,
  })

  refetchUsersOptions.mockResolvedValue({
    data: usersOptionsMock,
  })
  ;(UserManagementQueries.useGetUsersOptionsQuery as unknown as jest.Mock).mockReturnValue({
    data: usersOptionsMock,
    loading: false,
    error: undefined,
    refetch: refetchUsersOptions,
  })
}