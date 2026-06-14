import { ShieldCheck, Coins, Cpu } from 'lucide-react';
import MacAppStoreBadge from './MacAppStoreBadge';

const signals = [
  { icon: ShieldCheck, text: 'No servers, no data collection, no Accessibility permission' },
  { icon: Coins, text: 'One-time purchase—run free on local AI, no token bills' },
  { icon: Cpu, text: 'On-device by default, or your own cloud provider' },
];

export default function FinalCTA() {
  return (
    <section
      id="get-textwiz"
      className="py-24 px-6 bg-gradient-to-br from-primary-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-950 dark:to-emerald-950/30 border-t border-gray-200 dark:border-slate-800 transition-colors duration-300"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-4">
          Transform text without leaving your Mac
        </h2>
        <p className="text-xl text-gray-600 dark:text-slate-300 mb-10 leading-relaxed">
          Select, press ⌘⇧Space, and get a better version back—privately, on your own terms.
        </p>

        <ul className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-x-8 gap-y-3 mb-10 text-left max-w-2xl mx-auto">
          {signals.map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.text} className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-300">
                <Icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                {s.text}
              </li>
            );
          })}
        </ul>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <MacAppStoreBadge height={48} />
          <a
            href="/getting-started"
            className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold text-primary-600 bg-primary-100 hover:bg-primary-200 dark:text-primary-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition duration-200"
          >
            Read the setup guide
          </a>
        </div>
      </div>
    </section>
  );
}
