import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { PRICING_SUMMARY } from '../../src/lib/pricing.js';

// With the subscription relaunch (#37), the full pricing pitch lives in
// Pricing.jsx via shared/pricing.mjs. Other sections should link or summarize
// briefly instead of restating every plan price.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const readSrc = (rel) => readFileSync(path.join(__dirname, '../../src', rel), 'utf8');

const pricing = readSrc('components/Pricing.jsx');
const freeLocalAI = readSrc('components/FreeLocalAI.jsx');

const FULL_EXPLANATION_PATTERNS = [/TextWiz Pro/, /\$2\.99 per week/, /\$7\.99 per month/, /\$59\.99 per year/];

test('PRICING_SUMMARY carries the subscription headline (#37)', () => {
  assert.equal(typeof PRICING_SUMMARY, 'string');
  assert.ok(PRICING_SUMMARY.trim().length > 0);
  assert.match(PRICING_SUMMARY, /TextWiz Pro/);
});

test('the full subscription explanation is rendered by Pricing.jsx via shared constants (#37)', () => {
  assert.match(pricing, /PRO_PLANS/);
  assert.match(pricing, /PRO_NAME/);
  for (const pattern of FULL_EXPLANATION_PATTERNS) {
    assert.match(PRICING_SUMMARY, pattern, `expected PRICING_SUMMARY to cover ${pattern}`);
  }
});

test('FreeLocalAI links to #pricing for Pro instead of restating every plan price (#37)', () => {
  assert.match(freeLocalAI, /href="#pricing"/);
  assert.doesNotMatch(freeLocalAI, /\$59\.99 per year/);
});

test('FreeLocalAI no longer hardcodes one-time-purchase copy (#37)', () => {
  assert.doesNotMatch(freeLocalAI, /one-time purchase/i);
  assert.doesNotMatch(freeLocalAI, /Pay once\.\s*Run free with local AI\./);
});

test('FreeLocalAI preserves its heading, section id, and highlight grid layout (#37)', () => {
  assert.match(freeLocalAI, /id="free-local-ai"/);
  assert.match(freeLocalAI, /Private by default—your text stays on your Mac/);
  assert.match(freeLocalAI, /grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4/);
});
