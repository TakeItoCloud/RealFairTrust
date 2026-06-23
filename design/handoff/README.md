# Handoff: RealFairTrust Design System

> **Performance you can see.** Complete brand + component spec for **RealFairTrust** — a
> bilingual (Portuguese-primary / English) **merit-based real-estate marketplace** for Lisbon
> & Porto that ranks consultants by performance, not seniority. Premium-but-approachable;
> warm, human, trustworthy, calm. **Gold on a dark sapphire-navy stage.**

## Overview
This bundle is the design system for the RealFairTrust marketing site + web app: design
tokens, the locked **gold treatment system**, the **type scale**, and the full set of
reusable components (Button, Logo, badges, form fields, surfaces, and the two crown-jewel
cards — **AgentCard** and **PropertyCard**).

## About the design files
The files under `reference/` are **design references authored in HTML/CSS + React (JSX)** —
prototypes that show the intended look, spacing, and motion. They are **not** meant to be
shipped verbatim. Your job is to **recreate this system in the target codebase's real
environment** (the product is **Next.js 14 App Router + React + TypeScript + Tailwind**, with
**next-intl** for i18n and **lucide-react** for icons, **Framer Motion** for animation) using
its established patterns. If a value below differs from a reference file, **this README
wins** — it reflects the latest locked decisions.

## Fidelity
**High-fidelity.** All colors, gradients, type sizes, spacing, radii, shadows, and motion are
final. Recreate pixel-for-pixel using the codebase's libraries. The only placeholders are
demo content (Unsplash property photos, randomuser.me avatars) — swap for real/licensed
assets.

---

## 1 · Design tokens

### 1.1 Color — navy stage (FIXED, do not alter)
```css
--navy-950: #020812;
--navy-900: #060f22;
--navy-800: #0a1a34;
--navy-700: #122a4f;
--navy-600: #19365f;   /* borders / raised panels */
--navy-500: #21436f;   /* hairlines on navy */

/* The signature page background — applied to <body>, fixed on scroll */
--bg-navy-radial: radial-gradient(ellipse 90% 70% at 50% 30%, #122a4f, #0a1a34, #060f22, #020812);

/* Surfaces that float on the stage */
--surface-card:        rgba(255,255,255,0.035);
--surface-card-raised: rgba(255,255,255,0.06);
--surface-card-solid:  #0c1d39;
--surface-inset:       rgba(2,8,18,0.45);
```

### 1.2 Color — gold (the signal color, two roles)
```css
/* BRIGHT — titles, logo, prices, merit numerals. Smooth VERTICAL gradient. */
--gold-100:#ffe9b3; --gold-200:#ffe089; --gold-300:#ffd86e;  /* peak highlight */
--gold-500:#e3a812; /* mid */  --gold-600:#d19e1d; /* deep base */  --gold-700:#b8862a;
--gradient-gold-title: linear-gradient(180deg, #ffe6a0 0%, #ffd86e 28%, #e3a812 100%);
--gradient-gold-hairline: linear-gradient(90deg, rgba(227,168,18,0) 0%, rgba(227,168,18,0.55) 50%, rgba(227,168,18,0) 100%);

/* CALM / LUXE — buttons. Brighter metallic gradient, kept warmer+deeper than the title. */
--gold-calm:#d8b34f; --gold-calm-soft:#e6c163; --gold-calm-deep:#c39327;
--gradient-gold-button:       linear-gradient(160deg, #ffe79e 0%, #f4c95c 46%, #dca233 100%);
--gradient-gold-button-hover: linear-gradient(160deg, #fff0b6 0%, #fad36c 46%, #e9ae3b 100%);
--gold-tint: rgba(201,162,74,0.12);
--gold-border: rgba(227,168,18,0.38);
--gold-border-soft: rgba(201,162,74,0.22);
```

### 1.3 Color — verified green (SUCCESS ONLY — never decorative)
```css
--green-verified:#3fb984;  --green-verified-deep:#2f9a6c;
--green-tint: rgba(63,185,132,0.14);  --green-border: rgba(63,185,132,0.40);
```

### 1.4 Color — warm ivory (light section break)
```css
--ivory:#fbf8f2;  --ivory-100:#f5efe3;  --ivory-200:#ece3d2;  --ivory-card:#ffffff;
```

### 1.5 Color — text
```css
/* on navy (warm ivory-white) */
--text-strong: #f5f1ea;
--text-body:   rgba(245,241,234,0.78);
--text-muted:  rgba(245,241,234,0.58);
--text-faint:  rgba(245,241,234,0.40);
/* on ivory (navy ink, never pure black) */
--text-ink: #1c2942;  --text-ink-strong: #111c30;  --text-ink-muted: #5a6678;
/* hairlines */
--hairline: rgba(245,241,234,0.10);  --hairline-strong: rgba(245,241,234,0.16);
```

### 1.6 Spacing (4px base) & layout
```
0 4 8 12 16 20 24 32 40 48 64 80 96 128   (--space-0 … --space-32)
--container-max: 1200px;  --container-narrow: 760px;  --section-pad-y: 96px;  --gutter: 24px;
```

### 1.7 Radii, borders, shadows, blur, motion
```css
--radius-xs:6px; --radius-sm:10px; --radius-md:14px; --radius-lg:20px; --radius-xl:28px; --radius-pill:999px;

--shadow-sm:     0 4px 14px -6px rgba(2,8,18,0.6);
--shadow-card:   0 22px 60px -28px rgba(2,8,18,0.9);
--shadow-raised: 0 30px 80px -32px rgba(2,8,18,0.95);
--shadow-gold-glow:  0 0 0 1px rgba(227,168,18,0.22), 0 18px 50px -18px rgba(227,168,18,0.28);
--shadow-green-glow: 0 0 0 1px rgba(63,185,132,0.22), 0 14px 40px -16px rgba(63,185,132,0.22);
--shadow-ivory:  0 18px 44px -24px rgba(28,41,66,0.22);

--blur-panel:18px;  --blur-nav:14px;

--ease-out: cubic-bezier(0.22,0.61,0.36,1);   --ease-in-out: cubic-bezier(0.65,0,0.35,1);
--dur-fast:140ms;  --dur-base:220ms;  --dur-slow:420ms;
```

### 1.8 Card-system tokens (premium redesign)
```css
--card-radius:22px;  --card-radius-media:14px;  --card-pad:26px;
--lift-card:-4px;        /* consultant hover lift */
--lift-card-media:-5px;  /* property hover lift  */
--img-zoom:1.06;  --dur-img:500ms;
--accent-bar: linear-gradient(90deg, #ffe6a0, #e3a812);   /* gold top accent line on hover */
--overlay-scrim: linear-gradient(180deg, rgba(2,8,18,0) 38%, rgba(2,8,18,0.5) 70%, rgba(2,8,18,0.88) 100%);
--plate-bg: rgba(8,18,38,0.92);   /* frosted price plate */
```

---

## 2 · The locked GOLD system (how to apply gold)

| Element | Treatment | Exact CSS |
|---|---|---|
| **Titles / logo / prices / merit numerals** | smooth **vertical** linear gradient, clipped to text | `background: linear-gradient(180deg,#ffe6a0 0%,#ffd86e 28%,#e3a812 100%); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;` |
| **Eyebrows / labels (on navy)** | **flat** solid gold | `color:#e3a812` |
| **Eyebrows / labels (on ivory)** | **flat** deeper gold (for contrast) | `color:#d19e1d` |
| **Buttons (primary)** | soft near-vertical 2–3 stop gradient + inset top-sheen, **dark text** | see below |

```css
/* Primary button — luxe gold */
.btn-primary{
  background: linear-gradient(160deg,#ffe79e 0%,#f4c95c 46%,#dca233 100%);
  color:#2a1d04;
  border:1px solid rgba(140,92,18,0.35);
  border-radius:999px;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.5),      /* polished sheen */
              0 12px 34px -12px rgba(227,168,18,0.6);    /* warm glow */
}
.btn-primary:hover{ background: linear-gradient(160deg,#fff0b6 0%,#fad36c 46%,#e9ae3b 100%); }
.btn-primary:active{ transform: translateY(1px); }
```
**Rule:** only ONE bright-gold focal point per view (the hero title, or the card's merit
score/price). The button gold is deliberately deeper/warmer so it never competes with the
title for "brightest gold". Green is verification only.

---

## 3 · Typography

**Families:** **Fraunces** (variable serif) for all display/titles/prices/numerals; **Inter**
for body, labels, controls. Load Fraunces `opsz 9..144`, weights 400/500/600/700; Inter
400/500/600/700.

| Role | Family | Size | Weight | Line-height | Tracking | Notes |
|---|---|---|---|---|---|---|
| Hero title | Fraunces | **72px** | 600 | 1.03 | −0.015em | marketing splash only |
| Section title | Fraunces | **40px** | 600 | 1.08 | −0.014em | workhorse heading |
| Subsection title | Fraunces | **26px** | 500 | 1.20 | −0.01em | card/block headers |
| Subtitle / lead | Inter | **20px** | 400 | 1.55 | 0 | hero sub & intros |
| Body | Inter | **16px** | 400 | 1.65 | 0 | default reading size |
| Meta / caption | Inter | **13px** | 500 | 1.50 | 0 | ranks, response times |
| Eyebrow | Inter | **12px** | 600 | 1 | **0.2em** | UPPERCASE, flat gold |
| Button | Inter | **15px** | 600 | 1 | 0.01em | |

```css
--fs-hero:72px; --fs-section:40px; --fs-subsection:26px; --fs-lead:20px;
--fs-body:16px; --fs-meta:13px; --fs-eyebrow:12px; --fs-button:15px;
```

---

## 4 · Brand assets

- **Logo lockup** — roofline-check mark (gold gradient stroke) + the wordmark
  **"RealFairTrust" rendered in THREE colors**:
  - `Real` → cream `#F5F1EA`
  - `Fair` → the title gold gradient (`#ffe6a0 → #ffd86e → #e3a812`)
  - `Trust` → muted slate-grey `#8A93A3`
  On the ivory section, `Real`/`Trust` switch to dark ink (`--text-ink-strong` / `--text-ink-muted`).
  Optional uppercase tagline: **"PERFORMANCE YOU CAN SEE"** (Inter, 0.22em, `--text-faint`).
- **Verified seal** (Concept B) — gold ring with "RFT" in Fraunces + a green check; used on
  profile headers. The inline **verified pill** (green check + "Verificado") is the in-list form.
- SVG sources: `reference/` has the component implementations; favicon/mark/seal SVGs live in
  the design system's `assets/` folder.

## 5 · Iconography
**Lucide** (2px stroke, round caps/joins) via **`lucide-react`**. Accent icons use
`--gold-500` on navy; verification uses the green. **No emoji** as icons (a single 🇵🇹 in the
footer is the only exception). The reference JSX ships inline Lucide-style matches for
offline preview — replace with `lucide-react` imports (search, map-pin, star, arrow-right,
chevron-right, clock, shield-check, trending-up, scale, refresh-cw, bed, bath, ruler, globe,
menu).

---

## 6 · Components

All components source styling from the tokens above. Props listed are the public API
(TypeScript). Reference implementations: `reference/components/<group>/<Name>.jsx` (+ `.d.ts`).

### 6.1 Button — `reference/components/buttons/`
`variant: "primary" | "secondary" | "ghost"` · `size: "sm" | "md" | "lg"` · `onIvory?: boolean`
· `block?: boolean` · `iconLeft?` · `iconRight?` · native button attrs.
- **primary** = luxe gold gradient (§2), dark text `#2a1d04`, pill.
- **secondary** = `rgba(255,255,255,0.02)` fill, `1px var(--gold-border-soft)` border,
  `--text-strong`; hover → `--gold-tint` fill + `--gold-border`.
- **ghost** = transparent, `--text-body`; hover → `--text-strong` + `rgba(255,255,255,0.04)`.
- Sizes: sm `9/18px·13`, md `14/26px·15`, lg `17/34px·17`. `:active` → `translateY(1px)`.
  Focus-visible → `0 0 0 3px rgba(227,168,18,0.35)`.

### 6.2 Logo — `reference/components/brand/`
`variant: "full" | "mark" | "wordmark"` · `size?: number` (wordmark px; mark scales ×1.2) ·
`tagline?: boolean` · `onIvory?: boolean`. Tri-color wordmark per §4.

### 6.3 VerifiedBadge — `reference/components/brand/`
`variant: "pill" | "seal"` · `label?` · `sealSize?`. Green is success-only.

### 6.4 Badge / Tag / RankBadge — `reference/components/badges/`
- **Badge** `variant: "gold" | "rising" | "success" | "neutral"` — gold=standing,
  rising=Rising Talent (calm gold), success=verified green, neutral=metadata. Pill, 12px/600.
- **Tag** — quiet outline chip (`--radius-sm`), 12.5px/500, metadata (specialities, zones).
- **RankBadge** `rank: number` · `size?` — coin (`--radius-md`); **rank 1–3 render in bright
  gold gradient** on a dark face with `--shadow-gold-glow`; 4+ neutral.

### 6.5 Input / Select — `reference/components/forms/`
Inset wells: `--surface-inset` fill, `1px --hairline-strong` border, `--radius-sm`, 13/15px
pad, 15px text. Hover → `--gold-border-soft`. **Focus → `--gold-border` + `0 0 0 3px
rgba(227,168,18,0.16)`** (the only gold touch on form controls). Input: `label?`, `iconLeft?`.
Select: `label?`, `options: (string | {value,label})[]`, custom chevron.

### 6.6 Card / StatBlock / Avatar — `reference/components/surfaces/`
- **Card** `variant: "default" | "raised" | "featured" | "ivory"` · `padding?`. default =
  translucent fill + hairline + `--shadow-card` + 18px backdrop-blur; **featured** = gold
  hairline + `--shadow-gold-glow` (one per view); ivory = white card for the light section.
- **StatBlock** `value`, `label`, `delta?` (positive = green), `gold?`, `align?`. Value in
  Fraunces 30px; `gold` clips the title gradient. The metric primitive.
- **Avatar** `src?`, `name` (initials fallback), `size?`, `ring?` (gold gradient ring via
  border-box layering — reserve for featured/top-ranked).

### 6.7 AgentCard ★ (crown jewel) — `reference/components/discovery/`
The ranked consultant card. **"Spotlight" treatment.**
Props: `rank?`, `name`, `photo?`, `city?`, `score`, `scoreLabel?="Mérito · 90d"`,
`badge?: "top" | "rising" | null`, `verified?=true`, `specialities?: string[]`,
`stats?: {value,label}[]`, `meta?`, `profileLabel?="Ver perfil"`, `featured?`.
- **Layout:** `--card-radius` (22), `--card-pad` (26), `--surface-card` + 18px blur,
  `1px --hairline`, `--shadow-card`. `display:flex; flex-direction:column; gap:18px`.
- **Top row:** RankBadge coin + Avatar(56, ring if featured/top-3) + name(Fraunces 21/600,
  −0.01em) with VerifiedBadge pill; city in `--text-muted` 13.5. **Right:** merit `score` in
  the title-gold gradient at **38px**, with a `scoreLabel` (10.5px/600, 0.14em, uppercase,
  `--text-faint`).
- **Tags row:** Badge (top→"Top deste mês" gold / rising→"Rising Talent") + speciality Tags.
- **Stats row:** top border-hairline; each stat `value` (Fraunces 18) over `label` (12 muted).
- **Footer:** top border-hairline; `meta` (defaults to `#<rank> · <city>`) left, gold
  "Ver perfil →" link right.
- **featured:** `--surface-card-raised`, `--border-gold`, `--shadow-gold-glow`, accent bar shown.

### 6.8 PropertyCard ★ — `reference/components/discovery/`
The listing tile. **"Editorial Overlay" treatment.**
Props: `image?`, `price`, `priceSuffix?` (e.g. "/mês"), `title`, `location`,
`deal?: "sale" | "rent"`, `beds?`, `baths?`, `area?`, `energy?` (cert, e.g. "A+"),
`demo?=true`, `agentName?`, `agentPhoto?`, `detailLabel?="Ver detalhe"`.
- **Media:** 220px tall, `--radius-lg`. Photo `object-fit:cover`; placeholder = navy gradient
  with "Sem fotografia". `--overlay-scrim` gradient on top.
- **Floating chips (top):** deal pill ("Venda"/"Arrenda", `--text-strong` on frosted
  `rgba(8,18,38,0.7)`+6px blur) left; **"Dados de demonstração"** gold pill right.
- **Price** sits on the image, bottom-left, **title-gold gradient at 30px**; `priceSuffix`
  smaller (14px). 
- **Body (18px pad):** title (Inter 16/600), location with map-pin (13 muted); spec row
  (top border) with bed/bath/ruler icons + `<b>` values, energy cert in **verified-green**;
  agent row (top border) = mini Avatar(26) + name + gold "Ver detalhe →".

---

## 7 · Interactions & motion (build in Framer Motion)

**Global easing:** `ease-out` = `cubic-bezier(0.22,0.61,0.36,1)`. Respect
`prefers-reduced-motion` — keep opacity, drop transforms. No bounce, no infinite loops.

- **Buttons:** hover brightens gold gradient + deepens shadow; `:active`/whileTap →
  `translateY(1px)` ~120ms.
- **Cards — entrance:** `opacity 0→1` + `y:16→0`, ~420ms, **stagger 60–80ms** across a grid
  (`staggerChildren`). Crest-style cards use `scale 0.96→1` instead of y. PropertyCard image
  starts `scale 1.04` and settles to 1 on entrance.
- **AgentCard — hover:** `y:-4` (`--lift-card`), shadow card→raised, border→`--gold-border-soft`,
  a **gold top accent bar (`--accent-bar`) `scaleX 0→1` from the left** (`--dur-slow`), and the
  merit score gains `drop-shadow(0 0 14px rgba(255,216,110,0.45))`. Link gap widens 6→10px.
- **PropertyCard — hover:** `y:-5` (`--lift-card-media`), shadow card→raised, border warms;
  **image `scale →1.06` over `--dur-img` (500ms)**; price nudges `y:-3`. Link gap widens.
- **Inputs:** focus ring transitions in over `--dur-base`.

## 8 · State, i18n, data
- **i18n:** PT-primary, EN secondary; **all copy via next-intl** — never hardcode. Default PT
  on first visit; a globe toggle switches PT/EN. The PT strings used in the references:
  "Encontrar consultor", "Ver perfil", "Ver detalhe", "Taxa de fecho", "Resposta", "Satisfação",
  "Top deste mês", "Rising Talent", "Verificado", "Dados de demonstração", "Venda"/"Arrenda".
- **City scope:** Lisbon + Porto only — implement as **data + a feature flag**, not new routes.
- **Rating engine:** merit score = rolling **90-day window, recomputed monthly**, normalized
  per-opportunity (not volume). Weights satisfaction **35** / close-rate **25** / response
  **15** / lead-conversion **15** / opportunities **10**. "Rising Talent" board for consultants
  active < 6 months. Always link the methodology ("Como é calculado →").
- **"Dados de demonstração"** badge stays on any card not backed by real verified data — the
  brand is honest about preview vs. verified.

## 9 · Assets
- Property photos: Unsplash hotlinks (demo only — replace with licensed imagery, warm-toned
  architecture). Avatars: randomuser.me (demo only). Icons: `lucide-react`. Fonts: Fraunces +
  Inter (Google Fonts; self-host woff2 for production if dropping the runtime dependency).

## 10 · Files in this bundle
> **Note:** the component source files carry a trailing **`.txt`** suffix (e.g.
> `Button.jsx.txt`) purely so they aren't picked up by a design-tooling compiler. **Strip the
> `.txt`** to restore real `.jsx` / `.d.ts` / `.html` files. The two top-level demos
> (`card-redesign.html`, `gold-system.html`) are ready to open in a browser as-is.
```
reference/
  styles.css                       # @import manifest (links every token file)
  tokens/{colors,typography,spacing,effects,fonts,base}.css
  components/
    buttons/   brand/   badges/   forms/   surfaces/   discovery/
      <Name>.jsx.txt   <Name>.d.ts.txt   <Name>.prompt.md.txt   *.card.html.txt
  card-redesign.html               # both card directions, default + hover states
  gold-system.html                 # the gold + type system applied on a sample page
```
Each component folder's `*.card.html.txt` shows the component mounted in its real states.
Open `card-redesign.html` and `gold-system.html` in a browser to see the intended result.
