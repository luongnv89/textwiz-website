import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
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
          Terms of Service
        </h1>

        <div className="space-y-8 text-gray-700 dark:text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By downloading, installing, or using TextWiz, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-4">
              2. Description of Service
            </h2>
            <p>
              TextWiz is a macOS menu bar application that captures selected text and processes it through AI-powered wizards. The application connects to third-party AI providers (such as Google Gemini, Ollama, Groq, Mistral, and OpenRouter) using API keys you provide.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-4">
              3. User Responsibilities
            </h2>
            <p className="mb-3">You are responsible for:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Obtaining and managing your own API keys from third-party AI providers</li>
              <li>Complying with the terms of service of any AI providers you use</li>
              <li>Any costs incurred from API usage with third-party providers</li>
              <li>The content you process through the application</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-4">
              4. License Grant
            </h2>
            <p>
              We grant you a limited, non-exclusive, non-transferable license to use TextWiz for personal or commercial purposes. You may not modify, reverse engineer, or redistribute the application without permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-4">
              5. Privacy and Data
            </h2>
            <p>
              TextWiz operates locally on your device. We do not collect, transmit, or store any of your text content, API keys, or usage data on our servers. API keys are stored securely in your macOS Keychain. Usage analytics are kept locally on your device only. For more details, please see our <Link to="/privacy" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 underline">Privacy Policy</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-4">
              6. Third-Party Services
            </h2>
            <p>
              TextWiz integrates with third-party AI providers. We are not responsible for the availability, accuracy, or content of responses from these services. Your use of third-party services is subject to their respective terms and conditions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-4">
              7. Disclaimer of Warranties
            </h2>
            <p>
              TextWiz is provided "as is" without warranty of any kind. We do not guarantee that the application will be error-free, secure, or continuously available. AI-generated content may contain inaccuracies and should be reviewed before use.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-4">
              8. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of TextWiz, including but not limited to loss of data, business interruption, or costs of third-party services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-4">
              9. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of TextWiz after changes constitutes acceptance of the new terms. We will make reasonable efforts to notify users of significant changes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-4">
              10. Contact
            </h2>
            <p>
              If you have questions about these Terms of Service, please contact us through our support channels.
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
