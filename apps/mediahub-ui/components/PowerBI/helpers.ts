import { IReportEmbedConfiguration, models } from 'powerbi-client'
import { InitialReportConfig } from './PowerBIReport.types'

type ReportResponseFilter = {
  name?: string | null
  ids?: Array<string | number> | null
  value?: string | null
  operators?: string | null
}

const ISO_DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/

const normalizePowerBIFilterName = (value?: string) =>
  value
    ?.trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '') ?? ''

export const getInitialReportConfig = ({
  accessToken,
  embedUrl,
  pageName,
  filters,
}: InitialReportConfig): IReportEmbedConfiguration => {
  return {
    type: 'report',
    embedUrl,
    accessToken,
    tokenType: models.TokenType.Embed,
    pageName,
    filters,
    settings: {
      layoutType: models.LayoutType.Custom,
      customLayout: {
        displayOption: models.DisplayOption.FitToWidth,
      },
      bars: {
        actionBar: {
          visible: true,
        },
      },
      navContentPaneEnabled: false,
      filterPaneEnabled: false,
      panes: {
        bookmarks: {
          visible: false,
        },
        fields: {
          expanded: true,
        },
        filters: {
          expanded: false,
          visible: false,
        },
        pageNavigation: {
          visible: false,
        },
        selection: {
          visible: true,
        },
        syncSlicers: {
          visible: true,
        },
        visualizations: {
          expanded: true,
        },
      },
    },
  }
}

export const getPowerBIReportFilterOperator = ({ operators }: Pick<ReportResponseFilter, 'operators'>) => {
  const normalizedOperator = operators?.trim()

  return normalizedOperator || 'In'
}

export const getPowerBIReportFilterConditions = ({
  value,
  operators,
}: Pick<ReportResponseFilter, 'value' | 'operators'>): models.IAdvancedFilterCondition[] => {
  if (!value || !operators) return []

  const normalizedOperators = operators
    .split(',')
    .map(item => item.trim())
    .filter(Boolean)
  const normalizedValues = value
    .split(',')
    .map(item => item.trim())
    .filter(Boolean)

  return normalizedOperators.reduce<models.IAdvancedFilterCondition[]>((conditions, operator, index) => {
    const conditionValue = normalizedValues[index]

    if (!operator || conditionValue == null) return conditions

    conditions.push({
      operator: operator as models.AdvancedFilterConditionOperators,
      value: normalizePowerBIConditionValue(conditionValue),
    })

    return conditions
  }, [])
}

export const normalizePowerBIConditionValue = (value: string): string => {
  const matchedDate = value.match(ISO_DATE_ONLY_PATTERN)

  if (!matchedDate) return value

  const [, year, month, day] = matchedDate

  return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 0, 0, 0, 0)).toISOString()
}

export const getPowerBIReportFilterValues = ({
  ids,
  value,
  operators,
}: ReportResponseFilter): Array<string | number> => {
  if (ids?.length) return ids
  if (value == null) return []

  const normalizedOperator = getPowerBIReportFilterOperator({ operators })

  if (normalizedOperator !== 'In' && value.includes(',')) {
    return value
      .split(',')
      .map(item => item.trim())
      .filter(Boolean)
  }

  return [value]
}

export const buildPowerBIReportFilter = (
  baseFilter: models.ReportLevelFilters,
  responseFilter: ReportResponseFilter,
): models.ReportLevelFilters => {
  const conditions = getPowerBIReportFilterConditions(responseFilter)

  if (conditions.length > 0) {
    return {
      $schema: 'http://powerbi.com/product/schema#advanced',
      filterType: models.FilterType.Advanced,
      target: baseFilter.target as models.IFilterTarget,
      logicalOperator: 'And',
      conditions,
      displaySettings: baseFilter.displaySettings,
    }
  }

  return {
    ...baseFilter,
    operator: getPowerBIReportFilterOperator(responseFilter),
    values: getPowerBIReportFilterValues(responseFilter),
  } as models.ReportLevelFilters
}

export const mapPowerBIBackendFilters = (
  existingFilters: models.IFilter[],
  responseFilters: ReportResponseFilter[] | null | undefined,
) => {
  return existingFilters.map(filter => {
    const matchedFilter = responseFilters?.find(obaFilter =>
      matchesPowerBIFilterTarget(obaFilter.name ?? undefined, filter.target),
    )

    if (!matchedFilter) return filter

    return buildPowerBIReportFilter(filter as models.ReportLevelFilters, matchedFilter)
  })
}

export const getPowerBIFilterTargetNames = (target: models.IFilterGeneralTarget | undefined): string[] => {
  if (!target || Array.isArray(target)) return []

  const targetNames: string[] = []

  if ('column' in target && target.column) targetNames.push(target.column)
  if ('hierarchyLevel' in target && target.hierarchyLevel) targetNames.push(target.hierarchyLevel)
  if ('measure' in target && target.measure) targetNames.push(target.measure)

  return targetNames
}

export const matchesPowerBIFilterTarget = (
  backendFilterName: string | undefined,
  target: models.IFilterGeneralTarget | undefined,
) => {
  const normalizedBackendFilterName = normalizePowerBIFilterName(backendFilterName)

  if (!normalizedBackendFilterName) return false

  return getPowerBIFilterTargetNames(target)
    .map(normalizePowerBIFilterName)
    .some(targetName => targetName === normalizedBackendFilterName)
}