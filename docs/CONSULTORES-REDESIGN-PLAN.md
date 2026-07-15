# CONSULTORES-REDESIGN-PLAN — Cycle 4

> **Goal.** Four items: **(a)** Ranked view — ranked board FIRST, Rising Talent BELOW; **(b)** All view —
> one grid + a Merit/Houses/Time **sort control** (metrics visible); **(c)** an explicit **"Everywhere /
> Todo o país"** district option that IS the default (= today's national board); **(d)** a **work-area
> line** on the consultant card (most-specific filled coverage level), shown wherever a consultant card
> appears. Touches the **shared ConsultantCard** + the **promoted Consultores page** → **Part A (plan)
> then STOP for approval.**
>
> **Status: PART A — investigation + plan + caller audit. No implementation code written.**

---

## 1. Real current code (located + quoted)

### 1.1 `app/[locale]/consultores/page.tsx` (post-Cycle-3, #92)
- URL params: `specialization` (`:42`), `view` (`:43`, `'all'` else `'ranked'`), `page` (`:44`), CAOP
  `?distrito/?concelho/?freguesia` (`:47–50`); `hasLocation` = any of the three present.
- **No location** → default path (`:68–77`): `getConsultants({view:'ranked', specialization})` (main) +
  `getConsultants({risingTalentOnly, specialization})` (rising); in All view main = `getConsultants({specialization})`.
- **Location** → `getConsultantsByArea` (tiered widening #86) → `scoped` (spec filter) → `risingList` +
  `established`; `mainScope` = all (All) / established (Ranked); option-(i) confident-first ordering +
  `highlightId` (`:78–106`).
- **Render order (the item-(a) problem):** the **Rising Talent board renders FIRST** (`:143–156`), then
  the **main grid** (`:158–178`). Cards: rising `showMetrics={hasLocation}` (`:152`); main
  `featured={hasLocation ? c.id===highlightId : undefined} showMetrics={hasLocation}` (`:166–172`).
- `showRisingBoard = view!=='all' && risingList.length>0` (`:110`) — Rising strip only in Ranked view.

### 1.2 `components/consultores/ConsultantFilters.tsx` (client)
`commit()` rebuilds from `searchParams` (preserves siblings, deletes `page`). Controls: the CAOP
`<LocationPicker dealType="sale" source="coverage" …/>` (`:69`), a Specialization `Select`, a Ranked/All
toggle (`:89`, `?view=all`). Reads `specialization` + `view` from the URL.

### 1.3 `components/discovery/LocationPicker.tsx` (client, SHARED)
Distrito→Concelho→Freguesia drill-down; each `GeoLevel` fetches options from `/api/geo/*`. Distrito
button placeholder = `t('f.distritoAny')` ("Distrito") when nothing selected; per-level ✕ clears. `commit()`
preserves siblings. **Callers:** Buy/Rent `FilterBar`, Vender page, Consultores `ConsultantFilters`.

### 1.4 `components/ConsultantCard.tsx` (client, SHARED)
Props: `consultant: ConsultantSummary`, `index?`, `featured?`, `displayRank?`, `showMetrics?`. It
**already receives the coverage fields** (`ConsultantSummary extends ConsultantProfile` →
`coverageDistrictIds` / `coverageConcelhoIds?` / `coverageFreguesiaIds?`), **but it is a client component
and CANNOT import the server-only CAOP loader** (`lib/data/geo/caop.ts` statically imports the 355 KB
dataset — "server-only by convention"). → the id→name resolution **must be done server-side** and passed
in (see §2.4). Structure: top row (avatar/name/score) · tags row · stats row · metrics block (opt-in) ·
footer.

### 1.5 Vender's D-V2 "work-area" wrapper (to match visually — NOT to change)
`app/[locale]/vender/page.tsx`: each card is wrapped with
```tsx
<span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-cream-muted">
  <IconPin className="text-sm text-gold" aria-hidden /> {coverageNote}
</span>
```
where `coverageNote` = `vender.coverageNote.{tier}` ("Cobre o concelho de {area} · {distrito}") — this is
tied to the **matched tier of the picked location**, NOT the consultant's intrinsic area. **This cycle
leaves Vender's wrapper unchanged**; item (d)'s card line is a *different* value (the consultant's own
most-specific coverage) with the *same visual idiom* (pin + muted 12px line). Consequence: Vender cards
will show **two** location lines (wrapper "Cobre …" + card "Trabalha …") — accepted for this cycle; the
wrapper deferring to the card is a later cleanup (as the brief notes).

### 1.6 ALL `<ConsultantCard>` call-sites (item-(d) surface)
| Call-site | File | Notes |
|---|---|---|
| Home featured + row | `app/[locale]/page.tsx:69,82` | ×2 |
| Consultores (main + rising) | `app/[locale]/consultores/page.tsx:152,166` | this page |
| Vender wrapper | `app/[locale]/vender/page.tsx:183` | keep wrapper |
| Dev showcase | `app/dev/components/ComponentsShowcase.tsx:88,100` | ×2 |

**Profile (`consultores/[slug]`) and Buy/Rent (`Discovery`) do NOT use `ConsultantCard`** — the profile
renders its **own server header**; Buy/Rent renders a bespoke **`SpecialistCTA`** mini-card
(`Discovery.tsx:258`). Both are **server components with a `score` translator available** (profile has
`ts = getTranslations('score')`; Discovery can add one). → to honour "show everywhere (…profile, Buy/Rent)",
the work-area line is added to **three** components (ConsultantCard + profile header + SpecialistCTA),
all reading the same pre-resolved `workArea` (§2.4).

### 1.7 Coverage seed — all three levels already present (no enrichment needed for (d))
freguesia: **Ana** (110661), **Maria** (110665), **Pedro** (131216) · concelho: **Catarina** (1106),
**João** (1312) · distrito: **Sofia, Rui, Miguel, Beatriz, Inês, Tiago, Diogo**. So freguesia/concelho/
distrito all render in the demo without changing any existing district coverage.

### 1.8 Cycle-1 metrics (drive the All-view sort)
`ConsultantSummary.unitsSold12mo?` + `avgDaysToSell?` (attached in `summarize()`, `consultants.ts:45–53`)
— seeded for all 12. Houses-closed sort = `unitsSold12mo` desc; Time-to-sell sort = `avgDaysToSell` asc.

---

## 2. Plan

### 2.1 (a) Ranked view reorder — ranked board FIRST, Rising BELOW
Pure **render-order swap** in the page: emit the **main ranked grid first**, then the **Rising Talent
strip** (with a clear divider/heading). No data/behaviour change — same lists, same highlight. Applies to
Ranked view (default + location). *(All view is unaffected — it stays one inline grid.)*

### 2.2 (b) All view — sort control (Merit / Houses / Time)
- New URL param **`?sort`**: `houses` | `time` (Merit = default → no param). Read only in All view (ignored
  in Ranked). Round-trips with location + specialization + view (the shared `commit()` preserves siblings).
- **Sort control = a `Select` in `ConsultantFilters`, shown only when `view==='all'`.** Options: **Mérito
  / Merit** (default) · **Casas fechadas (demo) / Houses closed (demo)** · **Tempo de venda (demo) / Time
  to sell (demo)** — the two demo keys carry a "(demo)" marker (they operate on the Cycle-1 demo values,
  truthful in Phase 5, accepted).
- **Page applies the sort to the All-view grid** before pagination: `merit` → composite desc; `houses` →
  `unitsSold12mo` desc (undefined last); `time` → `avgDaysToSell` asc (undefined last).
- **Does not touch Ranked** (no sort control there — it is the leaderboard).

### 2.3 (c) "Everywhere / Todo o país" default district option
- **Additive opt-in prop on the shared `LocationPicker`: `everywhereLabel?: string`.** When set, the
  **distrito** level (1) uses `everywhereLabel` as its unselected placeholder (so the default reads "Todo o
  país"), and (2) shows a first **clear-row** in its dropdown (label = `everywhereLabel`) whose selection
  calls the existing `onClear` (clears distrito+concelho+freguesia → no-location). Implemented via a small
  additive `clearOption?: {label}` on the internal `GeoLevel` (renders one extra `<li>` at the top).
- **Only `ConsultantFilters` passes `everywhereLabel={t('everywhere')}`.** Buy/Rent `FilterBar` + Vender
  pass nothing → **byte-for-byte unchanged** (placeholder stays "Distrito", no clear-row).
- **"Everywhere" == today's no-location default exactly** — it maps to the same code path (`hasLocation`
  false), so the full national board renders identically to today.

### 2.4 (d) Work-area line on the card (most-specific coverage), everywhere
- **Data (additive, one place):** add optional `workArea?: { level: 'freguesia'|'concelho'|'distrito';
  name: string }` to **`ConsultantSummary`** (`lib/types.ts`), computed in **`summarize()`** (server; the
  repository already imports the CAOP loader): first filled of
  `coverageFreguesiaIds?.[0]`→`getFreguesia` (level `freguesia`), else `coverageConcelhoIds?.[0]`→
  `getConcelho` (`concelho`), else `coverageDistrictIds[0]`→`getDistrito` (`distrito`); else `undefined`
  (line hidden — graceful). *(If multiple ids at a level, the first is used.)*
- **Render (three components, same idiom):** a muted 12px line with `IconPin`,
  `t('score.worksIn.{level}', { area })` → "Trabalha na freguesia de {area}" etc. Added to:
  **(1) `ConsultantCard`** (client, root `t`) — one line after the top row → shows on Home/Consultores/
  Vender/dev-showcase; **(2) the profile header** (`ts` score translator); **(3) `SpecialistCTA`**
  (Discovery adds a `score` translator, passes the resolved line as a label). All read the pre-resolved
  `consultant.workArea`; **hidden when absent** → no page breaks.
- **Always on, not opt-in** (independent of `showMetrics`). This is the intended additive change on Home /
  profile / Buy-Rent / Vender (no other change to those pages).

### 2.5 Metrics gating change (item b consequence — CONFIRM in §4)
Cycle-3 gated metrics on **location**. Cycle-4's demo sorts live in **All view**, so metrics become
**view-based**: **All view → metrics ON** (always, so Houses/Time sorts are legible); **Ranked view →
metrics OFF** (clean leaderboard). This keeps the **default landing state (Ranked / Everywhere) unchanged
vs today** (no metrics) and **supersedes #92's location-gating**. *(This is the one behaviour change that
touches a previously-approved rule — see §4 to confirm.)*

### 2.6 Highlight rule (kept coherent with the sort)
- Ranked view: highlight as Cycle-3 (location → #1 confident `featured`; no-location → per-region auto).
- All view **sort=merit**: same as Cycle-3. All view **sort=houses/time**: **no `featured` highlight**
  (pass `featured={false}` — a sorted comparison grid has no merit spotlight).

### 2.7 i18n (PT/EN parity)
| key | PT | EN |
|---|---|---|
| `consultores.everywhere` | `Todo o país` | `Everywhere` |
| `consultores.sortLabel` | `Ordenar` | `Sort` |
| `consultores.sort.merit` | `Mérito` | `Merit` |
| `consultores.sort.houses` | `Casas fechadas (demo)` | `Houses closed (demo)` |
| `consultores.sort.time` | `Tempo de venda (demo)` | `Time to sell (demo)` |
| `score.worksIn.freguesia` | `Trabalha na freguesia de {area}` | `Works in the freguesia of {area}` |
| `score.worksIn.concelho` | `Trabalha no concelho de {area}` | `Works in the municipality of {area}` |
| `score.worksIn.distrito` | `Trabalha no distrito de {area}` | `Works in the district of {area}` |

---

## 3. Caller audit — what changes, what stays

| Thing | Change | Effect on other callers |
|---|---|---|
| `ConsultantSummary` | **+`workArea?`** (optional) | additive → all consumers compile unchanged; populated once in `summarize()` |
| `summarize()` / repository | resolve `workArea` (CAOP loader already imported) | `getConsultants`/`getConsultantsByArea`/`getConsultant` signatures unchanged → **Home/Vender/Buy-Rent/profile data unaffected** |
| `ConsultantCard` | **+ work-area line** (reads `workArea`); no prop signature change | Home/Vender/dev-showcase gain the line (intended, always-on); **no other visual change** |
| profile header | **+ work-area line** | only added line; rest of profile unchanged |
| `SpecialistCTA` (Buy/Rent) | **+ work-area line** + a `score` translator in Discovery | Buy/Rent otherwise unchanged |
| `LocationPicker` | **+`everywhereLabel?`** (opt-in) + internal `clearOption?` on `GeoLevel` | **Buy/Rent + Vender pass nothing → byte-for-byte unchanged** |
| `ConsultantFilters` | + sort `Select` (All-view only), + `everywhereLabel` to picker | sole consumer = Consultores page |
| Consultores page | (a) reorder, (b) sort, (c) everywhere wiring, (d) via card, (e) metrics view-based | this page only |

**No repository behaviour change** (only the additive `workArea` field). **Home / Vender / Buy-Rent /
profile behaviour unchanged except the intended always-on work-area line.**

## 3.1 Proof that the DEFAULT board is unchanged except the 3 intended changes
Default landing = **Everywhere + Ranked** (no `view`, no location, no `sort`). Vs today it changes ONLY by:
1. **Ranked reorder** — ranked board now above the Rising strip (item a).
2. **"Everywhere" label** — the district control now reads "Todo o país" (same data path as today's no-location board).
3. **Work-area line** — one always-on line per card (item d).
Everything else — the consultant set, merit order, per-region highlight, Rising membership, no-metrics —
is identical (metrics stay OFF in Ranked). Proven at build by DOM diff of the default `/consultores`.

---

## 4. ⚠ ONE behaviour change to confirm (before Part B)
**Metrics gating becomes view-based** (§2.5): **All view = metrics ON always; Ranked view = metrics OFF.**
This supersedes Cycle-3/#92's "metrics only when a location is selected" (so location + **Ranked** no
longer shows metrics; location/no-location **All** now does). It keeps the default landing (Ranked) exactly
as today and makes the demo sorts legible. **Recommended.** Confirm, or keep #92's location-gating in
addition (metrics also in Ranked when a location is picked).

> **DECIDED (Carlos, this session): view-based.** All view = metrics ON always; Ranked view = metrics OFF.
> Supersedes #92's location-gating. Part B builds this.

---

## 5. Gates & guardrails for Part B (when approved)
- Branch `feat/consultores-redesign` off `develop`. Additive data + page-layer + the 3 card components +
  the opt-in `LocationPicker` prop. Reuse the CAOP picker / `getConsultantsByArea` / metrics — no re-impl.
- Gates: `pnpm build`, `tsc --noEmit`, `eslint .` green.
- Verify: Ranked = board first then Rising; All = grid + working sort (Merit default; Houses/Time reorder
  on demo data, demo-marked; metrics shown); "Everywhere" == full national board; location + specialization
  + sort + view compose & round-trip; work-area line shows the most-specific level across Home/Consultores/
  profile/Buy-Rent (≥1 card each of freguesia/concelho/distrito). Regression: Vender still ranks/highlights/
  metrics; Home top-overall unchanged aside from the work-area line.
- DECISIONS #93; update `PROJECT-STATE.md` + `WORKLOG.md`. Open PR, do **not** merge.

**STOP — awaiting approval (and the §4 confirm). No implementation code written.**
