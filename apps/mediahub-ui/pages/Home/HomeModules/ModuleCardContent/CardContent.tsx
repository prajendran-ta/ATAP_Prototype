import React from 'react'
import Popover from 'antd/es/popover'
import { ContentWrapper, Description, LinksWrapper } from './CardContent.styled'
import { Link } from '@amadeus/react-design-factory'
import { useNavigate } from 'react-router'

export type LinkItem = {
  label: string
  url?: string
  subLinks?: { label: string; url: string }[]
}

export type CardContentProps = {
  description: string
  links?: LinkItem[]
}

const CardContent: React.FC<CardContentProps> = ({ description, links = [] }) => {
  const navigate = useNavigate()

  const handleNavigation = (href?: string) => {
    if (!href) return
    const isExternal = href.startsWith('http://') || href.startsWith('https://')
    if (isExternal) {
      window.open(href, '_blank')
    } else {
      navigate(href)
    }
  }
  return (
    <ContentWrapper>
      <Description>{description}</Description>

      {links.length > 0 && (
        <LinksWrapper aria-label='Amadeus Home Modules links'>
          {links.map((link, index) => {
            if (link.subLinks && link.subLinks.length > 0) {
              const popoverContent = (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {link.subLinks.map((subLink, subIndex) => (
                    <Link key={subIndex} onClick={() => handleNavigation(subLink.url)}>
                      {subLink.label}
                    </Link>
                  ))}
                </div>
              )

              return (
                <Popover key={index} content={popoverContent} trigger='hover' placement='bottom'>
                  <Link
                    key={index}
                    id={`amadeus-home-modules-link-${index}`}
                    href='#'
                    onClick={e => e.preventDefault()}
                  >
                    {link.label}
                  </Link>
                </Popover>
              )
            }

            return (
              <Link key={index} onClick={() => handleNavigation(link.url as string)}>
                {link.label}
              </Link>
            )
          })}
        </LinksWrapper>
      )}
    </ContentWrapper>
  )
}

export default CardContent
