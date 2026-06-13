# Repository Guidelines

## Project Structure & Module Organization
The Vite app lives in `src/`; components sit in `src/components/`, shared SEO in `shared/seo-routes.mjs`, build scripts in `scripts/`. `public/` holds static files served verbatim. Root configs: `vite.config.js`, `tailwind.config.js`, optional `netlify.toml`.

## Build, Test, and Development Commands
Install with `npm install --legacy-peer-deps`. Use `npm run dev`, `npm run build`, `npm run preview`, `npm run lint`, and `npm run test` (Node tests under `scripts/__tests__/`).

## Coding Style & Naming Conventions
Two-space indents, single quotes, semicolons. `PascalCase` for components, `camelCase` for utilities. No Redux—local React state only.

## Deployment
GitHub Pages via `.github/workflows/deploy-pages.yml` on push to `main`. Set `VITE_BASE_PATH` in CI for project-site hosting.

## Feedback & privacy
Do not reintroduce email capture, Netlify Forms, or Cloudflare Turnstile. Feedback links to `luongnv89/textwiz-feedback` GitHub issue templates.