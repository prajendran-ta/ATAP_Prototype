import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import FooterBar from './Footer'
import { ConfigProvider } from '../..'

const renderFooter = (props: Partial<React.ComponentProps<typeof FooterBar>> = {}) =>
  render(React.createElement(ConfigProvider, { children: <FooterBar {...props} footerCopy='amadeus it group sa' /> }))

describe('FooterBar Component', () => {
  describe('general behavior', () => {
    it('renders a footer element', () => {
      renderFooter()
      expect(document.querySelector('footer')).toBeInTheDocument()
    })

    it('renders footerCopy and versionLabel together', () => {
      renderFooter({ versionLabel: 'v2.0.0' })
      expect(screen.getByText(/amadeus it group sa/i)).toBeInTheDocument()
      expect(screen.getByText('v2.0.0')).toBeInTheDocument()
    })

    it('renders FooterIcon and BottomElementFooter together', () => {
      const FooterIcon = () => <svg data-testid='footer-icon' />
      renderFooter({
        FooterIcon,
        BottomElementFooter: <div data-testid='bottom-slot'>Extra</div>,
      })
      expect(screen.getByTestId('footer-icon')).toBeInTheDocument()
      expect(screen.getByTestId('bottom-slot')).toBeInTheDocument()
    })
  })

  describe('footerCopy', () => {
    it('renders the copy text inside the footer element', () => {
      renderFooter()
      expect(screen.getByText(/amadeus it group sa/i).closest('footer')).toBeInTheDocument()
    })

    it('renders without footerCopy when not provided', () => {
      render(React.createElement(ConfigProvider, { children: <FooterBar /> }))
      expect(screen.queryByText(/amadeus it group sa/i)).not.toBeInTheDocument()
    })
  })

  describe('FooterIcon', () => {
    it('renders the icon when FooterIcon is provided', () => {
      const FooterIcon = () => <svg data-testid='footer-icon' />
      renderFooter({ FooterIcon })
      expect(screen.getByTestId('footer-icon')).toBeInTheDocument()
    })

    it('does not render the icon when FooterIcon is not provided', () => {
      const FooterIcon = () => <svg data-testid='footer-icon' />
      renderFooter()
      expect(screen.queryByTestId('footer-icon')).not.toBeInTheDocument()
    })
  })

  describe('versionLabel', () => {
    it('renders the version label when provided', () => {
      renderFooter({ versionLabel: 'v1.2.3' })
      expect(screen.getByText('v1.2.3')).toBeInTheDocument()
    })

    it('does not render a version label when not provided', () => {
      renderFooter()
      expect(screen.queryByText(/^v\d/)).not.toBeInTheDocument()
    })
  })

  describe('BottomElementFooter', () => {
    it('renders BottomElementFooter after the footer element', () => {
      renderFooter({ BottomElementFooter: <div data-testid='bottom-slot'>Bottom content</div> })
      const footerEl = document.querySelector('footer')!
      const bottomEl = screen.getByTestId('bottom-slot')
      const isAfter = (footerEl.compareDocumentPosition(bottomEl) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0
      expect(isAfter).toBe(true)
    })

    it('renders BottomElementFooter outside the footer element', () => {
      renderFooter({ BottomElementFooter: <div data-testid='bottom-slot'>Bottom content</div> })
      expect(screen.getByTestId('bottom-slot').closest('footer')).toBeNull()
    })

    it('does not render BottomElementFooter when not provided', () => {
      renderFooter()
      expect(screen.queryByTestId('bottom-slot')).not.toBeInTheDocument()
    })
  })

  describe('collapsed', () => {
    it('applies a different Emotion class when collapsed changes', () => {
      const { rerender } = render(
        React.createElement(ConfigProvider, { children: <FooterBar footerCopy='test' collapsed={false} /> }),
      )
      const classExpanded = document.querySelector('footer')!.className

      rerender(React.createElement(ConfigProvider, { children: <FooterBar footerCopy='test' collapsed={true} /> }))
      const classCollapsed = document.querySelector('footer')!.className

      expect(classCollapsed).not.toBe(classExpanded)
    })
  })
})
