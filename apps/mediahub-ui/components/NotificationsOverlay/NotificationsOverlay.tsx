import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Drawer from '@amadeus/react-design-factory/components/Drawer/Drawer'
import { Notifications } from '@mediahub/mediahub-ui/components/Notifications'
import { ContentWrapper, DrawerTitle, BellWithBadge } from './NotificationsOverlay.styled'
import { Button, colors } from '@amadeus/react-design-factory'
import { useNotificationGroups } from '../Notifications/Notifications.queries'

const NotificationsOverlayInner: React.FC = () => {
  const { t } = useTranslation(['notifications', 'common'])
  const { totalNotifications } = useNotificationGroups()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <BellWithBadge
        iconName='bell'
        count={totalNotifications}
        onClick={() => setIsOpen(true)}
        color={colors.sky_90}
        height={20}
        width={20}
      />

      <Drawer
        title={
          <DrawerTitle>
            <span>{t('notifications:drawerTitle')}</span>
            <Button variant='link' href='/notifications'>
              {t('common:viewAll')}
            </Button>
          </DrawerTitle>
        }
        width={'25vw'}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <ContentWrapper>
          <Notifications />
        </ContentWrapper>
      </Drawer>
    </>
  )
}

const NotificationsOverlay: React.FC = () => {
  return <NotificationsOverlayInner />
}

export default NotificationsOverlay
