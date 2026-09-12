import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, KeyRound, Lock, ShieldCheck } from 'lucide-react';
import MacWindow from './MacWindow';
import { publicUrl } from '../lib/publicUrl';

const points = [
  {
    icon: Cpu,
    title: 'On-device AI by default',
    body: 'Apple Intelligence, Ollama, LM Studio, MLX-LM. Nothing leaves your Mac, and there is no per-token cost.',
  },
  {
    icon: KeyRound,
    title: 'Bring your own cloud key',
    body: 'OpenAI, Anthropic, Gemini, Mistral, Groq, OpenRouter. Keys live in the macOS Keychain; text goes only to the provider you chose.',
  },
  {
    icon: ShieldCheck,
    title: 'No servers, no data collection',
    body: 'History and analytics stay in local SQLite on your Mac.',
  },
  {
    icon: Lock,
    title: 'No Accessibility permission',
    body: 'Clipboard and Services only. Nothing to grant on first launch.',
  },
];

export default function Privacy() {
  return (
    <section
      id="privacy"
      className="scroll-mt-20 border-t border-gray-200 dark:border-slate-800 py-24 md:py-32 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-800 dark:text-primary-400 mb-3">
            Private by design
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-950 dark:text-white">
            Your text stays on your Mac.
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-slate-400 max-w-2xl">
            On-device AI by default. Bring your own cloud key if you prefer. Either way, TextWiz runs no servers and collects nothing.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
          <div>
            <ul className="divide-y divide-gray-200 dark:divide-slate-800">
              {points.map((point) => {
                const Icon = point.icon;
                return (
                  <li key={point.title} className="py-5 flex gap-4">
                    <Icon className="h-5 w-5 mt-0.5 text-primary-700 dark:text-primary-400 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <h3 className="font-semibold text-gray-950 dark:text-white">{point.title}</h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">{point.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 text-sm text-gray-500 dark:text-slate-400">
              10 engines, 4 on-device. Apple Intelligence needs macOS 15.2+; everything else runs on macOS 14+.
            </p>
            <Link
              to="/getting-started"
              className="mt-4 inline-flex min-h-11 items-center gap-1 text-sm font-medium text-gray-900 dark:text-slate-100 underline underline-offset-4 decoration-gray-300 dark:decoration-slate-600 hover:decoration-current transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            >
              Setup guide
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <MacWindow title="TextWiz — Settings">
            <img
              src={publicUrl('/shortcuts-preview/1.0.0/appstore-settings.png')}
              alt="TextWiz settings: choosing a primary provider and model"
              className="w-full h-auto block"
            />
          </MacWindow>
        </div>
      </div>
    </section>
  );
}
