import React from 'react'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)
import {
  Button,
  Breadcrumb,
  Container,
  DatePicker,
  Grid,
  Form,
  Input,
  InputNumber,
  Select,
  Spinner,
  Stepper,
  StickyFooter,
  Text,
} from '@amadeus/react-design-factory'
import { useNotification } from '@amadeus/react-design-factory/utils/notification'
import { MediaplannerWrapper, SaveVersionInline } from '../Mediaplanner/Mediaplanner.styled'
import { StatusSelectWrapper } from './MediaplannerGeneralSettings.styled'
import { useAuth } from '@mediahub/mediahub-ui/context/AuthContext'
import {
  useGetAdvertiserOptionsQuery,
  useGetAdvertiserByIdQuery,
} from '@mediahub/advertisers-ui/pages/Advertisers/Advertisers.queries'
import { useServerOptions } from '@amadeus/react-utils/utils'
import { buildServerOptionsQueryFn } from '@amadeus/react-utils'
import { formatNumber, parseNumber } from '../utils/number'
import { AdvertiserTypesEnum, AdvertiserStatusEnum } from '@mediahub/advertisers-ui/graphql/generated/advertiser-enums'
import { useNavigate, useParams, useLocation } from 'react-router'
import {
  mediaplannerStatusConfig,
  mediaplannerPlanTypeConfig,
  generateOptions,
  mediaplannerRegionConfig,
  mediaplannerBreakdownConfig,
  resolveHeaderStatus,
  closedWonPlanOptions,
} from '../Mediaplanner/mediaplanUtils'
import { PlanTitleHeader } from '../Mediaplanner/PlanTitleHeader'
import { PlanVersionsDrawer } from '../Mediaplanner/PlanVersionsDrawer'
import { usePlanVersions, savePlanVersion, type PlanVersionSnapshot } from '../Mediaplanner/planVersionStore'
import {
  useCreateMediaPlanGsMutation,
  useUpdateMediaPlanGsMutation,
  useGetMediaPlanGsQuery,
} from './MediaplannerGeneralSettings.queries'
import { useGetLastDistributionLazyQuery } from '../Mediaplanner/Mediaplanner.queries'
import { StatusEnum } from '@mediahub/mediaplanner-ui/graphql/generated/mediaplanner-enums'
import { useGetCurrenciesQuery } from '@mediahub/mediahub-ui/shared/shared.queries'
import {
  advertiserRules,
  regionRules,
  salesforceIdRules,
  proposalIdRules,
  currencyRules,
  breakdownRules,
  planTypeRules,
  contractBudgetTargetRules,
  contractProfitTargetRules,
  startDateRules,
  endDateRules,
  planNameRules,
  statusRules,
} from '../helpers'

const PLAN_TYPE_RENEWAL = 'RENEWAL'
const DUPLICATE_PLAN_ERROR_FRAGMENT = 'a plan with this name already exists for the same opportunity and proposal'

const getFriendlyBackendErrorMessage = (errorMessage: string) => {
  if (errorMessage.toLowerCase().includes(DUPLICATE_PLAN_ERROR_FRAGMENT)) {
    return 'A media plan already exists with this exact combination: Plan Name + Salesforce Opportunity ID + Proposal ID. To continue, change at least one of those three values.'
  }
  return ''
}

const extractMutationErrorMessage = (error: unknown) => {
  const typedError = error as {
    message?: string
    graphQLErrors?: Array<{ message?: string }>
    networkError?: { result?: { errors?: Array<{ message?: string }> } }
  }

  const graphQlMessage = typedError?.graphQLErrors?.[0]?.message
  const networkMessage = typedError?.networkError?.result?.errors?.[0]?.message
  return graphQlMessage || networkMessage || typedError?.message || ''
}

interface MediaplannerGeneralSettingsProps {}

function MediaplannerGeneralSettings(_: MediaplannerGeneralSettingsProps) {
  const { user, isAdmin, isStandard } = useAuth()
  const userId = user?.id as number
  if (!userId) return <Spinner />
  const isReadOnly = !(isAdmin || isStandard)

  const planTypeOptions = generateOptions(mediaplannerPlanTypeConfig, true).filter(opt => opt.value !== 'NEW')
  const planStatusOptions = generateOptions(mediaplannerStatusConfig, true)
  const planRegionOptions = generateOptions(mediaplannerRegionConfig, true)
  const planBreakdownOptions = generateOptions(mediaplannerBreakdownConfig, true).filter(
    opt => opt.value !== 'MULTI_PROPERTY',
  )

  const { data: currencyData, loading: currencyLoading } = useGetCurrenciesQuery()
  const currencyOptions = (currencyData?.currencies ?? []).map(({ code, name }) => ({
    value: code,
    label: `${name} (${code})`,
  }))

  const [form] = Form.useForm()
  const planType = Form.useWatch('planType', form)
  const startDate = Form.useWatch('startDate', form)
  const endDate = Form.useWatch('endDate', form)
  const status = Form.useWatch('status', form)
  const selectedCurrency = Form.useWatch('currency', form)

  const { planId } = useParams<{ planId: string }>() as {
    planId: string
  }

  // --- Plan versioning (prototype) -------------------------------------------------------------
  const [isVersionsOpen, setIsVersionsOpen] = React.useState(false)
  const [isSavingVersion, setIsSavingVersion] = React.useState(false)
  const [versionName, setVersionName] = React.useState('')
  const { versions } = usePlanVersions(planId)

  // This step contributes its General Settings slice to the version snapshot. (In-memory snapshot,
  // so dayjs date values are kept as-is — no JSON serialisation.)
  const captureSnapshot = React.useCallback((): PlanVersionSnapshot => {
    const existing = planId ? { planId } : {}
    return { ...existing, generalSettings: form.getFieldsValue(true) }
  }, [form, planId])

  // Restore the General Settings slice from a viewed version into the form.
  const handleViewVersion = React.useCallback(
    (snapshot: PlanVersionSnapshot) => {
      const gs = snapshot.generalSettings as Record<string, unknown> | undefined
      if (gs) form.setFieldsValue(gs)
    },
    [form],
  )

  const confirmSaveAsVersion = () => {
    savePlanVersion(planId, versionName.trim() || 'Untitled version', captureSnapshot())
    setIsSavingVersion(false)
    setVersionName('')
  }

  const location = useLocation()
  const locationState = location.state as { isNewPlan?: boolean; amendment?: boolean; advertiserName?: string } | null
  const isNewPlan = Boolean(locationState?.isNewPlan)
  // Amendment flow (prototype): Plan Name becomes a dropdown of the advertiser's Closed Won plans.
  const isAmendment = Boolean(locationState?.amendment)
  const amendmentAdvertiserName = locationState?.advertiserName

  const isDetailsView = Boolean(planId)

  const navigate = useNavigate()

  const isRenewal = planType === PLAN_TYPE_RENEWAL

  const [selectedAdvertiserBpid, setSelectedAdvertiserBpid] = React.useState<string>('')

  const { data: gsData, loading: gsLoading } = useGetMediaPlanGsQuery(isDetailsView ? planId : undefined)

  const savedStatus = gsData?.GetMediaPlan?.generalSettings?.planInformation?.status
  const isStatusLocked =
    isDetailsView &&
    [StatusEnum.ClosedWon, StatusEnum.ClosedLost, StatusEnum.Archived].includes(savedStatus as StatusEnum)
  const isFormReadOnly = isReadOnly || isStatusLocked

  const isAdvertiserDisabled = isFormReadOnly || isDetailsView
  const isDatesDisabled = isFormReadOnly || (isDetailsView && status !== StatusEnum.Draft)
  const pageTitle = isDetailsView
    ? (gsData?.GetMediaPlan?.generalSettings?.planInformation?.planName ?? 'Edit Media Plan')
    : 'New Media Plan'

  const isBdDistributionPeriodOutOfSync = React.useMemo(() => {
    if (!isDetailsView) return false

    const bdDistribution = gsData?.GetMediaPlan?.budgetDistribution?.spendBudgetDistribution ?? []
    if (!bdDistribution.length) return false

    const parsedStart = dayjs(startDate)
    const parsedEnd = dayjs(endDate)
    if (!parsedStart.isValid() || !parsedEnd.isValid()) return false

    const from = parsedStart.startOf('month')
    const to = parsedEnd.startOf('month')
    const rangeStart = from.isBefore(to) ? from : to
    const rangeEnd = from.isBefore(to) ? to : from

    const expectedKeys = new Set<string>()
    let cursor = rangeStart
    while (cursor.isBefore(rangeEnd) || cursor.isSame(rangeEnd, 'month')) {
      expectedKeys.add(cursor.format('YYYY-MM-01'))
      cursor = cursor.add(1, 'month')
    }

    const savedKeys = new Set<string>(
      bdDistribution
        .map(item => {
          const parsed = dayjs(String(item.month ?? ''), ['DD-MMM-YYYY', 'YYYY-MM-DD'], true)
          return parsed.isValid() ? parsed.format('YYYY-MM-01') : ''
        })
        .filter(Boolean),
    )

    if (expectedKeys.size !== savedKeys.size) return true
    for (const key of expectedKeys) {
      if (!savedKeys.has(key)) return true
    }
    return false
  }, [isDetailsView, gsData?.GetMediaPlan?.budgetDistribution?.spendBudgetDistribution, startDate, endDate])

  const hasBdData = (gsData?.GetMediaPlan?.budgetDistribution?.spendBudgetDistribution ?? []).length > 0
  const canNavigateToMediaPlanStep = isDetailsView && hasBdData && !isBdDistributionPeriodOutOfSync

  const prevIsDatesDisabledRef = React.useRef<boolean>(isDatesDisabled)
  React.useEffect(() => {
    const wasDisabled = prevIsDatesDisabledRef.current
    prevIsDatesDisabledRef.current = isDatesDisabled
    if (!isDetailsView) return
    if (wasDisabled && !isDatesDisabled) {
      // Dates became editable — validate immediately to surface past-date errors
      form.validateFields(['startDate', 'endDate'])
    }
  }, [isDatesDisabled, isDetailsView, form])

  React.useEffect(() => {
    if (isDetailsView && gsData?.GetMediaPlan) {
      const { advertiserInformation, planInformation, priceSettings } = gsData.GetMediaPlan.generalSettings
      setSelectedAdvertiserBpid(advertiserInformation.advertiserBpid)

      form.setFieldsValue({
        advertiser: advertiserInformation.advertiserId,
        region: advertiserInformation.region,
        salesforceId: advertiserInformation.salesforceOpportunityId,
        proposalId: advertiserInformation.proposalId,
        currency: advertiserInformation.currency,
        breakdown: advertiserInformation.breakdown,
        planType: advertiserInformation.planType,
        contractBudgetTarget: planInformation.contractBudgetTarget,
        contractProfitTarget: planInformation.contractProfitTarget,
        startDate: dayjs(planInformation.startDate, ['DD-MMM-YYYY', 'YYYY-MM-DD']),
        endDate: dayjs(planInformation.endDate, ['DD-MMM-YYYY', 'YYYY-MM-DD']),
        planName: planInformation.planName,
        status: planInformation.status,
        managementFee:
          priceSettings.managementFeePct != null ? formatNumber(Number(priceSettings.managementFeePct)) : '',
        setupFee: Number(priceSettings.setupFee) || 0,
        metasearchSetupFee: Number(priceSettings.metasearchSetupFee) || 0,
        metasearchConnectivityFee: Number(priceSettings.metasearchConnectivityFee) || 0,
        creativeFee: Number(priceSettings.creativeFee) || 0,
        videoCreativeFee: Number(priceSettings.videoCreativeFee) || 0,
      })
    }
  }, [gsData, isDetailsView, form])

  const { refetch: refetchAdvertisers } = useGetAdvertiserOptionsQuery(isDetailsView)

  const advertiserIdFromPlan = isDetailsView
    ? Number(gsData?.GetMediaPlan?.generalSettings?.advertiserInformation?.advertiserId)
    : undefined
  const { data: advertiserByIdData, loading: advertiserByIdLoading } = useGetAdvertiserByIdQuery(
    advertiserIdFromPlan || undefined,
  )
  const advertiserByIdOption = React.useMemo(() => {
    const adv = advertiserByIdData?.advertisers?.advertisers?.[0]
    if (!adv) return undefined
    return {
      label: `${adv.advertiserName} (${String(adv.bpid).toUpperCase()})`,
      value: adv.advertiserId,
      bpid: adv.bpid,
    }
  }, [advertiserByIdData])
  const advertisersServerOptions = useServerOptions({
    queryFn: isDetailsView
      ? () => Promise.resolve([])
      : buildServerOptionsQueryFn({
          refetch: refetchAdvertisers,
          buildVars: (search, pagination) => ({
            filter: {
              advertiserTypes: AdvertiserTypesEnum.Hotel,
              status: [AdvertiserStatusEnum.Active, AdvertiserStatusEnum.Paused],
              name: (search ?? '').trim() || undefined,
              isFollowingOnly: false,
            },
          }),
          getItems: data => data?.advertisers?.advertisers ?? [],
          mapToOption: adv => {
            const a = adv as AdvertiserQL.Advertiser
            return {
              label: `${a.advertiserName} (${String(a.bpid).toUpperCase()})`,
              value: a.advertiserId,
              bpid: a.bpid,
            }
          },
        }),
  })

  const [createMediaPlanGs] = useCreateMediaPlanGsMutation()
  const [updateMediaPlanGs] = useUpdateMediaPlanGsMutation()
  // TODO: Implement pre-fill with last distribution data (planned for next year) --> backend query is already implemented (see useGetLastDistributionLazyQuery), frontend implementation is pending
  const [loadLastDistribution] = useGetLastDistributionLazyQuery()
  const notification = useNotification()

  const applyDuplicateCombinationValidation = (message: string) => {
    form.setFields([
      { name: 'planName', errors: [message] },
      { name: 'salesforceId', errors: [message] },
      { name: 'proposalId', errors: [message] },
    ])
  }

  const onSubmit = async (values: Record<string, string | number>) => {
    if (isFormReadOnly) {
      notification.error('You do not have permission to modify media plans.')
      return
    }

    // Guard: verify the start date is not in the past regardless of the current status.
    // This prevents bypassing the date error by switching to a non-Draft status before saving.
    const startDateVal = values.startDate as unknown as { isBefore: (d: unknown, g: string) => boolean } | null
    if (startDateVal?.isBefore(dayjs().add(1, 'day'), 'day')) {
      form.setFields([{ name: 'startDate', errors: ['Start date must be a future date starting from tomorrow.'] }])
      return
    }

    try {
      const toBackendNumber = (value: unknown): string => {
        if (value === undefined || value === null || value === '') return ''
        const num = typeof value === 'number' ? value : parseNumber(String(value))
        return Number.isFinite(num) ? String(num) : ''
      }

      const sharedVars = {
        advertiserId: String(values.advertiser),
        advertiserBpid: selectedAdvertiserBpid,
        region: values.region as MediaplannerQL.RegionEnum,
        salesforceOpportunityId: String(values.salesforceId),
        proposalId: String(values.proposalId),
        currency: String(values.currency),
        breakdown: values.breakdown as MediaplannerQL.BreakdownEnum,
        planType: values.planType as MediaplannerQL.PlanTypeEnum,
        contractBudgetTarget: values.contractBudgetTarget ? toBackendNumber(values.contractBudgetTarget) : '',
        contractProfitTarget: values.contractProfitTarget ? toBackendNumber(values.contractProfitTarget) : '',
        startDate: (values.startDate as unknown as { format: (f: string) => string }).format('DD-MMM-YYYY'),
        endDate: (values.endDate as unknown as { format: (f: string) => string }).format('DD-MMM-YYYY'),
        planName: String(values.planName),
        status: values.status as MediaplannerQL.StatusEnum,
        managementFeePct: toBackendNumber(values.managementFee),
        setupFee: toBackendNumber(values.setupFee),
        metasearchSetupFee: toBackendNumber(values.metasearchSetupFee),
        metasearchConnectivityFee: toBackendNumber(values.metasearchConnectivityFee),
        creativeFee: toBackendNumber(values.creativeFee),
        videoCreativeFee: toBackendNumber(values.videoCreativeFee),
      }

      if (!isDetailsView) {
        const { data, errors } = await createMediaPlanGs({
          // TODO: Pass actual prefillEnabled value once pre-fill is implemented (planned for next year)
          variables: { ...sharedVars, prefillEnabled: false },
        })
        const backendError = errors?.[0]?.message ?? ''
        const friendlyMessage = getFriendlyBackendErrorMessage(backendError)
        if (backendError) {
          if (friendlyMessage) {
            applyDuplicateCombinationValidation(friendlyMessage)
          }
          notification.error(friendlyMessage || 'An unexpected error occurred. Please try again.')
          return
        }

        const result = data?.createMediaPlanGs
        if (result?.success && result.mediaPlanId) {
          notification.success(result.message || 'Media plan created successfully.')
          navigate(`/mediaplanner/budget-distribution/${result.mediaPlanId}`, { state: { isNewPlan: true } })
        } else {
          notification.error(result?.message || 'An unexpected error occurred. Please try again.')
        }
      } else {
        const { data, errors } = await updateMediaPlanGs({
          // TODO: Pass actual prefillEnabled value once pre-fill is implemented (planned for next year)
          variables: { ...sharedVars, mediaPlanId: planId, prefillEnabled: false },
        })
        const backendError = errors?.[0]?.message ?? ''
        const friendlyMessage = getFriendlyBackendErrorMessage(backendError)
        if (backendError) {
          if (friendlyMessage) {
            applyDuplicateCombinationValidation(friendlyMessage)
          }
          notification.error(friendlyMessage || 'An unexpected error occurred. Please try again.')
          return
        }

        const result = data?.updateMediaPlanGs
        if (result?.success) {
          notification.success(result.message || 'Media plan updated successfully.')
          navigate(`/mediaplanner/budget-distribution/${planId}`, { state: { isNewPlan } })
        } else {
          notification.error(result?.message || 'An unexpected error occurred. Please try again.')
        }
      }
    } catch (error) {
      const backendError = extractMutationErrorMessage(error)
      const friendlyMessage = getFriendlyBackendErrorMessage(backendError)

      if (friendlyMessage) {
        applyDuplicateCombinationValidation(friendlyMessage)
        notification.error(friendlyMessage)
        return
      }

      if (backendError) console.error('[MediaplannerGeneralSettings] mutation error:', backendError)
      notification.error('An unexpected error occurred. Please try again.')
    }
  }

  if (isDetailsView && gsLoading) return <Spinner />

  return (
    <MediaplannerWrapper>
      <div id='mediaplan_general_settings-breadcrumb-nav'>
        <Breadcrumb
          defaultHome
          items={[
            { title: 'Media Plans', href: '/mediaplanner' },
            { title: isNewPlan || !isDetailsView ? 'New Media Plan' : 'Media Plan Settings' },
          ]}
        />
      </div>
      <Form
        form={form}
        onFinish={onSubmit}
        disabled={isFormReadOnly}
        noValidate
        initialValues={{
          status: StatusEnum.Draft,
          performanceReport: 'MONTHLY',
          periodicPerformanceReviewCalls: 'MONTHLY',
          firstMonthReviewCall: 'INCLUDED',
        }}
      >
        <PlanTitleHeader
          titleId='mediaplan_general_settings-ttl'
          title={pageTitle}
          status={resolveHeaderStatus(savedStatus, true)}
          versionCount={versions.length}
          onOpenVersions={() => setIsVersionsOpen(true)}
        />

        <Stepper
          id='mediaplan_general_settings-stepper'
          current={0}
          items={[
            {
              title: 'General Settings',
              status: isDetailsView ? 'finish' : 'process',
              ...(isDetailsView && {
                onClick: () => navigate(`/mediaplanner/edit/${planId}`, { state: { isNewPlan } }),
              }),
            },
            {
              title: 'Product Settings',
              status: 'wait',
              ...(isDetailsView && {
                onClick: () => navigate(`/mediaplanner/product-settings/${planId}`, { state: { isNewPlan } }),
              }),
            },
            {
              title: 'Budget Distribution',
              status: hasBdData ? 'finish' : 'wait',
              ...(isDetailsView && {
                onClick: () => navigate(`/mediaplanner/budget-distribution/${planId}`, { state: { isNewPlan } }),
              }),
            },
            {
              title: 'Media Plan',
              status: canNavigateToMediaPlanStep ? 'finish' : 'wait',
              ...(canNavigateToMediaPlanStep && {
                onClick: () => navigate(`/mediaplanner/download-summary/${planId}`, { state: { isNewPlan } }),
              }),
            },
          ]}
        />

        <Grid.Row>
          <Grid.Col span={12}>
            <Container.Section>
              <Text.H5 id='mediaplan_general_settings-advertiser_information-ttl'>Advertiser Information</Text.H5>
              <Grid.Row>
                <Form.Item colSpan={4} name='advertiser' rules={advertiserRules}>
                  <Select<string>
                    label='Advertiser (BPID)'
                    id='media_plan-advertisers-sel'
                    options={
                      isDetailsView
                        ? advertiserByIdOption
                          ? [advertiserByIdOption]
                          : []
                        : advertisersServerOptions.options
                    }
                    loading={isDetailsView ? advertiserByIdLoading : advertisersServerOptions.loading}
                    onSearch={isDetailsView ? undefined : advertisersServerOptions.onSearch}
                    onBlur={isDetailsView ? undefined : advertisersServerOptions.onBlur}
                    onPopupScroll={isDetailsView ? undefined : advertisersServerOptions.onPopupScroll}
                    filterMode='server'
                    showSearch
                    required
                    disabled={isAdvertiserDisabled}
                    onChange={val => {
                      const opt = advertisersServerOptions.options.find(o => o.value === val)
                      setSelectedAdvertiserBpid(opt?.bpid ?? '')
                    }}
                  />
                </Form.Item>
                <Form.Item colSpan={4} name='region' rules={regionRules}>
                  <Select<string>
                    label='Region'
                    id='mediaplan-region-sel'
                    options={planRegionOptions}
                    required
                    disabled={isFormReadOnly}
                  />
                </Form.Item>
              </Grid.Row>
              <Grid.Row>
                <Form.Item
                  colSpan={4}
                  name='salesforceId'
                  normalize={(value: string) => value?.slice(0, 100)}
                  rules={salesforceIdRules}
                >
                  <Input label='Salesforce Opportunity ID' id='mediaplan-salesforce_id-inp' required maxLength={100} />
                </Form.Item>
                <Form.Item
                  colSpan={4}
                  name='proposalId'
                  normalize={(value: string) => value?.slice(0, 100)}
                  rules={proposalIdRules}
                >
                  <Input label='Proposal ID' id='mediaplan-proposal_id-inp' required maxLength={100} />
                </Form.Item>
              </Grid.Row>
              <Grid.Row>
                <Form.Item colSpan={4} name='currency' rules={currencyRules}>
                  <Select<string>
                    label='Currency'
                    id='mediaplan-currency-sel'
                    options={currencyOptions}
                    loading={currencyLoading}
                    required
                    disabled={isFormReadOnly}
                  />
                </Form.Item>
                <Form.Item colSpan={4} name='breakdown' rules={breakdownRules}>
                  <Select<string>
                    label='Breakdown'
                    id='mediaplan-breakdown-sel'
                    options={planBreakdownOptions}
                    required
                    disabled={isFormReadOnly}
                  />
                </Form.Item>
              </Grid.Row>
              <Grid.Row>
                <Form.Item colSpan={4} name='planType' rules={planTypeRules}>
                  <Select<string>
                    label='Plan Type'
                    id='mediaplan-plan_type-sel'
                    options={planTypeOptions}
                    required
                    disabled={isFormReadOnly}
                  />
                </Form.Item>
              </Grid.Row>
            </Container.Section>
          </Grid.Col>
        </Grid.Row>

        <Grid.Row>
          <Grid.Col span={12}>
            <Container.Section>
              <Text.H5 id='mediaplan_general_settings-plan_information-ttl'>Plan Information</Text.H5>
              <Grid.Row>
                <Form.Item
                  colSpan={4}
                  name='contractBudgetTarget'
                  rules={contractBudgetTargetRules}
                  normalize={value => (value === '' || value == null ? 0 : value)}
                  getValueProps={value => ({ value: value === 0 ? undefined : value })}
                >
                  <InputNumber
                    label='Contract Budget Expected'
                    id='mediaplan-contract_budget_expected-inp'
                    affixAfter={selectedCurrency || 'USD'}
                    formatter={value => (value != null && value !== '' ? formatNumber(Number(value)) : '')}
                    parser={value => parseNumber(String(value ?? ''))}
                  />
                </Form.Item>
                <Form.Item
                  colSpan={4}
                  name='contractProfitTarget'
                  rules={contractProfitTargetRules}
                  normalize={value => (value === '' || value == null ? 0 : value)}
                  getValueProps={value => ({ value: value === 0 ? undefined : value })}
                >
                  <InputNumber
                    label='Contract Margin Expected (%)'
                    id='mediaplan-contract_profit_expected-inp'
                    affixAfter='%'
                    formatter={value => (value != null && value !== '' ? formatNumber(Number(value)) : '')}
                    parser={value => parseNumber(String(value ?? ''))}
                  />
                </Form.Item>
              </Grid.Row>
              <Grid.Row>
                <Form.Item colSpan={4} name='startDate' rules={startDateRules(isDatesDisabled)}>
                  <DatePicker
                    label='Start Date'
                    id='mediaplan-start_date-sel'
                    required
                    disabled={isDatesDisabled}
                    {...(!isDatesDisabled && { minDate: dayjs().add(1, 'day') })}
                  />
                </Form.Item>
                <Form.Item
                  colSpan={4}
                  name='endDate'
                  dependencies={['startDate']}
                  rules={endDateRules(isDatesDisabled, () => form.getFieldValue('startDate'))}
                >
                  <DatePicker
                    label='End Date'
                    id='mediaplan-end_date-sel'
                    required
                    disabled={isDatesDisabled}
                    {...(!isDatesDisabled && {
                      ...(startDate
                        ? { minDate: startDate.add(1, 'day') }
                        : !isDetailsView
                          ? { minDate: dayjs().add(2, 'day') }
                          : {}),
                    })}
                  />
                </Form.Item>
              </Grid.Row>
              <Grid.Row>
                {isAmendment ? (
                  // Amendment flow: pick the Closed Won plan being amended (not free text).
                  <Form.Item
                    colSpan={8}
                    name='planName'
                    rules={[{ required: true, message: 'Please select a Closed Won plan to amend' }]}
                  >
                    <Select<string>
                      label='Plan Name'
                      id='mediaplan-plan_name-sel'
                      placeholder='Select a Closed Won plan to amend'
                      required
                      disabled={isFormReadOnly}
                      options={closedWonPlanOptions(amendmentAdvertiserName)}
                    />
                  </Form.Item>
                ) : (
                  <Form.Item
                    colSpan={8}
                    name='planName'
                    normalize={(value: string) => value?.slice(0, 100)}
                    rules={planNameRules}
                  >
                    <Input label='Plan Name' id='mediaplan-plan_name-inp' required maxLength={100} />
                  </Form.Item>
                )}
                <Form.Item colSpan={4}>
                  <StatusSelectWrapper>
                    <Form.Item name='status' rules={statusRules} noStyle>
                      <Select<string>
                        label='Status'
                        id='mediaplan-status-sel'
                        options={planStatusOptions}
                        required
                        disabled={isFormReadOnly}
                      />
                    </Form.Item>
                  </StatusSelectWrapper>
                </Form.Item>
              </Grid.Row>
            </Container.Section>
          </Grid.Col>
        </Grid.Row>

        <Grid.Row>
          <Grid.Col span={12}>
            <Container.Section>
              <Text.H5 id='mediaplan_general_settings-review_settings-ttl'>Review Settings</Text.H5>
              <Grid.Row>
                <Form.Item colSpan={4} name='performanceReport'>
                  <Select<string>
                    label='Performance Report'
                    id='mediaplan-performance_report-sel'
                    options={[
                      { value: 'MONTHLY', label: 'Monthly' },
                      { value: 'WEEKLY', label: 'Weekly' },
                      { value: 'QUARTERLY', label: 'Quarterly' },
                    ]}
                    disabled={isFormReadOnly}
                  />
                </Form.Item>
                <Form.Item colSpan={4} name='periodicPerformanceReviewCalls'>
                  <Select<string>
                    label='Periodic Performance Review Calls'
                    id='mediaplan-periodic_performance_review_calls-sel'
                    options={[
                      { value: 'MONTHLY', label: 'Monthly' },
                      { value: 'WEEKLY', label: 'Weekly' },
                      { value: 'QUARTERLY', label: 'Quarterly' },
                    ]}
                    disabled={isFormReadOnly}
                  />
                </Form.Item>
                <Form.Item colSpan={4} name='firstMonthReviewCall'>
                  <Select<string>
                    label='First Month Review Call'
                    id='mediaplan-first_month_review_call-sel'
                    options={[
                      { value: 'INCLUDED', label: 'Included' },
                      { value: 'CHARGEABLE', label: 'Chargeable' },
                    ]}
                    disabled={isFormReadOnly}
                  />
                </Form.Item>
              </Grid.Row>
            </Container.Section>
          </Grid.Col>
        </Grid.Row>

        <StickyFooter>
          <Button
            href='/mediaplanner'
            variant='outlined'
            color='primary'
            id='mediaplan-cancel-btn'
            disabled={isSavingVersion}
          >
            Cancel
          </Button>
          {!isFormReadOnly &&
            (isSavingVersion ? (
              <SaveVersionInline>
                <Input
                  id='mediaplan-save_version_name-inp'
                  placeholder='Version name'
                  value={versionName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVersionName(e.target.value)}
                />
                <Button
                  id='mediaplan-save_version_confirm-btn'
                  variant='solid'
                  color='primary'
                  onClick={confirmSaveAsVersion}
                >
                  Save
                </Button>
                <Button
                  id='mediaplan-save_version_cancel-btn'
                  variant='outlined'
                  color='primary'
                  aria-label='Cancel saving version'
                  onClick={() => setIsSavingVersion(false)}
                >
                  ×
                </Button>
              </SaveVersionInline>
            ) : (
              <Button
                id='mediaplan-save_as_version-btn'
                variant='outlined'
                color='primary'
                onClick={() => {
                  setVersionName('')
                  setIsSavingVersion(true)
                }}
              >
                Save as Version
              </Button>
            ))}
          {!isFormReadOnly && (
            <Button htmlType='submit' id='mediaplan_submit-btn' disabled={isSavingVersion}>
              Save & Continue
            </Button>
          )}
        </StickyFooter>
      </Form>

      <PlanVersionsDrawer
        planId={planId}
        isOpen={isVersionsOpen}
        onClose={() => setIsVersionsOpen(false)}
        captureSnapshot={captureSnapshot}
        onView={handleViewVersion}
      />
    </MediaplannerWrapper>
  )
}

export default MediaplannerGeneralSettings
