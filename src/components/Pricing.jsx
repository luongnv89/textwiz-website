import { Link } from 'react-router-dom';
import { Check, Sparkles } from 'lucide-react';
import MacAppStoreBadge from './MacAppStoreBadge';
import { PRO_NAME, PRO_PLANS, PRO_SWITCH_DATE_LABEL, MANAGE_SUBSCRIPTION_PATH } from '../lib/pricing';

const freeIncludes = [
  'Download and install at no cost',
  'The Demo provider, free and ungated forever',
  'Every wizard, the floating panel, Services, and diff view',
];

const proIncludes = [
  'Every real provider: OpenAI, Anthropic, Gemini, Ollama, Apple Intelligence, and the rest',
  'Unlimited runs, with no cap from us',
  'Unlimited custom wizards on the provider you choose',
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="scroll-mt-20 py-24 px-6 bg-white dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-slate-100 mb-4">Pricing</h2>
          <p className="text-xl text-gray-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            TextWiz is a free download. The Demo provider runs free forever. {PRO_NAME} unlocks every real AI
            provider.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mb-10">
          <div className="p-8 rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-1">Free</h3>
            <p className="text-4xl font-bold text-gray-900 dark:text-slate-100 mb-4">$0</p>
            <p className="text-sm text-gray-600 dark:text-slate-300 mb-6">
              Install it, learn the flow, keep it as long as you like.
            </p>
            <ul className="space-y-3">
              {freeIncludes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-700 dark:text-slate-300">
                  <Check className="h-4 w-4 mt-0.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 rounded-2xl border-2 border-primary-500/60 dark:border-primary-400/40 bg-white dark:bg-slate-900 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-1">{PRO_NAME}</h3>
            <p className="text-sm text-gray-600 dark:text-slate-300 mb-6">
              An auto-renewable subscription on the Mac App Store. Required for every run against a real provider.
            </p>
            <ul className="space-y-3">
              {proIncludes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-700 dark:text-slate-300">
                  <Check className="h-4 w-4 mt-0.5 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-3 mb-8">
          {PRO_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`p-6 rounded-xl border bg-white dark:bg-slate-900 ${
                plan.intro
                  ? 'border-emerald-400/70 dark:border-emerald-500/40 shadow-sm'
                  : 'border-gray-200 dark:border-slate-700'
              }`}
            >
              {plan.intro ? (
                <p className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 text-xs font-semibold mb-3">
                  <Sparkles className="h-3.5 w-3.5" />
                  {plan.intro}
                </p>
              ) : null}
              <h4 className="text-lg font-semibold text-gray-900 dark:text-slate-100">{plan.name}</h4>
              <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-slate-100">
                {plan.price}
                <span className="text-base font-medium text-gray-500 dark:text-slate-400"> / {plan.period}</span>
              </p>
              <p className="mt-3 text-sm text-gray-600 dark:text-slate-300 leading-relaxed">{plan.note}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-10">
          <MacAppStoreBadge height={48} />
          <a
            href="#faq"
            className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold text-primary-600 bg-primary-100 hover:bg-primary-200 dark:text-primary-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition duration-200"
          >
            Read the FAQ
          </a>
        </div>

        <div className="max-w-3xl mx-auto space-y-4 text-sm text-gray-600 dark:text-slate-300">
          <p className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-500/25 bg-emerald-50 dark:bg-emerald-950/30">
            <strong className="text-gray-900 dark:text-slate-100">Bought TextWiz before it went free?</strong> If you
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
              className="text-primary-600 dark:text-primary-400 font-medium underline hover:text-primary-700 dark:hover:text-primary-300"
            >
              Terms of Service
            </Link>{' '}
            and the{' '}
            <Link
              to="/privacy"
              className="text-primary-600 dark:text-primary-400 font-medium underline hover:text-primary-700 dark:hover:text-primary-300"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
