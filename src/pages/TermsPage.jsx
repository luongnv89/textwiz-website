import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import {
  PRO_NAME,
  PRO_PLANS,
  PRO_SWITCH_DATE_LABEL,
  MANAGE_SUBSCRIPTION_PATH,
} from '../lib/pricing';

const linkClass =
  'text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 underline';

function Section({ title, children }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-4">{title}</h2>
      {children}
    </section>
  );
}

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

        <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-100 mb-4">
          Terms of Service and End User License Agreement
        </h1>
        <p className="text-gray-600 dark:text-slate-400 mb-8">
          These terms cover the TextWiz macOS application, the {PRO_NAME} auto-renewable subscription, and this
          website.
        </p>

        <div className="space-y-8 text-gray-700 dark:text-slate-300 leading-relaxed">
          <Section title="1. Acceptance of these terms">
            <p>
              By downloading, installing, or using TextWiz, you agree to these terms. If you do not agree, do not use
              the application. This agreement is between you and the developer of TextWiz. Apple is not a party to it.
            </p>
          </Section>

          <Section title="2. What TextWiz does">
            <p>
              TextWiz is a macOS menu bar application that takes text you select and processes it through AI wizards.
              It captures text through the system clipboard and the macOS Services menu, and it uses no Accessibility
              APIs. It connects to the AI provider you choose, including on-device engines such as Apple Intelligence,
              Ollama, LM Studio, and MLX-LM, and cloud engines such as OpenAI, Anthropic, Google Gemini, Mistral,
              Groq, and OpenRouter.
            </p>
          </Section>

          <Section title="3. License grant">
            <p className="mb-3">
              Subject to these terms and to the Apple Media Services Terms and Conditions, you are granted a limited,
              non-exclusive, non-transferable, revocable license to download and use TextWiz on Apple-branded devices
              that you own or control, as permitted by the Usage Rules of the Mac App Store. This is a license, not a
              sale. All rights not expressly granted are reserved.
            </p>
            <p className="mb-3">You may not:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Copy, redistribute, rent, lease, sublicense, or sell the application</li>
              <li>Modify, reverse engineer, decompile, or disassemble the application, except where law forbids that restriction</li>
              <li>Remove or alter any proprietary notices</li>
              <li>Circumvent or tamper with the checks that control access to {PRO_NAME} features</li>
            </ul>
          </Section>

          <Section title="4. Free download and what it includes">
            <p>
              TextWiz is free to download. The built-in Demo provider runs free and without limits, and it stays free.
              Every run against a real AI provider, including OpenAI, Anthropic, Google Gemini, Ollama, and Apple
              Intelligence, requires an active {PRO_NAME} subscription.
            </p>
          </Section>

          <Section title="5. Auto-renewing subscription terms">
            <div className="space-y-4">
              <p>
                <strong className="text-gray-900 dark:text-slate-100">Subscription name:</strong> {PRO_NAME}, an
                auto-renewable subscription that unlocks every real AI provider in TextWiz.
              </p>

              <div>
                <p className="mb-3">
                  <strong className="text-gray-900 dark:text-slate-100">Length and price of each subscription
                  period:</strong>
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border border-gray-200 dark:border-slate-700 rounded-lg">
                    <thead className="bg-gray-50 dark:bg-slate-900">
                      <tr>
                        <th scope="col" className="px-4 py-3 font-semibold text-gray-900 dark:text-slate-100">Plan</th>
                        <th scope="col" className="px-4 py-3 font-semibold text-gray-900 dark:text-slate-100">Period</th>
                        <th scope="col" className="px-4 py-3 font-semibold text-gray-900 dark:text-slate-100">Price per period</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PRO_PLANS.map((plan) => (
                        <tr key={plan.id} className="border-t border-gray-200 dark:border-slate-700">
                          <td className="px-4 py-3">{plan.name}</td>
                          <td className="px-4 py-3">{plan.period}</td>
                          <td className="px-4 py-3">{plan.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-sm text-gray-500 dark:text-slate-400">
                  Prices shown are US dollars. Apple equalizes prices per storefront, so the amount charged in your
                  country may differ. The price shown in the App Store at the moment of purchase is the price you pay.
                </p>
              </div>

              <p>
                <strong className="text-gray-900 dark:text-slate-100">Introductory offer:</strong> the weekly plan is
                offered at $0.99 for the first week. The $0.99 is charged up front and covers one week only. It is
                available once per Apple Account. After that first week the weekly plan renews at $2.99 per week
                until you cancel. The monthly plan at $7.99 per month and the yearly plan at $59.99 per year carry no
                introductory offer and are charged at full price from the first period.
              </p>

              <p>
                <strong className="text-gray-900 dark:text-slate-100">Payment:</strong> subscriptions are sold through
                the Mac App Store only. Payment is charged to your Apple Account at confirmation of purchase.
              </p>

              <p>
                <strong className="text-gray-900 dark:text-slate-100">Automatic renewal:</strong> the subscription
                renews automatically unless it is cancelled at least 24 hours before the end of the current period.
                Your Apple Account is charged for renewal within 24 hours before the end of the current period, at the
                price of the plan you are on.
              </p>

              <p>
                <strong className="text-gray-900 dark:text-slate-100">Managing and cancelling:</strong> you can manage
                the subscription and turn off automatic renewal after purchase in {MANAGE_SUBSCRIPTION_PATH}. Cancelling
                stops the next renewal. Access to {PRO_NAME} continues until the end of the period you already paid for.
              </p>

              <p>
                <strong className="text-gray-900 dark:text-slate-100">Refunds:</strong> no refund is given for the
                unused portion of a current subscription period, except where the law requires one. Purchases are
                handled by Apple, so refund requests go to Apple through{' '}
                <a
                  href="https://reportaproblem.apple.com"
                  className={linkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  reportaproblem.apple.com
                </a>
                .
              </p>

              <p>
                <strong className="text-gray-900 dark:text-slate-100">Privacy:</strong> what the subscription stores
                and what Apple handles is described in our{' '}
                <Link to="/privacy" className={linkClass}>
                  Privacy Policy
                </Link>
                .
              </p>

              <p>
                <strong className="text-gray-900 dark:text-slate-100">Apple terms:</strong> use of the subscription is
                also governed by the{' '}
                <a
                  href="https://www.apple.com/legal/internet-services/itunes/"
                  className={linkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apple Media Services Terms and Conditions
                </a>
                .
              </p>
            </div>
          </Section>

          <Section title="6. Customers who bought the paid app">
            <p>
              TextWiz used to be a paid download. If you bought it before {PRO_SWITCH_DATE_LABEL}, you keep {PRO_NAME}{' '}
              for life at no cost. There is nothing to buy and nothing to renew. Sign in with the same Apple Account
              you used for the purchase and TextWiz restores your access.
            </p>
          </Section>

          <Section title="7. Price changes">
            <p>
              Prices may change. Where Apple requires it, a price increase takes effect only after you are notified
              and, depending on the rules of your region, only after you agree to it. If you do not accept a new
              price, the subscription ends at the close of the current period. Changes never apply to a period you
              have already paid for.
            </p>
          </Section>

          <Section title="8. Your responsibilities">
            <p className="mb-3">You are responsible for:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Obtaining and managing your own API keys from third-party AI providers</li>
              <li>Complying with the terms of service of any AI provider you use</li>
              <li>Any cost billed to you by a third-party AI provider, which is separate from {PRO_NAME}</li>
              <li>The content you process through the application and the use you make of the results</li>
            </ul>
            <p className="mt-3">
              {PRO_NAME} pays for access to TextWiz. It does not pay for tokens or usage at OpenAI, Anthropic, Google,
              or any other provider. Those bills, where they exist, stay between you and that provider.
            </p>
          </Section>

          <Section title="9. Privacy and data">
            <p>
              TextWiz runs on your device. We do not collect, transmit, or store your text content, API keys, or usage
              data on our servers, and we operate no servers that receive your text. API keys are stored in your macOS
              Keychain. History and analytics stay in a local database on your Mac. Apple processes the payment and we
              never see your card details. For the full picture see our{' '}
              <Link to="/privacy" className={linkClass}>
                Privacy Policy
              </Link>
              .
            </p>
          </Section>

          <Section title="10. Third-party services">
            <p>
              TextWiz integrates with third-party AI providers. We are not responsible for the availability, accuracy,
              or content of responses from those services. A provider may change, restrict, or discontinue its models
              or terms at any time. Your use of a third-party service is subject to that service&apos;s own terms.
            </p>
          </Section>

          <Section title="11. Disclaimer of warranties">
            <p>
              TextWiz is provided &quot;as is&quot; and &quot;as available&quot; without warranty of any kind, to the
              maximum extent permitted by law. We do not guarantee that the application will be error free, secure, or
              continuously available, or that any particular AI provider will remain supported. AI-generated content
              may contain inaccuracies and should be reviewed before use.
            </p>
          </Section>

          <Section title="12. Limitation of liability">
            <p>
              To the maximum extent permitted by law, we are not liable for any indirect, incidental, special, or
              consequential damages arising from your use of TextWiz, including loss of data, business interruption,
              or the cost of third-party services. Where liability cannot be excluded, it is limited to the amount you
              paid for TextWiz in the twelve months before the claim.
            </p>
          </Section>

          <Section title="13. Termination">
            <p>
              This license lasts until terminated. It ends if you stop using TextWiz and delete it, or if you breach
              these terms. Ending a subscription does not end this agreement for the free portion of the app, which
              you may keep using with the Demo provider.
            </p>
          </Section>

          <Section title="14. Apple as a third-party beneficiary">
            <p>
              Apple has no obligation to furnish maintenance or support for TextWiz. Apple is not responsible for
              addressing any claim relating to the application, including product liability, legal compliance, or
              consumer protection claims. Apple and its subsidiaries are third-party beneficiaries of this agreement
              and may enforce it against you.
            </p>
          </Section>

          <Section title="15. Changes to these terms">
            <p>
              We may modify these terms. Continued use of TextWiz after a change means you accept the new terms, and
              we will make reasonable efforts to flag significant changes. Changes to subscription pricing follow
              section 7 and the App Store rules, not this section alone.
            </p>
          </Section>

          <Section title="16. Contact">
            <p>
              Questions about these terms, about {PRO_NAME}, or about a purchase: open an issue on{' '}
              <a
                href="https://github.com/luongnv89/textwiz-feedback/issues/new"
                className={linkClass}
                target="_blank"
                rel="noopener noreferrer"
              >
                textwiz-feedback
              </a>
              , or use the{' '}
              <Link to="/feedback" className={linkClass}>
                feedback page
              </Link>
              .
            </p>
          </Section>

          <section className="pt-4 border-t border-gray-200 dark:border-slate-700">
            <p className="text-sm text-gray-500 dark:text-slate-400">Last updated: September 2026</p>
          </section>
        </div>
      </div>
    </div>
  );
}
