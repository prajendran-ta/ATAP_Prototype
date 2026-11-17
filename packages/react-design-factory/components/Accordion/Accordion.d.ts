import type { ReactNode } from 'react'
import type { CollapseProps as AntdCollapseProps } from 'antd/es/collapse'
import type { CollapsePanelProps as AntdCollapsePanelProps } from 'antd/es/collapse'

export interface AccordionItem extends Pick<AntdCollapsePanelProps, 'key' | 'header'> {
  content: ReactNode
  headerIndex?: number
}

export interface BaseCollapseProps extends Pick<
  AntdCollapseProps,
  | 'id'
  | 'children'
  | 'ghost'
  | 'expandIconPosition'
  | 'expandIconPosition'
  | 'style'
  | 'defaultActiveKey'
  | 'className'
  | 'onChange'
> {
  items?: AccordionItem[]
  expandIcon?: 'default' | 'radio' | ((isActive: boolean) => React.ReactNode) | ReactNode
  classNamePrefix?: string
  disabled?: boolean
}
