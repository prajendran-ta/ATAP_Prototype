import React from 'react'
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import Carousel from './Carousel'

describe('Carousel Component', () => {
  const slides = [
    { content: <img alt='slide-1' src='img1.jpg' />, title: 'Title 1', subtitle: 'Subtitle 1' },
    { content: <img alt='slide-2' src='img2.jpg' />, title: 'Title 2' },
    { content: <img alt='slide-3' src='img3.jpg' />, subtitle: 'Subtitle 3' },
    { content: <img alt='slide-4' src='img4.jpg' /> },
  ]

  const renderCarousel = () => render(<Carousel slides={slides as any} />)

  const getActiveSlide = (container: HTMLElement) =>
    container.querySelector('.slick-slide.slick-active:not(.slick-cloned)') as HTMLElement

  const clickNext = (container: HTMLElement) => {
    const next = container.querySelector('.slick-next') as HTMLElement
    fireEvent.click(next)
  }

  const clickPrev = (container: HTMLElement) => {
    const prev = container.querySelector('.slick-prev') as HTMLElement
    fireEvent.click(prev)
  }

  const clickDot = (container: HTMLElement, index: number) => {
    const dots = Array.from(container.querySelectorAll('.slick-dots li button')) as HTMLButtonElement[]
    fireEvent.click(dots[index])
  }

  it('renders captions only for slides that have title or subtitle', () => {
    const { container } = renderCarousel()

    const nonClonedSlides = container.querySelectorAll('.slick-slide:not(.slick-cloned)')
    const slidesWithCaptions = Array.from(nonClonedSlides).filter(slide =>
      slide.querySelector('[aria-label="Slide caption"]'),
    )

    expect(slidesWithCaptions.length).toBe(3)

    slidesWithCaptions.forEach(caption => {
      const captionGroup = caption.querySelector('[role="group"]')
      expect(captionGroup).toBeInTheDocument()
      expect(captionGroup).toHaveAttribute('aria-label', 'Slide caption')
    })
  })

  it('shows both title and subtitle for a slide that defines both', async () => {
    const { container } = renderCarousel()

    await waitFor(() => {
      const active = getActiveSlide(container)!
      const utils = within(active)
      expect(utils.getByText('Title 1')).toBeInTheDocument()
      expect(utils.getByText('Subtitle 1')).toBeInTheDocument()
    })
  })

  it('shows only title when only title is provided', async () => {
    const { container } = renderCarousel()

    clickDot(container, 1)
    await waitFor(() => {
      const active = getActiveSlide(container)!
      const utils = within(active)
      expect(utils.getByText('Title 2')).toBeInTheDocument()
      expect(utils.queryByText('Subtitle 2')).not.toBeInTheDocument()
    })
  })

  it('shows only subtitle when only subtitle is provided', async () => {
    const { container } = renderCarousel()

    clickDot(container, 2)
    await waitFor(() => {
      const active = getActiveSlide(container)!
      const utils = within(active)
      expect(utils.getByText('Subtitle 3')).toBeInTheDocument()
      expect(utils.queryByText('Title 3')).not.toBeInTheDocument()
    })
  })

  it('renders arrows and dots controls', () => {
    const { container } = renderCarousel()
    expect(container.querySelector('.slick-prev')).toBeInTheDocument()
    expect(container.querySelector('.slick-next')).toBeInTheDocument()
    expect(container.querySelector('.slick-dots')).toBeInTheDocument()
  })

  it('navigates to next slide using the next arrow', async () => {
    const { container } = renderCarousel()

    const getActiveTitle = () =>
      getActiveSlide(container)?.querySelector('[aria-label="Slide caption"]')?.textContent?.trim() ?? null

    const initialTitle = getActiveTitle()
    clickNext(container)

    await waitFor(() => {
      const updatedTitle = getActiveTitle()
      expect(updatedTitle).not.toBe(initialTitle)
      expect(updatedTitle).toContain('Title 2')
    })
  })

  it('navigates back using the prev arrow', async () => {
    const { container } = renderCarousel()

    clickNext(container)
    await waitFor(() => {
      const active = getActiveSlide(container)!
      expect(within(active).getByText('Title 2')).toBeInTheDocument()
    })

    clickPrev(container)
    await waitFor(() => {
      const active = getActiveSlide(container)!
      expect(within(active).getByText('Title 1')).toBeInTheDocument()
    })
  })

  it('navigates by clicking dots to any slide', async () => {
    const { container } = renderCarousel()

    clickDot(container, 2)
    await waitFor(() => {
      const active = getActiveSlide(container)!
      expect(within(active).getByText('Subtitle 3')).toBeInTheDocument()
    })

    clickDot(container, 1)
    await waitFor(() => {
      const active = getActiveSlide(container)!
      expect(within(active).getByText('Title 2')).toBeInTheDocument()
      expect(within(active).queryByText('Subtitle 2')).not.toBeInTheDocument()
    })
  })
})
