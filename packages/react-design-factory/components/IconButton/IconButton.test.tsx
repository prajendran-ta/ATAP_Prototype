import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import IconButton from './IconButton'
import { ConfigProvider } from '../..'
import type { IconProps } from '../Icon/Icon.d'

jest.mock('../Icon/Icon', () => ({
  __esModule: true,
  iconRegistry: {},
  default: ({ name, color, status, width, height, id, title }: IconProps) => {
    const React = require('react')
    return React.createElement('svg', { 'data-testid': `icon-${String(name)}`, color, status, width, height, id, title })
  },
}))

const renderIconButton = (props: Partial<React.ComponentProps<typeof IconButton>> = {}) =>
  render(React.createElement(ConfigProvider, { children: <IconButton iconName='check' {...props} /> }))

describe('IconButton', () => {
  describe('general behavior', () => {
    it('renders a button with an icon inside', () => {
      renderIconButton()
      expect(screen.getByRole('button')).toBeInTheDocument()
      expect(screen.getByTestId('icon-check')).toBeInTheDocument()
      expect(screen.getByRole('button').contains(screen.getByTestId('icon-check'))).toBe(true)
    })

    it('calls onClick when clicked', () => {
      const onClick = jest.fn()
      renderIconButton({ onClick })
      fireEvent.click(screen.getByRole('button'))
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', () => {
      const onClick = jest.fn()
      renderIconButton({ onClick, disabled: true })
      fireEvent.click(screen.getByRole('button'))
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('color', () => {
    it('passes the color prop to the icon', () => {
      renderIconButton({ color: 'red' })
      expect(screen.getByTestId('icon-check')).toHaveAttribute('color', 'red')
    })

    it('does not pass a color to the icon when not provided', () => {
      renderIconButton()
      expect(screen.getByTestId('icon-check')).not.toHaveAttribute('color')
    })
  })

  describe('status', () => {
    it('passes the status prop to the icon', () => {
      renderIconButton({ status: 'error' })
      expect(screen.getByTestId('icon-check')).toHaveAttribute('status', 'error')
    })

    it('does not pass a status to the icon when not provided', () => {
      renderIconButton()
      expect(screen.getByTestId('icon-check')).not.toHaveAttribute('status')
    })
  })

  describe('width', () => {
    it('passes the width prop to the icon', () => {
      renderIconButton({ width: 24 })
      expect(screen.getByTestId('icon-check')).toHaveAttribute('width', '24')
    })

    it('does not pass a width to the icon when not provided', () => {
      renderIconButton()
      expect(screen.getByTestId('icon-check')).not.toHaveAttribute('width')
    })
  })

  describe('height', () => {
    it('passes the height prop to the icon', () => {
      renderIconButton({ height: 24 })
      expect(screen.getByTestId('icon-check')).toHaveAttribute('height', '24')
    })

    it('does not pass a height to the icon when not provided', () => {
      renderIconButton()
      expect(screen.getByTestId('icon-check')).not.toHaveAttribute('height')
    })
  })
})
