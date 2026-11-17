export interface AdvertiserDetailsProps {
  advertiser: AdvertiserQL.Advertiser
  handleClose?: () => void
  index?: number
  view?: 'settings' | 'summary'
}
