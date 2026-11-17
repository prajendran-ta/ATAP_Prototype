import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ConfigProvider } from '../..'
import Input from './Input'

const renderWithProvider = (ui: React.ReactElement) => render(React.createElement(ConfigProvider, { children: ui }))

describe('Input', () => {
  describe('Rendering', () => {
    it('renders with default placeholder when no props are provided', () => {
      renderWithProvider(<Input />)
      expect(screen.getByRole('textbox')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('-')).toBeInTheDocument()
    })

    it('renders label with htmlFor when id is provided', () => {
      renderWithProvider(<Input id='my-input' label='Full Name' />)
      const label = screen.getByText('Full Name')
      expect(label).toHaveAttribute('for', 'my-input')
      expect(screen.getByRole('textbox')).toHaveAttribute('id', 'my-input')
    })

    it('renders label without htmlFor when id is omitted', () => {
      renderWithProvider(<Input label='Full Name' />)
      expect(screen.getByText('Full Name')).not.toHaveAttribute('for')
    })

    it('renders required asterisk when label and required are provided', () => {
      renderWithProvider(<Input label='Full Name' required />)
      expect(screen.getByText('*')).toBeInTheDocument()
    })

    it('does not render required asterisk when required is false', () => {
      renderWithProvider(<Input label='Full Name' />)
      expect(screen.queryByText('*')).not.toBeInTheDocument()
    })

    it('does not render required asterisk when label prop is omitted', () => {
      renderWithProvider(<Input placeholder='Enter text' required />)
      expect(screen.queryByText('*')).not.toBeInTheDocument()
    })

    it('renders all message types', () => {
      renderWithProvider(<Input helperMessage='Helper text' warningMessage='Warning text' errorMessage='Error text' />)
      expect(screen.getByText('Helper text')).toBeInTheDocument()
      expect(screen.getByText('Warning text')).toBeInTheDocument()
      expect(screen.getByText('Error text')).toBeInTheDocument()
    })

    it('renders as disabled', () => {
      renderWithProvider(<Input disabled />)
      expect(screen.getByRole('textbox')).toBeDisabled()
    })

    it('renders with custom placeholder', () => {
      renderWithProvider(<Input placeholder='Enter value' />)
      expect(screen.getByPlaceholderText('Enter value')).toBeInTheDocument()
    })

    it('renders with controlled value', () => {
      renderWithProvider(<Input value='hello' onChange={jest.fn()} />)
      expect(screen.getByRole('textbox')).toHaveValue('hello')
    })

    it('renders with affixBefore and affixAfter', () => {
      renderWithProvider(<Input affixBefore={<span>Before</span>} affixAfter={<span>After</span>} />)
      expect(screen.getByText('Before')).toBeInTheDocument()
      expect(screen.getByText('After')).toBeInTheDocument()
    })

    it('renders with prefix', () => {
      renderWithProvider(<Input prefix={<span>$</span>} />)
      expect(screen.getByText('$')).toBeInTheDocument()
    })
  })

  describe('Event handlers', () => {
    it('fires onChange when typing', () => {
      const mockOnChange = jest.fn()
      renderWithProvider(<Input onChange={mockOnChange} />)
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } })
      expect(mockOnChange).toHaveBeenCalled()
    })

    it('fires onBlur when losing focus', () => {
      const mockOnBlur = jest.fn()
      renderWithProvider(<Input onBlur={mockOnBlur} />)
      fireEvent.blur(screen.getByRole('textbox'))
      expect(mockOnBlur).toHaveBeenCalled()
    })

    it('fires onKeyDown on key press', () => {
      const mockOnKeyDown = jest.fn()
      renderWithProvider(<Input onKeyDown={mockOnKeyDown} />)
      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter', keyCode: 13 })
      expect(mockOnKeyDown).toHaveBeenCalled()
    })
  })
})
