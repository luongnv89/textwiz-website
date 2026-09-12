export default function MacWindow({ title, children, className = '' }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.35)] ${className}`}
    >
      <div className="h-9 flex items-center gap-1.5 px-3 border-b border-gray-200 dark:border-slate-800">
        <span className="h-3 w-3 rounded-full bg-gray-300 dark:bg-slate-600" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-gray-300 dark:bg-slate-600" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-gray-300 dark:bg-slate-600" aria-hidden="true" />
        <span className="flex-1 text-center pr-12 text-xs text-gray-500">{title}</span>
      </div>
      {children}
    </div>
  );
}
