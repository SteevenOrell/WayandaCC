#!/usr/bin/env node
/**
 * Portfolio media capture.
 *
 *   npm run media                          # build + capture into portfolio-media/after
 *   node scripts/media.mjs --label before --dir <static build dir>
 *
 * Serves a static build with an SPA fallback on a random local port, then uses
 * Playwright (Chromium) to take desktop (1440px) and mobile (390px) screenshots
 * of every key page and record a short walkthrough video for each width.
 * Requires `npx playwright install chromium` once.
 */
import { createServer } from 'node:http';
import { readFile, stat, mkdir, rm, readdir, rename } from 'node:fs/promises';
import { extname, join, resolve, normalize, sep } from 'node:path';
import { chromium } from 'playwright';

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, cur, i, arr) => {
    if (cur.startsWith('--')) acc.push([cur.slice(2), arr[i + 1] && !arr[i + 1].startsWith('--') ? arr[i + 1] : true]);
    return acc;
  }, [])
);
const label = args.label || 'after';
const root = resolve(args.dir || 'dist');
const outDir = resolve('portfolio-media', label);

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false },
  { name: 'mobile', width: 390, height: 844, deviceScaleFactor: 2, isMobile: true },
];
const PAGES = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about-us' },
  { name: '404', path: '/this-page-does-not-exist' },
];

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif',
  '.svg': 'image/svg+xml', '.mp4': 'video/mp4', '.otf': 'font/otf', '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.txt': 'text/plain',
};

function startServer() {
  const server = createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      let file = normalize(join(root, urlPath));
      if (!file.startsWith(root + sep) && file !== root) { res.writeHead(403).end(); return; }
      let s = await stat(file).catch(() => null);
      if (!s || s.isDirectory()) { file = join(root, 'index.html'); s = await stat(file); }
      const body = await readFile(file);
      res.writeHead(200, { 'Content-Type': MIME[extname(file).toLowerCase()] || 'application/octet-stream', 'Content-Length': body.length });
      res.end(body);
    } catch {
      res.writeHead(500).end();
    }
  });
  return new Promise((ok) => server.listen(0, '127.0.0.1', () => ok(server)));
}

/** Scroll the page in steps so in-view animations and lazy images trigger. */
async function scrollThrough(page, { step = 500, delay = 120 } = {}) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += step) {
    await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: 'instant' }), y);
    await page.waitForTimeout(delay);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(400);
}

async function settle(page) {
  await page.waitForLoadState('load');
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await page.waitForTimeout(800);
}

async function capture(base) {
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });
  const browser = await chromium.launch();
  const files = [];

  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: vp.deviceScaleFactor, isMobile: vp.isMobile, hasTouch: vp.isMobile });
    const page = await ctx.newPage();
    for (const pg of PAGES) {
      await page.goto(base + pg.path);
      await settle(page);
      const top = join(outDir, `${pg.name}-${vp.name}-${vp.width}.png`);
      await page.screenshot({ path: top });
      await scrollThrough(page);
      const full = join(outDir, `${pg.name}-${vp.name}-${vp.width}-full.png`);
      await page.screenshot({ path: full, fullPage: true });
      files.push(top, full);
    }
    if (vp.isMobile) {
      // Mobile navigation state: open the menu if a toggle can be found.
      await page.goto(base + '/');
      await settle(page);
      const toggle = page.getByRole('button', { name: /menu/i }).first();
      const legacy = page.locator('#burger-menu2 a').first();
      const target = (await toggle.count()) ? toggle : legacy;
      if (await target.count()) {
        await target.click();
        await page.waitForTimeout(900);
        const f = join(outDir, `menu-${vp.name}-${vp.width}.png`);
        await page.screenshot({ path: f });
        files.push(f);
      }
    }
    await ctx.close();
  }

  // Walkthrough videos.
  for (const vp of VIEWPORTS) {
    const videoDir = join(outDir, `_video-${vp.name}`);
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1, isMobile: vp.isMobile, hasTouch: vp.isMobile,
      recordVideo: { dir: videoDir, size: { width: vp.width, height: vp.height } },
    });
    const page = await ctx.newPage();
    await page.goto(base + '/');
    await settle(page);
    await page.waitForTimeout(1200);
    const smooth = async (total, steps = 40) => {
      for (let i = 0; i < steps; i++) { await page.mouse.wheel(0, total / steps); await page.waitForTimeout(70); }
      await page.waitForTimeout(700);
    };
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let done = 0; done < h; done += vp.height * 0.9) await smooth(vp.height * 0.9, 24);
    await page.goto(base + '/about-us');
    await settle(page);
    await page.waitForTimeout(1000);
    const h2 = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let done = 0; done < h2; done += vp.height * 0.9) await smooth(vp.height * 0.9, 24);
    await page.waitForTimeout(800);
    const video = page.video();
    await ctx.close();
    const src = await video.path();
    const dest = join(outDir, `walkthrough-${vp.name}-${vp.width}.webm`);
    await rename(src, dest);
    await rm(videoDir, { recursive: true, force: true });
    files.push(dest);
  }

  await browser.close();
  return files;
}

const server = await startServer();
const { port } = server.address();
try {
  const entries = await readdir(root).catch(() => null);
  if (!entries) throw new Error(`Build directory not found: ${root}. Run "npm run build" first.`);
  const files = await capture(`http://127.0.0.1:${port}`);
  console.log(`Saved ${files.length} files to ${outDir}`);
  for (const f of files) console.log('  ' + f);
} finally {
  server.close();
}
