import { useState } from 'react'
import Toggle from './Toggle'
import Icon from "../Icon/Icon"
import type { Meta, StoryObj } from '@storybook/react'
import { colors } from '../../styles'

const meta: Meta<typeof Toggle> = {
  title: 'Design Factory/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the toggle is checked or not',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the toggle is disabled',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'default'],
      description: 'Size of the toggle',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    onChange: {
      action: 'changed',
      description: 'Callback function that is fired when the toggle changes',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultChecked: false,
  },
}

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
  },
}

export const Loading: Story = {
  args: {
    loading: true,
  },
}

export const LoadingChecked: Story = {
  args: {
    checked: true,
    loading: true,
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    defaultChecked: false,
  },
}



export const WithText: Story = {
  args: {
    checkedChildren: 'ON',
    unCheckedChildren: 'OFF',
    defaultChecked: false,
  },
}

export const WithIcons: Story = {
  args: {
    checkedChildren: <Icon name="check" color={colors.cloud_0}/>,
    unCheckedChildren: <Icon name="xmark" color={colors.cloud_0}/>,
    defaultChecked: false,
  },
}

export const Controlled = () => {
  const [checked, setChecked] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
      <Toggle
        checked={checked}
        onChange={setChecked}
        checkedChildren="ON"
        unCheckedChildren="OFF"
      />
      <p>Current state: {checked ? 'Checked' : 'Unchecked'}</p>
      <button onClick={() => setChecked(!checked)}>
        Toggle programmatically
      </button>
    </div>
  )
}

export const Sizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Toggle size="small" checkedChildren="S" unCheckedChildren="S" defaultChecked={false} />
      <span>Small</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Toggle size="default" checkedChildren="M" unCheckedChildren="M" defaultChecked={false} />
      <span>Default</span>
    </div>
  </div>
)

export const States = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Toggle checked={false} />
      <span>Unchecked</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Toggle checked={true} />
      <span>Checked</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Toggle disabled />
      <span>Disabled</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Toggle checked disabled />
      <span>Disabled & Checked</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Toggle loading />
      <span>Loading</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Toggle checked loading />
      <span>Loading & Checked</span>
    </div>
  </div>
)