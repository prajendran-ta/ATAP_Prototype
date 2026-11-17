import { useEffect, useRef, useState } from 'react'
import type React from 'react'
import type { SelectOption } from '@amadeus/react-design-factory/components/Select'
import { useDebounce } from '../useDebounce'
import type { FilterValue, UseServerOptionsParams, UseServerOptionsResult } from './useServerOptions.d'

function useServerOptions({
  queryFn,
  debounceMs = 500,
  resetOnBlur = true,
  pageSize = 10,
}: UseServerOptionsParams): UseServerOptionsResult {
  const [search, setSearch] = useState('')
  const [options, setOptions] = useState<SelectOption[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const loadingRef = useRef(false)

  const debouncedSearch = useDebounce(search, debounceMs)

  const fetchOptions = async (term: string, currentPage: number, append = false) => {
    if (loadingRef.current) return
    loadingRef.current = true
    setLoading(true)
    try {
      const result = await queryFn(term, { limit: pageSize, offset: (currentPage - 1) * pageSize })
      setOptions(prev => (append ? [...prev, ...result] : result))
      setHasMore(result.length === pageSize)
    } finally {
      setLoading(false)
      loadingRef.current = false
    }
  }

  useEffect(() => {
    setPage(1)
    setHasMore(true)
    fetchOptions(debouncedSearch, 1, false)
  }, [debouncedSearch])

  const onPopupScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
    const isBottom = scrollTop + clientHeight >= scrollHeight - 10
    if (isBottom && !loadingRef.current && hasMore) {
      const nextPage = page + 1
      setPage(nextPage)
      fetchOptions(debouncedSearch, nextPage, true)
    }
  }

  const onBlur = () => {
    if (!resetOnBlur) return
    if (search) setSearch('')
  }

  return {
    options,
    loading,
    search,
    onSearch: setSearch,
    onBlur,
    onPopupScroll,
  }
}

export default useServerOptions

export function updateSelectedOptions(
  rawValue: FilterValue,
  options: SelectOption[],
  setSelected: React.Dispatch<React.SetStateAction<{ label: string; value: string | number }[]>>,
) {
  const values = (Array.isArray(rawValue) ? rawValue : rawValue ? [rawValue] : []) as (string | number)[]

  const optionsMap = new Map<string | number, SelectOption>()
  options.forEach(opt => {
    optionsMap.set(opt.value as string | number, opt)
  })

  setSelected(prev => {
    const prevMap = new Map(prev.map(opt => [opt.value, opt]))

    return values
      .map(val => {
        const fromPage = optionsMap.get(val)
        if (fromPage) return { label: fromPage.label as string, value: fromPage.value as string | number }
        return prevMap.get(val) ?? null
      })
      .filter((opt): opt is { label: string; value: string | number } => opt !== null)
  })
}

/**
 * Merges server options with selected options so the <Select> can always
 * display the label of selected items even if they are not in the current page.
 * Selected options that are already in serverOptions are deduplicated.
 */
export function mergeWithSelected(
  serverOptions: SelectOption[],
  selected: { label: string; value: string | number }[],
): SelectOption[] {
  const serverValues = new Set(serverOptions.map(o => o.value))
  // Add missing selected as hidden options so Ant Design can resolve their labels in tags
  // but they won't appear in the dropdown list
  const ghostOptions = selected.filter(o => !serverValues.has(o.value)).map(o => ({ ...o, style: { display: 'none' } }))
  return [...serverOptions, ...ghostOptions]
}
