import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import AntdSelect, { DefaultOptionType } from 'antd/es/select'
import Checkbox from 'antd/es/checkbox'
import CloseOutlinedIcon from '@ant-design/icons/CloseOutlined'
import { Text } from '../..'
import type { SelectProps } from './Select.d'
import * as Styled from './Select.styled'

function Select<T = string | number>({
  id,
  mode,
  options = [],
  value,
  defaultValue,
  showSearch = true,
  placeholder,
  notFoundContent,
  disabled = false,
  loading = false,
  maxCount,
  popupMatchSelectWidth,
  onChange,
  onBlur,
  label,
  required = false,
  withBadges = false,
  allowClear = false,
  searchBy = 'label',
  helperMessage,
  warningMessage,
  errorMessage,
  onSearch,
  onPopupScroll,
  filterMode = 'client',
  status,
}: SelectProps<T>) {
  const { t } = useTranslation('design-system')
  const [selectedOptions, setSelectedOptions] = useState<DefaultOptionType[]>([])
  const [selectorWidth, setSelectorWidth] = useState(0)
  const [selectionFont, setSelectionFont] = useState('')
  const selectWrapperRef = useRef<HTMLDivElement>(null)
  const textMeasureCanvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const values = value ?? defaultValue
    if (values && options.length) {
      const selectedValues: T[] = Array.isArray(values) ? values : [values]
      const matchingOptions = selectedValues
        .map(val => options.find(option => option.value === val))
        .filter(Boolean) as DefaultOptionType[]
      setSelectedOptions(matchingOptions)
    }
  }, [defaultValue, value, options])

  useEffect(() => {
    const wrapper = selectWrapperRef.current
    if (!wrapper || typeof ResizeObserver === 'undefined') {
      return
    }

    const selector = wrapper.querySelector('.amadeus-select-selector') as HTMLElement | null
    if (!selector) {
      return
    }

    const updateMeasurements = () => {
      setSelectorWidth(selector.clientWidth)
      const selectionItem = wrapper.querySelector('.amadeus-select-selection-item') as HTMLElement | null
      const computedStyle = window.getComputedStyle(selectionItem ?? selector)
      setSelectionFont(`${computedStyle.fontWeight} ${computedStyle.fontSize} ${computedStyle.fontFamily}`)
    }

    updateMeasurements()

    const resizeObserver = new ResizeObserver(updateMeasurements)
    resizeObserver.observe(selector)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  const measureTextWidth = (text: string): number => {
    if (!text) {
      return 0
    }

    if (!textMeasureCanvasRef.current) {
      textMeasureCanvasRef.current = document.createElement('canvas')
    }

    const context = textMeasureCanvasRef.current.getContext('2d')!
    context.font = selectionFont || window.getComputedStyle(document.body).font
    return context.measureText(text).width
  }

  const getAbbreviatedLabel = (labelText: string, countText: string): string => {
    if (!labelText) {
      return ''
    }

    const ellipsis = '...'

    if (!selectorWidth) {
      return labelText.length > 8 ? `${labelText.substring(0, 8)}${ellipsis}` : labelText
    }

    // Reserve space for count text, clear icon and horizontal paddings.
    const reservedWidth = 56
    const maxLabelWidth = Math.max(selectorWidth - measureTextWidth(countText) - reservedWidth, 24)

    if (measureTextWidth(labelText) <= maxLabelWidth) {
      return labelText
    }

    const ellipsisWidth = measureTextWidth(ellipsis)
    if (ellipsisWidth >= maxLabelWidth) {
      return ellipsis
    }

    for (let i = labelText.length; i > 0; i--) {
      const candidate = `${labelText.slice(0, i)}${ellipsis}`
      if (measureTextWidth(candidate) <= maxLabelWidth) {
        return candidate
      }
    }

    return ellipsis
  }

  const onSelectChanged = (value: T, option?: DefaultOptionType | DefaultOptionType[] | undefined) => {
    if (Array.isArray(option)) {
      setSelectedOptions(option)
    } else if (option) {
      setSelectedOptions([option])
    } else {
      setSelectedOptions([])
    }
    onChange?.(value, option)
  }

  const onBlurHandling = () => {
    if (mode === 'multiple') {
      const selectedValues = selectedOptions.map(option => option.value)
      onBlur?.(selectedValues as T, selectedOptions)
    } else {
      onBlur?.(selectedOptions[0]?.value as T, selectedOptions[0])
    }
  }

  const onSelectCleared = () => {
    const clearedValue = (mode ? [] : null) as T
    onChange?.(clearedValue)
  }

  const renderTags = ({ label, value }: DefaultOptionType): React.ReactElement => {
    const labelTitle = typeof label === 'string' || typeof label === 'number' ? String(label) : undefined

    if (selectedOptions.length === 1 && selectedOptions[0].value === value) {
      const labelStr = typeof label === 'string' ? label : String(label)
      const abbreviatedLabel = getAbbreviatedLabel(labelStr, '')
      return <Styled.OptionLabel title={labelTitle}>{abbreviatedLabel}</Styled.OptionLabel>
    } else if (selectedOptions.length > 1 && selectedOptions[0].value === value) {
      const labelStr = typeof label === 'string' ? label : String(label)
      const countText = t('select.othersOverflow', { count: selectedOptions.length - 1 })
      const abbreviatedLabel = getAbbreviatedLabel(labelStr, countText)

      return (
        <Styled.TagSummary>
          <Styled.OptionLabel title={labelTitle}>{abbreviatedLabel}</Styled.OptionLabel>
          <Styled.TagCount>{countText}</Styled.TagCount>
        </Styled.TagSummary>
      )
    } else {
      return <></>
    }
  }

  const optionRender = (option: DefaultOptionType) => {
    const isOptionExist = options.some(({ value }) => value === option.value)
    const isOptionSelected = selectedOptions.some(({ value }) => value === option.value)
    return (
      <Styled.OptionContainer disabled={option.disabled} {...(id && { id: `${id}-${option.value}-option` })}>
        {mode && <Checkbox checked={isOptionSelected || !isOptionExist} disabled={option.disabled} />}
        {option.label}
      </Styled.OptionContainer>
    )
  }

  const getFilterOption = !showSearch ? false : (input: string, option?: DefaultOptionType) => {
    if (!option) return false

    const inputText = input.toLowerCase()
    const labelText = (option.label as string)?.toLowerCase()
    const valueText = String(option.value).toLowerCase()

    switch (searchBy) {
      case 'label':
        return labelText?.includes(inputText) ?? false
      case 'value':
        return valueText.includes(inputText)
      case 'both':
      default:
        return (labelText?.includes(inputText) ?? false) || valueText.includes(inputText)
    }
  }

  return (
    <Styled.SelectWrapper ref={selectWrapperRef} allowClear={allowClear} withBadges={withBadges}>
      {label && (
        <Text.Label {...(id && { htmlFor: id })}>
          {label}
          {required && <Text.Label status='error'> *</Text.Label>}
        </Text.Label>
      )}

      <AntdSelect<T, DefaultOptionType>
        id={id}
        mode={mode}
        options={options}
        popupMatchSelectWidth={popupMatchSelectWidth}
        value={value}
        defaultValue={defaultValue}
        showSearch={showSearch}
        onSearch={onSearch}
        filterOption={filterMode === 'server' ? false : getFilterOption}
        placeholder={<Text.Placeholder>{placeholder ?? t('select.placeholder')}</Text.Placeholder>}
        notFoundContent={notFoundContent}
        disabled={disabled}
        loading={loading}
        maxCount={maxCount}
        onChange={onSelectChanged}
        status={status}
        suffixIcon={loading ? undefined : <Styled.SuffixIcon name={'caretDown'} width={16} height={16} />}
        onBlur={onBlur ? onBlurHandling : undefined}
        onPopupScroll={onPopupScroll}
        optionRender={mode ? optionRender : undefined}
        menuItemSelectedIcon={false}
        allowClear={allowClear ? { clearIcon: <CloseOutlinedIcon /> } : undefined}
        onClear={onSelectCleared}
        tagRender={withBadges ? undefined : renderTags}
      />

      {helperMessage && <Text.Helper status='helper'>{helperMessage}</Text.Helper>}
      {warningMessage && <Text.Helper status='warning'>{warningMessage}</Text.Helper>}
      {errorMessage && <Text.Helper status='error'>{errorMessage}</Text.Helper>}
    </Styled.SelectWrapper>
  )
}

export default Select
