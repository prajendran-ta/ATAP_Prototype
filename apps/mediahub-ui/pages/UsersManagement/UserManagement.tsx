import { useContext, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Breadcrumb, Select, Spinner, ToggleTab } from '@amadeus/react-design-factory'
import { useGetUsersQuery, useGetUsersOptionsQuery } from './UserManagement.queries'
import UserManagementDetails from './UserManagementDetails'
import UsersSummaryBanner from './UsersSummaryBanner'
import type { FilterItemWithType } from './UserManagement.d'
import type { FilterValue } from '@mediahub/mediahub-ui/components/TableWithFilters/FilterBanner/FilterBanner.d'
import type { ColumnType, TablePaginationConfig } from 'antd/es/table'
import { UserManagementWrapper, StatusBadge } from './UserManagement.styled'
import TableWithFilterBanner from '@mediahub/mediahub-ui/components/TableWithFilters/TableWithFilterBanner'
import { SegmentedValue } from 'antd/es/segmented'
import PermissionsAndRolesModal from './PermissionsAndRolesModal'
import { roleConfig, userStatusConfig, generateOptions } from './UserManagementConfig'
import { AuthContext, useAuth } from '@mediahub/mediahub-ui/context/AuthContext'
import type { SelectOption } from '@amadeus/react-design-factory/components/Select'
import { useServerOptions, updateSelectedOptions, mergeWithSelected, buildServerOptionsQueryFn } from '@amadeus/react-utils'

function UserManagementPage() {
  const { t } = useTranslation(['users', 'common'])
  const auth = useContext(AuthContext)
  const { isAdmin } = useAuth()
  const tableRef = useRef<any>(null)
  const [userRoleTotals, setUserRoleTotals] = useState<{
    totalAdministrators: number
    totalReadOnly: number
    totalStandard: number
  }>({
    totalAdministrators: 0,
    totalReadOnly: 0,
    totalStandard: 0,
  })

  const [toggleTotals, setToggleTotals] = useState<SharedQL.UserToggle>({
    totalActive: 0,
    totalInactive: 0,
    totalUsers: 0,
  })

  const [selectedUsers, setSelectedUsers] = useState<{ label: string; value: string | number }[]>([])

  const columns: ColumnType<SharedQL.User>[] = [
    {
      title: t('users:columns.name'),
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      ellipsis: true,
    },
    {
      title: t('users:columns.email'),
      dataIndex: 'email',
      key: 'email',
      width: 'auto',
      ellipsis: true,
    },
    {
      title: t('users:columns.role'),
      dataIndex: 'role',
      key: 'role',
      width: '15%',
      render: (role: string) => {
        const roleKey = role?.[0] ?? 'mh-read-only'
        const config = roleConfig[roleKey]

        return <StatusBadge color={config?.color} content={config?.label} fill />
      },
    },
    {
      title: t('users:columns.status'),
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      render: (status: string) => {
        return <StatusBadge color={userStatusConfig[status]?.color} content={userStatusConfig[status]?.label} />
      },
    },
    {
      title: t('users:columns.lastLogin'),
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      width: '15%',
    },
    {
      key: 'actions',
      align: 'center',
      width: '10%',
      render: (_: unknown, record: SharedQL.User, index: number) => (
        <UserManagementDetails
          index={index}
          user={record}
          refetch={() => {
            tableRef.current?.refetchWithFilters()
          }}
        />
      ),
    },
  ]

  const roleOptions = generateOptions(roleConfig)
  const statusOptions = generateOptions(userStatusConfig, true)

  const filterItems: FilterItemWithType<SharedQL.User>[] = [
    {
      name: 'id',
      label: t('users:columns.name'),
      type: 'multiple',
      optionsTagLabelKey: 'label',
      options: selectedUsers,
      renderControl: ({ value, setValue }) => (
        <Select
          id={'user-name-sel'}
          label={t('users:columns.name')}
          mode='multiple'
          showSearch
          placeholder='Select'
          options={mergeWithSelected(usersOptions.options, selectedUsers)}
          value={Array.isArray(value) ? value : []}
          onChange={(v: FilterValue) => {
            setValue(v as FilterValue)
            updateSelectedOptions(v, usersOptions.options, setSelectedUsers)
          }}
          loading={usersOptions.loading}
          onSearch={usersOptions.onSearch}
          onBlur={usersOptions.onBlur}
          onPopupScroll={usersOptions.onPopupScroll}
          filterMode='server'
        />
      ),
    },
    {
      name: 'role',
      label: t('common:role'),
      type: 'multiple',
      options: roleOptions,
      renderControl: ({ value, setValue }) => {
        return (
          <Select
            label={t('common:role')}
            id={'user-role-sel'}
            placeholder='Select'
            mode='multiple'
            showSearch
            value={Array.isArray(value) ? value : []}
            onChange={v => setValue(v)}
            options={roleOptions}
          />
        )
      },
    },
    {
      name: 'status',
      label: t('common:status'),
      type: 'multiple',
      renderControl: ({ value, setValue }) => (
        <Select
          label={t('common:status')}
          id={'user-status-sel'}
          placeholder='Select'
          mode='multiple'
          showSearch
          value={Array.isArray(value) ? value : []}
          onChange={v => setValue(v)}
          options={statusOptions}
        />
      ),
    },
  ]

  const tableFilterItems: FilterItemWithType<SharedQL.User>[] = [
    {
      name: 'status',
      label: 'View',
      type: 'single',
      placement: 'header',
      renderControl: ({ value, setValue }) => {
        const segmentedValue: SegmentedValue = Array.isArray(value)
          ? value.length === 2
            ? 'all'
            : (value[0] ?? 'all')
          : ((value as SegmentedValue) ?? 'all')

        return (
          <ToggleTab
            value={segmentedValue || 'all'}
            onChange={(v: SegmentedValue) => {
              const selected = String(v)
              const mapped = selected === 'all' ? ['active', 'inactive'] : [selected]
              setValue(mapped)
            }}
            options={[
              {
                label: <span id='user-all-txt'>{t('users:filters.allUsers', { count: toggleTotals.totalUsers })}</span>,
                value: 'all',
              },
              {
                label: (
                  <span id='user-active-txt'>
                    {t('users:filters.activeUsers', { count: toggleTotals.totalActive })}
                  </span>
                ),
                value: 'active',
              },
              {
                label: (
                  <span id='user-inactive-txt'>
                    {t('users:filters.inactiveUsers', { count: toggleTotals.totalInactive })}
                  </span>
                ),
                value: 'inactive',
              },
            ]}
          />
        )
      },
    },
  ]

  const initialFilters: Partial<Record<keyof SharedQL.User, FilterValue>> = {}

  const mapUserToOption = (user: SharedQL.User): SelectOption => ({
    label: user.name,
    value: user.id,
  })

  const { refetch: refetchUsersOptions } = useGetUsersOptionsQuery(undefined, undefined, true)
  const usersOptions = useServerOptions({
    queryFn: buildServerOptionsQueryFn({
      refetch: refetchUsersOptions,
      buildVars: (search, pagination) => ({
        options: {
          search: { query: search, fields: ['name', 'email'] },
          paginate: { limit: pagination.limit, offset: pagination.offset },
        },
      }),
      getItems: data => data?.users?.users ?? [],
      mapToOption: mapUserToOption,
    }),
    pageSize: 20,
  })

  function refetchUsersFiltersFormated(
    refetchUsers: (vars?: {
      options?: SharedQL.PageQueryOptions
    }) => Promise<{ data?: { users: SharedQL.UsersResponse } }>,
    setUserRoleTotals: (totals: { totalAdministrators: number; totalReadOnly: number; totalStandard: number }) => void,
    setToggleTotals: (totals: SharedQL.UserToggle) => void = () => {},
  ) {
    return async (
      filters?: Record<string, any>,
      pagination?: TablePaginationConfig,
    ): Promise<{ data: SharedQL.User[]; total: number }> => {
      const search = filters?.search
      const restFilters = { ...(filters ?? {}) }

      const operators: SharedQL.OperatorOptions[] = Object.entries(restFilters).flatMap(([field, value]) => {
        if (value == null || value.length === 0) return []

        if (Array.isArray(value)) {
          return [
            {
              field,
              operator: 'in',
              values: value.map(v => String(v)),
            },
          ]
        }

        return [
          {
            field,
            operator: 'in',
            values: [String(value)],
          },
        ]
      })

      const searchOptions: SharedQL.SearchOptions | undefined =
        typeof search === 'string' && search.trim().length > 0
          ? {
              query: search.trim(),
              fields: ['name', 'email'],
            }
          : undefined

      const options: SharedQL.PageQueryOptions = {
        paginate: {
          limit: pagination?.pageSize ?? 10,
          offset: ((pagination?.current ?? 1) - 1) * (pagination?.pageSize ?? 10),
        },
        search: searchOptions,
        operators: operators.length > 0 ? operators : undefined,
      }

      const response = await refetchUsers({ options })

      const { totalAdministrators = 0, totalReadOnly = 0, totalStandard = 0 } = response.data?.users ?? {}

      setUserRoleTotals({
        totalAdministrators,
        totalReadOnly,
        totalStandard,
      })

      setToggleTotals({
        totalActive: response.data?.users.toggle.totalActive ?? 0,
        totalInactive: response.data?.users?.toggle.totalInactive ?? 0,
        totalUsers: response.data?.users?.toggle.totalUsers ?? 0,
      })

      return {
        data: response.data?.users?.users ?? [],
        total: response.data?.users?.totalCount ?? 0,
      }
    }
  }
  const { refetch: refetchUsers } = useGetUsersQuery()
  const queryFn = refetchUsersFiltersFormated(refetchUsers, setUserRoleTotals, setToggleTotals)

  const titleButtons = (
    <PermissionsAndRolesModal
      summaryBanner={<UsersSummaryBanner totals={userRoleTotals} margin={'16px 0px 0px 0px'} />}
    />
  )

  if (!auth?.permissionsLoaded) return <Spinner />

  if (!isAdmin) {
    window.location.assign('/')
    return null
  }
  return (
    <UserManagementWrapper>
      <Breadcrumb items={[{ title: t('common:home'), href: '/' }, { title: t('users:title') }]} />
      <TableWithFilterBanner
        id='user-tbl'
        cellsIdPrefix='user'
        rowKey='id'
        ref={tableRef}
        sectionTitle={t('users:title')}
        titleButtons={titleButtons}
        summaryContent={<UsersSummaryBanner totals={userRoleTotals} />}
        columns={columns}
        filterItems={[...filterItems, ...tableFilterItems]}
        initialFilters={initialFilters}
        filterMode='server'
        queryFn={queryFn}
        tableSearch={{ show: true }}
        tableTitle={t('users:tableTitle')}
      />
    </UserManagementWrapper>
  )
}

export default UserManagementPage
