# TextWiz — report a bug or request a feature

This is the home for **TextWiz** feedback. Open an issue to report a bug, flag a rough edge, or request a new wizard — the maintainer reads every one.

[**Report a bug →**](https://github.com/luongnv89/textwiz-website/issues/new) · [**Request a feature →**](https://github.com/luongnv89/textwiz-website/issues/new) · [**Browse open issues →**](https://github.com/luongnv89/textwiz-website/issues)

> **TextWiz** is a private, local-first macOS app that runs AI "wizards" on selected text via a global hotkey (⌘⇧Space) or macOS Services. It defaults to on-device AI, runs no servers, and collects none of your data. Site: [www.textwiz.pro](https://www.textwiz.pro) · App source: [luongnv89/textwiz](https://github.com/luongnv89/textwiz)

## Reporting a bug

Open a [new issue](https://github.com/luongnv89/textwiz-website/issues/new) and include:

| Field | What to write |
|---|---|
| macOS version | e.g. macOS 15.4 (Apple Silicon / Intel) |
| TextWiz version | From the app's About window |
| AI provider | Apple Intelligence, Ollama, LM Studio, MLX-LM, or a cloud key |
| What happened | The steps you took and what went wrong |
| What you expected | The result you were after |

Screenshots or a short screen recording help a lot.

## Requesting a feature

Open a [new issue](https://github.com/luongnv89/textwiz-website/issues/new) describing the workflow you want and why your current setup falls short. Custom-wizard ideas, new provider support, and collection requests are all welcome.

## Before you file

| Check | Why |
|---|---|
| [Search open issues](https://github.com/luongnv89/textwiz-website/issues) | Yours may already be tracked — react or comment instead of duplicating |
| [Read the FAQ](https://www.textwiz.pro/#faq) | Common questions are answered there |
| [Check the getting-started guide](https://www.textwiz.pro/getting-started) | Setup, API keys, hotkeys, and Services troubleshooting |

---

<details>
<summary>Website development (this repo)</summary>

Marketing site for [TextWiz](https://github.com/luongnv89/textwiz) — React + Vite + Tailwind. Static pages only.

### Development

```bash
npm install --legacy-peer-deps
```

```bash
npm run dev
```

Open `http://localhost:5173`.

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite dev server |
| `npm run build` | Generate `llms-full.txt`, Vite build, prerender route HTML |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |
| `npm run test` | Node tests (`scripts/__tests__`) |

### GitHub Pages

Pushes to **`main`** run [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml):

1. Build with `VITE_BASE_PATH=/<repo-name>/` (project site base path).
2. Copy `dist/index.html` → `dist/404.html` for client-side routing.
3. Deploy `dist/` via GitHub Actions **Pages** (`deploy-pages`).

**One-time setup (repo owner):**

1. **Settings → Pages → Build and deployment**: Source = **GitHub Actions**.
2. Push to `main`; the workflow publishes the site.

Default URL: **https://luongnv89.github.io/textwiz-website/**

#### Custom domain (`www.textwiz.pro`)

The site is served at `https://www.textwiz.pro`; the apex `textwiz.pro` redirects to it. [`public/CNAME`](public/CNAME) tells GitHub Pages the custom domain (`www.textwiz.pro`), and the deploy workflow builds with base path `/` (no `VITE_BASE_PATH`) so assets and routes resolve from root.

1. **Settings → Pages → Custom domain** → `www.textwiz.pro`.
2. DNS at the registrar: `CNAME www → luongnv89.github.io`, plus apex `A`/`AAAA` records to GitHub Pages so `textwiz.pro` redirects to `www`.
3. Enable **Enforce HTTPS** once the certificate is issued.

Canonical SEO URLs live in `shared/seo-routes.mjs` (`SITE_URL = https://www.textwiz.pro`).

### Netlify (optional)

[`netlify.toml`](netlify.toml) remains for optional Netlify deploys (`npm run build`, publish `dist`). Use root path `/` (no `VITE_BASE_PATH`).

### Environment

| Variable | Purpose |
|----------|---------|
| `VITE_BASE_PATH` | Asset + router base (CI sets this for GitHub Pages) |

</details>

## License

Copyright © TextWiz. All rights reserved.
