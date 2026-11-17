import { useState, type ReactNode } from 'react'
import { useNavigate, useParams } from 'react-router'
import TreeSelect from 'antd/es/tree-select'
import {
  Breadcrumb,
  Button,
  colors,
  Container,
  DropdownMenu,
  Form,
  Grid,
  Icon,
  IconButton,
  Input,
  InputNumber,
  Modal,
  Select,
  StickyFooter,
  Table,
  Tag,
  Text,
  useNotification,
} from '@amadeus/react-design-factory'
import {
  AudienceBuilderDetailsWrapper,
  CardHeaderRow,
  CriteriaAndDivider,
  CriteriaMainRow,
  CriteriaRemoveBtnWrap,
  CriteriaRow,
  CriteriaTypeWrap,
  CriteriaValueWrap,
  PlaceSelectionChevron,
  PlaceSelectionCount,
  PlaceSelectionList,
  PlaceSelectionPath,
  PlaceSelectionRow,
  RuleSummaryCard,
  RuleSummaryChips,
  RuleSummaryEmpty,
  RuleSummaryItem,
  RuleSummaryList,
  StickyFooterContainer,
  RuleFooterActions,
  RuleFooterButtons,
} from './AudienceBuilder.styled'
import { getMockRule, TRAVEL_INTENT_CATEGORY_OPTIONS } from './mockAudienceRules'
import { getSharedAudiences } from '../../shared/audienceStore'
import { getSharedRules, setSharedRules } from '../../shared/audienceRuleStore'
import { MOCK_AUDIENCES } from '../Audience/mockAudiences'
import {
  CRITERIA_TYPE_OPTIONS,
  ENGAGEMENT_ACTIVITY_OPTIONS,
  NUMBER_CRITERIA_TYPES,
  NUMBER_OPERATOR_OPTIONS,
  PLACE_CRITERIA_TYPES,
  PLACE_TREE_OPTIONS_WITH_IATA,
  buildPlaceSelectionTree,
  createEmptyCriteriaRow,
  getCriteriaTypeLabel,
  getPlaceMockCount,
  getPlacePath,
  summarizeCriteriaRow,
  type CriteriaRow as CriteriaRowModel,
  type CriteriaType,
  type PlaceSelectionNode,
} from './ruleCriteria'

// A summary row shows at most this many value chips before collapsing the rest into "+N more".
const MAX_SUMMARY_CHIPS = 10

/** All descendant values of a selection node, including itself — used to remove a whole branch. */
const collectPlaceSelectionValues = (node: PlaceSelectionNode): string[] => [
  node.value,
  ...node.children.flatMap(collectPlaceSelectionValues),
]

// Placeholder detail page — no rule-editing functionality is prototyped yet.
function AudienceBuilderDetailsPage() {
  const { ruleId } = useParams<{ ruleId: string }>()
  const navigate = useNavigate()
  const notification = useNotification()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const existingRule = getSharedRules().find(rule => rule.id === ruleId) ?? getMockRule(ruleId)
  const [form] = Form.useForm()
  const travelIntentCategory = Form.useWatch('travelIntentCategory', form) ?? existingRule?.travelIntentCategory ?? 'HOTEL'

  // Rows are combined with AND; the values picked within a single row are combined with OR.
  const [criteriaRows, setCriteriaRows] = useState<CriteriaRowModel[]>(() => existingRule?.criteriaRows ?? [createEmptyCriteriaRow('criteria-1')])
  // Which collapsed place-selection nodes are expanded, keyed by `${criteriaRowId}::${value}`
  // and shared between the Query Rules editor and the Rule Summary sidebar.
  const [expandedInputPlaceKeys, setExpandedInputPlaceKeys] = useState<Set<string>>(new Set())
  const [expandedSummaryPlaceKeys, setExpandedSummaryPlaceKeys] = useState<Set<string>>(new Set())

  const togglePlaceExpanded = (key: string, readOnly: boolean) => {
    const setExpandedKeys = readOnly ? setExpandedSummaryPlaceKeys : setExpandedInputPlaceKeys
    setExpandedKeys(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const updateCriteriaRow = (id: string, patch: Partial<CriteriaRowModel>) => {
    setCriteriaRows(prev => prev.map(row => (row.id === id ? { ...row, ...patch } : row)))
  }

  const addCriteriaRow = () => {
    setCriteriaRows(prev => {
      const usedTypes = new Set(prev.map(row => row.type))
      const nextType = CRITERIA_TYPE_OPTIONS.find(o => !usedTypes.has(o.value))?.value
      if (!nextType) return prev
      return [{ ...createEmptyCriteriaRow(`criteria-${Date.now()}`), type: nextType }, ...prev]
    })
  }

  const removeCriteriaRow = (id: string) => {
    setCriteriaRows(prev => (prev.length > 1 ? prev.filter(row => row.id !== id) : prev))
  }

  const handleTypeChange = (id: string, type: CriteriaType) => {
    updateCriteriaRow(id, { type, values: [], operator: undefined, numberValue: undefined })
  }

  // Each rule type can only be used once across all rows — hide it from other rows entirely.
  const criteriaTypeOptions = (rowId: string) => {
    const usedTypes = new Set(criteriaRows.filter(row => row.id !== rowId).map(row => row.type))
    return CRITERIA_TYPE_OPTIONS
      .filter(o => !usedTypes.has(o.value))
      .map(option => ({ ...option, label: getCriteriaTypeLabel(option.value, travelIntentCategory) }))
  }
  const allCriteriaTypesUsed = criteriaRows.length >= CRITERIA_TYPE_OPTIONS.length

  // Renders a top-level place row plus, when expanded, its auto-selected descendants (indented).
  const renderPlaceSelectionNode = (node: PlaceSelectionNode, rowId: string, idPrefix: string, depth: number, readOnly = false): ReactNode => {
    const key = `${rowId}::${node.value}`
    const isExpanded = (readOnly ? expandedSummaryPlaceKeys : expandedInputPlaceKeys).has(key)
    const hasChildren = node.children.length > 0
    // Top-level rows show the full breadcrumb path; nested rows just show their own name.
    const label = depth === 0 ? getPlacePath(node.value).join(' > ') : node.title

    return (
      <div key={node.value}>
        <PlaceSelectionRow depth={depth} summary={readOnly} id={`${idPrefix}-row-${node.value}`}>
          <PlaceSelectionPath>
            <PlaceSelectionChevron
              expanded={isExpanded}
              invisible={!hasChildren}
              id={`${idPrefix}-expand-${node.value}-btn`}
              onClick={() => hasChildren && togglePlaceExpanded(key, readOnly)}
            >
              <Icon name='chevronRight' width={12} height={12} />
            </PlaceSelectionChevron>
            <span>{label}</span>
            <PlaceSelectionCount>({getPlaceMockCount(node.value)})</PlaceSelectionCount>
          </PlaceSelectionPath>
          {!readOnly && <IconButton
            id={`${idPrefix}-remove-${node.value}-btn`}
            iconName='xmark'
            onClick={() => {
              const removedValues = new Set(collectPlaceSelectionValues(node))
              const row = criteriaRows.find(r => r.id === rowId)
              if (row) updateCriteriaRow(rowId, { values: row.values.filter(v => !removedValues.has(v)) })
            }}
          />}
        </PlaceSelectionRow>
        {hasChildren && isExpanded && node.children.map(child => renderPlaceSelectionNode(child, rowId, idPrefix, depth + 1, readOnly))}
      </div>
    )
  }

  const renderCriteriaValueControl = (row: CriteriaRowModel, index: number) => {
    if (PLACE_CRITERIA_TYPES.includes(row.type)) {
      const selectionTree = buildPlaceSelectionTree(row.values)
      const totalCount = selectionTree.reduce((sum, node) => sum + getPlaceMockCount(node.value), 0)
      return (
        <div>
          <TreeSelect<string[]>
            id={`audience_builder_details-criteria_value-${index}-sel`}
            treeData={PLACE_TREE_OPTIONS_WITH_IATA}
            treeCheckable
            showCheckedStrategy={TreeSelect.SHOW_ALL}
            placeholder='Select country, continent or city'
            style={{ width: '100%' }}
            value={row.values}
            onChange={values => updateCriteriaRow(row.id, { values })}
            allowClear
            // The selection is visualised as a collapsible row list below instead of the default flat tags.
            maxTagCount={0}
            maxTagPlaceholder={() => `${row.values.length} items selected`}
          />
          {selectionTree.length > 0 && (
            <>
              <PlaceSelectionList>
                {selectionTree.map(node =>
                  renderPlaceSelectionNode(node, row.id, `audience_builder_details-criteria_value-${index}`, 0),
                )}
              </PlaceSelectionList>
            </>
          )}
        </div>
      )
    }

    if (row.type === 'ENGAGEMENT_ACTIVITY') {
      return (
        <Select<string>
          id={`audience_builder_details-criteria_value-${index}-sel`}
          placeholder='Select'
          mode='multiple'
          showSearch
          withBadges
          value={row.values as unknown as string}
          onChange={values => updateCriteriaRow(row.id, { values: values as unknown as string[] })}
          options={ENGAGEMENT_ACTIVITY_OPTIONS}
          allowClear
        />
      )
    }

    if (NUMBER_CRITERIA_TYPES.includes(row.type)) {
      return (
        <CriteriaRow>
          <Select<string>
            id={`audience_builder_details-criteria_operator-${index}-sel`}
            placeholder='Operator'
            value={row.operator}
            onChange={operator => updateCriteriaRow(row.id, { operator })}
            options={NUMBER_OPERATOR_OPTIONS}
          />
          <InputNumber
            id={`audience_builder_details-criteria_number-${index}-inp`}
            placeholder='Value'
            value={row.numberValue}
            onChange={value => updateCriteriaRow(row.id, { numberValue: value == null ? undefined : Number(value) })}
          />
        </CriteriaRow>
      )
    }

    return null
  }

  const completedRows = criteriaRows
    .map((row, index) => ({ row, index, summary: summarizeCriteriaRow(row, travelIntentCategory) }))
    .filter((entry): entry is typeof entry & { summary: NonNullable<(typeof entry)['summary']> } => Boolean(entry.summary))
  const storedAudiences = getSharedAudiences()
  const dependentAudiences = (storedAudiences.length > 0 ? storedAudiences : MOCK_AUDIENCES)
    .filter(audience => audience.audienceRuleIds.includes(ruleId ?? ''))

  const saveRule = (values: { name?: string; travelIntentCategory?: string }) => {
    if (completedRows.length === 0) {
      notification.error('Add at least one complete query rule before saving.')
      return
    }
    const currentRules = getSharedRules()
    const savedRule = {
      id: ruleId && ruleId !== 'new' ? ruleId : `rule-${Date.now()}`,
      ruleName: values.name?.trim() || 'New Audience Rule',
      travelIntentCategory: values.travelIntentCategory ?? 'HOTEL',
      usedInAudiences: 0,
      criteriaRows,
    }
    const nextRules = currentRules.some(rule => rule.id === savedRule.id)
      ? currentRules.map(rule => rule.id === savedRule.id ? savedRule : rule)
      : [savedRule, ...currentRules]
    setSharedRules(nextRules)
    notification.success('Audience rule saved successfully.')
    navigate('/audience-builder')
  }

  const confirmDeleteRule = () => {
    if (dependentAudiences.length > 0) return
    const currentRules = getSharedRules()
    setSharedRules(currentRules.filter(rule => rule.id !== ruleId))
    setIsDeleteModalOpen(false)
    notification.success('Audience rule deleted successfully.')
    navigate('/audience-builder')
  }

  return (
    <AudienceBuilderDetailsWrapper>
      <div id='audience_builder_details-breadcrumb-nav'>
        <Breadcrumb
          items={[{ title: 'Home', href: '/' }, { title: 'Audience Rules', href: '/audience-builder' }, { title: 'Audience Rule Settings' }]}
        />
      </div>

      <Form
        form={form}
        initialValues={{ name: existingRule?.ruleName, travelIntentCategory: existingRule?.travelIntentCategory ?? 'HOTEL' }}
        onFinish={saveRule}
      >
        <Grid.Row align='top'>
          <Grid.Col span={9}>
            <Container.Section>
              <Text.H5>General Settings</Text.H5>
              <Grid.Row>
                <Form.Item name='name' colSpan={6} rules={[{ required: true, message: 'Please enter a Name' }]}>
                  <Input label='Name' id='audience_builder_details-name-inp' required />
                </Form.Item>
                <Form.Item
                  name='travelIntentCategory'
                  colSpan={6}
                  rules={[{ required: true, message: 'Please select a Travel Intent Segment' }]}
                >
                  <Select<string>
                    label='Travel Intent Segment'
                    id='audience_builder_details-travel_intent_segment-sel'
                    required
                    options={TRAVEL_INTENT_CATEGORY_OPTIONS}
                  />
                </Form.Item>
              </Grid.Row>
            </Container.Section>

            <Container.Section>
              <CardHeaderRow>
                <Text.H5>Query Rules</Text.H5>
                <Button
                  id='audience_builder_details-add_criteria-btn'
                  variant='outlined'
                  onClick={addCriteriaRow}
                  disabled={allCriteriaTypesUsed}
                >
                  Add Rule
                </Button>
              </CardHeaderRow>

              {criteriaRows.map((row, index) => (
                <div key={row.id}>
                  <CriteriaMainRow>
                    <CriteriaTypeWrap>
                      <Select<CriteriaType>
                        id={`audience_builder_details-criteria_type-${index}-sel`}
                        value={row.type}
                        onChange={(type: CriteriaType) => handleTypeChange(row.id, type)}
                        options={criteriaTypeOptions(row.id)}
                      />
                    </CriteriaTypeWrap>
                    <CriteriaValueWrap>{renderCriteriaValueControl(row, index)}</CriteriaValueWrap>
                    <CriteriaRemoveBtnWrap>
                      <DropdownMenu
                        menuType='kebab'
                        items={[
                          {
                            key: 'remove-rule',
                            label: 'Remove Rule',
                            disabled: criteriaRows.length === 1,
                            onClick: () => removeCriteriaRow(row.id),
                          },
                        ]}
                      />
                    </CriteriaRemoveBtnWrap>
                  </CriteriaMainRow>
                </div>
              ))}
            </Container.Section>
          </Grid.Col>

          <Grid.Col span={3}>
            <RuleSummaryCard>
              <Text.H5>Rule Summary</Text.H5>
              {completedRows.length > 0 ? (
                <RuleSummaryList>
                  {completedRows.map(({ row, index, summary }, i) => (
                    <RuleSummaryItem key={row.id} id={`audience_builder_details-rule_summary-${index}-txt`}>
                      <Text.Label>{summary.typeLabel}</Text.Label>
                      {PLACE_CRITERIA_TYPES.includes(row.type) ? (
                        <PlaceSelectionList>
                          {buildPlaceSelectionTree(row.values).map(node =>
                            renderPlaceSelectionNode(node, row.id, `audience_builder_details-rule_summary-${index}`, 0, true),
                          )}
                        </PlaceSelectionList>
                      ) : summary.chips ? (
                        <RuleSummaryChips>
                          {summary.chips.slice(0, MAX_SUMMARY_CHIPS).map((chip, chipIndex) => (
                            <Tag key={chipIndex}>{chip}</Tag>
                          ))}
                          {summary.chips.length > MAX_SUMMARY_CHIPS && (
                            <Tag>{`+${summary.chips.length - MAX_SUMMARY_CHIPS} more`}</Tag>
                          )}
                        </RuleSummaryChips>
                      ) : (
                        <span>{summary.text}</span>
                      )}
                      {i < completedRows.length - 1 && <CriteriaAndDivider>AND</CriteriaAndDivider>}
                    </RuleSummaryItem>
                  ))}
                </RuleSummaryList>
              ) : (
                <RuleSummaryEmpty id='audience_builder_details-rule_summary_empty-txt'>
                  No rules defined.
                </RuleSummaryEmpty>
              )}
            </RuleSummaryCard>
          </Grid.Col>
        </Grid.Row>

        <StickyFooter left='60px'>
          <StickyFooterContainer>
            <RuleFooterActions>
            {ruleId && ruleId !== 'new' && (
              <Button id='audience_builder_details-delete-btn' color='danger' variant='outlined' onClick={() => setIsDeleteModalOpen(true)}>
                Delete Audience Rule
              </Button>
            )}
              <RuleFooterButtons>
                <Button id='audience_builder_details-cancel-btn' variant='outlined' onClick={() => navigate('/audience-builder')}>
                  Cancel
                </Button>
                <Button id='audience_builder_details-save-btn' htmlType='submit'>
                  Save
                </Button>
              </RuleFooterButtons>
            </RuleFooterActions>
          </StickyFooterContainer>
        </StickyFooter>
      </Form>
      <Modal
        idPrefix='audience-builder-delete-modal'
        title={
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name='exclamationTriangle' color={colors.pumpkin_60} width={24} height={24} />
            <span>Delete Audience Rule</span>
          </span>
        }
        open={isDeleteModalOpen}
        maskStyle={{ backgroundColor: colors.sky_90 }}
        okText={dependentAudiences.length > 0 ? 'Close' : 'Delete'}
        footer={dependentAudiences.length > 0 ? <Button onClick={() => setIsDeleteModalOpen(false)}>Close</Button> : undefined}
        onOk={confirmDeleteRule}
        onCancel={() => setIsDeleteModalOpen(false)}
      >
        {dependentAudiences.length > 0 ? (
          <>
            <Text.Body>
              This audience rule <strong>{existingRule?.ruleName ?? 'Audience Rule'}</strong> is being used in the following Audiences and cannot be deleted:
            </Text.Body>
            <Table
              id='audience-builder-dependent-audiences-tbl'
              rowKey='id'
              pagination={false}
              dataSource={dependentAudiences}
              columns={[
                { title: 'Audience', dataIndex: 'audienceName', key: 'audienceName' },
                { title: 'Advertiser', dataIndex: 'advertiser', key: 'advertiser' },
              ]}
            />
          </>
        ) : (
          <>
            <Text.Body>
              Are you sure you want to delete the <strong>{existingRule?.ruleName ?? 'Audience Rule'}</strong>? This action cannot be undone.
            </Text.Body>
            <Text.Body>This rule is not currently used in any Audience.</Text.Body>
          </>
        )}
        {dependentAudiences.length === 0 && <Text.Body>Would you like to proceed with the Delete?</Text.Body>}
      </Modal>
    </AudienceBuilderDetailsWrapper>
  )
}

export default AudienceBuilderDetailsPage
