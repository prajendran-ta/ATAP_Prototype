import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { Text } from '../..'

const meta: Meta<typeof Text.H1> = {
  title: 'Design Factory/Text',
  parameters: {
    docs: {
      description: {
        component:
          'Text/Typography components aligned with [Design Factory v19 Typography](https://www.figma.com/design/iT2v9x2YJj2LQAYmZRAy7x/Design-Factory-v19?node-id=682-17085&t=Rv552ZVlYB1LJM7N-4). Includes headings (H1-H6), body text, labels, placeholders, and helper text with various states.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

const defaultText = 'Amadeus Design Factory'

// Typography Overview Story
export const Typography: StoryObj = {
  render: () => (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <style>{`
        .typography-row {
          display: flex;
          align-items: baseline;
          margin-bottom: 16px;
          padding: 8px 0;
          border-bottom: 1px solid #eee;
        }
        .typography-label {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 120px;
          font-size: 12px;
          color: #666;
          letter-spacing: 0.5px;
          margin-right: 24px;
        }
        .typography-sample {
          flex: 1;
        }
        .typography-info {
          min-width: 100px;
          font-size: 11px;
          color: #999;
          text-align: right;
          text-transform: uppercase;
        }
      `}</style>

      <div className='typography-row'>
        <div className='typography-label'>Text.H1</div>
        <div className='typography-sample'>
          <Text.H1>{defaultText}</Text.H1>
        </div>
        <div className='typography-info'>h1</div>
      </div>

      <div className='typography-row'>
        <div className='typography-label'>Text.H2</div>
        <div className='typography-sample'>
          <Text.H2>{defaultText}</Text.H2>
        </div>
        <div className='typography-info'>h2</div>
      </div>

      <div className='typography-row'>
        <div className='typography-label'>Text.H3</div>
        <div className='typography-sample'>
          <Text.H3>{defaultText}</Text.H3>
        </div>
        <div className='typography-info'>h3</div>
      </div>

      <div className='typography-row'>
        <div className='typography-label'>Text.H4</div>
        <div className='typography-sample'>
          <Text.H4>{defaultText}</Text.H4>
        </div>
        <div className='typography-info'>h4</div>
      </div>

      <div className='typography-row'>
        <div className='typography-label'>Text.H5</div>
        <div className='typography-sample'>
          <Text.H5>{defaultText}</Text.H5>
        </div>
        <div className='typography-info'>h5</div>
      </div>

      <div className='typography-row'>
        <div className='typography-label'>Text.H6</div>
        <div className='typography-sample'>
          <Text.H6>{defaultText}</Text.H6>
        </div>
        <div className='typography-info'>h6</div>
      </div>

      <div className='typography-row'>
        <div className='typography-label'>Text.Body</div>
        <div className='typography-sample'>
          <Text.Body>{defaultText}</Text.Body>
        </div>
        <div className='typography-info'>span</div>
      </div>

      <div className='typography-row'>
        <div className='typography-label'>Text.Label</div>
        <div className='typography-sample'>
          <Text.Label>{defaultText}</Text.Label>
        </div>
        <div className='typography-info'>label</div>
      </div>

      <div className='typography-row'>
        <div className='typography-label'>Text.Placeholder</div>
        <div className='typography-sample'>
          <Text.Placeholder>{defaultText}</Text.Placeholder>
        </div>
        <div className='typography-info'>span</div>
      </div>

      <div className='typography-row'>
        <div className='typography-label'>
          Text.Helper
          <small>
            <code>status="helper"</code>
          </small>
        </div>
        <div className='typography-sample'>
          <Text.Helper status='helper'>{defaultText}</Text.Helper>
        </div>
        <div className='typography-info'>span</div>
      </div>

      <div className='typography-row'>
        <div className='typography-label'>
          Text.Helper
          <small>
            <code>status="success"</code>
          </small>
        </div>
        <div className='typography-sample'>
          <Text.Helper status='success'>{defaultText}</Text.Helper>
        </div>
        <div className='typography-info'>span</div>
      </div>

      <div className='typography-row'>
        <div className='typography-label'>
          Text.Helper
          <small>
            <code>status="warning"</code>
          </small>
        </div>
        <div className='typography-sample'>
          <Text.Helper status='warning'>{defaultText}</Text.Helper>
        </div>
        <div className='typography-info'>span</div>
      </div>

      <div className='typography-row'>
        <div className='typography-label'>
          Text.Helper
          <small>
            <code>status="error"</code>
          </small>
        </div>
        <div className='typography-sample'>
          <Text.Helper status='error'>{defaultText}</Text.Helper>
        </div>
        <div className='typography-info'>span</div>
      </div>
    </div>
  ),
}

// Individual Component Stories
export const Headings: StoryObj = {
  render: () => (
    <div>
      <Text.H1>Heading 1 - {defaultText}</Text.H1>
      <Text.H2>Heading 2 - {defaultText}</Text.H2>
      <Text.H3>Heading 3 - {defaultText}</Text.H3>
      <Text.H4>Heading 4 - {defaultText}</Text.H4>
      <Text.H5>Heading 5 - {defaultText}</Text.H5>
      <Text.H6>Heading 6 - {defaultText}</Text.H6>
    </div>
  ),
}

export const BodyText: StoryObj = {
  render: () => (
    <Text.Body>
      This is body text used for regular content. It provides good readability and is the standard text used throughout
      the application for paragraphs, descriptions, and general content.
    </Text.Body>
  ),
}

export const Labels: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text.Label>Default Label</Text.Label>
      <Text.Label status='primary'>Primary Label</Text.Label>
      <Text.Label status='helper'>Helper Label</Text.Label>
      <Text.Label status='success'>Success Label</Text.Label>
      <Text.Label status='warning'>Warning Label</Text.Label>
      <Text.Label status='error'>Error Label</Text.Label>
    </div>
  ),
}

export const Placeholder: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Text.Placeholder>Enter your email address</Text.Placeholder>
      <Text.Placeholder>Select an option...</Text.Placeholder>
      <Text.Placeholder>Search for destinations</Text.Placeholder>
    </div>
  ),
}

export const Helper: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <Text.Helper status='helper'>This is helper text that provides additional information.</Text.Helper>
      </div>
      <div>
        <Text.Helper status='success'>This is a success message indicating a positive outcome.</Text.Helper>
      </div>
      <div>
        <Text.Helper status='warning'>This is a warning message that alerts users to potential issues.</Text.Helper>
      </div>
      <div>
        <Text.Helper status='error'>This is an error message indicating something went wrong.</Text.Helper>
      </div>
    </div>
  ),
}
