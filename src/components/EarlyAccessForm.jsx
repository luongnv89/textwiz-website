import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, CheckCircle } from 'lucide-react';
import MacAppStoreBadge from './MacAppStoreBadge';
import { setEmail, setPrivacyAccepted, submitFormStart } from '../store/formSlice';

export default function EarlyAccessForm() {
  const dispatch = useDispatch();
  const { email, privacyAccepted, submitting, submitted, error } = useSelector((state) => state.form);
  const [emailError, setEmailError] = useState('');

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    dispatch(setEmail(value));
    if (emailError && validateEmail(value)) {
      setEmailError('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    if (!privacyAccepted) {
      return;
    }

    dispatch(submitFormStart());
  };

  return (
    <section
      id="early-access"
      className="py-24 px-6 bg-gradient-to-br from-primary-50 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-black border-t border-b border-gray-200 dark:border-slate-800 transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <MacAppStoreBadge height={48} />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-6">
          Get product updates
        </h2>
        <p className="text-lg md:text-xl text-gray-600 dark:text-slate-300 mb-12">
          TextWiz is on the Mac App Store. Optional: leave your email for release notes and tips—not required to download.
        </p>

        {submitted ? (
          <div className="bg-green-50 dark:bg-emerald-900/30 border border-green-200 dark:border-emerald-700 rounded-lg p-6 max-w-md mx-auto">
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-emerald-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-900 dark:text-emerald-100 mb-2">Thank You!</h3>
            <p className="text-green-700 dark:text-emerald-200">
              You&apos;re on the list. We&apos;ll notify you when TextWiz launches.
            </p>
          </div>
        ) : (
          <form
            name="early-access"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="max-w-md mx-auto"
          >
            <input type="hidden" name="form-name" value="early-access" />
            <input type="hidden" name="bot-field" />

            <div className="mb-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition bg-white dark:bg-slate-900/60 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500"
                />
              </div>
              {emailError && (
                <p className="text-red-600 text-sm mt-2">{emailError}</p>
              )}
            </div>

            <div className="mb-6 text-left">
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  name="privacy"
                  checked={privacyAccepted}
                  onChange={(event) => dispatch(setPrivacyAccepted(event.target.checked))}
                  required
                  className="mt-1 w-4 h-4 text-primary-600 border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded focus:ring-primary-500"
                />
                <span className="ml-3 text-sm text-gray-600 dark:text-slate-300">
                  I agree to the{' '}
                  <Link
                    to="/privacy"
                    className="text-primary-600 hover:text-primary-700 dark:text-primary-300 dark:hover:text-primary-200 underline"
                  >
                    Privacy Policy
                  </Link>
                  {' '}and consent to receive early access updates via email.
                </span>
              </label>
            </div>

            {error && (
              <p className="text-red-600 text-sm mb-4">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting || !privacyAccepted}
              className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 dark:disabled:bg-slate-700/60 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-lg text-lg transition duration-200 shadow-lg hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            >
              {submitting ? 'Submitting...' : 'Notify Me on Launch Day'}
            </button>
          </form>
        )}

        <p className="text-sm text-gray-500 dark:text-slate-400 mt-8">
          macOS 14 Sonoma or later
        </p>
      </div>
    </section>
  );
}
