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

// Helper shared by the #22 scannability tests below: isolate the founder-note
// prose block (the space-y-5 wrapper) from the rest of the file so paragraph
// counts aren't skewed by the founder card, CTAs, or closing note.
function getProseBlock(source) {
  const proseStart = source.indexOf('text-lg text-gray-600 dark:text-slate-300 leading-relaxed');
  assert.notEqual(proseStart, -1, 'expected to find the founder-note prose wrapper');
  const proseEnd = source.indexOf('</div>', proseStart);
  assert.notEqual(proseEnd, -1, 'expected the prose wrapper to close with </div>');
  return source.slice(proseStart, proseEnd);
}

test('HonestNote breaks the founder note into 2-3 plain narrative paragraphs, down from 4 (#22)', () => {
  const proseBlock = getProseBlock(honestNote);
  const plainParagraphs = proseBlock.match(/<p>/g) || [];
  assert.ok(
    plainParagraphs.length >= 2 && plainParagraphs.length <= 3,
    `expected 2-3 plain narrative paragraphs, found ${plainParagraphs.length}`
  );
});

test('HonestNote introduces exactly one visually distinct pull-quote as a scannable break (#22)', () => {
  const proseBlock = getProseBlock(honestNote);
  const pullQuotes = proseBlock.match(/<p className="[^"]*font-bold[^"]*">/g) || [];
  assert.equal(pullQuotes.length, 1, 'expected exactly one bolded pull-quote paragraph');
});

test('HonestNote preserves key substance of the founder note after restructuring (#22)', () => {
  assert.match(honestNote, /six months/);
  assert.match(honestNote, /Mac App Store/);
  assert.match(honestNote, /fake five-star reviews/);
  assert.match(honestNote, /word of mouth/);
  assert.match(honestNote, /one more pass/);
});
