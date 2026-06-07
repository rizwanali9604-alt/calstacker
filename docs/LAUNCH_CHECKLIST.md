# Calstacker.com launch checklist

## DNS (Week 1)

- [ ] Cloudflare: add `calstacker.com` zone
- [ ] Point apex + `www` to Cloudflare Pages or Workers custom domain
- [ ] Enable HTTPS (Full)
- [ ] Set canonical host: `https://calstacker.com` (redirect www → apex or vice versa)

## Deploy

- [ ] Deploy folder `E:\calstacker` to Cloudflare Pages (or connect Git)
- [ ] Apply `_redirects` so `*.workers.dev` → `calstacker.com`
- [ ] Verify 5 flagship URLs return 200:
  - `/calculators/emi/`
  - `/calculators/sip/`
  - `/calculators/income-tax/`
  - `/calculators/salary/`
  - `/calculators/hra/`

## Legal / trust

- [x] `/privacy/`
- [x] `/disclaimer/`
- [x] `/about/`
- [x] `/contact/`

## SEO

- [ ] Google Search Console: add property `calstacker.com`
- [ ] Submit `https://calstacker.com/sitemap.xml`
- [ ] Request indexing for homepage + 5 flagship calculators
- [ ] Add disclaimer + contact URLs to sitemap (run `scripts/patch-sitemap.js` if added)

## Post-launch (Phase 1)

- [ ] 1 India finance article per week (see `rizwan-ceo-system/data/content-calendar-52weeks.json`)
- [ ] AdSense after 12+ articles and steady traffic
