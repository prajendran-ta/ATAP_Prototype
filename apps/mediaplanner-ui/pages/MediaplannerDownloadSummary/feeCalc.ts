import type { MockFee } from '../MediaplannerProductSettings/mockSalesforcePlans'

/**
 * Compute a fee's total value for the Media Plan document.
 *
 * Rules (against total spend + term months):
 *  - PERCENTAGE_FEE  = (ratePct / 100) × totalSpend
 *  - FIXED_RECURRING = amount × termMonths
 *  - ONE_TIME_SETUP  = amount
 *  - THRESHOLD       = amount
 */
export function computeFeeValue(fee: MockFee, totalSpend: number, termMonths: number): number {
  switch (fee.chargeType) {
    case 'PERCENTAGE_FEE':
      return ((fee.ratePct ?? 0) / 100) * totalSpend
    case 'FIXED_RECURRING':
      return (fee.amount ?? 0) * termMonths
    case 'ONE_TIME_SETUP':
      return fee.amount ?? 0
    case 'THRESHOLD':
      return fee.amount ?? 0
    default:
      return 0
  }
}
