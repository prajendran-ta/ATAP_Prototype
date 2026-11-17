import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { Button } from '.'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Button> = {
  title: 'Design Factory/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'This button component built on top of [Ant Design Button](https://ant.design/components/button) aligned with [Design Factory v19 mockups](https://www.figma.com/design/iT2v9x2YJj2LQAYmZRAy7x/Design-Factory-v19?node-id=13723-147633&t=R9KwvUQmKwxJ5QE1-0).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outlined', 'text', 'link'],
      description: 'Button appearance variant',
    },
    color: {
      control: 'select',
      options: ['primary', 'danger'],
      description: 'Button color theme',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    size: {
      control: 'select',
      options: ['small', 'middle', 'large'],
      description: 'Button size',
    },
    title: {
      control: 'text',
      description: 'Tooltip text on hover',
    },
    children: {
      control: 'text',
      description: 'Button content',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const PrimarySolid: Story = {
  args: {
    variant: 'solid',
    color: 'primary',
    children: 'Button Label',
  },
}

export const PrimaryOutlined: Story = {
  args: {
    variant: 'outlined',
    color: 'primary',
    children: 'Button Label',
  },
}

export const PrimaryText: Story = {
  args: {
    variant: 'text',
    color: 'primary',
    children: 'Button Label',
  },
}

export const PrimaryLink: Story = {
  args: {
    variant: 'link',
    color: 'primary',
    children: 'Button Label',
  },
}

export const DangerSolid: Story = {
  args: {
    variant: 'solid',
    color: 'danger',
    children: 'Button Label',
  },
}

export const DangerOutlined: Story = {
  args: {
    variant: 'outlined',
    color: 'danger',
    children: 'Button Label',
  },
}

export const DangerText: Story = {
  args: {
    variant: 'text',
    color: 'danger',
    children: 'Button Label',
  },
}

export const DangerLink: Story = {
  args: {
    variant: 'link',
    color: 'danger',
    children: 'Button Label',
  },
}

export const DisabledSolid: Story = {
  args: {
    variant: 'solid',
    disabled: true,
    children: 'Button Label',
    title: 'Disabled Button',
  },
}

export const DisabledOutlined: Story = {
  args: {
    variant: 'outlined',
    disabled: true,
    title: 'Disabled Button',
    children: 'Button Label',
  },
}

export const DisabledText: Story = {
  args: {
    variant: 'text',
    color: 'danger',
    disabled: true,
    title: 'Disabled Button',
    children: 'Button Label',
  },
}

export const DisabledLink: Story = {
  args: {
    variant: 'link',
    disabled: true,
    title: 'Disabled Button',
    children: 'Button Label',
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Button Label',
  },
}

// Size Variants
export const SmallButton: Story = {
  args: {
    size: 'small',
    variant: 'solid',
    color: 'primary',
    children: 'Small Button',
  },
}

export const MiddleButton: Story = {
  args: {
    size: 'middle',
    variant: 'solid',
    color: 'primary',
    children: 'Middle Button',
  },
}

export const LargeButton: Story = {
  args: {
    size: 'large',
    variant: 'solid',
    color: 'primary',
    children: 'Large Button',
  },
}

// With Tooltip
export const WithTooltip: Story = {
  args: {
    variant: 'solid',
    color: 'primary',
    children: 'Hover me',
    title: 'This is a helpful tooltip message',
  },
}
