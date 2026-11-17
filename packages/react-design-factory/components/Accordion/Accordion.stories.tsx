import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Accordion } from '.'
import { AccordionItem } from './Accordion.d'

const meta: Meta<typeof Accordion> = {
  title: 'Design Factory/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    expandIconPosition: {
      control: 'radio',
      options: ['left', 'right'],
    },
    className: { control: 'text' },
    style: { control: 'object' },
  },
}

export default meta
type Story = StoryObj<typeof Accordion>

const itemWithTitleAndSubtitle: AccordionItem = {
  key: '1',
  header: (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <span>
        <strong>Accordion Title</strong>
      </span>
      <span style={{ fontSize: 12 }}>This is a subtitle</span>
    </div>
  ),
  content: <>This is the content of the accordion panel.</>,
}

const sharedStyle = { width: '500px' }

export const Default: Story = {
  name: 'Default',
  args: {
    items: [itemWithTitleAndSubtitle],
    defaultActiveKey: [],
    ghost: false,
    expandIconPosition: 'start',
    style: sharedStyle,
  },
}

export const IconLeft: Story = {
  name: 'Icon on the Left',
  args: {
    items: [itemWithTitleAndSubtitle],
    defaultActiveKey: ['1'],
    ghost: false,
    expandIconPosition: 'start',
    style: sharedStyle,
  },
}

export const IconRight: Story = {
  name: 'Icon on the Right',
  args: {
    items: [itemWithTitleAndSubtitle],
    defaultActiveKey: ['1'],
    ghost: false,
    expandIconPosition: 'end',
    style: sharedStyle,
  },
}

export const Hovered: Story = {
  name: 'Hovered',
  args: {
    items: [itemWithTitleAndSubtitle],
    style: sharedStyle,
  },
  parameters: {
    pseudo: { hover: true },
  },
}

export const Focused: Story = {
  name: 'Focused',
  args: {
    items: [itemWithTitleAndSubtitle],
    style: sharedStyle,
  },
  parameters: {
    pseudo: { focus: true },
  },
}

export const HoveredAndFocused: Story = {
  name: 'Hovered + Focused',
  args: {
    items: [itemWithTitleAndSubtitle],
    style: sharedStyle,
  },
  parameters: {
    pseudo: { hover: true, focus: true },
  },
}

export const Disabled: Story = {
  name: 'Disabled',
  args: {
    items: [{ ...itemWithTitleAndSubtitle }],
    style: sharedStyle,
    disabled: true,
  },
}

export const CustomIconRadio: Story = {
  name: 'Custom Icon Radio',
  args: {
    items: [itemWithTitleAndSubtitle],
    expandIcon: 'radio',
    style: sharedStyle,
  },
}
