# Phase 2 — Wireframes / UX

**Project:** RealFairTrust · Merit-based real estate marketplace (Portugal, PT/EN)
**Phase goal:** Define the **layout and behavior** of every page from Phase 1 — what goes
where on screen, what each component shows, how pages respond on mobile, and the empty/
loading/error states — **without any visual design** (no colour, type, or imagery; that is
Phase 3).
**Status:** Draft for sign-off · 2026-05-29 · Depends on Phase 1 (approved)

> Wireframes are intentionally grey-box and ugly. If something looks unstyled, that's
> correct. We are deciding **structure and interaction** now; styling comes next phase.
> Visual wireframes for the key screens are in `brand/wireframes/` (companion to this doc).

---

## 1. What Phase 2 defines (and excludes)

**Defines:** global layout system (header/footer/grid/breakpoints), the stacked layout of
every page, the reusable component inventory, key interactions, UX states, and baseline
accessibility rules.
**Excludes:** colours, fonts, spacing values, imagery, motion — all Phase 3.

---

## 2. Wireframe conventions

Layouts are written top-to-bottom as **stacked regions**. Notation:

- `[ REGION ]` — a full-width band of the page.
- `· item` — a component or content element inside a region.
- `→ action` — the primary action/CTA.
- `(state)` — an alternate state (empty / loading / error).
- `‖` — items sit side-by-side on desktop, stack on mobile.

---

## 3. Global layout system

- **Grid:** 12-column, max content width ~1200px, centered, generous gutters (values set in
  Phase 3).
- **Breakpoints (intent, not final px):** mobile (1 col) · tablet (2 col) · desktop (3–4 col).
- **Header (all public pages):**
  `[ HEADER ]  · logo  ‖ nav: Comprar · Arrendar · Vender · Consultores · Como funciona  ‖ lang PT/EN  ‖ Entrar  → "Falar com um consultor"`
  On mobile the nav collapses to a hamburger; CTA stays visible.
- **Footer (all public pages):**
  `[ FOOTER ]  · col Explorar · col Para consultores · col Empresa · col Legal  ‖ lang  ‖ socials`
- **Dashboard shell:** left side-nav (`/painel` items) + top bar (agent name, sign-out);
  content area on the right. Collapses to a top hamburger on mobile.

---

## 4. Page wireframes

### 4.1 Home `/`
Goal: route visitors to *find a consultant* or *browse homes*; establish the merit promise.
```
[ HEADER ]
[ HERO ]            · H1 headline ‖ subcopy
                    → [Find a consultant]  [Browse homes]
                    · inline search: city ▾ · type(buy/rent) ▾ · [Search]
[ HOW IT WORKS ]    · 3 steps (icon + label + 1 line) side-by-side
[ TOP CONSULTANTS ] · "Top this month — Lisboa ▾"  · row of 3–4 ConsultantCards · → see all
[ FEATURED HOMES ]  · row of 3–4 PropertyCards · → see all
[ SPLIT ]           · For clients  ‖  For consultants  (value + CTA each)
[ TRUST ]           · how the rating works (short) · → /como-funciona
[ JOIN CTA ]        · become a consultant banner → /consultores/aderir
[ FOOTER ]
```
Responsive: hero stacks (copy over search); card rows become horizontal scroll or 1-col.

### 4.2 Buy / Rent index `/comprar` · `/arrendar`
Goal: browse + filter listings.
```
[ HEADER ]
[ FILTER BAR ]   · city/zone ▾ · price min–max · type ▾ · beds ▾ · more ▾ · [Apply]
[ RESULTS ]      · count + sort ▾  · grid of PropertyCards (3-col desktop / 1-col mobile)
                 (empty) "No homes match — adjust filters"   (loading) skeleton cards
[ PAGINATION ]   · prev / pages / next
[ FOOTER ]
```
Map view toggle is reserved (flagged off).

### 4.3 Property detail `/imovel/[id]`
Goal: present one property, convert to a lead.
```
[ HEADER ]
[ GALLERY ]      · main image + thumbnails  (state: single placeholder if none)
[ SUMMARY ]      · title ‖ price · location · type badge
[ SPECS ]        · beds · baths · area m² · energy cert (row of facts)
[ DESCRIPTION ]  · free text
[ MAP ]          · location map (reserved)
[ AGENT CARD ]   · listing consultant: photo · name · Verified badge · performance badges
                 → [Contact consultant]  (opens lead form / inline form)
[ SIMILAR ]      · row of PropertyCards
[ FOOTER ]
```
Responsive: gallery full-width; agent card becomes a sticky bottom bar on mobile.

### 4.4 Find a consultant `/consultores` (discovery + leaderboard)
Goal: compare consultants fairly, pick one.
```
[ HEADER ]
[ INTRO ]        · "Choose a consultant on merit" · → how scoring works
[ FILTER BAR ]   · city ▾ · specialization ▾ · language ▾   ‖  view: (•Ranked this month) (All)
[ RISING TALENT ]· strip: "New & climbing" · 3–4 ConsultantCards (Rising Talent tag)
[ RESULTS ]      · grid of ConsultantCards (rank # when in Ranked view)
                 → [Suggest one for me] (match mode — flagged, Phase 2+)
                 (empty) "No consultants here yet — we're onboarding"  (loading) skeletons
[ FOOTER ]
```
ConsultantCard shows: photo · name · Verified · **badges** (number hidden until enough data)
· close rate · response time · specialization · city.

### 4.5 Consultant profile `/consultores/[slug]` — **key conversion page**
Goal: build trust in one consultant, capture a lead.
```
[ HEADER ]
[ PROFILE HEADER ] · photo ‖ name · Verified badge · city · specialization · languages
[ PERFORMANCE ]    · current-month standing: badges + rank (in city/specialization)
                   · sub-signals: satisfaction · close rate · responsiveness · conversion
                   · (state A) "Building track record" if sample too small
                   · (state B) Rising Talent tag if < 6 months
                   · → link: how scoring works
[ ABOUT ]          · bio
[ LISTINGS ]       · this consultant's active PropertyCards
[ REVIEWS ]        · verified reviews (rating + comment + date)  (empty) "No reviews yet"
[ CONTACT ]        · lead form: name · contact · message → [Request a call]
[ FOOTER ]
```
Responsive: contact form becomes sticky CTA → expands to full form on mobile.

### 4.6 Sell / Rent with us `/vender`
Goal: capture a seller/landlord lead, let them pick or be matched to a top local consultant.
```
[ HEADER ]
[ VALUE PROP ]   · "Sell or rent with a top local consultant"
[ LEAD FORM ]    · property location ▾ · type sell/rent · property kind ▾ · name · contact
                 → [Continue]
[ MATCHING ]     · "Choose your consultant" · top N local ConsultantCards (radio-select)
                 · OR → [Suggest one for me]
[ CONFIRM ]      · summary + → [Send request]   (success) confirmation + next steps
[ FOOTER ]
```

### 4.7 How rating works `/como-funciona`
```
[ HEADER ]
[ INTRO ]   · plain-language promise
[ MODEL ]   · the 90-day rolling / monthly refresh, explained
[ SIGNALS ] · the 5 signals + why each matters
[ FAIRNESS ]· per-opportunity · Rising Talent · confidence/"building" state
[ INTEGRITY]· moderation now, verified-transaction gating later
[ FAQ ]     · accordions
[ FOOTER ]
```

### 4.8 Join as consultant `/consultores/aderir`
```
[ HEADER ]
[ HERO ]      · "Compete on merit, not marketing spend" → [Apply to join]
[ BENEFITS ]  · merit visibility · fair commission split · Pro tools (3-up)
[ SPLIT ]     · how the progressive split works
[ EXPECT ]    · quality standards we hold
[ APPLY ]     · short form → [Apply]   (or link to /registar)
[ FAQ ]
[ FOOTER ]
```

### 4.9 Agent dashboard `/painel/*` (auth)
Shell = side-nav + content.
- **Overview `/painel`:** `[ STAT TILES ] new leads · active listings · current score/rank · profile completeness` → quick links.
- **Profile `/painel/perfil`:** form — photo, bio, specializations, service regions, languages, contact; save.
- **My listings `/painel/imoveis`:** table/grid of own listings + [New listing] → create/edit form (CRUD). (empty) "Add your first listing".
- **Leads `/painel/contactos`:** list of incoming leads (client, intent, property/agent ref, date, status ▾ new→contacted→closed). (empty) "No leads yet".
- **My performance `/painel/desempenho`:** the score breakdown **as coaching** — current composite, each sub-signal vs. target, trend, rank in city, and "what to improve" tips. This is where the rating engine becomes useful to the agent, not just a judgement.

### 4.10 Admin `/admin/*` (auth)
- **Overview `/admin`:** queues (pending agents, flagged reviews/listings), health tiles.
- **Consultants `/admin/consultores`:** table of profiles + status actions (approve / reject / suspend).
- **Moderation `/admin/moderacao`:** reviews & listings needing review → approve/remove.
- **Rating oversight `/admin/avaliacoes`:** last recompute status, flags, anomaly checks, manual recompute trigger.

### 4.11 Auth `/entrar` · `/registar`
```
[ minimal header (logo + lang) ]
[ CARD ]  · email · password (· name/role on register) → [Sign in] / [Create account]
          · link to the other · (error) inline message
```

### 4.12 Legal & system
- `/privacidade` `/termos` `/cookies`: simple document layout (title + sections + TOC).
- **Cookie consent banner:** bottom bar · accept / reject / preferences (GDPR).
- **404 / error:** message + → home + → consultants.

---

## 5. Reusable component inventory (to design in Phase 3, build in Phase 4)

Header · Footer · LanguageSwitcher · Button (primary/secondary/ghost) · Eyebrow · SectionWrapper ·
**PropertyCard** · **ConsultantCard** · **PerformanceBadge** · **VerifiedBadge** ·
**RisingTalentTag** · **RankIndicator** · **ScoreBreakdown** (sub-signals) · StarRating ·
FilterBar · SelectField/Input/Form · LeadForm · ReviewItem · Pagination · Skeleton ·
EmptyState · StatTile · DataTable (dashboard/admin) · Modal · Toast · CookieBanner.

> These map 1:1 to the Phase 3 design-system components and the Phase 4 build. Defining them
> now means Phase 3 designs a finite kit, not endless one-offs.

---

## 6. Key interactions

- **Filtering:** updates results in place (URL query reflects filters, e.g. `?city=porto`),
  shareable; no full reload.
- **Lead submission:** inline validation → submit → success state → record `Lead` (Phase 5).
- **Language switch:** swaps locale, preserves the current page.
- **Score reveal:** badge/"building" state until min sample, then numeric (Decision #18).
- **Match mode:** "Suggest one for me" is present but flagged off until Phase 2+.

---

## 7. Baseline accessibility (set targets in Phase 3)

Keyboard-navigable nav, filters, forms; visible focus states; alt text on all imagery; form
labels + error association; logical heading order; target AA contrast (colours chosen in
Phase 3); respect reduced-motion.

---

## 8. Open questions before Phase 3

Each with a recommendation.

1. **Hero layout:** keep the prototype's video/image hero with an inline search, or a cleaner
   split (copy + search left, single image right)? *Rec: split with inline search — faster,
   lighter, and the search gets people moving immediately. Keep an image, drop the heavy video.*
2. **Leaderboard presentation:** explicit numbered ranking (1,2,3…) or a card grid with
   "Top this month" badges and no hard numbers? *Rec: card grid with badges + a subtle rank
   on the Ranked view — competitive but less brutal than a naked 1–N list.*
3. **ConsultantCard density:** which signals on the card vs. saved for the profile? *Rec: card
   = badges + close rate + response time + specialization; full sub-signal breakdown on profile.*
4. **Contact pattern:** lead form inline on the profile/property page, or in a modal? *Rec:
   inline on desktop, sticky-button-to-full-form on mobile.*
5. **Dashboard nav:** left side-nav (recommended for scalability) vs top tabs? *Rec: side-nav.*

---

## 9. Phase 2 exit criteria (sign-off)

Complete when the global layout, every page's wireframe, the component inventory, and the
interaction/state model are approved, and §8 is answered. On sign-off we proceed to **Phase 3
— Visual Design & Design System**: brand tokens (the gold-on-dark system), the component kit,
and hi-fi mockups of the key screens (including the 3–4 visual directions you asked for).

> **Next action:** review the wireframes (this doc + `brand/wireframes/*.svg`) → answer §8 →
> tell me to start Phase 3. Claude Code does not build from this yet — wireframes inform Phase
> 3 design first.
