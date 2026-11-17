import type { SelectOption } from '@amadeus/react-design-factory/components/Select'
import { buildServerOptionsQueryFn } from './buildServerOptionsQueryFn'

type FakeVars = { filter: { name: string; paging: { limit: number; offset: number } } }
type FakeData = { items: { id: number; name: string }[] }
type FakeItem = { id: number; name: string }

function makeRefetch(items: FakeItem[] = []) {
  return jest.fn((_vars: FakeVars) => Promise.resolve({ data: { items } as FakeData }))
}

const mapToOption = (item: FakeItem): SelectOption => ({ label: item.name, value: item.id })
const getItems = (data: FakeData | undefined) => data?.items ?? []
const buildVars = (search: string, pagination: { limit: number; offset: number }): FakeVars => ({
  filter: { name: search, paging: pagination },
})

describe('buildServerOptionsQueryFn', () => {
  it('returns the options mapped from the refetch result', async () => {
    const refetch = makeRefetch([
      { id: 1, name: 'Alpha' },
      { id: 2, name: 'Beta' },
    ])

    const queryFn = buildServerOptionsQueryFn({ refetch, buildVars, getItems, mapToOption })
    const result = await queryFn('', { limit: 20, offset: 0 })

    expect(result).toEqual<SelectOption[]>([
      { label: 'Alpha', value: 1 },
      { label: 'Beta', value: 2 },
    ])
  })

  it('calls refetch with the variables built by buildVars', async () => {
    const refetch = makeRefetch([])

    const queryFn = buildServerOptionsQueryFn({ refetch, buildVars, getItems, mapToOption })
    await queryFn('hotel', { limit: 10, offset: 20 })

    expect(refetch).toHaveBeenCalledTimes(1)
    expect(refetch).toHaveBeenCalledWith({
      filter: { name: 'hotel', paging: { limit: 10, offset: 20 } },
    })
  })

  it('uses default pagination { limit: 20, offset: 0 } when not provided', async () => {
    const refetch = makeRefetch([])

    const queryFn = buildServerOptionsQueryFn({ refetch, buildVars, getItems, mapToOption })
    await queryFn('test')

    expect(refetch).toHaveBeenCalledWith({
      filter: { name: 'test', paging: { limit: 20, offset: 0 } },
    })
  })

  it('returns an empty array when refetch returns no data', async () => {
    const refetch = jest.fn(() => Promise.resolve({ data: undefined }))

    const queryFn = buildServerOptionsQueryFn({ refetch, buildVars, getItems, mapToOption })
    const result = await queryFn('', { limit: 20, offset: 0 })

    expect(result).toEqual([])
  })

  it('returns an empty array when the items list is empty', async () => {
    const refetch = makeRefetch([])

    const queryFn = buildServerOptionsQueryFn({ refetch, buildVars, getItems, mapToOption })
    const result = await queryFn('', { limit: 20, offset: 0 })

    expect(result).toEqual([])
  })

  it('returns empty options instead of throwing when refetch rejects', async () => {
    const refetch = jest.fn(() => Promise.reject(new Error('Network error')))

    const queryFn = buildServerOptionsQueryFn({ refetch, buildVars, getItems, mapToOption })

    // A failing data source (e.g. a 401 while navigating) must not crash the page — the queryFn
    // resolves to no options so the dropdown is simply empty.
    await expect(queryFn('test', { limit: 20, offset: 0 })).resolves.toEqual([])
  })
})
