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

### Custom domain (`www.textwiz.pro`)

The site is served at `https://www.textwiz.pro`; the apex `textwiz.pro` redirects to it. [`public/CNAME`](public/CNAME) tells GitHub Pages the custom domain (`www.textwiz.pro`), and the deploy workflow builds with base path `/` (no `VITE_BASE_PATH`) so assets and routes resolve from root.

1. **Settings → Pages → Custom domain** → `www.textwiz.pro`.
2. DNS at the registrar: `CNAME www → luongnv89.github.io`, plus apex `A`/`AAAA` records to GitHub Pages so `textwiz.pro` redirects to `www`.
3. Enable **Enforce HTTPS** once the certificate is issued.

Canonical SEO URLs live in `shared/seo-routes.mjs` (`SITE_URL = https://www.textwiz.pro`).

## Netlify (optional)

[`netlify.toml`](netlify.toml) remains for optional Netlify deploys (`npm run build`, publish `dist`). Use root path `/` (no `VITE_BASE_PATH`).

## Environment

| Variable | Purpose |
|----------|---------|
| `VITE_BASE_PATH` | Asset + router base (CI sets this for GitHub Pages) |

## License

Copyright © TextWiz. All rights reserved.