import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { Carousel } from '.'

const meta = {
  title: 'Design Factory/Carousel',
  component: Carousel,
  tags: ['autodocs'],
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

export const WithCaption: Story = {
  args: {
    slides: [
      {
        content: (
          <div
            style={{
              height: 300,
              width: '100%',
              backgroundColor: '#C5D5F9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            carousel 1
          </div>
        ),
        title: 'First Slide',
        subtitle: 'This is the first slide',
      },
      {
        content: (
          <div
            style={{
              height: 300,
              width: '100%',
              backgroundColor: '#F9D5C5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            carousel 2
          </div>
        ),
        title: 'Second Slide',
        subtitle: 'This is the second slide',
      },
      {
        content: (
          <div
            style={{
              height: 300,
              width: '100%',
              backgroundColor: '#D5F9C5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            carousel 3
          </div>
        ),
        title: 'Third Slide',
        subtitle: 'This is the third slide',
      },
    ],
  },
}

export const WithoutCaption: Story = {
  args: {
    slides: [
      {
        content: (
          <div
            style={{
              height: 300,
              width: '100%',
              backgroundColor: '#FFEFB7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            carousel A
          </div>
        ),
      },
      {
        content: (
          <div
            style={{
              height: 300,
              width: '100%',
              backgroundColor: '#B7E9FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            carousel B
          </div>
        ),
      },
      {
        content: (
          <div
            style={{
              height: 300,
              width: '100%',
              backgroundColor: '#E7B7FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            carousel C
          </div>
        ),
      },
    ],
  },
}
