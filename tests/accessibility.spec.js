const { test, expect } = require('@playwright/test');

test('privacy copy matches the removed email signup', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-info="privacy"]').click();
  await expect(page.locator('#modalContent')).not.toContainText('basket and email signup');
  await expect(page.locator('#modalContent')).toContainText('does not collect email addresses');
});

test('information dialog has a name, traps focus and restores its opener', async ({ page }) => {
  await page.goto('/');
  const opener = page.locator('[data-info="privacy"]');
  await opener.click();
  const modal = page.getByRole('dialog', { name: 'Privacy', exact: true });
  await expect(modal).toBeVisible();
  await expect(page.locator('#modalClose')).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(modal.locator('a').last()).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('#modalClose')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(modal).toBeHidden();
  await expect(opener).toBeFocused();
});

test('Escape from mobile navigation restores focus to the menu button', async ({ page }) => {
  await page.setViewportSize({width: 390, height: 844});
  await page.goto('/');
  await page.locator('#navToggle').click();
  await page.locator('#navSearch').focus();
  await page.keyboard.press('Escape');
  await expect(page.locator('#navToggle')).toBeFocused();
  await expect(page.locator('#navToggle')).toHaveAttribute('aria-expanded', 'false');
});

test('home section navigation clears the previous route and survives reload', async ({ page }) => {
  await page.goto('/?p=about');
  await page.locator('#primaryNav a[href="#guides"]').click();
  await expect(page).toHaveURL(/\/#guides$/);
  await expect(page.locator('#homeView')).toBeVisible();
  await page.reload();
  await expect(page.locator('#homeView')).toBeVisible();
  await expect(page.locator('#geoView')).toBeHidden();
  await page.goBack();
  await expect(page).toHaveURL(/\?p=about$/);
  await expect(page.locator('#geoView')).toBeVisible();
});

test('skip link keeps the current reference page', async ({ page }) => {
  await page.goto('/?p=about');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#geoView')).toBeVisible();
  await expect(page.locator('#main')).toBeFocused();
});

test('unknown route metadata is cleared when returning home', async ({ page }) => {
  await page.goto('/?p=does-not-exist');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  await page.locator('#siteHeader .brand').click();
  await expect(page).toHaveURL(/\/#top$/);
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', new URL('/', page.url()).href);
});
