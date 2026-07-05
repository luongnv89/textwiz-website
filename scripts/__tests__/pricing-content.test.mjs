import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { PRICE_USD, PRICE_CURRENCY, PRICE_DISPLAY } from '../../src/lib/pricing.js';

// This repo has no React rendering/test framework (no jsdom, RTL, or Vitest —
// see AGENTS.md: only `node --test` over scripts/__tests__/**). These tests
// verify the pricing section (#3) by combining a direct data import with
// source-text checks, matching comparison-content.test.mjs.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pricingData = readFileSync(path.join(__dirname, '../../src/lib/pricing.js'), 'utf8');
const pricing = readFileSync(path.join(__dirname, '../../src/components/Pricing.jsx'), 'utf8');
// Pricing.jsx renders the price via the imported PRICE_DISPLAY constant
// rather than a literal '$4.99' (that hardcoding-drift is exactly what this
// module exists to avoid — see pricing.js's doc comment), and PRICE_DISPLAY
// itself is built from PRICE_USD via a template literal rather than
// restating '$4.99' as its own string. So "the rendered price reads $4.99"
// is verified via the direct import above (PRICE_DISPLAY === '$4.99'), not
// a source-text regex — a raw grep for '$4.99' would never match either
// file by design.

test('pricing.js exports the verified $4.99 USD price constants (#3)', () => {
  assert.equal(PRICE_USD, '4.99');
  assert.equal(PRICE_CURRENCY, 'USD');
  assert.equal(PRICE_DISPLAY, '$4.99');
});

test('Pricing renders its content from lib/pricing.js rather than hardcoding the price (#3)', () => {
  assert.match(pricing, /from ['"]\.\.\/lib\/pricing['"]/);
  assert.match(pricing, /PRICE_DISPLAY/);
  assert.doesNotMatch(pricing, /['"`]\$4\.99['"`]/, 'the literal price string should live only in pricing.js');
});

test('Pricing states the price plainly with one-time/no-subscription language (#3)', () => {
  assert.match(pricing, /one-time/i);
  assert.match(pricing, /no subscription/i);
  assert.equal(PRICE_DISPLAY, '$4.99', 'the rendered price (via PRICE_DISPLAY) must read $4.99');
});

test("Pricing contrasts one-time cost against competitors' recurring subscriptions and per-token bills (#3)", () => {
  assert.match(pricing, /subscription/i);
  assert.match(pricing, /per-token/i);
});

test('Pricing reuses MacAppStoreBadge as its CTA rather than inventing a second competing CTA (#3)', () => {
  assert.match(pricing, /from ['"]\.\/MacAppStoreBadge['"]/);
  assert.equal((pricing.match(/<MacAppStoreBadge/g) || []).length, 1);
});

test('Pricing section has id="pricing" so nav and deep links can reach it (#3)', () => {
  assert.match(pricing, /id=["']pricing["']/);
});

test('Pricing cites viral principles #16 and #32 in source (#3)', () => {
  for (const source of [pricingData, pricing]) {
    assert.match(source, /#16/);
    assert.match(source, /#32/);
  }
});

test('Pricing and pricing.js never reintroduce the fabricated $29-$39 hypothetical range (#3)', () => {
  for (const source of [pricingData, pricing]) {
    assert.doesNotMatch(source, /\$29/);
    assert.doesNotMatch(source, /\$39/);
  }
});
