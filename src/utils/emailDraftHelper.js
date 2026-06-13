const CONTACT_EMAIL = 'feedback@textwiz.luongnv.com';

export function generateEmailDraft(formData) {
  const subject = `TextWiz Feedback: ${formatFeedbackType(formData.feedbackType)}`;
  const body = formatEmailBody(formData);
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function formatFeedbackType(type) {
  switch (type) {
    case 'bug': return 'Bug Report';
    case 'feature': return 'Feature Request';
    default: return 'General Feedback';
  }
}

function formatEmailBody(formData) {
  const lines = [
    '## Feedback Type',
    formatFeedbackType(formData.feedbackType),
    '',
    '## macOS Version',
    formData.osVersion || '(not provided)',
    '',
    '## TextWiz Version',
    formData.appVersion || '(not provided)',
    '',
  ];

  if (formData.provider) {
    lines.push('## AI Provider', formData.provider, '');
  }

  lines.push('## Title', formData.title || '(No title provided)', '');
  lines.push('## Details', formData.feedback || '', '');

  if (formData.email) {
    lines.push('## Contact Email', formData.email, '');
  }

  lines.push('---');
  lines.push('Sent via TextWiz Feedback Form');
  lines.push('https://textwiz.luongnv.com/feedback');
  return lines.join('\n');
}

export { CONTACT_EMAIL };
