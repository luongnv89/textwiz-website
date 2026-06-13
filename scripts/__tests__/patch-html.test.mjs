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
<link rel="canonical" href="https://textwiz.luongnv.com/" />
<meta property="og:url" content="https://textwiz.luongnv.com/" />
<meta property="og:title" content="TextWiz — AI Text Shortcuts for macOS" />
<meta
  property="og:description"
  content="homepage og desc"
/>
<meta name="twitter:url" content="https://textwiz.luongnv.com/" />
<meta name="twitter:title" content="TextWiz — AI Text Shortcuts for macOS" />
<meta
  name="twitter:description"
  content="homepage twitter desc"
/>
</head>
<body><div id="root"></div><noscript><p>old</p></noscript></body>
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
  assert.match(html, /<link rel="canonical" href="https:\/\/textwiz\.luongnv\.com\/getting-started" \/>/);
  assert.doesNotMatch(html, /homepage og desc/);
  assert.match(html, /<h1>Setup and API keys<\/h1>/);
});