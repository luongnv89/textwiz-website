/** JSON-LD structured data per route (prerender + Helmet share this). */

import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_DESCRIPTION,
  pageTitle,
} from './seo-routes.mjs';
import { MAC_APP_STORE_URL } from './app-store.mjs';
import { PRICING_SUMMARY } from './pricing.mjs';

const organization = {
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
  '@type': 'SoftwareApplication',
  name: SITE_NAME,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'macOS 15.2 or later (Apple Intelligence on supported hardware)',
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
    '14 built-in AI wizards: 13 visible actions including Analyst & Coach, plus Improve Prompt in the wizard editor',
    'Unlimited custom wizards',
    'Three suggested defaults per cloud provider plus validated user-added API model IDs',
    'Current Claude and GPT-6 request compatibility with safe, actionable failure guidance',
    'Custom OpenAI-compatible providers require HTTPS; API credentials remain in macOS Keychain',
    'macOS Services preserves selected text after failure, refusal, or incomplete results',
    'Optional auto-copy is off by default; Copy closes the panel and returns focus to the source app',
    'Free Demo provider, ungated forever; TextWiz Pro subscription unlocks every real provider',
    'Diff view and local request history',
    'API keys stored in macOS Keychain',
  ],
};

const website = {
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  publisher: { '@type': 'Organization', name: SITE_NAME },
};

function homeGraph(faqItems) {
  const graphs = [organization, softwareApp, website];

  if (faqItems?.length) {
    graphs.push({
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

  return graphs;
}

function subrouteGraph(route) {
  const canonical = `${SITE_URL}${route.path}`;
  return [
    {
      '@type': 'WebPage',
      name: pageTitle(route),
      url: canonical,
      description: route.description,
      isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: route.title,
          item: canonical,
        },
      ],
    },
  ];
}

export function buildStructuredData(route, faqItems) {
  const graph =
    route.path === '/' ? homeGraph(faqItems) : subrouteGraph(route);
  return { '@context': 'https://schema.org', '@graph': graph };
}
