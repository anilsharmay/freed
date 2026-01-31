# Technical Spec — Men's Mental Health Webapp (MVP)

Use this for implementation with OpenCode/Gemini. Keep scope to MVP only.

---

## 1. Stack

| Layer | Choice | Notes |
|-------|--------|--------|
| **Frontend** | React 18 + Vite + TypeScript | Mobile-first, no auth UI in MVP. |
| **Styling** | CSS (or Tailwind if preferred) | Responsive, readable font size, clear focus states. |
| **Backend / DB** | Supabase | Postgres + auto REST API; no auth required for anonymous post/reply. |
| **Hosting** | Vercel or Netlify | Vite build; env for Supabase URL + anon key. |

Alternative: Firebase (Firestore + anonymous optional) instead of Supabase. Same product behavior.

---

## 2. Data model (Supabase/Postgres)

### Table: `posts`

| Column | Type | Constraints |
|--------|------|--------------|
| id | uuid | PK, default gen_random_uuid() |
| body | text | NOT NULL, length 10–500 |
| tag | text | NULL or one of: 'relationships', 'work', 'general' |
| created_at | timestamptz | NOT NULL, default now() |
| hidden | boolean | NOT NULL, default false (for moderation) |

- No user_id or email. Fully anonymous.
- Public list: `WHERE hidden = false ORDER BY created_at DESC`.

### Table: `replies`

| Column | Type | Constraints |
|--------|------|--------------|
| id | uuid | PK, default gen_random_uuid() |
| post_id | uuid | NOT NULL, FK posts(id) ON DELETE CASCADE |
| body | text | NOT NULL, length 10–1000 |
| created_at | timestamptz | NOT NULL, default now() |
| hidden | boolean | NOT NULL, default false |

- Public list per post: `WHERE post_id = $1 AND hidden = false ORDER BY created_at ASC` (or DESC).

### Table: `reports`

| Column | Type | Constraints |
|--------|------|--------------|
| id | uuid | PK, default gen_random_uuid() |
| target_type | text | NOT NULL, 'post' or 'reply' |
| target_id | uuid | NOT NULL |
| reason | text | NOT NULL, e.g. 'spam', 'harassment', 'other' |
| created_at | timestamptz | NOT NULL, default now() |

- For moderation queue: list reports with target_type, target_id, reason; moderator hides post/reply by setting `hidden = true`.

### Row Level Security (Supabase)

- Enable RLS on all tables.
- Anonymous read: allow SELECT where `hidden = false` for posts and replies.
- Anonymous write: allow INSERT for posts, replies, reports (no auth).
- No UPDATE/DELETE for anonymous users. Moderation: use service role or a simple admin view with auth.

---

## 3. API / usage (Supabase client)

Use Supabase client in the frontend with anon key. No sign-in.

| Action | Method | Table / usage |
|--------|--------|----------------|
| List posts (feed) | GET | `from('posts').select('id, body, tag, created_at').eq('hidden', false).order('created_at', { ascending: false })` |
| Get one post | GET | `from('posts').select('*').eq('id', id).eq('hidden', false).single()` |
| Create post | POST | `from('posts').insert({ body, tag })` |
| List replies | GET | `from('replies').select('*').eq('post_id', postId).eq('hidden', false).order('created_at', { ascending: true })` |
| Create reply | POST | `from('replies').insert({ post_id, body })` |
| Create report | POST | `from('reports').insert({ target_type, target_id, reason })` |

Return created post (with id) so the frontend can build the thread URL and show "Copy link."

---

## 4. Routes (frontend)

| Route | Screen | Notes |
|-------|--------|--------|
| / | Landing + Feed | App name Freed, tagline "Heal from the things you don't talk about," "How it works," list of posts (preview), CTA to post. |
| /post | New post form | One text area (body), optional tag dropdown, link to guidelines, submit. |
| /thread/:id | Thread | Full post + replies + reply form + report on post and each reply. |
| /post/success | Post success | "Your post is live. Save this link to check back for replies." [Copy link] [Open thread]. |
| /guidelines | Guidelines | Static content from GUIDELINES-COPY.md. |
| /privacy | Privacy | Short policy: what we store, we don’t sell data, how moderation works. |

Use React Router (or similar). Thread URL must be stable: `/thread/:id` with post id.

---

## 5. UI states and copy

| State | Where | Copy / behavior |
|-------|--------|------------------|
| Empty feed | / | "No posts yet. Be the first to share — you're anonymous." + button to /post. |
| Empty thread | /thread/:id | "No replies yet. Check back soon — or add the first supportive reply." |
| Loading | Feed, thread | Skeleton or spinner. |
| Error (submit) | Post form, reply form | "Something went wrong. Try again." + retry. |
| Error (network) | Any | "No connection. Check your network and try again." |
| Success (post) | /post/success | "Your post is live. Save this link to check back for replies." [Copy link] [Open thread]. |
| Success (reply) | After reply submit | "Thanks for supporting someone." + stay on thread. |
| Report | Modal | Reason dropdown (Spam, Harassment, Other) → Submit → "Thanks, we'll review." |

Crisis: In footer and on post-success screen: "If you're in crisis, reach out: 988" (link to 988lifeline.org or equivalent).

---

## 6. Validation

- Post body: 10–500 characters, trim.
- Reply body: 10–1000 characters, trim.
- Tag: optional, one of relationships | work | general.

---

## 7. Moderation (MVP)

- No public moderation UI in MVP.
- Backend: use Supabase dashboard or a small admin script to list `reports` and set `posts.hidden` or `replies.hidden` to true.
- Optional later: simple auth-protected admin page that lists reports and toggles hidden.

---

## 8. Environment

- `VITE_SUPABASE_URL` (or equivalent)
- `VITE_SUPABASE_ANON_KEY`

No auth required for anonymous post/reply/report.
