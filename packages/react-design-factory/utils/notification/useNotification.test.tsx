import React from 'react'
import { renderHook } from '@testing-library/react'
import '@testing-library/jest-dom'
import { App } from '../..'
import { useNotification } from './useNotification'

const mockNotification = {
  success: jest.fn(),
  error: jest.fn(),
  info: jest.fn(),
  warning: jest.fn(),
}

beforeEach(() => {
  jest.clearAllMocks()
  jest.spyOn(App, 'useApp').mockReturnValue({ notification: mockNotification } as any)
})

describe('useNotification', () => {
  describe('success', () => {
    it('calls notification.success with the message string when no config is provided', () => {
      const { result } = renderHook(() => useNotification())
      result.current.success('Saved successfully')
      expect(mockNotification.success).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Saved successfully', placement: 'bottomLeft' }),
      )
    })

    it('passes description when provided', () => {
      const { result } = renderHook(() => useNotification())
      result.current.success('Saved', { description: 'Your changes have been saved.' })
      expect(mockNotification.success).toHaveBeenCalledWith(
        expect.objectContaining({ description: 'Your changes have been saved.' }),
      )
    })

    it('uses a React element as message when onUndo is provided', () => {
      const { result } = renderHook(() => useNotification())
      result.current.success('Item deleted', { onUndo: jest.fn().mockResolvedValue(undefined) })
      const [config] = mockNotification.success.mock.calls[0]
      expect(React.isValidElement(config.message)).toBe(true)
    })

    it('includes width fit-content style when onUndo is provided', () => {
      const { result } = renderHook(() => useNotification())
      result.current.success('Item deleted', { onUndo: jest.fn().mockResolvedValue(undefined) })
      const [config] = mockNotification.success.mock.calls[0]
      expect(config.style).toMatchObject({ width: 'fit-content' })
    })

    it('does not include width style when onUndo is not provided', () => {
      const { result } = renderHook(() => useNotification())
      result.current.success('Saved')
      const [config] = mockNotification.success.mock.calls[0]
      expect(config.style).not.toHaveProperty('width')
    })
  })

  describe('error', () => {
    it('calls notification.error with the message', () => {
      const { result } = renderHook(() => useNotification())
      result.current.error('Something failed')
      expect(mockNotification.error).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Something failed', placement: 'bottomLeft' }),
      )
    })

    it('passes description when provided', () => {
      const { result } = renderHook(() => useNotification())
      result.current.error('Something failed', { description: 'Please try again.' })
      expect(mockNotification.error).toHaveBeenCalledWith(expect.objectContaining({ description: 'Please try again.' }))
    })

    it('includes a custom icon', () => {
      const { result } = renderHook(() => useNotification())
      result.current.error('Something failed')
      const [config] = mockNotification.error.mock.calls[0]
      expect(React.isValidElement(config.icon)).toBe(true)
    })
  })

  describe('info', () => {
    it('calls notification.info with the message', () => {
      const { result } = renderHook(() => useNotification())
      result.current.info('Just so you know')
      expect(mockNotification.info).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Just so you know', placement: 'bottomLeft' }),
      )
    })

    it('passes description when provided', () => {
      const { result } = renderHook(() => useNotification())
      result.current.info('Just so you know', { description: 'Extra detail.' })
      expect(mockNotification.info).toHaveBeenCalledWith(expect.objectContaining({ description: 'Extra detail.' }))
    })
  })

  describe('warning', () => {
    it('calls notification.warning with the message', () => {
      const { result } = renderHook(() => useNotification())
      result.current.warning('Watch out')
      expect(mockNotification.warning).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Watch out', placement: 'bottomLeft' }),
      )
    })

    it('passes description when provided', () => {
      const { result } = renderHook(() => useNotification())
      result.current.warning('Watch out', { description: 'This may cause issues.' })
      expect(mockNotification.warning).toHaveBeenCalledWith(
        expect.objectContaining({ description: 'This may cause issues.' }),
      )
    })

    it('includes a custom icon', () => {
      const { result } = renderHook(() => useNotification())
      result.current.warning('Watch out')
      const [config] = mockNotification.warning.mock.calls[0]
      expect(React.isValidElement(config.icon)).toBe(true)
    })
  })
})
