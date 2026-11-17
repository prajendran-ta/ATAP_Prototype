import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import NotificationUndoAction from './NotificationUndoAction'

describe('NotificationUndoAction', () => {
  it('renders the message text', () => {
    render(<NotificationUndoAction message='Item deleted' onUndo={jest.fn()} />)
    expect(screen.getByText('Item deleted')).toBeInTheDocument()
  })

  it('renders the Undo button', () => {
    render(<NotificationUndoAction message='Item deleted' onUndo={jest.fn()} />)
    expect(screen.getByRole('button', { name: 'Undo' })).toBeInTheDocument()
  })

  it('calls onUndo when the Undo button is clicked', () => {
    const mockOnUndo = jest.fn().mockResolvedValue(undefined)
    render(<NotificationUndoAction message='Item deleted' onUndo={mockOnUndo} />)
    fireEvent.click(screen.getByRole('button', { name: 'Undo' }))
    expect(mockOnUndo).toHaveBeenCalledTimes(1)
  })
})
