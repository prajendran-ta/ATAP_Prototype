import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { Checkbox } from '.'

const meta: Meta<typeof Checkbox> = {
  title: 'Design Factory/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Checkbox component built on top of [Ant Design Checkbox](https://ant.design/components/checkbox) aligned with Design Factory styles.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    onChange: {
      action: 'onChange',
      description: 'Callback triggered when the checkbox state changes',
    },
    children: {
      control: 'text',
      description: 'Label content rendered next to the checkbox',
    },
  },
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {
    children: 'Checkbox label',
  },
}

export const Checked: Story = {
  args: {
    checked: true,
    children: 'Checked',
  },
}

export const Unchecked: Story = {
  args: {
    checked: false,
    children: 'Unchecked',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
}

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    children: 'Disabled & Checked',
  },
}

export const Controlled: Story = {
  render: args => {
    const [checked, setChecked] = useState(false)
    return (
      <Checkbox {...args} checked={checked} onChange={e => setChecked(e.target.checked)}>
        {checked ? 'Checked' : 'Unchecked'} (click to toggle)
      </Checkbox>
    )
  },
}
