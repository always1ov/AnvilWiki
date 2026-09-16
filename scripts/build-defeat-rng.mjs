import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

// Run from the repository root after pnpm install. The upstream template is
// initialized in the disposable build checkout; main is never changed.
const root = process.cwd();
const pnpm = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const write = (p, text) => {
  const target = path.join(root, p);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, text);
};
const answers = JSON.parse(read('launch/defeat-anime-rng.answers.json'));
const url = new URL(process.env.SITE_URL || process.env.CF_PAGES_URL || `https://${answers[2]}`);
if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash) {
  throw new Error('SITE_URL must be an HTTPS origin without a path, query or fragment.');
}
answers[2] = url.host;
const env = { ...process.env, SITE_URL: url.origin };
for (const key of Object.keys(env)) {
  if (/^PUBLIC_(ADSENSE|ADSTERRA|GISCUS|SPONSOR|GA_ID|CF_BEACON)/.test(key)) env[key] = '';
}
const answersFile = 'launch/.build-answers.json';
write(answersFile, `${JSON.stringify(answers, null, 2)}\n`);
try {
  execFileSync(pnpm, ['exec', 'tsx', 'scripts/apply-template.ts', '--answers', answersFile], {
    cwd: root, env, stdio: 'inherit',
  });
} finally {
  fs.rmSync(path.join(root, answersFile), { force: true });
}

// Keep starter articles out of production. Preserve non-scaffold content.
function hideScaffolds(dir) {
  if (!fs.existsSync(dir)) return;
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, item.name);
    if (item.isDirectory()) hideScaffolds(file);
    else if (/\.mdx?$/.test(item.name)) {
      let text = fs.readFileSync(file, 'utf8');
      if (!text.includes('Replace this scaffold with your article.')) continue;
      text = /^draft:/m.test(text)
        ? text.replace(/^draft:.*$/m, 'draft: true')
        : text.replace(/^---\r?\n/, '---\ndraft: true\n');
      fs.writeFileSync(file, text);
    }
  }
}
hideScaffolds(path.join(root, 'src/content/wiki'));
write('src/content/wiki/en/guides/gameplay-overview.mdx', read('launch/content/gameplay-overview.mdx'));

// Replace demo share artwork with a text-only site card, not fabricated game art.
const sharp = (await import('sharp')).default;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#111827"/><rect x="64" y="76" width="10" height="478" rx="5" fill="#a78bfa"/><text x="110" y="265" fill="white" font-size="68" font-family="sans-serif" font-weight="bold">Defeat Anime RNG</text><text x="114" y="340" fill="#c4b5fd" font-size="38" font-family="sans-serif">Independent English Game Guide</text><text x="114" y="490" fill="#94a3b8" font-size="26" font-family="sans-serif">Source-backed basics. Clear verification limits.</text></svg>`;
fs.mkdirSync(path.join(root, 'public/images'), { recursive: true });
await sharp(Buffer.from(svg)).webp().toFile(path.join(root, 'public/images/hero.webp'));
const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><rect width="512" height="512" rx="96" fill="#7c3aed"/><text x="256" y="310" text-anchor="middle" fill="white" font-size="176" font-family="sans-serif" font-weight="bold">DAR</text></svg>`;
write('public/favicon.svg', icon);
for (const [name, size] of [['favicon.png', 64], ['apple-touch-icon.png', 180]]) {
  await sharp(Buffer.from(icon)).resize(size, size).png().toFile(path.join(root, 'public', name));
}
const manifest = JSON.parse(read('public/manifest.json'));
for (const item of manifest.icons || []) {
  if (!item.src || !/\.(png|webp)$/i.test(item.src)) continue;
  const target = path.resolve(root, 'public', item.src.replace(/^\//, ''));
  const publicRoot = path.resolve(root, 'public') + path.sep;
  if (!target.startsWith(publicRoot)) throw new Error('Unsafe manifest icon path.');
  fs.mkdirSync(path.dirname(target), { recursive: true });
  const size = Math.min(1024, Math.max(32, parseInt(item.sizes, 10) || 512));
  await sharp(Buffer.from(icon)).resize(size, size).toFile(target);
}

// This is an explicitly labelled deployment preview, not an ad-ready launch.
// Remove this gate only after replacing/reviewing the remaining site copy.
if (process.env.PUBLISH_READY !== 'true') {
  const existingHeaders = fs.existsSync('public/_headers') ? read('public/_headers') : '';
  write('public/_headers', `${existingHeaders}\n/*\n  X-Robots-Tag: noindex, nofollow\n`);
}
execFileSync(pnpm, ['build'], { cwd: root, env, stdio: 'inherit' });
console.log(`Built English preview for ${url.origin}. Ads disabled. No game login required.`);
