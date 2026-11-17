import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Pagination from './Pagination'

jest.mock('../Icon', () => ({
  Icon: () => null,
}))

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

describe('Pagination — basic rendering', () => {
  it('renders the default range label and page controls', () => {
    render(<Pagination current={1} total={50} pageSize={10} />)

    expect(screen.getByText('1–10 of 50 items')).toBeInTheDocument()
  })

  it('renders with zero total showing 0–0 of 0 items', () => {
    render(<Pagination current={1} total={0} pageSize={10} />)

    expect(screen.getByText('0–0 of 0 items')).toBeInTheDocument()
  })

  it('renders the page size selector by default', () => {
    render(<Pagination current={1} total={50} pageSize={10} />)

    expect(screen.getByText('Items per page:')).toBeInTheDocument()
  })
})

describe('Pagination — range label (current, total, pageSize)', () => {
  it('displays the correct start and end item for the first page', () => {
    render(<Pagination current={1} total={100} pageSize={10} />)

    expect(screen.getByText('1–10 of 100 items')).toBeInTheDocument()
  })

  it('displays the correct range for a middle page', () => {
    render(<Pagination current={3} total={100} pageSize={10} />)

    expect(screen.getByText('21–30 of 100 items')).toBeInTheDocument()
  })

  it('displays the correct range when on the last partial page', () => {
    render(<Pagination current={4} total={35} pageSize={10} />)

    expect(screen.getByText('31–35 of 35 items')).toBeInTheDocument()
  })

  it('reflects a different pageSize in the range label', () => {
    render(<Pagination current={1} total={100} pageSize={20} />)

    expect(screen.getByText('1–20 of 100 items')).toBeInTheDocument()
  })
})

describe('Pagination — showTotal', () => {
  it('uses the custom showTotal renderer instead of the default label', () => {
    render(
      <Pagination
        current={2}
        total={50}
        pageSize={10}
        showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total}`}
      />,
    )

    expect(screen.getByText('Showing 11-20 of 50')).toBeInTheDocument()
    expect(screen.queryByText(/of \d+ items/)).not.toBeInTheDocument()
  })

  it('passes the correct range values to showTotal', () => {
    const showTotal = jest.fn(() => 'custom')
    render(<Pagination current={3} total={100} pageSize={10} showTotal={showTotal} />)

    expect(showTotal).toHaveBeenCalledWith(100, [21, 30])
  })
})

describe('Pagination — showSizeChanger', () => {
  it('hides the page size selector when showSizeChanger is false', () => {
    render(<Pagination current={1} total={50} pageSize={10} showSizeChanger={false} />)

    expect(screen.queryByText('Items per page:')).not.toBeInTheDocument()
  })

  it('shows the page size selector when showSizeChanger is true', () => {
    render(<Pagination current={1} total={50} pageSize={10} showSizeChanger={true} />)

    expect(screen.getByText('Items per page:')).toBeInTheDocument()
  })
})

describe('Pagination — pageSizeOptions', () => {
  it('opens the size selector dropdown with option items from pageSizeOptions', async () => {
    render(<Pagination current={1} total={200} pageSize={10} />)

    const sizeChangerWrapper = screen.getByText('Items per page:').closest('div') as HTMLElement
    const selector = sizeChangerWrapper?.querySelector('.ant-select-selector') as HTMLElement

    fireEvent.mouseDown(selector)

  
    await screen.findByRole('listbox')
    const options = screen.getAllByRole('option')
    expect(options.length).toBeGreaterThan(0)
    const activeOption = options.find((el) => el.textContent?.trim() === '10')
    expect(activeOption).toHaveAttribute('aria-selected', 'true')
  })

  it('renders custom pageSizeOptions — all options present for a short list', async () => {
    render(
      <Pagination current={1} total={200} pageSize={15} pageSizeOptions={[15, 30]} />,
    )

    const sizeChangerWrapper = screen.getByText('Items per page:').closest('div') as HTMLElement
    const selector = sizeChangerWrapper?.querySelector('.ant-select-selector') as HTMLElement

    fireEvent.mouseDown(selector)

    await screen.findByRole('listbox')
    const options = screen.getAllByRole('option').map((el) => Number(el.textContent?.trim()))
    expect(options).toEqual(expect.arrayContaining([15, 30]))
  })
})

describe('Pagination — onChange', () => {
  it('calls onChange with the new page number when a page navigation button is clicked', () => {
    const onChange = jest.fn()
    const { container } = render(
      <Pagination current={1} total={100} pageSize={10} onChange={onChange} />,
    )

    const nextBtn = container.querySelector('.ant-pagination-next button') as HTMLElement
    fireEvent.click(nextBtn)

    expect(onChange).toHaveBeenCalledWith(2, 10)
  })

  it('size changer dropdown shows only non-selected page size options when opened from a later page', async () => {
    render(
      <Pagination
        current={3}
        total={200}
        pageSize={10}
        onChange={jest.fn()}
        pageSizeOptions={[10, 20, 50]}
      />,
    )

    const sizeChangerWrapper = screen.getByText('Items per page:').closest('div') as HTMLElement
    const selector = sizeChangerWrapper?.querySelector('.ant-select-selector') as HTMLElement

    fireEvent.mouseDown(selector)

    await screen.findByRole('listbox')
    const selected = screen.getAllByRole('option').filter(
      (el) => el.getAttribute('aria-selected') === 'true',
    )
    expect(selected).toHaveLength(1)
    expect(selected[0].textContent?.trim()).toBe('10')
  })
})
