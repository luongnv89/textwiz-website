import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// This repo has no React rendering/test framework (no jsdom, RTL, or Vitest —
// see AGENTS.md: only `node --test` over scripts/__tests__/**). These tests
// verify the landing copy/CTA contract by reading the component source
// directly, matching the project's existing Node-test-only conventions.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const hero = readFileSync(path.join(__dirname, '../../src/components/Hero.jsx'), 'utf8');

test('Hero states the pain before the outcome headline (#9)', () => {
  const painIdx = hero.indexOf('Still pasting private text into browser tabs?');
  const headlineIdx = hero.indexOf('Fix any sentence in 2 seconds');
  assert.notEqual(painIdx, -1, 'expected the pain line under the hero badge');
  assert.notEqual(headlineIdx, -1, 'expected the measurable-outcome headline');
  assert.ok(painIdx < headlineIdx, 'pain line must render before the headline (pain before pitch)');
});

test('Hero headline communicates a measurable numeric outcome (#4)', () => {
  assert.match(hero, /Fix any sentence in \d+ seconds/);
  assert.doesNotMatch(hero, /Select\.\s*Click\.\s*Perfect\./, 'old adjective-only headline should be gone');
});

test('Hero subhead preserves private/local/no-token-bills positioning (#4)', () => {
  assert.match(hero, /No servers\.\s+No token\s+bills\./);
  assert.match(hero, /private AI rewrite/i);
});

test('Hero has exactly one visually primary CTA — the Mac App Store badge (#5)', () => {
  const badgeCount = (hero.match(/<MacAppStoreBadge/g) || []).length;
  assert.equal(badgeCount, 1);
  // The old full-weight button classes used by "See how it works" must be gone.
  assert.doesNotMatch(hero, /px-8 py-3\.5/);
});

test('Hero demotes "See how it works" to a quiet text link (#5)', () => {
  assert.match(hero, /See how it works/);
  const linkBlockMatch = hero.match(/href="#screenshots"[\s\S]{0,200}/);
  assert.ok(linkBlockMatch, 'expected the #screenshots link to still exist');
  assert.match(linkBlockMatch[0], /underline/);
});
