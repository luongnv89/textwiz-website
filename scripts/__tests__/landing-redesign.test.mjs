import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// This repo has no React rendering/test framework (no jsdom, RTL, or Vitest —
// see AGENTS.md: only `node --test` over scripts/__tests__/**). These tests
// verify the landing-page redesign contract by reading component source
// directly, matching the project's existing Node-test-only conventions.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const readSrc = (rel) => readFileSync(path.join(__dirname, '../../src', rel), 'utf8');

const homePage = readSrc('pages/HomePage.jsx');
const hero = readSrc('components/Hero.jsx');
const howItWorks = readSrc('components/HowItWorks.jsx');
const wizards = readSrc('components/Wizards.jsx');
const privacy = readSrc('components/Privacy.jsx');
const pricing = readSrc('components/Pricing.jsx');
const finalCta = readSrc('components/FinalCTA.jsx');
const navigation = readSrc('components/Navigation.jsx');
const faqDataSrc = readSrc('lib/faqData.js');

test('HomePage mounts the seven redesigned sections in order and nothing removed', () => {
  const order = ['<Hero', '<HowItWorks', '<Wizards', '<Privacy', '<Pricing', '<FAQ', '<FinalCTA'];
  const indices = order.map((marker) => homePage.indexOf(marker));
  for (let i = 0; i < indices.length; i += 1) {
    assert.notEqual(indices[i], -1, `expected HomePage to mount ${order[i]}`);
  }
  for (let i = 1; i < indices.length; i += 1) {
    assert.ok(indices[i] > indices[i - 1], `${order[i]} must render after ${order[i - 1]}`);
  }
  assert.doesNotMatch(homePage, /Testimonials|HonestNote|Comparison|Features|FreeLocalAI|Screenshots/);
});

test('Hero: numeric-outcome headline, one primary CTA, poster-first video', () => {
  assert.match(hero, /Fix any sentence in \d+ seconds/);
  assert.equal((hero.match(/<MacAppStoreBadge/g) || []).length, 1);
  assert.match(hero, /poster=/);
  assert.doesNotMatch(hero, /autoPlay/);
  assert.doesNotMatch(hero, /Still pasting/);
});

test('HowItWorks: three steps, the shortcut, and the embedded sample', () => {
  assert.match(howItWorks, /id="how-it-works"/);
  assert.match(howItWorks, /01/);
  assert.match(howItWorks, /02/);
  assert.match(howItWorks, /03/);
  assert.match(howItWorks, /<Shortcut/);
  assert.match(howItWorks, /<InteractiveSample/);
});

test('Wizards: data-driven, upcoming gated by collection.upcoming, no amber pills', () => {
  assert.match(wizards, /wizardCollections/);
  assert.match(wizards, /Next update/);
  assert.match(wizards, /collection\.upcoming/);
  assert.doesNotMatch(wizards, /bg-amber-|Coming soon|Analyst/);
});

test('Privacy: id, Accessibility claim, setup-guide link', () => {
  assert.match(privacy, /id="privacy"/);
  assert.match(privacy, /Accessibility permission/);
  assert.match(privacy, /to="\/getting-started"/);
});

test('Pricing: shared constants, one badge, collapsible fine print, no FAQ button', () => {
  assert.match(pricing, /PRO_PLANS/);
  assert.match(pricing, /PRO_SWITCH_DATE_LABEL/);
  assert.match(pricing, /MANAGE_SUBSCRIPTION_PATH/);
  assert.match(pricing, /<details/);
  assert.equal((pricing.match(/<MacAppStoreBadge/g) || []).length, 1);
  assert.doesNotMatch(pricing, /Read the FAQ/);
});

test('FinalCTA: one badge and a three-line developer note replacing the essay', () => {
  assert.equal((finalCta.match(/<MacAppStoreBadge/g) || []).length, 1);
  assert.match(finalCta, /Luong Nguyen/);
  assert.match(finalCta, /to="\/feedback"/);
  assert.match(finalCta, /issues\/new\/choose/);
  assert.doesNotMatch(finalCta, /laziness|five-star/);
});

test('Navigation: desktop and mobile expose the four landing anchors plus routes, a11y wiring intact', () => {
  for (const target of ['how-it-works', 'wizards', 'pricing', 'faq']) {
    assert.match(navigation, new RegExp(`scrollToSection\\('${target}'\\)`), `missing desktop target ${target}`);
    assert.match(navigation, new RegExp(`handleMobileNavClick\\('${target}'\\)`), `missing mobile target ${target}`);
  }
  const panelIdx = navigation.indexOf('id="mobile-menu"');
  assert.notEqual(panelIdx, -1, 'expected a mobile menu panel');
  const panel = navigation.slice(panelIdx);
  assert.match(panel, />\s*Setup guide\s*</);
  assert.match(panel, />\s*Changelog\s*</);
  assert.match(panel, />\s*Feedback\s*</);
  assert.match(navigation, /aria-controls="mobile-menu"/);
  assert.match(navigation, /aria-expanded=\{isMenuOpen\}/);
  assert.match(navigation, /event\.key === ['"]Escape['"]/);
  assert.match(navigation, /menuToggleRef\.current\?\.focus\(\)/);
});

test('Palette: green and amber are never backgrounds on the landing page', () => {
  const files = [
    'Hero',
    'HowItWorks',
    'InteractiveSample',
    'Wizards',
    'Privacy',
    'Pricing',
    'FAQ',
    'FinalCTA',
    'Navigation',
    'MacWindow',
    'Kbd',
  ];
  for (const name of files) {
    const source = readSrc(`components/${name}.jsx`);
    assert.doesNotMatch(source, /bg-(primary|emerald|amber|green)-\d/, `${name} uses an accent as a background`);
    assert.doesNotMatch(source, /bg-gradient-to|from-(primary|emerald)-/, `${name} uses a gradient tint`);
  }
});

test('Landing captions meet contrast and standalone links meet mobile target sizing', () => {
  const contrastSources = [
    hero,
    howItWorks,
    wizards,
    privacy,
    pricing,
    readSrc('components/InteractiveSample.jsx'),
    readSrc('components/FAQ.jsx'),
    readSrc('components/MacWindow.jsx'),
  ];

  for (const source of contrastSources) {
    assert.doesNotMatch(source, /<(?:p|span)[^>]*text-primary-700/);
    assert.doesNotMatch(source, /dark:text-slate-500/);
  }

  assert.match(hero, /href="#how-it-works"[\s\S]*?className="[^"]*min-h-11/);
  assert.match(wizards, /to="\/getting-started"[\s\S]*?className="[^"]*min-h-11/);
  assert.match(privacy, /to="\/getting-started"[\s\S]*?className="[^"]*min-h-11/);
  assert.match(finalCta, /quietLink\s*=\s*[^;]*min-h-11/);
});

test('FAQ data carries the comparison answer and nothing imports the deleted comparison table', () => {
  assert.match(faqDataSrc, /different from ChatGPT, Grammarly/);
  const srcRoot = path.join(__dirname, '../../src');
  const entries = readdirSync(srcRoot, { recursive: true, withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const filePath = path.join(entry.parentPath ?? entry.path, entry.name);
    const source = readFileSync(filePath, 'utf8');
    assert.doesNotMatch(source, /comparisonData/, `${entry.name} still references comparisonData`);
  }
});
