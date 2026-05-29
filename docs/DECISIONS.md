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
