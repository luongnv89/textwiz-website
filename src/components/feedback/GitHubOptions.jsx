import { AlertCircle, Bug, Lightbulb, MessageSquare, Mail, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const FEEDBACK_BASE_URL = 'https://github.com/luongnv89/textwiz-feedback/issues/new';

const OPTIONS = [
  {
    id: 'bug',
    icon: Bug,
    label: 'Report a Bug',
    description: 'Found something broken? Report it here.',
    href: `${FEEDBACK_BASE_URL}?template=bug_report.yml`,
    color: 'from-red-500 to-orange-500',
  },
  {
    id: 'feature',
    icon: Lightbulb,
    label: 'Request a Feature',
    description: 'Have an idea? Share it with us.',
    href: `${FEEDBACK_BASE_URL}?template=feature_request.yml`,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'general',
    icon: MessageSquare,
    label: 'General Feedback',
    description: 'Share your thoughts or suggestions.',
    href: `${FEEDBACK_BASE_URL}?template=feedback.yml`,
    color: 'from-purple-500 to-pink-500',
  },
];

export default function GitHubOptions({ onBack, onEmailInstead }) {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-start gap-3 p-4 bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 rounded-lg">
        <AlertCircle className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-gray-700 dark:text-slate-200">
          These links open on GitHub. You&apos;ll need a GitHub account to proceed.
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
                  <h3 className="font-semibold text-gray-900 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors flex items-center gap-2">
                    {option.label}
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">{option.description}</p>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-slate-700" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-4 bg-white dark:bg-slate-950 text-gray-500 dark:text-slate-400">or</span>
        </div>
      </div>

      <button
        onClick={onEmailInstead}
        className={cn(
          'group w-full flex items-center justify-between p-6 rounded-xl border-2 border-dashed border-gray-300 dark:border-slate-700',
          'bg-gray-50/50 dark:bg-slate-900/40 hover:bg-gray-100 dark:hover:bg-slate-800 hover:border-primary-500 transition-all duration-300',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
        )}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gray-100 dark:bg-slate-800 rounded-lg">
            <Mail className="h-6 w-6 text-gray-700 dark:text-slate-200" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-900 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">
              Prefer a form instead?
            </h3>
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
              Fill out our feedback form and we&apos;ll get back to you.
            </p>
          </div>
        </div>
        <ArrowRight className="h-5 w-5 text-gray-400 dark:text-slate-500 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors flex-shrink-0" />
      </button>

      <div className="text-center pt-4">
        <button
          onClick={onBack}
          className="text-sm text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100 transition-colors"
        >
          ← Back to previous question
        </button>
      </div>
    </div>
  );
}
