import { Send, AlertCircle, Mail as MailIcon, Image, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import Turnstile from '../Turnstile';
import OSVersionSelector from './OSVersionSelector';
import ProviderSelector from './ProviderSelector';
import FeedbackInput from './FeedbackInput';
import { generateEmailDraft, CONTACT_EMAIL } from '../../utils/emailDraftHelper';

const STORAGE_KEY = 'textwiz-feedback-form';

const FEEDBACK_TYPES = [
  { value: 'bug', label: 'Bug Report' },
  { value: 'feature', label: 'Feature Request' },
  { value: 'general', label: 'General Feedback' },
];

const FEEDBACK_TYPE_GUIDES = {
  bug: {
    titlePlaceholder: 'e.g., "Floating panel doesn\'t open in Slack"',
    titleDescription: 'Briefly describe the bug or issue you encountered.',
    feedbackPlaceholder:
      'Describe the steps to reproduce the bug, what you expected to happen, and what actually happened. Which source app were you in? Which shortcut did you run?',
  },
  feature: {
    titlePlaceholder: 'e.g., "Add keyboard shortcut to cycle between shortcuts"',
    titleDescription: 'Briefly describe the feature you would like to see.',
    feedbackPlaceholder: 'Explain why this feature would be helpful and how you envision it working...',
  },
  general: {
    titlePlaceholder: 'Brief summary of your feedback',
    titleDescription: 'Briefly describe your feedback or suggestion.',
    feedbackPlaceholder: 'Tell us what is on your mind...',
  },
};

export default function FormDetails({
  formData,
  onChange,
  onSubmit,
  turnstileSiteKey,
  onTurnstileSuccess,
  onTurnstileExpire,
  onTurnstileError,
  isSubmitting,
  error,
  onBack,
}) {
  const [showScreenshotModal, setShowScreenshotModal] = useState(false);

  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData]);

  const isFormValid =
    formData.osVersion &&
    formData.appVersion &&
    formData.feedbackType &&
    formData.title?.trim() &&
    formData.feedback?.trim() &&
    formData.consent &&
    (!turnstileSiteKey || formData.turnstileToken);

  const handleEmailDraft = () => {
    window.location.href = generateEmailDraft(formData);
  };

  return (
    <form
      name="feedback"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      className="max-w-2xl mx-auto space-y-6 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl p-6 sm:p-8"
    >
      <input type="hidden" name="form-name" value="feedback" />
      <input type="hidden" name="bot-field" />

      {/* Feedback Type */}
      <div>
        <label className="text-sm font-medium text-gray-900 dark:text-slate-100 mb-3 block">
          Feedback Type <span className="text-xs text-gray-500 dark:text-slate-400 font-normal">(required)</span>
        </label>
        <div className="grid grid-cols-3 gap-3">
          {FEEDBACK_TYPES.map((type) => (
            <label
              key={type.value}
              className={cn(
                'flex items-center justify-center px-4 py-2.5 rounded-lg border cursor-pointer transition-all text-sm font-medium',
                formData.feedbackType === type.value
                  ? 'bg-primary-50 dark:bg-primary-500/10 border-primary-500 text-primary-700 dark:text-primary-300'
                  : 'bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700 text-gray-500 dark:text-slate-400 hover:border-primary-300 dark:hover:border-primary-500 hover:bg-gray-50 dark:hover:bg-slate-800'
              )}
            >
              <input
                type="radio"
                name="feedbackType"
                value={type.value}
                checked={formData.feedbackType === type.value}
                onChange={(e) => onChange('feedbackType', e.target.value)}
                className="sr-only"
              />
              {type.label}
            </label>
          ))}
        </div>
      </div>

      {/* macOS Version */}
      <OSVersionSelector value={formData.osVersion} onChange={(value) => onChange('osVersion', value)} />

      {/* App Version */}
      <div>
        <label htmlFor="app-version" className="text-sm font-medium text-gray-900 dark:text-slate-100 mb-3 block">
          TextWiz Version{' '}
          <span className="text-xs text-gray-500 dark:text-slate-400 font-normal">(required)</span>
        </label>
        <input
          id="app-version"
          type="text"
          name="appVersion"
          value={formData.appVersion}
          onChange={(e) => onChange('appVersion', e.target.value)}
          placeholder='e.g., "1.0.0 (6)"'
          required
          className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        />
        <div className="mt-3 p-3 bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 rounded-lg">
          <p className="text-xs text-gray-900 dark:text-slate-100 font-medium mb-1">Where to find the version:</p>
          <p className="text-xs text-gray-600 dark:text-slate-300">
            Click the TextWiz icon in the menu bar → Settings → About
          </p>
        </div>
      </div>

      {/* Provider (optional) */}
      <ProviderSelector value={formData.provider} onChange={(value) => onChange('provider', value)} />

      {/* Title */}
      <div>
        <label htmlFor="feedback-title" className="text-sm font-medium text-gray-900 dark:text-slate-100 mb-3 block">
          Title <span className="text-xs text-gray-500 dark:text-slate-400 font-normal">(required)</span>
        </label>
        <input
          id="feedback-title"
          type="text"
          name="title"
          value={formData.title}
          onChange={(e) => onChange('title', e.target.value)}
          placeholder={
            formData.feedbackType ? FEEDBACK_TYPE_GUIDES[formData.feedbackType].titlePlaceholder : 'Brief summary of your feedback'
          }
          required
          maxLength={100}
          className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        />
        {formData.feedbackType && (
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">
            {FEEDBACK_TYPE_GUIDES[formData.feedbackType].titleDescription}
          </p>
        )}
      </div>

      {/* Feedback text */}
      <div>
        <label htmlFor="feedback-input" className="text-sm font-medium text-gray-900 dark:text-slate-100 mb-3 block">
          Your Feedback <span className="text-xs text-gray-500 dark:text-slate-400 font-normal">(required)</span>
        </label>
        <FeedbackInput
          id="feedback-input"
          value={formData.feedback}
          onChange={(value) => onChange('feedback', value)}
          placeholder={
            formData.feedbackType
              ? FEEDBACK_TYPE_GUIDES[formData.feedbackType].feedbackPlaceholder
              : 'Tell us what is on your mind...'
          }
          maxLength={2000}
        />
      </div>

      {/* Screenshots button */}
      <button
        type="button"
        onClick={() => setShowScreenshotModal(true)}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-slate-100 rounded-xl border border-gray-200 dark:border-slate-700 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all font-medium"
      >
        <Image className="h-5 w-5" />
        Need to send screenshots?
      </button>

      {/* Screenshots modal */}
      {showScreenshotModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 max-w-md w-full shadow-lg">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100">Send Screenshots</h2>
              <button
                type="button"
                onClick={() => setShowScreenshotModal(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5 text-gray-500 dark:text-slate-400" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-900 dark:text-slate-100">
                If you need to send screenshots, click the button below to draft an email to{' '}
                <strong>{CONTACT_EMAIL}</strong> with your form details — then attach your images before sending.
              </p>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                If you change your mind, close this dialog and continue filling out the form.
              </p>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowScreenshotModal(false);
                    handleEmailDraft();
                  }}
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-all flex items-center justify-center gap-2"
                >
                  <MailIcon className="h-4 w-4" />
                  Send via Email
                </button>
                <button
                  type="button"
                  onClick={() => setShowScreenshotModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-slate-100 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-slate-700 transition-all"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Email */}
      <div>
        <label htmlFor="feedback-email" className="text-sm font-medium text-gray-900 dark:text-slate-100 mb-3 block">
          Email Address <span className="text-xs text-gray-500 dark:text-slate-400 font-normal">(optional)</span>
        </label>
        <div className="relative">
          <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-slate-500" />
          <input
            id="feedback-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="your@email.com (optional)"
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
        </div>
        <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">
          Optional — we can only follow up on your feedback if you share an email.
        </p>
      </div>

      {/* Turnstile */}
      {turnstileSiteKey && (
        <Turnstile
          siteKey={turnstileSiteKey}
          onSuccess={onTurnstileSuccess}
          onExpire={onTurnstileExpire}
          onError={onTurnstileError}
          theme="auto"
          size="normal"
        />
      )}

      {/* Consent */}
      <label className="flex items-start gap-3 text-xs text-gray-500 dark:text-slate-400 cursor-pointer">
        <input
          type="checkbox"
          name="consent"
          checked={formData.consent}
          onChange={(e) => onChange('consent', e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-gray-300 dark:border-slate-600 text-primary-600 focus:ring-primary-500 focus:ring-offset-0 cursor-pointer"
          required
        />
        <span>
          I agree to receive follow-up communication from TextWiz regarding this feedback. Your email will only be used
          for TextWiz-related replies.
        </span>
      </label>

      {/* Error */}
      {error && (
        <div className="flex gap-3 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 rounded-lg">
          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-slate-700">
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={cn(
            'flex-1 px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2',
            'hover:bg-primary-700',
            (!isFormValid || isSubmitting) && 'opacity-50 cursor-not-allowed'
          )}
        >
          <Send className="h-5 w-5" />
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </button>

        <button
          type="button"
          onClick={handleEmailDraft}
          className="px-6 py-3 bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-slate-100 rounded-xl font-semibold transition-all hover:bg-gray-200 dark:hover:bg-slate-700"
        >
          Email Instead
        </button>
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100 transition-colors"
        >
          ← Back to previous question
        </button>
      </div>
    </form>
  );
}
