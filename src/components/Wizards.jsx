import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { wizardCollections } from '../lib/wizardData';

export default function Wizards() {
  return (
    <section
      id="wizards"
      className="scroll-mt-20 border-t border-gray-200 dark:border-slate-800 py-24 md:py-32 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-800 dark:text-primary-400 mb-3">
            Wizards
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-950 dark:text-white">
            13 built-in text actions. Add your own.
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-slate-400 max-w-2xl">
            A wizard is a saved prompt that runs on your selection with one keystroke. Built-ins are grouped by the job they do; custom wizards sit right beside them.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {wizardCollections.map((collection) => (
            <div key={collection.name}>
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-gray-950 dark:text-white">
                  {collection.name}
                </h3>
                {collection.upcoming ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-slate-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-400" aria-hidden="true" />
                    Next update
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">{collection.tagline}</p>

              <ul className="mt-5 divide-y divide-gray-200 dark:divide-slate-800 border-y border-gray-200 dark:border-slate-800">
                {collection.wizards.map((wiz) => (
                  <li key={wiz.name} className="py-3">
                    <p
                      className={`text-sm font-medium ${
                        collection.upcoming
                          ? 'text-gray-500 dark:text-slate-400'
                          : 'text-gray-950 dark:text-white'
                      }`}
                    >
                      {wiz.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-slate-400">{wiz.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-dashed border-gray-300 dark:border-slate-700 p-6 flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div>
            <p className="font-semibold text-gray-950 dark:text-white">Your own wizards</p>
            <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">
              Write a prompt, pick a provider and model, and it appears in the panel next to the built-ins. Unlimited.
            </p>
          </div>
          <Link
            to="/getting-started"
            className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-gray-900 dark:text-slate-100 underline underline-offset-4 decoration-gray-300 dark:decoration-slate-600 hover:decoration-current transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700 dark:focus-visible:outline-primary-400"
          >
            Setup guide
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
