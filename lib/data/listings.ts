// Listings repository. Attaches a light agent reference (name + verified + score) so
// cards can show the rating chip without a second lookup. Mock now → Supabase in Phase 5.
import { consultants, listings, regions, scores } from '@/lib/mock'
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

function withAgent(p: Property): ListingWithAgent {
  return {
    ...p,
    agent: agentRef(p.agentId),
    regionName: regionName(p.regionId) ?? '',
    zoneName: regionName(p.zoneId),
  }
}

export async function getListings(filter: ListingFilter = {}): Promise<ListingWithAgent[]> {
  let result = listings.filter((l) => l.status === 'active')

  if (filter.type) result = result.filter((l) => l.type === filter.type)
  if (filter.regionId) result = result.filter((l) => l.regionId === filter.regionId)
  if (filter.zoneId) result = result.filter((l) => l.zoneId === filter.zoneId)
  if (filter.minPrice !== undefined) result = result.filter((l) => l.price >= filter.minPrice!)
  if (filter.maxPrice !== undefined) result = result.filter((l) => l.price <= filter.maxPrice!)
  if (filter.beds !== undefined) result = result.filter((l) => l.beds >= filter.beds!)
  if (filter.q) {
    const q = filter.q.toLowerCase()
    result = result.filter(
      (l) => l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q),
    )
  }

  result.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  return result.map(withAgent)
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
