# CONSULTORES-PICKER-PLAN — Cycle 3 of 3 (final review-feedback cycle)

> **Goal.** Replace the old Region filter on the **Consultores discovery** page with the CAOP
> **Distrito→Concelho→Freguesia** picker, add location-scoped ranking + highlight, and turn on the
> Cycle-1 demo metrics — **without** breaking the Ranked/All toggle, Rising-Talent board, specialization
> filter, or URL state. Consultores is a **built, promoted** page → **Part A (plan) then STOP for approval.**
>
> **Status: PART A — investigation + plan + caller audit. No implementation code written.**

---

## 1. Real current code (located + quoted)

### 1.1 The page — `app/[locale]/consultores/page.tsx`
Reads the URL (`str()` helper): **`region`** (`:29`, old Region-model city id), **`specialization`**
(`:30`), **`view`** (`:31`, `'all'` else `'ranked'`), **`page`** (`:32`). Then:
```ts
const [cityRegions, mainList, risingList] = await Promise.all([
  getRegions('city'),                                                   // :35 — feeds the Region select
  view === 'all' ? getConsultants({ regionId, specialization })
                 : getConsultants({ view: 'ranked', regionId, specialization }),  // :36–38
  getConsultants({ risingTalentOnly: true, regionId, specialization }), // :39
])
const showRisingBoard = view !== 'all' && risingList.length > 0         // :44
```
Renders: hero → `<ConsultantFilters regions={cityRegions} />` → **Rising Talent board** (only when
`showRisingBoard`) → **main ranked/all grid** with `EmptyState` + `UrlPagination`. Every card is
`<ConsultantCard consultant={c} index={i} />` (`:77`, `:91`) — **no `featured` prop** → the card's
internal default `featured = confident && rank === 1` fires, so the **per-region rank-1** confident
consultant auto-features (with no region filter, that's Ana [Lisboa #1] **and** João [Porto #1] → 2
spotlights).

### 1.2 The filter component — `components/consultores/ConsultantFilters.tsx` (client)
Three controls, all URL-synced via `commit()` (which does `new URLSearchParams(searchParams.toString())`,
**`params.delete('page')`**, then set/delete — i.e. **preserves all other params**, resets pagination):
- **Region** `Select` (`:65`) → `?region` (sentinel `REGION_ALL='all'` never written).
- **Specialization** `Select` (`:75`) → `?specialization` (sentinel `SPEC_ALL='all'`).
- **Ranked/All** toggle (`:86`) → `?view=all` (ranked is default → param removed).

### 1.3 The repository (`lib/data/consultants.ts`)
- **`getConsultants(filter)`** (`:57`): filters `status==='approved'`, then `regionId`
  (`serviceRegionIds.includes`), `specialization`, `language`, then `risingTalentOnly` **or**
  `view==='ranked'` (`score && !risingTalent`), then **sorts composite desc, no-score last** (`:77`).
- **`getConsultantsByArea(sel)`** (`:111`): inclusive hierarchical coverage + strict tiered widening
  **Freguesia→Concelho→Distrito**, most-specific-wins (Decision #86). Calls **`getConsultants()` with no
  filter** (so composite-desc, all approved) then filters to the winning tier. Returns
  `{ tier, areaId, areaName, distritoId, distritoName, consultants }`. **Does not** apply
  specialization, split rising vs ranked, or apply option-(i) confidence placement — those are the page's job.

### 1.4 How Vender (Cycle 2) already uses these pieces — the exact pattern to reuse
`app/[locale]/vender/page.tsx`: resolves the CAOP chain from `?distrito/?concelho/?freguesia`
(`getDistrito/getConcelho/getFreguesia`, `concelhoDistrito`), renders
`<LocationPicker dealType="sale" source="coverage" distrito/concelho/freguesia />`, calls
`getConsultantsByArea(sel)`, then in the **page layer** (Decision #91) applies option-(i) ordering +
`featured={c.id === highlightId}` + `showMetrics`. **`LocationPicker.commit()` also preserves other
params and deletes `page`** — so it round-trips `view`/`specialization` correctly. It writes only
`?distrito/?concelho/?freguesia` — **no collision** with `region`/`specialization`/`view`/`page`.

### 1.5 Verified facts that shape the plan
- **`getConsultantsByArea` is Vender-only** (grep: the only functional caller is `vender/page.tsx`).
  Reusing it as-is here changes nothing for Vender.
- **`region`/`getRegions` on this page** are read **only** in `consultores/page.tsx:29/35` and
  `ConsultantFilters.tsx:35`. (The `regionId` in `ProfileContact`/`[slug]` is the consultant's *service
  region for the lead form* — unrelated.) So removing the discovery Region control touches only these two.
- **There is NO language filter on Consultores today** — only Region + Specialization + Ranked/All. So
  the brief's "specialization **+ language** filters STAY" has **nothing language-related to preserve**;
  I will keep **specialization** (+ Ranked/All) composable with location and **not add** a new language
  filter (unless you want one — say so and I will).
- **`filter.region` / `filter.allRegions`** i18n keys are used only by `ConsultantFilters`; after the
  swap they are orphaned but I will **leave them in messages** (the `filter` namespace is shared with
  Buy/Rent's `FilterBar`) — harmless, no deletion.

---

## 2. Plan (all layering in the page + filter component; NO repository change)

### 2.1 Swap the control (filter bar)
- **`page.tsx`:** drop `getRegions('city')` + the `regions` prop; resolve the selected CAOP nodes
  (`getDistrito/getConcelho/getFreguesia`) → pass a `location={distrito?,concelho?,freguesia?}` prop
  (each `{id,name}`) to `ConsultantFilters`.
- **`ConsultantFilters.tsx`:** remove the Region `Select` (+ `regions` prop, `REGION_ALL`, `regionOptions`,
  `tf('region')`/`tf('allRegions')`); in its place render
  `<LocationPicker dealType="sale" source="coverage" distrito/concelho/freguesia />` (same as Vender).
  **Keep** the Specialization `Select` and the Ranked/All toggle unchanged. One cohesive bordered filter
  box: `[Distrito][Concelho][Freguesia]  [Especialização]  [Ranking|Todos]`, `flex-wrap` responsive.
- **URL round-trip preserved:** both `LocationPicker.commit` and `ConsultantFilters.commit` rebuild from
  `searchParams` (preserve siblings, delete `page`). So picking a location keeps `?view`/`?specialization`;
  changing spec/view keeps `?distrito/?concelho/?freguesia`. `dealType="sale"` only shapes the picker's
  *option lists* (coverage = houses ∪ attribution); matching itself is attribution-only (#86).
- **Old `?region=…` URLs (graceful):** the page no longer reads `region` → a stale bookmark is **ignored**
  and degrades to the default full board (no error, no crash). *(Recommended over auto-mapping
  reg-lisboa→distrito 11: the old param was city-level and the CAOP picker is its deliberate replacement;
  a silent fall-back to the full board is acceptable and non-breaking. Tell me if you'd rather map it.)*

### 2.2 Layered data flow (location FIRST, then view/spec, then rank/highlight)
```ts
const hasLocation = Boolean(sp.distrito || sp.concelho || sp.freguesia)

if (!hasLocation) {
  // DEFAULT PATH — identical results to today (region was already undefined in the default state):
  mainList  = view==='all' ? getConsultants({specialization})
                           : getConsultants({view:'ranked', specialization})
  risingList = getConsultants({risingTalentOnly:true, specialization})
  // render exactly as today; cards WITHOUT `featured` (keep per-region auto-highlight).
} else {
  // LOCATION PATH:
  match   = await getConsultantsByArea({distritoId, concelhoId, freguesiaId})  // coverage-scoped, composite-desc
  scoped  = match.consultants.filter(c => !specialization || c.specializations.includes(specialization))
  rising  = scoped.filter(c => c.score?.risingTalent)                          // Rising strip (scoped)
  established = scoped.filter(c => c.score && !c.score.risingTalent)           // ranked-eligible
  mainScope = view==='all' ? scoped : established
  // option-(i) placement (verbatim condition) + highlight:
  const isConfident = c => !!c.score && !c.score.risingTalent && c.score.confidence !== 'low'
  const confident = mainScope.filter(isConfident)
  ranked      = [...confident, ...mainScope.filter(c => !isConfident(c))]      // building/unscored to bottom
  highlightId = confident[0]?.id ?? null                                      // #1 confident, or none
}
```
- **Default view unchanged:** with no location and no region control, the default calls are exactly
  today's no-region calls → same consultants, same order, same Rising split, same per-region highlight.
  The only default-state change is the **filter control** swap (Region select → CAOP picker), which is
  the explicit goal — **not** a results/board change.
- **Rising strip scoping:** `showRisingBoard = view!=='all' && rising.length>0` (same rule), but `rising`
  is the location-scoped set when a location is selected.
- **Highlight replacement (location state only):** main-board cards render
  `featured={c.id === highlightId}` → **exactly one** spotlight (the location #1 confident), overriding
  the per-region auto-feature. Rising-strip cards get no `featured` (rising never highlights). In the
  **default** state cards pass **no** `featured` → today's per-region highlight is untouched.
- **Framing + empty state (location):** a heading `t('locationResults.{tier}', {area})` — "Consultores
  que cobrem a freguesia/concelho/distrito de {area}" (discovery framing, own `consultores` keys, not the
  `vender` namespace). Fully-empty coverage (`match.tier===null`) → `EmptyState` with a location-specific
  `t('locationEmpty', {area})`. Specialization filtering a non-empty tier down to zero → the same
  location empty/`EmptyState` (legitimate "none covering X with that specialization").

### 2.3 Cycle-1 demo metrics on the cards
Pass `showMetrics` to the Consultores `ConsultantCard`s (both boards). **See the open decision in §4** —
whether metrics show in the **default** state too, or **only** when a location is selected.

### 2.4 i18n (new `consultores` keys, PT/EN parity)
| key | PT | EN |
|---|---|---|
| `locationResults.freguesia` | `Consultores que cobrem a freguesia de {area}` | `Consultants covering the freguesia of {area}` |
| `locationResults.concelho` | `Consultores que cobrem o concelho de {area}` | `Consultants covering the municipality of {area}` |
| `locationResults.distrito` | `Consultores que cobrem o distrito de {area}` | `Consultants covering the district of {area}` |
| `locationEmpty` | `Ainda sem consultores a cobrir {area}.` | `No consultants covering {area} yet.` |

No other new strings (highlight + metrics reuse existing keys). The picker reuses the existing
`discovery.f.*` labels (already PT/EN). AA / reduced-motion / responsive are inherited from the unchanged
`LocationPicker` + `ConsultantCard`.

---

## 3. Caller audit — proving nothing else is affected

| Shared thing | Change? | Callers & effect |
|---|---|---|
| `getConsultantsByArea` | **none** | Vender-only; reused as-is → **Vender unchanged**. |
| `getConsultants` | **none** (same signatures) | Home, Vender, profile, Buy/Rent-adjacent, dev showcase → **all unchanged**. Consultores default path calls it exactly as today (minus the now-always-undefined `regionId`). |
| `getRegions` | removed from `consultores/page.tsx` only | Still used elsewhere (e.g. Buy/Rent `FilterBar` data, dev showcase) — those imports untouched. |
| `LocationPicker` | **reused as-is** (props already support `source='coverage'`) | Vender + Buy/Rent (`FilterBar`) callers unchanged (no prop/behaviour change). |
| `ConsultantCard` | **no code change** (only new call-sites pass existing `featured`/`showMetrics` opt-ins) | Home, profile, Vender, dev showcase, default Consultores cards → **default appearance unchanged**; metrics stay opt-in. |
| `ConsultantFilters` | region control removed, LocationPicker added, `location` prop | **Sole consumer is `consultores/page.tsx`** (grep) → blast radius = this page only. |
| `messages` (`filter.region/allRegions`) | left in place (orphaned) | Shared `filter` namespace (Buy/Rent) untouched. |

**Conclusion: zero repository/shared-function behaviour change. All new logic is page-layer + the
Consultores-only filter component.** Home, Vender, profile, Buy/Rent are unaffected.

---

## 4. ⚠ ONE open decision (needs your call before Part B)

**Do the Cycle-1 demo metrics show in the DEFAULT (no-location) state, or only when a location is selected?**
The brief contains both "the page behaves **EXACTLY as today** … the new location logic must NOT change
the default view at all" **and** "turn ON the demo metrics on the Consultores cards" + (Step 7) "NO metrics
change to layout **beyond the intended metric block**." These pull in two directions:

- **(A) — Recommended.** Metrics ON in **both** states (default + location). Rationale: the metrics
  directive is unconditional ("on the Consultores cards"); Step 7 explicitly allows "the intended metric
  block" as the one default-view change; "must NOT change the default view" is scoped in-sentence to *the
  new **location** logic* (which genuinely leaves the default board/order/split/highlight identical). The
  flagship discovery board showing the metrics is the natural end-state of Cycle 3. The default view's
  **data/order/highlight** stay byte-for-byte; the metric block is the single additive visual.
- **(B) — Strictest reading.** Metrics ON **only** when a location is selected. The default `/consultores`
  stays truly byte-for-byte identical to today (no metric block); metrics appear once the user picks an area.

I recommend **(A)**. Confirm A or B (this is the only thing that changes what Part B renders in the default
state).

> **DECIDED (Carlos, this session): (B).** Metrics show **only when a location is selected**. The default
> `/consultores` (no location) stays **byte-for-byte identical** to today — no metric block, no highlight
> change. Metrics + the location-#1 highlight engage only in the location-selected state. Part B builds this.

---

## 5. Gates & guardrails for Part B (when approved)
- Branch `feat/consultores-picker` off `develop`. Page-layer + `ConsultantFilters` only; no repo change.
- Gates: `pnpm build`, `tsc --noEmit`, `eslint .` green.
- Verify: default `/consultores` == today (board/order/Rising/highlight; Ranked-All + specialization
  round-trip); Distrito Lisboa → both boards scoped, ranked composite-desc, #1 highlighted, metrics shown,
  freguesia/concelho/district widening, spec + Ranked/All compose; no-coverage → empty state. Regression:
  Home / Vender / a profile / `/comprar` unchanged.
- Log DECISIONS entry (#92); update `PROJECT-STATE.md` + `WORKLOG.md`. Open PR, do **not** merge.

**STOP — awaiting approval (and the §4 A/B call). No implementation code written.**
