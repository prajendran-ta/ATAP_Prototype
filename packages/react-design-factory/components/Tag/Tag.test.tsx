import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Tag from './Tag'

describe('Tag', () => {
  describe('Rendering', () => {
    it('renders children', () => {
      render(<Tag>Label</Tag>)
      expect(screen.getByText('Label')).toBeInTheDocument()
    })

    it('renders with explicit color prop', () => {
      const { container } = render(<Tag color='#ff0000'>Red</Tag>)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('renders with status and no explicit color (uses getStatusColor)', () => {
      const { container } = render(<Tag status='success'>Success</Tag>)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('renders with no color and no status (defaults to primary)', () => {
      const { container } = render(<Tag>Default</Tag>)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('renders without close icon when onClose is not provided', () => {
      render(<Tag>No close</Tag>)
      expect(screen.queryByLabelText('Close')).not.toBeInTheDocument()
    })

    it('renders with close icon when onClose is provided', () => {
      render(<Tag onClose={jest.fn()}>Closable</Tag>)
      expect(screen.getByLabelText('Close')).toBeInTheDocument()
    })
  })

  describe('Event handlers', () => {
    it('fires onClose when close icon is clicked', () => {
      const mockOnClose = jest.fn()
      render(<Tag onClose={mockOnClose}>Closable</Tag>)
      fireEvent.click(screen.getByLabelText('Close'))
      expect(mockOnClose).toHaveBeenCalled()
    })
  })

  describe('Status variants', () => {
    it.each(['primary', 'error', 'success', 'warning', 'helper', 'disabled', 'default'] as const)(
      'renders with status=%s',
      status => {
        const { container } = render(<Tag status={status}>{status}</Tag>)
        expect(container.firstChild).toBeInTheDocument()
      },
    )
  })
})
