import type { CSSProperties, ReactNode } from 'react'

export interface BadgeProps {
  label?: ReactNode
  content?: ReactNode
  color?: string
  icon?: ReactNode
  style?: CSSProperties
  className?: string
  onRemove?: () => void
  removeButtonAriaLabel?: string
  closeIcon?: ReactNode
}
