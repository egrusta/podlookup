const { chromium } = require("playwright");
const assert = require("node:assert/strict");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const pageErrors = [];
  const consoleIssues = [];
  page.on("pageerror", error => pageErrors.push(error.message));
  page.on("console", msg => {
    if (["error", "warning"].includes(msg.type()))
      consoleIssues.push({ type: msg.type(), text: msg.text() });
  });

  try {
    await page.goto(process.env.BASE_URL || "http://127.0.0.1:4173/", { waitUntil: "domcontentloaded" });
    await page.evaluate(() => {
      try { localStorage.removeItem("podlookup-cart"); } catch (_) {}
    });
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1200);

    const initial = await page.evaluate(() => ({
      viewport: document.querySelector('meta[name="viewport"]')?.content || "",
      drawerHidden: document.querySelector("#cartDrawer")?.hidden,
      overlayHidden: document.querySelector("#overlay")?.hidden,
      ariaHidden: document.querySelector("#cartDrawer")?.getAttribute("aria-hidden"),
      noScroll: document.body.classList.contains("no-scroll")
    }));
    assert.match(initial.viewport, /width=device-width/);
    assert.equal(initial.drawerHidden, true, "basket must start closed");
    assert.equal(initial.overlayHidden, true, "overlay must start hidden");
    assert.equal(initial.ariaHidden, "true");
    assert.equal(initial.noScroll, false);

    await page.locator("#cartBtn").click();
    await page.waitForTimeout(100);
    assert.equal(await page.locator("#cartDrawer").evaluate(el => el.hidden), false);
    assert.equal(await page.locator("#overlay").evaluate(el => el.hidden), false);
    assert.equal(await page.locator("#cartDrawer").getAttribute("aria-hidden"), "false");
    assert.equal(await page.locator("body").evaluate(el => el.classList.contains("no-scroll")), true);

    await page.locator("#cartClose").click();
    await page.waitForTimeout(100);
    assert.equal(await page.locator("#cartDrawer").evaluate(el => el.hidden), true);
    assert.equal(await page.locator("#overlay").evaluate(el => el.hidden), true);
    assert.equal(await page.locator("body").evaluate(el => el.classList.contains("no-scroll")), false);
    assert.equal(await page.evaluate(() => document.activeElement?.id), "cartBtn");

    await page.locator("#cartBtn").click();
    await page.keyboard.press("Escape");
    await page.waitForTimeout(100);
    assert.equal(await page.locator("#cartDrawer").evaluate(el => el.hidden), true, "Escape must close basket");

    await page.locator("#cartBtn").click();
    await page.locator("#overlay").click({ position: { x: 10, y: 10 } });
    await page.waitForTimeout(100);
    assert.equal(await page.locator("#cartDrawer").evaluate(el => el.hidden), true, "overlay click must close basket");

    // Add a known catalogue item through its real product-detail modal.
    await page.locator('[data-view="xros-5"]').first().click();
    await page.waitForTimeout(100);
    assert.equal(await page.locator("#modal").evaluate(el => el.hidden), false);
    await page.locator("#modalContent [data-add]").click();
    await page.waitForTimeout(150);
    const storedAfterAdd = await page.evaluate(() => localStorage.getItem("podlookup-cart"));
    assert.ok(storedAfterAdd, "adding an item must persist cart state");

    // Adding from the product modal intentionally opens the basket.
    // Assert that state instead of clicking the header button underneath the open drawer.
    assert.equal(await page.locator("#cartDrawer").evaluate(el => el.hidden), false, "adding from the modal must open the basket");
    assert.ok(await page.locator("#cartBody [data-inc]").count(), "cart line must expose increment control");
    assert.ok(await page.locator("#cartBody [data-dec]").count(), "cart line must expose decrement control");
    const before = await page.locator("#cartBody").innerText();
    await page.locator("#cartBody [data-inc]").click();
    await page.waitForTimeout(100);
    const afterIncrement = await page.locator("#cartBody").innerText();
    assert.notEqual(afterIncrement, before, "increment must update cart line");
    await page.locator("#cartBody [data-dec]").click();
    await page.waitForTimeout(100);
    await page.locator("#cartClear").click();
    await page.waitForTimeout(100);
    assert.equal(await page.evaluate(() => localStorage.getItem("podlookup-cart")), "[]", "clear cart must clear persisted items");
    await page.locator("#cartClose").click();

    // Persistence: add again, reload, and confirm the item count remains.
    await page.locator('[data-view="xros-5"]').first().click();
    await page.waitForTimeout(100);
    await page.locator("#modalContent [data-add]").click();
    await page.waitForTimeout(100);
    const beforeReload = await page.evaluate(() => localStorage.getItem("podlookup-cart"));
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1200);
    const afterReload = await page.evaluate(() => ({
      stored: localStorage.getItem("podlookup-cart"),
      drawerHidden: document.querySelector("#cartDrawer")?.hidden,
      cartLabel: document.querySelector("#cartBtn")?.innerText
    }));
    assert.equal(afterReload.stored, beforeReload, "cart must persist across reload");
    assert.equal(afterReload.drawerHidden, true, "persisted cart must not force drawer open");

    // Mobile menu and no horizontal overflow at common narrow widths.
    for (const width of [320, 360, 390]) {
      await page.setViewportSize({ width, height: 800 });
      await page.waitForTimeout(80);
      const dimensions = await page.evaluate(() => ({
        client: document.documentElement.clientWidth,
        scroll: document.documentElement.scrollWidth
      }));
      assert.ok(dimensions.scroll <= dimensions.client + 1, `horizontal overflow at ${width}px: ${JSON.stringify(dimensions)}`);
    }
    await page.locator("#navToggle").click();
    assert.equal(await page.locator("#navToggle").getAttribute("aria-expanded"), "true");
    await page.locator("#navToggle").click();
    assert.equal(await page.locator("#navToggle").getAttribute("aria-expanded"), "false");

    // Desktop navigation and basket remain usable.
    await page.setViewportSize({ width: 1365, height: 900 });
    await page.waitForTimeout(100);
    await page.locator("#cartBtn").click();
    assert.equal(await page.locator("#cartDrawer").evaluate(el => el.hidden), false);
    await page.locator("#cartClose").click();
    assert.equal(await page.locator("#cartDrawer").evaluate(el => el.hidden), true);

    // Audit the current reference routes in a real browser. Do not suppress
    // data-integrity diagnostics: errors and warnings must be fixed at source.
    const baseUrl = process.env.BASE_URL || "http://127.0.0.1:4173/";
    for (const route of [
      "/",
      "/?p=platforms/caliburn-a2-pods",
      "/?p=platforms/caliburn-gpp-pods",
      "/?p=devices/oxva/xlim-c",
      "/?p=guides/which-pod",
      "/?p=guides/xlim-pods"
    ]) {
      await page.goto(new URL(route, baseUrl).toString(), { waitUntil: "domcontentloaded" });
      await page.locator("main").waitFor({ state: "visible" });
      await page.waitForTimeout(250);
    }

    await page.goto(new URL("/?p=devices/oxva/xlim-c", baseUrl).toString(), { waitUntil: "domcontentloaded" });
    await page.waitForFunction(() => {
      const view = document.querySelector("#geoView");
      return view && !view.hidden && view.textContent.includes("Replaceable coil resistance options");
    });
    const xlimCText = (await page.locator("#geoView").textContent() || "").replace(/\\s+/g, "");
    for (const resistance of ["0.6Ω", "0.8Ω", "1.2Ω"])
      assert.ok(xlimCText.includes(resistance), "XLIM C must show replaceable coil resistance " + resistance + "; page text: " + xlimCText.slice(-1200));

    await page.goto(new URL("/?p=guides/xlim-pods", baseUrl).toString(), { waitUntil: "domcontentloaded" });
    await page.locator("#geoView").waitFor({ state: "visible" });
    const xlimGuideLinks = await page.locator("#geoView a[href]").evaluateAll(links => links.map(a => a.getAttribute("href") || ""));
    assert.ok(!xlimGuideLinks.some(href => href.includes("/undefined")), "XLIM guide must not contain undefined links");
    assert.ok(xlimGuideLinks.some(href => /devices\/oxva\/xlim-c$/.test(href)), "XLIM guide must link to the separate XLIM C device page");

    await page.goto(new URL("/?p=platforms/xlim-pods", baseUrl).toString(), { waitUntil: "domcontentloaded" });
    await page.locator("#geoView").waitFor({ state: "visible" });
    const standardXlimLinks = await page.locator("#geoView a[href]").evaluateAll(links => links.map(a => a.getAttribute("href") || ""));
    assert.ok(!standardXlimLinks.some(href => /(?:devices|compatibility)\/oxva\/xlim-c$/.test(href)), "standard XLIM Pods must not list XLIM C as a compatible device");

    assert.deepEqual(pageErrors, [], "page must not emit uncaught JavaScript errors");
    assert.deepEqual(consoleIssues, [], "reference routes must not emit console errors or warnings");
    console.log("PASS: basket/mobile/desktop regression, XLIM C data and links, and clean reference-route console diagnostics.");
  } finally {
    await browser.close();
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
