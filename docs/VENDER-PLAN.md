# VENDER PLAN — `/vender` (EN `/selling`) + additive location-based consultant matching

> Part A = investigation + the additive-coverage plan below (this doc). **Part B (build) waits for
> Carlos's explicit go-ahead in-session.** Follows CLAUDE.md §0 (no guessing), Hard Rule #1
> (schema-first, additive only), and the "don't touch built pages / shared components" guardrail.

**Status:** ✅ Part A complete (approved 2026-07-14) · ✅ Part B built on `feat/vender` (gates green;
PR #12 pending Carlos review, NOT merged). Logged Decision #86. See the 2026-07-14 Part B WORKLOG
entry for the as-built summary + smoke test.

---

## 1. What Vender is

A seller/landlord lands on `/vender`, picks **where their property is** (the exact PR #9
Distrito→Concelho→Freguesia `LocationPicker`), and sees a **merit-ranked list of consultants who
cover that area**, each linking to their profile (`/consultores/[slug]`, where the lead form already
lives). No valuation tool, no upload, no new lead form (Phase 5+). The section header names the tier
that matched (e.g. *"Consultores que cobrem o Distrito de Lisboa"*). When nothing matches at any
tier, a single **"request a consultant for your area"** CTA is shown.

---

## 2. Investigation findings (the real current code — quoted, not assumed)

### 2.1 CAOP loader — `lib/data/geo/caop.ts`
Server-only-by-convention. Exports:
- Types `GeoLevel`, `GeoNode { id; type?; parentId?; name; ilha? }`.
- `concelhoDistrito(concelhoId): string | undefined` — top-level id for a 4-digit concelho.
- `freguesiaDistrito(freguesiaId): string | undefined` — top-level id for a 6-digit freguesia.
- `getDistritos()`, `getConcelhos(topLevelId)`, `getFreguesias(concelhoId)` — level lists.
- `getDistrito(id)`, `getConcelho(id)`, `getFreguesia(id)` — single-node lookups.
- `caopMeta`.
Ids: distrito 2-digit (`'11'`) / RA synthetic (`'AC'`,`'MA'`) / concelho 4-digit (`'1106'`) /
freguesia 6-digit (`'110658'`). concelho = `freguesiaId.slice(0,4)`.

### 2.2 `ConsultantProfile.coverageDistrictIds` — `lib/types.ts:77`
`coverageDistrictIds: string[]` (required; CAOP top-level ids). Doc comment: *"CAOP top-level ids the
consultant covers … Drives the area-specialist CTA + distrito inventory. Parallel to
serviceRegionIds."* Populated on **all 12** seed consultants (`lib/mock/consultants.ts`): Lisboa
`['11'...]`, Porto `['13'...]`, plus fallback districts `08`/`15`/`03`/`01`/`17`.

### 2.3 Every caller of `coverageDistrictIds` (exhaustive grep)
| File | Use | Impact of my change |
|---|---|---|
| `lib/types.ts:77` | field decl | **unchanged** — I only ADD optional sibling fields |
| `lib/mock/consultants.ts` (12 rows) | seed values | **unchanged** — enrichment only ADDS `coverageConcelhoIds`/`coverageFreguesiaIds` to a few rows; no existing `coverageDistrictIds` value is edited |
| `lib/data/geo/inventory.ts:31` | `consultants.flatMap(c => c.coverageDistrictIds)` (distrito inventory) | **unaffected** — still reads the same field; new fields not read here |
| `components/discovery/Discovery.tsx:92` | `c.coverageDistrictIds.includes(distritoId)` (area-specialist CTA on Buy/Rent) | **unaffected** — same field, same behavior |

### 2.4 Every caller of `serviceRegionIds` + `ConsultantFilter.regionId` (old Region model)
| File | Use | Impact |
|---|---|---|
| `lib/data/consultants.ts:42` | `filter.regionId` → `c.serviceRegionIds.includes(...)` in `getConsultants` | **untouched** — I add a NEW function, I do not edit `getConsultants` |
| `app/[locale]/consultores/[slug]/page.tsx:38,178` | `serviceRegionIds[0]` → lead `regionId` | untouched |
| `app/[locale]/consultores/page.tsx:29,37-39` | passes `regionId` to `getConsultants` | untouched |
| `components/LeadForm.tsx`, `ProfileContact.tsx`, `PropertyContact.tsx`, `imovel/[id]/page.tsx` | lead `regionId` plumbing | untouched (unrelated to coverage) |

The old **Region** model (`serviceRegionIds`/`regionId`) and the CAOP model stay coexisting exactly
as today. My change touches **neither** the Region model nor `getConsultants`.

### 2.5 The PR #9 location picker + nearby fallback
- **Component:** `components/discovery/LocationPicker.tsx` — `export function LocationPicker(...)`,
  `'use client'`. Props: `{ dealType: ListingType; distrito?: {id;name}; concelho?: {id;name};
  freguesia?: {id;name}; className?: string }`. It renders three `GeoLevel` drill-downs, fetches
  options on-demand from `/api/geo/{distritos,concelhos,freguesias}?deal=<dealType>[&distrito=|&concelho=]`,
  and **URL-syncs `?distrito/?concelho/?freguesia`** via `useRouter().replace` (deleting `page`).
  Uses `useTranslations('discovery')` for its labels. Consumed today only by
  `components/FilterBar.tsx:110`.
- **Inventory rules** (`lib/data/geo/inventory.ts`): a **distrito** is offered if it has a house
  **OR an attributed consultant**; a **concelho/freguesia** is offered **only if it has a house**.
  → Consultant-only districts (Faro `08`, Setúbal `15`, …) already appear at distrito level.
- **Nearby fallback** (`components/discovery/Discovery.tsx`, RSC): when a chosen location has 0
  houses, it widens **freguesia→concelho→distrito** (grouped `WideGroup`), then "other areas". This
  is a **listing** fallback — Vender does NOT reuse it (Vender widens *consultants*, see §4).

### 2.6 `ConsultantCard` props — `components/ConsultantCard.tsx`
`{ consultant: ConsultantSummary; index?; featured?; displayRank? }`. Renders name, #18-gated merit,
badges, specialization tags, close/satisfaction/responsiveness stats, "Ver perfil →". It is a
`<Link>` to `/consultores/[slug]`. **Callers:** `app/[locale]/page.tsx` (Home, 2×),
`app/[locale]/consultores/page.tsx` (2×), `app/dev/components/ComponentsShowcase.tsx` (1×). It does
**not** currently render any coverage/area line.

### 2.7 Vender scaffold + routing (already present)
- `app/[locale]/vender/page.tsx` — a 10-line stub (`<h1>` + "Scaffold — Phase 4").
- `i18n/routing.ts:13` — `'/vender': { pt: '/vender', en: '/selling' }` already registered.

---

## 3. Proposed ADDITIVE type change (`lib/types.ts`)

Keep `coverageDistrictIds` **exactly as-is** (required; every caller in §2.3 depends on its shape).
Add two **optional** sibling arrays so a consultant can be attributed at any CAOP level:

```ts
export interface ConsultantProfile {
  // …unchanged…
  coverageDistrictIds: string[]            // UNCHANGED (required): CAOP distrito/RA ids
  /** OPTIONAL, additive: CAOP concelho (4-digit) ids the consultant is attributed to.
   *  A concelho-level consultant inclusively covers every freguesia inside it. */
  coverageConcelhoIds?: string[]
  /** OPTIONAL, additive: CAOP freguesia (6-digit) ids the consultant is attributed to.
   *  The most specific attribution tier. */
  coverageFreguesiaIds?: string[]
  // …unchanged…
}
```

**Why three explicit optional arrays (not a rename / not a single tagged list):**
- Byte-for-byte preserves `coverageDistrictIds` and all four of its callers (§2.3).
- Optional ⇒ existing seed rows and any future row without them still type-check (tsc-enforced only
  on the required field). Nothing that reads `coverageDistrictIds` sees any difference.
- Naming mirrors the existing field; reads clean at the call site.

**Inclusive hierarchical coverage** (the semantic): a consultant covers freguesia *F* iff
`F ∈ coverageFreguesiaIds` **or** `concelho(F) ∈ coverageConcelhoIds` **or**
`distrito(F) ∈ coverageDistrictIds`. i.e. district attribution covers all its concelhos/freguesias;
concelho attribution covers all its freguesias.

---

## 4. New matching function (additive — `lib/data/consultants.ts`)

```ts
export type CoverageTier = 'freguesia' | 'concelho' | 'distrito'

export interface AreaConsultantMatch {
  tier: CoverageTier | null           // null = nothing selected OR no match at any tier
  areaId?: string                     // the matched area's CAOP id
  areaName?: string                   // resolved name for the section header
  distritoId?: string
  distritoName?: string               // for per-card context
  consultants: ConsultantSummary[]    // merit-ranked (composite desc; no-score last)
}

/** Location-based consultant matching: inclusive hierarchical coverage + STRICT tiered widening,
 *  most-specific-wins. Widening starts at the deepest SELECTED level. Additive; does not touch
 *  getConsultants. */
export async function getConsultantsByArea(sel: {
  distritoId?: string
  concelhoId?: string
  freguesiaId?: string
}): Promise<AreaConsultantMatch>
```

**Algorithm** (uses `getConsultants()` → already approved + summarized + composite-desc-sorted, so
each tier filter preserves merit order; resolves the chain + names via the CAOP loader):

Resolve the chain from whatever is selected — `concelhoId ??= freguesiaId.slice(0,4)`,
`distritoId ??= concelhoDistrito(concelhoId)`. Then, from the **deepest selected level**, return the
**first non-empty** tier:

1. **Freguesia tier** *(only if a freguesia is selected)* — consultants where
   `coverageFreguesiaIds` includes *F*.
2. **Concelho tier** *(if concelho known)* — consultants where `coverageConcelhoIds` includes *C*.
3. **Distrito tier** *(if distrito known)* — **the inclusive catch-all**: every consultant *working
   anywhere in D* — `coverageDistrictIds` includes *D* **OR** some `coverageConcelhoIds` entry whose
   `concelhoDistrito(...) === D` **OR** some `coverageFreguesiaIds` entry whose
   `freguesiaDistrito(...) === D`. Presented as district-level.
4. Else `{ tier: null, consultants: [] }` → page shows the request-a-consultant CTA.

**Strict tiering:** once a narrower tier has ≥1 consultant, broader tiers are not shown. Ranking =
composite desc within the returned tier (same convention as `getConsultants`). `tier` + `areaName`
let the UI label the section (*"Consultores que cobrem o Distrito X"* / *"…o Concelho X"* /
*"…a Freguesia X"*).

*(Note: for the current seed the tier-3 OR-clauses coincide with `coverageDistrictIds`, but the full
inclusive predicate is implemented so it stays correct if a future consultant has only
concelho/freguesia attribution.)*

Export it from `lib/data/index.ts` alongside `getConsultants`.

---

## 5. Seed enrichment (`lib/mock/consultants.ts`) — additive only

**No existing `coverageDistrictIds` value changes.** Add optional fields to 5 rows so all three
tiers are demoable through the (house-inventory) picker. All chosen concelho/freguesia ids **have
active sale listings**, so they are selectable in the picker (`deal=sale`):

| Consultant | Add | Demonstrates |
|---|---|---|
| Ana Silva | `coverageFreguesiaIds: ['110661']` (Misericórdia) | freguesia tier |
| Maria Santos | `coverageFreguesiaIds: ['110665']` (Santa Maria Maior) | freguesia tier |
| Pedro Costa | `coverageFreguesiaIds: ['131216']` (Foz union) | freguesia tier (Porto) |
| Catarina Ferreira | `coverageConcelhoIds: ['1106']` (Lisboa) | concelho tier |
| João Pereira | `coverageConcelhoIds: ['1312']` (Porto) | concelho tier |

Resulting demo (`deal=sale` picker):
- **Freguesia:** Misericórdia→Ana · Santa Maria Maior→Maria · Foz→Pedro.
- **Concelho:** pick freguesia **Belém**/**Parque das Nações** (no exact-freguesia consultant) →
  widens to Lisboa **concelho** tier → **Catarina**. Porto concelho → **João**.
- **Distrito:** pick just **Distrito = Lisboa** → tier 3 = all Lisboa-district consultants; **Faro**
  (Catarina's fallback district, no houses) → tier 3 = Catarina; **Setúbal** → Ana + Sofia.

---

## 6. `LocationPicker` — consultant-coverage mode ✅ CONFIRMED (D-V1 = coverage mode)

**Carlos chose the consultant-coverage-driven picker** (not houses-only). This is an **additive**
change to the shared `LocationPicker` + `/api/geo` + inventory, gated so the existing Buy/Rent
callers are byte-for-byte unchanged. Per the §8 guardrail, this shared-component touch was explicitly
approved.

**Design — coverage-mode inventory = houses ∪ consultant-attribution, at each level:**
- **Distrito:** every distrito/RA with any consultant coverage (`coverageDistrictIds` ∪
  `coverageConcelhoIds`→distrito ∪ `coverageFreguesiaIds`→distrito) ∪ house districts. (The existing
  houses-only distrito inventory *already* unions consultant districts; coverage mode additionally
  unions concelho/freguesia-derived districts.)
- **Concelho** under D: house concelhos in D ∪ concelhos with a consultant attributed at concelho
  level in D ∪ concelhos of any freguesia-level attribution in D.
- **Freguesia** under C: house freguesias in C ∪ freguesias with a freguesia-level attribution in C.

**Why houses ∪ attribution (not full inclusive expansion):** a district-level consultant
*inclusively* covers every concelho/freguesia in the district (thousands of nodes) — surfacing all
of them would bloat the picker and defeat curation. Instead the picker offers the **specifically
attributed** areas plus **house** areas (both signal real RFT activity). This is a strict superset of
today's houses-only lists, so no house area is ever hidden, and it:
- surfaces **consultant-only districts** (Faro `08`, Setúbal `15`) — the win over houses-only;
- keeps concelho/freguesia lists **bounded** (a handful);
- still lets the **tier-widening demo** work: e.g. **Belém** (a house freguesia with no
  freguesia-level consultant) is pickable → widens to the Lisboa **concelho** tier (Catarina). A
  seller wanting a broad area just picks the **Distrito** → the district tier for everyone.

**Additive implementation (existing callers unchanged):**
- `lib/data/geo/inventory.ts` — add `source: 'houses' | 'coverage'` (default `'houses'`) to the
  three inventory fns (or add three `*Coverage` variants); coverage-mode unions the attribution sets
  above. `getConsultants()` supplies the attribution data.
- `app/api/geo/{distritos,concelhos,freguesias}/route.ts` — read an optional `&source=coverage`
  query param (default `houses`) and dispatch. Absent param → today's exact behavior.
- `components/discovery/LocationPicker.tsx` — add optional `source?: 'houses' | 'coverage'` prop
  (default `'houses'`); when `'coverage'`, append `&source=coverage` to each fetch URL. **`FilterBar`
  (the only current caller) passes no `source` → houses mode → Buy/Rent unchanged.**
- Vender passes `dealType="sale"` (houses-union basis) **+ `source="coverage"`** + the
  server-resolved `{distrito,concelho,freguesia}` names.

URL params (`?distrito/?concelho/?freguesia`) are shared; the Vender RSC reads them from
`searchParams` exactly like `Discovery`.

---

## 7. `ConsultantCard` — NOT touched ✅ CONFIRMED (D-V2 = page-level wrapper)

**Carlos chose the page-level wrapper — `ConsultantCard` is not modified at all.** On Vender each
result renders inside a thin wrapper that shows the consultant's coverage context line (e.g.
*"Cobre a Freguesia de Misericórdia · Lisboa"* / *"Cobre o Concelho de Lisboa"* / *"Cobre o Distrito
de Lisboa"*) above/below an unmodified `<ConsultantCard consultant={…} index={i} />`. Since the
matched tier is uniform ("presented as district-level" etc.), the note is computed once per tier from
`getConsultantsByArea`'s `tier`/`areaName`/`distritoName` and rendered per card.

**Shared-component audit:** `ConsultantCard` and its 5 call-sites (Home ×2, Consultores ×2, dev ×1)
are **untouched**. The only shared surface changed is the picker/API/inventory (§6, additive, gated).

---

## 8. `isDemo` chips — NONE ✅ CONFIRMED (D-V3 = no chip)

No demo chip on the consultant cards, consistent with Home/Consultores (seed consultants are not
chipped anywhere; there are no listings on this page). `ConsultantProfile` has no `isDemo` flag.

---

## 9. i18n — new `vender` namespace (`messages/{pt,en}.json`, full parity)

New top-level `vender` namespace: hero eyebrow/title/lede + "how it works for sellers" steps,
location prompt, per-tier result headers (`resultsFreguesia`/`resultsConcelho`/`resultsDistrito`
with `{area}`), initial "pick your area" prompt, and the request-a-consultant CTA. The picker itself
keeps using the existing `discovery.f.*` labels (unchanged). No hardcoded strings.

---

## 10. Build steps (Part B, after approval) — summary
1. Types (§3) + `getConsultantsByArea` (§4) + export from `lib/data/index.ts`.
2. Seed enrichment (§5, additive).
3. Coverage-mode picker (§6): `inventory.ts` `source` param + `/api/geo` `&source=coverage` +
   `LocationPicker` optional `source` prop (defaults preserve Buy/Rent).
4. `app/[locale]/vender/page.tsx` RSC: value-prop "how it works for sellers" section →
   `LocationPicker` (dealType=sale, source=coverage) → per-tier merit-ranked results (each an
   unmodified `ConsultantCard` in a wrapper with the coverage note; header names the tier) →
   request-a-consultant CTA **only** in the fully-empty case; initial "pick your area" prompt when no
   location is selected. PT/EN via the new `vender` namespace. AA / reduced-motion / responsive.
5. Gates: `pnpm build` · `tsc --noEmit` · `eslint` all green.
6. DECISIONS #86 (matching rule) + PROJECT-STATE (Vender built + note the same rule applies later to
   Consultores + NEXT→static pages) + WORKLOG + this doc.
7. PR `feat/vender` → `develop`; preview URL to Carlos; **do not merge**.

---

## 11. Decisions — ✅ ALL CONFIRMED (2026-07-14)
- **D-V1** — **consultant-coverage picker mode** (§6): additive `source` on inventory / `/api/geo` /
  `LocationPicker`; Buy/Rent unchanged.
- **D-V2** — **page-level wrapper** (§7): `ConsultantCard` NOT touched.
- **D-V3** — **no isDemo chip** (§8).
- Additive type + matching design (§3–§5): as written.

**Awaiting only Carlos's explicit "go" to start Part B (the build).**
