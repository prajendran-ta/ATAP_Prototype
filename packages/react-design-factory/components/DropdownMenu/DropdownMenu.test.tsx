import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import DropdownMenu from './DropdownMenu'
import type { ItemType } from './DropdownMenu.d'

const items: ItemType[] = [
  { key: '1', label: 'Action 1' },
  { key: '2', label: 'Action 2' },
]

describe('DropdownMenu', () => {
  it('renders children when no menuType is provided', () => {
    render(
      <DropdownMenu items={items}>
        <button>Open menu</button>
      </DropdownMenu>,
    )
    expect(screen.getByText('Open menu')).toBeInTheDocument()
  })

  it('renders a kebab icon button when menuType is "kebab" and renders its items', () => {
    render(<DropdownMenu items={items} menuType='kebab' />)
    const kebabButton = screen.getByRole('button')
    expect(kebabButton).toBeInTheDocument()
    fireEvent.click(kebabButton)
    expect(screen.getByText('Action 1')).toBeInTheDocument()
    expect(screen.getByText('Action 2')).toBeInTheDocument()
  })

  it('opens dropdown when button is clicked', () => {
    render(
      <DropdownMenu items={items}>
        <button>Open menu</button>
      </DropdownMenu>,
    )
    fireEvent.click(screen.getByText('Open menu'))
    expect(screen.getByText('Action 1')).toBeInTheDocument()
    expect(screen.getByText('Action 2')).toBeInTheDocument()
  })

  it('renders menu items when it is clicked', () => {
    render(
      <DropdownMenu items={items}>
        <button>Open menu</button>
      </DropdownMenu>,
    )
    fireEvent.click(screen.getByText('Open menu'))
    expect(screen.getByText('Action 1')).toBeInTheDocument()
    expect(screen.getByText('Action 2')).toBeInTheDocument()
  })

  it('calls onClick handler when menu item is clicked', () => {
    const handleClick = jest.fn()
    const customItems: ItemType[] = [{ key: '1', label: 'Action 1', onClick: handleClick }]
    render(
      <DropdownMenu items={customItems}>
        <button>Open menu</button>
      </DropdownMenu>,
    )
    fireEvent.click(screen.getByText('Open menu'))
    fireEvent.click(screen.getByText('Action 1'))
    expect(handleClick).toHaveBeenCalled()
  })

  it('does not open dropdown when disabled', () => {
    render(
      <DropdownMenu items={items} disabled>
        <button>Open menu</button>
      </DropdownMenu>,
    )
    fireEvent.click(screen.getByText('Open menu'))
    expect(screen.queryByText('Action 1')).not.toBeInTheDocument()
  })
})
