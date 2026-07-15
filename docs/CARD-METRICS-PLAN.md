# CARD-METRICS-PLAN — Cycle 1 of the review-feedback change set

> **Scope (locked, do not re-litigate).** Add **two additive, optional DEMO metrics** per consultant —
> **units sold over a rolling 12 months** and **average time-to-sell in days** — and display them on
> `ConsultantCard`, behind an opt-in, with a single muted "demo values" caption on the metric **pair**.
> **Nothing else.** No page's ranking / filtering / behaviour changes. Cycle 2 (Vender ranking) and
> Cycle 3 (Consultores picker) are later and out of scope here.
>
> **Status: PART A — investigation + plan. No implementation code written. Awaiting Carlos's approval.**

---

## 1. Real current code (located + quoted — not assumed)

### 1.1 Where consultant metrics live (`lib/types.ts`)
- **`ConsultantProfile`** (`lib/types.ts:64`) — identity/profile facts: `name`, `bio`, `languages`,
  `specializations`, coverage ids, `contact`, `verified`, `joinedAt`. **No performance outcomes.**
- **`PerformanceSubScores`** (`:98`) — the five 0–100 signal scores (satisfaction/closeRate/
  responsiveness/conversion/activity).
- **`PerformanceScore`** (`:106`) — rating-engine output. **Explicitly a 90-day window**:
  `periodMonth` ("YYYY-MM"), `windowStart`, `windowEnd`, `sub`, `composite`, `rank`, `sampleSize`,
  `confidence`. Rolling 90-day, recomputed monthly (Decisions #5/#6).
- **`ConsultantSummary extends ConsultantProfile`** (`:246`) — the **composite VIEW type the
  repository composes for cards**. Adds display aggregates that live on **neither** the profile
  **nor** the score: `score: PerformanceScore | null`, **`reviewCount: number`**, **`avgRating: number | null`**.
- **`ConsultantDetail extends ConsultantSummary`** (`:253`) — adds `reviews` + `listings`.

**`ConsultantCard`'s prop is `ConsultantSummary`** (`components/ConsultantCard.tsx:24`).

### 1.2 Seed sources
- **`lib/mock/consultants.ts`** — the 12 `ConsultantProfile` seed rows (8 established + 4 Rising Talent).
- **`lib/mock/scores.ts`** — the 12 `PerformanceScore` seeds (keyed by `agentId`), composite computed
  from `RATING_WEIGHTS`; exports `scores: PerformanceScore[]`. **This is the performance-metrics seed file.**
- **`lib/mock/index.ts`** — barrel; **only** `lib/data/` may import it.

### 1.3 How summaries are composed (`lib/data/consultants.ts`)
- **`summarize(consultantId)`** (`:31`) is the **SOLE constructor** of `ConsultantSummary`
  (verified by grep — nothing else builds one; `ConsultantDetail` spreads a summary; `getConsultants`
  maps `summarize`). It returns:
  ```ts
  return { ...consultant, score, reviewCount: agentReviews.length, avgRating }
  ```
  → a single, clean wiring point.

### 1.4 `ConsultantCard` current rendered structure (`components/ConsultantCard.tsx`)
Props today: `consultant: ConsultantSummary`, `index?`, `featured?`, `displayRank?`.
Rendered blocks, in order:
1. Gold accent bar (`:75`).
2. **Top row** (`:85`) — rank coin (`showCoin`) · avatar · name + `VerifiedBadge` · confident merit
   numeral (`gold-title`, 38/56px) + `merit90d` label.
3. **Tags row** (`:120`) — rising / building / top-this-month badges + specialization `Tag`s.
4. **Stats row** (`:134`, only when `score`) — three `StatBlock size="sm"`: closeRate% · satisfaction ·
   responsiveness, on a `border-t border-line pt-4` divider.
5. **Footer** (`:143`, `mt-auto`) — `#rank` · "Ver perfil →".

**`StatBlock`** (`components/ui/StatBlock.tsx`): `size="sm"` = 18px value + muted label; value `text-cream`,
label `text-cream-muted`. This is the in-card stat idiom to reuse.

### 1.5 ALL call-sites of `ConsultantCard` (grep-verified — **6**, not ~5: Home has two)

| # | File · line | Context | Passes `showMetrics`? | Effect this cycle |
|---|---|---|---|---|
| 1 | [app/[locale]/page.tsx:69](app/[locale]/page.tsx#L69) | Home — featured spotlight card | no | **unchanged** |
| 2 | [app/[locale]/page.tsx:82](app/[locale]/page.tsx#L82) | Home — "Top este mês" row (#2–#4) | no | **unchanged** |
| 3 | [app/[locale]/consultores/page.tsx:77](app/[locale]/consultores/page.tsx#L77) | Consultores — ranked board | no | **unchanged** |
| 4 | [app/[locale]/consultores/page.tsx:91](app/[locale]/consultores/page.tsx#L91) | Consultores — all / rising board | no | **unchanged** |
| 5 | [app/[locale]/vender/page.tsx:162](app/[locale]/vender/page.tsx#L162) | Vender — area-matched consultants (page-level coverage wrapper) | no | **unchanged** |
| 6 | [app/dev/components/ComponentsShowcase.tsx:88](app/dev/components/ComponentsShowcase.tsx#L88) | Dev showcase (`/dev/components`) | **Part B opts in here** | shows the new block |

**Caller-audit conclusion:** because the display is gated on a **new opt-in prop that defaults off**
(§2.2), call-sites 1–5 render **byte-for-byte identical** to today — even though the underlying
summaries will carry the two new (optional) fields. Only the dev showcase (6) opts in.

---

## 2. Proposed additive change

### 2.1 Field names / types — **on `ConsultantSummary`** (recommended)
Add two **optional** fields to `ConsultantSummary` (`lib/types.ts:246`):
```ts
export interface ConsultantSummary extends ConsultantProfile {
  score: PerformanceScore | null
  reviewCount: number
  avgRating: number | null
  /** DEMO (Cycle 1): units sold over a rolling 12-month window. Optional; real close data
   *  arrives in Phase 5 (see docs/RATING-ENGINE-NOTES). */
  unitsSold12mo?: number
  /** DEMO (Cycle 1): average time-to-sell in days over the same 12-month window. Optional. */
  avgDaysToSell?: number
}
```
**Why `ConsultantSummary`, not `PerformanceScore` or `ConsultantProfile`:**
- **Not `ConsultantProfile`** — these are performance **outcomes**, not identity/profile facts.
- **Not `PerformanceScore`** — that type's entire contract is a **rolling 90-day window**
  (`windowStart`/`windowEnd`/`periodMonth`). These metrics are a **12-month** aggregate; embedding a
  12-month number next to 90-day window fields is a genuine semantic clash and would mislead Phase 5.
- **`ConsultantSummary` is the right home** — it is exactly the view type that already carries
  cross-cutting **display aggregates** (`reviewCount`, `avgRating`) that live on neither the profile
  nor the score, it is **the prop `ConsultantCard` consumes**, and it has a **single constructor**
  (`summarize`). The 12-month outcomes sit naturally beside `reviewCount`/`avgRating`.

**Name collision check:** grep for `unitsSold12mo` / `avgDaysToSell` / `unitsSold` / `daysToSell` across
`app components lib messages i18n` → **zero existing references**. Names are free.

### 2.2 How `ConsultantCard` displays them — additive, opt-in, off by default
Add one **optional** prop:
```ts
/** Opt in to the outcome-metrics block (units sold 12mo + avg time-to-sell). Off by default →
 *  existing call-sites are byte-for-byte unchanged. Cycles 2/3 flip this on for Vender/Consultores. */
showMetrics?: boolean
```
- **Render rule (recommended): show the block only when `showMetrics === true` AND BOTH values are
  present.** The muted caption marks the metric **pair**; a lone metric under a plural "demo values"
  caption reads oddly, and the seed always sets both. If only one is present → render nothing (defensive).
  *(Alternative "either present" rejected — pair caption + half-empty pair is worse UX.)*
- **When the block does not render → the card is byte-for-byte identical to today.** The opt-in prop —
  not mere data absence — is what guarantees the existing pages are untouched (data will be attached to
  every summary by `summarize`; §2.4).
- **Placement:** a new block inserted **after the stats row (`:140`) and before the `mt-auto` footer
  (`:143`)**. Because the footer is `mt-auto`, inserting above it is layout-safe.
- **Visual:** two `StatBlock size="sm"` (reusing the in-card stat idiom, matching the existing stats row):
  - **Sales:** value = `unitsSold12mo` · label = `t('score.sales12mo')`.
  - **Time:** value = `t('score.daysValue', { n: avgDaysToSell })` ("47 dias" / "47 days") ·
    label = `t('score.avgTimeToSell')`.
  - Below the pair, **one** muted caption `t('score.demoValues')` — `text-cream-muted`, ~11px,
    **NOT green** (upholds #34 verification-only green; mirrors the #89 neutral-draft precedent).
- **No change** to the accent bar, top row, tags row, stats row, footer, motion, or any shared styling.

### 2.3 Seed plan — realistic + deliberately non-correlated (all 12 consultants)
New export in **`lib/mock/scores.ts`** (the performance-seed file), keyed by `agentId`, with a clear
DEMO comment:
```ts
// DEMO — invented illustrative values, NOT real. Phase 5 will source real close data
// (units sold, days-to-sell) from the commission/transaction record — see docs/RATING-ENGINE-NOTES.
// Deliberately NOT correlated with the composite rating so Cycle 2 can show "the rating says one
// thing, volume/speed says another."
export const demoOutcomeMetrics: Record<string, { unitsSold12mo: number; avgDaysToSell: number }> = { … }
```

| Consultant | Composite (rating) | unitsSold12mo | avgDaysToSell | Why (non-correlation)|
|---|---|---|---|---|
| ana-silva | **92** (top) | 9 | 63 | Top rating, **low** volume + slow — luxury, few high-value deals |
| joao-pereira | **92** (top) | 21 | 34 | One *aligned* case (great + high volume) — realistic, not every row inverts |
| catarina-ferreira | 87 | 14 | 41 | Mid-pack both |
| pedro-costa | 87 | 8 | 71 | High rating, **lowest** volume + **slowest** — luxury Porto |
| maria-santos | 83 | **23** | 38 | **Lower rating, near-highest volume + fast** — key Cycle-2 demonstrator |
| rui-oliveira | 82 | 11 | 58 | Commercial, moderate |
| sofia-martins | 79 | **27** | **22** | **Lowest established rating, HIGHEST volume + FASTEST** — strongest counter-signal (rental) |
| miguel-rodrigues | 79 | 6 | 96 | Low volume + **slowest** — new-developments long cycles |
| ines-carvalho (rising) | — | 5 | 44 | Joined 2026-01; small 12mo window |
| tiago-sousa (rising) | — | 4 | 39 | Joined 2026-02 |
| beatriz-almeida (rising) | — | 2 | 51 | Joined 2026-03 |
| diogo-fernandes (rising) | — | 1 | 68 | Joined 2026-04; newest |

*(Rising-Talent cards show no merit numeral today; the metric block still works for them if a call-site
opts in, and their small 12-month counts are consistent with recent join dates.)*

### 2.4 Wiring (single point)
`summarize()` (`lib/data/consultants.ts:42`) attaches from the map:
```ts
const m = demoOutcomeMetrics[consultantId]
return { ...consultant, score, reviewCount: …, avgRating,
         unitsSold12mo: m?.unitsSold12mo, avgDaysToSell: m?.avgDaysToSell }
```
Add `demoOutcomeMetrics` to `lib/mock/index.ts` and import in `lib/data/consultants.ts`. Because the
fields are optional, **every existing consumer compiles unchanged**, and rendered output on call-sites
1–5 is identical (display gated by `showMetrics`).

### 2.5 i18n — new keys in the existing **`score`** namespace (PT/EN parity)
The `score` namespace already holds all card metric labels (closeRate, satisfaction, merit90d…) → these
belong there, not a new namespace (no `consultant` namespace exists).

| key | PT | EN |
|---|---|---|
| `score.sales12mo` | `Vendas (12 meses)` | `Sales (12 mo)` |
| `score.avgTimeToSell` | `Tempo médio de venda` | `Avg. time to sell` |
| `score.daysValue` | `{n} dias` | `{n} days` |
| `score.demoValues` | `valores de demonstração` | `demo values` |

---

## 3. Caller audit (every `ConsultantCard` call-site — confirmed visually unaffected)
See the table in §1.5. **All 5 real-page call-sites (Home ×2, Consultores ×2, Vender ×1) pass no
`showMetrics` prop → the new block does not render → appearance byte-for-byte unchanged**, despite the
summaries carrying the two optional fields. The **dev showcase** is the only opt-in (Part B). No page's
ranking, filtering, or behaviour is touched.

---

## 4. ⚠ Open decision that affects Part B step 11 (needs Carlos's call)

**The dev showcase route is hard-OFF in production.** `lib/flags.ts`:
```ts
devShowcase: process.env.NODE_ENV !== 'production',
```
Vercel **preview** builds run `next build` (NODE_ENV=production), so `/dev/components` **404s on the
preview URL** — and also under this host's `pnpm build && pnpm start` (the documented review method).
So the existing showcase, as gated today, **cannot show you the new block on the Vercel preview**.

Options (I do **not** change this unilaterally — it touches the flag gate, beyond an additive metric block):
- **(A) — Recommended.** Narrow the gate so the showcase renders on **preview** but stays off on
  **production** — e.g. `devShowcase: process.env.VERCEL_ENV !== 'production'` (or `NODE_ENV!=='production' || VERCEL_ENV==='preview'`).
  One-line, reversible, keeps `/dev/*` off the real `main`/production deploy. Then a new
  "ConsultantCard — with outcome metrics (demo)" section on `/dev/components` is visible on the feat
  preview. **No real page touched.**
- **(B)** Leave the flag as-is; review only locally via `pnpm dev` (remote HMR is documented as flaky) —
  likely not viewable for Carlos in practice.
- **(C)** Some other surface Carlos prefers. **Not** a real page this cycle.

Until this is decided, Part B step 11 (preview URL that shows the block) is blocked on the gate.

---

## 5. Gates & guardrails for Part B (when approved)
- Branch `feat/card-metrics` off `develop`. Additive/optional only.
- Gates: `pnpm build`, `tsc --noEmit`, `eslint .` all green.
- Verify `/`, `/consultores`, `/vender`, a consultant profile → 200 and cards **identical** to before.
- Log a numbered `DECISIONS.md` entry; update `PROJECT-STATE.md` + `WORKLOG.md`. Open PR, do **not** merge.

**STOP — awaiting approval. No implementation code has been written.**
