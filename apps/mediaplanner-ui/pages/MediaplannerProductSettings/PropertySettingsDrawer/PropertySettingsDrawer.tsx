import React from 'react'
import { Button, Drawer, Select, Toggle, ToggleTab } from '@amadeus/react-design-factory'
import type { ColumnType } from 'antd/es/table'
import type { FilterValue } from '@mediahub/mediahub-ui/components/TableWithFilters/FilterBanner/FilterBanner.d'
import { TableWithFilterBanner } from '@mediahub/mediahub-ui/components/TableWithFilters'
import {
  useGetAdvertisersQuery,
  useGetAdvertiserOptionsQuery,
} from '@mediahub/advertisers-ui/pages/Advertisers/Advertisers.queries'
import { refetchAdvertisersFiltersFormatted, normalizeAdvertiserSearch, formatAndSortAdvertisers } from '@mediahub/advertisers-ui/pages/Advertisers/AdvertisersConfig'
import { AdvertiserTypesEnum } from '@mediahub/advertisers-ui/graphql/generated/advertiser-enums'
import {
  useServerOptions,
  updateSelectedOptions,
  mergeWithSelected,
  buildServerOptionsQueryFn,
} from '@amadeus/react-utils'
import type { FilterItemWithType } from '@mediahub/advertisers-ui/pages/Advertisers/Advertisers.d'
import { DrawerFooter, DrawerFilterTableWrap } from '../MediaplannerProductSettings.styled'

export interface PropertyOption {
  advertiserId: string
  advertiserName: string
  bpid: string
}

interface PropertySettingsDrawerProps {
  isOpen: boolean
  onClose: () => void
  /** BPIDs supplied by Salesforce (Ship_To) — always selected, cannot be removed. */
  lockedBpids: Set<string>
  /** Currently selected BPIDs (Ship_To + manually added). */
  selectedBpids: Set<string>
  /**
   * BPIDs that cannot be removed right now because their sole Regular Campaign
   * instance lives in Standalone and they are not a member of any other budget
   * group. Removing them would leave the plan with no home for that property.
   */
  nonRemovableBpids?: Set<string>
  /** Commit the new selection. */
  onSave: (nextSelected: Set<string>) => void
}

export const PropertySettingsDrawer: React.FC<PropertySettingsDrawerProps> = ({
  isOpen,
  onClose,
  lockedBpids,
  selectedBpids,
  nonRemovableBpids,
  onSave,
}) => {
  const [draft, setDraft] = React.useState<Set<string>>(selectedBpids)
  const [toggleTotals, setToggleTotals] = React.useState<AdvertiserQL.TotalToggle>({
    totalAdvertisers: 0,
    totalFollowing: 0,
  })
  const [selectedAdvertisers, setSelectedAdvertisers] = React.useState<{ label: string; value: string | number }[]>([])

  // Re-sync the working draft whenever the drawer is (re)opened.
  React.useEffect(() => {
    if (isOpen) setDraft(new Set(selectedBpids))
  }, [isOpen, selectedBpids])

  const toggleIncluded = React.useCallback(
    (bpid: string, on: boolean) => {
      if (lockedBpids.has(bpid)) return // Salesforce Ship_To — locked
      // Cannot remove a property whose only Regular Campaign instance is standalone
      // and is not a member of any other budget group.
      if (!on && nonRemovableBpids?.has(bpid)) return
      setDraft(prev => {
        const next = new Set(prev)
        if (on) next.add(bpid)
        else next.delete(bpid)
        return next
      })
    },
    [lockedBpids, nonRemovableBpids],
  )

  // Advertiser (BPID) filter options (server-driven), reused from the Advertisers UI.
  const { refetch: refetchAdvertisersOptions } = useGetAdvertiserOptionsQuery(true)
  const advertiserOptions = useServerOptions({
    queryFn: buildServerOptionsQueryFn({
      refetch: refetchAdvertisersOptions,
      buildVars: (search, pagination) => ({
        filter: {
          advertiserTypes: AdvertiserTypesEnum.Hotel,
          name: normalizeAdvertiserSearch(search),
          isFollowingOnly: false,
          paging: { limit: pagination.limit, offset: pagination.offset },
        },
      }),
      getItems: data => data?.advertisers?.advertisers ?? [],
      mapToOption: adv => formatAndSortAdvertisers([adv as AdvertiserQL.Advertiser])[0],
    }),
    pageSize: 20,
  })

  const { refetch: refetchAdvertisers } = useGetAdvertisersQuery()
  const queryFn = React.useMemo(
    () => refetchAdvertisersFiltersFormatted(refetchAdvertisers, setToggleTotals),
    [refetchAdvertisers],
  )

  const columns: ColumnType<AdvertiserQL.Advertiser>[] = [
    {
      title: 'Included',
      key: 'included',
      width: '12%',
      align: 'center',
      render: (_: unknown, record: AdvertiserQL.Advertiser) => {
        const bpid = String(record.bpid)
        const isLocked = lockedBpids.has(bpid)
        // Selected + non-removable => disable so it can't be unchecked.
        const isPinned = draft.has(bpid) && Boolean(nonRemovableBpids?.has(bpid))
        return (
          <Toggle
            id={`mediaplan_product_settings-property_drawer_toggle-${bpid}`}
            checked={draft.has(bpid)}
            disabled={isLocked || isPinned}
            onChange={(checked: boolean) => toggleIncluded(bpid, checked)}
          />
        )
      },
    },
    {
      title: 'Advertiser Name',
      dataIndex: 'advertiserName',
      key: 'advertiserName',
      width: 'auto',
      ellipsis: true,
    },
    {
      title: 'BPID',
      dataIndex: 'bpid',
      key: 'bpid',
      width: '20%',
      ellipsis: true,
      render: (value: string) => String(value).toUpperCase(),
    },
    {
      title: 'Advertiser Type',
      dataIndex: 'advertiserTypes',
      key: 'advertiserTypes',
      width: '20%',
      ellipsis: true,
      render: (types: string[]) => (Array.isArray(types) ? types.join(', ') : 'Hotel'),
    },
  ]

  const filterItems: FilterItemWithType<AdvertiserQL.Advertiser>[] = [
    {
      name: 'ids',
      label: 'Advertiser (BPID)',
      type: 'multiple',
      options: selectedAdvertisers,
      optionsTagLabelKey: 'label',
      renderControl: ({ value, setValue }) => (
        <Select
          label='Advertiser (BPID)'
          id='mediaplan_product_settings-property_drawer-bpid-sel'
          placeholder='Select'
          popupMatchSelectWidth={600}
          mode='multiple'
          showSearch
          options={mergeWithSelected(advertiserOptions.options, selectedAdvertisers)}
          value={Array.isArray(value) ? value : []}
          onChange={(v: FilterValue) => {
            setValue(v as FilterValue)
            updateSelectedOptions(v, advertiserOptions.options, setSelectedAdvertisers)
          }}
          loading={advertiserOptions.loading}
          onSearch={advertiserOptions.onSearch}
          onBlur={advertiserOptions.onBlur}
          onPopupScroll={advertiserOptions.onPopupScroll}
          filterMode='server'
        />
      ),
    },
    {
      name: 'advertiserTypes',
      label: 'Advertiser Type',
      type: 'multiple',
      renderControl: ({ setValue }) => (
        <Select
          label='Advertiser Type'
          id='mediaplan_product_settings-property_drawer-type-sel'
          placeholder='Select'
          mode='multiple'
          showSearch
          value={[AdvertiserTypesEnum.Hotel]}
          disabled
          onChange={v => setValue(v)}
          options={[{ value: AdvertiserTypesEnum.Hotel, label: 'Hotel' }]}
        />
      ),
    },
  ]

  const tableFilterItems: FilterItemWithType<AdvertiserQL.Advertiser>[] = [
    {
      name: 'isFollowingOnly',
      label: 'View',
      type: 'single',
      placement: 'header',
      renderControl: ({ value, setValue }) => (
        <ToggleTab<FilterValue>
          value={value}
          onChange={v => setValue(v)}
          options={[
            {
              label: <span id='mediaplan_product_settings-property_drawer-my-txt'>{`My Advertisers (${toggleTotals.totalFollowing})`}</span>,
              value: true,
            },
            {
              label: <span id='mediaplan_product_settings-property_drawer-all-txt'>{`All Advertisers (${toggleTotals.totalAdvertisers})`}</span>,
              value: false,
            },
          ]}
        />
      ),
    },
  ]

  const initialFilters: Partial<Record<keyof AdvertiserQL.AdvertiserFilter, FilterValue>> = {
    isFollowingOnly: false,
    advertiserTypes: [AdvertiserTypesEnum.Hotel] as unknown as FilterValue,
  }

  return (
    <Drawer
      id='mediaplan_product_settings-property_drawer-dwr'
      title='Property Settings'
      width='760px'
      open={isOpen}
      onClose={onClose}
      footer={
        <DrawerFooter>
          <Button
            id='mediaplan_product_settings-property_drawer_cancel-btn'
            variant='outlined'
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            id='mediaplan_product_settings-property_drawer_save-btn'
            onClick={() => {
              onSave(new Set(draft))
              onClose()
            }}
          >
            Save
          </Button>
        </DrawerFooter>
      }
    >
      <DrawerFilterTableWrap>
        <TableWithFilterBanner<AdvertiserQL.Advertiser>
          sectionTitle='Filters'
          tableTitle='Properties'
          columns={columns}
          filterItems={[...filterItems, ...tableFilterItems]}
          initialFilters={initialFilters}
          filterMode='server'
          queryFn={queryFn}
          tableSearch={{ show: true }}
          id='mediaplan_product_settings-property_drawer-tbl'
          cellsIdPrefix='mediaplan_product_settings-property_drawer'
          rowKey='advertiserId'
        />
      </DrawerFilterTableWrap>
    </Drawer>
  )
}

export default PropertySettingsDrawer
