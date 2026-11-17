import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { Tag } from '.'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Tag> = {
  title: 'Design Factory/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'This tag component built on top of [Ant Design Tag](https://ant.design/components/tag) aligned with [Design Factory v19 mockups](https://www.figma.com/design/iT2v9x2YJj2LQAYmZRAy7x/Design-Factory-v19?node-id=13723-147622&t=8EPUEKuk6mqKYGU3-0).',
      },
    },
  },
  decorators: [
    Story => (
      <div style={{ padding: '20px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Tag content',
    },
    color: {
      control: 'text',
      description: 'Custom color for the tag (hex color). If not provided, color is derived from the status prop.',
    },
    status: {
      control: 'select',
      options: ['default', 'primary', 'helper', 'success', 'error', 'warning', 'disabled'],
      description: 'Predefined status color scheme. Default is `"primary"`.',
    },
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Primary',
    status: 'primary',
  },
}

export const Success: Story = {
  args: {
    children: 'Success',
    status: 'success',
  },
}

export const Error: Story = {
  args: {
    children: 'Error',
    status: 'error',
  },
}

export const Warning: Story = {
  args: {
    children: 'Warning',
    status: 'warning',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    status: 'disabled',
  },
}

export const CustomColor: Story = {
  args: {
    children: 'Custom Color',
    color: '#722ed1',
  },
}

export const Closable: Story = {
  args: {
    children: 'Closable Tag',
    onClose: () => console.log('Tag closed'),
  },
  argTypes: {
    onClose: {
      action: 'closed',
      description: 'Callback function when tag is closed (makes tag closable)',
    },
  },
}

// Multiple Tags Overview
export const AllStatuses: Story = {
  render: () => (
    <>
      <Tag status='primary'>Primary</Tag>
      <Tag status='success'>Success</Tag>
      <Tag status='error'>Error</Tag>
      <Tag status='warning'>Warning</Tag>
      <Tag status='helper'>Helper</Tag>
      <Tag status='disabled'>Disabled</Tag>
    </>
  ),
}
