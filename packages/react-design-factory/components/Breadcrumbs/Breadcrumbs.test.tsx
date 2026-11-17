import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import '@testing-library/jest-dom'
import Breadcrumb from './Breadcrumbs'

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

const renderWithRouter = (ui: React.ReactElement) => render(<MemoryRouter>{ui}</MemoryRouter>)

describe('Breadcrumb — basic rendering', () => {
  it('renders all provided breadcrumb items', () => {
    renderWithRouter(
      <Breadcrumb
        items={[
          { title: 'Section', href: '/section' },
          { title: 'Current Page' },
        ]}
      />,
    )

    expect(screen.getByText('Section')).toBeInTheDocument()
    expect(screen.getByText('Current Page')).toBeInTheDocument()
  })

  it('renders intermediate items as links and the last item as plain text', () => {
    renderWithRouter(
      <Breadcrumb
        items={[
          { title: 'Home', href: '/' },
          { title: 'Section', href: '/section' },
          { title: 'Current Page' },
        ]}
      />,
    )

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Section' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Current Page' })).not.toBeInTheDocument()
    expect(screen.getByText('Current Page')).toBeInTheDocument()
  })
})

describe('Breadcrumb — defaultHome', () => {
  it('prepends a Home item linking to "/" when defaultHome is true', () => {
    renderWithRouter(
      <Breadcrumb
        defaultHome
        items={[{ title: 'Section', href: '/section' }, { title: 'Current Page' }]}
      />,
    )

    const homeLink = screen.getByRole('link', { name: 'Home' })
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('does not add a Home item when defaultHome is false', () => {
    renderWithRouter(
      <Breadcrumb
        defaultHome={false}
        items={[{ title: 'Section', href: '/section' }, { title: 'Current Page' }]}
      />,
    )

    expect(screen.queryByRole('link', { name: 'Home' })).not.toBeInTheDocument()
  })

  it('does not add a Home item when defaultHome is omitted', () => {
    renderWithRouter(
      <Breadcrumb items={[{ title: 'Section', href: '/section' }, { title: 'Current Page' }]} />,
    )

    expect(screen.queryByRole('link', { name: 'Home' })).not.toBeInTheDocument()
  })

  it('places the Home item first regardless of the provided items order', () => {
    const { container } = renderWithRouter(
      <Breadcrumb
        defaultHome
        items={[{ title: 'Section', href: '/section' }, { title: 'Current Page' }]}
      />,
    )

    const allItems = container.querySelectorAll('ol > li:not(.ant-breadcrumb-separator)')
    expect(allItems[0].textContent).toContain('Home')
  })
})
