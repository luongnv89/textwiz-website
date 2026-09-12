import { Shortcut } from './Kbd';
import InteractiveSample from './InteractiveSample';

const steps = [
  {
    numeral: '01',
    title: 'Copy or select',
    body: 'Highlight text in any app and press ⌘C. No special editor, no plugin.',
  },
  {
    numeral: '02',
    title: (
      <>
        Press <Shortcut />
      </>
    ),
    body: 'The TextWiz panel opens with your text. Pick a wizard — Proofread, Concise, Professional, or one of your own.',
  },
  {
    numeral: '03',
    title: 'Paste the result',
    body: 'The rewrite is copied automatically; press ⌘V. Or use right-click → Services and TextWiz replaces the text in place.',
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 border-t border-gray-200 dark:border-slate-800 py-24 md:py-32 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-700 dark:text-primary-400 mb-3">
            How it works
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-950 dark:text-white">
            Three steps. Any app.
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-slate-400 max-w-2xl">
            TextWiz reads the clipboard or the Services menu, so it works in Mail, Slack, VS Code, Safari — anywhere you can select text.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-gray-200 dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-800">
          {steps.map((step) => (
            <div key={step.numeral} className="bg-white dark:bg-slate-950 p-8">
              <p className="font-mono text-sm text-primary-700 dark:text-primary-400">{step.numeral}</p>
              <h3 className="mt-4 text-xl font-semibold text-gray-950 dark:text-white">{step.title}</h3>
              <p className="mt-2 text-gray-600 dark:text-slate-400 leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <InteractiveSample />
        </div>

        <p className="mt-6 text-sm text-gray-500 dark:text-slate-500">
          No Accessibility permission. No prompts on first launch. Works inside sandboxed apps.
        </p>
      </div>
    </section>
  );
}
