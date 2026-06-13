import { AlertCircle, Bug, Lightbulb, MessageSquare, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

const FEEDBACK_BASE_URL = 'https://github.com/luongnv89/textwiz-feedback/issues/new';

const OPTIONS = [
  {
    id: 'bug',
    icon: Bug,
    label: 'Report a Bug',
    description: 'Found something broken? Open a bug report on GitHub.',
    href: `${FEEDBACK_BASE_URL}?template=bug_report.yml`,
    color: 'from-red-500 to-orange-500',
  },
  {
    id: 'feature',
    icon: Lightbulb,
    label: 'Request a Feature',
    description: 'Share an idea for a future release.',
    href: `${FEEDBACK_BASE_URL}?template=feature_request.yml`,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'general',
    icon: MessageSquare,
    label: 'General Feedback',
    description: 'Questions, praise, or anything else.',
    href: `${FEEDBACK_BASE_URL}?template=feedback.yml`,
    color: 'from-purple-500 to-pink-500',
  },
];

export default function FeedbackPage() {
  return (
    <section className="py-24 sm:py-32 px-4 bg-gradient-to-b from-primary-50 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-black transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-slate-100">Send Feedback</h1>
        <p className="text-gray-500 dark:text-slate-400 mt-2 mb-8">
          Bugs, feature ideas, and questions go to our public GitHub issue tracker. You need a free GitHub account to
          file an issue.
        </p>

        <div className="flex items-start gap-3 p-4 bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 rounded-lg mb-8">
          <AlertCircle className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-700 dark:text-slate-200">
            Each link opens a guided issue form on{' '}
            <a
              href="https://github.com/luongnv89/textwiz-feedback"
              className="text-primary-600 dark:text-primary-400 underline hover:no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              luongnv89/textwiz-feedback
            </a>
            . We do not collect email or run CAPTCHA on this site.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {OPTIONS.map((option) => {
            const Icon = option.icon;
            return (
              <a
                key={option.id}
                href={option.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'group block p-6 rounded-xl border border-gray-200 dark:border-slate-700',
                  'bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all duration-300',
                  'hover:border-primary-300 dark:hover:border-primary-500 hover:shadow-lg'
                )}
              >
                <div className="flex items-start gap-4">
                  <div className={cn('p-3 rounded-lg text-white flex-shrink-0', `bg-gradient-to-br ${option.color}`)}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-semibold text-gray-900 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors flex items-center gap-2">
                      {option.label}
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">{option.description}</p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}