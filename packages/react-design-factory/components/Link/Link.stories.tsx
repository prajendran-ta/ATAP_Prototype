import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import BellOutlined from '@ant-design/icons/BellOutlined'
import YoutubeFilled from '@ant-design/icons/YoutubeFilled'
import { Link } from '.'

const meta: Meta<typeof Link> = {
  title: 'Design Factory/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    href: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Default Link',
    href: '#default',
  },
}

export const Small: Story = {
  args: {
    children: 'Small Link',
    href: '#small',
    size: 'small',
  },
}

export const Large: Story = {
  args: {
    children: 'Large Link',
    href: '#large',
    size: 'large',
  },
}
export const Hovered: Story = {
  args: {
    children: 'Hovered Link',
    href: '#hovered',
  },
  parameters: {
    pseudo: { hover: true },
  },
}

export const Pressed: Story = {
  args: {
    children: 'Pressed Link',
    href: '#pressed',
  },
  parameters: {
    pseudo: { active: true },
  },
}

export const Visited: Story = {
  args: {
    children: 'Visited Link',
    href: '#visited',
  },
  parameters: {
    pseudo: { visited: true },
  },
}

export const VisitedHovered: Story = {
  args: {
    children: 'Visited Hovered Link',
    href: '#visited-hovered',
  },
  parameters: {
    pseudo: { hover: true, visited: true },
  },
}

export const VisitedFocused: Story = {
  args: {
    children: 'Visited Hovered Link',
    href: '#visited-hovered',
  },
  parameters: {
    pseudo: { focus: true, visited: true },
  },
}

export const Focused: Story = {
  args: {
    children: 'Focused Link',
    href: '#focused',
  },
  parameters: {
    pseudo: { focus: true },
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled Link',
    disabled: true,
  },
}

export const WithExternalIcon: Story = {
  args: {
    children: 'External Link',
    href: '#external',
    linkIcon: 'external',
  },
}

export const WithExternalIconHovered: Story = {
  args: {
    children: 'External Link',
    href: '#external',
    linkIcon: 'external',
  },
  parameters: {
    pseudo: { hover: true },
  },
}

export const WithExternalIconFocused: Story = {
  args: {
    children: 'External Link',
    href: '#external',
    linkIcon: 'external',
  },
  parameters: {
    pseudo: { focus: true },
  },
}

export const WithExternalIconVisited: Story = {
  args: {
    children: 'External Link',
    href: '#external',
    linkIcon: 'external',
  },
  parameters: {
    pseudo: { visited: true },
  },
}

export const WithExternalIconVisitedHovered: Story = {
  args: {
    children: 'External Link',
    href: '#external',
    linkIcon: 'external',
  },
  parameters: {
    pseudo: { visited: true, hover: true },
  },
}

export const WithExternalIconDisabled: Story = {
  args: {
    children: 'External Link',
    href: '#external-disabled',
    linkIcon: 'external',
    disabled: true,
  },
}

export const WithExternalIconVisitedFocused: Story = {
  args: {
    children: 'External Link',
    href: '#external',
    linkIcon: 'external',
  },
  parameters: {
    pseudo: { visited: true, focus: true },
  },
}

export const WithChevronIcon: Story = {
  args: {
    children: 'Chevron Link',
    href: '#chevron',
    linkIcon: 'chevron',
  },
}

export const WithCustomIcon: Story = {
  args: {
    children: 'Custom Icon Link',
    href: '#custom',
    linkIcon: <BellOutlined />,
  },
}

const LinkIconYoutube = () => <YoutubeFilled style={{ color: '#666666' }} />

export const IconAloneDefault: Story = {
  args: {
    linkIcon: <LinkIconYoutube />,
    href: '#icon-default',
    iconAlone: true,
  },
}

export const IconAloneHovered: Story = {
  args: {
    linkIcon: <LinkIconYoutube />,
    href: '#icon-hovered',
    iconAlone: true,
  },
  parameters: {
    pseudo: { hover: true },
  },
}

export const IconAlonePressed: Story = {
  args: {
    linkIcon: <LinkIconYoutube />,
    href: '#icon-pressed',
    iconAlone: true,
  },
  parameters: {
    pseudo: { active: true },
  },
}

export const IconAloneFocused: Story = {
  args: {
    linkIcon: <LinkIconYoutube />,
    href: '#icon-focused',
    iconAlone: true,
  },
  parameters: {
    pseudo: { focus: true },
  },
}
