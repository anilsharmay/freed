-- Freed app: posts, replies, reports (anonymous only)
-- Run this in Supabase Dashboard → SQL Editor → New query

-- Table: posts
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  body text not null check (char_length(trim(body)) >= 10 and char_length(body) <= 500),
  tag text check (tag is null or tag in ('relationships', 'work', 'general')),
  created_at timestamptz not null default now(),
  hidden boolean not null default false
);

-- Table: replies
create table if not exists public.replies (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  body text not null check (char_length(trim(body)) >= 10 and char_length(body) <= 1000),
  created_at timestamptz not null default now(),
  hidden boolean not null default false
);

create index if not exists replies_post_id_idx on public.replies(post_id);

-- Table: reports
create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  target_type text not null check (target_type in ('post', 'reply')),
  target_id uuid not null,
  reason text not null,
  created_at timestamptz not null default now()
);

-- Row Level Security
alter table public.posts enable row level security;
alter table public.replies enable row level security;
alter table public.reports enable row level security;

-- Anonymous read: only non-hidden posts
create policy "posts_select_visible"
  on public.posts for select
  to anon
  using (hidden = false);

-- Anonymous insert: create post (no auth)
create policy "posts_insert_anon"
  on public.posts for insert
  to anon
  with check (true);

-- Anonymous read: only non-hidden replies
create policy "replies_select_visible"
  on public.replies for select
  to anon
  using (hidden = false);

-- Anonymous insert: create reply
create policy "replies_insert_anon"
  on public.replies for insert
  to anon
  with check (true);

-- Anonymous insert: create report (moderators use service role to read)
create policy "reports_insert_anon"
  on public.reports for insert
  to anon
  with check (true);
