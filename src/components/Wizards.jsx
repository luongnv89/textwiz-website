import { Wand2, Sparkles } from 'lucide-react';
import { wizardCollections } from '../lib/wizardData';

export default function Wizards() {
  return (
    <section
      id="wizards"
      className="py-24 px-6 bg-white dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-500/10 text-primary-700 dark:text-primary-300 text-sm font-semibold mb-4">
            <Wand2 className="h-4 w-4" />
            Wizards &amp; collections
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-4">
            Every wiz is a one-keystroke spell
          </h2>
          <p className="text-xl text-gray-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            A <strong className="text-gray-900 dark:text-slate-100">wizard</strong> (a &ldquo;wiz&rdquo;) is a named AI prompt that transforms the text you select.
            We group them into <strong className="text-gray-900 dark:text-slate-100">collections</strong> by the job they do—and you can add unlimited wizards of your own.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {wizardCollections.map((collection) => (
            <div
              key={collection.name}
              className="flex flex-col p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-gray-50/60 dark:bg-slate-900/60"
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-100">
                  {collection.name}
                </h3>
                {collection.upcoming ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-500/15 text-amber-800 dark:text-amber-200 text-xs font-semibold">
                    <Sparkles className="h-3 w-3" />
                    Next update
                  </span>
                ) : null}
              </div>
              <p className="text-sm text-gray-500 dark:text-slate-400 mb-5">{collection.tagline}</p>

              <ul className="space-y-3">
                {collection.wizards.map((wiz) => (
                  <li key={wiz.name} className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900 dark:text-slate-100">{wiz.name}</span>
                    <span className="text-sm text-gray-600 dark:text-slate-300 leading-snug">{wiz.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-gray-600 dark:text-slate-300">
          <strong className="text-gray-900 dark:text-slate-100">14 built-in wizards</strong>—13 in the panel, plus a hidden Improve Prompt that powers the editor.
          The <span className="font-medium text-amber-700 dark:text-amber-300">Analyst &amp; Coach</span> collection arrives in the next update; the rest are live today.
        </p>
      </div>
    </section>
  );
}
