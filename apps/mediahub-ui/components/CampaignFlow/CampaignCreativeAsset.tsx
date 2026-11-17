import React from 'react'
import HotelCity from './assets/HotelCity.svg'
import HotelCoast from './assets/HotelCoast.svg'
import HotelLobby from './assets/HotelLobby.svg'

type CampaignCreativeAssetProps = {
  assetPath: string
  alt: string
}

const ASSETS: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  'assets/creatives/HotelCity.svg': HotelCity,
  'assets/creatives/HotelCoast.svg': HotelCoast,
  'assets/creatives/HotelLobby.svg': HotelLobby,
}

export const CampaignCreativeAsset: React.FC<CampaignCreativeAssetProps> = ({ assetPath, alt }) => {
  const Illustration = ASSETS[assetPath]
  if (!Illustration) return null
  return <Illustration role='img' aria-label={alt} focusable='false' preserveAspectRatio='xMidYMid slice' />
}

export default CampaignCreativeAsset
