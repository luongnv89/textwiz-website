/** Single source for per-route SEO + prerender crawl bodies (Helmet, prerender, llms). */

export const SITE_URL = 'https://textwiz.luongnv.com';
export const SITE_NAME = 'TextWiz';

export const DEFAULT_DESCRIPTION =
  'Private, local-first macOS AI shortcuts on selected text via ⌘⇧Space or Services. Runs on-device by default (Apple Foundation Model, Ollama, LM Studio, MLX-LM)—no per-token cost—or bring your own cloud key. One-time purchase, no servers, no data collection.';

export const HOMEPAGE_DOCUMENT_TITLE = `${SITE_NAME} — AI Text Shortcuts for macOS`;

/** @type {{ path: string, title: string | null, description: string, body: string }[]} */
export const SEO_ROUTES = [
  {
    path: '/',
    title: null,
    description: DEFAULT_DESCRIPTION,
    body: `
      <h1>TextWiz — private, local-first AI text shortcuts for macOS</h1>
      <p>Select text, copy with ⌘C, press ⌘⇧Space to open the floating AI panel—or use Services to replace text in place. Each AI action is a "wizard." We group the built-ins into collections by job: Everyday Edits and Social ship today; the Analyst & Coach collection arrives in the next update. Plus unlimited custom wizards. Ten engines, four of them on-device: Apple Intelligence (Foundation Model, free, no API key), Ollama, LM Studio, and MLX-LM, plus cloud APIs (OpenAI, Anthropic, Gemini, Mistral, Groq, OpenRouter) when you bring your own key.</p>
      <p>Private by design: on-device engines keep your text on your Mac, TextWiz runs no servers and collects none of your data, and cloud keys live in the Keychain. One-time purchase, no subscription—run on local AI and there is no per-token cost. No Accessibility permission. Mac App Store • Apple Intelligence requires macOS 15.2+ on supported hardware.</p>
    `,
  },
  {
    path: '/getting-started',
    title: 'Setup & API Keys',
    description:
      'Set up TextWiz on macOS: Ollama and Gemini walkthroughs, free-tier API keys (Gemini, Groq, OpenRouter, Mistral), hotkey ⌘⇧Space, and Services.',
    body: `
      <h1>Setup and API keys</h1>
      <p>Connect TextWiz to an LLM: local Ollama track or cloud Gemini track, then configure Dashboard → Settings → Primary Provider. Free-tier signup links for Gemini, Groq, OpenRouter, and Mistral on the same page.</p>
      <p>Shortcuts share one Primary Provider and Model from Settings. Capture text via clipboard + hotkey or Services → Process with TextWiz.</p>
    `,
  },
  {
    path: '/changelog',
    title: 'Changelog',
    description: 'Release notes and version history for TextWiz, the macOS AI text shortcuts app.',
    body: `
      <h1>TextWiz changelog</h1>
      <p>Version history for the native macOS app: Apple Intelligence, unified model catalog, floating panel performance, Providers tab, custom cloud models, diff view, history, and App Store compliance (no Accessibility APIs).</p>
    `,
  },
  {
    path: '/feedback',
    title: 'Feedback',
    description: 'Send feedback or report issues for TextWiz. Help improve the macOS AI writing assistant.',
    body: `
      <h1>TextWiz feedback</h1>
      <p>Share bugs, ideas, and provider-specific issues via public GitHub issue templates.</p>
    `,
  },
  {
    path: '/privacy',
    title: 'Privacy Policy',
    description:
      'How the TextWiz website and app handle data: static site, Keychain, local SQLite, and third-party AI providers.',
    body: `
      <h1>Privacy policy</h1>
      <p>The marketing site does not collect email or run on-site feedback forms. The app stores API keys in macOS Keychain, usage in local SQLite, and sends text only to the AI provider you choose. TextWiz operates no backend telemetry servers.</p>
    `,
  },
  {
    path: '/terms',
    title: 'Terms of Service',
    description: 'Terms of use for the TextWiz website and Mac App Store application.',
    body: `
      <h1>Terms of service</h1>
      <p>Terms governing use of the TextWiz marketing site and Mac application.</p>
    `,
  },
];