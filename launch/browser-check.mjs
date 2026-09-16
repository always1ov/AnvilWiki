import assert from 'node:assert/strict';
import fs from 'node:fs';
const { chromium } = await import('/tmp/dar-browser/node_modules/playwright/index.mjs');
const browser = await chromium.launch({ headless: true });
fs.mkdirSync('dar-artifacts', { recursive: true });
const errors = [];
try {
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, permissions: ['clipboard-read', 'clipboard-write'] });
    const page = await context.newPage();
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle' });
    await page.screenshot({ path: `dar-artifacts/home-${width}.png`, fullPage: true });
    assert.equal(await page.locator('h1').count(), 1);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Homepage overflow ${width}`);
    await page.goto('http://127.0.0.1:4321/tools/roll-odds/');
    await page.getByRole('button', { name: 'Calculate', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('[data-result]').textContent.includes('63.4'));
    await page.screenshot({ path: `dar-artifacts/odds-${width}.png`, fullPage: true });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Tool overflow ${width}`);
    await page.goto('http://127.0.0.1:4321/tools/unit-comparison/');
    await page.getByRole('button', { name: 'Calculate', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('[data-result]').textContent.includes('Unit A: 50'));
    await page.goto('http://127.0.0.1:4321/codes/latest/');
    await page.locator('[data-code-filter]').fill('bugfixessorry');
    await page.waitForFunction(() => document.querySelector('[data-code-count]').textContent.includes('1 matching'));
    await page.locator('[data-copy-code="bugfixessorry"]').click();
    await page.waitForFunction(() => document.querySelector('[data-copy-status]').textContent.includes('copied'));
    await page.locator('[data-code-filter]').fill('');
    await page.screenshot({ path: `dar-artifacts/codes-${width}.png`, fullPage: true });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Codes page overflow ${width}`);
    await context.close();
  }
  assert.deepEqual(errors, [], 'Unexpected browser exceptions');
  console.log('PASS: desktop/mobile layouts, two calculator forms, code filtering, clipboard and browser exceptions.');
} finally { await browser.close(); }
