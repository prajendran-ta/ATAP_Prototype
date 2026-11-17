import React from 'react'

export interface FooterProps {
  FooterIcon?: React.FC<SVGProps>
  BottomElementFooter?: React.ReactNode
  footerCopy?: string
  collapsed?: boolean
  versionLabel?: string
  left?: string
}
