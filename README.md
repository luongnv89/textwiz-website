# TextWiz Website

Marketing site for [TextWiz](https://github.com/luongnv89/textwiz) — React + Vite + Tailwind. Static pages only; feedback via GitHub issues (no email signup or CAPTCHA on this site).

## Development

```bash
npm install --legacy-peer-deps
npm run dev
```

Open `http://localhost:5173`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite dev server |
| `npm run build` | Generate `llms-full.txt`, Vite build, prerender route HTML |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |
| `npm run test` | Node tests (`scripts/__tests__`) |

## GitHub Pages

Pushes to **`main`** run [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml):

1. Build with `VITE_BASE_PATH=/<repo-name>/` (project site base path).
2. Copy `dist/index.html` → `dist/404.html` for client-side routing.
3. Deploy `dist/` via GitHub Actions **Pages** (`deploy-pages`).

**One-time setup (repo owner):**

1. **Settings → Pages → Build and deployment**: Source = **GitHub Actions**.
2. Push to `main`; the workflow publishes the site.

Default URL: **https://luongnv89.github.io/textwiz-website/**

### Custom domain (`textwiz.luongnv.com`)

1. **Settings → Pages → Custom domain** → `textwiz.luongnv.com`.
2. Add DNS records per GitHub’s instructions.
3. Set build `VITE_BASE_PATH=/` in the deploy workflow (and remove the `/repo-name/` prefix), or use a user/org site repo if you prefer root hosting.

Canonical SEO URLs in `shared/seo-routes.mjs` still point at `https://textwiz.luongnv.com`; update when DNS points at GitHub Pages.

## Netlify (optional)

[`netlify.toml`](netlify.toml) remains for optional Netlify deploys (`npm run build`, publish `dist`). Use root path `/` (no `VITE_BASE_PATH`).

## Environment

| Variable | Purpose |
|----------|---------|
| `VITE_BASE_PATH` | Asset + router base (CI sets this for GitHub Pages) |

## License

Copyright © TextWiz. All rights reserved.