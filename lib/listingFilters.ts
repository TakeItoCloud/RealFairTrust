// Discovery filter option tables — pure, importable from both the server (Discovery RSC:
// band-key → min/max) and the client (FilterBar: option lists + labels). No side effects.
// Price/area bands map to the additive getListings min/max filters — no schema change.
import type { ListingSort, ListingType, PropertyKind } from '@/lib/types'

export interface Band {
  /** URL-stable key, e.g. "400000-700000" | "1000000+" | "0-60". */
  key: string
  min?: number
  max?: number
}

/** Property kinds offered in the "Tipo" filter — only those present in the seed, so no
 *  option ever returns an empty grid. (The `PropertyKind` type also carries loft/land for
 *  future inventory; add them here once seeded.) */
export const KIND_VALUES: PropertyKind[] = ['apartment', 'house', 'studio', 'commercial', 'building']

/** Minimum-bedroom options (getListings `beds` is a `>=` filter). */
export const BED_VALUES = [1, 2, 3, 4] as const

/** Sort options; `merit` is the discovery default (Decision #78; merit→price→date). `date` =
 *  announcement date, newest first (Decision #83). */
export const SORT_VALUES: ListingSort[] = ['merit', 'priceAsc', 'priceDesc', 'date']

/** Deal-aware price bands (EUR total for sale, €/month for rent). */
export const PRICE_BANDS: Record<ListingType, Band[]> = {
  sale: [
    { key: '0-400000', max: 400000 },
    { key: '400000-700000', min: 400000, max: 700000 },
    { key: '700000-1000000', min: 700000, max: 1000000 },
    { key: '1000000+', min: 1000000 },
  ],
  rent: [
    { key: '0-1000', max: 1000 },
    { key: '1000-1500', min: 1000, max: 1500 },
    { key: '1500-2500', min: 1500, max: 2500 },
    { key: '2500+', min: 2500 },
  ],
}

/** Area bands (m²), deal-agnostic. */
export const AREA_BANDS: Band[] = [
  { key: '0-60', max: 60 },
  { key: '60-100', min: 60, max: 100 },
  { key: '100-150', min: 100, max: 150 },
  { key: '150+', min: 150 },
]

/** Resolve a band by key (or undefined for the "any" sentinel / unknown key). */
export function findBand(bands: Band[], key: string | undefined): Band | undefined {
  return key ? bands.find((b) => b.key === key) : undefined
}
