import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { App, Button } from '../..'
import { useNotification } from '.'

// Create a wrapper component for demonstration
const NotificationDemo: React.FC<{
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
  description?: string
}> = ({ type, message, description }) => {
  const notification = useNotification()

  const handleClick = () => {
    notification[type](message, description ? { description } : undefined)
  }

  return (
    <Button onClick={handleClick} color='primary'>
      Show {type.charAt(0).toUpperCase() + type.slice(1)} Notification
    </Button>
  )
}

const meta: Meta<typeof NotificationDemo> = {
  title: 'Design Factory/Notification',
  component: NotificationDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'This useNotification hook built on top of [Ant Design Notification](https://ant.design/components/notification) aligned with [Design Factory v19 mockups](https://www.figma.com/design/iT2v9x2YJj2LQAYmZRAy7x/Design-Factory-v19?m=auto&node-id=3193-51261&t=kbkSCBWfYkDSVrjm-1). Notifications appear at the bottom-left corner with custom styling and colors.',
      },
    },
  },
  decorators: [
    Story => (
      <App>
        <div style={{ padding: '20px' }}>
          <Story />
          <div style={{ marginTop: '16px', fontSize: '12px', color: '#666' }}>
            Click the button to trigger the notification.
          </div>
        </div>
      </App>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'error', 'info', 'warning'],
      description: 'Type of notification to display',
    },
    message: {
      control: 'text',
      description: 'Main message text for the notification',
    },
    description: {
      control: 'text',
      description: 'Optional description text for additional context',
    },
  },
} satisfies Meta<typeof NotificationDemo>

export default meta
type Story = StoryObj<typeof meta>

// Success Notifications
export const Success: Story = {
  args: {
    type: 'success',
    message: 'Data saved successfully',
  },
}

export const SuccessWithDescription: Story = {
  args: {
    type: 'success',
    message: 'Data saved successfully',
    description: 'Changes take a few minutes to propagate across all services.',
  },
}

// Error Notifications
export const Error: Story = {
  args: {
    type: 'error',
    message: 'Failed to save data',
  },
}

export const ErrorWithDescription: Story = {
  args: {
    type: 'error',
    message: 'Failed to save data',
    description: 'Error message description coming from backend.',
  },
}

// Info Notifications
export const Info: Story = {
  args: {
    type: 'info',
    message: 'Information Message',
  },
}

export const InfoWithDescription: Story = {
  args: {
    type: 'info',
    message: 'Information Message',
    description: 'This is an additional information.',
  },
}

// Warning Notifications
export const Warning: Story = {
  args: {
    type: 'warning',
    message: 'Warning Message',
  },
}

export const WarningWithDescription: Story = {
  args: {
    type: 'warning',
    message: 'Warning Message',
    description: 'This is a warning message description.',
  },
}
