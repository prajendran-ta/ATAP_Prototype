import type { SelectOption } from '@amadeus/react-design-factory/components/Select'

export interface ServerOptionsQueryFnConfig<TRefetchVars, TData> {
  /**
   * The refetch function from a useQuery hook (called with skip: true)
   */
  refetch: (vars: TRefetchVars) => Promise<{ data?: TData }>
  /**
   * Builds the variables to pass to refetch based on search string and pagination
   */
  buildVars: (search: string, pagination: { limit: number; offset: number }) => TRefetchVars
  /**
   * Extracts the raw items from the query data
   */
  getItems: (data: TData | undefined) => unknown[]
  /**
   * Maps a raw item to a SelectOption
   */
  mapToOption: (item: unknown) => SelectOption
}

/**
 * Generic factory for building a `queryFn` compatible with `useServerOptions`.
 *
 * Usage:
 * ```ts
 * const queryFn = buildServerOptionsQueryFn({
 *   refetch,
 *   buildVars: (search, pagination) => ({ filter: { name: search, paging: pagination } }),
 *   getItems: (data) => data?.advertisers?.advertisers ?? [],
 *   mapToOption: (item) => ({ label: item.name, value: item.id }),
 * })
 * ```
 */
export function buildServerOptionsQueryFn<TRefetchVars, TData, TItem>(config: {
  refetch: (vars: TRefetchVars) => Promise<{ data?: TData }>
  buildVars: (search: string, pagination: { limit: number; offset: number }) => TRefetchVars
  getItems: (data: TData | undefined) => TItem[]
  mapToOption: (item: TItem) => SelectOption
}) {
  return async (search: string, pagination = { limit: 20, offset: 0 }): Promise<SelectOption[]> => {
    // Tolerate backend/refetch failures (e.g. a 401 while navigating): return no options instead
    // of rejecting, so a dropdown's data source failing doesn't crash the page with an uncaught error.
    try {
      const { data } = await config.refetch(config.buildVars(search, pagination))
      const items = config.getItems(data)
      return items.map(config.mapToOption)
    } catch {
      return []
    }
  }
}
