import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
// Component
import Button from './Button'
// Types
import type { ButtonProps } from './Button.d'

describe('Button Component', () => {
  describe('children rendering', () => {
    it('renders children correctly', () => {
      const testText = 'Test Button Text'
      render(<Button>{testText}</Button>)
      expect(screen.getByText(testText)).toBeInTheDocument()
    })
    it('renders nested children', () => {
      render(
        <Button>
          <span>Text</span>
          <span>Icon</span>
        </Button>,
      )
      expect(screen.getByText('Text')).toBeInTheDocument()
      expect(screen.getByText('Icon')).toBeInTheDocument()
    })

    // Test available variants
    describe('variant prop', () => {
      const variants: ButtonProps['variant'][] = ['solid', 'outlined', 'text']

      variants.forEach(variant => {
        it(`renders with ${variant} variant`, () => {
          render(<Button variant={variant}>Button</Button>)
          const button = screen.getByRole('button')
          expect(button).toBeInTheDocument()
        })
      })
    })

    // Test available colors
    describe('color prop', () => {
      const colors: ButtonProps['color'][] = ['primary', 'danger']

      colors.forEach(color => {
        it(`renders with ${color} color`, () => {
          render(<Button color={color}>Button</Button>)
          const button = screen.getByRole('button')
          expect(button).toBeInTheDocument()
        })
      })
    })

    // Test click event handling
    it('calls onClick handler when clicked', () => {
      const mockOnClick = jest.fn()
      render(<Button onClick={mockOnClick}>Clickable Button</Button>)
      const button = screen.getByRole('button')
      fireEvent.click(button)
      expect(mockOnClick).toHaveBeenCalledTimes(1)
    })
  })
})
