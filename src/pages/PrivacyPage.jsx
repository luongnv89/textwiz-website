import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 mb-8 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-100 mb-8">Privacy Policy</h1>

        <div className="space-y-8 text-gray-700 dark:text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-4">This website</h2>
            <p>
              The TextWiz marketing site is static. We do not run email signup, feedback forms, CAPTCHA, or analytics
              scripts that collect personal data on this domain. Feedback is handled on{' '}
              <a
                href="https://github.com/luongnv89/textwiz-feedback"
                className="text-primary-600 dark:text-primary-400 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>{' '}
              under GitHub&apos;s privacy terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-4">TextWiz app</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>API keys are stored in your macOS Keychain</li>
              <li>Usage history and analytics stay in local SQLite on your device</li>
              <li>We do not operate backend servers that receive your selected text</li>
              <li>Cloud AI providers only receive text you choose to process through them</li>
              <li>On-device engines (Apple Intelligence, Ollama, LM Studio, MLX-LM) keep text on your Mac</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-4">Contact</h2>
            <p>
              Questions about privacy: open an issue on{' '}
              <a
                href="https://github.com/luongnv89/textwiz-feedback/issues/new"
                className="text-primary-600 dark:text-primary-400 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                textwiz-feedback
              </a>
              .
            </p>
          </section>

          <section className="pt-4 border-t border-gray-200 dark:border-slate-700">
            <p className="text-sm text-gray-500 dark:text-slate-400">Last updated: June 2026</p>
          </section>
        </div>
      </div>
    </div>
  );
}