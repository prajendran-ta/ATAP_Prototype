import React, { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import {
  Breadcrumb,
  Button,
  Container,
  Grid,
  Search,
  Stepper,
  StickyFooter,
  Table,
  Text,
  ToggleTab,
} from '@amadeus/react-design-factory'
// Queries
import { useAdvertiserPlanQuery } from '@mediahub/oba-ui/pages/CampaignAllocation/CampainAllocation.queries'
//Helpers
import { GroupDetails } from './GroupDetails/index'
import { getGroupPlanColumns } from '@mediahub/oba-ui/pages/CampaignAllocation/CampaignAllocation.helpers'
// Types
import { GroupStatusType } from './CampaignAllocation.d'

const CampaignAllocation = () => {
  const navigate = useNavigate()
  const { planId } = useParams<{ planId: string }>() as {
    planId: string
  }
  const { advertiserPlans, advertiserPlansLoading } = useAdvertiserPlanQuery({ id: +planId })
  const [selectedCategory, setSelectedCategory] = useState<GroupStatusType>('All')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [open, setOpen] = useState(false)
  const isDetailsView = location.pathname.includes('/details/')
  const basePlanPath = isDetailsView ? `/oba/plans/${planId}/details` : `/oba/plans/${planId}`

  const filterGroupPlansByStatus = (groups: ObaQL.GroupPlan[] = [], status: GroupStatusType): ObaQL.GroupPlan[] => {
    if (status === 'All') {
      return groups.filter(plan => plan.status === 'Active' || plan.status === 'Incomplete')
    }
    return groups.filter(plan => plan.status === status)
  }

  const filteredAdvertiserGroupPlans = useMemo(() => {
    return filterGroupPlansByStatus(advertiserPlans?.groups, selectedCategory).filter(
      plan =>
        plan.name.toLowerCase().includes(searchKeyword) ||
        plan.status.toLowerCase().includes(searchKeyword) ||
        plan?.kpi?.toLowerCase().includes(searchKeyword),
    )
  }, [advertiserPlans?.groups, selectedCategory, searchKeyword])

  const allGroupPlans = advertiserPlans?.groups.filter(plan => plan.status === 'Active' || plan.status === 'Incomplete')
  const incompleteGroupPlans = advertiserPlans?.groups.filter(plan => plan.status === 'Incomplete')
  const activeGroupPlans = advertiserPlans?.groups.filter(plan => plan.status === 'Active')
  const groupedCategories: { key: string; label: string }[] = useMemo(() => {
    return [
      {
        key: 'All',
        label: `All (${allGroupPlans?.length})`,
      },
      {
        key: 'Incomplete',
        label: `New Groups (${incompleteGroupPlans?.length})`,
      },
      {
        key: 'Active',
        label: `Completed Groups (${activeGroupPlans?.length})`,
      },
    ]
  }, [advertiserPlans?.groups])

  const [selectedGroupId, setSelectedGroupId] = useState<number>()

  const onOpenDetailsDrawer = (id: number) => {
    setSelectedGroupId(id)
    setOpen(true)
  }

  const onCloseDetailsDrawer = () => {
    setSelectedGroupId(undefined)
    setOpen(false)
  }

  return (
    <>
      <Breadcrumb
        defaultHome
        items={[
          { title: 'Omni-Channel Budget Allocation', href: '/oba/plans' },
          ...(isDetailsView ? [{ title: 'OBA Details', href: basePlanPath }] : []),
          { title: planId ? 'OBA Settings' : 'New OBA Plan' },
        ]}
      />

      <Container.Header>
        <Text.H3>{planId ? advertiserPlans?.name : 'New OBA Plan'}</Text.H3>
      </Container.Header>
      <Stepper
        current={2}
        items={[
          {
            title: 'Plan Settings',
            status: planId ? 'finish' : 'process',
            onClick: () => navigate(`${basePlanPath}/settings`),
          },
          {
            title: 'Budget Distribution',
            onClick: () => navigate(`${basePlanPath}/budget-distribution`),
            status: advertiserPlans?.groups.length ? 'finish' : 'wait',
          },
          {
            title: 'Campaign Allocation',
            status: advertiserPlans?.groups?.some(group => group.bundles?.length) ? 'finish' : 'process',
          },
        ]}
      />

      <Container.Section>
        <Container.Header>
          <Text.H5>Campaign Allocation</Text.H5>
        </Container.Header>

        <Grid.Row>
          <Grid.Col span={6}>
            <ToggleTab
              value={selectedCategory}
              onChange={category => setSelectedCategory(category as GroupStatusType)}
              options={groupedCategories.map(category => ({
                value: category.key,
                label: category.label,
              }))}
            />
          </Grid.Col>
          <Grid.Col span={3}></Grid.Col>
          <Grid.Col span={3}>
            <Search placeholder='Group Name, Status, KPI' onSearch={value => setSearchKeyword(value)} />
          </Grid.Col>
        </Grid.Row>

        <Table<ObaQL.GroupPlan>
          id='oba-group_plans-tbl'
          cellsIdPrefix='oba'
          columns={getGroupPlanColumns(onOpenDetailsDrawer, advertiserPlans?.currency)}
          dataSource={filteredAdvertiserGroupPlans || []}
          rowKey='id'
          loading={advertiserPlansLoading}
          pagination={false}
        />
      </Container.Section>

      <StickyFooter>
        <Button href='/oba/plans' htmlType='button' id='oba-group_plans_back-btn'>
          Complete
        </Button>
      </StickyFooter>

      <GroupDetails drawerIsOpen={open} groupId={selectedGroupId} onCloseDrawer={onCloseDetailsDrawer} />
    </>
  )
}

export default CampaignAllocation
