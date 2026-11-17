import type { TabsProps as AntdTabsProps } from 'antd/es/tabs'

export interface TabProps extends Pick<AntdTabsProps, 'id' | 'items' | 'activeKey' | 'defaultActiveKey' | 'onChange'> {}

export type TabItem = NonNullable<AntdTabsProps['items']>[number]
