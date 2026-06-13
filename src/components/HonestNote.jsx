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
          No testimonials yet. Just a solo dev and an app I&rsquo;d use every day.
        </h2>

        <div className="space-y-5 text-lg text-gray-600 dark:text-slate-300 leading-relaxed">
          <p>
            Hi — I&rsquo;m Luong. I built TextWiz because I got tired of context-switching between my editor, Slack, and
            a browser tab just to run a sentence through an AI. I wanted to select text anywhere on my Mac, hit one
            keystroke, and get a better version back. So I built that.
          </p>
          <p>
            I&rsquo;m not going to paste fake five-star reviews here to make the page look bigger than it is. TextWiz is
            new. It&rsquo;s heading to the Mac App Store, and the first wave of users are going to be people who find
            it by word of mouth, GitHub, or this page. If that&rsquo;s you: thank you. You&rsquo;re early, and it
            matters.
          </p>
          <p>
            Everything I ship, I use every day. The diff view, the shortcut manager, request history, the local-only
            providers — they exist because I wanted them. If something in TextWiz feels clunky or missing, there&rsquo;s
            a good chance I haven&rsquo;t noticed yet. Please tell me.
          </p>
          <p>
            Full disclosure: I&rsquo;ve been building and using TextWiz for the last six months. I was lazy about
            polishing it enough to publish — kept telling myself &ldquo;one more pass.&rdquo; This launch is me pushing
            past that laziness so the app can actually reach people instead of sitting on my Mac. If the rough edges
            still show, that&rsquo;s why — and it&rsquo;s also why your feedback matters so much right now.
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <a
            href="/feedback"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg"
          >
            <MessageCircle className="h-5 w-5" />
            Send me feedback
          </a>
          <a
            href="https://github.com/luongnv89/textwiz-feedback"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-slate-100 font-semibold rounded-xl transition-all"
          >
            <Github className="h-5 w-5" />
            Report on GitHub
          </a>
        </div>

        <p className="mt-8 text-sm text-gray-500 dark:text-slate-400">
          Once real users start sharing their experience, I&rsquo;ll put their words here — with their names and their
          permission. Until then, this space stays honest.
        </p>
      </div>
    </section>
  );
}
