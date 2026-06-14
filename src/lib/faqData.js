/** Shared FAQ copy for UI and FAQPage structured data */
export const faqData = [
  {
    q: 'How much does TextWiz cost?',
    a: 'A one-time purchase on the Mac App Store—no subscription (see the listing for the current price). Run it on local AI and there are no per-token costs either: pay once, process as much text as you like.',
  },
  {
    q: 'How do I use TextWiz?',
    a: 'Two flows. Copy text with ⌘C and press ⌘⇧Space — the floating panel opens with your clipboard as input and runs the wizard you pick. Or right-click the selection → Services → Process with TextWiz, and macOS replaces it in place. Choose any built-in wizard — Proofread, Rewrite, Concise, Friendly, Professional, X Post, LinkedIn Post, and more — or run one you built yourself.',
  },
  {
    q: 'Which AI providers does TextWiz support?',
    a: 'Ten engines out of the box, four of them on-device: Apple Intelligence (Apple Foundation Model—free, no API key on supported Macs), Ollama, LM Studio, and MLX-LM. Cloud: Gemini, OpenAI, Claude, Mistral, Groq, and OpenRouter. Choose one Primary Provider and Model in Settings—all wizards use that pair unless you override in a custom wizard.',
  },
  {
    q: 'Do I need an API key?',
    a: "Only for cloud providers. Apple Intelligence, Ollama, LM Studio, and MLX-LM run on-device with no API key. For cloud models, bring your own key—stored in the macOS Keychain and only sent to the provider you chose.",
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