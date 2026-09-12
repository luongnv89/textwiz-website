import assert from 'node:assert/strict';
import test from 'node:test';
import { patchHtml } from '../lib/patch-html.mjs';
import { SEO_ROUTES } from '../../shared/seo-routes.mjs';

/** Vite-style shell with multiline og/twitter description (regression fixture). */
const MULTILINE_SHELL = `<!doctype html>
<html lang="en">
<head>
<title>TextWiz — AI Text Shortcuts for macOS</title>
<meta name="description" content="homepage desc" />
<link rel="canonical" href="https://textwiz.pro/" />
<meta property="og:url" content="https://textwiz.pro/" />
<meta property="og:title" content="TextWiz — AI Text Shortcuts for macOS" />
<meta
  property="og:description"
  content="homepage og desc"
/>
<meta name="twitter:url" content="https://textwiz.pro/" />
<meta name="twitter:title" content="TextWiz — AI Text Shortcuts for macOS" />
<meta
  name="twitter:description"
  content="homepage twitter desc"
/>
</head>
<body><div id="root"><!-- prerender:start --><p>old</p><!-- prerender:end --></div></body>
</html>`;

test('patchHtml replaces multiline og:description for subroute', () => {
  const route = SEO_ROUTES.find((r) => r.path === '/getting-started');
  assert.ok(route);
  const html = patchHtml(MULTILINE_SHELL, route);
  assert.match(html, /<title>Setup & API Keys \| TextWiz<\/title>/);
  assert.match(
    html,
    /<meta property="og:description" content="Set up TextWiz on macOS: Ollama and Gemini walkthroughs, free-tier API keys \(Gemini, Groq, OpenRouter, Mistral\), hotkey ⌘⇧Space, and Services\." \/>/,
  );
  assert.match(html, /<link rel="canonical" href="https:\/\/textwiz\.pro\/getting-started" \/>/);
  assert.doesNotMatch(html, /homepage og desc/);
});

test('patchHtml injects route JSON-LD into head', () => {
  const route = SEO_ROUTES.find((r) => r.path === '/getting-started');
  const html = patchHtml(MULTILINE_SHELL, route);
  const match = html.match(
    /<script type="application\/ld\+json" data-rh="true">([\s\S]*?)<\/script>/,
  );
  assert.ok(match);
  const data = JSON.parse(match[1].replace(/<\\\//g, '</'));
  const types = data['@graph'].map((n) => n['@type']);
  assert.ok(types.includes('WebPage'));
  assert.ok(types.includes('BreadcrumbList'));
});

test('patchHtml swaps crawl content between prerender markers inside #root', () => {
  const route = SEO_ROUTES.find((r) => r.path === '/getting-started');
  const html = patchHtml(MULTILINE_SHELL, route);
  assert.doesNotMatch(html, /<p>old<\/p>/);
  const rootMatch = html.match(/<div id="root">([\s\S]*?)<\/div>/);
  assert.ok(rootMatch);
  assert.match(rootMatch[1], /<h1>Setup and API keys<\/h1>/);
});

test('patchHtml is idempotent', () => {
  const route = SEO_ROUTES.find((r) => r.path === '/getting-started');
  const once = patchHtml(MULTILINE_SHELL, route);
  const twice = patchHtml(once, route);
  assert.equal(
    twice.match(/<script type="application\/ld\+json"/g).length,
    1,
  );
  assert.equal(twice.match(/<article/g).length, 1);
});
