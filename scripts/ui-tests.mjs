import puppeteer from 'puppeteer-core';

const BASE = process.env.BASE_URL || 'http://localhost:4173';
const SHOTS = new URL('../artifacts/ui-screenshots', import.meta.url).pathname;

let passed = 0;
let failed = 0;
const failures = [];

function check(name, cond, extra = '') {
  if (cond) {
    passed++;
    console.log(`  \x1b[32mPASS\x1b[0m ${name}`);
  } else {
    failed++;
    failures.push(name + (extra ? ` — ${extra}` : ''));
    console.log(`  \x1b[31mFAIL\x1b[0m ${name}${extra ? ` — ${extra}` : ''}`);
  }
}

async function waitForClick(page, sel, timeout = 4000) {
  await page.waitForSelector(sel, { visible: true, timeout });
  await page.click(sel, { delay: 60 });
}

async function waitForURL(page, path, timeout = 8000) {
  await page.waitForFunction(
    p => {
      const cur = location.pathname.replace(/\/+$/, '') || '/';
      const want = p.replace(/\/+$/, '') || '/';
      return cur === want;
    },
    { timeout },
    path,
  );
}

// LoadingScreen sets this flag after hydration completes (onComplete), so it is
// a reliable signal that React listeners are attached and clicks will work.
async function ensureHydrated(page) {
  await page.waitForFunction(() => sessionStorage.getItem('portfolio-os-loaded') === '1', { timeout: 10000 });
  await new Promise(r => setTimeout(r, 300));
}

async function attachErrorCollector(page) {
  const issues = { consoleErrors: [], pageErrors: [], badResponses: [] };
  page.on('console', msg => {
    if (msg.type() === 'error') issues.consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => issues.pageErrors.push(String(err)));
  page.on('response', res => {
    if (res.status() >= 400 && !res.url().includes('favicon')) issues.badResponses.push(`${res.status()} ${res.url()}`);
  });
  return issues;
}

function assertNoErrors(name, issues) {
  const ok =
    issues.consoleErrors.length === 0 &&
    issues.pageErrors.length === 0 &&
    issues.badResponses.length === 0;
  const extra = [
    ...issues.consoleErrors.map(e => `console: ${e}`),
    ...issues.pageErrors.map(e => `page: ${e}`),
    ...issues.badResponses,
  ].join(' | ');
  check(`${name} — no console/page/HTTP errors`, ok, extra);
}

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH || '/usr/sbin/chromium-browser',
  headless: true,
  args: ['--no-sandbox'],
});

try {
  // ---------------------------------------------------------------
  // 1. SSR / prerender smoke (raw fetch, no JS) — every route + deep links
  // ---------------------------------------------------------------
  console.log('\n1. Prerendered HTML smoke (no JS)');
  const routes = [
    ['/', 'Chirag Hariprasad'],
    ['/about', 'About Me'],
    ['/projects', 'Projects'],
    ['/experience', 'Experience'],
    ['/patents', 'Patent Portfolio'],
['/research', 'Research &amp; Publications'],
    ['/techstack', 'Skill Arsenal'],
    ['/timeline', 'Case Files'],
    ['/contact', 'Get In Touch'],
    ['/projects/genesis', 'G.E.N.E.S.I.S'],
    ['/projects/orion', 'O.R.I.O.N'],
    ['/projects/wanted', 'W.A.N.T.E.D'],
  ];
  for (const [path, marker] of routes) {
    const res = await fetch(BASE + path);
    const html = await res.text();
    check(`GET ${path} → 200 with "${marker}" content`, res.status === 200 && html.includes(marker), `status=${res.status}`);
    const title = html.match(/<title>([^<]*)<\/title>/)?.[1] || '';
    check(`GET ${path} title non-empty & not default`, title.length > 10 && title !== 'CH — Portfolio', title);
  }

  // SEO assets
  for (const p of ['/robots.txt', '/sitemap.xml', '/og-image.png', '/icon.svg']) {
    const res = await fetch(BASE + p);
    check(`SEO asset ${p} → 200`, res.status === 200, `status=${res.status}`);
  }

  // Image assets referenced in the home HTML resolve to the new WebP set
  const homeRes = await fetch(BASE + '/');
  const homeHtml = await homeRes.text();
  const imgs = [...homeHtml.matchAll(/src="([^"]+\.(?:webp|png))"/g)].map(m => m[1]);
  for (const src of imgs) {
    const res = await fetch(BASE + src);
    check(`asset ${src} → 200`, res.status === 200, `status=${res.status}`);
  }

  // ---------------------------------------------------------------
  // 2. Hydration + console error sweep across key routes
  // ---------------------------------------------------------------
  console.log('\n2. Client hydration (cold load, deep links included)');
  for (const path of ['/', '/about', '/projects/genesis', '/techstack?tech=React']) {
    const page = await browser.newPage();
    const issues = await attachErrorCollector(page);
    await page.goto(BASE + path, { waitUntil: 'networkidle0' });
    await page.waitForSelector('.section-title, .hero-editorial-content, .ts-skill-grid, .project-detail-title', { timeout: 10000 });
    const mark = await page.evaluate(() => document.title);
    check(`hydrated ${path} (title=${mark})`, mark.length > 10);
    assertNoErrors(path, issues);
    await page.close();
  }

  // ---------------------------------------------------------------
  // 3. Loading screen: shows on first visit, skipped afterwards
  // ---------------------------------------------------------------
  console.log('\n3. Loading screen behaviour');
  {
    const ctx = await browser.createBrowserContext();
    const page = await ctx.newPage();
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    check('loader visible on first visit', await page.$('.loading-screen') !== null);
    await page.waitForFunction(() => sessionStorage.getItem('portfolio-os-loaded') === '1', { timeout: 8000 });
    check('sessionStorage flag set', true);
    await page.waitForSelector('.hero-portrait', { timeout: 8000 });
    await new Promise(r => setTimeout(r, 500));
    const loader = await page.evaluate(() => {
      const el = document.querySelector('.loading-screen');
      return el ? getComputedStyle(el).opacity : 'gone';
    });
    check('loader faded/skipped after load', loader === '0' || loader === 'gone', `opacity=${loader}`);
    // reload within same session → instant skip
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForFunction(
      () => {
        const el = document.querySelector('.loading-screen');
        return !el || getComputedStyle(el).opacity === '0';
      },
      { timeout: 3000 },
    );
    check('loader skipped on reload (within session)', true);
    await page.close();
    await ctx.close();
  }

  // ---------------------------------------------------------------
  // 4. SPA navigation through the nav sidebar
  // ---------------------------------------------------------------
  console.log('\n4. SPA navigation');
  {
    const page = await browser.newPage();
    const issues = await attachErrorCollector(page);
    await page.goto(BASE + '/', { waitUntil: 'networkidle0' });
    await page.waitForSelector('.hero-portrait');
    await page.waitForFunction(
      () => {
        const el = document.querySelector('.loading-screen');
        return !el || getComputedStyle(el).opacity === '0';
      },
      { timeout: 10000 },
    );
    const nav = [
      ['/about', 'About Me'],
      ['/projects', 'Projects'],
      ['/experience', 'Experience'],
      ['/patents', 'Patent Portfolio'],
    ['/research', 'Research & Publications'],
    ['/techstack', 'Skill Arsenal'],
    ['/timeline', 'Case Files'],
    ['/contact', 'Get In Touch'],
    ];
    for (const [path, heading] of nav) {
      await page.click(`a.nav-link[href="${path}"]`);
      await waitForURL(page, path);
      await page.waitForFunction(
        h => {
          const el = [...document.querySelectorAll('.section-title')].find(e => e.textContent.includes(h));
          el?.scrollIntoView();
          return !!el;
        },
        { timeout: 6000 },
        heading,
      );
      const text = await page.$eval('.section-title', el => el.textContent);
      check(`nav → ${path} renders "${heading}"`, text.includes(heading), text);
    }
    // home
    await page.click('a.nav-link[href="/"]');
    await waitForURL(page, '/');
    await page.waitForSelector('.hero-portrait', { timeout: 6000 });
    check('nav → / shows hero', true);
    assertNoErrors('navigation', issues);
    // back button
    await page.goBack();
    await waitForURL(page, '/contact');
    check('browser Back works (SPA history)', true);
    await page.close();
  }

  // ---------------------------------------------------------------
  // 5. Command palette (search)
  // ---------------------------------------------------------------
  console.log('\n5. Command palette');
  {
    const page = await browser.newPage();
    const issues = await attachErrorCollector(page);
    await page.goto(BASE + '/', { waitUntil: 'networkidle0' });
    await page.keyboard.press('/');
    await page.waitForSelector('.command-palette', { timeout: 3000 });
    check('palette opens with "/" key', true);
    await page.type('.command-palette-input', 'genesis');
    await page.waitForFunction(
      () => [...document.querySelectorAll('.command-palette-item')].some(el => {
        const t = el.textContent.toLowerCase();
        return t.includes('genesis') || t.includes('g.e.n.e.s.i.s');
      }),
      { timeout: 4000 }
    );
    await page.evaluate(() => {
      const el = [...document.querySelectorAll('.command-palette-item')].find(el => {
        const t = el.textContent.toLowerCase();
        return t.includes('genesis') || t.includes('g.e.n.e.s.i.s');
      });
      el?.click();
    });
    await waitForURL(page, '/projects/genesis', 6000);
    check('palette search "genesis" → navigates to project', true);
    // theme switch via palette
    await page.keyboard.press('/');
    await page.waitForSelector('.command-palette-input');
    await page.type('.command-palette-input', 'theme');
    await page.waitForFunction(
      () => [...document.querySelectorAll('.command-palette-item-title')].some(el => el.textContent.includes('Theme: Amber')),
      { timeout: 3000 }
    );
    const before = await page.evaluate(() => document.documentElement.style.getPropertyValue('--accent'));
    await page.waitForSelector('.command-palette-item');
    const amberBtn = await page.evaluate(() => {
      const el = [...document.querySelectorAll('.command-palette-item')].find(el => el.textContent.includes('Theme: Amber'));
      el?.click();
    });
    const accent = await page.evaluate(() => document.documentElement.style.getPropertyValue('--accent'));
    check('palette theme switch changes CSS var', accent !== before, accent);
    check('theme persisted to localStorage', await page.evaluate(() => localStorage.getItem('portfolio-theme')) === 'amber');
    await page.keyboard.press('Escape');
    check('Escape closes palette', await page.$('.command-palette') === null);
    await page.close();
  }

  // ---------------------------------------------------------------
  // 6. Project card → detail → back
  // ---------------------------------------------------------------
  console.log('\n6. Project cards');
  {
    const page = await browser.newPage();
    const issues = await attachErrorCollector(page);
    await page.goto(BASE + '/projects', { waitUntil: 'networkidle0' });
    await ensureHydrated(page);
    await page.waitForSelector('.project-card');
    const cardHref = await page.$eval('.project-card', el => el.getAttribute('href'));
    const cardTitle = (await page.$eval('.project-card h3', el => el.textContent).catch(() => '')) || cardHref;
    await page.click('.project-card');
    await waitForURL(page, cardHref, 6000);
    await page.waitForSelector('.project-detail-title', { timeout: 6000 });
    const detailTitle = await page.$eval('.project-detail-title', el => el.textContent);
    check(`card click → ${cardHref} renders detail "${detailTitle.trim()}"`, detailTitle.trim().length > 0);
    await page.goBack();
    await waitForURL(page, '/projects', 6000);
    await page.waitForSelector('.project-card', { timeout: 6000 });
    const backHref = await page.$eval('.project-card', el => el.getAttribute('href'));
    check('Back returns to /projects with cards', backHref === cardHref);
    assertNoErrors('project cards + back', issues);
    await page.close();
  }

  // ---------------------------------------------------------------
  // 7. Tech Stack: node click → ?tech= panel → close resets URL
  // ---------------------------------------------------------------
  console.log('\n7. Tech stack nodes');
  {
    const page = await browser.newPage();
    const issues = await attachErrorCollector(page);
    await page.goto(BASE + '/techstack', { waitUntil: 'networkidle0' });
    await ensureHydrated(page);
    await page.waitForSelector('.ts-skill-node', { timeout: 10000 });
    await page.click('.ts-skill-node');
    await page.waitForSelector('.ts-inspection-panel', { timeout: 6000 });
    const hasQuery = await page.evaluate(() => location.search.includes('tech='));
    check('clicking a node sets ?tech= URL', hasQuery);
    const panelTitle = await page.$eval('.ts-panel-title', el => el.textContent).catch(() => '');
    check(`inspection panel shows "${panelTitle}"`, panelTitle.length > 0);
    const techName = await page.evaluate(() => new URLSearchParams(location.search).get('tech'));
    check(`URL tech matches panel (${techName})`, panelTitle === techName);
    await new Promise(r => setTimeout(r, 1100));
    await page.waitForFunction(
      () => {
        const el = document.querySelector('.ts-inspection-panel');
        return el && getComputedStyle(el).transform === 'none';
      },
      { timeout: 5000 },
    );
    await page.click('.ts-panel-close');
    await page.waitForFunction(() => location.search === '', { timeout: 4000 });
    check('close resets ?tech= URL', true);
    assertNoErrors('techstack', issues);
    await page.close();
  }

  // ---------------------------------------------------------------
  // 8. Mobile viewport: hamburger nav + search
  // ---------------------------------------------------------------
  console.log('\n8. Mobile viewport');
  {
    const page = await browser.newPage();
    const issues = await attachErrorCollector(page);
    await page.setViewport({ width: 375, height: 812, isMobile: true });
    await page.goto(BASE + '/', { waitUntil: 'networkidle0' });
    await ensureHydrated(page);
    await page.waitForSelector('.nav-mobile-toggle', { visible: true, timeout: 8000 });
    check('hamburger visible on mobile', true);
    await page.click('.nav-mobile-toggle');
    await page.waitForSelector('.nav-sidebar.open', { timeout: 4000 });
    check('sidebar opens', true);
    await page.click('a.nav-link[href="/about"]');
    await waitForURL(page, '/about', 6000);
    await page.waitForFunction(
      () => { const el = document.querySelector('.section-title'); el?.scrollIntoView(); return !!el; },
      { timeout: 6000 },
    );
    await page.waitForFunction(() => !document.querySelector('.nav-sidebar.open'), { timeout: 4000 });
    const sidebarClosed = await page.evaluate(() => !document.querySelector('.nav-sidebar.open'));
    check('sidebar auto-closes after nav', sidebarClosed);
    await page.click('.nav-mobile-toggle');
    await page.waitForSelector('.nav-sidebar.open', { timeout: 4000 });
    await page.click('.nav-search-btn');
    await page.waitForSelector('.command-palette', { timeout: 4000 });
    check('search opens palette on mobile', true);
    assertNoErrors('mobile', issues);
    await page.close();
  }

  // ---------------------------------------------------------------
  // 9. Screenshots
  // ---------------------------------------------------------------
  console.log('\n9. Screenshots');
  {
    await new Promise(r => setTimeout(r, 500));
    const shots = [
      ['/', 'home', 1440, 900],
      ['/projects', 'projects', 1440, 900],
      ['/projects/genesis', 'genesis', 1440, 900],
      ['/techstack', 'techstack', 1440, 900],
    ];
    for (const [path, name, w, h] of shots) {
      const page = await browser.newPage();
      await page.setViewport({ width: w, height: h });
      await page.goto(BASE + path, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 2600));
      await page.screenshot({ path: `${SHOTS}/${name}.png`, fullPage: false });
      await page.close();
    }
    const page = await browser.newPage();
    await page.setViewport({ width: 375, height: 812, isMobile: true });
    await page.goto(BASE + '/', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 2600));
    await page.screenshot({ path: `${SHOTS}/mobile-home.png` });
    await page.click('.nav-mobile-toggle');
    await page.waitForSelector('.nav-sidebar.open');
    await page.screenshot({ path: `${SHOTS}/mobile-nav.png` });
    await page.close();
    check(`screenshots written to ${SHOTS}`, true);
  }
} catch (err) {
  failed++;
  failures.push(`SCRIPT ERROR: ${err.message}`);
  console.error('\x1b[31mSCRIPT ERROR\x1b[0m', err);
}

console.log(`\n\x1b[36m${passed} passed, ${failed} failed\x1b[0m`);
if (failures.length) {
  console.log('\nFailures:');
  failures.forEach(f => console.log(`  - ${f}`));
}
await browser.close();
process.exit(failed ? 1 : 0);