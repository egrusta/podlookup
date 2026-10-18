# PodLookup — device coverage batch 1 (research only)

Status: preparation notes only. This file does not change the storefront, compatibility data, routing, CSS, images, or JSON-LD.

## Gate 0 — existing metadata PR

PR #6 (`fix/master-inventory-metadata`) changes only the embedded MASTER inventory metadata and source-of-truth comment. Review confirmed:
- Only `index.html` changed (+8/-6).
- `UNKNOWN` handling, `geoHref` routing, CSS media-query lines, and JSON-LD script markers are unchanged.
- No GitHub status checks or PR-triggered workflow runs were returned.
- No review submissions or inline review threads were returned.
- Therefore this PR is **not approved to merge yet**: automated regression tests have not run, and mergeability was previously reported false. Do not merge or deploy until a runnable test plan and GitHub merge state are confirmed.

## Candidate batch — official source evidence

### A. Vaporesso XROS
Official sources:
- XROS 6 product page: https://store.vaporesso.com/en-gb/collections/pod-kits/products/xros-6
- Official XROS pod page: https://store.vaporesso.com/en-gb/collections/vaporesso-pod-and-coil-replacement-guide-2027/products/xros-series-pods-4pcs
- Official XROS pod compatibility chart (published July 24, 2026): https://store.vaporesso.com/sv-se/blogs/guide-to-vaping/xros-pod-kompatibilitetsdiagram-1

Candidate devices to investigate for separate model-specific records:
- XROS 6
- XROS 6 Mini
- XROS PRO 2
- XROS 5 Nano
- XROS 4 Nano
- XROS 3 Mini
- XROS 3 Nano

Evidence supports a shared XROS pod form factor across the listed family, but before adding records we must check:
1. exact official model name and UK product/manual evidence;
2. which resistance options are officially supported by the device versus merely available in the pod family;
3. UK TPD capacity and UK-market kit contents;
4. whether the storefront product catalogue has a real product record/image. Do not invent prices, reviews, or stock.
5. how adding the model affects the existing MASTER audit and any static/no-script fallback.

Do not copy all pod-family resistance values into device-supported `ohms` unless model-specific official evidence supports them.

### B. OXVA XLIM
Official sources:
- XLIM 4: https://www.oxva.com/pl/pages/xlim-4
- Official device comparison (includes XLIM 4 and XLIM PRO 3): https://www.oxva.com/pages/comparison
- Official FAQ: https://www.oxva.com/pages/faq

Candidates:
- XLIM 4
- XLIM PRO 3

Official evidence describes XLIM 4 as using XLIM top-fill cartridges, with 2 ml TPD and 3 ml versions shown; the XLIM PRO 3 comparison lists V1/V2/top-fill cartridges in 2 ml and 3 ml variants. The official FAQ contains model-specific limitations for some 0.4Ω top-fill cartridges, and its compatibility list may not include the newest devices. Do not generalize “all XLIM pods fit all devices” without recording cartridge generation, capacity, resistance and explicit exceptions.

UK storefront records should describe the 2 ml TPD variant where applicable; do not claim 3 ml as a UK-compliant option without a specific lawful basis.

### C. Uwell Caliburn
Official source:
- CALIBURN G4: https://www.myuwell.com/caliburn/caliburn-g4

Candidate:
- CALIBURN G4

Official source states that G4 is compatible with previous and upgraded CALIBURN GPP cartridges, and that upgraded GPP cartridges are also compatible with the G3 series. Before adding the record:
1. determine whether the existing `Caliburn G3 Pods` platform label should be renamed or mapped to the official GPP family;
2. avoid implying compatibility with original Caliburn, G/G2 or A-series pods unless official evidence explicitly confirms it;
3. record resistance and UK 2 ml TPD details only from an applicable UK specification/manual.

## Required implementation gates before any storefront edit

1. Reconcile `MASTER`, `COMPATIBILITY`, `ENTITY`, `PRODUCTS`, FAQ copy, static/no-script fallback and master audit expectations.
2. Add each new device only once in the canonical data structures; keep platform facts separate from device-supported resistance facts.
3. Keep unknown facts as `UNKNOWN`; never guess a platform or resistance.
4. Confirm every generated device and compatibility route resolves and renders correct title, description, canonical URL and JSON-LD.
5. Run a JavaScript syntax check plus route/compatibility smoke tests against a preview build.
6. Inspect mobile layout at narrow viewport widths and confirm existing product images/basket/storefront remain unchanged.
7. Open a separate draft PR with exact test evidence. Do not merge or deploy until checks pass and the user has reviewed the preview.

## Out of scope for this batch
- No changes to `main`, live hosting, Cloudflare settings or production deployment.
- No CSS, route, basket, checkout, image, payment, supplier or JSON-LD architecture changes.
- No new product prices, ratings, reviews, stock claims or fabricated supplier links.
