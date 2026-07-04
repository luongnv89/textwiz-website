import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { beforeText, sampleTransformations } from '../lib/sampleData';

// Viral principle #25 — let visitors experience the product's value before
// buying, signing up, or entering an API key. Everything below runs entirely
// in the browser: there is no fetch, no network request, and no live AI call
// — the "after" text is pre-written sample copy from sampleData.js.
export default function InteractiveSample() {
  const [active, setActive] = useState(0);
  const current = sampleTransformations[active];

  return (
    <section
      id="try-it"
      className="py-24 px-6 bg-white dark:bg-slate-900 transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-slate-100 mb-4">
            See it work in real time
          </h2>
          <p className="text-xl text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
            Pick a wizard and watch the same sentence transform. No download, signup, or API key required.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-950 p-6 md:p-8">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-slate-400 mb-2">
              Before
            </p>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed">{beforeText}</p>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            {sampleTransformations.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActive(index)}
                aria-pressed={index === active}
                aria-label={`Show the ${item.label} result`}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${
                  index === active
                    ? 'bg-primary-800 border-primary-800 text-white'
                    : 'bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:border-primary-400'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div
            className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
            aria-live="polite"
          >
            <div className="flex items-center justify-between gap-3 flex-wrap mb-2">
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-slate-400">
                After — {current.label}
              </p>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-500/10 text-primary-700 dark:text-primary-300 text-xs font-semibold">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Sample result
              </span>
            </div>
            <p className="text-gray-900 dark:text-slate-100 leading-relaxed">{current.after}</p>
          </div>

          <p className="mt-4 text-sm text-gray-500 dark:text-slate-400">
            Illustrative example — not a live AI call. Every real TextWiz run uses the provider and model you choose in Settings.
          </p>
        </div>
      </div>
    </section>
  );
}
