import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import dayjs from 'dayjs'
import { DatePicker } from '.'

const meta: Meta<typeof DatePicker> = {
  title: 'Design Factory/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'This DatePicker component built on top of [Ant Design DatePicker](https://ant.design/components/date-picker) aligned with [Design Factory v19 mockups](https://www.figma.com/design/iT2v9x2YJj2LQAYmZRAy7x/Design-Factory-v19?node-id=13723-147695&t=Dp2ywOfenu0op2KJ-0).',
      },
    },
  },
  decorators: [
    Story => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      description: 'DatePicker ID for form association',
    },
    value: {
      control: false,
      description: 'Controlled value (dayjs object)',
    },
    defaultValue: {
      control: false,
      description: 'Default value (dayjs object)',
    },
    minDate: {
      control: false,
      description: 'Minimum selectable date (dayjs object)',
    },
    maxDate: {
      control: false,
      description: 'Maximum selectable date (dayjs object)',
    },
    picker: {
      control: 'select',
      options: ['date', 'week', 'month', 'quarter', 'year'],
      description: 'Date picker type',
    },
    format: {
      control: 'text',
      description: 'Date format string',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the date picker',
    },
    status: {
      control: 'select',
      options: ['error', 'warning'],
      description: 'DatePicker status',
    },
    showNow: {
      control: 'boolean',
      description: 'Show "Now" button in panel',
    },
    label: {
      control: 'text',
      description: 'DatePicker label',
    },
    required: {
      control: 'boolean',
      description: 'Show required asterisk',
    },
    helperMessage: {
      control: 'text',
      description: 'Helper message text',
    },
    warningMessage: {
      control: 'text',
      description: 'Warning message text',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message text',
    },
  },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithLabel: Story = {
  args: {
    label: 'Select Date',
  },
}

export const Required: Story = {
  args: {
    label: 'Required Date',
    required: true,
  },
}

export const WithHelperMessage: Story = {
  args: {
    label: 'Date with Helper',
    helperMessage: 'Please select a date from the calendar.',
  },
}

export const WithWarning: Story = {
  args: {
    label: 'Warning Date',
    status: 'warning',
    warningMessage: 'This date might not be optimal.',
  },
}

export const WithError: Story = {
  args: {
    label: 'Error Date',
    status: 'error',
    errorMessage: 'This field is required.',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled DatePicker',
    disabled: true,
  },
}

export const WithDefaultValue: Story = {
  args: {
    label: 'Date with Default Value',
    defaultValue: dayjs(),
  },
}

export const CustomFormat: Story = {
  args: {
    label: 'Custom Format (MM/DD/YYYY)',
    format: 'MM/DD/YYYY',
  },
}

export const MonthPicker: Story = {
  args: {
    label: 'Month Picker',
    picker: 'month',
    format: 'MMMM YYYY',
  },
}

export const YearPicker: Story = {
  args: {
    label: 'Year Picker',
    picker: 'year',
    format: 'YYYY',
  },
}

export const WithDateRange: Story = {
  args: {
    label: 'Date with Range',
    minDate: dayjs().subtract(1, 'year'),
    maxDate: dayjs().add(1, 'year'),
    helperMessage: 'Date must be within the last and next year.',
  },
}

export const ShowNowButton: Story = {
  args: {
    label: 'Date with Now Button',
    showNow: true,
    helperMessage: 'Click "Now" to select current date.',
  },
}
