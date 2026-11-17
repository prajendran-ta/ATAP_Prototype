import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import AntdInputNumber from 'antd/es/input-number'
import { formatNumber, parseNumber } from '@amadeus/react-utils'
import { InputAffix, Text } from '../..'
import type { InputNumberProps } from './InputNumber.d'
import * as Styled from './InputNumber.styled'

const InputNumber: FC<InputNumberProps> = ({
  id,
  value,
  defaultValue,
  min,
  max,
  step,
  placeholder = '-',
  disabled,
  status,
  formatter,
  parser,
  onBlur,
  onChange,
  onPressEnter,
  label,
  required,
  affixBefore,
  affixAfter,
  helperMessage,
  warningMessage,
  errorMessage,
}) => {
  useTranslation()
  return (
    <Styled.InputNumberWrapper>
      {label && (
        <Text.Label {...(id && { htmlFor: id })}>
          {label}
          {required && <Text.Label status='error'> *</Text.Label>}
        </Text.Label>
      )}

      <InputAffix before={affixBefore} after={affixAfter}>
        <AntdInputNumber
          id={id}
          value={value}
          defaultValue={defaultValue}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          status={status}
          onBlur={onBlur}
          onChange={onChange}
          onPressEnter={onPressEnter}
          formatter={(value, info) => {
            if (!value && value !== 0) return ''
            const custom = formatter?.(value, info)
            if (custom && custom !== 'NaN') return custom
            const num = typeof value === 'number' ? value : parseNumber(String(value))
            return Number.isFinite(num) ? formatNumber(num) : String(value)
          }}
          parser={(value) => parser ? parser(value) : parseNumber(String(value ?? ''))}
        />
      </InputAffix>

      {helperMessage && <Text.Helper status='helper'>{helperMessage}</Text.Helper>}
      {warningMessage && <Text.Helper status='warning'>{warningMessage}</Text.Helper>}
      {errorMessage && <Text.Helper status='error'>{errorMessage}</Text.Helper>}
    </Styled.InputNumberWrapper>
  )
}

export default InputNumber
