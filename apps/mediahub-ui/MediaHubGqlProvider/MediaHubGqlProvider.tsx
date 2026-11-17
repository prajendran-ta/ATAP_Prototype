import { FC } from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink, from } from '@apollo/client'
import { meLink } from './MediaHubAuthMeLink'
import { apiConfig } from '@mediahub/mediahub-ui/api'
import { offlineLink } from '@mediahub/mediahub-ui/shared/offlineLink'

const gqlUri = location.hostname === 'localhost' ? '/api.shared/graphql' : `${apiConfig.shared}/graphql`

const httpLink = new HttpLink({
  uri: gqlUri,
  credentials: 'include',
})

export const client = new ApolloClient({
  link: from([meLink, offlineLink, httpLink]),
  cache: new InMemoryCache(),
})

const MediaHubGqlProvider: FC<React.PropsWithChildren> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default MediaHubGqlProvider
