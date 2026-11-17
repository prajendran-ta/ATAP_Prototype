import React from 'react'
import * as Styled from './PublisherPreviewPage.styled'

// Story photo served from public/Images, cropped to the slot with object-fit: cover.
export const StoryImage: React.FC<{ src: string; alt: string; hue?: number; ratio?: string }> = ({
  src,
  alt,
  hue = 210,
  ratio,
}) => (
  <Styled.Thumb $hue={hue} $ratio={ratio} style={{ overflow: 'hidden' }}>
    <img
      src={src}
      alt={alt}
      loading='lazy'
      style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
    />
  </Styled.Thumb>
)
