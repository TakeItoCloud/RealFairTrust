# RealFairTrust — Building the Remaining Pages from the Demo Look

_Goal: give Buy, Rent, Sell, Property detail, and the static pages the same visual look as
the `RealFairTrust.jsx` demo — **without touching Home or Consultants**, and without breaking
the build._

---

## The core rule (read once)

- **Reference, don't copy.** The demo (`RealFairTrust.jsx`) is inline-styled with hardcoded
  strings and in-file mock data. Never import it or paste it into the app. Claude Code should
  *look at it* for layout, composition, filters, and motion — then rebuild that look with the
  repo's real tokens and components.
- **The built pages win on style.** Home and Consultants are the site's visual truth. New pages
  must sit next to them coherently. Where the demo and the real design system differ, the real
  system wins — so the whole site stays one look.
- **Reuse what exists.** `PropertyCard` (Editorial Overlay), `FilterBar`/filters, `LeadForm`,
  `Pagination`, cards, buttons, tokens are already built. New pages compose these; they don't
  reinvent them.
- **Don't touch Home or Consultants.** No edits to those files or their components' shared
  styles unless a decision explicitly calls for it.

---

## One-time setup

1. Put the demo where Claude Code can read it but the build ignores it:
   copy `RealFairTrust.jsx` to **`design/reference/RealFairTrust.jsx`** (a non-source folder).
   Do **not** place it under `app/` or `src/`.
2. Tell Claude Code, once per session, that this file is a **visual reference only**.

---

## The per-page loop (same as your current rhythm)

For each page: **branch → build from real components using the demo as reference → Vercel
preview → you adjust filters/boxes → approve → merge → next page.** One page per PR.

---

## Reusable prompt template

Paste this, then append the page-specific block below it.

> Read `CLAUDE.md`, `docs/PROJECT-STATE.md`, `docs/DECISIONS.md`, and the top of
> `docs/WORKLOG.md`. Confirm the current phase and that this page is the right next task before
> writing code (§0: never guess; ask if under 90% sure).
>
> Visual reference: `design/reference/RealFairTrust.jsx` is a **look-and-feel reference only**
> — never import or copy it. Match the **existing** design system (tokens + the real
> `PropertyCard`, `FilterBar`, `LeadForm`, `Pagination`, buttons, section wrappers) so this
> page is visually consistent with the already-built Home and Consultores pages.
>
> **Do not modify Home, Consultores, or any shared component's styling.** If a change to a
> shared component seems needed, stop and ask me first.
>
> Requirements for every page: PT/EN parity via `next-intl` (no hardcoded UI strings), AA
> contrast, reduced-motion safe, responsive, `isDemo` chips on seeded data, calm entrance/hover
> motion consistent with the existing pages. Build on a `feat/*` branch → PR → preview.
> `pnpm build`, `tsc --noEmit`, `eslint` must be green. Update `WORKLOG.md`; log any decisions
> in `DECISIONS.md`. Show me the preview before merging.

---

## Page 1 — Buy / Rent  (`/[locale]/comprar`, `/[locale]/arrendar`)  ← start here

> Task: build the property-discovery pages as one template, two modes (Buy = total price,
> Rent = €/month). Draw the layout from the demo's Property Discovery view: a page header with
> a **result count**, an **inset filter bar** (location, zone, type, price band, bedrooms, sort),
> a responsive grid of the real `PropertyCard`, pagination, and a **"no results" empty state**.
> Sort options include merit (default), price ↑, price ↓. Use the typed data layer for
> listings — no new mock arrays. Reuse existing filter components; only add a mode toggle if one
> doesn't exist.

_After preview: this is where you tweak which filters/boxes appear and their order._

---

## Page 2 — Property detail  (`/[locale]/imovel/[id]`)

> Task: build the property detail page. From the demo/brief: gallery, price (gold overlay
> treatment consistent with `PropertyCard`), full specs, description, location/energy rating,
> the **attributed consultant mini-card** (reusing the consultant card/avatar + merit display),
> an inline/sticky `LeadForm`, and a **"similar listings"** row of `PropertyCard`s. Use the data
> layer; graceful states if a field is missing.

---

## Page 3 — Sell  (`/[locale]/vender`)

> Task: build the seller conversion page. From the demo's Sell view: a centered hero with the
> gold-split headline treatment, a short "how it works for sellers" trio of numbered step-cards
> (same numbering/format as the champagne How-it-works on Home, but **without editing Home**),
> and a primary CTA routing to Consultores. Copy in PT/EN via `next-intl`.

---

## Page 4 — Static pages  (About, How it works, Terms, Privacy, Methodology)

> Task: build the static pages using the shared section wrappers and type scale so they match
> the site. Methodology should present the merit model plainly: the weighted signals
> (satisfaction 35 / close rate 25 / response time 15 / lead conversion 15 / opportunity volume
> 10), the rolling 90-day window recomputed monthly, per-opportunity normalization, the
> statistical-confidence gate (number vs "building track record"), and Rising Talent. Reuse the
> score-breakdown visual from the demo/profile as a reference. PT/EN parity.

---

## After each page

You review the preview and tell the planning chat exactly which filters, chips, or boxes to
change (e.g. "on Buy, drop the bedrooms filter and add a metro-line filter"). The planning
chat authors the tweak prompt; Claude Code applies it on the same branch; you re-check; merge.

---

## Is this a good approach, or keep going as now?

It **is** how you're going now — planning-chat prompts, Claude Code builds page by page, per-PR
previews, phase-gated. The only addition is the demo as a visual reference. So: good approach,
no workflow change, no phase jump. The remaining pages here are exactly Phase 4.3's remaining
work; after them come 4.4 shells → 4.5 polish → Phase 5 (Supabase + rating engine).
