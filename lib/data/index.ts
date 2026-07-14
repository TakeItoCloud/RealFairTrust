// Data repository — the ONLY data surface components and pages may import.
// In Phase 4 these functions read mock fixtures; in Phase 5 the same signatures
// switch to Supabase, making the backend swap non-breaking (Phase 4 §3.1).
export { getRegions, getRegion } from './regions'
export { getConsultants, getConsultant, getConsultantsByArea } from './consultants'
export type { AreaConsultantMatch, CoverageTier } from './consultants'
export { getListings, getListing, getSimilarListings } from './listings'
export { createLead, getLeads } from './leads'
