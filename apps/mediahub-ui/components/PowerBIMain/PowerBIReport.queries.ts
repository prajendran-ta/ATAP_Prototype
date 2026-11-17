import { gql, useQuery } from '@apollo/client'

const GET_REPORTS_QUERY = gql`
  query GetReports {
    reports {
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
}

export const useReportsQuery = () => {
  const { data, loading, error, ...rest } = useQuery<{ reports: PowerbiReportType[] }>(GET_REPORTS_QUERY, {
    fetchPolicy: 'network-only',
  })

  return {
    reportsData: data?.reports,
    reportsError: error,
    reportsLoading: loading,
    ...rest,
  }
}
