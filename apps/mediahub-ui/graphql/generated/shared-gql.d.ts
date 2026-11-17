// Shared GraphQL Typescript Definitions
declare namespace SharedQL {
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
    Int53: { input: number; output: number }
    /** Scalar */
    Map: { input: any; output: any }
  }

  interface AdvertiserIdAndName {
    __typename?: 'AdvertiserIdAndName'
    bid?: Maybe<Scalars['Int53']['output']>
    bpid?: Maybe<Scalars['String']['output']>
    id: Scalars['ID']['output']
    name: Scalars['String']['output']
  }

  enum AlertCategoryEnum {
    Contract = 'Contract',
    Management = 'Management',
    Others = 'Others',
    Performance = 'Performance',
    Unknown = 'Unknown',
  }

  /** Enum */
  enum AlertLevelEnum {
    Error = 'Error',
    Info = 'Info',
    Unknown = 'Unknown',
    Warning = 'Warning',
  }

  enum AlertModuleEnum {
    Oba = 'OBA',
    Unknown = 'Unknown',
  }

  enum AlertReadStatusEnum {
    Read = 'Read',
    Unknown = 'Unknown',
    Unread = 'Unread',
  }

  enum AlertSnoozeStatusEnum {
    Snoozed = 'Snoozed',
    Unknown = 'Unknown',
    Unsnoozed = 'Unsnoozed',
  }

  enum AlertStatusEnum {
    Read = 'Read',
    Snoozed = 'Snoozed',
    Unknown = 'Unknown',
    Unread = 'Unread',
  }

  interface Currency {
    __typename?: 'Currency'
    code: Scalars['String']['output']
    name: Scalars['String']['output']
    symbol?: Maybe<Scalars['String']['output']>
  }

  interface GetWelcomeModalResponse {
    __typename?: 'GetWelcomeModalResponse'
    status: Scalars['Boolean']['output']
  }

  interface GroupedNotification {
    __typename?: 'GroupedNotification'
    advertiser: AdvertiserIdAndName
    advertiserId: Scalars['Int53']['output']
    category: AlertCategoryEnum
    code: Scalars['Int']['output']
    createdAt: TimeAgo
    /** id & created_at of the latest alert */
    id: Scalars['ID']['output']
    level: AlertLevelEnum
    link?: Maybe<Link>
    message: Scalars['String']['output']
    module: AlertModuleEnum
    /** Number of similar alerts ( same category, code & advertiser id / 1 = single notification ) */
    nb: Scalars['Int']['output']
    new: Scalars['Boolean']['output']
  }

  interface IdAndName {
    __typename?: 'IdAndName'
    id: Scalars['ID']['output']
    name: Scalars['String']['output']
  }

  /** Response Model */
  interface IgnoreWelcomeModalResponse {
    __typename?: 'IgnoreWelcomeModalResponse'
    success: Scalars['Boolean']['output']
  }

  interface Link {
    __typename?: 'Link'
    parameters: Scalars['Map']['output']
    type: LinkTypeEnum
  }

  enum LinkTypeEnum {
    AdvertiserPlan = 'AdvertiserPlan',
    Unknown = 'Unknown',
  }

  /**
   * MediaPlanReportFilter contains the filters for the reportMediaPlan query.
   * advertiserId is required. dates and currency filters are optional.
   */
  interface MediaPlanReportFilter {
    advertiserId: Scalars['Int53']['input']
    currency?: InputMaybe<Scalars['String']['input']>
    endDate?: InputMaybe<Scalars['String']['input']>
    startDate?: InputMaybe<Scalars['String']['input']>
  }

  /** Mutation root type */
  interface Mutation {
    __typename?: 'Mutation'
    /** Welcome Modal */
    ignoreWelcomeModal: IgnoreWelcomeModalResponse
    markAllAsRead: Scalars['Boolean']['output']
    /** Notifications */
    markAsRead: Scalars['Boolean']['output']
    markAsUnread: Scalars['Boolean']['output']
    snooze: Scalars['Boolean']['output']
    unSnooze: Scalars['Boolean']['output']
    /**
     * Update a user's role and/or status
     *
     * Example mutation:
     * mutation {
     *   updateUser(userId: "123", role: "mh-admin", isActive: true) {
     *     user {
     *       id
     *       name
     *       email
     *       role
     *       location
     *       status
     *       permissions
     *       lastLogin
     *     }
     *     success
     *     message
     *   }
     * }
     *
     * Note: Both role and isActive are optional, but at least one must be provided.
     */
    updateUser: UpdateUserResponse
  }

  /** Mutation root type */
  type MutationMarkAsReadArgs = {
    id: Scalars['ID']['input']
  }

  /** Mutation root type */
  type MutationMarkAsUnreadArgs = {
    id: Scalars['ID']['input']
  }

  /** Mutation root type */
  type MutationSnoozeArgs = {
    id: Scalars['ID']['input']
  }

  /** Mutation root type */
  type MutationUnSnoozeArgs = {
    id: Scalars['ID']['input']
  }

  /** Mutation root type */
  type MutationUpdateUserArgs = {
    isActive?: InputMaybe<Scalars['Boolean']['input']>
    role?: InputMaybe<Scalars['String']['input']>
    userId: Scalars['ID']['input']
  }

  interface Notification {
    __typename?: 'Notification'
    advertiser: AdvertiserIdAndName
    advertiserId: Scalars['Int53']['output']
    category: AlertCategoryEnum
    code: Scalars['Int']['output']
    createdAt: TimeAgo
    id: Scalars['ID']['output']
    level: AlertLevelEnum
    link?: Maybe<Link>
    message: Scalars['String']['output']
    module: AlertModuleEnum
    new: Scalars['Boolean']['output']
    readStatus: AlertReadStatusEnum
    snoozeStatus: AlertSnoozeStatusEnum
  }

  /** List notifications */
  interface NotificationFilter {
    advertiserIds?: InputMaybe<Array<Scalars['ID']['input']>>
    categories?: InputMaybe<Array<AlertCategoryEnum>>
    codes?: InputMaybe<Array<Scalars['Int']['input']>>
    levels?: InputMaybe<Array<AlertLevelEnum>>
    modules?: InputMaybe<Array<AlertModuleEnum>>
    myAdvertisers?: InputMaybe<Scalars['Boolean']['input']>
    status?: InputMaybe<AlertStatusEnum>
    timePeriod?: InputMaybe<TimePeriodEnum>
  }

  /** List user notifications ( grouped by category & keep only one by code ) */
  interface NotificationsByCategory {
    __typename?: 'NotificationsByCategory'
    category: AlertCategoryEnum
    notifications: Array<GroupedNotification>
  }

  /** OperatorOptions defines a filter operation on a specific field */
  interface OperatorOptions {
    /** Field name to filter: 'id', 'role', or 'status' */
    field: Scalars['String']['input']
    /** Operator type: 'in' (in list) */
    operator: Scalars['String']['input']
    /** Values to filter by (for role field: use 'mh-standard', 'mh-administrator', or 'mh-read-only') */
    values: Array<Scalars['String']['input']>
  }

  /** PageQueryOptions provides pagination, filtering and search capabilities */
  interface PageQueryOptions {
    /** Filter operators for specific fields */
    operators?: InputMaybe<Array<OperatorOptions>>
    /** Pagination options */
    paginate?: InputMaybe<PaginateOptions>
    /** Search options for text-based queries */
    search?: InputMaybe<SearchOptions>
  }

  /** PaginateOptions defines pagination parameters */
  interface PaginateOptions {
    /** Maximum number of items to return (max 100) */
    limit?: InputMaybe<Scalars['Int']['input']>
    /** Number of items to skip */
    offset?: InputMaybe<Scalars['Int']['input']>
  }

  interface PowerbiFilter {
    __typename?: 'PowerbiFilter'
    ids?: Maybe<Array<Scalars['Int53']['output']>>
    name: Scalars['String']['output']
    operators?: Maybe<Scalars['String']['output']>
    value?: Maybe<Scalars['String']['output']>
  }

  /**
   * Powerbi report contains all needed informations to embed a powerbi report in the UI.
   * - pageName is the key to select the report page.
   * - embedURL is the URL to the report that can be used in an iframe.
   * - token is an access token to allow refresh of the embed report.
   * - pageId is the id of the page to be enforced within the embed report.
   * - filters are the filters to be applied to the report.
   */
  interface PowerbiReport {
    __typename?: 'PowerbiReport'
    embedURL: Scalars['String']['output']
    filters?: Maybe<Array<PowerbiFilter>>
    pageId: Scalars['String']['output']
    pageName: Scalars['String']['output']
    token: PowerbiToken
  }

  interface PowerbiToken {
    __typename?: 'PowerbiToken'
    expiration: Scalars['Int53']['output']
    value: Scalars['String']['output']
  }

  /** Query root type */
  interface Query {
    __typename?: 'Query'
    /** helpers */
    advertiserIdNames: Array<AdvertiserIdAndName>
    /** List currencies */
    currencies: Array<Currency>
    /** Welcome Modal */
    getWelcomeModal: GetWelcomeModalResponse
    groupedNotifications: Array<NotificationsByCategory>
    /** Notifications */
    notifications: Array<Notification>
    /**
     * Retrieve the media plan report (atap_past_consumption_data) for a given set of filters.
     * The report name is configured per environment via MEDIA_PLAN_REPORT_NAME.
     *
     * Example query:
     * {
     *   reportMediaPlan(filter: {
     *     advertiserId: 30146835
     *     startDate: "01-Jun-2026"
     *     endDate: "30-Nov-2026"
     *     currency: "EUR"
     *   }) {
     *     pageName
     *     embedURL
     *     pageId
     *     token { value expiration }
     *     filters { name value ids }
     *   }
     * }
     */
    reportMediaPlan: PowerbiReport
    /** Retrieve main powerbi reports */
    reports: Array<PowerbiReport>
    /**
     * Retrieve detailed information about a specific user by ID
     *
     * Example query:
     * {
     *   user(userId: "123") {
     *     id
     *     name
     *     email
     *     role
     *     location
     *     status
     *     permissions
     *     lastLogin
     *   }
     * }
     */
    user: UserDetail
    /**
     * Retrieve a list of user IDs and names, optionally filtered by name
     *
     * Useful for autocomplete or dropdown selections
     *
     * Example query:
     * {
     *   userIdNames(nameFilter: "john") {
     *     id
     *     name
     *   }
     * }
     */
    userIdNames: Array<UserIdName>
    /**
     * Retrieve a list of users with optional filtering, pagination and search
     *
     * Example query:
     * {
     *   users(options: {
     *     paginate: { limit: 20, offset: 0 }
     *     search: { query: "john", fields: ["name", "email"] }
     *     operators: [
     *       { field: "status", operator: "in", values: ["active"] }
     *       { field: "role", operator: "in", values: ["mh-standard", "mh-administrator"] }
     *       { field: "id", operator: "in", values: ["187", "186"] }
     *     ]
     *   }) {
     *     users {
     *       id
     *       name
     *       email
     *       role
     *       location
     *       status
     *       lastLogin
     *     }
     *     totalCount
     *     hasNextPage
     *   }
     * }
     */
    users: UsersResponse
  }

  /** Query root type */
  type QueryNotificationsArgs = {
    filter: NotificationFilter
  }

  /** Query root type */
  type QueryReportMediaPlanArgs = {
    filter: MediaPlanReportFilter
  }

  /** Query root type */
  type QueryUserArgs = {
    userId: Scalars['ID']['input']
  }

  /** Query root type */
  type QueryUserIdNamesArgs = {
    nameFilter?: InputMaybe<Scalars['String']['input']>
  }

  /** Query root type */
  type QueryUsersArgs = {
    options?: InputMaybe<PageQueryOptions>
  }

  /** SearchOptions provides text search capabilities across multiple fields */
  interface SearchOptions {
    /** Fields to search in (e.g., ['name', 'email']) */
    fields?: InputMaybe<Array<Scalars['String']['input']>>
    /** Search query string */
    query?: InputMaybe<Scalars['String']['input']>
  }

  interface TimeAgo {
    __typename?: 'TimeAgo'
    ago: Scalars['String']['output']
    at: Scalars['Int53']['output']
  }

  enum TimePeriodEnum {
    Last_3Days = 'Last_3_days',
    Last_7Days = 'Last_7_days',
    Last_24Hours = 'Last_24_hours',
    Last_30Days = 'Last_30_days',
    Unknown = 'Unknown',
  }

  /** UpdateUserResponse contains the result of updating a user */
  interface UpdateUserResponse {
    __typename?: 'UpdateUserResponse'
    /** Message describing the result of the operation */
    message: Scalars['String']['output']
    /** Indicates if the update was successful */
    success: Scalars['Boolean']['output']
    /** The updated user details */
    user?: Maybe<UserDetail>
  }

  /** User represents a user in the system */
  interface User {
    __typename?: 'User'
    /** Email address of the user */
    email: Scalars['String']['output']
    /** Unique identifier for the user */
    id: Scalars['ID']['output']
    /** User's last login in format: DD-MMM-YYYY HH.mm (e.g., 23-Jan-2025 18.09) */
    lastLogin?: Maybe<Scalars['String']['output']>
    /** User's location */
    location?: Maybe<Scalars['String']['output']>
    /** Full name of the user */
    name: Scalars['String']['output']
    /** List of roles assigned to the user */
    role: Array<Scalars['String']['output']>
    /** Current status of the user (active/inactive) */
    status: Scalars['String']['output']
  }

  /** UserDetail represents detailed information about a user */
  interface UserDetail {
    __typename?: 'UserDetail'
    /** Email address of the user */
    email: Scalars['String']['output']
    /** Unique identifier for the user */
    id: Scalars['ID']['output']
    /** User's last login in format: DD-MMM-YYYY HH.mm (e.g., 23-Jan-2025 18.09) */
    lastLogin?: Maybe<Scalars['String']['output']>
    /** User's location */
    location?: Maybe<Scalars['String']['output']>
    /** Full name of the user */
    name: Scalars['String']['output']
    /** List of MediaHub permissions (prefix "mh") */
    permissions: Array<Scalars['String']['output']>
    /** Single MediaHub role (prefix "mh") */
    role: Scalars['String']['output']
    /** Current status of the user (active/inactive) */
    status: Scalars['String']['output']
  }

  /** UserIdName represents a minimal user record with just ID and name */
  interface UserIdName {
    __typename?: 'UserIdName'
    /** Unique identifier for the user */
    id: Scalars['ID']['output']
    /** Full name of the user */
    name: Scalars['String']['output']
  }

  interface UserToggle {
    __typename?: 'UserToggle'
    /** Total number of active users */
    totalActive: Scalars['Int']['output']
    /** Total number of inactive users */
    totalInactive: Scalars['Int']['output']
    /** Total number of users */
    totalUsers: Scalars['Int']['output']
  }

  /** UsersResponse contains the list of users with pagination information */
  interface UsersResponse {
    __typename?: 'UsersResponse'
    /** Indicates if there are more pages available */
    hasNextPage: Scalars['Boolean']['output']
    /** Total number of users in toggle labels */
    toggle: UserToggle
    /** Total number of administrator users (role: mh-admin) */
    totalAdministrators: Scalars['Int']['output']
    /** Total number of users matching the query */
    totalCount: Scalars['Int']['output']
    /** Total number of read-only users (no mh role assigned) */
    totalReadOnly: Scalars['Int']['output']
    /** Total number of standard users (role: mh-standard) */
    totalStandard: Scalars['Int']['output']
    /** List of users */
    users: Array<User>
  }
}
