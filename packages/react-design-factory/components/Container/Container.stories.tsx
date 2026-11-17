import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { Container, Button, Text } from '../..'

const meta: Meta = {
  title: 'Design Factory/Container',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Container components provide consistent layout patterns and spacing. These styled components include Header, Section, Column, and Row for building consistent UI layouts aligned with Design Factory v19.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const HeaderExample: Story = {
  render: () => (
    <Container.Header>
      <Text.H3>Page Title</Text.H3>
      <Button>Action Button</Button>
    </Container.Header>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Header component with space-between layout, perfect for page headers with title and actions.',
      },
    },
  },
}

export const SectionExample: Story = {
  render: () => (
    <Container.Section>
      <Text.H4>Section Title</Text.H4>
      <Text.Body>
        This is a section with consistent padding, background color, and border styling. Perfect for grouping related
        content with visual separation.
      </Text.Body>
    </Container.Section>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Section component with background, border, and consistent padding for content grouping.',
      },
    },
  },
}

export const ColumnExample: Story = {
  render: () => (
    <Container.Column>
      <Text.H4>Column Layout</Text.H4>
      <Text.Body>First item in the column</Text.Body>
      <Text.Body>Second item in the column</Text.Body>
    </Container.Column>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Column component for vertical layouts with consistent 16px gap between items.',
      },
    },
  },
}

export const RowExample: Story = {
  render: () => (
    <Container.Row>
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </Container.Row>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Row component for horizontal layouts with consistent 16px gap between items.',
      },
    },
  },
}

export const NestedLayout: Story = {
  render: () => (
    <div>
      <Container.Header>
        <Text.H2>Dashboard</Text.H2>
        <Container.Row>
          <Button>Settings</Button>
          <Button>Profile</Button>
        </Container.Row>
      </Container.Header>

      <Container.Section>
        <Container.Header>
          <Text.H4>User Information</Text.H4>
          <Button size='small' variant='text'>
            Edit
          </Button>
        </Container.Header>
        <Container.Column>
          <Container.Row>
            <Text.Label>Name:</Text.Label>
            <Text.Body>Amadeus User</Text.Body>
          </Container.Row>
          <Container.Row>
            <Text.Label>Email:</Text.Label>
            <Text.Body>amadeus.user@amadeus.com</Text.Body>
          </Container.Row>
        </Container.Column>
      </Container.Section>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Complex layout example showing how Header, Section, Column, and Row components work together to create structured layouts.',
      },
    },
  },
}

export const CardLayout: Story = {
  render: () => (
    <Container.Row>
      <Container.Section style={{ flex: 1, minWidth: '200px' }}>
        <Text.H4>Card 1</Text.H4>
        <Text.Body>Content for the first card</Text.Body>
        <Button size='small'>Action</Button>
      </Container.Section>

      <Container.Section style={{ flex: 1, minWidth: '200px' }}>
        <Text.H4>Card 2</Text.H4>
        <Text.Body>Content for the second card</Text.Body>
        <Button size='small'>Action</Button>
      </Container.Section>

      <Container.Section style={{ flex: 1, minWidth: '200px' }}>
        <Text.H4>Card 3</Text.H4>
        <Text.Body>Content for the third card</Text.Body>
        <Button size='small'>Action</Button>
      </Container.Section>
    </Container.Row>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card layout using Section components in a Row for equal-width cards.',
      },
    },
  },
}
