import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon, Text } from '../..'
import { SearchProps } from './Search.d'
import * as Styled from './Search.styled'

const Search: FC<SearchProps> = ({ id, placeholder, onSearch }) => {
  const { t } = useTranslation('design-system')

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch?.(event?.target?.value.trim().toLowerCase())
  }

  return (
    <Styled.SearchWrapper>
      <Text.Label htmlFor={id}>{t('search.label')}</Text.Label>
      <Styled.SearchInput id={id} prefix={<Icon name='search' />} placeholder={placeholder} onChange={handleSearch} />
    </Styled.SearchWrapper>
  )
}

export default Search
