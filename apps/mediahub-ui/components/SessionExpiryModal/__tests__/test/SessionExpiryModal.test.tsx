import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SessionExpiryModal from '../../SessionExpiryModal'
import * as api from '@mediahub/mediahub-ui/api'
import { clearCokkiesAndRedirect } from '@mediahub/mediahub-ui/MediaHubGqlProvider/MediaHubAuthMeLink'

jest.mock('@mediahub/mediahub-ui/api', () => ({
  extendSession: jest.fn(),
}))

jest.mock('@mediahub/mediahub-ui/MediaHubGqlProvider/MediaHubAuthMeLink', () => ({
  clearCokkiesAndRedirect: jest.fn(),
}))

const mockExtendSession = api.extendSession as jest.Mock
const mockClearCokkiesAndRedirect = clearCokkiesAndRedirect as jest.Mock

const defaultProps = {
  open: true,
  secondsRemaining: 90,
  onExtended: jest.fn(),
}

describe('SessionExpiryModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('rendering', () => {
    it('renders the modal when open is true', () => {
      render(<SessionExpiryModal {...defaultProps} />)

      expect(screen.getByText('Session Expiring Soon')).toBeInTheDocument()
      expect(screen.getByText(/Your session will expire in/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /extend session/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /log out now/i })).toBeInTheDocument()
    })

    it('does not render the modal content when open is false', () => {
      render(<SessionExpiryModal {...defaultProps} open={false} />)

      expect(screen.queryByText('Session Expiring Soon')).not.toBeInTheDocument()
    })

    it('formats the countdown correctly for seconds >= 60', () => {
      render(<SessionExpiryModal {...defaultProps} secondsRemaining={90} />)

      expect(screen.getByText('1:30')).toBeInTheDocument()
    })

    it('formats the countdown correctly for seconds < 60', () => {
      render(<SessionExpiryModal {...defaultProps} secondsRemaining={9} />)

      expect(screen.getByText('0:09')).toBeInTheDocument()
    })

    it('clamps negative secondsRemaining to 0:00', () => {
      render(<SessionExpiryModal {...defaultProps} secondsRemaining={-5} />)

      expect(screen.getByText('0:00')).toBeInTheDocument()
    })

    it('does not show an error message initially', () => {
      render(<SessionExpiryModal {...defaultProps} />)

      expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument()
    })
  })

  describe('extend session', () => {
    it('calls api.extendSession and invokes onExtended with new timeout on success', async () => {
      const onExtended = jest.fn()
      mockExtendSession.mockResolvedValueOnce({
        status: 200,
        json: async () => ({ sessionTimeout: 900 }),
      })

      render(<SessionExpiryModal {...defaultProps} onExtended={onExtended} />)
      fireEvent.click(screen.getByRole('button', { name: /extend session/i }))

      await waitFor(() => {
        expect(onExtended).toHaveBeenCalledWith(900)
      })
      expect(mockExtendSession).toHaveBeenCalledWith(15)
    })

    it('shows an error message when the API returns a non-200 status', async () => {
      mockExtendSession.mockResolvedValueOnce({ status: 500 })

      render(<SessionExpiryModal {...defaultProps} />)
      fireEvent.click(screen.getByRole('button', { name: /extend session/i }))

      await waitFor(() => {
        expect(
          screen.getByText('Something went wrong while extending the session. Please try again.'),
        ).toBeInTheDocument()
      })
    })

    it('shows an error message when api.extendSession throws', async () => {
      mockExtendSession.mockRejectedValueOnce(new Error('Network error'))

      render(<SessionExpiryModal {...defaultProps} />)
      fireEvent.click(screen.getByRole('button', { name: /extend session/i }))

      await waitFor(() => {
        expect(
          screen.getByText('Something went wrong while extending the session.'),
        ).toBeInTheDocument()
      })
    })

    it('disables both buttons while the extend request is in-flight', async () => {
      let resolveExtend!: (value: unknown) => void
      mockExtendSession.mockReturnValueOnce(new Promise((res) => { resolveExtend = res }))

      render(<SessionExpiryModal {...defaultProps} />)
      fireEvent.click(screen.getByRole('button', { name: /extend session/i }))

      expect(screen.getByRole('button', { name: /log out now/i })).toBeDisabled()

      resolveExtend({ status: 200, json: async () => ({ sessionTimeout: 900 }) })
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /log out now/i })).not.toBeDisabled()
      })
    })
  })

  describe('log out', () => {
    it('calls clearCokkiesAndRedirect when "Log out now" is clicked', () => {
      render(<SessionExpiryModal {...defaultProps} />)
      fireEvent.click(screen.getByRole('button', { name: /log out now/i }))

      expect(mockClearCokkiesAndRedirect).toHaveBeenCalledTimes(1)
    })

    it('does not call clearCokkiesAndRedirect when "Log out now" is disabled', async () => {
      let resolveExtend!: (value: unknown) => void
      mockExtendSession.mockReturnValueOnce(new Promise((res) => { resolveExtend = res }))

      render(<SessionExpiryModal {...defaultProps} />)
      fireEvent.click(screen.getByRole('button', { name: /extend session/i }))
      fireEvent.click(screen.getByRole('button', { name: /log out now/i }))

      expect(mockClearCokkiesAndRedirect).not.toHaveBeenCalled()

      resolveExtend({ status: 200, json: async () => ({ sessionTimeout: 900 }) })
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /log out now/i })).not.toBeDisabled()
      })
    })
  })
})
