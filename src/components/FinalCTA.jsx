import { Link } from 'react-router-dom';
import { ArrowRight, Github, MessageCircle } from 'lucide-react';
import MacAppStoreBadge from './MacAppStoreBadge';

const quietLink =
  'inline-flex min-h-11 items-center gap-1 text-sm font-medium text-gray-900 dark:text-slate-100 underline underline-offset-4 decoration-gray-300 dark:decoration-slate-600 hover:decoration-current transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700 dark:focus-visible:outline-primary-400';

export default function FinalCTA() {
  return (
    <section
      id="get-textwiz"
      className="scroll-mt-20 border-t border-gray-200 dark:border-slate-800 py-24 md:py-32 px-6"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-950 dark:text-white">
          Transform text without leaving your Mac.
        </h2>
        <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-slate-400">
          Select, press ⌘⇧Space, and get a better version back — privately, on your own terms.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
          <MacAppStoreBadge height={52} />
          <a href="#pricing" className={quietLink}>
            See pricing
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="mt-20 pt-10 border-t border-gray-200 dark:border-slate-800 max-w-2xl mx-auto flex flex-col sm:flex-row gap-5 text-left">
        <div
          className="h-12 w-12 flex-shrink-0 rounded-full border border-gray-300 dark:border-slate-600 flex items-center justify-center text-sm font-semibold text-gray-900 dark:text-white"
          aria-hidden="true"
        >
          LN
        </div>
        <div>
          <p className="font-semibold text-gray-950 dark:text-white">
            Built by Luong Nguyen — one developer who uses TextWiz every day.
          </p>
          <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">
            No fake reviews here. If something feels off or is missing, tell me — early feedback shapes what ships next.
          </p>
          <div className="mt-3 flex gap-6">
            <Link to="/feedback" className={quietLink}>
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Send feedback
            </Link>
            <a
              href="https://github.com/luongnv89/textwiz-website/issues/new/choose"
              target="_blank"
              rel="noopener noreferrer"
              className={quietLink}
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              Report on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
