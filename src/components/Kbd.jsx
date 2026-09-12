export function Kbd({ children }) {
  return (
    <kbd className="inline-flex h-7 min-w-7 items-center justify-center rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-1.5 font-sans text-sm font-medium text-gray-900 dark:text-slate-100 shadow-[inset_0_-1px_0_rgba(0,0,0,0.12)]">
      {children}
    </kbd>
  );
}

export function Shortcut() {
  return (
    <span className="inline-flex items-center gap-1 align-middle">
      <Kbd>⌘</Kbd>
      <Kbd>⇧</Kbd>
      <Kbd>Space</Kbd>
    </span>
  );
}
