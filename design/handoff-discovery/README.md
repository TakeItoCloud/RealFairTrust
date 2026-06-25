# Handoff: Property Discovery / Listing Page (`/comprar` + `/arrendar`)

## Overview
A single property **discovery / listing** page for **RealFairTrust** — a merit-based,
bilingual (PT-primary) real-estate marketplace for **Lisbon & Porto**. The same page serves
both **Buy (`/comprar`)** and **Rent (`/arrendar`)**: identical layout; only the *deal type*
and the *price unit* differ (Buy = total price; Rent = €/month). Every listing is attributed
to a performance-ranked consultant.

Page flow, top → bottom:
**Sticky nav → page header (eyebrow + title + count) → filter well → results grid (PropertyCards)
→ pagination → consultant CTA band → champagne footer.** An **empty-state** ("no results")
variant is also specified.

## About the Design Files
The files in `reference/` are **design references created in HTML** — a prototype showing the
intended look and behaviour. They are **not production code to copy directly**. `Discovery.dc.html`
is authored in a proprietary "Design Component" (`.dc.html`) format (custom `<x-import>`,
`<sc-if>`, `<sc-for>` tags + an inline logic class) used by the design tool. **Do not ship that
format.** Recreate this screen in the target codebase's environment (the brand's real stack is
**Next.js + React + Tailwind + next-intl + lucide-react**) using its established patterns,
components, and i18n. Pull exact values from this README and from `reference/tokens/*.css`.

## Fidelity
**High-fidelity.** Final colours, typography, spacing, radii, shadows, motion, and Portuguese
copy are all locked. Recreate the UI pixel-faithfully using the codebase's component library.
All visual values map to CSS custom properties already defined in the RealFairTrust design system
(`reference/tokens/`); prefer wiring to those tokens over hardcoding hex.

## Localisation
**PT is primary**, EN secondary. All copy below is the PT default and must live in **next-intl**
message catalogues — never hardcoded. Use a real `€` with a thin space (`€ 745 000`). Casing
rule: **sentence case** for headings/body/buttons; **UPPERCASE** only for the wide-tracked
eyebrow/kicker.

---

## Screens / Views

### 1. Page Header (navy stage)
- **Purpose:** Orient the user to the active deal type and the result volume.
- **Layout:** Centered container `max-width: 1200px`, side padding `32px`, top/bottom padding
  `56px / 28px`. Single column, `max-width: 760px` text block, `16px` vertical gap.
- **Components:**
  - **Eyebrow** — `COMPRAR` (Buy) / `ARRENDAR` (Rent). Inter, `12px`, weight 600,
    `letter-spacing: 0.2em`, uppercase, colour `--gold-500` (`#e3a812`). (Helper class `.rft-eyebrow`.)
  - **H1** — Fraunces, `42px`, weight 600, `line-height: 1.08`, `letter-spacing: -0.016em`,
    colour `--text-strong` (`#f5f1ea`), solid (no gradient). Copy: **Buy** = "Imóveis para comprar";
    **Rent** = "Imóveis para arrendar".
  - **Sub-line** — Inter, `18px`, colour `--text-body` (`rgba(245,241,234,0.78)`),
    `line-height: 1.55`, `max-width: 600px`. Copy: "Uma seleção de imóveis, apresentada pelos
    consultores mais bem avaliados."
  - **Result count** — baseline-aligned row, `margin-top: 22px`. Number in Fraunces `24px`
    weight 600 (`--text-strong`); suffix in Inter `15px` (`--text-muted`). Buy = "**128** imóveis
    para comprar"; Rent = "**86** imóveis para arrendar".

### 2. Filter Well (navy, inset panel)
- **Purpose:** Refine the listing set.
- **Layout:** Container `max-width:1200px`, padding `0 32px 18px`. Inner well:
  `border: 1px solid --hairline` (`rgba(245,241,234,0.10)`), `border-radius: --radius-lg` (20px),
  `background: --surface-inset` (`rgba(2,8,18,0.45)`), `box-shadow: inset 0 1px 0 rgba(245,241,234,0.04)`,
  padding `20px 22px`.
  - **Row 1** — `display:flex; flex-wrap:wrap; align-items:flex-end; gap:16px`:
    - **Localização** — Select, width `150px`. Options: `Todas`, `Lisboa`, `Porto`.
    - **Zona** — text Input, `flex: 1 1 190px; min-width: 170px`. Placeholder
      "ex.: Príncipe Real, Foz…".
    - **Tipo** — Select, width `168px`. Options: `Todos os tipos`, `Apartamento`, `Moradia`,
      `Terreno`, `Loft`, `Escritório`.
    - **Preço** — Select, width `188px`. Label changes by deal: Buy label = "Preço",
      Rent label = "Preço (€/mês)". Options differ (see Buy↔Rent table below).
    - **Quartos** — Select, width `140px`. Options: `Indiferente`, `T0`, `T1`, `T2`, `T3`, `T4+`.
    - **Filtrar** — primary button (calm-gold gradient), size md.
  - **Row 2** — top border `1px solid --hairline`, `margin-top:18px; padding-top:16px`,
    `display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap`:
    - Left: "A mostrar **1–9** de {count}" (Inter `13px`, `--text-muted`; bold span `--text-body`).
    - Right: "Ordenar" label (Inter `13px`, weight 500, `--text-muted`) + Select (width `184px`).
      Options: `Mais recentes`, `Preço ↑`, `Preço ↓`.
- **Field component spec (Input / Select):** inset field on the navy stage with a **gold focus
  ring**; label sits above the control. Use the system `Input` / `Select` components — see their
  `.d.ts` in `reference/components/`.

### 3. Results Grid (navy)
- **Purpose:** Browse listings.
- **Layout:** `max-width:1200px`, padding `24px 32px 16px`. Grid:
  `grid-template-columns: repeat(3,1fr); gap: 22px; align-items: stretch`.
  Responsive: **2 columns** at `max-width: 980px`, **1 column** at `max-width: 640px`.
  Show **9 PropertyCards**.
- **Entrance motion:** each card animates from `opacity:0; translateY(14px)` to its visible base
  state over `520ms` with `--ease-out` (`cubic-bezier(0.22,0.61,0.36,1)`), staggered by ~50ms per
  card (40ms → 440ms). Gate behind `@media (prefers-reduced-motion: no-preference)` — the visible
  end-state is the base style so reduced-motion / SSR / print show content immediately.
- **PropertyCard** ("Editorial Overlay" tile — see `reference/components/PropertyCard.jsx` for the
  exact source, props in `PropertyCard.d.ts`):
  - **Media** — 16:11-ish photo, height `220px`, `object-fit: cover`; **image zooms to
    `scale(1.06)` over 500ms on hover**; card lifts `translateY(-5px)` and the shadow deepens.
    Bottom scrim gradient (`--overlay-scrim`) so the price stays legible.
  - **Chips** (top of media, space-between): left = **deal chip** — "Venda" (Buy) / "Arrenda"
    (Rent), `--text-strong` on `rgba(8,18,38,0.7)` + blur, hairline border; right = **demo chip**
    "Dados de demonstração" in `--gold-300` with gold hairline (toggle via `demo` prop).
  - **Price** — Fraunces, `30px`, weight 600, gold-title gradient (`--gradient-gold-title`)
    clipped to text, sitting on the image bottom-left. Optional `/mês` suffix rendered at `14px`
    weight 500 (Rent only). Nudges up `3px` on hover.
  - **Body** (`padding:18px; gap:14px`): **title** Inter `16px` weight 600 `--text-strong`;
    **location** row Inter `13px` `--text-muted` with a map-pin glyph.
  - **Specs row** (top hairline): bed / bath / area (m²) each as `icon + bold value` Inter `12.5px`;
    plus **energy certificate** in verified-green `--green-verified` (`#3fb984`).
  - **Agent mini-row** (top hairline): 26px avatar + consultant name (Inter `12.5px`,
    `--text-muted`) + right-aligned **"Ver detalhe →"** link in `--gold-300`; arrow gap widens on
    hover.

### 4. Pagination (navy)
- **Purpose:** Page through results.
- **Layout:** `max-width:1200px`, padding `18px 32px 8px`, centered row, `gap: 8px`.
- **Components:** prev `‹` and next `›` are `42px` circular buttons (`border-radius:50%`,
  `1px solid --hairline`, `background --surface-card`); prev is disabled-styled
  (`color: --text-faint`). Page numbers are circular, `min-width:42px; height:42px`, Inter `14.5px`.
  **Active page** = solid **`--gradient-gold-button`** fill, ink text `#1a1407`, weight 700, soft
  gold shadow. Inactive pages: `--text-body` on `--surface-card`, hairline border, weight 600.
  An ellipsis `…` separates the early pages from the last page (Buy last = **14**, Rent last = **8**).
- **Note:** the design system has **no** dedicated Pagination component — this is composed inline
  from the system tokens. Build it as a small `<Pagination>` in the codebase following this spec.

### 5. Empty State (navy) — "no results" variant
- **Purpose:** Shown when filters return nothing.
- **Layout:** Centered card, `max-width: 520px; margin: 40px auto 28px; padding: 56px 40px`,
  `border: 1px solid --hairline`, `border-radius: --radius-xl` (28px),
  `background: --surface-card` (`rgba(255,255,255,0.035)`), `box-shadow: --shadow-card`.
  Column, centered, `gap: 20px`.
- **Components:** 64px circular icon badge (hairline border, `--surface-inset` fill) holding a
  search-minus glyph stroked in `--gold-300`; **H3** Fraunces `26px` weight 600 `--text-strong`
  "Sem imóveis para estes filtros."; body Inter `15px` `--text-muted`, `max-width:380px`
  "Experimente alargar a zona, ajustar a banda de preço ou limpar os filtros para ver todos os
  imóveis disponíveis."; **secondary** button "Limpar filtros" (clears all filters).

### 6. Consultant CTA Band (navy) — optional, before footer
- **Purpose:** Route users who can't find a match to a consultant.
- **Layout:** `max-width:1200px`, padding `56px 32px 80px`. Panel: `border-radius: 28px`,
  `border: 1px solid --gold-border` (`rgba(227,168,18,0.38)`),
  `background: linear-gradient(135deg, rgba(18,42,79,0.92), rgba(8,20,40,0.96))`,
  `box-shadow: --shadow-gold-glow`, padding `44px 48px`. Flex row, space-between, wraps on narrow.
  A soft radial gold glow sits top-right (decorative, `pointer-events:none`).
- **Components:** eyebrow "Apoio personalizado"; **H2** Fraunces `30px` weight 600 — "Não encontra
  o que procura? " + gold-text "Fale com um consultor." (`.rft-gold-text`); body Inter `15.5px`
  `--text-body`; **primary** button (lg) "Falar com um consultor".

### Global chrome
- **Sticky nav** — `position: sticky; top:0; z-index:60`, frosted
  (`backdrop-filter: blur(14px)`), `background: rgba(6,15,34,0.74)`, bottom hairline. Inner row
  `max-width:1200px; padding:13px 32px`, space-between: Logo (full variant) · nav links
  (Comprar / Arrendar / Vender / Consultores / Como funciona — active link in `--gold-200`,
  others `--text-body`, Inter `14px`) · right cluster (PT/EN toggle pill, "Entrar" link, primary
  "Falar com um consultor" button).
- **Champagne footer** — warm sand band, `background: --champagne` (`#ece2cb`), padding
  `72px 0 40px`. 4-column grid `1.4fr 1fr 1fr 1fr`, `gap:40px`, bottom hairline `--champagne-border`.
  Col 1: Logo (onIvory + tagline) + descriptor. Cols 2–4: link groups (Navegação / Contacto /
  Legal) with uppercase `12px` heads. Bottom bar: "© 2026 RealFairTrust…" + "Feito em Portugal 🇵🇹".
  **On champagne, links use `--champagne-ink` for contrast** (the only colour override).
  *(This is the **only** place champagne appears on this page — the rest of the page is the navy
  stage. Champagne is otherwise Home-only.)*

---

## Buy ↔ Rent differences (single page, two routes)

| Aspect | Buy (`/comprar`) | Rent (`/arrendar`) |
|---|---|---|
| Eyebrow | `COMPRAR` | `ARRENDAR` |
| H1 | Imóveis para **comprar** | Imóveis para **arrendar** |
| Result count | 128 | 86 |
| Card deal chip | "Venda" | "Arrenda" (`deal="rent"`) |
| Card price | total, e.g. `€ 745 000` | monthly, e.g. `€ 2 600` + `/mês` suffix |
| Preço filter label | "Preço" | "Preço (€/mês)" |
| Preço filter bands | Até € 300 000 · € 300 000–600 000 · € 600 000–1 000 000 · € 1 000 000 + | Até € 1 000 · € 1 000–2 000 · € 2 000–3 500 · € 3 500 + |
| Pagination last page | 14 | 8 |

Implement as a single route/component keyed off a `dealType: "sale" | "rent"` prop (or the route
segment). In the prototype this is a toggle; in production it is the URL.

---

## Interactions & Behavior
- **Filtering:** the "Filtrar" button (or live `onChange`) applies Localização / Zona / Tipo /
  Preço / Quartos and refetches the listing set; "Ordenar" re-sorts (Mais recentes / Preço ↑ /
  Preço ↓). When the result set is empty, render the **Empty State** in place of the grid +
  pagination; "Limpar filtros" resets all filters back to defaults.
- **Card hover:** image `scale(1.06)` (500ms), card `translateY(-5px)`, border warms to
  `--gold-border-soft`, shadow deepens, price lifts `3px`, "Ver detalhe" arrow gap widens. All
  transitions use `--ease-out`; durations `--dur-base` 220ms / `--dur-slow` 420ms / `--dur-img` 500ms.
- **Press:** buttons settle `translateY(1px)` — never a bounce.
- **Grid entrance:** staggered rise (see §3), reduced-motion safe.
- **Pagination:** clicking a page loads that page's results and updates the active state; prev is
  disabled on page 1.
- **Responsive:** grid 3→2→1 at 980/640px; nav and filter row wrap; footer columns collapse.

## State Management
- `dealType: "sale" | "rent"` — from route (`/comprar` vs `/arrendar`).
- `filters: { city, zona, type, priceBand, rooms }` and `sort` — controlled inputs.
- `page` (current), `totalPages`, `totalCount`, `pageSize (9)`.
- `results: Property[]` + `isLoading` / `isEmpty` derived states (drive grid vs empty-state vs
  skeletons).
- Data fetching: query the listings API with `{ dealType, ...filters, sort, page }`; the count and
  `totalPages` come from the response.

## Design Tokens
All defined in `reference/tokens/` — wire to the CSS variables rather than hardcoding.
- **Stage bg:** `--bg-navy-radial` — `radial-gradient(ellipse 89% 81% at 50% 48%, #1e4680, #173a63 33%, #0e2545 59%, #081830 81%, #040e20)`, fixed on scroll.
- **Gold (titles/prices):** `--gradient-gold-title` `linear-gradient(90deg,#d8950f,#e3a812 16%,#ffe6a0 50%,#e3a812 84%,#d8950f)`; accents `--gold-500 #e3a812`, `--gold-300 #ffd86e`, `--gold-200 #ffe089`.
- **Gold (buttons):** `--gradient-gold-button` `linear-gradient(90deg,#c8901f,#e9bb52 28%,#ffe79e 50%,#e9bb52 72%,#c8901f)`; button ink `#1a1407`. `--gold-tint rgba(201,162,74,0.12)`, `--gold-border rgba(227,168,18,0.38)`, `--gold-border-soft rgba(201,162,74,0.22)`.
- **Verified green (success only):** `--green-verified #3fb984`.
- **Champagne (footer only):** `--champagne #ece2cb`, `--champagne-border #e3d7bd`, `--champagne-ink #2b2415`, `--champagne-ink-muted #5c5340`.
- **Surfaces:** `--surface-card rgba(255,255,255,0.035)`, `--surface-card-solid #0c1d39`, `--surface-inset rgba(2,8,18,0.45)`. Hairlines: `--hairline rgba(245,241,234,0.10)`, `--hairline-strong rgba(245,241,234,0.16)`.
- **Text:** `--text-strong #f5f1ea`, `--text-body rgba(245,241,234,0.78)`, `--text-muted rgba(245,241,234,0.58)`, `--text-faint rgba(245,241,234,0.40)`.
- **Radii:** xs 6 · sm 10 · md 14 · lg 20 · xl 28 · pill 999px.
- **Shadows:** `--shadow-card 0 22px 60px -28px rgba(2,8,18,0.9)`, `--shadow-raised 0 30px 80px -32px rgba(2,8,18,0.95)`, `--shadow-gold-glow 0 0 0 1px rgba(227,168,18,0.22), 0 18px 50px -18px rgba(227,168,18,0.28)`.
- **Type:** display = **Fraunces** (variable serif); body/UI = **Inter**. Scale (display) 76/56/42/32/24; (body) 20/17/16/13/12. Full scale + line-heights/tracking in `reference/tokens/typography.css`.
- **Motion:** `--ease-out cubic-bezier(0.22,0.61,0.36,1)`; durations 140 / 220 / 420ms (+ 500ms image).

## Assets
- **Property photos:** Unsplash hotlinks (`?auto=format&fit=crop&w=900&q=80`) — **placeholders**.
  Replace with licensed, warm-toned Lisbon/Porto architecture imagery (16:11 crop). A navy gradient
  placeholder is the fallback when no photo is set.
- **Avatars:** randomuser.me — placeholders; replace with real consultant photos.
- **Icons:** **Lucide** (2px stroke, round caps). Use `lucide-react` in production (search/search-x,
  map-pin, bed, bath, ruler, zap, chevron-left/right). The prototype inlines Lucide-shaped SVGs.
- **Brand marks:** Logo (full / mark / wordmark) and VerifiedBadge are existing design-system
  components — use the codebase's brand components.

## Files
- `reference/Discovery.dc.html` — the full page prototype (proprietary `.dc.html` format; reference
  only). Logic/data + the Buy↔Rent switch live in the `<script data-dc-script>` class at the bottom.
- `reference/components.md` — snapshots of the components this page consumes: the full
  `PropertyCard` source (the most important component to replicate) + prop contracts for
  PropertyCard, Button, Input, Select, Badge, Tag.
- `reference/tokens/` — `colors.css`, `effects.css`, `typography.css` (the exact token values).
