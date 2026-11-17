import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Accordion from './Accordion'

describe('Accordion Component', () => {
  const items = [
    { key: '1', header: 'Header 1', content: <div>Content 1</div>, headerIndex: 1 },
    { key: '2', header: 'Header 2', content: <div>Content 2</div> },
  ]

  // Helper to always pass required id and items; also allow passing custom props
  const renderAccordion = (props: Partial<React.ComponentProps<typeof Accordion>> = {}) =>
    render(<Accordion id='acc-test' items={items as any} {...props} />)

  // Helper: click header by its text (clicks bubble to AntD header)
  const clickHeader = (text: string) => {
    const headerNode = screen.getByText(text)
    fireEvent.click(headerNode)
  }

  it('respects defaultActiveKey (panels start open accordingly)', async () => {
    // Opens the specified panel on initial render
    renderAccordion({ defaultActiveKey: ['1'] })

    await waitFor(() => {
      expect(screen.getByText('Content 1')).toBeInTheDocument()
    })
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument()
  })

  it('does not toggle when disabled=true', async () => {
    // Prevents toggling when the accordion is disabled
    renderAccordion({ disabled: true })

    expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
    clickHeader('Header 1')

    // Content should remain hidden because the panel is disabled
    await waitFor(() => {
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
    })
  })

  describe('expandIcon - "radio"', () => {
    it('shows a Radio and reflects checked state based on panel activity', async () => {
      // Radio icon renders unchecked when closed and checked when open
      renderAccordion({ expandIcon: 'radio' })

      // Find the first radio input (AntD renders <input type="radio" .../>)
      const radioBefore = document.querySelectorAll('input[type="radio"]')[0] || screen.getAllByRole('radio')[0]
      expect((radioBefore as HTMLInputElement).checked).toBe(false)

      clickHeader('Header 1')

      await waitFor(() => {
        const radioAfter = document.querySelectorAll('input[type="radio"]')[0] || screen.getAllByRole('radio')[0]
        expect((radioAfter as HTMLInputElement).checked).toBe(true)
      })
    })
  })

  describe('expandIcon - function', () => {
    it('calls the provided function with isActive and renders its return', async () => {
      // Custom function receives isActive and re-renders as the state changes
      const iconFn = jest.fn((isActive: boolean) => (
        <span data-testid='custom-fn-icon' data-active={String(isActive)} />
      ))

      renderAccordion({ expandIcon: iconFn as any })

      // It is called for each panel at initial render
      expect(iconFn).toHaveBeenCalled()
      // First panel should render with isActive=false initially
      const iconInitial = screen.getAllByTestId('custom-fn-icon')[0]
      expect(iconInitial).toHaveAttribute('data-active', 'false')

      clickHeader('Header 1')

      await waitFor(() => {
        const iconAfter = screen.getAllByTestId('custom-fn-icon')[0]
        expect(iconAfter).toHaveAttribute('data-active', 'true')
      })

      // Assert the function has been called with both false and true at some point
      const calls = iconFn.mock.calls.map(args => args[0])
      expect(calls).toContain(false)
      expect(calls).toContain(true)
    })
  })

  describe('expandIcon - ReactNode', () => {
    it('renders the provided ReactNode as-is (one per panel)', () => {
      // Renders a static ReactNode icon for each panel
      const node = <span data-testid='custom-node-icon' />
      renderAccordion({ expandIcon: node })

      const icons = screen.getAllByTestId('custom-node-icon')
      expect(icons.length).toBe(2)
    })
  })

  it('forwards className and style to the Collapse root element', () => {
    // Forwards custom class and inline style to AntD Collapse root
    const { container } = renderAccordion({
      className: 'amadeus-collapse my-collapse',
      style: { border: '2px dashed tomato' },
    })

    // AntD puts classes on its root element; search by our custom class
    const collapseRoot = container.querySelector('.amadeus-collapse') as HTMLElement
    expect(collapseRoot).toBeInTheDocument()
    expect(collapseRoot).toHaveClass('my-collapse')
    expect(collapseRoot).toHaveStyle('border: 2px dashed tomato')
  })

  it('accepts expandIconPosition and ghost props without breaking behavior', async () => {
    // Sanity: props are accepted and interaction still works
    renderAccordion({ expandIconPosition: 'start', ghost: true })

    expect(screen.queryByText('Content 2')).not.toBeInTheDocument()
    clickHeader('Header 2')

    await waitFor(() => {
      expect(screen.getByText('Content 2')).toBeInTheDocument()
    })
  })
})
