# Worklog — RealFairTrust

> Append a new entry at the **top** at the end of every working session.
> Format: date · phase · what was done · what changed · what's next.
> Newest entry first.

---

## 2026-05-30 · Phase 3 → Phase 4 — Design system wired (feat/design-system)

**Done**
- Created `app/design-tokens.css` (copy of `brand/design/design-tokens.css`) alongside `globals.css`.
- Replaced `app/globals.css` with the Tailwind v4 `@theme` mapping from `brand/design/tailwind-theme.css`:
  imports `tailwindcss`, imports `./design-tokens.css`, maps all `--rft-*` tokens into Tailwind
  utilities (`bg-ink`, `text-gold`, `font-display`, `rounded-lg`, `max-w-content`, etc.).
- Updated `app/layout.tsx`: loads **Fraunces** (display, `--rft-font-display`) and **Inter**
  (UI/body, `--rft-font-sans`) via `next/font/google`; injects CSS variables into `<html className>`.
- Updated `CLAUDE.md`, `DECISIONS.md`, `WORKLOG.md` to kit versions.
- `pnpm build` and `pnpm tsc --noEmit` pass clean; `pnpm dev` starts with no errors (200 on `/` and `/comprar`).
- PR opened: feat/design-system → develop.

**What's wired**
- All Tailwind utilities resolve to brand values — e.g. `bg-ink` = `#0E0F16`, `text-gold` = `#C8A86B`.
- Fraunces loads as `font-display` (headings); Inter loads as `font-sans` (body/UI).
- Base `body {}` defaults: dark background, cream text, Inter, 1.6 line-height.
- No pages rebuilt yet — only the theme layer. Placeholder pages remain.

**Open / awaiting user**
- Merge PR and approve **Phase 4 — Frontend Build** to begin building styled components + pages.

**Next (Phase 4, Claude Code)**
- Build shared layout shell (Header + Footer), then page-by-page per Phase 2 wireframes and
  Phase 3 design system, starting with Home and Consultores.

---

## 2026-05-29 · Phase 3 — APPROVED + tokens finalized

**Done**
- User chose **D1 Midnight Gold** + all recommendations. Locked decisions #31–35.
- Finalized `brand/design/design-tokens.css` (FINAL header) and added
  `brand/design/tailwind-theme.css` (Tailwind v4 @theme mapping + font-loading note).
- Updated `CLAUDE.md` status to "Phase 3 APPROVED".

**Open / awaiting user**
- Go-ahead to start **Phase 4 — Frontend Build** (I author the build plan; Claude Code builds).

**Next (Phase 4, Claude Code)**
- Replace `app/globals.css` with the Tailwind theme mapping; load Fraunces + Inter in
  `app/layout.tsx`; then build the component kit + pages from the design system on mock/seed data.

---

## 2026-05-29 · Phase 3 — Visual Design & Design System (drafted)

**Done**
- Authored `docs/phases/PHASE-3-visual-design-system.md` (+ branded `.docx`): principles,
  three directions, full token set, component styling specs, imagery/icon guidance, a11y.
- Produced 3 hi-fi direction mockups in `brand/design/` (midnight-gold, warm-trust,
  modern-confident) + `design-tokens.css` (recommended hybrid).
- Updated `CLAUDE.md` status to Phase 3 (awaiting sign-off).

**Open / awaiting user**
- §9: pick a direction (rec D1 hybrid), confirm type pairing, theme strategy, green accent.
- Go-ahead to finalize tokens and start **Phase 4 — Frontend Build**.

---

## 2026-05-29 · Phase 2 — APPROVED

**Done**
- Locked §8 answers in `DECISIONS.md` #25–30.
- Recommended and locked the **split hero** (value+search left; contained poster-first media
  with optional safe video + "Top this month" proof card right) over a full-bleed autoplay
  video — better for speed, conversion, trust-by-proof, and accessibility. Added wireframe
  `brand/wireframes/wf-home-hero-recommended.svg`.
- Updated `CLAUDE.md` status to "Phase 2 APPROVED".

**Open / awaiting user**
- Go-ahead to start **Phase 3 — Visual Design & Design System**.

---

## 2026-05-29 · Phase 2 — Wireframes / UX (drafted)

**Done**
- Authored `docs/phases/PHASE-2-wireframes-ux.md` (+ branded `.docx`): global layout system,
  low-fi stacked wireframes for all 12 page groups, reusable component inventory, key
  interactions, UX states, baseline accessibility.
- Produced 5 grey-box visual wireframes in `brand/wireframes/`: home, consultores,
  consultant-profile, property-detail, agent-performance.
- Updated `CLAUDE.md` status to Phase 2 (awaiting sign-off).

**Open / awaiting user**
- Answer §8 questions (hero layout, leaderboard presentation, card density, contact pattern,
  dashboard nav) — each has a recommendation.
- Go-ahead to start **Phase 3 — Visual Design & Design System**.

**Note**
- Wireframes are deliberately unstyled. Claude Code does not build from them yet; they feed
  Phase 3 visual design first.

---

## 2026-05-29 · Phase 1 — APPROVED

**Done**
- Locked §10 answers in `DECISIONS.md` #18–24: badges-first score display; client-picks +
  "suggest for me" lead routing; seed (flagged) listings per launch city; localized locale
  URLs with hidden PT default; name-based slug w/ numeric-suffix collision rule; collect
  reviews now w/ manual moderation (gating in Phase 2).
- Updated `CLAUDE.md` status to "Phase 1 APPROVED".

**Open / awaiting user**
- Go-ahead to start **Phase 2 — Wireframes / UX**.

**Next (Claude Code)**
- Run project setup (Step A) if not done. Then optionally scaffold empty routes per the
  Phase 1 route contracts behind feature flags. Update this log when done.

---

## 2026-05-29 · Phase 1 — IA & Content (drafted)

**Done**
- Authored `docs/phases/PHASE-1-information-architecture.md` (+ branded `.docx`):
  locale/URL strategy, sitemap (with mermaid), stable route contracts, page purposes &
  section breakdowns for every page, navigation model, the **9-entity content model**
  (schema-first backbone), core user flows, and the launch feature-flag map.
- Updated `CLAUDE.md` status to Phase 1 (awaiting sign-off).

**Open / awaiting user**
- Answer the six §10 questions (score display, seller lead routing, seed listings, locale
  URLs, slug rule, reviews-at-launch) — each has a recommendation.
- Go-ahead to start **Phase 2 — Wireframes / UX**.

**Next (Claude Code, optional now)**
- Scaffold empty routes/folders per route contracts (§3–§4) behind feature flags — no
  feature logic yet. Then update this worklog.

---

## 2026-05-29 · Phase 0 — APPROVED + handoff prepared

**Done**
- Locked remaining decisions: logo = Concept C primary + Concept B as "Verified" badge;
  cities Lisbon + Porto; listings agents-only at launch; language PT primary / EN secondary;
  rating weights 35/25/15/15/10 confirmed. (See `DECISIONS.md` #12–17.)
- Added `docs/notes/city-expansion.md` (how to add cities without code changes).
- Added `START-HERE.md` (file placement, who-does-what, and the exact prompts for Claude Code).
- Updated `CLAUDE.md` status to "Phase 0 APPROVED".

**Open / awaiting user**
- User go-ahead to begin **Phase 1 (IA & Content)** in the planning chat.
- Confirm domain TLD owned (realfairtrust.com / .pt) before Vercel domain step.

**Next**
- On "Proceed to Phase 1": author `docs/phases/PHASE-1-information-architecture.md` (+ .docx)
  — sitemap, page purposes, content model, user flows. Then hand to Claude Code to scaffold
  empty routes behind feature flags.

---

## 2026-05-28 · Phase 0 — Discovery & Strategy (kickoff)

**Done**
- Created fresh project skeleton (`docs/`, `docs/phases/`, `brand/logos/`).
- Locked project decisions from kickoff Q&A (see `DECISIONS.md`).
- Authored `CLAUDE.md` (master brief) and this worklog.
- Drafted **Phase 0 — Discovery & Strategy** (`docs/phases/PHASE-0-discovery-strategy.md`)
  + branded Word version.
- Produced 4 logo concepts + comparison sheet in `brand/logos/`.
- Defined listings-sequencing strategy (schema-first, additive, feature-flagged) so
  property listings ship inside the MVP without breaking earlier work.
- Wrote infrastructure runbook (`docs/SETUP.md`): remote host, GitHub, branches, Vercel.

**Changed**
- Brand name finalized: **RealFairTrust** (was "Agentra" in the old prototype).

**Open / awaiting user**
- Pick a logo concept (A / B / C / D).
- Approve Phase 0 to proceed to Phase 1 (IA & Content).
- Confirm launch cities (assumed Lisbon + Porto) and domain TLD (e.g. realfairtrust.com / .pt).

**Next**
- On approval: scaffold the Next.js project on the remote host, init git + GitHub, then
  begin Phase 1 (sitemap, page purposes, content model, user flows).
