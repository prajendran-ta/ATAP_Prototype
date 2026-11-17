import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Tab from './Tab'
import type { TabItem } from './Tab.d'

const items: TabItem[] = [
  { key: 'paid', label: 'Paidsearch', children: <div>Paidsearch content</div> },
  { key: 'display', label: 'Display', children: <div>Display content</div> },
]

describe('Tab', () => {
  test('renders tabs labels from items', () => {
    render(<Tab items={items} />)

    expect(screen.getByText('Paidsearch')).toBeInTheDocument()
    expect(screen.getByText('Display')).toBeInTheDocument()
  })

  test('shows defaultActiveKey content', () => {
    render(<Tab items={items} defaultActiveKey='display' />)

    expect(screen.getByText('Display content')).toBeInTheDocument()
  })

  test('calls onChange when clicking another tab', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()

    render(<Tab items={items} defaultActiveKey='paid' onChange={onChange} />)

    await user.click(screen.getByText('Display'))
    expect(onChange).toHaveBeenCalledWith('display')
  })

  test('controlled activeKey shows the correct content', () => {
    render(<Tab items={items} activeKey='paid' />)
    expect(screen.getByText('Paidsearch content')).toBeInTheDocument()
  })
})
