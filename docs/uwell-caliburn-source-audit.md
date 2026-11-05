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

### GPP platform: G3, G4 and G5 generations

**Official platform source:** https://www.myuwell.com/g-pod-platform

**Official model sources**
- CALIBURN G4: https://www.myuwell.com/caliburn/caliburn-g4
- CALIBURN G4 Mini / G4: https://www.myuwell.com/news/new-products/CALIBURN-G4-miniG4
- CALIBURN G4 Pro: https://www.myuwell.com/caliburn/caliburn-g4-pro
- CALIBURN G4 Classic: https://www.myuwell.com/caliburn/caliburn-g4-classic
- CALIBURN G5: https://www.myuwell.com/caliburn/caliburn-g5
- CALIBURN G5 KOKO: https://www.myuwell.com/caliburn/caliburn-g5-koko
- CALIBURN G5 Pro: https://www.myuwell.com/caliburn/caliburn-g5-pro
- CALIBURN G5 Vision: https://www.myuwell.com/caliburn/caliburn-g5-vision
- CALIBURN G5 Lite / G5 Lite SE: https://www.myuwell.com/caliburn/caliburn-g5-lite-g5-lite-se
- CALIBURN G3 Pro: https://www.myuwell.com/caliburn/caliburn-g3-pro
- CALIBURN G3 Pro KOKO: https://www.myuwell.com/caliburn/caliburn-g3-pro-koko

**Facts supported by the manufacturer sources**
- UWELL's G Pod Platform page states that GPP cartridges are fully compatible with CALIBURN G5, G4 and G3 series devices.
- The platform page lists G5 Lite / Lite KOKO / Lite SE, G4 Pro KOKO, G4 Classic, G4 Pro, G4, G4 Mini, G3 Pro KOKO, G3 Lite KOKO, G3 Pro, G3 Lite, G3 ECO, GK3, GK3 Tenet and G3 in its device presentation.
- The G4 product page states that G4 accepts both previous and upgraded GPP cartridges, and that upgraded GPP cartridges are also compatible with G3 series devices.
- The G4 Mini / G4 announcement and G4 Pro product page repeat the previous/upgraded GPP cartridge compatibility distinction.
- G5, G5 KOKO, G5 Pro, G5 Vision and G5 Lite family pages identify GPP cartridge compatibility. The G5 page specifically identifies a GPP Alpha cartridge in its kit; this is a cartridge variant, not proof that every GPP device ships with Alpha.
- G3 Pro and G3 Pro KOKO product pages explicitly identify compatibility with CALIBURN G3 cartridges and label those cartridges as belonging to the G3 series.
- The GPP platform page lists cartridge formats and resistance options including 0.4Ω, 0.6Ω, 0.9Ω and 1.2Ω across side-refill and top-refill presentations. It also shows different listed capacities, including 3.0 ml, 2.5 ml and 2.0 ml variants.

**Facts deliberately not inferred**
- The GPP platform label does not prove that every historical GPP, upgraded GPP, GPP Alpha and G3-series cartridge SKU is interchangeable in every direction. Keep the manufacturer's exact model and cartridge wording with each claim.
- A cartridge resistance printed on the platform page is not automatically a device-supported resistance for every G3/G4/G5 model.
- Kit-included cartridges, optional replacement variants and regional / TPD capacity variants are separate facts. Do not infer the UK kit contents from a global product page.
- The platform page says its three-type overview is "as of 2025" and mentions further 2026 cartridges; do not treat that older overview as a complete current SKU catalogue.

### CALIBURN A2 and A3 cartridge families

**A2 family — official sources**
- CALIBURN A2: https://www.myuwell.com/caliburn/caliburn-a2
- CALIBURN A2 user manual: https://files.myuwell.com/blob/product-download/Calibrun%20A2%20User%20Manual-20210810145024.pdf
- CALIBURN A2S: https://www.myuwell.com/caliburn/caliburn-a2s
- CALIBURN AK2: https://www.myuwell.com/products/pod-system/caliburn-ak2.html
- CALIBURN AK2 user manual: https://files.myuwell.com/blob/product-download/User%20Manual%20AK2%28All%20languages%29-20220924171319.pdf

**A2 facts supported**
- The A2 product page and user manual specify the 0.9Ω CALIBURN A2 refillable pod.
- UWELL explicitly states that A2S is compatible with the 0.9Ω CALIBURN A2 pod. The A2S page also lists its own 1.2Ω side-refill pod.
- UWELL's AK2 product page says A2 and AK2 can share the A2 pod cartridge; the AK2 manual specifies the 0.9Ω A2 pod.
- The A2S 1.2Ω side-refill pod is not listed as an A2 or AK2 option in those manufacturer sources. Keep that option model-specific.

**A3 family — official sources**
- CALIBURN A3: https://www.myuwell.com/caliburn/caliburn-a3
- CALIBURN A3S: https://www.myuwell.com/caliburn/uwell-caliburn-a3s
- CALIBURN AK3: https://www.myuwell.com/products/pod-system/caliburn-ak3.html
- CALIBURN AZ3: https://www.myuwell.com/caliburn/caliburn-az3
- UWELL A3 launch article: https://www.myuwell.com/news/new-products/uwell-launches-caliburn-a3-pod-system
- UWELL A3S launch article: https://www.myuwell.com/news/new-products/uwell-launches-caliburn-a3s-pod-sytem

**A3 facts supported**
- The A3 product page specifies a 1.0Ω CALIBURN A3 refillable pod.
- The A3S product page explicitly says A3S is compatible with the A3 pod and lists a 0.8Ω A3S pod (pre-installed) and a 1.0Ω A3 pod (spare).
- The AK3 product page specifies a 1.0Ω CALIBURN A3 refillable pod.
- The AZ3 product page's wide-compatibility panel lists A3, A3S, AK3 and AZ3 together, and its pod specifications list 0.8Ω and 1.0Ω A3 refillable pod options.
- UWELL's AZ3 launch material also refers to AZ3 as the AZ3 (Grace) device. Treat Grace as a naming/marketing alias only where the model record supports it.

**Facts deliberately not inferred**
- The A2S 1.2Ω side-refill pod is not automatically compatible with A2 or AK2 merely because all three use the A2 family.
- The A3 platform-level 0.8Ω and 1.0Ω options are not automatically device-supported resistance values for every A3-family model. Keep the per-device `ohms` field UNKNOWN unless that model's own manufacturer evidence lists the value.
- The A3, A3S, AK3 and AZ3 family relationship does not prove that every pod variant or refill orientation fits every one of the four devices. Use the exact model-page statements above.
- Product-page kit contents are not a complete replacement-pod catalogue and may differ by market.

## Safe implementation decisions

- Do not merge these older G/G2 coil-family models into the newer GPP cartridge platform.
- Keep G-series replaceable-coil options distinct from integrated-coil cartridge resistance.
- Do not infer a universal G/G2 cartridge SKU from coil compatibility alone.
- For G3/G4/G5, preserve the distinction between previous GPP, upgraded GPP, GPP Alpha and G3-series cartridge wording until the exact cartridge SKU and compatibility direction are established.
- Keep the A2 0.9Ω pod evidence separate from the A2S 1.2Ω side-refill option; do not propagate the 1.2Ω option to A2 or AK2.
- For A3-family devices, preserve model-specific 0.8Ω / 1.0Ω evidence; platform-level availability is not proof that every resistance fits every device.
- Treat Caliburn Explorer as a separate dual-cartridge design unless a manufacturer source establishes a shared cartridge SKU.
- Before adding a model to the live MASTER dataset, record the exact manufacturer source URL, the supported compatibility direction, coil options and any unresolved fields.
- If the model's exact cartridge mapping remains unclear, it may be listed as a device with pod compatibility UNKNOWN rather than assigning a guessed platform.

## Next research tasks

1. Locate downloadable UWELL manuals for GK2, Tenet, Tenet KOKO, GZ2, GZ2 Cyber, Caliburn X and Explorer.
2. Obtain G4/G5 manuals and identify exact GPP, upgraded GPP and GPP Alpha cartridge part names / model identifiers, including UK/TPD variants.
3. Extract exact cartridge part names / model identifiers from the manuals.
4. Determine whether each device uses the same empty cartridge body or only the same replaceable coil family.
5. Add only the proven relationships to MASTER, routes, static fallback, sitemap, llms.txt and regression tests.
6. Keep all unresolved cartridge fit values UNKNOWN.

## Review log

| Date | Scope | Result |
|---|---|---|
| 5 November 2026 | UWELL G/G2 family | Manufacturer pages confirm G-series coil support for several omitted devices; exact cartridge interchangeability remains a separate question and is not inferred. |
| 5 November 2026 | UWELL GPP G3/G4/G5 family | Added official GPP platform and model-page evidence; kept cartridge-generation and SKU direction distinctions explicit. |
| 5 November 2026 | UWELL A2/A3 families | Added official A2/A2S/AK2 and A3/A3S/AK3/AZ3 evidence, preserving model-specific resistance distinctions. |
