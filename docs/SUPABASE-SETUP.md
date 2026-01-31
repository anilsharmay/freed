# Supabase database setup for Freed

Create the database and tables using the Supabase Dashboard (no CLI required).

---

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and sign in.
2. Click **New project**.
3. Pick an organization, name the project (e.g. `freed`), set a database password, choose a region, then **Create new project**.
4. Wait for the project to finish provisioning.

---

## 2. Run the schema migration

1. In the project, open **SQL Editor** (left sidebar).
2. Click **New query**.
3. Open the file **`app/supabase/migrations/001_initial_schema.sql`** in this repo and copy its full contents.
4. Paste into the SQL Editor and click **Run** (or press Cmd/Ctrl+Enter).

You should see “Success. No rows returned.” That creates the `posts`, `replies`, and `reports` tables and their RLS policies.

---

## 3. Get your URL and anon key

1. Go to **Project Settings** (gear icon) → **API**.
2. Copy:
   - **Project URL** → use as `VITE_SUPABASE_URL`
   - **Project API keys** → **anon public** → use as `VITE_SUPABASE_ANON_KEY`

---

## 4. Configure the app

In **`app/`**, create a `.env` file (or copy from `app/.env.example`):

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace with your actual Project URL and anon key. Restart the dev server after changing `.env`.

---

## 5. Moderation (optional)

- To hide a post or reply: in Supabase go to **Table Editor** → `posts` or `replies` → find the row → set **hidden** to `true`.
- To review reports: **Table Editor** → `reports`. Use `target_type` and `target_id` to find the post/reply, then set `hidden = true` on that row in `posts` or `replies`.

No UPDATE/DELETE is allowed for anonymous users; only the service role (or dashboard) can change `hidden`.
