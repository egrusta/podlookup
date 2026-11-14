# Public HTTP diagnostic — 14 November 2026

## Scope and limits

Read-only checks of the initial HTTP response for the home page, About,
Methodology, three discovery files and two deliberately missing URLs.
This does not execute JavaScript, inspect Google's rendered copy, establish
indexing status, or measure search traffic.

Search Console opened its public landing page in this session. No authenticated
property or URL Inspection result was available. Index coverage, Google's selected
canonical, last crawl and rendered screenshot remain **not checked**.

## Observed public responses

| Request | HTTP | Result |
| --- | --- | --- |
| / | 200 | Shared HTML shell; canonical points to home |
| /?p=about | 200 | Same initial HTML and title as home; canonical points to home |
| /?p=methodology | 200 | Same initial HTML and title as home; canonical points to home |
| /robots.txt | 200 | text/plain; 379 bytes |
| /sitemap.xml | 200 | application/xml; 128 entries, all unique |
| /llms.txt | 200 | text/plain; 9,879 bytes |
| /technical-audit-missing-page-20261114 | 404 | Error page; initial noindex, follow |
| /?p=technical-audit-missing-route-20261114 | 200 | Same initial shell; no initial robots meta |

The captured eight-request run completed at 2026-11-14T00:18:39Z.
In that run the four shared HTML responses were 492,251 bytes and had SHA-256
`fb82cf39e40635eb606aad0a9fde2b74e5c1dd0a29dbbb9ff39ada4e14fe9447`.
Earlier curl captures of About and Methodology were 491,884 bytes and also
identical to one another. Response byte sizes can vary; compare hashes within
one run, and do not infer a deployment mismatch from size alone.

## Interpretation

At repository baseline `6a0c7bea8119bd74366dda2e388ffbfb6b3db414`,
`setGeoMeta` changes titles and canonical URLs after client-side routing.
The initial shared canonical and the route-specific rendered canonical are
different layers of evidence. A shared shell is a confirmed implementation
detail, **not proof that Google failed to render or index a page**.

Google's JavaScript documentation says it can process rendered content, but
advises against changing an initial canonical to a different value with
JavaScript. This documents a concrete metadata consistency concern. It does
not establish the cause of any current search-performance issue.

Source checked 14 November 2026:
https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics

The missing query route remains HTTP 200 before JavaScript. Existing client
logic applies a not-found view and noindex. The public HTTP audit alone cannot
verify that rendered outcome.

## Evidence provenance

The existing manufacturer register and Uwell audit record reviews dated
4–5 November 2026. Those are historical repository records, not manufacturer
checks performed for this diagnostic. No review dates or compatibility claims
were upgraded, and UNKNOWN values were not inferred from family membership.

## Repeat the diagnostic

Requires Python 3 and its standard library only:

```sh
python3 scripts/audit_public_http.py > public-http-audit.json
```

An alternative deployment can be checked with `--base-url https://example.com/`.
The report includes final URLs, content types, response hashes, canonical tags,
initial robots tags and duplicate sitemap counts. Requests have a 20-second
timeout and use at most four worker threads. Transport or size-limit errors
produce a nonzero exit code. HTTP 404 is recorded as an expected diagnostic
observation, not treated as a transport error.

No credentials are needed. This is an on-demand tool, not a scheduled monitor.

## Unresolved checks

- Authenticated Search Console URL Inspection for About and Methodology:
  index status, selected canonical, last crawl and rendered HTML.
- A fresh rendered-browser comparison of the same URLs.
- Review metadata delivery only after distinguishing raw HTML from rendered
  output; preserve existing URLs and history behavior during any change.
