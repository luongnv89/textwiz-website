import { Laptop, History, Clipboard } from 'lucide-react';

// Viral principle #6 (see issue #10): one idea per section. This grid was
// previously an 8-item catch-all overlapping FreeLocalAI/Wizards/
// InteractiveSample/Hero; trimmed to the 3 items with no dedicated section
// elsewhere, unified under one "fits invisibly into your workflow" idea.
const features = [
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
    <section id="features" className="scroll-mt-20 py-24 px-6 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-slate-100 mb-4">
          Fits invisibly into your workflow
        </h2>
        <p className="text-xl text-gray-600 dark:text-slate-300 text-center mb-16 max-w-3xl mx-auto">
          No manual copy-paste, no hunting through old results, no permission prompts to babysit—TextWiz gets out of your way and lets you keep working.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
