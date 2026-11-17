import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { Input } from '.'

const meta: Meta<typeof Input> = {
  title: 'Design Factory/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'This input component built on top of [Ant Design Input](https://ant.design/components/input) aligned with [Design Factory v19 mockups](https://www.figma.com/design/iT2v9x2YJj2LQAYmZRAy7x/Design-Factory-v19?node-id=13723-147695&t=Dp2ywOfenu0op2KJ-0).',
      },
    },
  },
  decorators: [
    Story => (
      <div style={{ width: '300px' }}>
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
      control: 'text',
      description: 'Controlled value',
    },
    defaultValue: {
      control: 'text',
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
    addonAfter: {
      control: 'text',
      description: 'Content to show after input',
    },
    addonBefore: {
      control: 'text',
      description: 'Content to show before input',
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
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithLabel: Story = {
  args: {
    label: 'Label',
  },
}

export const Required: Story = {
  args: {
    label: 'Label',
    required: true,
  },
}

export const WithHelperMessage: Story = {
  args: {
    label: 'Input with Helper',
    helperMessage: 'This is a helpful message to guide the user.',
  },
}

export const WithWarning: Story = {
  args: {
    label: 'Warning Input',
    status: 'warning',
    warningMessage: 'This input has a warning.',
  },
}

export const WithError: Story = {
  args: {
    label: 'Error Input',
    status: 'error',
    errorMessage: 'This field is required.',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    disabled: true,
  },
}

export const WithAddonBefore: Story = {
  args: {
    label: 'URL Input',
    addonBefore: 'https://',
  },
}

export const WithAddonAfter: Story = {
  args: {
    label: 'Email Input',
    addonAfter: '@amadeus.com',
  },
}
