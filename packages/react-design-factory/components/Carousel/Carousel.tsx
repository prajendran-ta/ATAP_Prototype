import React from 'react'
import type { CarouselProps } from './Carousel.d'
import {
  Wrapper,
  StyledCarousel,
  HeroSlide,
  HeroOverlay,
  HeroGradient,
  HeroCaption,
  HeroTitle,
  HeroSubtitle,
} from './Carousel.styled'

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  return (
    <Wrapper>
      <StyledCarousel arrows dots>
        {slides.map((slide, index) => {
          const hasCaption = Boolean(slide.title || slide.subtitle)

          return (
            <HeroSlide key={index}>
              {slide.content}

              {hasCaption && (
                <>
                  <HeroOverlay aria-hidden='true'>
                    <HeroGradient />
                  </HeroOverlay>

                  <HeroCaption role='group' aria-label='Slide caption'>
                    {slide.title && <HeroTitle>{slide.title}</HeroTitle>}
                    {slide.subtitle && <HeroSubtitle>{slide.subtitle}</HeroSubtitle>}
                  </HeroCaption>
                </>
              )}
            </HeroSlide>
          )
        })}
      </StyledCarousel>
    </Wrapper>
  )
}

export default Carousel
