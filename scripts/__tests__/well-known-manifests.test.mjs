import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { SEO_ROUTES } from '../../shared/seo-routes.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..', '..');
const wellKnown = join(root, 'public', '.well-known');

const readJson = (rel) => JSON.parse(readFileSync(join(wellKnown, rel), 'utf8'));

const agentCard = readJson('agent-card.json');
const skillsIndex = readJson(join('agent-skills', 'index.json'));
const serverCard = readJson(join('mcp', 'server-card.json'));

const sha256 = (file) => `sha256:${createHash('sha256').update(readFileSync(file)).digest('hex')}`;

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
  const routePaths = new Set(SEO_ROUTES.map((r) => r.path));
  for (const url of urls) {
    assert.match(url, /^https:\/\/textwiz\.pro\//, `non-textwiz.pro URL: ${url}`);
    const rel = url.replace('https://textwiz.pro', '');
    if (routePaths.has(rel) || rel === '/') continue; // prerendered route
    assert.ok(existsSync(join(root, 'public', rel)), `manifest URL target missing: ${rel}`);
  }
});
