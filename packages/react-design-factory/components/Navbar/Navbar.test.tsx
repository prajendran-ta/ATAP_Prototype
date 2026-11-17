import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Navbar from './Navbar'

const renderNavbar = (props: React.ComponentProps<typeof Navbar> = {}) => render(<Navbar {...props} />)

describe('Navbar Component', () => {
  describe('general behavior', () => {
    it('renders a header element', () => {
      renderNavbar()
      expect(screen.getByRole('banner')).toBeInTheDocument()
    })

    it('renders NavbarComponent and BottomNavbarElement together', () => {
      renderNavbar({
        NavbarComponent: <span data-testid='nav-content'>Nav</span>,
        BottomNavbarElement: <div data-testid='bottom-bar'>Bottom</div>,
      })
      expect(screen.getByTestId('nav-content')).toBeInTheDocument()
      expect(screen.getByTestId('bottom-bar')).toBeInTheDocument()
    })
  })

  describe('id', () => {
    it('sets the id attribute on the header when provided', () => {
      renderNavbar({ id: 'main-navbar' })
      expect(screen.getByRole('banner')).toHaveAttribute('id', 'main-navbar')
    })

    it('does not set an id attribute when not provided', () => {
      renderNavbar()
      expect(screen.getByRole('banner')).not.toHaveAttribute('id')
    })
  })

  describe('NavbarComponent', () => {
    it('renders NavbarComponent when provided', () => {
      renderNavbar({ NavbarComponent: <h4>Amadeus Travel Advertising Platform</h4> })
      expect(screen.getByText('Amadeus Travel Advertising Platform')).toBeInTheDocument()
    })

    it('renders nothing in the navbar row when NavbarComponent is not provided', () => {
      renderNavbar()
      expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    })
  })

  describe('BottomNavbarElement', () => {
    it('renders BottomNavbarElement below the header when provided', () => {
      renderNavbar({ BottomNavbarElement: <div data-testid='bottom-bar'>Bottom Content</div> })
      const header = screen.getByRole('banner')
      const bottom = screen.getByTestId('bottom-bar')
      expect(bottom).toBeInTheDocument()
      // must appear after the header in the DOM
      const isAfter = (header.compareDocumentPosition(bottom) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0
      expect(isAfter).toBe(true)
    })

    it('renders BottomNavbarElement outside the header', () => {
      renderNavbar({ BottomNavbarElement: <div data-testid='bottom-bar'>Bottom Content</div> })
      expect(screen.getByTestId('bottom-bar').closest('header')).toBeNull()
    })

    it('does not render BottomNavbarElement when not provided', () => {
      renderNavbar()
      expect(screen.queryByTestId('bottom-bar')).not.toBeInTheDocument()
    })
  })

  describe('isSticky', () => {
    it('applies a different class to the wrapper when isSticky changes', () => {
      const { container, rerender } = render(<Navbar isSticky={false} />)
      const classStatic = container.firstElementChild!.className

      rerender(<Navbar isSticky={true} />)
      const classSticky = container.firstElementChild!.className

      expect(classSticky).not.toBe(classStatic)
    })
  })
})
