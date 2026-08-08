#!/usr/bin/env node
// Hydration / render smoke test against the built+prerendered site.
// Requires: npm run build (which runs vite preview on :4173) then this script.
import puppeteer from 'puppeteer-core';

const BASE = process.env.BASE_URL || 'http://localhost:4173';
const routes = ['/', '/about', '/projects', '/projects/genesis', '/patents', '/contact'];

const browser = await puppeteer.launch({
  executablePath: '/usr/sbin/chromium-browser',
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

let failures = 0;

for (const route of routes) {
  const page = await browser.newPage();
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push(`pageerror: ${e.message}`));

  try {
    await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle2', timeout: 30000 });
    const title = await page.title();
    const bodyText = await page.evaluate(() => document.body.innerText.length);
    // After hydration the loading overlay should be gone
    const hasContent = bodyText > 50;

    const ok = title.length > 0 && hasContent && errors.filter(e => !e.includes('favicon') && !e.includes('Failed to load resource')).length === 0;
    console.log(`${ok ? 'PASS' : 'FAIL'} ${route} | title="${title.slice(0, 60)}" | body="${bodyText}" chars`);
    if (!ok) {
      failures++;
      errors.forEach(e => console.log(`   console error: ${e.slice(0, 200)}`));
    }
  } catch (e) {
    failures++;
    console.log(`FAIL ${route} | ${e.message.slice(0, 200)}`);
  } finally {
    await page.close();
  }
}

await browser.close();
console.log(failures === 0 ? '\nAll routes rendered OK' : `\n${failures} route(s) FAILED`);
process.exit(failures === 0 ? 0 : 1);