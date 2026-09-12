import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { beforeText, sampleTransformations } from '../../src/lib/sampleData.js';

// This repo has no React rendering/test framework (no jsdom, RTL, or Vitest —
// see AGENTS.md: only `node --test` over scripts/__tests__/**). These tests
// verify the interactive before/after sample (#8) by combining a direct data
// import with source-text checks, matching the project's existing conventions.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const interactiveSample = readFileSync(
  path.join(__dirname, '../../src/components/InteractiveSample.jsx'),
  'utf8',
);
const howItWorks = readFileSync(
  path.join(__dirname, '../../src/components/HowItWorks.jsx'),
  'utf8',
);
const homePage = readFileSync(path.join(__dirname, '../../src/pages/HomePage.jsx'), 'utf8');

test('sampleTransformations offers exactly Proofread, Concise, and Professional (#8)', () => {
  assert.ok(Array.isArray(sampleTransformations));
  const ids = sampleTransformations.map((item) => item.id).sort();
  assert.deepEqual(ids, ['concise', 'professional', 'proofread']);
});

test('each sample transformation has non-empty after text distinct from the before text (#8)', () => {
  for (const item of sampleTransformations) {
    assert.ok(item.after && item.after.trim().length > 0, `${item.id} must have non-empty after text`);
    assert.notEqual(item.after, beforeText, `${item.id} after text must differ from beforeText`);
  }
});

test('the three sample after texts are distinct from each other (#8)', () => {
  const afters = sampleTransformations.map((item) => item.after);
  const unique = new Set(afters);
  assert.equal(unique.size, afters.length, 'each transformation must produce distinct sample copy');
});

test('InteractiveSample clearly labels canned output as a sample result (#8)', () => {
  assert.match(interactiveSample, /Sample result/);
  assert.match(interactiveSample, /not a live AI call/i);
});

test('InteractiveSample makes no network/API calls (#8)', () => {
  assert.doesNotMatch(interactiveSample, /fetch\(/);
  assert.doesNotMatch(interactiveSample, /axios/);
  assert.doesNotMatch(interactiveSample, /XMLHttpRequest/);
  assert.doesNotMatch(interactiveSample, /sk-[A-Za-z0-9_-]{10,}/);
  assert.doesNotMatch(interactiveSample, /AKIA[0-9A-Z]{10,}/);
});

test('InteractiveSample traces to viral principle #25 in source (#8)', () => {
  assert.match(interactiveSample, /#25/);
});

test('HowItWorks mounts InteractiveSample and HomePage mounts HowItWorks (#8)', () => {
  assert.match(howItWorks, /<InteractiveSample/);
  assert.match(homePage, /<HowItWorks/);
});
