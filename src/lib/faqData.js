import { PRICING_SUMMARY, PRO_PLANS } from './pricing.js';

const weeklyPlan = PRO_PLANS.find((p) => p.id === 'weekly');

/** Shared FAQ copy for UI and FAQPage structured data */
export const faqData = [
  {
    q: 'How much does TextWiz cost?',
    a: `${PRICING_SUMMARY.replace('TextWiz is a free download.', 'TextWiz is a free download on the Mac App Store.')} ${weeklyPlan.note} Monthly and yearly have no introductory offer. Prices vary by region because Apple equalizes them per storefront.`,
  },
  {
    q: 'What is free and what needs TextWiz Pro?',
    a: 'The download is free and stays free, and the built-in Demo provider runs free and ungated forever so you can see exactly how the app behaves. Every run against a real provider needs TextWiz Pro: OpenAI, Anthropic, Gemini, Ollama, Apple Intelligence, LM Studio, MLX-LM, Mistral, Groq, and OpenRouter all sit behind it, local engines included.',
  },
  {
    q: 'Can I try TextWiz before subscribing?',
    a: 'Yes. Download the app and run the Demo provider, which is free, ungated, and permanent. It is the real interface with real wizards, so nothing about the flow is hidden from you. There is no trial period on any paid plan, because the free Demo provider does that job without a clock running. If you want the cheapest way into a real provider, the weekly plan starts at $0.99 for the first week.',
  },
  {
    q: 'How do I cancel TextWiz Pro?',
    a: 'Open System Settings > Apple Account > Media & Purchases > Subscriptions, pick TextWiz, and cancel. Cancel at least 24 hours before the current period ends, otherwise the next period is charged. Pro stays active until the end of the period you already paid for. Apple handles billing, so refunds go through reportaproblem.apple.com.',
  },
  {
    q: 'I already bought TextWiz. What happens to me?',
    a: 'You keep TextWiz Pro for life at no cost. Anyone who bought the paid app before the switch to free keeps full Pro access with nothing to buy and nothing to renew. Sign in with the same Apple Account you bought it with and TextWiz restores your access.',
  },
  {
    q: 'How do I use TextWiz?',
    a: 'Two flows. Copy text with ⌘C and press ⌘⇧Space — the floating panel opens with your clipboard as input and runs the wizard you pick. Or right-click the selection → Services → Process with TextWiz, and macOS replaces it in place. Choose any built-in wizard — Proofread, Rewrite, Concise, Friendly, Professional, X Post, LinkedIn Post, and more — or run one you built yourself.',
  },
  {
    q: 'Which AI providers does TextWiz support?',
    a: 'Ten engines out of the box, four of them on-device: Apple Intelligence (Apple Foundation Model—no API key on supported Macs, requires TextWiz Pro), Ollama, LM Studio, and MLX-LM. Cloud: Gemini, OpenAI, Claude, Mistral, Groq, and OpenRouter. Every real provider requires TextWiz Pro except the Demo provider. Choose one Primary Provider and Model in Settings—all wizards use that pair unless you override in a custom wizard.',
  },
  {
    q: 'Do I need an API key?',
    a: 'Cloud providers need your own API key—stored in the macOS Keychain and only sent to the provider you chose. On-device engines (Apple Intelligence, Ollama, LM Studio, and MLX-LM) need no API key, but TextWiz Pro is still required for every real provider except the Demo provider.',
  },
  {
    q: 'What are wizards and collections?',
    a: 'A wizard (or "wiz") is one AI spell—a named prompt that transforms the text you select. We group the built-in wizards into collections by the job they do: Everyday Edits (Proofread, Rewrite, Concise, Friendly, Professional) and Social (X Post, LinkedIn Post) ship today; an Analyst & Coach collection (Clarity Critic, Executive Summary, Decision Extractor, Rewrite Coach, Argument Stress Test, Structure Tightener) arrives in the next update. You can also build unlimited wizards of your own—write the prompt, pick the provider and model, and it shows up in the panel alongside the built-ins.',
  },
  {
    q: 'Can TextWiz write the result back into my document?',
    a: "Yes — two ways. Via right-click → Services → Process with TextWiz, macOS splices the AI result in place where the selection was, no extra steps. Via the ⌘⇧Space hotkey, the result is auto-copied when the wizard finishes and the panel shows a 'Copied — press ⌘V to paste' toast. Either way, no Accessibility permission is needed.",
  },
  {
    q: 'Does TextWiz keep a history of my requests?',
    a: "Yes. Every run is saved locally so you can browse, search, and reopen past results from the History view. It's stored in SQLite on your Mac—never uploaded anywhere.",
  },
  {
    q: 'What is the diff view?',
    a: 'Inline highlighting of what changed between your original text and the AI result—word and character-level, additions in green and deletions in red. Enabled by default in the floating panel.',
  },
  {
    q: 'Where does my data go? Is it private?',
    a: 'TextWiz runs no servers and collects none of your data. With on-device providers (Apple Intelligence, Ollama, LM Studio, MLX-LM), nothing ever leaves your Mac. With cloud providers, only the text you process is sent—directly to the provider you chose, never to us. History and analytics live in local SQLite; API keys stay in the macOS Keychain.',
  },
  {
    q: 'Does TextWiz need the Accessibility permission?',
    a: 'No. TextWiz captures text through two fully compliant paths: the system clipboard (you press ⌘C, then ⌘⇧Space) and the macOS Services menu (right-click → Services → Process with TextWiz). It does not call any Accessibility APIs. You won\'t see any permission prompts on first launch — it just works, even in Slack, VS Code, and other sandboxed apps.',
  },
];