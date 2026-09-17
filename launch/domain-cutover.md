# Production domain cutover

Owner-confirmed domain: **https://defeatanimerngwiki.com**.
Deployment branch: `launch/defeat-anime-rng`. Build command stays `node scripts/build-defeat-rng.mjs` and output stays `dist`.

`site-origin.mjs` resolves the canonical origin. Build-time site metadata, canonical tags, robots.txt, sitemap, RSS, JSON-LD and the build manifest derive from this origin. Stale known template or Pages origins are normalized to the confirmed .com. `live-check.mjs` tests the public .com and reports alias redirects separately; a build passing is not evidence that a redirect was installed.

## Account-level redirects (not installed by this commit)

Cloudflare Pages `_redirects` does not support domain-level sources. Do not add an unconditional `/* https://defeatanimerngwiki.com/:splat 301`: it can loop on the destination host. Keep the site static and use Cloudflare Bulk Redirects at the account level.

Create a redirect list and enable its Bulk Redirect rule with this entry:

- Source: `anvilwiki-786.pages.dev/` (no scheme, to match HTTP and HTTPS)
- Target: `https://defeatanimerngwiki.com/`
- Status: `301`
- Subpath matching: enabled
- Preserve path suffix: enabled
- Preserve query string: enabled
- Include subdomains: disabled (leave individual preview deployments alone)

The optional `www.defeatanimerngwiki.com/` alias can use the same target and options once its DNS/proxy/TLS is configured. Do not change apex DNS or certificates just to create an unused www alias.

Official reference: https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/

## Search Console

Add a Domain property `defeatanimerngwiki.com` using the owner's Google account. Verify with the provided Cloudflare authorization or exact DNS TXT token. Do not invent verification tokens and do not remove successful verification records.

Submit **https://defeatanimerngwiki.com/sitemap-index.xml** after live verification. Request indexing for the homepage, `/codes/latest/`, and a core guide. Sitemap submission and index requests are not guarantees of indexing or rankings.

No Google Search Console or AdSense account action has been performed by this commit.
