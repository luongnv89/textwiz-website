import { cn } from '../../lib/utils';

export default function FeedbackInput({ id, value, onChange, placeholder, maxLength = 2000, rows = 6 }) {
  const charCount = value.length;
  const charPercentage = (charCount / maxLength) * 100;

  return (
    <div className="space-y-2">
      <div className="relative">
        <textarea
          id={id}
          name="feedback"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={rows}
          required
          className={cn(
            'w-full px-4 py-3 bg-white dark:bg-slate-900 border rounded-xl text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none',
            'border-gray-200 dark:border-slate-700'
          )}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-slate-400 px-2">
        <div className="flex-1">
          <div className="w-full bg-gray-100 dark:bg-slate-800 rounded-full h-1 overflow-hidden">
            <div
              className={cn(
                'h-full transition-all duration-200',
                charPercentage > 90 ? 'bg-red-500' : charPercentage > 75 ? 'bg-yellow-500' : 'bg-primary-500'
              )}
              style={{ width: `${Math.min(charPercentage, 100)}%` }}
            />
          </div>
        </div>
        <span className="ml-2 flex-shrink-0">
          {charCount} / {maxLength}
        </span>
      </div>
    </div>
  );
}
