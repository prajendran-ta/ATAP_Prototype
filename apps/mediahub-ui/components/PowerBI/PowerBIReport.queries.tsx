import { gql, useQuery } from '@apollo/client'
import { client as sharedClient } from '@mediahub/mediahub-ui/MediaHubGqlProvider/MediaHubGqlProvider'

const GET_REPORT_MEDIA_PLAN_QUERY = gql`
  query ReportMediaPlan($filter: MediaPlanReportFilter!) {
    reportMediaPlan(filter: $filter) {
      pageName
      embedURL
      token {
        value
        expiration
      }
      pageId
      filters {
        name
        value
        ids
        operators
      }
    }
  }
`

export type PowerbiReportType = {
  pageName: string
  embedURL: string
  token: PowerbiToken
  pageId: string
  filters: Array<PowerbiFilter>
}

type PowerbiToken = {
  value: string
  expiration: number
}

type PowerbiFilter = {
  name: string
  value: string
  ids: string[]
  operators?: string | null
}

export const useReportMediaPlanQuery = (filter?: SharedQL.MediaPlanReportFilter) => {
  const { data, loading, error, ...rest } = useQuery<Pick<SharedQL.Query, 'reportMediaPlan'>, SharedQL.QueryReportMediaPlanArgs>(GET_REPORT_MEDIA_PLAN_QUERY, {
    fetchPolicy: 'network-only',
    client: sharedClient,
    skip: !filter || !filter.advertiserId,
    variables: {
      filter: filter!,
    },
  })

  return {
    reportData: data?.reportMediaPlan,
    reportError: error,
    reportLoading: loading,
    ...rest,
  }
}