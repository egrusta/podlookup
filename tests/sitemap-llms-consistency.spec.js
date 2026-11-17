const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');

test('sitemap URLs are unique and llms device links are indexed', () => {
  const root = path.resolve(__dirname, '..');
  const xml = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
  const llms = fs.readFileSync(path.join(root, 'llms.txt'), 'utf8');
  const sitemapUrls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1].replace(/&amp;/g, '&'));
  expect(sitemapUrls.length).toBeGreaterThan(0);
  expect(new Set(sitemapUrls).size).toBe(sitemapUrls.length);
  const urls = new Set(sitemapUrls);
  const deviceLinks = [...llms.matchAll(/https:\/\/podlookup\.co\.uk\/\?p=devices\/[a-z0-9/-]+/g)].map(match => match[0]);
  expect(deviceLinks.length).toBeGreaterThan(0);
  for (const link of deviceLinks) expect(urls.has(link), `Missing sitemap device URL: ${link}`).toBe(true);
  for (const url of sitemapUrls) {
    expect(url.startsWith('https://podlookup.co.uk/')).toBe(true);
    expect(url.includes('#')).toBe(false);
  }
});
