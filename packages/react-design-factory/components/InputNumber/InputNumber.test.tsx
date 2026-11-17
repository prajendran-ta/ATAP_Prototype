import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ConfigProvider } from '../..'
import InputNumber from './InputNumber'

// Capture the internal formatter passed to AntdInputNumber to test all branches
let capturedFormatter: Function | undefined
jest.mock('antd/es/input-number', () => {
  const ActualInputNumber = jest.requireActual('antd/es/input-number')
  const WrappedInputNumber = React.forwardRef((props: any, ref: any) => {
    capturedFormatter = props.formatter
    return React.createElement(ActualInputNumber.default, { ...props, ref })
  })
  WrappedInputNumber.displayName = 'MockedAntdInputNumber'
  return { ...ActualInputNumber, default: WrappedInputNumber, __esModule: true }
})

const renderWithProvider = (ui: React.ReactElement) => render(React.createElement(ConfigProvider, { children: ui }))

describe('InputNumber', () => {
  describe('Rendering', () => {
    it('renders with default placeholder when no props are provided', () => {
      renderWithProvider(<InputNumber />)
      expect(screen.getByRole('spinbutton')).toBeInTheDocument()
    })

    it('renders label with htmlFor when id is provided', () => {
      renderWithProvider(<InputNumber id='my-number' label='Quantity' />)
      const label = screen.getByText('Quantity')
      expect(label).toHaveAttribute('for', 'my-number')
      expect(screen.getByRole('spinbutton')).toHaveAttribute('id', 'my-number')
    })

    it('renders label without htmlFor when id is omitted', () => {
      renderWithProvider(<InputNumber label='Quantity' />)
      expect(screen.getByText('Quantity')).not.toHaveAttribute('for')
    })

    it('renders required asterisk when label and required are provided', () => {
      renderWithProvider(<InputNumber label='Quantity' required />)
      expect(screen.getByText('*')).toBeInTheDocument()
    })

    it('does not render required asterisk when required is false', () => {
      renderWithProvider(<InputNumber label='Quantity' />)
      expect(screen.queryByText('*')).not.toBeInTheDocument()
    })

    it('does not render required asterisk when label prop is omitted', () => {
      renderWithProvider(<InputNumber placeholder='Enter a numeric value' required />)
      expect(screen.queryByText('*')).not.toBeInTheDocument()
    })

    it('renders all message types', () => {
      renderWithProvider(
        <InputNumber helperMessage='Helper text' warningMessage='Warning text' errorMessage='Error text' />,
      )
      expect(screen.getByText('Helper text')).toBeInTheDocument()
      expect(screen.getByText('Warning text')).toBeInTheDocument()
      expect(screen.getByText('Error text')).toBeInTheDocument()
    })

    it('renders as disabled', () => {
      renderWithProvider(<InputNumber disabled />)
      expect(screen.getByRole('spinbutton')).toBeDisabled()
    })

    it('renders with affixBefore and affixAfter', () => {
      renderWithProvider(<InputNumber affixBefore={<span>kg</span>} affixAfter={<span>lbs</span>} />)
      expect(screen.getByText('kg')).toBeInTheDocument()
      expect(screen.getByText('lbs')).toBeInTheDocument()
    })

    it('renders with min, max, and step constraints and validates values manually', () => {
      const handleChange = jest.fn()
      renderWithProvider(<InputNumber min={0} max={100} step={5} onChange={handleChange} />)
      const numericInput = screen.getByRole('spinbutton')

      fireEvent.change(numericInput, { target: { value: '50' } })
      expect(Number((numericInput as HTMLInputElement).value)).toBe(50)

      fireEvent.change(numericInput, { target: { value: '200' } })
      fireEvent.blur(numericInput)
      expect(Number((numericInput as HTMLInputElement).value)).toBeLessThanOrEqual(100)

      fireEvent.change(numericInput, { target: { value: '-10' } })
      fireEvent.blur(numericInput)
      expect(Number((numericInput as HTMLInputElement).value)).toBeGreaterThanOrEqual(0)

      expect(numericInput).toHaveAttribute('step', '5')
    })

    it('renders with custom placeholder', () => {
      renderWithProvider(<InputNumber placeholder='Enter amount' />)
      expect(screen.getByPlaceholderText('Enter amount')).toBeInTheDocument()
    })
  })

  describe('Formatter', () => {
    it('returns empty string when value is falsy', () => {
      renderWithProvider(<InputNumber />)
      expect(capturedFormatter).toBeDefined()
      expect(capturedFormatter!(undefined, {})).toBe('')
    })

    it('uses formatNumber when no custom formatter is provided', () => {
      renderWithProvider(<InputNumber />)
      expect(capturedFormatter!('1234', {})).toBe('1,234')
    })

    it('uses custom formatter when it returns a truthy value', () => {
      const customFormatter = jest.fn().mockReturnValue('$1,234')
      renderWithProvider(<InputNumber formatter={customFormatter} />)
      expect(capturedFormatter!('1234', {})).toBe('$1,234')
      expect(customFormatter).toHaveBeenCalledWith('1234', {})
    })

    it('falls back to formatNumber when custom formatter returns a falsy value', () => {
      const customFormatter = jest.fn().mockReturnValue('')
      renderWithProvider(<InputNumber formatter={customFormatter} />)
      expect(capturedFormatter!('1234', {})).toBe('1,234')
    })
  })

  describe('Event handlers', () => {
    it('fires onChange when value changes', () => {
      const mockOnChange = jest.fn()
      renderWithProvider(<InputNumber onChange={mockOnChange} />)
      fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '42' } })
      expect(mockOnChange).toHaveBeenCalled()
    })

    it('fires onBlur when losing focus', () => {
      const mockOnBlur = jest.fn()
      renderWithProvider(<InputNumber onBlur={mockOnBlur} />)
      fireEvent.blur(screen.getByRole('spinbutton'))
      expect(mockOnBlur).toHaveBeenCalled()
    })
  })
})
