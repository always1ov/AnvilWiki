import assert from 'node:assert/strict';
import fs from 'node:fs';
import { resolveSiteOrigin, LEGACY_ORIGIN } from './site-origin.mjs';
const base = resolveSiteOrigin(process.env.SITE_URL);
const expected = process.env.EXPECTED_COMMIT;
let data;
const report = { base, expected, checks: [], warnings: [] };
const save = () => {
  fs.mkdirSync('dar-artifacts', { recursive: true });
  fs.writeFileSync('dar-artifacts/live-verification.json', JSON.stringify(report, null, 2));
};
try {
  for (let attempt = 0; attempt < 24; attempt++) {
    try {
      const response = await fetch(`${base}/dar-build.json?verify=${expected || 'current'}-${attempt}`, { signal: AbortSignal.timeout(10000), cache: 'no-store' });
      if (response.ok) {
        const candidate = await response.json();
        if ((!expected || candidate.commit === expected) && candidate.siteUrl === base) { data = candidate; break; }
        console.log(`Waiting: revision=${candidate.commit}, siteUrl=${candidate.siteUrl}`);
      } else console.log(`Waiting: custom domain HTTP ${response.status}`);
    } catch (error) { console.log(`Waiting for custom-domain deployment: ${error.cause?.code || error.message}`); }
    await new Promise((resolve) => setTimeout(resolve, 10000));
  }
  assert.ok(data, 'The expected deployment did not become visible on the custom domain within the verification window.');
  assert.equal(data.publishReady, true);
  assert.equal(data.siteUrl, base);
  report.build = data;
  const paths = ['/', '/guides/', '/codes/latest/', '/guides/gameplay-overview/', '/tools/roll-odds/', '/tools/unit-comparison/', '/about/', '/contact/', '/privacy-policy/', '/robots.txt', '/sitemap-index.xml', '/sitemap-0.xml', '/dar-tools.js'];
  for (const pathname of paths) {
    const response = await fetch(base + pathname, { signal: AbortSignal.timeout(20000), redirect: 'follow' });
    assert.equal(response.status, 200, `${pathname}: HTTP ${response.status}`);
    assert.equal(new URL(response.url).origin, base, `${pathname} redirects away from the custom domain`);
    assert.ok(!/noindex/i.test(response.headers.get('x-robots-tag') || ''), `${pathname} has an indexing block`);
    const body = await response.text();
    if (pathname.endsWith('.xml')) {
      const urls = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
      assert.ok(urls.length > 0, `Empty sitemap: ${pathname}`);
      assert.ok(urls.every((u) => u.startsWith(base + '/')), `Old origin in ${pathname}`);
    } else if (pathname === '/robots.txt') {
      assert.ok(body.includes(`Sitemap: ${base}/sitemap-index.xml`), 'Wrong robots sitemap URL');
      assert.ok(!/^Disallow:\s*\/\s*$/m.test(body), 'robots.txt blocks the entire site');
    } else if (!pathname.endsWith('.js')) {
      assert.ok(body.includes('DAR Guide'), `Wrong identity at ${pathname}`);
      const canonical = body.match(/<link\b(?=[^>]*\brel="canonical")(?=[^>]*\bhref="([^"]+)")[^>]*>/)?.[1];
      assert.equal(canonical, base + pathname, `Wrong canonical at ${pathname}`);
      assert.ok(!/<meta\b(?=[^>]*name="(?:robots|googlebot)")(?=[^>]*content="[^"]*noindex)/i.test(body), `Meta noindex at ${pathname}`);
    }
    report.checks.push({ path: pathname, status: response.status, xRobotsTag: response.headers.get('x-robots-tag') });
  }
  const missing = await fetch(base + '/dar-missing-route-check-20260917/', { signal: AbortSignal.timeout(20000) });
  assert.equal(missing.status, 404, 'Unknown URLs should return a real 404.');
  report.checks.push({ path: '/dar-missing-route-check-20260917/', status: missing.status });
  // Domain redirects belong to Cloudflare Bulk Redirects, not Pages _redirects.
  // Audit separately: a canonical migration must not claim a 301 it did not set.
  for (const origin of [LEGACY_ORIGIN, 'https://www.defeatanimerngwiki.com']) {
    try {
      const response = await fetch(origin + '/guides/gameplay-overview/?migration=check', { redirect: 'manual', signal: AbortSignal.timeout(12000) });
      const location = response.headers.get('location');
      const ok = [301, 308].includes(response.status) && location === base + '/guides/gameplay-overview/?migration=check';
      report.checks.push({ origin, status: response.status, location, permanentRedirectVerified: ok });
      if (!ok) report.warnings.push(`Permanent path/query-preserving redirect not verified: ${origin}`);
    } catch (error) { report.warnings.push(`Alias not reachable: ${origin}: ${error.cause?.code || error.message}`); }
  }
  report.passed = true;
  save();
  console.log(JSON.stringify(report, null, 2));
  console.log('PASS: custom domain, expected revision, canonical, sitemap, indexing headers and real 404. Redirect status is reported separately.');
} catch (error) {
  report.passed = false;
  report.error = error.message;
  save();
  console.error(JSON.stringify(report, null, 2));
  throw error;
}
