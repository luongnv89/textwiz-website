import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { buildSitemap, lastmodFromGit } from '../lib/sitemap.mjs';
import { SEO_ROUTES } from '../../shared/seo-routes.mjs';

test('buildSitemap emits one url per route with lastmod', () => {
  const xml = buildSitemap(SEO_ROUTES, () => '2026-01-15');
  assert.equal(xml.match(/<url>/g).length, SEO_ROUTES.length);
  assert.match(xml, /<loc>https:\/\/textwiz\.pro\/<\/loc>/);
  for (const route of SEO_ROUTES.filter((r) => r.path !== '/')) {
    assert.match(xml, new RegExp(`<loc>https://textwiz\\.pro${route.path}</loc>`));
  }
  for (const m of xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)) {
    assert.match(m[1], /^\d{4}-\d{2}-\d{2}$/);
  }
  assert.doesNotMatch(xml, /www\.textwiz\.pro/);
  assert.doesNotMatch(xml, /changefreq|priority/);
});

test('buildSitemap preserves routes while omitting unknown lastmod dates', () => {
  const xml = buildSitemap(SEO_ROUTES, (route) => route.path === '/' ? '2026-01-15' : undefined);
  assert.equal(xml.match(/<url>/g).length, SEO_ROUTES.length);
  assert.equal(xml.match(/<lastmod>/g).length, 1);
  assert.doesNotMatch(xml, /undefined|null/);
  const archiveXml = buildSitemap(SEO_ROUTES, () => undefined);
  assert.equal(archiveXml.match(/<url>/g).length, SEO_ROUTES.length);
  assert.doesNotMatch(archiveXml, /<lastmod>/);
});

function fixtureDir(t) {
  const dir = mkdtempSync(join(tmpdir(), 'textwiz-sitemap-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  return dir;
}

function writeSource(dir, source, content) {
  const file = join(dir, source);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
}

function commit(dir, date) {
  execFileSync('git', ['add', '.'], { cwd: dir });
  execFileSync('git', ['-c', 'user.name=Test', '-c', 'user.email=test@example.com', 'commit', '--quiet', '-m', 'Fixture source change'], {
    cwd: dir,
    env: { ...process.env, GIT_AUTHOR_DATE: `${date}T12:00:00Z`, GIT_COMMITTER_DATE: `${date}T12:00:00Z` },
  });
}

test('lastmodFromGit omits dates without source history', (t) => {
  const dir = fixtureDir(t);
  const sources = ['shared/seo-routes.mjs'];
  assert.equal(lastmodFromGit(sources, dir), undefined);
  execFileSync('git', ['init', '--quiet'], { cwd: dir });
  assert.equal(lastmodFromGit(sources, dir), undefined);
  writeSource(dir, 'README.md', 'Unrelated source');
  commit(dir, '2026-01-15');
  assert.equal(lastmodFromGit(sources, dir), undefined);
  assert.equal(lastmodFromGit([], dir), undefined);
});

test('route lastmod follows significant shared sources and isolates route-specific edits', (t) => {
  const dir = fixtureDir(t);
  execFileSync('git', ['init', '--quiet'], { cwd: dir });
  writeSource(dir, 'shared/seo-routes.mjs', 'Initial route metadata');
  writeSource(dir, 'shared/structured-data.mjs', 'Initial schema');
  writeSource(dir, 'src/lib/version.js', 'Initial release');
  writeSource(dir, 'src/pages/GettingStartedPage.jsx', 'Initial setup');
  commit(dir, '2026-01-15');

  writeSource(dir, 'README.md', 'Unrelated documentation');
  commit(dir, '2026-01-16');
  for (const route of SEO_ROUTES) {
    assert.equal(lastmodFromGit(route.sources, dir), '2026-01-15', route.path);
  }

  writeSource(dir, 'src/pages/GettingStartedPage.jsx', 'Updated setup');
  commit(dir, '2026-01-17');
  for (const route of SEO_ROUTES) {
    assert.equal(lastmodFromGit(route.sources, dir), route.path === '/getting-started' ? '2026-01-17' : '2026-01-15', route.path);
  }

  writeSource(dir, 'shared/structured-data.mjs', 'Updated schema');
  commit(dir, '2026-01-18');
  for (const route of SEO_ROUTES) {
    assert.equal(lastmodFromGit(route.sources, dir), '2026-01-18', `${route.path} shared schema`);
  }

  writeSource(dir, 'src/lib/version.js', 'Updated release');
  commit(dir, '2026-01-19');
  for (const route of SEO_ROUTES) {
    assert.equal(lastmodFromGit(route.sources, dir), '2026-01-19', `${route.path} release metadata`);
  }
});
