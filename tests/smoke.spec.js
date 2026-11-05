const { test, expect } = require('@playwright/test');

test.describe('PodLookup basket and responsive regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('podlookup-cart'));
    await page.reload();
  });

  test('basket starts closed and the X button restores focus and scrolling', async ({ page }) => {
    const drawer = page.locator('#cartDrawer');
    const overlay = page.locator('#overlay');
    const opener = page.locator('#cartBtn');

    await expect(drawer).toBeHidden();
    await expect(overlay).toBeHidden();
    await expect(drawer).toHaveAttribute('aria-hidden', 'true');
    expect(await page.locator('body').evaluate(el => el.classList.contains('no-scroll'))).toBe(false);

    await opener.click();
    await expect(drawer).toBeVisible();
    await expect(overlay).toBeVisible();
    await expect(drawer).toHaveAttribute('aria-hidden', 'false');
    await expect(page.locator('#cartClose')).toBeFocused();
    expect(await page.locator('body').evaluate(el => el.classList.contains('no-scroll'))).toBe(true);

    await page.locator('#cartClose').click();
    await expect(drawer).toBeHidden();
    await expect(overlay).toBeHidden();
    await expect(drawer).toHaveAttribute('aria-hidden', 'true');
    await expect(opener).toBeFocused();
    expect(await page.locator('body').evaluate(el => el.classList.contains('no-scroll'))).toBe(false);
  });

  test('Escape and overlay click both close the basket', async ({ page }) => {
    const drawer = page.locator('#cartDrawer');
    const opener = page.locator('#cartBtn');

    await opener.click();
    await expect(drawer).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(drawer).toBeHidden();

    await opener.click();
    await expect(drawer).toBeVisible();
    await page.locator('#overlay').click({ position: { x: 10, y: 10 } });
    await expect(drawer).toBeHidden();
    await expect(page.locator('#overlay')).toBeHidden();
  });

  test('adding a product, changing quantity, clearing and reloading persist correctly', async ({ page }) => {
    await page.locator('[data-view="xros-5"]').first().click();
    await expect(page.locator('#modal')).toBeVisible();
    await page.locator('#modalContent [data-add]').click();

    const storedAfterAdd = await page.evaluate(() => localStorage.getItem('podlookup-cart'));
    expect(storedAfterAdd).toBeTruthy();

    // Adding from the product modal closes the modal and opens the basket automatically.
    await expect(page.locator('#modal')).toBeHidden();
    await expect(page.locator('#cartDrawer')).toBeVisible();
    await expect(page.locator('#cartBody [data-inc]')).toBeVisible();
    const subtotalBefore = await page.locator('#cartTotal').innerText();

    await page.locator('#cartBody [data-inc]').click();
    await expect.poll(() => page.locator('#cartTotal').innerText()).not.toBe(subtotalBefore);

    await page.locator('#cartBody [data-dec]').click();
    await page.reload();
    await expect(page.locator('#cartDrawer')).toBeHidden();
    expect(await page.evaluate(() => localStorage.getItem('podlookup-cart'))).toBeTruthy();

    await page.locator('#cartBtn').click();
    await expect(page.locator('#cartBody [data-inc]')).toBeVisible();
    await page.locator('#cartClear').click();
    await expect(page.locator('#cartBody')).toContainText('Your basket is empty');
    await expect.poll(async () => {
      const value = await page.evaluate(() => localStorage.getItem('podlookup-cart'));
      return !value || value === '[]' || value === '{}';
    }).toBe(true);
  });

  test('mobile navigation toggles and common phone widths have no horizontal overflow', async ({ page }) => {
    for (const width of [320, 360, 390]) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/');
      const dimensions = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        viewport: document.querySelector('meta[name="viewport"]')?.content
      }));
      expect(dimensions.viewport).toContain('width=device-width');
      expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
    }

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.locator('#navToggle').click();
    await expect(page.locator('#siteHeader')).toHaveClass(/nav-open/);
    await expect(page.locator('#navToggle')).toHaveAttribute('aria-expanded', 'true');
    await page.locator('#navToggle').click();
    await expect(page.locator('#siteHeader')).not.toHaveClass(/nav-open/);
    await expect(page.locator('#navToggle')).toHaveAttribute('aria-expanded', 'false');
  });

  test('new Caliburn routes expose unique metadata and model-specific content', async ({ page }) => {
    const routes = [
      ['devices/uwell/caliburn-air', 'Caliburn Air'],
      ['compatibility/uwell/caliburn-air-r', 'Caliburn Air R'],
      ['devices/uwell/caliburn-a2', 'Caliburn A2'],
      ['compatibility/uwell/caliburn-a2s', 'Caliburn A2S'],
      ['devices/uwell/caliburn-ak2', 'Caliburn AK2'],
      ['compatibility/uwell/caliburn-a3s', 'Caliburn A3S'],
      ['devices/uwell/caliburn-ak3', 'Caliburn AK3'],
      ['compatibility/uwell/caliburn-az3', 'Caliburn AZ3']
    ];
    const titles = [];
    const descriptions = [];

    for (const [route, model] of routes) {
      await page.goto('/?p=' + route);
      titles.push(await page.title());
      descriptions.push(await page.locator('meta[name="description"]').getAttribute('content'));
      await expect(page.locator('main')).toContainText(model);
    }

    expect(new Set(titles).size).toBe(routes.length);
    expect(new Set(descriptions).size).toBe(routes.length);
    expect(descriptions.every(Boolean)).toBe(true);
  });

  test('static fallback inventory and SEO files stay complete', async ({ page, request }) => {
    await page.goto('/');
    const fallback = await page.evaluate(() => {
      const source = document.querySelector('#geoNoscript');
      const doc = new DOMParser().parseFromString(source?.textContent || '', 'text/html');
      return {
        devices: doc.querySelectorAll('[data-ns-device]').length,
        platforms: doc.querySelectorAll('[data-ns-platform]').length,
        uwell: doc.querySelectorAll('[data-ns-device^="uwell/"]').length
      };
    });
    expect(fallback).toEqual({ devices: 50, platforms: 8, uwell: 31 });

    const robots = await request.get('/robots.txt');
    expect(robots.ok()).toBeTruthy();
    expect(robots.headers()['content-type']).toContain('text/plain');
    expect(await robots.text()).toContain('Sitemap: https://podlookup.co.uk/sitemap.xml');

    const sitemap = await request.get('/sitemap.xml');
    expect(sitemap.ok()).toBeTruthy();
    expect(sitemap.headers()['content-type']).toMatch(/xml/);
    const xml = await sitemap.text();
    const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
    expect(locs.length).toBe(115);
    expect(new Set(locs).size).toBe(115);
  });

  test('OXVA XLIM C has a separate cartridge-and-coil compatibility system', async ({ page }) => {
    await page.goto('/?p=devices/oxva/xlim-c');
    await expect(page.locator('main')).toContainText('Xlim C');
    await expect(page.locator('main')).toContainText('0.6Ω');
    await expect(page.locator('main')).toContainText('0.8Ω');
    await expect(page.locator('main')).toContainText('1.2Ω');

    await page.goto('/?p=compatibility/oxva/xlim-c');
    await expect(page.locator('main')).toContainText('XLIM C');
    await expect(page.locator('main')).toContainText('separate');

    await page.goto('/?p=platforms/xlim-c-cartridge-coil-system');
    await expect(page.locator('main')).toContainText('Xlim C');
    await expect(page.locator('main')).toContainText('2 ml');
    await expect(page.locator('main')).toContainText('replaceable');
  });

  test('no uncaught JavaScript page errors on the home and platform routes', async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/');
    await page.goto('/?p=platforms/caliburn-a2-pods');
    await page.goto('/?p=platforms/caliburn-gpp-pods');
    expect(errors).toEqual([]);
  });
});


test.describe('PodLookup SEO publication regression', () => {
  test('LLM reference is public, complete and accurately labels the demo storefront', async ({ request }) => {
    const response = await request.get('/llms.txt');
    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toMatch(/text\/plain|text\/markdown/);

    const content = await response.text();
    const deviceLinks = [...content.matchAll(/^- \[[^\]]+\]\(https:\/\/podlookup\.co\.uk\/\?p=devices\//gm)];
    expect(deviceLinks).toHaveLength(50);
    expect(content).toContain('UNKNOWN means the available evidence does not establish compatibility');
    expect(content).toMatch(/storefront as a demo/i);
    expect(content).toMatch(/no orders are placed/i);
    expect(content).toContain('Caliburn GPP Pods');
  });

  test('sitemap entries are unique and have a last-modified date', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    expect(response.ok()).toBeTruthy();
    const xml = await response.text();
    const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(match => match[1]);
    const urls = entries.map(entry => entry.match(/<loc>(.*?)<\/loc>/)?.[1]);

    expect(entries).toHaveLength(115);
    expect(new Set(urls).size).toBe(115);
    expect(entries.every(entry => /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/.test(entry))).toBe(true);
  });

  test('unknown routes are explicitly noindexed and explain missing data', async ({ page }) => {
    await page.goto('/?p=__podlookup-regression-unknown-route__');
    await expect(page).toHaveTitle('Information currently unavailable | PodLookup');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', 'That device or platform is not in the PodLookup compatibility data.');
  });
});


test.describe('PodLookup browser-console cleanliness', () => {
  test('home and representative routes emit no console errors or warnings', async ({ page }) => {
    const messages = [];
    page.on('console', msg => {
      if (['error', 'warning'].includes(msg.type())) messages.push({ type: msg.type(), text: msg.text() });
    });
    page.on('pageerror', error => messages.push({ type: 'pageerror', text: error.message }));

    for (const route of ['/', '/?p=platforms/caliburn-a2-pods', '/?p=platforms/caliburn-gpp-pods', '/?p=devices/oxva/xlim-c']) {
      await page.goto(route);
    }

    expect(messages, messages.map(m => '[' + m.type + '] ' + m.text).join('\\n')).toEqual([]);
  });
});

test.describe('PodLookup demo storefront trust copy', () => {
  test('delivery banner does not promise a live shipping service', async ({ page }) => {
    await page.goto('/');
    const announcement = page.locator('.announce');
    await expect(announcement).toContainText('Demo only');
    await expect(announcement).toContainText('delivery terms are illustrative');
    await expect(announcement).not.toContainText('Free UK delivery');
    await expect(announcement).toContainText('Demo storefront — no orders are placed');
  });
});


test.describe('PodLookup complete device-route coverage', () => {
  test('every device in the reference table has working device and compatibility pages', async ({ page }) => {
    test.setTimeout(120000);
    await page.goto('/');
    const routes = await page.evaluate(() => {
      const source = document.querySelector('#geoNoscript');
      const doc = new DOMParser().parseFromString(source?.textContent || '', 'text/html');
      return [...doc.querySelectorAll('tr[data-ns-device]')].map(row => {
        const links = [...row.querySelectorAll('a[href]')];
        return {
          device: row.cells[1]?.textContent.trim() || '',
          deviceHref: links.find(link => link.getAttribute('href')?.includes('?p=devices/'))?.getAttribute('href') || '',
          compatibilityHref: links.find(link => link.getAttribute('href')?.includes('?p=compatibility/'))?.getAttribute('href') || ''
        };
      });
    });

    expect(routes).toHaveLength(50);
    for (const route of routes) {
      expect(route.device).toBeTruthy();
      expect(route.deviceHref).toContain('?p=devices/');
      expect(route.compatibilityHref).toContain('?p=compatibility/');

      for (const href of [route.deviceHref, route.compatibilityHref]) {
        const response = await page.goto('/' + href);
        expect(response?.ok(), href + ' should load successfully').toBeTruthy();
        await expect(page.locator('main'), href + ' should show the correct model').toContainText(route.device);
        await expect(page.locator('meta[name="description"]')).not.toHaveAttribute('content', '');
        await expect(page.locator('title')).not.toContainText('Information currently unavailable');
      }
    }
  });
});
