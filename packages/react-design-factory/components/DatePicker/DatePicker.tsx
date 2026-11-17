import React from 'react'
import AntdDatePicker from 'antd/es/date-picker'
import CloseOutlinedIcon from '@ant-design/icons/CloseOutlined'
import { Text } from '../..'
import type { DatePickerProps } from './DatePicker.d'
import * as Styled from './DatePicker.styled'

const DatePicker = ({
  id,
  value,
  defaultValue,
  minDate,
  maxDate,
  picker,
  format = 'DD-MMM-YYYY',
  placeholder = '-',
  disabled,
  status,
  showNow = false,
  onBlur,
  onChange,
  label,
  required,
  allowClear = false,
  helperMessage,
  warningMessage,
  errorMessage,
}: DatePickerProps) => {
  return (
    <Styled.DatePickerWrapper>
      {label && (
        <Text.Label {...(id && { htmlFor: id })}>
          {label}
          {required && <Text.Label status='error'> *</Text.Label>}
        </Text.Label>
      )}

      <AntdDatePicker
        id={id}
        required={required}
        value={value}
        defaultValue={defaultValue}
        minDate={minDate}
        maxDate={maxDate}
        picker={picker}
        format={format}
        placeholder={placeholder}
        disabled={disabled}
        status={status}
        allowClear={allowClear ? { clearIcon: <CloseOutlinedIcon /> } : false}
        showNow={showNow}
        onChange={onChange}
        onBlur={onBlur}
      />

      {helperMessage && <Text.Helper status='helper'>{helperMessage}</Text.Helper>}
      {warningMessage && <Text.Helper status='warning'>{warningMessage}</Text.Helper>}
      {errorMessage && <Text.Helper status='error'>{errorMessage}</Text.Helper>}
    </Styled.DatePickerWrapper>
  )
}

export default DatePicker
