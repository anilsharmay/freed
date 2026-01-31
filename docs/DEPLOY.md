# Deploy Freed

The app is a static Vite build. Deploy to **Vercel** or **Netlify** and set your Supabase env vars.

---

## Prerequisites

- Supabase project set up and schema applied (see [SUPABASE-SETUP.md](SUPABASE-SETUP.md)).
- Code in a Git repo (GitHub, GitLab, or Bitbucket) so the host can build from it.

---

## Option A — Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (e.g. with GitHub).
2. **Add New** → **Project** and import your Freed repo.
3. Set **Root Directory** to **`app`** (so Vite builds from the app folder).
4. Leave **Framework Preset** as Vite (or “Other”). Vercel will detect the build.
5. **Environment Variables** — add:
   - `VITE_SUPABASE_URL` = your Supabase project URL  
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon public key  
6. **Deploy**.

**SPA routing:** `app/vercel.json` is set so all routes serve `index.html`; React Router will work for `/thread/:id`, `/post`, etc.

---

## Option B — Netlify

1. Go to [netlify.com](https://netlify.com) and sign in (e.g. with GitHub).
2. **Add new site** → **Import an existing project** and connect your Freed repo.
3. Build settings:
   - **Base directory:** `app`
   - **Build command:** `npm run build`
   - **Publish directory:** `dist` (relative to `app`)
4. **Site settings** → **Environment variables** — add:
   - `VITE_SUPABASE_URL` = your Supabase project URL  
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon public key  
5. **Deploy site** (or trigger a new deploy).

**SPA routing:** `app/netlify.toml` (and `app/public/_redirects`) send all routes to `index.html` so React Router works.

---

## After deploy

1. Open the site URL (e.g. `https://your-project.vercel.app` or `https://your-site.netlify.app`).
2. Test: feed, new post, copy link, open thread, reply, report, guidelines, privacy.
3. **Copy link** on the success page will use the deployed URL; no extra config needed if the app uses `window.location.origin` (or the host’s URL) for the thread link.

---

## Env vars reminder

Both hosts need:

| Variable | Where to get it |
|----------|------------------|
| `VITE_SUPABASE_URL` | Supabase Dashboard → Project Settings → API → Project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase Dashboard → Project Settings → API → anon public key |

Redeploy after changing env vars.
