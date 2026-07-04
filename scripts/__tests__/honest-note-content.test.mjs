import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// See hero-content.test.mjs for why these are source-text content-contract
// tests rather than rendered-DOM tests: this repo has no React test runner.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const honestNote = readFileSync(path.join(__dirname, '../../src/components/HonestNote.jsx'), 'utf8');

test('HonestNote includes a visible founder card (#11)', () => {
  assert.match(honestNote, /Why I built TextWiz/);
  assert.match(honestNote, /Luong Nguyen/);
});

test('HonestNote founder card references the select → shortcut → result workflow (#11)', () => {
  const cardIdx = honestNote.indexOf('Why I built TextWiz');
  assert.notEqual(cardIdx, -1);
  const cardBlock = honestNote.slice(cardIdx, cardIdx + 400);
  assert.match(cardBlock, /⌘⇧Space/);
  assert.match(cardBlock, /rewrite back/i);
});

test('HonestNote demotes feedback/GitHub CTAs to quiet links, not filled buttons (#5)', () => {
  assert.doesNotMatch(honestNote, /bg-primary-600 hover:bg-primary-700/, 'old filled-button treatment should be gone');
  assert.match(honestNote, /Send me feedback/);
  assert.match(honestNote, /Report on GitHub/);
  const feedbackBlockMatch = honestNote.match(/href="\/feedback"[\s\S]{0,200}/);
  assert.ok(feedbackBlockMatch);
  assert.match(feedbackBlockMatch[0], /underline/);
});

test('HonestNote no longer flatly claims "No testimonials yet" (#6 reconciliation)', () => {
  assert.doesNotMatch(honestNote, /No testimonials yet/);
});

test('HonestNote closing note points to the new First users section instead of promising to add quotes inline (#6)', () => {
  assert.match(honestNote, /First users section/);
});
