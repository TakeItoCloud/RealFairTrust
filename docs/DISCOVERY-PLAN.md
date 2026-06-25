# Design Handoff — DISCOVERY / LISTING page (`/comprar` + `/arrendar`) · Reconciliation Plan

> **Plan only — NO app code/components/tokens changed this session.** Produces the **D2→D3**
> staging for building the shared property **discovery / listing** page on a normal `feat/*` flow.
>
> **Branch:** `feat/discovery`, off **`develop`** (`07d0efa` — the promoted design revision; the
> freeze is lifted, normal flow resumed). No PR; commit the plan + the reference bundle only.
>
> **Authority:** the new handoff `design/handoff-discovery/README.md` is supreme for this page
> (extends #51/#57/#65); **README wins over its source files**; where a literal damages **WCAG AA /
> perf**, the AA-safe deviation is retained + recorded (the #64 set carries forward). The handoff is
> **additive** — it wires to the existing locked token system; it specifies page composition, the
> Buy↔Rent split, and the field/card/pagination specs.
>
> **Date:** 2026-06-25.

---

## 0 · Executive summary

A single **discovery / listing** page serves both **Buy (`/comprar`)** and **Rent (`/arrendar`)** —
identical layout; only the **deal type** and the **price unit** differ (Buy = total price; Rent =
`€/mês`). Page flow (navy stage throughout, only the shared **champagne footer** is warm):

**sticky nav → page header (eyebrow + H1 + result count) → filter WELL → results grid (9
PropertyCards, 3→2→1) → pagination → consultant CTA band → champagne footer**, with a **"no results"
empty state** replacing the grid+pagination when filters return nothing.

**The good news: almost everything already exists.** We shipped `PropertyCard`, `FilterBar`,
`Pagination`/`UrlPagination`, `EmptyState`, `Input`/`Select`/`Button`/`Eyebrow`, the `getListings`
repository, and the locked token system (#57–#76) in Phases 4.1–4.3 + the revisions. The handoff
**doesn't know this** (it says "the design system has no Pagination component" — we have one). So
this is mostly **restyle + compose + wire**, not net-new building. **Zero new design tokens** are
needed (all referenced tokens verified present — §A).

**Confirmed spec (recorded; do NOT re-ask):**
- One page, two routes: `/comprar` (Buy, total price) + `/arrendar` (Rent, `€/mês`). Same layout;
  deal type + price unit/bands differ. Build a **shared template** keyed off `dealType: 'sale'|'rent'`.
- **Reuse the LOCKED design system + components** — introduce **no new design values**.
- Header sub-line (locked): "Uma seleção de imóveis, apresentada pelos consultores mais bem
  avaliados." (EN: "A selection of properties, presented by the best-rated consultants.")
- **Navy stage throughout; NO champagne** except the shared champagne footer.
- Energy cert green (#52); fonts `next/font`; icons `lucide`; PT-primary i18n + EN parity; `€` thin
  space; sentence case (UPPERCASE only for eyebrows).
- Demo listings/consultants map to **OUR seed** (#20 `isDemo`); seed photo 404s → initials/navy
  placeholder fallback (real imagery is a 4.5 item) — **do NOT add placeholder image files**.

---

## A · TOKEN / SYSTEM DELTA — none (verified)

Every token the handoff references already exists in `app/design-tokens.css` / `app/globals.css`
(spot-checked present): `--bg-navy-radial`, `--surface-inset`, `--surface-card`,
`--surface-card-solid`, `--hairline`/`--hairline-strong`, `--radius-lg`/`--radius-xl`,
`--gradient-gold-title`/`--gradient-gold-button`, `--gold-200`/`--gold-300`/`--gold-500`,
`--gold-border`/`--gold-border-soft`, `--green-verified`/`--green-verified-strong`,
`--overlay-scrim`, `--shadow-card`/`--shadow-raised`/`--shadow-gold-glow`, `--ease-out`,
`--dur-base`/`--dur-slow`/`--dur-img`. **No additive token work.**

**Two handoff literals are SUPERSEDED by our locked AA tokens — wire to ours, NOT the handoff hex:**
| Handoff literal | Our locked token (use this) | Why |
|---|---|---|
| Eyebrow gold `--gold-500 #e3a812` | `--gold-500 **#efb52a**` (via `<Eyebrow>`) | #64b — #e3a812 = 4.6-ish on the bright radial; #efb52a = 5.04 AA |
| Energy cert `--green-verified #3fb984` (text) | `text-verified-strong` = `--green-verified-strong **#5fd2a1**` | #64g — on-dark small green text; #3fb984 drops <4.5. PropertyCard already uses this. |
| Pagination active ink `#1a1407` | the existing `--gradient-gold-button` + its button-ink token | reuse the locked button fill; no new value |

> The handoff's `reference/tokens/colors.css` also still carries the **pre-AA** `--text-muted .58` —
> **moot**: we ship the project rules per #64a (muted `.70` where a frosted/inset composite needs
> it). AA is re-measured per-surface in D3 (§D).

---

## B · COMPONENT RECONCILIATION (the core)

### B.1 — PropertyCard → **REUSE as-is** (one optional surface alignment)
`components/PropertyCard.tsx` is already the "Editorial Overlay" tile and matches the handoff:
220px media + scrim, frosted **deal chip** (`forSale`/`forRent`), gold **demo chip** (`isDemo`, #20),
gold-title **price** with `/mês` via `formatListingPrice`, specs (bed/bath/area + **energy cert in
verified-green** — already `text-verified-strong` #5fd2a1, #64g/#52), agent mini-row + "Ver detalhe
→", lucide icons, Framer entrance + hover zoom/lift (#37). It is driven by **`ListingWithAgent`**
(our seed type) — strictly better than the handoff's flat props (those map 1:1 to our listing
fields). **No prop changes for discovery; the whole card is a `<Link>` to `/imovel/[id]`.**

- **GAP (one):** our card fill is the translucent `bg-[var(--surface-card)]` + `backdrop-blur`,
  whereas the discovery handoff `PropertyCard` source uses **`--surface-card-solid #0c1d39`**.
  **Recommend** aligning the fill to `--surface-card-solid` (drops the now-inert blur) — it matches
  the handoff, mirrors the ConsultantCard #71 direction, and is an **AA win** (muted .70 → ~7.82 on
  solid vs marginal on the translucent composite). **Blast radius:** PropertyCard also renders on the
  **Home "Imóveis em destaque"** and the **consultant profile listings** — both *benefit* from the
  same AA-safe consistency. Flag for sign-off because it touches a shared component beyond this page;
  if declined, the card stays translucent and we re-measure its body text in D3 fail-closed.

### B.2 — FilterBar → **RESTYLE + EXTEND** (keep the URL-query core)
`components/FilterBar.tsx` already has the architecture we want: **URL-query-driven** (shareable,
back-button friendly; Selects commit immediately, inputs on blur/Enter) — which maps exactly to the
handoff's "Filtrar applies the filters and refetches". **Blast radius is tiny:** the only consumers
are `/dev/components` showcase and this (stub) page; the Consultores page has its **own**
`ConsultantFilters`. So FilterBar is free to evolve for discovery.

Restyle + field changes (handoff §2):
- **Container → inset WELL:** `border --hairline`, `radius --radius-lg` (20), `background
  --surface-inset`, `box-shadow inset 0 1px 0 rgba(245,241,234,.04)`, pad `20px 22px` (replaces the
  current `rounded-lg border-line bg-surface p-4`).
- **DROP the deal-type segmented control** — deal type is **route-fixed** here (`/comprar` vs
  `/arrendar`), not a user filter.
- **Row 1 fields** (flex-wrap, align-end, gap 16): **Localização** Select (Todas/Lisboa/Porto, from
  `getRegions('city')`) · **Zona** text Input (placeholder "ex.: Príncipe Real, Foz…" → maps to the
  repo `q`) · **Tipo** Select (Apartamento/Moradia/Terreno/Loft/Escritório — **needs a data field,
  §C.3**) · **Preço** Select (deal-aware **bands** → mapped to `minPrice`/`maxPrice`, label "Preço" /
  "Preço (€/mês)") · **Quartos** Select (Indiferente/T0/T1/T2/T3/T4+ — add **T0**) · **Filtrar**
  primary button (md).
- **Row 2** (top hairline): left "A mostrar **{from}–{to}** de {count}"; right "Ordenar" label +
  **Sort** Select (Mais recentes / Preço ↑ / Preço ↓).
- **Fields:** reuse `Input`/`Select` (already inset + **gold focus ring** via `focusRing`, label
  above) — no change (B.5).
- **Prop additions:** `dealType: 'sale'|'rent'`, `totalCount`, `page`, `pageSize` (for the row-2
  range), and the sort param flows through the URL like the rest. Price bands are a `dealType`-keyed
  literal table in the component (values map to `minPrice`/`maxPrice`).

### B.3 — Pagination → **RESTYLE only** (keep the logic) · via `UrlPagination`
`components/Pagination.tsx` already nails the behaviour the handoff wants: controlled
`page/totalPages/onPageChange`, **ellipsis** collapsing (`pageList`), keyboard-operable,
`aria-current="page"`. `components/UrlPagination.tsx` wraps it and syncs the active page to `?page=`
(page 1 omits) — **exactly** the URL model the discovery page uses. So: **use `UrlPagination`**,
restyle the `Pagination` cells to the handoff visuals (handoff §4):
- Page cells → **circular** `min-w-42px h-42px rounded-full`, Inter 14.5px.
- **Active page** → `--gradient-gold-button` fill + button-ink + weight 700 + soft gold shadow
  (reuse the `.btn-gold`/gradient, **not** the handoff `#1a1407` literal).
- **Inactive** → `--text-body` on `--surface-card` + hairline border, weight 600.
- **Prev/Next** → 42px circular buttons with **lucide `chevron-left`/`chevron-right`** (replace the
  text `previous`/`next` with icons + `aria-label`); prev disabled-styled (`--text-faint`) on page 1.
- **Ellipsis** `…` already rendered (`--text-muted`).
- **Blast radius:** `UrlPagination` is also on the **Consultores** page + the dev showcase — both
  inherit the nicer circular pagination (a consistent, intended improvement). Note in D3.

### B.4 — Empty state → **REUSE + extend** (`components/ui/EmptyState.tsx`)
Existing `EmptyState` (title/description/icon/action/tone) is a compact dashed card. The handoff §5
wants a **prominent** card: 64px circular icon badge (search-x glyph in `--gold-300`), H3 Fraunces
26px, body, **solid** `--surface-card` fill, `--radius-xl` (28), pad `56px 40px`, "Limpar filtros"
**secondary** button. **Recommend** adding an optional **`variant="prominent"`** (or `size`) to
`EmptyState` that swaps the dashed/compact styling for the solid card + circular badge, then compose
it with `icon={<IconSearchX/>}` + `action={<Button variant="secondary">Limpar filtros</Button>}`
(the action resets all filters → `router.replace(pathname)`). Falls back to an inline discovery
empty card if extending EmptyState proves awkward. Lucide `search-x` to be added to the icon shim if
absent.

### B.5 — Input / Select / Button / Eyebrow / Tag → **REUSE as-is**
- `Input`/`Select`: already the inset field with a **gold focus ring** (`focusRing`) and a
  label-above pattern (as FilterBar composes them) — matches the handoff field spec. `Select`
  already accepts `(string | {value,label})[]` (#63). No change.
- `Button`: pill, `primary` = calm-gold gradient (#63). Used for **Filtrar** (primary md), the CTA
  band (primary lg), and **Limpar filtros** (secondary). No change.
- `Eyebrow`: renders the wide-tracked uppercase kicker in `--gold-500` (#efb52a, #64b). Used for the
  page-header eyebrow + the CTA-band eyebrow. No change.

### B.6 — Consultant CTA band → **COMPOSE inline** (reuse the Home pattern)
Handoff §6 = a gold-bordered, gold-glow navy panel: eyebrow "Apoio personalizado" + H2 "Não encontra
o que procura? " + gold-text "Fale com um consultor." + body + primary(lg) button "Falar com um
consultor". This is the **same panel** the Home "Para consultores" CTA (#73) already composes
(`SectionWrapper` + `Eyebrow` + gold-text H2 + `Button` + `--shadow-gold-glow` + `--gold-border`).
Compose it inline on the discovery page with discovery copy — no new component.

### B.7 — Global chrome (Header / champagne Footer) → **REUSE as-is**
Sticky `Header` (Logo full + nav + PT/EN + "Falar com um consultor") and the **champagne `Footer`**
(kept 4-col real-route + slim fade, #75) already ship and match the handoff's nav/footer. Confirm the
**active nav link** highlight for Comprar/Arrendar. The footer is the **only** champagne on this page
(consistent with "champagne is Home-only + the shared footer").

---

## C · ROUTES + DATA

### C.1 — Routes (current state → plan)
Both routes are **bare scaffold stubs** (`<h1>` + "Scaffold — Phase 4"), **separate files, no shared
component**:
- `app/[locale]/comprar/page.tsx` — "Comprar" stub. EN path **`/buying`** (i18n/routing.ts).
- `app/[locale]/arrendar/page.tsx` — "Arrendar" stub. EN path **`/renting`** (i18n/routing.ts).

**Plan:** a **shared server component** `components/discovery/Discovery.tsx` (RSC) — or a shared
`DiscoveryPage({ dealType, locale, searchParams })` — that both route `page.tsx` files call with
their `dealType`. Mirror the **Consultores RSC pattern** (`app/[locale]/consultores/page.tsx`):
server reads `searchParams`, fetches via `lib/data`, slices to `PAGE_SIZE = 9`, renders the grid +
`UrlPagination`; the **client `FilterBar`** drives the URL; a URL change re-renders the RSC. `dealType`
drives: eyebrow (`COMPRAR`/`ARRENDAR`), H1 ("Imóveis para comprar/arrendar"), price label + **bands**,
count copy, and `getListings({ type: dealType, … })`. (The card deal chip already follows
`listing.type`, which equals `dealType` here.)

### C.2 — Data mapping → OUR seed
`getListings(filter)` (`lib/data/listings.ts`) already supports `type / regionId / zoneId / minPrice
/ maxPrice / beds / q` and returns `ListingWithAgent[]` (agent ref + resolved region/zone names),
sorted **createdAt desc** (= "Mais recentes"). Field map:

| Handoff card field | Seed source (`ListingWithAgent`) |
|---|---|
| price + `/mês` | `formatListingPrice(price, type, locale, t('listing.perMonth'))` (thin-space `€`, monthly for rent) |
| deal chip | `listing.type` (`sale`→Venda / `rent`→Arrenda) |
| beds / baths / area | `beds` / `baths` / `formatArea(areaM2)` |
| energy cert (green) | `energyCert` in `text-verified-strong` (#64g/#52) |
| demo chip | `isDemo` (#20) |
| agent mini-row | `agent.name` + `Avatar` (initials fallback on 404 — no placeholder files) |
| location | `zoneName, regionName` |

- **Result counts come from the REAL seed, not 128/86:** **14 sale + 10 rent** (24 total; 12 Lisboa
  / 12 Porto). At `pageSize 9` → Buy **2 pages**, Rent **2 pages** (the handoff's "last page 14/8" +
  long ellipsis runs are demo illustration only; our `pageList` handles ≤7 pages with no ellipsis).
  The header count + row-2 range + `totalPages` all derive from the filtered seed length.
- **Filtering/sorting = client → URL → RSC** (no backend; Supabase is Phase 5). The repo already
  filters; two **additive** repo gaps:
  1. **Sort.** `getListings` always sorts createdAt desc. Add `sort?: 'recent' | 'priceAsc' |
     'priceDesc'` to `ListingFilter` + a sort switch in `getListings` (additive; default `recent`).
  2. **Price bands.** Map each deal-aware band → `{ minPrice, maxPrice }` in the FilterBar (e.g. Buy
     "€300 000–600 000" → `minPrice=300000&maxPrice=600000`). **No schema change** — reuses the
     existing min/max filter.
- **Zona** free-text → maps to the repo **`q`** (title/description substring) for now; a future
  option is a zone `Select` from `getRegions('zone')`. Recorded, not blocking.

### C.3 — DATA GAP (the one real decision): the **"Tipo"** filter has no backing field
The handoff **Tipo** filter (Apartamento / Moradia / Terreno / Loft / Escritório) is the **property
kind** — but `Property.type` is the **deal** type (`sale|rent`); there is **no property-kind field**
on the model or the seed (the kind only appears informally inside titles). Two options:
- **(A) — RECOMMENDED:** add an **additive** `kind: PropertyKind` field to `Property` (+ the seed
  tuple + values), per **Hard Rule #1 (schema-first, additive only)**, and wire the Tipo filter +
  `getListings` `kind` filter. Small, additive, future-proof, matches the handoff. Touches
  `lib/types.ts` + `lib/mock/listings.ts` + the repo — **outside this page**, so flag for a quick
  confirm before D2.
- **(B) — fallback:** **defer** the Tipo control in D2 (omit it, or render disabled with a
  "brevemente" hint) and add `kind` in a later step. Ships the page sooner; the filter row is missing
  one control.

**Recommendation: (A)** — define the field now (schema-first) so the page is complete; it's a few
lines. If Carlos prefers minimal churn, (B) is clean. **This is the one item to confirm before D2.**

---

## D · i18n — keys to ADD (PT primary + EN parity)

Existing namespaces: `common, header, home, consultores, profile, score, specializations, listing,
filter, leadForm, review, pagination, cookie, footer`. Add a **`discovery`** namespace (deal-aware)
and extend `filter` + `pagination`. `listing.*` (forSale/forRent/perMonth/beds/baths/area/energyCert)
already covers the card — no change.

- **`discovery`** (NEW):
  - `eyebrow.sale` "COMPRAR" · `eyebrow.rent` "ARRENDAR"
  - `title.sale` "Imóveis para comprar" · `title.rent` "Imóveis para arrendar"
  - `subtitle` "Uma seleção de imóveis, apresentada pelos consultores mais bem avaliados." (locked)
  - `count` ICU: `{count, plural, one {# imóvel} other {# imóveis}}` + `countSuffix.sale/rent`
    ("para comprar"/"para arrendar") — or a single `count.sale`/`count.rent` ICU string
  - `showing` "A mostrar {from}–{to} de {count}"
  - `sortLabel` "Ordenar" · `sort.recent` "Mais recentes" · `sort.priceAsc` "Preço ↑" ·
    `sort.priceDesc` "Preço ↓"
  - filter labels: `f.localizacao` "Localização" + `f.localizacaoAll` "Todas" · `f.zona` "Zona" +
    `f.zonaPlaceholder` "ex.: Príncipe Real, Foz…" · `f.tipo` "Tipo" + `f.tipoAll` "Todos os tipos" +
    `f.tipoOptions.*` (apartamento/moradia/terreno/loft/escritorio — **(A) only**) · `f.preco`
    "Preço" / `f.precoRent` "Preço (€/mês)" + `f.priceBands.sale.*` / `f.priceBands.rent.*` (4 bands
    each) · `f.quartos` "Quartos" + `f.quartosAny` "Indiferente" + `f.quartosOptions.*` (T0–T4+) ·
    `f.filtrar` "Filtrar"
  - `empty.title` "Sem imóveis para estes filtros." · `empty.body` "Experimente alargar a zona,
    ajustar a banda de preço ou limpar os filtros…" · `empty.clear` "Limpar filtros"
  - `cta.eyebrow` "Apoio personalizado" · `cta.title` "Não encontra o que procura? " ·
    `cta.titleGold` "Fale com um consultor." · `cta.body` … · `cta.button` "Falar com um consultor"
- **`pagination`** (extend): add `goTo` (aria "Ir para a página {page}"), `previousLabel`/`nextLabel`
  (aria for the icon-only prev/next). Keep `previous`/`next`/`page`.
- **EN parity** for all of the above (Buy/Rent → "to buy"/"to rent"; sub-line locked EN string).

The existing `filter.*` keys (`type/all/sale/rent/region/allRegions/beds/anyBeds/minPrice/maxPrice/
search/clear/results`) belong to the **old** FilterBar field set; the discovery rebuild uses the new
`discovery.f.*` keys. Keep the old keys only if the dev showcase still renders the old FilterBar —
otherwise prune in D2 (note: no other consumer).

---

## E · AA RE-MEASURE LIST (computed at build, fail-closed — never ship sub-4.5 text)

1. **Filter well fields** on `--surface-inset` over the bright radial: field **labels**
   (`--text-muted`; the inset is darker than the bare radial → likely ≥4.5, but if any label lands
   <4.5 bump that label to `.70` per #64a, never the global token); `Input`/`Select` value text
   (`--text-strong`/body); the **gold focus ring** (non-text ≥3:1).
2. **Row-2 meta** "A mostrar 1–9 de N" + "Ordenar" (muted 13px) on the inset — ≥4.5.
3. **Pagination:** active page ink on `--gradient-gold-button` (≈ button text, ~5.85+); **inactive**
   `--text-body` on `--surface-card` (translucent over the radial — re-measure; if <4.5, set the
   inactive cell to `--surface-card-solid`); prev-disabled `--text-faint` is decorative/disabled
   (exempt).
4. **Empty state:** H3 strong + body muted on the empty card surface (use `--surface-card-solid` if
   the translucent fill measures <4.5); "Limpar filtros" button text.
5. **CTA band** (carried from Home #73, re-confirm on this page): eyebrow `#efb52a`, H2 strong +
   gold-text, body on the navy-gradient gold-glow panel — all ≥4.5 (Home measured 13.05 / 7.92 / …).
6. **PropertyCard** text on its surface: if aligned to `--surface-card-solid` (B.1) → muted .70 =
   ~7.82 (#71); if left translucent → re-measure the body/muted/agent text fail-closed (this is the
   #64 frosted-composite zone and the reason to prefer the solid fill).

---

## F · PHASED CHECKLIST (D2 → D3; all ⬜ — each green-gated, stop-and-confirm)

| # | Step | Scope | Status |
|---|---|---|---|
| **D1** | **This plan** | Reconciliation plan + extract the handoff bundle. No app code. | ✅ this session (`feat/discovery`) |
| **D0** | **Data decision (quick confirm, gates D2)** | Resolve §C.3: **(A)** add additive `Property.kind` + seed + repo filter (recommended), or **(B)** defer the Tipo control. | ⬜ awaiting Carlos |
| **D2** | **Build** | Shared `Discovery` RSC + both routes (`dealType`); FilterBar **restyle+extend** (inset well, new field set, deal-aware price bands, row-2 + sort) + additive repo `sort` (+`kind` if D0=A); Pagination **circular restyle** via `UrlPagination`; PropertyCard surface alignment (B.1, if approved); results grid 3→2→1 + staggered entrance; EmptyState **prominent** + "Limpar filtros"; CTA band inline; `discovery` i18n (PT+EN) + seed wiring + real counts. Green. | ⬜ |
| **D3** | **AA + DECISIONS + state** | Measure the §E list fail-closed; record any deviation; log DECISIONS #77+ (discovery page adopted; FilterBar restyle/extend; Pagination circular restyle; PropertyCard solid-surface alignment; price-band→min/max mapping; the Tipo/`kind` outcome; repo `sort` addition); refresh PROJECT-STATE §5/§8/§11 (4.3 progress + routes now built) + mark this plan COMPLETE. Green. | ⬜ |

**Staging rationale:** the page is mostly **compose + restyle** of shipped parts, so a single build
step (D2) is enough; AA + decisions + docs close out (D3) — mirroring the R/RH cadence. The **only**
fork is the `kind` data decision (D0) — a 2-line confirm that decides whether the Tipo filter ships
in D2 or defers.

**Deferred / flagged for sign-off:**
- **§C.3 `Property.kind`** — recommend adding it additively (A); else defer the Tipo control (B). ← confirm.
- **PropertyCard fill → `--surface-card-solid`** (B.1) — recommended (AA + consistency); shared with
  Home + profile. ← confirm.
- **Pagination/EmptyState restyle blast radius** — Consultores + dev showcase inherit the restyle
  (intended). Noted, not blocking.
- **Zona** as free-text→`q` now; a zone `Select` is a later option. **Real imagery** is a 4.5 item
  (initials/navy-placeholder fallback; no placeholder files).
