import React from 'react'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { Icon, Text, colors } from '@amadeus/react-design-factory'
import { OptionWrapper } from './LanguageSelectorOption.styled'

interface LanguageSelectorOptionProps {
  langCode: string
  label: string
}

const LanguageSelectorOption: React.FC<LanguageSelectorOptionProps> = ({ langCode, label }) => {
  const { i18n } = useTranslation()
  const isActive = i18n.language === langCode

  const handleClick = async () => {
    await i18n.changeLanguage(langCode)
    dayjs.locale(langCode)
    localStorage.setItem('mh-language', langCode)
  }

  return (
    <OptionWrapper onClick={handleClick}>
      <Text.Label>{label}</Text.Label>
      {isActive && <Icon name='checkCircle' width={16} height={16} color={colors.sky_60} />}
    </OptionWrapper>
  )
}

export default LanguageSelectorOption
