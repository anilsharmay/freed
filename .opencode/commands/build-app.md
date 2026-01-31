---
description: Build the full men's mental health webapp (OpenCode + Gemini Flash 3)
agent: build
model: google/gemini-3-flash-preview
---
Read and follow the instructions in @docs/BUILD-PROMPT.md to create the full webapp.

Implement everything described there: Vite + React + TypeScript, Supabase (posts, replies, reports tables + RLS), all routes (Feed, Post, PostSuccess, Thread, Guidelines, Privacy), components, loading/error/success states, report flow, and crisis line (988) in the footer. Use docs/AGENTS.md and docs/TECHNICAL-SPEC.md for project context and data model if present. Apply React best practices from docs/REACT-BEST-PRACTICES.md when writing components and data fetching (derive state in render, functional setState, lazy init, event-handler logic, loading/error/empty states, explicit conditionals).

Create the complete project structure in app/, env example in app/, and ensure the app is mobile-first and anonymous (no auth).
