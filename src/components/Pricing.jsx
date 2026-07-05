import { Tag, Check } from 'lucide-react';
import MacAppStoreBadge from './MacAppStoreBadge';
import { PRICE_DISPLAY, PRICE_TAGLINE, PRICE_PREMIUM_COPY, PRICE_ONGOING_COST_COPY } from '../lib/pricing';

// Viral principles #16, #32 — see pricing.js for the full rationale. In
// short: #16 wants "Pricing" reachable as a header nav link plus an
// easy-to-reach pricing section — this section is mounted directly after
// Hero and linked from a "Pricing" button in Navigation.jsx. #32 wants
// pricing framed as premium — not by charging more than named competitors
// (comparisonData.js's #32 comment still holds: no claim about any
// competitor's actual price), but by contrasting one-time-PRICE_DISPLAY-
// forever against their recurring subscriptions and per-token cloud bills.
const perks = [
  'Every built-in wizard, no feature gate',
  'Ten AI engines, four of them fully local',
  'Free updates — no renewal, ever',
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto text-center">
        <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-500/10 text-primary-700 dark:text-primary-300 text-sm font-semibold mb-4">
          <Tag className="h-4 w-4" />
          Pricing
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-4">
          {PRICE_DISPLAY}, once. Premium, not just cheap.
        </h2>
        <p className="text-xl text-gray-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-2">
          {PRICE_TAGLINE} {PRICE_PREMIUM_COPY}
        </p>
        <p className="text-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
          {PRICE_ONGOING_COST_COPY}
        </p>

        <div className="inline-flex flex-col items-center gap-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 px-8 py-8 mb-8">
          <div className="text-5xl font-extrabold text-gray-900 dark:text-slate-100">
            {PRICE_DISPLAY}
            <span className="ml-2 text-base font-medium text-gray-500 dark:text-slate-400">one-time</span>
          </div>
          <ul className="text-left space-y-2">
            {perks.map((perk) => (
              <li key={perk} className="flex items-start gap-2 text-gray-700 dark:text-slate-300">
                <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                {perk}
              </li>
            ))}
          </ul>
          <MacAppStoreBadge height={44} />
        </div>

        <p className="text-sm text-gray-500 dark:text-slate-400">
          Price shown in USD on the Mac App Store; local taxes may apply.
        </p>
      </div>
    </section>
  );
}
