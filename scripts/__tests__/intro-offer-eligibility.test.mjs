import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { INTRO_OFFER_ELIGIBILITY, PRO_PLANS } from '../../src/lib/pricing.js';
import { SEO_ROUTES } from '../../shared/seo-routes.mjs';

// Intro offer eligibility (#34): the repository holds no App Store Connect
// record, so the site may not present Apple's per-account eligibility rule as a
// confirmed fact. It states the price and duration the owner recorded in epic
// #36 and defers eligibility to what Apple shows at purchase.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const read = (rel) => readFileSync(path.join(__dirname, '../..', rel), 'utf8');

// Every public surface that describes the weekly introductory offer.
const PUBLIC_SURFACES = [
  'shared/pricing.mjs',
  'src/lib/faqData.js',
  'src/components/Pricing.jsx',
  'src/pages/TermsPage.jsx',
  'public/llms-full.txt',
  'shared/seo-routes.mjs',
  'index.html',
];

// Account-level guarantees the repository cannot substantiate.
const UNSUPPORTED_CLAIMS = [/once per Apple Account/i, /one per Apple Account/i, /available once per/i];

const weeklyPlan = PRO_PLANS.find((plan) => plan.id === 'weekly');

test('the shared eligibility sentence defers to the App Store (#34)', () => {
  assert.equal(typeof INTRO_OFFER_ELIGIBILITY, 'string');
  assert.match(INTRO_OFFER_ELIGIBILITY, /App Store/);
  assert.match(INTRO_OFFER_ELIGIBILITY, /eligibility/i);
});

test('the weekly plan keeps the owner-recorded price, duration, and pay-up-front terms (#34)', () => {
  assert.ok(weeklyPlan, 'expected a weekly plan in PRO_PLANS');
  assert.equal(weeklyPlan.intro, '$0.99 for the first week');
  assert.match(weeklyPlan.note, /\$0\.99/);
  assert.match(weeklyPlan.note, /up front/i);
  assert.match(weeklyPlan.note, /one week/i);
  assert.match(weeklyPlan.note, /\$2\.99 per week/);
});

test('the weekly plan note carries the conditional eligibility wording (#34)', () => {
  assert.match(weeklyPlan.note, /for eligible customers/i);
  assert.ok(
    weeklyPlan.note.includes(INTRO_OFFER_ELIGIBILITY),
    'expected the weekly note to reuse INTRO_OFFER_ELIGIBILITY rather than restate it',
  );
});

test('no public surface reintroduces the unsupported account-level guarantee (#34)', () => {
  for (const surface of PUBLIC_SURFACES) {
    const source = read(surface);
    for (const claim of UNSUPPORTED_CLAIMS) {
      assert.doesNotMatch(source, claim, `${surface} must not claim ${claim} for the introductory offer`);
    }
  }
});

test('Terms and the FAQ source the eligibility wording from shared pricing data (#34)', () => {
  const terms = read('src/pages/TermsPage.jsx');
  assert.match(terms, /PRO_PLANS/);
  assert.match(terms, /weeklyPlan\.note/);

  const faq = read('src/lib/faqData.js');
  assert.match(faq, /INTRO_OFFER_ELIGIBILITY/);
});

test('the prerendered Terms crawl body carries the same conditional wording (#34)', () => {
  const terms = SEO_ROUTES.find((route) => route.path === '/terms');
  assert.ok(terms, 'expected a /terms route in SEO_ROUTES');
  assert.match(terms.body, /for eligible customers/i);
  assert.ok(
    terms.body.includes(INTRO_OFFER_ELIGIBILITY),
    'expected the Terms crawl body to reuse INTRO_OFFER_ELIGIBILITY',
  );
});
