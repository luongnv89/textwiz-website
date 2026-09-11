/**
 * Comparison matrix for the landing page's "How TextWiz compares" section (issue #7).
 *
 * Addresses viral principles:
 *   #31 — Compares to competitors: a clear comparison table against named
 *         alternatives makes the reason to switch obvious (see Comparison.jsx).
 *   #32 — Priced above competitors: the point of this table is NOT to win on
 *         price. TextWiz is a one-time purchase, not "the cheap option" —
 *         Comparison.jsx frames the table around privacy/local-first/
 *         one-time-purchase positioning rather than a discount pitch.
 *   #19 — Does something never seen before: no competitor category below
 *         combines local, on-device AI with zero Accessibility permission and
 *         a one-keystroke, system-wide rewrite — that combination is the row
 *         TextWiz wins on every time.
 *
 * Every TextWiz claim below is sourced from copy that already exists
 * elsewhere on the page — Hero.jsx / Screenshots.jsx (works everywhere via
 * ⌘⇧Space and Services), Features.jsx ("Native macOS Integration"),
 * Wizards.jsx (one-keystroke wizards), and FreeLocalAI.jsx ("Local AI by
 * default", "Zero token cost", one-time-purchase positioning). This file
 * introduces no new TextWiz claims.
 *
 * Competitor claims are deliberately kept to general, well-known category
 * facts (cloud AI assistants live in a browser tab and bill by
 * subscription/usage; Grammarly is a cloud-based subscription service; Mac
 * AI writing utilities in this space commonly require Accessibility
 * permission and/or a subscription) — no specific pricing figures, version
 * numbers, or feature claims that could go stale or be wrong. See AC3 on
 * issue #7: avoid unverifiable or unfair claims and keep competitor
 * references accurate.
 *
 * Cell shape: { status: 'yes' | 'partial' | 'no' | 'n/a', note: string }
 * Row shape:  { feature: string, textwiz, cloudTabs, grammarly, macAiApps }
 */
export const comparisonColumns = [
  { key: 'textwiz', label: 'TextWiz' },
  { key: 'cloudTabs', label: 'Cloud AI in a browser tab (ChatGPT-style)' },
  { key: 'grammarly', label: 'Grammarly' },
  { key: 'macAiApps', label: 'Other Mac AI writing apps (Elephas/BoltAI-style)' },
];

export const comparisonRows = [
  {
    feature: 'Works in every Mac app — not just a browser tab',
    textwiz: {
      status: 'yes',
      note: 'Copy any text, press ⌘⇧Space, or right-click → Services — works in every app, including sandboxed ones.',
    },
    cloudTabs: {
      status: 'no',
      note: 'Lives in a browser tab — you switch away from your app and copy the result back.',
    },
    grammarly: {
      status: 'partial',
      note: 'Works in its list of supported apps and the browser, not universally.',
    },
    macAiApps: {
      status: 'partial',
      note: 'Varies by app — some work system-wide, many are a separate chat window.',
    },
  },
  {
    feature: 'Local AI option — nothing has to leave your Mac',
    textwiz: {
      status: 'yes',
      note: 'Apple Intelligence, Ollama, LM Studio, and MLX-LM all run entirely on-device.',
    },
    cloudTabs: {
      status: 'no',
      note: 'Cloud-only by design — that is the entire product.',
    },
    grammarly: {
      status: 'no',
      note: 'A cloud-based service — your text is processed on Grammarly’s servers.',
    },
    macAiApps: {
      status: 'partial',
      note: 'Local-model support, where offered, is typically a secondary option alongside a cloud API.',
    },
  },
  {
    feature: 'No macOS Accessibility permission required',
    textwiz: {
      status: 'yes',
      note: 'Uses only stock macOS APIs — global hotkey, Services menu, Keychain — no Accessibility prompt, ever.',
    },
    cloudTabs: {
      status: 'n/a',
      note: 'Runs in a browser tab, not a native macOS integration.',
    },
    grammarly: {
      status: 'no',
      note: 'Its desktop app commonly asks for Accessibility permission to work across other apps.',
    },
    macAiApps: {
      status: 'no',
      note: 'Utilities that read or insert text system-wide commonly require this same permission.',
    },
  },
  {
    feature: 'No subscription',
    textwiz: {
      status: 'yes',
      note: 'A one-time purchase — pay once, keep using it.',
    },
    cloudTabs: {
      status: 'no',
      note: 'Typically billed as a monthly or annual subscription.',
    },
    grammarly: {
      status: 'no',
      note: 'A subscription service for its full feature set.',
    },
    macAiApps: {
      status: 'partial',
      note: 'Commonly subscription-based; a one-time-purchase option is the exception, not the rule.',
    },
  },
  {
    feature: 'No per-token bills when you run local models',
    textwiz: {
      status: 'yes',
      note: 'Zero token cost on local engines — pay once, process as much text as you want.',
    },
    cloudTabs: {
      status: 'no',
      note: 'Usage-based token costs apply on top of any subscription.',
    },
    grammarly: {
      status: 'n/a',
      note: 'Flat subscription pricing, but no local-model option to avoid a bill altogether.',
    },
    macAiApps: {
      status: 'partial',
      note: 'Only avoided when the app is actually running a local model — most usage still meters cloud tokens.',
    },
  },
  {
    feature: 'One-keystroke rewrite',
    textwiz: {
      status: 'yes',
      note: 'Each built-in wizard runs from a single shortcut — no prompting required.',
    },
    cloudTabs: {
      status: 'no',
      note: 'Requires switching tabs and writing your own prompt each time.',
    },
    grammarly: {
      status: 'partial',
      note: 'Inline suggestions you accept one at a time, not a single wizard keystroke.',
    },
    macAiApps: {
      status: 'partial',
      note: 'Varies — some ship canned prompts, many still expect you to type your own.',
    },
  },
];

const STATUS_LABELS = {
  yes: 'Yes',
  partial: 'Partial',
  no: 'No',
  'n/a': 'Not applicable',
};

/**
 * Human-readable label for a comparison cell's status, used for accessible
 * text alongside the status icon (e.g. an sr-only label or a title attribute).
 * @param {'yes'|'partial'|'no'|'n/a'} status
 * @returns {string}
 */
export function getStatusLabel(status) {
  return STATUS_LABELS[status] || 'Unknown';
}
