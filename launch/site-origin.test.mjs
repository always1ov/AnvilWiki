import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveSiteOrigin, SITE_ORIGIN } from './site-origin.mjs';

test('production canonical uses the owner-confirmed .com', () => {
  for (const input of ['', ' ', SITE_ORIGIN, SITE_ORIGIN + '/', 'https://www.defeatanimerngwiki.com', 'https://anvilwiki-786.pages.dev', 'https://preview.anvilwiki-786.pages.dev', 'https://anvil.wiki', 'https://anvilwiki.pages.dev', 'https://defeat-rng-guide-always1ov.pages.dev']) {
    assert.equal(resolveSiteOrigin(input), SITE_ORIGIN, input);
  }
});
test('invalid origins fail before files are changed', () => {
  for (const input of ['http://defeatanimerngwiki.com', 'https://defeatanimerngwiki.com/path', 'https://defeatanimerngwiki.com/?q=1', 'https://defeatanimerngwiki.com/#fragment', 'https://user:pass@defeatanimerngwiki.com', 'https://defeatanimerngwiki.com:8080', 'not a URL']) {
    assert.throws(() => resolveSiteOrigin(input), undefined, input);
  }
});
test('a future explicit HTTPS custom domain remains configurable', () => {
  assert.equal(resolveSiteOrigin('https://new-owner-domain.example/'), 'https://new-owner-domain.example');
});
