import assert from 'node:assert/strict';
import fs from 'node:fs';
const { chromium } = await import('/tmp/dar-browser/node_modules/playwright/index.mjs');
const browser = await chromium.launch({ headless: true });
fs.mkdirSync('dar-artifacts', { recursive: true });
const errors = [];
async function screenshot(page, name) {
  await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; window.scrollTo(0, 0); });
  await page.waitForTimeout(100);
  await page.screenshot({ path: `dar-artifacts/${name}.png`, fullPage: true });
}
async function checkWidth(page, name) {
  const overflow = await page.evaluate(() => ({
    viewport: innerWidth, document: document.documentElement.scrollWidth,
    elements: [...document.querySelectorAll('main *')].filter((e) => e.getBoundingClientRect().right > innerWidth + 1).slice(0, 12).map((e) => ({tag:e.tagName,cls:e.className,text:e.textContent.slice(0,80)})),
  }));
  assert.ok(overflow.document <= overflow.viewport + 1, `${name}: ${JSON.stringify(overflow)}`);
}
try {
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, permissions: ['clipboard-read', 'clipboard-write'] });
    const page = await context.newPage();
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle' });
    await screenshot(page, `home-${width}`);
    assert.equal(await page.locator('h1').count(), 1);
    await checkWidth(page, `Homepage ${width}`);
    await page.goto('http://127.0.0.1:4321/tools/roll-odds/');
    await page.getByRole('button', { name: 'Calculate', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('[data-result]').textContent.includes('63.4'));
    await screenshot(page, `odds-${width}`);
    await checkWidth(page, `Odds ${width}`);
    await page.goto('http://127.0.0.1:4321/tools/unit-comparison/');
    await page.getByRole('button', { name: 'Calculate', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('[data-result]').textContent.includes('Unit A: 50'));
    await checkWidth(page, `Unit comparison ${width}`);
    await page.goto('http://127.0.0.1:4321/codes/latest/');
    await page.locator('[data-code-filter]').fill('bugfixessorry');
    await page.waitForFunction(() => document.querySelector('[data-code-count]').textContent.includes('1 matching'));
    await page.locator('[data-copy-code="bugfixessorry"]').click();
    await page.waitForFunction(() => document.querySelector('[data-copy-status]').textContent.includes('copied'));
    await page.locator('[data-code-filter]').fill('');
    await screenshot(page, `codes-${width}`);
    await checkWidth(page, `Codes ${width}`);
    await context.close();
  }
  assert.deepEqual(errors, [], 'Unexpected browser exceptions');
  console.log('PASS: desktop/mobile layouts, two calculator forms, code filtering, clipboard and browser exceptions.');
} finally { await browser.close(); }
