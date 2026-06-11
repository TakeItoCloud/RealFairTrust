// Shared primitive style fragments. Kept here so every interactive primitive uses the
// same visible gold focus ring and keyboard affordance.

/** Gold focus ring for use on dark surfaces (the default marketing/app chrome). */
export const focusRing =
  'outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink'

/** Gold focus ring for use on warm light content surfaces. */
export const focusRingLight =
  'outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-surface-lt'
