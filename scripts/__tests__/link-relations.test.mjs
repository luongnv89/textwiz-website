import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { SEO_ROUTES, SITE_URL } from '../../shared/seo-routes.mjs';
import { patchHtml } from '../lib/patch-html.mjs';
import { markdownFileFor } from '../lib/route-markdown.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..', '..');
const indexShell = readFileSync(join(root, 'index.html'), 'utf8');

// RFC 8288 relations emitted as HTML <link> elements — the static-hosting
// stand-in for Link response headers (#50). Every target must exist.
const DISCOVERY_LINKS = [
  { rel: 'alternate', type: 'text/plain', path: '/llms.txt' },
  { rel: 'alternate', type: 'text/plain', path: '/llms-full.txt' },
  { rel: 'describedby', type: 'text/plain', path: '/llms-full.txt' },
  { rel: 'sitemap', type: 'application/xml', path: '/sitemap.xml' },
  { rel: 'help', path: '/getting-started' },
];

// Every link target must resolve to something real: a file served from
// public/, a build-generated file, or a prerendered route.
const TARGET_BACKING = {
  '/llms.txt': 'public/llms.txt',
  '/llms-full.txt': 'public/llms-full.txt',
  '/sitemap.xml': 'scripts/generate-sitemap.mjs',
  '/getting-started': 'route',
};

test('index.html head carries the agent-discovery link relations', () => {
  for (const link of DISCOVERY_LINKS) {
    const relRe = new RegExp(`<link rel="${link.rel}"[^>]*href="${SITE_URL.replace(/\./g, '\\.')}${link.path.replace(/\//g, '\\/')}"`);
    assert.match(indexShell, relRe, `index.html missing rel=${link.rel} → ${link.path}`);
    const backing = TARGET_BACKING[link.path];
    assert.ok(backing, `no backing recorded for ${link.path}`);
    if (backing === 'route') {
      assert.ok(SEO_ROUTES.some((r) => r.path === link.path), `route ${link.path} not prerendered`);
    } else {
      assert.ok(existsSync(join(root, backing)), `link target backing for ${link.path} missing`);
    }
  }
});

test('every prerendered page keeps the discovery links plus its markdown alternate', () => {
  for (const route of SEO_ROUTES) {
    const html = patchHtml(indexShell, route);
    assert.ok(
      html.includes(`href="${SITE_URL}/${markdownFileFor(route.path)}"`),
      `route ${route.path} missing per-route markdown alternate`,
    );
    for (const path of ['/llms.txt', '/llms-full.txt', '/sitemap.xml']) {
      assert.ok(html.includes(`href="${SITE_URL}${path}"`), `route ${route.path} missing link to ${path}`);
    }
  }
});
