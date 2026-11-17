import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Badge from './Badge'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { colors } from '../../styles/colors'

const meta: Meta<typeof Badge> = {
  title: 'Design Factory/Badge',
  component: Badge,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    label: 'Default Badge',
  },
}

export const Colored: Story = {
  args: {
    label: 'Success',
    color: colors.forest_60,
  },
}

export const WithIcon: Story = {
  args: {
    label: 'Approved',
    color: colors.forest_60,
    icon: <CheckOutlined />,
  },
}

export const Rejected: Story = {
  args: {
    label: 'Rejected',
    color: colors.crimson_60,
    icon: <CloseOutlined />,
  },
}
