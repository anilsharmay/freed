# React Best Practices — Men's Mental Health App

Apply these rules when writing or generating **React** code for this project (React 18 + Vite + TypeScript + Supabase). Sourced from [Vercel agent-skills react-best-practices](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices); tailored for this stack (no Next.js/RSC).

---

## When to apply

- Writing or editing components, hooks, or pages
- Implementing data fetching (Supabase client)
- Handling loading, error, and empty states
- Form state and submit handlers

---

## Rules to follow

### 1. State and rendering
- **Derive state during render** — If a value can be computed from props/state, don’t store it in state or sync in an effect. Compute it in render (e.g. `fullName = firstName + ' ' + lastName`).
- **Functional setState** — When new state depends on previous state, use the functional form: `setItems(curr => [...curr, newItem])` to avoid stale closures.
- **Lazy state initialization** — For expensive initial state (e.g. from localStorage, or building a structure), use `useState(() => computeInitial())` so it runs once, not every render.
- **Explicit conditional rendering** — Use `count > 0 ? count : null` (or similar) so you don’t render `0` or `NaN` when you mean “hide this.”

### 2. Effects and handlers
- **Put interaction logic in event handlers** — Don’t model “on submit” as state + effect; do the submit and side effects inside the submit handler.
- **Narrow effect dependencies** — Depend on primitives (e.g. `id`) instead of whole objects when possible.
- **No barrel imports for heavy libs** — Import directly from source (e.g. icons, UI libs) to keep bundle small. For this MVP, prefer minimal deps.

### 3. Data fetching (Supabase)
- **Loading / error / empty states** — Every async UI (feed, thread, submit) must have: loading (skeleton or spinner), error (message + retry), and empty (helpful message + CTA where relevant).
- **Don’t block layout on one fetch** — If you add multiple data sources later, fetch in parallel (e.g. start all requests, then await together) instead of sequential awaits.

### 4. Forms and validation
- **Controlled inputs** — Use controlled components; trim and validate length (post 10–500, reply 10–1000) before submit.
- **Submit in the handler** — Call Supabase insert in the form submit handler; show success/error there. Don’t drive submit via state + effect.

### 5. Components and structure
- **Functional components and hooks** — No class components. TypeScript for props and state types (Post, Reply, etc.).
- **Mobile-first** — Single column, touch-friendly targets, readable font size. No layout shift when loading → content.

### 6. Performance (for this app)
- **Avoid unnecessary re-renders** — Keep state minimal; derive values in render. Use `useRef` for values that don’t need to trigger re-render (e.g. transient UI state).
- **List rendering** — Use a stable `key` (e.g. `id`). For long lists later, consider `content-visibility: auto` or virtualization; not required for MVP.

---

## Quick checklist for generated code

- [ ] No derived state stored in state or synced in effects; compute in render.
- [ ] setState that depends on previous state uses functional updates.
- [ ] Expensive initial state uses lazy init: `useState(() => ...)`.
- [ ] Conditionals that can be 0/NaN use explicit ternary (e.g. `x > 0 ? x : null`).
- [ ] Submit and other one-off actions are in event handlers, not state + effect.
- [ ] Every async UI has loading, error, and (where relevant) empty state.
- [ ] Forms are controlled; validation (length, trim) before submit.
- [ ] Direct imports for any heavy libs; minimal dependencies for MVP.

---

## Full reference

For the complete rule set (40+ rules, including Next.js/RSC): [Vercel agent-skills react-best-practices — AGENTS.md](https://raw.githubusercontent.com/vercel-labs/agent-skills/main/skills/react-best-practices/AGENTS.md). This file is a subset for this project’s stack.
