import React, { useMemo, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import type { SidebarMenuProps, SidebarMenuNode } from './SidebarMenu.d'
import type { MenuProps } from 'antd/es/menu'
import { SidebarContainer, SearchWrapper, MenuWrapper, StyledSearch, StyledMenu } from './SidebarMenu.styled'
import { useNavigate, useLocation } from 'react-router'

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  id,
  collapsed,
  setCollapsed,
  items,
  onSelect,
  style,
  showSearch = false,
  searchPlaceholder,
}) => {
  const { t } = useTranslation('design-system')
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const filterItems = useCallback((nodes: SidebarMenuNode[], searchTerm: string): SidebarMenuNode[] => {
    if (!searchTerm) return nodes
    const needle = searchTerm.toLowerCase()

    const walk = (arr: SidebarMenuNode[]): SidebarMenuNode[] =>
      arr
        .map(node => {
          const selfMatch = node.label.toLowerCase().includes(needle)
          const hasChildren = Array.isArray(node.children) && node.children.length > 0

          if (hasChildren) {
            const filteredChildren = walk(node.children!)
            if (selfMatch) return { ...node }
            if (filteredChildren.length) return { ...node, children: filteredChildren }
            return null
          }

          return selfMatch ? { ...node } : null
        })
        .filter(Boolean) as SidebarMenuNode[]

    return walk(nodes)
  }, [])

  const filteredItems = useMemo(() => filterItems(items, query), [items, query, filterItems])

  const renderNodes = useCallback(
    (nodes: SidebarMenuNode[]): MenuProps['items'] => {
      return nodes.map(item => {
        const icon = item.icon
        const hasChildren = !!item.children?.length

        const label = <div>{item.label}</div>

        return {
          key: item.key,
          icon,
          label,
          children: hasChildren ? renderNodes(item.children!) : undefined,
        }
      })
    },
    [filteredItems],
  )

  const flatItems = useMemo(() => {
    const flatten = (nodes: SidebarMenuNode[]): SidebarMenuNode[] =>
      nodes.flatMap(node => (node.children ? [node, ...flatten(node.children)] : [node]))
    return flatten(filteredItems)
  }, [filteredItems])

  const selectedKey = useMemo(() => {
    const currentPath = location.pathname
    const match = flatItems.find(item => {
      if (item.href === currentPath) return true
      if (item.activePatterns?.length) return item.activePatterns.some(p => currentPath.startsWith(p))
      return false
    })
    return match ? [match.key] : []
  }, [location.pathname, flatItems])

  return (
    <SidebarContainer style={style}>
      {!collapsed && showSearch && (
        <SearchWrapper>
          <StyledSearch
            allowClear
            placeholder={searchPlaceholder ?? t('sidebar.searchPlaceholder')}
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </SearchWrapper>
      )}

      <MenuWrapper>
        <StyledMenu
          id={id}
          mode='inline'
          theme='light'
          selectedKeys={selectedKey}
          style={{ borderRight: 'none' }}
          onSelect={info => {
            //handle internal React navigation or full redirect
            const selectedItem = flatItems.find(item => item.key === info.key)
            if (selectedItem?.href) {
              const isExternal = selectedItem.href.startsWith('http://') || selectedItem.href.startsWith('https://')
              if (isExternal) {
                window.open(selectedItem.href, '_blank')
              } else {
                navigate(selectedItem.href)
              }
            }
            onSelect?.(info.key)
          }}
          items={
            filteredItems.length > 0
              ? renderNodes(filteredItems)
              : [{ key: '__no_results', label: t('sidebar.noResults'), disabled: true }]
          }
        />
      </MenuWrapper>
    </SidebarContainer>
  )
}

export default SidebarMenu
