const { test, expect } = require('@playwright/test');

test('demonstration structured data does not publish purchasable offers', async ({ page }) => {
  await page.goto('/');
  const schema = await page.locator('#product-schema').textContent();
  const catalogue = JSON.parse(schema);
  expect(catalogue.itemListElement.length).toBeGreaterThan(0);
  for (const entry of catalogue.itemListElement) {
    expect(entry.item.offers).toBeUndefined();
    expect(entry.item.name).toBeTruthy();
  }
});

test('reference finder preserves exact model restrictions in both directions', async ({ page }) => {
  await page.goto('/?p=finder');
  await page.locator('#podFinderDevice').selectOption('oxva|xlim-pro-2');
  await expect(page.locator('#podFinderResult')).toContainText('does not confirm that particular variant');
  const options = page.locator('#podFinderPlatform option:not([value=""])');
  for (const text of await options.allTextContents()) {
    expect(text).toMatch(/^(Vaporesso|OXVA|Uwell) — \S/);
  }
  await page.locator('#podFinderPlatform').selectOption('xlim-pods');
  await page.locator('#podFinderResistance').selectOption('0.4Ω');
  await expect(page.locator('#podFinderResult')).toContainText('OXVA Xlim Pods');
  await expect(page.locator('#podFinderResult')).toContainText('does not verify a particular cartridge variant');
  await expect(page.locator('#podFinderResult')).toContainText('does not confirm that particular variant');
  await expect(page.locator('#geoView')).not.toContainText('same platform means same pods');
});

test('XROS 5 Mini record does not claim different battery size as its only difference', async ({ page }) => {
  await page.goto('/?p=finder');
  await page.locator('#podFinderDevice').selectOption('vaporesso|xros-5-mini');
  await expect(page.locator('#podFinderResult')).toContainText('does not imply identical device specifications');
  await expect(page.locator('#podFinderResult')).not.toContainText('only difference is battery size');
});
