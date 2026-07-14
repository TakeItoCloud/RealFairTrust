// RealFairTrust — core domain types (Phase 1 §6 content model).
// These are the single source of truth for shapes across the app. In Phase 4 the
// mock fixtures in `lib/mock/` satisfy them; in Phase 5 the Supabase rows satisfy the
// same types, so the `lib/data/` repository swaps backend without changing callers.

/** ISO-8601 date or datetime string (e.g. "2026-06-07" or "2026-06-07T10:00:00Z"). */
export type ISODate = string

/** UI locales (next-intl). Distinct from spoken `Language` below. */
export type Locale = 'pt' | 'en'

/** Languages a consultant may speak. */
export type Language = 'pt' | 'en' | 'es' | 'fr'

// ---------------------------------------------------------------------------
// Region — district → city → zone. Powers city filtering + code-free expansion.
// ---------------------------------------------------------------------------
export type RegionType = 'district' | 'city' | 'zone'

export interface Region {
  id: string
  type: RegionType
  parentId: string | null
  name: string
  slug: string
  /** When false, the region exists structurally but is not shown to clients. */
  live: boolean
}

// ---------------------------------------------------------------------------
// User — auth identity. Real auth arrives in Phase 5; agents + admins only at launch.
// ---------------------------------------------------------------------------
export type UserRole = 'agent' | 'admin' // 'client' added in a later phase
export type AuthProvider = 'email' | 'google'

export interface User {
  id: string
  email: string
  role: UserRole
  authProvider: AuthProvider
  createdAt: ISODate
}

// ---------------------------------------------------------------------------
// ConsultantProfile — the public conversion unit.
// ---------------------------------------------------------------------------
export type ConsultantStatus = 'pending' | 'approved' | 'suspended'

export type Specialization =
  | 'apartments'
  | 'luxury'
  | 'investment'
  | 'rental'
  | 'commercial'
  | 'first-time-buyers'
  | 'relocation'
  | 'new-developments'

export interface ContactInfo {
  email: string
  phone: string
}

export interface ConsultantProfile {
  id: string
  userId: string
  name: string
  /** Name-based slug; numeric suffix on collision (Decision #22). */
  slug: string
  photo: string
  bio: string
  languages: Language[]
  specializations: Specialization[]
  serviceRegionIds: string[]
  /** CAOP top-level ids the consultant covers (distrito 2-digit, or RA 'AC'/'MA'). Drives the
   *  area-specialist CTA + distrito inventory. Parallel to serviceRegionIds (old Region model). */
  coverageDistrictIds: string[]
  /** OPTIONAL, additive (Decision #86): CAOP concelho (4-digit) ids the consultant is attributed to.
   *  Inclusive hierarchical coverage — a concelho-level consultant covers every freguesia inside it.
   *  Powers Vender's location-based matching; `coverageDistrictIds` is unchanged. */
  coverageConcelhoIds?: string[]
  /** OPTIONAL, additive (Decision #86): CAOP freguesia (6-digit) ids the consultant is attributed
   *  to — the most specific coverage tier. */
  coverageFreguesiaIds?: string[]
  contact: ContactInfo
  status: ConsultantStatus
  verified: boolean
  proSubscriber: boolean
  joinedAt: ISODate
}

// ---------------------------------------------------------------------------
// PerformanceScore — output of the periodic rating engine (computed in Phase 5).
// Rolling 90-day window, recomputed monthly; per-opportunity normalized.
// ---------------------------------------------------------------------------
export type ScoreConfidence = 'low' | 'medium' | 'high'

export interface PerformanceSubScores {
  satisfaction: number // 0–100
  closeRate: number // 0–100
  responsiveness: number // 0–100
  conversion: number // 0–100
  activity: number // 0–100
}

export interface PerformanceScore {
  id: string
  agentId: string
  /** "YYYY-MM" — the month this score was computed for. */
  periodMonth: string
  windowStart: ISODate
  windowEnd: ISODate
  sub: PerformanceSubScores
  /** 0–100, weighted per RATING_WEIGHTS. */
  composite: number
  /** Rank within region on the ranked board; null for Rising Talent (own board). */
  rank: number | null
  regionId: string
  risingTalent: boolean
  /** Opportunities handled in the window — drives `confidence`. */
  sampleSize: number
  /** When 'low', the UI shows "building track record" and hides the number (Decision #18). */
  confidence: ScoreConfidence
}

/** Composite weights — satisfaction/close/responsiveness/conversion/activity (Decision #16). */
export const RATING_WEIGHTS = {
  satisfaction: 0.35,
  closeRate: 0.25,
  responsiveness: 0.15,
  conversion: 0.15,
  activity: 0.1,
} as const

// ---------------------------------------------------------------------------
// Property — listings (buy / rent). Full model now; manage-UI after auth (Phase 5).
// ---------------------------------------------------------------------------
export type ListingType = 'sale' | 'rent'
export type ListingStatus = 'draft' | 'active' | 'archived'
export type EnergyCert = 'A+' | 'A' | 'B' | 'B-' | 'C' | 'D' | 'E' | 'F'
/** Property kind (distinct from `type`, which is the deal — sale/rent). Additive field
 *  backing the discovery "Tipo" filter; schema-first per Hard Rule #1 (Decision #77). */
export type PropertyKind = 'apartment' | 'house' | 'studio' | 'loft' | 'commercial' | 'building' | 'land'

export interface Property {
  id: string
  agentId: string
  type: ListingType
  kind: PropertyKind
  /** CAOP DICOFRE (6-digit) of the listing's freguesia. concelho = slice(0,4); distrito/RA
   *  derived via lib/data/geo/caop. Standalone CAOP location (parallel to regionId/zoneId). */
  freguesiaId: string
  title: string
  /** EUR. For rentals this is the monthly price. */
  price: number
  regionId: string // city region
  zoneId: string | null
  beds: number
  baths: number
  areaM2: number
  energyCert: EnergyCert
  description: string
  media: string[]
  status: ListingStatus
  /** Seed/demo listing — flagged clearly in the UI until real inventory exists (Decision #20). */
  isDemo: boolean
  createdAt: ISODate
}

// ---------------------------------------------------------------------------
// Lead — client enquiry. Captured early; no persistence in Phase 4.
// ---------------------------------------------------------------------------
export type LeadIntent = 'buy' | 'sell' | 'rent'
export type LeadStatus = 'new' | 'contacted' | 'closed'

export interface Lead {
  id: string
  intent: LeadIntent
  name: string
  contact: string // email or phone
  message: string
  relatedPropertyId: string | null
  relatedAgentId: string | null
  regionId: string | null
  status: LeadStatus
  createdAt: ISODate
}

export interface CreateLeadInput {
  intent: LeadIntent
  name: string
  contact: string
  message?: string
  relatedPropertyId?: string
  relatedAgentId?: string
  regionId?: string
}

// ---------------------------------------------------------------------------
// Review — verified-transaction gating phased in later (Phase 2 of the engine).
// ---------------------------------------------------------------------------
export interface ReviewDimensions {
  communication: number // 0–5
  knowledge: number // 0–5
  negotiation: number // 0–5
  responsiveness: number // 0–5
}

export interface Review {
  id: string
  agentId: string
  /** Anonymised client display reference. */
  clientRef: string
  dimensions: ReviewDimensions
  comment: string
  verified: boolean
  relatedTransactionId: string | null
  eligibleFrom: ISODate
  createdAt: ISODate
}

// ---------------------------------------------------------------------------
// Transaction & Opportunity — feed close rate, conversion, per-opportunity scoring.
// ---------------------------------------------------------------------------
export interface Transaction {
  id: string
  agentId: string
  type: ListingType
  regionId: string
  closedAt: ISODate
}

export type OpportunityOutcome = 'won' | 'lost' | 'active'

export interface Opportunity {
  id: string
  agentId: string
  leadId: string | null
  outcome: OpportunityOutcome
  createdAt: ISODate
}

// ---------------------------------------------------------------------------
// Composite view types — what the repository returns to pages/components.
// ---------------------------------------------------------------------------
export interface ConsultantSummary extends ConsultantProfile {
  score: PerformanceScore | null
  reviewCount: number
  /** Average overall rating (0–5) across reviews; null when there are none (empty state). */
  avgRating: number | null
}

export interface ConsultantDetail extends ConsultantSummary {
  reviews: Review[]
  listings: ListingWithAgent[]
}

/** Light agent reference embedded in listing cards (photo + name + rating chip). */
export interface ListingAgentRef {
  id: string
  name: string
  slug: string
  verified: boolean
  score: PerformanceScore | null
}

export interface ListingWithAgent extends Property {
  agent: ListingAgentRef
  /** Resolved region/zone names for display (joined by the repository). */
  regionName: string
  zoneName: string | null
}

export interface ListingDetail extends ListingWithAgent {
  similar: ListingWithAgent[]
}

// ---------------------------------------------------------------------------
// Repository filter inputs.
// ---------------------------------------------------------------------------
export interface ConsultantFilter {
  regionId?: string
  specialization?: Specialization
  language?: Language
  /** Only consultants on the Rising Talent board (<6 months, low sample). */
  risingTalentOnly?: boolean
  /** 'ranked' = ranked board (this month); 'all' = full directory. */
  view?: 'ranked' | 'all'
}

/** Discovery sort order. `merit` = the attributed consultant's composite score (desc) —
 *  "presented by the best-rated consultants"; the discovery default (Decision #78). */
export type ListingSort = 'merit' | 'priceAsc' | 'priceDesc' | 'date'

export interface ListingFilter {
  type?: ListingType
  kind?: PropertyKind
  regionId?: string
  zoneId?: string
  /** CAOP location filters (standalone; parallel to regionId/zoneId). */
  distritoId?: string
  concelhoId?: string
  freguesiaId?: string
  minPrice?: number
  maxPrice?: number
  minArea?: number
  maxArea?: number
  beds?: number
  /** Free-text query against title/description. */
  q?: string
  /** When omitted, results keep the legacy createdAt-desc order (unchanged for existing callers). */
  sort?: ListingSort
}
