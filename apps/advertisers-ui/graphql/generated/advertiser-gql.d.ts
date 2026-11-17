// Advertiser GraphQL Typescript Definitions
declare namespace AdvertiserQL {
  type Maybe<T> = T | null
  type InputMaybe<T> = Maybe<T>
  type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
  type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
  type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
  type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
  type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
  /** All built-in and custom scalars, mapped to their actual values */
  type Scalars = {
    ID: { input: number; output: number }
    String: { input: string; output: string }
    Boolean: { input: boolean; output: boolean }
    Int: { input: number; output: number }
    Float: { input: number; output: number }
  }

  /** Advertiser entity */
  interface Advertiser {
    __typename?: 'Advertiser'
    advertiserId: Scalars['ID']['output']
    advertiserName: Scalars['String']['output']
    advertiserTypes: AdvertiserTypesEnum
    bpid: Scalars['String']['output']
    followedBy: Scalars['String']['output']
    isFollowing: Scalars['Boolean']['output']
    status: AdvertiserStatusEnum
  }

  /** Details of external advertisers linked to an advertiser */
  interface AdvertiserDetails {
    __typename?: 'AdvertiserDetails'
    advertiserId: Scalars['ID']['output']
    externalAdvertiser: Array<ExternalAdvertiser>
  }

  /** Input type for filtering advertisers */
  interface AdvertiserFilter {
    advertiserTypes: AdvertiserTypesEnum
    followedBy?: InputMaybe<Array<Scalars['Int']['input']>>
    ids?: InputMaybe<Array<Scalars['Int']['input']>>
    isFollowingOnly: Scalars['Boolean']['input']
    name?: InputMaybe<Scalars['String']['input']>
    paging?: InputMaybe<PagingInput>
    status?: InputMaybe<Array<AdvertiserStatusEnum>>
  }

  /** ENUMS */
  enum AdvertiserStatusEnum {
    Active = 'ACTIVE',
    Archived = 'ARCHIVED',
    Expired = 'EXPIRED',
    External = 'EXTERNAL',
    Paused = 'PAUSED',
    Pending = 'PENDING',
    Unset = 'UNSET',
  }

  enum AdvertiserTypesEnum {
    Hotel = 'HOTEL',
  }

  /** Wrapper for advertiser list with total count */
  interface Advertisers {
    __typename?: 'Advertisers'
    advertisers: Array<Advertiser>
    toggle: TotalToggle
    totalCount: Scalars['Int']['output']
  }

  interface EntityInput {
    advertiserId: Array<Scalars['String']['input']>
  }

  interface EntityResponse {
    __typename?: 'EntityResponse'
    message?: Maybe<Scalars['String']['output']>
    success: Scalars['Boolean']['output']
  }

  /** External advertiser representation */
  interface ExternalAdvertiser {
    __typename?: 'ExternalAdvertiser'
    name: Scalars['String']['output']
    platform: Scalars['String']['output']
  }

  interface Mutation {
    __typename?: 'Mutation'
    /** Follow advertiser method */
    followAdvertiser: EntityResponse
    /** Unfollow advertiser method */
    unfollowAdvertiser: EntityResponse
  }

  type MutationFollowAdvertiserArgs = {
    input: EntityInput
  }

  type MutationUnfollowAdvertiserArgs = {
    input: EntityInput
  }

  /** Input for pagination */
  interface PagingInput {
    /**  Maximum number of items to return (max 100)  */
    limit?: InputMaybe<Scalars['Int']['input']>
    /**  Number of items to skip  */
    offset?: InputMaybe<Scalars['Int']['input']>
  }

  /** Root Query Type */
  interface Query {
    __typename?: 'Query'
    /** Returns external advertiser details for a given advertiser ID */
    advertiserDetails?: Maybe<AdvertiserDetails>
    /** Returns a list of all advertisers based on filter criteria */
    advertisers: Advertisers
  }

  /** Root Query Type */
  type QueryAdvertiserDetailsArgs = {
    advertiserId: Scalars['ID']['input']
  }

  /** Root Query Type */
  type QueryAdvertisersArgs = {
    filter: AdvertiserFilter
  }

  interface TotalToggle {
    __typename?: 'TotalToggle'
    totalAdvertisers: Scalars['Int']['output']
    totalFollowing: Scalars['Int']['output']
  }
}
