import React, { useState } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Stepper from './Stepper'
import type { StepperProps } from './Stepper.d'

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

const defaultItems: StepperProps['items'] = [
  { title: 'Step 1', description: 'First step' },
  { title: 'Step 2', description: 'Second step' },
  { title: 'Step 3', description: 'Third step' },
]

describe('Stepper — basic rendering', () => {
  it('renders all step titles', () => {
    render(<Stepper items={defaultItems} current={0} />)

    expect(screen.getByText('Step 1')).toBeInTheDocument()
    expect(screen.getByText('Step 2')).toBeInTheDocument()
    expect(screen.getByText('Step 3')).toBeInTheDocument()
  })

  it('renders step descriptions', () => {
    render(<Stepper items={defaultItems} current={0} />)

    expect(screen.getByText('First step')).toBeInTheDocument()
    expect(screen.getByText('Second step')).toBeInTheDocument()
    expect(screen.getByText('Third step')).toBeInTheDocument()
  })

  it('marks the correct step as active based on the current prop', () => {
    const { container } = render(<Stepper items={defaultItems} current={1} />)

    const activeItem = container.querySelector('.ant-steps-item-process')
    expect(activeItem).toBeInTheDocument()
    expect(activeItem?.textContent).toContain('Step 2')
  })

  it('calls onChange with the clicked step index', () => {
    const onChange = jest.fn()
    const { container } = render(
      <Stepper items={defaultItems} current={0} onChange={onChange} />,
    )

    const stepContainers = container.querySelectorAll('.ant-steps-item-container')
    fireEvent.click(stepContainers[2])

    expect(onChange).toHaveBeenCalledWith(2)
  })

  it('navigates back to a previous step from a later one', () => {
    const onChange = jest.fn()

    const ControlledStepper = () => {
      const [current, setCurrent] = useState(2)

      const handleChange = (step: number) => {
        setCurrent(step)
        onChange(step)
      }

      return <Stepper items={defaultItems} current={current} onChange={handleChange} />
    }

    const { container } = render(<ControlledStepper />)

    // Initially on step 3 — steps 1 and 2 should be marked as finished
    const finishedItems = container.querySelectorAll('.ant-steps-item-finish')
    expect(finishedItems).toHaveLength(2)

    // Click back to step 1 (index 0)
    const stepContainers = container.querySelectorAll('.ant-steps-item-container')
    fireEvent.click(stepContainers[0])

    expect(onChange).toHaveBeenCalledWith(0)

    // After navigating back, step 1 should now be active
    const activeItem = container.querySelector('.ant-steps-item-process')
    expect(activeItem?.textContent).toContain('Step 1')
  })
})

describe('Stepper — fullWidth', () => {
  it('applies a distinct CSS class when fullWidth is true compared to the default', () => {
    const { container: defaultContainer } = render(<Stepper items={defaultItems} current={0} />)
    const { container: fullWidthContainer } = render(<Stepper items={defaultItems} current={0} fullWidth />)

    const defaultStepper = defaultContainer.firstChild as HTMLElement
    const fullWidthStepper = fullWidthContainer.firstChild as HTMLElement

    expect(defaultStepper.className).not.toBe(fullWidthStepper.className)
  })

  it('applies the same CSS class when fullWidth is false as the default', () => {
    const { container: defaultContainer } = render(<Stepper items={defaultItems} current={0} />)
    const { container: explicitFalseContainer } = render(
      <Stepper items={defaultItems} current={0} fullWidth={false} />,
    )

    const defaultStepper = defaultContainer.firstChild as HTMLElement
    const explicitFalseStepper = explicitFalseContainer.firstChild as HTMLElement

    expect(defaultStepper.className).toBe(explicitFalseStepper.className)
  })
})
