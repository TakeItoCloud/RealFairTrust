# Phase 4 — Frontend Build

**Project:** RealFairTrust · Merit-based real estate marketplace (Portugal, PT/EN)
**Phase goal:** Build the real, styled front end — the component kit and every page from
Phases 1–3 — running on **mock/seed data**, with **no backend**. Output is a clickable,
responsive, accessible site in the Midnight Gold design system.
**Status:** Draft for sign-off · 2026-05-29 · Depends on Phases 1 (IA), 2 (wireframes),
3 (design system — approved).

> This is a **build plan for Claude Code**, not prose for the user to action. It defines
> the build order, the component specs, the mock-data layer, page acceptance criteria, and
> the quality gates. Claude Code executes it on feature branches; the user reviews preview
> deploys.

---

## 1. What Phase 4 produces (and excludes)

**Produces:** the styled component library, the public marketing + discovery pages, the
property/consultant pages, and **UI shells** for the agent dashboard + admin — all on a
typed mock-data layer, PT/EN, responsive, AA-accessible.

**Excludes (→ Phase 5):** real authentication, database, persistence, the live rating
computation, file uploads, payments. Forms **validate and show a success state** but do
**not** persist. Auth screens and dashboards are **visual shells** wired to mock data.

---

## 2. Prerequisites (must be true before building)

- Design system wired: `app/globals.css` = the Tailwind v4 theme mapping; `design-tokens.css`
  in place; **Fraunces + Inter** loaded in `app/layout.tsx` (the `feat/design-system` branch).
- Route scaffold merged (the empty routes from Phase 1 §3–§4, behind feature flags).
- `develop` is current (Phases 1–3 docs + design system merged).

---

## 3. Architecture rules for the build

1. **Data-access abstraction (critical).** Components NEVER import mock data directly. All
   data flows through a typed repository layer, e.g. `lib/data/` with functions like
   `getConsultants(filter)`, `getConsultant(slug)`, `getListings(filter)`, `getListing(id)`,
   `createLead(input)`. In Phase 4 these read from `lib/mock/`; in Phase 5 the **same
   function signatures** switch to Supabase. This is what makes the backend swap non-breaking.
2. **Types from the content model.** Define TS types matching Phase 1 §6 (Region, Consultant,
   Property, Lead, Review, PerformanceScore) in `lib/types.ts`. Mock + real both satisfy them.
3. **Server Components by default**; Client Components only where interactivity needs them
   (filters, forms, language switch, carousels).
4. **i18n:** all copy via next-intl message files (`messages/pt.json`, `messages/en.json`).
   **No hardcoded UI strings.** PT is default.
5. **Feature flags:** central `lib/flags.ts`; flagged-off routes render a "coming soon" stub.
6. **Tokens only:** style via Tailwind utilities backed by the theme — no ad-hoc hex values.

---

## 4. Build order (milestones)

Build bottom-up so every page is assembled from already-tested pieces. Each milestone = one
feature branch → PR into `develop` → preview deploy for review.

### 4.0 — Foundations  (`feat/foundations`)
`lib/types.ts` · `lib/flags.ts` · `lib/data/` repository interface · `lib/mock/` seed data
(see §6) · i18n message-file scaffolding (PT/EN) · base layout, container, typography rhythm.

### 4.1 — Primitives  (`feat/ui-primitives`)
Button (primary/secondary/ghost; sizes) · Eyebrow · SectionWrapper · Input · Select ·
Textarea · StarRating · PerformanceBadge · VerifiedBadge (green) · RisingTalentTag ·
RankIndicator · Skeleton · EmptyState · StatTile. Each with all states (hover/focus/disabled/
loading) and dark + light variants.

### 4.2 — Composite components  (`feat/components`)
Header (+ LanguageSwitcher, mobile hamburger) · Footer · ConsultantCard (badges + close rate
+ specialization; number hidden until min sample) · PropertyCard · ScoreBreakdown (bars vs
target) · FilterBar (URL-synced) · LeadForm (RHF + Zod; success state, no persistence) ·
ReviewItem · Pagination · CookieBanner · Modal · Toast.

### 4.3 — Public pages  (`feat/pages-public`)
In priority order, per Phase 2 wireframes + Phase 3 styling:
1. **Home** (split hero: poster-first + optional safe video + "Top this month" proof card;
   how-it-works; top consultants; featured listings; clients/consultants split; trust; join).
2. **Consultores** (discovery + leaderboard: filters, Ranked/All toggle, Rising Talent strip,
   card grid + subtle rank, "suggest for me" flagged off).
3. **Consultant profile** `/consultores/[slug]` (the key page: profile header, performance
   panel with "building track record" / Rising Talent states, about, listings, reviews, lead form).
4. **Buy / Rent** `/comprar` · `/arrendar` (filter bar + results grid + states).
5. **Property detail** `/imovel/[id]` (gallery, specs, description, agent card, similar; mobile sticky CTA).
6. **Sell/Rent with us** `/vender` (lead form → pick top local consultant / "suggest for me" → confirm).
7. **Como funciona**, **Aderir**, **Sobre**, **Contacto**, **Legal** (privacy/terms/cookies) + cookie banner.

### 4.4 — App shells (UI only)  (`feat/app-shells`)
Agent dashboard shell + sub-pages (overview, perfil, imoveis, contactos, **desempenho** =
ScoreBreakdown coaching view) · Admin shell + sub-pages (consultores, moderacao, avaliacoes) ·
Auth screens (entrar/registar). All on mock data, no real auth — clearly the visual layer
Phase 5 will wire.

### 4.5 — Polish  (`feat/polish`)
Responsive pass (mobile/tablet/desktop) · a11y pass (keyboard, focus rings, labels, alt,
headings, reduced-motion) · performance pass (next/image, lazy hero video, code-split) ·
empty/loading/error states everywhere · 404/error pages.

---

## 5. Component acceptance criteria (apply to every component)

- Renders from props/types; no direct mock imports.
- Dark + light variants where the design system calls for them.
- All interaction states present; visible focus ring; keyboard operable.
- PT/EN via next-intl; no hardcoded strings.
- Responsive; tap targets ≥ 44px; AA contrast.
- Story/usage example or a demo route for review.

---

## 6. Mock / seed data (so pages have content)

Typed to the content model, in `lib/mock/`. Recommended launch-realistic set:

- **Regions:** Lisboa + Porto (districts → a few zones each), with `live = true`.
- **Consultants:** ~12 (mix of established + 3–4 Rising Talent <6 mo), varied specializations,
  with `PerformanceScore` (some with low sample → "building track record" state).
- **Listings:** ~24 (sale + rent) across both cities, with photos (optimized placeholders),
  specs, energy certs.
- **Reviews:** a handful per established consultant; none for new ones (empty-state demo).
- **Leads:** a few seeded for the dashboard "contactos" view.

> **Recommendation:** generate this seed once as typed fixtures and clearly flag listings as
> demo data in the UI (per Decision #20) until real inventory exists.

---

## 7. Quality gates (Phase 4 "definition of done")

TypeScript strict passes · ESLint clean · PT/EN parity (no missing keys) · responsive at
3 breakpoints · AA contrast + keyboard nav + reduced-motion · images optimized (no >300 KB
hero assets) · Lighthouse ≥ 90 perf/accessibility on Home + Consultores + Profile · every
list has empty/loading states · all forms validate + show success (no persistence).

---

## 8. Open questions before building

Each with a recommendation.

1. **A11y/primitive library:** hand-build everything, or use **Radix primitives** for the
   a11y-critical pieces (Dialog, DropdownMenu, Tabs, Select)? *Rec: Radix for those few; keep
   everything else bespoke Tailwind — accessible without importing a whole UI kit that fights
   the custom look.*
2. **Motion:** use **Framer Motion** (already in stack) for subtle entrance/hover motion,
   reduced-motion-safe? *Rec: yes, sparingly.*
3. **Hero media:** ship with a stock-but-optimized poster + short muted loop, or poster-only
   until real footage exists? *Rec: optimized poster only for now; add the loop when real
   media is ready (keeps it fast).*
4. **Dashboard/admin in Phase 4:** build the UI shells now (rec) or defer fully to Phase 5?
   *Rec: build shells now so the design stays consistent; wire auth/data in Phase 5.*
5. **Mock data:** generate the ~12 consultants / ~24 listings seed set above? *Rec: yes.*

---

## 9. Phase 4 exit criteria (sign-off)

Complete when: the component kit and all §4.3 public pages are built and styled in Midnight
Gold, the §4.4 shells exist on mock data, the quality gates in §7 pass, and the site is
reviewable on a Vercel preview. On sign-off we proceed to **Phase 5 — Backend, Auth & the
Rating Engine** (Supabase schema from the Phase 1 content model, agent + admin auth, and the
periodic scoring engine — swapping the `lib/data/` layer from mock to real).

> **Next action:** answer §8 → tell me to hand this to Claude Code. Then per-milestone:
> Claude Code builds `feat/*` → PR → preview deploy → you review → merge → next milestone.
