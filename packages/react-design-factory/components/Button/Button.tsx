import React from 'react'
import type { ButtonProps } from './Button.d'
import * as Styled from './Button.styled'

const Button: React.FC<ButtonProps> = ({
  id,
  children,
  htmlType = 'button',
  variant = 'solid',
  color = 'primary',
  icon,
  disabled,
  loading,
  size,
  title,
  href,
  onClick,
}) => {
  return (
    <Styled.Button
      id={id}
      htmlType={htmlType}
      color={color}
      variant={variant}
      disabled={disabled}
      loading={loading}
      title={title}
      size={size}
      href={href}
      onClick={onClick}
      icon={icon}
    >
      {children}
    </Styled.Button>
  )
}

export default Button