# START HERE — RealFairTrust

This file tells you **where everything goes, who does what, and what to say to Claude Code
at each step.** When you're unsure what to do next, open this file and `CLAUDE.md`.

---

## 1. Who does what (important)

- **Claude in this planning chat (browser/app):** authors each **phase plan** (`.md` +
  branded `.docx`), the logos/visual directions, strategy, and reviews. Hands them to you.
- **Claude Code on the host (VS Code, Remote-SSH to `192.168.16.11`):** **places files,
  runs setup, manages git/GitHub/Vercel, and writes/executes the actual code** following the
  phase plans + `CLAUDE.md`, and updates `WORKLOG.md` after each session.

Rule of thumb: **planning & documents = ask the planning chat. Building & commands = tell
Claude Code.**

---

## 2. Where the files go

Put this whole kit at the repo root, `/projects/RealFairTrust/`, keeping these paths:

```
/projects/RealFairTrust/
├── CLAUDE.md                         ← repo root (Claude Code auto-reads this first)
├── START-HERE.md                     ← this file, repo root
├── brand/
│   └── logos/                        ← the chosen mark (C) + badge (B) + concepts
├── docs/
│   ├── DECISIONS.md                  ← locked choices (source of truth)
│   ├── WORKLOG.md                    ← running "what was done last" log
│   ├── SETUP.md                      ← infra runbook
│   ├── notes/
│   │   └── city-expansion.md
│   └── phases/
│       ├── PHASE-0-discovery-strategy.md   (+ .docx)
│       └── PHASE-1-...                      (added when Phase 1 is approved)
└── (the Next.js app files live here too, created during setup)
```

---

## 3. Do this next (in order)

### Step A — stand up the project (one time)
Open VS Code → Remote-SSH into `192.168.16.11` → open a terminal in `/projects`.
Then tell **Claude Code**:

> "Read `CLAUDE.md` and `START-HERE.md`. Then follow `docs/SETUP.md`: scaffold the Next.js
> app into `/projects/RealFairTrust`, copy these kit files into the matching paths, set
> Node via `.nvmrc`, `git init`, create a **private** GitHub repo, push `main`, create and
> push `develop`, and protect `main`. When done, append a `WORKLOG.md` entry and tell me
> what URLs/branches now exist."

> Note: scaffold first, then drop the kit files in (if `create-next-app` complains the
> folder isn't empty, scaffold in a temp dir and move the app files in — `SETUP.md` covers it).

### Step B — wire Vercel (can be now or just before launch)
Tell Claude Code (or do it in the Vercel UI): import the GitHub repo, add env vars, confirm
preview deployments appear per branch. Point the `realfairtrust` domain at it when going live.

### Step C — start Phase 1 (after you tell the planning chat to proceed)
Phase 1 (Information Architecture & Content) is authored in the **planning chat**, not by
Claude Code. Come back here and say: *"Proceed to Phase 1."* You'll receive
`PHASE-1-information-architecture.md` (+ `.docx`). Then hand it to Claude Code:

> "Phase 0 is approved and Phase 1 is attached at `docs/phases/PHASE-1-information-architecture.md`.
> Read it plus `CLAUDE.md` and `DECISIONS.md`. Do not write feature code yet — first
> confirm the sitemap and folder structure with me, then scaffold empty routes/pages per the
> IA behind feature flags. Update `WORKLOG.md`."

---

## 4. Where to find "the next step" at any time

1. Open **`CLAUDE.md`** → "Current status" line tells you the active phase + next action.
2. Open **`docs/WORKLOG.md`** → the top entry's "Next" + "Open / awaiting user" lists.
3. Open the current **`docs/phases/PHASE-N-*.md`** → its exit criteria tell you what
   "done" means for that phase.

---

## 5. Standing instructions for Claude Code (already in CLAUDE.md)

- Update `WORKLOG.md` at the end of every session.
- Log locked decisions in `DECISIONS.md`.
- Schema-first; additive migrations only; stable routes; feature flags.
- PT/EN parity; no hardcoded UI strings.
- Don't jump phases; ask before starting the next one.
