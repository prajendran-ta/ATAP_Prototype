import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ConfigProvider } from '../..'
import DatePicker from './DatePicker'
import dayjs from 'dayjs'

const renderWithProvider = (ui: React.ReactElement) => render(React.createElement(ConfigProvider, { children: ui }))

describe('DatePicker', () => {
  describe('Rendering', () => {
    it('renders with default placeholder when no props are provided', () => {
      renderWithProvider(<DatePicker />)
      expect(screen.getByRole('textbox')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('-')).toBeInTheDocument()
    })

    it('renders label with htmlFor when id is provided', () => {
      renderWithProvider(<DatePicker id='test-departure-datepicker' label='Departure' />)
      const label = screen.getByText('Departure')
      expect(label).toHaveAttribute('for', 'test-departure-datepicker')
      expect(screen.getByRole('textbox')).toHaveAttribute('id', 'test-departure-datepicker')
    })

    it('renders label without htmlFor when id is omitted', () => {
      renderWithProvider(<DatePicker label='Departure' />)
      expect(screen.getByText('Departure')).not.toHaveAttribute('for')
    })

    it('renders required asterisk when label and required are provided', () => {
      renderWithProvider(<DatePicker label='Departure' required />)
      expect(screen.getByText('*')).toBeInTheDocument()
    })

    it('does not render required asterisk when required is false', () => {
      renderWithProvider(<DatePicker label='Departure' />)
      expect(screen.queryByText('*')).not.toBeInTheDocument()
    })

    it('does not render label when label prop is omitted', () => {
      renderWithProvider(<DatePicker />)
      expect(screen.queryByText('*')).not.toBeInTheDocument()
    })

    it('renders all message types', () => {
      renderWithProvider(
        <DatePicker helperMessage='Helper text' warningMessage='Warning text' errorMessage='Error text' />,
      )
      expect(screen.getByText('Helper text')).toBeInTheDocument()
      expect(screen.getByText('Warning text')).toBeInTheDocument()
      expect(screen.getByText('Error text')).toBeInTheDocument()
    })

    it('renders as disabled', () => {
      renderWithProvider(<DatePicker disabled />)
      expect(screen.getByRole('textbox')).toBeDisabled()
    })

    it('renders with custom placeholder', () => {
      renderWithProvider(<DatePicker placeholder='Select date' />)
      expect(screen.getByPlaceholderText('Select date')).toBeInTheDocument()
    })

    it('renders with allowClear enabled', async () => {
      renderWithProvider(<DatePicker allowClear value={dayjs('2024-01-15')} id='test-clear-icon' />)
      const input = screen.getByRole('textbox')
      fireEvent.mouseEnter(input.closest('.amadeus-picker')!)
      const clearIcon = await screen.findByRole('img', { name: /close/i })
      expect(clearIcon).toBeInTheDocument()
    })

    it('renders with allowClear disabled (default)', () => {
      renderWithProvider(<DatePicker allowClear={false} />)
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })
  })

  describe('Event handlers', () => {
    it('accepts onChange and onBlur props without error', () => {
      renderWithProvider(<DatePicker onChange={jest.fn()} onBlur={jest.fn()} />)
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })
  })
})
