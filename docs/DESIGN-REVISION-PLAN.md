# Design-System REVISION — Reconciliation Plan (R-series)

> **Status: PLAN ONLY — no app code/tokens/components changed this session.** This is the gap
> analysis between the **new, revised** Claude Design export (now in `design/handoff/`) and the
> current codebase (which already ran the prior apply, `docs/DESIGN-APPLY-PLAN.md`, run order
> 1→6, COMPLETE). The apply happens later in green-gated steps **R2→R5** (§6).
>
> **Date:** 2026-06-24 · **Branch:** `chore/design-revision-plan` (base = **develop** @ `04b6a1b`).
> **New bundle fingerprint CONFIRMED (all three):** `tokens/colors.css` has `--champagne:`;
> `reference/ui_kits/marketing/Home.jsx` exists; `reference/champagne-full-page.html` exists.
> **Prior bundle remains in git history**; `design/handoff/**` stays eslint-ignored (spec only,
> never shipped). README is authoritative where the bundle self-contradicts (decision A).
>
> **Branch model (deployment).** This revision lives entirely on the `chore/design-revision-*`
> chain, **based on `develop`**. **`main` and `develop` are FROZEN** at the shipped design-apply
> state (`04b6a1b`; **main == develop**, parity) — `main` is the Vercel **production** branch and
> the public review URL stays stable. **Nothing here touches `main` or `develop`** and no PR is
> opened. Only when Carlos **explicitly approves** does the chain consolidate **→ `develop` →
> `main` → Vercel**. The prior design-apply (#46–#56) is COMPLETE + shipped; this revision
> supersedes specific values per (A)–(H), ratified as DECISIONS #57+ in **R5**.

---

## 0 · What changed in this revision (executive summary)

The prior export and this one share the **same architecture** (navy stage · gold signal · verified
green · Fraunces+Inter · the two crown-jewel cards · the full token surface). The codebase is
therefore **already ~85% aligned**; the revision concentrates its changes in **five areas**:

1. **Background radial** — brighter, re-centred, 5-stop (decision **C**). 🔶 value change.
2. **Gold gradients** — both title and button move from the old **180°/160°** ramps to **symmetric
   90° sides→centre** metallic ramps (decision **D**). 🔶 value change.
3. **Type scale** — adopt the **kit's rendered scale**: hero **76** / section **42** / CTA **56**
   (decision **B**, supersedes the README §3 / #53(d) 72/40). 🔶 + new names.
4. **Champagne family** — a new warm-sand section surface (`--champagne*` + `.rft-champagne` +
   `.rft-step-card`/`.rft-step-coin`), replacing the ivory section rhythm (decision **E**,
   supersedes #56). 🟡 new.
5. **Home composition** — rebuilt to the marketing kit exactly (decision **F**): search-pill hero
   + featured AgentCard + floating stat; champagne HowItWorks step-cards; navy Leaderboard +
   FeaturedProperties; navy gold-bordered AgentCTA; **champagne footer**. Drops the old
   "split" + "trust band" sections.

Everything else (spacing, radii, shadows, blur, motion, card-system tokens, verified green,
surface translucency, hairlines, the #53 AA inks, fonts via `next/font`, the lucide shim, energy
cert green) **already matches** the new bundle and needs **no change** — see §3.

> **Authority for this revision (decision A, extends #51).** The new export is the supreme source
> of truth for all visual values; where it conflicts with a prior lock, the export wins and the
> prior decision is superseded — **except** where the export's literal damages **WCAG AA** or
> **performance**, where the AA/perf-safe deviation is kept and recorded with **measured** ratios
> (the #51 fail-closed carve-out, applied in §4).

---

## 1 · Naming-reconciliation strategy (per group)

**Continue the established "alias, don't migrate" convention (#50).** Components read tokens
through two stable surfaces — the Tailwind `@theme` semantic layer in `app/globals.css`
(`bg-ink`, `text-gold`, `font-display`, `rounded-lg`, the `text-hero/section/subsection` utilities)
and a handful of direct CSS vars in the cards (`var(--card-radius)`, `var(--accent-bar)`,
`var(--surface-card)`, …). **Those canonical names stay; their VALUES change in place.** No
component rename is required by this revision.

| Group | Strategy | Canonical name kept | Action |
|---|---|---|---|
| **Background (C)** | value-in-place | `--bg-navy-radial` (alias `--rft-bg-gradient` → it) | edit the radial value in `app/design-tokens.css`; the `@theme`/`--rft-*` aliases inherit it automatically |
| **Gold title (D)** | value-in-place | `--gradient-gold-title` (alias `--rft-gold-gradient` → it; `.gold-title` reads it) | edit the gradient value; `--accent-bar` stays (already the 2-stop `#ffe6a0→#e3a812`, unchanged) |
| **Gold button (D)** | value-in-place | `--gradient-gold-button(-hover)` (alias `--rft-gold-button*` → them) | edit both values; resolve the README's `.btn-primary:hover` 160° vs §1.2 token 90° **to the §1.2 token** |
| **Type scale (B)** | add kit names as **new aliases**, bump 2 existing values | `--fs-hero`, `--fs-section`, `--fs-subsection` (utilities read these) | bump `--fs-hero` 72→**76**, `--fs-section` 40→**42**; **add** `--fs-display-1:76`, `--fs-display-2:56`, `--fs-h1:42`, `--fs-h2:32`, `--fs-h3:24`, `--fs-h4:20`, `--font-display`/`--font-body`→ existing `--rft-font-*`, `--fw-*` |
| **Champagne (E)** | pure-additive | new `--champagne*` tokens + `.rft-champagne`/`.rft-step-card`/`.rft-step-coin` | add to `app/design-tokens.css` + `app/globals.css`; add a `champagne` tone to `SectionWrapper` + `Card` (`variant="champagne"`) |

**Established names that stay canonical (no rename):** `--rft-bg-gradient`, `--rft-gold-gradient`,
`--rft-gold-button`/`-hover`, `--rft-font-display`/`-sans`, `--fs-hero`/`-section`/`-subsection`,
`--card-*`, `--surface-card*`, `--hairline`, `--text-*`, `--space-*`, `--radius-*`, the `@theme`
`--color-*`/`--font-*`/`--rounded-*` map. The kit's `--font-display`/`--font-body`/`--fw-*`/
`--fs-display-*`/`--fs-h*` names are added as **aliases onto these**, so new kit-derived code can
use kit names while existing code keeps working.

---

## 2 · Token-by-token diff (vs `app/design-tokens.css` + `app/globals.css`)

Legend: **✅ already matches** · **🟡 new (additive)** · **🔶 value change** (deliberate, in the mapped step).

### 2.1 Background — decision C  🔶
| Token | Current value | New (bundle) value | Status |
|---|---|---|---|
| `--bg-navy-radial` | `radial-gradient(ellipse 90% 70% at 50% 30%, #122a4f 0, #0a1a34 42%, #060f22 72%, #020812 100%)` | `radial-gradient(ellipse 89% 81% at 50% 48%, #1e4680 0, #173a63 33%, #0e2545 59%, #081830 81%, #040e20 100%)` | 🔶 **R2** — brighter, re-centred (50% 48%), 5-stop. **Triggers a full navy-side AA re-measure (§4).** |
| `--navy-500..950` | present, identical | identical | ✅ |

### 2.2 Gold — decision D  🔶
| Token | Current | New (bundle) | Status |
|---|---|---|---|
| `--gradient-gold-title` | `linear-gradient(180deg,#ffe6a0 0,#ffd86e 28%,#e3a812 100%)` | `linear-gradient(90deg,#d8950f 0,#e3a812 16%,#ffe6a0 50%,#e3a812 84%,#d8950f 100%)` | 🔶 **R2** symmetric sides→centre |
| `--gradient-gold-button` | `linear-gradient(160deg,#ffe79e 0,#f4c95c 46%,#dca233 100%)` | `linear-gradient(90deg,#c8901f 0,#e9bb52 28%,#ffe79e 50%,#e9bb52 72%,#c8901f 100%)` | 🔶 **R2** |
| `--gradient-gold-button-hover` | `linear-gradient(160deg,#fff0b6 0,#fad36c 46%,#e9ae3b 100%)` | `linear-gradient(90deg,#d49d28 0,#f3c95e 28%,#fff0b6 50%,#f3c95e 72%,#d49d28 100%)` | 🔶 **R2** — **README inconsistency:** README §2 `.btn-primary:hover` still shows the old 160° ramp; the §1.2 **token** is the 90° ramp. **Resolve to the §1.2 token** (decision D). |
| `--gold-100..700`, `--gold-calm*`, `--gold-tint`, `--gold-border(-soft)`, `--accent-bar` | present, identical | identical | ✅ |

> **Solid gold accents unchanged:** eyebrow `#e3a812` on navy, the merit/price text using the
> title gradient. Only the **gradient ramps** change. The dark button text `#2a1d04` is unchanged.

### 2.3 Champagne family + helpers — decision E  🟡 (all new)
| Token / helper | Value | Status |
|---|---|---|
| `--champagne` | `#ece2cb` (section bg) | 🟡 R2 |
| `--champagne-card` | `#fbf7ee` | 🟡 R2 |
| `--champagne-border` | `#e3d7bd` | 🟡 R2 |
| `--champagne-ink` | `#2b2415` (heading ink) | 🟡 R2 |
| `--champagne-ink-muted` | `#5c5340` (body) | 🟡 R2 |
| `--champagne-eyebrow` | `#a9791a` (accent) | 🟡 R2 — **AA risk, see §4** |
| `.rft-champagne` (+ h1–h4/eyebrow rules) | bg `--champagne`, ink mappings | 🟡 R2 (port from `design/handoff/reference/tokens/base.css`) |
| `.rft-step-card` / `.rft-step-coin` | navy `--surface-card-solid` card on champagne, gold accent-bar `scaleX 0→1`, gold coin | 🟡 R2/R4 |

> **Supersedes #56 ivory rhythm.** Per the bundle's champagne rule, champagne appears **only** on
> the Home "Como Funciona" band + the **footer**; navy+gold stays default elsewhere. Ivory tokens
> (`--ivory*`, `.rft-ivory`, `Card variant="ivory"`, `SectionWrapper tone="ivory"`) are **kept in
> place** (no removal churn) but become **unused on Home** after R4; flag for later cleanup.

### 2.4 Type scale + name mapping — decision B  🔶 + 🟡
| Token | Current | New | Status |
|---|---|---|---|
| `--fs-hero` | `4.5rem` (72) | **76** | 🔶 R2 (bump value; utility `text-hero` reads it) |
| `--fs-section` | `2.5rem` (40) | **42** | 🔶 R2 (bump; `text-section`, `h1/h2` aliases read it) |
| `--fs-subsection` | `1.625rem` (26) | 26 | ✅ (kit `--fs-h3` aliases this is acceptable) |
| `--fs-display-1` | — | `76` | 🟡 R2 alias = hero |
| `--fs-display-2` | — | `56` (CTA — kit AgentCTA) | 🟡 R2 (new utility/usage in R4) |
| `--fs-h1 / -h2 / -h3 / -h4` | — | `42 / 32 / 24 / 20` | 🟡 R2 aliases |
| `--font-display / --font-body / --font-ui` | (have `--rft-font-display/-sans`) | map → existing | 🟡 R2 alias only (decision H — **no** bundle `fonts.css` `@import`) |
| `--fw-light..bold` | — | `300..700` | 🟡 R2 aliases |
| `--lh-*`, `--ls-*`, `--opsz-*` | partial (`--lh-tight/-body`) | full set | 🟡 R2 (additive; optional) |

> **README vs kit contradiction (recorded):** README §3 table says hero **72** / section **40**;
> the kit's `typography.css` + every kit screen render **`--fs-display-1`=76 / `--fs-h1`=42 /
> `--fs-display-2`=56** (verified in `Home.jsx`: hero `var(--fs-display-1)`, section titles
> `var(--fs-h1)`, AgentCTA `var(--fs-display-2)`). **Per decision B the KIT scale wins** — an
> explicit override of README §3 and of #53(d). Logged as a supersession in §7.

### 2.5 Already-matching groups (no change) ✅
| Group | Evidence |
|---|---|
| **Spacing** `--space-0..32`, `--container-max/-narrow`, `--section-pad-y`, `--gutter` | identical in `spacing.css` ↔ design-tokens.css |
| **Radii** `--radius-xs..pill` (#54 remap already applied) | identical in `effects.css` |
| **Shadows** `--shadow-sm/card/raised/gold-glow/green-glow/ivory` | identical (card/raised already deepened in prior Step 4) |
| **Blur** `--blur-panel 18`, `--blur-nav 14` | identical |
| **Motion** `--ease-out`, `--ease-in-out`, `--dur-fast/base/slow` | identical |
| **Card system** `--card-radius 22`, `-media 14`, `--card-pad 26`, `--lift-card -4/-5`, `--img-zoom 1.06`, `--dur-img 500`, `--accent-bar`, `--overlay-scrim`, `--plate-bg` | identical |
| **Surfaces** `--surface-card .035`, `-raised .06`, `-solid #0c1d39`, `-inset` | identical (translucency already flipped) |
| **Verified green** `--green-verified #3fb984`, `-deep`, `-tint`, `-border` | identical; energy-cert green (#52) already consistent with the new README §6.8 |
| **Text ramp** `--text-strong/body/muted .58/faint/ink/ink-strong/ink-muted` | identical (muted already .58) |
| **Hairlines** `--hairline .10`, `-strong .16` | identical |
| **#53 AA inks** ivory-label `#8C5E12`, verified-ink `#157048` | retained (revalidated in §4) |

---

## 3 · AA re-measure plan (fail-closed; **mandatory**, computed not estimated)

The background flip (C) **raises** the navy luminance at the centre (`#1e4680` vs the old
`#122a4f`), so **every light-on-navy surface contrasts LESS** and must be re-measured against the
**real rendered** bg — worst case the **bright centre `#1e4680`** (the radial peaks at 50% 48%,
ellipse 89%×81%, so a large central region is this bright; the hero eyebrow/title and centred
cards sit on it). Frosted cards (`rgba(255,255,255,0.035)` over navy) are **slightly lighter
still**, so card text must be measured over the centre too. Targets: **≥4.5:1** small text,
**≥3:1** large (≥24px or ≥18.66px bold) / icons / UI borders. Any failing zip-literal is kept at
an **AA-safe deviation recorded with its measured ratio** (decision A).

**Preliminary computed ratios** (sRGB WCAG 2.x; translucent text composited over the solid bg —
to be **re-confirmed at apply time** against the actual blur-composited surface):

### 3.1 On navy — worst case bright centre `#1e4680` (old base `#0a1a34` shown for contrast)
| Surface | on `#1e4680` | on old `#0a1a34` | Verdict @ centre |
|---|---|---|---|
| `--text-strong` `#f5f1ea` | **8.32** | 15.41 | ✅ pass |
| `--text-body` `.78` | **5.74** | 9.72 | ✅ pass |
| `--text-muted` `.58` (meta/captions) | **3.93** | 5.90 | ⚠️ **FAILS 4.5 small** (ok as large) → **R2 fix** |
| `--text-faint` `.40` (scoreLabel) | **2.66** | 3.47 | ⚠️ **fails even 3:1** → keep faint **decorative/large only**; meaningful labels already moved to muted (must hold ≥4.5 → see above) |
| eyebrow `--gold-500` `#e3a812` (12px) | **4.40** | 8.16 | ⚠️ **just under 4.5 small** → **R2** (bump eyebrow to `--gold-300 #ffd86e` = **6.82**, or accept large) |
| gold link `--gold-300` `#ffd86e` | 6.82 | 12.64 | ✅ pass |
| `--green-verified` `#3fb984` (icon/pill) | 3.78 | 7.01 | ✅ as large/icon (≥3); not body text (#34) |

> **Net navy-side actions (R2):** (i) re-point meaningful **muted** usages so they clear 4.5 on
> `#1e4680` — either raise `--text-muted` toward ~.66 (regression-checks every card/profile) **or**
> guarantee they only render as large; (ii) raise the **eyebrow** on navy to `--gold-300` (or a
> measured deeper-but-≥4.5 gold); (iii) confirm **no meaningful small text uses `--text-faint`**
> (prior apply already moved scoreLabel → muted; re-audit after the bg flip).

### 3.2 On champagne `#ece2cb` (card `#fbf7ee`)
| Surface | on `#ece2cb` | on `#fbf7ee` | Verdict |
|---|---|---|---|
| `--champagne-ink` `#2b2415` (headings) | 11.94 | 14.38 | ✅ |
| `--champagne-ink-muted` `#5c5340` (body) | 5.89 | 7.10 | ✅ |
| `--champagne-eyebrow` `#a9791a` (12px eyebrow) | **3.00** | 3.61 | ⚠️ **FAILS 4.5 small** → **R2/R4 AA deviation:** darken eyebrow-on-champagne to a measured ≥4.5 gold (≈`#7c5a12`-ish; measure) — analogous to the #53 ivory `#8C5E12` carve-out |
| Logo `onIvory` "Real" `--text-ink-strong` `#111c30` | 13.23 | 15.93 | ✅ (footer) |
| Logo `onIvory` "Trust" `--text-ink-muted` `#5a6678` | **4.52** | 5.45 | ✅ (just clears on champagne) |
| footer links `--champagne-ink-muted` | 5.89 | — | ✅ |

### 3.3 Re-validate the #53 exceptions on the NEW surfaces
| Exception | on champagne `#ece2cb` | Note |
|---|---|---|
| ivory-label `#8C5E12` | **4.38** | was 5.32 on ivory `#fbf8f2`; **dips below 4.5 on champagne** → **either** relocate to champagne's own `--champagne-eyebrow` (preferred — champagne replaces ivory on Home) **or** darken if reused on champagne. Becomes **moot** if ivory is fully unused. |
| verified-ink `#157048` | **4.74** (5.70 on card) | ✅ still clears 4.5 on champagne; **carry forward unchanged**. |

> **Exactly what gets measured, where, when:** all rows above, against the **real** rendered
> background at the point of use (bright-centre navy for §3.1; the actual champagne band for §3.2/3.3),
> **including** the frosted-card composite. Measurement is performed **in the apply steps** (R2 for
> tokens/navy, R4 for champagne when the Home band first renders, R5 for the global consolidation +
> exception log) — **not now**. This section is the enumeration + targets + preliminary risk flags.

---

## 4 · Home-composition gap — decision F (current → kit)

**Current Home** (`app/[locale]/page.tsx` + `components/home/{HomeHero,HowItWorks}.tsx`):
1. HomeHero (split: value + inline `Input`+secondary search button; right = `topConsultant` mini-card)
2. HowItWorks
3. `SectionWrapper tone="dark"` — Top consultants (ConsultantCards)
4. `SectionWrapper tone="dark"` — Featured listings (PropertyCards)
5. `SectionWrapper tone="ivory"` — **Clients/consultants split** (2 `Card variant="ivory"`)
6. `SectionWrapper tone="dark"` — **Trust band** (IconCheck rows)
7. `SectionWrapper tone="dark"` — Join CTA

**Kit Home** (`design/handoff/reference/ui_kits/marketing/Home.jsx`, + `Nav.jsx`, `Footer.jsx`):
1. **Hero (navy)** — eyebrow + h1@`--fs-display-1`(76) with "mérito" gold-text + lead; a **search
   pill** = `Card variant="raised"` pill containing `Select` (Lisboa/Porto) + `Input` (search) +
   `Button primary "Procurar"`; a 3-item trust row (verified / monthly / cities); **right = a
   featured `AgentCard`** + a **floating "+6 lugares" raised stat `Card`**.
2. **HowItWorks (champagne)** — eyebrow `--champagne-eyebrow` + h2@`--fs-h1`(42) + lead; **3
   `.rft-step-card`** numbered step cards (gold coin, gold accent-bar on hover).
3. **Leaderboard (navy)** — eyebrow + h2@42 + "Ver ranking completo →"; 3 `AgentCard`s.
4. **FeaturedProperties (navy)** — eyebrow + h2@42 + "Ver todos os imóveis →"; 3 `PropertyCard`s.
5. **AgentCTA (navy)** — gold-bordered panel (`--border-gold` + `--shadow-gold-glow` + radial
   glow), eyebrow + h2@`--fs-display-2`(56) + lead + primary/secondary buttons.
6. **Footer (champagne)** — `--champagne` bg, 1.4fr+4-col grid, `Logo onIvory`, link columns,
   `🇵🇹` exception.

| Change | Detail | Reuse vs new |
|---|---|---|
| **ADD** search-pill hero | `Card` pill (Select+Input+Button) | reuse `Card`/`Select`/`Input`/`Button`; new layout in `HomeHero` |
| **ADD** featured AgentCard + floating stat | right column | reuse `ConsultantCard` (`featured`) + `Card variant="raised"` + `IconTrending` |
| **ADD** AgentCTA panel | gold-bordered, `--fs-display-2` | new section; reuse `Button`; new `--fs-display-2` utility |
| **CHANGE** HowItWorks → champagne | `.rft-champagne` + 3 `.rft-step-card` | new `champagne` tone + step-card styles; reuse copy via next-intl |
| **CHANGE** section titles 40→42 | global via `--fs-section` bump | automatic |
| **CHANGE** Footer → champagne | re-skin existing Footer | reuse Footer component; champagne tokens |
| **REMOVE** "Clients/consultants split" (ivory) | not in kit | delete section #5; ivory tone left unused |
| **REMOVE** "Trust band" | not in kit | delete section #6 |
| keep | Top consultants + Featured listings (navy) | already match kit §3/§4 |

**Reused strings/seed/components:** ship with **our** next-intl messages (PT/EN), **our** seed
data (the `isDemo`-flagged set, #20), **our** lucide icons (#47/#55), and **our** components — the
kit's `window.*` demo harness, Unsplash/randomuser demo assets, and inline icon shims are
reference-only. New i18n keys needed: hero search pill (city/placeholder/Procurar), trust row,
AgentCTA (eyebrow/title/lead/2 buttons), step-card copy; remove keys for the dropped split/trust
sections. **Decision G:** keep the product name **ConsultantCard** / route `/consultores` / data
model while applying the kit's "AgentCard / Spotlight" spec; token/gold/bg/type/AA updates apply
**globally** (Consultores + Profile inherit the new look), but only **Home** is re-composed.

---

## 5 · Phased checklist — apply steps R2→R5 (all ⬜; each a separate green-gated, stop-and-confirm prompt)

> Staging biases to "flip the foundation first, fix the AA it breaks immediately, then build on it."
> Green-gate = `pnpm build` + `tsc --noEmit` + `eslint`, ending stop-and-confirm.

| # | Step | Scope | Status |
|---|---|---|---|
| **R2** | **Tokens + gold + type + champagne tokens/helpers + navy-side AA** | `app/design-tokens.css` + `app/globals.css`: flip `--bg-navy-radial` (C); both gold gradients + button-hover→§1.2 token (D); bump `--fs-hero` 76 / `--fs-section` 42 + add kit type aliases (`--fs-display-1/2`, `--fs-h1..h4`, `--font-*`, `--fw-*`) (B); add the champagne family + `.rft-champagne`/`.rft-step-card`/`.rft-step-coin` (E); add `champagne` tone to `SectionWrapper` + `Card`. **Then the navy-side AA re-measure+fix (§3.1)** — it changes immediately for *all* existing pages the moment the bg flips: muted-on-bright-centre, eyebrow gold, faint audit. Alias per §1; no component renames. | ⬜ |
| **R3** | **Primitives + cards value refresh** | Re-point Button (new 90° gold + sheen/focus per README §6.1), Card/StatBlock/Avatar/Badge/Tag/RankBadge/Input/Select to the new gradient/type values (mostly inherited); verify the gold **direction** reads correctly on `.gold-title`, `.btn-gold`, RankBadge coin, accent-bar; refresh `/dev/primitives` + `/dev/components`. AgentCard/PropertyCard pick up new gold/type automatically — verify against README §6.7/6.8 + `card-redesign.html`. | ⬜ |
| **R4** | **Home composition rebuilt to the kit + champagne AA** | Rebuild `app/[locale]/page.tsx` + `components/home/*` to the kit Home (§4): search-pill hero + featured AgentCard + floating stat; champagne HowItWorks step-cards; navy Leaderboard + FeaturedProperties; navy AgentCTA (`--fs-display-2`); champagne Footer. Add/trim next-intl keys (PT+EN). **Champagne AA re-measure+fix (§3.2/3.3)** when the band first renders (champagne-eyebrow deviation; ivory-label relocation/moot). | ⬜ |
| **R5** | **Global AA consolidation + exception + supersession log** | Sweep all pages (Home, Consultores, Profile, dev) against the new bg/gold/type; finalize the AA exception table with **measured** ratios; log decisions #57+ (revision supersessions: bg, gold, type-B-over-#53(d), champagne-over-#56-ivory) in `docs/DECISIONS.md`; refresh `PROJECT-STATE.md` (§4/§5/§6/§7/§8) + `docs/WORKLOG.md`. | ⬜ |

> **Adjustment vs the prompt's suggested staging:** kept R2–R5 as proposed. The one nuance: the
> **navy AA fix lives in R2** (not deferred) precisely because flipping `--bg-navy-radial`
> regresses contrast on **every** existing page instantly — fixing it in the same green-gated step
> keeps `main`-quality at each stop. Champagne AA is in R4 (first render). Profile/Consultores need
> **no structural** work (decision G) — they inherit R2/R3 and are only AA-swept in R5.

---

## 6 · Confirmation — decisions (A)–(H) reflected

- **(A) New export = supreme authority (extends #51), AA/perf fail-closed carve-out** — §0 authority
  box + §3 (measured deviations kept). ✅
- **(B) Type scale 76/42/56, kit names aliased, supersedes #53(d)** — §1 + §2.4 + §7 supersession;
  verified the kit renders display-1/h1/display-2 in `Home.jsx`. ✅
- **(C) New background radial** — §2.1; value recorded verbatim; triggers §3.1 AA. ✅
- **(D) Symmetric 90° gold (title + button + hover), resolve hover to §1.2 token** — §2.2 (README
  §2 160° vs §1.2 90° flagged and resolved to the token). ✅
- **(E) Champagne family + helpers, Home "Como Funciona" + footer only, supersedes #56 ivory** — §2.3
  + §4 + §7. ✅
- **(F) Home = the marketing kit exactly; drop split + trust band; ship our strings/seed/icons** —
  §4. ✅
- **(G) Keep ConsultantCard/route/model name while applying the AgentCard spec; tokens global,
  only Home re-composed** — §4 + §5 (Profile/Consultores inherit, AA-swept R5). ✅
- **(H) Fonts via `next/font/google` (no bundle `fonts.css` @import); lucide shim; energy cert
  green already consistent** — §1/§2.4 (alias names only) + §2.5. ✅

---

## 7 · Supersession log (to be ratified as DECISIONS #57+ in R5)

| Prior | Superseded by (this revision) |
|---|---|
| `--bg-navy-radial` value (#45/#46) | **C** — brighter re-centred 5-stop radial |
| Gold title 180° / button 160° (#45) | **D** — symmetric 90° sides→centre ramps |
| Type scale README 72/40, #53(d) | **B** — kit scale hero 76 / section 42 / CTA 56 |
| #56 ivory section rhythm (N·I·N·N·I·N·N) | **E/F** — champagne on Home "Como Funciona" + footer only; ivory unused on Home |
| Home "split" + "trust band" sections | **F** — dropped (not in the kit) |
| #53(a) ivory-label `#8C5E12` scope | **§3.3** — relocates to champagne-eyebrow / moot if ivory unused (verified-ink `#157048` carries forward) |

> #34 (verified-green = success/verification) **remains relaxed by #52** (energy cert green) — the
> new README §6.8 is consistent. #47/#48/#55 (lucide shim, fonts via `next/font`) **unchanged** (H).

---

## 8 · Notes / flags for the planning chat

- **Biggest visible change** = the brighter background + the symmetric gold; both are global and
  land in **R2**. The **highest-risk AA item** is **`--text-muted` .58 on the bright centre (3.93,
  fails 4.5 small)** and the **champagne-eyebrow `#a9791a` (3.00, fails)** — both need an AA-safe
  deviation in R2/R4, recorded with measured ratios.
- **README self-contradictions found** (README wins per A, except the explicit B override): (i)
  type scale README 72/40 vs kit 76/42 → **B: kit wins**; (ii) button-hover README §2 160° vs §1.2
  token 90° → **D: §1.2 token wins**.
- **Ivory is not deleted**, only unused on Home — leave tokens/helpers in place to avoid churn;
  schedule removal as a later cleanup if it stays unused.
- **No app code/tokens/components were changed this session.** `design/handoff/` now holds the new
  reference set (60 files, `.txt` stripped); `design/handoff/**` stays eslint-ignored; the prior
  bundle remains in git history.
