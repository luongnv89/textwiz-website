import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function PrivacyPolicy({ isOpen, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="privacy-title"
    >
      <div
        className="bg-white dark:bg-slate-900 dark:text-slate-100 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-slate-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 px-8 py-6 flex items-center justify-between">
          <h2 id="privacy-title" className="text-2xl font-bold text-gray-900 dark:text-slate-100">
            Privacy Policy
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition"
            aria-label="Close privacy policy"
          >
            <X className="w-6 h-6 text-gray-600 dark:text-slate-300" />
          </button>
        </div>

        <div className="px-8 py-6 space-y-6 text-gray-700 dark:text-slate-300 leading-relaxed">
          <section>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-3">
              What We Collect
            </h3>
            <p>
              When you sign up for early access, we collect only your email address. This information is used exclusively to notify you when TextWiz launches and to send occasional updates about the product.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-3">
              How We Store Your Data
            </h3>
            <p>
              Your email address is stored securely using Netlify Forms infrastructure. Netlify is a trusted platform with industry-standard security practices. We do not share, sell, or distribute your email to any third parties.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-3">
              Your Rights
            </h3>
            <p>
              You have the right to:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Unsubscribe from our emails at any time using the link in every message</li>
              <li>Request deletion of your email from our records</li>
              <li>Access the information we have stored about you</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-3">
              TextWiz App Privacy
            </h3>
            <p>
              Once launched, TextWiz will:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Store all API keys securely in your macOS Keychain</li>
              <li>Keep usage analytics locally on your device only</li>
              <li>Never transmit your text selections or processed content to our servers</li>
              <li>Support fully offline operation with Ollama for maximum privacy</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-3">
              Contact Us
            </h3>
            <p>
              If you have questions about this privacy policy or wish to exercise your rights, please contact us through our support channels once TextWiz launches.
            </p>
          </section>

          <section>
            <p className="text-sm text-gray-600 dark:text-slate-400">
              Last updated: November 2025
            </p>
          </section>
        </div>

        <div className="sticky bottom-0 bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 px-8 py-4">
          <button
            onClick={onClose}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
