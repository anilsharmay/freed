# How to test Freed

Run the app locally and walk through the main flows.

---

## 1. Start the app

```bash
# From the app folder
cd app
npm install
npm run dev
```

Open the URL Vite prints (usually **http://localhost:5173**).

**If the feed shows "No connection" or errors:** check that **`app/.env`** has your real Supabase values:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Restart the dev server after changing `.env`.

---

## 2. What to test

### Feed and empty state

- **/** — You should see "Freed", tagline, "How it works", and either "No posts yet. Be the first to share — you're anonymous." (if DB is empty) or a list of post previews.
- Click **Post** (or go to `/post`) to open the new-post form.

### Create a post

- **/post** — Enter 10–500 characters in the text area, optionally pick a tag (Relationships / Work / General).
- Submit. You should be redirected to **/post/success** with the message "Your post is live. Save this link to check back for replies."
- Click **Copy link**, then **Open thread**. The URL should be `/thread/<post_id>`.

### Thread and reply

- **/thread/:id** — You should see the full post and either "No replies yet…" or existing replies.
- Type 10–1000 characters in the reply box and submit. You should see "Thanks for supporting someone." and the new reply in the list.

### Report

- On a thread page, click **Report** on the post or on a reply.
- Choose a reason (e.g. Spam, Harassment, Other) and submit. You should see "Thanks, we'll review."
- In Supabase: **Table Editor** → `reports` — the new row should appear.

### Static pages

- **/guidelines** — Community guidelines and crisis (988) info.
- **/privacy** — Short privacy policy.

### Crisis line

- Footer on main pages and on post-success should say "If you're in crisis, reach out: 988" with a link.

---

## 3. Production-like build (optional)

```bash
cd app
npm run build
npm run preview
```

Open the URL from `preview` (e.g. http://localhost:4173) and run through the same flows.

---

## 4. Quick checklist

| Flow | What to do | Expected |
|------|------------|----------|
| Feed | Open `/` | Freed + tagline + feed or empty state |
| New post | `/post` → submit | Redirect to success, Copy link works |
| Thread | Open thread from feed or success | Post + replies, reply form works |
| Reply | Submit reply on thread | "Thanks for supporting someone.", reply appears |
| Report | Report on post/reply | "Thanks, we'll review."; row in `reports` |
| Guidelines | `/guidelines` | Static content + 988 |
| Privacy | `/privacy` | Privacy policy |
| Network error | Turn off network, submit | "No connection…" or similar |
