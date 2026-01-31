# Deploy Freed to Netlify

Deploy the Freed app to **Netlify** from your **GitHub** repo. The app is a static Vite build; Netlify will run the build and serve the output.

---

## Prerequisites

- Supabase project set up and schema applied (see [SUPABASE-SETUP.md](SUPABASE-SETUP.md)).
- Freed repo on GitHub (e.g. `anilsharmay/freed`). Netlify will build from this repo.

---

## Deploy from GitHub

1. Go to [netlify.com](https://netlify.com) and sign in (e.g. with GitHub).
2. **Add new site** → **Import an existing project**.
3. Choose **GitHub** and authorize Netlify if needed. Select the **freed** repository.
4. Configure build settings:
   - **Base directory:** `app`  
     (Netlify will run commands from this folder.)
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`  
     (Relative to the base directory, so the built site is `app/dist`.)
5. **Environment variables** (expand “Environment variables” or add them in **Site settings** → **Environment variables** after the first deploy):
   - `VITE_SUPABASE_URL` = your Supabase project URL  
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon public key  
6. Click **Deploy site**.

Netlify will clone the repo, run `npm install` and `npm run build` inside `app/`, and publish the contents of `app/dist`. SPA routing is handled by `app/netlify.toml` and `app/public/_redirects` (all routes → `index.html`), so React Router works for `/thread/:id`, `/post`, etc.

---

## After deploy

1. Open your site URL (e.g. `https://your-site-name.netlify.app`).
2. Test: feed, new post, copy link, open thread, reply, report, guidelines, privacy.
3. **Copy link** on the success page uses the deployed URL automatically (`window.location.origin`).

To use a custom domain, go to **Site settings** → **Domain management** and add your domain.

---

## Env vars

| Variable | Where to get it |
|----------|------------------|
| `VITE_SUPABASE_URL` | Supabase Dashboard → Project Settings → API → Project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase Dashboard → Project Settings → API → anon public key |

Redeploy after changing env vars (**Deploys** → **Trigger deploy** → **Deploy site**).
