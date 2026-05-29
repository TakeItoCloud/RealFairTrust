# Worklog — RealFairTrust

> Append a new entry at the **top** at the end of every working session.
> Format: date · phase · what was done · what changed · what's next.
> Newest entry first.

---

## 2026-05-29 · Setup — Project scaffolded, git + GitHub initialized

**Done**
- Installed Node 22 (via nvm) + pnpm 11 (via corepack). Pinned Node to `22` in `.nvmrc`.
- Scaffolded Next.js 16 app (TypeScript, Tailwind 4, ESLint, App Router, no `src/` dir,
  import alias `@/*`, package manager pnpm) into `/projects/RealFairTrust/`.
- Copied kit files to repo root: `CLAUDE.md`, `START-HERE.md`, `docs/`, `brand/`.
- `git init` → initial commit `chore: project kickoff (phase 0 docs, brand, scaffolding)`.
- Created **private** GitHub repo: https://github.com/TakeItoCloud/RealFairTrust
- Pushed `main`; created and pushed `develop`.
- Branch protection on `main` could not be applied via API — requires GitHub Pro for
  private repos. Apply manually: Settings → Branches → Add rule → require PR, no direct push.

**Open / awaiting user**
- Enable branch protection on `main` in GitHub (free plan: do it in the UI under Settings →
  Branches, or upgrade to GitHub Pro).
- Wire Vercel: import https://github.com/TakeItoCloud/RealFairTrust, add env vars, confirm
  preview deployments appear per branch.
- Confirm domain TLD owned (realfairtrust.com / .pt) before Vercel domain step.
- User go-ahead to begin **Phase 1 (IA & Content)** in the planning chat.

**Next**
- On "Proceed to Phase 1": author `docs/phases/PHASE-1-information-architecture.md` (+ .docx)
  — sitemap, page purposes, content model, user flows. Then hand to Claude Code to scaffold
  empty routes behind feature flags.

---

## 2026-05-29 · Phase 0 — APPROVED + handoff prepared

**Done**
- Locked remaining decisions: logo = Concept C primary + Concept B as "Verified" badge;
  cities Lisbon + Porto; listings agents-only at launch; language PT primary / EN secondary;
  rating weights 35/25/15/15/10 confirmed. (See `DECISIONS.md` #12–17.)
- Added `docs/notes/city-expansion.md` (how to add cities without code changes).
- Added `START-HERE.md` (file placement, who-does-what, and the exact prompts for Claude Code).
- Updated `CLAUDE.md` status to "Phase 0 APPROVED".

**Open / awaiting user**
- User go-ahead to begin **Phase 1 (IA & Content)** in the planning chat.
- Confirm domain TLD owned (realfairtrust.com / .pt) before Vercel domain step.

**Next**
- On "Proceed to Phase 1": author `docs/phases/PHASE-1-information-architecture.md` (+ .docx)
  — sitemap, page purposes, content model, user flows. Then hand to Claude Code to scaffold
  empty routes behind feature flags.

---

## 2026-05-28 · Phase 0 — Discovery & Strategy (kickoff)

**Done**
- Created fresh project skeleton (`docs/`, `docs/phases/`, `brand/logos/`).
- Locked project decisions from kickoff Q&A (see `DECISIONS.md`).
- Authored `CLAUDE.md` (master brief) and this worklog.
- Drafted **Phase 0 — Discovery & Strategy** (`docs/phases/PHASE-0-discovery-strategy.md`)
  + branded Word version.
- Produced 4 logo concepts + comparison sheet in `brand/logos/`.
- Defined listings-sequencing strategy (schema-first, additive, feature-flagged) so
  property listings ship inside the MVP without breaking earlier work.
- Wrote infrastructure runbook (`docs/SETUP.md`): remote host, GitHub, branches, Vercel.

**Changed**
- Brand name finalized: **RealFairTrust** (was "Agentra" in the old prototype).

**Open / awaiting user**
- Pick a logo concept (A / B / C / D).
- Approve Phase 0 to proceed to Phase 1 (IA & Content).
- Confirm launch cities (assumed Lisbon + Porto) and domain TLD (e.g. realfairtrust.com / .pt).

**Next**
- On approval: scaffold the Next.js project on the remote host, init git + GitHub, then
  begin Phase 1 (sitemap, page purposes, content model, user flows).
