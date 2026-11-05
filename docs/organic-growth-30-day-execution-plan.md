# PodLookup — 30-day organic growth execution plan

**Planning window:** 30 days from approval  
**Primary outcome:** reach a seven-day rolling average of **100 real, unique visitors per day** by Day 30. This is a stretch target, not a forecast or guarantee. The current verified baseline must be measured before progress can be calculated.

## 1. Growth rules

PodLookup is an information and compatibility reference first. Growth work must preserve that purpose.

- Publish factual, model-specific information on PodLookup's own website.
- Explain the evidence behind each device-to-pod relationship and retain `UNKNOWN` when the source record does not establish a fit.
- Separate device-supported resistance from pod-available resistance.
- Keep each page useful without requiring a purchase or email signup.
- Do not buy traffic, use click farms, generate fake visits, or count bots, uptime checks, or staff testing as visitors.
- Do not use paid search, paid social, influencer placements, affiliate promotions, promotional email, giveaways, or discount-led campaigns for vape products.
- Do not publish health, safety, cessation, superiority, "best", or unsupported comparative claims.
- Do not make product compatibility claims based only on a shared brand, family name, appearance, or resistance value.

## 2. UK advertising and retail guardrails

This plan is intentionally limited to factual, non-promotional information on PodLookup's own site.

- CAP/ASA guidance says factual product information may appear on a marketer's own website in scope, but promotional descriptions, comparative claims, health claims, testimonials and market-leading claims are likely to be prohibited. Each page must be assessed in its full context; this plan is not legal advice.
- Rule 22.12 restricts marketing communications promoting nicotine-containing e-cigarettes and components in most online and electronic media, including paid search and paid social.
- From 29 October 2026, UK age-of-sale rules cover all vaping and nicotine products at 18+, and promotional free distribution and substantial discounts are restricted.
- The Government has stated its intention for wider advertising and sponsorship restrictions to take effect from 1 June 2027. Re-check the law and guidance before any future commercial or promotional activity.

Official references:
- ASA/CAP factual vs promotional claims: https://www.asa.org.uk/advice-online/electronic-cigarettes-factual-vs-promotional-claims.html
- ASA/CAP media prohibitions: https://www.asa.org.uk/advice-online/electronic-cigarettes-media-prohibitions.html
- GOV.UK selling vaping and nicotine products: https://www.gov.uk/guidance/selling-vaping-and-nicotine-products
- DHSC future advertising and sponsorship restrictions: https://healthmedia.blog.gov.uk/2026/06/01/ending-the-advertising-and-sponsorship-of-vaping-and-nicotine-products-from-1-june-2027/

## 3. Measurement: establish the real baseline first

No current, verified daily unique-visitor baseline is available. Historical Cloudflare counts must not be treated as today's baseline.

**Measurement readiness check — 5 November 2026:** the current production homepage and repository source were checked for GA4, Google Tag Manager, Cloudflare Web Analytics and Zaraz scripts. No client-side analytics beacon was detected. This does not rule out Cloudflare edge-level request analytics in the dashboard; those figures are a different measurement source and have not yet been verified.

**Release and live crawl spot-check — 5 November 2026:**
- GitHub Actions browser-regression workflow for commit `c0b314ca02185b12e595a5cf1b7342bce5548ce9` completed successfully.
- Cloudflare Pages reported a successful deployment for the same commit.
- A live production fetch returned HTTP 200 for the homepage, `/robots.txt`, `/sitemap.xml`, `/llms.txt`, and the XROS 6 device route. The XROS 6 route returned a model-specific page title.
- The production sitemap contains **123 unique URLs**: 50 device detail routes plus the device index, 50 compatibility detail routes plus the compatibility index, eight platform detail routes plus the platform index, seven guide articles plus the guides index, three brand routes, and the homepage.
- The live homepage clearly labels the storefront as a demo and says no orders are placed.
- A live production scrape with fresh-fetch mode exposed response content types: `/robots.txt` returned `text/plain; charset=utf-8`, `/sitemap.xml` returned `application/xml`, and `/llms.txt` returned `text/plain; charset=utf-8` (all HTTP 200). This closes the earlier production MIME-header verification gap. The route-level guide and device checks also returned HTTP 200 with route-specific metadata and model/guide body content after client rendering; allow sufficient render time when using a crawler, because a short scrape can capture the shared application shell before the route content is hydrated.
- These checks establish release and crawl readiness, not search-engine indexing or visitor growth. No Search Console or Cloudflare Web Analytics visitor metrics have been verified.

Use a consistent reporting definition:

- **Primary visitor measure:** Cloudflare Web Analytics unique visitors per day, once enabled and verified. Treat this as the best available browser-measured proxy for real visitors, not an exact count of identifiable people.
- **Organic search:** Google Search Console clicks, impressions, CTR, average position, indexed pages, and query/page reports.
- **Optional secondary measure:** GA4 organic users and engaged sessions, only after its privacy, cookie/consent and internal-traffic settings have been reviewed and configured.
- **Quality checks:** useful page views, Compatibility Finder interactions, and return visits. Do not count a single bot hit, uptime check or staff test as a meaningful visitor.
- Never add Cloudflare visitors, GA4 users and Search Console clicks together; they measure different things.

**Recommended no-cost setup:** enable Cloudflare Web Analytics for the Pages project. Cloudflare's documented path is **Workers & Pages → PodLookup → Metrics → Web Analytics → Enable**. Cloudflare says Pages will add its beacon on the next deployment. After deployment, verify that the live page contains the beacon and that the Web Analytics dashboard begins receiving data. If automatic injection does not work with the site's current Perchance-derived HTML structure, use Cloudflare's documented manual setup only after obtaining the site's own beacon snippet from the dashboard.

**Access gate:** verify the PodLookup domain in Google Search Console and submit `https://podlookup.co.uk/sitemap.xml`. Export its 28-day Performance and Pages reports weekly. If Search Console or Web Analytics is not connected, record the metric as unavailable rather than estimating it.

Official setup references:
- Cloudflare Pages Web Analytics: https://developers.cloudflare.com/pages/how-to/web-analytics/
- Cloudflare Web Analytics overview and privacy model: https://developers.cloudflare.com/web-analytics/about/
- Cloudflare Web Analytics setup: https://developers.cloudflare.com/web-analytics/get-started/

## 4. Thirty-day execution schedule

### Days 1–3 — Measurement and crawl baseline

1. Enable and verify Cloudflare Web Analytics for the Pages project; record its first complete 28-day visitor and page-view period when available.
2. Verify the PodLookup domain in Search Console, submit the production sitemap, and export clicks, impressions, CTR, average position and landing pages for the previous 28 days.
3. Record Cloudflare edge-level request and bot/security metrics separately if available; do not substitute request counts for unique visitors.
4. Use GA4 only if it is already configured or can be added after the privacy and consent review; otherwise mark GA4 metrics unavailable.
5. Check the production `robots.txt`, XML sitemap, canonical URLs, response codes and page titles.
6. Establish a baseline table; do not claim growth until the same measurement method is used for each reporting period.

**Deliverable:** baseline dashboard and a list of crawl/indexing defects.

### Days 4–7 — Crawlable information architecture

1. Verify all canonical device, compatibility, brand and platform routes.
2. Publish the seven technical guide articles plus the guides index (eight guide routes total in the current sitemap) as distinct, crawlable routes with unique titles, descriptions, canonical URLs, breadcrumbs and relevant structured data.
3. Link guide pages from the homepage, device pages, platform pages and reference hub.
4. Include every intended indexable route in the XML sitemap and the AI discovery file.
5. Keep unknown or invalid routes out of the index; preserve the existing noindex/404 behavior.
6. Test all guide links on mobile and desktop and confirm that each URL opens the correct content.

**Deliverable:** no dead guide links, no duplicate guide routes, and a verified sitemap.

### Days 8–14 — Search-intent content

Prioritise exact questions that match the existing data:

1. Which pods fit Vaporesso XROS 5 and XROS 6?
2. Which cartridges and replaceable coils fit OXVA XLIM C?
3. Which standard XLIM cartridges fit each listed XLIM device?
4. Which Caliburn GPP, A2, A3 and G/G2 platforms are recorded for each model?
5. What is the difference between device resistance and pod resistance?
6. How is a compatibility result established, and what does UNKNOWN mean?
7. How do integrated-coil pods differ from replaceable-coil cartridges?

For each page:
- Answer the question near the top.
- Show the exact models and platform relationship.
- Separate device resistance, pod resistance and coil resistance.
- Cite the manufacturer/source record used by the dataset.
- Link to the exact device and platform records.
- State what is not known instead of filling gaps with assumptions.

**Deliverable:** a useful question-to-page map and source-backed updates to the highest-priority pages.

### Days 15–21 — Internal discovery and content quality

1. Review Search Console queries and map each meaningful query to one best landing page.
2. Find queries with impressions but low CTR; improve titles and descriptions only when the page genuinely answers that query.
3. Find queries with impressions but no suitable page; add only source-backed content.
4. Strengthen links between brand, platform, device, compatibility and guide pages.
5. Check that no page repeats another page's copy without adding model-specific value.
6. Review the mobile Compatibility Finder and make sure every main route can be reached without relying on JavaScript-only buttons.
7. Re-check accessibility, broken links, page errors and performance.

**Deliverable:** query-to-page map, content gap list and a prioritised fix queue.

### Days 22–26 — Indexing and refinement

1. Re-submit the current sitemap in Search Console if it has changed.
2. Inspect a sample of important URLs with URL Inspection.
3. Compare indexed pages against the intended canonical URL list.
4. Fix discovered canonical, duplicate, soft-404 or internal-link problems.
5. Improve pages with real impressions and low CTR without adding promotional wording.
6. Re-check official source links and data status on pages updated during the month.

**Deliverable:** current indexing report and a list of remaining blockers.

### Days 27–30 — Review and next-month priorities

1. Compare the last seven days with the baseline using the same analytics definitions.
2. Report unique visitors/day, organic users/day, clicks, impressions, CTR, top queries and top landing pages.
3. Identify which device and guide pages brought real visitors.
4. Identify pages that were crawled but not indexed and pages that were indexed but received no impressions.
5. Choose the next 10 pages based on actual query data and source availability.
6. Set the next 30-day target from observed growth, not from an invented forecast.

**Deliverable:** Day-30 report, traffic trend, content winners, unresolved blockers and next-month priorities.

### Verified content expansion — 5 November 2026

Added to the implementation queue and prepared in the SEO branch:
- XROS 6 vs XROS 5 guide with model-specific resistance caveats and FAQ schema.
- XROS platform cross-compatibility answer block covering the recorded XROS 6/5/4/3 family.
- Methodology page explaining official-source verification, platform/device separation and explicit UNKNOWN handling.
- About page defining PodLookup as an independent UK-focused compatibility reference.
- Cautious Caliburn G4 vs G5 guide marked **verification in progress**; no UNKNOWN record is upgraded to VERIFIED.
- Static HTML head fallback with runtime putMeta() overrides preserved.
- Explicit MIME rules for robots.txt, sitemap.xml and llms.txt.

The outreach list remains an owner-operated research task. No automated outreach, paid links or promotional nicotine advertising is part of the deployment.

## 5. Traffic target and reporting

The headline target is **100 real unique visitors per day**, assessed as a seven-day rolling average at Day 30. That equates to roughly 700 unique visitors across a seven-day period, not 700 sessions.

Because the current baseline is unverified and organic search takes time to crawl, index and rank new pages, 100/day in 30 days is ambitious and cannot be guaranteed. Report the actual result honestly, including a lower number if that is what the data shows.

Suggested weekly reporting table:

| Metric | Baseline | Day 7 | Day 14 | Day 21 | Day 30 |
|---|---:|---:|---:|---:|---:|
| Cloudflare Web Analytics unique visitors/day (7-day average) | To measure | | | | Target: 100 |
| Search Console organic clicks/day | To measure | | | | |
| GA4 organic users/day (optional) | If configured | | | | |
| Search impressions/day | To measure | | | | |
| Indexed intended URLs | To measure | | | | |
| Engaged organic sessions | To measure | | | | |

## 6. Definition of done

- 100/day is reported only if analytics verifies it over a seven-day rolling average.
- No paid or prohibited promotional traffic tactics were used.
- Every compatibility statement remains traceable to the dataset and source evidence.
- `UNKNOWN` remains explicit wherever evidence is incomplete.
- Guide and entity routes are crawlable, canonical, linked internally and included in the sitemap.
- Mobile navigation and compatibility lookup remain functional.
- The demo storefront is not represented as a live shop; no email list or checkout is implied.
- All remaining commercial steps are kept separate and blocked until the required legal, supplier, payment, age-verification and operational checks are complete.
