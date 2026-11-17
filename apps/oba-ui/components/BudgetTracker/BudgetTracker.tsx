import React, { FC } from 'react'
import { Container, Text, Tracker } from '@amadeus/react-design-factory'
import { formatDate, formatNumber } from '@amadeus/react-utils'
import type { BudgetTrackerProps } from './BudgetTracker.d'
import * as Styled from './BudgetTracker.styled'

const BudgetTracker: FC<BudgetTrackerProps> = ({
  totalBudget,
  allocatedBudget,
  spentBudget,
  unspentBudget,
  currency,
  startDate,
  endDate,
}) => {
  const isOverSpent = Number(spentBudget) > Number(totalBudget)

  return (
    <Container.Section>
      <Text.H5>Budget Allocated</Text.H5>
      <Styled.Container>
        <Text.Body>
          <b>Total Budget: {totalBudget && currency ? `${formatNumber(totalBudget)} ${currency}` : '-'}</b>
          {startDate && endDate && ` (${formatDate(startDate)} to ${formatDate(endDate)})`}
        </Text.Body>

        <Tracker
          thresholdPercent={(Number(allocatedBudget) / totalBudget) * 100 || 0}
          progressPercent={(Number(spentBudget) / totalBudget) * 100 || 0}
          thresholdLabel={
            <>
              <Text.Body>Budget Allotted</Text.Body>
              <Text.Body>
                {allocatedBudget && currency ? `${formatNumber(allocatedBudget)} ${currency}` : '-'}
              </Text.Body>
            </>
          }
          startLabel={
            <>
              <Text.Body {...(isOverSpent && { status: 'error' })}>Budget Spent</Text.Body>
              <Text.Body {...(isOverSpent && { status: 'error' })}>
                {totalBudget && currency ? `${formatNumber(Number(spentBudget))} ${currency}` : '-'}
              </Text.Body>
            </>
          }
          endLabel={
            <>
              <Text.Body {...(isOverSpent && { status: 'error' })}>Unspent Budget</Text.Body>
              <Text.Body {...(isOverSpent && { status: 'error' })}>
                {totalBudget && currency ? `${formatNumber(totalBudget - Number(spentBudget))} ${currency}` : '-'}
              </Text.Body>
            </>
          }
        />
      </Styled.Container>
    </Container.Section>
  )
}

export default BudgetTracker
