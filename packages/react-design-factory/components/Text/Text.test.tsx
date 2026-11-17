import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Text } from '../..'

describe('Text Components', () => {
  describe('Heading Components', () => {
    describe('H1 Component', () => {
      it('renders children correctly', () => {
        const testText = 'Test H1 Header'
        render(<Text.H1>{testText}</Text.H1>)
        expect(screen.getByText(testText)).toBeInTheDocument()
      })

      it('renders as h1 element', () => {
        const testText = 'Test H1'
        render(<Text.H1>{testText}</Text.H1>)
        const headerElement = screen.getByText(testText)
        expect(headerElement.tagName).toBe('H1')
      })

      it('renders with nested elements', () => {
        render(
          <Text.H1>
            <strong>Bold</strong> and normal text
          </Text.H1>,
        )
        expect(screen.getByText('Bold')).toBeInTheDocument()
        expect(screen.getByText('and normal text')).toBeInTheDocument()
      })
    })

    describe('H2 Component', () => {
      it('renders children correctly', () => {
        const testText = 'Test H2 Header'
        render(<Text.H2>{testText}</Text.H2>)
        expect(screen.getByText(testText)).toBeInTheDocument()
      })

      it('renders as h2 element', () => {
        const testText = 'Test H2'
        render(<Text.H2>{testText}</Text.H2>)
        const headerElement = screen.getByText(testText)
        expect(headerElement.tagName).toBe('H2')
      })
    })

    describe('H3 Component', () => {
      it('renders children correctly', () => {
        const testText = 'Test H3 Header'
        render(<Text.H3>{testText}</Text.H3>)
        expect(screen.getByText(testText)).toBeInTheDocument()
      })

      it('renders as h3 element', () => {
        const testText = 'Test H3'
        render(<Text.H3>{testText}</Text.H3>)
        const headerElement = screen.getByText(testText)
        expect(headerElement.tagName).toBe('H3')
      })
    })

    describe('H4 Component', () => {
      it('renders children correctly', () => {
        const testText = 'Test H4 Header'
        render(<Text.H4>{testText}</Text.H4>)
        expect(screen.getByText(testText)).toBeInTheDocument()
      })

      it('renders as h4 element', () => {
        const testText = 'Test H4'
        render(<Text.H4>{testText}</Text.H4>)
        const headerElement = screen.getByText(testText)
        expect(headerElement.tagName).toBe('H4')
      })
    })

    describe('H5 Component', () => {
      it('renders children correctly', () => {
        const testText = 'Test H5 Header'
        render(<Text.H5>{testText}</Text.H5>)
        expect(screen.getByText(testText)).toBeInTheDocument()
      })

      it('renders as h5 element', () => {
        const testText = 'Test H5'
        render(<Text.H5>{testText}</Text.H5>)
        const headerElement = screen.getByText(testText)
        expect(headerElement.tagName).toBe('H5')
      })

      it('renders multiple children', () => {
        render(
          <Text.H5>
            <span>First</span>
            <span>Second</span>
          </Text.H5>,
        )
        expect(screen.getByText('First')).toBeInTheDocument()
        expect(screen.getByText('Second')).toBeInTheDocument()
      })
    })

    describe('H6 Component', () => {
      it('renders children correctly', () => {
        const testText = 'Test H6 Header'
        render(<Text.H6>{testText}</Text.H6>)
        expect(screen.getByText(testText)).toBeInTheDocument()
      })

      it('renders as h6 element', () => {
        const testText = 'Test H6'
        render(<Text.H6>{testText}</Text.H6>)
        const headerElement = screen.getByText(testText)
        expect(headerElement.tagName).toBe('H6')
      })
    })
  })

  describe('Label Component', () => {
    it('renders children correctly', () => {
      const testText = 'Test Label'
      render(<Text.Label>{testText}</Text.Label>)
      expect(screen.getByText(testText)).toBeInTheDocument()
    })

    it('renders as label element', () => {
      const testText = 'Test Label'
      render(<Text.Label>{testText}</Text.Label>)
      const labelElement = screen.getByText(testText)
      expect(labelElement.tagName).toBe('LABEL')
    })

    it('renders with htmlFor attribute', () => {
      const testText = 'Email Label'
      const htmlForValue = 'email-input'
      render(<Text.Label htmlFor={htmlForValue}>{testText}</Text.Label>)
      const labelElement = screen.getByText(testText)
      expect(labelElement).toHaveAttribute('for', htmlForValue)
    })

    it('renders without htmlFor attribute', () => {
      const testText = 'Test Label'
      render(<Text.Label>{testText}</Text.Label>)
      const labelElement = screen.getByText(testText)
      expect(labelElement).not.toHaveAttribute('for')
    })

    it('renders with nested elements', () => {
      render(
        <Text.Label>
          <span>Required</span> Field
        </Text.Label>,
      )
      expect(screen.getByText('Required')).toBeInTheDocument()
      expect(screen.getByText('Field')).toBeInTheDocument()
    })

    describe('Label Types', () => {
      it('renders with primary type', () => {
        const testText = 'Primary Label'
        render(<Text.Label status='primary'>{testText}</Text.Label>)
        expect(screen.getByText(testText)).toBeInTheDocument()
      })

      it('renders with helper type', () => {
        const testText = 'Helper Label'
        render(<Text.Label status='helper'>{testText}</Text.Label>)
        expect(screen.getByText(testText)).toBeInTheDocument()
      })

      it('renders with warning type', () => {
        const testText = 'Warning Label'
        render(<Text.Label status='warning'>{testText}</Text.Label>)
        expect(screen.getByText(testText)).toBeInTheDocument()
      })

      it('renders with error type', () => {
        const testText = 'Error Label'
        render(<Text.Label status='error'>{testText}</Text.Label>)
        expect(screen.getByText(testText)).toBeInTheDocument()
      })

      it('renders with both htmlFor and type props', () => {
        const testText = 'Required Field'
        render(
          <Text.Label htmlFor='field-id' status='error'>
            {testText}
          </Text.Label>,
        )
        const labelElement = screen.getByText(testText)
        expect(labelElement).toHaveAttribute('for', 'field-id')
        expect(labelElement).toBeInTheDocument()
      })
    })
  })

  describe('Body Component', () => {
    it('renders children correctly', () => {
      const testText = 'Test Body Text'
      render(<Text.Body>{testText}</Text.Body>)
      expect(screen.getByText(testText)).toBeInTheDocument()
    })

    it('renders as span element', () => {
      const testText = 'Test Body'
      render(<Text.Body>{testText}</Text.Body>)
      const bodyElement = screen.getByText(testText)
      expect(bodyElement.tagName).toBe('SPAN')
    })

    it('renders with nested elements', () => {
      render(
        <Text.Body>
          <strong>Bold</strong> and normal text
        </Text.Body>,
      )
      expect(screen.getByText('Bold')).toBeInTheDocument()
      expect(screen.getByText('and normal text')).toBeInTheDocument()
    })

    it('renders long text content', () => {
      const longText =
        'This is a very long paragraph that contains multiple sentences. It should render correctly regardless of the length of the content provided to it.'
      render(<Text.Body>{longText}</Text.Body>)
      expect(screen.getByText(longText)).toBeInTheDocument()
    })

    it('renders multiple paragraphs', () => {
      render(
        <div>
          <Text.Body>First paragraph</Text.Body>
          <Text.Body>Second paragraph</Text.Body>
        </div>,
      )
      expect(screen.getByText('First paragraph')).toBeInTheDocument()
      expect(screen.getByText('Second paragraph')).toBeInTheDocument()
    })
  })

  describe('Placeholder Component', () => {
    it('renders children correctly', () => {
      const testText = 'Enter text here...'
      render(<Text.Placeholder>{testText}</Text.Placeholder>)
      expect(screen.getByText(testText)).toBeInTheDocument()
    })

    it('renders with empty children', () => {
      const { container } = render(<Text.Placeholder></Text.Placeholder>)
      const placeholderElement = container.firstChild
      expect(placeholderElement).toBeInTheDocument()
    })

    it('renders with nested elements', () => {
      render(
        <Text.Placeholder>
          <em>Italic</em> placeholder
        </Text.Placeholder>,
      )
      expect(screen.getByText('Italic')).toBeInTheDocument()
      expect(screen.getByText('placeholder')).toBeInTheDocument()
    })

    it('renders multiple children', () => {
      render(
        <Text.Placeholder>
          <span>First</span>
          <span>Second</span>
        </Text.Placeholder>,
      )
      expect(screen.getByText('First')).toBeInTheDocument()
      expect(screen.getByText('Second')).toBeInTheDocument()
    })
  })

  describe('Helper Component', () => {
    it('renders children correctly without type', () => {
      const testText = 'This is helper text'
      render(<Text.Helper>{testText}</Text.Helper>)
      expect(screen.getByText(testText)).toBeInTheDocument()
    })

    it('renders with empty children', () => {
      const { container } = render(<Text.Helper></Text.Helper>)
      const helperElement = container.firstChild
      expect(helperElement).toBeInTheDocument()
    })

    it('renders with nested elements', () => {
      render(
        <Text.Helper>
          <span>Helpful</span> information
        </Text.Helper>,
      )
      expect(screen.getByText('Helpful')).toBeInTheDocument()
      expect(screen.getByText('information')).toBeInTheDocument()
    })

    it('renders long helper text', () => {
      const longText =
        'This is a very long helper text that provides detailed information about how to use this field correctly.'
      render(<Text.Helper>{longText}</Text.Helper>)
      expect(screen.getByText(longText)).toBeInTheDocument()
    })

    describe('Helper Types', () => {
      it('renders with helper type', () => {
        const testText = 'This is helper text'
        render(<Text.Helper status='helper'>{testText}</Text.Helper>)
        expect(screen.getByText(testText)).toBeInTheDocument()
      })

      it('renders with primary type', () => {
        const testText = 'This is primary helper text'
        render(<Text.Helper status='primary'>{testText}</Text.Helper>)
        expect(screen.getByText(testText)).toBeInTheDocument()
      })

      it('renders with warning type', () => {
        const testText = 'This is a warning'
        render(<Text.Helper status='warning'>{testText}</Text.Helper>)
        expect(screen.getByText(testText)).toBeInTheDocument()
      })

      it('renders with error type', () => {
        const testText = 'This field is required'
        render(<Text.Helper status='error'>{testText}</Text.Helper>)
        expect(screen.getByText(testText)).toBeInTheDocument()
      })

      it('renders multiple helpers with different types', () => {
        render(
          <div>
            <Text.Helper status='helper'>Helper message</Text.Helper>
            <Text.Helper status='warning'>Warning message</Text.Helper>
            <Text.Helper status='error'>Error message</Text.Helper>
          </div>,
        )
        expect(screen.getByText('Helper message')).toBeInTheDocument()
        expect(screen.getByText('Warning message')).toBeInTheDocument()
        expect(screen.getByText('Error message')).toBeInTheDocument()
      })
    })

    describe('Error Helper', () => {
      it('renders with empty children', () => {
        const { container } = render(<Text.Helper status='error'></Text.Helper>)
        const errorElement = container.firstChild
        expect(errorElement).toBeInTheDocument()
      })

      it('renders with nested elements', () => {
        render(
          <Text.Helper status='error'>
            <strong>Error:</strong> Invalid input
          </Text.Helper>,
        )
        expect(screen.getByText('Error:')).toBeInTheDocument()
        expect(screen.getByText('Invalid input')).toBeInTheDocument()
      })

      it('renders multiple error messages', () => {
        render(
          <div>
            <Text.Helper status='error'>First error</Text.Helper>
            <Text.Helper status='error'>Second error</Text.Helper>
          </div>,
        )
        expect(screen.getByText('First error')).toBeInTheDocument()
        expect(screen.getByText('Second error')).toBeInTheDocument()
      })
    })

    describe('Warning Helper', () => {
      it('renders with empty children', () => {
        const { container } = render(<Text.Helper status='warning'></Text.Helper>)
        const warningElement = container.firstChild
        expect(warningElement).toBeInTheDocument()
      })

      it('renders with nested elements', () => {
        render(
          <Text.Helper status='warning'>
            <span>Warning:</span> Be careful
          </Text.Helper>,
        )
        expect(screen.getByText('Warning:')).toBeInTheDocument()
        expect(screen.getByText('Be careful')).toBeInTheDocument()
      })

      it('renders long warning text', () => {
        const longText =
          'This is a very long warning message that provides detailed information about potential risks or considerations that users should be aware of.'
        render(<Text.Helper status='warning'>{longText}</Text.Helper>)
        expect(screen.getByText(longText)).toBeInTheDocument()
      })

      it('renders multiple warnings', () => {
        render(
          <div>
            <Text.Helper status='warning'>First warning</Text.Helper>
            <Text.Helper status='warning'>Second warning</Text.Helper>
          </div>,
        )
        expect(screen.getByText('First warning')).toBeInTheDocument()
        expect(screen.getByText('Second warning')).toBeInTheDocument()
      })
    })
  })

  // Integration tests to ensure all components work together
  describe('Integration Tests', () => {
    it('renders all text components together', () => {
      render(
        <div>
          <Text.H1>Main Header</Text.H1>
          <Text.H2>Section Header</Text.H2>
          <Text.H3>Subsection Header</Text.H3>
          <Text.H4>Component Header</Text.H4>
          <Text.H5>Small Header</Text.H5>
          <Text.H6>Smallest Header</Text.H6>
          <Text.Body>Some body text</Text.Body>
          <Text.Label htmlFor='test'>Form Label</Text.Label>
          <Text.Placeholder>Placeholder text</Text.Placeholder>
          <Text.Helper>Helper text</Text.Helper>
          <Text.Helper status='primary'>Primary helper</Text.Helper>
          <Text.Helper status='error'>Error message</Text.Helper>
          <Text.Helper status='warning'>Warning message</Text.Helper>
        </div>,
      )

      expect(screen.getByText('Main Header')).toBeInTheDocument()
      expect(screen.getByText('Section Header')).toBeInTheDocument()
      expect(screen.getByText('Subsection Header')).toBeInTheDocument()
      expect(screen.getByText('Component Header')).toBeInTheDocument()
      expect(screen.getByText('Small Header')).toBeInTheDocument()
      expect(screen.getByText('Smallest Header')).toBeInTheDocument()
      expect(screen.getByText('Some body text')).toBeInTheDocument()
      expect(screen.getByText('Form Label')).toBeInTheDocument()
      expect(screen.getByText('Placeholder text')).toBeInTheDocument()
      expect(screen.getByText('Helper text')).toBeInTheDocument()
      expect(screen.getByText('Primary helper')).toBeInTheDocument()
      expect(screen.getByText('Error message')).toBeInTheDocument()
      expect(screen.getByText('Warning message')).toBeInTheDocument()
    })

    it('renders all heading levels with correct HTML tags', () => {
      render(
        <div>
          <Text.H1>H1 Text</Text.H1>
          <Text.H2>H2 Text</Text.H2>
          <Text.H3>H3 Text</Text.H3>
          <Text.H4>H4 Text</Text.H4>
          <Text.H5>H5 Text</Text.H5>
          <Text.H6>H6 Text</Text.H6>
        </div>,
      )

      expect(screen.getByText('H1 Text').tagName).toBe('H1')
      expect(screen.getByText('H2 Text').tagName).toBe('H2')
      expect(screen.getByText('H3 Text').tagName).toBe('H3')
      expect(screen.getByText('H4 Text').tagName).toBe('H4')
      expect(screen.getByText('H5 Text').tagName).toBe('H5')
      expect(screen.getByText('H6 Text').tagName).toBe('H6')
    })

    it('renders all helper types correctly', () => {
      render(
        <div>
          <Text.Helper>Default helper</Text.Helper>
          <Text.Helper status='helper'>Helper type</Text.Helper>
          <Text.Helper status='primary'>Primary type</Text.Helper>
          <Text.Helper status='warning'>Warning type</Text.Helper>
          <Text.Helper status='error'>Error type</Text.Helper>
        </div>,
      )

      expect(screen.getByText('Default helper')).toBeInTheDocument()
      expect(screen.getByText('Helper type')).toBeInTheDocument()
      expect(screen.getByText('Primary type')).toBeInTheDocument()
      expect(screen.getByText('Warning type')).toBeInTheDocument()
      expect(screen.getByText('Error type')).toBeInTheDocument()
    })

    it('renders all label types correctly', () => {
      render(
        <div>
          <Text.Label>Default label</Text.Label>
          <Text.Label status='primary'>Primary label</Text.Label>
          <Text.Label status='helper'>Helper label</Text.Label>
          <Text.Label status='warning'>Warning label</Text.Label>
          <Text.Label status='error'>Error label</Text.Label>
        </div>,
      )

      expect(screen.getByText('Default label')).toBeInTheDocument()
      expect(screen.getByText('Primary label')).toBeInTheDocument()
      expect(screen.getByText('Helper label')).toBeInTheDocument()
      expect(screen.getByText('Warning label')).toBeInTheDocument()
      expect(screen.getByText('Error label')).toBeInTheDocument()
    })

    it('handles undefined and null children gracefully', () => {
      render(
        <div>
          <Text.H1>{undefined}</Text.H1>
          <Text.H2>{null}</Text.H2>
          <Text.H3>{undefined}</Text.H3>
          <Text.H4>{null}</Text.H4>
          <Text.H5>{undefined}</Text.H5>
          <Text.H6>{null}</Text.H6>
          <Text.Body>{undefined}</Text.Body>
          <Text.Label>{null}</Text.Label>
          <Text.Placeholder>{undefined}</Text.Placeholder>
          <Text.Helper>{null}</Text.Helper>
          <Text.Helper status='error'>{undefined}</Text.Helper>
          <Text.Helper status='warning'>{null}</Text.Helper>
        </div>,
      )

      // Components should still render even with null/undefined children
      expect(document.querySelector('h1')).toBeInTheDocument()
      expect(document.querySelector('h2')).toBeInTheDocument()
      expect(document.querySelector('h3')).toBeInTheDocument()
      expect(document.querySelector('h4')).toBeInTheDocument()
      expect(document.querySelector('h5')).toBeInTheDocument()
      expect(document.querySelector('h6')).toBeInTheDocument()
      expect(document.querySelector('span')).toBeInTheDocument() // Body component renders as span
      expect(document.querySelector('label')).toBeInTheDocument()
    })

    it('works in form context with labels and helpers', () => {
      render(
        <form>
          <div>
            <Text.Label htmlFor='email' status='primary'>
              Email Address
            </Text.Label>
            <input id='email' type='email' />
            <Text.Helper status='helper'>Enter your email address</Text.Helper>
          </div>
          <div>
            <Text.Label htmlFor='password' status='error'>
              Password
            </Text.Label>
            <input id='password' type='password' />
            <Text.Helper status='error'>Password is required</Text.Helper>
          </div>
        </form>,
      )

      const emailLabel = screen.getByText('Email Address')
      const passwordLabel = screen.getByText('Password')

      expect(emailLabel).toHaveAttribute('for', 'email')
      expect(passwordLabel).toHaveAttribute('for', 'password')
      expect(screen.getByText('Enter your email address')).toBeInTheDocument()
      expect(screen.getByText('Password is required')).toBeInTheDocument()
    })
  })
})
