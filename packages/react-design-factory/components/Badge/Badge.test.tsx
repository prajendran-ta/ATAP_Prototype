import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Badge from './Badge'

describe('Badge — basic rendering', () => {
  it('renders content text', () => {
    render(<Badge content="Active" />)

    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('renders content without a label by default', () => {
    const { container } = render(<Badge content="Active" />)

    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(container.querySelector('span + span')).not.toBeInTheDocument()
  })

  it('renders nothing interactive when onRemove is not provided', () => {
    render(<Badge content="Active" />)

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})

describe('Badge — label', () => {
  it('renders "label: content" format when both label and content are provided', () => {
    render(<Badge label="Status" content="Active" />)

    expect(screen.getByText('Status:')).toBeInTheDocument()
    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('does not render the label prefix when only content is provided', () => {
    render(<Badge content="Active" />)

    expect(screen.queryByText(/:/)).not.toBeInTheDocument()
  })

  it('renders only content when label is omitted even if content is provided', () => {
    render(<Badge content="Standalone" />)

    expect(screen.getByText('Standalone')).toBeInTheDocument()
    expect(screen.queryByText('Standalone:')).not.toBeInTheDocument()
  })
})

describe('Badge — icon', () => {
  it('renders the icon when provided', () => {
    render(<Badge content="Active" icon={<svg data-testid="badge-icon" />} />)

    expect(screen.getByTestId('badge-icon')).toBeInTheDocument()
  })

  it('does not render an icon element when icon is not provided', () => {
    const { container } = render(<Badge content="Active" />)

    expect(container.querySelector('svg')).not.toBeInTheDocument()
  })
})

describe('Badge — color', () => {
  it('applies the color as an inline style on the root element', () => {
    const { container } = render(<Badge content="Active" color="#ff0000" />)

    const root = container.firstChild as HTMLElement
    expect(root).toHaveAttribute('color', '#ff0000')
  })

  it('renders without a color attribute when color is not provided', () => {
    const { container } = render(<Badge content="Active" />)

    const root = container.firstChild as HTMLElement
    expect(root).not.toHaveAttribute('color')
  })
})

describe('Badge — onRemove', () => {
  it('renders a close button when onRemove is provided', () => {
    render(<Badge content="Active" onRemove={jest.fn()} />)

    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('calls onRemove when the close button is clicked', () => {
    const onRemove = jest.fn()
    render(<Badge content="Active" onRemove={onRemove} />)

    fireEvent.click(screen.getByRole('button'))

    expect(onRemove).toHaveBeenCalledTimes(1)
  })

  it('calls onRemove when Enter is pressed on the close button', () => {
    const onRemove = jest.fn()
    render(<Badge content="Active" onRemove={onRemove} />)

    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' })

    expect(onRemove).toHaveBeenCalledTimes(1)
  })

  it('calls onRemove when Space is pressed on the close button', () => {
    const onRemove = jest.fn()
    render(<Badge content="Active" onRemove={onRemove} />)

    fireEvent.keyDown(screen.getByRole('button'), { key: ' ' })

    expect(onRemove).toHaveBeenCalledTimes(1)
  })

  it('does not call onRemove for other key presses', () => {
    const onRemove = jest.fn()
    render(<Badge content="Active" onRemove={onRemove} />)

    fireEvent.keyDown(screen.getByRole('button'), { key: 'Tab' })

    expect(onRemove).not.toHaveBeenCalled()
  })
})

describe('Badge — closeIcon', () => {
  it('renders the default close icon (×) when closeIcon is not specified', () => {
    render(<Badge content="Active" onRemove={jest.fn()} />)

    expect(screen.getByRole('button').textContent).toBe('×')
  })

  it('renders a custom closeIcon when provided', () => {
    render(
      <Badge
        content="Active"
        onRemove={jest.fn()}
        closeIcon={<span data-testid="custom-close">✕</span>}
      />,
    )

    expect(screen.getByTestId('custom-close')).toBeInTheDocument()
  })
})
