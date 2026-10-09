/**
 * Post-build: write dist/sitemap.xml from SEO_ROUTES with a git-derived lastmod
 * per route (last commit touching the route's `sources`). Omit lastmod when
 * reliable git history is unavailable, for example in a source archive.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SEO_ROUTES } from '../shared/seo-routes.mjs';
import { buildSitemap, lastmodFromGit } from './lib/sitemap.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

function lastmodFor(route) {
  return lastmodFromGit(route.sources, rootDir);
}

if (!fs.existsSync(distDir)) {
  console.error('generate-sitemap: dist/ missing — run vite build first');
  process.exit(1);
}

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), buildSitemap(SEO_ROUTES, lastmodFor));
console.log(`generate-sitemap: wrote dist/sitemap.xml (${SEO_ROUTES.length} urls)`);
