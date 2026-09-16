import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { applyRelease } from '../launch/release.mjs';

const root = process.cwd();
const pnpm = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
const defaultSiteUrl = 'https://anvilwiki-786.pages.dev';
const url = new URL(process.env.SITE_URL?.trim() || defaultSiteUrl);
if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash || url.username || url.password) {
  throw new Error('SITE_URL must be an HTTPS origin without credentials, path, query or fragment.');
}
if (['anvil.wiki', 'www.anvil.wiki', 'anvilwiki.pages.dev'].includes(url.hostname)) url.href = defaultSiteUrl;
const publishReady = process.env.PUBLISH_READY !== 'false';
const env = { ...process.env, SITE_URL: url.origin };
for (const key of Object.keys(env)) {
  if (/^PUBLIC_(ADSENSE|ADSTERRA|GISCUS|SPONSOR|GA_ID|CF_BEACON)/.test(key)) env[key] = '';
}
const answers = JSON.parse(fs.readFileSync('launch/defeat-anime-rng.answers.json', 'utf8'));
answers[2] = url.host;
answers[4] = 'Independent Defeat Anime RNG codes, beginner guides and probability tools, with linked sources and clear verification limits.';
answers[13] = 'guides,codes,tools';
const answersFile = 'launch/.build-answers.json';
fs.writeFileSync(answersFile, JSON.stringify(answers));
try {
  execFileSync(pnpm, ['exec', 'tsx', 'scripts/apply-template.ts', '--answers', answersFile], { cwd: root, env, stdio: 'inherit' });
} finally {
  fs.rmSync(answersFile, { force: true });
}
function hideScaffolds(dir) {
  if (!fs.existsSync(dir)) return;
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, item.name);
    if (item.isDirectory()) hideScaffolds(file);
    else if (/\.mdx?$/.test(item.name)) {
      let text = fs.readFileSync(file, 'utf8');
      if (!text.includes('Replace this scaffold with your article.')) continue;
      text = /^draft:/m.test(text) ? text.replace(/^draft:.*$/m, 'draft: true') : text.replace(/^---\r?\n/, '---\ndraft: true\n');
      fs.writeFileSync(file, text);
    }
  }
}
hideScaffolds('src/content/wiki');
const commit = process.env.CF_PAGES_COMMIT_SHA || execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
applyRelease({ siteUrl: url.origin, commit, publishReady });
// Dates, author, read time and Share need more than one row on small screens.
// Wrap the actual metadata row instead of hiding document-wide overflow.
fs.appendFileSync('src/styles/globals.css', `\narticle > header[data-pagefind-meta] > .mt-4 { flex-wrap: wrap; row-gap: .65rem; }\narticle > header[data-pagefind-meta] > .mt-4 > span { flex-shrink: 0; }\n@media(max-width:640px) { article > header[data-pagefind-meta] > .mt-4 > .ml-auto { margin-left: 0; } }\n`);

// Neutral branded graphics, not invented game screenshots. All assets are local.
const sharp = (await import('sharp')).default;
fs.mkdirSync('public/images', { recursive: true });
const card = '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#211439"/><rect x="70" y="76" width="9" height="478" rx="4" fill="#a78bfa"/><text x="118" y="225" fill="#d8c7f2" font-size="27" font-family="sans-serif">DAR GUIDE / INDEPENDENT ENGLISH GUIDE</text><text x="114" y="337" fill="white" font-size="69" font-family="sans-serif" font-weight="bold">Defeat Anime RNG</text><text x="118" y="420" fill="#d8c7f2" font-size="34" font-family="sans-serif">Codes. Guides. Tools with clear assumptions.</text></svg>';
await sharp(Buffer.from(card)).webp().toFile('public/images/hero.webp');
const icon = '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><rect width="512" height="512" rx="96" fill="#7c3aed"/><text x="256" y="310" text-anchor="middle" fill="white" font-size="176" font-family="sans-serif" font-weight="bold">DAR</text></svg>';
fs.writeFileSync('public/favicon.svg', icon);
for (const [name, size] of [['favicon.png', 64], ['favicon-32x32.png', 32], ['apple-touch-icon.png', 180]]) await sharp(Buffer.from(icon)).resize(size, size).png().toFile(path.join('public', name));
const manifest = JSON.parse(fs.readFileSync('public/manifest.json', 'utf8'));
for (const item of manifest.icons || []) {
  if (!item.src || !/\.(png|webp)$/i.test(item.src)) continue;
  const target = path.resolve('public', item.src.replace(/^\//, ''));
  if (!target.startsWith(path.resolve('public') + path.sep)) throw new Error('Unsafe manifest icon path.');
  fs.mkdirSync(path.dirname(target), { recursive: true });
  const size = Math.min(1024, Math.max(32, parseInt(item.sizes, 10) || 512));
  await sharp(Buffer.from(icon)).resize(size, size).toFile(target);
}
execFileSync(pnpm, ['build'], { cwd: root, env, stdio: 'inherit' });
execFileSync(process.execPath, ['launch/verify.mjs'], { cwd: root, env, stdio: 'inherit' });
console.log(`DAR Guide release built and audited for ${url.origin}; search indexing ${publishReady ? 'allowed' : 'disabled'}.`);
