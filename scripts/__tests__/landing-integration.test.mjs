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
const navigation = readSrc('components/Navigation.jsx');
const structuredData = readSrc('components/StructuredData.jsx');
const faqDataSrc = readSrc('lib/faqData.js');

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

test('HomePage mounts Pricing directly after Hero and before FreeLocalAI (#3)', () => {
  assert.match(homePage, /import Pricing from ['"]\.\.\/components\/Pricing['"]/);
  assert.match(homePage, /<Pricing\s*\/>/);
  const heroIdx = homePage.indexOf('<Hero');
  const pricingIdx = homePage.indexOf('<Pricing');
  const freeLocalAiIdx = homePage.indexOf('<FreeLocalAI');
  assert.ok(heroIdx !== -1 && pricingIdx !== -1 && freeLocalAiIdx !== -1);
  assert.ok(heroIdx < pricingIdx, 'Pricing must render after Hero');
  assert.ok(pricingIdx < freeLocalAiIdx, 'Pricing must render before FreeLocalAI');
});

test('Navigation exposes a Pricing link using the existing scrollToSection pattern (#3)', () => {
  assert.match(navigation, /scrollToSection\(['"]pricing['"]\)/);
  assert.match(navigation, />\s*Pricing\s*</);
});

test('Navigation places Pricing first, ahead of Features, matching the post-Hero scroll order (#3)', () => {
  const pricingIdx = navigation.indexOf("scrollToSection('pricing')");
  const featuresIdx = navigation.indexOf("scrollToSection('features')");
  assert.notEqual(pricingIdx, -1, 'expected a Pricing nav button');
  assert.notEqual(featuresIdx, -1, 'expected a Features nav button');
  assert.ok(pricingIdx < featuresIdx, 'Pricing button must come before Features to match scroll order');
});

test('StructuredData and faqData import the shared price constant instead of hardcoding a duplicate literal (#3)', () => {
  assert.match(structuredData, /from ['"]\.\.\/lib\/pricing['"]/);
  assert.match(faqDataSrc, /from ['"]\.\/pricing\.js['"]/);
  assert.doesNotMatch(structuredData, /['"`]4\.99['"`]/, 'StructuredData must not hardcode the price literal');
  assert.doesNotMatch(faqDataSrc, /['"`]4\.99['"`]/, 'faqData must not hardcode the price literal');
});

test('Navigation renders a mobile menu toggle button wired with aria-expanded/aria-controls/aria-label for keyboard and screen-reader use (#19)', () => {
  assert.match(navigation, /id="mobile-menu"/, 'expected a mobile menu panel with id="mobile-menu"');
  assert.match(navigation, /aria-controls="mobile-menu"/);
  assert.match(navigation, /aria-expanded=\{isMenuOpen\}/);
  assert.match(navigation, /aria-label=\{isMenuOpen \? ['"]Close menu['"] : ['"]Open menu['"]\}/);
});

test('Navigation mobile toggle uses the Menu/X icon swap and the shared focus-visible ring convention, while keeping the Mac App Store badge (#19)', () => {
  assert.match(navigation, /import\s*{\s*Menu,\s*X\s*}\s*from ['"]lucide-react['"]/);
  assert.match(navigation, /<Menu\b/, 'expected a Menu icon for the closed state');
  assert.match(navigation, /<X\b/, 'expected an X icon for the open state');
  assert.match(
    navigation,
    /focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500/,
    'expected the toggle button to reuse the existing focus-visible convention',
  );
  assert.match(navigation, /<MacAppStoreBadge height=\{32\} \/>/, 'the compact badge must remain next to the new toggle');
});

test('Navigation mobile menu uses a plain useState idiom for open/close state, matching the FAQ disclosure precedent (#19)', () => {
  assert.match(navigation, /const \[isMenuOpen, setIsMenuOpen\] = useState\(false\)/);
});

test('Navigation mobile menu panel exposes all seven desktop nav destinations (#19)', () => {
  const panelIdx = navigation.indexOf('id="mobile-menu"');
  assert.notEqual(panelIdx, -1, 'expected a mobile menu panel to locate the remaining assertions against');
  const panel = navigation.slice(panelIdx);
  const expectedLabels = ['Pricing', 'Features', 'Wizards', 'FAQ', 'Setup & API keys', 'Changelog', 'Feedback'];
  for (const label of expectedLabels) {
    assert.match(panel, new RegExp(`>\\s*${label}\\s*<`), `expected mobile menu to expose a "${label}" link`);
  }
});

test('Navigation mobile menu wires an Escape-to-close handler that returns focus to the toggle button (#19)', () => {
  assert.match(navigation, /addEventListener\('keydown', handleKeyDown\)/);
  assert.match(navigation, /event\.key === ['"]Escape['"]/);
  assert.match(navigation, /menuToggleRef\.current\?\.focus\(\)/, 'Escape must return focus to the toggle button');
});

test('Navigation mobile menu wires an outside-click handler using mousedown + ref containment, only while open (#19)', () => {
  assert.match(navigation, /if \(!isMenuOpen\) return;/, 'listeners must only attach while the menu is open');
  assert.match(navigation, /addEventListener\('mousedown', handleClickOutside\)/);
  assert.match(navigation, /!navContentRef\.current\.contains\(event\.target\)/);
});

test('Navigation mobile menu effect cleans up its document listeners, mirroring the existing scroll-listener idiom (#19)', () => {
  assert.match(navigation, /removeEventListener\('mousedown', handleClickOutside\)/);
  assert.match(navigation, /removeEventListener\('keydown', handleKeyDown\)/);
});

test('Every mobile nav destination closes the menu when selected (#19)', () => {
  const panelIdx = navigation.indexOf('id="mobile-menu"');
  assert.notEqual(panelIdx, -1, 'expected a mobile menu panel to locate the remaining assertions against');
  const panel = navigation.slice(panelIdx);

  const scrollButtonCloses = (panel.match(/handleMobileNavClick\(/g) || []).length;
  assert.equal(scrollButtonCloses, 4, 'expected the 4 scrollToSection-backed buttons (Pricing/Features/Wizards/FAQ) to close the menu on click');

  const linkCloses = (panel.match(/onClick=\{closeMenu\}/g) || []).length;
  assert.equal(linkCloses, 3, 'expected the 3 route-based links (Setup & API keys/Changelog/Feedback) to close the menu on click');

  const handlerIdx = navigation.indexOf('handleMobileNavClick = (sectionId) => {');
  assert.notEqual(handlerIdx, -1, 'expected a handleMobileNavClick helper that scrolls and then closes the menu');
  const handlerBody = navigation.slice(handlerIdx, handlerIdx + 200);
  assert.match(handlerBody, /scrollToSection\(sectionId\)/);
  assert.match(handlerBody, /closeMenu\(\)/);
});
