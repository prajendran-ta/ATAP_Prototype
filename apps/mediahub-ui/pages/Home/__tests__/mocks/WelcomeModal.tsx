import React from 'react'
import { useGetAdvertisersFollowingTotalQuery } from '@mediahub/advertisers-ui/pages/Advertisers/Advertisers.queries'
import { useGetWelcomeModal, useIgnoreWelcomeModal } from '@mediahub/mediahub-ui/pages/Home/WelcomeModal/WelcomeModal.queries'
import { useAuth } from '@mediahub/mediahub-ui/context/AuthContext'
import { defaultUserData, SetupOptions } from '../data/WelcomeModal'

jest.mock('@mediahub/advertisers-ui/pages/Advertisers/Advertisers.queries', () => ({
  __esModule: true,
  useGetAdvertisersFollowingTotalQuery: jest.fn(),
}))

jest.mock('@mediahub/mediahub-ui/pages/Home/WelcomeModal/WelcomeModal.queries', () => ({
  __esModule: true,
  useGetWelcomeModal: jest.fn(),
  useIgnoreWelcomeModal: jest.fn(),
}))

jest.mock('@mediahub/mediahub-ui/context/AuthContext', () => ({
  __esModule: true,
  useAuth: jest.fn(),
}))

jest.mock('@amadeus/react-design-factory', () => {
  const React = require('react')

  const Button = ({ children, onClick, variant }: any) => (
    <button data-variant={variant} onClick={onClick}>
      {children}
    </button>
  )

  const Modal = ({ open, children, title, footer, onCancel }: any) =>
    open ? (
      <div role='dialog' data-testid='welcome-modal'>
        <div data-testid='welcome-modal-title'>{title}</div>
        <button data-testid='welcome-modal-close' onClick={onCancel} />
        <div data-testid='welcome-modal-body'>{children}</div>
        <div data-testid='welcome-modal-footer'>{footer}</div>
      </div>
    ) : null

  const Text = {
    H3: ({ children }: any) => <h3>{children}</h3>,
    Body: ({ children, style }: any) => <p style={style}>{children}</p>,
  }

  return { __esModule: true, Button, Modal, Text }
})

export const mockIgnoreWelcomeModal = jest.fn()
export const mockRefetchWelcomeModal = jest.fn()

export function setupBeforeEach() {
  jest.resetAllMocks()
  window.history.pushState({}, '', '/?login=success')
}

export function setupMocks({
  followingTotal = 0,
  advLoading = false,
  advError = undefined,
  wmStatus = false,
  wmLoading = false,
  wmError = undefined,
}: SetupOptions = {}) {
  ;(useAuth as jest.Mock).mockReturnValue(defaultUserData)

  ;(useGetAdvertisersFollowingTotalQuery as jest.Mock).mockReturnValue({
    data: { advertisers: { toggle: { totalFollowing: followingTotal } } },
    loading: advLoading,
    error: advError,
  })

  ;(useGetWelcomeModal as jest.Mock).mockReturnValue({
    data: { getWelcomeModal: { status: wmStatus } },
    loading: wmLoading,
    error: wmError,
    refetch: mockRefetchWelcomeModal,
  })

  ;(useIgnoreWelcomeModal as jest.Mock).mockReturnValue([mockIgnoreWelcomeModal, { loading: false }])

  mockIgnoreWelcomeModal.mockResolvedValue({})
  mockRefetchWelcomeModal.mockResolvedValue({})
}
