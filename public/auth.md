# auth.md — TextWiz agent authentication

textwiz.pro is the static marketing website for TextWiz, a private,
local-first macOS app. This site runs **no** agent-facing authenticated APIs,
**no** OAuth authorization server, and **no** registration or
credential-issuance flow.

## Agent audience

AI agents and crawlers reading public site content.

## Supported access

Everything on this site is public and unauthenticated. Agents should simply
GET the machine-readable resources:

- [llms.txt](https://textwiz.pro/llms.txt) — concise site index
- [llms-full.txt](https://textwiz.pro/llms-full.txt) — full context
- [agent card](https://textwiz.pro/.well-known/agent-card.json) — A2A manifest
- [agent skills index](https://textwiz.pro/.well-known/agent-skills/index.json)
- [MCP server card](https://textwiz.pro/.well-known/mcp/server-card.json) — informational; no live transport
- [API catalog](https://textwiz.pro/.well-known/api-catalog.json) — RFC 9727 linkset
- [AI catalog](https://textwiz.pro/.well-known/ai-catalog.json) — ARD manifest

## Registration

None exists. Do not POST credentials to this site — there is nothing to
receive them. The OAuth metadata documents at
`/.well-known/oauth-authorization-server` and
`/.well-known/oauth-protected-resource` describe this posture explicitly via
empty grant, scope, and bearer-method lists.
