import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { Select } from '.'

// Sample options for stories
const sampleOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  { label: 'Option 4', value: 'option4' },
  { label: 'Option 5', value: 'option5' },
]

const countriesOptions = [
  { label: 'Egypt', value: 'eg' },
  { label: 'Germany', value: 'de' },
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
]

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Select> = {
  title: 'Design Factory/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'This select component built on top of [Ant Design Select](https://ant.design/components/select) aligned with [Design Factory v19 mockups](https://www.figma.com/design/iT2v9x2YJj2LQAYmZRAy7x/Design-Factory-v19).',
      },
    },
  },
  decorators: [
    Story => (
      <div style={{ width: '250px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      description: 'Unique identifier for the select element',
    },
    mode: {
      control: 'select',
      options: [undefined, 'multiple', 'tags'],
      description: 'Set mode of Select',
    },
    options: {
      control: 'object',
      description: 'Data source for select options',
    },
    value: {
      control: 'text',
      description: 'Current selected option(s)',
    },
    defaultValue: {
      control: 'text',
      description: 'Initial selected option(s)',
    },
    showSearch: {
      control: 'boolean',
      description: 'Whether show search input in single mode',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no option is selected',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the select',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    maxCount: {
      control: 'number',
      description: 'Max count of selected options in multiple mode',
    },
    popupMatchSelectWidth: {
      control: 'select',
      options: [true, false, 200, 250, 300, 400, 500],
      description:
        'Whether the dropdown menu should match the width of the select input. Can be boolean or number (pixel width)',
    },
    label: {
      control: 'text',
      description: 'Label text for the select',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required (shows asterisk)',
    },
    withBadges: {
      control: 'boolean',
      description: 'Show selected options as badges in multiple mode',
    },
    allowClear: {
      control: 'boolean',
      description: 'Show clear button to reset selection',
    },
    searchBy: {
      control: 'select',
      options: ['both', 'label', 'value'],
      description: 'What to search by when showSearch is enabled',
    },
    helperMessage: {
      control: 'text',
      description: 'Helper text displayed below the select',
    },
    warningMessage: {
      control: 'text',
      description: 'Warning message displayed below the select',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message displayed below the select',
    },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

// Basic Single Select
export const SingleSelection: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Select an option',
  },
}

export const SelectionWithLabel: Story = {
  args: {
    options: sampleOptions,
    label: 'Field Label',
    placeholder: 'Select an option',
  },
}

export const SelectionRequired: Story = {
  args: {
    options: sampleOptions,
    label: 'Required Field',
    placeholder: 'Select an option',
    required: true,
  },
}

export const WithDefaultValue: Story = {
  args: {
    options: sampleOptions,
    label: 'Pre-selected',
    defaultValue: 'option2',
  },
}

export const WithHelperMessage: Story = {
  args: {
    options: countriesOptions,
    label: 'Country',
    placeholder: 'Select a country',
    helperMessage: 'This a helper message.',
  },
}

export const WithWarningMessage: Story = {
  args: {
    options: countriesOptions,
    label: 'Country',
    placeholder: 'Select a country',
    warningMessage: 'This is a warning message.',
  },
}

export const WithErrorMessage: Story = {
  args: {
    options: countriesOptions,
    label: 'Country',
    placeholder: 'Select a country',
    errorMessage: 'This is an error message.',
  },
}

// Search Functionality
export const Searchable: Story = {
  args: {
    options: countriesOptions,
    label: 'Country',
    placeholder: 'Search and select a country',
    showSearch: true,
    helperMessage: 'Start typing to filter countries.',
  },
}

// Search Behavior Stories
export const SearchByLabel: Story = {
  args: {
    options: countriesOptions,
    label: 'Search by Label Only',
    placeholder: 'Type country name',
    showSearch: true,
    searchBy: 'label',
  },
}

export const SearchByValue: Story = {
  args: {
    options: countriesOptions,
    label: 'Search by Value Only',
    placeholder: 'Type country code',
    showSearch: true,
    searchBy: 'value',
  },
}

export const SearchByBoth: Story = {
  args: {
    options: countriesOptions,
    label: 'Search by Both Label and Value',
    placeholder: 'Type country name or code',
    showSearch: true,
    searchBy: 'both',
  },
}

// Multiple Select
export const MultipleSelection: Story = {
  args: {
    mode: 'multiple',
    options: sampleOptions,
    label: 'Multiple Selection',
    placeholder: 'Select multiple options',
  },
}

export const MultipleSelectionWithBadges: Story = {
  args: {
    mode: 'multiple',
    options: sampleOptions,
    label: 'Multiple with Badges',
    placeholder: 'Select multiple options',
    withBadges: true,
  },
}

export const MultipleWithMaxCount: Story = {
  args: {
    mode: 'multiple',
    options: sampleOptions,
    label: 'Max 3 selections',
    placeholder: 'Select up to 3 options',
    maxCount: 3,
    withBadges: true,
    helperMessage: 'You can select a maximum of 3 options.',
  },
}

export const MultipleSearchable: Story = {
  args: {
    mode: 'multiple',
    options: countriesOptions,
    label: 'Countries',
    placeholder: 'Search and select countries',
    showSearch: true,
    withBadges: true,
    helperMessage: 'Type to search for countries.',
  },
}

export const MultiplePreSelected: Story = {
  args: {
    mode: 'multiple',
    options: sampleOptions,
    label: 'Pre-selected Multiple',
    defaultValue: ['option1', 'option3'],
    withBadges: true,
  },
}

export const WithoutBadges: Story = {
  args: {
    mode: 'multiple',
    options: sampleOptions,
    label: 'Without Badges (for Filters)',
    placeholder: 'Type to add custom tags or select from existing options.',
  },
}

// States and Variations
export const Disabled: Story = {
  args: {
    options: sampleOptions,
    label: 'Disabled Select',
    placeholder: 'Cannot select',
    disabled: true,
    helperMessage: 'This field is currently disabled.',
  },
}

export const Loading: Story = {
  args: {
    options: [],
    label: 'Loading Options',
    placeholder: 'Loading...',
    loading: true,
    helperMessage: 'Please wait while options are being loaded.',
  },
}

export const DisabledWithValue: Story = {
  args: {
    options: sampleOptions,
    label: 'Disabled with Value',
    value: 'option2',
    disabled: true,
  },
}

// Advanced Examples
export const LongOptionsList: Story = {
  args: {
    options: [
      ...countriesOptions,
      { label: 'Spain', value: 'es' },
      { label: 'Italy', value: 'it' },
      { label: 'Netherlands', value: 'nl' },
      { label: 'Sweden', value: 'se' },
      { label: 'Norway', value: 'no' },
      { label: 'Denmark', value: 'dk' },
      { label: 'Finland', value: 'fi' },
      { label: 'Poland', value: 'pl' },
      { label: 'Czech Republic', value: 'cz' },
      { label: 'Hungary', value: 'hu' },
      { label: 'Austria', value: 'at' },
      { label: 'Switzerland', value: 'ch' },
      { label: 'Belgium', value: 'be' },
      { label: 'Portugal', value: 'pt' },
    ],
    label: 'Country Selection',
    placeholder: 'Search for a country',
    showSearch: true,
    helperMessage: 'Use the search functionality to quickly find countries.',
  },
}

// Popup Width Stories
export const PopupMatchesSelectWidth: Story = {
  args: {
    options: [
      { label: 'Very Long Option Name That Exceeds Select Width', value: 'long1' },
      { label: 'Another Extremely Long Option Label', value: 'long2' },
      { label: 'Short', value: 'short' },
      { label: 'Medium Length Option', value: 'medium' },
    ],
    label: 'Popup Matches Select Width',
    placeholder: 'Select an option',
    popupMatchSelectWidth: true,
    helperMessage: 'Dropdown width matches the select input width.',
  },
}

export const PopupAutoWidth: Story = {
  args: {
    options: [
      { label: 'Very Long Option Name That Exceeds Select Width', value: 'long1' },
      { label: 'Another Extremely Long Option Label', value: 'long2' },
      { label: 'Short', value: 'short' },
      { label: 'Medium Length Option', value: 'medium' },
    ],
    label: 'Popup Auto Width',
    placeholder: 'Select an option',
    popupMatchSelectWidth: false,
    helperMessage: 'Dropdown width adjusts to fit the longest option.',
  },
}

export const PopupFixedWidth: Story = {
  args: {
    options: [
      { label: 'Very Long Option Name That Exceeds Select Width', value: 'long1' },
      { label: 'Another Extremely Long Option Label', value: 'long2' },
      { label: 'Short', value: 'short' },
      { label: 'Medium Length Option', value: 'medium' },
    ],
    label: 'Popup Fixed Width (300px)',
    placeholder: 'Select an option',
    popupMatchSelectWidth: 300,
    helperMessage: 'Dropdown has a fixed width of 300 pixels.',
  },
}
