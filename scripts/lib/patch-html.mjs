import { SITE_URL, pageTitle } from '../../shared/seo-routes.mjs';
import { buildStructuredData } from '../../shared/structured-data.mjs';
import { faqData } from '../../src/lib/faqData.js';
import { markdownHrefFor } from './route-markdown.mjs';

export { pageTitle };

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

  // Per-route markdown alternate (RFC 8288 link relation in head — the
  // static-hosting stand-in for Accept: text/markdown negotiation, #48).
  const mdLink = `<link rel="alternate" type="text/markdown" href="${siteOrigin}${markdownHrefFor(route.path)}" title="Markdown version" />`;
  const mdLinkRe = /<link rel="alternate" type="text\/markdown" href="[^"]*"[^>]*\/>/;
  if (mdLinkRe.test(html)) {
    html = html.replace(mdLinkRe, () => mdLink);
  } else {
    html = html.replace('</head>', () => `    ${mdLink}\n  </head>`);
  }

  const jsonLd = `<script type="application/ld+json" data-rh="true">${JSON.stringify(
    buildStructuredData(route, faqData),
  ).replace(/<\//g, '<\\/')}</script>`;
  const ldJsonRe = /<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/;
  if (ldJsonRe.test(html)) {
    html = html.replace(ldJsonRe, () => jsonLd);
  } else {
    html = html.replace('</head>', () => `    ${jsonLd}\n  </head>`);
  }

  const crawlArticle = `
      <article style="max-width: 42rem; margin: 2rem auto; padding: 0 1.5rem; font-family: system-ui, sans-serif; line-height: 1.6;">
      ${route.body}
      <nav>
        <a href="/">Home</a> · <a href="/getting-started">Setup &amp; API keys</a> · <a href="/changelog">Changelog</a> · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a>
      </nav>
      </article>`;

  html = html.replace(
    /(<!-- prerender:start -->)[\s\S]*?(<!-- prerender:end -->)/,
    (match, start, end) => `${start}${crawlArticle}${end}`,
  );

  return html;
}
