import { useState, useCallback, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import GitHubGate from '../components/feedback/GitHubGate';
import GitHubOptions from '../components/feedback/GitHubOptions';
import FormDetails from '../components/feedback/FormDetails';
import FormSuccess from '../components/feedback/FormSuccess';
import { useTurnstileSiteKey } from '../hooks/useTurnstileSiteKey';
import { cn } from '../lib/utils';

const STORAGE_KEY = 'textwiz-feedback-form';

const initialFormData = {
  osVersion: '',
  appVersion: '',
  provider: '',
  feedbackType: 'general',
  title: '',
  feedback: '',
  email: '',
  consent: true,
  turnstileToken: null,
};

export default function FeedbackPage() {
  const [stage, setStage] = useState('github-gate');
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const turnstileSiteKey = useTurnstileSiteKey();

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setFormData((prev) => ({ ...prev, ...JSON.parse(saved) }));
      } catch (err) {
        console.error('Failed to parse saved feedback form data:', err);
      }
    }
  }, []);

  const handleGitHubChoice = useCallback((answer) => {
    setStage(answer ? 'github-options' : 'form-details');
  }, []);

  const handleBack = useCallback(() => {
    if (stage === 'github-options' || stage === 'form-details') {
      setStage('github-gate');
    }
  }, [stage]);

  const handleFormChange = useCallback(
    (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (status === 'error') {
        setStatus('idle');
        setErrorMessage('');
      }
    },
    [status]
  );

  const handleFormSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (
        !formData.osVersion ||
        !formData.appVersion ||
        !formData.feedbackType ||
        !formData.title?.trim() ||
        !formData.feedback?.trim() ||
        !formData.consent ||
        (turnstileSiteKey && !formData.turnstileToken)
      ) {
        setStatus('error');
        setErrorMessage('Please fill out all required fields.');
        return;
      }

      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setStatus('error');
        setErrorMessage('Please enter a valid email address.');
        return;
      }

      setStatus('submitting');
      setErrorMessage('');

      try {
        const submitData = new FormData();
        submitData.append('form-name', 'feedback');
        submitData.append('os-version', formData.osVersion);
        submitData.append('app-version', formData.appVersion);
        submitData.append('provider', formData.provider || '');
        submitData.append('feedback-type', formData.feedbackType);
        submitData.append('title', formData.title);
        submitData.append('feedback', formData.feedback);
        submitData.append('email', formData.email);

        if (formData.turnstileToken) {
          submitData.append('cf-turnstile-response', formData.turnstileToken);
        }

        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(submitData).toString(),
        });

        if (!response.ok) throw new Error(`Server returned ${response.status}`);

        setStatus('success');
        setStage('success');
        localStorage.removeItem(STORAGE_KEY);
      } catch (err) {
        setStatus('error');
        if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
          setErrorMessage('Network error. Please check your connection and try again.');
        } else if (err.message.includes('Server returned')) {
          setErrorMessage('Server error. Please try again in a moment.');
        } else {
          setErrorMessage('Something went wrong. Please try again.');
        }
      }
    },
    [formData, turnstileSiteKey]
  );

  const handleReset = useCallback(() => {
    setStage('github-gate');
    setFormData(initialFormData);
    setStatus('idle');
    setErrorMessage('');
  }, []);

  return (
    <section className="py-24 sm:py-32 px-4 bg-gradient-to-b from-primary-50 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-black transition-colors duration-300">
      <div className="max-w-2xl mx-auto mb-12">
        <div className="flex items-center gap-2 mb-6">
          {stage !== 'github-gate' && stage !== 'success' && (
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Go back"
            >
              <ChevronLeft className="h-5 w-5 text-gray-500 dark:text-slate-400" />
            </button>
          )}
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-slate-100">Send Feedback</h1>
            <p className="text-gray-500 dark:text-slate-400 mt-2">
              Bugs, feature ideas, or just a note — every message reaches a real person.
            </p>
          </div>
        </div>

        {stage !== 'success' && (
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-slate-400 px-4 py-2 bg-gray-100 dark:bg-slate-800/50 rounded-lg w-fit">
            <div
              className={cn(
                'w-2 h-2 rounded-full transition-colors',
                ['github-gate', 'github-options'].includes(stage) ? 'bg-primary-500' : 'bg-green-500'
              )}
            />
            <span>
              {stage === 'github-gate' && 'Step 1: GitHub Account'}
              {stage === 'github-options' && 'Step 2: Choose Your Path'}
              {stage === 'form-details' && 'Step 2: Feedback Form'}
            </span>
          </div>
        )}
      </div>

      <div className="max-w-2xl mx-auto px-4">
        {stage === 'github-gate' && (
          <GitHubGate
            onYes={() => handleGitHubChoice(true)}
            onNo={() => handleGitHubChoice(false)}
            isLoading={status === 'submitting'}
          />
        )}

        {stage === 'github-options' && (
          <GitHubOptions onBack={handleBack} onEmailInstead={() => setStage('form-details')} />
        )}

        {stage === 'form-details' && (
          <FormDetails
            formData={formData}
            onChange={handleFormChange}
            onSubmit={handleFormSubmit}
            turnstileSiteKey={turnstileSiteKey}
            onTurnstileSuccess={(token) => handleFormChange('turnstileToken', token)}
            onTurnstileExpire={() => handleFormChange('turnstileToken', null)}
            onTurnstileError={() => handleFormChange('turnstileToken', null)}
            isSubmitting={status === 'submitting'}
            error={status === 'error' ? errorMessage : null}
            onBack={handleBack}
          />
        )}

        {stage === 'success' && <FormSuccess feedbackType={formData.feedbackType} onNewFeedback={handleReset} />}
      </div>
    </section>
  );
}
