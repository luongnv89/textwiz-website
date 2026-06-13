import { HOMEPAGE_DOCUMENT_TITLE, SITE_URL } from '../../shared/seo-routes.mjs';

export function pageTitle(route) {
  if (route.path === '/') {
    return route.title ?? HOMEPAGE_DOCUMENT_TITLE;
  }
  const segmentTitle = route.title ?? 'TextWiz';
  return `${segmentTitle} | TextWiz`;
}

/**
 * @param {string} shell - Built index.html from Vite
 * @param {{ path: string, title: string | null, description: string, body: string }} route
 * @param {string} [siteOrigin]
 */
export function patchHtml(shell, route, siteOrigin = SITE_URL) {
  const canonical = `${siteOrigin}${route.path === '/' ? '/' : route.path}`;
  const fullTitle = pageTitle(route);
  let html = shell;

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${fullTitle}</title>`);
  const esc = (s) => s.replace(/"/g, '&quot;');
  const desc = esc(route.description);

  html = html.replace(
    /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/>/,
    `<meta name="description" content="${desc}" />`,
  );
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${canonical}" />`,
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${canonical}" />`,
  );
  html = html.replace(
    /<meta property="og:title" content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${fullTitle}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/>/,
    `<meta property="og:description" content="${desc}" />`,
  );
  html = html.replace(
    /<meta name="twitter:url" content="[^"]*"\s*\/>/,
    `<meta name="twitter:url" content="${canonical}" />`,
  );
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${fullTitle}" />`,
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/>/,
    `<meta name="twitter:description" content="${desc}" />`,
  );

  const crawlArticle = `
      <article style="max-width: 42rem; margin: 2rem auto; padding: 0 1.5rem; font-family: system-ui, sans-serif; line-height: 1.6;">
      ${route.body}
      <nav>
        <a href="/">Home</a> · <a href="/getting-started">Setup &amp; API keys</a> · <a href="/changelog">Changelog</a> · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a>
      </nav>
      </article>`;

  html = html.replace(/<noscript>[\s\S]*?<\/noscript>/, `<noscript>${crawlArticle}</noscript>`);

  return html;
}