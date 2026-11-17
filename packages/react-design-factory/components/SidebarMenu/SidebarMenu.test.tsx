import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useNavigate, useLocation } from 'react-router'
import SidebarMenu from './SidebarMenu'
import type { SidebarMenuNode } from './SidebarMenu.d'

jest.mock('react-router', () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}))

describe('SidebarMenu', () => {
  const mockItems: SidebarMenuNode[] = [
    { key: 'home', label: 'Home' },
    {
      key: 'profile',
      label: 'Profile',
      children: [
        { key: 'settings', label: 'Settings' },
        { key: 'security', label: 'Security' },
      ],
    },
  ]

  const mockNavigate = jest.fn()
  const mockSetCollapsed = jest.fn()
  const mockOnSelect = jest.fn()

  const defaultProps = {
    collapsed: false,
    setCollapsed: mockSetCollapsed,
    items: mockItems,
    onSelect: mockOnSelect,
    showSearch: true,
    searchPlaceholder: 'Search...',
  }

  beforeAll(() => {
    const originalGetComputedStyle = window.getComputedStyle
    jest.spyOn(window, 'getComputedStyle').mockImplementation((el, pseudoElt) => {
      if (pseudoElt) return {} as CSSStyleDeclaration
      return originalGetComputedStyle(el)
    })

    Object.defineProperty(window, 'open', {
      writable: true,
      value: jest.fn(),
    })
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useNavigate as jest.Mock).mockReturnValue(mockNavigate)
    ;(useLocation as jest.Mock).mockReturnValue({ pathname: '/' })
  })

  // ── Base case ─────────────────────────────────────────────────────────────

  describe('base case', () => {
    it('renders top-level menu items', async () => {
      render(<SidebarMenu {...defaultProps} />)
      expect(await screen.findByText('Home')).toBeInTheDocument()
      expect(await screen.findByText('Profile')).toBeInTheDocument()
    })

    it('renders with the menu visible when collapsed is false', async () => {
      render(<SidebarMenu {...defaultProps} />)
      expect(await screen.findByRole('menu')).toBeInTheDocument()
    })
  })

  // ── showSearch prop ───────────────────────────────────────────────────────

  describe('showSearch prop', () => {
    it('shows the search input when showSearch is true', () => {
      render(<SidebarMenu {...defaultProps} showSearch={true} />)
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
    })

    it('hides the search input when showSearch is false', () => {
      render(<SidebarMenu {...defaultProps} showSearch={false} />)
      expect(screen.queryByPlaceholderText('Search...')).not.toBeInTheDocument()
    })

    it('hides the search input by default when showSearch is omitted', () => {
      const { showSearch: _, searchPlaceholder: __, ...rest } = defaultProps
      render(<SidebarMenu {...rest} />)
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
    })
  })

  // ── collapsed prop ────────────────────────────────────────────────────────

  describe('collapsed prop', () => {
    it('hides the search input when collapsed is true even if showSearch is true', () => {
      render(<SidebarMenu {...defaultProps} collapsed={true} showSearch={true} />)
      expect(screen.queryByPlaceholderText('Search...')).not.toBeInTheDocument()
    })

    it('shows the search input when collapsed is false and showSearch is true', () => {
      render(<SidebarMenu {...defaultProps} collapsed={false} showSearch={true} />)
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
    })
  })

  // ── searchPlaceholder prop ────────────────────────────────────────────────

  describe('searchPlaceholder prop', () => {
    it('uses the provided placeholder text on the search input', () => {
      render(<SidebarMenu {...defaultProps} searchPlaceholder="Find a page..." />)
      expect(screen.getByPlaceholderText('Find a page...')).toBeInTheDocument()
    })

    it('defaults to "Search..." when searchPlaceholder is not provided', () => {
      const { searchPlaceholder: _, ...rest } = defaultProps
      render(<SidebarMenu {...rest} />)
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
    })
  })

  // ── items — icon ──────────────────────────────────────────────────────────

  describe('items — icon', () => {
    it('renders the icon node when an item has an icon prop', async () => {
      const itemsWithIcon: SidebarMenuNode[] = [
        { key: 'home', label: 'Home', icon: <span data-testid="home-icon">★</span> },
      ]
      render(<SidebarMenu {...defaultProps} items={itemsWithIcon} showSearch={false} />)
      expect(await screen.findByTestId('home-icon')).toBeInTheDocument()
    })
  })

  // ── search filter behavior ────────────────────────────────────────────────

  describe('search filter behavior', () => {
    it('filters items to only those whose label matches the query', async () => {
      render(<SidebarMenu {...defaultProps} />)
      fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: 'Home' } })
      expect(await screen.findByText('Home')).toBeInTheDocument()
      expect(screen.queryByText('Profile')).not.toBeInTheDocument()
    })

    it('shows a parent item when one of its children matches the query', async () => {
      render(<SidebarMenu {...defaultProps} />)
      fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: 'Settings' } })
      expect(await screen.findByText('Profile')).toBeInTheDocument()
      expect(screen.queryByText('Home')).not.toBeInTheDocument()
    })

    it('shows "No results found" when no items match the query', async () => {
      render(<SidebarMenu {...defaultProps} />)
      fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: 'xyz' } })
      expect(await screen.findByText('No results found')).toBeInTheDocument()
    })

    it('restores all items when the search query is cleared', async () => {
      render(<SidebarMenu {...defaultProps} />)
      fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: 'xyz' } })
      expect(await screen.findByText('No results found')).toBeInTheDocument()
      fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: '' } })
      expect(await screen.findByText('Home')).toBeInTheDocument()
      expect(await screen.findByText('Profile')).toBeInTheDocument()
    })
  })

  // ── onSelect prop ─────────────────────────────────────────────────────────

  describe('onSelect prop', () => {
    it('calls onSelect with the item key when a menu item is clicked', async () => {
      render(<SidebarMenu {...defaultProps} showSearch={false} />)
      fireEvent.click(await screen.findByText('Home'))
      expect(mockOnSelect).toHaveBeenCalledWith('home')
    })

    it('does not throw when onSelect is not provided and an item is clicked', async () => {
      const { onSelect: _, ...propsWithoutCallback } = defaultProps
      render(<SidebarMenu {...propsWithoutCallback} showSearch={false} />)
      const homeItem = await screen.findByText('Home')
      expect(() => fireEvent.click(homeItem)).not.toThrow()
    })
  })

  // ── items — href navigation ───────────────────────────────────────────────

  describe('items — href navigation', () => {
    it('calls navigate with the href for internal links when an item is clicked', async () => {
      const navItems: SidebarMenuNode[] = [{ key: 'dash', label: 'Dashboard', href: '/dashboard' }]
      render(<SidebarMenu {...defaultProps} items={navItems} showSearch={false} />)
      fireEvent.click(await screen.findByText('Dashboard'))
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
    })

    it('calls window.open with the href for external links when an item is clicked', async () => {
      const navItems: SidebarMenuNode[] = [{ key: 'ext', label: 'External', href: 'https://example.com' }]
      render(<SidebarMenu {...defaultProps} items={navItems} showSearch={false} />)
      fireEvent.click(await screen.findByText('External'))
      expect(window.open).toHaveBeenCalledWith('https://example.com', '_blank')
    })

    it('does not call navigate for items without an href', async () => {
      render(<SidebarMenu {...defaultProps} showSearch={false} />)
      fireEvent.click(await screen.findByText('Home'))
      expect(mockNavigate).not.toHaveBeenCalled()
    })
  })

  // ── items — activePatterns / href selectedKeys ────────────────────────────

  describe('items — selectedKeys derived from location', () => {
    it('marks an item as selected when pathname matches an activePattern', async () => {
      ;(useLocation as jest.Mock).mockReturnValue({ pathname: '/profile/settings' })
      const patternItems: SidebarMenuNode[] = [
        { key: 'profile', label: 'Profile', activePatterns: ['/profile'] },
        { key: 'home', label: 'Home' },
      ]
      render(<SidebarMenu {...defaultProps} items={patternItems} showSearch={false} />)
      const profileItem = await screen.findByText('Profile')
      expect(profileItem.closest('li')).toHaveClass('ant-menu-item-selected')
    })

    it('marks an item as selected when pathname exactly matches its href', async () => {
      ;(useLocation as jest.Mock).mockReturnValue({ pathname: '/home' })
      const hrefItems: SidebarMenuNode[] = [
        { key: 'home', label: 'Home', href: '/home' },
        { key: 'other', label: 'Other' },
      ]
      render(<SidebarMenu {...defaultProps} items={hrefItems} showSearch={false} />)
      const homeItem = await screen.findByText('Home')
      expect(homeItem.closest('li')).toHaveClass('ant-menu-item-selected')
    })

    it('does not mark any item as selected when pathname matches no item', async () => {
      render(<SidebarMenu {...defaultProps} showSearch={false} />)
      const items = await screen.findAllByRole('menuitem')
      items.forEach(item => {
        expect(item).not.toHaveClass('ant-menu-item-selected')
      })
    })
  })
})
