/**
 * Generate blog index and articles.
 * Run: node scripts/generate-blog.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

const articles = [
  {
    slug: 'old-vs-new-tax-regime-2026',
    title: 'Old vs New Tax Regime India 2026-27 — Which Saves More?',
    desc: 'Complete comparison of old and new tax regime for FY 2026-27. Zero tax up to ₹12 lakh under new regime explained.',
    date: '2026-06-07',
    body: `
      <p>Every salaried Indian must choose between the old and new tax regime each financial year. For FY 2026-27, the new regime offers revised slabs and an enhanced rebate under Section 87A that can make tax zero up to ₹12 lakh taxable income.</p>
      <h2>New regime slabs (FY 2026-27)</h2>
      <ul>
        <li>Up to ₹4 lakh: 0%</li>
        <li>₹4–8 lakh: 5%</li>
        <li>₹8–12 lakh: 10%</li>
        <li>₹12–16 lakh: 15%</li>
        <li>Above ₹24 lakh: 30%</li>
      </ul>
      <p>Standard deduction: ₹75,000. No 80C, 80D, or HRA deductions in new regime.</p>
      <h2>When old regime wins</h2>
      <p>If you claim ₹1.5L under 80C, ₹25K under 80D, and significant HRA exemption, old regime may save more above ₹15 lakh gross income.</p>
      <p><a href="/calculators/income-tax/">Use our Income Tax Calculator →</a> | <a href="/guides/tax/12-lakh-salary-old-vs-new/">₹12L salary guide →</a></p>
    `
  },
  {
    slug: 'sip-5000-per-month-10-years',
    title: 'What ₹5,000/month SIP Becomes in 10 Years',
    desc: 'SIP returns calculator walkthrough: ₹5,000 monthly mutual fund SIP for 10 years at 12% return.',
    date: '2026-06-06',
    body: `
      <p>A ₹5,000 monthly SIP is one of India's most common starting points for mutual fund investing. Over 10 years, you invest ₹6 lakh total — but compounding can grow that substantially.</p>
      <h2>Example at 12% annual return</h2>
      <p>At 12% CAGR, ₹5,000/month for 10 years grows to approximately ₹11.5 lakh — nearly double your invested amount.</p>
      <h2>Key factors</h2>
      <ul>
        <li>Return assumption: equity mutual funds historically 10–14% long term</li>
        <li>Step-up SIP grows corpus faster — try our Step-Up SIP calculator</li>
        <li>Start early: 10 extra years of compounding doubles the impact</li>
      </ul>
      <p><a href="/calculators/sip/">SIP Calculator →</a> | <a href="/guides/sip/5000-per-month-10-years/">Pre-filled ₹5K guide →</a></p>
    `
  },
  {
    slug: 'ctc-to-in-hand-salary-guide',
    title: 'CTC to In-Hand Salary — Complete India Guide 2026',
    desc: 'How to convert CTC to take-home salary. PF, professional tax, TDS and new regime explained.',
    date: '2026-06-05',
    body: `
      <p>Your offer letter shows CTC (Cost to Company) but your bank account receives in-hand salary after deductions. Understanding this gap prevents financial surprises.</p>
      <h2>Typical deductions</h2>
      <ul>
        <li><strong>EPF:</strong> 12% of basic (capped at ₹15,000 basic = ₹1,800/month max employee share)</li>
        <li><strong>Professional tax:</strong> ₹200/month in most states</li>
        <li><strong>TDS:</strong> Based on old or new tax regime</li>
      </ul>
      <h2>Quick rule of thumb</h2>
      <p>New regime, ₹6L CTC: expect roughly ₹45,000–48,000 in-hand monthly depending on employer structure.</p>
      <p><a href="/calculators/salary/">Salary Calculator →</a> | <a href="/guides/salary/600000-ctc-breakdown/">₹6L CTC guide →</a></p>
    `
  },
  {
    slug: 'hra-exemption-bangalore-guide',
    title: 'HRA Exemption in Bangalore — Section 10(13A) Guide',
    desc: 'How to calculate HRA exemption when renting in Bangalore. Metro city 50% rule with examples.',
    date: '2026-06-04',
    body: `
      <p>If you rent a house in Bangalore and receive HRA from your employer, you can claim exemption under Section 10(13A) — but only under the old tax regime.</p>
      <h2>Exemption formula</h2>
      <p>Exemption = minimum of:</p>
      <ul>
        <li>Actual HRA received</li>
        <li>Rent paid minus 10% of basic salary</li>
        <li>50% of basic (metro city — Bangalore qualifies)</li>
      </ul>
      <h2>Example</h2>
      <p>Basic ₹25,000, HRA ₹10,000, Rent ₹15,000: exemption is typically ₹10,000/month if all conditions met.</p>
      <p><a href="/calculators/hra/">HRA Calculator →</a> | <a href="/guides/hra/bangalore-25000-basic/">Bangalore ₹25K basic guide →</a></p>
    `
  }
];

function shell(title, desc, canonical, body, date) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — CalStacker Blog</title>
  <meta name="description" content="${desc}">
  <link rel="canonical" href="https://calstacker.com/blog/${canonical}/">
  <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/assets/css/style.css">
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-RR873MXQNX"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-RR873MXQNX');</script>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8332278519903196" crossorigin="anonymous"></script>
</head>
<body>
  <nav class="nav"><div class="nav-inner">
    <a href="/" class="nav-logo">Cal<span>Stacker</span></a>
    <div class="nav-links"><a href="/blog/" class="nav-link">Blog</a><a href="/#tools" class="nav-link">Calculators</a></div>
    <button class="nav-toggle" aria-label="Menu">☰</button>
  </div></nav>
  <header class="calc-page-header"><div class="container">
    <div class="breadcrumb"><a href="/">Home</a> → <a href="/blog/">Blog</a></div>
    <h1 class="calc-page-title">${title}</h1>
    <p class="calc-page-desc">${date}</p>
  </div></header>
  <article class="content-page">${body}</article>
  <footer class="footer"><div class="container"><div class="footer-bottom" style="border:none;padding:20px 0;"><span>© 2026 CalStacker.com</span></div></div></footer>
  <script src="/assets/js/calc-core.js"></script>
  <script src="/assets/js/nav.js"></script>
  <script src="/assets/js/analytics-events.js"></script>
</body></html>`;
}

articles.forEach(a => {
  const dir = path.join(root, 'blog', a.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), shell(a.title, a.desc, a.slug + '/', a.body, a.date));
  console.log('article', a.slug);
});

const cards = articles.map(a =>
  `<a href="/blog/${a.slug}/" class="calc-card"><div class="calc-icon-wrap">📝</div><div class="calc-info"><div class="calc-name">${a.title}</div><div class="calc-desc">${a.desc.slice(0, 90)}...</div></div><span class="calc-arrow">→</span></a>`
).join('');

const index = shell('Finance Blog — CalStacker', 'India finance guides on tax, SIP, salary and HRA.', 'index/', `
  <div class="calc-grid">${cards}</div>
`, '');

fs.writeFileSync(path.join(root, 'blog/index.html'), index.replace('<article class="content-page">', '<section class="section-sm"><div class="container">').replace('</article>', '</div></section>'));
console.log('blog index done');
