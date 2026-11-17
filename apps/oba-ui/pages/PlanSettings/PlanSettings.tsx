import React, { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import dayjs from 'dayjs'
// Components
import {
  Breadcrumb,
  Button,
  Container,
  DatePicker,
  Grid,
  Form,
  Icon,
  Input,
  InputNumber,
  Modal,
  Select,
  Spinner,
  Stepper,
  StickyFooter,
  Text,
  useNotification,
  colors,
} from '@amadeus/react-design-factory'
import { BudgetTracker } from '@mediahub/oba-ui/components/BudgetTracker'
// Helpers
import { formatToISODate } from '@amadeus/react-utils'
import { AdvertiserPlanStatusEnum } from '@mediahub/oba-ui/graphql/generated/oba-enums'
// Hooks & Queries
import { useAdvertiserNameOptions } from '../AdvertiserPlans/AdvertiserPlans.helpers'
import { useCurrencyOptions } from './PlanSettings.helpers'
import { useAdvPlanSettingsQuery, useUpdateAdvPlanMutation, useDeleteAdvPlanMutation } from './PlanSettings.queries'
// Types
import type { RuleObject } from 'antd/es/form'
// Styles
import * as Styled from './PlanSettings.styled'

// Customized Form.Item that includes type-checking for Plan Input
const FormItem = Form.Item<ObaQL.AdvertiserPlanInput>

const PlanSettings = () => {
  const navigate = useNavigate()
  const notification = useNotification()
  const { planId } = useParams<{ planId: string }>()
  const isDetailsView = location.pathname.includes('/details/')
  const basePlanPath = isDetailsView ? `/oba/plans/${planId}/details` : `/oba/plans/${planId}`

  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

  const [form] = Form.useForm<ObaQL.AdvertiserPlanBudgetsInput>()
  const currency = Form.useWatch(['currency'], form)
  const totalBudget = Form.useWatch(['totalBudget'], form)
  const startDate = Form.useWatch(['period', 'startDate'], form)
  const endDate = Form.useWatch(['period', 'endDate'], form)

  const { planSettings, planSettingsLoading } = useAdvPlanSettingsQuery(planId)
  const { updateAdvPlan, updatedAdvPlanData, updatedAdvPlanLoading, updatedAdvPlanError } = useUpdateAdvPlanMutation()
  const { deleteAdvPlan, deletedAdvPlanData, deletedAdvPlanLoading, deletedAdvPlanError } = useDeleteAdvPlanMutation()
  const { advertiserNameOptions, advertiserNamesLoading } = useAdvertiserNameOptions()
  const { currencyOptions, currenciesLoading } = useCurrencyOptions()

  const allocatedBudget = Number(planSettings?.totalBudget.allottedCents ?? 0) / 100
  const spentBudget = Number(planSettings?.totalBudget.spentCents ?? 0) / 100
  const unspentBudget = Number(planSettings?.totalBudget.unSpentCents ?? 0) / 100

  const isCampaignStarted = useMemo(() => {
    if (!planSettings) return false
    return (
      dayjs().isAfter(dayjs(planSettings.period.startDate)) ||
      planSettings.status === AdvertiserPlanStatusEnum.Live ||
      planSettings.status === AdvertiserPlanStatusEnum.Completed
    )
  }, [planSettings])

  const initialValues = useMemo(() => {
    if (!planSettings) return {}

    const { name, advertiser, currency, totalBudget, period, marginPercent, managementFeePercent } = planSettings
    return {
      name,
      advertiserId: advertiser.id,
      currency,
      marginPercent,
      managementFeePercent,
      totalBudget: Number(totalBudget?.budgetCents) / 100,
      period: {
        startDate: dayjs(period.startDate),
        endDate: dayjs(period.endDate),
      },
    }
  }, [planSettings])

  useEffect(() => {
    if (updatedAdvPlanData) {
      notification.success('Plan Settings have been Saved.')
      navigate(`/oba/plans/${updatedAdvPlanData.id}/${isDetailsView ? 'details/' : ''}budget-distribution`)
    }
  }, [updatedAdvPlanData])

  useEffect(() => {
    if (updatedAdvPlanError) {
      notification.error('Saving Plan Settings has been Failed!', { description: updatedAdvPlanError.message })
    }
  }, [updatedAdvPlanError])

  const validateMarginValue = (rule: RuleObject, value: number) => {
    const remainder = value % 1
    if (!value || remainder === 0 || remainder === 0.5) {
      return Promise.resolve()
    } else {
      return Promise.reject(new Error('Margin value must be in the format x.0 or x.5'))
    }
  }

  const validateTotalBudget = (rule: RuleObject, value: number) => {
    if (!value || value >= spentBudget) {
      return Promise.resolve()
    } else {
      return Promise.reject(new Error(`Budget can't be less than spent`))
    }
  }

  const onSubmit = async (values: ObaQL.AdvertiserPlanBudgetsInput) => {
    if (!isBudgetModalOpen && allocatedBudget > Number(values.totalBudget)) {
      setIsBudgetModalOpen(true)
    } else {
      const formattedValues: ObaQL.AdvertiserPlanInput = {
        ...values,
        ...(planSettings && { id: planSettings.id, version: planSettings.version }),
        ...(values.period && {
          period: {
            startDate: formatToISODate(values.period.startDate!),
            endDate: formatToISODate(values.period.endDate!),
          },
        }),
        ...(values.totalBudget && { totalBudget: Math.round(values.totalBudget * 100) }),
      }

      updateAdvPlan({ variables: { input: formattedValues } })
    }
  }

  const onDeletePlan = async () => {
    if (!planSettings?.id || planSettings.status !== AdvertiserPlanStatusEnum.Scheduled) {
      notification.error('Only Scheduled plans can be deleted.')
      setIsDeleteModalOpen(false)
      return
    }

    deleteAdvPlan({
      variables: {
        input: {
          id: planSettings.id,
          version: planSettings.version,
        },
      },
    })
  }

  useEffect(() => {
    // For Void mutations, success can be null; undefined means "not completed yet"
    if (deletedAdvPlanData !== undefined && !deletedAdvPlanError) {
      notification.success('OBA Plan has been deleted.')
      setIsDeleteModalOpen(false)
      navigate('/oba/plans')
    }
  }, [deletedAdvPlanData, deletedAdvPlanError, notification, navigate])

  useEffect(() => {
    if (deletedAdvPlanError) {
      notification.error('Deleting OBA Plan has Failed!', { description: deletedAdvPlanError.message })
    }
  }, [deletedAdvPlanError])

  if (planSettingsLoading) {
    return <Spinner fullscreen />
  }

  return (
    <>
      <Form form={form} initialValues={initialValues} onFinish={onSubmit}>
        <Breadcrumb
          defaultHome
          items={[
            { title: 'Omni-Channel Budget Allocation', href: '/oba/plans' },
            ...(isDetailsView ? [{ title: 'OBA Details', href: basePlanPath }] : []),
            { title: planId ? 'OBA Settings' : 'New OBA Plan' },
          ]}
        />

        <Container.Header>
          <Text.H3>{planId ? planSettings?.name : 'New OBA Plan'}</Text.H3>
        </Container.Header>

        <Stepper
          current={0}
          items={[
            { title: 'Plan Settings', status: planId ? 'finish' : 'process' },
            {
              title: 'Budget Distribution',
              status: planSettings?.groups.length ? 'finish' : 'wait',
              ...(planId && { onClick: () => navigate(`${basePlanPath}/budget-distribution`) }),
            },
            {
              title: 'Campaign Allocation',
              status: planSettings?.groups?.some(group => group.bundles?.length) ? 'finish' : 'wait',
              ...(planSettings?.groups[0]?.id && { onClick: () => navigate(`${basePlanPath}/campaign-allocation`) }),
            },
          ]}
        />

        <Grid.Row>
          <Grid.Col span={6}>
            <Container.Section>
              <Text.H5>Plan Settings</Text.H5>
              <Grid.Row>
                <FormItem name='name' colSpan={8} rules={[{ required: true }]}>
                  <Input label='Plan Name' id='oba-plan_name-inp' required />
                </FormItem>
              </Grid.Row>
              <Grid.Row>
                <FormItem name='advertiserId' colSpan={4} rules={[{ required: true }]}>
                  <Select<string>
                    label='Advertiser'
                    id='oba-advertiser_name-sel'
                    required
                    disabled={!!planId}
                    options={advertiserNameOptions}
                    loading={advertiserNamesLoading}
                  />
                </FormItem>
                <FormItem name='currency' colSpan={4} rules={[{ required: true }]}>
                  <Select<string>
                    label='Currency'
                    id='oba-currency-sel'
                    required
                    disabled={!!planId}
                    loading={currenciesLoading}
                    options={currencyOptions}
                  />
                </FormItem>
              </Grid.Row>
              {/* Margin and Management Fee are hidden (not removed): still registered in the form so
                  existing values keep being submitted. The `required` rule is dropped so a new plan
                  can be saved without a field the user can't see. */}
              <div style={{ display: 'none' }} aria-hidden>
                <Grid.Row>
                  <FormItem name='marginPercent' colSpan={4} rules={[{ validator: validateMarginValue }]}>
                    <InputNumber
                      label='Margin'
                      id='oba-margin-inp'
                      min={0}
                      max={100}
                      step={0.5}
                      formatter={value => Number(value)?.toFixed(1)}
                      affixAfter='%'
                    />
                  </FormItem>
                  <FormItem name='managementFeePercent' colSpan={4}>
                    <InputNumber
                      label='Management Fee'
                      id='oba-management_fee-inp'
                      min={0}
                      max={100}
                      formatter={value => Number(value)?.toFixed(1)}
                      affixAfter='%'
                    />
                  </FormItem>
                </Grid.Row>
              </div>
              <Grid.Row>
                <FormItem
                  name={['totalBudget']}
                  colSpan={4}
                  rules={[{ required: true, validator: validateTotalBudget }]}
                >
                  <InputNumber
                    label='Total Budget'
                    id='oba-total_budget-inp'
                    required
                    disabled={!!planId && planSettings?.status === AdvertiserPlanStatusEnum.Completed}
                    affixAfter={currency || '-'}
                  />
                </FormItem>
                <FormItem name={['period', 'startDate']} colSpan={4} rules={[{ required: true }]}>
                  <DatePicker
                    label='Start Date'
                    id='oba-start_date-sel'
                    required
                    disabled={!!planId && isCampaignStarted}
                    minDate={
                      endDate ? dayjs(endDate).subtract(3, 'years') : dayjs().add(1, 'month').subtract(3, 'years')
                    }
                    maxDate={endDate ? dayjs(endDate) : undefined}
                  />
                </FormItem>
                <FormItem name={['period', 'endDate']} colSpan={4} rules={[{ required: true }]}>
                  <DatePicker
                    label='End Date'
                    id='oba-end_date-sel'
                    required
                    disabled={!!planId && planSettings?.status === AdvertiserPlanStatusEnum.Completed}
                    minDate={startDate ? dayjs(startDate).add(1, 'month') : dayjs()}
                    maxDate={startDate ? dayjs(startDate).add(3, 'years') : undefined}
                  />
                </FormItem>
              </Grid.Row>
            </Container.Section>
          </Grid.Col>

          <Grid.Col span={6}>
            <BudgetTracker
              allocatedBudget={allocatedBudget}
              spentBudget={spentBudget}
              unspentBudget={unspentBudget}
              totalBudget={totalBudget ?? 0}
              currency={currency ?? ''}
              startDate={startDate}
              endDate={endDate}
            />
          </Grid.Col>
        </Grid.Row>

        <StickyFooter>
          <Styled.StickyFooterContainer>
            <Container.Column>
              {planSettings?.status === AdvertiserPlanStatusEnum.Scheduled && (
                <Button
                  color='danger'
                  variant='outlined'
                  id='oba-delete_plan-btn'
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  Delete Plan
                </Button>
              )}
            </Container.Column>
            <Container.Row>
              <Button href='/oba/plans' variant='outlined' id='oba-plan_cancel-btn'>
                Cancel
              </Button>
              <Button htmlType='submit' id='oba-plan_submit-btn' loading={updatedAdvPlanLoading}>
                Save & Continue
              </Button>
            </Container.Row>
          </Styled.StickyFooterContainer>
        </StickyFooter>
      </Form>

      <Modal
        idPrefix='oba-bud_warn-modal'
        title={
          <Styled.WarningModalHeader>
            <Icon name='exclamationTriangle' color={colors.pumpkin_60} width={32} height={28} />
            <span>Allotted budget exceeds total budget</span>
          </Styled.WarningModalHeader>
        }
        open={isBudgetModalOpen}
        okText='Continue'
        onOk={form.submit}
        onCancel={() => setIsBudgetModalOpen(false)}
      >
        <Text.Body>The current modification to the Total budget makes the OBA invalid.</Text.Body>
        <Text.Body>
          If you proceed with the changes, the OBA plan will be paused until the allotted budget is equal to or under
          the total budget. This can be done in the Budget distribution step.
        </Text.Body>
      </Modal>

      <Modal
        idPrefix='oba-delete_plan-modal'
        title={
          <Styled.WarningModalHeader>
            <Icon name='exclamationTriangle' color={colors.pumpkin_60} width={32} height={28} />
            <span>Delete OBA Plan</span>
          </Styled.WarningModalHeader>
        }
        confirmLoading={deletedAdvPlanLoading}
        open={isDeleteModalOpen}
        okText='Delete'
        onOk={onDeletePlan}
        onCancel={() => setIsDeleteModalOpen(false)}
      >
        <Text.Body>
          Are you sure you want to delete the {planSettings?.name} OBA plan for Advertiser{' '}
          {planSettings?.advertiser?.name}? This action cannot be undone.
        </Text.Body>
        <Text.Body>Would you like to proceed with the Delete?</Text.Body>
      </Modal>
    </>
  )
}

export default PlanSettings
