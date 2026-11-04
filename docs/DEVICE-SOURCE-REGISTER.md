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

## Register coverage

This register currently contains the Xlim C source record only. The other device and platform records in the embedded MASTER dataset have not yet been migrated into this URL-level register. Do not interpret their presence in the site as proof that this register has audited every source. Existing UNKNOWN safeguards remain in force.

## Review log

| Date | Record | Change |
|---|---|---|
| 4 November 2026 | OXVA Xlim C | Added manufacturer source URLs and separated cartridge capacity, replaceable-coil options and UNKNOWN device-resistance status |
