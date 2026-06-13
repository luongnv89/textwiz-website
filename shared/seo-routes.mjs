/** Single source for per-route SEO + prerender crawl bodies (Helmet, prerender, llms). */

export const SITE_URL = 'https://textwiz.luongnv.com';
export const SITE_NAME = 'TextWiz';

export const DEFAULT_DESCRIPTION =
  'macOS AI shortcuts on selected text via ⌘⇧Space or Services. Free on-device Apple Foundation Model on supported Macs—plus Gemini, OpenAI, Ollama & more. Keys in Keychain—no Accessibility access.';

export const HOMEPAGE_DOCUMENT_TITLE = `${SITE_NAME} — AI Text Shortcuts for macOS`;

/** @type {{ path: string, title: string | null, description: string, body: string }[]} */
export const SEO_ROUTES = [
  {
    path: '/',
    title: null,
    description: DEFAULT_DESCRIPTION,
    body: `
      <h1>TextWiz — AI text shortcuts for macOS</h1>
      <p>Select text, copy with ⌘C, press ⌘⇧Space to open the floating AI panel—or use Services to replace text in place. Eight built-in shortcuts plus unlimited custom prompts. Nine providers including Apple Intelligence (on-device Foundation Model, free, no API key), Ollama, LM Studio, MLX-LM, and cloud APIs.</p>
      <p>Privacy-first: Apple Intelligence and other on-device engines keep text on your Mac; cloud keys live in Keychain. No Accessibility permission. Mac App Store • Apple Intelligence requires macOS 15.2+ on supported hardware.</p>
    `,
  },
  {
    path: '/api-keys',
    title: 'API Keys Guide',
    description:
      'Free-tier API keys for TextWiz: Gemini, Groq, OpenRouter, Mistral, and Ollama. Signup links, limits (verified 2026-06), and Keychain setup.',
    body: `
      <h1>Free-tier API keys for TextWiz</h1>
      <p>Obtain keys from Gemini, Groq, OpenRouter, Mistral, or run Ollama locally with no key. Configure once in Dashboard → Settings → Primary Provider; keys stored in macOS Keychain.</p>
      <p>Start here: Ollama for privacy, Gemini for fastest cloud setup, OpenRouter for many :free models, Groq for low latency.</p>
    `,
  },
  {
    path: '/getting-started',
    title: 'Getting Started',
    description:
      'Set up TextWiz on macOS: Ollama, cloud API keys, global hotkey ⌘⇧Space, and macOS Services. Step-by-step setup guide.',
    body: `
      <h1>Connect TextWiz to an LLM</h1>
      <p>TextWiz is the UI; you plug in an LLM. Local path: install Ollama, run <code>ollama serve</code>, pull a model, open Dashboard → Settings → Primary Provider Ollama → Test Connection → ⌘C text → ⌘⇧Space.</p>
      <p>Cloud path: get a Gemini API key from Google AI Studio, paste in Settings → API Key (Keychain), pick a model, test connection, run a shortcut.</p>
      <p>Shortcuts share one Primary Provider and Model from Settings—not per-shortcut. Capture text via clipboard + hotkey or right-click Services → Process with TextWiz.</p>
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