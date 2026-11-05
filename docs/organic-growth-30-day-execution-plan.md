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

No current, verified daily unique-visitor baseline is available in this plan. Historical Cloudflare counts must not be treated as today's baseline.

Use a consistent reporting definition:

- **Primary:** GA4 organic-search users per day, excluding known internal/staff traffic where possible.
- **Cross-check:** Cloudflare unique visitors, with bot and security-event traffic excluded where available.
- **Search visibility:** Google Search Console clicks, impressions, CTR, average position, indexed pages, and query/page reports.
- **Quality checks:** engaged sessions, useful page views, finder interactions, and return visits. Do not count a bounce or a single bot hit as a meaningful visitor.
- Never add GA4 users, Cloudflare visitors and Search Console clicks together; they measure different things.

**Access gate:** connect read-only Search Console and GA4 reporting, or export their reports weekly. If the accounts are not connected, record the metric as unavailable rather than estimating it.

## 4. Thirty-day execution schedule

### Days 1–3 — Measurement and crawl baseline

1. Record current GA4 users, organic users, sessions and landing pages for the previous 28 days, if GA4 is available.
2. Record Cloudflare unique visitors and bot/security traffic for the same period.
3. Export Search Console queries, pages, clicks, impressions, CTR and average position for 28 days.
4. Check the production `robots.txt`, XML sitemap, canonical URLs, response codes and page titles.
5. Establish a baseline table; do not claim growth until the same measurement method is used for each reporting period.

**Deliverable:** baseline dashboard and a list of crawl/indexing defects.

### Days 4–7 — Crawlable information architecture

1. Verify all canonical device, compatibility, brand and platform routes.
2. Publish the seven technical guides as distinct, crawlable routes with unique titles, descriptions, canonical URLs, breadcrumbs and relevant structured data.
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

## 5. Traffic target and reporting

The headline target is **100 real unique visitors per day**, assessed as a seven-day rolling average at Day 30. That equates to roughly 700 unique visitors across a seven-day period, not 700 sessions.

Because the current baseline is unverified and organic search takes time to crawl, index and rank new pages, 100/day in 30 days is ambitious and cannot be guaranteed. Report the actual result honestly, including a lower number if that is what the data shows.

Suggested weekly reporting table:

| Metric | Baseline | Day 7 | Day 14 | Day 21 | Day 30 |
|---|---:|---:|---:|---:|---:|
| Real unique visitors/day (7-day average) | To measure | | | | Target: 100 |
| Organic users/day | To measure | | | | |
| Search Console clicks/day | To measure | | | | |
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
