// Mock data for the Offers drawer (prototype) — grouped by Offer text.
// Model: an Offer = one Offer text + a set of Offer_IDs mapped under it. A campaign has several
// Offer-text groups. Offer_IDs carry a Grey/Green/Red status (DWI model). Offer_ID presentation
// is platform-specific (UX-8.5 / Req 8.9–8.12).

export type OfferIdStatus = 'grey' | 'green' | 'red'

export interface OfferId {
  /** The external Offer_ID. */
  id: string
  /** Primary label — Ad ID (SA360/Meta) or Creative ID (CM360). */
  idLabel: string
  /** Secondary — Ad URL (SA360), Ad Name (Meta), Creatives (CM360). */
  detail: string
  status: OfferIdStatus
}

export interface OfferGroup {
  id: string
  /** The reusable Offer text. */
  text: string
  /** Offer_IDs mapped under this text. */
  offerIds: OfferId[]
}

/** Per-campaign offer groups + the available-to-map pool, generated + cached. */
const cache = new Map<string, { groups: OfferGroup[]; available: OfferId[] }>()

export function getOffersForCampaign(campaignId: string, platform: string): { groups: OfferGroup[]; available: OfferId[] } {
  if (!cache.has(campaignId)) {
    // A large pool so 20 groups x 20 ids all have distinct IDs, plus spares for the "available" list.
    // Offer-themed names so the Add picker is searchable by promo (e.g. 'summer', 'valentine').
    const promoThemes = [
      'Summer Special', "Valentine's Day Promo", 'Black Friday Deal', 'Easter Getaway',
      'Spring Escape', 'Christmas Offer', 'New Year Stay', 'Autumn Retreat',
      'Weekend Flash Sale', 'Halloween Special', 'Back to School Offer', 'Labor Day Deal',
      'Early Summer Promo', 'Winter Wonderland', 'Mother\'s Day Treat', "Father's Day Offer",
    ]
    const pool = (() => {
      const mk = (n: number): OfferId => {
        const num = String(50000 + n)
        const promo = `${promoThemes[n % promoThemes.length]} ${num}`
        if (platform === 'CM360')
          return { id: `CR-${num}`, idLabel: `CR-${num}`, detail: promo, status: 'green' }
        return { id: `AD-${num}`, idLabel: `AD-${num}`, detail: promo, status: 'green' }
      }
      return Array.from({ length: 500 }, (_, k) => mk(k + 1))
    })()

    const texts = [
      'Summer Sale \u2013 20% off', 'Free breakfast included', 'Stay 3 nights, pay 2',
      'Early bird \u2013 book 60 days ahead', 'Member exclusive rate', 'Last-minute deal',
      'Family package', 'Spa & wellness offer', 'Weekend getaway', 'Advance purchase 10% off',
      'Flexible rate', 'Non-refundable saver', 'Honeymoon special', 'Long-stay discount',
      'City break bundle', 'All-inclusive offer', 'Resort credit $50', 'Kids stay free',
      'Suite upgrade offer', 'Loyalty bonus points',
    ]
    const statuses: OfferIdStatus[] = ['green', 'green', 'green', 'grey', 'green', 'red']

    let cursor = 0
    const groups: OfferGroup[] = texts.map((text, gi) => {
      const offerIds: OfferId[] = Array.from({ length: 20 }, (_, k) => {
        const base = pool[cursor++]
        return { ...base, status: statuses[(gi + k) % statuses.length] }
      })
      return { id: `og-${gi + 1}`, text, offerIds }
    })

    const used = new Set(groups.flatMap(g => g.offerIds.map(o => o.id)))
    cache.set(campaignId, { groups, available: pool.filter(o => !used.has(o.id)) })
  }
  return cache.get(campaignId) as { groups: OfferGroup[]; available: OfferId[] }
}

/** Existing Offer-text suggestions (reuse across the advertiser). */
export const offerTextSuggestions = [
  'Summer Sale – 20% off',
  'Free breakfast included',
  'Stay 3 nights, pay 2',
  'Early bird – book 60 days ahead',
  'Member exclusive rate',
]
