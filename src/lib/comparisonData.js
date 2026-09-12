/**
 * Comparison matrix for the landing page's "How TextWiz compares" section (issue #7).
 *
 * Addresses viral principles:
 *   #31 — Compares to competitors: a clear comparison table against named
 *         alternatives makes the reason to switch obvious (see Comparison.jsx).
 *   #32 — Priced above competitors: the point of this table is NOT to win on
 *         price. TextWiz Pro is a subscription (#41), so the frame is
 *         privacy/local-first/no-token-cost positioning rather than a
 *         discount pitch or a claim about the billing model.
 *   #19 — Does something never seen before: no competitor category below
 *         combines local, on-device AI with zero Accessibility permission and
 *         a one-keystroke, system-wide rewrite — that combination is the row
 *         TextWiz wins on every time.
 *
 * Every TextWiz claim below is sourced from copy that already exists
 * elsewhere on the page — Hero.jsx / Screenshots.jsx (works everywhere via
 * ⌘⇧Space and Services), Features.jsx ("Native macOS Integration"),
 * Wizards.jsx (one-keystroke wizards), and FreeLocalAI.jsx ("Local AI by
 * default", "Zero token cost"). Pricing-model claims belong to
 * shared/pricing.mjs and the Pricing section, not to this table. This file
 * introduces no new TextWiz claims.
 *
 * Competitor claims are deliberately kept to general, well-known category
 * facts (cloud AI assistants live in a browser tab and cap their free
 * tiers; Grammarly is a cloud-based service whose full feature set is paid;
 * Mac AI writing utilities in this space commonly require Accessibility
 * permission and offer a time-limited trial) — no specific pricing figures, version
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
    feature: 'Usable for free, with no trial clock',
    textwiz: {
      status: 'yes',
      note: 'The download is free and the Demo provider is free and ungated forever — the real interface, not a countdown.',
    },
    cloudTabs: {
      status: 'no',
      note: 'Free tiers are usually capped by message or usage limits.',
    },
    grammarly: {
      status: 'partial',
      note: 'A free tier exists, but the full feature set is behind a subscription.',
    },
    macAiApps: {
      status: 'partial',
      note: 'Commonly a time-limited trial rather than a permanently free mode.',
    },
  },
  {
    feature: 'No per-token bills when you run local models',
    textwiz: {
      status: 'yes',
      note: 'Zero token cost on local engines — process as much text as you want, with no provider bill.',
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
