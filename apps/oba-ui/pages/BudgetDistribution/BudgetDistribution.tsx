import React, { FC, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import {
  Breadcrumb,
  Button,
  Container,
  Form,
  Modal,
  Spinner,
  Stepper,
  StickyFooter,
  Text,
  useNotification,
  Toggle,
  Grid,
} from '@amadeus/react-design-factory'
import { BudgetTracker } from '@mediahub/oba-ui/components/BudgetTracker'
import {
  BudgetDistributionTable,
  getMonthLabels,
  getTotalAllocatedBudget,
} from '@mediahub/oba-ui/components/BudgetDistributionTable'
// Hooks & Queries
import { useAdvPlanBudgetsQuery, useUpdateAdvPlanBudgetsMutation } from './BudgetDistribution.queries'
// Types
import { AdvertiserPlanStatusEnum } from '@mediahub/oba-ui/graphql/generated/oba-enums'
import type { GroupsData } from '@mediahub/oba-ui/components/BudgetDistributionTable/BudgetDistributionTable.d'
// Styles
import * as Styled from './BudgetDistribution.styled'
import { SpoilageOptInContainer, SpoilageOptInText } from './BudgetDistribution.styled'

const BudgetDistribution: FC = () => {
  const navigate = useNavigate()
  const notification = useNotification()

  const { planId } = useParams<{ planId: string }>()
  const isDetailsView = location.pathname.includes('/details/')
  const basePlanPath = isDetailsView ? `/oba/plans/${planId}/details` : `/oba/plans/${planId}`

  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false)

  const [form] = Form.useForm<ObaQL.AdvertiserPlanInput>()
  const groups = Form.useWatch(['groups'], form)

  const totalAllocatedBudget = useMemo(() => getTotalAllocatedBudget(groups ?? []), [groups])

  const { planBudgets, planBudgetsLoading, planBudgetsError } = useAdvPlanBudgetsQuery(planId)
  const { updateAdvPlanBudgets, updatedAdvPlanBudgetsData, updatedAdvPlanBudgetsLoading, updatedAdvPlanBudgetsError } =
    useUpdateAdvPlanBudgetsMutation()

  useEffect(() => {
    if (updatedAdvPlanBudgetsData) {
      notification.success('Budget Distribution has been saved!')
      goToCampaignAllocation()
    }
  }, [updatedAdvPlanBudgetsData])

  useEffect(() => {
    if (planBudgetsError) {
      notification.error('Error loading plan data', { description: planBudgetsError.message })
    }
  }, [planBudgetsError])

  useEffect(() => {
    if (updatedAdvPlanBudgetsError) {
      notification.error('Error saving plan budget distribution', { description: updatedAdvPlanBudgetsError?.message })
    }
  }, [updatedAdvPlanBudgetsError])

  useEffect(() => {
    if (!planBudgets) return

    let tableGroups: GroupsData[] = []
    if (planBudgets.groups.length) {
      tableGroups = planBudgets.groups.map(({ id, name, version, monthBudgets }) => ({
        id,
        name,
        version,
        monthBudgets, // All monthly budget data (for spent metrics)
        monthBudgetCents: monthBudgets.map(
          ({ budget }) => (typeof budget.budgetCents === 'number' ? budget.budgetCents / 100 : null), // Used for monthly values
        ),
      }))
    } else {
      tableGroups = [{ name: 'Group Name 1', monthBudgetCents: [] }]
    }
    form.setFieldsValue({ groups: tableGroups } as Omit<ObaQL.AdvertiserPlanInput['groups'], 'bundles'>)
  }, [planBudgets])

  const goToCampaignAllocation = () => navigate(`${basePlanPath}/campaign-allocation`)

  const addNewGroup = () => {
    if (!groups) return

    const newGroup: ObaQL.GroupPlanInput = {
      name: `Group Name ${groups.length + 1}`,
      monthBudgetCents: [],
    }
    form.setFieldValue('groups', [...groups, newGroup])
  }

  const handleDispatchOptInChange = (isChecked: boolean) => {
    form.setFieldValue('dispatchOptIn', isChecked)
  }

  const onSubmit = async (values: ObaQL.AdvertiserPlanInput) => {
    if (planBudgets) {
      const { id, version, status, totalBudget } = planBudgets
      const dispatchOptIn = values.dispatchOptIn
      const totalBudgetAmount = Number(totalBudget.budgetCents) / 100
      const prevAllocatedBudget = Number(totalBudget.budgetCents) / 100

      // Resume OBA confirmation modal (awaits user action, no submission flow)
      if (
        !isResumeModalOpen &&
        status === AdvertiserPlanStatusEnum.Paused &&
        prevAllocatedBudget > totalBudgetAmount &&
        totalAllocatedBudget <= totalBudgetAmount
      ) {
        setIsResumeModalOpen(true)
      } else {
        // Normal submission flow
        const { groups: tableGroups }: { groups: GroupsData[] } = form.getFieldsValue(true)

        if (totalAllocatedBudget > totalBudgetAmount) {
          notification.error('Total allocated budget cannot exceed total budget.')
          return
        }

        const monthCount = getMonthLabels(planBudgets.period).length

        const groupsInput: ObaQL.GroupPlanInput[] =
          tableGroups?.map(({ monthBudgets, monthBudgetCents, ...group }) => {
            const fullBudgetCents: (number | null)[] =
              monthBudgetCents?.map(value => Math.round((value || 0) * 100)) || []

            while (fullBudgetCents.length < monthCount) {
              fullBudgetCents.push(null)
            }

            return { ...group, monthBudgetCents: fullBudgetCents }
          }) || []

        await updateAdvPlanBudgets({
          variables: { input: { id, version, dispatchOptIn, groups: groupsInput } },
        })
      }
    } else {
      notification.error('Submission Failed!', { description: 'Advertiser plan data is missed.' })
    }
  }

  if (planBudgetsLoading) {
    return <Spinner fullscreen />
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
        <Text.H3>{planBudgets?.name || 'OBA Plan'}</Text.H3>
      </Container.Header>

      <Stepper
        current={1}
        items={[
          { title: 'Plan Settings', status: 'finish', onClick: () => navigate(`${basePlanPath}/settings`) },
          { title: 'Budget Distribution', status: planBudgets?.groups.length ? 'finish' : 'wait' },
          {
            title: 'Campaign Allocation',
            status: planBudgets?.groups?.some(group => group.bundles?.length) ? 'finish' : 'wait',
            ...(planBudgets?.groups[0]?.id && { onClick: () => goToCampaignAllocation() }),
          },
        ]}
      />

      <BudgetTracker
        allocatedBudget={totalAllocatedBudget}
        spentBudget={Number(planBudgets?.totalBudget.spentCents) / 100}
        unspentBudget={Number(planBudgets?.totalBudget.unSpentCents) / 100}
        totalBudget={Number(planBudgets?.totalBudget.budgetCents) / 100}
        currency={planBudgets?.currency}
        startDate={planBudgets?.period.startDate}
        endDate={planBudgets?.period.endDate}
      />

      <Form form={form} onFinish={onSubmit}>
        <Container.Section>
          <Container.Header>
            <Text.H5>Budget Distribution</Text.H5>
            <Button variant='outlined' onClick={addNewGroup} disabled={!groups}>
              Add Group
            </Button>
          </Container.Header>

          <Form.List name='groups'>
            {(fields, { add, remove }) =>
              planBudgets && (
                <BudgetDistributionTable
                  period={planBudgets.period}
                  currency={planBudgets.currency}
                  groups={groups ?? []}
                />
              )
            }
          </Form.List>

          <Styled.SpoilageOptInContainer>
            <Grid.Row align='middle'>
              <Form.Item colSpan={12} name='dispatchOptIn'>
                <>
                  <Toggle defaultChecked={planBudgets?.dispatchOptIn} onChange={handleDispatchOptInChange} />
                  <Styled.SpoilageOptInText>
                    Allocate spoilage spend pro-rata to upcoming monthly budgets.
                  </Styled.SpoilageOptInText>
                </>
              </Form.Item>
            </Grid.Row>
          </Styled.SpoilageOptInContainer>
        </Container.Section>

        <StickyFooter>
          <Button href='/oba/plans' variant='outlined' id='oba-budget_cancel-btn'>
            Cancel
          </Button>
          <Button htmlType='submit' id='oba-budget_submit-btn' loading={updatedAdvPlanBudgetsLoading}>
            Save & Continue
          </Button>
        </StickyFooter>
      </Form>

      <Modal
        idPrefix='oba-bud_warn-modal'
        title='Resume OBA'
        open={isResumeModalOpen}
        okText='Confirm'
        onOk={form.submit}
        onCancel={() => setIsResumeModalOpen(false)}
      >
        <Text.Body>The budget allocation is under the Total budget. This will resume OBA.</Text.Body>
      </Modal>
    </>
  )
}

export default BudgetDistribution
