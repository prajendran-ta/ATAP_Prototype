import { describe, expect, test } from '@jest/globals'
import { models } from 'powerbi-client'
import {
  buildPowerBIReportFilter,
  getPowerBIReportFilterConditions,
  getPowerBIReportFilterOperator,
  getPowerBIFilterTargetNames,
  getPowerBIReportFilterValues,
  mapPowerBIBackendFilters,
  matchesPowerBIFilterTarget,
  normalizePowerBIConditionValue,
} from '../helpers'

const baseFilter: models.IBasicFilter = {
  $schema: 'http://powerbi.com/product/schema#basic',
  filterType: models.FilterType.Basic,
  target: {
    table: 'fact_consumption',
    column: 'date',
  },
  operator: 'In',
  values: [],
}

const advertiserFilter: models.IBasicFilter = {
  $schema: 'http://powerbi.com/product/schema#basic',
  filterType: models.FilterType.Basic,
  target: {
    table: 'fact_consumption',
    column: 'advertiser_id',
  },
  operator: 'In',
  values: [1],
}

describe('PowerBI filter helpers', () => {
  test('converts YYYY-MM-DD strings into local Date values for PowerBI date filters', () => {
    const normalizedValue = normalizePowerBIConditionValue('2026-07-16')

    expect(normalizedValue).toBe('2026-07-16T00:00:00.000Z')
  })

  test('keeps the default In operator when backend operators is empty', () => {
    expect(getPowerBIReportFilterOperator({ operators: '' })).toBe('In')
    expect(getPowerBIReportFilterValues({ value: 'USD', operators: '' })).toEqual(['USD'])
  })

  test('matches backend filter names against hierarchy and normalized target names', () => {
    expect(
      getPowerBIFilterTargetNames({
        table: 'Calendar',
        hierarchy: 'Date Hierarchy',
        hierarchyLevel: 'Date',
      } as models.IFilterHierarchyTarget),
    ).toEqual(['Date'])

    expect(
      matchesPowerBIFilterTarget('date', {
        table: 'Calendar',
        hierarchy: 'Date Hierarchy',
        hierarchyLevel: 'Date',
      } as models.IFilterHierarchyTarget),
    ).toBe(true)

    expect(
      matchesPowerBIFilterTarget('advertiser_id', {
        table: 'fact_consumption',
        column: 'Advertiser ID',
      } as models.IFilterColumnTarget),
    ).toBe(true)

    expect(
      matchesPowerBIFilterTarget('date', {
        table: 'Date',
        hierarchy: 'Date Hierarchy',
        hierarchyLevel: 'Month',
      } as models.IFilterHierarchyTarget),
    ).toBe(false)
  })

  test('builds advanced date conditions from backend operators', () => {
    expect(
      getPowerBIReportFilterConditions({
        value: '2026-07-16,2027-07-15',
        operators: 'GreaterThanOrEqual,LessThanOrEqual',
      }),
    ).toEqual([
      {
        operator: 'GreaterThanOrEqual',
        value: '2026-07-16T00:00:00.000Z',
      },
      {
        operator: 'LessThanOrEqual',
        value: '2027-07-15T00:00:00.000Z',
      },
    ])
  })

  test('builds an advanced PowerBI filter for date ranges', () => {
    expect(
      buildPowerBIReportFilter(baseFilter, {
        value: '2025-01-01,2025-01-31',
        operators: 'GreaterThanOrEqual,LessThanOrEqual',
      }),
    ).toEqual({
      $schema: 'http://powerbi.com/product/schema#advanced',
      filterType: models.FilterType.Advanced,
      target: {
        table: 'fact_consumption',
        column: 'date',
      },
      logicalOperator: 'And',
      conditions: [
        {
          operator: 'GreaterThanOrEqual',
          value: '2025-01-01T00:00:00.000Z',
        },
        {
          operator: 'LessThanOrEqual',
          value: '2025-01-31T00:00:00.000Z',
        },
      ],
      displaySettings: undefined,
    })
  })

  test('maps backend filters onto existing PowerBI filters and preserves unmatched filters', () => {
    expect(
      mapPowerBIBackendFilters(
        [baseFilter, advertiserFilter],
        [
          {
            name: 'date',
            value: '2026-07-11,2026-12-18',
            operators: 'GreaterThanOrEqual,LessThanOrEqual',
          },
        ],
      ),
    ).toEqual([
      {
        $schema: 'http://powerbi.com/product/schema#advanced',
        filterType: models.FilterType.Advanced,
        target: {
          table: 'fact_consumption',
          column: 'date',
        },
        logicalOperator: 'And',
        conditions: [
          {
            operator: 'GreaterThanOrEqual',
            value: '2026-07-11T00:00:00.000Z',
          },
          {
            operator: 'LessThanOrEqual',
            value: '2026-12-18T00:00:00.000Z',
          },
        ],
        displaySettings: undefined,
      },
      advertiserFilter,
    ])
  })

  test('prefers ids when provided', () => {
    expect(
      getPowerBIReportFilterValues({
        ids: [1, 2],
        value: '2025-01-01,2025-01-31',
        operators: 'Between',
      }),
    ).toEqual([1, 2])
  })
})