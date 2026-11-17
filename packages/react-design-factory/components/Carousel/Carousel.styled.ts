import styled from '@emotion/styled'
import AntdCarousel from 'antd/es/carousel'
import { colors } from '../../styles'

export const StyledCarousel = styled(AntdCarousel)`
  height: 200px;

  .slick-slider,
  .slick-list,
  .slick-track,
  .slick-slide,
  .slick-slide > div {
    height: 100%;
    line-height: 0;
  }

  .slick-arrow {
    z-index: 5;
  }

  .slick-next:after {
    color: ${colors.sky_60};
    border: none;
    transform: rotate(0deg);
    zoom: 0.7;
    position: relative;
    top: -5px;
    left: -30px;
    content: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzciIGhlaWdodD0iMzciIHZpZXdCb3g9IjAgMCAzNyAzNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMzYuNSIgeT0iMzYuMjE4OCIgd2lkdGg9IjM2IiBoZWlnaHQ9IjM2IiByeD0iNiIgdHJhbnNmb3JtPSJyb3RhdGUoLTE4MCAzNi41IDM2LjIxODgpIiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjU1Ii8+CjxwYXRoIGQ9Ik0xNC4yNDc4IDI1Ljg2NjZDMTQuMDIyMyAyNS42NDEgMTMuODk1NiAyNS4zMzUxIDEzLjg5NTYgMjUuMDE2MUMxMy44OTU2IDI0LjY5NzIgMTQuMDIyMyAyNC4zOTEzIDE0LjI0NzggMjQuMTY1N0wyMC4yMDIgMTguMjExNUwxNC4yNDc4IDEyLjI1NzNDMTQuMDI4NyAxMi4wMzA0IDEzLjkwNzQgMTEuNzI2NiAxMy45MTAyIDExLjQxMTJDMTMuOTEyOSAxMS4wOTU4IDE0LjAzOTQgMTAuNzk0MSAxNC4yNjI0IDEwLjU3MTFDMTQuNDg1NSAxMC4zNDggMTQuNzg3MSAxMC4yMjE1IDE1LjEwMjUgMTAuMjE4OEMxNS40MTc5IDEwLjIxNjEgMTUuNzIxOCAxMC4zMzczIDE1Ljk0ODYgMTAuNTU2NEwyMi43NTMzIDE3LjM2MTFDMjIuOTc4OCAxNy41ODY2IDIzLjEwNTUgMTcuODkyNSAyMy4xMDU1IDE4LjIxMTVDMjMuMTA1NSAxOC41MzA0IDIyLjk3ODggMTguODM2MyAyMi43NTMzIDE5LjA2MTlMMTUuOTQ4NiAyNS44NjY2QzE1LjcyMzEgMjYuMDkyMSAxNS40MTcyIDI2LjIxODcgMTUuMDk4MiAyNi4yMTg3QzE0Ljc3OTIgMjYuMjE4NyAxNC40NzMzIDI2LjA5MjEgMTQuMjQ3OCAyNS44NjY2WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==');
  }

  .slick-prev:after {
    color: ${colors.sky_60};
    border: none;
    transform: rotate(180deg);
    zoom: 0.7;
    position: relative;
    top: 20px;
    left: 30px;
    content: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzciIGhlaWdodD0iMzciIHZpZXdCb3g9IjAgMCAzNyAzNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMzYuNSIgeT0iMzYuMjE4OCIgd2lkdGg9IjM2IiBoZWlnaHQ9IjM2IiByeD0iNiIgdHJhbnNmb3JtPSJyb3RhdGUoLTE4MCAzNi41IDM2LjIxODgpIiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjU1Ii8+CjxwYXRoIGQ9Ik0xNC4yNDc4IDI1Ljg2NjZDMTQuMDIyMyAyNS42NDEgMTMuODk1NiAyNS4zMzUxIDEzLjg5NTYgMjUuMDE2MUMxMy44OTU2IDI0LjY5NzIgMTQuMDIyMyAyNC4zOTEzIDE0LjI0NzggMjQuMTY1N0wyMC4yMDIgMTguMjExNUwxNC4yNDc4IDEyLjI1NzNDMTQuMDI4NyAxMi4wMzA0IDEzLjkwNzQgMTEuNzI2NiAxMy45MTAyIDExLjQxMTJDMTMuOTEyOSAxMS4wOTU4IDE0LjAzOTQgMTAuNzk0MSAxNC4yNjI0IDEwLjU3MTFDMTQuNDg1NSAxMC4zNDggMTQuNzg3MSAxMC4yMjE1IDE1LjEwMjUgMTAuMjE4OEMxNS40MTc5IDEwLjIxNjEgMTUuNzIxOCAxMC4zMzczIDE1Ljk0ODYgMTAuNTU2NEwyMi43NTMzIDE3LjM2MTFDMjIuOTc4OCAxNy41ODY2IDIzLjEwNTUgMTcuODkyNSAyMy4xMDU1IDE4LjIxMTVDMjMuMTA1NSAxOC41MzA0IDIyLjk3ODggMTguODM2MyAyMi43NTMzIDE5LjA2MTlMMTUuOTQ4NiAyNS44NjY2QzE1LjcyMzEgMjYuMDkyMSAxNS40MTcyIDI2LjIxODcgMTUuMDk4MiAyNi4yMTg3QzE0Ljc3OTIgMjYuMjE4NyAxNC40NzMzIDI2LjA5MjEgMTQuMjQ3OCAyNS44NjY2WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==');
  }

  .slick-dots li button,
  .slick-dots li:after {
    background-color: ${colors.cloud_0};
  }
`

export const Wrapper = styled.div`
  &:not(:has(.amadeus-carousel .slick-active .hero-caption)) .amadeus-carousel .slick-dots li button,
  &:not(:has(.amadeus-carousel .slick-active .hero-caption)) .amadeus-carousel .slick-dots li:after {
    background-color: ${colors.sky_60};
  }
`

export const HeroSlide = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

export const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
`

export const HeroGradient = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: var(--mask-height, 30%);
  background: rgba(0, 0, 0, 0.25);
`

export const HeroCaption = styled.div`
  position: absolute;
  left: var(--cap-left, 24px);
  right: var(--cap-right, 24px);
  bottom: var(--cap-bottom, 24px);
  z-index: 2;
  color: ${colors.cloud_0};
  pointer-events: auto;
`

export const HeroTitle = styled.h3`
  margin: 0 0 4px;
  line-height: 1.2;
  display: flex;
  justify-content: center;
`

export const HeroSubtitle = styled.p`
  margin: 0;
  line-height: 1.4;
  opacity: 0.95;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`
