import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Visual QA (#33): the plan table in Terms section 5 overflowed its scroll
// container at phone width, clipping the "Introductory offer" column with no
// affordance that it scrolled. Cell padding is now narrow by default and only
// widens from the sm breakpoint, so the table fits from 360px up.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const terms = readFileSync(path.join(__dirname, '../../src/pages/TermsPage.jsx'), 'utf8');

// Scope every assertion to the table itself. `px-4 py-3` is a house idiom used
// elsewhere in the app, so a whole-file scan would fail on unrelated markup and
// blame the plan table for it.
function planTable() {
  const open = terms.indexOf('<table');
  assert.notEqual(open, -1, 'expected a plan table in TermsPage');
  const close = terms.indexOf('</table>', open);
  assert.notEqual(close, -1, 'expected the plan table to be closed');
  return { markup: terms.slice(open, close), before: terms.slice(0, open) };
}

test('the plan table sits inside a horizontal scroll container (#33)', () => {
  const { before } = planTable();
  const wrapper = before.slice(-200);
  assert.match(wrapper, /overflow-x-auto/, 'the element wrapping the plan table no longer scrolls horizontally');
});

test('plan table cells use narrow padding until the sm breakpoint (#33)', () => {
  const { markup } = planTable();
  const cells = markup.match(/<t[hd][\s>]/g) || [];
  const responsive = markup.match(/px-2 py-3 sm:px-4/g) || [];

  assert.ok(cells.length >= 8, `expected at least 8 plan-table cells, found ${cells.length}`);
  assert.equal(responsive.length, cells.length, 'every plan-table cell should use the responsive padding');
  assert.doesNotMatch(markup, /px-4 py-3/, 'a plan-table cell still hardcodes wide padding at phone width');
});

test('the plan table renders one row per plan from shared pricing data (#33)', () => {
  const { markup } = planTable();
  assert.match(markup, /PRO_PLANS\.map/, 'plan rows should come from shared pricing data, not hardcoded markup');
});
