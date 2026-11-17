import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Link from './Link'
import { LinkProps } from './Link.d'

let idCounter = 0
const generateId = () => `link-${idCounter++}`

const LinkWrapper: React.FC<Omit<LinkProps, 'id' | 'href'>> = props => {
  const autoId = generateId()
  const href = props.disabled ? undefined : '#'
  return (
    <Link id={autoId} href={href} {...props}>
      My Link
    </Link>
  )
}

describe('LinkWrapper Component', () => {
  const renderLink = (props = {}) => render(<LinkWrapper {...props}>My Link</LinkWrapper>)

  it('renders an anchor with role link and a default href when not disabled', () => {
    renderLink()
    const anchor = screen.getByRole('link', { name: /my link/i })
    expect(anchor).toBeInTheDocument()
    expect(anchor).toHaveAttribute('href', '#')
  })

  it('removes href when disabled=true', () => {
    const { container } = renderLink({ disabled: true })
    const anchor = container.querySelector('a') as HTMLAnchorElement
    expect(anchor).toBeInTheDocument()
    expect(anchor.getAttribute('href')).toBeNull()
    expect(anchor).toHaveAttribute('aria-disabled', 'true')
  })

  it('applies icon-alone mode styles when iconAlone=true', () => {
    const { container } = renderLink({ iconAlone: true })
    const wrapper = container.querySelector('span')
    expect(wrapper).toBeInTheDocument()
  })

  it('sets font-size based on size prop', () => {
    const { rerender, container } = renderLink()
    let anchor = container.querySelector('a') as HTMLElement

    rerender(<LinkWrapper size='default'>My Link</LinkWrapper>)
    anchor = container.querySelector('a') as HTMLElement
    expect(anchor).toHaveStyle('font-size: 14px')
  })

  it('uses the provided href when not disabled', () => {
    const { container } = renderLink({ href: 'https://example.com' })
    const anchor = container.querySelector('a') as HTMLAnchorElement
    expect(anchor.getAttribute('href')).toBe('https://example.com')
  })

  it('renders a custom ReactNode when linkIcon is a React element', () => {
    render(<LinkWrapper linkIcon={<span data-testid='custom-icon-node' />}>My Link</LinkWrapper>)
    expect(screen.getByTestId('custom-icon-node')).toBeInTheDocument()
  })
})
