// Consultants repository. Composes ConsultantProfile + current PerformanceScore +
// review aggregates into the view types pages consume. Mock now → Supabase in Phase 5.
import { consultants, demoOutcomeMetrics, listings, reviews, scores } from '@/lib/mock'
import type {
  ConsultantDetail,
  ConsultantFilter,
  ConsultantSummary,
  Review,
} from '@/lib/types'
import {
  concelhoDistrito,
  freguesiaDistrito,
  getConcelho,
  getDistrito,
  getFreguesia,
} from '@/lib/data/geo/caop'
import { toListingWithAgent } from './listings'

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

  // DEMO outcome metrics (Decision #90, Cycle 1) — optional; attached beside reviewCount/avgRating.
  // Real close data arrives in Phase 5 (docs/RATING-ENGINE-NOTES). Display is opt-in per call-site
  // via ConsultantCard's `showMetrics` prop, so attaching here does not change any existing page.
  const outcome = demoOutcomeMetrics[consultantId]

  return {
    ...consultant,
    score,
    reviewCount: agentReviews.length,
    avgRating,
    unitsSold12mo: outcome?.unitsSold12mo,
    avgDaysToSell: outcome?.avgDaysToSell,
  }
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

// ---------------------------------------------------------------------------
// Location-based consultant matching (Decision #86) — inclusive hierarchical coverage
// + STRICT tiered widening Freguesia→Concelho→Distrito, most-specific-wins.
// Additive; does not touch getConsultants. Used by Vender (/vender).
// ---------------------------------------------------------------------------
export type CoverageTier = 'freguesia' | 'concelho' | 'distrito'

export interface AreaConsultantMatch {
  /** The tier that matched, or null (nothing selected, or no consultant at any tier). */
  tier: CoverageTier | null
  /** The matched area's CAOP id + resolved name (for the section header). */
  areaId?: string
  areaName?: string
  distritoId?: string
  distritoName?: string
  /** Merit-ranked (composite desc; no-score last) — same convention as getConsultants. */
  consultants: ConsultantSummary[]
}

/**
 * Return consultants covering a chosen CAOP area, using inclusive hierarchical coverage and strict
 * tiered widening (most-specific-wins). Widening starts at the deepest SELECTED level and returns
 * the FIRST non-empty tier:
 *   1. freguesia — consultants attributed to that exact freguesia (only if a freguesia is selected);
 *   2. concelho  — consultants attributed to that concelho;
 *   3. distrito  — the inclusive catch-all: every consultant working ANYWHERE in that district
 *                  (district-, concelho-, or freguesia-level attribution inside it).
 * Matching is purely attribution-based on the CAOP chain resolved from the selection — it is
 * independent of the picker's inventory/option lists (Decision #86 / D-V1).
 */
export async function getConsultantsByArea(sel: {
  distritoId?: string
  concelhoId?: string
  freguesiaId?: string
}): Promise<AreaConsultantMatch> {
  // Resolve the CAOP chain from whatever depth was selected.
  const freguesiaId = sel.freguesiaId
  const concelhoId = sel.concelhoId ?? (freguesiaId ? freguesiaId.slice(0, 4) : undefined)
  const distritoId =
    sel.distritoId ?? (concelhoId ? concelhoDistrito(concelhoId) : undefined)

  const distritoNode = distritoId ? getDistrito(distritoId) : undefined
  const empty: AreaConsultantMatch = {
    tier: null,
    consultants: [],
    distritoId,
    distritoName: distritoNode?.name,
  }
  if (!distritoId) return empty

  // getConsultants() is already approved + composite-desc-sorted → each tier filter keeps merit order.
  const all = await getConsultants()

  // Tier 1 — exact freguesia attribution (only when a freguesia is selected).
  if (freguesiaId) {
    const tierF = all.filter((c) => c.coverageFreguesiaIds?.includes(freguesiaId))
    if (tierF.length > 0) {
      const node = getFreguesia(freguesiaId)
      return {
        tier: 'freguesia',
        areaId: freguesiaId,
        areaName: node?.name,
        distritoId,
        distritoName: distritoNode?.name,
        consultants: tierF,
      }
    }
  }

  // Tier 2 — consultants attributed to the concelho.
  if (concelhoId) {
    const tierC = all.filter((c) => c.coverageConcelhoIds?.includes(concelhoId))
    if (tierC.length > 0) {
      const node = getConcelho(concelhoId)
      return {
        tier: 'concelho',
        areaId: concelhoId,
        areaName: node?.name,
        distritoId,
        distritoName: distritoNode?.name,
        consultants: tierC,
      }
    }
  }

  // Tier 3 — inclusive catch-all: everyone working anywhere in the district.
  const tierD = all.filter(
    (c) =>
      c.coverageDistrictIds.includes(distritoId) ||
      (c.coverageConcelhoIds ?? []).some((id) => concelhoDistrito(id) === distritoId) ||
      (c.coverageFreguesiaIds ?? []).some((id) => freguesiaDistrito(id) === distritoId),
  )
  if (tierD.length > 0) {
    return {
      tier: 'distrito',
      areaId: distritoId,
      areaName: distritoNode?.name,
      distritoId,
      distritoName: distritoNode?.name,
      consultants: tierD,
    }
  }

  return empty
}

export async function getConsultant(slug: string): Promise<ConsultantDetail | null> {
  const consultant = consultants.find((c) => c.slug === slug && c.status === 'approved')
  if (!consultant) return null

  const summary = summarize(consultant.id)
  const agentListings = listings
    .filter((l) => l.agentId === consultant.id && l.status === 'active')
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map(toListingWithAgent)

  return { ...summary, reviews: reviewsFor(consultant.id), listings: agentListings }
}
