import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const robots = readFileSync(join(__dirname, '..', '..', 'public', 'robots.txt'), 'utf8');

test('robots.txt declares Content-Signal preferences for ai-train, search, and ai-input', () => {
  const signalLines = robots
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.toLowerCase().startsWith('content-signal:'));
  assert.ok(signalLines.length >= 1, 'expected at least one Content-Signal directive');

  const declared = Object.fromEntries(
    signalLines
      .flatMap((line) => line.slice(line.indexOf(':') + 1).split(','))
      .map((pair) => pair.trim().split('=').map((s) => s.trim()))
      .filter((pair) => pair.length === 2),
  );
  for (const key of ['ai-train', 'search', 'ai-input']) {
    assert.match(declared[key] ?? '', /^(yes|no)$/, `missing or invalid preference for ${key}`);
  }
});
