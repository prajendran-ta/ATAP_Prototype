import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ConfigProvider } from '../..'
import Spinner from './Spinner'

const renderWithProvider = (ui: React.ReactElement) =>
  render(React.createElement(ConfigProvider, { children: ui }))

describe('Spinner', () => {
  it('renders the loading icon without loading overlay', () => {
    const { container } = renderWithProvider(<Spinner />)
    expect(screen.getByRole('img', { name: 'loading' })).toBeInTheDocument()
    expect(container.querySelector('.amadeus-spin-fullscreen')).not.toBeInTheDocument()
  })

  it('renders as actively spinning (aria-busy)', () => {
    const { container } = renderWithProvider(<Spinner />)
    expect(container.querySelector('[aria-busy="true"]')).toBeInTheDocument()
  })

  it('renders the loading icon with size=small', () => {
    renderWithProvider(<Spinner size='small' />)
    expect(screen.getByRole('img', { name: 'loading' })).toBeInTheDocument()
  })

  it('renders the loading icon with size=default', () => {
    renderWithProvider(<Spinner size='default' />)
    expect(screen.getByRole('img', { name: 'loading' })).toBeInTheDocument()
  })

  it('renders the loading icon in fullscreen mode with loading overlay', () => {
    const { container } = renderWithProvider(<Spinner fullscreen />)
    expect(screen.getByRole('img', { name: 'loading' })).toBeInTheDocument()
    expect(container.querySelector('.amadeus-spin-fullscreen')).toBeInTheDocument()
  })
})
