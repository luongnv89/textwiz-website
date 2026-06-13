import { ExternalLink } from 'lucide-react';

export function Code({ children }) {
  return (
    <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-slate-800 text-primary-700 dark:text-primary-300 font-mono text-[0.9em]">
      {children}
    </code>
  );
}

export function Pre({ children }) {
  return (
    <pre className="my-4 p-4 rounded-xl bg-slate-900 dark:bg-black text-slate-100 text-sm overflow-x-auto border border-slate-800">
      <code className="font-mono whitespace-pre">{children}</code>
    </pre>
  );
}

export function Callout({ icon: IconGlyph, tone = 'info', title, children }) {
  const tones = {
    info: 'bg-primary-50 dark:bg-primary-500/10 border-primary-200 dark:border-primary-500/30 text-primary-900 dark:text-primary-100',
    warn: 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30 text-amber-900 dark:text-amber-100',
    ok: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-900 dark:text-emerald-100',
  };
  const Glyph = IconGlyph;
  return (
    <div className={`my-6 p-5 rounded-xl border ${tones[tone]} flex gap-3`}>
      <Glyph className="h-5 w-5 mt-0.5 flex-shrink-0" />
      <div>
        {title && <div className="font-semibold mb-1">{title}</div>}
        <div className="text-[0.95em] leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export function Step({ n, title, children }) {
  return (
    <div className="mb-8">
      <h3 className="flex items-center gap-3 text-xl font-semibold text-gray-900 dark:text-slate-100 mb-3">
        <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary-600 text-white text-sm font-bold flex-shrink-0">
          {n}
        </span>
        {title}
      </h3>
      <div className="ml-11">{children}</div>
    </div>
  );
}

export function Table({ headers, rows }) {
  return (
    <div className="my-5 overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-800">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 dark:bg-slate-900/50">
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-slate-100 border-b border-gray-200 dark:border-slate-800"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-gray-100 dark:border-slate-800/50 last:border-b-0"
            >
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-gray-700 dark:text-slate-300 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function InfoTable({ rows }) {
  return (
    <div className="my-5 overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-800">
      <table className="w-full text-sm">
        <tbody>
          {rows.map(([label, value]) => (
            <tr
              key={label}
              className="border-b border-gray-100 dark:border-slate-800/50 last:border-b-0"
            >
              <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-slate-100 align-top w-36 sm:w-44">
                {label}
              </th>
              <td className="px-4 py-3 text-gray-700 dark:text-slate-300 align-top">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ProviderSection({ id, title, verified, children }) {
  return (
    <section id={id} className="scroll-mt-28 mb-14">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-slate-400 mb-5">Verified as of {verified}</p>
      <div className="text-gray-700 dark:text-slate-300 leading-relaxed space-y-4">{children}</div>
    </section>
  );
}

export function Ext({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-primary-600 dark:text-primary-300 hover:underline inline-flex items-center gap-1"
    >
      {children}
      <ExternalLink className="h-3.5 w-3.5 opacity-70" />
    </a>
  );
}