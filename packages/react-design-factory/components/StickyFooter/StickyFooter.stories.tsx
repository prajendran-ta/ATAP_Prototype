import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { StickyFooter } from '.'
import { Button, Text } from '../..'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof StickyFooter> = {
  title: 'Design Factory/StickFooter',
  component: StickyFooter,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A sticky footer component that appears at the bottom of the screen, typically used for call-to-action buttons like Save and Cancel.',
      },
    },
  },
  decorators: [
    Story => (
      <div style={{ height: '20vh', position: 'relative', padding: '20px' }}>
        <Text.H3>Sample Page</Text.H3>
        <Text.Body>It contains 2 CTA buttons ("Save" & "Cancel") in the sticky footer.</Text.Body>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const WithSaveAndCancelButtons: Story = {
  render: () => (
    <StickyFooter>
      <Button variant='outlined' color='primary'>
        Cancel
      </Button>
      <Button variant='solid' color='primary'>
        Save
      </Button>
    </StickyFooter>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A sticky footer with Save and Cancel buttons. It sticks to the bottom of the page with `bottom: 70px` to account for the main footer spacing.',
      },
    },
  },
}
