import { Github, Mail, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function GitHubGate({ onYes, onNo, isLoading }) {
  return (
    <div className="max-w-lg mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-900 dark:text-slate-100 mb-2">
            Do you have a GitHub account?
          </p>
          <p className="text-sm text-gray-500 dark:text-slate-400">
            This helps us route your feedback to the right place.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={onYes}
            disabled={isLoading}
            className={cn(
              'group flex flex-col items-start gap-3 p-6 rounded-xl border border-gray-200 dark:border-slate-700',
              'bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all duration-300',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
              isLoading && 'opacity-50 cursor-not-allowed'
            )}
          >
            <div className="p-3 bg-primary-100 dark:bg-primary-500/10 rounded-lg group-hover:bg-primary-200 dark:group-hover:bg-primary-500/20 transition-colors">
              <Github className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="text-left flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">
                Yes, I use GitHub
              </h3>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                Report issues directly on GitHub
              </p>
            </div>
            <div className="ml-auto">
              <ArrowRight className="h-4 w-4 text-gray-400 dark:text-slate-500 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors" />
            </div>
          </button>

          <button
            onClick={onNo}
            disabled={isLoading}
            className={cn(
              'group flex flex-col items-start gap-3 p-6 rounded-xl border border-gray-200 dark:border-slate-700',
              'bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all duration-300',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
              isLoading && 'opacity-50 cursor-not-allowed'
            )}
          >
            <div className="p-3 bg-primary-100 dark:bg-primary-500/10 rounded-lg group-hover:bg-primary-200 dark:group-hover:bg-primary-500/20 transition-colors">
              <Mail className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="text-left flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">
                No, send via form
              </h3>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                Fill out a quick feedback form
              </p>
            </div>
            <div className="ml-auto">
              <ArrowRight className="h-4 w-4 text-gray-400 dark:text-slate-500 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors" />
            </div>
          </button>
        </div>

        <p className="text-xs text-center text-gray-500 dark:text-slate-400 bg-gray-100 dark:bg-slate-800/50 rounded-lg p-3">
          Both options go directly to the developer. Choose what works best for you.
        </p>
      </div>
    </div>
  );
}
