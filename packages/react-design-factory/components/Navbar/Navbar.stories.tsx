import type { Meta, StoryObj } from '@storybook/react-webpack5'
import React from 'react'
import Navbar from './Navbar'
import { BellOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons'

const BottomBar: React.FC = () => (
  <div
    style={{
      background: '#0b2a47',
      color: '#fff',
      padding: '8px 16px',
      borderTop: '1px solid rgba(255,255,255,0.15)',
    }}
  >
    Item
  </div>
)

const NavContent: React.FC<{ title?: string }> = ({ title = 'Media Hub' }) => {
  const iconBtnStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    color: '#FFFFFF',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 6,
    cursor: 'pointer',
  }

  const iconStyle: React.CSSProperties = { fontSize: 18, color: '#FFF' }

  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
      <h4 style={{ marginRight: 'auto', color: '#FFF', margin: 0 }}>{title}</h4>
      <div style={{ display: 'flex', gap: 8 }}>
        <RobotOutlined style={iconStyle} />
        <BellOutlined style={iconStyle} />
        <UserOutlined style={iconStyle} />
      </div>
    </div>
  )
}

const meta: Meta<typeof Navbar> = {
  title: 'Design Factory/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    style: {
      control: 'object',
      description: 'Inline styles applied to the header container',
    },
    BottomNavbarElement: {
      control: false,
      description: 'Optional element rendered below the header',
    },
    logoPath: {
      control: 'text',
      description: 'Optional logo image path',
    },
    NavbarComponent: {
      control: false,
      description:
        'Custom content rendered next to the logo. Ej.: un contenedor flex con título a la izquierda e íconos a la derecha.',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    NavbarComponent: <NavContent title='Media Hub' />,
  },
}

export const WithBottomElement: Story = {
  args: {
    NavbarComponent: <NavContent title='Media Hub' />,
    BottomNavbarElement: <BottomBar />,
  },
}

export const WithLogo: Story = {
  args: {
    logoPath: '/logo.svg',
    NavbarComponent: <NavContent title='Media Hub' />,
  },
}

export const NoLogo: Story = {
  args: {
    NavbarComponent: <NavContent title='Media Hub' />,
  },
}

export const FullFeatured: Story = {
  args: {
    logoPath: '/logo.svg',
    NavbarComponent: <NavContent title='Media Hub' />,
    BottomNavbarElement: <BottomBar />,
  },
}
