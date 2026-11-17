import { AccordionItem } from '../Accordion/Accordion.d'
import { CollapseProps as AntdCollapseProps } from 'antd/es/collapse'

export interface AccordionGroupProps
  extends Pick<
    AntdCollapseProps,
    'id' | 'children' | 'ghost' | 'expandIconPosition' | 'style' | 'defaultActiveKey' | 'className'
  > {
  classNamePrefix?: string
  items: AccordionItem[]
  withHeaderIndex?: boolean
  disabled?: boolean
}
