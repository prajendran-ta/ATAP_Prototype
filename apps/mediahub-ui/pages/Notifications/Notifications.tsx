import { useRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Breadcrumb, Button, Select, ToggleTab } from '@amadeus/react-design-factory'
import TableWithFilterBanner from '@mediahub/mediahub-ui/components/TableWithFilters/TableWithFilterBanner'
import type { FilterItemWithType } from './Notifications.d'
import type { FilterValue } from '@mediahub/mediahub-ui/components/TableWithFilters/FilterBanner/FilterBanner.d'
import type { ColumnType } from 'antd/es/table'
import { NotificationsWrapper, CategoryBadge, MessageCell } from './Notifications.styled'
import { useGetNotificationsQuery } from './Notifications.queries'
import {
  notificationsCategoriesConfig,
  generateOptions,
  notificationsStatusesConfig,
  renderNotificationAction,
  notificationsModulesConfig,
  notificationsTimePeriodConfig,
  notificationsLevelConfig,
  buildHrefFromLink,
  NotificationActionsDots,
  useAlertLevelOptions,
  isBroadFilter,
} from './NotificationsConfig'
import { useNotificationGroups } from '@mediahub/mediahub-ui/components/Notifications/Notifications.queries'
import { useNotificationActions } from './useNotificationsActions/useNotificationsActions'
import { useNavigate } from 'react-router'
import { AlertStatusEnum, TimePeriodEnum } from '@mediahub/mediahub-ui/graphql/generated/shared-enums'
import { useGetAdvertiserOptionsQuery } from '@mediahub/advertisers-ui/pages/Advertisers/Advertisers.queries'
import { SelectOption } from '@amadeus/react-design-factory/components/Select'
import { useAuth } from '@mediahub/mediahub-ui/context/AuthContext'
import { BroadFilterWarning } from './BroadFilterWarning'
import { buildServerOptionsQueryFn, useServerOptions, updateSelectedOptions, mergeWithSelected } from '@amadeus/react-utils'
import { AdvertiserTypesEnum } from '@mediahub/advertisers-ui/graphql/generated/advertiser-enums'

function NotificationsPage() {
  const { t } = useTranslation(['notifications', 'common'])
  const { user, isReadOnly, isExternal } = useAuth()
  const userId = user?.id as number
  const tableRef = useRef<any>(null)
  const [showWarningTable, setShowWarningTable] = useState(false)
  const { refetch: refetchGrouped } = useNotificationGroups()
  const navigate = useNavigate()

  const { handleMarkAsRead } = useNotificationActions()

  const levelConfig = notificationsLevelConfig(t)
  const categoriesConfig = notificationsCategoriesConfig(t)
  const alertLevelOptions = useAlertLevelOptions()

  const refetchAll = async () => {
    tableRef.current?.refetchWithFilters()
    await refetchGrouped()
  }

  const columns: ColumnType<SharedQL.Notification>[] = [
    {
      title: t('notifications:columns.alertType'),
      dataIndex: 'alert_type',
      key: 'level',
      width: '80px',
      align: 'center',
      render: (_: unknown, record: SharedQL.Notification) => levelConfig[record.level].icon,
    },
    {
      title: t(isExternal ? 'notifications:columns.advertiserBpid' : 'notifications:columns.advertiserBpidInternal'),
      key: 'advertiserName',
      dataIndex: 'advertiser_name',
      width: '18%',
      ellipsis: true,
      render: (_: unknown, record: SharedQL.Notification) => record.advertiser.name,
    },
    {
      title: t('notifications:columns.module'),
      dataIndex: 'module',
      key: 'module',
      width: '8%',
    },
    {
      title: t('notifications:columns.category'),
      dataIndex: 'category',
      key: 'category',
      width: '10%',
      render: (category: string) => (
        <CategoryBadge color={categoriesConfig[category]?.color} fill content={categoriesConfig[category]?.label} />
      ),
    },
    {
      title: t('notifications:columns.time'),
      dataIndex: ['createdAt', 'ago'],
      key: 'time',
      width: '10%',
    },
    {
      title: t('notifications:columns.message'),
      dataIndex: 'message',
      key: 'message',
      width: 'auto',
      render: (message: string) => (
        <MessageCell>{isExternal ? message.replace(/^(BID\/BPID|BID)\s+[^-]+-[^-]+-\s*/, '') : message}</MessageCell>
      ),
    },
    {
      dataIndex: 'link',
      key: 'link',
      width: '5%',
      render: (_: string, record: SharedQL.Notification, index: number) => (
        <Button
          id={`notification-view-${index}-btn`}
          variant='text'
          children={t('common:view')}
          href={buildHrefFromLink(record.link as SharedQL.Link)}
        />
      ),
    },
    {
      dataIndex: 'status',
      key: 'status',
      width: 180,
      render: (_: any, record: SharedQL.Notification, index: number) =>
        renderNotificationAction(record, handleMarkAsRead, refetchAll, index, t),
    },
    {
      key: 'actions',
      width: '20px',
      dataIndex: 'actions',
      render: (_: any, record: SharedQL.Notification, index: number) => (
        <NotificationActionsDots record={record} afterFn={refetchAll} index={index} />
      ),
    },
  ]

  const filteredColumns = isReadOnly ? columns.filter(c => c.key !== 'status' && c.key !== 'actions') : columns

  const notificationsLevelsOptions = generateOptions(notificationsLevelConfig(t), true)
  const notificationsCategoriesOptions = generateOptions(notificationsCategoriesConfig(t), true)
  const notificationsStatusesOptions = generateOptions(notificationsStatusesConfig(t), true)
  const notificationsModulesOptions = generateOptions(notificationsModulesConfig(t), true)
  const notificationsTimePeriodOptions = generateOptions(notificationsTimePeriodConfig(t), true)

  const mapAdvertiserToOption = (advertiser: AdvertiserQL.Advertiser): SelectOption => ({
    label: isExternal ? advertiser.advertiserName : `${advertiser.advertiserName} (${String(advertiser.bpid).toUpperCase()})`,
    value: advertiser.advertiserId,
  })

  const { refetch: refetchAdvertisersOptions } = useGetAdvertiserOptionsQuery(true)
  const advertiserOptions = useServerOptions({
    queryFn: buildServerOptionsQueryFn({
      refetch: refetchAdvertisersOptions,
      buildVars: (search, pagination) => ({
        filter: {
          advertiserTypes: AdvertiserTypesEnum.Hotel,
          name: (search ?? '').trim(),
          isFollowingOnly: false,
          paging: { limit: pagination.limit, offset: pagination.offset },
        },
      }),
      getItems: data => data?.advertisers?.advertisers ?? [],
      mapToOption: adv => mapAdvertiserToOption(adv as AdvertiserQL.Advertiser),
    }),
    pageSize: 20,
  })

  const [selectedAdvertisers, setSelectedAdvertisers] = useState<{ label: string; value: string | number }[]>([])

  const filterItems: FilterItemWithType<SharedQL.NotificationFilter>[] = [
    {
      name: 'levels',
      label: t('notifications:columns.alertType'),
      type: 'multiple',
      options: alertLevelOptions,
      optionsTagLabelKey: 'label',
      renderControl: ({ value, setValue }) => (
        <Select
          label={t('notifications:columns.alertType')}
          id={'notification-alert_type-sel'}
          placeholder={t('common:select')}
          mode='multiple'
          showSearch
          value={Array.isArray(value) ? value : []}
          onChange={v => setValue(v)}
          options={notificationsLevelsOptions}
        />
      ),
    },
    {
      name: 'advertiserIds',
      label: t(isExternal ? 'notifications:filters.advertiserBpid' : 'notifications:filters.advertiserBpidInternal'),
      type: 'multiple',
      options: selectedAdvertisers,
      optionsTagLabelKey: 'label',
      renderControl: ({ value, setValue }) => (
        <Select
          label={t(isExternal ? 'notifications:filters.advertiserBpid' : 'notifications:filters.advertiserBpidInternal')}
          id='notification-advertiser-sel'
          placeholder={t('common:select')}
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
      name: 'modules',
      label: t('notifications:filters.modules'),
      type: 'multiple',
      renderControl: ({ value, setValue }) => (
        <Select
          label={t('notifications:columns.module')}
          id={'notification-module-sel'}
          placeholder={t('common:select')}
          mode='multiple'
          showSearch
          value={Array.isArray(value) ? value : []}
          onChange={v => setValue(v)}
          options={notificationsModulesOptions}
        />
      ),
    },
    {
      name: 'categories',
      label: t('notifications:filters.category'),
      type: 'multiple',
      renderControl: ({ value, setValue }) => (
        <Select
          label={t('notifications:columns.category')}
          id={'notification-category-sel'}
          placeholder={t('common:select')}
          mode='multiple'
          showSearch
          value={Array.isArray(value) ? value : []}
          onChange={v => setValue(v)}
          options={notificationsCategoriesOptions}
        />
      ),
    },
    {
      name: 'timePeriod',
      label: t('notifications:filters.timePeriod'),
      options: notificationsTimePeriodOptions,
      optionsTagLabelKey: 'label',
      renderControl: ({ value, setValue }) => (
        <Select
          label={t('notifications:filters.timePeriod')}
          id={'notification-time_period-sel'}
          placeholder={t('common:select')}
          showSearch
          value={value ? value : undefined}
          onChange={v => setValue(v)}
          options={notificationsTimePeriodOptions}
        />
      ),
    },
    {
      name: 'status',
      label: t('notifications:filters.status'),
      renderControl: ({ value, setValue }) => (
        <Select
          label={t('notifications:filters.status')}
          id={'notification-status-sel'}
          placeholder={t('common:select')}
          showSearch
          value={value ? value : undefined}
          onChange={v => setValue(v)}
          options={notificationsStatusesOptions}
        />
      ),
    },
  ]

  const tableFilterItems: FilterItemWithType<SharedQL.NotificationFilter>[] = [
    {
      name: 'myAdvertisers',
      label: 'View',
      type: 'single',
      placement: 'header',
      renderControl: ({ value, setValue }) => (
        <ToggleTab<FilterValue>
          value={value}
          onChange={v => setValue(v)}
          options={[
            {
              label: <span id='notification-my-txt'>{t('notifications:filters.myNotifications')}</span>,
              value: true,
            },
            {
              label: <span id='notification-all-txt'>{t('notifications:filters.allNotifications')}</span>,
              value: false,
            },
          ]}
        />
      ),
    },
  ]

  const initialFilters: Partial<Record<keyof SharedQL.NotificationFilter, FilterValue>> = {
    timePeriod: TimePeriodEnum.Last_24Hours,
    myAdvertisers: true,
    status: AlertStatusEnum.Unread,
  }

  const { refetch } = useGetNotificationsQuery({})

  const refetchFormatted = async (filters?: Record<string, any>) => {
    if (isBroadFilter(filters)) {
      setShowWarningTable(true)
      return { data: [], total: 0 }
    } else {
      setShowWarningTable(false)
    }

    const response = await refetch({
      filter: Object.fromEntries(
        Object.entries(!!filters && filters).filter(([_, value]) => {
          if (Array.isArray(value)) return value.length > 0
          return value !== undefined && value !== null && value !== ''
        }),
      ) as SharedQL.NotificationFilter,
    })

    return {
      data: response.data?.notifications ?? [],
      total: response.data.notifications.length,
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (params.get('refetch') === 'notifications') {
      tableRef.current?.refetchWithFilters()
      params.delete('refetch')
      navigate({ pathname: location.pathname, search: params.toString() }, { replace: true })
    }
  }, [location.search, refetchAll])

  return (
    <NotificationsWrapper>
      <Breadcrumb items={[{ title: t('common:home'), href: '/' }, { title: t('notifications:drawerTitle') }]} />
      <TableWithFilterBanner<SharedQL.Notification & SharedQL.NotificationFilter>
        ref={tableRef}
        sectionTitle={t('notifications:title')}
        columns={filteredColumns}
        filterItems={[...filterItems, ...tableFilterItems]}
        initialFilters={initialFilters}
        filterMode='server'
        queryFn={refetchFormatted}
        tableSearch={{ show: true, placeholder: t('notifications:searchPlaceholder'), keys: ['message'] }}
        tableTitle={t('notifications:tableTitle')}
        clientSideFilters={['pagination', 'search']}
        tableWarning={{ show: showWarningTable, component: <BroadFilterWarning /> }}
        id='notification-tbl'
        cellsIdPrefix='notification'
        rowKey='id'
      />
    </NotificationsWrapper>
  )
}

export default NotificationsPage
