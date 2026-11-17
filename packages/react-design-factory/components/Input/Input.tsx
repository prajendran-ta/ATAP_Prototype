import React, { FC } from 'react'
import AntdInput from 'antd/es/input/Input'
import { Text, InputAffix } from '../..'
import { type InputProps } from './Input.d'
import * as Styled from './Input.styled'

const Input: FC<InputProps> = ({
  id,
  value,
  defaultValue,
  placeholder = '-',
  disabled,
  status,
  onBlur,
  onFocus,
  onChange,
  onKeyDown,
  onPressEnter,
  prefix,
  label,
  required,
  affixBefore,
  affixAfter,
  helperMessage,
  warningMessage,
  errorMessage,
  maxLength,
}) => {
  return (
    <Styled.InputWrapper>
      {label && (
        <Text.Label {...(id && { htmlFor: id })}>
          {label}
          {required && <Text.Label status='error'> *</Text.Label>}
        </Text.Label>
      )}

      <InputAffix before={affixBefore} after={affixAfter}>
        <AntdInput
          id={id}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          status={status}
          onBlur={onBlur}
          onFocus={onFocus}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onPressEnter={onPressEnter}
          prefix={prefix}
          maxLength={maxLength}
        />
      </InputAffix>

      {helperMessage && <Text.Helper status='helper'>{helperMessage}</Text.Helper>}
      {warningMessage && <Text.Helper status='warning'>{warningMessage}</Text.Helper>}
      {errorMessage && <Text.Helper status='error'>{errorMessage}</Text.Helper>}
    </Styled.InputWrapper>
  )
}

export default Input
