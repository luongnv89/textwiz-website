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

        <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-100 mb-8">
          Privacy Policy
        </h1>

        <div className="space-y-8 text-gray-700 dark:text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-4">
              What We Collect
            </h2>
            <p>
              When you sign up for early access, we collect only your email address. This information is used exclusively to notify you when TextWiz launches and to send occasional updates about the product.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-4">
              How We Store Your Data
            </h2>
            <p>
              Your email address is stored securely using Netlify Forms infrastructure. Netlify is a trusted platform with industry-standard security practices. We do not share, sell, or distribute your email to any third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-4">
              Your Rights
            </h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Unsubscribe from our emails at any time using the link in every message</li>
              <li>Request deletion of your email from our records</li>
              <li>Access the information we have stored about you</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-4">
              TextWiz App Privacy
            </h2>
            <p className="mb-3">Once launched, TextWiz will:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Store all API keys securely in your macOS Keychain</li>
              <li>Keep usage analytics locally on your device only</li>
              <li>Never transmit your text selections or processed content to our servers</li>
              <li>Support fully offline operation with Ollama for maximum privacy</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-4">
              Contact Us
            </h2>
            <p>
              If you have questions about this privacy policy or wish to exercise your rights, please contact us through our support channels once TextWiz launches.
            </p>
          </section>

          <section className="pt-4 border-t border-gray-200 dark:border-slate-700">
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Last updated: December 2025
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
