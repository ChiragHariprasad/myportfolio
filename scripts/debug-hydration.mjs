#!/usr/bin/env node
// Captures the client DOM at first commit (before effects run) and compares
// to SSR to find the hydration mismatch at the exact moment React hydrates.
import puppeteer from 'puppeteer-core';

const BASE = process.env.BASE_URL || 'http://localhost:4173';
const route = process.argv[2] || '/about';

const browser = await puppeteer.launch({
  executablePath: '/usr/sbin/chromium-browser',
  headless: true,
  args: ['--no-sandbox'],
});
const page = await browser.newPage();
const errs = [];
page.on('console', m => { if (['error', 'warning'].includes(m.type())) errs.push(`[${m.type()}] ${m.text().slice(0, 300)}`); });
page.on('pageerror', e => errs.push(`[pageerror] ${e.message.slice(0, 300)}`));

let firstRootHtml = '';
await page.setContent(await (await fetch(`${BASE}${route}`)).text(), { waitUntil: 'domcontentloaded' });
// Now run the app scripts: fetch raw HTML, inject, let React hydrate.
await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
// Capture ASAP after scripts execute (before timers/effects settle)
firstRootHtml = await page.evaluate(() => document.getElementById('root').innerHTML);
const errsEarly = [...errs];

// Let effects run; capture again
await new Promise(r => setTimeout(r, 300));
const secondRootHtml = await page.evaluate(() => document.getElementById('root').innerHTML);
const errsLate = errs.slice(errsEarly.length);

const ssr = (await (await fetch(`${BASE}${route}`)).text()).match(/<div id="root">([\s\S]*?)(<\/div>)?\s*<\/body>/)?.[1].replace(/<\/div>\s*$/, '') ?? '';

const norm = s => s.replace(/ style="[^"]*"/g, '').replace(/\s+/g, ' ');
const a = norm(ssr);
const b = norm(firstRootHtml);

console.log('SSR len:', a.length, '| first-client-render len:', b.length);
if (a === b) console.log('FIRST RENDER MATCHES SSR');
else {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if (a[i] !== b[i]) {
      console.log(`Divergence at char ${i}:`);
      console.log('SSR    :', JSON.stringify(a.slice(Math.max(0, i - 150), i + 250)));
      console.log('CLIENT :', JSON.stringify(b.slice(Math.max(0, i - 150), i + 250)));
      break;
    }
  }
}
console.log('\nEarly errors:', errsEarly.length ? errsEarly : 'none');
console.log('Late errors (post-effect):', errsLate.length ? errsLate : 'none');
console.log('\nFinal client len:', norm(secondRootHtml).length);
await browser.close();