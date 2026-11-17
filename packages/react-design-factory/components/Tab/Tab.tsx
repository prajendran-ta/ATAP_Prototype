import React from 'react'
import AntdTabs from 'antd/es/tabs'
import { TabProps } from './Tab.d'
import { TabStyles } from './Tab.styled'

const Tab: React.FC<TabProps> = props => {
  return (
    <TabStyles>
      <AntdTabs {...props} />
    </TabStyles>
  )
}

export default Tab
