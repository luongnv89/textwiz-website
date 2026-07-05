import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Cross-file checks spanning Hero/HonestNote/FinalCTA/Testimonials/HomePage —
// the "integration" layer for a repo with no component-rendering framework
// (see hero-content.test.mjs for why these are source-text based).
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const readSrc = (rel) => readFileSync(path.join(__dirname, '../../src', rel), 'utf8');

const hero = readSrc('components/Hero.jsx');
const honestNote = readSrc('components/HonestNote.jsx');
const finalCta = readSrc('components/FinalCTA.jsx');
const testimonials = readSrc('components/Testimonials.jsx');
const homePage = readSrc('pages/HomePage.jsx');

test('exactly one primary CTA style (MacAppStoreBadge) is used across Hero and FinalCTA (#5)', () => {
  assert.equal((hero.match(/<MacAppStoreBadge/g) || []).length, 1);
  assert.equal((finalCta.match(/<MacAppStoreBadge/g) || []).length, 1);
});

test('no full-weight "loud" button classes remain on secondary CTAs in Hero, HonestNote, or FinalCTA (#5)', () => {
  // The three call sites called out in issue #5 all used to share one of
  // these full-weight treatments for what should be a secondary action.
  const loudButtonMarkers = [/px-8 py-3\.5/, /bg-primary-600 hover:bg-primary-700/, /rounded-xl transition-all/];
  for (const source of [hero, honestNote, finalCta]) {
    for (const marker of loudButtonMarkers) {
      assert.doesNotMatch(source, marker);
    }
  }
});

test('secondary CTAs share the same quiet text-link treatment across Hero, HonestNote, and FinalCTA (#5)', () => {
  const quietLinkMarker = /underline underline-offset-4 decoration-gray-300/;
  assert.match(hero, quietLinkMarker);
  assert.match(honestNote, quietLinkMarker);
  assert.match(finalCta, quietLinkMarker);
});

test('HomePage mounts Testimonials directly above HonestNote (#6)', () => {
  const testimonialsIdx = homePage.indexOf('<Testimonials');
  const honestNoteIdx = homePage.indexOf('<HonestNote');
  assert.notEqual(testimonialsIdx, -1, 'Testimonials must be mounted on the homepage');
  assert.notEqual(honestNoteIdx, -1, 'HonestNote must still be mounted on the homepage');
  assert.ok(
    testimonialsIdx < honestNoteIdx,
    'Testimonials must render above HonestNote so its "section above" copy is accurate',
  );
});

test('Testimonials ships an honest placeholder with no fabricated quotes when the dataset is empty (#6)', () => {
  assert.match(testimonials, /collecting first-user stories/i);
  assert.match(testimonials, /nothing fabricated/i);
  assert.match(testimonials, /getFeaturedTestimonials/);
});

test('Testimonials links back to the feedback flow that will supply real quotes (#6)', () => {
  const shareLinkMatch = testimonials.match(/href="\/feedback"[\s\S]{0,200}/);
  assert.ok(shareLinkMatch, 'expected a feedback link in the honest-placeholder state');
});

test('HomePage mounts Comparison directly after Features and before Wizards (#7)', () => {
  const featuresIdx = homePage.indexOf('<Features');
  const comparisonIdx = homePage.indexOf('<Comparison');
  const wizardsIdx = homePage.indexOf('<Wizards');
  assert.notEqual(featuresIdx, -1, 'Features must be mounted on the homepage');
  assert.notEqual(comparisonIdx, -1, 'Comparison must be mounted on the homepage');
  assert.notEqual(wizardsIdx, -1, 'Wizards must still be mounted on the homepage');
  assert.ok(featuresIdx < comparisonIdx, 'Comparison must render immediately after Features');
  assert.ok(comparisonIdx < wizardsIdx, 'Comparison must render before Wizards');
});
