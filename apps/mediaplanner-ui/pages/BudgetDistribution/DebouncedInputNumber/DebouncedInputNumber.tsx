import React, { FC, useEffect, useState, useRef, useCallback } from 'react'
import { Form, Input } from '@amadeus/react-design-factory'
import { formatCurrency } from '../../utils/number'
import type { DebouncedInputNumberProps } from '../BudgetDistribution.d'

const stripCurrencySymbol = (formattedValue: string) =>
  formattedValue
    .replace(/^(-?)\s*[^\d-]+/, '$1')
    .replace(/\s*[^\d.,\s]+\s*$/, '')
    .trim()

// Converts raw locale-formatted user input to JS number format ("." as decimal, no group separators)
const normalizeToJsFormat = (value: string): string => {
  const parts = new Intl.NumberFormat(navigator.language).formatToParts(1111.1)
  const groupSep = parts.find(p => p.type === 'group')?.value ?? ','
  const decSep = parts.find(p => p.type === 'decimal')?.value ?? '.'
  const stripped = value.replace(/[\s$€£¥]/g, '')
  const withoutGroups = stripped.split(groupSep).join('')
  return decSep !== '.' ? withoutGroups.replace(decSep, '.') : withoutGroups
}

const isDecimalDraft = (value: string) => value.endsWith('.')
const hasMoreThanTwoDecimals = (value: string) => {
  const decimalPart = value.split('.')[1]
  return Boolean(decimalPart && decimalPart.length > 2)
}

// Inserts locale group separators into a string of integer digits
const addGroupSeparators = (intDigits: string, groupSep: string): string => {
  const len = intDigits.length
  let result = ''
  for (let i = 0; i < len; i++) {
    if (i > 0 && (len - i) % 3 === 0) result += groupSep
    result += intDigits[i]
  }
  return result
}

// Formats a JS-normalised value ("1500.75") into a locale display string ("1,500.75" en-US / "1.500,75" de-DE)
const formatForDisplay = (jsNormalized: string): string => {
  if (!jsNormalized || jsNormalized === '-') return jsNormalized
  const parts = new Intl.NumberFormat(navigator.language).formatToParts(1111.1)
  const groupSep = parts.find(p => p.type === 'group')?.value ?? ','
  const decSep = parts.find(p => p.type === 'decimal')?.value ?? '.'
  const isNeg = jsNormalized.startsWith('-')
  const abs = isNeg ? jsNormalized.slice(1) : jsNormalized
  const dotIdx = abs.indexOf('.')
  const intDigits = dotIdx === -1 ? abs : abs.slice(0, dotIdx)
  const decStr = dotIdx === -1 ? '' : abs.slice(dotIdx + 1)
  const formattedInt = intDigits ? addGroupSeparators(intDigits, groupSep) : ''
  const prefix = isNeg ? '-' : ''
  return dotIdx === -1 ? prefix + formattedInt : prefix + formattedInt + decSep + decStr
}

// Number of digit characters before a cursor position in a string
const digitsBeforeCursor = (value: string, cursorPos: number): number =>
  (value.slice(0, cursorPos).match(/\d/g) ?? []).length

// Position (index) in a formatted string after N digit characters
const posAfterNDigits = (formatted: string, n: number): number => {
  let count = 0
  for (let i = 0; i < formatted.length; i++) {
    if (/\d/.test(formatted[i])) {
      count++
      if (count === n) return i + 1
    }
  }
  return formatted.length
}

// Computes the new cursor position in displayValue that corresponds to cursorPos in nextRaw.
// Handles both integer part (tracks digit count) and decimal part (tracks decimal-digit offset)
// so that typing the decimal separator "," or "." never pushes the caret to the left.
const getNewCursorPos = (nextRaw: string, cursorPos: number, displayValue: string): number => {
  const parts = new Intl.NumberFormat(navigator.language).formatToParts(1111.1)
  const decSep = parts.find(p => p.type === 'decimal')?.value ?? '.'
  const rawDecIdx = nextRaw.indexOf(decSep)

  if (rawDecIdx !== -1 && cursorPos > rawDecIdx) {
    // Cursor is after the decimal separator — preserve decimal-digit offset
    const displayDecIdx = displayValue.indexOf(decSep)
    if (displayDecIdx === -1) return displayValue.length
    const decDigits = digitsBeforeCursor(
      nextRaw.slice(rawDecIdx + decSep.length),
      cursorPos - rawDecIdx - decSep.length,
    )
    return displayDecIdx + decSep.length + decDigits
  }

  // Cursor is in the integer part — preserve digit count
  return posAfterNDigits(displayValue, digitsBeforeCursor(nextRaw, cursorPos))
}

export const DebouncedInputNumber: FC<DebouncedInputNumberProps> = ({
  name,
  id,
  value,
  formatAsCurrency,
  currency,
  rules,
  disabled,
  precision,
  onChange,
  delay = 400,
}) => {
  const formInstance = Form.useFormInstance()
  // Ref is updated synchronously so getValueProps always reads the latest raw input value,
  // even when Ant Design's setFieldValue triggers Form.Item to re-render before React
  // commits the corresponding useState update.
  const inputValueRef = useRef<string>('')
  const [isFocused, setIsFocused] = useState(false)
  void delay

  useEffect(() => {
    if (!name) return
    const current = formInstance.getFieldValue(name)
    if (typeof current === 'string' && (isDecimalDraft(current) || hasMoreThanTwoDecimals(current))) return
    if (current !== value) {
      formInstance.setFieldValue(name, value)
    }
  }, [formInstance, name, value])

  const getValueProps = useCallback((currentValue: string | number | undefined) => {
    // While focused, return the ref value — always current because the ref is written
    // synchronously in onChange before setFieldValue triggers this callback.
    if (isFocused) return { value: inputValueRef.current }

    const rawValue = currentValue === undefined || currentValue === null ? '' : String(currentValue)

    if (!formatAsCurrency || !currency) {
      const formatted = Number.isFinite(parseFloat(rawValue)) ? formatForDisplay(rawValue) : rawValue
      return { value: formatted }
    }

    if (isDecimalDraft(rawValue) || hasMoreThanTwoDecimals(rawValue)) return { value: rawValue }

    const numericValue = parseFloat(rawValue)
    if (!Number.isFinite(numericValue)) return { value: rawValue }

    const fractionDigits = precision === 0 ? { min: 0, max: 0 } : { min: 0, max: 2 }
    return { value: stripCurrencySymbol(formatCurrency(numericValue, currency, fractionDigits)) }
  }, [formatAsCurrency, currency, isFocused])

  const handleFocus = useCallback(() => {
    if (name) {
      const stored = formInstance.getFieldValue(name)
      const jsValue = stored === undefined || stored === null ? '' : String(stored)
      inputValueRef.current = formatForDisplay(jsValue)
    }
    setIsFocused(true)
  }, [name, formInstance])

  return (
    <Form.Item
      name={name}
      rules={rules}
      validateTrigger='onChange'
      preserve={false}
      getValueProps={getValueProps}
    >
      <Input
        id={id}
        value={name ? undefined : (value === undefined || value === null ? '' : String(value))}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={() => setIsFocused(false)}
        onChange={event => {
          const input = event.target as HTMLInputElement
          const cursorPos = input.selectionStart ?? input.value.length
          const nextRaw = input.value

          const normalized = normalizeToJsFormat(nextRaw)
          const displayValue = formatForDisplay(normalized)

          // Write ref synchronously before setFieldValue triggers getValueProps
          inputValueRef.current = displayValue
          if (name) formInstance.setFieldValue(name, normalized)

          // Restore cursor after React re-renders with new formatted value
          requestAnimationFrame(() => {
            input.setSelectionRange(
              getNewCursorPos(nextRaw, cursorPos, displayValue),
              getNewCursorPos(nextRaw, cursorPos, displayValue),
            )
          })

          if (normalized === '') { onChange(0); return }
          if (precision === 0) {
            if (normalized.includes('.')) return
          } else {
            if (isDecimalDraft(normalized)) return
            if (hasMoreThanTwoDecimals(normalized)) return
          }

          const next = parseFloat(normalized)
          if (!Number.isFinite(next)) return
          if (value !== undefined && value !== null && Number(value) === next) return

          onChange(next)
        }}
      />
    </Form.Item>
  )
}
