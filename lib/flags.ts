// Feature flags — all off-at-launch features are false here.
// To enable a feature: flip to true and redeploy. No code changes needed.
// See Phase 1 §9 for the full flag map.
export const flags = {
  recursos: false,         // Resources hub — Phase 2+
  clientAccounts: false,   // Client accounts / favourites / messaging — later phase
  matchMode: false,        // "Suggest a consultant" match mode — Phase 2
  mapView: false,          // Map view on listing pages — Phase 2+
  verifiedReviews: false,  // Verified-transaction review gating — Phase 2
  // Dev-only component showcase (/dev/*). Hard-gated to non-production: NODE_ENV is
  // 'production' in `next build`/`next start` and on Vercel, so it can never ship live.
  // Review it locally with `pnpm dev`.
  devShowcase: process.env.NODE_ENV !== 'production',
} as const

export type FeatureFlag = keyof typeof flags
