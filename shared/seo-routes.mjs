/** Single source for per-route SEO + prerender crawl bodies (Helmet, prerender, llms). */

import { INTRO_OFFER_ELIGIBILITY } from './pricing.mjs';
import { APP_VERSION_FULL, APP_RELEASE_URL } from '../src/lib/version.js';

export const SITE_URL = 'https://textwiz.pro';
export const SITE_NAME = 'TextWiz';

export const DEFAULT_DESCRIPTION =
  'Private, local-first AI text shortcuts for macOS. Select text, press ⌘⇧Space. Free download; TextWiz Pro unlocks real providers from $0.99 for the first week.';

export const HOMEPAGE_DOCUMENT_TITLE = `${SITE_NAME} — AI Text Shortcuts for macOS`;

export function pageTitle(route) {
  if (route.path === '/') {
    return route.title ?? HOMEPAGE_DOCUMENT_TITLE;
  }
  const segmentTitle = route.title ?? 'TextWiz';
  return `${segmentTitle} | TextWiz`;
}

/** @type {{ path: string, title: string | null, description: string, body: string, sources: string[] }[]} */
export const SEO_ROUTES = [
  {
    path: '/',
    title: null,
    description: DEFAULT_DESCRIPTION,
    sources: ['src/pages/HomePage.jsx', 'src/components', 'src/lib/faqData.js', 'shared'],
    body: `
      <h1>TextWiz — private, local-first AI text shortcuts for macOS</h1>
      <p>TextWiz is an AI writing assistant for Mac users. Proofread, rewrite, shorten text, or change its tone without leaving the app you are using.</p>
      <h2>How TextWiz works</h2>
      <p>Select text, copy with ⌘C, and press ⌘⇧Space to open the floating AI panel. Pick a wizard, click Copy to close the panel and return focus to your app, then paste with ⌘V. Auto-copy is optional and off by default.</p>
      <p>Or use right-click → Services to replace selected text after a successful, complete result. Failures, refusals, and incomplete results leave the selection intact and open the floating panel.</p>
      <h2>Wizards and collections</h2>
      <p>Each AI action is a "wizard." Everyday Edits includes Proofread, Rewrite, Concise, Friendly, and Professional. Social includes X Post and LinkedIn Post. Build unlimited custom wizards with your own prompts.</p>
      <p>The Analyst &amp; Coach collection is included, with Clarity Critic, Executive Summary, Decision Extractor, Rewrite Coach, Argument Stress Test, and Structure Tightener. TextWiz ships 14 built-ins: these 13 visible actions plus Improve Prompt in the wizard editor.</p>
      <h2>Supported AI providers</h2>
      <p>Ten engines, four of them on-device: Apple Intelligence (Foundation Model, no API key), Ollama, LM Studio, and MLX-LM. Cloud APIs include OpenAI, Anthropic, Gemini, Mistral, Groq, and OpenRouter when you bring your own key.</p>
      <p>Each built-in cloud provider offers three suggested defaults plus your added API model IDs. Validate &amp; Add checks the specific model ID before saving, without generating text. Current Claude and GPT-6 requests use supported parameters and failures provide safe, actionable guidance.</p>
      <p>Custom OpenAI-compatible providers require an absolute HTTPS URL with a host and no embedded credentials, query, or fragment. Existing custom HTTP endpoints need HTTPS before use; built-in local engines keep their HTTP setup. API credentials remain in macOS Keychain.</p>
      <h2>Latest release</h2>
      <p>TextWiz ${APP_VERSION_FULL}, released October 9, 2026, is <a href="${APP_RELEASE_URL}">available on GitHub</a>. The Mac App Store update is not yet available.</p>
      <h2>Privacy and permissions</h2>
      <p>On-device engines keep your text on your Mac. TextWiz runs no servers and collects none of your data. Cloud keys live in the macOS Keychain, and text goes directly to your chosen provider. No Accessibility permission is needed.</p>
      <h2>Free download and TextWiz Pro</h2>
      <p>The app is a free download on the Mac App Store, and the Demo provider is free forever. Every run against a real provider needs TextWiz Pro, including on-device engines.</p>
      <p>TextWiz Pro is an auto-renewable subscription: $2.99 per week, $7.99 per month, or $59.99 per year in US dollars. For eligible customers, the weekly plan starts at $0.99 for the first week. ${INTRO_OFFER_ELIGIBILITY}</p>
      <p>Customers who bought the paid app before the switch keep Pro for life at no cost. Cloud provider API costs are separate from the TextWiz Pro subscription.</p>
      <h2>System requirements</h2>
      <p>TextWiz requires macOS 15.2 or later. Apple Intelligence also requires supported hardware.</p>
    `,
  },
  {
    path: '/getting-started',
    title: 'Setup & API Keys',
    description:
      'Set up TextWiz on macOS: Ollama and Gemini walkthroughs, free-tier API keys (Gemini, Groq, OpenRouter, Mistral), hotkey ⌘⇧Space, and Services.',
    sources: ['src/pages/GettingStartedPage.jsx', 'src/components/guide'],
    body: `
      <h1>Setup and API keys</h1>
      <p>Connect TextWiz to an LLM: local Ollama track or cloud Gemini track, then configure Dashboard → Settings → Primary Provider. Free-tier signup links for Gemini, Groq, OpenRouter, and Mistral on the same page.</p>
      <p>Shortcuts share one Primary Provider and Model from Settings. Capture text via clipboard + hotkey or Services → Process with TextWiz.</p>
      <p>Built-in cloud providers offer three suggested defaults plus user-added API model IDs. In Dashboard → Providers, enter the exact API model ID and use Validate &amp; Add to check that model before saving without generating text. Local engines discover installed models.</p>
      <p>Custom OpenAI-compatible providers require HTTPS with a host and no embedded credentials, query, or fragment; existing custom HTTP endpoints must be updated before use. API keys stay in macOS Keychain. Built-in local engines keep their HTTP setup.</p>
      <p>Everyday Edits, Social, and Analyst &amp; Coach are included: 13 visible actions plus Improve Prompt in the wizard editor, for 14 built-in wizards.</p>
      <p>Click Copy to close the panel and return focus to your source app, then paste with ⌘V. Auto-copy is optional and off by default. Services preserves selected text after failure, refusal, or an incomplete result and opens the floating panel.</p>
    `,
  },
  {
    path: '/changelog',
    title: 'Changelog',
    description: 'Release notes and version history for TextWiz, the macOS AI text shortcuts app.',
    sources: ['src/pages/ChangelogPage.jsx'],
    body: `
      <h1>TextWiz changelog</h1>
      <h2>TextWiz ${APP_VERSION_FULL} — October 9, 2026</h2>
      <p>TextWiz ${APP_VERSION_FULL} is <a href="${APP_RELEASE_URL}">available on GitHub</a>. The Mac App Store update is not yet available.</p>
      <p>Cloud pickers offer three suggested defaults per provider plus added API model IDs. Validate &amp; Add checks the exact model before saving, including Claude. Older catalog models remain available to saved wizards and can be added explicitly.</p>
      <p>Current Claude and GPT-6 requests omit unsupported sampling parameters; GPT-6 uses the current output token-limit parameter. Claude streamed API errors fail the run with safe recovery guidance, and connection tests distinguish account, network, unexpected-response, and cancellation outcomes.</p>
      <p>macOS Services preserves selected text after streamed failure, refusal, or token-limited results and opens the floating panel.</p>
      <p>Custom OpenAI-compatible providers require an absolute HTTPS URL with a host and no embedded credentials, query, or fragment; existing custom HTTP endpoints need HTTPS before use.</p>
      <p>Failures omit external error bodies and secret-bearing network details; API credentials stay in macOS Keychain.</p>
      <h2>TextWiz 1.5.0 (18) — September 17, 2026</h2>
      <p>Appearance controls, cursor-display panel placement, Apple Intelligence first-run defaults, and refreshed model catalogs. Optional auto-copy is off by default; Copy closes the panel and returns focus to the previous app, or just closes it when opened from TextWiz itself.</p>
      <p>Version history for the native macOS app: Apple Intelligence, unified model catalog, floating panel performance, Providers tab, custom cloud models, diff view, history, and App Store compliance (no Accessibility APIs).</p>
    `,
  },
  {
    path: '/feedback',
    title: 'Feedback',
    description: 'Send feedback or report issues for TextWiz. Help improve the macOS AI writing assistant.',
    sources: ['src/pages/FeedbackPage.jsx'],
    body: `
      <h1>TextWiz feedback</h1>
      <p>Share bugs, ideas, and provider-specific issues via public GitHub issue templates.</p>
    `,
  },
  {
    path: '/privacy',
    title: 'Privacy Policy',
    description:
      'How TextWiz handles data: static site, API keys in Keychain, local SQLite, third-party AI providers, and TextWiz Pro billing handled by Apple.',
    sources: ['src/pages/PrivacyPage.jsx', 'shared/seo-routes.mjs'],
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
      'End user license agreement for the TextWiz Mac app and the auto-renewing TextWiz Pro subscription: prices, renewal, and how to cancel.',
    sources: ['src/pages/TermsPage.jsx', 'shared/pricing.mjs'],
    body: `
      <h1>Terms of service and end user license agreement</h1>
      <p>Terms governing use of the TextWiz marketing site, the Mac application, and the TextWiz Pro subscription. TextWiz is a free download; the Demo provider is free forever and every run against a real AI provider requires TextWiz Pro.</p>
      <p>Auto-renewing subscription terms: TextWiz Pro is an auto-renewable subscription sold through the Mac App Store in three durations, $2.99 per one week, $7.99 per one month, and $59.99 per one year in US dollars. For eligible customers, the weekly plan carries an introductory offer of $0.99 for the first week, charged up front for one period, after which it renews at $2.99 per week. ${INTRO_OFFER_ELIGIBILITY} Monthly and yearly plans have no introductory offer. Payment is charged to your Apple Account at confirmation of purchase. The subscription renews automatically unless it is cancelled at least 24 hours before the end of the current period, and your Apple Account is charged for renewal within 24 hours before the current period ends. Manage the subscription and turn off auto-renewal in System Settings, Apple Account, Media and Purchases, Subscriptions. No refund is given for the unused portion of a current period except where the law requires one. Customers who bought the paid app before the switch to free keep TextWiz Pro for life at no cost. See the privacy policy at https://textwiz.pro/privacy.</p>
    `,
  },
];
