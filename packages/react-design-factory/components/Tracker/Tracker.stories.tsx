import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { Text, Tracker } from '../..'

const meta: Meta<typeof Tracker> = {
  title: 'Design Factory/Tracker',
  component: Tracker,
  decorators: [
    Story => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A progress tracker component that displays progress with optional threshold markers and labels. Implemented following [MediaHub Budget Tracker](https://www.figma.com/design/UQNVDyK6rZNs428HssCwn4/Omnichannel-Budget-Allocation?node-id=1648-28794&t=MvjgmS8Y8zv2Y0f3-4).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    progressPercent: {
      control: { type: 'number' },
      description: 'Current progress percentage',
    },
    thresholdPercent: {
      control: { type: 'number' },
      description: 'Threshold marker percentage',
    },
    thresholdLabel: {
      control: 'text',
      description: 'Label displayed on top of the threshold position',
    },
    startLabel: {
      control: 'text',
      description: 'Label displayed at the start of the tracker',
    },
    endLabel: {
      control: 'text',
      description: 'Label displayed at the end of the tracker',
    },
  },
} satisfies Meta<typeof Tracker>

export default meta
type TrackerStory = StoryObj<typeof meta>

// Basic Tracker
export const ProgressOnly: TrackerStory = {
  args: {
    progressPercent: 25,
  },
}

export const ThresholdOnly: TrackerStory = {
  args: {
    thresholdPercent: 25,
  },
}

export const ProgressAndThreshold: TrackerStory = {
  args: {
    progressPercent: 25,
    thresholdPercent: 80,
  },
}

export const ThresholdWithLabel: TrackerStory = {
  args: {
    progressPercent: 30,
    thresholdPercent: 60,
    thresholdLabel: (
      <>
        <Text.Body>Budget Allotted</Text.Body>
        <Text.Body>60,000 USD</Text.Body>
      </>
    ),
  },
}

export const WithStartLabel: TrackerStory = {
  args: {
    progressPercent: 30,
    startLabel: (
      <>
        <Text.Body>Budget Spent</Text.Body>
        <Text.Body>30,000 USD</Text.Body>
      </>
    ),
  },
}

export const WithEndLabel: TrackerStory = {
  args: {
    progressPercent: 70,
    endLabel: <Text.Body>Remaining: 30%</Text.Body>,
  },
}

export const WithStartAndEndLabels: TrackerStory = {
  args: {
    progressPercent: 40,
    startLabel: (
      <>
        <Text.Body>Budget Spent</Text.Body>
        <Text.Body>40,000 USD</Text.Body>
      </>
    ),
    endLabel: (
      <>
        <Text.Body>Unspent Budget</Text.Body>
        <Text.Body>60,000 USD</Text.Body>
      </>
    ),
  },
}

export const ProgressCompleted: TrackerStory = {
  args: {
    progressPercent: 100,
    startLabel: '0%',
    endLabel: '100%',
  },
}

export const OverAllocatedThreshold: TrackerStory = {
  args: {
    thresholdPercent: 101,
    thresholdLabel: '101%',
  },
}

export const OverAllocatedWithProgress: TrackerStory = {
  args: {
    thresholdPercent: 120,
    thresholdLabel: '120%',
    progressPercent: 30,
    startLabel: <Text.Body>Progress: 30%</Text.Body>,
  },
}

export const OverAllocatedWithProgressCompleted: TrackerStory = {
  args: {
    thresholdPercent: 150,
    thresholdLabel: '150%',
    progressPercent: 100,
    startLabel: '0%',
    endLabel: '100%',
  },
}

export const BudgetAllocation: TrackerStory = {
  args: {
    progressPercent: 50,
    thresholdPercent: 70,
    thresholdLabel: (
      <>
        <Text.Body>Budget Allotted</Text.Body>
        <Text.Body>70,000 USD</Text.Body>
      </>
    ),
    startLabel: (
      <>
        <Text.Body>Budget Spent</Text.Body>
        <Text.Body>50,000 USD</Text.Body>
      </>
    ),

    endLabel: (
      <>
        <Text.Body>Unspent Budget</Text.Body>
        <Text.Body>50,000 USD</Text.Body>
      </>
    ),
  },
}

export const FullProgress: TrackerStory = {
  args: {
    progressPercent: 100,
    thresholdPercent: 80,
    thresholdLabel: (
      <>
        <Text.Body>Target</Text.Body>
        <Text.Body>80%</Text.Body>
      </>
    ),

    startLabel: <Text.Body>Complete</Text.Body>,
  },
}

export const BudgetNotStarted: TrackerStory = {
  args: {
    progressPercent: 0,
    thresholdPercent: 100,
    thresholdLabel: (
      <>
        <Text.Body>Budget Alloted</Text.Body>
        <Text.Body>100,000 USD</Text.Body>
      </>
    ),

    startLabel: (
      <>
        <Text.Body>Budget Spent</Text.Body>
        <Text.Body>0 USD</Text.Body>
      </>
    ),

    endLabel: (
      <>
        <Text.Body>Unspent Budget</Text.Body>
        <Text.Body>100,000 USD</Text.Body>
      </>
    ),
  },
}
