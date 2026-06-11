// Feature flags — all off-at-launch features are false here.
// To enable a feature: flip to true and redeploy. No code changes needed.
// See Phase 1 §9 for the full flag map.
export const flags = {
  recursos: false,         // Resources hub — Phase 2+
  clientAccounts: false,   // Client accounts / favourites / messaging — later phase
  matchMode: false,        // "Suggest a consultant" match mode — Phase 2
  mapView: false,          // Map view on listing pages — Phase 2+
  verifiedReviews: false,  // Verified-transaction review gating — Phase 2
  devShowcase: true,       // Dev-only component showcase (/dev/*). Set false before production.
} as const

export type FeatureFlag = keyof typeof flags
