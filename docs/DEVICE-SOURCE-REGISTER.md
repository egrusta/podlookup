# PodLookup — device and compatibility source register

**Register started:** 4 November 2026  
**Purpose:** Keep a dated, auditable record of the manufacturer evidence behind compatibility and specification statements. This register is separate from supplier authenticity, UK market compliance, MHRA notification and stock verification.

## Evidence rules

1. Prefer the manufacturer's exact product, compatibility, specification or user-manual page.
2. Record the exact URL, date checked, product/variant, and the precise fields the source supports.
3. Separate device-supported resistance, cartridge/pod resistance and replaceable-coil resistance. Do not merge these into one value.
4. Record what the source does **not** establish. Leave it UNKNOWN rather than infer it.
5. A manufacturer specification does not prove a particular UK retailer's stock is genuine, lawful, available or in stock.
6. Re-check the source when the manufacturer changes a product page, cartridge revision or compatibility list.

## Registered sources

### OXVA Xlim C

| Field | Record |
|---|---|
| Brand / device | OXVA Xlim C |
| Pod/cartridge system | Dedicated Xlim C Cartridge & Coil System |
| Source owner | OXVA (manufacturer) |
| Official UK product page | https://www.oxva.com/uk/pages/xlimc |
| Additional manufacturer source | https://www.oxva.com/pages/xlim_prefilled_cartridge |
| Checked | 4 November 2026 |
| Evidence status | Manufacturer page inspected; exact facts below are supported |
| PodLookup route | `?p=devices/oxva/xlim-c` |
| Compatibility route | `?p=compatibility/oxva/xlim-c` |
| Platform route | `?p=platforms/xlim-c-cartridge-coil-system` |

**Facts supported by the Xlim C manufacturer page**
- Cartridge capacity is shown as **2 ml / 2 ml (TPD)**.
- The page identifies changeable XLIM C coils.
- Manufacturer-listed coil options are **0.6Ω, 0.8Ω and 1.2Ω**.
- The package list includes a 2 ml XLIM C cartridge and 0.6Ω and 0.8Ω coils.
- The page separately lists the device's maximum output power and battery specifications; those are not used to infer pod fit.

**Facts deliberately not inferred**
- Device-supported resistance as a separate specification remains **UNKNOWN** in PodLookup. The manufacturer page's broad resistance-range field is not treated as a device-specific supported-coil list.
- No compatibility with standard XLIM integrated-coil pods is inferred. Xlim C is modelled as its own cartridge-and-replaceable-coil system.
- The manufacturer source does not verify any retailer's authenticity, supplier chain, stock, price, MHRA status or UK retail eligibility.

**Cross-check**
- OXVA's prefilled-cartridge page explicitly excludes XLIM C and identifies its changeable-coil design. This supports keeping the Xlim C separate from that prefilled cartridge family; it is not used to make broader claims about every XLIM cartridge variant.

### Vaporesso XROS family

| Field | Record |
|---|---|
| Brand / devices | Vaporesso XROS 6; XROS 6 Mini; XROS PRO 2; XROS 5; XROS 5 Mini; XROS 4; XROS 4 Mini; XROS 3 |
| Pod platform | XROS Pods |
| Source owner | Vaporesso (manufacturer) |
| Official model pages | https://www.vaporesso.com/series-product/xros-series/xros6 · https://www.vaporesso.com/series-product/xros-series/xros5 · https://www.vaporesso.com/series-product/xros-series/xros4 · https://www.vaporesso.com/series-product/xros-series/xros3 · https://www.vaporesso.com/series-product/xros-series/xros-pro2 |
| Official family compatibility source | https://store.vaporesso.com/en-si/blogs/guide-to-vaping/xros-pod-compatibility-chart |
| Additional official XROS 4 / 4 Mini flyer | https://www.vaporesso.com/hubfs/imgs/downloads/flyer/XROS_4%26XROS_4_MINI-Flyer.pdf |
| Checked | 5 November 2026 |
| PodLookup routes | `?p=platforms/xros-pods` and the eight listed XROS device routes |
| Evidence status | Manufacturer product pages and the official family compatibility chart inspected |

**Facts supported by the manufacturer sources**
- The XROS 6, XROS 5, XROS 4, XROS 3 and XROS PRO 2 product pages identify the devices as members of the XROS family and document XROS pod compatibility.
- The XROS 6, XROS 4 and XROS PRO 2 pages explicitly state compatibility with the entire XROS pod series. The XROS 3 page also states that it is compatible with all XROS pods.
- Vaporesso's family compatibility chart lists XROS 6 / 6 Mini, XROS PRO 2, XROS 5 / 5 Mini, XROS 4 / 4 Mini and XROS 3 / 3 Mini as members of the same pod-compatible family.
- The XROS 4 / 4 Mini flyer documents 2 ml and 3 ml pod variants and their listed resistance variants.

**Facts deliberately not inferred**
- A resistance printed in a pod-platform list is not automatically a device-supported resistance. Keep device-supported resistance and pod-available resistance as separate fields.
- Package-included pod variants, regional kit contents and the full range of compatible replacement pods are different facts. Do not infer one from another.
- The official family chart does not establish UK retailer stock, authenticity, supplier chain, price or legal retail eligibility.

### OXVA standard XLIM cartridge family

| Field | Record |
|---|---|
| Brand / devices | XLIM Pro; XLIM Pro 2; XLIM SE; XLIM SQ Pro; XLIM Classic; XLIM GO; XLIM SE 2; XLIM SQ; XLIM Crystal; XLIM POD |
| Standard pod platform | Xlim Pods |
| Source owner | OXVA (manufacturer) |
| Official XLIM compatibility FAQ | https://www.oxva.com/pages/faq |
| Official XLIM Pro page | https://www.oxva.com/pages/xlim_pro |
| Official XLIM Pro 2 page | https://www.oxva.com/pages/xlim-pro-2 |
| Checked | 5 November 2026 |
| PodLookup routes | `?p=platforms/xlim-pods` and the corresponding listed OXVA device routes |
| Evidence status | Manufacturer FAQ and model pages inspected |

**Facts supported by the manufacturer sources**
- OXVA's FAQ explicitly lists XLIM Classic, XLIM GO, XLIM SE 2, XLIM SQ Pro, XLIM Pro, XLIM POD, XLIM SE, XLIM SQ and XLIM Crystal as applicable products for the standard XLIM cartridge family.
- OXVA's FAQ states that the XLIM Top Fill 0.4Ω variant is only compatible with XLIM Pro, XLIM SQ Pro, XLIM SE 2, XLIM GO and XLIM Classic.
- The XLIM Pro 2 product page states compatibility with the XLIM pod family and lists its supported cartridge variants. However, the FAQ's specific 0.4Ω Top Fill device list does not name Pro 2; PodLookup therefore does not infer that this exact 0.4Ω Top Fill variant is confirmed for Pro 2.
- OXVA's XLIM Pro page explicitly treats XLIM C as an exception because it uses changeable coils. XLIM C remains recorded separately in the dedicated cartridge-and-coil source entry above.

**Facts deliberately not inferred**
- General compatibility with the XLIM cartridge family does not mean every resistance variant fits every model. Keep the 0.4Ω Top Fill restriction attached to the exact five models named by OXVA.
- Do not combine the standard XLIM integrated-coil cartridge family with the separate XLIM C cartridge-and-replaceable-coil system.
- The manufacturer FAQ does not establish retailer authenticity, UK stock, price, supplier chain, MHRA status or UK retail eligibility.

## Register coverage

This register contains manufacturer source records for the Vaporesso XROS family, the standard OXVA XLIM cartridge family and the separate OXVA Xlim C cartridge-and-coil system. A separate [UWELL Caliburn source audit](uwell-caliburn-source-audit.md) records A2/A3 cartridge-family evidence, older G/G2 coil evidence and newer GPP G3/G4/G5 platform evidence. Seven legacy Caliburn models — GZ2, GZ2 Cyber, GK2, Tenet, Tenet KOKO, X and Explorer — are now present in MASTER as explicit UNKNOWN pod-platform records: manufacturer evidence supports some coil-family or broad cartridge statements, but does not establish an exact interchangeable cartridge SKU and fit direction. Their pages preserve UNKNOWN rather than guessing. The remaining Uwell device and platform records still require model-level source review. Do not interpret a device's presence in the site as proof that every source has been audited.

## Review log

| Date | Record | Change |
|---|---|---|
| 4 November 2026 | OXVA Xlim C | Added manufacturer source URLs and separated cartridge capacity, replaceable-coil options and UNKNOWN device-resistance status |
| 5 November 2026 | Vaporesso XROS family | Added official model pages, family compatibility chart and separate resistance-evidence rules |
| 5 November 2026 | OXVA standard XLIM family | Added official FAQ/model pages and recorded the model-specific 0.4Ω Top Fill restriction |
