import { LONDONER_PLATFORM_ADVERTISERS } from './londonerHotel'
import { DEMO_ADVERTISERS } from './demoAdvertisers'

export interface KnownPlatformAdvertiser {
  id: string
  name: string
}

const KNOWN_PLATFORM_ADVERTISERS: Record<string, KnownPlatformAdvertiser> = {
  'CM360:CM-100001': { id: 'CM-100001', name: 'Hotel Alpha CM360' },
  'SA360:SA-100001': { id: 'SA-100001', name: 'Hotel Alpha SA360' },
  'Facebook:FB-100001': { id: 'FB-100001', name: 'Hotel Alpha Facebook' },
  'WHIP:WHIP-100001': { id: 'WHIP-100001', name: 'Hotel Alpha WHIP' },
  'Derbysoft:DS-100001': { id: 'DS-100001', name: 'Hotel Alpha Derbysoft' },
  'Google DV360:DV-100001': { id: 'DV-100001', name: 'Hotel Alpha Google DV360' },
  'Google ADS:ADS-100001': { id: 'ADS-100001', name: 'Hotel Alpha Google ADS' },
  'Amadeus DSP:DSP-100001': { id: 'DSP-100001', name: 'Hotel Alpha Amadeus DSP' },
  // The Londoner Hotel — keys '<Platform>:<id>' derived from the shared mock.
  ...Object.fromEntries(
    LONDONER_PLATFORM_ADVERTISERS.map(p => [`${p.platform}:${p.advertiserId}`, { id: p.advertiserId, name: p.advertiserName }]),
  ),
  // The 10 demo advertisers — same '<Platform>:<id>' shape.
  ...Object.fromEntries(
    DEMO_ADVERTISERS.flatMap(a =>
      a.platformAdvertisers.map(p => [`${p.platform}:${p.advertiserId}`, { id: p.advertiserId, name: p.advertiserName }]),
    ),
  ),
}

const KNOWN_PLATFORM_ADVERTISERS_BY_ID: Record<string, KnownPlatformAdvertiser> = {
  '1111': { id: '1111', name: 'Hotel Meridian' },
  '2222': { id: '2222', name: 'The Grand Aurora' },
  '3333': { id: '3333', name: 'Harborlight Resort' },
  '4444': { id: '4444', name: 'Summit House Hotel' },
}

export function getKnownPlatformAdvertiser(platform: string | undefined, advertiserId: string | undefined): KnownPlatformAdvertiser | undefined {
  const normalizedId = advertiserId?.trim()
  if (!normalizedId) return undefined
  const normalizedPlatform = platform?.trim().toLowerCase() === 'meta (facebook)' ? 'Facebook' : platform
  return KNOWN_PLATFORM_ADVERTISERS[`${normalizedPlatform}:${normalizedId}`] ?? KNOWN_PLATFORM_ADVERTISERS_BY_ID[normalizedId]
}