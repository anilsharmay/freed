# Freed — Men's Mental Health (Anonymous Share & Support)

Heal from the things you don't talk about.

---

## About this project

This project was an experiment in AI-assisted product development: an **idea-to-prod** pipeline from concept to deployed app.

**Pipeline:** Idea → MVP scoping → MVP PRD → Spec → Build → Deploy

**Tools and references used:**

- **[Awesome PM Skills](https://github.com/menkesu/awesome-pm-skills)** — 28 AI-powered PM skills from Lenny's Podcast transcripts (scoping, build decisions, ship decisions).
- **[Vercel React Best Practices](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/SKILL.md)** — React/Next.js performance and patterns used when writing components and data fetching.
- **Cursor** — IDE with AI assistance.
- **OpenCode** — TUI + custom `/build-app` command to generate the app from specs.
- **Gemini 3 Flash** — Model used for generation (via Google provider).

---

This repo is split into:

- **`app/`** — The web app (Vite + React + TypeScript, Supabase). Run and deploy from here.
- **`docs/`** — Product and project docs (specs, OpenCode collateral, setup guides).
- **Root** — Repo entry point: this README, OpenCode config (`opencode.json`, `.opencode/`).

---

## What's where

| Path | Purpose |
|------|--------|
| **README.md** | This file — repo layout and links. |
| **opencode.json** | OpenCode config (model, instructions pointing at `docs/`). |
| **.opencode/commands/** | OpenCode custom command `/build-app`. |
| **app/** | Web app: `src/`, `package.json`, Vite/TS config, Supabase migrations, deploy config. |
| **docs/AGENTS.md** | Project context for OpenCode (stack, data model, conventions). |
| **docs/BUILD-PROMPT.md** | Main prompt to generate or extend the app. |
| **docs/TECHNICAL-SPEC.md** | Data model, API, routes, copy. |
| **docs/BRAND.md** | App name Freed and tagline. |
| **docs/GUIDELINES-COPY.md** | Community guidelines (copy into app UI). |
| **docs/REACT-BEST-PRACTICES.md** | React practices for this app. |
| **docs/SUPABASE-SETUP.md** | How to create the Supabase database. |
| **docs/TESTING.md** | How to run and test the app locally. |
| **docs/DEPLOY.md** | How to deploy to Netlify from GitHub. |

---

## Run the app

```bash
cd app
npm install
npm run dev
```

Create **`app/.env`** with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (see [docs/SUPABASE-SETUP.md](docs/SUPABASE-SETUP.md)). If you had a `.env` at repo root, copy it to `app/.env`.

---

## Database (Supabase)

[docs/SUPABASE-SETUP.md](docs/SUPABASE-SETUP.md) — Create a project, run the SQL in **`app/supabase/migrations/001_initial_schema.sql`**, then set env vars in **`app/.env`**.

---

## Testing

[docs/TESTING.md](docs/TESTING.md) — Run from **`app/`**: `npm install`, `npm run dev`, then walk through feed, post, thread, reply, and report.

---

## Deploy

[docs/DEPLOY.md](docs/DEPLOY.md) — Deploy the **`app/`** folder to Netlify from GitHub (base directory `app`, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`).

---

## OpenCode (generate or modify app)

1. Run `opencode` (or `opencode .`) in the **repo root** (where `opencode.json` and `docs/` live).
2. Inside the TUI, type **`/build-app`** (do not run `opencode /build-app` in the terminal).
3. Instructions and specs are in **`docs/`**; the app code lives in **`app/`**.

See **docs/AGENTS.md** and **docs/BUILD-PROMPT.md** for full context.
