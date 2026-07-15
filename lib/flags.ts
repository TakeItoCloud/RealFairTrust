// Feature flags — all off-at-launch features are false here.
// To enable a feature: flip to true and redeploy. No code changes needed.
// See Phase 1 §9 for the full flag map.
export const flags = {
  recursos: false,         // Resources hub — Phase 2+
  clientAccounts: false,   // Client accounts / favourites / messaging — later phase
  matchMode: false,        // "Suggest a consultant" match mode — Phase 2
  mapView: false,          // Map view on listing pages — Phase 2+
  verifiedReviews: false,  // Verified-transaction review gating — Phase 2
  // Dev-only component showcase (/dev/*). Visible everywhere EXCEPT the real production
  // deployment: on Vercel, only the production deploy (main) sets VERCEL_ENV='production',
  // so previews (feat/develop) and local `pnpm dev` / `pnpm build && pnpm start` (VERCEL_ENV
  // unset) keep it ON, while it can never ship on the live production site. Narrowed from the
  // prior NODE_ENV gate so Cycle-1 card metrics are reviewable on the feat preview (Decision #90).
  devShowcase: process.env.VERCEL_ENV !== 'production',
} as const

export type FeatureFlag = keyof typeof flags
