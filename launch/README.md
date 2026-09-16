# Defeat Anime RNG — English deployment preview

Decision: stop keyword screening and Roblox installer troubleshooting. Use this game for a low-cost first deployment experiment, not as a guaranteed traffic or revenue opportunity. Preserve the upstream `main` branch.

## Cloudflare Pages

- Repository: `always1ov/AnvilWiki`
- Production branch: `launch/defeat-anime-rng`
- Suggested project name: `defeat-rng-guide-always1ov` (availability is not confirmed)
- Framework preset: Astro
- Build command: `node scripts/build-defeat-rng.mjs`
- Build output directory: `dist`
- Root directory: repository root
- Build variables: `NODE_VERSION=24`, `PNPM_VERSION=11.1.1`
- Optional `SITE_URL`: the actual HTTPS origin, without a trailing path. Otherwise the build uses Cloudflare `CF_PAGES_URL`.

Cloudflare must first install the repository dependencies. There is no paid API, database, server, game login or payment setup in this build. Do not use the original `pnpm build` by itself on this branch: it bypasses the initialization script.

## What the build does

Runs the existing AnvilWiki `apply-template --answers` flow; selects English and Guides; removes demo articles and the upstream landing pages; resets advertising, analytics and comment identifiers; hides scaffold articles; adds one source-backed gameplay overview; replaces share art and common app icons; builds Astro and Pagefind.

The source of the overview is the developer listing shown in the supplied screenshot, not an in-game playtest. No invented codes, unit rankings or drop probabilities are published. Source content is in `launch/content/`; the build copies it into the template's content directory.

## Preview versus public content launch

This is a technical preview with one substantive game overview, not the article's recommended 10–15-page content launch and not an ad-ready website. Remaining template copy, informational pages, final domain and article coverage need editorial review. The preview sends `X-Robots-Tag: noindex, nofollow` by default. Only set `PUBLISH_READY=true` after that review; confirm the response headers before submitting a sitemap.

No Cloudflare project has been created by this commit. A successful GitHub build is not a deployment. The Actions workflow verifies the special preview build when repository Actions are enabled.
