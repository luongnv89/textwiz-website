# Repository Guidelines

## Project Structure & Module Organization
The Vite app lives in `src/`; components sit in `src/components/`, brand assets in `src/assets/`, and Redux state in `src/store/` with slices and sagas grouped by feature. `public/` holds static files served verbatim. Keep the root configs (`vite.config.js`, `tailwind.config.js`, `netlify.toml`) minimal and environment-agnostic.

## Build, Test, and Development Commands
Install dependencies with `npm install --legacy-peer-deps` after cloning. Use `npm run dev` for the hot-reloading dev server, `npm run build` for an optimized bundle in `dist/`, and `npm run preview` for a local production check. Run `npm run lint` before merging and resolve issues instead of disabling rules.

## Coding Style & Naming Conventions
Stick to two-space indents, single quotes, and trailing semicolons as seen in existing components. Use `PascalCase` for component files like `Hero.jsx`, `camelCase` for hooks and utilities, and only `SCREAMING_SNAKE_CASE` for exported constants. Keep JSX declarative by extracting sections into `src/components/`, and change `eslint.config.js` rather than adding inline overrides.

## Testing Guidelines
Adopt Vitest with React Testing Library; keep specs in `src/__tests__/` or alongside modules as `<Component>.test.jsx`. Cover Redux slices, sagas, and form validation across success and failure paths. Add an `npm test` script (aliasing `vitest run`) and require `vitest run --coverage` in CI to protect the Netlify form pipeline.

## Commit & Pull Request Guidelines
History favors concise, imperative commits (`fix hero`, `remove background in hero section`); continue that pattern and keep scope focused. PRs should link to related requirements, call out UI changes with screenshots, and confirm `npm run lint` plus tests in the description. Flag follow-up work with a checklist so reviewers know what remains.

## Deployment & Configuration Notes
Netlify drives deployments; keep `netlify.toml` the source of truth for build settings. Do not commit secrets—document Keychain or Netlify environment variable names when integrations need them. When adjusting the form, verify the hidden Netlify snippet in `index.html` stays consistent so submissions register.
