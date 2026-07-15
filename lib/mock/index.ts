// Mock data barrel. ONLY the repository in `lib/data/` may import from here —
// components and pages must go through the repository (Phase 4 architecture rule §3.1).
export { regions } from './regions'
export { users } from './users'
export { consultants } from './consultants'
export { scores, demoOutcomeMetrics } from './scores'
export { reviews } from './reviews'
export { listings } from './listings'
export { leads } from './leads'
