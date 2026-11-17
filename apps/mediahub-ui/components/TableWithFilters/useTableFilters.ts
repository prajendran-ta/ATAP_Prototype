import { useCallback, useEffect, useState } from 'react'
import type { TablePaginationConfig } from 'antd/es/table/interface'
import {
  UseTableFiltersOptions,
  UseTableFiltersReturn,
  FiltersRecord,
  GetNestedValueFn,
  SearchWithKeysFn,
  SearchWithoutKeysFn,
} from './useTableFilters.d'
import { useDebounce } from '@amadeus/react-utils'

const getNestedValue: GetNestedValueFn = (obj, path) => {
  if (!obj || !path) return undefined

  const normalized = path.replace(/\[(\d+)\]/g, '.$1')
  const keys = normalized.split('.')

  let curr: any = obj
  for (const key of keys) {
    if (curr == null) return undefined
    curr = curr[key]
  }

  return curr
}

const searchWithKeys: SearchWithKeysFn<any> = (row, searchTerm, searchKeys, normalize, getNestedValueFn) => {
  return searchKeys.some(field => {
    const raw = field.includes('.') ? getNestedValueFn(row, field) : row[field]

    return normalize(raw).includes(searchTerm)
  })
}

const searchWithoutKeys: SearchWithoutKeysFn<any> = (row, searchTerm, normalize) => {
  const rowValues = Object.values(row).map(val => normalize(val))
  return rowValues.some(val => val.includes(searchTerm))
}

export function useTableFilters<T extends Record<string, any>>(
  options: UseTableFiltersOptions<T>,
): UseTableFiltersReturn<T> {
  const {
    columns,
    pageSize,
    filterMode,
    queryFn,
    serverDebounceMs = 400,
    filterItems,
    initialFilters,
    clientSideFilters = [],
    tableSearch,
  } = options

  const [data, setData] = useState<T[]>([])
  const [baseData, setBaseData] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [filters, setFiltersState] = useState<FiltersRecord<T>>(initialFilters)
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize,
    total: 0,
  })
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedKeys)
    },
  }

  const isClientPagination = clientSideFilters.includes('pagination')

  // Split filters into server and client
  const splitFilters = (allFilters: FiltersRecord<T>) => {
    const serverFilters: FiltersRecord<T> = {}
    const localFilters: FiltersRecord<T> = {}

    Object.entries(allFilters).forEach(([key, value]) => {
      if (clientSideFilters.includes(key as keyof T)) {
        localFilters[key as keyof T] = value
      } else {
        serverFilters[key as keyof T] = value
      }
    })

    return { serverFilters, localFilters }
  }

  // Apply local filters logic
  const applyLocalFilters = (data: T[], localFilters: FiltersRecord<T>): T[] => {
    const normalize = (x: unknown): string => {
      if (x == null) return ''
      if (typeof x === 'object') return JSON.stringify(x).toLowerCase()
      return String(x).trim().toLowerCase()
    }

    const searchTerm = normalize(localFilters['search'])
    const otherFilters = Object.entries(localFilters).filter(([key]) => key !== 'search')
    const searchKeys = tableSearch?.keys ?? []

    return data.filter(row => {
      if (searchTerm) {
        const hasKeys = searchKeys.length > 0

        const matches = hasKeys
          ? searchWithKeys(row, searchTerm, searchKeys, normalize, getNestedValue)
          : searchWithoutKeys(row, searchTerm, normalize)

        if (!matches) return false
      }

      return otherFilters.every(([field, value]) => {
        const rowValue = normalize((row as any)[field])
        if (Array.isArray(value)) {
          // No selections means the filter is inactive — don't exclude every row.
          if (value.length === 0) return true
          return value.some(v => rowValue.includes(normalize(v)))
        }
        return rowValue.includes(normalize(value))
      })
    })
  }

  // Filter management actions
  const setFilters = useCallback((values: FiltersRecord<T> | ((prev: FiltersRecord<T>) => FiltersRecord<T>)) => {
    setFiltersState(prev => {
      const next = typeof values === 'function' ? values(prev) : values
      return next ?? {}
    })
    setPagination(p => ({ ...p, current: 1 }))
  }, [])

  const removeFilter = useCallback(
    (name: keyof T) => {
      const item = filterItems.find(f => f.name === name)
      const cleared = item?.clearValue ?? ''
      setFilters(prev => ({ ...prev, [name]: cleared }))
    },
    [filterItems, setFilters],
  )

  const handleClearAll = useCallback(() => {
    const cleared: FiltersRecord<T> = {}
    filterItems
      .filter(filter => filter.placement !== 'header')
      .forEach(f => {
        cleared[f.name] = f.clearValue ?? ''
      })

    setFilters({ ...filters, ...cleared, search: filters['search'] ?? '' })
  }, [filterItems, setFilters, filters])

  //
  // Server-side: fetch data from API
  //
  const fetchServer = async () => {
    setLoading(true)
    try {
      const { serverFilters } = splitFilters(filters)
      const res = await queryFn(serverFilters, isClientPagination ? {} : pagination, null)
      setBaseData(res.data)
      setPagination(p => ({ ...p, total: res.total ?? res.data.length }))
      if (!isClientPagination) {
        setData(res.data)
      }
    } finally {
      setLoading(false)
    }
  }

  const debouncedFilters = useDebounce(filters, serverDebounceMs)

  //
  // Effect: initial data load
  //
  useEffect(() => {
    if (filterMode === 'server') {
      fetchServer()
    } else {
      ;(async () => {
        setLoading(true)
        try {
          const res = await queryFn({}, {}, null)
          setBaseData(res.data)
          setPagination(p => ({ ...p, total: res.data.length }))
          setData(res.data.slice(0, pageSize))
        } finally {
          setLoading(false)
        }
      })()
    }
  }, [filterMode])

  //
  // Effect: fetch server data when filters change
  //
  useEffect(() => {
    if (filterMode !== 'server') return
    fetchServer()
  }, [JSON.stringify(splitFilters(debouncedFilters).serverFilters), filterMode])

  //
  // Effect: fetch server data when pagination changes
  //
  useEffect(() => {
    if (filterMode !== 'server') return
    if (isClientPagination) return
    fetchServer()
  }, [pagination.current, pagination.pageSize])

  //
  // Effect: apply filters locally in client mode or server mode + clientPagination
  //
  useEffect(() => {
    if (filterMode === 'client' || (filterMode === 'server' && isClientPagination)) {
      let work = baseData
      const { localFilters } = splitFilters(filters)

      if (Object.keys(localFilters).length > 0) {
        work = applyLocalFilters(work, localFilters)
      }

      const total = work.length
      const start = ((pagination.current ?? 1) - 1) * (pagination.pageSize ?? pageSize)
      work = work.slice(start, start + (pagination.pageSize ?? pageSize))

      setData(work)
      if (pagination.total !== total) {
        setPagination(p => ({ ...p, total }))
      }
    }
  }, [filterMode, isClientPagination, baseData, filters, pagination.current, pagination.pageSize])

  //
  // Action: handle pagination changes
  //
  const onTableChange: UseTableFiltersReturn<T>['onTableChange'] = (
    newPagination,
    _filtersFromTable,
    _sorter,
    _extra,
  ) => {
    setPagination(prev => ({
      ...prev,
      current: newPagination.current ?? prev.current ?? 1,
      pageSize: newPagination.pageSize ?? prev.pageSize ?? pageSize,
    }))
  }

  const headerFilters = filterItems.filter(f => f.placement === 'header')
  const bannerFilters = filterItems.filter(f => f.placement !== 'header')

  return {
    data,
    loading,
    pagination,
    rowSelection,
    onTableChange,
    setFilters,
    filters,
    removeFilter,
    handleClearAll,
    columns,
    headerFilters,
    bannerFilters,
    refetchWithFilters: fetchServer,
  }
}
