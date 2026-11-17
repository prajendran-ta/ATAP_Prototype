import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { InputNumber } from '.'

const meta: Meta<typeof InputNumber> = {
  title: 'Design Factory/InputNumber',
  component: InputNumber,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'This input number component built on top of [Ant Design InputNumber](https://ant.design/components/input-number)  aligned with [Design Factory v19 mockups](https://www.figma.com/design/iT2v9x2YJj2LQAYmZRAy7x/Design-Factory-v19?node-id=13723-147633&t=R9KwvUQmKwxJ5QE1-0).',
      },
    },
  },
  decorators: [
    Story => (
      <div style={{ width: '200px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      description: 'Input ID for form association',
    },
    value: {
      control: 'number',
      description: 'Controlled value',
    },
    defaultValue: {
      control: 'number',
      description: 'Default value',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
    },
    status: {
      control: 'select',
      options: ['error', 'warning'],
      description: 'Input status',
    },
    label: {
      control: 'text',
      description: 'Input label',
    },
    required: {
      control: 'boolean',
      description: 'Show required asterisk',
    },
    helperMessage: {
      control: 'text',
      description: 'Helper message text',
    },
    warningMessage: {
      control: 'text',
      description: 'Warning message text',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message text',
    },
    addonAfter: {
      control: 'text',
      description: 'Content to show after input',
    },
    addonBefore: {
      control: 'text',
      description: 'Content to show before input',
    },
  },
} satisfies Meta<typeof InputNumber>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithLabel: Story = {
  args: {
    label: 'Number Input',
  },
}

export const Required: Story = {
  args: {
    label: 'Required Number',
    required: true,
  },
}

export const WithHelperMessage: Story = {
  args: {
    label: 'Number with Helper',
    helperMessage: 'Enter a valid number.',
  },
}

export const WithWarning: Story = {
  args: {
    label: 'Warning Number Input',
    status: 'warning',
    warningMessage: 'This input has a warning.',
  },
}

export const WithError: Story = {
  args: {
    label: 'Error Number Input',
    status: 'error',
    errorMessage: 'Please enter a valid number.',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Number Input',
    disabled: true,
  },
}

export const DisabledWithValue: Story = {
  args: {
    label: 'Disabled with Value',
    value: 42,
    disabled: true,
  },
}

export const WithAddonBefore: Story = {
  args: {
    label: 'Price Input',
    addonBefore: '$',
    placeholder: '0.00',
  },
}

export const WithAddonAfter: Story = {
  args: {
    label: 'Weight Input',
    addonAfter: 'kg',
    placeholder: '0',
  },
}

export const WithBothAddons: Story = {
  args: {
    label: 'Currency Amount',
    addonBefore: '$',
    addonAfter: 'USD',
    placeholder: '0.00',
  },
}

export const WithDefaultValue: Story = {
  args: {
    label: 'Pre-filled Number',
    defaultValue: 100,
  },
}
