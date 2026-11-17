import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import SidebarMenu from './SidebarMenu'
import type { SidebarMenuNode, SidebarMenuProps } from './SidebarMenu.d'
import HomeOutlined from '@ant-design/icons/HomeOutlined'
import TeamOutlined from '@ant-design/icons/TeamOutlined'
import ProfileOutlined from '@ant-design/icons/ProfileOutlined'
import AppstoreOutlined from '@ant-design/icons/AppstoreOutlined'
import LineChartOutlined from '@ant-design/icons/LineChartOutlined'
import FileTextOutlined from '@ant-design/icons/FileTextOutlined'
import DatabaseOutlined from '@ant-design/icons/DatabaseOutlined'
import UserOutlined from '@ant-design/icons/UserOutlined'
import BookOutlined from '@ant-design/icons/BookOutlined'
import BellOutlined from '@ant-design/icons/BellOutlined'
import ProjectOutlined from '@ant-design/icons/ProjectOutlined'

const menuItems: SidebarMenuNode[] = [
  { key: 'home', label: 'Home', icon: <HomeOutlined /> },
  { key: 'advertisers', label: 'Advertisers/Clients', icon: <TeamOutlined /> },
  {
    key: 'media',
    label: 'Media Planner',
    icon: <ProfileOutlined />,
    children: [
      { key: 'media1', label: 'Option 1' },
      { key: 'media2', label: 'Option 2' },
    ],
  },
  {
    key: 'campaign',
    label: 'Campaign Management',
    icon: <AppstoreOutlined />,
    children: [{ key: 'campaign1', label: 'Create Campaign' }],
  },
  {
    key: 'monitoring',
    label: 'Campaign Monitoring & Reporting',
    icon: <LineChartOutlined />,
    children: [{ key: 'monitoring1', label: 'Reports' }],
  },
  { key: 'insights', label: 'Market Insights', icon: <LineChartOutlined /> },
  {
    key: 'optimization',
    label: 'Campaign Monitoring & Pacing',
    icon: <FileTextOutlined />,
    children: [{ key: 'monitoring2', label: 'Budget Adjustments' }],
  },
  {
    key: 'data',
    label: 'Data Management',
    icon: <DatabaseOutlined />,
    children: [{ key: 'data1', label: 'Data Sources' }],
  },
  { key: 'workflow', label: 'Workflow Management', icon: <ProjectOutlined /> },
  { key: 'users', label: 'User Management', icon: <UserOutlined /> },
  { key: 'docs', label: 'Training & Documentation', icon: <BookOutlined /> },
  { key: 'notifications', label: 'Notifications', icon: <BellOutlined /> },
]

const meta: Meta<typeof SidebarMenu> = {
  title: 'Design Factory/SidebarMenu',
  component: SidebarMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof SidebarMenu>

const Template = (args: SidebarMenuProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(args.collapsed ?? false)
  const width = collapsed ? 60 : 256

  return (
    <div style={{ display: 'flex', background: '#f5f5f5' }}>
      <div
        style={{
          width,
          boxShadow: '2px 0 6px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <SidebarMenu {...args} collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
    </div>
  )
}

export const Default: Story = {
  render: args => <Template {...args} />,
  args: {
    items: menuItems,
    collapsed: false,
    defaultSelectedKeys: ['home'],
    showSearch: false,
  },
}

export const WithSearch: Story = {
  render: args => <Template {...args} />,
  args: {
    items: menuItems,
    collapsed: false,
    defaultSelectedKeys: ['home'],
    showSearch: true,
  },
}

export const WithoutIcons: Story = {
  render: args => <Template {...args} />,
  args: {
    items: menuItems.map(item => ({ ...item, icon: undefined })),
    collapsed: false,
    defaultSelectedKeys: ['home'],
    showSearch: false,
  },
}

export const Empty: Story = {
  render: args => <Template {...args} />,
  args: {
    items: [],
    collapsed: false,
    showSearch: true,
  },
}
