import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Tab from './Tab'
import type { TabItem } from './Tab.d'

const meta: Meta<typeof Tab> = {
  title: 'Design Factory/Tab',
  component: Tab,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Tab>

const items: TabItem[] = [
  { key: 'paid', label: 'Paidsearch', children: 'Paidsearch content' },
  { key: 'display', label: 'Display', children: 'Display content' },
  { key: 'social', label: 'Social', children: 'Social content' },
  { key: 'video', label: 'Video', children: 'Video content' },
  { key: 'meta', label: 'Metasearch', children: 'Metasearch content' },
]

export const Default: Story = {
  args: {
    items,
  },
}

export const Controlled: Story = {
  render: args => {
    const [activeKey, setActiveKey] = React.useState('paid')

    return <Tab {...args} items={items} activeKey={activeKey} onChange={setActiveKey} />
  },
}

export const DefaultActiveKey: Story = {
  args: {
    items,
    defaultActiveKey: 'display',
  },
}
