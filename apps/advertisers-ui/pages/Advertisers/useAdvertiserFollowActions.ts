import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNotification } from '@amadeus/react-design-factory'
import { useFollowAdvertiserMutation, useUnfollowAdvertiserMutation } from './Advertisers.queries'

type Params = {
  selectedRows: AdvertiserQL.Advertiser[]
  setSelectedRows: (rows: AdvertiserQL.Advertiser[]) => void
  setSelectedRowKeys: (keys: React.Key[]) => void
  refetchWithFilters: () => void
}

export function useAdvertiserFollowActions({
  selectedRows,
  setSelectedRows,
  setSelectedRowKeys,
  refetchWithFilters,
}: Params) {
  const { t } = useTranslation('common')
  const notification = useNotification()

  const [followAdvertiser, { error: followAdvertiserError }] = useFollowAdvertiserMutation()
  const [unfollowAdvertiser, { error: unfollowAdvertiserError }] = useUnfollowAdvertiserMutation()

  const handleFollowAll = () => {
    const advertiserIds = selectedRows.filter(r => !r.isFollowing).map(r => String(r.advertiserId))

    if (advertiserIds.length === 0) return

    followAdvertiser({
      variables: { input: { advertiserId: advertiserIds } },
      errorPolicy: 'all',
    }).then(response => {
      if (!response.errors) {
        notification.success(response.data?.followAdvertiser?.message as string)
        setSelectedRows([])
        setSelectedRowKeys([])
        refetchWithFilters()
      }
    })
  }

  const handleUnfollowAll = () => {
    const advertiserIds = selectedRows.filter(r => r.isFollowing).map(r => String(r.advertiserId))

    if (advertiserIds.length === 0) return

    unfollowAdvertiser({
      variables: { input: { advertiserId: advertiserIds } },
      errorPolicy: 'all',
    }).then(response => {
      if (!response.errors) {
        notification.success(response.data?.unfollowAdvertiser?.message as string)
        setSelectedRows([])
        setSelectedRowKeys([])
        refetchWithFilters()
      }
    })
  }

  const handleToggleFollow = (record: AdvertiserQL.Advertiser) => {
    const vars = {
      input: { advertiserId: [String(record.advertiserId)] },
    }
    const exec = record.isFollowing ? unfollowAdvertiser : followAdvertiser

    exec({ variables: vars, errorPolicy: 'all' }).then(response => {
      if (!response.errors) {
        notification.success(t('successfullyUpdated'))
        refetchWithFilters()
      }
    })
  }

  useEffect(() => {
    if (followAdvertiserError) {
      notification.error(followAdvertiserError.message)
    }
  }, [followAdvertiserError])

  useEffect(() => {
    if (unfollowAdvertiserError) {
      notification.error(unfollowAdvertiserError.message)
    }
  }, [unfollowAdvertiserError])

  return {
    handleFollowAll,
    handleUnfollowAll,
    handleToggleFollow,
  }
}
