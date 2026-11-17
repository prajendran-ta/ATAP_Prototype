import React, { useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import Modal from './Modal'
import type { ModalProps } from './Modal.d'

const meta: Meta<typeof Modal> = {
  title: 'Design Factory/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Modal component built on top of [Ant Design Tag](https://ant.design/components/modal).',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The modal title',
    },
    okText: {
      control: 'text',
      description: 'Text of the OK button',
    },
    cancelText: {
      control: 'text',
      description: 'Text of the Cancel button',
    },
    width: {
      control: 'number',
      description: 'Width of the modal dialog',
    },
    confirmLoading: {
      control: 'boolean',
      description: 'Whether to show loading on OK button',
    },
  },
  decorators: [
    Story => (
      <div style={{ padding: '20px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Modal>

const ModalWithTrigger = (args: ModalProps) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <Modal {...args} open={open} onCancel={() => setOpen(false)} onOk={() => setOpen(false)}>
        {args.children}
      </Modal>
    </>
  )
}

export const Default: Story = {
  render: args => <ModalWithTrigger {...args} />,
  args: {
    title: 'Default Modal',
    children: 'Modal content, this a sample modal.',
    okText: 'Save',
    cancelText: 'Cancel',
  },
}

export const CustomWidth: Story = {
  render: args => <ModalWithTrigger {...args} />,
  args: {
    title: 'Wide Modal',
    okText: 'OK',
    cancelText: 'Cancel',
    width: 800,
    children: 'This modal has a custom width of 800px.',
  },
}

export const WithoutFooter: Story = {
  render: args => <ModalWithTrigger {...args} />,
  args: {
    title: 'Information',
    footer: null,
    children: 'This modal has no footer buttons.',
  },
}

export const Loading: Story = {
  render: args => <ModalWithTrigger {...args} />,
  args: {
    title: 'Processing',
    okText: 'Submit',
    cancelText: 'Cancel',
    confirmLoading: true,
    children: 'This modal shows a loading state on the OK button.',
    closable: false,
  },
}
