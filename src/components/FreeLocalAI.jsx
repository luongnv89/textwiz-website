import { Sparkles, Shield, KeyRound, WifiOff } from 'lucide-react';

const highlights = [
  {
    icon: Sparkles,
    title: 'Apple Foundation Model',
    description:
      'Uses the on-device model built into macOS Apple Intelligence. TextWiz selects it automatically when your Mac supports it—no signup, no billing.',
  },
  {
    icon: KeyRound,
    title: 'No API key',
    description: 'Unlike cloud providers, there is nothing to paste into Settings. Enable Apple Intelligence in System Settings and you are ready.',
  },
  {
    icon: WifiOff,
    title: 'Fully local',
    description: 'Proofread and rewrite without sending your draft to the internet. Great for sensitive email, code comments, and internal docs.',
  },
  {
    icon: Shield,
    title: 'Still nine providers',
    description:
      'When Apple Intelligence is unavailable, switch to Gemini, Groq, Ollama, LM Studio, MLX-LM, or any other engine from the same panel.',
  },
];

export default function FreeLocalAI() {
  return (
    <section
      id="free-local-ai"
      className="py-20 px-6 bg-gradient-to-br from-emerald-50 via-white to-primary-50 dark:from-emerald-950/40 dark:via-slate-950 dark:to-slate-900 border-y border-emerald-200/60 dark:border-emerald-500/20 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 text-sm font-semibold mb-4">
            <Sparkles className="h-4 w-4" />
            Free on supported Macs
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-slate-100 mb-4">
            Run AI shortcuts with Apple&rsquo;s on-device Foundation Model
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            On Apple Silicon with Apple Intelligence enabled, TextWiz can use the{' '}
            <strong className="text-gray-900 dark:text-slate-100">Apple Foundation Model</strong>—a{' '}
            <strong className="text-emerald-700 dark:text-emerald-300">totally free, local</strong>{' '}
            path with no API key and no per-token cost. Your text stays on your Mac.
          </p>
          <p className="mt-4 text-sm text-gray-500 dark:text-slate-400">
            Requires macOS 15.2 or later, supported hardware, and Apple Intelligence turned on in System Settings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
            <div
              key={item.title}
              className="p-6 rounded-xl border border-emerald-200/80 dark:border-emerald-500/25 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm"
            >
              <div className="w-11 h-11 rounded-lg bg-emerald-100 dark:bg-emerald-500/15 flex items-center justify-center mb-4">
                <Icon className="h-5 w-5 text-emerald-700 dark:text-emerald-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">{item.description}</p>
            </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-gray-600 dark:text-slate-300">
          Prefer another engine?{' '}
          <a href="#features" className="text-primary-600 dark:text-primary-300 font-medium hover:underline">
            See all nine providers
          </a>{' '}
          or read the{' '}
          <a href="/getting-started" className="text-primary-600 dark:text-primary-300 font-medium hover:underline">
            getting started guide
          </a>
          .
        </p>
      </div>
    </section>
  );
}