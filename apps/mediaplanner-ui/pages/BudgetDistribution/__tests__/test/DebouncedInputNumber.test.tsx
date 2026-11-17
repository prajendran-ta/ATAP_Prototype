import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Form } from '@amadeus/react-design-factory'
import { DebouncedInputNumber } from '../../DebouncedInputNumber'

Object.defineProperty(window, 'getComputedStyle', {
  value: () =>
    ({
      getPropertyValue: () => '',
      overflow: 'scroll',
      overflowY: 'scroll',
      overflowX: 'scroll',
    }) as any,
})

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
;(global as any).ResizeObserver = ResizeObserverMock

jest.mock('rc-util/lib/getScrollBarSize', () => ({
  __esModule: true,
  default: () => 0,
  getTargetScrollBarSize: () => ({ width: 0, height: 0 }),
}))

jest.mock('rc-util/es/getScrollBarSize', () => ({
  __esModule: true,
  default: () => 0,
  getTargetScrollBarSize: () => ({ width: 0, height: 0 }),
}))

// Wrap in Form so Form.useFormInstance() resolves correctly
const renderWithForm = (
  props: React.ComponentProps<typeof DebouncedInputNumber>,
) =>
  render(
    <Form>
      <DebouncedInputNumber {...props} />
    </Form>,
  )

const baseProps = {
  name: 'testField',
  id: 'test-input',
  value: 100,
  onChange: jest.fn(),
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe('DebouncedInputNumber', () => {
  test('renders an Input inside a Form.Item', () => {
    renderWithForm(baseProps)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  test('uses the supplied id on the input element', () => {
    renderWithForm(baseProps)
    expect(document.getElementById('test-input')).toBeInTheDocument()
  })

  test('reflects the value prop', () => {
    renderWithForm({ ...baseProps, value: 42 })
    const input = screen.getByRole('textbox') as HTMLInputElement
    expect(input.value).toBe('42')
  })

  test('renders explicit zero values', () => {
    renderWithForm({ ...baseProps, value: 0 })
    const input = screen.getByRole('textbox') as HTMLInputElement
    expect(input.value).toBe('0')
  })

  test('renders empty when value is undefined', () => {
    renderWithForm({ ...baseProps, value: undefined })
    const input = screen.getByRole('textbox') as HTMLInputElement
    expect(input.value).toBe('')
  })

  test('calls onChange with a numeric value when input changes to a new value', () => {
    const onChange = jest.fn()
    renderWithForm({ ...baseProps, value: 10, onChange })
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '250' } })
    expect(onChange).toHaveBeenCalledWith(250)
  })

  test('does not call onChange when the new value equals the current value', () => {
    const onChange = jest.fn()
    renderWithForm({ ...baseProps, value: 100, onChange })
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '100' } })
    expect(onChange).not.toHaveBeenCalled()
  })

  test('renders in a disabled state when disabled=true', () => {
    renderWithForm({ ...baseProps, disabled: true })
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  test('renders in an enabled state when disabled=false', () => {
    renderWithForm({ ...baseProps, disabled: false })
    expect(screen.getByRole('textbox')).not.toBeDisabled()
  })
})
