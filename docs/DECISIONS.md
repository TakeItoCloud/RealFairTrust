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
| 31 | 2026-05-29 | **Visual direction: D1 Midnight Gold** (hybrid: dark marketing + warm light content + verified-green) | See brand/design/direction-1 |
| 32 | 2026-05-29 | **Type: Fraunces (display) + Inter (UI/body)** | next/font/google |
| 33 | 2026-05-29 | **Theme: dark-first marketing + warm light content sections** | |
| 34 | 2026-05-29 | **Keep the verified-green accent** for verified/success only | |
| 35 | 2026-05-29 | **Phase 3 APPROVED**; tokens final (`design-tokens.css` + `tailwind-theme.css`) | Proceed to Phase 4 (Frontend Build) on user go-ahead |
| 36 | 2026-05-29 | **Phase 4: Radix primitives** for Dialog/Dropdown/Tabs/Select; bespoke Tailwind elsewhere | a11y without a heavy UI kit |
| 37 | 2026-05-29 | **Phase 4: Framer Motion** for subtle, reduced-motion-safe motion | |
| 38 | 2026-05-29 | **Phase 4: hero media = optimized poster only** for now; add video loop with real footage | |
| 39 | 2026-05-29 | **Phase 4: build dashboard + admin + auth as UI shells now** (mock data; real auth Phase 5) | |
| 40 | 2026-05-29 | **Phase 4: generate ~12 consultants / ~24 listings seed set** (Lisboa+Porto, incl. Rising Talent) | |
| 41 | 2026-05-29 | **Phase 4 build GREENLIT** — start milestone 4.0 (Foundations) | feat/* → PR → preview → review → merge per milestone |
| 42 | 2026-06-07 | ~~Dark theme retuned to deep sea-navy with radial centre glow~~ | **Superseded by #43** |
| 43 | 2026-06-12 | ~~Background "Sapphire twilight" (darkened) interim values~~ | **Folded into #45** |
| 44 | 2026-06-12 | ~~Accent "Polished foil" gold interim values~~ | **Folded into #45** |
| 45 | 2026-06-12 | **Finalized visual system (Claude Design).** Background = Sapphire twilight `radial-gradient(ellipse 90% 70% at 50% 30%, #122a4f, #0a1a34, #060f22, #020812)`, base #0A1A34, edge #020812, cards #10233C + white-0.07 hairline. Gold: **`.gold-title`** clip gradient (`#ffe6a0→#e3a812`, solid #e3a812 fallback) on titles/logo/prices; **`.btn-gold`** (`#ffe79e→#dca233`, text #2A1D04, inset+drop shadow, hover lift); solid companion **#E3A812** for small pills/badges/chips/borders/icons; labels #E3A812 on navy / **#8C5E12** on ivory (darkened from #d19e1d for AA). Three-tone wordmark: Real #F5F1EA · Fair gold-title · Trust #8A93A3. Type scale (Fraunces hero72/section40/subsection26; Inter lead20/body16/meta13/eyebrow12/button15). Card tokens: radius 22, pad 26, lift −4/−5, img-zoom 1.06, accent-bar, overlay-scrim, plate-bg, surface/raised shadows. **ConsultantCard = "Spotlight"** (horizontal, rank coin + ringed avatar, close-rate hero, #18 honored). **PropertyCard = "Editorial Overlay"** (photo-first, scrim, frosted chips, gold price, icon spec row — energy cert is a NEUTRAL muted label, green stays reserved for verified/success per #34, agent mini-avatar). Framer Motion entrance + hover, reduced-motion-safe. | Supersedes #42–44; cream #F5F1EA + verified-green #3FB984 retained; warm light #FBF8F2 unchanged; AA re-verified (cream/navy 15.4:1, gold/navy 8.2:1, button text 7–10:1, ivory label 5.3:1) |
| 46 | 2026-06-21 | **Design hand-off adopted as authoritative visual spec.** The "RealFairTrust Design System" bundle (`design/handoff/`) supersedes earlier ad-hoc mockups. It is the fully-specified form of #45 (same navy/gold/Fraunces+Inter system) plus the ivory light section, the gold bright/calm split, the full token set, and the Framer-Motion interaction spec. | Reference/spec only — not shipped. See `docs/PROJECT-STATE.md` §7 |
| 47 | 2026-06-21 | **Icons: `lucide-react`** (2px stroke), replacing inline SVGs | |
| 48 | 2026-06-21 | **Fonts via `next/font/google`** (Fraunces + Inter); self-hosting woff2 optional later | Not the bundle's `@import` |
| 49 | 2026-06-21 | **PropertyCard energy certificate stays NEUTRAL/muted**, **overriding** the hand-off's "verified-green" instruction | Green reserved for verification only; upholds #34 |
| 50 | 2026-06-21 | **Token reconciliation done carefully** (alias old→new or migrate references) to keep the build green with least churn | Applied across design-apply run order |
