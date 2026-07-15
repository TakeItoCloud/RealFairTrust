# RealFairTrust — PROJECT STATE (Master Snapshot)

## ⚡ HANDOFF — read this first (30-second orientation)

**Updated 2026-07-14 · Phase 4.3 (public pages), in progress.**

**Coverage:** all of Portugal, including **Madeira & Açores** (CAOP2025 administrative data).

**PROMOTED to `main` (Vercel production/review) 2026-07-15 — `main` == `develop` == `b26554e` at parity.** `main` now serves **all Phase 4.3 public pages** (previously only Home/Consultores/profile): Home (full-bleed **video hero**) · Consultores discovery · Consultant profile · Buy/Rent · Location hierarchy · Property detail · Vender · Como funciona · Metodologia · Sobre · Termos · Privacidade — on seed/mock data, placeholder imagery. **⚠ REVIEW CHECKPOINT:** Phase 4.3 is in **colleague review on the production/review subdomain — NOT signed off**. (Termos + Privacidade are DRAFTS — a Phase 6 legal-review blocker.)

**`main` and `develop` at parity** (`b26554e`) — the promotion was a no-squash fast-forward preserving full history.
- **Buy/Rent discovery** — `/comprar` + `/arrendar` (EN `/buying` · `/renting`) — **PR #8** (`b2f4289`).
- **Location hierarchy** — CAOP **Distrito → Concelho → Freguesia** picker (on-demand, inventory-driven) + **nearby fallback** (widen freguesia→concelho→distrito, grouped) + **area-specialist CTA** — **PR #9** (`9823ee8`).
- **Property detail** — `/imovel/[id]` (EN `/property/[id]`): gallery · gold price · specs + energy badge · CAOP location · consultant mini-card · sticky lead form · similar listings — **PR #10** (`4cff804`).

**Also merged to `develop`** (`develop` HEAD now = `e2aafc2`): **Vender** discovery `/vender` (EN `/selling`) — seller value-prop + the PR #9 location picker in **coverage mode** + **merit-ranked consultants who cover the chosen area** via `getConsultantsByArea` (inclusive hierarchical coverage + strict tiered widening Freguesia→Concelho→District, most-specific-wins; request-a-consultant fallback). **PR #12** (merge `e2aafc2`; commit `42a9bbb`). Decision **#86**.

**IN PROGRESS — review-change set (4 cycles):**
- **Cycle 1/3 MERGED to `develop`** (PR #15, merge `c133dc0`; feature `4f5ef69`; `main` untouched). Two
  additive DEMO consultant outcome metrics (**units sold 12mo** + **avg time-to-sell**), OPTIONAL on
  `ConsultantSummary`, on `ConsultantCard` behind an **opt-in `showMetrics` prop (off by default)** with
  a muted "demo values" caption; real data deferred to Phase 5 (Decision #90). Dev-showcase gate narrowed
  to `VERCEL_ENV!=='production'` (visible on previews + local; **verified 404 on a true production build**).
- **Cycle 2/3 MERGED to `develop`** (PR #16, merge `914da3a`; feature `2cc9429`; mirrors the prior 4.3
  PRs — banked to `develop`, **`main` untouched**). **Vender** ranks the matched tier by composite desc
  with **option-(i) confidence handling** (building/unscored sink to the bottom, never highlighted;
  verbatim condition `!!score && !score.risingTalent && score.confidence !== 'low'`), **highlights the #1
  confident** consultant with the existing rank-1 spotlight (`featured` — no new style, no green), and is
  the **first real page to enable the Cycle-1 demo metrics** (`showMetrics` on the Vender cards). The
  tiered widening (#86), tier labels, and picker are **UNCHANGED**. Diff = `app/[locale]/vender/page.tsx`
  only (Decision #91). Gates green on `develop` post-merge.
- **Cycle 3/3 MERGED to `develop`** (PR #17, merge `cbd7a44`; feature `40e8ce2`; mirrors the prior 4.3
  PRs — banked to `develop`, **`main` untouched**). **Consultores** discovery: the old Region filter is
  replaced by the CAOP Distrito→Concelho→Freguesia picker (coverage mode, reused unmodified). **No
  location = default view byte-for-byte identical to today** (option B: no metrics, existing per-region
  highlight, Rising strip). **Location selected** → both boards scoped to covering consultants
  (`getConsultantsByArea`, tiered widening #86 unchanged), ranked composite-desc with option-(i)
  confidence handling, #1 confident `featured`-highlighted, Cycle-1 demo metrics ON; specialization +
  Ranked/All still compose; URL round-trips. Page-layer + Consultores-only filter; **zero repository
  change** (Decision #92). Gates green on `develop` post-merge. **This discharges the "apply the same
  #86 matching rule to Consultores" note (below) — DONE.**

- **Cycle 4/4 MERGED to `develop`** (PR #18, merge `9fb0bd8`; features `d0c4f1c` + the Vender dedup
  `e7405ac`; **`main` untouched**). **Consultores discovery redesign + a shared card work-area line**
  (Decision #93). (a) Ranked view = ranked board FIRST, Rising Talent BELOW; (b) All view = one grid + a
  **Merit/Houses/Time sort control** (`?sort`; metrics visible; demo keys marked); (c) an explicit
  **"Everywhere / Todo o país"** default district option (== today's national board) via an additive
  opt-in `everywhereLabel?` prop on the shared `LocationPicker` (Buy/Rent + Vender unchanged); (d) an
  **always-on card work-area line** (most-specific coverage level) via additive `ConsultantSummary.workArea`,
  rendered on `ConsultantCard` + the profile header + Buy/Rent `SpecialistCTA`; **Vender dedup** — its
  wrapper keeps the search-relative coverage line, the card line is suppressed there via
  `showWorkArea={false}` (default true elsewhere). **Metrics are now VIEW-BASED** (All=on, Ranked=off —
  supersedes #92). No repository behaviour change. Gates green on `develop` post-merge.

**→ ALL FOUR review-feedback cycles are now MERGED to `develop`** (PRs #15/#16/#17/#18; `develop` HEAD
`9fb0bd8`). The set is complete on `develop` → **`develop → main` promotion** next (**`main` at `b26554e`**).

**Also merged to `develop`** (`develop` HEAD now = `0dc6155`): **Como funciona** `/como-funciona` (EN `/how-it-works`) — client-facing 3-step explainer (navy hero · champagne steps · weights strip 35/25/15/15/10 · green=verificação note · dual CTA) — and a **NEW Metodologia** page `/metodologia` (EN `/methodology`; new route #87) — long-form rating-model spec (§1–§6 navy/champagne bands · weights table · Rising-Talent/Building-track-record badge echo · **DGT/CAOP CC BY 4.0 attribution**). **PR #13** (merge `0dc6155`; commit `d2a8eb4`). Decisions **#87/#88**.

**Also merged to `develop`** (`develop` HEAD now = `a44b0e9`): **Sobre** (`/sobre` · EN `/about`), **Termos** (`/termos` · EN `/terms`), **Privacidade** (`/privacidade` · EN `/privacy`). **This COMPLETES the Phase 4.3 public pages.** Termos + Privacidade ship as **visibly-marked DRAFTS** (neutral draft-notice banner) — see the launch-blocker below. **PR #14** (merge `a44b0e9`; commit `e2f3c34`). Decision **#89**.

**⚠ LAUNCH BLOCKER (Phase 6):** **Termos + Privacidade require professional legal review** before go-live, plus real **contact / controller / retention** values (currently intentionally bracketed placeholders). Not legal advice; drafts only.

**NEXT (build all done for 4.3):**
1. **Phase 4.3 public pages = COMPLETE** → decide the **`develop → main` promotion** (with Carlos).
2. Then **Phase 4.4 app shells** (dashboard/admin/auth — UI-only) — **await Carlos** (phase-gate).

**~~LATER~~ DONE (Cycle 3, #92, PR #17):** the SAME location-based consultant-matching rule (#86: inclusive hierarchical coverage + strict tiered widening) is now applied to the **Consultores discovery** page — Vender and Consultores are consistent.

Then **Phase 4.4** app shells (dashboard/admin/auth — UI-only) → **4.5** polish (real imagery, `next/image`, a11y/perf/responsive QA, motion) → **Phase 5** Supabase + rating engine → **Phase 6** launch.

**REMAINS in 4.3:** Vender + the five static pages above.

**PARKED / LATER (not now):**
- **Green energy badge vs "green = verification-only"** — the PropertyCard/detail energy badge renders green (#52); revisit the semantic collision in **4.5**.
- **`server-only` hard guard** for the CAOP loader (`lib/data/geo/caop.ts`) — currently server-only *by convention* (comment); add the `server-only` package later.
- **Comment typo:** in `lib/mock/consultants.ts`, distrito `17` is **Vila Real** (a comment mislabels it "Viana do Castelo"); **the data is correct** — comment-only.
- **Unify the two location models** — CAOP (new, discovery) and the old `district→city→zone` Region model (Home/Consultores/profile) **coexist**; unify/retire the old one later (likely with Phase 5).
- **Map view** (Leaflet + OSM + geocoding) + **radius filter** — deferred to a later phase.

**WORKING CONVENTIONS (locked):**
- **Planning chat** (claude.ai) authors **clean, paste-only prompts** for Claude Code — any remarks/notes go *outside* the prompt block. **Claude Code** (VS Code Remote-SSH → Linux `192.168.16.11`, `/projects/RealFairTrust`) does **all** builds/git.
- **Flow:** `feat/*` branch → **PR** → **Vercel preview** → **user approval** → **merge** (`feat/* → develop → main`). **Never** export the repo to Windows.
- **≥90%-sure-or-ask** (§0) · **phase-gate discipline** (stop & ask before each phase) · **RFT visual identity locked** · **additive data-layer changes with caller audits** · **don't touch built pages / shared components without approval**.

_Full detail below; `docs/DECISIONS.md` (log, through #85) + `docs/WORKLOG.md` (per-session history) remain authoritative._

---

> **Purpose.** Single orientation document for the project. If you are starting a **new planning chat** (claude.ai) or a **new Claude Code session** (VS Code), read this file first. It holds roles/workflow, locked decisions, the visual system, the **complete phase roadmap**, what is done, what is next, and what is still open. `docs/DECISIONS.md` and `docs/WORKLOG.md` on the machine remain authoritative for the full decision log and per-session history; this file is the high-level snapshot — **keep it in sync every session.**
>
> **Last updated:** 2026-07-15 (**Phase 4.3 PROMOTED to `main`** — `develop → main` no-squash fast-forward; `main` == `develop` == `b26554e` at parity; all 4.3 public pages now live on the Vercel production/review subdomain. **REVIEW CHECKPOINT — 4.3 in colleague review, NOT signed off.** NEXT = await Carlos's 4.3 review feedback, then decide 4.4). Prior 2026-07-15 (**Sobre + Termos + Privacidade merged to `develop`** — PR #14, `develop` HEAD `a44b0e9`; Decision #89; legal pages are marked DRAFTS + Phase 6 launch blocker. Phase 4.3 public pages COMPLETE). Prior 2026-07-15 (**Como funciona + NEW Metodologia merged to `develop`** — PR #13, `develop` HEAD `0dc6155`; new `/metodologia` route + Decisions #87/#88; NEXT = Sobre/Termos/Privacidade). Prior 2026-07-14 (**Vender `/vender` merged to `develop`** — PR #12, `develop` HEAD `e2aafc2`; Decision #86; `docs/COPY-NOTES.md` collection file added; 4.5 copy-pass note recorded). Prior 2026-07-14 (docs sync — Buy/Rent **PR #8**, Location hierarchy **PR #9**, Property detail **PR #10** all merged to `develop` (`48598e9`); HANDOFF block added at top; §8/§11 refreshed). Prior: 2026-06-25 (**DESIGN REVISION PROMOTED TO `main`** — champagne (#57–#64) + Home video (#65–#76) consolidated → `develop` → `main` preserving history; the full-bleed cinematic **video-hero Home** is live on Vercel production; `main` and `develop` at parity, freeze lifted, the merged `chore/design-revision-*` chain cleaned up. §8/§11/§12 + "Last updated" flipped to PROMOTED.) Prior: 2026-06-25 (Home video revision RH1→RH5 complete + unmerged). 2026-06-24 (champagne R1→R5; #57–#64). 2026-06-23 (design-apply promoted to `main`; §11).

---

## 0. STANDING BEHAVIORAL RULE (every chat + Claude Code session)

**Claude must never guess.** Do not answer without being **≥90% sure it is accurate**. If information, full context, or a clear understanding is missing, **ask clarifying questions first**. Only answer after researching as needed, reasoning carefully, having full context, and reaching ≥90% certainty. Verify product/tool/UI facts before asserting them. *(Set in Carlos's claude.ai Profile preferences for global effect, in this Project's memory, in the Project instructions box, and here + in `CLAUDE.md`.)*

---

## 1. ROLES & WORKFLOW

- **Planning chat (claude.ai):** authors PLAN docs (`.md` + branded `.docx`), decisions, logos, wireframes, visual specs, and the milestone **PROMPTS** Carlos pastes into Claude Code. **Cannot** access the remote machine.
- **Claude Code (VS Code, Remote-SSH → Linux `192.168.16.11`, repo `/projects/RealFairTrust`):** does **all** builds, git, GitHub, command execution. **Owns** `docs/WORKLOG.md` and the status sections of `CLAUDE.md`.
- **Handoff rule (Phase 4):** planning chat gives **PROMPTS ONLY** (no tarballs) to avoid overwriting `WORKLOG.md`. File transfers go via VS Code drag-drop or a contents-style tarball extracted **inside** `/projects/RealFairTrust`.
- **Documents → planning chat. Commands/code/git → Claude Code.**
- **Phase-gate discipline:** every phase ends with a **stop-and-ask** before the next. Each prompt reads the plan docs first, does the work, ends at a **GREEN build**, updates the docs, then stops.
- **Recommendation style:** single recommended path, not a menu, unless Carlos asks to compare.
- **Carlos** is in Lisbon, non-expert at git/devops — keep guidance plain, concrete, step-by-step.

**Docs on the machine:** `CLAUDE.md` (root, auto-read) · `docs/PROJECT-STATE.md` (this file) · `docs/DECISIONS.md` (authoritative log) · `docs/WORKLOG.md` (append-only, Claude Code owns) · `START-HERE.md` · `docs/phases/` · `docs/DESIGN-APPLY-PLAN.md` (created in design-apply step 1) · `design/handoff/` (the design system reference bundle).

---

## 2. PRODUCT

**RealFairTrust** — bilingual (PT primary / EN secondary) **merit-based real-estate marketplace** for Portugal, launching **city-limited to Lisboa + Porto**. Connects clients with consultants, differentiated by a **performance rating engine**: rolling **90-day** window, **recomputed monthly**, **per-opportunity normalization**; **Rising Talent** board for consultants <6 months; scores as **badges + "building track record"** until statistically confident, then a number (#18); weights **satisfaction 35 / close-rate 25 / response 15 / lead-conversion 15 / opportunities 10** (#11). Brand = **Real · Fair · Trust**. Clients free; revenue = commission + optional agent **Pro** subscription. Agent + admin accounts first; clients browse without an account.

---

## 3. TECH STACK (LOCKED)

Next.js App Router (scaffold **Next 16.2.6**) · React 19 · TypeScript strict · Tailwind CSS 4 · Framer Motion · next-intl (PT default) · Supabase (Phase 5) · React Hook Form + Zod · pnpm · **Node 22 via nvm / `.nvmrc`** · Radix only for Dialog/Dropdown/Tabs/Select (#36) · **icons: `lucide-react` (#47)** · **fonts: Fraunces + Inter via `next/font/google` (#48)**.
GitHub: `github.com/TakeItoCloud/RealFairTrust` (private). Branches: `main → develop → feat/*`.

---

## 4. DECISIONS (LOCKED) — summary of `docs/DECISIONS.md`

**#1–#45** (see `docs/DECISIONS.md` for full text). Highlights: name + Lisboa/Porto launch; commission + Pro subscription; rating rolling-90/monthly/per-opportunity + Rising Talent; weights 35/25/15/15/10; **#12** logo Concept C "Verified Roofline" = primary mark, Concept B "Trust Seal" = in-product verified badge; **#15** PT primary/EN secondary; **#18** badge-until-confident; **#20** seeded listings flagged `isDemo`; **#22** consultant slug; **#32** Fraunces + Inter; **#34** verified-green is verification-only; **#36** Radix scope; **#37** Framer Motion subtle/reduced-motion-safe; **#40** ~12 consultants/~24 listings; **#41** Phase 4 greenlit; **#45** finalized visual system (now superseded in detail by the design hand-off, #46). *(Note: **#34** verification-only is relaxed by **#52** — green also denotes the energy cert.)*

**Logged #46–#50:**
- **#46 — Design hand-off adopted.** The "RealFairTrust Design System" bundle (`design/handoff/`) is the **authoritative visual spec**, superseding earlier ad-hoc mockups. It is the fully-specified form of #45 (same navy/gold/Fraunces+Inter system) plus the ivory light section, the gold bright/calm split, the full token set, and the Framer-Motion interaction spec.
- **#47 — Icons: `lucide-react`** (2px stroke), replacing inline SVGs.
- **#48 — Fonts via `next/font/google`** (Fraunces + Inter); self-hosting woff2 optional later.
- **#49 — ~~PropertyCard energy certificate stays NEUTRAL/muted~~ SUPERSEDED by #52** (energy cert now renders green per the zip).
- **#50 — Token reconciliation done carefully** (alias old→new or migrate references) to keep the build green with least churn.

**Governance sync (2026-06-22), logged as #51–#53:**
- **#51 — DESIGN AUTHORITY (supremacy rule).** The Claude Design export (`design/handoff/`) is the **supreme authority for all visual/design values**, superseding any conflicting prior decision — **except** where the zip's literal value damages **WCAG AA** or **performance**, in which case the AA/perf-safe deviation is retained and documented (#53). When the zip self-contradicts, its `README.md` wins.
- **#52 — Energy cert renders GREEN** per the zip (EU/PT energy-label convention). **Supersedes #49; explicit exception to #34** — verified-green is no longer verification-exclusive. Implemented in run-order Step 4.
- **#53 — AA/perf exceptions retained under #51** (ratios measured, not estimated): **(a)** ivory label gold **#8C5E12** (5.32:1; zip's #d19e1d = 2.30:1, fail); **(b)** verified-ink-on-light **#157048** (5.22:1 on the real badge bg; supersedes the interim #1E8F62 = 3.48:1 fail and the zip's #2f9a6c = 3.01:1; token swap Step 3); **(c)** fonts via `next/font/google` (#48), not the zip `@import`; **(d)** type scale per the zip README (hero 72 / section 40), not the bundle's `typography.css` (hero 76).

**Design-apply implementation decisions, logged as #54–#56:**
- **#54 — Radius scale adopted project-wide** (Step 3): `rounded-sm`=6 · `rounded-md`=14 (was 10) · `rounded-lg`=20 (was 16), via re-pointing `--rft-r-*` → `--radius-*`; form wells pin `--radius-sm` (10), cards keep `--card-radius` (22).
- **#55 — Icon layer = `lucide-react` re-export shim** (implements #47): `components/ui/icons.tsx` keeps the `Icon*` names as thin lucide wrappers (2px stroke, currentColor) so consumers are unchanged; inline SVGs removed.
- **#56 — Home section rhythm canonical** (Step 5/6): N·I·N·N·I·N·N (ivory rhythm). **⚠ SUPERSEDED by #61** (champagne rhythm).

**DESIGN REVISION decisions, logged as #57–#64 (2026-06-24; R-series, on the `chore/design-revision-*` chain, UNMERGED):**
- **#57 — Design revision adopted** (new champagne export = supreme visual source of truth; extends #51).
- **#58 — Background** new brighter centred radial `#1e4680…#040e20`. **Supersedes the #45/#46 background.**
- **#59 — Gold** symmetric 90° title + button(+hover) gradients. **Supersedes the #45 180°/160°** (hover → README §1.2 token).
- **#60 — Type scale** hero 76 / section 42 / display-2 56 + kit aliases. **SUPERSEDES #53(d)** (72/40).
- **#61 — Champagne family** + `.rft-champagne`/`.rft-step-card`; champagne ONLY on Home "Como Funciona" + footer. **SUPERSEDES the #56 ivory rhythm.**
- **#62 — Home composition = the marketing kit** (search-pill hero + featured card + floating stat · champagne HowItWorks · leaderboard · featured · agent-CTA · champagne footer); the "split" + "trust band" sections **REMOVED**.
- **#63 — Component alignment** (R3): Button = pill (a11y tap targets kept); Select `(string\|{value,label})[]`; Eyebrow `tone="champagne"`; ConsultantCard name kept w/ AgentCard spec (#G); `onIvory ≡ onLight`.
- **#64 — AA/a11y exceptions** (measured, fail-closed): muted .58→.70 (4.66); navy small-gold #e3a812→**#efb52a** (5.04, shared token); champagne-eyebrow #a9791a→**#7c5a12** (4.90); ivory-label #8C5E12 kept (moot on champagne); verified-ink #157048 carried; hero featured + floating stat raised→**.035** fill (4.66); on-dark green TEXT → **`--green-verified-strong #5fd2a1`** (4.58); verified pill + Badge tinted chips → **solid dark chip** (green 6.78 / gold 9.05).

**HOME VIDEO REVISION decisions, logged as #65–#76 (2026-06-25; RH-series, on the `chore/design-revision-home-*` chain, UNMERGED):**
- **#65 — Home-page video revision adopted** (new `design/handoff-home/` bundle = supreme Home source of truth; extends #57/#51). **Full-bleed cinematic video hero = DEFAULT** (84vh breakout); contained-panel mode kept in reference only, **not built**. **Supersedes the R4 search-pill Home (#62).**
- **#66 — Hero headline** "O futuro do imobiliário / está em cada um de nós." (gold-gradient italic line 2); full-bleed h1 uses a **Home-specific clamp ~max 62px**, distinct from the 76 display token (#60).
- **#67 — Staged hero entrance (~2.6s)** with the **export-safety contract** (base visible; SSR/no-JS/reduced-motion show the final layout instantly — never a blank hero).
- **#68 — Real/Fair/Trust brand reveal** (crossfade 3000ms, start-delay 2750ms, own radial scrim; reduced-motion → static lines).
- **#69 — `--gold-on-light #8C5E12`** (named alias of `--rft-gold-deep`) for the on-light wordmark/mark.
- **#70 — Roofline-mark `Logo` built (#12 finally implemented):** mark + tri-tone wordmark; on-light variant uses **#8C5E12** for "Fair" + mark (logotype exemption, 4.38:1 on champagne).
- **#71 — AgentCard fill darkened to solid `#0c1d39`** (`--surface-card-solid`); featured merit 56px. **AA win:** muted .70 → **7.82:1**.
- **#72 — Slim-15px navy↔champagne fade transitions** (`.rft-champagne--fade-both`/`--fade-top`; no hard line/shadow).
- **#73 — "Top este mês" row:** equal-height cards + full names (no truncation); coins use the **GLOBAL ranked-list position via `displayRank`** (featured 1, row 2/3/4), distinct from the per-region `score.rank` used by the Consultores leaderboard; #18 gating preserved; **EXPLORE scroll cue = accessible button**.
- **#74 — Hero video optimized 8.0→1.6 MB** (libx264 crf24 +faststart). **KNOWN 4.5 item:** 5s clip has a hard loop seam (SSIM 0.22) → crossfade-loop / longer clip at polish.
- **#75 — Footer DEVIATION recorded:** kept the existing 4-column real-route footer rather than inject the handoff's 3-col placeholder business contact (addresses/email) — **real contact details pending from Carlos**.
- **#76 — Seed photo 404s expected** (initials fallback); real imagery is a 4.5 item.

---

## 5. FULL PHASE ROADMAP & STATUS (nothing dropped)

| Phase | Scope | Status |
|---|---|---|
| 0–3 | Brand, strategy, IA, design groundwork | ✅ APPROVED / LOCKED |
| **4** | **Build public site + UI shells** | 🟡 IN PROGRESS |
| 5 | Supabase integration (replace mock data layer; auth; real data; wire rating engine) | ⬜ Not started |
| 6 | Launch (domain `realfairtrust.com`, Vercel production, SEO, analytics) | ⬜ Not started |

### Phase 4 milestones (full list — kept intact)
- **4.0 Foundations** — ✅ DONE (PR #4). Types + repository (Supabase-swap-ready) + typed seed + next-intl scaffolding + base layout.
- **4.1 Primitives** — ✅ DONE (PR #5). 16 `components/ui/` primitives + `/dev/primitives`. *(Revisited in design-apply step 3.)*
- **4.2 Composite components** — ✅ DONE (PR #6). Header/Footer/ConsultantCard/PropertyCard/ScoreBreakdown/FilterBar/LeadForm/ReviewItem/Pagination/CookieBanner/Modal/Toast + `/dev/components`. *(Revisited in design-apply steps 3–4.)*
- **4.3 Public pages** — 🟡 IN PROGRESS (PR #7 **MERGED** → banked to `develop`; promoted to `main`):
  - ✅ Home (`/[locale]`) *(REBUILT to the marketing kit in the revision R4 — search-pill hero + featured card + floating stat · champagne HowItWorks · leaderboard · featured · agent-CTA · champagne footer; #62)*
  - ✅ Consultores (`/[locale]/consultores`) *(inherits the revision look via tokens)*
  - ✅ **Design-System Application sub-phase — COMPLETE (run order 1→6 done; see §6).** Then **DESIGN REVISION R1→R5 COMPLETE** (champagne export; #57–#64) — on the `chore/design-revision-*` chain, **UNMERGED** (see §12).
  - ✅ **Buy/Rent discovery (`/comprar` + `/arrendar`)** — one shared `Discovery` RSC, two modes (sale/total · rent/€mês); reused `FilterBar` (evolved with a `dealType` mode) + `PropertyCard`/`Pagination`/`EmptyState` unmodified; merit-default sort + additive `kind`/area/sort filters (#77–#79); PT+EN parity. **Merged to `develop` (PR #8, `3b5012f`).**
  - ✅ **Location hierarchy (CAOP2025) on discovery** — Distrito→Concelho→Freguesia picker (replaces Localização+Zona), standalone CAOP dataset + typed loader + on-demand inventory-driven `/api/geo`; additive `Property.freguesiaId` + `ConsultantProfile.coverageDistrictIds`; nearby fallback + area-specialist CTA; sort merit→price→date (#80–#84). Built 2026-07-13 on `feat/location-hierarchy` (gates green; **PR/preview pending Carlos sign-off**). **Two location models now coexist** (CAOP + old Region); unify later.
  - ✅ **Property detail (`/imovel/[id]`)** — gallery · gold price · specs+energy badge · description · location Freguesia·Concelho·Distrito (CAOP) · consultant mini-card → profile · sticky lead panel · similar-listings (additive `getSimilarListings`, concelho→distrito; `getListing` untouched) (#85). Built 2026-07-13 on `feat/property-detail` (gates green; **PR/preview pending Carlos sign-off**).
  - ✅ **Vender discovery (`/vender` · EN `/selling`)** — seller value-prop + "how it works" steps; reuses the exact PR #9 `LocationPicker` in **coverage mode** (additive `source` on inventory/`/api/geo`/picker; Buy/Rent unchanged); **merit-ranked consultants covering the chosen area** via new additive `getConsultantsByArea` (inclusive hierarchical coverage + strict tiered widening Freguesia→Concelho→District, most-specific-wins; district tier = everyone working anywhere in the district; request-a-consultant CTA only when no tier matches). Additive optional `coverageConcelhoIds?`/`coverageFreguesiaIds?` (coverageDistrictIds unchanged); `ConsultantCard` reused UNMODIFIED (page-level coverage-note wrapper); no shared-styling touched. #86. Built 2026-07-14 on `feat/vender`; **merged to `develop`** (PR #12, merge `e2aafc2`; commit `42a9bbb`; gates green post-merge). **LATER:** apply the same #86 rule to Consultores discovery during final tweaks (not now).
  - ✅ **Como funciona (`/como-funciona` · EN `/how-it-works`) + Metodologia (`/metodologia` · EN `/methodology`, NEW route #87)** — Como funciona = client-facing 3-step explainer (navy hero · champagne numbered steps · "A pontuação em 60 segundos" weights strip 35/25/15/15/10 · verde=verificação note (#34) · dual CTA → /consultores + /vender). Metodologia = long-form rating-model spec (§1–§6 alternating navy/champagne · weights table (Fraunces gold numerals) · §4 real Badge echo · **DGT/CAOP CC BY 4.0 attribution** — required formula "Direção-Geral do Território (DGT)" per NOTICE.md · final CTA → /consultores). Confidence threshold stated qualitatively (#88). Footer "Empresa" column gained a Metodologia link. Copy = final approved, verbatim, PT/EN. Server components + Reveal; no shared-component styling changed; champagne extended to these static pages per spec (extends #61). #87/#88. Built 2026-07-14 on `feat/static-como-metodologia`; **merged to `develop`** (PR #13, merge `0dc6155`; commit `d2a8eb4`; gates green post-merge).
  - ✅ **Sobre (`/sobre` · EN `/about`) + Termos (`/termos` · EN `/terms`) + Privacidade (`/privacidade` · EN `/privacy`)** — Sobre = brand story (navy hero · champagne problem/response two-column · 4 principle tiles with lucide icons · dual CTA → /consultores + /como-funciona). Termos (8 sections) + Privacidade (7 sections) = simple navy document layout (prose column) with a **calm neutral draft-notice banner** (NOT green) — structurally-sound GDPR-aware **DRAFTS**, not lawyer-reviewed; bracketed contact/controller/retention placeholders (#89). Copy = final approved, verbatim, PT/EN; new `sobre`/`termos`/`privacidade` namespaces; server components; no shared-component styling changed. #89. Built 2026-07-15 on `feat/static-sobre-legal`; **merged to `develop`** (PR #14, merge `a44b0e9`; commit `e2f3c34`; gates green post-merge). **⚠ Termos + Privacidade = Phase 6 launch blocker (legal review + real contact/controller/retention).**
  - ✅ **Phase 4.3 public pages COMPLETE** (pending the above PR merge). NEXT = decide `develop → main` promotion, then Phase 4.4 shells (await Carlos).
- **4.4 App shells** — ⬜ TODO. Dashboard, admin, auth — **UI-only** (#39).
- **4.5 Polish** — ⬜ TODO. Real imagery (hero + property photos), **PT/EN copy pass** (applies everything collected in **`docs/COPY-NOTES.md`** — copy/title/description wording is COLLECTED there during 4.3/4.4, not edited piecemeal; the only exception is factually-wrong text, fixed immediately as a bug), accessibility, performance, responsive QA, motion polish.

---

## 6. DESIGN-SYSTEM APPLICATION (run order 1 → 6) — ✅ COMPLETE (2026-06-22; banked to `develop` + promoted to `main` 2026-06-23)

Reconciled the codebase to the adopted design hand-off (#46). Each step = one green-gated Claude Code prompt. **All six steps done; build green; AA verified.** Authoritative detail: `docs/DESIGN-APPLY-PLAN.md` §3 (all ✅) + the 2026-06-22 `docs/WORKLOG.md` entries.

1. ✅ **Review + reconciliation plan** → `docs/DESIGN-APPLY-PLAN.md`.
2. ✅ **Tokens** — hand-off token layer (additive, aliased); `lucide-react` added; fonts via `next/font/google`.
3. ✅ **Primitives** — Button/Card/StatBlock/RankBadge/Badge/Tag/Avatar to spec; radius remap (#54); lucide shim (#55); verified-ink #157048 (#53).
4. ✅ **Cards** — ConsultantCard "Spotlight" + PropertyCard "Editorial Overlay" on translucent surfaces + Framer Motion; **energy cert GREEN (#52, supersedes #49)**.
5. ✅ **Home section variety** — `.rft-ivory` breaks + navy alternation (rhythm #56); muted .58; warm hairline.
6. ✅ **Consultant profile page** (`/[locale]/consultores/[slug]`) re-skinned onto the finalized system: header (seal + 38px gold merit, #18), ScoreBreakdown Card (+weights #16), about, listings as PropertyCards, reviews + Diogo 0-review empty state, inline/sticky LeadForm (#28), `getConsultant(slug)` + `notFound()`.

**NEXT (per §5):** the **remaining 4.3 pages** (Buy/Rent, Property detail, Vender, static) → **4.4 shells** → **4.5 polish** → **Phase 5 (Supabase)** → **Phase 6 (launch)**.

**Prompts 2–6 are authored by the planning chat *after* Prompt 1's gap analysis comes back** (so they reference the real, reconciled code rather than guesses).

### Prompt 1 (paste into a fresh Claude Code session, after the design bundle is on the machine)
```
Read CLAUDE.md, docs/PROJECT-STATE.md, docs/DECISIONS.md, and the latest docs/WORKLOG.md
entries first. Follow the behavioral rule in CLAUDE.md §0 (never guess; if <90% sure, ask).

The design hand-off bundle is at design/RealFairTrust_Design_System.zip. Unzip it into
design/handoff/ and strip the trailing ".txt" from the component files so they read as
.jsx/.d.ts/.html. These are spec/reference only — do NOT ship them.

CONFIRMED DECISIONS (do not re-ask):
 (a) adopt lucide-react as the icon library;
 (b) load Fraunces + Inter via next/font/google (not the bundle's @import);
 (c) PropertyCard energy cert renders NEUTRAL/muted — OVERRIDE the hand-off's verified-green;
     green is verification only (DECISIONS #34/#49);
 (d) reconcile token names carefully to keep the build green with least churn.

GOAL OF THIS SESSION: produce a reconciliation plan only — NO changes to app code yet.

1. Read the hand-off fully: design/handoff/README.md, all design/handoff/reference/tokens/*.css,
   and the component specs under design/handoff/reference/components/**. README values are
   authoritative for design.
2. Compare against the current codebase: the token files (e.g. app/design-tokens.css,
   app/globals.css), the font setup, components/ui/*, the Header/Footer wordmark, and the card
   components (ConsultantCard, PropertyCard). Locate exact paths yourself.
3. Write docs/DESIGN-APPLY-PLAN.md containing:
   - A token-by-token diff: which hand-off tokens already exist (matching #45), which are new
     (ivory light section, gold "calm" button gradient + bright/calm split, full
     spacing/shadow/blur/motion scale, StatBlock, RankBadge specifics), and any name mismatches.
   - The chosen naming-reconciliation strategy (alias vs migrate), picked for least churn + green.
   - A phased checklist with a Status column mapping to run-order steps 2–6:
     Step2 Tokens · Step3 Primitives · Step4 Cards · Step5 Home section variety · Step6 Profile page.
   - Confirmation that decisions (a)–(d) above are reflected in the plan.
4. Do NOT edit app code/tokens/components yet. Append a dated docs/WORKLOG.md entry. Create
   branch chore/design-apply-plan off the current branch, commit the plan doc + the extracted
   design/handoff/ reference, push, and STOP. Report the diff summary. Do not open a PR.
```

---

## 7. VISUAL SYSTEM (authoritative source: `design/handoff/` champagne revision #57 + `design/handoff-home/` **Home video revision** #65; shipped on the revision chains, UNMERGED)

**LOCKED (post-revision R1→R5 + Home revision RH1→RH5):**
- **Background (#58):** brighter centred sapphire-navy radial `radial-gradient(ellipse 89% 81% at 50% 48%, #1e4680, #173a63 33%, #0e2545 59%, #081830 81%, #040e20)`, fixed. *(Centre `#1e4680` is the AA worst case.)* Supersedes the #45/#46 radial.
- **Palette family (only these):** black/near-black, blues with gradients, gold (solid + gradient), grey, white/ivory, **champagne (warm sand)**.
- **Gold, two roles (#59):** **bright** title gradient **symmetric 90°** `linear-gradient(90deg,#d8950f,#e3a812 16%,#ffe6a0 50%,#e3a812 84%,#d8950f)` (titles/prices/merit); **calm/luxe** button **90°** `linear-gradient(90deg,#c8901f,#e9bb52 28%,#ffe79e 50%,#e9bb52 72%,#c8901f)` (+hover). One bright-gold focal point per view. **Solid/eyebrow gold = `--gold-500` #efb52a** (AA #64b; brightened from #e3a812 — gradient stops keep #e3a812). Ivory eyebrow `#8C5E12`; **champagne eyebrow `#7c5a12`** (#64c/d).
- **Champagne light section (#61):** `--champagne #ece2cb` (+ `-card #fbf7ee`, `-border #e3d7bd`, `-ink #2b2415`, `-ink-muted #5c5340`, `-eyebrow #7c5a12`) via `.rft-champagne` + navy `.rft-step-card`/`.rft-step-coin`. Used **ONLY** on Home "Como Funciona" + footer. **Supersedes the #56 ivory rhythm** (ivory tokens retained but unused).
- **Verified green (#34/#52):** `#3fb984` = icons/seals/large/accents + the PropertyCard energy cert. **On-DARK green small TEXT = `--green-verified-strong #5fd2a1`** (AA #64g); **on-LIGHT green text = `#157048`** (#53). Tinted green/gold **chips sit on a solid dark base** on navy (#64h).
- **Type (#60):** Fraunces + Inter. **Hero 76 / section 42 / display-2 (CTA) 56** / subsection 26 / lead 20 / body 16 / meta 13 / eyebrow 12 (0.2em) / button 15. Supersedes #53(d) (72/40).
- **Text on navy:** strong `#f5f1ea` / body `.78` / **muted `.70`** (#64a) / faint `.40` (decorative/large only).
- **Tri-tone wordmark:** Real `#F5F1EA` · Fair = title-gold gradient · Trust `#8A93A3` (on ivory/champagne, Real/Trust → dark ink `#111c30`/`#1c2942`).
- **Cards:** ConsultantCard "Spotlight" (RankBadge coin, ringed avatar, verified pill, stats, "Ver perfil →"; merit **38px default / 56px featured**; **fill = solid `--surface-card-solid #0c1d39`**, #71 — AA win muted .70 → 7.82:1; supersedes the #64f `.035`-fill note; featured keeps gold border/glow/accent + a Home gold-glow pedestal & floating badge); **equal-height row cards** (`h-full` + `mt-auto`) with full names — no truncation (#73). PropertyCard "Editorial Overlay" (220px media, scrim, frosted deal + gold demo chips, 30px gold price, spec row, agent mini-row "Ver detalhe →"; energy cert green #52). Card tokens: radius 22 / media 14 / pad 26 / lift −4/−5 / img-zoom 1.06 / dur-img 500ms / accent-bar / overlay-scrim / plate-bg. **Buttons = pill** (#63).
- **HOME composition (shipped video revision #65–#76):** **(1) Hero** = full-bleed cinematic **`HeroFullBleed`** (84vh breakout under the sticky nav) — looping muted `/videos/hero.mp4` (1.6 MB) + Ken-Burns poster, vertical scrim + bottom fade; 2-line h1 "O futuro do imobiliário / *está em cada um de nós.*" (Home clamp ~62px, #66), gold rule, sub, 2 CTAs, "Explorar" scroll-cue button; **staged entrance ~2.6s** (export-safe, #67) + **Real/Fair/Trust brand reveal** (#68). **(2) Top este mês** (navy) — featured #1 on a gold-glow pedestal + "+6 lugares" green badge, then a 3-card row (#2–#4); coins via global `displayRank` (#73). **(3) Como funciona** (champagne, slim fade #72) — new copy "Onde o Desempenho Encontra o Imobiliário" + 3 step-cards. **(4) Imóveis em destaque** (navy) — 3 PropertyCards. **(5) Para consultores** (navy gold-glow) — "O *sucesso* depende de ti." + gold lucide feature row + "Vem Ser Reconhecido". **(6) Footer** (champagne, slim top fade) — on-light Logo + champagne-ink links; **kept 4-col real-route** (#75). Replaces the prior R4 search-pill Home (#62 superseded).
- **Logo / wordmark:** the roofline-check **mark** is built (#12/#70) + wired into Header + Footer; tri-tone wordmark; **on-light (`onIvory`) mark + "Fair" = `--gold-on-light #8C5E12`** (#69, logotype exemption 4.38:1 on champagne).
- **Motion (Framer Motion, reduced-motion-safe):** ease-out `cubic-bezier(0.22,0.61,0.36,1)`; entrance opacity+y, stagger 60–80ms; hover lift + accent-bar `scaleX 0→1` + score glow + image zoom; press `y+1`. No bounce/loops.
- **Icons:** `lucide-react` shim, 2px (#47/#55). **Fonts:** `next/font/google` (#48).
- **Design authority (#57/#51):** the champagne export is supreme, except where its literal damages WCAG AA/perf → AA-safe deviations kept (the #64 set + #53). README wins on bundle self-contradiction.

**Token files (bundle):** `tokens/{colors,typography,spacing,effects,fonts,base}.css` + `styles.css`. Demos: `card-redesign.html`, `gold-system.html`, **`champagne-full-page.html`**; full screens under `ui_kits/marketing/`.

**Superseded / rejected:** the six non-navy palettes REJECTED; ad-hoc mockup superseded; the **pre-revision look** (180°/160° gold, #122a4f radial, 72/40 type, ivory rhythm) superseded by #57–#64; the **R4 search-pill marketing-kit Home** (#62) superseded by the **full-bleed video-hero Home** (#65–#76).

---

## 8. DONE / IN PROGRESS / NEXT / TODO

- **DONE:** Phases 0–3; Phase 4.0/4.1/4.2; Phase 4.3 Home + Consultores; design hand-off adopted (#46–#50); governance sync (#51–#53); **design-system application run order 1→6 COMPLETE (#54–#56)** — tokens → primitives → cards → Home variety → profile re-skin, all green + AA; **banked to `develop` (PR #7 merged, merge commit `3d91a99`)**; **promoted to `main` (Vercel production branch) + build hardened (Node 22.x / pnpm 11.4.0 pinned) — Vercel-ready** (see §11).
- **DONE (revision):** **DESIGN REVISION R1→R5 COMPLETE (#57–#64)** — new champagne export adopted; brighter radial + 90° gold + 76/42/56 type + champagne family (R2); primitives/cards refresh + Button pill + Select strings (R3); Home to the marketing kit + champagne footer (R4); global AA consolidation + green/chip fixes (R5). All green + AA-recorded.
- **DONE (Home revision):** **HOME VIDEO REVISION RH1→RH5 COMPLETE (#65–#76)** — new Home handoff adopted; system deltas (`--gold-on-light`, slim-fade helpers) (RH2); roofline-mark Logo + darker AgentCard `#0c1d39` + on-light footer (RH3a); **HeroMedia + staged entrance + video 8.0→1.6 MB** (RH3b); **live Home recomposed to the full-bleed video hero** + Top-este-mês spotlight + champagne slim-fades + new copy/i18n (RH4) + the rank-coin/EXPLORE/equal-height fixes; AA consolidation + DECISIONS + state docs + Vercel build-pin verified (RH5). All green + AA-recorded.
- **DONE (PROMOTED 2026-06-25):** **the full design revision — champagne (#57–#64) + Home video (#65–#76) — is PROMOTED to `main`.** The revision chain consolidated → `develop` → `main` (history preserved, no squash); `main` (Vercel production) now serves the full-bleed video-hero Home. The revision is no longer unmerged/frozen — `main` and `develop` both carry it (parity). The merged `chore/design-revision-*` branches were cleaned up.
- **DONE:** **Buy/Rent discovery** (`/comprar` + `/arrendar`; #77–#79) — **merged to `develop`** (PR #8, `3b5012f`).
- **DONE:** **Location hierarchy (CAOP2025) on discovery** (#80–#84) — **merged to `develop`** (PR #9, `4658457`). Distrito→Concelho→Freguesia picker + nearby fallback + area-specialist CTA. Two location models coexist (CAOP + old Region) — unify later.
- **DONE:** **Property detail** (`/imovel/[id]`; #85) — **merged to `develop`** (PR #10, merge `48598e9`; commit `4cff804`). Gallery · gold price · specs+energy badge · CAOP location · consultant mini-card · sticky lead form · similar listings (additive `getSimilarListings`; `getListing` untouched).
- **DONE:** **Vender** (`/vender`; #86) — **merged to `develop`** (PR #12, merge `e2aafc2`; commit `42a9bbb`). Seller value-prop + coverage-mode location picker + merit-ranked area-matched consultants (inclusive hierarchical coverage + strict tiered widening Freguesia→Concelho→District; request-a-consultant fallback). Additive coverage fields + `getConsultantsByArea`; `ConsultantCard` unmodified. Empty-case CTA verified via `?distrito=06` (rendered DOM, PT+EN). **Same matching rule to be applied to Consultores discovery later (final tweaks, not now).**
- **DONE:** **Como funciona** (`/como-funciona`) + **Metodologia** (`/metodologia`, NEW route #87) — **merged to `develop`** (PR #13, merge `0dc6155`; commit `d2a8eb4`). Client-facing 3-step explainer + long-form rating-model spec carrying the DGT/CAOP CC BY 4.0 attribution; confidence threshold stated qualitatively (#88); footer Metodologia link. #87/#88.
- **IN PROGRESS:** — (none; between tasks).
- **DONE:** **Sobre** + **Termos** + **Privacidade** (#89) — **merged to `develop`** (PR #14, merge `a44b0e9`; commit `e2f3c34`). Sobre brand story + two legal DRAFTS (neutral draft banner; not lawyer-reviewed; bracketed contact/controller/retention). **This COMPLETES the Phase 4.3 public pages.**
- **NEXT (await Carlos):** Phase 4.3 public pages are **COMPLETE and PROMOTED to `main`** (parity `b26554e`) — now in **colleague review** on the production/review subdomain (**not signed off**). Await **4.3 review feedback**, then **decide Phase 4.4** (app shells — UI-only). No new feature work started. **⚠ Phase 6 launch blocker:** Termos + Privacidade need legal review + real contact/controller/retention values.
- **NOTE:** `main` == `develop` == `b26554e` at parity (**promoted 2026-07-15**, no-squash fast-forward; the 4.3 page PRs #8/#9/#10/#12/#13/#14 are all now on `main`). `main` serves **all Phase 4.3 public pages** on the Vercel production/review subdomain. **REVIEW CHECKPOINT — Phase 4.3 in colleague review, NOT signed off.** Termos + Privacidade are DRAFTS (Phase 6 legal-review blocker).
- **TODO (after 4.3):** 4.4 shells → 4.5 polish → Phase 5 (Supabase) → Phase 6 (launch).

---

## 9. OPEN QUESTIONS

- Demo imagery: source a small set of licensed/warm-toned property photos + a hero image before 4.5 polish (cards/hero only fully land with real images). Not blocking steps 1–6.
- Vercel connection (one-time) — optional now; only needed for preview URLs; not blocking.

---

## 10. HOW TO RESUME (zero drift)

**New planning chat (inside the Project):** the Project instructions + this file (in Project knowledge) load automatically. Say:
> "Read PROJECT-STATE.md. The **design revision + the Home video revision (RH1→RH5) are COMPLETE on the `chore/design-revision-home-*` chain but UNMERGED** — `main`/`develop` are frozen at the shipped design-apply state (`04b6a1b`) pending my promotion approval (§12). Help me decide promotion, then drive the **remaining 4.3 pages** (Buy/Rent, property-detail, Vender, static). Follow §0 (never guess)."

**New Claude Code session:** it auto-reads `CLAUDE.md`. Then say:
> "Read docs/PROJECT-STATE.md, docs/DECISIONS.md, docs/DESIGN-HOME-PLAN.md, and the latest docs/WORKLOG.md. Note the Home video revision RH1→RH5 is COMPLETE + UNMERGED (chain `chore/design-revision-home-*`; main/develop frozen at `04b6a1b`). On this host, review the Home via **`pnpm build && pnpm start`** (dev HMR socket fails over the remote). Confirm current branch + phase, then wait for my instruction. Follow CLAUDE.md §0."

**Keep this file current:** update it at the end of any session that changes scope/decisions/status, then re-upload it to the Project knowledge (Project knowledge is a static snapshot — it does not auto-sync with the repo).

### Project instructions (reference copy — paste this into the Project's instructions box)
```
This project is RealFairTrust — a bilingual (PT/EN) merit-based real-estate marketplace for
Lisbon & Porto. Before doing anything, read PROJECT-STATE.md in this project's knowledge: it
holds roles/workflow, locked decisions, the visual system, the full phase roadmap, what's done,
what's next, and what's open. Treat it as the source of truth; don't contradict it without
flagging.

Behavioral rule: never guess. Don't answer unless >=90% sure it's accurate. If you lack
information, full context, or a clear understanding, ask clarifying questions first. Verify
product/tool/UI facts before stating them.

Workflow: this planning chat authors plans, decisions, visual specs, and copy-paste prompts for
Claude Code; Claude Code (on the remote machine) does all builds/git. Keep phase-gate discipline
— stop and confirm before each new phase. Current state = the **design REVISION (R1->R5) + the
HOME VIDEO REVISION (RH1->RH5) are COMPLETE on the chore/design-revision-home-* chain but
UNMERGED**; main + develop are frozen at the shipped design-apply state `04b6a1b` (Vercel
production = main) pending Carlos's promotion approval. The Home now ships a full-bleed cinematic
video hero. After promotion: the remaining 4.3 pages (Buy/Rent, property-detail, Vender, static),
then 4.4 shells, 4.5 polish, Phase 5 (Supabase), Phase 6 (launch).
```

---

## 11. DEPLOYMENT

- **Production branch = `main`** (Vercel). The public review/preview URL serves **`main`**;
  `develop` and feature branches still get their own Vercel preview URLs. Branch model is
  unchanged: `feat/* → develop → main`.
- **`main` now serves the full design revision** (champagne #57–#64 + the Home video revision
  #65–#76), promoted 2026-06-25. The full-bleed cinematic video-hero Home is live on production;
  `main` and `develop` carry the revision at parity. (Vercel re-deploys `main` automatically; no
  Claude Code action — the browser-side Vercel project is unchanged.)
- **Build env pinned** for reproducibility: `engines.node = "22.x"` and
  `packageManager = "pnpm@11.4.0"` in `package.json` (matches the dev host: Node 22.22.3 / pnpm 11.4.0).
  Verified present & exact at promotion. (Harmless pnpm-11 deprecation: the
  `pnpm.onlyBuiltDependencies` field is now ignored by pnpm 11 — a WARN only; build stays green;
  out of the build-pin scope, left untouched.)
- **What is shipped on `main` today:** the revised Home (`/[locale]`, full-bleed video hero),
  Consultores discovery (`/[locale]/consultores`), and the Consultant profile
  (`/[locale]/consultores/[slug]`) — rendered on **SEED / mock data** (the `isDemo`-flagged set,
  #20) with **placeholder property imagery** (real photos land in 4.5 polish).
- **Promoted to `main` (2026-07-15):** all Phase 4.3 public pages — Buy/Rent (PR #8) · Location hierarchy (PR #9) · Property detail (PR #10) · Vender (PR #12) · Como funciona + Metodologia (PR #13) · Sobre + Termos + Privacidade (PR #14) — now live on the Vercel production/review subdomain. `main` == `develop` at parity. **REVIEW CHECKPOINT — Phase 4.3 in colleague review, not signed off.**
- **All Phase 4.3 public pages COMPLETE on `develop`**: Vender, Como funciona, Metodologia, Sobre, Termos, Privacidade. Termos + Privacidade are **DRAFTS** (Phase 6 legal-review blocker, #89).
- **No backend yet:** Supabase + environment variables remain **Phase 5** — **none configured**.
  The site runs entirely on the mock data layer; no secrets/env are required to build or deploy.
- **Connecting Vercel is a one-time browser step** (not done from Claude Code): import the repo,
  set the production branch to `main`, framework = Next.js. No env vars needed at this stage.

---

## 12. ACTIVE WORK — DESIGN REVISION ✅ PROMOTED (2026-06-25)

> *The freeze is lifted. The full design revision is now merged into `main` (Vercel production) and
> `develop` at parity; this section is no longer branch-only. A fresh session should read
> `docs/DESIGN-HOME-PLAN.md` (Home revision) + `docs/DESIGN-REVISION-PLAN.md` (champagne revision)
> for the full spec history.*

- **What shipped:** TWO stacked revisions. **(1) The champagne revision (R1→R5, #57–#64):** new navy
  radial, symmetric-90° gold, larger type (76/42/56), champagne warm-section family. **(2) The HOME
  VIDEO revision (RH1→RH5, #65–#76)** — a new Home handoff (`design/handoff-home/`) makes the
  **full-bleed cinematic video hero the Home default** (84vh breakout, staged ~2.6s entrance,
  Real/Fair/Trust brand reveal), with a Top-este-mês merit spotlight, a roofline-mark Logo (#12), a
  darker AgentCard (`#0c1d39`), an on-light footer wordmark (`#8C5E12`), and slim navy↔champagne
  fades. **Both run orders COMPLETE and PROMOTED.**
- **Where:** plans = `docs/DESIGN-HOME-PLAN.md` (RH2→RH5, all ✅) + `docs/DESIGN-REVISION-PLAN.md`
  (R2→R5). Reference bundles in `design/handoff/` (champagne) + `design/handoff-home/` (Home) —
  spec only, eslint-ignored (`design/**`), never shipped.
- **Promotion (2026-06-25):** by Carlos's explicit approval, the revision chain was consolidated
  **→ `develop` → `main`** preserving full history (no squash) — both fast-forwards, so `main` and
  `develop` carry the identical linear revision history at parity. The merged `chore/design-revision-*`
  branches (the whole chain, local + remote) were deleted. `main` = Vercel production now serves the
  new video-hero Home (Vercel re-deploys automatically; the browser-side Vercel project is untouched).
- **Review on this host:** use **`pnpm build && pnpm start`** — the dev HMR websocket fails over the
  remote host, so `pnpm dev` falsely looks broken; the production build is the source of truth.
- **NEXT:** the remaining Phase 4.3 pages (Buy/Rent, Property detail, Vender, static) on a fresh
  `feat/*` branch off `develop` → 4.4 shells → 4.5 polish → Phase 5 (Supabase) → Phase 6 (launch).
