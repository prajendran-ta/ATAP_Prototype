import { setupBeforeEach, refetchAdvertisers } from '../mocks/Advertisers'
import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router'
import '@testing-library/jest-dom'
import AdvertisersPage from '../../Advertisers'
import { AdvertiserTypesEnum } from '../../../../graphql/generated/advertiser-enums'
import { TablePaginationConfig } from 'antd/es/table'
import {
  refetchAdvertisersFiltersFormatted,
  mapAdvertiserToOption,
  mapUserToOption,
  normalizeAdvertiserSearch,
  formatAndSortAdvertisers,
  formatUsersToOptions,
} from '../../AdvertisersConfig'

const renderWithRoute = (initialPath = '/advertisers') =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path='/advertisers' element={<AdvertisersPage />} />
      </Routes>
    </MemoryRouter>,
  )

beforeEach(() => {
  setupBeforeEach()
  jest.clearAllMocks()
})

describe('AdvertisersPage — Table Filters Rendering & Behaviour', () => {
  test('renders filter controls (ids/bpid, type, followedBy) and View tabs', async () => {
    const { container } = renderWithRoute('/advertisers')

    await waitFor(() => {
      expect(container.querySelector('#advertiser-tbl')).toBeInTheDocument()
    })

    const bpidSel = container.querySelector('#advertiser-bpid-sel') as HTMLElement
    const typeSel = container.querySelector('#advertiser-type-sel') as HTMLElement
    const followedBySel = container.querySelector('#advertiser-followed_by-sel') as HTMLElement

    expect(bpidSel).toBeInTheDocument()
    expect(typeSel).toBeInTheDocument()
    expect(followedBySel).toBeInTheDocument()

    const tabMy = container.querySelector('#advertiser-my-txt') as HTMLElement
    const tabAll = container.querySelector('#advertiser-all-txt') as HTMLElement
    expect(tabMy).toBeInTheDocument()
    expect(tabAll).toBeInTheDocument()
  })

  test('Advertiser Type filter opens the dropdown and shows HOTEL option', async () => {
    const { container } = renderWithRoute('/advertisers')

    await waitFor(() => {
      expect(container.querySelector('#advertiser-tbl')).toBeInTheDocument()
    })

    const typeSelector = container
      .querySelector('#advertiser-type-sel')
      ?.closest('.ant-select')
      ?.querySelector('.ant-select-selector') as HTMLElement

    expect(typeSelector).toBeInTheDocument()

    fireEvent.mouseDown(typeSelector)

    await waitFor(() => {
      expect(document.querySelector('.ant-select-dropdown')).toBeInTheDocument()
    })

    const dropdown = document.querySelector('.ant-select-dropdown') as HTMLElement
    expect(dropdown).toBeInTheDocument()

    const optionEl = document.getElementById('advertiser-type-sel_list_0') as HTMLElement
    expect(optionEl).toBeInTheDocument()
    expect(dropdown.textContent).toMatch('HOTEL')
  })

  test('Advertiser (BPID) filter opens the dropdown and shows mocked advertiser options', async () => {
    const { container } = renderWithRoute('/advertisers')

    await waitFor(() => {
      expect(container.querySelector('#advertiser-tbl')).toBeInTheDocument()
    })

    const bpidSelector = container
      .querySelector('#advertiser-bpid-sel')
      ?.closest('.ant-select')
      ?.querySelector('.ant-select-selector') as HTMLElement

    expect(bpidSelector).toBeInTheDocument()

    fireEvent.mouseDown(bpidSelector as HTMLElement)

    await waitFor(() => {
      expect(document.querySelector('.ant-select-dropdown')).toBeInTheDocument()
    })

    const dropdown = document.querySelector('.ant-select-dropdown') as HTMLElement
    expect(dropdown).toBeInTheDocument()

    expect(dropdown.textContent).toMatch(/Hotel Alpha \(BP123\)/)
    expect(dropdown.textContent).toMatch(/Hotel Beta \(BP456\)/)
  })

  test('calls refetch with default filter on initial render', async () => {
    const { container } = renderWithRoute('/advertisers')

    await waitFor(() => {
      expect(container.querySelector('#advertiser-tbl')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(refetchAdvertisers).toHaveBeenCalled()
    })

    const lastCallArgs = refetchAdvertisers.mock.calls[refetchAdvertisers.mock.calls.length - 1][0]

    expect(lastCallArgs).toMatchObject({
      filter: expect.objectContaining({
        advertiserTypes: 'HOTEL',
        isFollowingOnly: false,
        name: undefined,
      }),
    })
  })

  test('Followed By filter opens the dropdown and shows mocked users', async () => {
    const { container } = renderWithRoute('/advertisers')

    await waitFor(() => {
      expect(container.querySelector('#advertiser-tbl')).toBeInTheDocument()
    })

    const followedBySelector = container
      .querySelector('#advertiser-followed_by-sel')
      ?.closest('.ant-select')
      ?.querySelector('.ant-select-selector') as HTMLElement

    expect(followedBySelector).toBeInTheDocument()

    fireEvent.mouseDown(followedBySelector as HTMLElement)

    await waitFor(() => {
      expect(document.querySelector('.ant-select-dropdown')).toBeInTheDocument()
    })

    const dropdown = document.querySelector('.ant-select-dropdown') as HTMLElement
    expect(dropdown).toBeInTheDocument()

    expect(dropdown.textContent).toMatch(/User A/)
    expect(dropdown.textContent).toMatch(/User B/)
  })

  test('initialFilters.isFollowingOnly is false when no query param is present', async () => {
    const { container } = renderWithRoute('/advertisers')

    await waitFor(() => {
      expect(container.querySelector('#advertiser-tbl')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(refetchAdvertisers).toHaveBeenCalled()
    })

    const firstCallArgs = refetchAdvertisers.mock.calls[0][0]
    expect(firstCallArgs).toMatchObject({
      filter: expect.objectContaining({
        isFollowingOnly: false,
      }),
    })
  })

  test('initialFilters.isFollowingOnly is true when query param ?isFollowingOnly=1 is present', async () => {
    const { container } = renderWithRoute('/advertisers?isFollowingOnly=1')

    await waitFor(() => {
      expect(container.querySelector('#advertiser-tbl')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(refetchAdvertisers).toHaveBeenCalled()
    })

    const firstCallArgs = refetchAdvertisers.mock.calls[0][0]
    expect(firstCallArgs).toMatchObject({
      filter: expect.objectContaining({
        isFollowingOnly: true,
      }),
    })
  })

  test('toggling View tabs updates isFollowingOnly and calls refetch with expected value', async () => {
    const { container } = renderWithRoute('/advertisers')

    await waitFor(() => {
      expect(container.querySelector('#advertiser-tbl')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(refetchAdvertisers).toHaveBeenCalled()
    })
    refetchAdvertisers.mockClear()

    const tabMy = container.querySelector('#advertiser-my-txt') as HTMLElement
    fireEvent.click(tabMy)

    await waitFor(() => {
      expect(refetchAdvertisers).toHaveBeenCalled()
    })
    const afterMyArgs = refetchAdvertisers.mock.calls[0][0]
    expect(afterMyArgs).toMatchObject({
      filter: expect.objectContaining({
        isFollowingOnly: true,
      }),
    })

    refetchAdvertisers.mockClear()

    const tabAll = container.querySelector('#advertiser-all-txt') as HTMLElement
    fireEvent.click(tabAll)

    await waitFor(() => {
      expect(refetchAdvertisers).toHaveBeenCalled()
    })
    const afterAllArgs = refetchAdvertisers.mock.calls[0][0]
    expect(afterAllArgs).toMatchObject({
      filter: expect.objectContaining({
        isFollowingOnly: false,
      }),
    })
  })

  test('refetchAdvertisersFiltersFormatted transforms filters correctly', async () => {
    const mockRefetch = jest.fn().mockResolvedValue({
      data: {
        advertisers: {
          advertisers: [],
          totalCount: 0,
          toggle: { totalAdvertisers: 0, totalFollowing: 0 },
        },
      },
    })
    const mockSetToggleTotals = jest.fn()

    const queryFn = refetchAdvertisersFiltersFormatted(mockRefetch, mockSetToggleTotals)

    const filters = {
      ids: ['101', '202', '202', ' 101 '],
      followedBy: ['7', '9', ' 7 '],
      search: '  hotel ',
      isFollowingOnly: true,
      advertiserTypes: AdvertiserTypesEnum.Hotel,
    }
    const pagination: TablePaginationConfig = { pageSize: 20, current: 2 }

    await queryFn(filters, pagination)

    expect(mockRefetch).toHaveBeenCalledWith(
      expect.objectContaining({
        filter: expect.objectContaining({
          ids: [101, 202],
          followedBy: [7, 9],
          advertiserTypes: AdvertiserTypesEnum.Hotel,
          name: 'hotel',
          isFollowingOnly: true,
          paging: { limit: 20, offset: 20 },
        }),
      }),
    )
  })

  test('shows Antd table loading state while refetch promise is pending', async () => {
    const pendingRefetch = new Promise(() => {})
    refetchAdvertisers.mockReturnValue(pendingRefetch as any)

    const { container } = renderWithRoute('/advertisers')

    await waitFor(() => {
      expect(container.querySelector('#advertiser-tbl')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(container.querySelector('.ant-spin')).toBeInTheDocument()
    })

    const loadingElement = container.querySelector('.ant-spin') as HTMLElement | null
    expect(loadingElement).not.toBeNull()
  })

  test('refetchAdvertisersFiltersFormatted propagates error state when refetch rejects', async () => {
    const mockError = new Error('Network error')
    const mockRefetch = jest.fn().mockRejectedValue(mockError)
    const mockSetToggleTotals = jest.fn()

    const queryFn = refetchAdvertisersFiltersFormatted(mockRefetch as any, mockSetToggleTotals)

    const filters = {
      ids: [],
      followedBy: [],
      search: '',
      isFollowingOnly: false,
      advertiserTypes: undefined,
    }
    const pagination: TablePaginationConfig = { pageSize: 10, current: 1 }

    await expect(queryFn(filters as any, pagination)).rejects.toThrow('Network error')
  })

  test('calls refetchAdvertisers with offset 0 on initial page 1 load', async () => {
    refetchAdvertisers.mockImplementation(({ filter }: any) => {
      const offset = filter?.paging?.offset ?? 0
      const limit = filter?.paging?.limit ?? 10
      const allItems = Array.from({ length: 12 }).map((_, index) => ({
        id: index + 1,
        advertiserId: index + 1,
        advertiserName: index < 10 ? `Hotel Page1-${index + 1}` : `Hotel Page2-${index + 1}`,
        bpid: `BP${100 + index}`,
      }))
      const pageItems = allItems.slice(offset, offset + limit)
      const page = {
        advertisers: {
          advertisers: pageItems,
          totalCount: allItems.length,
          toggle: { totalAdvertisers: allItems.length, totalFollowing: 0 },
        },
      }
      return Promise.resolve({ data: page })
    })

    renderWithRoute('/advertisers')

    await waitFor(() => {
      expect(screen.getByText('Hotel Page1-1')).toBeInTheDocument()
      expect(screen.getByText('Hotel Page1-2')).toBeInTheDocument()
    })

    expect(refetchAdvertisers).toHaveBeenCalledWith(
      expect.objectContaining({
        filter: expect.objectContaining({
          paging: expect.objectContaining({ offset: 0, limit: 10 }),
        }),
      }),
    )
  })

  test('navigating to page 2 calls refetchAdvertisers with offset 10 and renders page 2 rows', async () => {
    refetchAdvertisers.mockImplementation(({ filter }: any) => {
      const offset = filter?.paging?.offset ?? 0
      const limit = filter?.paging?.limit ?? 10
      const allItems = Array.from({ length: 12 }).map((_, index) => ({
        id: index + 1,
        advertiserId: index + 1,
        advertiserName: index < 10 ? `Hotel Page1-${index + 1}` : `Hotel Page2-${index + 1}`,
        bpid: `BP${100 + index}`,
      }))
      const pageItems = allItems.slice(offset, offset + limit)
      const page = {
        advertisers: {
          advertisers: pageItems,
          totalCount: allItems.length,
          toggle: { totalAdvertisers: allItems.length, totalFollowing: 0 },
        },
      }
      return Promise.resolve({ data: page })
    })

    const { container } = renderWithRoute('/advertisers')

    await waitFor(() => {
      expect(screen.getByText('Hotel Page1-1')).toBeInTheDocument()
    })

    const nextPageButton = container.querySelector('.ant-pagination-item-2') as HTMLElement
    expect(nextPageButton).toBeInTheDocument()
    fireEvent.click(nextPageButton)

    await waitFor(() => expect(screen.getByText('Hotel Page2-11')).toBeInTheDocument())
    expect(refetchAdvertisers).toHaveBeenCalledWith(
      expect.objectContaining({
        filter: expect.objectContaining({
          paging: expect.objectContaining({ offset: 10, limit: 10 }),
        }),
      }),
    )
  })
})

describe('AdvertisersConfig — pure helpers', () => {
  test('mapAdvertiserToOption builds label with BPID in uppercase and correct value', () => {
    const advertiser = {
      advertiserId: 42,
      advertiserName: 'Hotel Test',
      bpid: 'bp123',
    }

    const option = mapAdvertiserToOption(advertiser)

    expect(option).toEqual({
      label: 'Hotel Test (BP123)',
      value: 42,
    })
  })

  test('mapUserToOption builds label with user name and correct value', () => {
    const user = {
      id: 7,
      name: 'User A',
      email: 'usera@example.com',
    } as any

    const option = mapUserToOption(user)

    expect(option).toEqual({
      label: 'User A',
      value: 7,
    })
  })
})

describe('AdvertisersConfig — pure formatting helpers', () => {
  test('normalizeAdvertiserSearch trims and handles undefined/null', () => {
    expect(normalizeAdvertiserSearch('  hotel  ')).toBe('hotel')
    expect(normalizeAdvertiserSearch('')).toBe('')
    expect(normalizeAdvertiserSearch(undefined as any)).toBe('')
    expect(normalizeAdvertiserSearch(null as any)).toBe('')
  })

  test('formatAndSortAdvertisers uses mapAdvertiserToOption and sorts by label', () => {
    const advertisers = [
      { advertiserId: 2, advertiserName: 'B Hotel', bpid: 'bp2' } as any,
      { advertiserId: 1, advertiserName: 'A Hotel', bpid: 'bp1' } as any,
    ]

    const result = formatAndSortAdvertisers(advertisers)

    expect(result).toEqual([
      { label: 'A Hotel (BP1)', value: 1 },
      { label: 'B Hotel (BP2)', value: 2 },
    ])
  })

  test('formatUsersToOptions maps users to label/value using mapUserToOption', () => {
    const users = [{ id: 7, name: 'User A' } as any, { id: 8, name: 'User B' } as any]

    const result = formatUsersToOptions(users)

    expect(result).toEqual([
      { label: 'User A', value: 7 },
      { label: 'User B', value: 8 },
    ])
  })
})
