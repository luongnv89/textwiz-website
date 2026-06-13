/** Shared FAQ copy for UI and FAQPage structured data */
export const faqData = [
  {
    q: 'How do I use TextWiz?',
    a: 'Two flows. Copy text with ⌘C and press ⌘⇧Space — the floating panel opens with your clipboard as input and runs the AI shortcut. Or right-click the selection → Services → Process with TextWiz, and macOS replaces it in place. Pick any of the 8 built-in shortcuts — Proofread, Rewrite, Concise, Friendly, Professional, X Post, LinkedIn Post, or Improve Prompt — or run one you built yourself.',
  },
  {
    q: 'Which AI providers does TextWiz support?',
    a: 'Nine providers out of the box. On-device: Apple Intelligence (Apple Foundation Model—free, no API key on supported Macs), Ollama, LM Studio, and MLX-LM. Cloud: Gemini, OpenAI, Claude, Mistral, Groq, and OpenRouter. Choose one Primary Provider and Model in Settings—all shortcuts use that pair unless you override in a custom shortcut.',
  },
  {
    q: 'Do I need an API key?',
    a: "Only for cloud providers. Apple Intelligence, Ollama, LM Studio, and MLX-LM run on-device with no API key. For cloud models, bring your own key—stored in the macOS Keychain and only sent to the provider you chose.",
  },
  {
    q: 'Can I add my own shortcuts?',
    a: 'Yes. The built-in shortcut manager lets you create, edit, duplicate, and delete shortcuts. Write the system prompt, pick the provider and model, and it shows up in the panel alongside the defaults.',
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
    a: 'With on-device providers (Apple Intelligence, Ollama, LM Studio, MLX-LM), nothing leaves your Mac. With cloud providers, only the text you process is sent to the provider you selected. Usage analytics stay in local SQLite and API keys live in the macOS Keychain. TextWiz itself has no servers and collects nothing.',
  },
  {
    q: 'Does TextWiz need the Accessibility permission?',
    a: 'No. TextWiz captures text through two fully compliant paths: the system clipboard (you press ⌘C, then ⌘⇧Space) and the macOS Services menu (right-click → Services → Process with TextWiz). It does not call any Accessibility APIs. You won\'t see any permission prompts on first launch — it just works, even in Slack, VS Code, and other sandboxed apps.',
  },
];