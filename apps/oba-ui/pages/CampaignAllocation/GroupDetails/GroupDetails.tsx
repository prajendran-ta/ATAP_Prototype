import React, { FC, useEffect } from 'react'
import { RuleObject } from 'antd/es/form'
import {
  Button,
  colors,
  Container,
  Drawer,
  DropdownMenu,
  Form,
  Grid,
  Icon,
  Input,
  InputNumber,
  Select,
  Spinner,
  Text,
  StickyFooter,
  useNotification,
} from '@amadeus/react-design-factory'
//Queries
import { useCampaignNamesOptions } from '@mediahub/oba-ui/pages/ObaDetails/ObaDetails.helpers'
import { useGroupPlanMutate, useGroupPlanQuery } from './GroupPlan.queries'
//Helpers
import { useATAPLinks } from '@mediahub/mediahub-ui/api'
import {
  channelOptions,
  channelTacticMapping,
  kpiOptions,
  tacticOptions,
} from '@mediahub/oba-ui/pages/CampaignAllocation/GroupDetails/GroupDetails.helpers'
import { KpiEnum } from '@mediahub/oba-ui/graphql/generated/oba-enums'
//Types
import type { GroupDetailsType } from './GroupDetails.d'
//Styles
import * as Styled from './GroupDetails.styled'

const GroupDetails: FC<GroupDetailsType> = ({ groupId, drawerIsOpen, onCloseDrawer }) => {
  const ATAPLinks = useATAPLinks()
  const { groupPlan, groupPlanLoading } = useGroupPlanQuery({ id: Number(groupId) })
  const { updateGroupPlan, updateGroupPlanData, updateGroupPlanLoading, updateGroupPlanError } = useGroupPlanMutate()

  const { campaignNamesOptions, campaignNamesLoading, refetchCampaignNames } = useCampaignNamesOptions({
    advertiserPlanId: groupPlan?.advertiserPlanId,
  })

  const notification = useNotification()

  const [form] = Form.useForm<ObaQL.GroupPlanInput>()
  const bundles = Form.useWatch(['bundles'], form)
  const kpi = Form.useWatch(['kpi'], form)

  useEffect(() => {
    if (groupPlan?.advertiserPlanId) {
      refetchCampaignNames({ filter: { advertiserPlanId: groupPlan.advertiserPlanId } })
    }
  }, [groupId, groupPlan?.advertiserPlanId, refetchCampaignNames])

  useEffect(() => {
    if (!groupPlan) return

    const initialValues =
      groupPlan.bundles.length > 0
        ? {
            ...groupPlan,
            bundles: groupPlan.bundles.map(({ platform, ...bundle }) => ({
              ...bundle,
              channel: bundle.channel,
              lowerBoundPercent: bundle.lowerBoundPercent ?? undefined,
              upperBoundPercent: bundle.upperBoundPercent ?? undefined,
              id: bundle.id,
              version: bundle.version,
            })),
          }
        : {
            ...groupPlan,
            bundles: [
              {
                vendorCampaignIds: [],
                lowerBoundPercent: undefined,
                upperBoundPercent: undefined,
              },
            ],
          }

    form.setFieldsValue(initialValues)
  }, [groupPlan, form])

  const getTacticOptionsForChannel = (channelValue?: ObaQL.ChannelEnum) => {
    const tactics = channelValue ? channelTacticMapping[channelValue] : []
    return tactics ? tacticOptions.filter(option => tactics.includes(option.value)) : []
  }

  const onDeleteCategory = (categoryIndex: number) => {
    const currentGroups: ObaQL.BundlePlan[] = form.getFieldsValue(true).bundles
    const updatedCategories = currentGroups.filter((_, index) => index !== categoryIndex)
    form.setFieldValue('bundles', updatedCategories)
  }

  const handleCloseDrawer = () => {
    form.resetFields()
    onCloseDrawer()
  }

  const onSubmit = (values: ObaQL.GroupPlanInput, deletedRows?: number[]) => {
    const updatedMutationValues = {
      ...values,
      id: groupPlan?.id,
      version: groupPlan?.version,
      specs: kpi === KpiEnum.Roas ? values.specs : null,
      bundles: values.bundles
        ?.map(bundle => ({
          ...bundle,
          lowerBoundPercent: Number(bundle.lowerBoundPercent),
          upperBoundPercent: Number(bundle.upperBoundPercent),
        }))
        .filter((_, idx) => !deletedRows?.includes(idx)),
    }

    updateGroupPlan({
      variables: {
        input: updatedMutationValues,
      },
    }).catch(e => {})
  }

  useEffect(() => {
    if (updateGroupPlanData) {
      notification.success('Group Plan has been saved successfully')
      handleCloseDrawer()
    }
  }, [updateGroupPlanData])

  useEffect(() => {
    if (updateGroupPlanError) {
      notification.error('Saving Group Plan has been Failed!', { description: updateGroupPlanError?.message })
    }
  }, [updateGroupPlanError])

  const addNewCategory = () => {
    if (!bundles) return

    const newCategory: Partial<ObaQL.BundlePlanInput> = {
      channel: undefined,
      tactic: undefined,
      vendorCampaignIds: [],
      lowerBoundPercent: undefined,
      upperBoundPercent: undefined,
    }

    form.setFieldValue('bundles', [...bundles, newCategory])
  }

  // Trigger the validation of both Lower & Upper Bound
  const onBoundChange = (rowIndex: number) => {
    form.validateFields([
      ['bundles', rowIndex, 'lowerBoundPercent'],
      ['bundles', rowIndex, 'upperBoundPercent'],
    ])
  }

  // Lower/Upper Bound Validator
  const validateBounds = (rowIndex: number) => () => {
    const lower = form.getFieldValue(['bundles', rowIndex, 'lowerBoundPercent'])
    const upper = form.getFieldValue(['bundles', rowIndex, 'upperBoundPercent'])

    if (typeof lower === 'number' && typeof upper === 'number') {
      if (lower > upper) {
        return Promise.reject(new Error('Lower Bound must be less than or equal to Upper Bound'))
      }
    }
    return Promise.resolve()
  }

  // Channel Bound Validator
  const validateChannelBounds = (min: number, max: number) => (_: RuleObject, value: number | string) => {
    if (value === undefined || value === null || value === '') {
      return Promise.reject(new Error('Please enter a value'))
    } else if (typeof value !== 'number') {
      return Promise.reject(new Error('Value must be a number'))
    } else if (value < min) {
      return Promise.reject(new Error(`Value must be higher than ${min}`))
    } else if (value > max) {
      return Promise.reject(new Error(`Value must be between ${min} and ${max}`))
    }
    return Promise.resolve()
  }

  const validateSumOfBounds = () => {
    const formFields = [
      { name: ['paidSearchChannel', 'lowerBoundPercent'], min: 30, max: 100 },
      { name: ['displayChannel', 'lowerBoundPercent'], min: 10, max: 100 },
      { name: ['facebookChannel', 'lowerBoundPercent'], min: 10, max: 100 },
      { name: ['youtubeChannel', 'lowerBoundPercent'], min: 5, max: 100 },
    ]

    const values = formFields.map(({ name }) =>
      Number(
        form.getFieldValue(name as ['paidSearchChannel' | 'displayChannel' | 'facebookChannel' | 'youtubeChannel']),
      ),
    )

    const allValid = formFields.every(({ min, max }, idx) => {
      const value = values[idx]
      return value >= min && value <= max && !isNaN(value)
    })

    if (allValid) {
      const sum = values.reduce((a, b) => a + b, 0)
      if (sum > 100) {
        return Promise.reject(new Error('Sum off all lower bounds should be less than or equal to 100%'))
      }
    }
    return Promise.resolve()
  }

  const isLoading = groupPlanLoading || campaignNamesLoading || updateGroupPlanLoading

  return (
    <Drawer
      title={!isLoading && `Campaign Allocation - ${groupPlan?.name}`}
      placement='right'
      width='80vw'
      onClose={onCloseDrawer}
      open={drawerIsOpen}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <Form onFinish={onSubmit} form={form}>
          <Container.Section>
            <Grid.Row>
              <Grid.Col span={12}>
                <Text.H5>General Settings</Text.H5>
              </Grid.Col>
            </Grid.Row>
            <Grid.Row>
              <Form.Item name='name' colSpan={4} rules={[{ required: true, message: 'Please enter the Plan Name' }]}>
                <Input label='Plan Name' id='oba-group_plan_name-inp' />
              </Form.Item>
            </Grid.Row>
            <Grid.Row>
              <Form.Item name='kpi' colSpan={2} rules={[{ required: true, message: 'Please select a value' }]}>
                <Select label='KPI' id='oba-group_plan_kpi-sel' options={kpiOptions} value={groupPlan?.kpi} />
              </Form.Item>
              {kpi === KpiEnum.Roas && (
                <Form.Item
                  name='specs'
                  colSpan={2}
                  rules={[
                    { required: true, message: 'Please enter the KPI value' },
                    { pattern: /^[1-9]\d*$/, message: 'Value must be a positive integer' },
                  ]}
                >
                  <Input label='KPI Value' id='oba-group_plan_kpi-inp' />
                </Form.Item>
              )}
            </Grid.Row>
          </Container.Section>

          <Container.Section>
            <Grid.Row>
              <Grid.Col span={12}>
                <Text.H5>Channel Level Bounds</Text.H5>
              </Grid.Col>
            </Grid.Row>

            <Grid.Row>
              <Styled.Grid span={2}>Lower Bound (%)</Styled.Grid>
              <Form.Item
                rules={[{ validator: validateChannelBounds(30, 100) }]}
                colSpan={2}
                name={['paidSearchChannel', 'lowerBoundPercent']}
              >
                <InputNumber
                  label='Paid Search *'
                  placeholder='Please enter a value between 30 and 100'
                  id='oba-group_plan_paid_search_lower_bound-inp'
                  onBlur={() => {
                    form.validateFields(['paidSearchChannel', 'lowerBoundPercent'])
                  }}
                />
              </Form.Item>
              <Form.Item
                rules={[{ validator: validateChannelBounds(10, 100) }]}
                colSpan={2}
                name={['displayChannel', 'lowerBoundPercent']}
              >
                <InputNumber
                  placeholder='Please enter a value between 10 and 100'
                  label='Display *'
                  id='oba-group_plan_display_lower_bound-inp'
                />
              </Form.Item>
              <Form.Item
                rules={[{ validator: validateChannelBounds(10, 100) }]}
                colSpan={2}
                name={['facebookChannel', 'lowerBoundPercent']}
              >
                <InputNumber
                  label='Facebook *'
                  placeholder='Please enter a value between 10 and 100'
                  id='oba-group_plan_facebook_lower_bound-inp'
                />
              </Form.Item>
              <Form.Item
                rules={[{ validator: validateChannelBounds(5, 100) }]}
                colSpan={2}
                name={['youtubeChannel', 'lowerBoundPercent']}
              >
                <InputNumber
                  placeholder='Please enter a value between 5 and 100'
                  label='Youtube *'
                  id='oba-group_plan_youtube_lower_bound-inp'
                />
              </Form.Item>
            </Grid.Row>
            <Grid.Row>
              <Form.Item
                dependencies={['paidSearchChannel', 'displayChannel', 'facebookChannel', 'youtubeChannel']}
                validateTrigger={['onChange', 'onBlur']}
                name='channelBoundsSumValidation'
                rules={[
                  {
                    validator: () => validateSumOfBounds(),
                  },
                ]}
              >
                <input type='hidden' />
              </Form.Item>
            </Grid.Row>
          </Container.Section>

          <Container.Section>
            <Grid.Row gutter={10}>
              <Grid.Col span={11}>
                <Text.H5>Campaign Allocation</Text.H5>
              </Grid.Col>
              <Grid.Col span={1} dir='rtl'>
                <Button id='oba-group_plans_add_category-btn' onClick={addNewCategory} variant='outlined'>
                  Add Category
                </Button>
              </Grid.Col>
            </Grid.Row>

            <Grid.Row>
              <Grid.Col span={1.5}>
                <Text.Helper>Channel *</Text.Helper>
              </Grid.Col>
              <Grid.Col span={1.5}>
                <Text.Helper>Tactic *</Text.Helper>
              </Grid.Col>
              <Grid.Col span={6.5}>
                <Text.Helper>Campaign *</Text.Helper>
              </Grid.Col>
              <Grid.Col span={1}>
                <Text.Helper>Lower Bound (%) </Text.Helper>
              </Grid.Col>
              <Grid.Col span={1}>
                <Text.Helper>Upper Bound (%) </Text.Helper>
              </Grid.Col>
              <Grid.Col span={0.5} />
            </Grid.Row>
            <Form.List name='bundles'>
              {fields => (
                <>
                  {fields.map((_, fieldIndex) => {
                    const channelValue = bundles?.[fieldIndex]?.channel
                    const filteredTacticOptions = getTacticOptionsForChannel(channelValue)
                    return (
                      <Grid.Row key={fieldIndex}>
                        <Form.Item
                          colSpan={1.5}
                          name={[fieldIndex, 'channel']}
                          rules={[{ required: true, message: 'Please select a value' }]}
                        >
                          <Select id='oba-group_plan_channel-sel' options={channelOptions} />
                        </Form.Item>
                        <Form.Item
                          colSpan={1.5}
                          name={[fieldIndex, 'tactic']}
                          rules={[{ required: true, message: 'Please select a value' }]}
                        >
                          <Select
                            options={filteredTacticOptions}
                            id='oba-group_tactic-sel'
                            notFoundContent={<Text.Placeholder>Please select a channel first.</Text.Placeholder>}
                          />
                        </Form.Item>
                        <Form.Item
                          colSpan={6.5}
                          name={[fieldIndex, 'vendorCampaignIds']}
                          rules={[{ required: true, message: 'Please select a value' }]}
                        >
                          <Select mode='tags' id='oba-group_campaigns-sel' withBadges options={campaignNamesOptions} />
                        </Form.Item>
                        <Form.Item
                          colSpan={1}
                          name={[fieldIndex, 'lowerBoundPercent']}
                          rules={[{ validator: validateBounds(fieldIndex) }]}
                        >
                          <InputNumber
                            id='oba-group_plan_lower_bound-inp'
                            placeholder='0'
                            min={0}
                            max={100}
                            onChange={() => onBoundChange(fieldIndex)}
                          />
                        </Form.Item>
                        <Form.Item
                          colSpan={1}
                          name={[fieldIndex, 'upperBoundPercent']}
                          rules={[{ validator: validateBounds(fieldIndex) }]}
                        >
                          <InputNumber
                            id='oba-group_plan_upper_bound-inp'
                            placeholder='100'
                            min={0}
                            max={100}
                            onChange={() => onBoundChange(fieldIndex)}
                          />
                        </Form.Item>
                        {fieldIndex !== 0 && (
                          <Grid.Col span={0.5}>
                            <DropdownMenu
                              menuType='kebab'
                              items={[{ key: 'delete', label: 'Delete', onClick: () => onDeleteCategory(fieldIndex) }]}
                            />
                          </Grid.Col>
                        )}
                      </Grid.Row>
                    )
                  })}
                </>
              )}
            </Form.List>
            <Grid.Row>
              <Grid.Col span={12}>
                <Text.Body>
                  Please be aware that the campaigns will only be listed if the external Advertiser mapping is present
                  in CMT.
                  <Styled.LinkContainer>
                    <Styled.Link
                      target='_blank'
                      href={`${ATAPLinks?.campaignManagement?.cmt}/site/advertiser/advertisers/${groupPlan?.advertiserPlan.advertiser.id}/external-advertisers`}
                    >
                      External Advertiser Mapping
                    </Styled.Link>
                    <Icon name='externalLink' width={13} height={13} color={colors.sky_60} />
                  </Styled.LinkContainer>
                </Text.Body>
              </Grid.Col>
            </Grid.Row>
          </Container.Section>
          <Grid.Row>
            <Grid.Col span={12}>
              <StickyFooter left={'20vw'} marginBottom={0}>
                <Button onClick={handleCloseDrawer} htmlType='button' id='oba-group_plan_cancel-btn' variant='outlined'>
                  Close
                </Button>
                <Button htmlType='submit' id='oba-group_plan_submit-btn'>
                  Save
                </Button>
              </StickyFooter>
            </Grid.Col>
          </Grid.Row>
        </Form>
      )}
    </Drawer>
  )
}
export default GroupDetails
