import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ConfigProvider } from '../..'
import Form, { FormItem, FormFields } from './Form'

const renderWithProvider = (ui: React.ReactElement) =>
  render(React.createElement(ConfigProvider, { children: ui }))

describe('Form', () => {
  describe('basic rendering', () => {
    it('renders without crashing', () => {
      renderWithProvider(
        <Form>
          <FormItem name='field'><input data-testid='basic-input' /></FormItem>
        </Form>,
      )
      expect(document.querySelector('form')).toBeInTheDocument()
      expect(screen.getByTestId('basic-input')).toBeInTheDocument()
    })
  })

  describe('name prop', () => {
    it('sets the name attribute on the form and renders the field when name is provided', () => {
      renderWithProvider(
        <Form name='my-form'>
          <FormItem name='field'><input data-testid='named-input' /></FormItem>
        </Form>,
      )
      expect(document.querySelector('form[id="my-form"]')).toBeInTheDocument()
      expect(screen.getByTestId('named-input')).toBeInTheDocument()
    })

    it('renders the field without a form name when name is not provided', () => {
      renderWithProvider(
        <Form>
          <FormItem name='field'><input data-testid='no-name-input' /></FormItem>
        </Form>,
      )
      expect(document.querySelector('form')).toBeInTheDocument()
      expect(screen.getByTestId('no-name-input')).toBeInTheDocument()
    })
  })

  describe('initialValues', () => {
    it('renders the field input and populates it with the initial value', () => {
      renderWithProvider(
        <Form initialValues={{ username: 'john' }}>
          <FormItem name='username'>
            <input data-testid='username-input' />
          </FormItem>
        </Form>,
      )
      expect(document.querySelector('form')).toBeInTheDocument()
      expect(screen.getByTestId('username-input')).toBeInTheDocument()
      expect(screen.getByTestId('username-input')).toHaveValue('john')
    })

    it('renders the field input with no value when initialValues is not provided', () => {
      renderWithProvider(
        <Form>
          <FormItem name='username'>
            <input data-testid='username-input' />
          </FormItem>
        </Form>,
      )
      expect(document.querySelector('form')).toBeInTheDocument()
      expect(screen.getByTestId('username-input')).toBeInTheDocument()
      expect(screen.getByTestId('username-input')).toHaveValue('')
    })
  })

  describe('hooks exports', () => {
    it('exports useForm', () => {
      expect(typeof Form.useForm).toBe('function')
    })

    it('exports useFormInstance', () => {
      expect(typeof Form.useFormInstance).toBe('function')
    })

    it('exports useWatch', () => {
      expect(typeof Form.useWatch).toBe('function')
    })

    it('exports Form.List', () => {
      expect(Form.List).toBeDefined()
    })

    it('exports Form.ErrorList', () => {
      expect(Form.ErrorList).toBeDefined()
    })

    it('exports Form.Provider', () => {
      expect(Form.Provider).toBeDefined()
    })

    it('exports Form.Item', () => {
      expect(Form.Item).toBeDefined()
    })

    it('exports FormItem.useStatus', () => {
      expect(typeof FormItem.useStatus).toBe('function')
    })
  })
})

describe('FormItem', () => {
  describe('basic rendering', () => {
    it('renders children inside the form item', () => {
      renderWithProvider(
        <Form>
          <FormItem name='field'>
            <input data-testid='field-input' />
          </FormItem>
        </Form>,
      )
      expect(screen.getByTestId('field-input')).toBeInTheDocument()
    })
  })

  describe('label', () => {
    it('renders a label when provided', () => {
      renderWithProvider(
        <Form>
          <FormItem name='field' label='My Label'>
            <input data-testid='labeled-input' />
          </FormItem>
        </Form>,
      )
      expect(screen.getByText('My Label')).toBeInTheDocument()
      expect(screen.getByTestId('labeled-input')).toBeInTheDocument()
    })

    it('renders without a label when not provided', () => {
      renderWithProvider(
        <Form>
          <FormItem name='field'>
            <input data-testid='no-label-input' />
          </FormItem>
        </Form>,
      )
      expect(screen.queryByRole('label')).not.toBeInTheDocument()
      expect(screen.getByTestId('no-label-input')).toBeInTheDocument()
    })
  })

  describe('colSpan', () => {
    it('wraps the field in a Grid.Col with the given span when colSpan is provided', () => {
      const { container } = renderWithProvider(
        <Form>
          <FormItem name='field' colSpan={12}>
            <input data-testid='col-input' />
          </FormItem>
        </Form>,
      )
      expect(container.querySelector('[class*="amadeus-col-"]')).toBeInTheDocument()
      expect(screen.getByTestId('col-input')).toBeInTheDocument()
    })

    it('does not add a span col class when colSpan is not provided', () => {
      const { container } = renderWithProvider(
        <Form>
          <FormItem name='field'>
            <input data-testid='no-col-input' />
          </FormItem>
        </Form>,
      )
      expect(container.querySelector('[class*="amadeus-col-"]')).not.toBeInTheDocument()
      expect(screen.getByTestId('no-col-input')).toBeInTheDocument()
    })
  })

  describe('rules and required sync', () => {
    it('syncs required rule to child RDF field when rule has required:true but field does not', () => {
      const Input = ({ required }: { required?: boolean }) => (
        <input data-testid='rdf-input' required={required} />
      )
      Input.displayName = 'Input'

      renderWithProvider(
        <Form>
          <FormItem name='field' rules={[{ required: true }]}>
            <Input />
          </FormItem>
        </Form>,
      )
      expect(screen.getByTestId('rdf-input')).toBeRequired()
    })

    it('adds required rule when child RDF field has required:true but no rule exists', () => {
      const Input = ({ required }: { required?: boolean }) => (
        <input data-testid='rdf-input2' required={required} />
      )
      Input.displayName = 'Input'

      renderWithProvider(
        <Form>
          <FormItem name='field'>
            <Input required />
          </FormItem>
        </Form>,
      )
      expect(screen.getByTestId('rdf-input2')).toBeRequired()
    })

    it('does not sync required to child when it is not an RDF form field', () => {
      const CustomInput = ({ required }: { required?: boolean }) => (
        <input data-testid='custom-input' required={required} />
      )
      CustomInput.displayName = 'CustomWidget'

      renderWithProvider(
        <Form>
          <FormItem name='field' rules={[{ required: true }]}>
            <CustomInput />
          </FormItem>
        </Form>,
      )
      expect(screen.getByTestId('custom-input')).not.toBeRequired()
    })
  })
})

describe('FormFields enum', () => {
  it('contains Button as a numeric value', () => {
    expect(typeof FormFields.Button).toBe('number')
  })

  it('contains DatePicker as a numeric value', () => {
    expect(typeof FormFields.DatePicker).toBe('number')
  })

  it('contains Input as a numeric value', () => {
    expect(typeof FormFields.Input).toBe('number')
  })

  it('contains InputNumber as a numeric value', () => {
    expect(typeof FormFields.InputNumber).toBe('number')
  })

  it('contains Select as a numeric value', () => {
    expect(typeof FormFields.Select).toBe('number')
  })

  it('does not contain unknown fields', () => {
    expect((FormFields as Record<string, unknown>)['Unknown']).toBeUndefined()
  })
})
