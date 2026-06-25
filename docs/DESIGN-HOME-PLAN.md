# Design Revision — HOME PAGE handoff · Reconciliation Plan

> **Plan only — NO app code/tokens/components changed this session.** Produces the RH2→RH5 staging
> for adopting the **new Home-page handoff** (`design/handoff-home/`) on the design-revision chain.
>
> **Branch:** `chore/design-revision-home-plan`, branched off the chain tip **`2890d03`**
> (`chore/design-revision-consolidate` = R5 consolidate + the Vercel-preview trigger commit).
> **`main` + `develop` remain FROZEN at `04b6a1b`** (parity); nothing here touches them; no PR.
>
> **Authority:** the new Home handoff `design/handoff-home/README.md` is supreme for the Home page
> (extends #57/#51); **README wins over its source files**; where a literal damages **WCAG AA /
> perf**, the AA-safe deviation is retained + recorded (the #64 set carries forward). The handoff
> is **additive** — it references the existing champagne system (`design/handoff/`, kept untouched)
> and only specifies page composition, hero behaviour, and Home-specific values.
>
> **Date:** 2026-06-25.

---

## 0 · What the new handoff changes (executive summary)

A **new Home** supersedes the R4 marketing-kit Home (#62). The big change is the **hero**: a
**full-bleed cinematic video** (default `heroMode="Vídeo full-bleed"`, 84vh viewport breakout) with
a **staged entrance** (~2.6s) and a rotating **Real/Fair/Trust brand reveal** — replacing the R4
contained search-pill hero. The rest of the page is the same *rhythm* the chain already ships
(navy → champagne → navy → navy → champagne) with **new section copy**, a **merit "Top este mês"
spotlight** (featured #1 on a glow pedestal + floating "+6 lugares" badge + a 3-card row), a
**darker AgentCard fill** (`--surface-card-solid #0c1d39`), an **on-light footer wordmark**
(Fair + mark in `--gold-on-light #8C5E12`), and **slim 15px navy↔champagne fade transitions**.

**Most of the visual system is already in place** (champagne revision R2–R5, #57–#64): brighter
radial (#58), 90° gold gradients (#59), 76/42/56 type (#60), champagne family + `.rft-champagne`/
`.rft-step-card` (#61), `--surface-card-solid`, `--green-verified`, `--hairline .10`. The Home
handoff's `source/tokens/colors.css` is **identical** to the shipped revision tokens **plus the one
named token `--gold-on-light #8C5E12`**. So the work is mostly **composition + a new HeroMedia
component**, not token churn.

**CONFIRMED Home spec (recorded; do not re-ask):** hero default = full-bleed video (84vh); headline
"O futuro do imobiliário" (cream) + "está em cada um de nós." (gold-gradient italic), Fraunces, a
**Home-specific clamp `clamp(38px,4.5vw,62px)` — NOT the 76 token**; staged entrance (README §3.4,
≈2.6s) **with the export-safety contract** (base visible; reduced-motion + no-JS show the final
layout instantly — never a blank hero); Real/Fair/Trust brand reveal (3000ms, start-delay 2750ms,
own scrim); slim 15px navy↔champagne fades (no hard line/shadow); footer on-light Logo (Real/Trust
dark navy-ink, Fair + mark `#8C5E12`, links `--champagne-ink #2b2415`); AgentCard fill → solid
`#0c1d39`; verbatim bundle text; fonts via `next/font/google`; lucide shim; energy cert green; demo
content maps to OUR seed (#20) + `/videos/hero.mp4` (already present, 8.3 MB).

---

## A · TOKEN / SYSTEM DELTA (vs the current chain code)

### A.1 Already present (no change) — from the champagne revision R2 (#57–#64)
`--bg-navy-radial` brighter centred radial (#58) · `--gradient-gold-title`/`-button`/`-button-hover`
symmetric 90° (#59) · type 76/42/56 + kit aliases (#60) · champagne family `--champagne #ece2cb` /
`-card #fbf7ee` / `-border #e3d7bd` / `-ink #2b2415` / `-ink-muted #5c5340` / `-eyebrow #7c5a12`
(#61/#64) · `.rft-champagne`, `.rft-step-card`, `.rft-step-coin` (#61) · `--surface-card-solid
#0c1d39` · `--green-verified #3fb984` / `--green-verified-strong #5fd2a1` (#64g) · `--gold-500
#efb52a` (#64b) · `--hairline rgba(245,241,234,.10)` · `--gold-300 #ffd86e` · `--surface-inset`.
**The handoff's `source/tokens/*` are the same files** the chain already adopted (its `colors.css`
even keeps the pre-AA `--text-muted .58` — **moot**: we ship `.70`, #64a). No re-import needed.

### A.2 NEW / CHANGED (the actual deltas)
| Item | Current chain | Home handoff wants | Strategy (least-churn) | Step |
|---|---|---|---|---|
| **`--gold-on-light`** named token | only `--rft-gold-deep`/`--color-gold-deep` = `#8C5E12` | `--gold-on-light: #8C5E12` (wordmark/mark on light) | **alias** `--gold-on-light: var(--rft-gold-deep)` (1 line; same value as #53a) | RH2 |
| **Slim 15px champagne fade** | `.rft-champagne` = flat `background: var(--champagne)` | navy↔champagne dissolve over a 15px band (top+bottom for the section; top-only for footer) | add a helper/modifier (e.g. `.rft-champagne-fade` / `…-fade-top`) OR a `fade` prop on `SectionWrapper`'s champagne tone; apply the README §1 gradients | RH2 (helper) + RH4 (apply) |
| **AgentCard fill** | `bg-[var(--surface-card)]` translucent `.035` (featured + default, R4 AA) | solid `--surface-card-solid #0c1d39` | swap the ConsultantCard fill to the solid base; **improves AA** (solid dark vs translucent over the bright radial) — aligns with the #64h chip direction | RH3 |
| **Footer wordmark "Fair" on light** | `Wordmark onIvory` keeps **bright** `gold-title` gradient (≈invisible on champagne) | Fair + mark = solid `--gold-on-light #8C5E12` | fix `Wordmark`: when `onIvory`, render "Fair" in `text-[var(--gold-on-light)]` (Real/Trust dark ink already AA) | RH3 |
| **Footer link ink** | links `--champagne-ink-muted`, hover `--champagne-ink` | body links use `--champagne-ink #2b2415` (stronger; not muted) | bump the footer `FooterLink` colour to `--champagne-ink` (keep column labels muted) | RH4 |

> **No token removals.** The ivory rhythm tokens stay (unused, per #61). The hero h1 size is a
> **Home-specific clamp (max 62px), not `--fs-hero` (76)** — a literal in the hero component, not a
> token change.

---

## B · COMPONENT GAP

### B.1 NEW — `HeroMedia` (the headline build; `source/HeroMedia.jsx`)
A new client component. Recreate in React/TS/Tailwind + Framer Motion (#37), reduced-motion-safe:
- **Media:** muted/looping/`playsInline` `<video>` on desktop (≥761px) over a slow **Ken-Burns**
  poster `<img>` (mobile / poster fallback). Video = **`/videos/hero.mp4`** (present); poster = a
  Lisbon/Porto still (4.5 imagery — use a tasteful placeholder/poster for now; do not block).
- **Layers:** vertical **scrim** (legibility over any frame), an inset **edge vignette**, and
  (bleed variant) a **~230px bottom fade** dissolving into the navy stage.
- **Brand reveal:** 3 beats (Real/Fair/Trust) cross-fading every **3000ms**, word in the gold
  gradient (~56px bleed) + phrase in cream (~21px), behind a soft radial dark scrim, bottom-right;
  **`startDelay 2750ms`** so it holds until the entrance finishes.
- **Variants:** `bleed` (full-bleed hero) and `panel` (the contained-mode alternative, 560px card).
- **Reduced motion:** beats render as **static stacked lines** (no cycling, no zoom); poster
  scale frozen. Export-safety: beats visible by default.
- **API (proposed):** `variant: 'bleed'|'panel'`, `videoSrc?`, `poster?`, `eyebrow?` (panel),
  `interval=3000`, `startDelay=0`, `beats: {word, phrase}[]` (i18n text passed in — no hardcoded copy).

### B.2 NEW — hero **staged entrance** (full-bleed h1/rule/sub/buttons, ≈2.6s)
Per README §3.4: line1 0ms → gold line2 700ms (accented + settling glow) → rule 1250ms → sub
1700ms → buttons 2100ms; ease `cubic-bezier(.2,.62,.2,1)`. **Export-safety contract (critical):**
elements are **visible by default**; motion is applied at runtime and gated on `useReducedMotion()`
— reduced-motion / no-JS / SSR show the final layout instantly, **never a blank hero**. Implement
with Framer `initial`/`animate` (visible-by-default + a reduced-motion guard) or a small client
wrapper mirroring the README's "reveal-then-commit" timers.

### B.3 CHANGED — `ConsultantCard` (= AgentCard)
- Fill → solid `--surface-card-solid #0c1d39` (A.2).
- **Featured spotlight merit → 56px** (README §4; currently featured uses 38px). Keep #18 gating,
  RankBadge, ringed avatar, verified pill, stats, "Ver perfil →".
- The Home featured #1 sits on a **gold-glow pedestal** + a **floating "+6 lugares" badge**
  (upper-right, straddling the top edge) — these are **Home-composition** wrappers (§C), not card
  internals.

### B.4 CHANGED — `Wordmark` / Logo
- `Wordmark onIvory`: "Fair" → `--gold-on-light #8C5E12` (B/A.2). Real/Trust dark ink already AA.
- **Gap:** the handoff nav + footer use a **full Logo lockup** (roofline-check **mark** + wordmark,
  `variant="full"`, `onIvory`, `tagline`). Our codebase ships **`Wordmark` (text only — no mark)**.
  The mark is specified in the companion bundle (`design/handoff/reference/components/brand/Logo`).
  **Recommendation (for sign-off):** RH3 does the **minimal** on-light Wordmark fix (+ optional
  tagline "PERFORMANCE YOU CAN SEE"); **building the roofline-mark `Logo`** is a larger, optional
  follow-up — propose deferring it (or a separate RH) unless Carlos wants the mark in this pass.

### B.5 CHANGED — `Footer`
Champagne footer already ships (R4). Deltas: on-light wordmark fix (B.4), link ink → `--champagne-ink`
(A.2), optional tagline. **Column reconciliation:** the handoff shows **3 columns**
(Navegação · Contacto · Legal) with Contacto = addresses/email and Legal = Termos/Privacidade/
**Metodologia**; our footer has **4 columns** on **real declared routes**. Keep **real routes**
(don't invent); adopt the handoff's *labels/copy* where a real route exists, flag any handoff link
with no route. (RH4)

---

## C · HOME-COMPOSITION GAP (vs the current R4 Home)

**Current R4 Home** (`app/[locale]/page.tsx` + `components/home/*`): `HomeHero` (search-pill +
featured card + floating stat) → `HowItWorks` (champagne) → Leaderboard (navy grid) →
FeaturedProperties (navy) → AgentCTA (navy gold-glow) → `Footer` (champagne).

**New Home** (rebuild to the handoff; section order + rhythm below):

| # | Section | Surface | What changes |
|---|---|---|---|
| Nav | sticky header | translucent navy + blur | Already a sticky `Header`. Confirm links (Comprar·Arrendar·Vender·Consultores·Como funciona) + PT/EN pill + "Falar com um consultor" CTA. |
| 1 | **Hero** | full-bleed video on navy | **REPLACE** the search-pill `HomeHero` with `HeroMedia` (bleed) + staged-entrance h1 (2 lines) + sub + 2 CTAs ("Encontrar consultor"/"Ver imóveis") + "Explorar" scroll cue + brand reveal. 84vh breakout, pulled under the nav. |
| 2 | **Top este mês** | navy | featured #1 `ConsultantCard` (`featured`, our seed top) on a **gold-glow pedestal** + **floating "+6 lugares · últimos 90 dias" green badge**; below, a **3-card row** (#2–#4). Replaces the R4 Leaderboard grid. |
| 3 | **Como funciona** | **champagne** (slim 15px fade) | Reuse `HowItWorks`; **new** h2 "Onde o Desempenho Encontra o Imobiliário" + new lede + 3 step-cards (titles already match; **descriptions rewritten** to the handoff verbatim). |
| 4 | **Imóveis em destaque** | navy | Reuse `FeaturedProperties` (3 `PropertyCard`s from seed). Copy matches ("Listados por consultores de topo" + "Ver todos os imóveis →"). |
| 5 | **Para consultores (CTA)** | navy gold-glow panel | **New** copy: h2 "O sucesso depende de ti." (*sucesso* gold) + 2 paragraphs + feature row (⭐ Avaliação transparente · 📊 Ranking baseado em desempenho · 🤝 Visível para clientes) + button **"Vem Ser Reconhecido"**. Replaces the R4 AgentCTA copy. |
| 6 | **Footer** | **champagne** (slim 15px top fade) | Reuse `Footer` with the B.5 deltas. |

**Reused components + seed:** `Header`, `ConsultantCard` (featured #1 + 3 ranked via
`getConsultants({view:'ranked'})` — top = `ana-silva`), `PropertyCard` (3 via `getListings()`,
`isDemo` chips #20), `Footer`, `Eyebrow`, `Button`. The handoff's placeholder agents/listings
(Sofia Marques, €745.000 T3…) **map to OUR seed**, not copied verbatim. Hero video = `/videos/hero.mp4`.

**i18n (`home` namespace) — add / change / remove (PT + EN parity):**
- **ADD:** `hero.line1` ("O futuro do imobiliário"), `hero.line2` ("está em cada um de nós."),
  `hero.ctaFind` ("Encontrar consultor"), `hero.ctaView` ("Ver imóveis"), `hero.scrollCue`
  ("Explorar"); `brand.real/fair/trust` words + `brand.realPhrase/fairPhrase/trustPhrase`
  ("Pessoas antes de imóveis." / "Mérito, não antiguidade." / "Confiança pela transparência.");
  `topMonth.floatingBadge` ("+6 lugares · últimos 90 dias"); `agentCta.body2`, `agentCta.feature1/2/3`.
- **CHANGE:** `hero.subtitle` (→ "…Lisboa & Porto."); `howItWorks.title` (→ "Onde o Desempenho
  Encontra o Imobiliário"), `howItWorks.lede`, `step1Desc/step2Desc/step3Desc` (rewrite verbatim);
  `agentCta.title` (→ "O sucesso depende de ti."), `agentCta.body`, `agentCta.apply` (→ button
  "Vem Ser Reconhecido"). Keep `leaderboard.*`, `featured.*`.
- **REMOVE / repurpose:** the search-pill hero keys (`hero.headline` w/ `<gold>`, `searchPlaceholder`,
  `searchButton`, `cityLabel`) — the search pill is gone; `hero.statValue`/`statCaption` **repurpose**
  into `topMonth.floatingBadge`. Trust-row keys (`trustVerified/Monthly/Cities`) only survive if the
  contained-panel mode is kept (it's the alternative; default video hero has no trust row).

---

## D · AA RE-MEASURE LIST (computed at build, fail-closed — never ship sub-4.5 text)

1. **Hero text over the video scrim** (worst case = brightest plausible video frame): cream line 1,
   the **gold-gradient italic** line 2, and the 19px sub-text — measured against the scrim's
   *lightest* band (≈`rgba(2,8,18,.30)` at 32%) composited over a bright frame, **with** the
   spec `text-shadow`. If any band < 4.5 (sub-text) / < 3.0 (large h1), **deepen that scrim stop**.
2. **Brand-reveal beats** over their radial scrim: phrase (cream ~21px) needs 4.5; word (gold,
   ~56px = large) needs 3.0 — measured over a bright frame within the beats' scrim.
3. **Footer on champagne (`#ece2cb`):** `--gold-on-light #8C5E12` (Fair/mark) and `--champagne-ink
   #2b2415` (links) — confirm ≥4.5 (ink is ~11.9:1 per token; re-confirm #8C5E12 on `#ece2cb`,
   which is slightly darker than the `#fbf8f2` ivory where it measured 5.32).
4. **AgentCard text on the darker `#0c1d39` fill:** cream / muted `.70` / merit gold / `--green-
   verified-strong` — re-measure on the solid base (expected to improve vs the translucent fill).
5. **"+6 lugares" green badge:** green text (12.5px) on `green-tint + green-border + glow` over the
   *brightest* radial — if < 4.5, use the **solid dark chip** (#64h) or `--green-verified-strong
   #5fd2a1`.

---

## E · PHASED CHECKLIST (RH2 → RH5; all ⬜ — each a separate green-gated, stop-and-confirm apply)

| # | Step | Scope | Status |
|---|---|---|---|
| **RH2** | **System deltas** | `--gold-on-light` alias (A.2); slim-15px champagne fade helper/modifier; any token additions the Home needs. Green. | ✅ **Done 2026-06-25** (`chore/design-revision-home-tokens`) — `--gold-on-light: var(--rft-gold-deep)`; `.rft-champagne--fade-both` / `--fade-top` helpers. Both inert (no consumers); green; zero visual change. |
| **RH3a** | **Components (lower-risk)** | `Logo` (roofline mark #12 + tri-tone wordmark, onIvory-aware) built + wired into Header (mark now visible) & Footer; `Wordmark` on-light Fair → `#8C5E12` (B.4); `ConsultantCard` fill → solid `#0c1d39` + featured merit **56px** (B.3, #18/#37 kept); Footer on-light Logo + links/body → `--champagne-ink`. | ✅ **Done 2026-06-25** (`chore/design-revision-home-components`) — green; AA improved (card muted .70 → 7.82:1); smoke 200. |
| **RH3b** | **HeroMedia + entrance + video** | Build `HeroMedia` (B.1, bleed only) + staged entrance w/ export-safety (B.2); optimize + wire `/videos/hero.mp4` + poster. | ✅ **Done 2026-06-25** (`chore/design-revision-home-components`) — ffmpeg available; mp4 **8.0M→1.6M**, poster **1.1M→124K**; `HeroMedia` + `HeroFullBleed` (export-safe staged entrance, local AA scrim) on `/dev/hero`; AA over worst frame: sub **6.52:1**, brand-reveal **7.44+**, cue **7.46**; green. Loop seam jars (4.5 polish). |
| **RH4** | **Home composition + copy + i18n + seed + AA-at-render** | Rebuild `app/[locale]/page.tsx` to §C (full-bleed hero, Top-este-mês spotlight + floating badge, Como-funciona copy, Imóveis, Para-consultores CTA copy, footer alignment); i18n add/change/remove (PT+EN); seed mapping (#20); measure AA as built (§D). Green. | ⬜ Not started |
| **RH5** | **AA consolidation + DECISIONS + PROJECT-STATE** | Re-measure the full §D list fail-closed; record any AA deviation; log DECISIONS (#65+: Home-video revision adopted, hero clamp, AgentCard solid fill, `--gold-on-light`, on-light wordmark, slim-fade) + refresh PROJECT-STATE §4/§7/§8/§12. Green. | ⬜ Not started |

**Staging rationale (why this split):** HeroMedia + staged entrance is the heaviest, highest-risk
new build → its own step (RH3) ahead of composition. Tokens/helpers are tiny → RH2. Copy/i18n/seed
churn is large but mechanical → RH4. AA + docs close out → RH5. (Mirrors the R2→R5 cadence.)

**Deferred / flagged for sign-off:** the **roofline-mark `Logo`** (B.4) — recommend minimal Wordmark
fix now, mark optional; the **contained-panel hero mode** (§3.5) is the alternative, not built unless
requested; **poster/real hero imagery** is a 4.5 item (placeholder poster for now).
</content>
