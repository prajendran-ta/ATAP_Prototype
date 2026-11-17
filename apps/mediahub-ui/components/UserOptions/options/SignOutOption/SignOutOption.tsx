import React from 'react'
import { useTranslation } from 'react-i18next'
import { Icon, Text, colors } from '@amadeus/react-design-factory'
import { logout } from '@mediahub/mediahub-ui/api'
import { OptionWrapper } from './SignOutOption.styled'

const SignOutOption: React.FC = () => {
  const { t } = useTranslation('common')

  const handleSignOff = async () => {
    await logout()
    document.cookie.split(';').forEach(cookie => {
      const name = cookie.split('=')[0].trim()
      document.cookie = `${name}=`
    })
    window.location.href = '/login'
  }

  return (
    <OptionWrapper onClick={handleSignOff}>
      <Text.Label>{t('signOut')}</Text.Label>

      <Icon name='signOut' width={16} height={16} color={colors.cloud_100} />
    </OptionWrapper>
  )
}

export default SignOutOption
