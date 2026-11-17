import dayjs, { Dayjs } from 'dayjs'
import { parseNumber } from '@amadeus/react-utils'

export const startDateValidator = (isDatesDisabled: boolean) => (_: unknown, value: Dayjs | null) => {
  if (!value || isDatesDisabled) return Promise.resolve()
  if (value.isBefore(dayjs().add(1, 'day'), 'day')) {
    return Promise.reject(new Error('Start date must be a future date starting from tomorrow.'))
  }
  return Promise.resolve()
}

export const endDateValidator =
  (isDatesDisabled: boolean, getStartDate: () => Dayjs | null) => (_: unknown, value: Dayjs | null) => {
    if (!value || isDatesDisabled) return Promise.resolve()
    const start = getStartDate()
    if (start && !value.isAfter(start, 'day')) {
      return Promise.reject(new Error('End date must be after the start date.'))
    }
    return Promise.resolve()
  }

export const alphanumericDotValidator = (_: unknown, value: string) => {
  if (!value) return Promise.resolve()
  if (!/^[a-zA-Z0-9 _\-\.]*$/.test(value)) {
    return Promise.reject(new Error('Alphanumeric (no accents), space, "_" "-" ".") only'))
  }
  return Promise.resolve()
}

export const maxCharsValidator = (_: unknown, value: string) => {
  if ((value?.length ?? 0) >= 100) return Promise.reject(new Error('Limited to 100 characters'))
  return Promise.resolve()
}

export const currencyAmountValidator = (_: unknown, value: string | number) => {
  if (value === undefined || value === null || value === '') return Promise.resolve()
  const num = typeof value === 'number' ? value : parseNumber(String(value))
  if (!Number.isFinite(num) || num < 0) {
    return Promise.reject(new Error('Only positive numbers are allowed'))
  }
  if (num > 100_000_000) {
    return Promise.reject(new Error('Value cannot exceed 100,000,000'))
  }
  if (num % 1 !== 0) {
    return Promise.reject(new Error('Whole numbers only'))
  }
  return Promise.resolve()
}

export const percentageValidator = (_: unknown, value: string | number) => {
  if (value === undefined || value === null || value === '') return Promise.resolve()
  const num = typeof value === 'number' ? value : parseNumber(String(value))
  if (!Number.isFinite(num)) {
    return Promise.reject(new Error('Whole numbers only'))
  }
  const decimalPart = String(num).split('.')[1] ?? ''
  if (decimalPart.length > 2) {
    return Promise.reject(new Error('Up to 2 decimal places allowed'))
  }
  if (num < 0 || num > 100) {
    return Promise.reject(new Error('Percentage must be between 0 and 100'))
  }
  return Promise.resolve()
}

// ---------------------------------------------------------------------------
// Field rule sets — Advertiser Information
// ---------------------------------------------------------------------------

export const advertiserRules = [{ required: true, message: 'Please select an advertiser' }]

export const regionRules = [{ required: true, message: 'Please select a region' }]

export const salesforceIdRules = [
  { required: true, message: 'Please enter the Salesforce Opportunity ID' },
  { validator: alphanumericDotValidator },
  { warningOnly: true, validator: maxCharsValidator },
]

export const proposalIdRules = [
  { required: true, message: 'Please enter the Proposal ID' },
  { validator: alphanumericDotValidator },
  { warningOnly: true, validator: maxCharsValidator },
]

export const currencyRules = [{ required: true, message: 'Please select a currency' }]

export const breakdownRules = [{ required: true, message: 'Please select a breakdown' }]

export const planTypeRules = [{ required: true, message: 'Please select a plan type' }]

// ---------------------------------------------------------------------------
// Field rule sets — Plan Information
// ---------------------------------------------------------------------------

export const contractBudgetTargetRules = [{ validator: currencyAmountValidator }]

export const contractProfitTargetRules = [{ validator: percentageValidator }]

export const startDateRules = (isDatesDisabled: boolean) => [
  { required: true, message: 'Please select a start date' },
  { validator: startDateValidator(isDatesDisabled) },
]

export const endDateRules = (isDatesDisabled: boolean, getStartDate: () => Dayjs | null) => [
  { required: true, message: 'Please select an end date' },
  { validator: endDateValidator(isDatesDisabled, getStartDate) },
]

export const planNameRules = [
  { required: true, message: 'Please enter the Plan Name' },
  { validator: alphanumericDotValidator },
  { warningOnly: true, validator: maxCharsValidator },
]

export const statusRules = [{ required: true, message: 'Please select a status' }]

// ---------------------------------------------------------------------------
// Field rule sets — Price Settings
// ---------------------------------------------------------------------------

export const managementFeeRules = [
  { required: true, message: 'Please enter the Management Fee' },
  { validator: percentageValidator },
]

export const setupFeeRules = [{ validator: currencyAmountValidator }]

export const metasearchSetupFeeRules = [{ validator: currencyAmountValidator }]

export const metasearchConnectivityFeeRules = [{ validator: currencyAmountValidator }]

export const creativeFeeRules = [{ validator: currencyAmountValidator }]

export const videoCreativeFeeRules = [{ validator: currencyAmountValidator }]
