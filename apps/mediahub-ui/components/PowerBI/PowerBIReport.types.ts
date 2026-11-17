import { models } from 'powerbi-client'

export interface InitialReportConfig {
  accessToken: string
  embedUrl: string
  pageName?: string
  filters?: models.ReportLevelFilters[] | models.OnLoadFilters
}

export interface PowerBIReportType {
  mediaPlanFilter?: SharedQL.MediaPlanReportFilter
  twoCols?: boolean
}

export type ReportFilterType = models.ReportLevelFilters
