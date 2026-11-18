'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { JSDOM } = require('jsdom');

// Use the same router and catalogue that produce the interactive pages.
// Data is committed so Pages can deploy with its existing empty build command.
async function main() {
  const origin = 'https://podlookup.co.uk/';
  const output = 'data/route-pages.json';
  const sitemap = new JSDOM(fs.readFileSync('sitemap.xml', 'utf8'), { contentType: 'application/xml' });
  const paths = [...sitemap.window.document.querySelectorAll('loc')]
    .map(el => new URL(el.textContent).searchParams.get('p')).filter(Boolean).sort();
  sitemap.window.close();

  const dom = new JSDOM(fs.readFileSync('index.html', 'utf8'), {
    url: origin,
    runScripts: 'dangerously',
    pretendToBeVisual: true,
    beforeParse(window) { window.scrollTo = () => {}; }
  });
  const { window } = dom;
  const { document } = window;
  await new Promise(resolve => window.addEventListener('load', resolve, { once: true }));

  // Keep full-catalogue diagnostics in every build check, off the visitor's startup path.
  assert.deepEqual(Array.from(window.__geoAudit.errors), [], 'Entity integrity audit');
  assert.deepEqual(Array.from(window.__masterDatasetAuditResult.errors), [], 'Catalogue integrity audit');

  function render(path) {
    window.history.replaceState(null, '', '?p=' + path);
    window.dispatchEvent(new window.PopStateEvent('popstate'));
    const view = document.querySelector('#geoView');
    const heading = view.querySelector('h1')?.textContent.trim();
    const description = document.querySelector('meta[name="description"]').content;
    const intro = (view.querySelector('.geo-answer p') || view.querySelector('article p'))?.textContent.trim() || description;
    const canonical = document.querySelector('link[rel="canonical"]')?.href;
    assert(heading && document.title && description && intro && !view.hidden, 'Incomplete route ' + path);
    return { canonical, page: { title: document.title, description, heading, intro } };
  }

  const pages = {};
  const families = new Set();
  for (const path of paths) {
    const { canonical, page } = render(path);
    assert.equal(canonical, origin + '?p=' + path, path);
    pages[path] = page;
    if (path.startsWith('devices/')) {
      const row = [...document.querySelectorAll('#geoView tr')].find(tr => tr.cells[0]?.textContent === 'Device family');
      const family = row?.cells[1]?.textContent.trim();
      assert(family, 'Missing device family on ' + path);
      families.add(path.split('/')[1] + '/' + family.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
    }
  }
  const aliases = {};
  for (const family of [...families].sort()) {
    for (const section of ['devices/', 'compatibility/']) {
      const alias = section + family;
      if (Object.hasOwn(pages, alias)) continue;
      const target = new URL(render(alias).canonical).searchParams.get('p');
      assert(Object.hasOwn(pages, target), 'Missing canonical target for ' + alias);
      aliases[alias] = target;
    }
  }
  const missing = render('unlisted-reference-route');
  assert.equal(missing.canonical, undefined);
  assert.match(document.querySelector('meta[name="robots"]').content, /noindex/);
  window.close();
  const json = JSON.stringify({ pages, aliases, missing: missing.page }, null, 2) + '\n';
  if (process.argv.includes('--check')) {
    assert.equal(fs.readFileSync(output, 'utf8'), json, 'Regenerate route pages with npm run generate:routes');
  } else {
    fs.mkdirSync('data', { recursive: true });
    fs.writeFileSync(output, json);
  }
  console.log(paths.length + ' reference pages and ' + Object.keys(aliases).length + ' legacy aliases verified.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
