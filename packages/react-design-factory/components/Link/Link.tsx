import React from 'react'
import ExportOutlined from '@ant-design/icons/ExportOutlined'
import DownOutlined from '@ant-design/icons/DownOutlined'
import type { LinkProps } from './Link.d'
import { StyledWrapper, StyledLink, IconWrapper } from './Link.styled'

const Link: React.FC<LinkProps> = ({
  id,
  children,
  disabled = false,
  href,
  iconAlone = false,
  size = 'default',
  linkIcon,
  ...rest
}) => {
  const renderIcon = () => {
    const iconElement =
      linkIcon === 'external' ? (
        <ExportOutlined />
      ) : linkIcon === 'chevron' ? (
        <DownOutlined />
      ) : React.isValidElement(linkIcon) ? (
        linkIcon
      ) : null

    return linkIcon ? <IconWrapper>{iconElement}</IconWrapper> : linkIcon
  }

  return (
    <StyledWrapper iconAlone={iconAlone}>
      <StyledLink
        id={id}
        iconAlone={iconAlone}
        size={size}
        disabled={disabled}
        href={disabled ? undefined : href}
        aria-disabled={disabled}
        {...rest}
      >
        {children} {renderIcon()}
      </StyledLink>
    </StyledWrapper>
  )
}

export default Link
