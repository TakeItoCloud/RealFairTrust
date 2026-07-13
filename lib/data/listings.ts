// Listings repository. Attaches a light agent reference (name + verified + score) so
// cards can show the rating chip without a second lookup. Mock now → Supabase in Phase 5.
import { consultants, listings, regions, scores } from '@/lib/mock'
import { concelhoDistrito } from '@/lib/data/geo/caop'
import type {
  ListingAgentRef,
  ListingDetail,
  ListingFilter,
  ListingWithAgent,
  Property,
} from '@/lib/types'

function agentRef(agentId: string): ListingAgentRef {
  const c = consultants.find((x) => x.id === agentId)!
  return {
    id: c.id,
    name: c.name,
    slug: c.slug,
    verified: c.verified,
    score: scores.find((s) => s.agentId === agentId) ?? null,
  }
}

function regionName(id: string | null): string | null {
  return id ? (regions.find((r) => r.id === id)?.name ?? null) : null
}

/** Compose a Property into a ListingWithAgent (agent ref + resolved region/zone names). */
export function toListingWithAgent(p: Property): ListingWithAgent {
  return {
    ...p,
    agent: agentRef(p.agentId),
    regionName: regionName(p.regionId) ?? '',
    zoneName: regionName(p.zoneId),
  }
}
const withAgent = toListingWithAgent

export async function getListings(filter: ListingFilter = {}): Promise<ListingWithAgent[]> {
  let result = listings.filter((l) => l.status === 'active')

  if (filter.type) result = result.filter((l) => l.type === filter.type)
  if (filter.kind) result = result.filter((l) => l.kind === filter.kind)
  // CAOP location filters (standalone; derive concelho = first 4 digits, distrito via CAOP).
  if (filter.freguesiaId) result = result.filter((l) => l.freguesiaId === filter.freguesiaId)
  if (filter.concelhoId) result = result.filter((l) => l.freguesiaId.slice(0, 4) === filter.concelhoId)
  if (filter.distritoId)
    result = result.filter((l) => concelhoDistrito(l.freguesiaId.slice(0, 4)) === filter.distritoId)
  if (filter.regionId) result = result.filter((l) => l.regionId === filter.regionId)
  if (filter.zoneId) result = result.filter((l) => l.zoneId === filter.zoneId)
  if (filter.minPrice !== undefined) result = result.filter((l) => l.price >= filter.minPrice!)
  if (filter.maxPrice !== undefined) result = result.filter((l) => l.price <= filter.maxPrice!)
  if (filter.minArea !== undefined) result = result.filter((l) => l.areaM2 >= filter.minArea!)
  if (filter.maxArea !== undefined) result = result.filter((l) => l.areaM2 <= filter.maxArea!)
  if (filter.beds !== undefined) result = result.filter((l) => l.beds >= filter.beds!)
  if (filter.q) {
    const q = filter.q.toLowerCase()
    result = result.filter(
      (l) => l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q),
    )
  }

  const mapped = result.map(withAgent)

  // Sort. Omitting `sort` keeps the legacy createdAt-desc order so existing callers
  // (Home featured row, dev showcase) are byte-for-byte unchanged; only the discovery
  // pages pass an explicit sort (merit default). Additive + opt-in.
  switch (filter.sort) {
    case 'priceAsc':
      mapped.sort((a, b) => a.price - b.price)
      break
    case 'priceDesc':
      mapped.sort((a, b) => b.price - a.price)
      break
    case 'merit':
      // Discovery default: highest-merit agent first (desc), then price (asc), then
      // announcement date (newest). Agents without a score sort last.
      mapped.sort((a, b) => {
        const sa = a.agent.score?.composite ?? -1
        const sb = b.agent.score?.composite ?? -1
        if (sb !== sa) return sb - sa
        if (a.price !== b.price) return a.price - b.price
        return b.createdAt.localeCompare(a.createdAt)
      })
      break
    case 'date':
      mapped.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      break
    default:
      mapped.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  }
  return mapped
}

export async function getListing(id: string): Promise<ListingDetail | null> {
  const property = listings.find((l) => l.id === id && l.status === 'active')
  if (!property) return null

  const similar = listings
    .filter(
      (l) =>
        l.id !== property.id &&
        l.status === 'active' &&
        l.type === property.type &&
        l.regionId === property.regionId,
    )
    .slice(0, 3)
    .map(withAgent)

  return { ...withAgent(property), similar }
}

/**
 * Similar listings for a property detail page (Decision #85). Same deal type, **same concelho
 * first, then widen to the same distrito** (CAOP), excluding the current listing. Additive +
 * opt-in: takes the already-loaded listing (no re-fetch of the main), so it maps cleanly to a
 * distinct Supabase query in Phase 5. Leaves `getListing` untouched.
 */
export async function getSimilarListings(
  listing: Pick<Property, 'id' | 'type' | 'freguesiaId'>,
  limit = 3,
): Promise<ListingWithAgent[]> {
  const concelhoId = listing.freguesiaId.slice(0, 4)
  const distritoId = concelhoDistrito(concelhoId)
  const pool = listings.filter(
    (l) => l.id !== listing.id && l.status === 'active' && l.type === listing.type,
  )
  const sameConcelho = pool.filter((l) => l.freguesiaId.slice(0, 4) === concelhoId)
  const sameDistrito = pool.filter(
    (l) =>
      l.freguesiaId.slice(0, 4) !== concelhoId &&
      concelhoDistrito(l.freguesiaId.slice(0, 4)) === distritoId,
  )
  return [...sameConcelho, ...sameDistrito].slice(0, limit).map(withAgent)
}
