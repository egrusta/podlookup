// Reproducible lab measurements; not field Core Web Vitals or Search Console data.
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { chromium } = require('playwright');
const dir = path.resolve('quality-reports');
fs.mkdirSync(dir, { recursive: true });
const targets = [
  ['local-home-mobile', 'http://127.0.0.1:4173/', false],
  ['local-home-desktop', 'http://127.0.0.1:4173/', true],
  ['local-about-mobile', 'http://127.0.0.1:4173/?p=about', false],
  ['production-about-mobile', 'https://podlookup.co.uk/?p=about', false]
];
const summaries = [];
for (const [name, url, desktop] of targets) {
  const output = path.join(dir, name + '.json');
  const args = ['node_modules/lighthouse/cli/index.js', url, '--output=json', '--output-path=' + output,
    '--chrome-flags=--headless --no-sandbox --disable-dev-shm-usage', '--quiet'];
  if (desktop) args.push('--preset=desktop');
  const run = spawnSync(process.execPath, args, { encoding: 'utf8', timeout: 180000,
    env: { ...process.env, CHROME_PATH: chromium.executablePath() } });
  if (run.status !== 0 || !fs.existsSync(output)) {
    summaries.push({ name, url, error: (run.error?.message || run.stderr || 'Lighthouse failed').slice(-1500) });
    process.exitCode = 1;
    continue;
  }
  const r = JSON.parse(fs.readFileSync(output, 'utf8'));
  if (r.runtimeError) process.exitCode = 1;
  summaries.push({ name, requestedUrl: r.requestedUrl, finalDisplayedUrl: r.finalDisplayedUrl,
    fetchedAt: r.fetchTime, lighthouseVersion: r.lighthouseVersion,
    runtimeError: r.runtimeError || null, warnings: r.runWarnings,
    scores: Object.fromEntries(Object.entries(r.categories).map(([key, value]) => [key, value.score])),
    metrics: Object.fromEntries(['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift']
      .map(key => [key, r.audits[key]?.numericValue])),
    findings: Object.entries(r.audits).filter(([,a]) => a.score !== null && a.score < 1)
      .map(([id,a]) => ({ id, title: a.title, score: a.score, displayValue: a.displayValue,
        details: Array.isArray(a.details?.items) ? a.details.items.slice(0,5) : undefined }))
  });
}
fs.writeFileSync(path.join(dir, 'summary.json'), JSON.stringify(summaries, null, 2));
console.log(JSON.stringify(summaries, null, 2));
