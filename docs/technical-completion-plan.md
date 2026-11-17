# PodLookup technical completion plan

Updated 17 November 2026. Scope: informational content, accessibility, routing,
data integrity and deployment verification. Commercial functionality is excluded.
This consolidates the prior agreed plan; it is not a declaration of launch readiness.

## Evidence and remaining work

| Workstream | Evidence at this review | Remaining acceptance condition |
| --- | --- | --- |
| Malformed query routing | PR #58 merged as 8420641a13d3ad51962326a1928d246a5251bd06; both GitHub browser workflows passed; unit regression failed before the fix and passes after it | Production parser confirmed present on 17 November |
| Document language and encoding | PR #59 merged as c5d9b8137e01729d9c98a2f39a108e9110c8ef6a; 26 browser tests and the separate mobile/desktop suite passed, including JavaScript-disabled document checks | Production doctype, source language and early UTF-8 confirmed present on 17 November |
| Navigation, keyboard and mobile | Existing accessibility and browser suites cover information dialogs, focus return, mobile navigation, skip link, home-section history and unknown-route metadata reset | Keep these checks green for every code change |
| Static assets | Seven referenced local image files exist; inline executable JavaScript passes node --check | Production asset delivery and fresh performance measurements remain unverified |
| Discovery files | HTTP audit at 2026-11-17T17:52:19Z: robots.txt and llms.txt text/plain; sitemap.xml application/xml; 128 unique entries | Recheck after deployment changes |
| Initial route metadata | Same audit: home, About and Methodology return identical initial HTML with homepage canonical | Resolve initial/rendered metadata consistency while preserving existing URLs; verify browser output and initial responses separately |
| Missing routes | Physical missing path returns HTTP 404; missing query route returns HTTP 200 and relies on client-side not-found/noindex handling | A true query-route HTTP 404 requires a server-side routing decision; client rendering cannot change an HTTP status |
| Manufacturer evidence | DEVICE-SOURCE-REGISTER.md and uwell-caliburn-source-audit.md contain historical checks dated 4–5 November; register explicitly leaves model-level review incomplete | Verify remaining exact model/variant claims against official evidence; keep unestablished values UNKNOWN; do not stamp historical checks as fresh |
| Search Console | No authenticated property or URL Inspection evidence obtained in this review | Inspect indexing, selected canonical and rendered HTML through the actual property; public search is not proof of non-indexing |

## Execution order

1. Completed: tests and production source verification for the bounded routing/document fixes (#58 and #59). Live browser interaction also confirmed About → Methodology navigation, malformed query not-found rendering, and return to About.
2. Resolve initial route metadata and missing-query HTTP handling with a reviewed hosting change; preserve data and URL compatibility.
3. Finish model-level evidence review without expanding claims from family-level compatibility.
4. Run the full browser suite, verify production assets/headers, and record fresh performance/accessibility results.
5. Obtain actual Search Console evidence and record remaining externally dependent findings.

Do not mark the project as having only commerce left until these acceptance conditions
are met. Historical PageSpeed claims and earlier assistant summaries are not current
measurements. Existing open content PRs #53 and #54 must be reconciled with main before
any merge; their existence is not evidence that their changes are still needed.
