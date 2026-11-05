# PodLookup — UWELL Caliburn G-family source audit

**Checked:** 5 November 2026  
**Purpose:** Record manufacturer evidence for older Caliburn G-family devices before changing the compatibility dataset.  
**Status:** Research complete for the sources below; implementation deliberately pending where exact cartridge direction or SKU identity is not established.

## Evidence rules

1. Prefer exact UWELL product pages and manufacturer compatibility pages.
2. Separate device compatibility, cartridge/pod compatibility, replaceable-coil compatibility and coil resistance.
3. Do not treat a shared coil type as proof that two devices use the same cartridge.
4. Do not infer reciprocal compatibility from a one-way statement that one device accepts another device's cartridge.
5. Keep device-supported coil resistance separate from cartridge resistance and preserve UNKNOWN where the manufacturer does not establish the exact value.
6. Manufacturer specifications do not establish UK stock, supplier authenticity, MHRA notification, or retail eligibility.

## Manufacturer source findings

### Caliburn GZ2

- Official page: https://www.myuwell.com/caliburn/uwell-caliburn-gz2
- UWELL has a section titled “WIDE COMPATIBILITY” and lists Caliburn G2, GK2, Tenet, Tenet KOKO, GK2 (Vision) and GZ2.
- The same page lists 0.8Ω Caliburn G coil, 1.2Ω Caliburn G2 coil and 1.0Ω Caliburn G coil (sold separately).
- Supported by the page: the listed model names are part of UWELL's GZ2 compatibility presentation, and the named G-series coil options are specified.
- Not established by the page text alone: a complete SKU-level mapping of every cartridge in both directions between all listed devices.

### Caliburn GZ2 Cyber

- Official page: https://www.myuwell.com/caliburn/caliburn-gz2-cyber
- UWELL states it is compatible with “most CALIBURN pod systems’ cartridges and the CALIBURN G coils”.
- The compatibility list names Caliburn G2, GK2, Tenet, Tenet KOKO, GK2 (Vision), GZ2 and GZ2 Cyber.
- The listed coil options are 0.8Ω Caliburn G, 1.2Ω Caliburn G2 and 1.0Ω Caliburn G (sold separately).
- Supported by the page: GZ2 Cyber accepts a broad Caliburn cartridge range and Caliburn G coils; the named devices are shown in the compatibility section.
- Not established: that every cartridge supplied for GZ2 Cyber is reciprocally compatible with every named device, or that all devices share one interchangeable cartridge SKU.

### Caliburn GK2

- Official page: https://www.myuwell.com/caliburn/caliburn-gk2
- UWELL specifies compatibility with three Caliburn G-series coils: 1.2Ω Caliburn G2, 0.8Ω Caliburn G and 1.0Ω Caliburn G (sold separately).
- The product page identifies a refillable pod and replaceable coil.
- Not established by this page alone: the exact cartridge SKU or reciprocal compatibility with every other G-family cartridge.

### Caliburn Tenet

- Official page: https://www.myuwell.com/products/pod-system/caliburn-tenet.html
- UWELL specifies 0.8Ω and 1.2Ω coils included in the package and compatibility with the 1.0Ω Caliburn G coil.
- This establishes G-family coil compatibility, not a complete cartridge SKU cross-reference.

### Caliburn Tenet KOKO

- Official page: https://www.myuwell.com/caliburn/caliburn-tenet-koko
- UWELL explicitly states “COMPATIBLE WITH CALIBURN G SERIES COILS”.
- Listed coils: 0.8Ω Caliburn G, 1.2Ω Caliburn G2 and 1.0Ω Caliburn G (sold separately).
- This establishes coil-family compatibility, not a complete cartridge SKU cross-reference.

### Caliburn X

- Official page: https://www.myuwell.com/caliburn/caliburn-x
- UWELL explicitly states “COMPATIBLE WITH G SERIES COILS”.
- Listed coil options: 0.8Ω Caliburn G, 1.2Ω Caliburn G2 and 1.0Ω Caliburn G (sold separately).
- The page lists a 3 ml capacity. Do not present that as a UK-compliant retail specification without separately verifying the UK/TPD variant.
- This establishes coil-family compatibility, not the exact empty cartridge SKU shared with other models.

### Caliburn Explorer

- Official page: https://www.myuwell.com/caliburn/caliburn-explorer
- UWELL describes a dual-coil / dual-cartridge arrangement with separate left/right coil operation.
- Listed coils include 0.8Ω Caliburn G and 1.2Ω Caliburn G2; the product page describes two 0.8Ω coils for its dual-coil mode.
- The page specifies 4 ml total capacity, with 2 ml per cartridge for TPD.
- Implementation warning: model Explorer as its own dual-cartridge system if added. Shared G-family coil compatibility does not make its dual cartridge interchangeable with the standard G/G2 cartridge.

### Caliburn G2 and G Pod Platform

- Caliburn G2 official page: https://www.myuwell.com/caliburn/caliburn-g2
- UWELL lists 1.2Ω and 0.8Ω Caliburn G2 coil options and describes compatibility with 1.0Ω and 0.8Ω Caliburn G coils.
- G Pod Platform official page: https://www.myuwell.com/g-pod-platform
- UWELL defines GPP as a distinct platform for Caliburn G5, G4 and G3 series devices. Do not merge the older G/G2 coil family into GPP.

## Safe implementation decisions

- Do not merge these older G-family models into GPP.
- Keep G-series replaceable-coil options distinct from integrated-coil cartridge resistance.
- Do not infer a universal G/G2 cartridge SKU from coil compatibility alone.
- Treat Caliburn Explorer as a separate dual-cartridge design unless a manufacturer source establishes a shared cartridge SKU.
- Before adding a model to the live MASTER dataset, record the exact manufacturer source URL, the supported compatibility direction, coil options and any unresolved fields.
- If the model's exact cartridge mapping remains unclear, it may be listed as a device with pod compatibility UNKNOWN rather than assigning a guessed platform.

## Next research tasks

1. Locate downloadable UWELL manuals for GK2, Tenet, Tenet KOKO, GZ2, GZ2 Cyber, Caliburn X and Explorer.
2. Extract exact cartridge part names / model identifiers from those manuals.
3. Determine whether each device uses the same empty cartridge body or only the same replaceable coil family.
4. Add only the proven relationships to MASTER, routes, static fallback, sitemap, llms.txt and regression tests.
5. Keep all unresolved cartridge fit values UNKNOWN.

## Review log

| Date | Scope | Result |
|---|---|---|
| 5 November 2026 | UWELL G/G2 family | Manufacturer pages confirm G-series coil support for several omitted devices; exact cartridge interchangeability remains a separate question and is not inferred. |
