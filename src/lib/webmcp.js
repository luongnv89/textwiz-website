import { DEFAULT_DESCRIPTION, SEO_ROUTES, SITE_NAME, SITE_URL } from '../../shared/seo-routes.mjs';
import { markdownHrefFor } from '../../scripts/lib/route-markdown.mjs';
import { PRICING_SUMMARY, PRO_NAME, PRO_PLANS } from '../../shared/pricing.mjs';

const pageByPath = (path) => SEO_ROUTES.find((route) => route.path === path);

/**
 * Read-only tools exposed to in-browser agents via WebMCP
 * (`navigator.modelContext` / `document.modelContext`). Every tool reads
 * public site content only — none mutate state, navigate, or call
 * third-party services.
 */
export function createWebMcpTools({ fetchImpl } = {}) {
  const doFetch = fetchImpl ?? ((...args) => globalThis.fetch(...args));
  return [
    {
      name: 'get_site_overview',
      description: 'Returns the TextWiz site summary and the machine-readable resources this site publishes.',
      inputSchema: { type: 'object', properties: {}, additionalProperties: false },
      execute: () => ({
        name: SITE_NAME,
        url: SITE_URL,
        description: DEFAULT_DESCRIPTION,
        resources: {
          siteIndex: `${SITE_URL}/llms.txt`,
          fullContext: `${SITE_URL}/llms-full.txt`,
          agentCard: `${SITE_URL}/.well-known/agent-card.json`,
          skillsIndex: `${SITE_URL}/.well-known/agent-skills/index.json`,
          agentAuthPolicy: `${SITE_URL}/auth.md`,
        },
      }),
    },
    {
      name: 'list_pages',
      description: 'Lists the public pages on textwiz.pro with title, description, and markdown alternate URL.',
      inputSchema: { type: 'object', properties: {}, additionalProperties: false },
      execute: () =>
        SEO_ROUTES.map((route) => ({
          path: route.path,
          description: route.description,
          markdown: `${SITE_URL}${markdownHrefFor(route.path)}`,
        })),
    },
    {
      name: 'get_page_markdown',
      description: "Fetches the markdown alternate of a site page, e.g. '/getting-started'.",
      inputSchema: {
        type: 'object',
        properties: {
          path: { type: 'string', description: 'Route path such as /getting-started' },
        },
        required: ['path'],
        additionalProperties: false,
      },
      execute: async ({ path } = {}) => {
        const route = typeof path === 'string' ? pageByPath(path) : undefined;
        if (!route) {
          return { error: `unknown page '${path}'`, pages: SEO_ROUTES.map((r) => r.path) };
        }
        const response = await doFetch(markdownHrefFor(route.path));
        if (!response.ok) {
          return { error: `markdown fetch failed (${response.status})`, path: route.path };
        }
        return { path: route.path, markdown: await response.text() };
      },
    },
    {
      name: 'get_product_facts',
      description: 'Returns canonical TextWiz product facts: platforms, engines, and pricing.',
      inputSchema: { type: 'object', properties: {}, additionalProperties: false },
      execute: () => ({
        name: SITE_NAME,
        platform: 'macOS',
        summary: PRICING_SUMMARY,
        subscription: PRO_NAME,
        plans: PRO_PLANS,
        pricingPage: `${SITE_URL}/#pricing`,
        setupGuide: `${SITE_URL}/getting-started`,
      }),
    },
  ];
}

/**
 * Registers the tools with the browser's WebMCP provider. No-op when the
 * experimental API is absent (every non-Chromium/flag-disabled browser).
 * Never throws — registration failures are expected and ignored.
 *
 * @returns {{ registered: number, controller: AbortController | null }}
 */
export function installWebMcp({ navigator: nav, document: doc, fetchImpl } = {}) {
  const hostNav = nav ?? (typeof navigator === 'undefined' ? undefined : navigator);
  const hostDoc = doc ?? (typeof document === 'undefined' ? undefined : document);
  const modelContext = hostNav?.modelContext ?? hostDoc?.modelContext;
  if (!modelContext || typeof modelContext.registerTool !== 'function') {
    return { registered: 0, controller: null };
  }
  const controller = typeof AbortController === 'undefined' ? null : new AbortController();
  const options = controller ? { signal: controller.signal } : undefined;
  let registered = 0;
  for (const tool of createWebMcpTools({ fetchImpl })) {
    try {
      const result = modelContext.registerTool(tool, options);
      if (result?.catch) result.catch(() => {});
      registered += 1;
    } catch {
      // Older implementations may reject the options argument — retry bare.
      try {
        modelContext.registerTool(tool);
        registered += 1;
      } catch {
        // Registration unsupported in this build — stay silent.
      }
    }
  }
  return { registered, controller };
}
