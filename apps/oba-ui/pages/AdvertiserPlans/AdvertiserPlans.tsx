import React, { useEffect, useState } from 'react'
import { Breadcrumb, Button, Container, Grid, Select, Table, Tag, Text, ToggleTab } from '@amadeus/react-design-factory'
// Helpers & Queries
import { AdvertiserPlanStatusEnum } from '@mediahub/oba-ui/graphql/generated/oba-enums'
import {
  useAdvertiserNameOptions,
  usePlanNameOptions,
  statusOptions,
  filterNameMap,
  plansTableColumns,
} from './AdvertiserPlans.helpers'
import { useAdvertiserPlansQuery } from './AdvertiserPlans.queries'
// Types
import type { SelectOption } from '@amadeus/react-design-factory/components/Select'
import type { PlanFilter } from './AdvertiserPlans.d'

const AdvertiserPlans = () => {
  const [filterValues, setFilterValues] = useState<ObaQL.AdvertiserPlanFilter>({
    ids: [],
    advertiserIds: [],
    status: [],
    myAdvertisers: true,
  })

  const [filterNames, setFilterNames] = useState<Record<PlanFilter, string>>({
    ids: '',
    advertiserIds: '',
    status: '',
  })

  const { plans, plansLoading, refetchPlans } = useAdvertiserPlansQuery({ filter: filterValues })

  useEffect(() => {
    refetchPlans({ filter: filterValues })
  }, [filterValues, refetchPlans])

  const { planNameOptions, planNamesLoading } = usePlanNameOptions()
  const { advertiserNameOptions, advertiserNamesLoading } = useAdvertiserNameOptions()

  const updateFilters = (filter: PlanFilter, value: (number | string)[] = [], options: SelectOption[] = []) => {
    setFilterValues(prevState => ({ ...prevState, [filter]: value }))
    setFilterNames(prevState => ({ ...prevState, [filter]: options.map(option => option.label).join(', ') }))
  }

  const clearAllFilters = () => {
    setFilterValues(({ myAdvertisers }) => ({ myAdvertisers, ids: [], advertiserIds: [], status: [] }))
    setFilterNames({ ids: '', advertiserIds: '', status: '' })
  }

  const updateMyPlansFilter = (myAdvertisers: boolean) => {
    setFilterValues(prevState => ({ ...prevState, myAdvertisers }))
  }

  const renderActiveFilters = () => {
    const activeFilterEntries = Object.entries(filterNames).filter(([, value]) => value)

    if (activeFilterEntries.length) {
      return activeFilterEntries.map(([key, value]) => (
        <Tag key={key} status='primary'>
          {`${filterNameMap[key as PlanFilter]}: ${value}`}
        </Tag>
      ))
    } else {
      return <Tag status='disabled'>None</Tag>
    }
  }

  return (
    <>
      <Breadcrumb defaultHome items={[{ title: 'Omni-Channel Budget Allocation' }]} />
      <Container.Header>
        <Text.H3>Omni-Channel Budget Allocation</Text.H3>
        <Button id='oba-create-btn' href='/oba/plans/create'>
          New OBA
        </Button>
      </Container.Header>

      <Container.Section>
        <Container.Header>
          <Text.H5>Filters</Text.H5>
          <Button variant='link' onClick={clearAllFilters}>
            Clear All
          </Button>
        </Container.Header>

        <Grid.Row>
          <Grid.Col span={2}>
            <Select<Array<ObaQL.IdAndName['id']>>
              label={filterNameMap.ids}
              id='oba-plan-sel'
              mode='multiple'
              allowClear
              loading={planNamesLoading}
              options={planNameOptions}
              value={filterValues.ids}
              onChange={(ids, options) => updateFilters('ids', ids, options as SelectOption[])}
            />
          </Grid.Col>
          <Grid.Col span={2}>
            <Select<Array<ObaQL.IdAndName['id']>>
              label={filterNameMap.advertiserIds}
              id='oba-adv-sel'
              mode='multiple'
              allowClear
              loading={advertiserNamesLoading}
              options={advertiserNameOptions}
              value={filterValues.advertiserIds}
              onChange={(advIds, options) => updateFilters('advertiserIds', advIds, options as SelectOption[])}
            />
          </Grid.Col>
          <Grid.Col span={2}>
            <Select<AdvertiserPlanStatusEnum[]>
              label={filterNameMap.status}
              id='oba-status-sel'
              mode='multiple'
              allowClear
              options={statusOptions}
              value={filterValues.status}
              onChange={(status, options) => updateFilters('status', status, options as SelectOption[])}
            />
          </Grid.Col>
        </Grid.Row>

        <Grid.Row>
          <Grid.Col>
            <Text.Body>Active Filters</Text.Body>
          </Grid.Col>
          <Grid.Col>{renderActiveFilters()}</Grid.Col>
        </Grid.Row>
      </Container.Section>

      <Container.Section>
        <Text.H5>Omni-Channel Budget Allocation Plan Overview</Text.H5>
        <ToggleTab<boolean>
          options={[
            { label: 'My Plans', value: true },
            { label: 'All Plans', value: false },
          ]}
          onChange={updateMyPlansFilter}
        />
        <Table<ObaQL.AdvertiserPlanLite>
          id='oba-plans-tbl'
          cellsIdPrefix='oba'
          rowKey='id'
          loading={plansLoading}
          dataSource={plans || []}
          columns={plansTableColumns}
          pagination={true}
        />
      </Container.Section>
    </>
  )
}

export default AdvertiserPlans
