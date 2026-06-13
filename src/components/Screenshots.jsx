import { useState } from 'react';

const screenshots = [
  {
    src: '/shortcuts-preview/1.0.0/appstore-overview.png',
    title: 'Instant text processing',
    caption: 'Copy text (⌘C) anywhere, press ⌘⇧Space, and watch AI transform it with inline diff highlighting. Or right-click → Services for in-place replacement.',
    alt: 'TextWiz floating panel rewriting a paragraph with inline diff',
  },
  {
    src: '/shortcuts-preview/1.0.0/appstore-shortcut-list.png',
    title: 'Eight shortcuts out of the box',
    caption: 'Proofread, Rewrite, Concise, Friendly, Professional, X Post, LinkedIn Post, Improve Prompt.',
    alt: 'TextWiz shortcut list',
  },
  {
    src: '/shortcuts-preview/1.0.0/appstore-shortcut-edit.png',
    title: 'Bring your own prompts',
    caption: 'Create and edit shortcuts with custom system prompts. They follow whichever provider you pick in Settings.',
    alt: 'TextWiz shortcut editor',
  },
  {
    src: '/shortcuts-preview/1.0.0/appstore-x-post-shortcut.png',
    title: 'X post shortcut',
    caption: 'Turn a rough thought into a tight post without leaving your current app.',
    alt: 'TextWiz generating an X post',
  },
  {
    src: '/shortcuts-preview/1.0.0/appstore-linkedin-shortcut.png',
    title: 'LinkedIn post shortcut',
    caption: 'Longer-form rewrite tuned for LinkedIn voice and pacing.',
    alt: 'TextWiz generating a LinkedIn post',
  },
  {
    src: '/shortcuts-preview/1.0.0/appstore-translate-shortcut.png',
    title: 'Translate in place',
    caption: 'Add translation shortcuts for any language pair you work in — reuse the same hotkey.',
    alt: 'TextWiz translation shortcut',
  },
  {
    src: '/shortcuts-preview/1.0.0/appstore-history.png',
    title: 'Request history',
    caption: 'Every run is saved locally so you can find, reopen, and copy past results.',
    alt: 'TextWiz request history',
  },
  {
    src: '/shortcuts-preview/1.0.0/appstore-analytics.png',
    title: 'Usage analytics',
    caption: 'Tokens, latency, and success rate per provider and shortcut. Lives on-device in SQLite.',
    alt: 'TextWiz usage analytics dashboard',
  },
  {
    src: '/shortcuts-preview/1.0.0/appstore-settings.png',
    title: 'One place to configure',
    caption: 'Pick your primary provider, paste an API key or point at a local server, and you are done.',
    alt: 'TextWiz settings screen',
  },
];

export default function Screenshots() {
  const [active, setActive] = useState(0);
  const current = screenshots[active];

  return (
    <section
      id="screenshots"
      className="pt-12 pb-24 bg-gray-50 dark:bg-slate-950 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-slate-100 mb-4">
            How it works
          </h2>
          <p className="text-xl text-gray-600 dark:text-slate-300 max-w-3xl mx-auto">
            A quick tour of the current build — straight from the Mac App Store.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800">
          <img
            src={current.src}
            alt={current.alt}
            className="w-full h-auto"
          />
          <div className="bg-white dark:bg-slate-900 p-6 text-center">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-slate-100 mb-2">
              {current.title}
            </h3>
            <p className="text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
              {current.caption}
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-3">
          {screenshots.map((shot, index) => (
            <button
              key={shot.src}
              onClick={() => setActive(index)}
              className={`rounded-lg overflow-hidden border-2 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${
                index === active
                  ? 'border-primary-500 shadow-md scale-[1.02]'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
              aria-label={`Show ${shot.title}`}
              aria-pressed={index === active}
            >
              <img src={shot.src} alt="" className="w-full h-auto block" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
