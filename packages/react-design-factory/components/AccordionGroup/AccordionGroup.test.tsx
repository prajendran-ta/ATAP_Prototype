import React from 'react'
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import AccordionGroup from './AccordionGroup'

describe('AccordionGroup Component', () => {
  const baseItems = [
    { key: '1', header: 'Header 1', content: <div>Content 1</div> },
    { key: '2', header: 'Header 2', content: <div>Content 2</div> },
  ]

  const renderGroup = (props: Partial<React.ComponentProps<typeof AccordionGroup>> = {}, items = baseItems) =>
    render(<AccordionGroup id='acc-group' items={items as any} {...props} />)

  const clickHeader = (text: string) => {
    const node = screen.getByText(text)
    fireEvent.click(node)
  }

  it('renders item headers as provided when withHeaderIndex=false', () => {
    renderGroup()

    expect(screen.getByText('Header 1')).toBeInTheDocument()
    expect(screen.getByText('Header 2')).toBeInTheDocument()

    // No index numbers should be visible
    expect(screen.queryByText('1')).not.toBeInTheDocument()
    expect(screen.queryByText('2')).not.toBeInTheDocument()
  })

  it('wraps headers and injects sequential index when withHeaderIndex=true', () => {
    renderGroup({ withHeaderIndex: true })

    // Indexes should be visible before headers
    const header1 = screen.getByText('Header 1')
    const header2 = screen.getByText('Header 2')

    const wrapper1 = header1.closest('div')
    const wrapper2 = header2.closest('div')

    expect(within(wrapper1!).getByText('1')).toBeInTheDocument()
    expect(within(wrapper2!).getByText('2')).toBeInTheDocument()
  })

  it('respects defaultActiveKey (opens specified panels initially)', async () => {
    renderGroup({ defaultActiveKey: ['1'] })

    await waitFor(() => {
      expect(screen.getByText('Content 1')).toBeInTheDocument()
    })
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument()
  })

  it('does not open items when disabled=true', async () => {
    renderGroup({ disabled: true })

    clickHeader('Header 1')
    await waitFor(() => {
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
    })
  })

  it('forwards className and style to the Collapse root', () => {
    const { container } = renderGroup({
      className: 'amadeus-collapse my-collapse',
      style: { border: '2px dashed tomato' },
    })

    const root = container.querySelector('.amadeus-collapse') as HTMLElement
    expect(root).toBeInTheDocument()
    expect(root).toHaveClass('my-collapse')
    expect(root).toHaveStyle('border: 2px dashed tomato')
  })

  it('accepts expandIconPosition and ghost without breaking interaction', async () => {
    const { container } = renderGroup({ expandIconPosition: 'start', ghost: true })

    const antRoot = container.querySelector('.ant-collapse') as HTMLElement
    if (antRoot) {
      expect(Array.from(antRoot.classList).some(c => c.includes('ghost'))).toBe(true)
    }

    expect(screen.queryByText('Content 2')).not.toBeInTheDocument()
    clickHeader('Header 2')

    await waitFor(() => {
      expect(screen.getByText('Content 2')).toBeInTheDocument()
    })
  })
})
