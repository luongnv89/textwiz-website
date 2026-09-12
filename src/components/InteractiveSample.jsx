import { useState } from 'react';
import { beforeText, sampleTransformations } from '../lib/sampleData';

// Viral principle #25 — let visitors experience the product's value before
// buying, signing up, or entering an API key. Everything below runs entirely
// in the browser: there is no fetch, no network request, and no live AI call
// — the "after" text is pre-written sample copy from sampleData.js.
export default function InteractiveSample() {
  const [active, setActive] = useState(0);
  const current = sampleTransformations[active];

  return (
    <div
      id="try-it"
      className="rounded-2xl border border-gray-200 dark:border-slate-800 p-6 md:p-8"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-500 dark:text-slate-400">
          Try a sample
        </p>
        <p className="text-sm text-gray-500 dark:text-slate-400">Illustrative — not a live AI call</p>
      </div>

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
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700 dark:focus-visible:outline-primary-400 ${
              index === active
                ? 'bg-gray-950 text-white border-gray-950 dark:bg-white dark:text-gray-950 dark:border-white'
                : 'bg-transparent border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:border-gray-900 dark:hover:border-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div
        className="rounded-xl border border-gray-200 dark:border-slate-800 p-6"
        aria-live="polite"
      >
        <div className="flex items-center justify-between gap-3 flex-wrap mb-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-slate-400">
            After — {current.label}
          </p>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-800 dark:text-primary-400">
            Sample result
          </p>
        </div>
        <p className="text-gray-900 dark:text-slate-100 leading-relaxed">{current.after}</p>
      </div>
    </div>
  );
}
