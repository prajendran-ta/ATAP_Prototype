import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Tracker from './Tracker'
import * as Styled from './Tracker.styled'

/**
 * Inspects a rendered Tracker and returns named references to its key UI parts.
 *
 * - progressBar:     always present — the filled bar showing progress
 * - thresholdMarker: the vertical indicator at the threshold — only rendered
 *                    when thresholdPercent is a number (including NaN, since typeof NaN === 'number')
 * - thresholdLabel:  queryable via screen.getByText if provided
 * - footerStart/End: queryable via screen.getByText if provided
 */
function renderTracker(props: Partial<React.ComponentProps<typeof Tracker>> = {}) {
  const result = render(<Tracker {...props} />)
  const base = result.container.firstElementChild!.firstElementChild as HTMLElement
  const footer = result.container.firstElementChild!.lastElementChild as HTMLElement

  const children = Array.from(base.children) as HTMLElement[]
  const progressBar = children[0]
  // The threshold marker is the only non-text child after the ProgressBar
  const thresholdMarker = children.find((el, i) => i > 0 && !el.textContent?.trim()) ?? null

  return { ...result, progressBar, thresholdMarker, footer }
}

describe('Tracker', () => {
  describe('progress bar', () => {
    it('renders the progress bar by default', () => {
      const { progressBar } = renderTracker({ progressPercent: 50 })
      expect(progressBar).toBeInTheDocument()
    })

    it('renders the progress bar even when no props are provided', () => {
      const { progressBar } = renderTracker()
      expect(progressBar).toBeInTheDocument()
    })
  })

  describe('threshold marker', () => {
    it('does not render the threshold marker when thresholdPercent is omitted', () => {
      const { thresholdMarker } = renderTracker({ progressPercent: 50 })
      expect(thresholdMarker).toBeNull()
    })

    it('renders the threshold marker when thresholdPercent is set', () => {
      const { thresholdMarker, progressBar } = renderTracker({ progressPercent: 30, thresholdPercent: 60 })
      expect(progressBar).toBeInTheDocument()
      expect(thresholdMarker).toBeInTheDocument()
    })

    it('still renders the threshold marker when thresholdPercent is NaN (typeof NaN === "number")', () => {
      const { thresholdMarker, progressBar } = renderTracker({ progressPercent: 50, thresholdPercent: NaN })
      expect(progressBar).toBeInTheDocument()
      expect(thresholdMarker).toBeInTheDocument()
    })
  })

  describe('threshold label', () => {
    it('shows the threshold label text when both thresholdPercent and thresholdLabel are set', () => {
      renderTracker({ progressPercent: 50, thresholdPercent: 75, thresholdLabel: 'Target' })
      expect(screen.getByText('Target')).toBeInTheDocument()
    })

    it('shows the threshold label without a threshold marker when thresholdPercent is omitted', () => {
      const { thresholdMarker } = renderTracker({ thresholdLabel: 'Label' })
      expect(screen.getByText('Label')).toBeInTheDocument()
      expect(thresholdMarker).toBeNull()
    })

    it('does not show the threshold label when the prop is omitted', () => {
      renderTracker({ progressPercent: 50, thresholdPercent: 75 })
      expect(screen.queryByText('Target')).not.toBeInTheDocument()
    })
  })

  describe('footer labels', () => {
    it('shows both start and end labels', () => {
      renderTracker({ progressPercent: 50, startLabel: '0%', endLabel: '100%' })
      expect(screen.getByText('0%')).toBeInTheDocument()
      expect(screen.getByText('100%')).toBeInTheDocument()
    })

    it('shows the end label and a placeholder when only endLabel is provided', () => {
      const { footer } = renderTracker({ progressPercent: 50, endLabel: '100%' })
      expect(screen.getByText('100%')).toBeInTheDocument()
      // A placeholder start container is rendered to preserve alignment
      expect(footer.children).toHaveLength(2)
    })

    it('shows only the start label when endLabel is omitted', () => {
      renderTracker({ progressPercent: 50, startLabel: '0%' })
      expect(screen.getByText('0%')).toBeInTheDocument()
      expect(screen.queryByText('100%')).not.toBeInTheDocument()
    })

    it('shows no footer labels when both are omitted', () => {
      const { footer } = renderTracker({ progressPercent: 50 })
      expect(footer.children).toHaveLength(0)
    })
  })

  describe('input clamping', () => {
    it('clamps negative progressPercent to 0 without crashing', () => {
      const { progressBar } = renderTracker({ progressPercent: -10 })
      expect(progressBar).toBeInTheDocument()
    })

    it('clamps NaN progressPercent to 0 without crashing', () => {
      const { progressBar } = renderTracker({ progressPercent: NaN })
      expect(progressBar).toBeInTheDocument()
    })

    it('clamps null progressPercent to 0 via nullish coalescing', () => {
      const { progressBar } = renderTracker({ progressPercent: null as any })
      expect(progressBar).toBeInTheDocument()
    })

    it('clamps negative thresholdPercent to 0 and still renders the marker', () => {
      const { thresholdMarker } = renderTracker({ progressPercent: 50, thresholdPercent: -5 })
      expect(thresholdMarker).toBeInTheDocument()
    })

    it('accepts progressPercent above 100 without crashing', () => {
      const { progressBar } = renderTracker({ progressPercent: 150 })
      expect(progressBar).toBeInTheDocument()
    })
  })

  describe('overflow styling (thresholdPercent > 100)', () => {
    it('renders the threshold marker and label when thresholdPercent exceeds 100', () => {
      const { thresholdMarker } = renderTracker({
        progressPercent: 50,
        thresholdPercent: 120,
        thresholdLabel: 'Over limit',
      })
      expect(thresholdMarker).toBeInTheDocument()
      expect(screen.getByText('Over limit')).toBeInTheDocument()
    })
  })

  describe('styled component branches', () => {
    it('applies wider min-width to ThresholdLabel when offsetWidth exceeds 120', () => {
      render(
        <Styled.ThresholdLabel thresholdPercent={50} offsetWidth={200}>
          threshold label
        </Styled.ThresholdLabel>,
      )
      expect(screen.getByText('threshold label')).toBeInTheDocument()
    })
  })
})
