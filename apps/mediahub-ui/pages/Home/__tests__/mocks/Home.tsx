import React from 'react'
import { useAuth } from '@mediahub/mediahub-ui/context/AuthContext'
import { logout } from '@mediahub/mediahub-ui/api'
import { useNotificationGroups } from '@mediahub/mediahub-ui/components/Notifications/Notifications.queries'
import { adminAuthData, standardUserAuthData } from '../data/Home'
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

jest.mock('@mediahub/mediahub-ui/assets/amadeus-wordmark.svg', () => ({
  __esModule: true,
  default: () => null,
}))

// Ant Design icon mocks
jest.mock('@ant-design/icons/DoubleRightOutlined', () => ({
  __esModule: true,
  default: () => null,
}))

jest.mock('@ant-design/icons/DoubleLeftOutlined', () => ({
  __esModule: true,
  default: () => null,
}))

// Navbar and SidebarMenu — exposed with test IDs so assertions can target them
jest.mock('@amadeus/react-design-factory/components/Navbar/Navbar', () => ({
  __esModule: true,
  default: ({ LogoIcon, NavbarComponent }: any) => (
    <header data-testid='navbar'>
      {LogoIcon && <LogoIcon />}
      {NavbarComponent}
    </header>
  ),
}))

jest.mock('@amadeus/react-design-factory/components/SidebarMenu/SidebarMenu', () => ({
  __esModule: true,
  default: ({ items, collapsed }: any) => {
    const { useNavigate } = require('react-router')
    const navigate = useNavigate()

    const renderItems = (nodes: any[]): any =>
      (nodes ?? []).map((item: any) => (
        <div
          key={item.key}
          data-testid={`menu-item-${item.key}`}
          data-href={item.href ?? null}
          onClick={() => {
            if (!item.href) return
            const isExternal = item.href.startsWith('http://') || item.href.startsWith('https://')
            if (isExternal) {
              window.open(item.href, '_blank')
            } else {
              navigate(item.href)
            }
          }}
        >
          {item.label}
          {item.children && renderItems(item.children)}
        </div>
      ))

    return (
      <nav data-testid='sidebar-menu' data-collapsed={String(Boolean(collapsed))}>
        {renderItems(items)}
      </nav>
    )
  },
}))

jest.mock('@amadeus/react-design-factory/components/Icon/Icon', () => ({
  __esModule: true,
  default: () => <span data-testid='icon' />,
}))

// Break circular dependency: Search.styled imports Input from the package itself
jest.mock('@amadeus/react-design-factory/components/Search/Search.styled', () => ({
  __esModule: true,
  SearchWrapper: 'div',
  SearchInput: 'input',
}))

jest.mock('@amadeus/react-design-factory', () => {
  const React = require('react')
  const actual = jest.requireActual('@amadeus/react-design-factory')

  const createPrimitive = (tag: keyof React.JSX.IntrinsicElements) =>
    React.forwardRef(({ children, ...props }: any, ref: any) => React.createElement(tag, { ...props, ref }, children))

  const Button = ({ children, onClick, id, htmlType, disabled, ...props }: any) => (
    <button type={htmlType ?? 'button'} onClick={onClick} id={id} disabled={disabled}>
      {children}
    </button>
  )

  const Icon = ({ name, ...props }: any) => <span data-testid='icon' data-name={name} {...props} />

  const IconButton = ({ iconName, ...props }: any) => (
    <button data-testid='icon-button' data-icon={iconName} {...props} />
  )

  const Link = ({ children, href, onClick, id, ...props }: any) => (
    <a href={href} onClick={onClick} id={id} {...props}>
      {children}
    </a>
  )

  const Modal = ({ open, children, title, footer, onCancel, ...props }: any) =>
    open ? (
      <div role='dialog' data-testid='modal'>
        {title}
        {children}
        {footer}
      </div>
    ) : null

  const Footer = ({ children, FooterIcon: _fi, footerCopy: _fc, versionLabel: _vl, ...props }: any) => (
    <footer {...props}>{children}</footer>
  )

  const Grid = {
    Row: createPrimitive('div'),
    Col: createPrimitive('div'),
  }

  const colors = {
    sky_90: '#003c8b',
    sky_80: '#0050b3',
    sky_60: '#0b6fd3',
    cloud_100: '#ffffff',
    sky_30: '#9fc7f2',
    cloud_50: '#7d8b99',
  }

  const zIndex = { sidebar: 100 }

  const ConfigProvider = ({ children }: any) => children
  const App = ({ children }: any) => children

  const useNotification = () => ({
    info: jest.fn(),
    success: jest.fn(),
    warning: jest.fn(),
    error: jest.fn(),
  })

  return {
    ...actual,
    __esModule: true,
    App,
    Button,
    ConfigProvider,
    Footer,
    Grid,
    Icon,
    IconButton,
    Link,
    Modal,
    colors,
    zIndex,
    useNotification,
  }
})

// Internal component mocks
jest.mock('@amadeus/react-design-factory/components/Drawer/Drawer', () => ({
  __esModule: true,
  default: ({ open, title, children, onClose }: any) =>
    open ? (
      <div data-testid='notifications-drawer'>
        <div data-testid='notifications-drawer-title'>{title}</div>
        <button data-testid='notifications-drawer-close' onClick={onClose} />
        {children}
      </div>
    ) : null,
}))

jest.mock('@mediahub/mediahub-ui/components/Notifications/Notifications.queries', () => ({
  __esModule: true,
  useNotificationGroups: jest.fn(),
}))

jest.mock('@mediahub/mediahub-ui/components/NotificationsOverlay', () => ({
  __esModule: true,
  NotificationsOverlay: () => {
    const React = require('react')
    const { useState } = React
    const { useNotificationGroups } = require('@mediahub/mediahub-ui/components/Notifications/Notifications.queries')
    const { Notifications } = require('@mediahub/mediahub-ui/components/Notifications')
    const Drawer = require('@amadeus/react-design-factory/components/Drawer/Drawer').default

    const { totalNotifications } = useNotificationGroups()
    const [isOpen, setIsOpen] = useState(false)

    return (
      <>
        <button
          data-testid='notifications-overlay-bell'
          data-count={totalNotifications}
          onClick={() => setIsOpen(true)}
        />
        <Drawer
          title={
            <div data-testid='notifications-drawer-header'>
              <span>Notifications</span>
              <a href='/notifications'>View All</a>
            </div>
          }
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <Notifications />
        </Drawer>
      </>
    )
  },
}))

jest.mock('@mediahub/mediahub-ui/components/CopilotWidget', () => ({
  __esModule: true,
  CopilotWidget: () => <div data-testid='copilot-widget' />,
}))

jest.mock('@mediahub/mediahub-ui/components/UserOptions', () => ({
  __esModule: true,
  UserOptions: ({ options }: any) => (
    <div data-testid='user-options'>
      {(options ?? []).map((opt: any) => (
        <button key={opt.key} data-testid={`user-option-${opt.key}`}>
          {opt.label}
        </button>
      ))}
    </div>
  ),
}))

jest.mock('@mediahub/mediahub-ui/components/UserOptions/options', () =>
  jest.requireActual('@mediahub/mediahub-ui/components/UserOptions/options'),
)

jest.mock('@mediahub/mediahub-ui/components/Notifications', () => ({
  __esModule: true,
  Notifications: ({ contractExtraContent }: any) => (
    <div data-testid='notifications-list'>
      <section aria-label='Contracts'>{contractExtraContent}</section>
    </div>
  ),
}))

jest.mock('@mediahub/mediahub-ui/pages/Home/WelcomeModal', () => ({
  __esModule: true,
  default: () => null,
}))

jest.mock('@mediahub/mediahub-ui/pages/Home/HomeModules', () => ({
  __esModule: true,
  default: () => {
    const React = require('react')
    const { useNavigate } = require('react-router')
    const { externalLinks } = require('@mediahub/mediahub-ui/api')
    const { useAuth } = require('@mediahub/mediahub-ui/context/AuthContext')
    const navigate = useNavigate()
    const { isAdmin } = useAuth()

    const handleNavigation = (href: string) => {
      const isExternal = href.startsWith('http://') || href.startsWith('https://')
      isExternal ? window.open(href, '_blank') : navigate(href)
    }

    return (
      <div data-testid='home-modules'>
        <button
          data-testid='module-link-my-advertisers'
          onClick={() => handleNavigation(`${externalLinks.advertisers}?isFollowingOnly=true`)}
        >
          My Advertisers
        </button>
        <button data-testid='module-link-cmt' onClick={() => handleNavigation(externalLinks.campaignManagement.cmt)}>
          CMT
        </button>
        <button
          data-testid='module-link-insite'
          onClick={() => handleNavigation(externalLinks.campaignManagement.insite)}
        >
          Insite
        </button>
        <button
          data-testid='module-link-pacing-tool'
          onClick={() => handleNavigation(externalLinks.campaignOptimization.pacingTool)}
        >
          Pacing Tool
        </button>
        <button data-testid='module-link-oba' onClick={() => handleNavigation(externalLinks.campaignOptimization.oba)}>
          OBA
        </button>
        {isAdmin && (
          <button data-testid='module-link-users' onClick={() => handleNavigation(externalLinks.userManagement)}>
            Users
          </button>
        )}
      </div>
    )
  },
}))

jest.mock('@mediahub/mediahub-ui/api', () => ({
  __esModule: true,
  logout: jest.fn(),
  externalLinks: {
    advertisers: '/advertisers',
    mediaPlanning: {
      singleProperty: '/planning/single',
      multiProperty: '/planning/multi',
      international: '/planning/intl',
    },
    campaignManagement: {
      cmt: 'https://cmt.travelaudience.com',
      insite: '/insite',
      adCopies: { americas: '/ad/americas', emea: '/ad/emea', apac: '/ad/apac' },
    },
    campaignOptimization: { pacingTool: '/pacing', oba: '/oba/' },
    reports: { dmic: '/dmic', roas: '/roas' },
    marketInsights: { tiPortal: '/ti', ami: '/ami', googleTravelAnalytics: '/gta' },
    dataManagement: { segmentation: '/seg', datapartners: '/dp' },
    userManagement: '/user-management',
  },
  currentEnv: 'production',
}))

jest.mock('@mediahub/mediahub-ui/context/AuthContext', () => {
  const React = require('react')
  const defaultAuthContextValue = {
    permissionsLoaded: true,
    permissions: ['mh-user-write'],
    role: 'mh-administrator',
    logout: jest.fn(),
    isAuthChecked: true,
    user: undefined,
  }
  return {
    __esModule: true,
    mockAuthContextValue: defaultAuthContextValue,
    AuthContext: React.createContext(defaultAuthContextValue),
    useAuth: jest.fn(),
  }
})

export function setupBeforeEach() {
  jest.resetAllMocks()
  ;(useAuth as unknown as jest.Mock).mockReturnValue(adminAuthData)
  ;(logout as unknown as jest.Mock).mockResolvedValue(undefined)
  ;(useNotificationGroups as unknown as jest.Mock).mockReturnValue({
    totalNotifications: 0,
    groups: [],
    loading: false,
    error: undefined,
    refetch: jest.fn(),
  })
}

export function setIsAdmin(isAdmin: boolean) {
  ;(useAuth as unknown as jest.Mock).mockReturnValue(isAdmin ? adminAuthData : standardUserAuthData)
}

export function setNotifications(totalNotifications: number) {
  ;(useNotificationGroups as unknown as jest.Mock).mockReturnValue({
    totalNotifications,
    groups: [],
    loading: false,
    error: undefined,
    refetch: jest.fn(),
  })
}

export function setNotificationsError() {
  ;(useNotificationGroups as unknown as jest.Mock).mockReturnValue({
    totalNotifications: 0,
    groups: [],
    loading: false,
    error: new Error('Failed to load notifications'),
    refetch: jest.fn(),
  })
}
