import { gql, useQuery } from '@apollo/client'
import { client as mediahubClient } from '@mediahub/mediahub-ui/MediaHubGqlProvider/MediaHubGqlProvider'

// =====================
// QUERIES
// =====================

export const GET_CURRENCIES = gql`
  query GetCurrencies {
    currencies {
      code
      name
      symbol
    }
  }
`

// =====================
// HOOKS
// =====================

export function useGetCurrenciesQuery() {
  return useQuery<Pick<SharedQL.Query, 'currencies'>>(GET_CURRENCIES, {
    client: mediahubClient,
  })
}
