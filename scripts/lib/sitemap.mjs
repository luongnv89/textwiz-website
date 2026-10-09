import { execFileSync } from 'node:child_process';
import { SITE_URL } from '../../shared/seo-routes.mjs';

/** Last significant source commit, or undefined when history is unavailable. */
export function lastmodFromGit(sources, rootDir) {
  if (!sources?.length) return undefined;
  try {
    const date = execFileSync(
      'git',
      ['log', '-1', '--format=%cI', '--', ...sources],
      { cwd: rootDir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] },
    ).trim();
    return date ? date.slice(0, 10) : undefined;
  } catch {
    return undefined;
  }
}

/**
 * @param {{ path: string }[]} routes
 * @param {(route: object) => string | undefined} lastmodFor - reliable YYYY-MM-DD date, when known
 */
export function buildSitemap(routes, lastmodFor) {
  const urls = routes
    .map((route) => {
      const loc = route.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${route.path}`;
      const lastmod = lastmodFor(route);
      const lastmodElement = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : '';
      return `  <url>\n    <loc>${loc}</loc>${lastmodElement}\n  </url>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
