import { setupBeforeEach, setIsAdmin, setNotifications, setNotificationsError } from '../mocks/Home'
import '@testing-library/jest-dom'
import { act, render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { MainLayout } from '@mediahub/mediahub-ui/components/Layout'
import Home from '../../Home'
import { logout } from '@mediahub/mediahub-ui/api'
import {
  getCampaignFlowState,
  openCampaignWorkspace,
  resetCampaignFlow,
} from '@mediahub/mediahub-ui/components/CampaignFlow/campaignFlowStore'

const renderHomePage = (initialPath = '/') =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route
          path='/'
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
      </Routes>
    </MemoryRouter>,
  )

// NotificationsOverlay no longer used: bell is now unified across home and non-home routes
const renderNonHomePage = () =>
  render(
    <MemoryRouter initialEntries={['/notifications']}>
      <Routes>
        <Route
          path='/notifications'
          element={
            <MainLayout>
              <div data-testid='inner-page' />
            </MainLayout>
          }
        />
      </Routes>
    </MemoryRouter>,
  )

const renderWithNavigation = () =>
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route
          path='/'
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route path='/notifications' element={<div data-testid='notifications-page' />} />
        <Route path='/user-management' element={<div data-testid='user-management-page' />} />
      </Routes>
    </MemoryRouter>,
  )

const renderHomeWithModuleRoutes = () =>
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route
          path='/'
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route path='/advertisers' element={<div data-testid='advertisers-page' />} />
        <Route path='/oba/' element={<div data-testid='oba-page' />} />
      </Routes>
    </MemoryRouter>,
  )

beforeEach(() => {
  setupBeforeEach()
})

describe('Home - Navbar', () => {
  test('renders the navbar', () => {
    renderHomePage()

    expect(screen.getByTestId('navbar')).toBeInTheDocument()
  })

  test('renders "Amadeus" "Travel Advertising Platform" title in the navbar', () => {
    renderHomePage()
    expect(screen.getByText('Amadeus')).toBeInTheDocument()
    expect(screen.getByText('Travel Advertising Platform')).toBeInTheDocument()
  })

  test('renders the notifications bell button', () => {
    renderHomePage()

    const bellButton = screen.getAllByTestId('icon-button').find(el => el.getAttribute('data-icon') === 'bell')
    expect(bellButton).toBeInTheDocument()
  })

  test('renders the AI assistant button', () => {
    renderHomePage()

    const aiButton = screen.getAllByTestId('icon-button').find(el => el.getAttribute('title') === 'Open AskMia')
    expect(aiButton).toBeInTheDocument()
  })

  test('shows the default greeting when Max is opened directly', () => {
    window.sessionStorage.clear()
    act(() => resetCampaignFlow())
    const view = renderHomePage('/?panel=amadeus-max')

    try {
      expect(screen.getByText('How can I help you?')).toBeInTheDocument()
    } finally {
      act(() => resetCampaignFlow())
      view.unmount()
      window.sessionStorage.clear()
    }
  })

  test('renders the logout button with "Sign Out" label', () => {
    renderHomePage()

    expect(screen.getByTestId('user-options')).toBeInTheDocument()
    expect(screen.getByTestId('user-option-signout')).toBeInTheDocument()
    expect(screen.getByText('Sign Out')).toBeInTheDocument()
  })
})

describe('Home - Media Planner closed-won notification', () => {
  test('shows the notification under Contracts with link actions and kebab actions', () => {
    renderHomePage()

    const notification = screen.getByTestId('media-planner-closed-won-notification')
    expect(screen.getByLabelText('Contracts')).toContainElement(notification)
    expect(notification).toHaveTextContent(
      "BID-1234 - Amadeus Hotels - Media plan 'Amadeus Hotels All year 2027 Rooms' is closed-won.",
    )
    expect(screen.getByText('Media Planner')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'View' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Proceed with Max' })).toBeInTheDocument()
    expect(notification).toHaveTextContent('2 hours ago')
    fireEvent.click(screen.getByRole('button', { name: 'More notification actions' }))
    expect(screen.getByText('Snooze')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Mark as read'))
    expect(screen.queryByTestId('media-planner-closed-won-unread-dot')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Proceed with Max' }))
    expect(getCampaignFlowState().blocks).toHaveLength(0)
    expect(screen.queryByText(/Would you like me to create a campaign for this plan/)).not.toBeInTheDocument()
    expect(screen.getByText('I can help you with...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'View media plan Amadeus Hotels All year 2027 Rooms' })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Create campaign for plan Amadeus Hotels All year 2027 Rooms' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'View existing campaign structure for Amadeus Hotels' }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Show Market analysis from Travel Intelligence for Advertiser Name' }),
    ).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'View media plan Amadeus Hotels All year 2027 Rooms' }))
    expect(getCampaignFlowState().blocks.map(block => block.kind)).toEqual(['media-plan'])
    expect(screen.getByText('Fetching the Plan info')).toBeInTheDocument()
    expect(screen.queryByTestId('media-plan-canvas')).not.toBeInTheDocument()
  })

  test('starts campaign creation from the named-plan prompt', () => {
    window.sessionStorage.clear()
    act(() => resetCampaignFlow())
    const view = renderHomePage()

    try {
      fireEvent.click(screen.getByRole('button', { name: 'Proceed with Max' }))
      fireEvent.click(
        screen.getByRole('button', { name: 'Create campaign for plan Amadeus Hotels All year 2027 Rooms' }),
      )
      expect(getCampaignFlowState().blocks.map(block => block.kind)).toEqual(['create-campaign'])
    } finally {
      act(() => resetCampaignFlow())
      view.unmount()
      window.sessionStorage.clear()
    }
  })
})

describe('Home - full-screen campaign workspace', () => {
  test('opens the campaign canvas without a duplicate full-screen MAX overlay', () => {
    act(() => resetCampaignFlow())
    const view = renderHomePage('/?panel=amadeus-max&layout=full-screen')

    try {
      expect(screen.getAllByText('Amadeus Max')).toHaveLength(1)
      act(() => openCampaignWorkspace())
      expect(screen.getByTestId('campaign-creation-canvas')).toBeInTheDocument()
    } finally {
      act(() => resetCampaignFlow())
      view.unmount()
    }
  })
})

describe('Home - campaign workspace sidebar', () => {
  test('keeps the left navigation collapsed by default and while the campaign canvas is open', () => {
    act(() => resetCampaignFlow())
    const view = renderHomePage()

    try {
      // The left nav is collapsed by default on Home.
      expect(screen.getByTestId('sidebar-menu')).toHaveAttribute('data-collapsed', 'true')
      act(() => openCampaignWorkspace())
      expect(screen.getByTestId('sidebar-menu')).toHaveAttribute('data-collapsed', 'true')
      expect(screen.getByTestId('campaign-creation-canvas')).toBeInTheDocument()

      act(() => resetCampaignFlow())
      expect(screen.getByTestId('sidebar-menu')).toHaveAttribute('data-collapsed', 'true')
    } finally {
      act(() => resetCampaignFlow())
      view.unmount()
    }
  })
})

describe('Home - Sidebar', () => {
  test('renders the sidebar menu', () => {
    renderHomePage()

    expect(screen.getByTestId('sidebar-menu')).toBeInTheDocument()
  })

  test('renders all core navigation menu items', () => {
    renderHomePage()

    expect(screen.getByTestId('menu-item-home')).toBeInTheDocument()
    expect(screen.getByTestId('menu-item-advertisers')).toBeInTheDocument()
    expect(screen.getByTestId('menu-item-media-planning')).toBeInTheDocument()
    expect(screen.getByTestId('menu-item-campaign-management')).toBeInTheDocument()
    expect(screen.getByTestId('menu-item-campaign-optimization')).toBeInTheDocument()
    expect(screen.getByTestId('menu-item-reports')).toBeInTheDocument()
    expect(screen.getByTestId('menu-item-market-insights')).toBeInTheDocument()
    expect(screen.getByTestId('menu-item-data-management')).toBeInTheDocument()
    expect(screen.getByTestId('menu-item-pricing-billing')).toBeInTheDocument()
    expect(screen.getByTestId('menu-item-notifications')).toBeInTheDocument()
  })

  test('renders the "User Management" menu item for admin users', () => {
    renderHomePage()

    expect(screen.getByTestId('menu-item-user-management')).toBeInTheDocument()
    expect(screen.getByText('User Management')).toBeInTheDocument()
  })

  test('does not render "User Management" menu item for non-admin users', () => {
    setIsAdmin(false)

    renderHomePage()

    expect(screen.queryByTestId('menu-item-user-management')).not.toBeInTheDocument()
    expect(screen.queryByText('User Management')).not.toBeInTheDocument()
  })
})

describe('Home - Sidebar Navigation', () => {
  test('clicking "Notifications" navigates to /notifications', () => {
    renderWithNavigation()

    fireEvent.click(screen.getByTestId('menu-item-notifications'))

    expect(screen.getByTestId('notifications-page')).toBeInTheDocument()
  })

  test('clicking "User Management" navigates to /user-management', () => {
    renderWithNavigation()

    fireEvent.click(screen.getByTestId('menu-item-user-management'))

    expect(screen.getByTestId('user-management-page')).toBeInTheDocument()
  })

  test('clicking "Campaign Management Tool" opens the external URL in a new tab', () => {
    const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null)

    renderHomePage()
    fireEvent.click(screen.getByTestId('menu-item-cmt'))

    expect(openSpy).toHaveBeenCalledWith('https://cmt.travelaudience.com', '_blank')

    openSpy.mockRestore()
  })
})

describe('Home - Logout', () => {
  let consoleErrorSpy: jest.SpyInstance

  beforeEach(() => {
    // suppress jsdom's "not implemented: navigation" noise from window.location.href assignment
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleErrorSpy.mockRestore()
    // clear any cookies written during the test
    document.cookie.split(';').forEach(cookie => {
      const name = cookie.split('=')[0].trim()
      if (name) document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`
    })
  })

  test('calls the logout API when Sign Out is clicked', async () => {
    renderHomePage()

    fireEvent.click(screen.getByText('Sign Out'))

    await waitFor(() => {
      expect(logout).toHaveBeenCalledTimes(1)
    })
  })

  test('clears all session cookies on logout', async () => {
    document.cookie = 'auth_token=abc123'
    document.cookie = 'session_id=xyz789'

    renderHomePage()

    fireEvent.click(screen.getByText('Sign Out'))

    await waitFor(() => {
      expect(document.cookie).not.toContain('auth_token=abc123')
      expect(document.cookie).not.toContain('session_id=xyz789')
    })
  })
})

describe('Home - Notifications Panel', () => {
  const getBellButton = () => screen.getAllByTestId('icon-button').find(el => el.getAttribute('data-icon') === 'bell')

  test('bell button is visible in the navbar', () => {
    renderNonHomePage()

    expect(getBellButton()).toBeInTheDocument()
  })

  test('notifications panel is closed by default', () => {
    renderNonHomePage()

    expect(screen.queryByTestId('notifications-list')).not.toBeInTheDocument()
  })

  test('clicking the bell opens the notifications panel', () => {
    renderNonHomePage()

    fireEvent.click(getBellButton()!)

    expect(screen.getByTestId('notifications-list')).toBeInTheDocument()
  })

  test('notifications panel shows the notifications list when open', () => {
    renderNonHomePage()

    fireEvent.click(getBellButton()!)

    expect(screen.getByTestId('notifications-list')).toBeInTheDocument()
  })

  test('clicking the close button dismisses the notifications panel', () => {
    renderNonHomePage()

    fireEvent.click(getBellButton()!)
    expect(screen.getByTestId('notifications-list')).toBeInTheDocument()

    const closeButton = screen.getAllByTestId('icon-button').find(el => el.getAttribute('data-icon') === 'xmark')
    fireEvent.click(closeButton!)
    expect(screen.queryByTestId('notifications-list')).not.toBeInTheDocument()
  })

  test('bell still renders when the notifications query returns an error', () => {
    setNotificationsError()

    renderNonHomePage()

    expect(getBellButton()).toBeInTheDocument()
  })
})

describe('Home - View All Notifications Link', () => {
  test('"View All" in the notifications section links to /notifications', () => {
    renderHomePage()

    const link = screen.getByRole('link', { name: 'View All' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/notifications')
  })

  test('"View All" in the notifications panel links to /notifications', () => {
    renderNonHomePage()

    const bellButton = screen.getAllByTestId('icon-button').find(el => el.getAttribute('data-icon') === 'bell')
    fireEvent.click(bellButton!)

    expect(screen.getByText('View All')).toBeInTheDocument()
  })
})

describe('Home - Quick Module Links', () => {
  test('renders the home modules section', () => {
    renderHomePage()

    expect(screen.getByTestId('home-modules')).toBeInTheDocument()
  })

  test('"My Advertisers" navigates to the advertisers page', () => {
    renderHomeWithModuleRoutes()

    fireEvent.click(screen.getByTestId('module-link-my-advertisers'))

    expect(screen.getByTestId('advertisers-page')).toBeInTheDocument()
  })

  test('"CMT" opens the external URL in a new tab', () => {
    const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null)

    renderHomePage()
    fireEvent.click(screen.getByTestId('module-link-cmt'))

    expect(openSpy).toHaveBeenCalledWith('https://cmt.travelaudience.com', '_blank')
    openSpy.mockRestore()
  })

  test('"Insite" navigates to /insite', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path='/'
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route path='/insite' element={<div data-testid='insite-page' />} />
        </Routes>
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByTestId('module-link-insite'))

    expect(screen.getByTestId('insite-page')).toBeInTheDocument()
  })

  test('"Pacing Tool" navigates to /pacing', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path='/'
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route path='/pacing' element={<div data-testid='pacing-page' />} />
        </Routes>
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByTestId('module-link-pacing-tool'))

    expect(screen.getByTestId('pacing-page')).toBeInTheDocument()
  })

  test('"OBA" navigates to /oba/', () => {
    renderHomeWithModuleRoutes()

    fireEvent.click(screen.getByTestId('module-link-oba'))

    expect(screen.getByTestId('oba-page')).toBeInTheDocument()
  })

  test('"User Management" module link is visible for admin users', () => {
    renderHomePage()

    expect(screen.getByTestId('module-link-users')).toBeInTheDocument()
  })

  test('"User Management" module link is hidden for non-admin users', () => {
    setIsAdmin(false)

    renderHomePage()

    expect(screen.queryByTestId('module-link-users')).not.toBeInTheDocument()
  })

  test('"Users" navigates to /user-management', () => {
    renderWithNavigation()

    fireEvent.click(screen.getByTestId('module-link-users'))

    expect(screen.getByTestId('user-management-page')).toBeInTheDocument()
  })
})
