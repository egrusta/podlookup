# PodLookup technical release

## Production baseline

The production origin is https://podlookup.co.uk/. The catalogue contains 57 devices and the sitemap contains 142 distinct URLs including the homepage.

- [Change 77](https://github.com/egrusta/podlookup/pull/77) supplies initial HTML titles, descriptions, canonical links, social tags, headings and introductions for all 141 internal sitemap routes. Four existing family aliases resolve to their established canonicals. Invalid query routes return HTTP 404 and noindex.
- Production was verified across 157 GET cases covering all 141 routes, aliases, discovery files, the homepage, and invalid URLs. Additional HEAD requests returned 200 for About and 404 for a missing query route. The seven catalogue image files were verified against the site assets.
- The reverse finder displays manufacturer names for each platform. Desktop and mobile browser regressions include basket closure, keyboard navigation, layout and reference navigation.
- [Manufacturer register](DEVICE-SOURCE-REGISTER.md) covers all 57 current models. The [UWELL model table](uwell-caliburn-source-audit.md#current-catalogue-by-model) lists evidence and limits for all 38 UWELL entries. Pod fit, replaceable coils and model-specific cartridge resistance are recorded separately.
- The full catalogue audits run during route generation and regression checks. Browsers can still request the same diagnostic results explicitly without running the checks on every visit.

## Repeatable checks

| Check | Command or record |
| --- | --- |
| Static catalogue and sitemap | `npm run test:static` |
| Every route and catalogue audit | `npm run check:routes` |
| Browser regression suite | `npm run test:e2e` |
| Public HTTP and canonical metadata for every route | `python3 scripts/audit_public_http.py --all-routes` |
| Mobile and desktop lab performance, accessibility and SEO | The Informational quality audit workflow stores Lighthouse JSON reports, including a mobile run against the public About page. Scores are lab measurements for their stated page and run. |

## External verification

Initial HTML and browser checks establish which canonical URLs PodLookup publishes. Indexing, the last Google crawl and Google’s selected canonical require authenticated URL Inspection on the verified domain. There is no authenticated inspection result in this release record.

The public storefront is a demonstration. Supplier fulfilment, payment acceptance, age verification and transaction testing are tracked in the commercial launch workstream.
