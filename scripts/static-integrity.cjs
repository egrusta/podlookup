#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const assert = require('node:assert/strict');
const html = fs.readFileSync('index.html', 'utf8');
const xml = fs.readFileSync('sitemap.xml', 'utf8');
const llms = fs.readFileSync('llms.txt', 'utf8');
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

// Guides must be discoverable from the initial HTML without running JavaScript.
const guideRoutes = urls.filter(url => url.includes('?p=guides/'));
for (const url of guideRoutes) {
  const route = url.split('?p=')[1];
  assert(html.includes('href="?p=' + route + '"'),
    'Guide missing crawlable HTML link: ' + route);
}
assert.match(html, /"UNKNOWN"/, 'UNKNOWN reference state missing');
console.log('PASS: 57 unique static devices, 142 unique sitemap URLs, seven legacy Caliburn routes.');
