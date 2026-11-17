import React, { FC } from 'react'
import { getStatusColor } from '../../utils'
import type { IconProps, LazySvgIconComponent } from './Icon.d'
import * as Styled from './Icon.styled'

/* Please register SVG icons in alphabetical order */
export const iconRegistry = {
  ad: () => import('../../assets/icons/ad.svg'),
  alarmSnooze: () => import('../../assets/icons/alarm-snooze.svg'),
  'arrow-left': () => import('../../assets/icons/arrow-to-left-line.svg'),
  arrowToLeftLine: () => import('../../assets/icons/arrow-to-left-line.svg'),
  arrowLeft: () => import('../../assets/icons/arrow-to-left-line.svg'),
  bell: () => import('../../assets/icons/bell.svg'),
  bellSolid: () => import('../../assets/icons/bell-solid.svg'),
  ban: () => import('../../assets/icons/ban.svg'),
  banSolid: () => import('../../assets/icons/ban-solid.svg'),
  'book-alt': () => import('../../assets/icons/book-alt.svg'),
  bookmark: () => import('../../assets/icons/bookmark.svg'),
  'bookmark-solid': () => import('../../assets/icons/bookmark-Solid.svg'),
  bookmarkSolid: () => import('../../assets/icons/bookmark-Solid.svg'),
  bookAlt: () => import('../../assets/icons/book-alt.svg'),
  caretDown: () => import('../../assets/icons/caret-down.svg'),
  caretDownSolid: () => import('../../assets/icons/caret-down-solid.svg'),
  caretRight: () => import('../../assets/icons/caret-right.svg'),
  caretRightSolid: () => import('../../assets/icons/caret-right-solid.svg'),
  chartBar: () => import('../../assets/icons/chart-bar.svg'),
  chartLine: () => import('../../assets/icons/chart-line.svg'),
  checkCircle: () => import('../../assets/icons/check-circle.svg'),
  checkCircleSolid: () => import('../../assets/icons/check-circle-solid.svg'),
  check: () => import('../../assets/icons/check.svg'),
  'clock-rotate-left': () => import('../../assets/icons/clock-rotate-left.svg'),
  clockRotateLeft: () => import('../../assets/icons/clock-rotate-left.svg'),
  chevronDown: () => import('../../assets/icons/chevron-down.svg'),
  chevronRight: () => import('../../assets/icons/chevron-right.svg'),
  clipboardListCheck: () => import('../../assets/icons/clipboard-list-check.svg'),
  clipboardListCheckSolid: () => import('../../assets/icons/clipboard-list-check-solid.svg'),
  copy: () => import('../../assets/icons/copy.svg'),
  crosshairs: () => import('../../assets/icons/crosshairs.svg'),
  database: () => import('../../assets/icons/database.svg'),
  download: () => import('../../assets/icons/download.svg'),
  ellipsisVertical: () => import('../../assets/icons/ellipsis-vertical.svg'),
  expand: () => import('../../assets/icons/expand.svg'),
  exclamationTriangle: () => import('../../assets/icons/exclamation-triangle.svg'),
  exclamationTriangleSolid: () => import('../../assets/icons/exclamation-triangle-solid.svg'),
  externalLink: () => import('../../assets/icons/external-link.svg'),
  fileInvoiceDollar: () => import('../../assets/icons/file-invoice-dollar.svg'),
  filter: () => import('../../assets/icons/filter.svg'),
  home: () => import('../../assets/icons/home.svg'),
  homeSolid: () => import('../../assets/icons/home-solid.svg'),
  infoCircle: () => import('../../assets/icons/info-circle.svg'),
  'message-plus': () => import('../../assets/icons/message-plus.svg'),
  messagePlus: () => import('../../assets/icons/message-plus.svg'),
  microphone: () => import('../../assets/icons/microphone.svg'),
  mobile: () => import('../../assets/icons/mobile.svg'),
  paperclip: () => import('../../assets/icons/paperclip.svg'),
  'paper-plane-top': () => import('../../assets/icons/paper-plane-top.svg'),
  paperPlaneTop: () => import('../../assets/icons/paper-plane-top.svg'),
  pauseCircle: () => import('../../assets/icons/pause-circle.svg'),
  pen: () => import('../../assets/icons/pen.svg'),
  plus: () => import('../../assets/icons/plus.svg'),
  refresh: () => import('../../assets/icons/refresh.svg'),
  search: () => import('../../assets/icons/search.svg'),
  share: () => import('../../assets/icons/share.svg'),
  signOut: () => import('../../assets/icons/sign-out.svg'),
  'sidebar-flip': () => import('../../assets/icons/sidebar-flip.svg'),
  sidebarFlip: () => import('../../assets/icons/sidebar-flip.svg'),
  slidersV: () => import('../../assets/icons/sliders-v.svg'),
  slidersVSolid: () => import('../../assets/icons/sliders-v-solid.svg'),
  sparkles: () => import('../../assets/icons/sparkles.svg'),
  square: () => import('../../assets/icons/square.svg'),
  'thumbs-down': () => import('../../assets/icons/thumbs-down.svg'),
  'thumbs-down-solid': () => import('../../assets/icons/thumbs-down-solid.svg'),
  thumbsDown: () => import('../../assets/icons/thumbs-down.svg'),
  thumbsDownSolid: () => import('../../assets/icons/thumbs-down-solid.svg'),
  'thumbs-up': () => import('../../assets/icons/thumbs-up.svg'),
  'thumbs-up-solid': () => import('../../assets/icons/thumbs-up-solid.svg'),
  thumbsUp: () => import('../../assets/icons/thumbs-up.svg'),
  thumbsUpSolid: () => import('../../assets/icons/thumbs-up-solid.svg'),
  'thumbtack-angle': () => import('../../assets/icons/thumbtack-angle.svg'),
  'thumbtack-angle-solid': () => import('../../assets/icons/thumbtack-angle-solid.svg'),
  'thumbtack-solid': () => import('../../assets/icons/thumb-tack-solid.svg'),
  thumbtackAngle: () => import('../../assets/icons/thumbtack-angle.svg'),
  thumbtackAngleSolid: () => import('../../assets/icons/thumbtack-angle-solid.svg'),
  thumbtackSolid: () => import('../../assets/icons/thumb-tack-solid.svg'),
  timesCircle: () => import('../../assets/icons/times-circle.svg'),
  timesCircleSolid: () => import('../../assets/icons/times-circle-solid.svg'),
  trashCan: () => import('../../assets/icons/trash-can.svg'),
  undo: () => import('../../assets/icons/undo.svg'),
  user: () => import('../../assets/icons/user.svg'),
  userPlus: () => import('../../assets/icons/user-plus.svg'),
  userPlusSolid: () => import('../../assets/icons/user-plus-solid.svg'),
  userCog: () => import('../../assets/icons/user-cog.svg'),
  userCogSolid: () => import('../../assets/icons/user-cog-solid.svg'),
  userEdit: () => import('../../assets/icons/user-edit.svg'),
  volume: () => import('../../assets/icons/volume.svg'),
  wallet: () => import('../../assets/icons/wallet.svg'),
  walletSolid: () => import('../../assets/icons/wallet-solid.svg'),
  wandMagicSparkles: () => import('../../assets/icons/wand-magic-sparkles.svg'),
  xmark: () => import('../../assets/icons/xmark.svg'),
} as const

const iconComponentCache = new Map<keyof typeof iconRegistry, LazySvgIconComponent>()

const Icon: FC<IconProps> = ({ name, status, id, title, color, width = 14, height = width || 14 }) => {
  const IconComponent = React.useMemo(() => {
    const iconLoader = iconRegistry[name]
    if (!iconLoader) {
      console.error(`Icon "${String(name)}" not found. RDF available icons:`, Object.keys(iconRegistry))
      return null
    }

    let cachedComponent = iconComponentCache.get(name)
    if (!cachedComponent) {
      cachedComponent = React.lazy(iconLoader) as LazySvgIconComponent
      iconComponentCache.set(name, cachedComponent)
    }

    return cachedComponent
  }, [name])

  if (!IconComponent) {
    return null
  }

  const IconWrapper = title ? Styled.IconWrapper : React.Fragment

  return (
    <React.Suspense fallback={null}>
      <IconWrapper {...(title && { title })}>
        <IconComponent id={id} color={color || getStatusColor(status)} width={width} height={height} />
      </IconWrapper>
    </React.Suspense>
  )
}

export default Icon
