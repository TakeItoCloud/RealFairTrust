# Setup Runbook — RealFairTrust

Run these on the remote Linux host. Claude Code (in VS Code, connected to the host via
Remote-SSH) can execute them for you. **Nothing here can be done from the planning
chat** — it needs shell + GitHub + Vercel access on the machine.

## 0. Prerequisites (one-time, on the host)

```bash
# Node via nvm (pin an LTS, e.g. 20)
nvm install 20 && nvm use 20
corepack enable            # enables pnpm
pnpm -v                    # verify
git --version
gh --version               # GitHub CLI (optional but recommended)
```

## 1. Create the project

```bash
mkdir -p /projects && cd /projects
# Scaffold (we will tune config in Phase 4)
pnpm create next-app@latest RealFairTrust \
  --ts --tailwind --eslint --app --src-dir=false --import-alias "@/*"
cd RealFairTrust
echo "20" > .nvmrc
```

Then copy the planning files from this kit into the repo:
`CLAUDE.md`, `docs/`, `brand/`.

## 2. Git + GitHub

```bash
git init
git add -A && git commit -m "chore: project kickoff (phase 0 docs, brand, scaffolding)"

# Create the GitHub repo (private) and push
gh repo create RealFairTrust --private --source=. --remote=origin --push
# (or create it in the GitHub UI and: git remote add origin <url>; git push -u origin main)
```

### Branch model

```
main      # protected, production. Only merged via PR.
develop   # integration branch. Phase work merges here first.
feat/*    # one branch per feature  (e.g. feat/rating-engine)
docs/*    # documentation-only work (e.g. docs/phase-1-ia)
```

```bash
git branch develop && git push -u origin develop
# protect main in GitHub: Settings → Branches → add rule (require PR, no direct pushes)
```

Use **conventional commits**: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`.

## 3. Supabase (two projects)

- Create a **dev** and a **prod** project at supabase.com.
- Keep schema in `supabase/migrations/` (committed). Apply with the Supabase CLI.
- Put keys in `.env.local` (git-ignored). Never commit secrets.

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...   # server only
```

## 4. Vercel (deploy — later phase, wire early)

- Import the GitHub repo into Vercel.
- Vercel auto-creates a **preview deployment for every branch/PR** — use these to sign
  off each phase visually. `main` maps to **production**.
- Add the same env vars in Vercel (Production = prod Supabase; Preview = dev Supabase).
- Point the **RealFairTrust** domain at Vercel when ready to go live.

## Notes

- The host mainly serves as the dev environment + git origin mirror is GitHub; Vercel
  builds from GitHub, so you do not deploy from the host directly.
- If the host has no public IP, Vercel still works (it pulls from GitHub, not the host).
