import { Helmet } from 'react-helmet-async';
import { SEO_ROUTES } from '../../shared/seo-routes.mjs';
import { buildStructuredData } from '../../shared/structured-data.mjs';
import { faqData } from '../lib/faqData';

/**
 * JSON-LD for discoverability (search + AI grounding).
 */
export default function StructuredData({ path }) {
  const route =
    SEO_ROUTES.find((r) => r.path === path) ??
    SEO_ROUTES.find((r) => r.path === '/');

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(buildStructuredData(route, faqData))}
      </script>
    </Helmet>
  );
}
