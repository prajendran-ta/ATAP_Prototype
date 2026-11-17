import { mockUsersQueryEmpty, refetchUsers, setPermissionsLoaded, setupBeforeEach } from '../mocks/UserManagement'
import {
  activeOnlyMockData,
  inactiveOnlyMockData,
  emptyUsersPageMockData,
  pageTwoMockData,
  paginationPage1MockData,
  usersPageMockData,
} from '../data/UserManagement'
import '@testing-library/jest-dom'
import { render, screen, waitFor, fireEvent, within } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import UserManagementPage from '../../UserManagement'

const renderWithRoute = (initialPath = '/user-management') =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path='/user-management' element={<UserManagementPage />} />
      </Routes>
    </MemoryRouter>,
  )

beforeEach(() => {
  setupBeforeEach()
})

describe('UserManagementPage - Table Rendering', () => {
  test('renders a loading spinner while permissions are still loading', () => {
    setPermissionsLoaded(false)

    renderWithRoute('/user-management')

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
    expect(screen.queryByText('User Summary')).not.toBeInTheDocument()
  })
  test('renders the users table, summary and actions using mocked data', async () => {
    const { container } = renderWithRoute('/user-management')

    await waitFor(() => {
      expect(container.querySelector('#user-tbl')).toBeInTheDocument()
    })

    expect(await screen.findByText('Jane Admin')).toBeInTheDocument()
    expect(await screen.findByText('John Reader')).toBeInTheDocument()
    expect(await screen.findByText('jane.admin@mediahub.test')).toBeInTheDocument()
    expect(await screen.findByText('john.reader@mediahub.test')).toBeInTheDocument()
    expect(screen.getByText('User Summary')).toBeInTheDocument()
    expect(screen.getByText('All Users (2)')).toBeInTheDocument()
    expect(screen.getByText('Active Users (1)')).toBeInTheDocument()
    expect(screen.getByText('Inactive Users (1)')).toBeInTheDocument()
    expect(screen.getByText('Roles & Permissions')).toBeInTheDocument()
    expect(container.querySelector('#user-name-sel')).toBeInTheDocument()
    expect(container.querySelector('#user-role-sel')).toBeInTheDocument()
    expect(container.querySelector('#user-status-sel')).toBeInTheDocument()

    const detailButtons = container.querySelectorAll('[id^="user-details-"][id$="-btn"]')
    expect(detailButtons).toHaveLength(2)

    expect(refetchUsers).toHaveBeenCalled()
  })

  test('renders the empty state when the users query returns no rows', async () => {
    mockUsersQueryEmpty()

    const { container } = renderWithRoute('/user-management')

    // Wait for the async query to resolve — summary counters update to zero
    await waitFor(() => {
      expect(screen.getByText('All Users (0)')).toBeInTheDocument()
    })

    expect(screen.getByText('User Summary')).toBeInTheDocument()
    expect(screen.getByText('Active Users (0)')).toBeInTheDocument()
    expect(screen.getByText('Inactive Users (0)')).toBeInTheDocument()
    expect(screen.queryByText('Jane Admin')).not.toBeInTheDocument()
    expect(screen.queryByText('John Reader')).not.toBeInTheDocument()

    const detailButtons = container.querySelectorAll('[id^="user-details-"][id$="-btn"]')
    expect(detailButtons).toHaveLength(0)
  })

})

describe('UserManagementPage - Filter Interactions', () => {
  test('shows only active users when the Active Users tab is clicked', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
    refetchUsers.mockImplementation(({ options }: any) => {
      const statusOp = options?.operators?.find((o: any) => o.field === 'status')
      const isActiveOnly = statusOp?.values?.length === 1 && statusOp.values.includes('active')
      return Promise.resolve({ data: { users: isActiveOnly ? activeOnlyMockData : usersPageMockData } })
    })

    renderWithRoute('/user-management')

    await waitFor(() => expect(screen.getByText('John Reader')).toBeInTheDocument())

    fireEvent.click(screen.getByRole('button', { name: /Active Users/ }))

    await waitFor(() => expect(screen.queryByText('John Reader')).not.toBeInTheDocument())

    expect(screen.getByText('Jane Admin')).toBeInTheDocument()
    expect(refetchUsers).toHaveBeenCalledWith(
      expect.objectContaining({
        options: expect.objectContaining({
          operators: expect.arrayContaining([
            expect.objectContaining({ field: 'status', values: ['active'] }),
          ]),
        }),
      }),
    )
  })

  test('shows only inactive users when the Inactive Users tab is clicked', async () => {
    refetchUsers.mockImplementation(({ options }: any) => {
      const statusOp = options?.operators?.find((o: any) => o.field === 'status')
      const isInactiveOnly = statusOp?.values?.length === 1 && statusOp.values.includes('inactive')
      return Promise.resolve({ data: { users: isInactiveOnly ? inactiveOnlyMockData : usersPageMockData } })
    })

    renderWithRoute('/user-management')

    await waitFor(() => expect(screen.getByText('Jane Admin')).toBeInTheDocument())

    fireEvent.click(screen.getByRole('button', { name: /Inactive Users/ }))

    await waitFor(() => expect(screen.queryByText('Jane Admin')).not.toBeInTheDocument())

    expect(screen.getByText('John Reader')).toBeInTheDocument()
    expect(refetchUsers).toHaveBeenCalledWith(
      expect.objectContaining({
        options: expect.objectContaining({
          operators: expect.arrayContaining([
            expect.objectContaining({ field: 'status', values: ['inactive'] }),
          ]),
        }),
      }),
    )
  })

  test('shows only administrators when the role filter is changed to Administrator', async () => {
    refetchUsers.mockImplementation(({ options }: any) => {
      const roleOp = options?.operators?.find((o: any) => o.field === 'role')
      return Promise.resolve({
        data: { users: roleOp?.values?.includes('mh-administrator') ? activeOnlyMockData : usersPageMockData },
      })
    })

    renderWithRoute('/user-management')

    await waitFor(() => expect(screen.getByText('John Reader')).toBeInTheDocument())

    fireEvent.change(screen.getByRole('combobox', { name: /Role/i }), {
      target: { value: 'mh-administrator' },
    })

    await waitFor(() => expect(screen.queryByText('John Reader')).not.toBeInTheDocument())

    expect(screen.getByText('Jane Admin')).toBeInTheDocument()
    expect(refetchUsers).toHaveBeenCalledWith(
      expect.objectContaining({
        options: expect.objectContaining({
          operators: expect.arrayContaining([
            expect.objectContaining({ field: 'role', values: ['mh-administrator'] }),
          ]),
        }),
      }),
    )
  })

  test('resets the table to all users when Clear all is clicked after applying a role filter', async () => {
    refetchUsers.mockImplementation(({ options }: any) => {
      const roleOp = options?.operators?.find((o: any) => o.field === 'role')
      return Promise.resolve({
        data: { users: roleOp?.values?.includes('mh-administrator') ? activeOnlyMockData : usersPageMockData },
      })
    })

    renderWithRoute('/user-management')

    await waitFor(() => expect(screen.getByText('John Reader')).toBeInTheDocument())

    fireEvent.change(screen.getByRole('combobox', { name: /Role/i }), {
      target: { value: 'mh-administrator' },
    })

    await waitFor(() => expect(screen.queryByText('John Reader')).not.toBeInTheDocument())

    fireEvent.click(screen.getByRole('button', { name: /clear all/i }))

    await waitFor(() => expect(screen.getByText('John Reader')).toBeInTheDocument())

    expect(screen.getByText('Jane Admin')).toBeInTheDocument()
    expect(screen.queryByText('Jane Admin')).toBeInTheDocument()
    expect(screen.queryByText('John Reader')).toBeInTheDocument()
  })
  test('shows no user rows and calls the query with the correct operators when a filter yields no results', async () => {
    refetchUsers.mockImplementation(({ options }: any) => {
      const roleOp = options?.operators?.find((o: any) => o.field === 'role')
      return Promise.resolve({
        data: { users: roleOp !== undefined ? emptyUsersPageMockData : usersPageMockData },
      })
    })

    renderWithRoute('/user-management')

    await waitFor(() => expect(screen.getByText('Jane Admin')).toBeInTheDocument())

    fireEvent.change(screen.getByRole('combobox', { name: /Role/i }), {
      target: { value: 'mh-standard' },
    })

    // Neither user name appears once the filtered query returns empty data
    await waitFor(() => expect(screen.queryByText('Jane Admin')).not.toBeInTheDocument())
    expect(screen.queryByText('John Reader')).not.toBeInTheDocument()

    // The refetch was called with the correct role operator
    expect(refetchUsers).toHaveBeenCalledWith(
      expect.objectContaining({
        options: expect.objectContaining({
          operators: expect.arrayContaining([
            expect.objectContaining({ field: 'role', values: ['mh-standard'] }),
          ]),
        }),
      }),
    )
  })
})

describe('UserManagementPage - User Details Modal', () => {
  test('opens the details drawer showing name, role, and status for the first user', async () => {
    const { container } = renderWithRoute('/user-management')

    await waitFor(() => expect(screen.getByText('Jane Admin')).toBeInTheDocument())

    fireEvent.click(container.querySelector('#user-details-0-btn')!)

    const drawer = screen.getByRole('dialog', { name: 'User Details' })
    expect(drawer).toBeInTheDocument()
    expect(within(drawer).getByDisplayValue('Jane admin')).toBeInTheDocument()
    expect(within(drawer).getByDisplayValue('Administrator')).toBeInTheDocument()
    expect(within(drawer).getByText('Active')).toBeInTheDocument()
  })

  test('opens the details drawer showing name, role, and status for the second user', async () => {
    const { container } = renderWithRoute('/user-management')

    await waitFor(() => expect(screen.getByText('John Reader')).toBeInTheDocument())

    fireEvent.click(container.querySelector('#user-details-1-btn')!)

    const drawer = screen.getByRole('dialog', { name: 'User Details' })
    expect(drawer).toBeInTheDocument()
    expect(within(drawer).getByDisplayValue('John reader')).toBeInTheDocument()
    expect(within(drawer).getByDisplayValue('Read Only')).toBeInTheDocument()
    expect(within(drawer).getByText('Inactive')).toBeInTheDocument()
  })

  test('closes the details drawer when the Close button is clicked', async () => {
    const { container } = renderWithRoute('/user-management')

    await waitFor(() => expect(screen.getByText('Jane Admin')).toBeInTheDocument())

    fireEvent.click(container.querySelector('#user-details-0-btn')!)
    expect(screen.getByRole('dialog', { name: 'User Details' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Close' }))

    expect(screen.queryByRole('dialog', { name: 'User Details' })).not.toBeInTheDocument()
    // Details button is restored after closing
    expect(container.querySelector('#user-details-0-btn')).toBeInTheDocument()
  })

  test('changing the role in the drawer reflects the new selection and retains it after saving', async () => {
    const { container } = renderWithRoute('/user-management')

    await waitFor(() => expect(screen.getByText('Jane Admin')).toBeInTheDocument())

    fireEvent.click(container.querySelector('#user-details-0-btn')!)

    const drawer = screen.getByRole('dialog', { name: 'User Details' })
    expect(within(drawer).getByDisplayValue('Administrator')).toBeInTheDocument()

    fireEvent.change(container.querySelector('#user-drawer_role-sel')!, {
      target: { value: 'mh-standard' },
    })

    expect(within(drawer).getByDisplayValue('Standard User')).toBeInTheDocument()

    fireEvent.click(within(drawer).getByRole('button', { name: 'Save' }))

    // Drawer stays open and still shows the updated role after saving
    await waitFor(() => expect(within(drawer).getByDisplayValue('Standard User')).toBeInTheDocument())
  })

  test('toggling the status in the drawer reflects the change and retains it after saving', async () => {
    const { container } = renderWithRoute('/user-management')

    await waitFor(() => expect(screen.getByText('Jane Admin')).toBeInTheDocument())

    // Jane Admin is active — open her drawer
    fireEvent.click(container.querySelector('#user-details-0-btn')!)

    const drawer = screen.getByRole('dialog', { name: 'User Details' })
    expect(within(drawer).getByText('Active')).toBeInTheDocument()

    fireEvent.click(within(drawer).getByRole('switch'))

    expect(within(drawer).getByText('Inactive')).toBeInTheDocument()

    fireEvent.click(within(drawer).getByRole('button', { name: 'Save' }))

    // Drawer stays open and still shows the updated status after saving
    await waitFor(() => expect(within(drawer).getByText('Inactive')).toBeInTheDocument())
  })
})

describe('UserManagementPage - Roles & Permissions Modal', () => {
  test('opens the drawer showing the user summary and all modules when the button is clicked', async () => {
    const { container } = renderWithRoute('/user-management')

    await waitFor(() => expect(container.querySelector('#user-tbl')).toBeInTheDocument())

    fireEvent.click(screen.getByRole('button', { name: 'Roles & Permissions' }))

    const dialog = screen.getByRole('dialog', { name: 'Roles & Permissions' })
    expect(dialog).toBeInTheDocument()

    // User Summary section
    expect(within(dialog).getByText('User Summary')).toBeInTheDocument()
    expect(container.querySelector('#user-summary-admins-ttl')).toHaveTextContent('Administrator')
    expect(container.querySelector('#user-summary-standard-ttl')).toHaveTextContent('Standard User')
    expect(container.querySelector('#user-summary-readonly-ttl')).toHaveTextContent('Read Only')

    // All modules are rendered
    expect(within(dialog).getByText('Advertisers')).toBeInTheDocument()
    expect(within(dialog).getByText('Media Planning & Request')).toBeInTheDocument()
    expect(within(dialog).getByText('Campaign Management & Setup')).toBeInTheDocument()
    expect(within(dialog).getByText('Campaign Optimization & Pacing')).toBeInTheDocument()
    expect(within(dialog).getByText('Reports')).toBeInTheDocument()
    expect(within(dialog).getByText('Market Insights')).toBeInTheDocument()
    expect(within(dialog).getByText('Data Management')).toBeInTheDocument()
    expect(within(dialog).getByText('Pricing & Billing')).toBeInTheDocument()
    expect(within(dialog).getByText('User Management')).toBeInTheDocument()
  })

  test('closes the drawer when the Close button is clicked', async () => {
    const { container } = renderWithRoute('/user-management')

    await waitFor(() => expect(container.querySelector('#user-tbl')).toBeInTheDocument())

    fireEvent.click(screen.getByRole('button', { name: 'Roles & Permissions' }))
    expect(screen.getByRole('dialog', { name: 'Roles & Permissions' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Close' }))

    expect(screen.queryByRole('dialog', { name: 'Roles & Permissions' })).not.toBeInTheDocument()
  })
})

describe('UserManagementPage - Pagination', () => {
  // Page 1 holds Jane Admin + John Reader, page 2 holds Alice Standard + Bob ReadOnly.
  // callTableQueryFn() is used to programmatically invoke the page's queryFn with
  // specific pagination args — this mirrors what Ant Design's <Pagination> component
  // does internally and avoids adding fake buttons that don't exist in the real app.
  beforeEach(() => {
    refetchUsers.mockImplementation(({ options }: any) => {
      const offset = options?.paginate?.offset ?? 0
      return Promise.resolve({ data: { users: offset === 0 ? paginationPage1MockData : pageTwoMockData } })
    })
  })

  test('fetches the first page with offset 0 and limit 10 on initial render', async () => {
    renderWithRoute('/user-management')

    await waitFor(() => expect(screen.getByText('Jane Admin')).toBeInTheDocument())

    expect(refetchUsers).toHaveBeenCalledWith(
      expect.objectContaining({
        options: expect.objectContaining({
          paginate: expect.objectContaining({ offset: 0, limit: 10 }),
        }),
      }),
    )
  })
  test('fetches page 2 with offset 10 and replaces the visible rows with the second page of results', async () => {
    renderWithRoute('/user-management')

    await waitFor(() => expect(screen.getByText('Jane Admin')).toBeInTheDocument())

    fireEvent.click(screen.getByRole('button', { name: '2' }))

    await waitFor(() => expect(screen.getByText('Alice Standard')).toBeInTheDocument())

    expect(screen.getByText('Bob ReadOnly')).toBeInTheDocument()
    expect(screen.queryByText('Jane Admin')).not.toBeInTheDocument()
    expect(screen.queryByText('John Reader')).not.toBeInTheDocument()

    expect(refetchUsers).toHaveBeenCalledWith(
      expect.objectContaining({
        options: expect.objectContaining({
          paginate: expect.objectContaining({ offset: 10, limit: 10 }),
        }),
      }),
    )
  })
  test('fetches page 1 with offset 0 and restores the first page rows when navigating back from page 2', async () => {
    renderWithRoute('/user-management')

    await waitFor(() => expect(screen.getByText('Jane Admin')).toBeInTheDocument())

    // Go to page 2
    fireEvent.click(screen.getByRole('button', { name: '2' }))
    await waitFor(() => expect(screen.getByText('Alice Standard')).toBeInTheDocument())

    // Go back to page 1
    fireEvent.click(screen.getByRole('button', { name: '1' }))
    await waitFor(() => expect(screen.getByText('Jane Admin')).toBeInTheDocument())

    expect(screen.getByText('John Reader')).toBeInTheDocument()
    expect(screen.queryByText('Alice Standard')).not.toBeInTheDocument()

    expect(refetchUsers).toHaveBeenCalledWith(
      expect.objectContaining({
        options: expect.objectContaining({
          paginate: expect.objectContaining({ offset: 0, limit: 10 }),
        }),
      }),
    )
  })

  test('preserves active banner filters in the query operators when navigating to a subsequent page', async () => {
    refetchUsers.mockImplementation(({ options }: any) => {
      const offset = options?.paginate?.offset ?? 0
      const roleOp = options?.operators?.find((o: any) => o.field === 'role')
      const isAdminFilter = roleOp?.values?.includes('mh-administrator')
      const filteredPage1 = {
        users: [{ id: 1, name: 'Jane Admin', email: 'jane.admin@mediahub.test', role: ['mh-administrator'], status: 'active', lastLogin: '' }],
        totalCount: 20,
        hasNextPage: true,
        totalAdministrators: 2,
        totalStandard: 0,
        totalReadOnly: 0,
        toggle: { totalActive: 2, totalInactive: 0, totalUsers: 2 },
      }
      const filteredPage2 = {
        users: [{ id: 3, name: 'Alice Standard', email: 'alice.standard@mediahub.test', role: ['mh-administrator'], status: 'active', lastLogin: '' }],
        totalCount: 20,
        hasNextPage: false,
        totalAdministrators: 2,
        totalStandard: 0,
        totalReadOnly: 0,
        toggle: { totalActive: 2, totalInactive: 0, totalUsers: 2 },
      }
      if (isAdminFilter) return Promise.resolve({ data: { users: offset === 0 ? filteredPage1 : filteredPage2 } })
      return Promise.resolve({ data: { users: offset === 0 ? paginationPage1MockData : pageTwoMockData } })
    })

    renderWithRoute('/user-management')
    await waitFor(() => expect(screen.getByText('John Reader')).toBeInTheDocument())

    // Apply role filter — triggers page 1 fetch with role operator
    fireEvent.change(screen.getByRole('combobox', { name: /Role/i }), {
      target: { value: 'mh-administrator' },
    })
    await waitFor(() => expect(screen.queryByText('John Reader')).not.toBeInTheDocument())
    await waitFor(() => expect(screen.getByText('Jane Admin')).toBeInTheDocument())

    // Click page 2 — the role filter is already active in the mock component's state
    fireEvent.click(screen.getByRole('button', { name: '2' }))
    await waitFor(() => expect(screen.getByText('Alice Standard')).toBeInTheDocument())

    // The page-2 request must contain both the role operator and offset 10
    expect(refetchUsers).toHaveBeenCalledWith(
      expect.objectContaining({
        options: expect.objectContaining({
          paginate: expect.objectContaining({ offset: 10, limit: 10 }),
          operators: expect.arrayContaining([
            expect.objectContaining({ field: 'role', values: ['mh-administrator'] }),
          ]),
        }),
      }),
    )
  })
})
