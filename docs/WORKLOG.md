# Worklog — RealFairTrust

> Append a new entry at the **top** at the end of every working session.
> Format: date · phase · what was done · what changed · what's next.
> Newest entry first.

---

## 2026-06-22 · Phase 4.3 — Design-apply step 3: PRIMITIVES (+ icons, radius, verified-ink)

**Done** (branch `chore/design-apply-primitives`; ISOLATION RULE held — Consultant/PropertyCard
internals untouched; only NON-CARD consumers migrated)

- **Verified-ink swap (#53 implemented):** `--rft-verified-ink` **#1E8F62 → #157048** (on-light
  verified ink; 5.22:1 on the real badge bg). Audit: #1E8F62 had exactly one live consumer
  (VerifiedBadge `tone="light"` via `text-verified-ink`); after the swap **#1E8F62 has no
  remaining app usage** (only the unimported legacy `brand/design/` copy retains it) — retired.
  Bright on-dark `--green-verified #3fb984` left untouched.
- **Radius remap (#54):** re-pointed `--rft-r-sm/-md/-lg` → `--radius-xs/-md/-lg`, so
  `rounded-md` 10→**14**, `rounded-lg` 16→**20**, `rounded-sm` stays **6**. Audit covered all
  `rounded-*` / `--rft-r-*` / `var(--radius-*)` usages. Cards confirmed on explicit
  `--card-radius` (22) → unaffected; form wells pinned to `--radius-sm` (10) so Inputs keep their
  10px corners. Verified in compiled CSS (`.rounded-md{border-radius:var(--rft-r-md)}` →
  `--radius-md` = 14).
- **Icons → lucide-react (#55):** rewrote `components/ui/icons.tsx` as a **re-export shim**
  (chosen over per-consumer migration — 13 icons across 9 files; zero consumer churn). Each
  `Icon*` keeps its name + API, now backed by lucide (2px stroke, currentColor, 1em box):
  Check, ShieldCheck (verified), Star (filled), TrendingUp (rising), Trophy, Inbox, ChevronDown,
  Bed, Bath, Ruler (area), Zap (energy — neutral; green flip is Step 4), MapPin, Loader2 (spinner).
  Canonical set also exported (Search/ArrowRight/ChevronRight/Clock/Scale/RefreshCw/Globe/Menu).
  All 15 target exports verified present in lucide-react@1.21.0. Header's animated hamburger +
  Modal/MediaImage inline SVGs left as-is (out of scope).
- **New primitives** (`components/ui/`): **Card** (default/raised/featured/ivory; hairline +
  shadow-card + `--card-radius`; backdrop-blur `--blur-panel` wired but INERT over the still-solid
  surface — reveals in Step 4; shadows NOT deepened), **StatBlock** (Fraunces 30px, `gold` clips
  the title gradient, `delta` green/muted, `align`), **RankBadge** (coin; 1–3 gold gradient +
  `--shadow-gold-glow`, 4+ neutral), **Badge** (unified gold/rising/success/neutral pill,
  `iconLeft`, `onIvory`), **Tag** (quiet outline chip, `onIvory`).
- **Aligned primitives:** Input/Select/Textarea → `--surface-inset` well + `--gold-border-soft`
  hover + `--radius-sm`; **Avatar** gained a `ring` prop (gold-gradient border-box ring);
  **Wordmark** gained `onIvory` (Real/Trust → dark ink, Fair stays gold); **VerifiedBadge**
  gained the **seal** form (Concept B, #12) + on-light ink now #157048.
- **Non-card consumer migrations:** slug profile (RisingTalentTag→Badge rising, top→Badge gold,
  RankIndicator→RankBadge, building→Badge neutral, specialities→Tag, Avatar `ring`; kept
  PerformanceBadge for the numeric `score` + the #18 gating logic), ScoreBreakdown
  (building→Badge neutral), HomeHero (RankIndicator→RankBadge). PerformanceBadge / RisingTalentTag
  / RankIndicator / StatTile **retained** (still consumed by the frozen ConsultantCard or Showcase;
  migrate/remove in Step 4).
- **Dev showcases:** `/dev/primitives` gained Badge / RankBadge / Tag / StatBlock / Card /
  Avatar-ring / VerifiedBadge-seal sections (+ onIvory demos). `/dev/components` auto-reflects the
  aligned composites (ScoreBreakdown→Badge, lucide icons, new radii).
- **Hygiene:** `eslint.config.mjs` now ignores `design/handoff/**` → the 2 reference-bundle
  `<img>` warnings are gone.

**Deferrals carried forward (untouched):** surface translucency reveal + `--shadow-card/-raised`
deepen + card entrance/hover motion + ConsultantCard/PropertyCard rewiring + energy-cert green
flip → **Step 4**; muted .66→.58 + hairline warm-tint + `.rft-ivory` section helper → **Step 5**.

**Green gate** (Node 22.22.3 / pnpm 11.4): `pnpm build` ✅ · `tsc --noEmit` ✅ (exit 0) ·
`eslint` ✅ **0 warnings / 0 errors**. **Runtime smoke** (`next start`): `/`, `/consultores`,
`/consultores/ana-silva`, `/en`, `/en/consultants`, `/en/consultants/ana-silva` all **200**;
lucide icons render (79 refs on home, 124 on profile); Badge/VerifiedBadge render on the profile.

**Next**
- Step 4 (Cards): rewire ConsultantCard "Spotlight" + PropertyCard "Editorial Overlay" onto the
  new primitives, flip the surface translucent (+ reveal the wired blur) + deepen card shadows +
  Framer entrance/hover motion, and apply the **energy-cert GREEN** flip (#52). Then Step 5/6.

---

## 2026-06-22 · Governance sync — zip = supreme authority; energy cert green; AA exceptions (docs only)

**Done** (docs-only; no app code/tokens/components — branch `chore/design-governance-sync`)
- Logged the new governance rule and its consequences in `docs/DECISIONS.md` as **#51–#53**:
  - **#51 — DESIGN AUTHORITY:** the Claude Design export (`design/handoff/`) is the supreme
    authority for all visual values, superseding any conflicting prior decision **except** where
    the zip's literal value damages WCAG AA or performance (documented exceptions). README wins
    on zip self-contradiction.
  - **#52 — ENERGY CERT GREEN** (supersedes #49; explicit exception to #34): PropertyCard energy
    cert renders verified-green per the EU/PT convention; green is no longer verification-only.
    Implemented in run-order **Step 4**.
  - **#53 — AA/perf exceptions retained** (ratios **measured**, not estimated — see below).
- Reconciled `docs/DESIGN-APPLY-PLAN.md`: reframed the §1 overrides + §4(c) + §0 summary as
  "AA/perf exceptions under zip supremacy"; **reversed the energy-cert instruction everywhere**
  (Prompt-1 (c) and the §3 Step-4 row now read **GREEN per the zip, #52**); updated the §2.5
  verified-ink row (AA fail → #157048 in Step 3); added the design-authority note to §5.
- Updated `docs/PROJECT-STATE.md`: §4 adds #51–#53 and marks #49 superseded; §7 flips the energy
  cert to green, sets ivory label `#8C5E12` + verified-ink-on-light `#157048` as AA exceptions,
  and adds the design-authority/exceptions summary; refreshed the "Last updated" + §8 lines.

**Measured WCAG contrast ratios** (computed against the real rendered backgrounds, sRGB):
- Ivory label gold **#8C5E12** on `--ivory #fbf8f2` = **5.32:1** ✅ AA; zip's `#d19e1d` = **2.30:1** ❌.
- Verified-ink **#1E8F62** (interim) on the real badge bg (`bg-verified/12` over ivory) =
  **3.48:1** ❌ AA-4.5 for the labelled pill text (clears only the 3:1 icon bar); on pure white
  4.07:1 ❌. The zip's `#2f9a6c` = **3.01:1** ❌ — worse.
- **Resolution (user-approved):** verified-ink-on-light → **#157048** = **5.22:1** on the real
  badge bg / **6.10:1** on white ✅ AA. Recorded as the #53 exception; **token swap happens in
  Step 3** (this session is docs-only, so `app/design-tokens.css` still holds the interim value).

**Process note:** the Prompt's STOP-and-report contingency for verified-ink triggered — #1E8F62
failed AA at its usage, so a third value was needed. Confirmed with the user (chose #157048)
before writing the decision, rather than recording a false "passes AA" claim.

**Changed:** `docs/DECISIONS.md`, `docs/DESIGN-APPLY-PLAN.md`, `docs/PROJECT-STATE.md`, this
worklog. No app/code/token/component changes.

**Next**
- Step 3 (Primitives) now also carries: swap `--rft-verified-ink` #1E8F62 → **#157048**; the
  energy-cert green flip is **Step 4** (#52). Then steps 4→6 as planned.

---

## 2026-06-22 · Phase 4.3 — Design-apply step 2: TOKENS (pure-additive + lucide-react)

**Done** (token layer only — no component files touched; branch `chore/design-apply-tokens`)
- Added the **hand-off design-system token layer** to `app/design-tokens.css` as a pure-additive
  block (decision #46, plan §2), then **aliased the legacy `--rft-*` names to the new hand-off
  sources** where value-identical (plan §1 — "alias, don't migrate"). Concretely:
  - **Navy** §2.1: added `--navy-900/-600/-500`; `--navy-950/-800/-700` + `--bg-navy-radial`
    (kept the #45 explicit-stop form) are now the sources; `--rft-bg-deep/-bg/-bg-glow/
    -bg-gradient` alias them. `--rft-bg-elev` (#0D1F38) left as-is.
  - **Gold bright** §2.3: added `--gold-100…-700`, `--gradient-gold-title`,
    `--gradient-gold-hairline`; `--rft-gold` → `var(--gold-500)`, `--rft-gold-gradient` →
    `var(--gradient-gold-title)`.
  - **Gold calm/button** §2.4: kept `--rft-gold-button(-hover)` ≡ `--gradient-gold-button(-hover)`;
    added `--gold-calm/-soft/-deep-calm`, `--gold-tint`, `--gold-border`, `--gold-border-soft`.
    **Override preserved:** `--rft-gold-deep` / `--label-gold-on-ivory` stay **#8C5E12** (AA),
    not the hand-off's #d19e1d/`--gold-600` (#45).
  - **Green** §2.5: added `--green-verified(-deep)`, `--green-tint`, `--green-border`;
    `--rft-verified` → `var(--green-verified)`. **Kept `--rft-verified-ink #1E8F62`** for AA
    (did not adopt #2f9a6c).
  - **Ivory** §2.6: added `--ivory`, `--ivory-100`, `--ivory-200`, `--ivory-card`;
    `--rft-bg-warm`/`--rft-surface-lt` alias them. (No `.rft-ivory` class — that's Step 5.)
  - **Text** §2.7: added `--text-body/.78`, `--text-muted/.58`, `--text-faint/.40`,
    `--text-ink #1c2942`, `--text-ink-strong`, `--text-ink-muted`, `--hairline-strong`,
    `--wordmark-*`. Repointed **ivory body text to navy-ink** (`--rft-text-lt` →
    `var(--text-ink)`; `--rft-text-lt-mut` → `var(--text-ink-muted)`) — deliberate brown→navy
    per plan §2.7 + PROJECT-STATE §7 (AA re-verify on ivory deferred to Step 5).
  - **Spacing** §2.8: added full `--space-0…-32`, `--container-narrow`, `--section-pad-y`;
    `--rft-s1…-s9`, `--rft-content-max`, `--rft-gutter` alias the matching `--space-*`/layout
    tokens.
  - **Radii** §2.9: added `--radius-xs/sm/md/lg/xl/pill`. **Remap DEFERRED to Step 3** —
    `--rft-r-*` and the Tailwind `rounded-*` mapping untouched (verified below).
  - **Shadows/blur** §2.10: added `--shadow-sm/-gold-glow/-green-glow/-ivory`, `--blur-panel/
    -nav`. **`--shadow-card`/`--shadow-raised` NOT deepened — deferred to Step 4.**
  - **Surfaces** §2.2: added `--surface-card-solid #0c1d39`, `--surface-inset`. **Translucency
    flip of `--surface-card`/`-raised` DEFERRED to Step 4.**
  - **Motion** §2.10: adopted the LOCKED `--ease-out cubic-bezier(0.22,0.61,0.36,1)` (+
    `--ease-in-out`); `--rft-ease` → `var(--ease-out)`, `--rft-dur-fast` → `var(--dur-fast)`
    (140), `--rft-dur` → `var(--dur-base)`. Added `--dur-slow 420ms`. (`--rft-ease` has **no
    live consumers**, so the curve adoption is inert today.)
- **Typography:** kept current `--fs-*` (hero 72); did **not** import the bundle's
  `tokens/typography.css` (hero 76) or `tokens/fonts.css` `@import` (decision b — fonts stay on
  `next/font/google`).
- **Dependency (decision a):** `pnpm add lucide-react` → **lucide-react 1.21.0**. No icons
  replaced yet (icon migration is Step 3); unused dep is green-safe.

**Two staging resolutions applied** (the "if unsure, keep current + note it" calls):
1. **Muted text not consolidated.** Live `--rft-text-mut` (→ Tailwind `cream-muted`) kept at
   **.66**; hand-off `--text-muted` (.58) added but unconsumed. Flipping .66→.58 site-wide is a
   visible change → deferred to the step that restyles text (Step 3/5).
2. **Hairline not warm-tinted.** Live `--rft-line`/`--hairline` kept at **white .07**;
   `--hairline-strong` (.16) added. Warming to `rgba(245,241,234,.10)` is visible → deferred to
   Step 3/5.

**Changed**
- `app/design-tokens.css` (additive tokens + alias repoints), `package.json` + `pnpm-lock.yaml`
  (lucide-react). **No `app/globals.css`, no component, no font changes.**

**Green gate** — `nvm use 22` (Node 22.22.3, pnpm 11.4):
- `pnpm build` ✅ · `tsc --noEmit` ✅ · `eslint` ✅ **0 errors** (2 `<img>` warnings, both in the
  non-shipped `design/handoff/` reference JSX — out of scope).
- **Zero visual change verified empirically:** compiled CSS shows `.rounded-sm/md/lg` still
  resolve to `var(--rft-r-*)` (6/10/16), and no component uses `rounded-xs/xl` or reads
  `var(--radius-*)` directly — so the new `--radius-*` scale is inert to current rendering
  (the dual `--radius-*` declaration is cosmetic and is Step 3's remap concern).

**Next**
- Step 3 (Primitives): consume the new tokens — Button secondary borders, new Card/StatBlock/
  RankBadge/Badge/Tag, Input/Select wells, Avatar gradient ring; **the radius remap + `rounded-*`
  audit**, the muted/hairline consolidations, and the `lucide-react` icon migration land here.

---

## 2026-06-21 · Phase 4.3 — Design-apply step 1: reconciliation plan (docs only)

**Done** (plan-only session; **no app code/tokens/components changed**)
- Unzipped the design bundle `design/RealFairTrust_Design_System.zip` into `design/handoff/`
  (flattened out of the nested `design_handoff_realfairtrust/` folder) and stripped the trailing
  `.txt` from all component files so they read as real `.jsx` / `.d.ts` / `.html`. Reference/spec
  only — not shipped.
- Read the hand-off fully: `README.md` (authoritative), all `reference/tokens/*.css`, and the
  component specs under `reference/components/**`. Compared against the live codebase:
  `app/design-tokens.css`, `app/globals.css` (@theme), `app/layout.tsx` (fonts),
  `components/ui/*`, `components/Wordmark.tsx` + Header/Footer, and `ConsultantCard`/`PropertyCard`.
- Wrote **`docs/DESIGN-APPLY-PLAN.md`**: a token-by-token diff (✅ match / 🟡 new / 🔶 value
  mismatch), the **alias-don't-migrate** reconciliation strategy (least churn + green), a phased
  checklist with a Status column mapping to run-order steps 2→6, and explicit confirmation that
  decisions (a)–(d) are reflected.
- Key findings: the **card-system tokens, the 8-step type scale, both gold gradients, and the
  navy radial background already match the hand-off value-for-value** (landed under #45);
  **fonts already load via `next/font/google`** (decision b satisfied — bundle `fonts.css`
  @import excluded); **PropertyCard energy cert is already NEUTRAL** (decision c upheld);
  `lucide-react` is **not yet a dependency** (added in step 2); the **profile page already
  exists fully built** (step 6 = re-skin, not green-field). Real gaps = translucent/blurred
  surfaces, full navy/gold/space/radius scales, blur tokens, locked easing + `--dur-slow`,
  deeper shadows + glow shadows, three-step text ramp + navy-ink-on-ivory.
- Flagged README-vs-bundle discrepancies (typography.css hero 76 vs README 72; ivory label
  #d19e1d vs AA #8C5E12) — README + decisions win; do not blind-import the bundle token CSS.

**Changed**
- Added `design/handoff/` (extracted reference bundle) and `docs/DESIGN-APPLY-PLAN.md`; this
  worklog. No app/code/token/component changes.

**Next**
- Planning chat authors Prompts 2→6 from this gap analysis. Step 2 = tokens (+ `lucide-react`,
  keep `next/font`), then step 3 primitives → step 4 cards → step 5 home variety → step 6
  profile re-skin. Each green-gated, stop-and-confirm.

---

## 2026-06-21 · Phase 4.3 — Design hand-off adopted; decisions #46–#50 logged (docs only)

**Done** (docs-only session; no app code touched)
- Received the design bundle at `design/RealFairTrust_Design_System__1_.zip` and the refreshed
  `docs/PROJECT-STATE.md` (new orientation snapshot; "Last updated 2026-06-21").
- Logged **decisions #46–#50** in `docs/DECISIONS.md` exactly per PROJECT-STATE §4:
  - #46 design hand-off (`design/handoff/`) adopted as the authoritative visual spec.
  - #47 icons = `lucide-react` (2px stroke), replacing inline SVGs.
  - #48 fonts = Fraunces + Inter via `next/font/google`.
  - #49 PropertyCard energy cert stays NEUTRAL/muted — overrides the hand-off's verified-green;
    green reserved for verification only (upholds #34).
  - #50 token reconciliation done carefully (alias old→new or migrate) for least-churn green builds.
- `CLAUDE.md`: added **§0 standing behavioral rule** (never guess; <90% → ask) + an orientation
  pointer to `docs/PROJECT-STATE.md`; updated the status line to "Phase 4.3 — design-system
  application, run order step 1 (reconciliation plan)".

**Changed**
- `docs/DECISIONS.md`, `CLAUDE.md`, `docs/PROJECT-STATE.md` (added), this worklog. No app/code changes.

**Next**
- Design-system application run order (PROJECT-STATE §6): step 1 = unzip the bundle into
  `design/handoff/`, read it fully, and produce `docs/DESIGN-APPLY-PLAN.md` (reconciliation plan,
  no app-code changes) on `chore/design-apply-plan`. Then steps 2→6 (tokens → primitives → cards →
  home variety → profile), each green-gated.

---

## 2026-06-07 · Phase 4 — Milestone 4.3 Consultores page (feat/pages-public, PR #7)

**Done** (same branch/PR as Home; milestone merges once all public pages reviewed)
- Built **Consultores discovery + leaderboard** `app/[locale]/consultores/page.tsx` (server;
  data via `lib/data`, components by props): intro header; `ConsultantFilters` (region +
  specialization selects + **Ranked/All toggle**, URL-synced, sentinel = no filter);
  separate **Rising Talent board** for consultants < 6 months (Decision #6), shown in Ranked
  view; main **ConsultantCard grid** with subtle rank (Decision #26); `UrlPagination`.
- Rule: in **All** view rising consultants appear inline in the one paginated grid, so the
  separate board only shows in **Ranked** view (no duplication).
- "Suggest one for me" entry is structurally present but **gated off** (`flags.matchMode`).
- New components: `components/consultores/ConsultantFilters.tsx`, `components/UrlPagination.tsx`
  (reusable URL-synced pagination). Added `consultores` namespace to `messages/{pt,en}.json`
  at parity. No hardcoded strings; responsive; AA; reduced-motion-safe.
- `pnpm build` ✅, `tsc --noEmit` ✅, `eslint` ✅. Dev verified: `/consultores` + `/en/consultants`
  200; Ranked shows the board, All hides it and paginates everyone (rising on p2); region +
  specialization filters work; EN parity confirmed.

**Next (follow-ups, same branch):** Consultant profile → Buy/Rent → Property detail → Vender
→ static pages.

---

## 2026-06-07 · Phase 4 — Milestone 4.3 Home page (feat/pages-public → PR)

**Done**
- Merged PR #6 (4.2 Composites) into `develop`.
- Wired the **real Header + Footer + CookieBanner** into `app/[locale]/layout.tsx` (replaces
  the bare provider; all locale pages now get site chrome).
- Built the **Home page** `app/[locale]/page.tsx` (server component; data via `lib/data`):
  - **HomeHero** (client) — split hero: value + inline search (→ `/comprar?q=`) + dual CTAs
    on the left; optimized **poster-only** gradient panel on the right (no video yet, #38)
    with a **"Top deste mês" proof card** surfacing the current #1 consultant.
  - **HowItWorks** (client) — 3-step explainer, reduced-motion-safe staggered fade-in.
  - **Top consultants** — 3 `ConsultantCard`s from `getConsultants({view:'ranked'})` → `/consultores`.
  - **Featured listings** — `PropertyCard`s from `getListings()` → `/comprar`.
  - **Clients/consultants split** (warm light section), **Trust band**, **Join CTA** (→ `/consultores/aderir`).
- Added `home` namespace to `messages/{pt,en}.json` at full key parity. No hardcoded strings.
- Responsive (mobile/tablet/desktop), AA-minded, reduced-motion-safe.
- `pnpm build` ✅, `tsc --noEmit` ✅, `eslint` ✅. Dev smoke: `/` and `/en` both 200, all
  sections render with localized copy, Header/Footer localized, no runtime errors.

**Open / awaiting user**
- Review the Home page on `pnpm dev` (`/` and `/en`); merge the PR.

**Next (Claude Code, follow-ups)**
- Remaining 4.3 public pages: Consultores → Consultant profile → Buy/Rent → Property detail
  → Vender → static pages (Como funciona, Aderir, Sobre, Contacto, Legal).

---

## 2026-06-07 · Phase 4 — Milestone 4.2 Composite components (feat/components → PR)

**Done**
- Merged PR #5 (4.1 Primitives) into `develop`.
- Built the composite kit in `components/` from the 4.1 primitives (Midnight Gold, tokens only):
  Header (+ LanguageSwitcher + mobile hamburger), Footer, ConsultantCard, PropertyCard,
  ScoreBreakdown (5 sub-signals vs target band), FilterBar (state synced to URL query),
  LeadForm (RHF + Zod, inline validation, success state, **no persistence**), ReviewItem,
  Pagination, CookieBanner (localStorage consent), Modal (Radix Dialog), Toast (Radix, with
  `ToastProvider`/`useToast`). Plus `MediaImage` (image fallback) and `lib/format.ts`.
- Architecture rule honored: components take data via props typed from `lib/types.ts`; none
  import mock data. The dev page fetches via `lib/data` and passes plain objects down.
- ConsultantCard = badges + close rate + specialization; composite number never on the card;
  Rising Talent + Verified where applicable (#27, #18). PropertyCard shows the `isDemo`
  "Demo data" badge visibly (#20).
- A11y: keyboard-operable, shared gold focus ring, aria-invalid on form fields, AA-minded
  contrast, reduced-motion-safe (CookieBanner via `useReducedMotion`), image/avatar fallbacks.
- PT/EN: all chrome via next-intl; extended `messages/{pt,en}.json` (header, filter, leadForm,
  review, pagination, cookie) at key parity.
- **Dev showcase** `/dev/components` renders every composite with real seed data (wrapped in a
  NextIntl provider since it's outside the `[locale]` tree).
- **Dev gate hardened**: `flags.devShowcase = process.env.NODE_ENV !== 'production'` — the
  `/dev/*` routes 404 in `next build`/`next start` and on Vercel, so they can never ship live.
  Review them locally with `pnpm dev`.
- `pnpm build` ✅, `tsc --noEmit` ✅ (strict), `eslint` ✅. Added `react-hook-form`, `zod`,
  `@hookform/resolvers`, `@radix-ui/react-dialog`, `@radix-ui/react-toast`.
- Note: couldn't capture a live runtime render in this sandbox (the dev server is killed by
  the environment); build/tsc/eslint are green and the build compiles the full composite graph.

**Open / awaiting user**
- Review `/dev/components` locally via `pnpm dev` (it's gated off on the Vercel preview now).
- Merge the 4.2 PR.

**Next (Claude Code, on merge)**
- Milestone **4.3 Public pages** (`feat/pages-public`): Home → Consultores → Consultant
  profile → Buy/Rent → Property detail → Vender → static pages, per Phase 2 + Phase 3.

---

## 2026-06-07 · Phase 4 — Milestone 4.1 Primitives (feat/ui-primitives → PR)

**Done**
- Merged PR #4 (4.0 Foundations) into `develop`.
- Built the styled primitive kit in `components/ui/` (Midnight Gold, theme tokens only):
  Button (primary/secondary/ghost × sm/md/lg; hover/focus/disabled/loading; tap target ≥44px),
  Eyebrow, SectionWrapper (dark/warm/surface tones), Input, Textarea, Select (Radix —
  the a11y-critical one, #36), StarRating (read-only fractional + interactive keyboard
  radiogroup), PerformanceBadge (top/building/score per #18), VerifiedBadge (green only, #34),
  RisingTalentTag, RankIndicator (top-3 gold), Skeleton, EmptyState, StatTile, Avatar
  (initials fallback so missing photo paths never render broken images), plus an inline icon set.
- A11y: shared gold focus ring (`components/ui/styles.ts`), keyboard-operable controls,
  aria-invalid styling, dark + light variants, AA-minded contrast, no hardcoded strings
  (labels are props).
- Framer Motion used sparingly + reduced-motion-safe (EmptyState/StatTile fade-in via
  `useReducedMotion`); Button press is motion-safe CSS.
- Added a semantic `--rft-danger` token (additive) for invalid states; mapped `danger`/
  `verified-ink` into the Tailwind theme; added `container-page` was already present.
- Dev-only showcase at `/dev/primitives` (flag `devShowcase`, served outside the i18n tree
  and excluded from middleware; not linked in nav) rendering every primitive in all states.
- `pnpm build` ✅ (route prerenders), `tsc --noEmit` ✅ (strict), `eslint` ✅. Installed
  `@radix-ui/react-select` + `framer-motion`.

**Open / awaiting user**
- Review the kit on the preview (`/dev/primitives`); merge the 4.1 PR.
- Set `flags.devShowcase = false` before production (it gates the dev route).

**Next (Claude Code, on merge)**
- Milestone **4.2 Composite components** (`feat/components`): Header/Footer, ConsultantCard,
  PropertyCard, ScoreBreakdown, FilterBar, LeadForm (RHF + Zod), ReviewItem, Pagination,
  CookieBanner, Modal, Toast.

---

## 2026-06-07 · Phase 4 — Milestone 4.0 Foundations (feat/foundations → PR)

**Done**
- Merged PR #3 (design system) into `develop`; verified prereqs (themed `globals.css` +
  `design-tokens.css`; Fraunces + Inter in `app/layout.tsx`; routes scaffolded). `pnpm build` clean.
- Committed Phase 4 plan + status docs separately (`docs: phase 4 plan + status through phase 3`).
- Built milestone **4.0 Foundations** on `feat/foundations`:
  - `lib/types.ts` — full Phase 1 §6 content model (Region, User, ConsultantProfile,
    PerformanceScore, Property, Lead, Review, Transaction, Opportunity) + composite view types
    (ConsultantSummary/Detail, ListingWithAgent/Detail) + filter inputs + `RATING_WEIGHTS` (#16).
  - `lib/data/` repository (the only data surface for pages): `getConsultants`, `getConsultant`,
    `getListings`, `getListing`, `createLead` (+ helpers `getRegions/getRegion/getLeads`). All
    **async** so the Phase 5 Supabase swap is signature-compatible. Reads `lib/mock/` only.
  - `lib/mock/` typed seed fixtures: Lisboa + Porto regions (district→city→zone); 12 consultants
    (8 established + 4 Rising Talent); per-consultant `PerformanceScore` with composite computed
    from the locked weights and ranks per region; some low-sample → "building track record"
    (Diogo has 0 reviews for the empty state); 24 sale/rent listings (all `isDemo: true`, #20);
    ~21 reviews; 5 leads.
  - next-intl PT/EN message scaffolding (`messages/pt.json` + `en.json`) — common/nav/cta/actions,
    score states, specializations, listing, footer. Keys at parity across both locales.
  - Base typography rhythm + `container-page` utility in `app/globals.css`.
- Quality: `pnpm build` ✅, `tsc --noEmit` ✅ (strict), `eslint` ✅ clean. No pages/components yet.

**Open / awaiting user**
- Review/merge the 4.0 PR. Then milestone **4.1 Primitives** (`feat/ui-primitives`).

**Next (Claude Code, on merge)**
- 4.1: Button, Eyebrow, SectionWrapper, Input/Select/Textarea, StarRating, PerformanceBadge,
  VerifiedBadge, RisingTalentTag, RankIndicator, Skeleton, EmptyState, StatTile.

---

## 2026-05-29 · Phase 4 — GREENLIT (build starting)

**Done**
- Locked §8 decisions #36–41 (Radix primitives, Framer Motion, poster-only hero, build
  dashboard/admin shells, generate ~12 consultants/~24 listings seed; build greenlit).
- Updated `CLAUDE.md` status to "Phase 4 building, milestone 4.0 next".

**Next (Claude Code)**
- Verify prereqs on `develop` (theme/tokens wired, fonts loaded, routes scaffolded), then
  build **milestone 4.0 Foundations** on `feat/foundations` → PR → preview → review.

---

## 2026-05-29 · Phase 4 — Frontend Build (plan drafted)

**Done**
- Authored `docs/phases/PHASE-4-frontend-build.md` (+ branded `.docx`): architecture rules
  (data-access abstraction for non-breaking Phase 5 swap), milestone build order
  (4.0→4.5), component acceptance criteria, mock/seed-data spec, quality gates.
- Updated `CLAUDE.md` status to Phase 4 (plan drafted, awaiting sign-off).

**Open / awaiting user**
- Answer §8 (Radix primitives, Framer Motion, hero media, dashboard shells, seed data).
- Go-ahead to hand the plan to Claude Code and start building (milestone 4.0).

**Next (Claude Code, on approval)**
- Build per milestone on `feat/*` branches → PR → Vercel preview → review → merge → next.
  Start with 4.0 Foundations (types, data layer, mock seed, i18n, base layout).

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
