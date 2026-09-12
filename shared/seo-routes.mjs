/** Single source for per-route SEO + prerender crawl bodies (Helmet, prerender, llms). */

import { INTRO_OFFER_ELIGIBILITY } from './pricing.mjs';

export const SITE_URL = 'https://www.textwiz.pro';
export const SITE_NAME = 'TextWiz';

export const DEFAULT_DESCRIPTION =
  'Private, local-first macOS AI shortcuts on selected text via ⌘⇧Space or Services. Free download with a free Demo provider; TextWiz Pro unlocks every real provider from $0.99 for the first week. On-device engines, no servers, no data collection.';

export const HOMEPAGE_DOCUMENT_TITLE = `${SITE_NAME} — AI Text Shortcuts for macOS`;

/** @type {{ path: string, title: string | null, description: string, body: string }[]} */
export const SEO_ROUTES = [
  {
    path: '/',
    title: null,
    description: DEFAULT_DESCRIPTION,
    body: `
      <h1>TextWiz — private, local-first AI text shortcuts for macOS</h1>
      <p>Select text, copy with ⌘C, press ⌘⇧Space to open the floating AI panel—or use Services to replace text in place. Each AI action is a "wizard." We group the built-ins into collections by job: Everyday Edits and Social ship today; the Analyst & Coach collection arrives in the next update. Plus unlimited custom wizards. Ten engines, four of them on-device: Apple Intelligence (Foundation Model, no API key), Ollama, LM Studio, and MLX-LM, plus cloud APIs (OpenAI, Anthropic, Gemini, Mistral, Groq, OpenRouter) when you bring your own key.</p>
      <p>Private by design: on-device engines keep your text on your Mac, TextWiz runs no servers and collects none of your data, and cloud keys live in the Keychain. The app is a free download and the Demo provider is free forever. Every run against a real provider needs TextWiz Pro, an auto-renewable subscription sold on the Mac App Store: $2.99 per week with an introductory offer of $0.99 for the first week, $7.99 per month, or $59.99 per year in US dollars. Customers who bought the paid app before the switch keep Pro for life at no cost. No Accessibility permission. Apple Intelligence requires macOS 15.2+ on supported hardware.</p>
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
      'How the TextWiz website and app handle data: static site, Keychain, local SQLite, third-party AI providers, and the TextWiz Pro subscription handled by Apple.',
    body: `
      <h1>Privacy policy</h1>
      <p>The marketing site does not collect email or run on-site feedback forms. The app stores API keys in macOS Keychain, usage in local SQLite, and sends text only to the AI provider you choose. TextWiz operates no backend telemetry servers.</p>
      <p>Payments and the TextWiz Pro subscription: the subscription is sold through the Mac App Store, Apple processes the payment and charges your Apple Account, and TextWiz never sees your card data. Subscription entitlement state is cached locally on your Mac alongside your API keys. There is no account, no login, and no licensing server.</p>
    `,
  },
  {
    path: '/terms',
    title: 'Terms of Service',
    description:
      'End user license agreement for the TextWiz Mac app and the auto-renewing TextWiz Pro subscription: durations, prices, renewal, and how to cancel.',
    body: `
      <h1>Terms of service and end user license agreement</h1>
      <p>Terms governing use of the TextWiz marketing site, the Mac application, and the TextWiz Pro subscription. TextWiz is a free download; the Demo provider is free forever and every run against a real AI provider requires TextWiz Pro.</p>
      <p>Auto-renewing subscription terms: TextWiz Pro is an auto-renewable subscription sold through the Mac App Store in three durations, $2.99 per one week, $7.99 per one month, and $59.99 per one year in US dollars. For eligible customers, the weekly plan carries an introductory offer of $0.99 for the first week, charged up front for one period, after which it renews at $2.99 per week. ${INTRO_OFFER_ELIGIBILITY} Monthly and yearly plans have no introductory offer. Payment is charged to your Apple Account at confirmation of purchase. The subscription renews automatically unless it is cancelled at least 24 hours before the end of the current period, and your Apple Account is charged for renewal within 24 hours before the current period ends. Manage the subscription and turn off auto-renewal in System Settings, Apple Account, Media and Purchases, Subscriptions. No refund is given for the unused portion of a current period except where the law requires one. Customers who bought the paid app before the switch to free keep TextWiz Pro for life at no cost. See the privacy policy at https://www.textwiz.pro/privacy.</p>
    `,
  },
];