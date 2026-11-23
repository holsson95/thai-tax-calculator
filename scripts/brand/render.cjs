// Renders the favicon PNGs and the link-preview image from their sources.
// Needs Playwright (not a project dependency): NODE_PATH=<dir with playwright> node scripts/brand/render.cjs
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const root = path.resolve(__dirname, '../..');
(async () => {
  const b = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
  const og = await b.newPage({ viewport: { width: 1200, height: 630 } });
  await og.goto('file://' + path.join(__dirname, 'og-image.html'));
  await og.evaluate(() => document.fonts.ready);
  await og.screenshot({ path: path.join(root, 'public/og-image.png') });
  for (const [size, name] of [[32, 'favicon-32.png'], [180, 'apple-touch-icon.png']]) {
    const p = await b.newPage({ viewport: { width: size, height: size } });
    const svg = fs.readFileSync(path.join(root, 'public/favicon.svg'), 'utf8')
      .replace('<svg ', `<svg width="${size}" height="${size}" style="display:block" `);
    await p.setContent(`<html><body style="margin:0">${svg}</body></html>`);
    await p.screenshot({ path: path.join(root, 'public', name) });
  }
  await b.close();
})();
