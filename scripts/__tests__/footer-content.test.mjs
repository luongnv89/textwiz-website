import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// This repo has no React rendering/test framework (no jsdom, RTL, or Vitest —
// see AGENTS.md: only `node --test` over scripts/__tests__/**). These tests
// verify the footer's closing-line/CTA contract by reading the component
// source directly, matching the project's existing Node-test-only conventions.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const footer = readFileSync(path.join(__dirname, '../../src/components/Footer.jsx'), 'utf8');

test('Footer has exactly one CTA — the Mac App Store badge (#12)', () => {
  const badgeCount = (footer.match(/<MacAppStoreBadge/g) || []).length;
  assert.equal(badgeCount, 1);
});

test('Footer ends with a memorable line before the copyright fine print (#12)', () => {
  const taglineIdx = footer.indexOf('Your words stay on your Mac. The polish shows everywhere.');
  const copyrightIdx = footer.indexOf('All rights reserved');
  assert.notEqual(taglineIdx, -1, 'expected the shareable closing line');
  assert.notEqual(copyrightIdx, -1, 'expected the copyright fine print');
  assert.ok(taglineIdx < copyrightIdx, 'shareable line must render before the copyright/legal row');
});

test('Footer cites viral principle #4 in a comment explaining the closing block (#12)', () => {
  assert.match(footer, /viral principle #4/i);
});
