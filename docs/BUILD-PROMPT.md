# Build prompt — paste this into OpenCode to generate the webapp

Copy everything below the line into OpenCode (with Gemini 3 Flash). If the project already has AGENTS.md and TECHNICAL-SPEC.md, follow those; otherwise use the details in this prompt.

---

Build a **mobile-first web app** for anonymous men's mental health peer support. **App name:** Freed. **Tagline (use on landing):** "Heal from the things you don't talk about." Users can post what they're struggling with (no account), browse a feed, open threads, and reply anonymously. They get a stable link after posting to check back for replies. There is a report flow and community guidelines; crisis line (988) in footer.

**Stack to use:**
- Frontend: React 18 + Vite + TypeScript. Mobile-first CSS (or Tailwind).
- Backend/DB: Supabase (Postgres). Use the Supabase client with anon key; no auth for posting or replying.
- Routing: React Router.

**Data model (Supabase tables):**
- **posts:** id (uuid, PK), body (text, 10–500 chars), tag (optional: 'relationships' | 'work' | 'general'), created_at (timestamptz), hidden (boolean, default false).
- **replies:** id (uuid, PK), post_id (uuid, FK posts), body (text, 10–1000 chars), created_at, hidden (boolean, default false).
- **reports:** id (uuid, PK), target_type (text: 'post' | 'reply'), target_id (uuid), reason (text), created_at.

Enable RLS: allow anonymous SELECT where hidden = false for posts and replies; allow anonymous INSERT for posts, replies, reports. No UPDATE/DELETE for anonymous users.

**Routes and pages:**
1. **`/` (Feed):** Landing with app name **Freed** and tagline **"Heal from the things you don't talk about."** Short "How it works" (Post → Others reply → You read when ready). List recent posts (preview + link to `/thread/:id`). Empty state: "No posts yet. Be the first to share — you're anonymous." + button to /post. Footer: "If you're in crisis, reach out: 988" (link to 988).
2. **`/post` (New post):** One text area for body (max 500 chars), optional tag dropdown (Relationships, Work, General), link to /guidelines, submit button. On submit: insert post via Supabase, redirect to `/post/success?id=<post_id>`.
3. **`/post/success`:** Read id from query. Copy: "Your post is live. Save this link to check back for replies." [Copy link] button (copies full thread URL to clipboard), [Open thread] button (navigate to `/thread/:id`). Show crisis line: "If you're in crisis, reach out: 988."
4. **`/thread/:id`:** Fetch post (if hidden or not found, show not found). Show full post. List replies (chronological). Empty: "No replies yet. Check back soon — or add the first supportive reply." Reply form: one text area (max 1000 chars), submit. On submit: insert reply, show "Thanks for supporting someone." Report button on post and on each reply: open modal with reason dropdown (Spam, Harassment, Other), submit → insert into reports, show "Thanks, we'll review."
5. **`/guidelines`:** Static page. Title "Community guidelines." Content: We're here for anonymous peer support. OK: sharing what's on your mind, giving supportive advice, being respectful. Not OK: harassment, hate, solicitation, doxxing. Use Report if something's wrong. Crisis: 988.
6. **`/privacy`:** Short privacy policy: we store posts and replies anonymously, we don't sell data, we review reports and may hide content; link to guidelines.

**States to implement:**
- Loading: skeleton or spinner for feed and thread.
- Error on submit (post/reply): "Something went wrong. Try again." + retry.
- Network error: "No connection. Check your network and try again."
- Report modal: reason → submit → "Thanks, we'll review."

**Behavior:**
- No signup, no login. All actions anonymous.
- Thread URL is stable: `https://<origin>/thread/<post_id>`. After posting, success page must build this URL for Copy link.
- Validate body length before submit (post 10–500, reply 10–1000). Trim whitespace.
- Use Supabase client: `createClient(url, anonKey)`. Env vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`. Create a `.env.example` with these two keys (no real values).

**File structure (suggested):**
- `src/App.tsx` — Router and layout (footer with 988).
- `src/pages/Feed.tsx`, `PostNew.tsx`, `PostSuccess.tsx`, `Thread.tsx`, `Guidelines.tsx`, `Privacy.tsx`.
- `src/components/PostCard.tsx` (feed preview), reply list and form, ReportButton (modal).
- `src/lib/supabase.ts` — createClient.
- `src/types/index.ts` — Post, Reply types (id, body, tag?, created_at, etc.).

**Out of scope for this build:** User accounts, profiles, search, images, notifications, "Your posts" list, moderation UI (only report storage). Keep it to the above.

**React best practices (apply when writing components and data fetching):** Follow REACT-BEST-PRACTICES.md in this folder. In short: derive state during render; use functional setState when new state depends on previous state; lazy state init for expensive initial values; put submit and one-off logic in event handlers, not state + effect; explicit conditionals for values that can be 0/NaN (e.g. `count > 0 ? count : null`); loading, error, and empty state for every async UI; direct imports for heavy libs; controlled forms with validation before submit.

Please create the full project: Vite + React + TypeScript, Supabase client, all routes and components, env example, and the three Supabase tables (with RLS) described above. Use functional components and TypeScript. Mobile-first layout. Apply the React best practices above so the generated code is maintainable and performant.
