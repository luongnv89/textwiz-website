import assert from 'node:assert/strict';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { SEO_ROUTES, SITE_URL } from '../../shared/seo-routes.mjs';
import { PRO_PLANS } from '../../shared/pricing.mjs';
import { createWebMcpTools, installWebMcp } from '../../src/lib/webmcp.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

test('every WebMCP tool definition is well-formed', () => {
  const tools = createWebMcpTools();
  assert.ok(tools.length >= 3);
  const names = new Set();
  for (const tool of tools) {
    assert.match(tool.name, /^[a-z][a-z0-9_]*$/, `tool name ${tool.name} should be snake_case`);
    assert.ok(!names.has(tool.name), `duplicate tool name ${tool.name}`);
    names.add(tool.name);
    assert.ok(tool.description?.length > 10, `${tool.name} needs a real description`);
    assert.equal(tool.inputSchema?.type, 'object', `${tool.name} inputSchema must be a JSON Schema object`);
    assert.equal(typeof tool.execute, 'function', `${tool.name} missing execute`);
  }
});

test('installWebMcp is a no-op when modelContext is absent', () => {
  assert.deepEqual(installWebMcp({ navigator: {}, document: {} }), { registered: 0, controller: null });
  assert.deepEqual(installWebMcp({ navigator: null, document: null }), { registered: 0, controller: null });
});

test('installWebMcp registers all tools and never throws on hostile APIs', () => {
  const calls = [];
  const fake = {
    modelContext: {
      registerTool: (tool, opts) => {
        calls.push({ name: tool.name, hasSignal: Boolean(opts?.signal) });
        return Promise.resolve();
      },
    },
  };
  const { registered, controller } = installWebMcp({ navigator: fake });
  assert.equal(registered, createWebMcpTools().length);
  assert.equal(calls.length, registered);
  assert.ok(calls.every((c) => c.hasSignal), 'registrations should carry an AbortController signal');
  assert.ok(controller instanceof AbortController);

  const throwing = { modelContext: { registerTool: () => { throw new Error('denied'); } } };
  assert.doesNotThrow(() => installWebMcp({ navigator: throwing }));
});

test('list_pages derives from SEO_ROUTES with markdown alternates', () => {
  const tools = createWebMcpTools();
  const pages = tools.find((t) => t.name === 'list_pages').execute();
  assert.equal(pages.length, SEO_ROUTES.length);
  for (const [i, route] of SEO_ROUTES.entries()) {
    assert.equal(pages[i].path, route.path);
    const expectedFile = route.path === '/' ? 'index.md' : `${route.path.slice(1)}.md`;
    assert.equal(pages[i].markdown, `${SITE_URL}/${expectedFile}`);
  }
});

test('get_page_markdown fetches the route alternate and reports unknown paths', async () => {
  const fetched = [];
  const fetchImpl = async (url) => {
    fetched.push(url);
    return { ok: true, status: 200, text: async () => '# markdown' };
  };
  const tools = createWebMcpTools({ fetchImpl });
  const get = tools.find((t) => t.name === 'get_page_markdown');

  const ok = await get.execute({ path: '/getting-started' });
  assert.equal(ok.path, '/getting-started');
  assert.equal(ok.markdown, '# markdown');
  assert.deepEqual(fetched, ['/getting-started.md']);

  const missing = await get.execute({ path: '/nope' });
  assert.match(missing.error, /unknown page/);
  assert.ok(missing.pages.includes('/getting-started'));

  const badFetch = createWebMcpTools({ fetchImpl: async () => ({ ok: false, status: 404 }) });
  const failed = await badFetch.find((t) => t.name === 'get_page_markdown').execute({ path: '/terms' });
  assert.match(failed.error, /404/);
});

test('overview and product-facts tools return real site data', () => {
  const tools = createWebMcpTools();
  const overview = tools.find((t) => t.name === 'get_site_overview').execute();
  assert.equal(overview.url, SITE_URL);
  assert.ok(overview.resources.fullContext.endsWith('/llms-full.txt'));
  const facts = tools.find((t) => t.name === 'get_product_facts').execute();
  assert.equal(facts.plans, PRO_PLANS, 'pricing must come from shared/pricing.mjs, not hardcoded');
  assert.ok(facts.summary.includes('TextWiz'));
});
