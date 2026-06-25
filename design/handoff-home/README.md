# Handoff: RealFairTrust — Home Page

> **Performance you can see.** Full build spec for the **RealFairTrust** Home page — a bilingual
> (Portuguese-primary / English) merit-based real-estate marketplace for **Lisboa & Porto**.
> Premium, calm, trustworthy. **Gold on a dark sapphire-navy stage**, with one warm **champagne**
> break. The primary hero is a **full-bleed cinematic video**.

## Overview
This bundle specifies the complete Home page: a sticky nav, a full-bleed video hero with a staged
entrance animation and a rotating Real/Fair/Trust brand reveal, a merit "Top este mês" consultant
spotlight, a champagne "Como funciona" band, a featured-listings row, a consultant CTA panel, and
a champagne footer.

## About the design files
The files under `source/` are **design references** — a prototype authored in HTML + React (JSX)
running on a small client-side runtime. They show the intended look, spacing, copy, and motion;
they are **not** meant to be shipped verbatim. **Recreate this page in the target codebase's real
environment** using its established patterns. Per the RealFairTrust system handoff, the product
stack is **Next.js 14 App Router + React + TypeScript + Tailwind**, with **next-intl** (i18n),
**lucide-react** (icons), and **Framer Motion** (animation). If no environment exists yet, pick the
best fit for the project. **Where this README and a source file disagree, this README wins.**

## Fidelity
**High-fidelity.** All colors, gradients, type, spacing, radii, shadows, and motion are final.
Demo content (Unsplash building photos, portrait avatars, the placeholder hero clip) is a
placeholder — swap for real/licensed assets. The final hero video should be served from
`/videos/hero.mp4` (muted, looping, `playsinline`) with a poster still.

## Companion spec — READ FIRST
Tokens, the gold system, the type scale, and every component (Logo, Button, AgentCard,
PropertyCard, Avatar, RankBadge, Badge, Tag, VerifiedBadge) are fully documented in the sibling
bundle **`design_handoff_realfairtrust/`** (its `README.md` + `reference/`). This Home handoff
documents only the **page composition, hero behaviour, and Home-specific values**; it does not
re-document component internals. The full token CSS is also copied here under
`source/tokens/` and `source/styles.css` for convenience.

---

## 1 · Page-level layout

- **Page background (fixed):** the navy radial stage, applied to `<body>`, `background-attachment: fixed`:
  ```css
  --bg-navy-radial: radial-gradient(ellipse 89% 81% at 50% 48%,
    #1e4680 0%, #173a63 33%, #0e2545 59%, #081830 81%, #040e20 100%);
  ```
- **Content width:** sections are centered at `max-width: 1200px` with `32px` side padding —
  **except** the full-bleed hero, which breaks out to the full viewport width.
- **Section vertical rhythm (navy → champagne → navy → navy → champagne):**
  | # | Section | Surface | Padding |
  |---|---------|---------|---------|
  | Nav | sticky header | translucent navy + blur | `13px 32px` inner |
  | 1 | Hero (full-bleed) | video on navy | breaks out, `min-height: 84vh` |
  | 2 | Top este mês | navy | `36px 32px 92px` |
  | 3 | Como funciona | **champagne** | `92px 0` |
  | 4 | Imóveis em destaque | navy | `92px 32px` |
  | 5 | Para consultores (CTA) | navy (gold-glow panel) | `0 32px 100px` |
  | 6 | Footer | **champagne** | `72px 0 40px` |

### Navy ↔ champagne transitions (slim soft edge)
Do **not** use a hard line or drop-shadow between navy and champagne. Each champagne surface fades
its own edge to transparent over a **slim 15px band**, letting the real navy stage show through for
a seamless dissolve:
```css
/* Como funciona (fades in at top AND out at bottom) */
background: linear-gradient(180deg,
  rgba(236,226,203,0) 0, var(--champagne) 15px,
  var(--champagne) calc(100% - 15px), rgba(236,226,203,0) 100%);
/* Footer (fades in at top only) */
background: linear-gradient(180deg, rgba(236,226,203,0) 0, var(--champagne) 15px);
```
(`--champagne` = `#ece2cb`.)

---

## 2 · Sticky nav
- `position: sticky; top: 0; z-index: 60;` translucent navy `rgba(6,15,34,0.74)` with
  `backdrop-filter: blur(14px)`, `1px` bottom hairline (`--hairline`).
- **Left:** full **Logo** lockup (`variant="full"`, `size≈20`) — roofline mark + tri-tone
  "Real**Fair**Trust" wordmark (Fair in gold).
- **Center:** nav links (Inter 14px / 500, `--text-body`): **Comprar · Arrendar · Vender ·
  Consultores · Como funciona**.
- **Right:** a **PT/EN** pill toggle (PT active = gold-tint chip), **Entrar** link, and a primary
  **Button** "Falar com um consultor".

---

## 3 · HERO — full-bleed cinematic (DEFAULT)

The hero has two switchable modes exposed as a tweak/prop **`heroMode`**; the **default is
`"Vídeo full-bleed"`**. The contained-panel mode is the alternative (§3.4).

### 3.1 Full-bleed container
```
position: relative;
width: 100vw; margin-left: 50%; transform: translateX(-50%);  /* viewport breakout */
margin-top: -64px;        /* pull up flush under the sticky nav */
min-height: 84vh;
overflow: hidden;
```

### 3.2 Media (behind everything) — `HeroMedia` "bleed" variant (see `source/HeroMedia.jsx`)
- A muted, looping, autoplay `<video>` (desktop ≥761px) over a slow **Ken-Burns** poster `<img>`
  (mobile / poster fallback). Final video: `/videos/hero.mp4`; poster: a Lisbon/Porto architecture still.
- **Scrim** (vertical, for legibility over any frame):
  `linear-gradient(180deg, rgba(2,8,18,.80) 0%, rgba(2,8,18,.30) 32%, rgba(2,8,18,.34) 58%, rgba(2,8,18,.88) 100%)`.
- **Bottom fade into the navy stage:**
  `linear-gradient(180deg, rgba(8,24,48,0) 0%, rgba(8,24,48,.5) 52%, #060f22 100%)`, ~230px tall.

### 3.3 Foreground layers
**(a) Left cluster — vertically centered as ONE group** (headline + rule + sub-text + buttons):
```
position: absolute; inset: 0 auto 0 0;   /* top:0 bottom:0 left:0 */
max-width: 860px; padding: 0 56px;
display: flex; flex-direction: column; justify-content: center; align-items: flex-start;
gap: 22px;
```
- **h1** — **Fraunces** (`--font-display`), `clamp(38px, 4.5vw, 62px)`, line-height 1.12,
  letter-spacing -0.016em, `text-shadow: 0 2px 24px rgba(2,8,18,.82)`. Two lines, each forced to a
  single line (`white-space: nowrap; display: block`):
  - **Line 1** "O futuro do imobiliário" — cream (`--text-strong`), upright.
  - **Line 2** "está em cada um de nós." — **gold gradient** italic, weight 500
    (`background: var(--gradient-gold-title)` clipped to text; `font-style: italic`).
  - **Gold rule** beneath: `58px × 3px`, `background: var(--gradient-gold-title)`, radius 2px, `margin-top: 20px`.
- **Sub-text** `<p>` — Inter 19px, `--text-strong`, line-height 1.6, `max-width: 480px`,
  `text-shadow: 0 2px 18px rgba(2,8,18,.78)`:
  *"O marketplace imobiliário onde o desempenho dos consultores é medido com justiça, atualizado
  todos os meses e mostrado abertamente. Lisboa & Porto."*
- **Buttons** — `display:flex; gap:14px; margin-top:12px` (≈34px below the sub-text): primary
  **"Encontrar consultor"** + secondary **"Ver imóveis"** (Button `size="lg"`).

**(b) Scroll cue** — `position:absolute; left:50%; bottom:22px; transform:translateX(-50%); z-index:3`:
the word **"EXPLORAR"** (Inter 11px / 600, letter-spacing .2em, uppercase, `--text-muted`) above a
gold chevron (`--gold-300`) that bobs via `@keyframes rft-scrollcue` (translateY 0→7px→0, opacity
.55→1→.55, 2.1s, infinite; disabled under reduced-motion).

**(c) Brand reveal (Real/Fair/Trust)** — lower-right, over the video. Each "beat" shows the brand
word in the **gold gradient** (Fraunces ~56px) with its phrase fading in beneath in cream (~21px),
cross-fading every **3000ms** (`phraseInterval`). A soft **radial dark scrim** sits behind the beats
for legibility (`radial-gradient(130% 142% at 92% 92%, rgba(2,8,18,.84), rgba(2,8,18,.52) 40%, transparent 78%)`).
Right-aligned, bottom-right (`right:54px; bottom:84px; width:min(46%,520px)`).
  - **Real** → "Pessoas antes de imóveis."
  - **Fair** → "Mérito, não antiguidade."
  - **Trust** → "Confiança pela transparência."
  - EN: *People before properties. / Merit, not seniority. / Confidence through transparency.*
  - **The loop does not start until the entrance finishes** — `start-delay = 2750ms`.

### 3.4 Staged entrance animation (on load)
Plays once on mount, video already running behind. **Calm, no bounce.** Each step is a soft fade +
small upward rise (translateY → 0), easing `cubic-bezier(.2,.62,.2,1)`:

| Step | Element | Start | Duration | Rise | Notes |
|------|---------|-------|----------|------|-------|
| 1 | Headline line 1 | 0 ms | 560 ms | 14px | |
| 2 | Gold line 2 | 700 ms | 580 ms | 18px | **accented** — bigger rise + a soft settling gold glow (`drop-shadow(0 2px 14px rgba(255,216,110,.18))`) |
| 3 | Gold rule | 1250 ms | 460 ms | 14px | |
| 4 | Sub-text | 1700 ms | 540 ms | 14px | |
| 5 | Buttons | 2100 ms | 540 ms | 14px | |

Total ≈ 2.6s; steps spaced ~450–550ms apart, with a deliberate hold between line 1 and line 2.

**Export-safety contract (important):** the **base/default state is visible** (opacity 1). The
animation hides each element and reveals it *at runtime only*, and a final "commit" sets the plain
visible state with no transition shortly after each step. This guarantees print/PDF/SSR/no-JS and
**`prefers-reduced-motion: reduce`** all show the final layout — never a blank pre-animation hero.
Reduced-motion shows everything instantly with no animation. Reimplement with the same guarantee
(e.g. Framer Motion `initial`/`animate` with the elements visible by default and motion gated on a
reduced-motion check).

### 3.5 Contained-panel mode (alternative — `heroMode = "Painel contido"`)
Two-column grid `minmax(0,.98fr) minmax(0,1.02fr)`, `gap:44px`, vertically centered:
- **Left:** eyebrow "Desempenho que se vê" + the same headline + sub-text + the two buttons + a
  trust row (3 items with gold line-icons: "Consultores verificados" · "Ranking mensal" ·
  "Lisboa & Porto").
- **Right:** the `HeroMedia` **panel** variant — a `560px`-tall rounded card (card radius, dark
  scrim, 1px rim-light) with eyebrow "A nossa promessa" and the Real/Fair/Trust beats bottom-left.

### 3.6 Responsive
Desktop plays the video; **mobile (≤760px)** swaps to the slow-zoom poster still (no autoplay) with
the same beats over it; a static poster is always the fallback.

---

## 4 · Section 2 — Top este mês (merit spotlight, navy)
- Header row: eyebrow **"Top este mês"** + h2 **"Consultores em destaque"** (Fraunces 42px) and a
  right-aligned gold link **"Ver ranking completo →"**.
- **Featured #1 AgentCard** — centered, `max-width: 620px`, sitting on a soft **gold glow pedestal**
  (`radial-gradient` halo + deep drop-shadow) so it floats above the row. A green **floating badge**
  is pinned to its **upper-right** corner (straddling the top edge, `top:-16px; right:24px`):
  *"+6 lugares · últimos 90 dias"* (green-verified pill). Pass `featured` so the card uses the
  larger spotlight treatment (56px merit score).
- Below it: a **row of 3 ranked AgentCards** (`grid-template-columns: repeat(3, 1fr); gap:22px`),
  ranks #2–#4. See the system handoff for AgentCard internals.

Demo data (placeholder): Sofia Marques (96, Lisboa), Miguel Costa (92, Porto), Inês Carvalho (90,
Lisboa), Tiago Ferreira (88, Porto).

---

## 5 · Section 3 — Como funciona (CHAMPAGNE, the warm break)
- On `--champagne` (#ece2cb) with the slim 15px fade edges (§1).
- Eyebrow **"Como funciona"** (deeper champagne gold `--champagne-eyebrow` #a9791a) + h2 **"Onde o
  Desempenho Encontra o Imobiliário"** (Fraunces 42px, champagne ink) + a lede paragraph.
- **3 navy step-cards** (`.rft-step-card`) on the warm surface — each a dark navy card with a gold
  rank coin **01 / 02 / 03**, a title, and body:
  1. **Mérito sobre volume**
  2. **Uma corrida que reinicia**
  3. **Justo para quem começa**

---

## 6 · Section 4 — Imóveis em destaque (navy)
- Eyebrow **"Imóveis em destaque"** + h2 **"Listados por consultores de topo"** + right link
  **"Ver todos os imóveis →"**.
- **3 PropertyCards** ("Editorial Overlay": photo, gold price, deal + demo chips, bed/bath/area,
  agent mini-row). `grid-template-columns: repeat(3, 1fr); gap:22px`. The demo chips are toggled by
  the **`propertyDemoBadge`** prop (default `true`). Placeholder listings:
  - €745.000 — T3 Príncipe Real, Lisboa (sale) · €1.250.000 — V4 Foz do Douro, Porto (sale) ·
    €2.400/mês — T2 Chiado, Lisboa (rent).

---

## 7 · Section 5 — Para consultores (CTA panel, navy)
- A **gold-bordered glow panel**: `border-radius:28px; border:1px solid var(--gold-border);
  background:linear-gradient(135deg, rgba(18,42,79,.92), rgba(8,20,40,.96));
  box-shadow: var(--shadow-gold-glow), var(--shadow-raised); padding:64px 56px;` with a soft gold
  radial bloom in the top-right corner.
- Eyebrow **"Para consultores"** + h2 **"O sucesso depende de ti."** (Fraunces 56px; the word
  **"sucesso"** in the gold gradient).
- Two paragraphs:
  1. *"Através de um sistema transparente de avaliação e ranking, o teu desempenho ganha visibilidade."*
  2. *"Valorizamos verdadeiramente o trabalho de cada consultor, num modelo onde mérito, desempenho
     e resultados são reconhecidos de forma justa."*
- A 3-item feature row (Inter 14.5px / 500, `--text-strong`, with emoji markers):
  **⭐ Avaliação transparente · 📊 Ranking baseado em desempenho · 🤝 Visível para clientes**
  (if you prefer system gold line-icons over emoji, swap them — keep the labels).
- One primary **Button**: **"Vem Ser Reconhecido"**.

---

## 8 · Section 6 — Footer (CHAMPAGNE)
- On `--champagne` with the slim 15px top fade (§1).
- **On-light Logo variant** (`onIvory`): "Real"/"Trust" render in **dark navy-ink**
  (`--navy-900` / `--navy-700`); **"Fair" and the roofline mark** use the **deep on-light gold
  `--gold-on-light` (#8C5E12)** — the bright title gold disappears on a light surface, so this
  variant is required. Tagline **"PERFORMANCE YOU CAN SEE"** beneath.
- 3 link columns: **Navegação · Contacto · Legal**. Footer body links/text use the champagne
  heading ink **`--champagne-ink` (#2b2415)** for contrast (do **not** use the lighter
  `--champagne-ink-muted` for footer links). Column labels stay muted via opacity.
- Bottom row: **© 2026 RealFairTrust…** + **"Feito em Portugal 🇵🇹"**.

---

## 9 · Tweaks / configurable props (current Home settings)
Exposed on the page component (see `data-props` in `source/HomePage.dc.html`):

| Prop | Type | Default | Effect |
|------|------|---------|--------|
| `heroMode` | enum: `"Vídeo full-bleed"` \| `"Painel contido"` | **`"Vídeo full-bleed"`** | Full-bleed cinematic hero (default) vs. contained two-column panel |
| `phraseInterval` | int (2000–5000, step 250) | `3000` | ms between Real/Fair/Trust beats |
| `propertyDemoBadge` | boolean | `true` | Show the demo/deal chips on PropertyCards |

Also wired but not props: hero entrance timings (§3.4) and the beat `start-delay` (2750ms).

---

## 10 · Key Home-specific tokens (full set in `source/tokens/`)
```css
/* surfaces & accents used on Home */
--surface-card-solid: #0c1d39;     /* AgentCard fill base */
--gold-300: #ffd86e;  --gold-500: #e3a812;
--gradient-gold-title: linear-gradient(90deg,#d8950f,#e3a812 16%,#ffe6a0 50%,#e3a812 84%,#d8950f);
--gold-on-light: #8C5E12;          /* wordmark/mark on champagne */
--champagne: #ece2cb;  --champagne-ink: #2b2415;  --champagne-ink-muted: #5c5340;
--champagne-eyebrow: #a9791a;
--green-verified / --green-tint / --green-border;   /* the "+6 lugares" badge */
--hairline: rgba(245,241,234,.10);
/* type */
--font-display: "Fraunces", Georgia, "Times New Roman", serif;   /* headlines, prices */
--font-body: "Inter", system-ui, sans-serif;                     /* UI & body */
```
**Fonts must load reliably.** Load Fraunces (ital + opsz + wght 400/500/600/700) and Inter
(400/500/600/700) via a direct, eager font link/`next/font` — do **not** rely on a nested CSS
`@import` chain (it can fall back to the serif default and render the wrong face).

---

## 11 · Files in this bundle
- `source/HomePage.dc.html` — the full Home page reference (markup + the entrance-animation logic
  in its `<script type="text/x-dc">` block; the `data-props` settings).
- `source/HeroMedia.jsx` — the hero media component (video/poster, scrim, bottom fade, the
  Real/Fair/Trust beat reveal with `startDelay`, panel vs. bleed variants, reduced-motion handling).
- `source/styles.css` + `source/tokens/*.css` — the complete design-token CSS.
- **Sibling bundle `design_handoff_realfairtrust/`** — the full design-system spec (tokens, gold
  system, type scale, and every component with props/variants). Read it for component internals.
