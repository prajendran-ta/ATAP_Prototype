import { CarouselProps as AntdCarouselProps } from 'antd/es/carousel'

export interface Slide extends Pick<AntdCarouselProps, 'id'> {
  content: React.ReactNode
  title?: string
  subtitle?: string
}

export interface CarouselProps extends Pick<AntdCarouselProps, 'id' | 'infinite' | 'dotPosition'> {
  slides: Slide[]
}
