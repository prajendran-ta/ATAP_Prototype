import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { AccordionGroup } from '.'
import { AccordionItem } from '../Accordion/Accordion.d'

const meta: Meta<typeof AccordionGroup> = {
  title: 'Design Factory/AccordionGroup',
  component: AccordionGroup,
  tags: ['autodocs'],
  argTypes: {
    ghost: { control: 'boolean' },
    expandIconPosition: {
      control: 'radio',
      options: ['start', 'end'],
    },
    className: { control: 'text' },
    style: { control: 'object' },
  },
}

export default meta
type Story = StoryObj<typeof AccordionGroup>

const icon = (
  <span role='img' aria-label='bell' style={{ marginRight: 8 }}>
    🔔
  </span>
)

const DefaultItems: AccordionItem[] = [
  {
    key: `accordion-0`,
    header: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <span>Accordion 1</span>
          <div style={{ fontSize: 12, color: '#888' }}>Subtitle for accordion 1</div>
        </div>
      </div>
    ),
    content: <span>This is the content of accordion 1.</span>,
  },
  {
    key: `accordion-1`,
    header: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <span>Accordion 2</span>
          <div style={{ fontSize: 12, color: '#888' }}>Subtitle for accordion 2</div>
        </div>
      </div>
    ),
    content: <span>This is the content of accordion 1.</span>,
  },
]

const subtitlerRightItems: AccordionItem[] = [
  {
    key: `accordion-0`,
    header: (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: 8 }}>
        <span>Accordion 1</span>
        <div style={{ fontSize: 12, color: '#888' }}>Subtitle for accordion 1</div>
      </div>
    ),
    content: <span>This is the content of accordion 1.</span>,
  },
  {
    key: `accordion-1`,
    header: (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: 8 }}>
        <span>Accordion 2</span>
        <div style={{ fontSize: 12, color: '#888' }}>Subtitle for accordion 2</div>
      </div>
    ),
    content: <span>This is the content of accordion 1.</span>,
  },
]

const items: AccordionItem[] = [
  {
    key: `accordion-0`,
    header: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {icon}
        <div>
          <span>Accordion 1</span>
          <div style={{ fontSize: 12, color: '#888' }}>Subtitle for accordion 1</div>
        </div>
      </div>
    ),
    content: <span>This is the content of accordion 1.</span>,
  },
  {
    key: `accordion-1`,
    header: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {icon}
        <div>
          <span>Accordion 2</span>
          <div style={{ fontSize: 12, color: '#888' }}>Subtitle for accordion 2</div>
        </div>
      </div>
    ),
    content: <span>This is the content of accordion 1.</span>,
  },
]

export const Default: Story = {
  args: {
    items: DefaultItems,
    ghost: false,
    expandIconPosition: 'end',
  },
}

export const ExtraHeaderIcons: Story = {
  args: {
    items,
    ghost: false,
    expandIconPosition: 'end',
  },
}

export const DefaultAccordionActive: Story = {
  args: {
    items: subtitlerRightItems,
    ghost: false,
    expandIconPosition: 'end',
    defaultActiveKey: ['accordion-0'],
  },
}

export const AccordionIconLeft: Story = {
  args: {
    items,
    ghost: false,
    expandIconPosition: 'start',
    defaultActiveKey: ['accordion-0'],
  },
}

export const AccordionIconRight: Story = {
  args: {
    items,
    ghost: false,
    expandIconPosition: 'end',
    defaultActiveKey: ['accordion-0'],
  },
}

export const AccordionSubtitleRight: Story = {
  args: {
    items: subtitlerRightItems,
    ghost: false,
    expandIconPosition: 'end',
    defaultActiveKey: [],
  },
}

export const AccordionHeaderIndex: Story = {
  args: {
    items: subtitlerRightItems,
    ghost: false,
    expandIconPosition: 'end',
    defaultActiveKey: [],
    withHeaderIndex: true,
  },
}

export const Hovered: Story = {
  args: {
    items,
    ghost: false,
    expandIconPosition: 'end',
  },
  parameters: {
    pseudo: { hover: true },
  },
}

export const Focused: Story = {
  args: {
    items,
    ghost: false,
    expandIconPosition: 'end',
  },
  parameters: {
    pseudo: { focus: true },
  },
}

export const Disabled: Story = {
  args: {
    items: DefaultItems,
    ghost: false,
    expandIconPosition: 'end',
    disabled: true,
  },
}
