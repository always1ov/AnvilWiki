import assert from 'node:assert/strict';
import fs from 'node:fs';
const base = 'https://anvilwiki-786.pages.dev';
const expected = process.env.EXPECTED_COMMIT;
let data;
for (let attempt = 0; attempt < 36; attempt++) {
  try {
    const response = await fetch(`${base}/dar-build.json?verify=${expected}-${attempt}`, { signal: AbortSignal.timeout(15000), cache: 'no-store' });
    if (response.ok) { const candidate = await response.json(); if (!expected || candidate.commit === expected) { data = candidate; break; } }
  } catch (error) { console.log(`Waiting for deployment: ${error.message}`); }
  await new Promise((resolve) => setTimeout(resolve, 10000));
}
assert.ok(data, 'The expected Cloudflare deployment did not become visible within the verification window.');
assert.equal(data.publishReady, true);
const report = { build: data, checks: [] };
for (const pathname of ['/', '/guides/', '/codes/latest/', '/guides/gameplay-overview/', '/tools/roll-odds/', '/tools/unit-comparison/', '/about/', '/contact/', '/privacy-policy/', '/robots.txt', '/sitemap-index.xml', '/dar-tools.js']) {
  const response = await fetch(base + pathname, { signal: AbortSignal.timeout(20000), redirect: 'follow' });
  assert.equal(response.status, 200, `${pathname}: HTTP ${response.status}`);
  assert.ok(!/noindex/i.test(response.headers.get('x-robots-tag') || ''), `${pathname} has an indexing block`);
  const body = await response.text();
  if (!pathname.endsWith('.txt') && !pathname.endsWith('.xml') && !pathname.endsWith('.js')) {
    assert.ok(body.includes('DAR Guide'), `Wrong identity at ${pathname}`);
    assert.ok(body.includes(base), `Missing canonical origin at ${pathname}`);
  }
  report.checks.push({ path: pathname, status: response.status, xRobotsTag: response.headers.get('x-robots-tag') });
}
const missing = await fetch(base + '/dar-missing-route-check-20260917/', { signal: AbortSignal.timeout(20000) });
assert.equal(missing.status, 404, 'Unknown URLs should return a real 404, not a soft-404 homepage.');
report.checks.push({ path: '/dar-missing-route-check-20260917/', status: missing.status });
fs.mkdirSync('dar-artifacts', { recursive: true });
fs.writeFileSync('dar-artifacts/live-verification.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
console.log('PASS: live Cloudflare revision, core pages, assets, indexing headers and real 404.');
