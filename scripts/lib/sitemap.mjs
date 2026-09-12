import { SITE_URL } from '../../shared/seo-routes.mjs';

/**
 * @param {{ path: string }[]} routes
 * @param {(route: object) => string} lastmodFor - returns a YYYY-MM-DD date per route
 */
export function buildSitemap(routes, lastmodFor) {
  const urls = routes
    .map((route) => {
      const loc = route.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${route.path}`;
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmodFor(route)}</lastmod>\n  </url>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
