import React, { useState } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ToggleTab from './ToggleTab'

const originalGetComputedStyle = window.getComputedStyle.bind(window)
beforeAll(() => {
  Object.defineProperty(window, 'getComputedStyle', {
    value: (el: Element, pseudoElt?: string | null) =>
      pseudoElt ? ({} as CSSStyleDeclaration) : originalGetComputedStyle(el),
    writable: true,
    configurable: true,
  })
})

afterAll(() => {
  Object.defineProperty(window, 'getComputedStyle', {
    value: originalGetComputedStyle,
    writable: true,
    configurable: true,
  })
})

const defaultOptions = [
  { label: 'Tab A', value: 'a' },
  { label: 'Tab B', value: 'b' },
  { label: 'Tab C', value: 'c' },
]

describe('ToggleTab — basic rendering', () => {
  it('renders all tab labels', () => {
    render(<ToggleTab options={defaultOptions} value="a" />)

    expect(screen.getByText('Tab A')).toBeInTheDocument()
    expect(screen.getByText('Tab B')).toBeInTheDocument()
    expect(screen.getByText('Tab C')).toBeInTheDocument()
  })

  it('marks the correct tab as selected based on the value prop', () => {
    const { container } = render(<ToggleTab options={defaultOptions} value="b" />)

    const selectedItem = container.querySelector('.ant-segmented-item-selected')
    expect(selectedItem?.textContent).toContain('Tab B')
  })

  it('calls onChange with the selected value when a tab is clicked', () => {
    const onChange = jest.fn()
    render(<ToggleTab options={defaultOptions} value="a" onChange={onChange} />)

    fireEvent.click(screen.getByText('Tab C'))

    expect(onChange).toHaveBeenCalledWith('c')
  })

  it('updates the selected tab when controlled value changes', () => {
    const ControlledToggleTab = () => {
      const [value, setValue] = useState('a')
      return (
        <ToggleTab
          options={defaultOptions}
          value={value}
          onChange={(v) => setValue(v as string)}
        />
      )
    }

    const { container } = render(<ControlledToggleTab />)

    expect(container.querySelector('.ant-segmented-item-selected')?.textContent).toContain('Tab A')

    fireEvent.click(screen.getByText('Tab B'))

    expect(container.querySelector('.ant-segmented-item-selected')?.textContent).toContain('Tab B')
  })
})

describe('ToggleTab — options', () => {
  it('renders the correct number of tab items', () => {
    const { container } = render(<ToggleTab options={defaultOptions} value="a" />)

    expect(container.querySelectorAll('.ant-segmented-item')).toHaveLength(3)
  })

  it('renders options with React node labels', () => {
    const richOptions = [
      { label: <span data-testid="icon-tab">Icon Tab</span>, value: 'icon' },
      { label: 'Plain Tab', value: 'plain' },
    ]

    render(<ToggleTab options={richOptions} value="icon" />)

    expect(screen.getByTestId('icon-tab')).toBeInTheDocument()
    expect(screen.getByText('Plain Tab')).toBeInTheDocument()
  })

  it('renders a single option without crashing', () => {
    render(<ToggleTab options={[{ label: 'Only', value: 'only' }]} value="only" />)

    expect(screen.getByText('Only')).toBeInTheDocument()
  })
})
