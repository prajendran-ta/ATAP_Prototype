import React, { useEffect, useMemo, useState } from 'react'
import { Modal, Button, Text } from '@amadeus/react-design-factory'
import { useNavigate } from 'react-router'
import { useGetAdvertisersFollowingTotalQuery } from '@mediahub/advertisers-ui/pages/Advertisers/Advertisers.queries'
import { useGetWelcomeModal, useIgnoreWelcomeModal } from './WelcomeModal.queries'

const WelcomeModal: React.FC = () => {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const [ignoreWelcomeModal] = useIgnoreWelcomeModal()

  const { data: AdvData, loading: AdvLoading, error: AdvError } = useGetAdvertisersFollowingTotalQuery()
  const { data: wmData, loading: wmLoading, error: wmError, refetch: refetchWelcomeModal } = useGetWelcomeModal()

  const followingTotal = AdvData?.advertisers?.toggle?.totalFollowing ?? 0
  const isIgnored = wmData?.getWelcomeModal?.status === true

  const hasLoginSuccess = useMemo(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('login') === 'success'
  }, [])

  const removeLoginParam = () => {
    const currentParams = new URLSearchParams(window.location.search)
    currentParams.delete('login')
    const newQuery = currentParams.toString()
    const newUrl = newQuery ? `/?${newQuery}` : '/'
    window.history.replaceState({}, document.title, newUrl)
  }

  useEffect(() => {
    const canShow =
      hasLoginSuccess && !AdvLoading && !AdvError && !wmLoading && !wmError && followingTotal === 0 && !isIgnored

    setIsVisible(canShow)
  }, [hasLoginSuccess, AdvLoading, AdvError, followingTotal, wmLoading, wmError, isIgnored])

  const onIgnore = async () => {
    try {
      await ignoreWelcomeModal({})
      await refetchWelcomeModal()
    } catch {
      // API errors are non-critical; cleanup is guaranteed via finally
    } finally {
      onClose()
    }
  }

  const onClose = () => {
    setIsVisible(false)
    removeLoginParam()
  }

  const onGoAdvertisers = () => {
    removeLoginParam()
    navigate('/advertisers')
  }

  return (
    <Modal
      idPrefix='welcome-mediahub-modal'
      title={<Text.H3>Welcome to Media Hub</Text.H3>}
      open={isVisible}
      onCancel={onClose}
      width={500}
      centered
      footer={
        <>
          <Button variant='outlined' onClick={onIgnore}>
            Ignore
          </Button>
          <Button onClick={onGoAdvertisers}>Go to Advertiser</Button>
        </>
      }
    >
      <Text.Body style={{ marginTop: 20 }}>
        To personalize your experience, we recommend following advertisers that you manage.
      </Text.Body>
      <Text.Body style={{ marginTop: 10 }}>
        This helps us tailor every screen to your preferences — making your journey smoother, smarter, and more
        relevant.
      </Text.Body>
      <Text.Body style={{ margin: '12px 0px 10px 0px' }}>👉 Start by selecting the advertisers.</Text.Body>
    </Modal>
  )
}

export default WelcomeModal
