import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Visual QA (#33) found the desktop nav rendering "Pricing" twice — once at the
// head of the list and again after "Wizards". These guard the single entry and
// keep the in-page nav order matching the order the sections appear on the page.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const read = (rel) => readFileSync(path.join(__dirname, '../..', rel), 'utf8');

const nav = read('src/components/Navigation.jsx');
const home = read('src/pages/HomePage.jsx');

test('the desktop nav links to the pricing section exactly once (#33)', () => {
  const hits = nav.match(/scrollToSection\('pricing'\)/g) || [];
  assert.equal(hits.length, 1, `expected one desktop Pricing link, found ${hits.length}`);
});

test('every in-page nav target appears exactly once (#33)', () => {
  const targets = [...nav.matchAll(/scrollToSection\('([a-z-]+)'\)/g)].map((m) => m[1]);
  assert.deepEqual([...new Set(targets)], targets, `duplicate nav targets: ${targets.join(', ')}`);
});

test('in-page nav order follows the order the sections render on the home page (#33)', () => {
  const targets = [...nav.matchAll(/scrollToSection\('([a-z-]+)'\)/g)].map((m) => m[1]);
  const componentFor = { pricing: 'Pricing', features: 'Features', wizards: 'Wizards', faq: 'FAQ' };

  const positions = targets.map((t) => {
    const component = componentFor[t];
    assert.ok(component, `no HomePage component mapped for nav target "${t}"`);
    const at = home.indexOf(`<${component} />`);
    assert.notEqual(at, -1, `HomePage does not render <${component} />`);
    return at;
  });

  assert.deepEqual(positions, [...positions].sort((a, b) => a - b), `nav order ${targets.join(', ')} does not match page order`);
});
