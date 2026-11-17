import React from 'react'
import Radio from 'antd/es/radio'
import DownOutlined from '@ant-design/icons/DownOutlined'
import type { CollapseProps } from 'antd/es/collapse'
import AntdCollapse from 'antd/es/collapse'
import type { BaseCollapseProps } from './Accordion.d'
import { AccordionWrapper, StyledCollapse, ExpandIconWrapper, PanelHeader, HeaderContent } from './Accordion.styled'

const { Panel } = AntdCollapse

const Accordion: React.FC<BaseCollapseProps> = ({
  items = [],
  defaultActiveKey = [],
  ghost = false,
  expandIconPosition = 'end',
  className = '',
  style = {},
  expandIcon: expandIconProp = 'default',
  disabled = false,
  onChange,
}) => {
  const expandIconFn: NonNullable<CollapseProps['expandIcon']> = panelProps => {
    const isActive = !!panelProps?.isActive

    if (typeof expandIconProp === 'function') {
      return expandIconProp(isActive)
    }

    if (expandIconProp === 'radio') {
      return <Radio checked={isActive} />
    }

    if (expandIconProp === 'default' || expandIconProp === undefined) {
      return (
        <ExpandIconWrapper active={isActive} disabled={disabled} aria-hidden>
          <DownOutlined rotate={isActive ? 180 : 0} />
        </ExpandIconWrapper>
      )
    }

    return expandIconProp
  }

  const collapseItems: CollapseProps['items'] = items.map(({ key, header, content }) => ({
    key,
    label: (
      <PanelHeader disabled={disabled} tabIndex={0} aria-disabled={disabled || undefined}>
        <HeaderContent>{header}</HeaderContent>
      </PanelHeader>
    ),
    children: content,
    collapsible: disabled ? 'disabled' : 'header',
  }))

  return (
    <AccordionWrapper>
      <StyledCollapse
        defaultActiveKey={defaultActiveKey}
        ghost={ghost}
        expandIconPosition={expandIconPosition}
        className={className}
        style={style}
        expandIcon={expandIconFn}
        onChange={onChange}
        items={collapseItems}
      />
    </AccordionWrapper>
  )
}

export default Accordion
