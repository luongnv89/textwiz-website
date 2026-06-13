import { Helmet } from 'react-helmet-async';
import { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION } from '../lib/site';
import { MAC_APP_STORE_URL } from '../lib/appStore';

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/AppIcon.svg`,
  sameAs: [
    'https://github.com/luongnv89/textwiz',
    'https://twitter.com/luongnv89',
    'https://www.linkedin.com/in/luongnv89/',
  ],
};

const softwareApp = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: SITE_NAME,
  applicationCategory: 'ProductivityApplication',
  operatingSystem: 'macOS 14 Sonoma or later (Apple Intelligence on macOS 15.2+)',
  description: DEFAULT_DESCRIPTION,
  url: SITE_URL,
  downloadUrl: MAC_APP_STORE_URL,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: MAC_APP_STORE_URL,
    description: 'Download on the Mac App Store.',
  },
  featureList: [
    'Global hotkey and macOS Services integration',
    'Free on-device Apple Foundation Model (Apple Intelligence) on supported Macs',
    'Nine AI providers including Ollama, LM Studio, and MLX-LM',
    'Custom shortcuts with diff view and local history',
    'API keys stored in macOS Keychain',
  ],
};

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  publisher: { '@type': 'Organization', name: SITE_NAME },
};

/**
 * JSON-LD for homepage discoverability (search + AI grounding).
 */
export default function StructuredData({ faqItems }) {
  const graphs = [organization, softwareApp, website];

  if (faqItems?.length) {
    graphs.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: a,
        },
      })),
    });
  }

  const payload = {
    '@context': 'https://schema.org',
    '@graph': graphs,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(payload)}</script>
    </Helmet>
  );
}