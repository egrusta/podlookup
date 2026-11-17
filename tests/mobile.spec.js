const { test, expect } = require('@playwright/test');

// Dedicated mobile checks run in a real Chromium mobile context in GitHub Actions.
// A desktop browser resized to 390px is not equivalent to touch/mobile emulation.
test.use({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
  deviceScaleFactor: 2
});

test('mobile homepage and finder have no document-level horizontal overflow', async ({ page }) => {
  for (const route of ['/', '/?p=finder', '/?p=devices/uwell/caliburn-gz2']) {
    await page.goto(route);
    await expect(page.locator('main')).toBeVisible();
    const size = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth
    }));
    expect(size.document, route + ' overflows at 390px').toBeLessThanOrEqual(size.viewport);
  }
});

test('mobile navigation, basket close, and scroll lock work', async ({ page }) => {
  await page.goto('/');
  const toggle = page.locator('#navToggle');
  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');

  const cart = page.locator('#cartDrawer');
  await page.locator('#cartBtn').click();
  await expect(cart).toBeVisible();
  await expect(cart).toHaveAttribute('aria-hidden', 'false');
  await page.locator('#cartClose').click();
  await expect(cart).toBeHidden();
  await expect(cart).toHaveAttribute('aria-hidden', 'true');
  expect(await page.locator('body').evaluate(el => el.classList.contains('no-scroll'))).toBe(false);
});

test('legacy Caliburn mobile compatibility page does not invent pod fit', async ({ page }) => {
  await page.goto('/?p=compatibility/uwell/caliburn-gz2');
  await expect(page.locator('#geoView')).toBeVisible();
  await expect(page.locator('#geoView')).toContainText('UNKNOWN');
  await expect(page.locator('#geoView')).toContainText('Caliburn GZ2');
});
