/**
 * Post-build: emit route-specific HTML shells with unique meta + crawlable body text.
 * GitHub Pages and Netlify serve `getting-started.html` at `/getting-started`
 * without a redirect.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SEO_ROUTES } from '../shared/seo-routes.mjs';
import { patchHtml } from './lib/patch-html.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');

const shellPath = path.join(distDir, 'index.html');
if (!fs.existsSync(shellPath)) {
  console.error('prerender-routes: dist/index.html missing — run vite build first');
  process.exit(1);
}

const shell = fs.readFileSync(shellPath, 'utf8');

for (const route of SEO_ROUTES) {
  const html = patchHtml(shell, route);
  if (route.path === '/') {
    fs.writeFileSync(shellPath, html);
    continue;
  }
  fs.writeFileSync(path.join(distDir, `${route.path.slice(1)}.html`), html);
}

console.log(`prerender-routes: wrote ${SEO_ROUTES.length} route HTML file(s)`);