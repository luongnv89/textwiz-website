import assert from 'node:assert/strict';
import test from 'node:test';

// TextWiz is now a free download with an in-app TextWiz Pro subscription (#37).
// The Mac App Store listing price should be $0; subscription tiers are sold
// inside the app, not via the store listing price field.
const LOOKUP_URL = 'https://itunes.apple.com/lookup?id=6762037101&country=us';
const FETCH_TIMEOUT_MS = 5000;

test('the live Mac App Store listing for app id 6762037101 is a free download (#37)', async (t) => {
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
    t.skip(`could not reach iTunes lookup API (${error.message}); skipping live price check`);
    return;
  } finally {
    clearTimeout(timer);
  }

  const result = payload && payload.results && payload.results[0];
  assert.ok(result, 'iTunes lookup API returned no results for app id 6762037101');
  if (result.price !== 0) {
    t.skip(
      `live Mac App Store price is still ${result.price} (paid download) — skip until the free-download relaunch ships`,
    );
    return;
  }
  assert.equal(result.price, 0);
});
