import { Link } from 'react-router-dom';
import { Github, Linkedin } from 'lucide-react';
import { APP_VERSION_FULL } from '../lib/version';
import { publicUrl } from '../lib/publicUrl';

function XLogo({ className = 'h-5 w-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M3 3h4.58l4.22 5.86L16.14 3H21l-6.72 9.63L21 21h-4.58l-4.22-5.86L7.86 21H3l6.72-9.63z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid gap-12 md:grid-cols-[1.4fr,1fr,1fr]">
          <div className="space-y-6">
            <img src={publicUrl('/Wordmark-white.svg')} alt="TextWiz" className="h-8" />
            <p className="text-gray-400 max-w-sm">
              AI text shortcuts for macOS—global hotkey, Services menu, and nine LLM providers. Polish copy in place with privacy-first, native integration.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-gray-200 uppercase">
              Quick Links
            </h3>
            <nav className="mt-5 space-y-3 text-sm">
              <Link to="/" className="block text-gray-400 transition hover:text-white">
                Home
              </Link>
              <Link to="/getting-started" className="block text-gray-400 transition hover:text-white">
                Setup guide
              </Link>
              <Link to="/api-keys" className="block text-gray-400 transition hover:text-white">
                API keys guide
              </Link>
              <Link to="/changelog" className="block text-gray-400 transition hover:text-white">
                Changelog
              </Link>
              <Link to="/feedback" className="block text-gray-400 transition hover:text-white">
                Feedback
              </Link>
              <a
                href="https://github.com/luongnv89/textwiz-feedback"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-400 transition hover:text-white"
              >
                GitHub Issues
              </a>
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-gray-200 uppercase">
              Stay Connected
            </h3>
            <p className="mt-5 text-sm text-gray-400">
              Follow luongnv89 for launch updates, behind-the-scenes, and product tips.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://twitter.com/luongnv89"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-800 bg-gray-900/40 text-gray-400 transition hover:-translate-y-0.5 hover:border-gray-700 hover:text-white"
                aria-label="X profile for luongnv89"
              >
                <XLogo />
              </a>
              <a
                href="https://github.com/luongnv89"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-800 bg-gray-900/40 text-gray-400 transition hover:-translate-y-0.5 hover:border-gray-700 hover:text-white"
                aria-label="GitHub profile for luongnv89"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/luongnv89/"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-800 bg-gray-900/40 text-gray-400 transition hover:-translate-y-0.5 hover:border-gray-700 hover:text-white"
                aria-label="LinkedIn profile for luongnv89"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-gray-900 pt-8 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-4">
            <p>&copy; {new Date().getFullYear()} TextWiz. All rights reserved.</p>
            <span className="hidden md:inline text-gray-700">•</span>
            <p className="font-mono text-xs text-gray-500">
              TextWiz v{APP_VERSION_FULL}
            </p>
          </div>
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="text-gray-400 transition hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-400 transition hover:text-white"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
