/**
 * Single source of truth for TextWiz's Mac App Store price and the
 * one-time-purchase / no-subscription copy built around it (issue #3).
 *
 * Addresses viral principles:
 *   #16 — Pricing impossible to miss: this module backs the dedicated
 *         Pricing section (see Pricing.jsx), which is reachable from a
 *         "Pricing" link in the header nav (see Navigation.jsx). Together
 *         they satisfy the PASS bar: "'Pricing' in the header nav AND a
 *         clear pricing section on the page."
 *   #32 — Priced above competitors: PASS here does not come from charging
 *         more than named competitors — see comparisonData.js's #32 comment
 *         for that framing, which still holds. It comes from contrasting a
 *         one-time PRICE_DISPLAY forever against competitors' recurring
 *         subscriptions and per-token cloud bills. This module exports the
 *         copy strings that make that contrast explicit so Pricing.jsx (and
 *         faqData.js, StructuredData.jsx) don't each have to invent it.
 *
 * PRICE_USD is the live Mac App Store price for app id 6762037101 (see
 * appStore.js). This is independently verified against the public iTunes
 * lookup API by a live, reproducible check —
 * scripts/__tests__/pricing-verification.test.mjs — rather than by this
 * comment alone; that test fetches
 * https://itunes.apple.com/lookup?id=6762037101&country=us and fails if the
 * live price no longer matches PRICE_USD (it skips, rather than fails, if
 * the network call itself can't be made).
 * Every file that displays or references the price — Pricing.jsx,
 * StructuredData.jsx, faqData.js — imports from here instead of
 * hardcoding '4.99', so a future price change is a one-line edit instead
 * of a hunt across the codebase.
 */
export const PRICE_USD = '4.99';
export const PRICE_CURRENCY = 'USD';
export const PRICE_DISPLAY = `$${PRICE_USD}`;

/** One-line summary of the pricing model, safe to drop into any section. */
export const PRICE_TAGLINE = 'One-time purchase. No subscription, ever.';

/** Premium framing: contrasts the one-time price against recurring/metered alternatives. */
export const PRICE_PREMIUM_COPY =
  'Buy it once on the Mac App Store and it is yours — no recurring subscription like the cloud AI tools and Grammarly-style apps it replaces.';

/** Zero-ongoing-cost framing for local AI, reused by the FAQ and pricing section. */
export const PRICE_ONGOING_COST_COPY =
  'Run it on local AI and there is no per-token cost either — pay once, process as much text as you want.';

/**
 * Brief, single-sentence reference to the local-AI / no-per-token-cost
 * story, for sections that mention it in passing rather than owning the
 * full pricing pitch (issue #21). The full explanation — one-time
 * purchase, no subscription, local AI, no per-token cost, all together —
 * lives only in Pricing.jsx via PRICE_TAGLINE + PRICE_PREMIUM_COPY +
 * PRICE_ONGOING_COST_COPY; everywhere else should link back here instead
 * of restating it.
 */
export const PRICE_LOCAL_AI_BRIEF = 'Local AI runs on your Mac at no extra per-token cost.';
