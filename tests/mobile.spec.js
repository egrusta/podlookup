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
  test.setTimeout(90_000); // Nine navigations at three mobile widths can exceed 30s on CI.
  for (const width of [320, 360, 390]) {
    await page.setViewportSize({ width, height: 844 });
    for (const route of ['/', '/?p=finder', '/?p=devices/uwell/caliburn-gz2']) {
      await page.goto(route);
      await expect(page.locator('main')).toBeVisible();
      const size = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        document: document.documentElement.scrollWidth,
        offenders: [...document.querySelectorAll('body *')].map(el => ({el, rect: el.getBoundingClientRect()})).filter(({el,rect}) => rect.right > document.documentElement.clientWidth + 1 && rect.width > 0 && getComputedStyle(el).position !== 'fixed').slice(0,12).map(({el,rect}) => ({tag:el.tagName, id:el.id, className:typeof el.className === 'string' ? el.className.slice(0,100) : '', right:Math.round(rect.right), width:Math.round(rect.width)}))
      }));
      expect(size.document, route + ' overflows at ' + width + 'px: ' + JSON.stringify(size.offenders)).toBeLessThanOrEqual(size.viewport);
    }
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
  await expect(page.locator('#geoView')).toContainText('Compatibility information currently unavailable.');
  await expect(page.locator('#geoView')).toContainText('Caliburn GZ2');
});
