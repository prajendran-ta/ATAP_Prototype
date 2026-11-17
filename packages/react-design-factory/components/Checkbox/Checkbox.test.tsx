import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ConfigProvider } from '../..'
import Checkbox from './Checkbox'

const renderWithProvider = (ui: React.ReactElement) => render(React.createElement(ConfigProvider, { children: ui }))

describe('Checkbox', () => {
  it('renders with label', () => {
    renderWithProvider(<Checkbox>Accept terms</Checkbox>)
    expect(screen.getByText('Accept terms')).toBeInTheDocument()
  })

  it('renders unchecked by default', () => {
    renderWithProvider(<Checkbox>Label</Checkbox>)
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('renders checked when checked prop is true', () => {
    renderWithProvider(<Checkbox checked onChange={() => {}}>Label</Checkbox>)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('renders disabled', () => {
    renderWithProvider(<Checkbox disabled>Label</Checkbox>)
    expect(screen.getByRole('checkbox')).toBeDisabled()
  })

  it('calls onChange when clicked', () => {
    const handleChange = jest.fn()
    renderWithProvider(<Checkbox onChange={handleChange}>Label</Checkbox>)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(handleChange).toHaveBeenCalledTimes(1)
  })
})
