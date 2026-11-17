import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { Spinner } from '.'

const meta: Meta<typeof Spinner> = {
  title: 'Design Factory/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'This spinner component built on top of [Ant Design Spin](https://ant.design/components/spin) aligned with [Design Factory v19 mockups](https://www.figma.com/design/iT2v9x2YJj2LQAYmZRAy7x/Design-Factory-v19).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    fullscreen: {
      control: 'boolean',
      description: 'Display the spinner in fullscreen mode',
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: 'Size of the spinner',
    },
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

// Basic Spinner
export const Default: Story = {
  args: {},
}

export const Small: Story = {
  args: {
    size: 'small',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
  },
}
