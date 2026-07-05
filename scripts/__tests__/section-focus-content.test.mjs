import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// This repo has no React rendering/test framework (no jsdom, RTL, or Vitest —
// see AGENTS.md: only `node --test` over scripts/__tests__/**). These tests
// verify the landing page section refocus (#10) via source-text checks,
// matching the pattern in landing-integration.test.mjs and
// comparison-content.test.mjs.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const readSrc = (rel) => readFileSync(path.join(__dirname, '../../src', rel), 'utf8');

const features = readSrc('components/Features.jsx');
const freeLocalAI = readSrc('components/FreeLocalAI.jsx');
const screenshots = readSrc('components/Screenshots.jsx');
const wizards = readSrc('components/Wizards.jsx');
const homePage = readSrc('pages/HomePage.jsx');

const REMOVED_FEATURE_TITLES = [
  'Private by Design',
  'Works Everywhere',
  'Local First, Your Choice of Cloud',
  'Real-Time Diff View',
  'Built-In Wizards + Your Own',
];

test('Features.jsx no longer duplicates bullets that now live in their own dedicated sections (#10)', () => {
  for (const title of REMOVED_FEATURE_TITLES) {
    assert.doesNotMatch(features, new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('Features.jsx keeps the 3 bullets with no dedicated section elsewhere (#10)', () => {
  assert.match(features, /Auto-Copy/);
  assert.match(features, /Searchable Request History/);
  assert.match(features, /Native macOS Integration/);
});

test('Features.jsx cites viral principle #6 in a comment explaining the trim (#10)', () => {
  assert.match(features, /viral principle #6/i);
});

test('FreeLocalAI no longer links "#features" promising "every engine" (#10)', () => {
  assert.doesNotMatch(freeLocalAI, /href="#features"/);
  assert.doesNotMatch(freeLocalAI, /every engine/i);
});

test('Screenshots and Wizards share the same "Next update" roadmap badge convention (#10)', () => {
  for (const source of [screenshots, wizards]) {
    assert.match(source, /Next update/);
    assert.match(source, /from ['"]lucide-react['"]/);
    assert.match(source, /Sparkles/);
  }
});

test('Screenshots badges the "Wizards out of the box" caption instead of announcing the roadmap item inline (#10)', () => {
  assert.match(screenshots, /upcoming:\s*true/);
  assert.doesNotMatch(screenshots, /arrive in the next update/i);
});

test('HomePage mount order is untouched: Features before Comparison before Wizards, Pricing after Hero and before FreeLocalAI (#10)', () => {
  const heroIdx = homePage.indexOf('<Hero');
  const pricingIdx = homePage.indexOf('<Pricing');
  const freeLocalAiIdx = homePage.indexOf('<FreeLocalAI');
  const featuresIdx = homePage.indexOf('<Features');
  const comparisonIdx = homePage.indexOf('<Comparison');
  const wizardsIdx = homePage.indexOf('<Wizards');
  assert.ok(
    [heroIdx, pricingIdx, freeLocalAiIdx, featuresIdx, comparisonIdx, wizardsIdx].every((i) => i !== -1),
    'expected all six sections to be mounted on the homepage',
  );
  assert.ok(heroIdx < pricingIdx, 'Pricing must render after Hero');
  assert.ok(pricingIdx < freeLocalAiIdx, 'Pricing must render before FreeLocalAI');
  assert.ok(featuresIdx < comparisonIdx, 'Features must render before Comparison');
  assert.ok(comparisonIdx < wizardsIdx, 'Comparison must render before Wizards');
});
