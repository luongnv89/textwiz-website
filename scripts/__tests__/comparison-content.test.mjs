import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { comparisonColumns, comparisonRows, getStatusLabel } from '../../src/lib/comparisonData.js';

// This repo has no React rendering/test framework (no jsdom, RTL, or Vitest —
// see AGENTS.md: only `node --test` over scripts/__tests__/**). These tests
// verify the "How TextWiz compares" section (#7) by combining a direct data
// import with source-text checks, matching interactive-sample-content.test.mjs.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const comparisonData = readFileSync(path.join(__dirname, '../../src/lib/comparisonData.js'), 'utf8');
const comparison = readFileSync(path.join(__dirname, '../../src/components/Comparison.jsx'), 'utf8');
const homePage = readFileSync(path.join(__dirname, '../../src/pages/HomePage.jsx'), 'utf8');

const REQUIRED_DIFFERENTIATOR_PATTERNS = [
  /works in every mac app/i,
  /local ai option/i,
  /no macos accessibility permission/i,
  /usable for free/i,
  /no per-token bills/i,
  /one-keystroke rewrite/i,
];

test('comparisonRows covers all six required differentiators (#7)', () => {
  assert.ok(Array.isArray(comparisonRows));
  const features = comparisonRows.map((row) => row.feature).join(' | ');
  for (const pattern of REQUIRED_DIFFERENTIATOR_PATTERNS) {
    assert.match(features, pattern, `expected a comparison row matching ${pattern}`);
  }
});

test('comparisonColumns names TextWiz plus at least three alternatives (#7)', () => {
  assert.ok(Array.isArray(comparisonColumns));
  const keys = comparisonColumns.map((c) => c.key);
  assert.ok(keys.includes('textwiz'), 'TextWiz must be a column');
  assert.ok(comparisonColumns.length >= 4, 'expected TextWiz plus at least three named alternatives');
});

test('every comparison row has a cell for every column with a status and a note (#7)', () => {
  const validStatuses = new Set(['yes', 'partial', 'no', 'n/a']);
  for (const row of comparisonRows) {
    for (const column of comparisonColumns) {
      const cell = row[column.key];
      assert.ok(cell, `row "${row.feature}" is missing a cell for column "${column.key}"`);
      assert.ok(validStatuses.has(cell.status), `unexpected status "${cell.status}" in row "${row.feature}"`);
      assert.ok(cell.note && cell.note.trim().length > 0, `row "${row.feature}" column "${column.key}" has no note`);
    }
  }
});

test('getStatusLabel returns a human-readable label for every status used (#7)', () => {
  for (const row of comparisonRows) {
    for (const column of comparisonColumns) {
      const label = getStatusLabel(row[column.key].status);
      assert.ok(label && label !== 'Unknown', `expected a label for status "${row[column.key].status}"`);
    }
  }
});

test('the TextWiz column names every claim TextWiz already makes elsewhere on the page, not a new one (#7)', () => {
  // TextWiz cells should read as a restatement of Features.jsx/FreeLocalAI.jsx
  // copy, not an invented claim — spot-check a few defining phrases.
  const textwizNotes = comparisonRows.map((row) => row.textwiz.note).join(' ');
  assert.match(textwizNotes, /⌘⇧Space/);
  assert.match(textwizNotes, /on-device/i);
  assert.match(textwizNotes, /Demo provider/i);
});

test('named alternatives (ChatGPT-style, Grammarly, Elephas/BoltAI-style) appear in the comparison (#7)', () => {
  assert.match(comparisonData, /ChatGPT-style/);
  assert.match(comparisonData, /Grammarly/);
  assert.match(comparisonData, /Elephas\/BoltAI-style/);
});

test('Comparison renders its content from comparisonData.js rather than hardcoding competitor claims (#7)', () => {
  assert.match(comparison, /from ['"]\.\.\/lib\/comparisonData['"]/);
  assert.match(comparison, /comparisonRows/);
  assert.match(comparison, /comparisonColumns/);
  // The component should map over rows/columns rather than hardcode row text.
  assert.doesNotMatch(comparison, /Grammarly/);
  assert.doesNotMatch(comparison, /ChatGPT/);
});

test('Comparison stays readable at mobile width, not just a wide desktop table (#7)', () => {
  assert.match(comparison, /md:hidden/, 'expected a mobile-only layout, not table-only markup');
  assert.match(comparison, /hidden md:block/, 'expected the table to be desktop-only');
});

test('Comparison frames the section around privacy and local-first positioning, not price alone (#7)', () => {
  assert.match(comparison, /premium/i);
  assert.match(comparison, /local-first|local ai/i);
  assert.match(comparison, /token meter|token cost|per-token/i);
});

// TextWiz Pro is an auto-renewable subscription (#41). The comparison section
// sat three sections below the pricing cards claiming the opposite, and the
// tests above previously required that claim. Forbid it on every surface the
// section renders from.
const DEAD_PRICING_CLAIMS = [/one-time purchase/i, /one-time-purchase/i, /pay once/i, /no subscription/i, /\$4\.99/];

test('no comparison surface claims TextWiz is a one-time purchase (#41)', () => {
  for (const [name, source] of [['comparisonData.js', comparisonData], ['Comparison.jsx', comparison]]) {
    for (const claim of DEAD_PRICING_CLAIMS) {
      assert.doesNotMatch(source, claim, `${name} still claims ${claim}; TextWiz Pro is a subscription`);
    }
  }
});

test('no comparison row asserts a pricing-model advantage for TextWiz (#41)', () => {
  for (const row of comparisonRows) {
    assert.doesNotMatch(row.feature, /subscription|purchase|price|pricing/i, `row "${row.feature}" makes the table an argument about the billing model`);
  }
});

test('Comparison and comparisonData avoid unverifiable competitor pricing figures or absolute superlatives (#7)', () => {
  for (const source of [comparisonData, comparison]) {
    assert.doesNotMatch(source, /\$\s?\d/, 'no specific dollar figures for any competitor');
    assert.doesNotMatch(source, /\b(guarantee[sd]?|100%|cheapest|always|best[- ]in[- ]class)\b/i);
  }
});

test('Comparison cites viral principles #31, #32, and #19 in source (#7)', () => {
  for (const source of [comparisonData, comparison]) {
    assert.match(source, /#31/);
    assert.match(source, /#32/);
    assert.match(source, /#19/);
  }
});

test('HomePage mounts Comparison immediately after Features (#7)', () => {
  assert.match(homePage, /import Comparison from ['"]\.\.\/components\/Comparison['"]/);
  assert.match(homePage, /<Comparison\s*\/>/);
  const featuresIdx = homePage.indexOf('<Features');
  const comparisonIdx = homePage.indexOf('<Comparison');
  const wizardsIdx = homePage.indexOf('<Wizards');
  assert.ok(featuresIdx !== -1 && comparisonIdx !== -1 && wizardsIdx !== -1);
  assert.ok(featuresIdx < comparisonIdx, 'Comparison must render after Features');
  assert.ok(comparisonIdx < wizardsIdx, 'Comparison must render before Wizards');
});
