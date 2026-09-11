import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// This repo has no React rendering/test framework (no jsdom, RTL, or Vitest —
// see AGENTS.md: only `node --test` over scripts/__tests__/**). These tests
// guard the OG/Twitter share-image contract by reading the raw source (and,
// for the PNG, the raw header bytes) directly, matching the project's
// existing Node-test-only conventions.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '../..');
const html = readFileSync(path.join(rootDir, 'index.html'), 'utf8');
const site = readFileSync(path.join(rootDir, 'src/lib/site.js'), 'utf8');
const generatorSource = readFileSync(path.join(rootDir, 'scripts/generate-og-image.py'), 'utf8');

const ogImageMatch = html.match(/<meta property="og:image" content="([^"]+)"/);
const twitterImageMatch = html.match(/<meta name="twitter:image" content="([^"]+)"/);
const defaultOgImageMatch = site.match(/DEFAULT_OG_IMAGE = '([^']+)'/);

test('index.html og:image and twitter:image reference the same URL (#12)', () => {
  assert.ok(ogImageMatch, 'expected an og:image meta tag');
  assert.ok(twitterImageMatch, 'expected a twitter:image meta tag');
  assert.equal(ogImageMatch[1], twitterImageMatch[1]);
});

test('static og:image matches the client-rendered DEFAULT_OG_IMAGE (#12)', () => {
  assert.ok(defaultOgImageMatch, 'expected DEFAULT_OG_IMAGE in src/lib/site.js');
  assert.equal(ogImageMatch[1], defaultOgImageMatch[1]);
});

test('share image references are no longer the raw product screenshot (#12)', () => {
  assert.doesNotMatch(ogImageMatch[1], /writing-screen-light\.png/);
  assert.doesNotMatch(defaultOgImageMatch[1], /writing-screen-light\.png/);
});

test('public/og-image.png is exactly 1200x630 (#12)', () => {
  const png = readFileSync(path.join(rootDir, 'public/og-image.png'));
  // PNG signature (8 bytes) + IHDR length (4) + "IHDR" (4) = 16, then width/height as big-endian UInt32.
  const width = png.readUInt32BE(16);
  const height = png.readUInt32BE(20);
  assert.equal(width, 1200);
  assert.equal(height, 630);
});

test('generate-og-image.py cites viral principle #5 in its docstring (#12)', () => {
  assert.match(generatorSource, /viral principle #5/i);
});
