> **STATUS: DRAFT — for discussion, not decided.** This document captures early design thinking about how the Phase 5 rating engine would source each signal's data. Nothing here is locked. Open questions at the end must be answered before this becomes an effective plan.

# Rating Engine — Data Sourcing Notes (DRAFT)

## Framing
This is Phase 5 product/data-model design, deferred from Phase 0 ("exact formulas, minimum
sample size — to define"). It is design thinking to preserve, not a decision to lock.

## The core split: passive vs. response-dependent signals
Three of the five signals can be measured passively from platform events, with no client
cooperation. Two depend on an action completing (a review submitted, a deal closing) — those
are where the hard problems live.

### Response (15%) — easy, IF the contact channel is owned
Measurable only if first contact goes through RealFairTrust and the consultant replies through
RealFairTrust. If the conversation moves to phone/WhatsApp, we are blind. Requirement: the lead
form creates a timestamped lead event; the consultant's first response happens in-platform (an
in-app message, or at minimum a "mark as contacted" action). Time-to-first-response = response
timestamp − lead timestamp. DESIGN CONSEQUENCE: Phase 5 needs an in-platform messaging or
lead-inbox mechanism in the consultant dashboard, or Response is unmeasurable.

### Conversion (15%) — passively measurable but definitionally slippery
Leads → engaged clients. "Lead" is capturable (form submission). "Engaged client" is the
problem: which event marks it? Self-reported by the consultant is gameable. Realistic v1: an
observable milestone the platform controls (e.g. a booked viewing, or a lead actively worked
vs. ignored). Likely the weakest-defined signal until transactions flow; flag for redefinition
after real data.

### Activity (10%) — passively measurable; really a confidence gate
Not "reward busy agents" — it measures "enough data for a fair measurement." It is the
denominator that makes the other signals trustworthy. Count opportunities handled (leads +
active listings + viewings) in the 90-day window. Low activity → low confidence → "building
track record." Straightforward: it is counting platform events.

### Close rate (25%) — needs a "closing" to exist as data
The actual close (escritura) happens at a notary, off-platform. Three options, ascending
reliability/cost:
1. Consultant self-reports the close — cheap, immediate, gameable.
2. Client confirms the close (review flow doubles as close-confirmation) — better, depends on
   client responding.
3. Verified-transaction gating — the close counts only when tied to a confirmed event, ideally
   the COMMISSION RECORD. Because RealFairTrust takes a commission split, we have a financial
   record of real closes. That commission event is ground truth and our strongest anti-gaming
   asset — it already exists in the business model. When money flows to RealFairTrust, a real
   transaction happened.

### Satisfaction (35%) — biggest weight, depends on clients responding to a form
The hardest problem, carrying the most weight. Real-estate review response rates are typically
low. Three distinct dangers, each needing its own mechanism:

- Danger 1 — Small samples lie. A 2-review 5★ consultant is not better than a 40-review 4.6★
  one. Mechanism: confidence-gating (already Decision #18) + BAYESIAN SHRINKAGE — pull
  low-sample scores toward the platform mean until enough reviews accumulate. Standard technique
  ("true Bayesian estimate" rankings). Recommended as the satisfaction aggregation method.
- Danger 2 — Response bias. Responders skew to extremes; middle experiences go unrecorded.
  Cannot be fully fixed without higher response rates, but response rates can be raised: trigger
  the request at the emotional peak (right after close/keys-handover), keep it short
  (four dimensions, one screen, mobile-first), tie it to the transaction, consider a
  non-corrupting incentive (a draw, not pay-per-review which buys positive bias).
- Danger 3 — Silence is ambiguous. 30 opportunities, 1 review: bad service or non-responsive
  clients? Unknowable from satisfaction alone. This is WHY the other four signals exist and why
  satisfaction, despite 35% weight, is never the whole story. Response time and close rate are
  measured from our events regardless of whether the client ever fills a form. A consultant who
  never gets reviews but responds fast and closes well still scores on 65% of the model. The
  multi-signal design is itself the defence against review non-response.

## Recommended to lock now (cheap, prevents rework) — STILL TO BE CONFIRMED
- The commission event is the ground-truth close signal. Design the Phase 5 schema so a
  Transaction can be created from / linked to a commission record.
- Response requires an in-platform first-contact touchpoint (lead-inbox / "mark contacted").
  Affects the dashboard build, so decide before building it.
- Satisfaction uses Bayesian shrinkage + confidence-gating, not raw averages.
- Review requests fire at the close moment, triggered by the close event.

## Explicitly deferred (needs real data to define well)
- Exact conversion definition (what event = "engaged"). Ship provisional, expect to revise.
- The confidence thresholds (already deferred, Decision #88).
- Anti-gaming rate limits and anomaly detection (Phase 2+ of the engine, already planned).

## Honest caveat
These recommendations reflect how ranking/reputation systems are generally built. Current
Portuguese real-estate review benchmarks and specific platform numbers were NOT verified; no
response-rate figure is asserted. The STRUCTURE is robust regardless of exact numbers: passive
signals carry the model when reviews are sparse; commission = ground-truth close; Bayesian
shrinkage for satisfaction. The numbers themselves come from the first real cohort.

## OPEN QUESTIONS — must be answered before this is an effective plan
1. Is there an in-platform messaging / lead-inbox planned for Phase 5, or is contact assumed to
   happen off-platform? (Pivotal — determines whether Response 15% is measurable at all.)
2. What observable event defines a "converted / engaged" client for Conversion 15%?
3. Confirm the commission record can serve as the close ground-truth, and how it links to a
   Transaction in the schema.
4. Which anti-gaming controls are v1 vs. later?
5. Review-request mechanics: timing trigger, form length, incentive (if any)?
6. Confirm Bayesian shrinkage as the satisfaction aggregation method, and set (later) the
   thresholds.
