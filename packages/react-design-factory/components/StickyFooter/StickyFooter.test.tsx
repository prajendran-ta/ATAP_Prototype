import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import StickyFooter from './StickyFooter'

describe('StickyFooter', () => {
  it('renders children', () => {
    render(
      <StickyFooter>
        <button>Save</button>
      </StickyFooter>,
    )
    expect(screen.getByText('Save')).toBeInTheDocument()
  })

  it('renders with marginBottom and left props', () => {
    const { container } = render(
      <StickyFooter marginBottom={20} left='200px'>
        <button>Cancel</button>
      </StickyFooter>,
    )
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders with default marginBottom (0)', () => {
    const { container } = render(
      <StickyFooter>
        <span>Content</span>
      </StickyFooter>,
    )
    expect(container.firstChild).toBeInTheDocument()
  })
})
