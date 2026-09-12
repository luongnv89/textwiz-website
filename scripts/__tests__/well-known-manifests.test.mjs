import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { SEO_ROUTES } from '../../shared/seo-routes.mjs';
import { markdownFileFor } from '../lib/route-markdown.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..', '..');
const wellKnown = join(root, 'public', '.well-known');

const readJson = (rel) => JSON.parse(readFileSync(join(wellKnown, rel), 'utf8'));

const agentCard = readJson('agent-card.json');
const skillsIndex = readJson(join('agent-skills', 'index.json'));
const serverCard = readJson(join('mcp', 'server-card.json'));
const apiCatalog = readJson('api-catalog');
const aiCatalog = readJson('ai-catalog.json');
const authServer = readJson('oauth-authorization-server');
const protectedResource = readJson('oauth-protected-resource');
const jwks = readJson('jwks.json');

const sha256 = (file) => `sha256:${createHash('sha256').update(readFileSync(file)).digest('hex')}`;

const routePaths = new Set(SEO_ROUTES.map((r) => r.path));
const markdownFiles = new Set(SEO_ROUTES.map((r) => `/${markdownFileFor(r.path)}`));

// True when a textwiz.pro URL path resolves to a real served artifact:
// a prerendered route, a file in public/, or a build-generated .md alternate.
const resolves = (path) =>
  path === '/' || routePaths.has(path) || markdownFiles.has(path) || existsSync(join(root, 'public', path));

const assertResolvable = (url) => {
  assert.match(url, /^https:\/\/textwiz\.pro\//, `non-textwiz.pro URL: ${url}`);
  const path = url.replace('https://textwiz.pro', '');
  assert.ok(resolves(path), `manifest URL target missing: ${url}`);
};

test('agent-card.json satisfies the A2A card requirements', () => {
  for (const field of ['name', 'version', 'description', 'capabilities', 'skills']) {
    assert.ok(agentCard[field] !== undefined, `agent card missing ${field}`);
  }
  assert.ok(Array.isArray(agentCard.supportedInterfaces) && agentCard.supportedInterfaces.length >= 1);
  for (const iface of agentCard.supportedInterfaces) {
    assert.match(iface.url, /^https:\/\/textwiz\.pro\//);
    assert.ok(iface.protocolBinding, 'interface missing transport protocol');
  }
  for (const skill of agentCard.skills) {
    for (const field of ['id', 'name', 'description']) {
      assert.ok(skill[field], `agent card skill missing ${field}`);
    }
  }
});

test('agent-skills index.json satisfies the discovery RFC shape and digests verify', () => {
  assert.equal(skillsIndex.$schema, 'https://schemas.agentskills.io/discovery/0.2.0/schema.json');
  assert.ok(Array.isArray(skillsIndex.skills) && skillsIndex.skills.length >= 1);
  for (const skill of skillsIndex.skills) {
    assert.match(skill.name, /^[a-z0-9-]+$/);
    assert.equal(skill.type, 'skill-md');
    assert.ok(skill.description, `skill ${skill.name} missing description`);
    const rel = skill.url.replace('https://textwiz.pro/', '');
    const file = join(root, 'public', rel);
    assert.ok(existsSync(file), `skill ${skill.name} url target missing: ${rel}`);
    assert.equal(skill.digest, sha256(file), `skill ${skill.name} digest mismatch — recompute after editing`);
  }
});

test('mcp/server-card.json satisfies the server-card requirements', () => {
  assert.equal(serverCard.$schema, 'https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json');
  assert.match(serverCard.name, /^[a-zA-Z0-9.-]+\/[a-zA-Z0-9._-]+$/);
  assert.ok(serverCard.version && serverCard.description);
  assert.ok(serverCard.description.length <= 100);
  assert.ok(serverCard.serverInfo?.name && serverCard.serverInfo?.version);
  assert.match(serverCard.transport?.endpoint ?? '', /^https:\/\/textwiz\.pro\//);
  for (const cap of ['tools', 'resources', 'prompts']) {
    assert.ok(Array.isArray(serverCard.capabilities?.[cap]), `capabilities.${cap} must be an array`);
  }
  // Honesty: no live MCP transport is claimed.
  assert.deepEqual(serverCard.remotes, []);
});

test('manifest cross-references are consistent and never point at 404s', () => {
  const indexNames = skillsIndex.skills.map((s) => s.name);
  for (const skill of agentCard.skills) {
    assert.ok(indexNames.includes(skill.id), `agent card skill ${skill.id} absent from skills index`);
  }
  assert.equal(serverCard._meta['pro.textwiz/agent-card'], 'https://textwiz.pro/.well-known/agent-card.json');

  const urls = [
    agentCard.url,
    agentCard.documentationUrl,
    agentCard.iconUrl,
    ...agentCard.supportedInterfaces.map((i) => i.url),
    ...skillsIndex.skills.map((s) => s.url),
    serverCard.websiteUrl,
    serverCard.transport.endpoint,
    serverCard._meta['pro.textwiz/agent-card'],
    ...serverCard.capabilities.resources.map((r) => r.uri),
  ];
  for (const url of urls) {
    assertResolvable(url);
  }
});

test('api-catalog satisfies RFC 9727 and both variants are byte-identical', () => {
  const extless = readFileSync(join(wellKnown, 'api-catalog'));
  const twin = readFileSync(join(wellKnown, 'api-catalog.json'));
  assert.deepEqual(twin, extless, 'api-catalog and api-catalog.json must stay byte-identical');
  assert.ok(Array.isArray(apiCatalog.linkset) && apiCatalog.linkset.length >= 1);
  for (const entry of apiCatalog.linkset) {
    assertResolvable(entry.anchor);
    const rels = Object.keys(entry).filter((k) => k !== 'anchor');
    assert.ok(rels.length >= 1, `linkset entry for ${entry.anchor} has no link relations`);
    for (const rel of rels) {
      for (const link of entry[rel]) {
        assertResolvable(link.href);
      }
    }
  }
  // The origin entry carries the service-desc/service-doc relations the
  // scanner looks for.
  const origin = apiCatalog.linkset.find((e) => e.anchor === 'https://textwiz.pro/');
  assert.ok(origin['service-desc']?.length >= 1 && origin['service-doc']?.length >= 1);
});

test('ai-catalog.json satisfies the ARD manifest requirements', () => {
  assert.ok(typeof aiCatalog.specVersion === 'string' && aiCatalog.specVersion.length > 0);
  assert.ok(aiCatalog.host?.displayName && aiCatalog.host?.identifier);
  assert.ok(Array.isArray(aiCatalog.entries) && aiCatalog.entries.length >= 1);
  for (const entry of aiCatalog.entries) {
    assert.match(entry.identifier, /^urn:air:textwiz\.pro:[a-z-]+:[a-z-]+$/);
    assert.ok(entry.displayName, `entry ${entry.identifier} missing displayName`);
    assert.ok(entry.type, `entry ${entry.identifier} missing type`);
    // Exactly one of url/data (ARD spec §3.4).
    assert.equal(Boolean(entry.url) !== Boolean(entry.data), true, `${entry.identifier} must set exactly one of url/data`);
    if (entry.url) assertResolvable(entry.url);
    assert.ok(
      Array.isArray(entry.representativeQueries) &&
        entry.representativeQueries.length >= 2 &&
        entry.representativeQueries.length <= 5,
      `${entry.identifier} needs 2-5 representativeQueries`,
    );
  }
});

test('oauth-authorization-server is honest RFC 8414 metadata with a real .json twin', () => {
  const twin = readFileSync(join(wellKnown, 'oauth-authorization-server.json'));
  assert.deepEqual(twin, readFileSync(join(wellKnown, 'oauth-authorization-server')), 'extensionless/json twins must stay byte-identical');
  assert.equal(authServer.issuer, 'https://textwiz.pro');
  // No live auth server: grant/response lists are empty, so RFC 8414 makes
  // authorization_endpoint/token_endpoint omission valid — and no endpoint
  // field may point at anything that does not exist.
  assert.deepEqual(authServer.grant_types_supported, []);
  assert.deepEqual(authServer.response_types_supported, []);
  for (const field of ['authorization_endpoint', 'token_endpoint', 'registration_endpoint', 'jwks_uri']) {
    if (authServer[field]) assertResolvable(authServer[field]);
  }
  assertResolvable(authServer.service_documentation);
  assert.equal(authServer.agent_auth?.skill, 'auth.md');
  assertResolvable(authServer.agent_auth?.register_uri);
});

test('oauth-protected-resource is consistent with the AS metadata and honest', () => {
  const twin = readFileSync(join(wellKnown, 'oauth-protected-resource.json'));
  assert.deepEqual(twin, readFileSync(join(wellKnown, 'oauth-protected-resource')), 'extensionless/json twins must stay byte-identical');
  assert.equal(protectedResource.resource, 'https://textwiz.pro');
  assert.ok(protectedResource.authorization_servers.includes(authServer.issuer), 'authorization_servers must name the AS issuer');
  assert.deepEqual(protectedResource.scopes_supported, []);
  assert.deepEqual(protectedResource.bearer_methods_supported, []);
  assertResolvable(protectedResource.resource_documentation);
  assert.ok(Array.isArray(jwks.keys), 'jwks_uri must serve a real JWKS document');
});

test('auth.md exists, is self-contained, and names the OAuth metadata docs', () => {
  const authMd = readFileSync(join(root, 'public', 'auth.md'), 'utf8');
  assert.match(authMd, /^# .*auth\.md/m, 'auth.md needs an H1 containing auth.md');
  assert.ok(authMd.includes('oauth-authorization-server'), 'auth.md must reference the AS metadata');
  assert.ok(authMd.includes('oauth-protected-resource'), 'auth.md must reference the PRM document');
  // Honesty: the page must state there is no registration flow.
  assert.match(authMd, /no.*registration|None exists/i);
});

test('ai-catalog is discoverable via robots.txt and index.html', () => {
  const robots = readFileSync(join(root, 'public', 'robots.txt'), 'utf8');
  assert.match(robots, /Agentmap: https:\/\/textwiz\.pro\/\.well-known\/ai-catalog\.json/);
  const indexHtml = readFileSync(join(root, 'index.html'), 'utf8');
  assert.match(indexHtml, /rel="ai-catalog"[^>]*href="https:\/\/textwiz\.pro\/\.well-known\/ai-catalog\.json"/);
});
