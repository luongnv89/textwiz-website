import { Link } from 'react-router-dom';
import { Check, ChevronDown } from 'lucide-react';
import MacAppStoreBadge from './MacAppStoreBadge';
import { PRO_NAME, PRO_PLANS, PRO_SWITCH_DATE_LABEL, MANAGE_SUBSCRIPTION_PATH } from '../lib/pricing';

const freeIncludes = [
  'Download and install at no cost',
  'The Demo provider, free and ungated forever',
  'Every wizard, the floating panel, Services, and diff view',
];

const proIncludes = [
  'Every real provider: OpenAI, Anthropic, Gemini, Ollama, Apple Intelligence, and the rest — with your own API key where the provider needs one',
  'Unlimited runs, with no cap from us',
  'Unlimited custom wizards on the provider you choose',
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="scroll-mt-20 border-t border-gray-200 dark:border-slate-800 py-24 md:py-32 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-800 dark:text-primary-400 mb-3">
            Pricing
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-950 dark:text-white">
            Free to download. Pro when you're ready.
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-slate-400 max-w-2xl">
            The Demo provider is free forever. {PRO_NAME} is an auto-renewable subscription on the Mac App Store and unlocks every real AI provider.
            TextWiz is bring-your-own-key: Pro pays for the app, not for AI usage. Cloud providers need your own API key; on-device engines need none.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:items-start">
          <div className="rounded-2xl border border-gray-200 dark:border-slate-800 p-8">
            <h3 className="text-xl font-semibold text-gray-950 dark:text-white">Free</h3>
            <p className="mt-1 text-4xl font-semibold tracking-tight text-gray-950 dark:text-white">$0</p>
            <p className="mt-3 text-sm text-gray-600 dark:text-slate-400">
              Install it, learn the flow, keep it as long as you like.
            </p>
            <ul className="mt-6 space-y-3">
              {freeIncludes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-600 dark:text-slate-400">
                  <Check className="h-4 w-4 mt-0.5 text-primary-700 dark:text-primary-400 flex-shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border-2 border-primary-500 p-8">
            <h3 className="text-xl font-semibold text-gray-950 dark:text-white">{PRO_NAME}</h3>
            <p className="mt-3 text-sm text-gray-600 dark:text-slate-400">
              An auto-renewable subscription on the Mac App Store. Required for every run against a real provider.
              Bring your own key: cloud providers (OpenAI, Anthropic, Gemini, and others) run on your API key and
              bill you directly; Apple Intelligence, Ollama, LM Studio, and MLX-LM need no key.
            </p>
            <ul className="mt-6 space-y-3">
              {proIncludes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-600 dark:text-slate-400">
                  <Check className="h-4 w-4 mt-0.5 text-primary-700 dark:text-primary-400 flex-shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ul className="mt-6 divide-y divide-gray-200 dark:divide-slate-800 border-t border-gray-200 dark:border-slate-800">
              {PRO_PLANS.map((plan) => (
                <li key={plan.id} className="py-3 flex items-baseline justify-between gap-4">
                  <span className="text-sm font-medium text-gray-950 dark:text-white">
                    {plan.name}
                    {plan.intro ? (
                      <span className="block text-xs font-normal text-primary-800 dark:text-primary-400">
                        {plan.intro}
                      </span>
                    ) : null}
                  </span>
                  <span className="text-sm text-gray-950 dark:text-white">
                    {plan.price} <span className="text-gray-500 dark:text-slate-400">/ {plan.period}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4">
          <MacAppStoreBadge height={52} />
          <p className="text-sm text-gray-500 dark:text-slate-400">TextWiz is a free download.</p>
        </div>

        <div className="mt-10 max-w-3xl mx-auto">
          <details className="group rounded-xl border border-gray-200 dark:border-slate-800 p-5 text-sm text-gray-600 dark:text-slate-400">
            <summary className="cursor-pointer font-medium text-gray-950 dark:text-white list-none flex items-center justify-between focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500">
              Billing details, intro offer, and regional pricing
              <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="mt-4 space-y-3">
              <ul className="space-y-2">
                {PRO_PLANS.map((plan) => (
                  <li key={plan.id} className="text-sm text-gray-600 dark:text-slate-400">
                    <span className="font-medium text-gray-950 dark:text-white">{plan.name}:</span> {plan.note}
                  </li>
                ))}
              </ul>
              <p>
                <strong className="text-gray-950 dark:text-white">Bought TextWiz before it went free?</strong> If you
                purchased the paid app before {PRO_SWITCH_DATE_LABEL}, you keep {PRO_NAME} for life at no cost. Sign in
                with the same Apple Account and TextWiz restores it.
              </p>
              <p>
                Prices are in US dollars. Apple equalizes prices per storefront, so the amount you are charged in your
                country may differ from the figures above. The App Store shows your exact price before you confirm.
              </p>
              <p>
                Payment is charged to your Apple Account at confirmation of purchase. A subscription renews automatically
                unless it is cancelled at least 24 hours before the end of the current period, and the renewal charge is
                taken within 24 hours before the period ends. Manage or cancel it in {MANAGE_SUBSCRIPTION_PATH}. Provider
                API costs, where a provider charges them, are separate and stay between you and that provider.
              </p>
              <p>
                Full detail lives in the{' '}
                <Link
                  to="/terms"
                  className="text-gray-900 dark:text-slate-100 font-medium underline underline-offset-4 decoration-gray-300 dark:decoration-slate-600 hover:decoration-current transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                >
                  Terms of Service
                </Link>{' '}
                and the{' '}
                <Link
                  to="/privacy"
                  className="text-gray-900 dark:text-slate-100 font-medium underline underline-offset-4 decoration-gray-300 dark:decoration-slate-600 hover:decoration-current transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
