import { gql, useQuery } from '@apollo/client'
import type { NotificationGroup } from './NotificationList/NotificationsAccordionList.d'
import { useMemo } from 'react'
import { AlertCategoryEnum } from '@mediahub/mediahub-ui/graphql/generated/shared-enums'

export const GET_GROUPED_NOTIFICATIONS = gql`
  query GetGroupedNotifications {
    groupedNotifications {
      category
      notifications {
        nb
        id
        createdAt {
          at
          ago
        }
        advertiserId
        advertiser {
          id
          bid
          bpid
          name
        }
        level
        module
        category
        code
        message
        new
        link {
          type
          parameters
        }
      }
    }
  }
`

export function useNotificationGroups() {
  const { data, loading, error, refetch } = useQuery<{
    groupedNotifications: SharedQL.NotificationsByCategory[]
  }>(GET_GROUPED_NOTIFICATIONS, {
    fetchPolicy: 'network-only',
  })

  const { groups, totalNotifications } = useMemo(() => {
    const raw = data?.groupedNotifications ?? []

    const mappedGroups: NotificationGroup[] = raw.map(g => ({
      title: String(g.category),
      category: AlertCategoryEnum[g.category],
      boldHeader: true,
      notifications: g.notifications,
    }))

    const total = mappedGroups.reduce((acc, g) => acc + (g.notifications?.length ?? 0), 0)

    return { groups: mappedGroups, totalNotifications: total }
  }, [data?.groupedNotifications])

  return { groups, totalNotifications, loading, error, refetch }
}
