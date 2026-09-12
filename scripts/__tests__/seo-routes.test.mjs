import assert from 'node:assert/strict';
import test from 'node:test';
import { SEO_ROUTES } from '../../shared/seo-routes.mjs';

test('every route description is between 70 and 160 chars', () => {
  for (const route of SEO_ROUTES) {
    const len = route.description.length;
    assert.ok(
      len >= 70 && len <= 160,
      `${route.path} description length ${len} out of range`,
    );
  }
});

test('every route declares non-empty sources for lastmod', () => {
  for (const route of SEO_ROUTES) {
    assert.ok(
      Array.isArray(route.sources) && route.sources.length > 0,
      `${route.path} missing sources`,
    );
  }
});
