# Project: Freed — Men's Mental Health (Anonymous Share & Support)

**Tagline:** Heal from the things you don't talk about.

This document describes the project for OpenCode so it can generate and modify the codebase correctly. Commit this file to Git.

---

## What this app is

A **mobile-first web app** where men can:

1. **Post** what they're struggling with (mental health, relationships, work) **anonymously** — no account, no email.
2. **Browse** a public feed of recent posts and open any thread.
3. **Reply** to posts anonymously with encouragement or advice.
4. **Return** to their post via a stable link (Copy link after posting).
5. **Report** posts or replies that break guidelines; reports go to a moderation queue.
6. **Read** community guidelines and crisis info (988).

**Tagline:** Heal from the things you don't talk about.

---

## Tech stack (use this)

- **Frontend:** React 18 + Vite + TypeScript. Mobile-first CSS (or Tailwind).
- **Backend / DB:** Supabase (Postgres + auto REST API). No auth required for post/reply/report.
- **Routing:** React Router. Routes: `/` (feed), `/post` (new post), `/thread/:id` (thread), `/post/success` (after post), `/guidelines`, `/privacy`.
- **Hosting:** Vite build; deploy to Vercel or Netlify. Env: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.

---

## Data model (Supabase)

- **posts:** id (uuid), body (text, 10–500 chars), tag (optional: relationships | work | general), created_at, hidden (boolean, for moderation).
- **replies:** id, post_id, body (text, 10–1000 chars), created_at, hidden.
- **reports:** id, target_type ('post' | 'reply'), target_id (uuid), reason (text), created_at.

No user_id or email. Anonymous only. RLS: allow anonymous SELECT (where hidden = false) and INSERT for posts, replies, reports.

---

## Pages and behavior

1. **Landing / Feed (`/`):** App name **Freed** and tagline: **"Heal from the things you don't talk about."** "How it works" (3 steps), list of posts (preview + link to `/thread/:id`). Empty state: "No posts yet. Be the first to share — you're anonymous." + CTA to /post.
2. **New post (`/post`):** One text area (body), optional tag dropdown, link to guidelines, submit → create post → redirect to `/post/success?id=<post_id>`.
3. **Post success (`/post/success`):** "Your post is live. Save this link to check back for replies." [Copy link] [Open thread]. Show 988 crisis line.
4. **Thread (`/thread/:id`):** Full post + list of replies (chronological) + reply form. Report on post and each reply (reason dropdown → submit). Empty replies: "No replies yet. Check back soon — or add the first supportive reply."
5. **Guidelines (`/guidelines`):** Static content — what's OK / not OK, report, crisis (988).
6. **Privacy (`/privacy`):** Short policy — what we store, we don't sell data, how moderation works.

---

## States to implement

- **Loading:** Skeleton or spinner for feed and thread.
- **Error (submit):** "Something went wrong. Try again." + retry.
- **Error (network):** "No connection. Check your network and try again."
- **Success (reply):** "Thanks for supporting someone." + stay on thread.
- **Report submitted:** "Thanks, we'll review."

Footer on main pages: "If you're in crisis, reach out: 988" (link to 988).

---

## Conventions

- Use functional components and hooks. TypeScript for types (Post, Reply, Report).
- Fetch with Supabase client (`createClient` with anon key). No auth.
- Forms: controlled inputs, trim and validate length before submit.
- Thread URL must be stable: `/thread/:id` with post id. After post, redirect to success and pass id so we can show Copy link with full URL.
- Mobile-first: single column, touch-friendly, readable font size.
- No user profiles, no login, no search in MVP. No images/video. Text only.

## React best practices (this project)

When writing React code for this app, follow **REACT-BEST-PRACTICES.md** in this folder. Key rules: derive state during render where possible; use functional setState when state depends on previous state; lazy state init for expensive initial values; put submit and one-off logic in event handlers, not state + effect; explicit conditional rendering (e.g. `count > 0 ? count : null`); loading/error/empty state for every async UI; direct imports for heavy libs. Full checklist and details are in REACT-BEST-PRACTICES.md.

---

## Files to create (suggested structure)

All app code lives under **`app/`**. Paths below are relative to `app/`.

```
app/
  src/
    App.tsx                 # Router, layout, footer (988)
    main.tsx
    index.css               # Mobile-first base styles
    pages/
      Feed.tsx, PostNew.tsx, PostSuccess.tsx, Thread.tsx, Guidelines.tsx, Privacy.tsx
    components/
      PostCard.tsx, ReplyList.tsx, ReplyForm.tsx, ReportButton.tsx
    lib/
      supabase.ts           # createClient
    types/
      index.ts              # Post, Reply, Report types
  index.html
  package.json
  vite.config.ts
  supabase/migrations/
```

---

## Out of scope (MVP)

- Real-time chat, DMs, 1:1 matching
- User accounts, profiles, karma
- Search, filters, categories (beyond optional tag)
- Images, video, voice
- Notifications, "Your posts" list
- Moderation UI (backend only: set hidden via Supabase dashboard or script)
- Payments, experts

---

## Reference

- **Brand:** `BRAND.md` — App name Freed and tagline.
- Full technical spec: `TECHNICAL-SPEC.md`
- Build prompt: `BUILD-PROMPT.md`
- Guidelines copy: `GUIDELINES-COPY.md`
- **React best practices (this app):** `REACT-BEST-PRACTICES.md`
