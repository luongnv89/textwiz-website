/**
 * Single source for TextWiz Pro subscription facts.
 * Used by the pricing section, terms, privacy, FAQ, and SEO copy so every
 * price string on the site comes from one place.
 */

/** Name of the auto-renewable subscription sold on the Mac App Store. */
export const PRO_NAME = 'TextWiz Pro';

/**
 * Date the app switches from a paid download to a free download with a
 * TextWiz Pro subscription. Customers who bought the paid app before this
 * date keep Pro for life at no cost.
 *
 * Set to the planned launch date. Confirm against the actual App Store Connect
 * release before launch and update it here only.
 */
export const PRO_SWITCH_DATE = '2026-09-17';

/**
 * Human-readable form of PRO_SWITCH_DATE for body copy.
 * Keep in sync with PRO_SWITCH_DATE above; both must be confirmed against the
 * App Store Connect release before launch.
 */
export const PRO_SWITCH_DATE_LABEL = '17 September 2026';

/**
 * Reference US prices. Apple equalizes prices per storefront, so the amount
 * a customer is charged outside the US may differ.
 * @type {{ id: string, name: string, period: string, price: string, renews: string, intro: string | null, note: string }[]}
 */
export const PRO_PLANS = [
  {
    id: 'weekly',
    name: 'Weekly',
    period: '1 week',
    price: '$2.99',
    renews: '$2.99 per week',
    intro: '$0.99 for the first week',
    note: 'Introductory offer: $0.99 charged up front for one week, once per Apple Account. It then renews at $2.99 per week until cancelled.',
  },
  {
    id: 'monthly',
    name: 'Monthly',
    period: '1 month',
    price: '$7.99',
    renews: '$7.99 per month',
    intro: null,
    note: 'Renews at $7.99 per month until cancelled. No introductory offer on this plan.',
  },
  {
    id: 'yearly',
    name: 'Yearly',
    period: '1 year',
    price: '$59.99',
    renews: '$59.99 per year',
    intro: null,
    note: 'Renews at $59.99 per year until cancelled. No introductory offer on this plan.',
  },
];

/** Where a customer manages or cancels the subscription on macOS. */
export const MANAGE_SUBSCRIPTION_PATH =
  'System Settings > Apple Account > Media & Purchases > Subscriptions';

/** One-line summary reused across meta descriptions and AI-facing text. */
export const PRICING_SUMMARY =
  'TextWiz is a free download. The Demo provider is free forever. TextWiz Pro unlocks every real AI provider: $2.99 per week ($0.99 for the first week), $7.99 per month, or $59.99 per year in US dollars.';
