import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { SEO_ROUTES, SITE_URL } from '../../shared/seo-routes.mjs';
import { patchHtml } from '../lib/patch-html.mjs';
import {
  htmlToMarkdown,
  markdownFileFor,
  markdownHrefFor,
  routeToMarkdown,
} from '../lib/route-markdown.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const indexShell = readFileSync(join(__dirname, '..', '..', 'index.html'), 'utf8');

test('markdownFileFor maps route paths to emitted .md filenames', () => {
  assert.equal(markdownFileFor('/'), 'index.md');
  assert.equal(markdownFileFor('/getting-started'), 'getting-started.md');
  assert.equal(markdownFileFor('/privacy'), 'privacy.md');
  assert.equal(markdownHrefFor('/'), '/index.md');
  assert.equal(markdownHrefFor('/terms'), '/terms.md');
});

test('htmlToMarkdown converts the markup SEO_ROUTES bodies use', () => {
  const md = htmlToMarkdown(
    '<h1>Title</h1><p>First &amp; foremost.</p><p>See <a href="/x">this page</a>.</p>',
  );
  assert.match(md, /^# Title/);
  assert.match(md, /First & foremost\./);
  assert.match(md, /\[this page\]\(\/x\)/);
  assert.doesNotMatch(md, /<\/?(p|h1|a)\b/);
});

test('routeToMarkdown emits heading, description, body and pointers for every route', () => {
  for (const route of SEO_ROUTES) {
    const md = routeToMarkdown(route);
    assert.match(md, /^# \S/, `route ${route.path} missing markdown heading`);
    assert.ok(md.includes(`> ${route.description}`), `route ${route.path} missing description`);
    assert.ok(
      md.includes(`HTML version: ${SITE_URL}${route.path === '/' ? '/' : route.path}`),
      `route ${route.path} missing canonical HTML pointer`,
    );
    assert.ok(md.includes(`${SITE_URL}/llms-full.txt`), `route ${route.path} missing llms-full pointer`);
    assert.doesNotMatch(md, /<\/(p|h1|article)>/, `route ${route.path} leaks raw HTML`);
  }
});

test('patchHtml points the markdown alternate at the route-specific .md file', () => {
  for (const route of SEO_ROUTES) {
    const html = patchHtml(indexShell, route);
    const expected = `<link rel="alternate" type="text/markdown" href="${SITE_URL}${markdownHrefFor(route.path)}" title="Markdown version" />`;
    assert.ok(html.includes(expected), `route ${route.path} missing ${expected}`);
    assert.equal(
      html.match(/rel="alternate" type="text\/markdown"/g).length,
      1,
      `route ${route.path} should carry exactly one markdown alternate`,
    );
  }
});
