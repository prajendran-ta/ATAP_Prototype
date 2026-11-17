import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import Footer from './Footer'
import type { FooterProps } from './Footer.d'

const meta = {
  title: 'Design Factory/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { logoPath: '/assets/amadeus-wordmark.svg', footerCopy: '© Amadeus IT Group SA' } as FooterProps,
}

export const WithBottomElement: Story = {
  args: {
    logoPath: '/assets/amadeus-wordmark.svg',
    footerCopy: '© Amadeus IT Group SA',
    BottomElementFooter: (
      <div
        style={{
          width: '100%',
          padding: 12,
          textAlign: 'center',
          background: '#f5f5f5',
          borderTop: '1px solid #e8e8e8',
          fontSize: 12,
          color: '#555',
        }}
      >
        <strong>Dummy:</strong> Lorem Ipsum.
      </div>
    ),
  } as FooterProps,
}
