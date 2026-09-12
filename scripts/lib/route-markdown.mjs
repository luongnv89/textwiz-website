import { SITE_URL, pageTitle } from '../../shared/seo-routes.mjs';

/** Route path → emitted markdown filename in dist/ ('/' → 'index.md'). */
export function markdownFileFor(routePath) {
  if (routePath === '/') return 'index.md';
  return `${routePath.replace(/^\//, '')}.md`;
}

/** Route path → public path of its markdown alternate ('/' → '/index.md'). */
export function markdownHrefFor(routePath) {
  return `/${markdownFileFor(routePath)}`;
}

function decodeEntities(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");
}

/** Minimal HTML → Markdown covering the markup SEO_ROUTES bodies use. */
export function htmlToMarkdown(html) {
  const text = html
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n\n# $1\n\n')
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n\n## $1\n\n')
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n\n### $1\n\n')
    .replace(/<a\s+[^>]*?href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (m, href, label) => `[${label.trim()}](${href})`)
    .replace(/<li[^>]*>/gi, '\n- ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|article|nav|ul|ol|section)>/gi, '\n\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\r\n/g, '\n');
  return decodeEntities(text)
    .split('\n')
    .map((line) => line.replace(/[ \t]+/g, ' ').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Markdown alternate for one prerendered route — the static-hosting stand-in
 * for Accept: text/markdown content negotiation (#48).
 * @param {{ path: string, title: string | null, description: string, body: string }} route
 * @param {string} [siteOrigin]
 */
export function routeToMarkdown(route, siteOrigin = SITE_URL) {
  const canonical = route.path === '/' ? `${siteOrigin}/` : `${siteOrigin}${route.path}`;
  const body = htmlToMarkdown(route.body);
  const [first, ...rest] = body.split('\n\n');
  const heading = first.startsWith('# ') ? first : `# ${pageTitle(route)}`;
  const remainder = first.startsWith('# ') ? rest : [first, ...rest];
  return [
    heading,
    `> ${route.description}`,
    ...remainder,
    '---',
    `HTML version: ${canonical}`,
    `Full site context for AI systems: ${siteOrigin}/llms-full.txt`,
  ].join('\n\n') + '\n';
}
