---
name: markdown-pages
description: Fetch a markdown alternate of any textwiz.pro page by requesting its .md variant.
---

# Markdown pages

Every page on https://textwiz.pro ships a markdown alternate: /index.md,
/getting-started.md, /changelog.md, /feedback.md, /privacy.md, /terms.md.

Each HTML page advertises its alternate in the document head via
`<link rel="alternate" type="text/markdown" href="...">`, so the .md URL can
also be discovered per page rather than guessed.
