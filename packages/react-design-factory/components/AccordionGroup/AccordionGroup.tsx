import React from 'react'
import { Accordion } from '../Accordion'
import type { AccordionGroupProps } from './AccordionGroup.d'
import { HeaderWrapper, HeaderIndex, HeaderContent } from './AccordionGroup.styled'

const AccordionGroup: React.FC<AccordionGroupProps> = ({ items, withHeaderIndex = false, ...rest }) => {
  const enhancedItems = withHeaderIndex
    ? items.map((item, index) => ({
        ...item,
        header: (
          <HeaderWrapper>
            <HeaderIndex>{index + 1}</HeaderIndex>
            <HeaderContent>{item.header}</HeaderContent>
          </HeaderWrapper>
        ),
      }))
    : items

  return <Accordion {...rest} items={enhancedItems} />
}

export default AccordionGroup
