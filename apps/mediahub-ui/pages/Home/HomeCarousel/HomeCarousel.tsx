import React from 'react'
import { Carousel } from '@amadeus/react-design-factory/components/Carousel'
import { Content, SlideImage } from './HomeCarousel.styled'
import slideImage from '@mediahub/mediahub-ui/assets/tmp-dashboard-landing.png'

const HomeCarousel: React.FC = () => {
  const slides = [
    {
      content: (
        <Content>
          <SlideImage src={slideImage} alt='Slide 1' />
        </Content>
      ),
    },
    {
      content: (
        <Content>
          <SlideImage src={slideImage} alt='Slide 2' />
        </Content>
      ),
    },
    {
      content: (
        <Content>
          <SlideImage src={slideImage} alt='Slide 3' />
        </Content>
      ),
    },
  ]

  return <Carousel slides={slides} />
}

export default HomeCarousel
