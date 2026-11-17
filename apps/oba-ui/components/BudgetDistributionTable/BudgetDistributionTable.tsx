import React, { FC, useMemo, useState } from 'react'
import {
  colors,
  Container,
  DropdownMenu,
  Form,
  Grid,
  IconButton,
  Input,
  InputNumber,
  Table,
  Text,
} from '@amadeus/react-design-factory'
// Helpers
import { formatCurrency, formatNumber } from '@amadeus/react-utils'
import { budgetsColsWidth, getMonthLabels, getTotalAllocatedBudget } from './BudgetDistributionTable.helpers'
// Types
import type { ColumnsType } from '@amadeus/react-design-factory/components/Table'
import type { BudgetTableDataSource, BudgetDistributionTableProps, BudgetColumn } from './BudgetDistributionTable.d'
// Styles
import * as Styled from './BudgetDistributionTable.styled'

const BudgetDistributionTable: FC<BudgetDistributionTableProps> = ({ period, currency, groups }) => {
  const form = Form.useFormInstance<ObaQL.AdvertiserPlanBudgetsInput>()
  const monthLabels = useMemo(() => getMonthLabels(period), [period])
  const [groupNameEdit, setGroupNameEdit] = useState<{ index: number; prevValue: string } | null>()

  const startGroupNameEdit = (index: number) => {
    const prevValue = groups?.[index]?.name || ''
    setGroupNameEdit({ index, prevValue })
  }

  const finishGroupNameEdit = (discardChanges: boolean) => {
    const fieldName = ['groups', Number(groupNameEdit?.index), 'name'] as ['groups', number, 'name']

    if (!discardChanges && form.getFieldError(fieldName).length) {
      return
    }

    if (discardChanges && groupNameEdit) {
      form.setFieldValue(fieldName, groupNameEdit.prevValue)
    }
    setGroupNameEdit(null)
  }

  const deleteGroup = (groupIndex: number) => {
    const currentGroups: ObaQL.GroupPlanInput[] = form.getFieldsValue(true).groups
    const updatedGroups = currentGroups.filter((_, index) => index !== groupIndex)
    form.setFieldValue('groups', updatedGroups)
  }

  const onNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      finishGroupNameEdit(false)
    } else if (e.key === 'Escape') {
      finishGroupNameEdit(true)
    }
  }

  const columns: ColumnsType<BudgetTableDataSource> = useMemo(() => {
    // 1st Column - Group Name
    const groupNameCol: BudgetColumn = {
      title: '',
      dataIndex: 'name',
      minWidth: budgetsColsWidth.name,
      fixed: 'left',
      render: (name: string, record, index) => {
        if (record.isSummaryRow) {
          return <Text.Body>Monthly Total</Text.Body>
        } else if (groupNameEdit?.index === index) {
          // Name Edit Mode
          return (
            <Grid.Row align='middle'>
              <Form.Item
                colSpan={9}
                name={[index, 'name']}
                rules={[{ required: true, message: 'Group name is required' }]}
              >
                <Input onKeyDown={onNameKeyDown} />
              </Form.Item>
              <Grid.Col span={1}>
                <IconButton
                  iconName='checkCircle'
                  id='oba-name_save-btn'
                  title='Save'
                  width={16}
                  color={colors.forest_70}
                  onClick={() => finishGroupNameEdit(false)}
                />
              </Grid.Col>
              <Grid.Col span={1}>
                <IconButton
                  iconName='timesCircle'
                  id='oba-name_cancel-btn'
                  title='Cancel'
                  width={16}
                  color={colors.crimson_60}
                  onClick={() => finishGroupNameEdit(true)}
                />
              </Grid.Col>
            </Grid.Row>
          )
        } else
          // Normal Budget Name
          return (
            <>
              <Grid.Row align='middle'>
                <Grid.Col>
                  <Text.Body>{name}</Text.Body>
                </Grid.Col>
                <Grid.Col>
                  <IconButton
                    iconName='pen'
                    id='oba-name_edit-btn'
                    title='Edit'
                    color={colors.sky_60}
                    onClick={() => startGroupNameEdit(index)}
                  />
                </Grid.Col>
              </Grid.Row>

              <Container.Column>
                <Text.Helper status='helper'>
                  Budget Alloted: {record.allottedSum ? formatCurrency(record.allottedSum, currency) : '-'}
                </Text.Helper>
                {record.spentSum !== undefined && record.spentSum > 0 && (
                  <Text.Helper status='helper'>
                    Budget Spent: {formatCurrency(record.spentSum / 100, currency)}
                  </Text.Helper>
                )}
              </Container.Column>
            </>
          )
      },
    }

    // Monthly Budget Columns
    const monthCols: BudgetColumn[] = monthLabels.map((month, monthIndex) => ({
      title: `${month}*`,
      dataIndex: `monthBudgets[${monthIndex}]`,
      minWidth: budgetsColsWidth.month,
      render: (_, record, rowIndex) => {
        if (record.isSummaryRow) {
          const monthTotal = groups?.reduce((acc, curr) => acc + (curr.monthBudgetCents?.[monthIndex] ?? 0), 0)
          const monthTotalDisplayText = monthTotal ? formatCurrency(monthTotal, currency) : '-'
          return <Styled.TotalField>{monthTotalDisplayText}</Styled.TotalField>
        } else {
          const monthData = record.monthBudgets?.[monthIndex]
          const spentCents = monthData?.budget.spentCents
          const unspentCents = monthData?.budget.unSpentCents
          const overspentCents = monthData?.budget.overSpentCents

          let inputSuffix = ''
          if (spentCents && monthData.current) inputSuffix = `Spent: ${formatNumber(spentCents / 100)}`
          else if (unspentCents && monthData.past) inputSuffix = `Unspent: ${formatNumber(unspentCents / 100)}`

          return (
            <Form.Item name={[rowIndex, 'monthBudgetCents', monthIndex]}>
              <InputNumber
                min={0}
                disabled={monthData?.past}
                {...(inputSuffix && { helperMessage: inputSuffix })}
                {...(overspentCents && { errorMessage: `Overspent: ${formatNumber(overspentCents / 100)}` })}
              />
            </Form.Item>
          )
        }
      },
    }))

    // Last - Kebab Menu Column
    const kebabMenuCol: BudgetColumn = {
      title: '',
      dataIndex: 'actions',
      render: (_, record, rowIndex) => {
        const isPlanStarted = record.monthBudgets?.some(month => !month.future)
        if (record.isSummaryRow || rowIndex === 0 || isPlanStarted) return null

        return (
          <DropdownMenu
            menuType='kebab'
            items={[{ key: 'delete', label: 'Delete', onClick: () => deleteGroup(rowIndex) }]}
          />
        )
      },
    }
    return [groupNameCol, ...monthCols, kebabMenuCol]
  }, [groups, currency, monthLabels, groupNameEdit])

  const dataSource: BudgetTableDataSource[] = useMemo(() => {
    if (!groups) return []

    const groupRows: BudgetTableDataSource[] = groups.map(
      ({ name, monthBudgets, monthBudgetCents }, index) =>
        ({
          key: `group-${index}`,
          name: name || `Group ${index + 1}`,
          monthBudgets,
          monthBudgetCents,
          allottedSum: monthBudgetCents?.reduce((acc, curr) => Number(acc) + (curr ?? 0), 0) || 0,
          spentSum: monthBudgets?.reduce((acc, month) => acc + (month.budget.spentCents ?? 0), 0) || 0,
        }) as BudgetTableDataSource,
    )

    const summaryRow: BudgetTableDataSource = {
      key: 'summary',
      name: 'Monthly Total',
      allottedSum: getTotalAllocatedBudget(groups),
      isSummaryRow: true,
    }

    return [...groupRows, summaryRow]
  }, [groups, monthLabels])

  return (
    <Styled.TableWrapper monthsCount={monthLabels.length}>
      <Table<BudgetTableDataSource>
        id='oba-bud_dist-tbl'
        cellsIdPrefix='oba'
        noBorders
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />
    </Styled.TableWrapper>
  )
}

export default BudgetDistributionTable
