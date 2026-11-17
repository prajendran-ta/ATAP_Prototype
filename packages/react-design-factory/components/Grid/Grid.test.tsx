import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Row, Col } from './Grid'

const originalGetComputedStyle = window.getComputedStyle.bind(window)
beforeAll(() => {
  Object.defineProperty(window, 'getComputedStyle', {
    value: (el: Element, pseudoElt?: string | null) =>
      pseudoElt ? ({} as CSSStyleDeclaration) : originalGetComputedStyle(el),
    writable: true,
    configurable: true,
  })
})

afterAll(() => {
  Object.defineProperty(window, 'getComputedStyle', {
    value: originalGetComputedStyle,
    writable: true,
    configurable: true,
  })
})

describe('Grid — basic rendering', () => {
  it('renders Row with children', () => {
    render(
      <Row>
        <Col span={6}><span>Column content</span></Col>
      </Row>,
    )

    expect(screen.getByText('Column content')).toBeInTheDocument()
  })

  it('renders multiple Col children inside a Row', () => {
    render(
      <Row>
        <Col span={3}><span>Left</span></Col>
        <Col span={3}><span>Center</span></Col>
        <Col span={6}><span>Right</span></Col>
      </Row>,
    )

    expect(screen.getByText('Left')).toBeInTheDocument()
    expect(screen.getByText('Center')).toBeInTheDocument()
    expect(screen.getByText('Right')).toBeInTheDocument()
  })

  it('Col doubles the span value passed to antd', () => {
    const { container } = render(
      <Row noGutter>
        <Col span={3}><span>col</span></Col>
      </Row>,
    )

    // span={3} should be forwarded as span={6} → ant-col-6
    expect(container.querySelector('.ant-col-6')).toBeInTheDocument()
  })
})

describe('Row — noGutter', () => {
  it('applies a default gutter when noGutter is not set', () => {
    const { container } = render(
      <Row>
        <Col span={6}><span>col</span></Col>
      </Row>,
    )

    const row = container.firstChild as HTMLElement
    const style = row.getAttribute('style') ?? ''
    // antd applies negative inline margins when gutter is active
    expect(style).toMatch(/margin/)
  })

  it('applies no gutter margin when noGutter is true', () => {
    const { container } = render(
      <Row noGutter>
        <Col span={6}><span>col</span></Col>
      </Row>,
    )

    const row = container.firstChild as HTMLElement
    const style = row.getAttribute('style') ?? ''
    expect(style).not.toMatch(/margin/)
  })

  it('applies gutter when noGutter is explicitly false', () => {
    const { containerWithGutter } = (() => {
      const { container: containerWithGutter } = render(
        <Row noGutter={false}>
          <Col span={6}><span>col</span></Col>
        </Row>,
      )
      return { containerWithGutter }
    })()

    const row = containerWithGutter.firstChild as HTMLElement
    const style = row.getAttribute('style') ?? ''
    expect(style).toMatch(/margin/)
  })

  it('produces different inline styles for Row with and without noGutter', () => {
    const { container: withGutter } = render(
      <Row>
        <Col span={6}><span>A</span></Col>
      </Row>,
    )
    const { container: withoutGutter } = render(
      <Row noGutter>
        <Col span={6}><span>B</span></Col>
      </Row>,
    )

    const rowWithGutter = (withGutter.firstChild as HTMLElement).getAttribute('style') ?? ''
    const rowWithoutGutter = (withoutGutter.firstChild as HTMLElement).getAttribute('style') ?? ''

    expect(rowWithGutter).not.toBe(rowWithoutGutter)
  })
})
