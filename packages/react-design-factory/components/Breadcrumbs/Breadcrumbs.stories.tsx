import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { MemoryRouter } from 'react-router'
import { Breadcrumb } from '.'

const meta: Meta<typeof Breadcrumb> = {
  title: 'Design Factory/Breadcrumbs',
  component: Breadcrumb,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'This Breadcrumb component built on top of [Ant Design Breadcrumb](https://ant.design/components/breadcrumb)  aligned with [Design Factory v19 mockups](https://www.figma.com/design/iT2v9x2YJj2LQAYmZRAy7x/Design-Factory-v19?node-id=13723-147626&t=PTxswk6k3vMphX2b-0).',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <MemoryRouter initialEntries={['/home/products/category/item']}>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of breadcrumb items with title and href properties',
    },
    separator: {
      control: 'text',
      description: 'Custom separator between breadcrumb items',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { title: 'Home', href: '/home' },
      { title: 'Products', href: '/home/products' },
      { title: 'Category', href: '/home/products/category' },
      { title: 'Item Details' },
    ],
  },
}

export const Simple: Story = {
  args: {
    items: [{ title: 'Dashboard', href: '/dashboard' }, { title: 'Current Page' }],
  },
}

export const DeepNavigation: Story = {
  args: {
    items: [
      { title: 'Home', href: '/' },
      { title: 'Business Units', href: '/business-units' },
      { title: 'Marketing', href: '/business-units/marketing' },
      { title: 'Campaigns', href: '/business-units/marketing/campaigns' },
      { title: 'Q4 2024', href: '/business-units/marketing/campaigns/q4-2024' },
      { title: 'Holiday Campaign', href: '/business-units/marketing/campaigns/q4-2024/holiday' },
      { title: 'Performance Report' },
    ],
  },
}

export const SingleItem: Story = {
  args: {
    items: [{ title: 'Current Page' }],
  },
}

export const CustomSeparator: Story = {
  args: {
    separator: '/',
    items: [{ title: 'Users', href: '/users' }, { title: 'Profile', href: '/users/profile' }, { title: 'Settings' }],
  },
}

export const ArrowSeparator: Story = {
  args: {
    separator: '→',
    items: [
      { title: 'Analytics', href: '/analytics' },
      { title: 'Reports', href: '/analytics/reports' },
      { title: 'Monthly Summary' },
    ],
  },
}

export const LongTitles: Story = {
  args: {
    items: [
      { title: 'Administration Dashboard', href: '/admin' },
      { title: 'User Management and Permissions', href: '/admin/users' },
      { title: 'Advanced Configuration Settings', href: '/admin/users/config' },
      { title: 'System Integration and API Management Console' },
    ],
  },
}

export const AllVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Default Separator (&gt;)</h3>
        <Breadcrumb
          items={[
            { title: 'Home', href: '/home' },
            { title: 'Products', href: '/home/products' },
            { title: 'Current Page' },
          ]}
        />
      </div>

      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Slash Separator (/)</h3>
        <Breadcrumb
          separator='/'
          items={[
            { title: 'Users', href: '/users' },
            { title: 'Profile', href: '/users/profile' },
            { title: 'Settings' },
          ]}
        />
      </div>

      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Arrow Separator (→)</h3>
        <Breadcrumb
          separator='→'
          items={[
            { title: 'Analytics', href: '/analytics' },
            { title: 'Reports', href: '/analytics/reports' },
            { title: 'Current Report' },
          ]}
        />
      </div>

      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Single Item (No Links)</h3>
        <Breadcrumb items={[{ title: 'Standalone Page' }]} />
      </div>

      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Deep Navigation</h3>
        <Breadcrumb
          items={[
            { title: 'Root', href: '/' },
            { title: 'Level 1', href: '/level1' },
            { title: 'Level 2', href: '/level1/level2' },
            { title: 'Level 3', href: '/level1/level2/level3' },
            { title: 'Current Level' },
          ]}
        />
      </div>
    </div>
  ),
}
