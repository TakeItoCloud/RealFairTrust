# Decisions Log — RealFairTrust

> Locked choices only. One line each. If a decision changes, add a new dated line; don't
> delete history.

| # | Date | Decision | Notes |
|---|------|----------|-------|
| 1 | 2026-05-28 | Brand name is **RealFairTrust** | Replaces old prototype name "Agentra" |
| 2 | 2026-05-28 | Treat as a **real launch**, **city-limited** MVP | Assumed Lisbon + Porto — to confirm |
| 3 | 2026-05-28 | **Hosts property listings** (buy/rent/sell) inside MVP | Sequenced build, schema-first, additive only |
| 4 | 2026-05-28 | Revenue: **commission split + optional agent Pro subscription**; clients free | |
| 5 | 2026-05-28 | Rating: **rolling 90-day window, recomputed monthly** | Not cumulative |
| 6 | 2026-05-28 | Rating: **per-opportunity normalization** + **"Rising Talent" board** (<6 mo) | Fairness for newcomers |
| 7 | 2026-05-28 | Accounts: **agent + admin first**; client accounts later; clients browse/contact without account | |
| 8 | 2026-05-28 | Keep the **gold-on-dark luxury** brand direction and a hero-led homepage | Carry equity from prototype |
| 9 | 2026-05-28 | Stack: **Next.js 15 / React 19 / TS / Tailwind 4 / Framer Motion / next-intl / Supabase**; pnpm | Enhance, don't replace |
| 10 | 2026-05-28 | Infra: remote Linux `192.168.16.11:/projects/RealFairTrust`, GitHub repo, **Vercel** deploy | Branch model main→develop→feat/* |
| 11 | 2026-05-28 | Deliverables per phase: high-level **.md + branded Word doc**, with recommended options | Stop & ask before each next phase |
| 12 | 2026-05-29 | **Logo: Concept C (Verified Roofline)** primary; **Concept B (Seal)** = in-product "Verified" badge | Refined in Phase 3 |
| 13 | 2026-05-29 | **Launch cities: Lisbon + Porto** | New cities = data + feature flag (see notes/city-expansion.md) |
| 14 | 2026-05-29 | **Listings source: agents only at launch** | Owner-direct revisited later |
| 15 | 2026-05-29 | **Language: PT primary, EN secondary**; PT default on first visit | next-intl |
| 16 | 2026-05-29 | **Rating weights** 35/25/15/15/10 (satisfaction/close/responsiveness/conversion/activity) | Confirmed |
| 17 | 2026-05-29 | **Phase 0 APPROVED** | Proceed to Phase 1 on user go-ahead |
| 18 | 2026-05-29 | **Score display:** badges + "building track record" first; reveal numeric score once sample is statistically fair | |
| 19 | 2026-05-29 | **Seller lead routing:** client picks from top matching local consultants + "suggest for me" option | |
| 20 | 2026-05-29 | **Listings at launch:** seed a curated, clearly-flagged set per launch city until real inventory builds | |
| 21 | 2026-05-29 | **Locale URLs:** localized pathnames + hidden default locale (PT) | next-intl |
| 22 | 2026-05-29 | **Consultant slug:** name-based, numeric suffix on collision | Applied as recommended default |
| 23 | 2026-05-29 | **Reviews at launch:** collect now with manual moderation; verification gating in Phase 2 | |
| 24 | 2026-05-29 | **Phase 1 APPROVED** | Proceed to Phase 2 (Wireframes) on user go-ahead |
| 25 | 2026-05-29 | **Hero:** conversion-first split (value + inline search left); contained media panel right — poster-first, optional muted looping video on idle (off under reduced-motion), with a "Top this month" proof card | Keeps video safely; see `brand/wireframes/wf-home-hero-recommended.svg` |
| 26 | 2026-05-29 | **Leaderboard:** card grid + "Top this month" badges + subtle rank in Ranked view | |
| 27 | 2026-05-29 | **ConsultantCard:** badges + close rate + specialization (full sub-signal breakdown on profile) | |
| 28 | 2026-05-29 | **Contact form:** inline on desktop; sticky button → full form on mobile | |
| 29 | 2026-05-29 | **Dashboard nav:** left side-nav | |
| 30 | 2026-05-29 | **Phase 2 APPROVED** | Proceed to Phase 3 (Visual Design) on user go-ahead |
