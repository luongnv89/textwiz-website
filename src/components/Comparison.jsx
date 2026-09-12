import { Scale, Check, X, Minus } from 'lucide-react';
import { comparisonColumns, comparisonRows, getStatusLabel } from '../lib/comparisonData';

// Viral principles #31, #32, #19 — see comparisonData.js for the full
// rationale. In short: #31 wants a comparison table against named
// alternatives (this section), #32 wants pricing framed as premium (the
// intro copy below leads with privacy/local/no-token-cost positioning, not
// a discount pitch, and makes no claim about the billing model — TextWiz
// Pro is a subscription, see #41), and #19 wants a "never seen before"
// element — the
// local-AI + no-Accessibility-permission + one-keystroke combination that no
// competitor row here offers together. #32 is about pricing perception, not
// a specific price — this file makes no claim about any competitor's actual
// price.
const STATUS_STYLES = {
  yes: { Icon: Check, className: 'text-emerald-600 dark:text-emerald-400' },
  partial: { Icon: Minus, className: 'text-amber-600 dark:text-amber-400' },
  no: { Icon: X, className: 'text-gray-400 dark:text-slate-500' },
  'n/a': { Icon: Minus, className: 'text-gray-300 dark:text-slate-600' },
};

function StatusIcon({ status }) {
  const { Icon, className } = STATUS_STYLES[status] || STATUS_STYLES['n/a'];
  return <Icon className={`h-5 w-5 flex-shrink-0 ${className}`} aria-hidden="true" />;
}

export default function Comparison() {
  return (
    <section
      id="comparison"
      className="py-24 px-6 bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-500/10 text-primary-700 dark:text-primary-300 text-sm font-semibold mb-4">
            <Scale className="h-4 w-4" />
            How TextWiz compares
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-4">
            The premium, private choice — not just the cheap one
          </h2>
          <p className="text-xl text-gray-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            TextWiz isn&rsquo;t a discount alternative to the tools below. It&rsquo;s the local-first way to rewrite
            text anywhere on your Mac—without an Accessibility prompt, a browser tab, or a token meter running in
            the background. The download is free, the Demo provider never expires, and local engines cost nothing
            to run.
          </p>
        </div>

        {/* Desktop / tablet: full table. Hidden below md so the mobile card
            stack (below) is what small screens actually read — a wide table
            squeezed into a phone width is not scannable. */}
        <div className="hidden md:block overflow-x-auto rounded-2xl border border-gray-200 dark:border-slate-800">
          <table className="w-full border-collapse bg-white dark:bg-slate-950 text-left">
            <thead>
              <tr className="border-b border-gray-200 dark:border-slate-800">
                <th scope="col" className="p-4 text-sm font-semibold text-gray-500 dark:text-slate-400">
                  &nbsp;
                </th>
                {comparisonColumns.map((column) => (
                  <th
                    key={column.key}
                    scope="col"
                    className={`p-4 text-sm font-semibold ${
                      column.key === 'textwiz'
                        ? 'text-primary-700 dark:text-primary-300'
                        : 'text-gray-700 dark:text-slate-300'
                    }`}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.feature} className="border-b border-gray-100 dark:border-slate-900 last:border-0">
                  <th
                    scope="row"
                    className="p-4 align-top text-sm font-semibold text-gray-900 dark:text-slate-100"
                  >
                    {row.feature}
                  </th>
                  {comparisonColumns.map((column) => {
                    const cell = row[column.key];
                    return (
                      <td key={column.key} className="p-4 align-top text-sm text-gray-600 dark:text-slate-300">
                        <div className="flex items-start gap-2">
                          <StatusIcon status={cell.status} />
                          <div>
                            <span className="sr-only">{getStatusLabel(cell.status)}. </span>
                            {cell.note}
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: one card per feature, each column stacked as a labeled
            row, so nothing requires horizontal scrolling to read. */}
        <div className="md:hidden space-y-6">
          {comparisonRows.map((row) => (
            <div
              key={row.feature}
              className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5"
            >
              <h3 className="text-base font-semibold text-gray-900 dark:text-slate-100 mb-3">{row.feature}</h3>
              <dl className="space-y-3">
                {comparisonColumns.map((column) => {
                  const cell = row[column.key];
                  return (
                    <div key={column.key} className="flex items-start gap-2">
                      <StatusIcon status={cell.status} />
                      <div>
                        <dt
                          className={`text-xs font-semibold uppercase tracking-wide ${
                            column.key === 'textwiz'
                              ? 'text-primary-700 dark:text-primary-300'
                              : 'text-gray-500 dark:text-slate-400'
                          }`}
                        >
                          {column.label}
                          <span className="sr-only">: {getStatusLabel(cell.status)}</span>
                        </dt>
                        <dd className="text-sm text-gray-600 dark:text-slate-300">{cell.note}</dd>
                      </div>
                    </div>
                  );
                })}
              </dl>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-gray-500 dark:text-slate-400">
          General comparison based on how these categories of tools commonly work, not a claim about any single
          competitor&rsquo;s current plan or pricing.
        </p>
      </div>
    </section>
  );
}
