import React, { useEffect, useRef, useState } from 'react'
import { Icon, colors } from '@amadeus/react-design-factory'
import {
  campaignFlowData,
  type CampaignPlatform,
  type DisplayBanner,
  type SearchAdSitelink,
} from '../CampaignFlow/campaignFlowData'
import { PAID_SEARCH } from '../CampaignFlow/campaignFlowLogic'
import { CampaignCreativeAsset } from '../CampaignFlow/CampaignCreativeAsset'
import * as Styled from './CampaignCreationCanvas.styled'

type CampaignAdPreviewProps = {
  platform: CampaignPlatform
  headline: string
  description: string
  image?: string
  /** Active creative language (drives the labels of the search ad). */
  language?: string
  /** Search-ad sitelinks for the active language (platform.creative.searchAd platforms). */
  sitelinks?: SearchAdSitelink[]
  /** Selected HTML5 banner (platform.creative.banners platforms). */
  banner?: DisplayBanner
}

const SEARCH_LABELS: Record<string, { sponsored: string; readMore: string }> = {
  en: { sponsored: 'Sponsored Results', readMore: 'Read more' },
  fr: { sponsored: 'Résultats sponsorisés', readMore: 'Lire la suite' },
}

/**
 * An HTML5 banner (served from public/) in an iframe, scaled to fit. With `boxHeight` the banner is
 * fitted inside a fixed-height box (thumbnails); without it, it fills the available width (preview).
 * The banners load Google's DV360 Enabler / GSAP from the internet, so they animate when online.
 */
export const ScaledBanner: React.FC<{ banner: DisplayBanner; boxHeight?: number; interactive?: boolean }> = ({
  banner,
  boxHeight,
  interactive = false,
}) => {
  const boxRef = useRef<HTMLDivElement | null>(null)
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const element = boxRef.current
    if (!element) return
    const update = () => setWidth(element.clientWidth)
    update()
    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(update)
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  const widthScale = width > 0 ? width / banner.width : 1
  const scale = boxHeight ? Math.min(widthScale, boxHeight / banner.height) : Math.min(1, widthScale)
  const height = boxHeight ?? banner.height * scale
  return (
    <Styled.BannerFrameBox ref={boxRef} style={{ height }} data-testid={`banner-frame-${banner.id}`}>
      <iframe
        title={`The Londoner ${banner.size} banner`}
        src={banner.path}
        width={banner.width}
        height={banner.height}
        sandbox='allow-scripts allow-same-origin'
        loading='lazy'
        style={{
          transform: `scale(${scale})`,
          // Centre a fitted thumbnail horizontally.
          left: boxHeight ? Math.max(0, (width - banner.width * scale) / 2) : 0,
          pointerEvents: interactive ? 'auto' : 'none',
        }}
      />
    </Styled.BannerFrameBox>
  )
}

export const CampaignAdPreview: React.FC<CampaignAdPreviewProps> = ({
  platform,
  headline,
  description,
  image,
  language = 'en',
  sitelinks,
  banner,
}) => {
  const advertiser = campaignFlowData.basicInfo.advertiser

  // Google-style sponsored result (name, URL, headline, description, sitelinks).
  if (platform.group === PAID_SEARCH && platform.creative.searchAd) {
    const searchAd = platform.creative.searchAd
    const labels = SEARCH_LABELS[language] ?? SEARCH_LABELS.en
    const links = sitelinks ?? searchAd.sitelinks
    return (
      <Styled.GoogleAd data-testid='ad-preview-search'>
        <Styled.GoogleAdHeading>{labels.sponsored}</Styled.GoogleAdHeading>
        <Styled.GoogleAdBrandRow>
          <Styled.GoogleAdLogo>{searchAd.logo ? <img src={searchAd.logo} alt='' /> : null}</Styled.GoogleAdLogo>
          <Styled.GoogleAdBrandText>
            <strong>{searchAd.displayName}</strong>
            <span>{searchAd.displayUrl}</span>
          </Styled.GoogleAdBrandText>
          <Icon name='ellipsisVertical' width={14} height={14} color={colors.cloud_70} />
        </Styled.GoogleAdBrandRow>
        <Styled.GoogleAdBody>
          <Styled.GoogleAdText>
            <Styled.GoogleAdHeadline>{headline}</Styled.GoogleAdHeadline>
            <Styled.GoogleAdDescription>
              {description} <a href={searchAd.displayUrl}>{labels.readMore} ›</a>
            </Styled.GoogleAdDescription>
          </Styled.GoogleAdText>
          {searchAd.images?.[0] ? (
            <Styled.GoogleAdImage src={searchAd.images[0].path} alt={searchAd.images[0].name} />
          ) : null}
        </Styled.GoogleAdBody>
        <Styled.GoogleAdSitelinks>
          {links
            .filter(link => link.title || link.description)
            .map(link => (
              <Styled.GoogleAdSitelink key={link.title + link.description}>
                <div>
                  <strong>{link.title}</strong>
                  <span>{link.description}</span>
                </div>
                <Icon name='chevronRight' width={12} height={12} color={colors.cloud_70} />
              </Styled.GoogleAdSitelink>
            ))}
        </Styled.GoogleAdSitelinks>
      </Styled.GoogleAd>
    )
  }

  if (platform.group === PAID_SEARCH) {
    const hotel = campaignFlowData.sponsoredHotels[0]
    return (
      <Styled.SearchPreview data-testid='ad-preview-search'>
        <div>
          <Styled.PreviewHeading>Sponsored Hotels</Styled.PreviewHeading>
          <Styled.PreviewSubtext>Lowest prices for stays Jan–Dec 2027 · flexible dates</Styled.PreviewSubtext>
        </div>
        <Styled.HotelCard>
          {image ? <CampaignCreativeAsset assetPath={image} alt={`${hotel.name} preview`} /> : <span />}
          <Styled.HotelMeta>
            <strong>{hotel.name}</strong>
            <span>{`${hotel.price} · ${hotel.source}`}</span>
            <span>{`★ ${hotel.rating} ${hotel.reviews}`}</span>
            {hotel.deal ? <Styled.DealBadge>Deal</Styled.DealBadge> : null}
          </Styled.HotelMeta>
        </Styled.HotelCard>
        <Styled.TextAd>
          <Styled.TextAdSponsored>Sponsored · {advertiser}</Styled.TextAdSponsored>
          <Styled.TextAdHeadline>{headline}</Styled.TextAdHeadline>
          <span>{description}</span>
          <Styled.Sitelinks>
            {campaignFlowData.previewSitelinks.map(sitelink => (
              <span key={sitelink}>{sitelink}</span>
            ))}
          </Styled.Sitelinks>
        </Styled.TextAd>
      </Styled.SearchPreview>
    )
  }

  if (platform.id === 'tiktok') {
    return (
      <Styled.VerticalCard data-testid='ad-preview-tiktok'>
        {image ? <CampaignCreativeAsset assetPath={image} alt={`${platform.name} video frame`} /> : null}
        <Styled.VerticalOverlay>
          <strong>@{advertiser.replace(/\s+/g, '').toLowerCase()}</strong>
          <span>{headline}</span>
          <span>{description}</span>
          <Styled.VerticalCta>Book now</Styled.VerticalCta>
        </Styled.VerticalOverlay>
      </Styled.VerticalCard>
    )
  }

  if (platform.id === 'snapchat') {
    return (
      <div data-testid='ad-preview-snapchat'>
        <Styled.SnapchatPreview>
          {image ? <CampaignCreativeAsset assetPath={image} alt='Snapchat story creative' /> : null}
        </Styled.SnapchatPreview>
        <Styled.SnapchatCaption>
          <strong>{headline}</strong>
          <br />
          {description}
        </Styled.SnapchatCaption>
      </div>
    )
  }

  const format = platform.creative.adFormat.toLowerCase()

  if (platform.id === 'spotify' || format.includes('audio')) {
    return (
      <Styled.AudioAdPreview data-testid={`ad-preview-${platform.id}`}>
        <Styled.AudioArtwork>
          {image ? <CampaignCreativeAsset assetPath={image} alt={`${platform.name} audio campaign artwork`} /> : null}
        </Styled.AudioArtwork>
        <Styled.AudioAdDetails>
          <Styled.CreativeFormatTag>{platform.name} audio ad</Styled.CreativeFormatTag>
          <strong>{headline}</strong>
          <span>{description}</span>
          <Styled.AudioWaveform aria-hidden='true'>
            {[0, 1, 2, 3, 4].map(bar => (
              <span key={bar} />
            ))}
          </Styled.AudioWaveform>
          <span>Sponsored · {advertiser}</span>
        </Styled.AudioAdDetails>
      </Styled.AudioAdPreview>
    )
  }

  if (platform.id === 'youtube' || format.includes('video') || format.includes('ctv')) {
    return (
      <Styled.VideoAdPreview data-testid={`ad-preview-${platform.id}`}>
        <Styled.VideoAdMedia>
          {image ? <CampaignCreativeAsset assetPath={image} alt={`${platform.name} video creative`} /> : null}
          <Styled.VideoAdPlay>Play preview</Styled.VideoAdPlay>
        </Styled.VideoAdMedia>
        <Styled.DisplayAdBody>
          <Styled.CreativeFormatTag>{platform.name} · {platform.creative.adFormat}</Styled.CreativeFormatTag>
          <strong>{headline}</strong>
          <span>{description}</span>
          <span>Sponsored · {advertiser}</span>
        </Styled.DisplayAdBody>
      </Styled.VideoAdPreview>
    )
  }

  if (platform.id === 'pinterest') {
    return (
      <Styled.PinterestPreview data-testid='ad-preview-pinterest'>
        {image ? <CampaignCreativeAsset assetPath={image} alt='Pinterest promoted pin creative' /> : null}
        <Styled.DisplayAdBody>
          <strong>{headline}</strong>
          <span>{description}</span>
          <Styled.CreativeFormatTag>Promoted pin</Styled.CreativeFormatTag>
        </Styled.DisplayAdBody>
      </Styled.PinterestPreview>
    )
  }

  // HTML5 display banners: the preview IS the banner, at its real size (scaled down to fit).
  if (platform.creative.banners?.length) {
    const shown = banner ?? platform.creative.banners[0]
    return (
      <Styled.BannerPreview data-testid={`ad-preview-${platform.id}`}>
        <Styled.BannerPreviewLabel>
          {platform.name} · HTML5 banner {shown.size}
        </Styled.BannerPreviewLabel>
        <ScaledBanner banner={shown} interactive />
      </Styled.BannerPreview>
    )
  }

  if (platform.group === 'Display Advertising' || platform.id === 'demandgen') {
    return (
      <Styled.DisplayAdPreview data-testid={`ad-preview-${platform.id}`}>
        <Styled.DisplayAdMedia>
          {image ? <CampaignCreativeAsset assetPath={image} alt={`${platform.name} display creative`} /> : null}
        </Styled.DisplayAdMedia>
        <Styled.DisplayAdBody>
          <Styled.CreativeFormatTag>{platform.name} · {platform.creative.adFormat}</Styled.CreativeFormatTag>
          <strong>{headline}</strong>
          <span>{description}</span>
        </Styled.DisplayAdBody>
        <Styled.DisplayAdFooter>
          <span>{advertiser}</span>
          <Styled.CtaButton>Book now</Styled.CtaButton>
        </Styled.DisplayAdFooter>
      </Styled.DisplayAdPreview>
    )
  }

  if (platform.group === 'Metasearch' || platform.group === 'Other') {
    return (
      <Styled.SearchPreview data-testid={`ad-preview-${platform.id}`}>
        <Styled.PreviewHeading>{platform.name} hotel listing</Styled.PreviewHeading>
        {campaignFlowData.sponsoredHotels.map((hotel, index) => (
          <Styled.HotelCard key={hotel.name}>
            <CampaignCreativeAsset
              assetPath={image && index === 0 ? image : hotel.image}
              alt={`${hotel.name} metasearch listing`}
            />
            <Styled.HotelMeta>
              <strong>{index === 0 ? headline : hotel.name}</strong>
              <span>{`${hotel.price} · ${hotel.source}`}</span>
              <span>{`★ ${hotel.rating} ${hotel.reviews}`}</span>
            </Styled.HotelMeta>
          </Styled.HotelCard>
        ))}
        <Styled.PreviewSubtext>{description}</Styled.PreviewSubtext>
      </Styled.SearchPreview>
    )
  }

  return (
    <Styled.SocialPost data-testid={platform.id === 'meta' ? 'ad-preview-meta' : 'ad-preview-social'}>
      <Styled.SocialProfile>
        <Styled.SocialAvatar aria-hidden='true'>{advertiser.charAt(0)}</Styled.SocialAvatar>
        <div>
          <strong>{advertiser}</strong>
          <div>Sponsored · {platform.name}</div>
        </div>
      </Styled.SocialProfile>
      {image ? <CampaignCreativeAsset assetPath={image} alt={`${platform.name} post`} /> : null}
      <Styled.SocialBody>
        <div>
          <strong>{headline}</strong>
          <span>{description}</span>
        </div>
        <Styled.CtaButton>Book now</Styled.CtaButton>
      </Styled.SocialBody>
    </Styled.SocialPost>
  )
}

export default CampaignAdPreview
