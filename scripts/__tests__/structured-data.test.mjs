import assert from 'node:assert/strict';
import test from 'node:test';
import { buildStructuredData } from '../../shared/structured-data.mjs';
import { SEO_ROUTES } from '../../shared/seo-routes.mjs';
import { faqData } from '../../src/lib/faqData.js';

test('home graph is Organization + SoftwareApplication + WebSite + FAQPage', () => {
  const route = SEO_ROUTES.find((r) => r.path === '/');
  const data = buildStructuredData(route, faqData);
  assert.equal(data['@context'], 'https://schema.org');
  const types = data['@graph'].map((n) => n['@type']);
  assert.deepEqual(types, [
    'Organization',
    'SoftwareApplication',
    'WebSite',
    'FAQPage',
  ]);
  const faq = data['@graph'].find((n) => n['@type'] === 'FAQPage');
  assert.equal(faq.mainEntity.length, faqData.length);
});

test('graph nodes carry no nested @context', () => {
  for (const route of SEO_ROUTES) {
    const data = buildStructuredData(route, faqData);
    for (const node of data['@graph']) {
      assert.equal(node['@context'], undefined);
    }
  }
});

test('subroute graph is WebPage + BreadcrumbList on the apex host', () => {
  const route = SEO_ROUTES.find((r) => r.path === '/privacy');
  const data = buildStructuredData(route, faqData);
  const types = data['@graph'].map((n) => n['@type']);
  assert.deepEqual(types, ['WebPage', 'BreadcrumbList']);

  const page = data['@graph'][0];
  assert.equal(page.url, 'https://textwiz.pro/privacy');
  assert.equal(page.description, route.description);
  assert.equal(page.isPartOf.url, 'https://textwiz.pro');

  const crumbs = data['@graph'][1].itemListElement;
  assert.equal(crumbs.length, 2);
  for (const item of crumbs) {
    assert.ok(item.item.startsWith('https://textwiz.pro'));
  }
  assert.equal(crumbs[0].position, 1);
  assert.equal(crumbs[0].item, 'https://textwiz.pro/');
  assert.equal(crumbs[1].position, 2);
  assert.equal(crumbs[1].name, route.title);
});
