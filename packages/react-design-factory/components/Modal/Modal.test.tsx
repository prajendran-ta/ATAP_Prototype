import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Modal from './Modal'

describe('Modal', () => {
  it('renders dialog when open', async () => {
    render(
      <Modal open title='Test Modal'>
        <p>Modal Content</p>
      </Modal>,
    )
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
      expect(screen.getByText('Test Modal')).toBeInTheDocument()
      expect(screen.getByText('Modal Content')).toBeInTheDocument()
    })
  })

  it('does not render dialog when closed', () => {
    render(
      <Modal open={false} title='Hidden'>
        <p>Hidden</p>
      </Modal>,
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument()
  })

  it('applies ids to ok and cancel buttons when idPrefix is provided', async () => {
    render(<Modal open title='Confirm' idPrefix='confirm-modal' onOk={jest.fn()} onCancel={jest.fn()} />)
    await waitFor(() => {
      expect(document.getElementById('confirm-modal-ok-btn')).toBeInTheDocument()
      expect(document.getElementById('confirm-modal-cancel-btn')).toBeInTheDocument()
    })
  })

  it('renders without idPrefix', async () => {
    render(<Modal open title='No Prefix' onOk={jest.fn()} onCancel={jest.fn()} />)
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
  })
})
