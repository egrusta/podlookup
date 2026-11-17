const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');

const models = [
  'caliburn-gz2', 'caliburn-gz2-cyber', 'caliburn-gk2',
  'caliburn-tenet', 'caliburn-tenet-koko', 'caliburn-x', 'caliburn-explorer'
];

test('legacy Caliburn references have static fallback links, sitemap entries and UNKNOWN pod fit', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const sitemap = fs.readFileSync(path.join(__dirname, '..', 'sitemap.xml'), 'utf8');
  const llms = fs.readFileSync(path.join(__dirname, '..', 'llms.txt'), 'utf8');
  for (const slug of models) {
    expect(html).toContain('data-ns-device="uwell/' + slug + '"');
    expect(sitemap).toContain('?p=devices/uwell/' + slug + '</loc>');
    expect(sitemap).toContain('?p=compatibility/uwell/' + slug + '</loc>');
    expect(llms).toContain('?p=devices/uwell/' + slug + ')');
  }
  expect((sitemap.match(/<loc>/g) || []).length).toBe(142);
});

test('new legacy routes render without asserting a verified pod platform', async ({ page }) => {
  for (const slug of models) {
    for (const section of ['devices', 'compatibility']) {
      await page.goto('/?p=' + section + '/uwell/' + slug);
      await expect(page.locator('#geoView')).toBeVisible();
      await expect(page.locator('#geoView')).toContainText('UNKNOWN');
    }
  }
});
