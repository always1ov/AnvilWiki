# DAR Guide production branch

Production site: https://anvilwiki-786.pages.dev/

This branch publishes an independent English Defeat Anime RNG guide, built from AnvilWiki. `main` remains the original template. Deploy **launch/defeat-anime-rng**, with `node scripts/build-defeat-rng.mjs`, output `dist`, Node 24 and pnpm 11.1.1.

## Published scope

Ten core content pages: one code comparison, seven practical guides and two interactive calculators. Supporting pages cover About, Editorial Policy, Contact, FAQ, Privacy, Terms and Attribution. The homepage is a compact English entry point rather than the original single-card preview.

The 17-code ledger compares three publisher snapshots reviewed September 17, 2026. Eight entries are publisher-reported active; nine have disputed expiry status. None is falsely labelled personally redeemed. Exact roster rankings, merge recipes and probabilities are not invented.

## Source of truth

- `launch/release.mjs`: editorial content, code evidence, page components and release setup.
- `launch/tools.mjs`: calculator math and on-device interactions.
- `scripts/build-defeat-rng.mjs`: initializes the disposable Astro checkout, applies the release and generates branded assets.
- `launch/verify.mjs`: calculator boundaries, all generated HTML/internal links, canonical domain, sitemap, search and indexing checks.
- `launch/browser-check.mjs`: real desktop/mobile Chromium tests and screenshot evidence.
- `launch/live-check.mjs`: confirms that the current commit is live on Cloudflare and checks real HTTP behavior.

Generated config/content under `src/` is rebuilt on each deployment. Edit the launch source, not a generated disposable checkout. Content and code review dates are fixed editorial dates, never automatically advanced on build.

## Deployment and indexing

`SITE_URL` defaults to the owner's confirmed stable Pages origin. Per-deployment URLs are not used as canonical URLs. To move to a custom domain, first attach it to this Cloudflare project, then explicitly supply its HTTPS origin as `SITE_URL` and redeploy.

This release allows indexing by default. Set `PUBLISH_READY=false` to restore a global noindex header for a private review build. This is permission to crawl, not a claim that Google has indexed the site. A sitemap alias exists at `/sitemap.xml`, redirecting to `/sitemap-index.xml`.

Advertising, analytics, comments and sponsors remain disabled. Do not enable them without the owner's accounts, required consent/privacy changes and checks. Search Console ownership verification, ad-network approval, payout/tax information and a paid domain require the owner's authorization; no placeholder tokens or credentials are included.

## Verification

The workflow builds, audits HTML, runs real browser interaction tests, uploads screenshots, and on pushes checks the deployed commit. A failed live check must not be reported as a successful deployment. Evidence artifacts expire after seven days; download them from the Actions run when needed.

The website does not request a Roblox login. Correction requests use the existing public GitHub PR discussion; no fake contact email is generated. Upstream MIT license and attribution are retained.
