import type React from 'react'
import { renderHook, act, waitFor } from '@testing-library/react'
import useServerOptions, { mergeWithSelected, updateSelectedOptions } from './useServerOptions'
import type { SelectOption } from '@amadeus/react-design-factory/components/Select'
import type { FilterValue, QueryPagination } from './useServerOptions.d'

describe('updateSelectedOptions', () => {
  const options: SelectOption[] = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ]

  type SelectedOpt = { label: string; value: string | number }

  // Helper: call updateSelectedOptions and invoke the functional updater with a given prev state
  const callUpdater = (rawValue: FilterValue, opts: SelectOption[], prev: SelectedOpt[] = []): SelectedOpt[] => {
    let updater!: (prev: SelectedOpt[]) => SelectedOpt[]
    const setSelected = jest.fn() as jest.MockedFunction<React.Dispatch<React.SetStateAction<SelectedOpt[]>>>
    setSelected.mockImplementation((fn: React.SetStateAction<SelectedOpt[]>) => {
      if (typeof fn === 'function') updater = fn
    })
    updateSelectedOptions(rawValue, opts, setSelected)
    return updater(prev)
  }

  it('normalizes a single value to an array and maps it to the correct option', () => {
    const result = callUpdater('1', options)
    expect(result).toEqual([{ label: 'Option 1', value: '1' }])
  })

  it('maps an array of values to the corresponding options', () => {
    const result = callUpdater(['1', '2', '3'], options)
    expect(result).toEqual([
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ])
  })

  it('returns an empty array when rawValue is null, undefined or falsy', () => {
    expect(callUpdater(undefined as unknown as FilterValue, options)).toEqual([])
    expect(callUpdater(null as unknown as FilterValue, options)).toEqual([])
    expect(callUpdater('' as unknown as FilterValue, options)).toEqual([])
  })

  it('drops values that are not in current options and not in prev state', () => {
    const result = callUpdater(['1', '999'], options, [])
    expect(result).toEqual([{ label: 'Option 1', value: '1' }])
  })

  it('preserves label from prev state when the option is no longer in the current page', () => {
    const prev: SelectedOpt[] = [{ label: 'Previously Loaded Option', value: '999' }]
    const result = callUpdater(['1', '999'], options, prev)
    expect(result).toEqual([
      { label: 'Option 1', value: '1' },
      { label: 'Previously Loaded Option', value: '999' },
    ])
  })

  it('handles mixed string and number values correctly', () => {
    const result = callUpdater(['2', '3'], options)
    expect(result).toEqual([
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ])
  })
})

describe('useServerOptions', () => {
  it('initializes with empty options and empty search', () => {
    const queryFn = jest.fn().mockResolvedValue([])

    const { result } = renderHook<ReturnType<typeof useServerOptions>, void>(() =>
      useServerOptions({
        queryFn,
      }),
    )

    expect(result.current!.options).toEqual([])
    expect(result.current!.search).toBe('')
  })

  it('calls queryFn when debounced search changes and updates options', async () => {
    const queryFn = jest.fn<Promise<SelectOption[]>, [string]>().mockResolvedValue([{ label: 'A', value: 'a' }])

    const { result, rerender } = renderHook<ReturnType<typeof useServerOptions>, { search: string }>(
      ({ search }) =>
        useServerOptions({
          queryFn,
          debounceMs: 0,
        }),
      {
        initialProps: { search: '' },
      },
    )

    await act(async () => {
      result.current!.onSearch('test')
      rerender({ search: 'test' })
    })

    await waitFor(() => {
      expect(queryFn).toHaveBeenLastCalledWith('test', { limit: 10, offset: 0 })
      expect(result.current!.options).toEqual([{ label: 'A', value: 'a' }])
      expect(result.current!.loading).toBe(false)
    })
  })

  it('sets loading true while fetching and false after', async () => {
    let resolvePromise: (value: SelectOption[]) => void

    const queryFn = jest.fn(
      () =>
        new Promise<SelectOption[]>(resolve => {
          resolvePromise = resolve
        }),
    )

    const { result } = renderHook<ReturnType<typeof useServerOptions>, void>(() =>
      useServerOptions({
        queryFn,
        debounceMs: 0,
      }),
    )

    await act(async () => {
      result.current!.onSearch('loading-test')
    })

    expect(result.current!.loading).toBe(true)

    await act(async () => {
      resolvePromise!([{ label: 'X', value: 'x' }])
    })

    await waitFor(() => {
      expect(result.current!.loading).toBe(false)
      expect(result.current!.options).toEqual([{ label: 'X', value: 'x' }])
    })
  })

  it('clears search on blur when resetOnBlur is true', async () => {
    const queryFn = jest.fn().mockResolvedValue([])

    const { result } = renderHook(() =>
      useServerOptions({
        queryFn,
        debounceMs: 0,
        resetOnBlur: true,
      }),
    )

    await act(async () => result.current.onSearch('keyword'))
    expect(result.current.search).toBe('keyword')

    act(() => result.current.onBlur!())
    expect(result.current.search).toBe('')
  })

  it('does not clear search on blur when resetOnBlur is false', async () => {
    const queryFn = jest.fn().mockResolvedValue([])
    const { result } = renderHook(() =>
      useServerOptions({
        queryFn,
        debounceMs: 0,
        resetOnBlur: false,
      }),
    )

    await act(async () => {
      result.current.onSearch('keyword')
    })
    act(() => result.current.onBlur!())
    expect(result.current.search).toBe('keyword')
  })

  it('keeps search unchanged on blur when search is already empty', () => {
    const queryFn = jest.fn().mockResolvedValue([])
    const { result } = renderHook(() =>
      useServerOptions({
        queryFn,
        debounceMs: 0,
        resetOnBlur: true,
      }),
    )

    act(() => result.current.onBlur!())
    expect(result.current.search).toBe('')
  })

  it('loads and appends the next page when popup is scrolled to bottom and hasMore is true', async () => {
    const queryFn = jest
      .fn<Promise<SelectOption[]>, [string, QueryPagination?]>()
      .mockResolvedValueOnce([
        { label: 'A', value: 'a' },
        { label: 'B', value: 'b' },
      ])
      .mockResolvedValueOnce([
        { label: 'C', value: 'c' },
        { label: 'D', value: 'd' },
      ])

    const { result } = renderHook(() =>
      useServerOptions({
        queryFn,
        debounceMs: 0,
        pageSize: 2,
      }),
    )

    await waitFor(() => {
      expect(queryFn).toHaveBeenNthCalledWith(1, '', { limit: 2, offset: 0 })
      expect(result.current.options).toEqual([
        { label: 'A', value: 'a' },
        { label: 'B', value: 'b' },
      ])
    })

    act(() => {
      result.current.onPopupScroll!({
        currentTarget: { scrollTop: 90, clientHeight: 20, scrollHeight: 100 },
      } as React.UIEvent<HTMLDivElement>)
    })

    await waitFor(() => {
      expect(queryFn).toHaveBeenNthCalledWith(2, '', { limit: 2, offset: 2 })
      expect(result.current.options).toEqual([
        { label: 'A', value: 'a' },
        { label: 'B', value: 'b' },
        { label: 'C', value: 'c' },
        { label: 'D', value: 'd' },
      ])
    })
  })

  it('does not load next page when popup is not at the bottom', async () => {
    const queryFn = jest
      .fn<Promise<SelectOption[]>, [string, QueryPagination?]>()
      .mockResolvedValue([{ label: 'A', value: 'a' }])

    const { result } = renderHook(() =>
      useServerOptions({
        queryFn,
        debounceMs: 0,
      }),
    )
    await waitFor(() => {
      expect(queryFn).toHaveBeenCalledTimes(1)
    })

    act(() => {
      result.current.onPopupScroll!({
        currentTarget: { scrollTop: 10, clientHeight: 20, scrollHeight: 100 },
      } as React.UIEvent<HTMLDivElement>)
    })
    expect(queryFn).toHaveBeenCalledTimes(1)
  })

  it('does not load next page while an existing request is in flight', async () => {
    let resolveQuery: ((value: SelectOption[]) => void) | undefined
    const queryFn = jest.fn(
      () =>
        new Promise<SelectOption[]>(resolve => {
          resolveQuery = resolve
        }),
    )

    const { result } = renderHook(() =>
      useServerOptions({
        queryFn,
        debounceMs: 0,
      }),
    )

    await waitFor(() => {
      expect(result.current.loading).toBe(true)
      expect(queryFn).toHaveBeenCalledTimes(1)
    })

    act(() => {
      result.current.onPopupScroll!({
        currentTarget: { scrollTop: 90, clientHeight: 20, scrollHeight: 100 },
      } as React.UIEvent<HTMLDivElement>)
    })
    expect(queryFn).toHaveBeenCalledTimes(1)

    await act(async () => {
      resolveQuery?.([{ label: 'A', value: 'a' }])
    })
  })

  it('ignores a new debounced fetch attempt while a previous fetch is still loading', async () => {
    jest.useFakeTimers()
    try {
      let resolveQuery: ((value: SelectOption[]) => void) | undefined
      const queryFn = jest.fn(
        () =>
          new Promise<SelectOption[]>(resolve => {
            resolveQuery = resolve
          }),
      )

      const { result } = renderHook(() =>
        useServerOptions({
          queryFn,
          debounceMs: 1,
        }),
      )

      await waitFor(() => {
        expect(result.current.loading).toBe(true)
        expect(queryFn).toHaveBeenCalledTimes(1)
      })

      await act(async () => result.current.onSearch('new-search'))
      act(() => jest.advanceTimersByTime(1))
      await waitFor(() => expect(queryFn).toHaveBeenCalledTimes(1))
      await act(async () => resolveQuery?.([{ label: 'A', value: 'a' }]))
    } finally {
      jest.useRealTimers()
    }
  })
})

describe('mergeWithSelected', () => {
  it('appends hidden ghost options for selected values not in current server page', () => {
    const serverOptions: SelectOption[] = [{ label: 'A', value: 'a' }]
    const selected = [
      { label: 'A', value: 'a' },
      { label: 'Missing', value: 'missing' },
    ]

    expect(mergeWithSelected(serverOptions, selected)).toEqual([
      { label: 'A', value: 'a' },
      { label: 'Missing', value: 'missing', style: { display: 'none' } },
    ])
  })

  it('returns server options unchanged when all selected values are already present', () => {
    const serverOptions: SelectOption[] = [
      { label: 'A', value: 'a' },
      { label: 'B', value: 'b' },
    ]
    const selected = [{ label: 'B', value: 'b' }]
    expect(mergeWithSelected(serverOptions, selected)).toEqual(serverOptions)
  })
})
