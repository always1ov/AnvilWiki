import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { rollOdds, expectedDps } from './tools.mjs';
import { codes, REVIEWED, VERSION } from './release.mjs';

assert.equal(rollOdds(100, 0).chance, 0);
assert.equal(rollOdds(1, 1).chance, 1);
assert.ok(Math.abs(rollOdds(100, 100).chance - 0.6339676587267709) < 1e-12);
assert.equal(rollOdds(100, 100).median, 69);
assert.equal(rollOdds(100, 100).p95, 299);
assert.ok(rollOdds(1e12, 1).chance > 0);
assert.equal(expectedDps(100, 2, 20, 2, 100), 60);
assert.equal(expectedDps(100, 2, 20, 2, 50), 30);
assert.equal(expectedDps(0, 2), 0);
assert.equal(expectedDps(100, 2, 100, 2, 100), 100);
for (const args of [[0, 1], [Infinity, 1], [100, -1], [10, 0.5], [NaN, 10], [1, 1e13]]) assert.throws(() => rollOdds(...args));
for (const args of [[100, 0], [-1, 1], [100, 1, 101], [100, 1, 20, 0], [100, 1, 20, 2, 101], [Infinity, 1]]) assert.throws(() => expectedDps(...args));
assert.equal(codes.length, 17);
assert.equal(new Set(codes.map((r) => r.code)).size, 17);
assert.equal(codes.filter((r) => r.status === 'Reported').length, 8);
assert.equal(codes.filter((r) => r.status === 'Disputed').length, 9);
console.log('PASS: calculator examples, numerical boundaries and 17-code evidence ledger.');

const build = JSON.parse(fs.readFileSync('dist/dar-build.json', 'utf8'));
assert.equal(build.version, VERSION);
assert.equal(build.reviewed, REVIEWED);
assert.equal(build.contentPages, 10);
const data = JSON.parse(fs.readFileSync('src/config/dar-data.json', 'utf8'));
const canonicalBase = build.siteUrl;
const files = [];
function walk(dir) { for (const item of fs.readdirSync(dir, { withFileTypes: true })) { const file = path.join(dir, item.name); if (item.isDirectory()) walk(file); else if (file.endsWith('.html')) files.push(file); } }
walk('dist');
function existsUrl(value, current) {
  if (!value || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(value)) return true;
  const resolved = new URL(value, canonicalBase + current).pathname;
  let decoded;
  try { decoded = decodeURIComponent(resolved); } catch { return false; }
  const target = path.resolve('dist', '.' + decoded);
  if (!target.startsWith(path.resolve('dist') + path.sep) && target !== path.resolve('dist')) return false;
  return [target, target + '.html', path.join(target, 'index.html')].some((file) => fs.existsSync(file) && fs.statSync(file).isFile());
}
for (const entry of data.catalog) {
  const file = path.join('dist', entry.href, 'index.html');
  assert.ok(fs.existsSync(file), `Missing core page ${entry.href}`);
  const html = fs.readFileSync(file, 'utf8');
  assert.ok(html.includes(entry.title.replaceAll('&', '&amp;')) || html.includes(entry.title), `Missing title ${entry.href}`);
}
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const current = '/' + path.relative('dist', file).split(path.sep).join('/').replace(/index\.html$/, '');
  assert.match(html, /<html[^>]*lang="en"/, `Wrong language ${file}`);
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `Expected one h1: ${file}`);
  assert.ok(!html.includes('Anvil Quest'), `Demo content ${file}`);
  assert.ok(!html.includes('example.com'), `Placeholder link ${file}`);
  const canonical = html.match(/<link\b(?=[^>]*\brel="canonical")(?=[^>]*\bhref="([^"]+)")[^>]*>/)?.[1];
  assert.ok(canonical && canonical.startsWith(canonicalBase + '/'), `Wrong canonical ${file}: ${canonical}`);
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) assert.ok(existsUrl(match[1].replaceAll('&amp;', '&'), current), `Broken internal target ${match[1]} on ${current}`);
  for (const match of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) JSON.parse(match[1]);
}
assert.ok(fs.existsSync('dist/pagefind/pagefind.js'), 'Search index missing');
assert.ok(fs.existsSync('dist/sitemap-index.xml'), 'Sitemap missing');
const xmls = fs.readdirSync('dist').filter((f) => /^sitemap.*\.xml$/.test(f));
for (const xml of xmls) {
  const text = fs.readFileSync(path.join('dist', xml), 'utf8');
  for (const match of text.matchAll(/<loc>([^<]+)<\/loc>/g)) assert.ok(match[1].startsWith(canonicalBase + '/'), `Wrong sitemap origin: ${match[1]}`);
}
assert.ok(fs.readFileSync('dist/robots.txt', 'utf8').includes(canonicalBase + '/sitemap-index.xml'));
if (build.publishReady) {
  assert.ok(!/X-Robots-Tag:\s*noindex/i.test(fs.readFileSync('dist/_headers', 'utf8')), 'Production globally blocks indexing');
  for (const url of ['/', ...data.catalog.map((p) => p.href)]) {
    const html = fs.readFileSync(path.join('dist', url, 'index.html'), 'utf8');
    assert.ok(!/<meta\b(?=[^>]*name="robots")(?=[^>]*content="[^"]*noindex)/i.test(html), `Core page noindex: ${url}`);
  }
}
console.log(`PASS: ${files.length} HTML pages, 10 core entries, canonical URLs, internal links, JSON-LD, search, sitemap and production indexing.`);
