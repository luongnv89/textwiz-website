/**
 * Post-build: write dist/sitemap.xml from SEO_ROUTES with a git-derived lastmod
 * per route (last commit touching the route's `sources`), falling back to today.
 */
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';
import { SEO_ROUTES } from '../shared/seo-routes.mjs';
import { buildSitemap } from './lib/sitemap.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const today = new Date().toISOString().slice(0, 10);

function lastmodFor(route) {
  try {
    const out = execFileSync(
      'git',
      ['log', '-1', '--format=%cI', '--', ...(route.sources ?? [])],
      { cwd: rootDir, encoding: 'utf8' },
    ).trim();
    return out ? out.slice(0, 10) : today;
  } catch {
    return today;
  }
}

if (!fs.existsSync(distDir)) {
  console.error('generate-sitemap: dist/ missing — run vite build first');
  process.exit(1);
}

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), buildSitemap(SEO_ROUTES, lastmodFor));
console.log(`generate-sitemap: wrote dist/sitemap.xml (${SEO_ROUTES.length} urls)`);
