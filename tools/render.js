// usage: node render.js page.html outdir  -> screenshots every element with class "plate"
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const [,, page, outdir] = process.argv;
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' }).catch(async () => chromium.launch());
  const ctx = await browser.newContext({ deviceScaleFactor: 2, viewport: { width: 1700, height: 1200 } });
  const p = await ctx.newPage();
  await p.goto('file://' + path.resolve(page));
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(400);
  const ids = await p.$$eval('.plate', els => els.map(e => e.id));
  for (const id of ids) {
    const el = await p.$('#' + id);
    await el.screenshot({ path: path.join(outdir, id + '.png') });
    console.log('rendered', id);
  }
  await browser.close();
})();
