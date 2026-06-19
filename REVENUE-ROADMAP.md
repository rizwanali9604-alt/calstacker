# CalStacker Revenue Roadmap — ₹30,000–40,000/month by December 2026

**Goal:** Earn ₹30,000–40,000 INR per month from calstacker.com by December 2026  
**Last updated:** June 8, 2026

---

## Revenue Mix (Realistic Target)

| Source | Dec 2026 Target | Notes |
|--------|-----------------|-------|
| Google AdSense | ₹8,000–15,000 | Needs 80K–150K pageviews/month at ₹50–100 RPM |
| Affiliate (Zerodha, Groww, Angel One) | ₹12,000–20,000 | Demat/SIP referrals at ₹300–500 per account |
| Direct/sponsored (optional) | ₹5,000–10,000 | Calculator embeds, sponsored guides |
| **Total** | **₹25,000–45,000** | Requires consistent traffic growth |

---

## Phase 1: AdSense Approval (June–July 2026)

- [x] Remove ad placeholders and broken affiliate links
- [x] noindex thin/duplicate pages (blog, legacy scenario guides)
- [x] Trust pages: About, Privacy, Terms, Disclaimer, Contact
- [x] Cookie consent banner (GDPR-style for ads)
- [x] 13 long-form guides (1,000+ words each)
- [x] SEO content on all 20 calculator pages
- [x] Sitemap with 40 quality URLs
- [ ] **Apply for AdSense** after 2–4 weeks of indexed content + some organic traffic
- [ ] Enable ads in `assets/js/ads-config.js` (`enabled: true`) only after approval
- [ ] Submit site in Google Search Console; fix any coverage errors
- [ ] Get 10–20 quality backlinks (Reddit IndiaInvestments, Quora, guest posts)

**AdSense confidence (after this phase): 70–80%**

---

## Phase 2: Traffic Growth (July–October 2026)

Target: **50,000+ monthly sessions** by October, **100,000+** by December

### SEO Content
- [x] 13 pillar guides live
- [ ] Add 10–15 more guides (credit cards, NPS, ELSS, car loan, personal loan, budget)
- [ ] Publish 2 guides per month minimum
- [ ] Internal linking: every calculator → related guide → 2 other calculators
- [ ] Add author bylines / "Reviewed by" on guides (E-E-A-T)

### Technical SEO
- [ ] Core Web Vitals pass (Lighthouse 90+ mobile)
- [ ] Index all 40+ pages in Search Console
- [ ] Fix any 404s from old URLs with 301 redirects
- [ ] Add FAQ schema to all calculator pages (partially done via inject script)

### Distribution
- [ ] Share calculators on Reddit r/IndiaInvestments, r/personalfinanceindia (value-first, not spam)
- [ ] Answer Quora questions with calculator links
- [ ] Pinterest pins for EMI/SIP infographics
- [ ] YouTube Shorts: "₹10K SIP for 20 years = ?" with link in description
- [ ] LinkedIn posts targeting HR/finance professionals

---

## Phase 3: Monetization Optimization (October–December 2026)

### AdSense (after approval)
- [ ] Place ads above fold on high-traffic calculators (EMI, SIP, salary, tax)
- [ ] Enable auto ads initially; A/B test manual placements
- [ ] Target RPM ₹80–120 (finance niche India)
- [ ] Required pageviews for ₹10K ads: ~100K–125K/month at ₹80 RPM

### Affiliate Revenue
- [ ] Re-add Zerodha/Groww CTAs with **real affiliate URLs** (post-AdSense approval)
- [ ] Place affiliate blocks on: SIP, lumpsum, step-up-sip, retirement, PPF, FD calculators
- [ ] "Open free demat account" CTA on investment guides
- [ ] Track clicks with UTM parameters
- [ ] Target: 30–50 demat account openings/month × ₹400 avg = ₹12,000–20,000

### Email List (optional but high leverage)
- [ ] Add "Tax saving checklist PDF" lead magnet on tax guide
- [ ] Monthly newsletter with new calculator/guide links
- [ ] Monetize via affiliate promotions to engaged list

---

## Monthly Milestones

| Month | Sessions Target | Revenue Target | Key Actions |
|-------|-----------------|----------------|-------------|
| Jun 2026 | 2,000 | ₹0 | Deploy all fixes, GSC setup |
| Jul 2026 | 8,000 | ₹500–2,000 | AdSense apply, 2 new guides |
| Aug 2026 | 20,000 | ₹3,000–5,000 | AdSense live, affiliates on |
| Sep 2026 | 40,000 | ₹8,000–12,000 | Content velocity, backlinks |
| Oct 2026 | 60,000 | ₹15,000–20,000 | Optimize ad placements |
| Nov 2026 | 80,000 | ₹22,000–30,000 | Scale distribution |
| Dec 2026 | 100,000+ | **₹30,000–40,000** | Review & double down on top pages |

---

## What ₹30K–40K/month Actually Requires

**Conservative math:**
- 100,000 pageviews × ₹80 RPM = ₹8,000 AdSense
- 40 demat referrals × ₹400 = ₹16,000 affiliate
- 60,000 pageviews on investment pages × extra affiliate CTR = ₹8,000
- **Total ≈ ₹32,000**

**You need roughly 100K monthly pageviews + working affiliate funnel** — not achievable with SEO alone in 6 months unless you also drive traffic via social/video or get lucky with viral content.

---

## Confidence Estimates

| Goal | Confidence | Reasoning |
|------|------------|-----------|
| **AdSense approval** (by Aug 2026) | **70–80%** | Site now has trust pages, 13 guides, 20 enriched calculators, no policy violations |
| **₹5,000/month** by Dec 2026 | **45–55%** | Achievable with 30K–50K pageviews + modest affiliates |
| **₹15,000/month** by Dec 2026 | **25–35%** | Needs 60K+ pageviews and consistent SEO traction |
| **₹30,000–40,000/month** by Dec 2026 | **12–20%** | Requires ~100K pageviews + affiliate conversions; 6 months is aggressive for a new domain |

**To improve ₹30–40K confidence to 40–50%:** Add YouTube/Shorts distribution, publish 25+ guides, build 50+ backlinks, and spend 10+ hours/week on SEO for 6 months.

---

## Immediate Next Steps (This Week)

1. Push this commit and verify live deployment on calstacker.com
2. Register / verify Google Search Console
3. Submit sitemap.xml
4. Apply for AdSense in 2–4 weeks once pages are indexed
5. Create Zerodha/Groww affiliate accounts if not already done
6. Write 2 more guides: NPS Guide + ELSS Guide
7. Share SIP and EMI calculators on one relevant Reddit thread

---

## Files Changed in This Release

- 20 calculators: SEO sections, editorial trust bar, extra FAQs
- SIP calculator: goal mode toggle
- EMI calculator: doughnut chart, principal slider
- 8 new guides + 5 existing = **13 guides total**
- sitemap.xml: **40 URLs**
- scripts: `calc-seo-data.js`, `inject-calc-seo.js`, `create-new-guides.js`
