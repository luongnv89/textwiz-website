import { Command, Network, Zap, FileText, Shield, Laptop, History, Clipboard } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Private by Design',
    description: 'With local engines, no data ever leaves your Mac. TextWiz runs no servers—history, analytics, and keys all stay on your device. With cloud, only the text you process goes to the provider you picked, never to us.',
  },
  {
    icon: Command,
    title: 'Works Everywhere',
    description: 'Copy any text (⌘C) and press ⌘⇧Space, or right-click → Services → Process with TextWiz to replace the selection in place. Works in every app — Safari, Slack, your editor, even sandboxed ones.',
  },
  {
    icon: Network,
    title: 'Local First, Your Choice of Cloud',
    description: 'Four on-device engines—Apple Intelligence (free, no key), Ollama, LM Studio, MLX-LM. Or bring your own OpenAI, Anthropic, Gemini, Mistral, Groq, or OpenRouter key. Ten engines, one panel, you decide.',
  },
  {
    icon: Zap,
    title: 'Built-In Wizards + Your Own',
    description: 'Each wizard is a one-keystroke AI spell. Everyday Edits and Social wizards ship today; the Analyst & Coach collection lands in the next update. Build unlimited custom wizards too—write the prompt, pick the model, done.',
  },
  {
    icon: FileText,
    title: 'Real-Time Diff View',
    description: 'See exactly what changed with inline highlighting. Word and character-level diffs show every edit AI makes to your text, so nothing surprises you.',
  },
  {
    icon: Clipboard,
    title: 'Auto-Copy, One Paste Away',
    description: 'When a wizard finishes, the result is copied to your clipboard and the panel shows "Copied — press ⌘V to paste". Right-click via Services goes one better and splices the result back into your document automatically.',
  },
  {
    icon: History,
    title: 'Searchable Request History',
    description: 'Every run is saved locally so you can browse, search, and reopen past results. Find that one rewrite from last Tuesday in seconds—stored on your Mac, never in the cloud.',
  },
  {
    icon: Laptop,
    title: 'Native macOS Integration',
    description: 'Global hotkey, Services menu, menu bar extra, Keychain — TextWiz uses only stock macOS APIs. No Accessibility permission, no prompts on first launch.',
  },
];
export default function Features() {
  return (
    <section id="features" className="py-24 px-6 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-slate-100 mb-4">
          Private, fast, and entirely under your control
        </h2>
        <p className="text-xl text-gray-600 dark:text-slate-300 text-center mb-16 max-w-3xl mx-auto">
          Everything you need to transform text instantly—local-first by default, with no servers and no data collection on our side.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="p-8 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary-300 dark:hover:border-primary-500 hover:shadow-lg transition duration-300 group"
              >
                <div className="w-14 h-14 bg-primary-100 dark:bg-primary-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary-200 dark:group-hover:bg-primary-500/20 transition">
                  <Icon className="w-7 h-7 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
