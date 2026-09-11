import { Helmet } from 'react-helmet-async';
import { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION } from '../lib/site';
import { MAC_APP_STORE_URL } from '../lib/appStore';
import { PRICING_SUMMARY } from '../lib/pricing';

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
    availability: 'https://schema.org/InStock',
    url: MAC_APP_STORE_URL,
    price: '0',
    priceCurrency: 'USD',
    description: PRICING_SUMMARY,
  },
  featureList: [
    'Local-first: on-device AI keeps your text on your Mac',
    'On-device Apple Foundation Model (Apple Intelligence) on supported Macs with no per-token cost',
    'Ten AI engines including Apple Intelligence, Ollama, LM Studio, MLX-LM, and your choice of cloud',
    'No servers and no data collection by TextWiz',
    'Built-in AI wizards plus unlimited custom wizards',
    'Free Demo provider, ungated forever; TextWiz Pro subscription unlocks every real provider',
    'Diff view and local request history',
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