# Design-System Application — Reconciliation Plan

> **✅ COMPLETE (2026-06-22).** Run order 1→6 is done — tokens → primitives → cards → Home variety →
> profile re-skin, all green + AA. See the §3 checklist (all steps ✅) and the 2026-06-22 WORKLOG
> entries. Next: the remaining Phase 4.3 public pages (PROJECT-STATE §5).

> **Run order step 1 of 6** (PROJECT-STATE §6). This document is the gap analysis between the
> adopted design hand-off (`design/handoff/`, decision #46) and the current codebase. **No app
> code, tokens, or components were changed in this session** — this is the plan that steps 2→6
> execute against.
>
> **Authority (updated 2026-06-22, decision #51):** the Claude Design export (`design/handoff/`)
> is the **supreme authority for all visual/design values** and supersedes any conflicting prior
> decision — **except** where the zip's literal value would damage **WCAG AA** or **performance**,
> in which case the AA/perf-safe deviation is retained as a documented, justified exception (#53).
> When the zip self-contradicts, its `README.md` self-declares authority and wins.
>
> **Date:** 2026-06-21 (governance sync appended 2026-06-22) · **Branch:** `chore/design-apply-plan` (off `feat/pages-public`).

---

## 0 · Executive summary

The codebase is **already substantially aligned** with the hand-off, because the hand-off is
the fully-specified form of the visual system locked as decision #45 — and #45 was already
applied to the tokens and the two cards. Concretely, these are **already a value-for-value
match** and need no work:

- The **card-system tokens** (`--card-radius` 22, `--card-radius-media` 14, `--card-pad` 26,
  `--lift-card` −4, `--lift-card-media` −5, `--img-zoom` 1.06, `--dur-img` 500ms,
  `--accent-bar`, `--overlay-scrim`, `--plate-bg`).
- The **8-step type scale** (`--fs-hero` 72 … `--fs-button` 15) and the `text-hero/section/
  subsection/meta/eyebrow` utilities.
- The **gold-title gradient** (`--rft-gold-gradient` ≡ `--gradient-gold-title`), the **gold
  button gradient + hover** (`--rft-gold-button*` ≡ `--gradient-gold-button*`), and `.gold-title`
  / `.btn-gold`.
- The **sapphire-navy radial background** (same ellipse, same four stops).
- **Fonts** load via `next/font/google` (Fraunces + Inter → `--rft-font-display` /
  `--rft-font-sans`) — **decision (b) already satisfied**; the bundle's `tokens/fonts.css`
  `@import` is **not** to be adopted.
- **PropertyCard energy cert → GREEN per the zip** (decision #52, supersedes #49; explicit
  exception to #34). It currently renders neutral (`text-cream-muted`); the green flip lands in
  **Step 4**. The verified-green token is no longer verification-exclusive.

The remaining work is **additive**: bring in the parts of the hand-off that #45 summarized but
did not fully enumerate — the **translucent frosted surfaces**, the **full navy / gold / spacing
/ radius scales**, **blur tokens**, the **locked easing + `--dur-slow`**, **deeper card
shadows + glow shadows**, and the **three-step text ramp with navy-ink-on-ivory** — and then
wire the primitives, cards, home variety, and profile page to consume them.

---

## 1 · Naming-reconciliation strategy (decision (d))

**Chosen strategy: ALIAS, do not migrate.** Rationale = least churn + guaranteed-green.

- The codebase consumes tokens through **two stable surfaces** that components already depend on:
  1. the **Tailwind `@theme` semantic layer** in `app/globals.css` (`bg-ink`, `text-gold`,
     `text-cream`, `border-line`, `font-display`, `rounded-lg`, …), and
  2. a handful of **direct CSS vars** in the cards (`var(--surface-card)`, `var(--card-radius)`,
     `var(--accent-bar)`, `var(--shadow-card)`, `var(--shadow-raised)`, `var(--overlay-scrim)`,
     `var(--plate-bg)`, `var(--img-zoom)`, `var(--dur-img)`).
- **Keep both surfaces as the canonical names the components read** → zero component renames.
- In `app/design-tokens.css`, **add the hand-off's unprefixed tokens** (navy/gold scales,
  `--space-*`, `--radius-*`, motion, blur, new shadows, surface translucency, text ramp). Where
  a hand-off token and an existing `--rft-*` token are the **same concept and value**, collapse
  to **one source of truth and one alias** (prefer the hand-off token as source, `--rft-*` as
  the alias) so there is a single value to maintain.
- Where values **differ on purpose** (surface translucency, radii, easing, ink-on-ivory), do
  **not** alias — make the value change **in the step that wants the visual change**, with AA
  re-verification, so the build stays green between steps.
- **Preserve the AA/perf exceptions retained under zip supremacy (#51 → #53):**
  `--rft-gold-deep #8C5E12` (ivory label — 5.32:1; overrides the zip's `#d19e1d` at 2.30:1),
  **verified-ink-on-light → `#157048`** (5.22:1 on the real badge bg; supersedes the interim
  `#1E8F62` at 3.48:1 and the zip's `#2f9a6c` at 3.01:1 — token swap in Step 3), fonts via
  `next/font/google` (not the zip `@import`), and the README type scale (hero 72). These are
  deliberate and must survive reconciliation. **NOTE — energy cert is no longer an exception:**
  per #52 it now renders **GREEN** per the zip (supersedes #49; explicit exception to #34).

**Net effect:** steps 2→6 introduce the full hand-off token set and re-point primitives/cards to
it, but no step requires a sweeping find-replace of class names across pages.

---

## 2 · Token-by-token diff

Legend — **✅ match** (value-identical, name may differ) · **🟡 new** (absent today, additive) ·
**🔶 value mismatch** (exists but value differs → deliberate change in the mapped step).

### 2.1 Navy stage
| Hand-off token | Value | Current equivalent | Status |
|---|---|---|---|
| `--navy-950` | `#020812` | `--rft-bg-deep` | ✅ (name) |
| `--navy-900` | `#060f22` | — (`--rft-bg-elev` is `#0D1F38`) | 🟡 new |
| `--navy-800` | `#0a1a34` | `--rft-bg` | ✅ (name) |
| `--navy-700` | `#122a4f` | `--rft-bg-glow` | ✅ (name) |
| `--navy-600` | `#19365f` | — | 🟡 new (raised-panel border) |
| `--navy-500` | `#21436f` | — | 🟡 new (hairline on navy) |
| `--bg-navy-radial` | radial 4-stop | `--rft-bg-gradient` (same colours/positions) | ✅ (name) |

### 2.2 Surfaces
| Hand-off token | Value | Current | Status |
|---|---|---|---|
| `--surface-card` | `rgba(255,255,255,0.035)` | `--surface-card` = `#10233C` (solid) | 🔶 **mismatch** → translucent (Step 4) |
| `--surface-card-raised` | `rgba(255,255,255,0.06)` | `--surface-card-raised` = `#15294a` (solid) | 🔶 mismatch (Step 4) |
| `--surface-card-solid` | `#0c1d39` | `--rft-surface` ≈ `#10233C` | 🟡 new (solid variant) |
| `--surface-inset` | `rgba(2,8,18,0.45)` | — | 🟡 new (form wells, Step 3) |

> **Visual consequence:** translucent surfaces let the radial glow show through and pair with the
> new `--blur-panel`/`--blur-nav`. This is the single biggest look change and is intentionally
> deferred to **Step 4** (cards) so primitives in Step 3 stay green.

### 2.3 Gold — bright (titles/prices/numerals)
| Hand-off token | Value | Current | Status |
|---|---|---|---|
| `--gold-500` | `#e3a812` | `--rft-gold` | ✅ (name) |
| `--gold-100/200/300/600/700` | `#ffe9b3 … #b8862a` | — (`--rft-gold-bright #f0c14a` unrelated) | 🟡 new scale |
| `--gradient-gold-title` | `linear-gradient(180deg,#ffe6a0,#ffd86e 28%,#e3a812)` | `--rft-gold-gradient` | ✅ value |
| `--gradient-gold-hairline` | gold fade `90deg` | — | 🟡 new (gold rules/footers) |

### 2.4 Gold — calm / button
| Hand-off token | Value | Current | Status |
|---|---|---|---|
| `--gradient-gold-button` | `linear-gradient(160deg,#ffe79e,#f4c95c 46%,#dca233)` | `--rft-gold-button` | ✅ value |
| `--gradient-gold-button-hover` | hover variant | `--rft-gold-button-hover` | ✅ value |
| `--gold-calm` / `-soft` / `-deep` | `#d8b34f / #e6c163 / #c39327` | — | 🟡 new (calm split) |
| `--gold-tint` | `rgba(201,162,74,0.12)` | — | 🟡 new (chip/hover wash) |
| `--gold-border` | `rgba(227,168,18,0.38)` | — | 🟡 new (Button/Input/Card focus+border, Step 3) |
| `--gold-border-soft` | `rgba(201,162,74,0.22)` | — | 🟡 new (secondary Button border, Step 3) |

> **Override preserved:** `--rft-gold-deep #8C5E12` (ivory label) stays as the AA-safe override of
> the hand-off's `#d19e1d`. Do **not** replace it with `--gold-600` (#45).

### 2.5 Verified green (success only — #34)
| Hand-off token | Value | Current | Status |
|---|---|---|---|
| `--green-verified` | `#3fb984` | `--rft-verified` | ✅ (name) |
| `--green-verified-deep` | `#2f9a6c` | `--rft-verified-ink` `#1E8F62` | 🔶 **AA fail** — both literals fail on the light badge (`#2f9a6c` 3.01:1, interim `#1E8F62` 3.48:1). Move verified-ink-on-light → **#157048** (5.22:1) in **Step 3** (#53) |
| `--green-tint` / `--green-border` | `rgba(.14)` / `rgba(.40)` | — | 🟡 new |

### 2.6 Warm ivory (light section)
| Hand-off token | Value | Current | Status |
|---|---|---|---|
| `--ivory` | `#fbf8f2` | `--rft-bg-warm` | ✅ (name) |
| `--ivory-card` | `#ffffff` | `--rft-surface-lt` | ✅ (name) |
| `--ivory-100` | `#f5efe3` | — | 🟡 new |
| `--ivory-200` | `#ece3d2` | `--rft-line-lt` `#E6DECF` | 🔶 minor mismatch |
| `.rft-ivory` helper class | bg + ink | — (Tailwind `bg-warm` via SectionWrapper) | 🟡 new helper (Step 5) |

### 2.7 Text
| Hand-off token | Value | Current | Status |
|---|---|---|---|
| `--text-strong` | `#f5f1ea` | `--rft-text` | ✅ (name) |
| `--text-body` | `rgba(245,241,234,0.78)` | — (only `--rft-text-mut` `.66`) | 🟡 new |
| `--text-muted` | `rgba(245,241,234,0.58)` | `--rft-text-mut` `.66` | 🔶 mismatch (consolidate; keep `cream-muted` mapping) |
| `--text-faint` | `rgba(245,241,234,0.40)` | — | 🟡 new |
| `--text-ink` | `#1c2942` | `--rft-text-lt` `#211C17` (warm) | 🔶 **mismatch → navy-ink** (Step 2, verify on ivory Step 5) |
| `--text-ink-strong` | `#111c30` | — | 🟡 new |
| `--text-ink-muted` | `#5a6678` | `--rft-text-lt-mut` `rgba(33,28,23,.62)` | 🔶 mismatch (navy-ink muted) |
| `--hairline` | `rgba(245,241,234,0.10)` | `--rft-line` `rgba(255,255,255,0.07)` (already aliased to `--hairline`) | 🔶 minor (warm tint + .10) |
| `--hairline-strong` | `rgba(245,241,234,0.16)` | — | 🟡 new |
| `--wordmark-cream` / `--wordmark-slate` | `#f5f1ea` / `#8a93a3` | `--rft-text` / `--rft-slate` | ✅ (name) |

> **Decision needed inside Step 2/5, not now:** moving ivory body text from the current warm
> brown-black (`#211C17`) to the hand-off navy-ink (`#1c2942`) is a real (subtle) change on the
> ivory sections. The hand-off + PROJECT-STATE §7 both specify `#1c2942`, so **navy-ink wins**;
> re-verify AA on `--ivory` when applied.

### 2.8 Spacing & layout
| Hand-off | Value | Current | Status |
|---|---|---|---|
| `--space-0…--space-32` | `0 4 8 12 16 20 24 32 40 48 64 80 96 128` | `--rft-s1…--rft-s9` (partial: 4 8 12 16 24 32 48 64 96) | 🔶 incomplete → add full scale (keep `--rft-s*` aliases) |
| `--container-max` | `1200px` | `--rft-content-max` | ✅ (name) |
| `--container-narrow` | `760px` | — | 🟡 new |
| `--section-pad-y` | `96px` | — | 🟡 new |
| `--gutter` | `24px` | `--rft-gutter` | ✅ (name) |

### 2.9 Radii
| Hand-off | Value | Current | Status |
|---|---|---|---|
| `--radius-xs` | `6px` | `--rft-r-sm` `6` | 🔶 renumber |
| `--radius-sm` | `10px` | `--rft-r-md` `10` | 🔶 renumber |
| `--radius-md` | `14px` | — | 🟡 new |
| `--radius-lg` | `20px` | `--rft-r-lg` `16` | 🔶 mismatch (16→20) |
| `--radius-xl` | `28px` | — | 🟡 new |
| `--radius-pill` | `999px` | `--rft-r-pill` | ✅ |

> **Care item (Step 2/3):** Tailwind maps `rounded-sm/md/lg` → `--rft-r-sm/md/lg`. Adopting the
> hand-off radius scale shifts `rounded-lg` 16→20 and `rounded-md` 10→14 wherever used (Input,
> StatTile, etc.). Audit `rounded-*` usages and remap deliberately; the cards already use the
> explicit `--card-radius`/`--radius-lg`-equivalent literals so they are unaffected.

### 2.10 Shadows, blur, motion
| Hand-off | Value | Current | Status |
|---|---|---|---|
| `--shadow-card` | `0 22px 60px -28px rgba(2,8,18,.9)` | `--shadow-card` (shallower) | 🔶 deepen (Step 4) |
| `--shadow-raised` | `0 30px 80px -32px rgba(2,8,18,.95)` | `--shadow-raised` (shallower) | 🔶 deepen (Step 4) |
| `--shadow-sm` | `0 4px 14px -6px …` | — | 🟡 new |
| `--shadow-gold-glow` | gold ring+glow | `--rft-glow-gold` (different) | 🔶 align (featured Card, Step 3/4) |
| `--shadow-green-glow` | green ring+glow | — | 🟡 new |
| `--shadow-ivory` | `0 18px 44px -24px …` | `--rft-shadow-lt` (different) | 🔶 align (Step 5) |
| `--blur-panel` / `--blur-nav` | `18px` / `14px` | — | 🟡 new (frosted cards + sticky nav, Step 3/4) |
| `--ease-out` | `cubic-bezier(0.22,0.61,0.36,1)` | `--rft-ease cubic-bezier(.2,.6,.2,1)` | 🔶 mismatch → adopt locked easing |
| `--ease-in-out` | `cubic-bezier(0.65,0,0.35,1)` | — | 🟡 new |
| `--dur-fast` | `140ms` | `--rft-dur-fast` `150` | 🔶 minor |
| `--dur-base` | `220ms` | `--rft-dur` `220` | ✅ value |
| `--dur-slow` | `420ms` | — | 🟡 new (accent-bar wipe, Step 4) |

### 2.11 Card system (premium redesign) — **already landed (#45)**
`--card-radius` 22 · `--card-radius-media` 14 · `--card-pad` 26 · `--lift-card` −4 ·
`--lift-card-media` −5 · `--img-zoom` 1.06 · `--dur-img` 500ms · `--accent-bar` ·
`--overlay-scrim` · `--plate-bg` — **all ✅ value-for-value match.**

### 2.12 Typography scale — **already landed (#45)**
`--fs-hero` 72 · `--fs-section` 40 · `--fs-subsection` 26 · `--fs-lead` 20 · `--fs-body` 16 ·
`--fs-meta` 13 · `--fs-eyebrow` 12 · `--fs-button` 15 — **all ✅** and matching README §3.

> **Discrepancy flagged (README wins):** the bundle's `tokens/typography.css` carries a parallel
> scale (`--fs-display-1: 76px`, `--fs-h1: 42px`, …) that differs from README §3 (hero **72**,
> section **40**). README is authoritative → keep the current `--fs-*` values; do **not** import
> the bundle's `typography.css` display scale.

### 2.13 New component-specific specs (from README §6)
| Spec | Detail | Where |
|---|---|---|
| **StatBlock** | value Fraunces **30px**; `gold?` clips title gradient; `delta?` positive = green; `align?` | 🟡 new primitive (Step 3) — current `StatTile` is the closest existing (value 24px, no `delta`/`gold`/`align`) |
| **RankBadge** | coin (`--radius-md`); rank **1–3 bright-gold gradient on dark face + `--shadow-gold-glow`**, 4+ neutral; `size?` px | 🟡 new (Step 3) — current `RankIndicator` is flat `bg-gold` for top-3 (no gradient/glow), and ConsultantCard hand-rolls a coin |
| **Badge** | `variant: gold \| rising \| success \| neutral`, `iconLeft?`, pill 12px/600 | 🟡 new unified primitive (Step 3) — today split across `PerformanceBadge`/`RisingTalentTag`/`VerifiedBadge` |
| **Tag** | quiet outline chip, `--radius-sm`, 12.5px/500, `onIvory?` | 🟡 new (Step 3) — specialities currently rendered as plain `·`-joined text |
| **Card** | `variant: default \| raised \| featured \| ivory`; default = translucent + hairline + `--shadow-card` + **18px backdrop-blur** | 🟡 new surface primitive (Step 3) |
| **Avatar `ring`** | gold-gradient ring via border-box layering | 🔶 current Avatar uses `ring-2 ring-gold/30` (flat ring) — upgrade to gradient ring (Step 3) |

---

## 3 · Phased checklist (run-order steps 2→6)

> All statuses are **⬜ Not started** — this session produced the plan only. Each step is a
> separate Claude Code prompt, **green-gated** (`pnpm build` + `tsc --noEmit` + `eslint`), and
> ends stop-and-confirm. Prompts 2–6 are authored by the planning chat from this gap analysis.

| # | Step | Scope (from this diff) | Status |
|---|---|---|---|
| **2** | **Tokens** | Add full navy/gold/green/ivory scales, three-step text ramp + navy-ink-on-ivory (§2.7), full `--space-*` (§2.8), hand-off radius scale + remap (§2.9), `--shadow-sm/gold-glow/green-glow/ivory` + deepen card/raised (§2.10), `--blur-panel/nav`, locked `--ease-out` + `--dur-slow` (§2.10), `--surface-inset`. Alias `--rft-*` ↔ hand-off tokens per §1. Wire **`lucide-react`** dependency (decision a). **Keep** `next/font` fonts (decision b — no `fonts.css` @import). Keep `--rft-gold-deep` override (energy-cert green flip + verified-ink #157048 land later, #52/#53). | ✅ **Done 2026-06-22** (additive only; lucide-react 1.21.0; green) |
| **3** | **Primitives** | Button (secondary→`--gold-border-soft`/`--gold-tint`/`--gold-border`; focus ring spec); new **Card** (translucent + 18px blur + featured glow), **StatBlock** (30px, `gold`/`delta`/`align`), **RankBadge** (gradient coin + glow, supersedes hand-rolled coin), **Badge**+**Tag** unified chips; Input/Select wells (`--surface-inset`, gold focus); **Avatar** gradient ring; **Logo/Wordmark** tri-tone (already ✅, verify ivory ink switch); **VerifiedBadge** pill/seal. Replace inline `icons.tsx` SVGs with **`lucide-react`** (search, map-pin, star, arrow-right, chevron-right, clock, shield-check, trending-up, scale, refresh-cw, bed, bath, ruler, globe, menu). Refresh `/dev/primitives` + `/dev/components`. | ✅ **Done 2026-06-22** — radius remap #54 (md 10→14, lg 16→20; cards/wells pinned); icons = lucide shim #55; verified-ink #53 swapped to #157048; new Card/StatBlock/RankBadge/Badge/Tag; Avatar ring; non-card consumers migrated; green |
| **4** | **Cards** | ConsultantCard "Spotlight" + PropertyCard "Editorial Overlay" onto the new translucent surfaces + 18px blur + deepened shadows; Framer Motion entrance (opacity+y, stagger 60–80ms, image scale 1.04→1) + hover (lift, **accent-bar `scaleX 0→1` over `--dur-slow`**, score glow, image zoom 1.06/500ms) on the **locked `--ease-out`**, reduced-motion-safe. **Energy cert renders GREEN per the zip (decision #52 — supersedes #49; exception to #34)** — adopt the README's verified-green cert. | ✅ **Done 2026-06-22** — surface flip LIVE (cards translucent + 18px blur; opaque chrome/ProfileContact repointed); shadows deepened; both cards rebuilt on primitives (#18/#20 preserved); energy cert GREEN (5.23:1); Framer entrance+stagger+hover, reduced-motion-safe; RisingTalentTag/RankIndicator/StatTile retired; green + AA |
| **5** | **Home section variety** | Apply `.rft-ivory` light break + navy-stage alternation across Home sections; align ivory shadows/ink (§2.6/2.7/2.10); wire the redesigned cards. Verify AA on the (new navy-ink) ivory sections. | ✅ **Done 2026-06-22** — `.rft-ivory` helper + SectionWrapper `ivory` tone; rhythm N·I·N·N·I·N·N (HowItWorks + split = ivory breaks; cards stay navy); muted→.58 (AA 4.94:1) + hairline→.10; ivory AA all ≥4.5; green. **Section rhythm pending sign-off** |
| **6** | **Profile page** | `/[locale]/consultores/[slug]` **already exists & is fully built** — Step 6 is **align-to-system, not green-field**: re-skin header/ScoreBreakdown/about/listings/reviews+empty-state/inline-LeadForm onto the finalized primitives & cards; keep `getConsultant(slug)` + `notFound()`, #18 score gating, Diogo 0-review empty state, #28 desktop-inline/mobile-sticky contact. | ✅ **Done 2026-06-22** — header (seal + 38px gold merit #18 + StatBlock), ScoreBreakdown→Card + weights, ReviewItem frosted, Reveal entrance; #18/#28/Diogo preserved; text-faint→cream-muted AA fix; green + smoke. **RUN ORDER 1→6 COMPLETE** |

---

## 4 · Confirmation — decisions (a)–(d) reflected

- **(a) `lucide-react` as icon library** — ✅ added as a dependency in **Step 2**; inline
  `components/ui/icons.tsx` SVGs replaced with `lucide-react` imports in **Step 3** (icon map in
  the Step-3 row). 2px stroke, gold on navy / green for verification.
- **(b) Fonts via `next/font/google`** — ✅ **already in place** (`app/layout.tsx` loads
  Fraunces + Inter → `--rft-font-display`/`--rft-font-sans`). Plan **explicitly excludes** the
  bundle's `tokens/fonts.css` `@import`; no change needed beyond keeping the current setup.
- **(c) PropertyCard energy cert — REVERSED to GREEN per the zip** (decision #52, supersedes
  #49; explicit exception to #34). The original Prompt-1 instruction (c) "energy cert NEUTRAL" no
  longer holds: under zip supremacy (#51) the cert renders the verified-green per the EU/PT
  energy-label convention. It is still neutral in code today; **Step 4 applies the green flip.**
- **(d) Careful token reconciliation for least churn + green** — ✅ the **alias-don't-migrate**
  strategy in §1: keep the Tailwind `@theme` + direct-var surfaces components already read,
  add the hand-off tokens alongside, collapse same-value pairs to one source + one alias, and
  make deliberate value changes only inside the step that wants the visual change.

---

## 5 · Notes / flags for the planning chat

- **Design-authority rule (2026-06-22, #51):** the zip is the supreme visual authority and
  supersedes conflicting prior decisions, except where its literal value damages WCAG AA or
  performance (documented exceptions in #53). Energy cert now renders **green** (#52, supersedes
  #49). Verified-ink-on-light moves to **#157048** (#53) — the interim #1E8F62 measured 3.48:1
  (AA fail) at its real badge background.
- **Profile page already exists** (committed 2026-06-13) — PROJECT-STATE §5/§6 describe Step 6 as
  "build the paused profile page", but it is built; reframe Step 6 as a **re-skin/alignment**.
- **README vs bundle token files**: `tokens/typography.css` (hero 76) and the ivory label
  (`#d19e1d`) disagree with README/decisions (hero 72; AA label `#8C5E12`). **README + decisions
  win** — do not blindly import the bundle's `.css` token files; port values per this diff.
- **Biggest visible change** is the move to **translucent + blurred surfaces** (§2.2) — staged to
  Step 4 so primitives stay green first.
- **AA re-verification** is required when (i) ivory body text moves to navy-ink (§2.7) and
  (ii) hairlines warm to `rgba(245,241,234,.10)` (§2.7).

### Step 2 staging resolutions (applied 2026-06-22)
Step 2 was kept strictly **visually inert** — the two judgement calls flagged in §2.7 were both
deferred rather than flipped:
1. **Muted text:** live `--rft-text-mut` (→ `cream-muted`) kept at **.66**; hand-off
   `--text-muted` (.58) added but unconsumed. Consolidation (.66→.58) → **Step 3/5**.
2. **Hairline:** live `--rft-line`/`--hairline` kept at **white .07**; `--hairline-strong` (.16)
   added. Warm-tint to `rgba(245,241,234,.10)` → **Step 3/5**.

Also staged out of Step 2 (token values added, but not yet consumed/flipped): the **radius
remap** (`--rft-r-*` / `rounded-*` still bind to 6/10/16 — the new `--radius-*` scale is inert
until **Step 3**), the **surface translucency** flip and **`--shadow-card`/`-raised` deepen**
(**Step 4**). The ivory body-text **navy-ink** change (§2.7) *was* applied this step (green-safe;
AA re-verify on ivory at **Step 5**). The "alias-don't-migrate" convention (§1) is now committed
project-wide per decision #50 (no new decision number — refinement of #50).
</content>
</invoke>
