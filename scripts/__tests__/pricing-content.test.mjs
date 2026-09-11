import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {
  PRO_NAME,
  PRO_PLANS,
  PRICING_SUMMARY,
  PRO_SWITCH_DATE,
  PRO_SWITCH_DATE_LABEL,
} from '../../src/lib/pricing.js';

// Subscription pricing (#37): prices live in shared/pricing.mjs and flow through
// Pricing.jsx, faqData.js, and StructuredData.jsx.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pricingData = readFileSync(path.join(__dirname, '../../src/lib/pricing.js'), 'utf8');
const pricing = readFileSync(path.join(__dirname, '../../src/components/Pricing.jsx'), 'utf8');

test('pricing.js re-exports subscription plan constants from shared/pricing.mjs (#37)', () => {
  assert.equal(PRO_NAME, 'TextWiz Pro');
  assert.equal(PRO_PLANS.length, 3);
  assert.equal(PRO_PLANS[0].price, '$2.99');
  assert.equal(PRO_PLANS[1].price, '$7.99');
  assert.equal(PRO_PLANS[2].price, '$59.99');
  assert.match(PRICING_SUMMARY, /free download/i);
  assert.match(PRICING_SUMMARY, /\$0\.99 for the first week/);
});

test('the Pro switch date matches the 17 September 2026 launch record (#29)', () => {
  assert.equal(PRO_SWITCH_DATE, '2026-09-17');
  assert.equal(PRO_SWITCH_DATE_LABEL, '17 September 2026');

  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${PRO_SWITCH_DATE}T00:00:00Z`));

  assert.equal(PRO_SWITCH_DATE_LABEL, formattedDate);
});

test('Pricing renders its content from lib/pricing.js rather than hardcoding prices (#37)', () => {
  assert.match(pricing, /from ['"]\.\.\/lib\/pricing['"]/);
  assert.match(pricing, /PRO_PLANS/);
  assert.doesNotMatch(pricing, /['"`]\$59\.99['"`]/, 'literal yearly price should come from PRO_PLANS, not a hardcoded string');
});

test('Pricing states the free download and subscription model plainly (#37)', () => {
  assert.match(pricing, /free download/i);
  assert.match(pricing, /auto-renew/i);
  assert.match(pricing, /Demo provider/i);
});

test('Pricing reuses MacAppStoreBadge as its CTA rather than inventing a second competing CTA (#37)', () => {
  assert.match(pricing, /from ['"]\.\/MacAppStoreBadge['"]/);
  assert.equal((pricing.match(/<MacAppStoreBadge/g) || []).length, 1);
});

test('Pricing section has id="pricing" so nav and deep links can reach it (#37)', () => {
  assert.match(pricing, /id=["']pricing["']/);
});

test('Pricing and pricing.js never reintroduce one-time-purchase copy (#37)', () => {
  for (const source of [pricingData, pricing]) {
    assert.doesNotMatch(source, /one-time purchase/i);
    assert.doesNotMatch(source, /pay once/i);
    assert.doesNotMatch(source, /no subscription, ever/i);
  }
});
