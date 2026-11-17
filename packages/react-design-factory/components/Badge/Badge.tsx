import React from 'react'
import { Badge as StyledBadge, StyledLabel } from './Badge.styled'
import { CloseButton } from './Badge.styled'
import type { BadgeProps } from './Badge.d'

const Badge: React.FC<BadgeProps> = ({ label, content, color, icon, style, className, onRemove, closeIcon = '×' }) => {
  return (
    <StyledBadge color={color} style={style} className={className}>
      {icon}
      {label && content ? (
        <>
          <StyledLabel>{label}:</StyledLabel>&nbsp;<span>{content}</span>
        </>
      ) : (
        <>{content}</>
      )}

      {onRemove && (
        <CloseButton
          type='button'
          onClick={onRemove}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onRemove()
            }
          }}
        >
          {closeIcon}
        </CloseButton>
      )}
    </StyledBadge>
  )
}

export default Badge
