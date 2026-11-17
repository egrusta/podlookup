#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const assert = require('node:assert/strict');
const html = fs.readFileSync('index.html', 'utf8');
const xml = fs.readFileSync('sitemap.xml', 'utf8');
const llms = fs.readFileSync('llms.txt', 'utf8');
const robots = fs.readFileSync('robots.txt', 'utf8');
const headers = fs.readFileSync('_headers', 'utf8');
assert.match(robots, /^User-agent: \\*$/m, 'Missing default crawler group');
assert.match(robots, /^Allow: \\/$/m, 'Default crawler access must remain enabled');
assert.match(robots, /^Sitemap: https:\/\/podlookup\\.co\\.uk\/sitemap\\.xml$/m,
  'robots.txt sitemap must use the canonical production URL');
for (const path of ['/robots.txt', '/sitemap.xml', '/llms.txt']) {
  assert(headers.includes(path + '\\n  Content-Type: '),
    'Missing explicit text or XML content type for ' + path);
}
assert.match(headers, /^  X-Content-Type-Options: nosniff$/m, 'Missing nosniff security header');

const slugs = [
  'caliburn-gz2', 'caliburn-gz2-cyber', 'caliburn-gk2',
  'caliburn-tenet', 'caliburn-tenet-koko', 'caliburn-x', 'caliburn-explorer'
];
assert.match(html, /^<!doctype html>/i, 'HTML document must have a doctype');
assert.match(html, /<meta name="viewport" content="width=device-width/, 'Mobile viewport missing');
const rows = [...html.matchAll(/data-ns-device="([^"]+)"/g)].map(x => x[1]);
assert.equal(rows.length, 57, 'Expected 57 static device records');
assert.equal(new Set(rows).size, rows.length, 'Duplicate static device row');
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(x => x[1]);
assert.equal(urls.length, 142, 'Expected 142 sitemap URLs');
assert.equal(new Set(urls).size, urls.length, 'Duplicate sitemap URLs');
// Reject malformed, off-domain, duplicate or future-dated sitemap entries.
assert.match(xml, /<urlset\b/, 'Missing sitemap urlset root');
const entries = [...xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>\s*<\/url>/g)];
assert.equal(entries.length, urls.length, 'Every sitemap URL must have a lastmod date');
const today = new Date().toISOString().slice(0, 10);
for (const [, url, lastmod] of entries) {
  assert(url === 'https://podlookup.co.uk/' || /^https:\/\/podlookup\.co\.uk\/\?p=[a-z0-9/-]+$/.test(url),
    'Noncanonical sitemap URL: ' + url);
  assert(/^\d{4}-\d{2}-\d{2}$/.test(lastmod) && !Number.isNaN(Date.parse(lastmod)) &&
    new Date(lastmod).toISOString().slice(0, 10) === lastmod && lastmod <= today,
    'Invalid or future sitemap lastmod: ' + url + ' ' + lastmod);
}
assert(urls.includes('https://podlookup.co.uk/'), 'Homepage missing from sitemap');

for (const slug of slugs) {
  assert(rows.includes('uwell/' + slug), 'Missing static device: ' + slug);
  assert(html.includes('device: "' + ({
    'caliburn-gz2':'Caliburn GZ2', 'caliburn-gz2-cyber':'Caliburn GZ2 Cyber',
    'caliburn-gk2':'Caliburn GK2', 'caliburn-tenet':'Caliburn Tenet',
    'caliburn-tenet-koko':'Caliburn Tenet KOKO', 'caliburn-x':'Caliburn X',
    'caliburn-explorer':'Caliburn Explorer'
  })[slug] + '"'), 'Missing MASTER record: ' + slug);
  for (const section of ['devices', 'compatibility'])
    assert(urls.includes('https://podlookup.co.uk/?p=' + section + '/uwell/' + slug),
      'Missing sitemap route: ' + section + '/' + slug);
  assert(llms.includes('?p=devices/uwell/' + slug), 'Missing LLM route: ' + slug);
}

// Every sitemap route must be reachable from at least one literal static HTML link.
// Also reject typo links to internal routes that are absent from the sitemap.
const sitemapRoutes = urls.filter(url => url.startsWith('https://podlookup.co.uk/?p='))
  .map(url => url.split('?p=')[1]);
const staticRoutes = [...html.matchAll(/\bhref=["']\??p=([^"'&#]+)["']/g)]
  .map(match => match[1]);
for (const route of sitemapRoutes)
  assert(staticRoutes.includes(route), 'Sitemap route lacks static HTML link: ' + route);
for (const route of staticRoutes)
  assert(sitemapRoutes.includes(route), 'Static HTML link missing from sitemap: ' + route);

// Guides must be discoverable from the initial HTML without running JavaScript.
const guideRoutes = urls.filter(url => url.includes('?p=guides/'));
for (const url of guideRoutes) {
  const route = url.split('?p=')[1];
  assert(html.includes('href="?p=' + route + '"'),
    'Guide missing crawlable HTML link: ' + route);
}
assert.match(html, /"UNKNOWN"/, 'UNKNOWN reference state missing');
console.log('PASS: 57 unique static devices, 142 unique sitemap URLs, seven legacy Caliburn routes.');
