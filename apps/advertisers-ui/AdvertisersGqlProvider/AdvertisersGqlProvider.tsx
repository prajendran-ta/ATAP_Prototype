import { FC, PropsWithChildren } from 'react'
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, from } from '@apollo/client'
import { apiConfig } from '@mediahub/mediahub-ui/api'
import { meLink } from '@mediahub/mediahub-ui/MediaHubGqlProvider/MediaHubAuthMeLink'
import { advertiserMockLink } from './advertiserMockLink'
import { offlineLink } from '@mediahub/mediahub-ui/shared/offlineLink'

const gqlUri = location.hostname === 'localhost' ? '/api.advertiser/graphql' : `${apiConfig.advertiser}/graphql`

const httpLink = new HttpLink({
  uri: gqlUri,
  credentials: 'include',
})

export const client = new ApolloClient({
  // advertiserMockLink injects the demo advertiser (The Londoner Hotel) into list/option/by-id results.
  link: from([meLink, advertiserMockLink, offlineLink, httpLink]),
  cache: new InMemoryCache(),
})

const AdvertisersGqlProvider: FC<PropsWithChildren> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default AdvertisersGqlProvider
