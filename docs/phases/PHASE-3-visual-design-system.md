# Phase 3 — Visual Design & Design System

**Project:** RealFairTrust · Merit-based real estate marketplace (Portugal, PT/EN)
**Phase goal:** Turn the Phase 2 wireframes into the **RealFairTrust visual language** —
pick a direction, lock the design tokens (colour, type, spacing, radius, motion), and
specify how every component looks — so Phase 4 builds a styled, consistent UI from a fixed
system rather than improvising.
**Status:** Draft for sign-off · 2026-05-29 · Depends on Phase 2 (approved)

> Companion assets: three direction mockups + tokens in `brand/design/`
> (`direction-1-midnight-gold.svg`, `direction-2-warm-trust.svg`,
> `direction-3-modern-confident.svg`, `design-tokens.css`).

---

## 1. Design principles

1. **Trust is shown, not claimed.** Surface real proof (ranks, badges, verified marks)
   over decorative mood.
2. **Calm, premium, legible.** Generous space, restrained palette, strong type hierarchy.
3. **Gold is a spice, not a sauce.** Gold for accents, headings, and the verified moment —
   never for body text or large fills.
4. **Fair = approachable.** Avoid cold exclusivity; warmth and clarity make merit feel fair.
5. **Fast and accessible by default.** Performance-safe media, AA contrast, reduced-motion.

---

## 2. The three directions (pick one)

All share the locked brand (gold-on-dark equity, logo C). They differ in tone, light/dark
balance, type, accent, and radius. Same hero screen, three treatments — see the SVGs.

| | **D1 · Midnight Gold** | **D2 · Warm Trust** | **D3 · Modern Confident** |
|---|---|---|---|
| Feel | Editorial luxury | Approachable, human | Contemporary marketplace |
| Base | Near-black dark | Warm ivory + dark panels | Cool dark slate |
| Type | Serif display + sans | Serif display + sans, rounder | All-sans, geometric |
| Accent | Gold | Gold + warm neutrals | Gold + verified-green |
| Radius | Tight (6–14px) | Soft/pill (16–24px) | Sharp (6–12px) |
| Strength | Premium, on-brand equity | Inclusive, trustworthy, broad | Data/merit-forward, modern |
| Watch-out | Can feel exclusive/cold | Less "luxury" | Less warm |

### Recommendation
> **Midnight Gold (D1) as the base**, evolved with two borrowings: **warm light content
> sections** from D2 (for `/como-funciona`, legal, long-form — so the brand isn't cold) and
> the **verified-green accent** from D3 (for the verified/success moment). This keeps the
> locked brand equity and the premium "Top this month" drama, while staying approachable and
> data-honest. The tokens in `design-tokens.css` already encode this hybrid.
>
> If you want the *friendliest* read for a broad seller/renter audience, pick **D2**; if you
> want the most *modern marketplace* read, pick **D3**. Tokens finalize on your choice.

---

## 3. Colour tokens (recommended hybrid)

| Token | Value | Use |
|-------|-------|-----|
| `--rft-gold` | #C8A86B | Primary accent, headings highlight, icons |
| `--rft-gold-bright` | #D6B87A | Hover / highlight |
| `--rft-gold-deep` | #8A6D2F | Links/accents on light |
| `--rft-verified` | #3FB984 | Verified / success only |
| `--rft-bg` / `--rft-bg-elev` | #0E0F16 / #12141D | Dark page / elevated |
| `--rft-surface` | #181B26 | Cards on dark |
| `--rft-text` / `--rft-text-mut` | #F5F1EA / 66% | Body / muted on dark |
| `--rft-bg-warm` / `--rft-surface-lt` | #FBF8F2 / #FFFFFF | Warm light sections / cards |
| `--rft-text-lt` / `--rft-text-lt-mut` | #211C17 / 62% | Body / muted on light |
| `--rft-line` / `--rft-line-lt` | gold 20% / #E6DECF | Borders dark / light |

**Contrast (target WCAG AA):** body = cream on dark or ink on warm; gold reserved for
accents/large headings (not body); green only for the verified state.

---

## 4. Typography

- **Display:** Fraunces (serif, warm authority) — headlines, hero, section titles.
- **UI / body:** Inter (clean, legible) — everything else.
- *(Alternative, closer to the prototype: Cormorant Garamond + Manrope.)*

| Role | Size | Notes |
|------|------|-------|
| Display | 56px | hero only, tight leading |
| H1 | 40px | page titles |
| H2 | 30px | section titles |
| H3 | 22px | card/sub headings |
| Lead | 18px | intros |
| Body | 16px | default, 1.6 line-height |
| Small | 14px | meta |
| Eyebrow | 12px | uppercase, +0.18em tracking, gold |

---

## 5. Spacing, radius, elevation, motion

- **Spacing:** 4px base — 4/8/12/16/24/32/48/64/96.
- **Radius:** sm 6 · md 10 · lg 16 · pill 999 (D1 values; D2 leans pill, D3 sharper).
- **Elevation:** cards on dark = hairline gold border + soft shadow/glow; on light = soft shadow.
- **Motion:** 150–220ms, ease `cubic-bezier(.2,.6,.2,1)`; disabled under reduced-motion.
- **Layout:** 1200px max content width, 24px gutters, 12-col grid.

---

## 6. Component styling specs (the kit)

Each maps to the Phase 2 inventory. Built in Phase 4.

- **Button:** primary = gold fill, ink text; secondary = ghost with gold border; sizes
  sm/md/lg; pill or md radius per direction; clear hover/focus/disabled.
- **ConsultantCard:** dark surface, hairline border (gold on hover), avatar, name (display),
  **VerifiedBadge** (green check), **PerformanceBadge(s)**, close rate + specialization,
  subtle rank chip in Ranked view. Number hidden until min sample (Decision #18).
- **PropertyCard:** image (4:3), price (prominent), title, key specs row, small agent + rating chip.
- **PerformanceBadge:** pill, gold or neutral; e.g. "Top this month", "High conversion".
- **VerifiedBadge:** green check pill; **RisingTalentTag:** gold-outline pill.
- **ScoreBreakdown:** horizontal bars (current vs target band) per sub-signal — the coaching view.
- **Inputs / Select / FilterBar:** dark or light variant, gold focus ring, clear labels/errors.
- **Forms (LeadForm):** inline validation, success state; sticky CTA → full form on mobile.
- **EmptyState / Skeleton / Pagination / Toast / Modal / CookieBanner / StatTile / DataTable:**
  consistent surfaces, spacing, and the tokens above.

---

## 7. Imagery & iconography

- **Photography:** real homes + real people/consultants; warm, natural light; avoid sterile stock.
- **Hero media:** poster image first; optional muted looping video on idle; off under
  reduced-motion (Decision #25). Optimise everything (the old 8 MB video/2 MB images are out).
- **Icons:** single line icon set (e.g. Lucide), 1.5px stroke, gold or current colour.
- **Logo:** concept C primary; concept B as the in-product Verified badge.

---

## 8. Accessibility targets

WCAG AA contrast on all text; visible gold focus rings; keyboard paths for nav/filters/forms;
alt text on imagery; labelled fields + associated errors; logical heading order;
reduced-motion honoured; tap targets ≥ 44px.

---

## 9. Open questions before Phase 4

1. **Pick a direction:** D1 Midnight Gold (rec, hybrid) · D2 Warm Trust · D3 Modern Confident.
2. **Type pairing:** Fraunces + Inter (rec) or Cormorant + Manrope (closer to prototype)?
3. **Default theme:** dark-first marketing + light content sections (rec), or all-dark, or
   all-light? *Rec: hybrid as above.*
4. **Verified-green accent:** keep the green for the verified/success moment (rec) or keep it
   strictly gold-only? *Rec: keep green — it reads as trust and separates "verified" from "premium".*

---

## 10. Phase 3 exit criteria (sign-off)

Complete when a direction is chosen, the tokens (colour/type/spacing/radius/motion) are
approved, and §9 is answered. On sign-off I finalize `design-tokens.css` + a Tailwind theme
mapping and (optionally) a full hi-fi mockup of the key screens in the chosen direction; then
we proceed to **Phase 4 — Frontend Build**, where Claude Code builds the styled component kit
and pages from this system (still on mock/seed data).

> **Next action:** review the three mockups → pick a direction → answer §9 → tell me to
> finalize tokens / start Phase 4.
