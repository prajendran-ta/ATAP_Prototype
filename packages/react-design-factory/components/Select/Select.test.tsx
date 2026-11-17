import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ConfigProvider } from '../..'
import Select from './Select'
import { SuffixIcon } from './Select.styled'

// Capture internal callbacks passed to AntdSelect for testing defensive branches
let capturedOnChange: Function | undefined
let capturedFilterOption: Function | boolean | undefined
jest.mock('antd/es/select', () => {
  const ActualSelect = jest.requireActual('antd/es/select')
  const WrappedSelect = React.forwardRef((props: any, ref: any) => {
    capturedOnChange = props.onChange
    capturedFilterOption = props.filterOption
    return React.createElement(ActualSelect.default, { ...props, ref })
  })
  WrappedSelect.displayName = 'MockedAntdSelect'
  return { ...ActualSelect, default: WrappedSelect, __esModule: true }
})

const sampleOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
]

const countriesOptions = [
  { label: 'Egypt', value: 'eg' },
  { label: 'Germany', value: 'de' },
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
]

const renderWithProvider = (ui: React.ReactElement) => {
  return render(React.createElement(ConfigProvider, { children: ui }))
}

describe('Select Component', () => {
  describe('Rendering', () => {
    it('renders with label, id, required asterisk, and htmlFor', () => {
      renderWithProvider(<Select id='test-select' options={sampleOptions} label='Test Label' required />)
      const select = screen.getByRole('combobox')
      expect(select).toHaveAttribute('id', 'test-select')
      const label = screen.getByText('Test Label')
      expect(label).toHaveAttribute('for', 'test-select')
      expect(screen.getByText('*')).toBeInTheDocument()
    })

    it('renders with custom placeholder', () => {
      renderWithProvider(<Select options={sampleOptions} placeholder='Pick one' />)
      expect(screen.getByText('Pick one')).toBeInTheDocument()
    })

    it('renders as disabled', () => {
      renderWithProvider(<Select options={sampleOptions} disabled />)
      expect(screen.getByRole('combobox')).toBeDisabled()
    })

    it('renders with loading state', () => {
      renderWithProvider(<Select options={sampleOptions} loading />)
      const container = screen.getByRole('combobox').closest('.amadeus-select')
      expect(container).toHaveClass('amadeus-select-loading')
    })

    it('renders all message types', () => {
      renderWithProvider(
        <Select
          options={sampleOptions}
          helperMessage='Helper text'
          warningMessage='Warning text'
          errorMessage='Error text'
        />,
      )
      expect(screen.getByText('Helper text')).toBeInTheDocument()
      expect(screen.getByText('Warning text')).toBeInTheDocument()
      expect(screen.getByText('Error text')).toBeInTheDocument()
    })

    it('renders notFoundContent when options are empty', async () => {
      renderWithProvider(<Select options={[]} notFoundContent={<span>No results</span>} />)
      fireEvent.mouseDown(screen.getByRole('combobox'))
      await waitFor(() => {
        expect(screen.getByText('No results')).toBeInTheDocument()
      })
    })

    it('uses default empty options when options prop is omitted', () => {
      renderWithProvider(<Select />)
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })
  })

  describe('State management', () => {
    it('renders with controlled value and updates on rerender', () => {
      const { rerender } = renderWithProvider(<Select options={sampleOptions} value='option1' />)
      expect(screen.getByText('Option 1')).toBeInTheDocument()

      rerender(
        React.createElement(ConfigProvider, {
          children: <Select options={sampleOptions} value='option2' />,
        }),
      )
      expect(screen.getByText('Option 2')).toBeInTheDocument()

      rerender(
        React.createElement(ConfigProvider, {
          children: <Select options={sampleOptions} value={undefined} />,
        }),
      )
      expect(screen.queryByText('Option 2')).not.toBeInTheDocument()
    })

    it('populates when options arrive after value', () => {
      const { rerender } = renderWithProvider(<Select options={[]} value='option1' />)

      rerender(
        React.createElement(ConfigProvider, {
          children: <Select options={sampleOptions} value='option1' />,
        }),
      )
      expect(screen.getByText('Option 1')).toBeInTheDocument()
    })
  })

  describe('Multiple mode', () => {
    it('renders with badges enabled', () => {
      renderWithProvider(<Select mode='multiple' options={sampleOptions} withBadges defaultValue={['option1']} />)
      expect(screen.getByText('Option 1')).toBeInTheDocument()
    })

    it('renders single tag without others count (withBadges=false)', () => {
      renderWithProvider(
        <Select mode='multiple' options={sampleOptions} withBadges={false} defaultValue={['option1']} />,
      )
      expect(screen.getByText('Option 1')).toBeInTheDocument()
      expect(screen.queryByText('others')).not.toBeInTheDocument()
    })

    it('renders +N others for multiple selections (withBadges=false)', () => {
      renderWithProvider(
        <Select
          mode='multiple'
          options={sampleOptions}
          withBadges={false}
          defaultValue={['option1', 'option2', 'option3']}
        />,
      )
      expect(screen.getByText('Option 1')).toBeInTheDocument()
      expect(screen.getByText('+2 others...')).toBeInTheDocument()
    })

    it('renders option ids and checkboxes with checked state in dropdown', async () => {
      renderWithProvider(<Select id='my-select' mode='multiple' options={sampleOptions} defaultValue={['option1']} />)

      fireEvent.mouseDown(screen.getByRole('combobox'))

      await waitFor(() => {
        expect(document.getElementById('my-select-option1-option')).toBeInTheDocument()
        expect(document.querySelectorAll('.amadeus-checkbox').length).toBeGreaterThan(0)
        expect(document.querySelectorAll('.amadeus-checkbox-checked').length).toBeGreaterThanOrEqual(1)
      })
    })
  })

  describe('onChange', () => {
    it('fires with single option in single mode', async () => {
      const mockOnChange = jest.fn()
      renderWithProvider(<Select options={sampleOptions} onChange={mockOnChange} />)

      fireEvent.mouseDown(screen.getByRole('combobox'))
      await waitFor(() => fireEvent.click(screen.getByText('Option 2')))

      expect(mockOnChange).toHaveBeenCalledWith('option2', expect.objectContaining({ value: 'option2' }))
    })

    it('fires with option array in multiple mode', async () => {
      const mockOnChange = jest.fn()
      renderWithProvider(<Select mode='multiple' options={sampleOptions} onChange={mockOnChange} />)

      fireEvent.mouseDown(screen.getByRole('combobox'))
      await waitFor(() => fireEvent.click(screen.getByText('Option 1')))

      expect(mockOnChange).toHaveBeenCalledWith(
        expect.anything(),
        expect.arrayContaining([expect.objectContaining({ value: 'option1' })]),
      )
    })

    it('does not throw when onChange is not provided', async () => {
      renderWithProvider(<Select options={sampleOptions} />)
      fireEvent.mouseDown(screen.getByRole('combobox'))
      await waitFor(() => fireEvent.click(screen.getByText('Option 1')))
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })
  })

  describe('onBlur', () => {
    it('fires with selected value in single mode', async () => {
      const mockOnBlur = jest.fn()
      renderWithProvider(<Select options={sampleOptions} onBlur={mockOnBlur} defaultValue='option1' />)

      fireEvent.blur(screen.getByRole('combobox'))

      await waitFor(() => {
        expect(mockOnBlur).toHaveBeenCalledWith('option1', expect.objectContaining({ value: 'option1' }))
      })
    })

    it('fires with values array in multiple mode', async () => {
      const mockOnBlur = jest.fn()
      renderWithProvider(
        <Select mode='multiple' options={sampleOptions} onBlur={mockOnBlur} defaultValue={['option1', 'option2']} />,
      )

      fireEvent.blur(screen.getByRole('combobox'))

      await waitFor(() => {
        expect(mockOnBlur).toHaveBeenCalledWith(
          ['option1', 'option2'],
          expect.arrayContaining([
            expect.objectContaining({ value: 'option1' }),
            expect.objectContaining({ value: 'option2' }),
          ]),
        )
      })
    })
  })

  describe('allowClear', () => {
    it('clears with null in single mode', async () => {
      const mockOnChange = jest.fn()
      renderWithProvider(<Select options={sampleOptions} allowClear onChange={mockOnChange} defaultValue='option1' />)

      const clearIcon = document.querySelector('.amadeus-select-clear')
      if (clearIcon) fireEvent.mouseDown(clearIcon)

      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalledWith(null)
      })
    })

    it('clears with empty array in multiple mode', async () => {
      const mockOnChange = jest.fn()
      renderWithProvider(
        <Select
          mode='multiple'
          options={sampleOptions}
          allowClear
          onChange={mockOnChange}
          defaultValue={['option1']}
        />,
      )

      const clearIcon = document.querySelector('.amadeus-select-clear')
      if (clearIcon) fireEvent.mouseDown(clearIcon)

      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalledWith([])
      })
    })
  })

  describe('Filter', () => {
    it('filters by label search and excludes non-matching', async () => {
      renderWithProvider(<Select options={countriesOptions} showSearch searchBy='label' />)
      const select = screen.getByRole('combobox')
      fireEvent.mouseDown(select)
      fireEvent.change(select, { target: { value: 'United' } })

      await waitFor(() => {
        expect(screen.getByText('United States')).toBeInTheDocument()
        expect(screen.getByText('United Kingdom')).toBeInTheDocument()
        expect(screen.queryByText('Egypt')).not.toBeInTheDocument()
        expect(screen.queryByText('Germany')).not.toBeInTheDocument()
      })
    })

    it('filters by value search and excludes non-matching', async () => {
      renderWithProvider(<Select options={countriesOptions} showSearch searchBy='value' />)
      const select = screen.getByRole('combobox')
      fireEvent.mouseDown(select)
      fireEvent.change(select, { target: { value: 'eg' } })

      await waitFor(() => {
        expect(screen.getByText('Egypt')).toBeInTheDocument()
        expect(screen.queryByText('Germany')).not.toBeInTheDocument()
      })
    })

    it('filters by both label and value (matches value)', async () => {
      renderWithProvider(<Select options={countriesOptions} showSearch searchBy='both' />)
      const select = screen.getByRole('combobox')
      fireEvent.mouseDown(select)
      fireEvent.change(select, { target: { value: 'de' } })

      await waitFor(() => {
        expect(screen.getByText('Germany')).toBeInTheDocument()
        expect(screen.queryByText('Egypt')).not.toBeInTheDocument()
      })
    })

    it('disables filtering when showSearch is false', () => {
      renderWithProvider(<Select options={countriesOptions} showSearch={false} />)
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })

    it('disables client filtering when filterMode is server', async () => {
      const mockOnSearch = jest.fn()
      renderWithProvider(<Select options={countriesOptions} showSearch filterMode='server' onSearch={mockOnSearch} />)
      const select = screen.getByRole('combobox')
      fireEvent.mouseDown(select)
      fireEvent.change(select, { target: { value: 'xyz' } })

      await waitFor(() => {
        expect(screen.getByText('Egypt')).toBeInTheDocument()
        expect(screen.getByText('Germany')).toBeInTheDocument()
      })
    })

    it('handles undefined label in label filter mode', async () => {
      const options = [
        { label: undefined, value: 'test' },
        { label: 'Valid', value: 'valid' },
      ] as any[]

      renderWithProvider(<Select options={options} showSearch searchBy='label' />)
      const select = screen.getByRole('combobox')
      fireEvent.mouseDown(select)
      fireEvent.change(select, { target: { value: 'test' } })

      await waitFor(() => expect(select).toBeInTheDocument())
    })

    it('handles undefined label in both filter mode', async () => {
      const options = [
        { label: undefined, value: 'mystery' },
        { label: 'Valid', value: 'valid' },
      ] as any[]

      renderWithProvider(<Select options={options} showSearch searchBy='both' />)
      const select = screen.getByRole('combobox')
      fireEvent.mouseDown(select)
      fireEvent.change(select, { target: { value: 'mystery' } })

      await waitFor(() => expect(select).toBeInTheDocument())
    })
  })

  describe('onSearch', () => {
    it('fires onSearch callback when typing', async () => {
      const mockOnSearch = jest.fn()
      renderWithProvider(<Select options={countriesOptions} showSearch onSearch={mockOnSearch} />)

      fireEvent.mouseDown(screen.getByRole('combobox'))
      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'test' } })

      await waitFor(() => {
        expect(mockOnSearch).toHaveBeenCalledWith('test')
      })
    })
  })

  describe('Defensive branches (captured callbacks)', () => {
    it('handles onSelectChanged with undefined option', () => {
      const mockOnChange = jest.fn()
      renderWithProvider(<Select options={sampleOptions} onChange={mockOnChange} defaultValue='option1' />)

      expect(capturedOnChange).toBeDefined()
      capturedOnChange!('cleared_value', undefined)

      expect(mockOnChange).toHaveBeenCalledWith('cleared_value', undefined)
    })

    it('handles filterOption with undefined option', () => {
      renderWithProvider(<Select options={sampleOptions} showSearch />)

      expect(typeof capturedFilterOption).toBe('function')
      expect((capturedFilterOption as Function)('test', undefined)).toBe(false)
    })
  })

  describe('Styled components', () => {
    it('renders SuffixIcon with disabled color', () => {
      const { container } = render(<SuffixIcon disabled name='caretDown' width={16} height={16} />)
      expect(container.firstChild).toBeInTheDocument()
    })
  })
})
