/**
 * Wiz collections — the editorial grouping of TextWiz's built-in wizards.
 *
 * A "wizard" (or "wiz") is one AI spell: a named prompt that transforms the
 * text you select. Collections group related wizards by the job they do.
 *
 * Shipped today (App Store v1.1.1): the 8 Everyday + Social wizards.
 * The Analyst & Coach collection ships in the next update — marked `upcoming`.
 *
 * Source of truth: ../textwiz Sources/TextWizDomain/Wizard.swift (PredefinedWizards).
 * "Improve Prompt" is built in but hidden (powers the wizard editor), so it is
 * not listed here — the visible count is 13, the total built-in count is 14.
 */
export const wizardCollections = [
  {
    name: 'Everyday Edits',
    tagline: 'Polish any draft in a keystroke.',
    upcoming: false,
    wizards: [
      { name: 'Proofread', desc: 'Fix grammar, spelling, and punctuation—voice untouched.' },
      { name: 'Rewrite', desc: 'Smooth awkward phrasing for clarity and flow.' },
      { name: 'Concise', desc: 'Cut filler—at least 30% shorter, every fact kept.' },
      { name: 'Friendly', desc: 'Warm, conversational tone without the fluff.' },
      { name: 'Professional', desc: 'Formal, business-ready language, no corporate filler.' },
    ],
  },
  {
    name: 'Social',
    tagline: 'Turn a rough thought into a ready-to-post update.',
    upcoming: false,
    wizards: [
      { name: 'X Post', desc: 'A scroll-stopping, X-native post under 280 characters.' },
      { name: 'LinkedIn Post', desc: 'A high-engagement post with hook, body, and CTA.' },
    ],
  },
  {
    name: 'Analyst & Coach',
    tagline: 'Pressure-test, summarize, and sharpen serious writing.',
    upcoming: true,
    wizards: [
      { name: 'Clarity Critic', desc: 'Flags clarity issues and hands back a tighter draft.' },
      { name: 'Executive Summary', desc: 'TL;DR, key points, risks, and next actions.' },
      { name: 'Decision Extractor', desc: 'Pulls owners, due dates, and action items from notes.' },
      { name: 'Rewrite Coach', desc: 'Your top 3 edits, explained, plus the revised text.' },
      { name: 'Argument Stress Test', desc: 'Strengths, weak spots, and the questions a skeptic asks.' },
      { name: 'Structure Tightener', desc: 'Reshapes messy notes into a scannable outline.' },
    ],
  },
];
