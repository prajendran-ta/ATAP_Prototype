import { AdvertiserTypesEnum } from '../../graphql/generated/advertiser-enums'
import type { FilterValue } from '@mediahub/mediahub-ui/components/TableWithFilters/FilterBanner/FilterBanner.d'
import type { TablePaginationConfig } from 'antd/es/table'
import { SelectOption } from '@amadeus/react-design-factory/components/Select'
import { sortBy } from '@amadeus/react-utils/utils/array'

export function refetchAdvertisersFiltersFormatted(
  refetchAdvertisers: (
    vars: { filter: AdvertiserQL.AdvertiserFilter },
  ) => Promise<{ data?: { advertisers?: AdvertiserQL.Advertisers } }>,
  setToggleTotals: (totals: AdvertiserQL.TotalToggle) => void,
) {
  return async (
    filters?: Record<string, FilterValue>,
    pagination?: TablePaginationConfig,
  ): Promise<{ data: AdvertiserQL.Advertiser[]; total: number }> => {
    const rawIds = filters?.ids as (string | number)[] | undefined
    const idsFilter: number[] | undefined =
      Array.isArray(rawIds) && rawIds.length > 0
        ? Array.from(new Set(rawIds.map(v => (typeof v === 'string' ? v.trim() : v)).map(Number)))
        : undefined
    const rawUserIds = filters?.followedBy as (string | number)[] | undefined
    const idsUsers: number[] | undefined =
      Array.isArray(rawUserIds) && rawUserIds.length > 0
        ? Array.from(new Set(rawUserIds.map(v => (typeof v === 'string' ? v.trim() : v)).map(Number)))
        : undefined

    const name = typeof filters?.search === 'string' ? filters.search.trim() : undefined

    const filter: AdvertiserQL.AdvertiserFilter = {
      ids: idsFilter,
      advertiserTypes: AdvertiserTypesEnum.Hotel,
      name,
      isFollowingOnly: (filters?.isFollowingOnly as boolean) || false,
      followedBy: idsUsers,
      paging: {
        limit: pagination?.pageSize ?? 10,
        offset: ((pagination?.current ?? 1) - 1) * (pagination?.pageSize ?? 10),
      },
    }

    const response = await refetchAdvertisers({
      filter,
    })

    const { toggle: advertisersToggle } = response.data?.advertisers ?? {}

    const toggle = {
      totalAdvertisers: advertisersToggle?.totalAdvertisers || 0,
      totalFollowing: advertisersToggle?.totalFollowing || 0,
    }

    setToggleTotals(toggle)

    return {
      data: response.data?.advertisers?.advertisers ?? [],
      total: response.data?.advertisers?.totalCount ?? 0,
    }
  }
}

export const mapAdvertiserToOption = (advertiser: AdvertiserQL.Advertiser, isExternal = false): SelectOption => ({
  label: isExternal
    ? advertiser.advertiserName
    : `${advertiser.advertiserName} (${String(advertiser.bpid).toUpperCase()})`,
  value: advertiser.advertiserId,
})

export const mapUserToOption = (user: SharedQL.User): SelectOption => ({
  label: user.name,
  value: user.id,
})

export const normalizeAdvertiserSearch = (search: string | undefined | null): string => {
  return (search ?? '').trim()
}

export const formatAndSortAdvertisers = (
  advertisers: AdvertiserQL.Advertiser[],
  isExternal = false,
): { label: string; value: string | number }[] => {
  const formatted = advertisers.map(adv => mapAdvertiserToOption(adv, isExternal))
  const sorted = sortBy(formatted, adv => adv.label as string)
  return sorted.map(opt => ({ label: String(opt.label), value: opt.value }))
}

export const formatUsersToOptions = (users: SharedQL.User[]): { label: string; value: string | number }[] => {
  const formatted = users.map(mapUserToOption)
  return formatted.map(opt => ({ label: String(opt.label), value: opt.value }))
}
