import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Search from './Search'

describe('Search', () => {
  it('renders label and input', () => {
    render(<Search id='my-search' placeholder='Find...' />)
    expect(screen.getByText('Search')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Find...')).toBeInTheDocument()
  })

  it('calls onSearch with trimmed lowercased value', () => {
    const mockOnSearch = jest.fn()
    render(<Search onSearch={mockOnSearch} />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '  Test INPUT  ' } })
    expect(mockOnSearch).toHaveBeenCalledWith('test input')
  })

  it('does not throw when onSearch is not provided', () => {
    render(<Search />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'hello' } })
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })
})
