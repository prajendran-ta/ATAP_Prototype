import { TextEncoder, TextDecoder } from 'node:util'

Object.assign(global, { TextDecoder, TextEncoder })

import '@testing-library/jest-dom'
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { setupBeforeEach, setupMocks, mockIgnoreWelcomeModal, mockRefetchWelcomeModal } from '../mocks/WelcomeModal'
import WelcomeModal from '../../WelcomeModal'

const renderWelcomeModal = () =>
  render(
    <MemoryRouter>
      <WelcomeModal />
    </MemoryRouter>,
  )

beforeEach(() => {
  setupBeforeEach()
})

afterEach(() => {
  window.history.pushState({}, '', '/')
})

describe('WelcomeModal - Visibility', () => {
  test('renders when user has zero followed advertisers and modal not previously dismissed', () => {
    setupMocks()
    renderWelcomeModal()

    expect(screen.getByTestId('welcome-modal')).toBeInTheDocument()
    expect(screen.getByText('Welcome to Media Hub')).toBeInTheDocument()
  })

  test('does not render when user has followed advertisers', () => {
    setupMocks({ followingTotal: 3 })
    renderWelcomeModal()

    expect(screen.queryByTestId('welcome-modal')).not.toBeInTheDocument()
  })

  test('does not render when the modal was previously dismissed', () => {
    setupMocks({ wmStatus: true })
    renderWelcomeModal()

    expect(screen.queryByTestId('welcome-modal')).not.toBeInTheDocument()
  })

  test('does not render while followed advertisers data is loading', () => {
    setupMocks({ advLoading: true })
    renderWelcomeModal()

    expect(screen.queryByTestId('welcome-modal')).not.toBeInTheDocument()
  })

  test('does not render while welcome modal status is loading', () => {
    setupMocks({ wmLoading: true })
    renderWelcomeModal()

    expect(screen.queryByTestId('welcome-modal')).not.toBeInTheDocument()
  })

  test('does not render when fetching followed advertisers fails', () => {
    setupMocks({ advError: new Error('Network error') })
    renderWelcomeModal()

    expect(screen.queryByTestId('welcome-modal')).not.toBeInTheDocument()
  })

  test('does not render when fetching welcome modal status fails', () => {
    setupMocks({ wmError: new Error('Network error') })
    renderWelcomeModal()

    expect(screen.queryByTestId('welcome-modal')).not.toBeInTheDocument()
  })

  test('does not render without the ?login=success URL parameter', () => {
    window.history.pushState({}, '', '/')
    setupMocks()
    renderWelcomeModal()

    expect(screen.queryByTestId('welcome-modal')).not.toBeInTheDocument()
  })
})

describe('WelcomeModal - Dismiss / Ignore', () => {
  test('calls the ignoreWelcomeModal mutation when "Ignore" is clicked', async () => {
    setupMocks()
    renderWelcomeModal()

    fireEvent.click(screen.getByText('Ignore'))

    await waitFor(() => {
      expect(mockIgnoreWelcomeModal).toHaveBeenCalledTimes(1)
    })
  })

  test('refetches welcome modal status after ignoring', async () => {
    setupMocks()
    renderWelcomeModal()

    fireEvent.click(screen.getByText('Ignore'))

    await waitFor(() => {
      expect(mockRefetchWelcomeModal).toHaveBeenCalledTimes(1)
    })
  })

  test('modal closes after clicking "Ignore"', async () => {
    setupMocks()
    renderWelcomeModal()

    expect(screen.getByTestId('welcome-modal')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Ignore'))

    await waitFor(() => {
      expect(screen.queryByTestId('welcome-modal')).not.toBeInTheDocument()
    })
  })

  test('modal still closes when the ignoreWelcomeModal API call fails', async () => {
    setupMocks()
    mockIgnoreWelcomeModal.mockRejectedValue(new Error('Server error'))

    renderWelcomeModal()
    expect(screen.getByTestId('welcome-modal')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Ignore'))

    await waitFor(() => {
      expect(screen.queryByTestId('welcome-modal')).not.toBeInTheDocument()
    })
  })
})

describe('WelcomeModal - Navigation', () => {
  test('navigates to /advertisers when "Go to Advertiser" is clicked', () => {
    setupMocks()
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<WelcomeModal />} />
          <Route path='/advertisers' element={<div data-testid='advertisers-page' />} />
        </Routes>
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByText('Go to Advertiser'))

    expect(screen.getByTestId('advertisers-page')).toBeInTheDocument()
  })
})
