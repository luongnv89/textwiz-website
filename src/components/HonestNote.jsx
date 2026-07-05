import { Github, Heart, MessageCircle } from 'lucide-react';

export default function HonestNote() {
  return (
    <section
      id="honest-note"
      className="py-24 px-6 bg-gray-50 dark:bg-slate-950 border-t border-b border-gray-200 dark:border-slate-800 transition-colors duration-300"
    >
      <div className="max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-500/10 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
          <Heart className="h-4 w-4" />
          An honest note
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-6">
          Just a solo dev and an app I&rsquo;d use every day.
        </h2>

        <div className="mb-10 flex items-start gap-4 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
          <div
            className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-500/15 text-2xl font-bold text-primary-700 dark:text-primary-300"
            aria-hidden="true"
          >
            LN
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary-800 dark:text-primary-300">
              Why I built TextWiz
            </p>
            <p className="mt-1 font-semibold text-gray-900 dark:text-slate-100">
              Luong Nguyen &mdash; solo developer
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">
              Select text, press <span className="font-mono">⌘⇧Space</span>, get the rewrite back &mdash; that
              loop is the whole reason TextWiz exists.
            </p>
          </div>
        </div>

        <div className="space-y-5 text-lg text-gray-600 dark:text-slate-300 leading-relaxed">
          <p>
            Hi — I&rsquo;m Luong. I built TextWiz because I got tired of context-switching between my editor, Slack, and
            a browser tab just to run a sentence through an AI. I wanted to select text anywhere on my Mac, hit one
            keystroke, and get a better version back. So I built that.
          </p>
          <p>
            I&rsquo;m not going to paste fake five-star reviews here to pad out this page — TextWiz is new, heading
            to the Mac App Store. Everything I ship, I use daily: the diff view, wizard manager, request history,
            local-only providers. If something feels clunky or missing, there&rsquo;s a good chance I haven&rsquo;t
            noticed yet — tell me.
          </p>
          <p className="border-l-4 border-primary-300 dark:border-primary-500 pl-4 text-xl font-bold text-gray-900 dark:text-slate-100">
            This launch is me pushing past my own laziness so TextWiz can actually reach people instead of sitting on
            my Mac.
          </p>
          <p>
            Full disclosure: I&rsquo;ve been building TextWiz for six months, and I was lazy about polishing it
            enough to publish — I kept telling myself &ldquo;one more pass.&rdquo; If rough edges still show,
            that&rsquo;s why, and it&rsquo;s why your feedback matters right now. The first users will find TextWiz
            by word of mouth, GitHub, or this page — if that&rsquo;s you: thank you, you&rsquo;re early, and it
            matters.
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-6">
          <a
            href="/feedback"
            className="inline-flex items-center gap-2 py-2 text-sm font-medium text-gray-600 dark:text-slate-300 underline underline-offset-4 decoration-gray-300 dark:decoration-slate-600 hover:text-gray-900 dark:hover:text-slate-100 transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            Send me feedback
          </a>
          <a
            href="https://github.com/luongnv89/textwiz-website/issues/new/choose"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 py-2 text-sm font-medium text-gray-600 dark:text-slate-300 underline underline-offset-4 decoration-gray-300 dark:decoration-slate-600 hover:text-gray-900 dark:hover:text-slate-100 transition-colors"
          >
            <Github className="h-4 w-4" />
            Report on GitHub
          </a>
        </div>

        <p className="mt-8 text-sm text-gray-500 dark:text-slate-400">
          Once real users start sharing their experience, their words will show up in the First users section
          above — with their names and their permission. Until then, this space stays honest.
        </p>
      </div>
    </section>
  );
}
