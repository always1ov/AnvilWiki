// Owner-confirmed production domain. Deployment aliases must never become canonicals.
export const SITE_ORIGIN = 'https://defeatanimerngwiki.com';
export const LEGACY_ORIGIN = 'https://anvilwiki-786.pages.dev';
const aliases = new Set([
  'anvil.wiki', 'www.anvil.wiki', 'anvilwiki.pages.dev',
  'anvilwiki-786.pages.dev', 'defeat-rng-guide-always1ov.pages.dev',
  'www.defeatanimerngwiki.com',
]);
export function resolveSiteOrigin(value = '') {
  const url = new URL(value.trim() || SITE_ORIGIN);
  if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash || url.username || url.password || url.port) {
    throw new Error('SITE_URL must be an HTTPS origin without credentials, a port, path, query or fragment.');
  }
  if (aliases.has(url.hostname) || url.hostname.endsWith('.anvilwiki-786.pages.dev')) return SITE_ORIGIN;
  return url.origin;
}
