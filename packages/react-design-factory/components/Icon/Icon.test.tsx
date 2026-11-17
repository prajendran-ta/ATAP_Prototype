import React from 'react'
import { render, screen, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import { colors } from '../../styles'
import Icon, { iconRegistry } from './Icon'

describe('Icon', () => {
  describe('icon registry', () => {
    it('every registered icon has a loader that resolves to a module', async () => {
      const entries = Object.entries(iconRegistry)
      expect(entries.length).toBeGreaterThan(0)

      for (const [_, loader] of entries) {
        const renderedIcon = await loader()
        expect(renderedIcon).toBeDefined()
      }
    })
  })

  describe('rendering', () => {
    it('renders the SVG for a valid icon name', async () => {
      await act(async () => {
        render(<Icon name='check' />)
      })
      expect(screen.getByTestId('svg-mock')).toBeInTheDocument()
    })

    it('renders nothing for an invalid icon name and logs an error', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

      const { container } = render(<Icon name={'nonexistent' as any} />)

      expect(container.innerHTML).toBe('')
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('"nonexistent" not found'), expect.any(Array))

      consoleSpy.mockRestore()
    })
  })

  describe('props forwarding', () => {
    it('passes id, width, and height to the SVG element', async () => {
      await act(async () => {
        render(<Icon name='check' id='my-icon' width={24} height={24} />)
      })
      const svg = screen.getByTestId('svg-mock')
      expect(svg).toHaveAttribute('id', 'my-icon')
      expect(svg).toHaveAttribute('width', '24')
      expect(svg).toHaveAttribute('height', '24')
    })

    it('defaults height to width when only width is provided', async () => {
      await act(async () => {
        render(<Icon name='check' width={20} />)
      })
      const svg = screen.getByTestId('svg-mock')
      expect(svg).toHaveAttribute('width', '20')
      expect(svg).toHaveAttribute('height', '20')
    })

    it('defaults both width and height to 14 when neither is provided', async () => {
      await act(async () => {
        render(<Icon name='check' />)
      })
      const svg = screen.getByTestId('svg-mock')
      expect(svg).toHaveAttribute('width', '14')
      expect(svg).toHaveAttribute('height', '14')
    })

    it('falls back height to 14 when width is 0', async () => {
      await act(async () => {
        render(<Icon name='check' width={0} />)
      })
      const svg = screen.getByTestId('svg-mock')
      expect(svg).toHaveAttribute('width', '0')
      expect(svg).toHaveAttribute('height', '14')
    })

    it('uses the provided color directly', async () => {
      await act(async () => {
        render(<Icon name='check' color='red' />)
      })
      expect(screen.getByTestId('svg-mock')).toHaveAttribute('color', 'red')
    })

    it('derives color from status when color is not provided', async () => {
      await act(async () => {
        render(<Icon name='check' status='error' />)
      })
      expect(screen.getByTestId('svg-mock')).toHaveAttribute('color', colors.crimson_60)
    })
  })

  describe('title wrapper', () => {
    it('wraps the icon in a titled span when title is provided', async () => {
      await act(async () => {
        render(<Icon name='check' title='Approved' />)
      })
      const svg = screen.getByTestId('svg-mock')
      const wrapper = svg.parentElement!
      expect(wrapper.tagName).toBe('SPAN')
      expect(wrapper).toHaveAttribute('title', 'Approved')
    })

    it('does not wrap in a span when title is not provided', async () => {
      await act(async () => {
        render(<Icon name='check' />)
      })
      const svg = screen.getByTestId('svg-mock')
      // Without title, the wrapper is React.Fragment, so the parent is the Suspense boundary container
      expect(svg.parentElement!.tagName).not.toBe('SPAN')
    })
  })

  describe('caching', () => {
    it('reuses the cached component on a second render with the same icon name', async () => {
      await act(async () => {
        render(<Icon name='bell' />)
      })
      expect(screen.getByTestId('svg-mock')).toBeInTheDocument()

      // Render the same icon again — hits the cache branch
      await act(async () => {
        render(<Icon name='bell' />)
      })
      expect(screen.getAllByTestId('svg-mock').length).toBeGreaterThanOrEqual(1)
    })
  })
})
