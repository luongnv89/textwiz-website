import { CheckCircle, Github, MessageSquare } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function FormSuccess({ feedbackType, onNewFeedback }) {
  const label = feedbackType === 'bug' ? 'bug report' : feedbackType === 'feature' ? 'feature request' : 'feedback';

  return (
    <div className="max-w-lg mx-auto text-center">
      <div className="bg-green-50 dark:bg-emerald-900/20 border border-green-200 dark:border-emerald-700/30 rounded-xl p-8 space-y-6">
        <div className="flex justify-center">
          <div className="p-4 bg-green-100 dark:bg-emerald-900/30 rounded-full">
            <CheckCircle className="h-12 w-12 text-green-600 dark:text-emerald-400" />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-2">Thanks for Your Feedback!</h2>
          <p className="text-gray-500 dark:text-slate-400">
            We&apos;ve received your {label} and will review it shortly.
          </p>
        </div>

        <div className="space-y-3 pt-4 border-t border-green-200 dark:border-emerald-700/30">
          <p className="text-sm font-medium text-gray-900 dark:text-slate-100">What happens next?</p>
          <ul className="text-sm text-gray-600 dark:text-slate-300 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-green-600 dark:text-emerald-400 mt-1 flex-shrink-0">✓</span>
              <span>A real person (hi, it&apos;s me) will read and triage your feedback.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 dark:text-emerald-400 mt-1 flex-shrink-0">✓</span>
              <span>Bug reports and feature requests become tracked issues on GitHub.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 dark:text-emerald-400 mt-1 flex-shrink-0">✓</span>
              <span>If you left an email, I&apos;ll reach out with questions or updates.</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <a
            href="https://github.com/luongnv89/textwiz-feedback"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white',
              'rounded-xl font-semibold transition-all hover:bg-primary-700'
            )}
          >
            <Github className="h-5 w-5" />
            Browse Issues
          </a>

          <button
            onClick={onNewFeedback}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-slate-100',
              'rounded-xl font-semibold transition-all hover:bg-gray-200 dark:hover:bg-slate-700'
            )}
          >
            <MessageSquare className="h-5 w-5" />
            Send More Feedback
          </button>
        </div>

        <p className="text-xs text-gray-500 dark:text-slate-400 pt-4 border-t border-green-200 dark:border-emerald-700/30">
          Questions? Check the{' '}
          <a href="/#faq" className="text-primary-600 dark:text-primary-300 hover:underline">
            FAQ
          </a>{' '}
          or visit the{' '}
          <a
            href="https://github.com/luongnv89/textwiz-feedback"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 dark:text-primary-300 hover:underline"
          >
            feedback repo
          </a>
          .
        </p>
      </div>
    </div>
  );
}
