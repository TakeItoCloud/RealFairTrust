// Consultants repository. Composes ConsultantProfile + current PerformanceScore +
// review aggregates into the view types pages consume. Mock now → Supabase in Phase 5.
import { consultants, listings, reviews, scores } from '@/lib/mock'
import type {
  ConsultantDetail,
  ConsultantFilter,
  ConsultantSummary,
  Review,
} from '@/lib/types'

/** Overall 0–5 rating for one review (mean of its four dimensions). */
function reviewRating(r: Review): number {
  const { communication, knowledge, negotiation, responsiveness } = r.dimensions
  return (communication + knowledge + negotiation + responsiveness) / 4
}

function reviewsFor(agentId: string): Review[] {
  return reviews
    .filter((r) => r.agentId === agentId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

function summarize(consultantId: string): ConsultantSummary {
  const consultant = consultants.find((c) => c.id === consultantId)!
  const score = scores.find((s) => s.agentId === consultantId) ?? null
  const agentReviews = reviewsFor(consultantId)
  const avgRating =
    agentReviews.length === 0
      ? null
      : Math.round(
          (agentReviews.reduce((sum, r) => sum + reviewRating(r), 0) / agentReviews.length) * 10,
        ) / 10

  return { ...consultant, score, reviewCount: agentReviews.length, avgRating }
}

export async function getConsultants(filter: ConsultantFilter = {}): Promise<ConsultantSummary[]> {
  let result = consultants.filter((c) => c.status === 'approved').map((c) => summarize(c.id))

  if (filter.regionId) {
    result = result.filter((c) => c.serviceRegionIds.includes(filter.regionId!))
  }
  if (filter.specialization) {
    result = result.filter((c) => c.specializations.includes(filter.specialization!))
  }
  if (filter.language) {
    result = result.filter((c) => c.languages.includes(filter.language!))
  }
  if (filter.risingTalentOnly) {
    result = result.filter((c) => c.score?.risingTalent)
  } else if (filter.view === 'ranked') {
    // Ranked board = established consultants with an assigned rank.
    result = result.filter((c) => c.score && !c.score.risingTalent)
  }

  // Sort by composite desc; consultants without a score sink to the bottom.
  result.sort((a, b) => (b.score?.composite ?? -1) - (a.score?.composite ?? -1))
  return result
}

export async function getConsultant(slug: string): Promise<ConsultantDetail | null> {
  const consultant = consultants.find((c) => c.slug === slug && c.status === 'approved')
  if (!consultant) return null

  const summary = summarize(consultant.id)
  const agentListings = listings
    .filter((l) => l.agentId === consultant.id && l.status === 'active')
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  return { ...summary, reviews: reviewsFor(consultant.id), listings: agentListings }
}
