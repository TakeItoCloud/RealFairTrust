# Phase 0 — Discovery & Strategy

**Project:** RealFairTrust · Merit-based real estate marketplace (Portugal, PT/EN)
**Phase goal:** Define *why* this product exists, *who* it serves, *what* the MVP is, and
the rules for the one feature that makes it different — before any structure or code is built.
**Status:** Draft for sign-off · 2026-05-28

> This is the foundation document. Every later phase (IA, wireframes, design, build,
> backend) inherits its decisions from here. Read it, challenge it, then approve it.

---

## 1. Why Phase 0 exists

The previous build (codename "Agentra") was visually strong but became "a pitch deck in
code": no defined page purposes, no content model, no backend, and a half-wired i18n
system with two competing app trees. The root cause was building before deciding. Phase 0
fixes that by locking strategy first. Nothing here is code — it is the brief a studio
would sign off with a client before touching a layout.

**Phase 0 defines:** vision & positioning · audiences · MVP scope · business model · the
performance-rating engine · the listings sequencing plan · competitive differentiation ·
success metrics · the decisions that must be settled before Phase 1.

---

## 2. Vision & positioning

**Mission.** Make choosing a real estate consultant as transparent and merit-driven as
choosing any top-rated professional should be — fair to clients *and* to agents.

**Positioning statement.** *For clients who don't know which agent to trust, and for
consultants who are tired of being judged by tenure or marketing budget, RealFairTrust is
a real estate marketplace where consultant performance is measured fairly, refreshed
regularly, and shown openly — so the best work wins, this month and every month.*

**The "key" (the single load-bearing idea).** A **periodic, fair performance rating
engine** (full spec in §6). Everything else — listings, profiles, lead capture, the
commission model — hangs off the credibility this engine creates.

**Differentiators**
1. **Merit over volume.** Agents ranked on quality per opportunity, not lifetime deal count.
2. **A race that resets.** Rolling 90-day window recomputed monthly, so newcomers can reach
   the top and incumbents must keep earning it.
3. **Fairness for newcomers.** A dedicated "Rising Talent" track and per-opportunity scoring.
4. **Transparency to clients.** Public, consistent performance signals (rating, close rate,
   response time, specialization) presented in a comparable format.
5. **Generous, performance-linked economics for agents.** Progressive commission split plus
   optional Pro tools — visibility is earned, not bought.

**Mindset / brand character.** Earned trust, not claimed trust. Calm, premium, and
data-honest. We openly label what is verified vs. preview, and we never fake signals.

---

## 3. Audiences

| Audience | Goal | What they need from us |
|----------|------|------------------------|
| **Buyers** | Find a home + a trustworthy agent | Browse listings, compare agents fairly, contact one |
| **Sellers** | Sell with confidence | Reach a high-performing local agent; request a listing |
| **Renters** | Find a rental + reliable agent | Browse rentals, contact an agent |
| **Consultants (agents)** | Win clients on merit; grow | Visible ranking, fair scoring, lead flow, tools, good split |
| **Admin (us)** | Curate quality + integrity | Onboarding approval, moderation, oversight of the rating engine |

**Launch focus:** city-limited to **Lisbon + Porto** (to confirm). Depth in two markets
beats thin national coverage at launch.

---

## 4. MVP scope

**In v1 (must exist to launch):**
- Public marketing site (home with hero, how-it-works, value props) — PT/EN.
- **Consultant discovery**: searchable/filterable list + **consultant detail page** (the key
  conversion page — not a stub this time).
- **Property listings**: browse buy/rent + **property detail page** (read-only first).
- **Client "sell / rent with us" lead form** (lead capture — light, ships early).
- **Agent onboarding + auth**; **agent dashboard** to manage profile and listings.
- **Admin**: approve agents, moderate, basic oversight.
- The **performance rating engine** (v1 inputs; verification gating phased in later).
- Legal/compliance: cookie consent, privacy policy, terms (GDPR — required in PT/EU).

**Deferred (designed-for now, built later):**
- Client accounts, saved searches, favorites, in-app messaging.
- Verified-transaction gating of reviews + full anti-abuse moderation.
- Payments/subscription billing, analytics suite, advanced admin.

**Out of scope (for now):** mortgage tools, mobile apps, CRM integrations.

---

## 5. Business & revenue model

- **Commission split** — RealFairTrust retains a margin on consultant transactions
  (progressive split rewards sustained performance). *Exact percentages are
  contract-defined and territory/campaign-dependent — not fixed in code.*
- **Optional agent "Pro" subscription** — advanced tools (analytics, enhanced profile,
  lead routing). Free tier always available.
- **Clients are always free.**

> **To define before monetization (Phase 7):** the actual split tiers, Pro price/feature
> split, and any compliance around commission disclosure in Portugal.

---

## 6. The performance rating engine (the crown jewel)

This is the product. It must be **fair, legible, and hard to game**.

### 6.1 Time model — why periodic
A lifetime cumulative score compounds tenure: after a year, new agents can't catch
veterans, and the leaderboard ossifies. Instead:

> **Recommendation (locked):** a **rolling 90-day window, recomputed monthly.** Each agent's
> score reflects roughly the last quarter of work, refreshed on the 1st of each month. This
> keeps the race live (top agents must keep performing) while smoothing out single-month
> noise. A *hard monthly reset* (each calendar month from zero) was considered but rejected:
> too volatile, punishes a quiet month too harshly, and a slow-closing sale could span the
> boundary unfairly.

### 6.2 Inputs (signals) — proposed weighting
Scored **per opportunity handled**, not by raw volume, so a new agent with 5 great
outcomes can outrank a busy agent with mediocre ones.

| Signal | What it measures | Indicative weight |
|--------|------------------|-------------------|
| Client satisfaction (rating) | Quality of service | 35% |
| Close / success rate | Outcomes per opportunity | 25% |
| Responsiveness | Time-to-first-response, follow-through | 15% |
| Conversion | Lead → engaged client | 15% |
| Activity sufficiency | Enough data to be statistically fair | 10% |

> **To define:** exact formulas, the minimum sample size before a public score shows, and
> how to present "not enough data yet" without penalizing brand-new agents.

### 6.3 Fairness for newcomers
- **"Rising Talent" board** — a parallel ranking for consultants active **< 6 months**, so
  they're discoverable and motivated before they have a full 90-day record.
- **Per-opportunity normalization** (above) so quality, not quantity, drives rank.
- **Confidence handling** — low-sample agents show a "new / building track record" state
  rather than a misleadingly high or low number.

### 6.4 Integrity (anti-gaming) — phased
- **v1:** reviews tied to a genuine client interaction; basic rate-limiting; admin moderation.
- **Phase 2+:** **verified-transaction gating** (a review counts only after a confirmed
  closing event), eligibility windows for feedback, and automated anti-abuse controls.

### 6.5 How "best" is shown to clients (fair to both sides)
Beyond a single leaderboard number, surface multiple honest views so clients judge in
context and agents aren't reduced to one figure:
- **City + specialization filtered rankings** (an agent strong in Porto rentals shows there).
- **Badges**: "Top this month", "High conversion", "Rising Talent", "Verified".
- **A clear methodology page** explaining how scores are built (trust through transparency).
- **Agent-facing analytics + resources** so they can see exactly how to improve — turning
  the system into coaching, not just judging.

> **Open design question for you:** do you also want a non-ranked "match" mode (client
> describes need → we suggest fitting agents) alongside the leaderboard, to avoid a pure
> winner-take-all dynamic? *Recommendation: yes, add it in Phase 2 — it spreads opportunity
> and reads as fairer.*

---

## 7. Listings — how & when (without breaking earlier work)

Listings are **in the MVP**, but built in a safe internal order. The safeguards that make
later steps non-destructive:

- **Schema-first:** the full `properties` model is defined in Phase 1/5 even before the UI
  to manage it exists. Later DB changes are **additive only**.
- **Stable routes:** `/comprar`, `/arrendar`, `/vender`, `/imovel/[id]` are reserved in the
  sitemap from Phase 1 and never move.
- **Feature flags:** a route can exist but be toggled off until its data/flow is ready.

**Build order (each step additive):**
1. Data model + routes reserved (Phase 1/5).
2. Browse + **property detail** pages, read-only (can run on seed data first).
3. **Client sell/rent lead form** — light, ships early; no dependency on the listing CMS.
4. **Agent create/manage-listing CMS** — built right after agent auth (Phase 5).

Result: nothing is deferred *out* of v1; it's ordered *within* it, and no later phase
rewrites an earlier one.

---

## 8. Competitive landscape & differentiation

| Player | Model | Where RealFairTrust differs |
|--------|-------|-----------------------------|
| Idealista / Imovirtual / Casa Sapo (PT portals) | Listing-first; agents interchangeable | Consultant-first; agents ranked on fair, visible merit |
| Traditional agencies | Brand/tenure-based trust | Earned, refreshed, transparent performance signals |
| Agent-network brokerages (KW, eXp, etc.) | Agent recruitment + split | Public client-facing merit ranking + marketplace, not just a brokerage back-office |

**Defensible wedge:** the fair, periodic, transparent rating engine — a model that is
hard to copy credibly without rebuilding trust from scratch.

---

## 9. Success metrics (what "working" looks like)

- **Supply:** # approved consultants in Lisbon + Porto; % with a complete profile.
- **Trust:** # client-verified reviews; rating coverage across active agents.
- **Demand:** consultant profile views; lead-form submissions; lead → agent contact rate.
- **Fairness (health check):** rank mobility month-over-month (are newcomers reaching the
  top?); share of leads going to Rising Talent agents.
- **Listings:** # active listings; property-detail views; sell/rent lead conversions.

> **To define:** target numbers per metric for the first 90 days post-launch.

---

## 10. Tech & infrastructure (summary)

Stack locked: Next.js 15 (App Router) · React 19 · TypeScript strict · Tailwind 4 ·
Framer Motion · next-intl (PT/EN) · Supabase (Postgres/Auth/Storage) · React Hook Form +
Zod · **pnpm**. Dev host `192.168.16.11:/projects/RealFairTrust`; GitHub origin; branch
model `main`→`develop`→`feat/*`/`docs/*`; **Vercel** deploy with per-branch previews; two
Supabase projects (dev/prod). Full steps in `docs/SETUP.md`.

---

## 11. Risks & mitigations

| Risk | Mitigation |
|------|------------|
| Cold-start: no agents → no value | Hand-curate first Lisbon/Porto agents; Rising Talent board |
| Rating gamed / unfair | Per-opportunity scoring; phased verification + moderation |
| Scope creep re-creates "pitch deck" problem | Phase gates + this document as the contract |
| Listings added late break things | Schema-first + additive migrations + stable routes (§7) |
| GDPR / legal exposure | Compliance pages + consent in MVP, not after launch |

---

## 12. Decisions still needed before Phase 1

Each has my recommendation — confirm or adjust.

1. **Launch cities** — *Rec: Lisbon + Porto.*
2. **Domain TLD** — *Rec: realfairtrust.com (primary) + .pt (redirect).* Which do you own?
3. **Logo concept** — pick A / B / C / D (*my lean: C, Verified Roofline*).
4. **Rating: confirm** rolling-90/monthly, the signal weights in §6.2, and whether to add
   the "match" mode (§6.5) — *Rec: confirm all; add match mode in Phase 2.*
5. **Listing source** — agents only at launch, or also direct owners later? *Rec: agents
   only at launch; revisit owner-direct in a later phase.*
6. **Default language on first visit** — geo/browser-based, defaulting to PT? *Rec: yes.*

---

## 13. Phase 0 exit criteria (sign-off)

Phase 0 is complete when: the vision/positioning is approved, the MVP scope is agreed, the
rating-engine model is confirmed, the logo is chosen, and items in §12 are answered. On
sign-off we proceed to **Phase 1 — Information Architecture & Content** (sitemap, page
purposes, content model, user flows).

> **Next action:** review this doc → pick a logo → answer §12 → tell me to start Phase 1.
