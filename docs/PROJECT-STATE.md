# RealFairTrust — PROJECT STATE (Master Snapshot)

> **Purpose.** Single orientation document for the project. If you are starting a **new planning chat** (claude.ai) or a **new Claude Code session** (VS Code), read this file first. It holds roles/workflow, locked decisions, the visual system, the **complete phase roadmap**, what is done, what is next, and what is still open. `docs/DECISIONS.md` and `docs/WORKLOG.md` on the machine remain authoritative for the full decision log and per-session history; this file is the high-level snapshot — **keep it in sync every session.**
>
> **Last updated:** 2026-06-22 (governance sync: zip = supreme authority #51; energy cert green #52 supersedes #49; AA/perf exceptions #53). Prior: 2026-06-21 (design hand-off adopted; #46–#50; roadmap consolidated).

---

## 0. STANDING BEHAVIORAL RULE (every chat + Claude Code session)

**Claude must never guess.** Do not answer without being **≥90% sure it is accurate**. If information, full context, or a clear understanding is missing, **ask clarifying questions first**. Only answer after researching as needed, reasoning carefully, having full context, and reaching ≥90% certainty. Verify product/tool/UI facts before asserting them. *(Set in Carlos's claude.ai Profile preferences for global effect, in this Project's memory, in the Project instructions box, and here + in `CLAUDE.md`.)*

---

## 1. ROLES & WORKFLOW

- **Planning chat (claude.ai):** authors PLAN docs (`.md` + branded `.docx`), decisions, logos, wireframes, visual specs, and the milestone **PROMPTS** Carlos pastes into Claude Code. **Cannot** access the remote machine.
- **Claude Code (VS Code, Remote-SSH → Linux `192.168.16.11`, repo `/projects/RealFairTrust`):** does **all** builds, git, GitHub, command execution. **Owns** `docs/WORKLOG.md` and the status sections of `CLAUDE.md`.
- **Handoff rule (Phase 4):** planning chat gives **PROMPTS ONLY** (no tarballs) to avoid overwriting `WORKLOG.md`. File transfers go via VS Code drag-drop or a contents-style tarball extracted **inside** `/projects/RealFairTrust`.
- **Documents → planning chat. Commands/code/git → Claude Code.**
- **Phase-gate discipline:** every phase ends with a **stop-and-ask** before the next. Each prompt reads the plan docs first, does the work, ends at a **GREEN build**, updates the docs, then stops.
- **Recommendation style:** single recommended path, not a menu, unless Carlos asks to compare.
- **Carlos** is in Lisbon, non-expert at git/devops — keep guidance plain, concrete, step-by-step.

**Docs on the machine:** `CLAUDE.md` (root, auto-read) · `docs/PROJECT-STATE.md` (this file) · `docs/DECISIONS.md` (authoritative log) · `docs/WORKLOG.md` (append-only, Claude Code owns) · `START-HERE.md` · `docs/phases/` · `docs/DESIGN-APPLY-PLAN.md` (created in design-apply step 1) · `design/handoff/` (the design system reference bundle).

---

## 2. PRODUCT

**RealFairTrust** — bilingual (PT primary / EN secondary) **merit-based real-estate marketplace** for Portugal, launching **city-limited to Lisboa + Porto**. Connects clients with consultants, differentiated by a **performance rating engine**: rolling **90-day** window, **recomputed monthly**, **per-opportunity normalization**; **Rising Talent** board for consultants <6 months; scores as **badges + "building track record"** until statistically confident, then a number (#18); weights **satisfaction 35 / close-rate 25 / response 15 / lead-conversion 15 / opportunities 10** (#11). Brand = **Real · Fair · Trust**. Clients free; revenue = commission + optional agent **Pro** subscription. Agent + admin accounts first; clients browse without an account.

---

## 3. TECH STACK (LOCKED)

Next.js App Router (scaffold **Next 16.2.6**) · React 19 · TypeScript strict · Tailwind CSS 4 · Framer Motion · next-intl (PT default) · Supabase (Phase 5) · React Hook Form + Zod · pnpm · **Node 22 via nvm / `.nvmrc`** · Radix only for Dialog/Dropdown/Tabs/Select (#36) · **icons: `lucide-react` (#47)** · **fonts: Fraunces + Inter via `next/font/google` (#48)**.
GitHub: `github.com/TakeItoCloud/RealFairTrust` (private). Branches: `main → develop → feat/*`.

---

## 4. DECISIONS (LOCKED) — summary of `docs/DECISIONS.md`

**#1–#45** (see `docs/DECISIONS.md` for full text). Highlights: name + Lisboa/Porto launch; commission + Pro subscription; rating rolling-90/monthly/per-opportunity + Rising Talent; weights 35/25/15/15/10; **#12** logo Concept C "Verified Roofline" = primary mark, Concept B "Trust Seal" = in-product verified badge; **#15** PT primary/EN secondary; **#18** badge-until-confident; **#20** seeded listings flagged `isDemo`; **#22** consultant slug; **#32** Fraunces + Inter; **#34** verified-green is verification-only; **#36** Radix scope; **#37** Framer Motion subtle/reduced-motion-safe; **#40** ~12 consultants/~24 listings; **#41** Phase 4 greenlit; **#45** finalized visual system (now superseded in detail by the design hand-off, #46). *(Note: **#34** verification-only is relaxed by **#52** — green also denotes the energy cert.)*

**Logged #46–#50:**
- **#46 — Design hand-off adopted.** The "RealFairTrust Design System" bundle (`design/handoff/`) is the **authoritative visual spec**, superseding earlier ad-hoc mockups. It is the fully-specified form of #45 (same navy/gold/Fraunces+Inter system) plus the ivory light section, the gold bright/calm split, the full token set, and the Framer-Motion interaction spec.
- **#47 — Icons: `lucide-react`** (2px stroke), replacing inline SVGs.
- **#48 — Fonts via `next/font/google`** (Fraunces + Inter); self-hosting woff2 optional later.
- **#49 — ~~PropertyCard energy certificate stays NEUTRAL/muted~~ SUPERSEDED by #52** (energy cert now renders green per the zip).
- **#50 — Token reconciliation done carefully** (alias old→new or migrate references) to keep the build green with least churn.

**Governance sync (2026-06-22), logged as #51–#53:**
- **#51 — DESIGN AUTHORITY (supremacy rule).** The Claude Design export (`design/handoff/`) is the **supreme authority for all visual/design values**, superseding any conflicting prior decision — **except** where the zip's literal value damages **WCAG AA** or **performance**, in which case the AA/perf-safe deviation is retained and documented (#53). When the zip self-contradicts, its `README.md` wins.
- **#52 — Energy cert renders GREEN** per the zip (EU/PT energy-label convention). **Supersedes #49; explicit exception to #34** — verified-green is no longer verification-exclusive. Implemented in run-order Step 4.
- **#53 — AA/perf exceptions retained under #51** (ratios measured, not estimated): **(a)** ivory label gold **#8C5E12** (5.32:1; zip's #d19e1d = 2.30:1, fail); **(b)** verified-ink-on-light **#157048** (5.22:1 on the real badge bg; supersedes the interim #1E8F62 = 3.48:1 fail and the zip's #2f9a6c = 3.01:1; token swap Step 3); **(c)** fonts via `next/font/google` (#48), not the zip `@import`; **(d)** type scale per the zip README (hero 72 / section 40), not the bundle's `typography.css` (hero 76).

**Design-apply implementation decisions, logged as #54–#56:**
- **#54 — Radius scale adopted project-wide** (Step 3): `rounded-sm`=6 · `rounded-md`=14 (was 10) · `rounded-lg`=20 (was 16), via re-pointing `--rft-r-*` → `--radius-*`; form wells pin `--radius-sm` (10), cards keep `--card-radius` (22).
- **#55 — Icon layer = `lucide-react` re-export shim** (implements #47): `components/ui/icons.tsx` keeps the `Icon*` names as thin lucide wrappers (2px stroke, currentColor) so consumers are unchanged; inline SVGs removed.
- **#56 — Home section rhythm canonical** (Step 5/6): **N·I·N·N·I·N·N** — Hero navy · HowItWorks ivory · Top consultants navy · Featured navy · Clients/consultants split ivory · Trust navy · Join CTA navy. Keeps the dark-first brand (#33); card showcases stay on the navy stage.

---

## 5. FULL PHASE ROADMAP & STATUS (nothing dropped)

| Phase | Scope | Status |
|---|---|---|
| 0–3 | Brand, strategy, IA, design groundwork | ✅ APPROVED / LOCKED |
| **4** | **Build public site + UI shells** | 🟡 IN PROGRESS |
| 5 | Supabase integration (replace mock data layer; auth; real data; wire rating engine) | ⬜ Not started |
| 6 | Launch (domain `realfairtrust.com`, Vercel production, SEO, analytics) | ⬜ Not started |

### Phase 4 milestones (full list — kept intact)
- **4.0 Foundations** — ✅ DONE (PR #4). Types + repository (Supabase-swap-ready) + typed seed + next-intl scaffolding + base layout.
- **4.1 Primitives** — ✅ DONE (PR #5). 16 `components/ui/` primitives + `/dev/primitives`. *(Revisited in design-apply step 3.)*
- **4.2 Composite components** — ✅ DONE (PR #6). Header/Footer/ConsultantCard/PropertyCard/ScoreBreakdown/FilterBar/LeadForm/ReviewItem/Pagination/CookieBanner/Modal/Toast + `/dev/components`. *(Revisited in design-apply steps 3–4.)*
- **4.3 Public pages** — 🟡 IN PROGRESS (PR #7 **MERGED** → banked to `develop`; promoted to `main`):
  - ✅ Home (`/[locale]`) *(section-variety applied — design-apply step 5)*
  - ✅ Consultores (`/[locale]/consultores`)
  - ✅ **Design-System Application sub-phase — COMPLETE (run order 1→6 done; see §6).** Consultant profile page re-skinned onto the finalized system (step 6).
  - ⬜ **Remaining 4.3 pages (NEXT):** Buy/Rent (`/comprar`, `/arrendar`), Property detail (`/imovel/[id]`), Vender, static pages.
- **4.4 App shells** — ⬜ TODO. Dashboard, admin, auth — **UI-only** (#39).
- **4.5 Polish** — ⬜ TODO. Real imagery (hero + property photos), PT/EN copy pass, accessibility, performance, responsive QA, motion polish.

---

## 6. DESIGN-SYSTEM APPLICATION (run order 1 → 6) — ✅ COMPLETE (2026-06-22; banked to `develop` + promoted to `main` 2026-06-23)

Reconciled the codebase to the adopted design hand-off (#46). Each step = one green-gated Claude Code prompt. **All six steps done; build green; AA verified.** Authoritative detail: `docs/DESIGN-APPLY-PLAN.md` §3 (all ✅) + the 2026-06-22 `docs/WORKLOG.md` entries.

1. ✅ **Review + reconciliation plan** → `docs/DESIGN-APPLY-PLAN.md`.
2. ✅ **Tokens** — hand-off token layer (additive, aliased); `lucide-react` added; fonts via `next/font/google`.
3. ✅ **Primitives** — Button/Card/StatBlock/RankBadge/Badge/Tag/Avatar to spec; radius remap (#54); lucide shim (#55); verified-ink #157048 (#53).
4. ✅ **Cards** — ConsultantCard "Spotlight" + PropertyCard "Editorial Overlay" on translucent surfaces + Framer Motion; **energy cert GREEN (#52, supersedes #49)**.
5. ✅ **Home section variety** — `.rft-ivory` breaks + navy alternation (rhythm #56); muted .58; warm hairline.
6. ✅ **Consultant profile page** (`/[locale]/consultores/[slug]`) re-skinned onto the finalized system: header (seal + 38px gold merit, #18), ScoreBreakdown Card (+weights #16), about, listings as PropertyCards, reviews + Diogo 0-review empty state, inline/sticky LeadForm (#28), `getConsultant(slug)` + `notFound()`.

**NEXT (per §5):** the **remaining 4.3 pages** (Buy/Rent, Property detail, Vender, static) → **4.4 shells** → **4.5 polish** → **Phase 5 (Supabase)** → **Phase 6 (launch)**.

**Prompts 2–6 are authored by the planning chat *after* Prompt 1's gap analysis comes back** (so they reference the real, reconciled code rather than guesses).

### Prompt 1 (paste into a fresh Claude Code session, after the design bundle is on the machine)
```
Read CLAUDE.md, docs/PROJECT-STATE.md, docs/DECISIONS.md, and the latest docs/WORKLOG.md
entries first. Follow the behavioral rule in CLAUDE.md §0 (never guess; if <90% sure, ask).

The design hand-off bundle is at design/RealFairTrust_Design_System.zip. Unzip it into
design/handoff/ and strip the trailing ".txt" from the component files so they read as
.jsx/.d.ts/.html. These are spec/reference only — do NOT ship them.

CONFIRMED DECISIONS (do not re-ask):
 (a) adopt lucide-react as the icon library;
 (b) load Fraunces + Inter via next/font/google (not the bundle's @import);
 (c) PropertyCard energy cert renders NEUTRAL/muted — OVERRIDE the hand-off's verified-green;
     green is verification only (DECISIONS #34/#49);
 (d) reconcile token names carefully to keep the build green with least churn.

GOAL OF THIS SESSION: produce a reconciliation plan only — NO changes to app code yet.

1. Read the hand-off fully: design/handoff/README.md, all design/handoff/reference/tokens/*.css,
   and the component specs under design/handoff/reference/components/**. README values are
   authoritative for design.
2. Compare against the current codebase: the token files (e.g. app/design-tokens.css,
   app/globals.css), the font setup, components/ui/*, the Header/Footer wordmark, and the card
   components (ConsultantCard, PropertyCard). Locate exact paths yourself.
3. Write docs/DESIGN-APPLY-PLAN.md containing:
   - A token-by-token diff: which hand-off tokens already exist (matching #45), which are new
     (ivory light section, gold "calm" button gradient + bright/calm split, full
     spacing/shadow/blur/motion scale, StatBlock, RankBadge specifics), and any name mismatches.
   - The chosen naming-reconciliation strategy (alias vs migrate), picked for least churn + green.
   - A phased checklist with a Status column mapping to run-order steps 2–6:
     Step2 Tokens · Step3 Primitives · Step4 Cards · Step5 Home section variety · Step6 Profile page.
   - Confirmation that decisions (a)–(d) above are reflected in the plan.
4. Do NOT edit app code/tokens/components yet. Append a dated docs/WORKLOG.md entry. Create
   branch chore/design-apply-plan off the current branch, commit the plan doc + the extracted
   design/handoff/ reference, push, and STOP. Report the diff summary. Do not open a PR.
```

---

## 7. VISUAL SYSTEM (authoritative source: `design/handoff/`, #46)

**LOCKED:**
- **Background:** sapphire-navy radial `radial-gradient(ellipse 90% 70% at 50% 30%, #122a4f, #0a1a34, #060f22, #020812)`, fixed.
- **Palette family (only these):** black/near-black, blues with gradients, gold (solid + gradient), grey, white/ivory.
- **Gold, two roles:** **bright** title gradient `linear-gradient(180deg,#ffe6a0,#ffd86e,#e3a812)` for titles/prices/merit numerals; **calm/luxe** button gradient `linear-gradient(160deg,#ffe79e,#f4c95c,#dca233)` — deeper/warmer so it never competes. **Rule: one bright-gold focal point per view.** Eyebrows = flat solid gold (`#e3a812` on navy / **`#8C5E12` on ivory** — AA exception #53; the zip's `#d19e1d` fails at 2.30:1).
- **Warm ivory light section** (`--ivory #fbf8f2`, `.rft-ivory`) for section variety; ink text `#1c2942`.
- **Verified green** (`#3fb984`) = success/verification — **plus the PropertyCard energy cert** (green now denotes energy rating too; #52, exception to #34). Verified-ink-on-light = **`#157048`** (AA exception #53; supersedes the interim #1E8F62 which failed at 3.48:1).
- **Type:** Fraunces (display/titles/prices) + Inter (body/UI). Hero 72 / section 40 / subsection 26 / lead 20 / body 16 / meta 13 / eyebrow 12 (0.2em, uppercase) / button 15.
- **Tri-tone wordmark:** Real `#F5F1EA` · Fair = title-gold gradient · Trust `#8A93A3` (on ivory, Real/Trust switch to dark ink).
- **Cards:** ConsultantCard "Spotlight" (data-forward, merit score 38px gold, RankBadge coin, ringed avatar, verified pill, stats row, gold-hairline footer "Ver perfil →"); PropertyCard "Editorial Overlay" (220px media, scrim, frosted deal + gold demo chips, 30px gold price on image, spec row, agent mini-row "Ver detalhe →"; **energy cert GREEN per the zip (EU/PT convention; #52, supersedes #49, exception to #34)**). Card tokens: radius 22 / media 14 / pad 26 / lift -4 (-5 media) / img-zoom 1.06 / dur-img 500ms / accent-bar / overlay-scrim / plate-bg.
- **Motion (Framer Motion, reduced-motion-safe):** ease-out `cubic-bezier(0.22,0.61,0.36,1)`; entrance opacity+y, stagger 60–80ms; hover lift + accent-bar `scaleX 0→1` + score glow + image zoom; press `y+1`. No bounce, no loops.
- **Icons:** `lucide-react`, 2px stroke (#47). **Fonts:** `next/font/google` (#48).
- **Design authority (#51):** the zip is supreme for all visual values, except where its literal damages WCAG AA / perf. **Retained AA/perf exceptions (#53):** ivory label `#8C5E12`, verified-ink-on-light `#157048`, fonts via `next/font/google` (not the zip `@import`), type scale per the zip README (hero 72, not the bundle's 76). Everything else defers to the zip.

**Token files (bundle):** `tokens/{colors,typography,spacing,effects,fonts,base}.css` + `styles.css` manifest. Demos: `card-redesign.html`, `gold-system.html`.

**Superseded / rejected:** the six alternate non-navy palettes (teal/sage/terracotta/forest/petrol/charcoal) were REJECTED; the ad-hoc homepage mockup is SUPERSEDED by the hand-off.

---

## 8. DONE / IN PROGRESS / NEXT / TODO

- **DONE:** Phases 0–3; Phase 4.0/4.1/4.2; Phase 4.3 Home + Consultores; design hand-off adopted (#46–#50); governance sync (#51–#53); **design-system application run order 1→6 COMPLETE (#54–#56)** — tokens → primitives → cards → Home variety → profile re-skin, all green + AA; **banked to `develop` (PR #7 merged, merge commit `3d91a99`)**.
- **IN PROGRESS:** — (between sub-phases; design-apply complete and promoted).
- **NEXT:** remaining 4.3 pages (Buy/Rent `/comprar` + `/arrendar`, Property detail `/imovel/[id]`, Vender, static pages).
- **TODO (after 4.3):** 4.4 shells → 4.5 polish → Phase 5 (Supabase) → Phase 6 (launch).

---

## 9. OPEN QUESTIONS

- Demo imagery: source a small set of licensed/warm-toned property photos + a hero image before 4.5 polish (cards/hero only fully land with real images). Not blocking steps 1–6.
- Vercel connection (one-time) — optional now; only needed for preview URLs; not blocking.

---

## 10. HOW TO RESUME (zero drift)

**New planning chat (inside the Project):** the Project instructions + this file (in Project knowledge) load automatically. Say:
> "Read PROJECT-STATE.md. We're on the design-system application (§6). Confirm the run order and the confirmed decisions, then help me drive steps 1→6 by authoring Claude Code prompts. Follow §0 (never guess)."

**New Claude Code session:** it auto-reads `CLAUDE.md`. Then say:
> "Read docs/PROJECT-STATE.md, docs/DECISIONS.md, docs/DESIGN-APPLY-PLAN.md (if present), and the latest docs/WORKLOG.md. Confirm current branch + phase, then wait for my instruction. Follow CLAUDE.md §0."

**Keep this file current:** update it at the end of any session that changes scope/decisions/status, then re-upload it to the Project knowledge (Project knowledge is a static snapshot — it does not auto-sync with the repo).

### Project instructions (reference copy — paste this into the Project's instructions box)
```
This project is RealFairTrust — a bilingual (PT/EN) merit-based real-estate marketplace for
Lisbon & Porto. Before doing anything, read PROJECT-STATE.md in this project's knowledge: it
holds roles/workflow, locked decisions, the visual system, the full phase roadmap, what's done,
what's next, and what's open. Treat it as the source of truth; don't contradict it without
flagging.

Behavioral rule: never guess. Don't answer unless >=90% sure it's accurate. If you lack
information, full context, or a clear understanding, ask clarifying questions first. Verify
product/tool/UI facts before stating them.

Workflow: this planning chat authors plans, decisions, visual specs, and copy-paste prompts for
Claude Code; Claude Code (on the remote machine) does all builds/git. Keep phase-gate discipline
— stop and confirm before each new phase. Current work = the design-system application, run
order 1->6 in PROJECT-STATE.md section 6; after that, the remaining 4.3 pages, then 4.4 shells,
4.5 polish, Phase 5 (Supabase), Phase 6 (launch).
```
