import React, { FC } from 'react'
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, from } from '@apollo/client'
import { apiConfig } from '@mediahub/mediahub-ui/api'
import { meLink } from '@mediahub/mediahub-ui/MediaHubGqlProvider/MediaHubAuthMeLink'
import { obaMockLink } from './obaMockLink'
import { offlineLink } from '@mediahub/mediahub-ui/shared/offlineLink'

const ObaGqlProvider: FC<React.PropsWithChildren> = ({ children }) => {
  const gqlUri = location.hostname === 'localhost' ? '/api.oba/graphql' : `${apiConfig.oba}/graphql`

  const httpLink = new HttpLink({
    uri: gqlUri,
    credentials: 'include',
  })

  const client = new ApolloClient({
    link: from([meLink, obaMockLink, offlineLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        notifyOnNetworkStatusChange: true,
      },
    },
    // headers: {
    //   Authorization: `Bearer ${process.env.GRAPHQL_TOKEN}`,
    // },
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default ObaGqlProvider
