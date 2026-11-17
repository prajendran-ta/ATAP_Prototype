import React from 'react'
import { SectionLayoutProps } from './SectionLayout.d'
import { Link, Text } from '@amadeus/react-design-factory'
import { Wrapper, Header } from './SectionLayout.styled'

const SectionLayout: React.FC<SectionLayoutProps> = ({ title, children, style, titleStyle, link }) => (
  <Wrapper style={style}>
    <Header>
      <Text.H5>{title}</Text.H5>
      {link?.enabled && link.url && link.title && (
        <Link id='home-notifications-link' href={link.url}>
          {link.title}
        </Link>
      )}
    </Header>
    {children}
  </Wrapper>
)

export default SectionLayout
