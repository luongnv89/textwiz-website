import assert from 'node:assert/strict';
import test from 'node:test';
import { buildSitemap } from '../lib/sitemap.mjs';
import { SEO_ROUTES } from '../../shared/seo-routes.mjs';

test('buildSitemap emits one url per route with lastmod', () => {
  const xml = buildSitemap(SEO_ROUTES, () => '2026-01-15');
  assert.equal(xml.match(/<url>/g).length, SEO_ROUTES.length);
  assert.match(xml, /<loc>https:\/\/textwiz\.pro\/<\/loc>/);
  for (const route of SEO_ROUTES.filter((r) => r.path !== '/')) {
    assert.match(xml, new RegExp(`<loc>https://textwiz\\.pro${route.path}</loc>`));
  }
  for (const m of xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)) {
    assert.match(m[1], /^\d{4}-\d{2}-\d{2}$/);
  }
  assert.doesNotMatch(xml, /www\.textwiz\.pro/);
  assert.doesNotMatch(xml, /changefreq|priority/);
});
