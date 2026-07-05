import assert from 'node:assert/strict';
import test from 'node:test';
import { PRICE_USD } from '../../src/lib/pricing.js';

// Reproduces the "independently verified live via the iTunes lookup API"
// claim in pricing.js's doc comment (issue #3 / PR #16) as an actual,
// re-runnable check instead of a comment nobody re-verifies. It fetches the
// live Mac App Store listing for app id 6762037101 (see appStore.js) and
// asserts the returned price matches PRICE_USD, so a real price change on
// Apple's side fails this test loudly instead of silently drifting.
//
// This depends on outbound network access, which isn't guaranteed in every
// environment (e.g. a sandboxed/offline dev run). A network/DNS failure is
// treated as "can't verify right now" and the test is skipped rather than
// failed; an actual price mismatch is always a hard failure.

const LOOKUP_URL = 'https://itunes.apple.com/lookup?id=6762037101&country=us';
const FETCH_TIMEOUT_MS = 5000;

test('the live Mac App Store price for app id 6762037101 matches PRICE_USD in pricing.js (#3)', async (t) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  let payload;
  try {
    const response = await fetch(LOOKUP_URL, { signal: controller.signal });
    if (!response.ok) {
      t.skip(`iTunes lookup API returned HTTP ${response.status}; skipping live price check`);
      return;
    }
    payload = await response.json();
  } catch (error) {
    // Network/DNS/timeout failures mean we can't reach Apple right now, not
    // that the price is wrong — skip instead of failing the whole suite.
    t.skip(`could not reach iTunes lookup API (${error.message}); skipping live price check`);
    return;
  } finally {
    clearTimeout(timer);
  }

  const result = payload && payload.results && payload.results[0];
  assert.ok(result, 'iTunes lookup API returned no results for app id 6762037101');
  assert.equal(
    result.price,
    Number(PRICE_USD),
    `live Mac App Store price (${result.price}) no longer matches PRICE_USD ('${PRICE_USD}') in src/lib/pricing.js — update PRICE_USD`,
  );
});
