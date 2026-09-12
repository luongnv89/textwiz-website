import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { PRO_PLANS } from '../../src/lib/pricing.js';

// Visual QA (#33): the plan table in Terms section 5 overflowed its scroll
// container at phone width, clipping the "Introductory offer" column with no
// affordance that it scrolled. Cell padding is now narrow by default and only
// widens from the sm breakpoint, so the table fits from 360px up.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const terms = readFileSync(path.join(__dirname, '../../src/pages/TermsPage.jsx'), 'utf8');

test('the plan table stays inside a horizontal scroll container (#33)', () => {
  assert.match(terms, /overflow-x-auto/);
});

test('plan table cells use narrow padding until the sm breakpoint (#33)', () => {
  const responsive = (terms.match(/px-2 py-3 sm:px-4/g) || []).length;
  const cells = (terms.match(/<t[hd][ >]/g) || []).length;
  assert.ok(responsive >= 8, `expected every plan-table cell to use responsive padding, found ${responsive}`);
  assert.ok(cells >= responsive, 'more responsive padding classes than table cells');
  assert.doesNotMatch(terms, /className="px-4 py-3/, 'a plan-table cell still hardcodes wide padding at phone width');
});

test('the plan table renders one row per plan from shared pricing data (#33)', () => {
  assert.match(terms, /PRO_PLANS\.map/);
  assert.equal(PRO_PLANS.length, 3);
});
