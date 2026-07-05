import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {
  PRICE_TAGLINE,
  PRICE_PREMIUM_COPY,
  PRICE_ONGOING_COST_COPY,
  PRICE_LOCAL_AI_BRIEF,
} from '../../src/lib/pricing.js';

// This repo has no React rendering/test framework (no jsdom, RTL, or Vitest —
// see AGENTS.md: only `node --test` over scripts/__tests__/**). These tests
// verify issue #21 (dedupe the one-time-purchase/local-AI/no-token-cost
// pitch across sections): the full, elaborated explanation must render in
// only one place (Pricing.jsx, via pricing.js's constants), and every other
// section — FreeLocalAI.jsx in particular — must reference it briefly
// instead of restating it, matching the pattern in pricing-content.test.mjs
// and landing-integration.test.mjs.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const readSrc = (rel) => readFileSync(path.join(__dirname, '../../src', rel), 'utf8');

const pricing = readSrc('components/Pricing.jsx');
const freeLocalAI = readSrc('components/FreeLocalAI.jsx');

// The four clauses that together make up "the full explanation" per issue
// #21's acceptance criteria.
const FULL_EXPLANATION_PATTERNS = [/one-time/i, /no subscription/i, /local ai/i, /per-token/i];

test('pricing.js exports PRICE_LOCAL_AI_BRIEF as a non-empty string (#21)', () => {
  assert.equal(typeof PRICE_LOCAL_AI_BRIEF, 'string');
  assert.ok(PRICE_LOCAL_AI_BRIEF.trim().length > 0, 'PRICE_LOCAL_AI_BRIEF must not be empty');
});

test('the full explanation is composed only from PRICE_TAGLINE + PRICE_PREMIUM_COPY + PRICE_ONGOING_COST_COPY, rendered together only by Pricing.jsx (#21)', () => {
  const fullExplanation = `${PRICE_TAGLINE} ${PRICE_PREMIUM_COPY} ${PRICE_ONGOING_COST_COPY}`;
  for (const pattern of FULL_EXPLANATION_PATTERNS) {
    assert.match(fullExplanation, pattern, `expected the full explanation to cover ${pattern}`);
  }
  assert.match(pricing, /PRICE_TAGLINE/);
  assert.match(pricing, /PRICE_PREMIUM_COPY/);
  assert.match(pricing, /PRICE_ONGOING_COST_COPY/);
});

test('FreeLocalAI imports its brief local-AI/pricing reference from lib/pricing instead of hardcoding prose (#21)', () => {
  assert.match(freeLocalAI, /from ['"]\.\.\/lib\/pricing['"]/);
  assert.match(freeLocalAI, /PRICE_LOCAL_AI_BRIEF/);
});

test('FreeLocalAI no longer hardcodes the old one-time-purchase/no-subscription/local-AI/no-per-token-cost paragraph (#21)', () => {
  assert.doesNotMatch(freeLocalAI, /no subscription\. Run on/i, 'old hand-written multi-clause paragraph should be gone');
  assert.doesNotMatch(
    freeLocalAI,
    /no per-token cost.{0,3}your text stays on your Mac/i,
    'old paragraph closing clause should be gone',
  );
});

test('FreeLocalAI no longer near-duplicates the Hero badge wording (#21)', () => {
  assert.doesNotMatch(
    freeLocalAI,
    /Pay once\.\s*Run free with local AI\./,
    'old badge near-duplicated the Hero badge pattern ("Pay once, run free ... local AI")',
  );
});

test('FreeLocalAI never recombines all four full-explanation clauses the way Pricing.jsx does (#21)', () => {
  // FreeLocalAI should not import the full-explanation constants directly —
  // it gets its brief reference from PRICE_LOCAL_AI_BRIEF instead.
  assert.doesNotMatch(freeLocalAI, /PRICE_TAGLINE|PRICE_PREMIUM_COPY|PRICE_ONGOING_COST_COPY/);

  // "no subscription" is the clearest tell of the full pitch — FreeLocalAI's
  // brief reference should never need it.
  assert.doesNotMatch(freeLocalAI, /no subscription/i);

  const matchedClauseCount = FULL_EXPLANATION_PATTERNS.filter((pattern) => pattern.test(freeLocalAI)).length;
  assert.ok(
    matchedClauseCount < FULL_EXPLANATION_PATTERNS.length,
    'FreeLocalAI should reference the claim briefly, not restate every clause of the full explanation',
  );
});

test('FreeLocalAI preserves its heading, section id, and highlight grid layout unchanged (#21)', () => {
  assert.match(freeLocalAI, /id="free-local-ai"/);
  assert.match(freeLocalAI, /Private by default—your text stays on your Mac/);
  assert.match(freeLocalAI, /grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4/);
});
