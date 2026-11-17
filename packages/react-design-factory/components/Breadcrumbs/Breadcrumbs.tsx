import React, { FC } from 'react'
import RightOutlinedIcon from '@ant-design/icons/RightOutlined'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { Button, Text } from '../..'
// Types
import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'
import type { BreadcrumbProps } from './Breadcrumb.d'
// Styles
import * as Styled from './Breadcrumbs.styled'

const Breadcrumb: FC<BreadcrumbProps> = ({ defaultHome, items, separator = <RightOutlinedIcon /> }) => {
  const { t } = useTranslation('design-system')
  const navigate = useNavigate()

  if (defaultHome) {
    items = [{ title: t('breadcrumbs.home'), href: '/' }, ...(items || [])]
  }

  const isExternalHref = (href?: string): boolean =>
    !!href && (href.startsWith('http://') || href.startsWith('https://'))

  const itemRender = (currentRoute: ItemType, params: any, routes: ItemType[], paths: string[]) => {
    const isLastItem = routes.indexOf(currentRoute) === routes.length - 1
    const href = currentRoute.href

    if (isLastItem || !href) {
      return <Text.Body>{currentRoute.title}</Text.Body>
    }

    // Internal links navigate client-side (SPA) to avoid a full-page reload — a hard reload
    // cold-boots the whole app (auth/GQL) and can error. External links open as usual.
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      if (isExternalHref(href)) return
      event.preventDefault()
      navigate(href)
    }

    return (
      <Button variant='text' href={href} onClick={handleClick}>
        {currentRoute.title}
      </Button>
    )
  }

  return <Styled.Breadcrumb separator={separator} items={items} itemRender={itemRender} />
}

export default Breadcrumb
