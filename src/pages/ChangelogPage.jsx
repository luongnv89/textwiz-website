import { History, Sparkles, Wrench, Bug, Zap, Shield, Palette } from 'lucide-react';
import { APP_VERSION_FULL } from '../lib/version';

const releases = [
  {
    version: '1.1.1',
    build: '12',
    date: 'June 2026',
    title: 'Performance & Catalog Polish',
    description:
      'A focused release for the current App Store submission: faster floating-panel updates, a unified provider/model catalog, clearer model picker behavior, and a refreshed About page.',
    isLatest: true,
    highlights: [
      { icon: Zap, text: 'Faster Panel' },
      { icon: Wrench, text: 'Unified Catalog' },
      { icon: Bug, text: 'Picker Polish' },
      { icon: Palette, text: 'About Refresh' },
    ],
    sections: [
      {
        title: 'Improvements',
        icon: Zap,
        items: [
          'Unified model catalog across Settings, the floating panel, and usage surfaces.',
          'Parallel provider key lookups reduce floating-panel startup latency.',
          'Batched streaming updates and cached panel work keep long AI responses smoother.',
          'History pruning now waits until the retention cap is exceeded instead of running too eagerly.',
          'Diff rendering is more efficient for larger text transformations.',
          'Gemini transport logging is quieter, and analytics export skips redundant CSV sorting.',
        ],
      },
      {
        title: 'Fixes',
        icon: Bug,
        items: [
          'Usage popup model picker now scrolls correctly after the expanded model catalog.',
          'The selected model highlight is more reliable across provider/model picker surfaces.',
        ],
      },
      {
        title: 'Polish',
        icon: Palette,
        items: [
          'About page redesigned with an editorial layout and clearer resource tiles.',
        ],
      },
    ],
  },
  {
    version: '1.1.0',
    build: '12',
    date: 'June 2026',
    title: 'Apple Intelligence & Provider Management',
    description:
      'On-device Apple Intelligence when your Mac supports it — no API key required. Plus a new Providers tab for key and model management, custom cloud models, and a smoother floating panel during Foundation Model streaming.',
    isLatest: false,
    highlights: [
      { icon: Sparkles, text: 'Apple Intelligence' },
      { icon: Shield, text: 'On-Device AI' },
      { icon: Wrench, text: 'Providers Tab' },
      { icon: Zap, text: 'Responsive Panel' },
    ],
    sections: [
      {
        title: 'New Features',
        icon: Sparkles,
        items: [
          'Apple Intelligence provider — on-device Foundation Model with runtime availability detection and graceful fallback when unavailable.',
          'First launch on capable hardware defaults to Apple Intelligence automatically.',
          'Providers tab — manage API keys, toggle models, and add custom OpenAI-compatible endpoints.',
          'Custom cloud model names with validate-and-save; custom models appear in the floating-panel picker.',
          'Claude and OpenAI built-in catalog entries.',
          'Cancel (Escape) while a wizard is streaming.',
        ],
      },
      {
        title: 'Improvements',
        icon: Wrench,
        items: [
          'Minimum macOS version raised to 15.2 for Foundation Models framework support.',
          'Floating panel stays responsive during on-device streaming — model popovers no longer freeze.',
          'Model picker remains usable during streaming (applies to the next run).',
          'Quality-improvement wizards preserve markdown, bullets, and code-block formatting.',
        ],
      },
      {
        title: 'Fixes',
        icon: Bug,
        items: [
          'Model dropdown highlight matches the model that actually ran.',
          'Gemini registers correctly after connection test and with custom model names.',
        ],
      },
    ],
  },
  {
    version: '1.0.1',
    build: '11',
    date: 'April 2026',
    title: 'App Store Compliance & Smoother Capture',
    description:
      'A focused update that removes the Accessibility API entirely to meet App Store guideline 2.4.5, and replaces the old Replace button with an auto-copy + paste-toast flow. First-launch permission prompts are gone.',
    isLatest: false,
    highlights: [
      { icon: Shield, text: 'No Permissions' },
      { icon: Zap, text: 'In-Place Replace' },
      { icon: Sparkles, text: 'Auto-Copy Toast' },
      { icon: Bug, text: 'Compliance Fix' },
    ],
    sections: [
      {
        title: 'What changed',
        icon: Sparkles,
        items: [
          'Accessibility API removed entirely. TextWiz no longer calls any AX* APIs or posts synthetic CGEvents, bringing the app into compliance with App Store guideline 2.4.5.',
          'Hotkey ⌘⇧Space now reads directly from the system clipboard. Copy with ⌘C first, then invoke — no permission prompts, no fallbacks, no surprises.',
          'Right-click → Services → "Process with TextWiz" now runs the default wizard synchronously and writes the AI result back to the same pasteboard, so macOS splices the answer into the source app in place.',
          'Replace button retired. When a wizard finishes, the result is auto-copied to the clipboard and the panel shows a "Copied — press ⌘V to paste" toast.',
          'First-launch experience is now prompt-free. The app starts in the menu bar and is ready to use immediately.',
        ],
      },
      {
        title: 'Under the hood',
        icon: Wrench,
        items: [
          'Removed AccessibilityPermissionService, MacAccessibilitySelectionProvider, and all AX-related entitlements.',
          'Services handler runs the default wizard on the calling thread with a 30-second LLM timeout so macOS gets the result back for in-place splicing.',
          'Floating panel now supports pre-filled results — the Services path reuses the computed answer instead of re-running the wizard when the panel opens for inspection.',
          'Dropped the unused apple-events entitlement.',
        ],
      },
      {
        title: 'Fixes',
        icon: Bug,
        items: [
          'App Store rejection (submission a6223b6e…, build 10) under guideline 2.4.5 resolved.',
          'Eliminates the "clipboard + ⌘C synthesis" race that occasionally dropped text in Electron apps.',
        ],
      },
    ],
  },
  {
    version: '1.0.0',
    build: '6',
    date: 'April 2026',
    title: 'App Store Launch',
    description:
      'The first public build of TextWiz. Everything below has been shipped and is in the build heading to the Mac App Store.',
    highlights: [
      { icon: Sparkles, text: '8 Wizards' },
      { icon: Zap, text: '9 AI Providers' },
      { icon: Shield, text: 'Privacy-First' },
      { icon: Palette, text: 'Inline Diff' },
    ],
    sections: [
      {
        title: 'New Features',
        icon: Sparkles,
        items: [
          'System-wide text capture via the clipboard (⌘⇧Space after ⌘C) and the macOS Services menu — no Accessibility permission required.',
          'Floating panel with streaming AI responses and inline word-/character-level diff highlighting.',
          '8 built-in wizards — Proofread, Rewrite, Concise, Friendly, Professional, X Post, LinkedIn Post, Improve Prompt.',
          'Wizard manager — create, edit, duplicate, and delete your own wizards with custom prompts, providers, and models.',
          'Request history — every run is saved locally with search and browsing, so you can find and reopen past results.',
          'Replace button — writes the AI result straight back into the source app, no copy-paste required.',
          '9 AI providers — Gemini, OpenAI, Claude, Mistral, Groq, OpenRouter in the cloud; Ollama, LM Studio, and Apple MLX on-device.',
          'Auto-detect local engines — TextWiz scans Ollama, LM Studio, and MLX on launch and lists their live model catalogs.',
          'macOS Services integration — right-click → Services → Process with TextWiz, in any app.',
          'Global hotkey ⌘⇧Space to invoke the floating panel anywhere on your Mac.',
          'Local-only usage analytics dashboard with token and latency tracking.',
        ],
      },
      {
        title: 'Privacy & Security',
        icon: Shield,
        items: [
          'API keys stored in the macOS Keychain — never in plain text.',
          'On-device providers (Ollama, LM Studio, Apple MLX) never send data to the network.',
          'Usage analytics stay in local SQLite. No cloud telemetry, no tracking.',
          'File-based logging with rotation that never records API keys or user text.',
        ],
      },
      {
        title: 'Polish & UX',
        icon: Palette,
        items: [
          'Menu bar icon with template rendering for proper light/dark mode behavior.',
          'Dashboard consolidation — settings, analytics, wizards, and logs all in one place.',
          'Default model picker prefixed with provider for clarity.',
          'Dark mode support throughout the app.',
        ],
      },
      {
        title: 'Under the Hood',
        icon: Wrench,
        items: [
          'Clean Architecture split into Domain, Infrastructure, and UI modules.',
          'Swift 6 strict concurrency, Sendable everywhere.',
          'SPM build plugin that injects the git commit hash into the app version at build time.',
          'Shared OpenAI-compatible HTTP client for Groq, Mistral, and OpenRouter.',
        ],
      },
      {
        title: 'Fixes',
        icon: Bug,
        items: [
          'Default wizard pre-selection now stable across launches.',
          'Dashboard dropdowns and "Open at Login" toggle no longer loop.',
          'Floating panel hotkey reliability across multi-monitor setups.',
        ],
      },
    ],
  },
];

export default function ChangelogPage() {
  return (
    <section className="py-24 sm:py-32 px-4 bg-gradient-to-b from-primary-50 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-black transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-500/10 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            <History className="h-4 w-4" />
            Version History
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-100 mb-4">Changelog</h1>
          <p className="text-gray-600 dark:text-slate-300">
            Every version of TextWiz, what shipped in it, and why. Current build:{' '}
            <span className="font-mono text-gray-900 dark:text-slate-100">{APP_VERSION_FULL}</span>.
          </p>
        </div>

        <div className="space-y-12">
          {releases.map((release, index) => (
            <article
              key={release.version}
              className={`relative ${index !== releases.length - 1 ? 'pb-12 border-b border-gray-200 dark:border-slate-800' : ''}`}
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-primary-600 text-white text-sm font-bold rounded-full">
                  v{release.version}
                </span>
                <span className="px-2 py-0.5 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 text-xs font-mono rounded">
                  build {release.build}
                </span>
                <span className="text-base text-gray-500 dark:text-slate-400">{release.date}</span>
                {release.isLatest && (
                  <span className="px-2 py-0.5 bg-green-100 dark:bg-emerald-500/10 text-green-700 dark:text-emerald-300 text-xs font-medium rounded">
                    Latest
                  </span>
                )}
              </div>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-2">{release.title}</h2>
              <p className="text-gray-600 dark:text-slate-300 mb-4">{release.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {release.highlights.map((highlight, i) => (
                  <div
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-slate-100 text-sm rounded-full"
                  >
                    <highlight.icon className="h-3.5 w-3.5 text-primary-600 dark:text-primary-400" />
                    {highlight.text}
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                {release.sections.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 rounded-md bg-primary-100 dark:bg-primary-500/10">
                        <section.icon className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                      </div>
                      <h3 className="font-medium text-gray-900 dark:text-slate-100">{section.title}</h3>
                    </div>
                    <ul className="space-y-2 ml-8">
                      {section.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="text-gray-600 dark:text-slate-300 text-base flex items-start gap-2"
                        >
                          <span className="text-primary-600 dark:text-primary-400 mt-1.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 p-6 bg-gray-50 dark:bg-slate-900/50 rounded-xl border border-gray-200 dark:border-slate-800">
          <div className="flex items-start gap-3">
            <Bug className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-1">Found a bug?</h3>
              <p className="text-base text-gray-600 dark:text-slate-300">
                Report issues or request features in the{' '}
                <a
                  href="https://github.com/luongnv89/textwiz-feedback/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 dark:text-primary-300 hover:underline"
                >
                  feedback repository
                </a>
                , or use the{' '}
                <a href="/feedback" className="text-primary-600 dark:text-primary-300 hover:underline">
                  feedback form
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
