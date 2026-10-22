// usage: node render_sketch.js page.html outdir [ids...]  -> screenshots .plate elements with handwritten font + grayscale
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const [,, page, outdir, ...only] = process.argv;
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' }).catch(async () => chromium.launch());
  const ctx = await browser.newContext({ deviceScaleFactor: 2, viewport: { width: 1700, height: 1200 } });
  const p = await ctx.newPage();
  await p.goto('file://' + path.resolve(page));
  await p.addStyleTag({ content: `
    text, tspan, .plate, .plate * { font-family: 'Aref Ruqaa', 'Amiri', serif !important; }
    .plate { filter: grayscale(1) contrast(1.15); }
  ` });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(500);
  let ids = await p.$$eval('.plate', els => els.map(e => e.id));
  if (only.length) ids = ids.filter(i => only.includes(i));
  for (const id of ids) {
    const el = await p.$('#' + id);
    await el.screenshot({ path: path.join(outdir, id + '.png') });
    console.log('rendered', id);
  }
  await browser.close();
})();
