# CalStacker.com — Site Audit Report
**Date:** 2026-06-08  
**Scope:** calstacker.com project root (`e:\calstacker`)  
**Status:** PART 0 complete — no files modified during audit

---

```
CALSTACKER AUDIT:
```

## Total HTML Files Found: 44

| # | File Path |
|---|-----------|
| 1 | `index.html` |
| 2 | `about/index.html` |
| 3 | `privacy/index.html` |
| 4 | `contact/index.html` |
| 5 | `disclaimer/index.html` |
| 6 | `dashboard/index.html` |
| 7 | `guides/index.html` |
| 8 | `blog/index.html` |
| 9 | `blog/ctc-to-in-hand-salary-guide/index.html` |
| 10 | `blog/hra-exemption-bangalore-guide/index.html` |
| 11 | `blog/old-vs-new-tax-regime-2026/index.html` |
| 12 | `blog/sip-5000-per-month-10-years/index.html` |
| 13 | `guides/emi/10-lakh-car-loan/index.html` |
| 14 | `guides/emi/25-lakh-10-years/index.html` |
| 15 | `guides/emi/30-lakh-15-years/index.html` |
| 16 | `guides/emi/50-lakh-20-years/index.html` |
| 17 | `guides/hra/bangalore-25000-basic/index.html` |
| 18 | `guides/salary/35000-ctc-in-hand/index.html` |
| 19 | `guides/salary/600000-ctc-breakdown/index.html` |
| 20 | `guides/sip/10000-per-month-15-years/index.html` |
| 21 | `guides/sip/3000-per-month-20-years/index.html` |
| 22 | `guides/sip/5000-per-month-10-years/index.html` |
| 23 | `guides/tax/12-lakh-salary-old-vs-new/index.html` |
| 24 | `guides/tax/zero-tax-12-lakh/index.html` |
| 25 | `calculators/cagr/index.html` |
| 26 | `calculators/compound-interest/index.html` |
| 27 | `calculators/emi/index.html` |
| 28 | `calculators/epf/index.html` |
| 29 | `calculators/fd/index.html` |
| 30 | `calculators/gratuity/index.html` |
| 31 | `calculators/gst/index.html` |
| 32 | `calculators/hra/index.html` |
| 33 | `calculators/income-tax/index.html` |
| 34 | `calculators/inflation/index.html` |
| 35 | `calculators/lumpsum/index.html` |
| 36 | `calculators/net-worth/index.html` |
| 37 | `calculators/ppf/index.html` |
| 38 | `calculators/rd/index.html` |
| 39 | `calculators/retirement/index.html` |
| 40 | `calculators/salary/index.html` |
| 41 | `calculators/simple-interest/index.html` |
| 42 | `calculators/sip/index.html` |
| 43 | `calculators/step-up-sip/index.html` |
| 44 | `calculators/swp/index.html` |

---

## Files Where `{{title}}` Appears Literally

**None.** Searched all 44 HTML files — zero matches for `{{title}}` or any `{{...}}` template variable.

---

## Files Missing AdSense Script Tag

**1 file missing** (43 of 44 have AdSense):

| File | Notes |
|------|-------|
| `dashboard/index.html` | Internal revenue dashboard (`noindex, nofollow`) — no AdSense script |

All other 43 HTML files include:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8332278519903196" ...
```

---

## Files Where Nav Differs From Standard

**Standard nav required (Part 1B):**
- Logo text: `CalStacker` (plain, no `<span>`)
- Links: Employee Tools, Investor Tools, **About**, EMI Calculator →
- CTA text: `EMI Calculator →` (with arrow)
- Toggle: `aria-label="Toggle menu"`

**Result: ALL 44 pages differ** — zero pages match the exact standard nav. Grouped by pattern:

### Pattern A — Calculator pages (20 files)
Missing: About link, `EMI Calculator →` arrow, `Toggle menu` aria-label. Logo uses `Cal<span>Stacker</span>`.

- `calculators/cagr/index.html`
- `calculators/compound-interest/index.html`
- `calculators/emi/index.html`
- `calculators/epf/index.html`
- `calculators/fd/index.html`
- `calculators/gratuity/index.html`
- `calculators/gst/index.html`
- `calculators/hra/index.html`
- `calculators/income-tax/index.html`
- `calculators/inflation/index.html`
- `calculators/lumpsum/index.html`
- `calculators/net-worth/index.html`
- `calculators/ppf/index.html`
- `calculators/rd/index.html`
- `calculators/retirement/index.html`
- `calculators/salary/index.html`
- `calculators/simple-interest/index.html`
- `calculators/sip/index.html`
- `calculators/step-up-sip/index.html`
- `calculators/swp/index.html`

### Pattern B — About / Privacy (2 files)
Same as Pattern A (no About self-link in nav).

- `about/index.html`
- `privacy/index.html`

### Pattern C — Homepage (1 file)
Extra links: Blog, Quests (`/dashboard/`). Missing About.

- `index.html`

### Pattern D — Guides index (1 file)
Links: Blog, Calculators (`/#tools`). Missing Employee Tools, Investor Tools, About.

- `guides/index.html`

### Pattern E — Blog index + posts (5 files)
Links: Blog, Calculators. No EMI CTA on blog index; posts vary.

- `blog/index.html`
- `blog/ctc-to-in-hand-salary-guide/index.html`
- `blog/hra-exemption-bangalore-guide/index.html`
- `blog/old-vs-new-tax-regime-2026/index.html`
- `blog/sip-5000-per-month-10-years/index.html`

### Pattern F — Contact (1 file)
Minimal nav: EMI Calculator CTA only. Missing Employee Tools, Investor Tools, About.

- `contact/index.html`

### Pattern G — Disclaimer (1 file)
Same as Pattern A.

- `disclaimer/index.html`

### Pattern H — Dashboard (1 file)
Completely different nav: Site Home, Blog, Handoff Doc. No standard links.

- `dashboard/index.html`

### Pattern I — Legacy scenario guides (12 files)
Mix of Blog + Calculators or calculator-style nav. None match standard.

- `guides/emi/10-lakh-car-loan/index.html`
- `guides/emi/25-lakh-10-years/index.html`
- `guides/emi/30-lakh-15-years/index.html`
- `guides/emi/50-lakh-20-years/index.html`
- `guides/hra/bangalore-25000-basic/index.html`
- `guides/salary/35000-ctc-in-hand/index.html`
- `guides/salary/600000-ctc-breakdown/index.html`
- `guides/sip/10000-per-month-15-years/index.html`
- `guides/sip/3000-per-month-20-years/index.html`
- `guides/sip/5000-per-month-10-years/index.html`
- `guides/tax/12-lakh-salary-old-vs-new/index.html`
- `guides/tax/zero-tax-12-lakh/index.html`

---

## Calculator Pages Missing Affiliate CTAs

**Structural check:** All 20 calculator pages have a `.affiliate-cta` block.

**Part 3 compliance check:** All 20 pages need updating to the required template:
- Required: Zerodha + Angel One dual CTAs with `href="#affiliate-link-needed"`
- Required on 7 investment calcs: additional Groww CTA
- Current state: single custom CTA per page with `href="#"` and `data-partner` attributes (not Part 3 format)

| Calculator | Has `.affiliate-cta` | Part 3 template applied |
|------------|---------------------|---------------------------|
| EMI | Yes | No |
| SIP | Yes | No |
| Salary | Yes | No |
| Income Tax | Yes | No |
| HRA | Yes | No |
| Gratuity | Yes | No |
| EPF | Yes | No |
| PPF | Yes | No |
| FD | Yes | No |
| RD | Yes | No |
| GST | Yes | No |
| Net Worth | Yes | No |
| Retirement | Yes | No |
| Lumpsum | Yes | No |
| Step-up SIP | Yes | No |
| Compound Interest | Yes | No |
| Simple Interest | Yes | No |
| CAGR | Yes | No |
| SWP | Yes | No |
| Inflation | Yes | No |

Groww-specific CTA (Part 3): missing on SIP, Lumpsum, Step-up SIP, CAGR, SWP, Retirement, Compound Interest.

---

## Key Page Existence Checks

| Check | Result |
|-------|--------|
| Does `sitemap.xml` exist? | **Y** — present at project root (45 URLs currently; Part 7 requires 29 URLs) |
| Does `guides/index.html` exist? | **Y** — exists but lists legacy scenario guides, not the 5 new Part 5 guides |
| Does `about/index.html` exist? | **Y** |
| Does `privacy/index.html` exist? | **Y** |

---

## All 20 Calculator Pages — Existence Check

**All 20 confirmed present. None missing.**

| # | Calculator | Path | Status |
|---|------------|------|--------|
| 1 | EMI | `calculators/emi/index.html` | ✅ |
| 2 | SIP | `calculators/sip/index.html` | ✅ |
| 3 | Salary | `calculators/salary/index.html` | ✅ |
| 4 | Income Tax | `calculators/income-tax/index.html` | ✅ |
| 5 | HRA | `calculators/hra/index.html` | ✅ |
| 6 | Gratuity | `calculators/gratuity/index.html` | ✅ |
| 7 | EPF | `calculators/epf/index.html` | ✅ |
| 8 | PPF | `calculators/ppf/index.html` | ✅ |
| 9 | FD | `calculators/fd/index.html` | ✅ |
| 10 | RD | `calculators/rd/index.html` | ✅ |
| 11 | GST | `calculators/gst/index.html` | ✅ |
| 12 | Net Worth | `calculators/net-worth/index.html` | ✅ |
| 13 | Retirement | `calculators/retirement/index.html` | ✅ |
| 14 | Lumpsum | `calculators/lumpsum/index.html` | ✅ |
| 15 | Step-up SIP | `calculators/step-up-sip/index.html` | ✅ |
| 16 | Compound Interest | `calculators/compound-interest/index.html` | ✅ |
| 17 | Simple Interest | `calculators/simple-interest/index.html` | ✅ |
| 18 | CAGR | `calculators/cagr/index.html` | ✅ |
| 19 | SWP | `calculators/swp/index.html` | ✅ |
| 20 | Inflation | `calculators/inflation/index.html` | ✅ |

---

## Additional Findings (for Parts 1–7)

### Part 5 — New Financial Guides (NOT YET CREATED)

| Guide | Required Path | Status |
|-------|---------------|--------|
| Salary Guide | `guides/salary-guide/index.html` | ❌ Missing |
| Tax Saving Guide | `guides/tax-saving-guide/index.html` | ❌ Missing |
| SIP Investment Guide | `guides/sip-investment-guide/index.html` | ❌ Missing |
| EMI Guide | `guides/emi-guide/index.html` | ❌ Missing |
| EPF Guide | `guides/epf-guide/index.html` | ❌ Missing |

### Part 4 — Schema Markup

All 20 calculator pages have `application/ld+json` schema, but use `@graph` format with BreadcrumbList — differs from Part 4's simpler single `WebApplication` block spec.

### Part 3 — CSS

`assets/css/style.css` has `.affiliate-cta` styles (lines ~439+). Missing Part 5 guide styles: `.guide-layout`, `.guide-header`, `.faq-section`, etc.

### Title Tags (Fix 1A context)

No `{{title}}` bugs found. Some titles differ from Part 1 spec (e.g. `about/index.html` uses "About — CalStacker.com" vs required "About CalStacker — Free Financial Calculators for India").

---

## Summary Checklist

```
CALSTACKER AUDIT:
[x] Total HTML files found: 44 (listed above)
[x] Files where {{title}} appears literally: None
[x] Files missing AdSense script tag: dashboard/index.html (1 file)
[x] Files where nav differs from standard: All 44 pages
[x] Calculator pages missing affiliate CTAs: None structurally; all 20 need Part 3 template
[x] Does sitemap.xml exist? Y
[x] Does guides/index.html exist? Y (needs Part 6 rewrite)
[x] Does about/index.html exist? Y
[x] Does privacy/index.html exist? Y
[x] All 20 calculator pages confirmed to exist? Yes — none missing
```

---

**Next step:** Awaiting user confirmation — type **PROCEED** to begin Part 1.
