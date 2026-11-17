import { gql, useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client'

export const GET_WELCOME_MODAL = gql`
  query GetWelcomeModal {
    getWelcomeModal {
      status
    }
  }
`

export const IGNORE_WELCOME_MODAL = gql`
  mutation IgnoreWelcomeModal {
    ignoreWelcomeModal {
      success
    }
  }
`

export const useGetWelcomeModal = () => {
  return useQuery<Pick<SharedQL.Query, 'getWelcomeModal'>>(GET_WELCOME_MODAL)
}

export function useIgnoreWelcomeModal() {
  return useMutation<SharedQL.IgnoreWelcomeModalResponse>(IGNORE_WELCOME_MODAL)
}
