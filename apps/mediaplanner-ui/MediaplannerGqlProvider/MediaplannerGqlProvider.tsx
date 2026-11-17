import { FC, PropsWithChildren } from 'react'
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, from } from '@apollo/client'
import { apiConfig } from '@mediahub/mediahub-ui/api'
import { meLink } from '@mediahub/mediahub-ui/MediaHubGqlProvider/MediaHubAuthMeLink'
import { offlineLink } from '@mediahub/mediahub-ui/shared/offlineLink'

const gqlUri = location.hostname === 'localhost' ? '/api.plan/graphql' : `${apiConfig.mediaplanner}/graphql`

const httpLink = new HttpLink({
  uri: gqlUri,
  credentials: 'include',
})

export const client = new ApolloClient({
  link: from([meLink, offlineLink, httpLink]),
  cache: new InMemoryCache(),
})

const MediaplannerGqlProvider: FC<PropsWithChildren> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default MediaplannerGqlProvider
