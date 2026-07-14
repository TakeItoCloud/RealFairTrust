# RealFairTrust — Project Brief for Claude Code

> **Read this file first, every session.** It is the single source of truth for what
> this project is, where we are, and the rules you must follow. When in doubt, follow
> this file over any assumption.

## §0 — Standing behavioral rule (read first)

**Never guess.** Do not answer or act unless **≥90% sure it is accurate**. If information,
full context, or a clear understanding is missing, **ask clarifying questions first**. Only
proceed after researching as needed, reasoning carefully, and reaching ≥90% certainty. Verify
product / tool / UI facts before asserting them.

**Orientation file:** read **`docs/PROJECT-STATE.md`** first every session — it is the
high-level snapshot (roles & workflow, locked decisions, the visual system, the full phase
roadmap, what's done/next, open questions). `docs/DECISIONS.md` (full decision log) and
`docs/WORKLOG.md` (per-session history) remain authoritative for their respective detail.

## What we are building

**RealFairTrust** is a bilingual (Portuguese / English) **merit-based real estate
marketplace** for Portugal. It connects clients (buyers, sellers, renters) with real
estate **consultants**, and makes consultant performance **visible, comparable, and
fair** so clients choose with confidence and agents compete on quality — not tenure or
ad spend.

The brand name encodes the promise: **Real** estate · **Fair** · **Trust**.

This is a **real launch**, started **city-limited** (Lisbon + Porto) to keep the MVP tight.

## The one thing that makes this different (the "key")

A **periodic performance rating engine**:
- **Rolling 90-day window, recomputed monthly** — not a lifetime cumulative score. This
  resets the race each month so veterans cannot permanently bury newcomers, and whoever
  is on top must keep earning it.
- **Per-opportunity normalization** — agents are scored on quality (satisfaction, close
  rate, response time, conversion) relative to opportunities handled, not raw volume.
- A separate **"Rising Talent" board** for consultants active < 6 months.
- Later phases add **verified-transaction gating** of reviews and **anti-abuse moderation**.

This engine is the product's crown jewel. See the Phase 0 doc for the full spec.

## How we work (phased, studio-style)

We build in phases. **Do not jump ahead.** At the end of each phase, summarize and
**ask the user before starting the next phase**.

| Phase | Name | Output |
|-------|------|--------|
| 0 | Discovery & Strategy | `docs/phases/PHASE-0-*.md` (+ branded .docx) |
| 1 | Information Architecture & Content | sitemap, page purposes, content model, user flows |
| 2 | Wireframes / UX | low-fi layout of every page |
| 3 | Visual Design & Design System | brand tokens, component library, hi-fi mockups |
| 4 | Frontend Build | components → pages, mock data |
| 5 | Backend, Auth & Rating Engine | Supabase schema, agent+admin auth, scoring |
| 6 | Integration, QA, A11y, GDPR, Launch | wiring, tests, compliance, go-live |
| 7 | Growth, Monetization, Admin | payments, analytics, admin tools |

Each phase gets a `.md` plan in `docs/phases/` and a branded Word doc. Every phase doc
must state: what gets done, what must be defined, and recommended options for the user
to choose.

## Hard rules

1. **Schema-first.** The full data model (incl. `properties`/listings) is defined before
   building. All later DB migrations are **additive only** — never rewrite existing tables.
2. **Stable route contracts.** Reserved URLs do not move once defined in the sitemap.
3. **Feature flags** gate any section that exists structurally but isn't ready.
4. **Update `docs/WORKLOG.md` at the end of every working session** with what you did,
   what changed, and what's next. This is mandatory.
5. **Log every locked decision** in `docs/DECISIONS.md`.
6. **Branch discipline** (see below). Never commit secrets. `.env` is git-ignored.
7. Keep **PT + EN** parity via next-intl. No hardcoded UI strings.
8. Ask before continuing to the next phase.

## Stack (locked)

Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS 4 ·
Framer Motion · next-intl (PT/EN) · Supabase (Postgres + Auth + Storage) ·
React Hook Form + Zod. Package manager: **pnpm**. Node pinned via `.nvmrc`.

## Accounts at launch

- **Agent** and **Admin** accounts first (agents onboard; we curate).
- **Client** accounts come in a later phase. Clients can browse and contact agents
  without an account at launch.

## Business model

Commission split (RealFairTrust keeps a margin) + optional agent **Pro** subscription
for advanced tools. **Clients are always free.**

## Environment & deploy

- Dev host: remote Linux machine `192.168.16.11`, path `/projects/RealFairTrust`.
- Source: GitHub repo. Branches: `main` (protected) → `develop` → `feat/*` · `docs/*`.
- Deploy: **Vercel**, connected to GitHub. Every branch gets a preview URL; `main` = prod.
- Data: two Supabase projects (dev + prod). Migrations committed to `supabase/migrations/`.

See `docs/SETUP.md` for the step-by-step setup runbook.

## Brand & language (locked)

- **Logo:** Concept **C (Verified Roofline)** is the primary mark. Concept **B (Seal)** is
  repurposed as the in-product **"Verified" badge** on approved agent cards/profiles.
  Final logo refinement (variants, favicon, clear-space) happens in Phase 3.
- **Language:** **PT primary, EN secondary**, via next-intl. PT is the default on first visit.

## Adding a new city (must stay code-free)

Cities are **data + a feature flag**, never new pages or code. There is a `regions` model
(district → city → zone); agents and listings reference a `city_id`; discovery pages
**filter** by region instead of having a page per city; each city has a `live` flag.
Adding a city = insert a region row → onboard agents → add listings → flip `live`. No
migration, no structural change. The rating engine works automatically (scores are
per-agent, filtered per city). Full detail: `docs/notes/city-expansion.md`.

## Current status

**Phase 4.3 — public pages, IN PROGRESS.** Coverage is all of Portugal incl. **Madeira & Açores**
(CAOP2025). **LIVE on `main` (prod):** Home (video hero), Consultores discovery, Consultant profile.
**Merged to `develop`** (ahead of `main`, `48598e9`): **Buy/Rent** discovery `/comprar`+`/arrendar`
(PR #8) · **Location hierarchy** — CAOP Distrito→Concelho→Freguesia picker + nearby fallback +
area-specialist CTA (PR #9) · **Property detail** `/imovel/[id]` (PR #10). Decisions logged through
**#85**. Read **`docs/PROJECT-STATE.md`** first each session — its ⚡ HANDOFF block is the 30-second
orientation (done/next/parked + working conventions). Authoritative detail: `docs/DECISIONS.md`
(log) · `docs/WORKLOG.md` (history).
**NEXT:** **Vender** (`/vender` = EN `/selling`), then the **static pages** (Sobre, Como funciona,
Termos, Privacidade, Methodology) → Phase 4.4 shells → 4.5 polish → Phase 5 (Supabase + rating
engine) → Phase 6 (launch).
