/**
 * Generates 8 new long-form guide pages for CalStacker
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function guideHtml(g) {
  const faqSchema = g.faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a }
  }));

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${g.title} — CalStacker</title>
  <meta name="description" content="${g.description}">
  <link rel="canonical" href="https://calstacker.com/guides/${g.slug}/">
  <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/assets/css/style.css">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8332278513903196" crossorigin="anonymous"></script>
  <script type="application/ld+json">
  ${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: g.title,
    description: g.description,
    author: { '@type': 'Organization', name: 'CalStacker' },
    publisher: { '@type': 'Organization', name: 'CalStacker', url: 'https://calstacker.com' },
    datePublished: '2026-06-08',
    dateModified: '2026-06-08',
    mainEntityOfPage: `https://calstacker.com/guides/${g.slug}/`
  }, null, 2)}
  </script>
  <script type="application/ld+json">
  ${JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqSchema }, null, 2)}
  </script>
</head>
<body>
  <nav class="nav">
    <div class="nav-inner">
      <a href="/" class="nav-logo">CalStacker</a>
      <div class="nav-links">
        <a href="/#employee" class="nav-link">Employee Tools</a>
        <a href="/#investor" class="nav-link">Investor Tools</a>
        <a href="/guides/" class="nav-link">Guides</a>
        <a href="/about/" class="nav-link">About</a>
        <a href="/contact/" class="nav-link">Contact</a>
        <a href="/calculators/emi/" class="nav-cta">EMI Calculator →</a>
      </div>
      <button class="nav-toggle" aria-label="Toggle menu">☰</button>
    </div>
  </nav>

  <header class="guide-header">
    <div class="container">
      <div class="breadcrumb"><a href="/">Home</a> → <a href="/guides/">Guides</a> → ${g.breadcrumb}</div>
      <h1>${g.title}</h1>
      <p class="guide-subtitle">${g.subtitle}</p>
    </div>
  </header>

  <div class="container guide-layout">
    <article class="guide-content">
${g.body}
      <section class="guide-faq">
        <h2>Frequently Asked Questions</h2>
${g.faqs.map(f => `        <div class="faq-item">
          <h3>${f.q}</h3>
          <p>${f.a}</p>
        </div>`).join('\n')}
      </section>
      <div class="guide-cta-bottom">
        <p><strong>${g.ctaTitle}</strong></p>
        <p>${g.ctaText}</p>
        <p><a href="${g.calcUrl}" class="calc-btn" style="display:inline-block;text-decoration:none;margin-top:8px;">${g.ctaBtn} →</a></p>
      </div>
    </article>
    <aside class="guide-sidebar">
      <div class="sidebar-tool-cta">
        <p><strong>${g.sidebarCalc}</strong></p>
        <p style="font-size:14px;color:var(--text-secondary);margin:8px 0 16px;">${g.sidebarDesc}</p>
        <a href="${g.calcUrl}" class="calc-btn" style="display:inline-block;text-decoration:none;">Try Calculator →</a>
      </div>
      <div style="margin-top:28px;">
        <p style="font-weight:600;margin-bottom:12px;">Related Guides</p>
        <ul style="list-style:none;padding:0;margin:0;font-size:14px;line-height:2;">
${g.related.map(r => `          <li><a href="${r.url}">${r.title}</a></li>`).join('\n')}
        </ul>
      </div>
    </aside>
  </div>

  <footer class="footer">
    <div class="container">
      <p>© 2026 CalStacker — Free financial calculators for India</p>
      <nav>
        <a href="/about/">About</a>
        <a href="/privacy/">Privacy</a>
        <a href="/terms/">Terms</a>
        <a href="/disclaimer/">Disclaimer</a>
      </nav>
    </div>
  </footer>
  <script src="/assets/js/nav.js"></script>
  <script src="/assets/js/ads-config.js"></script>
  <script src="/assets/js/cookie-consent.js"></script>
</body>
</html>`;
}

const guides = [
  {
    slug: 'hra-exemption-guide',
    breadcrumb: 'HRA Exemption Guide',
    title: 'HRA Exemption Guide India 2026 — How to Claim House Rent Allowance',
    subtitle: 'Section 10(13A) rules, metro vs non-metro, documents, and worked examples for salaried employees',
    description: 'Complete HRA exemption guide for India. Learn Section 10(13A) rules, metro vs non-metro limits, documents needed, and how much tax you save.',
    calcUrl: '/calculators/hra/',
    sidebarCalc: 'HRA Calculator',
    sidebarDesc: 'Calculate your exact exemption',
    ctaTitle: 'Calculate your HRA exemption',
    ctaText: 'Use the free CalStacker HRA calculator with your basic, rent, and city type.',
    ctaBtn: 'HRA Calculator',
    related: [
      { url: '/guides/tax-saving-guide/', title: 'Tax Saving Guide' },
      { url: '/guides/salary-guide/', title: 'Salary Guide' },
      { url: '/guides/old-vs-new-tax-regime-guide/', title: 'Old vs New Tax Regime' }
    ],
    faqs: [
      { q: 'Can I claim HRA under the new tax regime?', a: 'No. HRA exemption under Section 10(13A) is available only under the old tax regime. If you opt for the new regime, HRA received is fully taxable with no rent-based exemption.' },
      { q: 'Is Bangalore a metro city for HRA?', a: 'No. For HRA purposes, only Mumbai, Delhi, Kolkata, and Chennai are treated as metro cities (50% of basic rule). Bangalore, Hyderabad, and Pune use the 40% of basic rule.' },
      { q: 'What documents are needed for HRA claim?', a: 'Rent receipts with landlord details, rental agreement, and landlord PAN if annual rent exceeds ₹1 lakh. Your employer may also require Form 12BB declarations at the start of the financial year.' },
      { q: 'Can I pay rent to my parents and claim HRA?', a: 'Yes, if the arrangement is genuine — you pay rent via bank transfer, have a valid agreement, and your parents declare rental income in their ITR. Tax authorities reject sham arrangements without real rent flow.' },
      { q: 'What if my HRA is less than rent paid?', a: 'Exemption is limited to actual HRA received. If rent is ₹20,000 but HRA is only ₹10,000, the exemption cannot exceed ₹10,000 even if the formula based on rent suggests a higher figure.' }
    ],
    body: `
      <p>House Rent Allowance (HRA) is one of the most valuable tax benefits for salaried employees in India who live in rented accommodation. Under Section 10(13A) of the Income Tax Act, a portion of the HRA you receive from your employer can be exempt from tax — but only if you meet specific conditions and choose the old tax regime. Millions of employees in Bangalore, Pune, Hyderabad, and other cities pay rent every month without fully understanding how much tax they could save, or whether their rent receipts and landlord PAN requirements are in order.</p>

      <p>This guide explains the complete HRA exemption formula, the difference between metro and non-metro rules, every document your employer and the tax department expect, and worked examples for common salary structures. Whether you earn ₹8 lakh or ₹25 lakh per year, understanding HRA helps you structure your salary break-up during job negotiations and avoid last-minute TDS surprises in March.</p>

      <h2>What Is HRA and Who Can Claim It?</h2>
      <p>HRA is a salary component that employers pay to help employees cover rental costs. Not every employee receives HRA — it appears in your salary structure only if your company includes it. To claim exemption, you must actually pay rent for accommodation you occupy, receive HRA as part of your salary, and be on the old tax regime. If you live in your own house or with family without paying rent, there is no HRA exemption even if your payslip shows an HRA component.</p>

      <h2>The HRA Exemption Formula</h2>
      <p>Exemption is the <strong>least of three amounts</strong>:</p>
      <ul>
        <li><strong>Actual HRA received</strong> from your employer</li>
        <li><strong>Rent paid minus 10% of basic salary</strong> (basic + DA if applicable)</li>
        <li><strong>50% of basic</strong> for metro cities (Mumbai, Delhi, Kolkata, Chennai) or <strong>40% of basic</strong> for all other cities</li>
      </ul>
      <p>Taxable HRA = HRA received − exempt amount. The exempt portion reduces your taxable salary; the rest is taxed at your slab rate.</p>

      <h2>Worked Example: Bangalore Employee</h2>
      <p>Consider Priya with basic salary ₹25,000/month, HRA ₹12,000/month, paying rent ₹15,000/month in Bangalore (non-metro for HRA):</p>
      <ul>
        <li>Actual HRA = ₹12,000</li>
        <li>Rent − 10% of basic = ₹15,000 − ₹2,500 = ₹12,500</li>
        <li>40% of basic = ₹10,000</li>
      </ul>
      <p>Exemption = ₹10,000/month = ₹1,20,000/year. At 30% tax slab, annual tax saved ≈ ₹36,000 plus cess. Use our HRA calculator to model your exact numbers.</p>

      <h2>Metro vs Non-Metro Cities</h2>
      <p>Only four cities qualify as metros for the 50% rule. Bangalore, Hyderabad, Gurgaon, Pune, and Ahmedabad use 40% of basic. This surprises many IT professionals who assume Bangalore is metro. The 10% difference on basic can reduce exemption by ₹2,000–5,000 per month for high basic salaries.</p>

      <h2>Documents and Employer Process</h2>
      <p>At the start of each financial year, submit Form 12BB to your employer with rent receipts (monthly or quarterly), rental agreement copy, and landlord PAN if annual rent exceeds ₹1 lakh. Employers adjust TDS monthly based on declared exemption. If you fail to submit proofs, full HRA is taxed and you may claim refund when filing ITR — but monthly cash flow suffers from higher TDS.</p>

      <h2>Common Mistakes to Avoid</h2>
      <p><strong>Choosing new regime while paying high rent:</strong> You lose all HRA benefit. <strong>Missing landlord PAN:</strong> Required when rent exceeds ₹1 lakh/year. <strong>Fake rent to parents without bank trail:</strong> Scrutiny risk. <strong>Ignoring basic definition:</strong> HRA formula uses basic + DA, not full CTC. <strong>Not updating when switching jobs:</strong> Aggregate rent declarations across employers for the year.</p>

      <h2>HRA and Home Loan Together</h2>
      <p>You can claim HRA for rented accommodation even if you own a house in another city, provided you do not occupy the owned property. You cannot claim HRA for the same house for which you claim home loan interest deduction under Section 24(b). Dual benefit (HRA + home loan interest) is allowed when the owned property is in a different city and genuinely rented out or vacant while you rent elsewhere for employment.</p>
`
  },
  {
    slug: 'gratuity-guide',
    breadcrumb: 'Gratuity Guide',
    title: 'Gratuity Complete Guide India 2026 — Calculation, Tax & Eligibility',
    subtitle: 'Payment of Gratuity Act rules, ₹20 lakh cap, formula, and when you receive gratuity',
    description: 'Gratuity guide for India: eligibility, formula (15/26), ₹20 lakh cap, tax exemption, and how gratuity appears in your CTC.',
    calcUrl: '/calculators/gratuity/',
    sidebarCalc: 'Gratuity Calculator',
    sidebarDesc: 'Estimate your gratuity amount',
    ctaTitle: 'Estimate your gratuity',
    ctaText: 'Enter basic salary and years of service for an instant calculation.',
    ctaBtn: 'Gratuity Calculator',
    related: [
      { url: '/guides/salary-guide/', title: 'Salary Guide' },
      { url: '/guides/epf-guide/', title: 'EPF Guide' },
      { url: '/guides/retirement-planning-guide/', title: 'Retirement Planning' }
    ],
    faqs: [
      { q: 'Is gratuity mandatory for all companies in India?', a: 'The Payment of Gratuity Act applies to establishments with 10 or more employees. Covered employees who complete 5 years of continuous service are entitled to gratuity on resignation, retirement, or death/disablement.' },
      { q: 'Is gratuity taxable in India?', a: 'For private sector employees, gratuity up to ₹20 lakh is exempt under Section 10(10). Amounts above the cap are taxable as salary income. Government employees have separate exemption rules.' },
      { q: 'Can I get gratuity before 5 years?', a: 'Generally no, except in case of death or disablement. Resigning before completing 5 years typically forfeits statutory gratuity, though some employers pay ex-gratia voluntarily.' },
      { q: 'Why is gratuity in CTC but not in monthly salary?', a: 'Gratuity accrues as a liability the employer sets aside for your future exit. It is part of Cost to Company but paid only when you leave after eligible service — not credited monthly to your bank account.' },
      { q: 'What salary is used for gratuity calculation?', a: 'Last drawn basic salary plus dearness allowance (DA). HRA, bonuses, and other allowances are excluded from the gratuity formula.' }
    ],
    body: `
      <p>Gratuity is a lump-sum payment employers owe employees who complete long-term service. Introduced under the Payment of Gratuity Act, 1972, it rewards loyalty and provides a financial cushion at retirement or when changing jobs after five or more years. Yet many Indian employees discover gratuity only when they resign — and some never realise it was included in their CTC all along without appearing on monthly payslips.</p>

      <p>This guide covers eligibility, the exact formula using 15/26, the ₹20 lakh cap effective since 2019, tax treatment, and how gratuity differs from EPF. Whether you are planning a job switch after six years or estimating retirement corpus, understanding gratuity prevents you from leaving money on the table.</p>

      <h2>Who Is Eligible for Gratuity?</h2>
      <p>Employees in establishments covered by the Act (typically 10+ employees) who complete <strong>5 years of continuous service</strong> qualify. Continuous service includes periods with permissible breaks. Gratuity is payable on superannuation, retirement, resignation, death, or disablement due to accident or disease. Death and disablement cases waive the 5-year requirement.</p>

      <h2>Gratuity Calculation Formula</h2>
      <p><strong>Gratuity = (Last drawn basic + DA) × 15 × Years of service / 26</strong></p>
      <p>The factor 15 represents 15 days of wages for each completed year; 26 approximates working days per month. For example, basic + DA = ₹30,000/month and 10 years of service: Gratuity = 30,000 × 15 × 10 / 26 = ₹1,73,077.</p>

      <h2>The ₹20 Lakh Cap</h2>
      <p>Since March 2019, maximum gratuity payable to private sector employees is capped at ₹20 lakh. High earners with long tenure may hit this ceiling. Amounts above ₹20 lakh are taxable unless your employer has a separate scheme with different rules.</p>

      <h2>Tax on Gratuity</h2>
      <p>Section 10(10) exempts gratuity up to ₹20 lakh for employees covered under the Payment of Gratuity Act. Government employees follow different limits. Excess gratuity is taxed as salary. Gratuity received on death is paid to nominees with separate tax provisions.</p>

      <h2>Gratuity vs EPF</h2>
      <p>EPF is monthly contribution with compound interest; gratuity is employer-funded lump sum at exit. EPF appears on payslips; gratuity is hidden in CTC. Both count toward retirement wealth — include gratuity estimate when calculating net worth and retirement readiness.</p>

      <h2>When You Leave Before 5 Years</h2>
      <p>Resigning at 4 years 11 months typically means zero statutory gratuity. Some MNCs pay ex-gratia as goodwill. Always check offer letter and HR policy. Completing five years before switching can mean lakhs in gratuity — factor this into job-switch timing if you are close to the threshold.</p>
`
  },
  {
    slug: 'ppf-fd-guide',
    breadcrumb: 'PPF & FD Guide',
    title: 'PPF vs Fixed Deposit Guide India 2026 — Rates, Tax & Which to Choose',
    subtitle: 'Compare PPF, bank FD, and post office schemes for safe savings in India',
    description: 'PPF vs FD comparison for India 2026. Current rates, tax treatment, lock-in, and when to choose each for your financial goals.',
    calcUrl: '/calculators/ppf/',
    sidebarCalc: 'PPF Calculator',
    sidebarDesc: 'Project 15-year PPF maturity',
    ctaTitle: 'Compare PPF and FD returns',
    ctaText: 'Use our PPF and FD calculators with your deposit amount and tenure.',
    ctaBtn: 'PPF Calculator',
    related: [
      { url: '/guides/fd-vs-sip-guide/', title: 'FD vs SIP Guide' },
      { url: '/guides/sip-investment-guide/', title: 'SIP Investment Guide' },
      { url: '/guides/tax-saving-guide/', title: 'Tax Saving Guide' }
    ],
    faqs: [
      { q: 'What is the current PPF interest rate in 2026?', a: 'PPF rates are revised quarterly by the government. For Q1 FY 2026-27, PPF typically earns around 7.1% p.a. Check the National Savings Institute notification for the latest quarter rate.' },
      { q: 'Is PPF interest taxable?', a: 'No. PPF enjoys EEE status — deposits qualify for 80C (within ₹1.5L limit), interest is tax-free, and maturity proceeds are tax-free.' },
      { q: 'Is FD interest taxable?', a: 'Yes. FD interest is added to your total income and taxed at your slab rate. TDS at 10% applies if interest from one bank exceeds ₹40,000/year (₹50,000 for senior citizens).' },
      { q: 'Can I have multiple PPF accounts?', a: 'Only one PPF account per adult is permitted. Parents can open PPF for minors. Duplicate accounts face penalties until merged.' },
      { q: 'Which is better for 5-year savings — PPF or FD?', a: 'PPF has 15-year lock-in with partial withdrawal from year 7. For strict 5-year goals, tax-saver FD (5-year) or regular FD offers liquidity after maturity. PPF wins on tax-free returns for long horizons.' }
    ],
    body: `
      <p>Public Provident Fund (PPF) and Fixed Deposits (FD) are the two most trusted safe savings options for Indian households. Both offer predictable returns without stock market volatility, but they differ sharply on tax treatment, lock-in, and ideal time horizon. Choosing wrong can cost you lakhs in unnecessary tax or trap money when you need liquidity.</p>

      <p>This guide compares current rates, EEE tax status of PPF versus taxable FD interest, partial withdrawal rules, and practical allocation advice for salaried employees already investing in ELSS and EPF.</p>

      <h2>PPF Overview</h2>
      <p>PPF is a 15-year government-backed scheme available at post offices and authorised banks. Minimum deposit ₹500/year, maximum ₹1.5 lakh/year across all PPF accounts. Interest is compounded annually at a rate set quarterly — currently around 7.1%. Maturity can be extended in 5-year blocks. Loan against PPF is available from the 3rd to 6th year; partial withdrawal from the 7th year.</p>

      <h2>Fixed Deposit Overview</h2>
      <p>Bank FDs lock your money for 7 days to 10 years at a fixed rate — typically 6.5–7.5% for major banks in 2026, with senior citizens earning 0.25–0.50% extra. Small finance banks may offer 8%+ but assess risk appetite. DICGC insures deposits up to ₹5 lakh per bank per depositor. Premature withdrawal attracts penalty.</p>

      <h2>Tax Comparison</h2>
      <p>PPF: 80C deduction on deposits, tax-free interest, tax-free maturity — EEE. FD: Interest fully taxable; 5-year tax-saver FD qualifies for 80C but interest remains taxable. A ₹5 lakh FD at 7% for 5 years earns ~₹2 lakh interest; at 30% slab, you keep ~₹1.4 lakh after tax versus full ₹2 lakh+ equivalent in PPF.</p>

      <h2>Worked Example: ₹1.5 Lakh Annual for 15 Years</h2>
      <p>Maxing PPF at 7.1% for 15 years yields approximately ₹40.7 lakh tax-free. Same amount in taxable FD at 7% post-tax at 30% slab yields roughly ₹32–35 lakh effective — a gap of ₹5–8 lakh purely from tax drag.</p>

      <h2>When to Choose PPF</h2>
      <p>Long-term goals (child education 15 years out, retirement supplement), full 80C utilisation, and tax-free compounding priority. Start early — PPF rewards patience.</p>

      <h2>When to Choose FD</h2>
      <p>Emergency fund tier-2 (after 6 months expenses in liquid fund/savings), known expense in 1–3 years, senior citizens needing regular interest income, or amounts exceeding ₹1.5 lakh/year that cannot fit in PPF limit.</p>
`
  },
  {
    slug: 'old-vs-new-tax-regime-guide',
    breadcrumb: 'Old vs New Tax Regime',
    title: 'Old vs New Tax Regime India 2026 — Which Saves More Tax?',
    subtitle: 'Complete comparison with slabs, deductions, and worked examples for ₹8L to ₹20L salaries',
    description: 'Old vs new tax regime comparison for FY 2026-27. Slabs, standard deduction, 80C, HRA, and which regime saves tax at your income level.',
    calcUrl: '/calculators/income-tax/',
    sidebarCalc: 'Income Tax Calculator',
    sidebarDesc: 'Compare both regimes side by side',
    ctaTitle: 'Compare your tax under both regimes',
    ctaText: 'Enter salary, deductions, and HRA to see exact tax liability.',
    ctaBtn: 'Income Tax Calculator',
    related: [
      { url: '/guides/tax-saving-guide/', title: 'Tax Saving Guide' },
      { url: '/guides/hra-exemption-guide/', title: 'HRA Exemption Guide' },
      { url: '/guides/salary-guide/', title: 'Salary Guide' }
    ],
    faqs: [
      { q: 'What is zero tax up to ₹12 lakh in new regime?', a: 'The new regime combines revised slabs, ₹75,000 standard deduction for salaried employees, and Section 87A rebate so many taxpayers with income around ₹12 lakh pay no tax. Exact liability depends on total income and surcharge.' },
      { q: 'Can I switch between tax regimes every year?', a: 'Salaried employees with business income can switch annually in most cases. Employees without business income generally choose at the start of the year; check latest Finance Act rules for your category.' },
      { q: 'Is old regime better if I pay home loan EMI?', a: 'Often yes. Old regime allows 80C on principal (within limits) and Section 24(b) interest deduction up to ₹2 lakh on self-occupied property, plus HRA if renting elsewhere. Combined deductions can exceed new regime savings.' },
      { q: 'Does new regime have standard deduction?', a: 'Yes. Salaried employees get ₹75,000 standard deduction under the new regime in recent budgets, significantly reducing taxable income.' },
      { q: 'Which regime for ₹15 LPA with full 80C and HRA?', a: 'Run both calculations. With ₹1.5L 80C, ₹2L HRA exemption, and ₹25K 80D, old regime often wins by ₹40,000–80,000 annually at ₹15 lakh gross. Use our calculator for your exact break-up.' }
    ],
    body: `
      <p>Every financial year, millions of salaried Indians face the same question: old tax regime or new? The new regime promises lower slabs and simpler compliance; the old regime rewards those who invest in PPF, pay home loan interest, claim HRA, and buy health insurance. Pick wrong and you overpay tax by ₹20,000–₹1 lakh annually with no way to fix it until ITR filing.</p>

      <p>This guide compares FY 2026-27 slabs, lists every deduction you lose in the new regime, and provides decision rules for incomes from ₹6 lakh to ₹25 lakh. Pair this with our income tax calculator for personalised numbers.</p>

      <h2>New Tax Regime — Key Features</h2>
      <p>Lower slab rates, ₹75,000 standard deduction for salaried, no 80C/80D/HRA/LTA exemptions (except employer NPS and limited items). Attractive for young employees with minimal investments, no rent receipts, and no home loan.</p>

      <h2>Old Tax Regime — Key Deductions</h2>
      <ul>
        <li>Section 80C — up to ₹1.5 lakh (EPF, PPF, ELSS, LIC, tuition fees)</li>
        <li>Section 80D — health insurance ₹25K/₹50K</li>
        <li>HRA exemption under Section 10(13A)</li>
        <li>Home loan interest Section 24(b) — up to ₹2 lakh</li>
        <li>NPS 80CCD(1B) — extra ₹50,000</li>
      </ul>

      <h2>Decision Framework</h2>
      <p><strong>Choose new regime if:</strong> Total deductions under old regime are below ₹2–2.5 lakh, you live in owned house without HRA, and you prefer simplicity. <strong>Choose old regime if:</strong> You pay significant rent with HRA component, have home loan, max 80C + 80D, or NPS contributions.</p>

      <h2>Worked Example: ₹12 Lakh Salary</h2>
      <p>New regime with standard deduction: taxable ~₹11.25L, tax often nil after rebate for many. Old regime without deductions: higher tax. Old regime with ₹1.5L 80C + ₹1.2L HRA + ₹25K 80D: taxable drops by ~₹2.95L — old regime wins if you actually claim these.</p>

      <h2>Common Mistakes</h2>
      <p>Defaulting to new regime because "everyone says zero tax". Not submitting rent proofs while staying on old regime. Forgetting employer must deduct TDS per declared regime — mismatch causes March pain.</p>
`
  },
  {
    slug: 'home-loan-prepayment-guide',
    breadcrumb: 'Home Loan Prepayment Guide',
    title: 'Home Loan Prepayment Guide India 2026 — Save Lakhs in Interest',
    subtitle: 'When to prepay, partial vs full, RBI rules, and impact on EMI vs tenure',
    description: 'Home loan prepayment guide for India. Learn when prepayment saves most interest, RBI floating rate rules, and partial prepayment strategies.',
    calcUrl: '/calculators/emi/',
    sidebarCalc: 'EMI Calculator',
    sidebarDesc: 'See interest saved with shorter tenure',
    ctaTitle: 'Model your loan and prepayment',
    ctaText: 'Calculate EMI and total interest, then compare shorter tenure after prepayment.',
    ctaBtn: 'EMI Calculator',
    related: [
      { url: '/guides/emi-guide/', title: 'Home Loan EMI Guide' },
      { url: '/guides/sip-investment-guide/', title: 'SIP Investment Guide' },
      { url: '/guides/retirement-planning-guide/', title: 'Retirement Planning' }
    ],
    faqs: [
      { q: 'Are there prepayment charges on floating rate home loans?', a: 'RBI rules prohibit prepayment penalties on floating rate home loans for individual borrowers. Fixed rate loans may still carry charges — check your loan agreement.' },
      { q: 'Should I reduce EMI or tenure after prepayment?', a: 'Reducing tenure saves more total interest. Reducing EMI improves monthly cash flow. Most wealth planners recommend tenure reduction unless you need liquidity for other goals.' },
      { q: 'Is prepayment better than SIP?', a: 'Prepaying a 9% home loan gives guaranteed 9% equivalent return. Equity SIP targets 10–12% with risk. Many split bonus between partial prepayment and SIP for balance.' },
      { q: 'When is prepayment least effective?', a: 'Late in loan tenure when interest component is small — most EMI already goes to principal. Early-year prepayments save maximum interest.' },
      { q: 'Can I prepay using EPF or FD?', a: 'EPF allows partial withdrawal for home purchase/repayment subject to conditions. Breaking FD for prepayment makes sense if FD rate is below loan rate after tax.' }
    ],
    body: `
      <p>A ₹50 lakh home loan at 8.5% for 20 years costs over ₹54 lakh in interest alone — more than the principal. Prepayment, even occasional lump sums from bonus or inheritance, can shave lakhs off this burden and shorten financial freedom by years. Yet many borrowers either prepay blindly without comparing investment returns, or never prepay because they fear bank penalties that no longer apply to floating rate loans.</p>

      <p>This guide explains when prepayment saves the most, RBI rules on charges, partial vs full prepayment, and the tenure vs EMI reduction choice after you pay down principal.</p>

      <h2>Why Prepayment Works — Reducing Balance Method</h2>
      <p>Home loan interest is charged on outstanding principal. Every prepayment permanently reduces the base on which future interest is calculated. ₹1 lakh prepayment in year 2 of a ₹40 lakh loan at 8.5% can save ₹2–3 lakh interest over remaining tenure — far more than ₹1 lakh in a 7% FD after tax.</p>

      <h2>RBI Rules on Prepayment Charges</h2>
      <p>Floating rate home loans to individual borrowers: no prepayment penalty. Fixed rate loans may have 2–4% charges on prepaid amount. Always confirm with your lender and read sanction letter fine print.</p>

      <h2>Tenure Reduction vs EMI Reduction</h2>
      <p>After prepayment, banks let you choose: keep EMI same and reduce tenure (saves more interest) or reduce EMI and keep tenure (frees monthly cash). Example: ₹30 lakh outstanding, ₹3 lakh prepayment — tenure reduction might cut 18 months and save ₹4 lakh interest; EMI reduction might drop EMI by ₹2,500 with modest interest saving.</p>

      <h2>Prepayment vs Investing</h2>
      <p>Compare loan rate to post-tax return on alternatives. 8.5% loan = guaranteed 8.5% saved. Equity SIP might earn 12% but with volatility. Balanced approach: prepay after building emergency fund, maintain SIP for long-term goals, use bonus split 50-50.</p>

      <h2>Tax Angle</h2>
      <p>Home loan interest deduction under old regime (up to ₹2 lakh) reduces effective loan cost. Prepaying reduces interest — and future 24(b) deduction. Still usually worthwhile for peace of mind and guaranteed return.</p>

      <h2>Step-by-Step Prepayment Plan</h2>
      <p>1) Build 6-month emergency fund first. 2) Clear high-interest credit card/personal loan debt. 3) Prepay floating home loan without penalty. 4) Choose tenure reduction. 5) Continue SIP for retirement parallel to prepayment.</p>
`
  },
  {
    slug: 'retirement-planning-guide',
    breadcrumb: 'Retirement Planning Guide',
    title: 'Retirement Planning Guide India 2026 — Corpus, SIP & SWP Strategy',
    subtitle: 'How much to save, inflation-adjusted expenses, EPF/NPS, and withdrawal planning',
    description: 'Retirement planning guide for India. Calculate corpus needed, monthly SIP required, inflation impact, and SWP strategy for post-retirement income.',
    calcUrl: '/calculators/retirement/',
    sidebarCalc: 'Retirement Calculator',
    sidebarDesc: 'Find your corpus target and SIP',
    ctaTitle: 'Calculate your retirement corpus',
    ctaText: 'Enter age, expenses, and existing savings for a personalised plan.',
    ctaBtn: 'Retirement Calculator',
    related: [
      { url: '/guides/sip-investment-guide/', title: 'SIP Investment Guide' },
      { url: '/guides/epf-guide/', title: 'EPF Guide' },
      { url: '/guides/fd-vs-sip-guide/', title: 'FD vs SIP Guide' }
    ],
    faqs: [
      { q: 'How much corpus do I need to retire in India?', a: 'Rule of thumb: 25–30 times your annual expenses at retirement. If you need ₹50,000/month (₹6L/year) in today\'s money, inflate to retirement age and multiply by 25–30. Metro retirees often need ₹5–7 crore; tier-2 cities may manage with ₹2–3 crore with owned home.' },
      { q: 'Is ₹1 crore enough to retire?', a: '₹1 crore at 7% generates ~₹7 lakh/year (~₹58,000/month) before tax. Viable in low-cost cities with owned home; insufficient for metro luxury. Inflation erodes purchasing power over 25-year retirement.' },
      { q: 'What inflation rate should I assume?', a: 'Use 6% for general expenses, 8–10% for healthcare. Underestimating inflation is the most common retirement planning error in India.' },
      { q: 'EPF vs NPS vs mutual funds for retirement?', a: 'EPF: safe, 8.25%, partially locked. NPS: market-linked with tax benefits. Mutual fund SIP: highest growth potential with volatility. Diversify across all three based on age — equity-heavy when young, debt-heavy near retirement.' },
      { q: 'What is SWP in retirement?', a: 'Systematic Withdrawal Plan withdraws fixed amounts monthly from mutual fund corpus — tax-efficient income stream alternative to FD interest. Use SWP calculator to test sustainability.' }
    ],
    body: `
      <p>Retirement planning in India is not optional luxury — it is survival math. With joint families shrinking, informal pension support fading, and healthcare costs rising 10%+ annually, your EPF balance alone rarely suffices. A 30-year-old earning ₹12 lakh today may need ₹6–8 crore at 60 just to maintain current lifestyle — yet most have not run the numbers.</p>

      <p>This guide walks through corpus calculation with inflation, SIP required to bridge the gap, role of EPF/NPS/PPF, and post-retirement SWP strategy.</p>

      <h2>Step 1: Estimate Retirement Expenses</h2>
      <p>Start with current monthly spend excluding EMIs that end before retirement. Add healthcare buffer 15–20%. Inflate at 6% to retirement age. Example: ₹40,000/month at 30, retire at 60 → expense at 60 ≈ ₹2.3 lakh/month in future rupees.</p>

      <h2>Step 2: Corpus Target</h2>
      <p>4% withdrawal rule (25× annual expense) adapted for India: use 25–30× depending on conservative return assumptions (7–8% post-retirement). ₹2.3 lakh/month × 12 = ₹27.6 lakh/year × 25 ≈ ₹6.9 crore corpus needed.</p>

      <h2>Step 3: Gap Analysis</h2>
      <p>Subtract existing EPF, PPF, NPS, and investments. Remaining gap funded via monthly SIP. At 12% return over 30 years, ₹15,000–20,000/month SIP can bridge multi-crore gap from age 30.</p>

      <h2>Asset Allocation by Age</h2>
      <p>20s–30s: 70–80% equity SIP. 40s: 60% equity. 50s: shift to hybrid/debt. 5 years before retirement: build 2–3 years expenses in liquid/debt for sequence risk protection.</p>

      <h2>Post-Retirement Income</h2>
      <p>SWP from balanced advantage or debt funds supplements EPF pension. Withdraw 5–6% of corpus annually initially; step up for inflation. Avoid locking entire corpus in low-rate FD — tax and inflation erode real value.</p>
`
  },
  {
    slug: 'gst-guide',
    breadcrumb: 'GST Guide',
    title: 'GST Guide India 2026 — Slabs, Calculation & Registration Rules',
    subtitle: '5%, 12%, 18%, 28% slabs explained for freelancers, small business, and salaried side income',
    description: 'GST guide for India: tax slabs, inclusive vs exclusive pricing, registration threshold, and how to calculate GST on invoices.',
    calcUrl: '/calculators/gst/',
    sidebarCalc: 'GST Calculator',
    sidebarDesc: 'Add or remove GST instantly',
    ctaTitle: 'Calculate GST on any amount',
    ctaText: 'Forward and reverse GST calculation for all major slabs.',
    ctaBtn: 'GST Calculator',
    related: [
      { url: '/guides/tax-saving-guide/', title: 'Tax Saving Guide' },
      { url: '/guides/salary-guide/', title: 'Salary Guide' },
      { url: '/guides/old-vs-new-tax-regime-guide/', title: 'Tax Regime Guide' }
    ],
    faqs: [
      { q: 'What are GST slabs in India?', a: 'Main slabs: 0%, 5%, 12%, 18%, and 28%. Precious metals at 3%. Most services attract 18%. Essential goods like fresh milk and vegetables are exempt.' },
      { q: 'When must I register for GST?', a: 'Mandatory when turnover exceeds ₹40 lakh (goods) or ₹20 lakh (services) in most states. Special category states have lower thresholds. Voluntary registration allows input tax credit even below threshold.' },
      { q: 'How to calculate GST inclusive price?', a: 'Base amount = Total / (1 + rate/100). For 18% inclusive ₹11,800: base = 11,800/1.18 = ₹10,000, GST = ₹1,800.' },
      { q: 'CGST vs IGST — difference?', a: 'Intra-state sales: CGST + SGST split equally. Inter-state: IGST applies. Determines which government receives revenue.' },
      { q: 'Do salaried employees need GST registration?', a: 'Only if side business/freelance turnover crosses threshold or you voluntarily register. Salary income alone does not require GST.' }
    ],
    body: `
      <p>Goods and Services Tax (GST) unified India's indirect tax system in 2017, but slabs, inclusive pricing, and registration thresholds still confuse freelancers, small shop owners, and salaried professionals with side income. Charging wrong GST on invoices creates compliance risk; paying GST without claiming input credit wastes money.</p>

      <p>This guide explains slabs, forward and reverse calculation, registration rules, and composition scheme basics for small business.</p>

      <h2>GST Slabs Explained</h2>
      <p><strong>0%:</strong> Fresh food, books, healthcare services (many). <strong>5%:</strong> Essentials, packaged food items. <strong>12%:</strong> Processed foods, some construction. <strong>18%:</strong> Most services, electronics, telecom — the default rate most professionals encounter. <strong>28%:</strong> Luxury items, automobiles, aerated drinks.</p>

      <h2>Forward GST Calculation</h2>
      <p>GST Amount = Taxable Value × Rate / 100. Total = Taxable Value + GST. Example: ₹10,000 service at 18% → GST ₹1,800, invoice total ₹11,800.</p>

      <h2>Reverse GST (Inclusive Pricing)</h2>
      <p>When price includes GST: Base = Total / (1 + Rate/100). GST = Total − Base. Restaurants and B2C often show inclusive prices — know how to extract GST for ITC if registered.</p>

      <h2>Registration Threshold</h2>
      <p>₹40 lakh annual turnover for goods (₹20 lakh for services) in most states triggers mandatory registration. E-commerce sellers and inter-state suppliers have separate rules. GSTIN required for B2B invoicing and input tax credit.</p>

      <h2>Input Tax Credit</h2>
      <p>Registered businesses offset GST paid on purchases against GST collected on sales. Unregistered freelancers cannot claim ITC — factor this when comparing freelance vs employment income.</p>

      <h2>Composition Scheme</h2>
      <p>Small businesses under ₹1.5 crore turnover can pay fixed GST rate on turnover with simplified compliance — limited ITC, suitable for small retailers and restaurants meeting criteria.</p>
`
  },
  {
    slug: 'fd-vs-sip-guide',
    breadcrumb: 'FD vs SIP Guide',
    title: 'FD vs SIP Guide India 2026 — Guaranteed Returns vs Wealth Creation',
    subtitle: 'When to use fixed deposits, when to start SIP, and hybrid strategies for Indian investors',
    description: 'FD vs SIP comparison for India. Risk, returns, tax, liquidity, and goal-based allocation for salaried investors.',
    calcUrl: '/calculators/sip/',
    sidebarCalc: 'SIP Calculator',
    sidebarDesc: 'Compare long-term SIP growth',
    ctaTitle: 'Compare SIP growth vs FD',
    ctaText: 'Model ₹5,000/month SIP vs RD/FD for your goal timeline.',
    ctaBtn: 'SIP Calculator',
    related: [
      { url: '/guides/ppf-fd-guide/', title: 'PPF & FD Guide' },
      { url: '/guides/sip-investment-guide/', title: 'SIP Investment Guide' },
      { url: '/guides/retirement-planning-guide/', title: 'Retirement Planning' }
    ],
    faqs: [
      { q: 'FD vs SIP — which gives higher returns?', a: 'FD/RD offer 6–7.5% guaranteed. Equity SIP historically 10–12% over 10+ years but with volatility. SIP wins long term; FD wins for certainty and short horizons under 3 years.' },
      { q: 'Is SIP safe like FD?', a: 'No. SIP in equity mutual funds is subject to market risk. NAV can fall 20–40% in bear markets. Debt SIP/FD are lower risk but FD has DICGC insurance up to ₹5 lakh.' },
      { q: 'Should beginners start with FD or SIP?', a: 'Build emergency fund in FD/liquid fund first (3–6 months expenses). Then start equity SIP even ₹500/month for long goals. Never invest emergency money in equity SIP.' },
      { q: 'RD vs SIP for 5-year goal?', a: 'For 5-year known expense (wedding, car down payment), RD or debt fund suits. For 5+ year wealth building, equity SIP preferred despite short-term volatility.' },
      { q: 'Tax treatment FD vs SIP?', a: 'FD interest taxable at slab. Equity SIP held 1+ year: LTCG 12.5% above ₹1.25L gains. Debt fund taxation changed — check current rules for your holding period.' }
    ],
    body: `
      <p>The FD vs SIP debate divides Indian families every Diwali when bonus arrives. Parents trust bank fixed deposits; younger earners hear "SIP kar lo" from every finance influencer. Both are correct — for different goals, time horizons, and risk appetites. Putting wedding fund in equity SIP or retirement corpus entirely in FD are opposite mistakes with real consequences.</p>

      <p>This guide compares returns, risk, tax, liquidity, and gives a simple allocation framework by goal timeline.</p>

      <h2>Fixed Deposit & Recurring Deposit</h2>
      <p>Guaranteed rate 6.5–7.5% from major banks. DICGC insurance ₹5 lakh per bank. Interest taxable. Premature withdrawal penalty. Best for: emergency fund tier-2, goal within 1–3 years, capital preservation.</p>

      <h2>Systematic Investment Plan (SIP)</h2>
      <p>Monthly investment in mutual funds from ₹500. Equity SIP targets 10–12% long-term CAGR with market ups and downs. Rupee cost averaging smooths entry. Best for: retirement, child education 7+ years out, wealth creation.</p>

      <h2>Numbers Comparison: ₹5,000/Month for 10 Years</h2>
      <p>RD at 7%: ~₹8.6 lakh maturity, fully taxable interest. SIP at 12% (equity): ~₹11.6 lakh, with market risk. Gap widens over 20 years — SIP ~₹49.5 lakh vs RD ~₹25 lakh equivalent.</p>

      <h2>Goal-Based Allocation</h2>
      <ul>
        <li><strong>&lt; 1 year:</strong> Savings account, liquid fund</li>
        <li><strong>1–3 years:</strong> FD, RD, debt funds</li>
        <li><strong>3–7 years:</strong> Hybrid funds, balanced advantage</li>
        <li><strong>7+ years:</strong> Equity SIP, step-up SIP</li>
      </ul>

      <h2>Hybrid Strategy</h2>
      <p>Don't choose one forever. Emergency in FD. Short goals in RD. Parallel equity SIP for retirement regardless of FD holdings. Bonus: split between FD for near-term and lump sum/STP to equity for long-term.</p>

      <h2>Psychological Factor</h2>
      <p>FD comfort helps beginners sleep. Start SIP small alongside FD — increase SIP as comfort grows. Watching SIP through one market crash teaches more than avoiding equity entirely.</p>
`
  }
];


for (const g of guides) {
  const dir = path.join(ROOT, 'guides', g.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), guideHtml(g), 'utf8');
  console.log('created:', g.slug);
}

console.log('done —', guides.length, 'guides');
