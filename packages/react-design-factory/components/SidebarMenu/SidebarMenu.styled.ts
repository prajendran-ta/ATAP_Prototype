import styled from '@emotion/styled'
import Search from 'antd/es/input/Search'
import Menu from 'antd/es/menu'

export const SidebarContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
`

export const SearchWrapper = styled.div`
  padding: 8px;
`

export const MenuWrapper = styled.div`
  flex: 1;
  min-height: 0;
`

export const StyledSearch = styled(Search)`
  width: 100%;
`

export const StyledMenu = styled(Menu)`
  height: 100%;
  border-right: 0;
`
