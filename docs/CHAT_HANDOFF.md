# CalStacker — Chat Handoff (paste into new Cursor window)

Copy everything below into a **new Cursor Agent chat** to restore full project context.

---

## Mission

**Goal:** ₹70,000/month revenue from CalStacker.com within **6 months** (by Dec 2026).  
**Site:** https://calstacker.com  
**Repo:** https://github.com/rizwanali9604-alt/calstacker  
**Stack:** Static HTML/CSS/JS, Cloudflare Pages, no build step.

---

## Before acting

1. Read [`data/quests.json`](../data/quests.json) — all quests by phase  
2. Read [`data/progress.json`](../data/progress.json) — completed quests + KPIs  
3. Read [`docs/REVENUE_ROADMAP.md`](REVENUE_ROADMAP.md) — monthly targets  
4. Open [`dashboard/index.html`](../dashboard/index.html) — quest UI (local or live)

**Say:** *"Continue revenue sprint — complete next pending code quests and update progress.json"*

---

## Work completed

| Area | Status |
|------|--------|
| 20 financial calculators | Done — `/calculators/{slug}/` |
| Homepage + legal pages | Done — about, privacy, disclaimer, contact |
| Master CSS/JS factory | [`assets/css/style.css`](../assets/css/style.css), calc-core, nav, charts |
| GA4 | `G-RR873MXQNX` in all HTML heads |
| AdSense client script | `ca-pub-8332278519903196` in heads (approval pending) |
| Quest Dashboard | `/dashboard/` — XP, blockers, DeepSeek advisor, Cursor export |
| GA4 events | `analytics-events.js` — calculate_click, result_view, affiliate_click |
| Monetization config | `monetization-config.js` — affiliate URLs still `#` |
| Blog | `/blog/` + 4 cornerstone articles |
| SEO guides | `/guides/` — 12 long-tail scenario pages |
| Patch scripts | `scripts/patch-analytics.js`, `patch-analytics-events.js`, `patch-affiliates.js`, `patch-schema.js`, `patch-sitemap.js`, `generate-guide-pages.js` |

### Git commits (recent)

- `40183b4` — Initial 20 calculators  
- `424a022` — AdSense client script  
- `20e8b25` — GA4 tracking  
- `b4154fa` — Cloudflare redirects, sitemap, launch docs  
- Revenue sprint commit — dashboard, blog, guides, events

---

## Work pending (priority)

### Manual blockers (user must do)

- [ ] Cloudflare DNS live for calstacker.com  
- [ ] Google Search Console + sitemap submit  
- [ ] AdSense approval + ad unit IDs → `assets/js/ads-config.js`  
- [ ] Affiliate signup: Zerodha, Groww, ClearTax, Angel One → `monetization-config.js`  
- [ ] DeepSeek API key in dashboard (optional, post-Cursor)

### Code backlog (Cursor Agent)

- [ ] Month 2: 20 more articles, 30+ guide pages  
- [ ] Month 3: 100+ programmatic pages  
- [ ] Month 4: Tax season content burst  
- [ ] Company salary pages (Wipro, TCS, Infosys)  
- [ ] Email capture on tax calculator (Month 6)

---

## Key files

```
calstacker/
├── index.html
├── dashboard/          # Quest CRM UI
├── data/
│   ├── quests.json     # Quest definitions
│   ├── progress.json   # Git-tracked completion
│   └── guide-pages.json
├── blog/               # Articles
├── guides/             # Long-tail SEO pages
├── calculators/        # 20 tools
├── assets/js/
│   ├── calc-core.js
│   ├── analytics-events.js
│   ├── monetization-config.js
│   └── ads-config.js
├── scripts/            # Patch & generate scripts
└── docs/
    ├── CHAT_HANDOFF.md (this file)
    └── REVENUE_ROADMAP.md
```

---

## Cursor mode guide

| Mode | When |
|------|------|
| **Ask** | Strategy, revenue math, reviews |
| **Plan** | Architecture, 50+ page builds |
| **Agent** | Ship code, run patches, commit |
| **Multitask** | 10+ guide pages or articles in parallel |

---

## Revenue math reminder

- ₹70k/month ≈ 233k visits at ₹300 RPM (AdSense only)  
- Realistic mix: AdSense + Zerodha/Groww affiliates + tax season spike  
- Top traffic calcs: EMI, SIP, Income Tax, Salary, HRA

---

## IDs (do not change without reason)

- GA4: `G-RR873MXQNX`  
- AdSense client: `ca-pub-8332278519903196`
