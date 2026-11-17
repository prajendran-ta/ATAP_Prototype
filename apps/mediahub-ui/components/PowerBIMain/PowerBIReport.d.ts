import { models } from 'powerbi-client'
import { PowerbiReportType } from './PowerBIReport.queries'

export interface InitialReportConfig {
  accessToken: string
  embedUrl: string
  pageName?: string
  filters?: models.ReportLevelFilters[] | models.OnLoadFilters
}

export interface PowerBIReportType {
  reportsData?: PowerbiReportType[]
  twoCols?: boolean
}

export type ReportFilterType = models.IFilter & models.IIdentityFilter
