import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { Stepper } from '.'

const meta: Meta<typeof Stepper> = {
  title: 'Design Factory/Stepper',
  component: Stepper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'This stepper component built on top of [Ant Design Steps](https://ant.design/components/steps) aligned with [Design Factory v19 mockups](https://www.figma.com/design/iT2v9x2YJj2LQAYmZRAy7x/Design-Factory-v19?node-id=13723-147795&t=M9iW9fQHws5Nr841-0).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of step items with title and description',
    },
    current: {
      control: 'number',
      description: 'Current step index (0-based)',
    },
    status: {
      control: 'select',
      options: ['wait', 'process', 'finish', 'error'],
      description: 'Status of the current step',
    },
    onChange: {
      action: 'step changed',
      description: 'Callback when step is clicked',
    },
    fullWidth: {
      control: 'boolean',
      description: 'If true, the stepper will take the full width of its container',
    },
  },
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

const defaultItems = [
  {
    title: 'Step 1',
    description: 'Step description',
  },
  {
    title: 'Step 2',
    description: 'Step description',
  },
  {
    title: 'Step 3',
    description: 'Step description',
  },
]

// Basic Stepper
export const Default: Story = {
  args: {
    items: defaultItems,
    current: 0,
    fullWidth: true,
  },
}

export const InProgress: Story = {
  args: {
    items: defaultItems,
    current: 1,
  },
}

export const Completed: Story = {
  args: {
    items: defaultItems,
    current: 2,
    status: 'finish',
  },
}

export const WithError: Story = {
  args: {
    items: defaultItems,
    current: 1,
    status: 'error',
  },
}
