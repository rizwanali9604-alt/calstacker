/**
 * Homepage catalog + five guide rewrites (engine-matched numbers).
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function icon(d) {
  return (
    '<div class="calc-icon-wrap" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
    d +
    '</svg></div>'
  );
}

function card(href, cat, name, desc, d, popular) {
  return (
    '        <a href="' +
    href +
    '" class="calc-card" data-cat="' +
    cat +
    '">\n          ' +
    icon(d) +
    '\n          <div class="calc-info"><div class="calc-name">' +
    name +
    '</div><div class="calc-desc">' +
    desc +
    '</div></div>\n' +
    (popular ? '          <span class="calc-badge badge-popular">Popular</span>\n' : '') +
    '          <span class="calc-arrow">→</span>\n        </a>'
  );
}

const I = {
  home: '<path d="M3 10.5 12 3l9 7.5V21H3z"/><path d="M9 21v-8h6v8"/>',
  trend: '<path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/>',
  clip: '<rect x="6" y="4" width="12" height="16" rx="2"/><path d="M9 4V3h6v1M8 10h8M8 14h6"/>',
  bag: '<rect x="4" y="8" width="16" height="12" rx="2"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  bldg: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M9 16h.01M15 16h.01"/>',
  gift: '<rect x="3" y="10" width="18" height="11" rx="1"/><path d="M12 10v11M3 14h18M12 10c0-3 2-5 4.5-5S21 7 21 10M12 10c0-3-2-5-4.5-5S3 7 3 10"/>',
  bank: '<path d="M3 10 12 4l9 6M5 10v10h14V10M4 20h16"/>',
  rec: '<path d="M6 3h9l5 5v13H6z"/><path d="M15 3v5h5M9 13h6M9 17h4"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  coin: '<circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 9.5c.8-1 2-1.5 3.5-1.5s2.4.6 2.5 2c0 3-7 1.5-7 4.5.2 1.4 1.4 2 3.5 2s2.7-.6 3.5-1.5"/>',
  cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  cash: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/>',
  bars: '<path d="M4 20V10M10 20V4M16 20v-7M22 20V8"/>',
  hash: '<path d="M5 9h14M5 15h14M10 3l-2 18M16 3l-2 18"/>',
  down: '<path d="M4 7h7v7"/><path d="M11 7 3 15M14 20l7-7"/>',
  out: '<path d="M12 19V5M5 12h14"/><path d="M16 8l3 4-3 4"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
  scale: '<path d="M12 3v18M5 21h14M12 7l-7 8h5l2-8 2 8h5l-7-8"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  inf: '<path d="M4 16c3-8 6-8 8 0s5 8 8 0"/>'
};

const cards = [
  card('/calculators/emi/', 'employee', 'EMI Calculator', 'Home, car & personal loan EMI with amortization', I.home, true),
  card('/calculators/income-tax/', 'employee', 'Income Tax Calculator', 'Old vs new regime FY 2026-27 comparison', I.clip, true),
  card('/calculators/salary/', 'employee', 'Salary Calculator', 'CTC to in-hand salary breakdown', I.bag, true),
  card('/calculators/hra/', 'employee', 'HRA Calculator', 'HRA exemption under Section 10(13A)', I.bldg, true),
  card('/calculators/gratuity/', 'employee', 'Gratuity Calculator', '15/26 formula, ₹20 lakh cap', I.gift, false),
  card('/calculators/epf/', 'employee', 'EPF Calculator', '₹15,000 wage ceiling & 12%', I.bank, false),
  card('/calculators/gst/', 'employee', 'GST Calculator', 'GST 2.0 — 5%, 18%, 40%', I.rec, false),
  card('/calculators/ppf/', 'employee', 'PPF Calculator', '₹1.5L cap, lock-in, EEE tax', I.lock, false),
  card('/calculators/fd/', 'employee', 'FD Calculator', 'Quarterly compounding & post-tax yield', I.coin, false),
  card('/calculators/rd/', 'employee', 'RD Calculator', 'Monthly deposits vs a SIP', I.cal, false),
  card('/calculators/sip/', 'investor', 'SIP Calculator', 'Mutual fund SIP returns & corpus projection', I.trend, true),
  card('/calculators/lumpsum/', 'investor', 'Lumpsum Calculator', 'Bonus or one-time corpus', I.cash, false),
  card('/calculators/step-up-sip/', 'investor', 'Step-Up SIP', 'Hike the SIP with your raise', I.bars, false),
  card('/calculators/compound-interest/', 'investor', 'Compound Interest', 'Annual vs quarterly vs monthly', I.hash, false),
  card('/calculators/cagr/', 'investor', 'CAGR Calculator', 'Two values — not SIP/XIRR', I.down, false),
  card('/calculators/swp/', 'investor', 'SWP Calculator', 'Drawdowns — 4% is not a pension', I.out, false),
  card('/calculators/retirement/', 'investor', 'Retirement Planner', 'Inflated expenses, then SIP gap', I.sun, false),
  card('/calculators/net-worth/', 'investor', 'Net Worth Calculator', 'House equity, EPF, loans once', I.scale, false),
  card('/calculators/simple-interest/', 'investor', 'Simple Interest', 'Flat-rate quotes vs bank EMI', I.plus, false),
  card('/calculators/inflation/', 'investor', 'Inflation Calculator', 'CPI vs school fees and health', I.inf, false)
].join('\n');

const HOMEPAGE_SECTIONS = `  <section class="section" id="tools">
    <div class="container">
      <div class="section-header">
        <h2>All Calculators</h2>
        <p>Twenty tools, listed once. Use the tabs to show employee or investor calculators.</p>
      </div>
      <div class="cat-tabs">
        <button type="button" class="cat-tab active" data-cat="all" aria-selected="true">All</button>
        <button type="button" class="cat-tab" id="employee" data-cat="employee" aria-selected="false">Employee</button>
        <button type="button" class="cat-tab" id="investor" data-cat="investor" aria-selected="false">Investor</button>
      </div>
      <p id="catalog-live" class="catalog-live" aria-live="polite"></p>
      <div class="calc-grid" id="calc-catalog">
${cards}
      </div>
    </div>
  </section>

  <section class="section" id="guides">
    <div class="container">
      <div class="section-header">
        <h2>Free Financial Guides</h2>
        <p>In-depth articles on salary, tax, investing, and loans — written for Indian employees</p>
      </div>
      <div class="guide-card-grid">
        <article class="guide-card">
          <h2><a href="/guides/salary-guide/">CTC vs In-Hand Salary Guide</a></h2>
          <p>Understand every deduction on your payslip and calculate your real take-home pay.</p>
        </article>
        <article class="guide-card">
          <h2><a href="/guides/tax-saving-guide/">Tax Saving Guide 2026</a></h2>
          <p>Section 80C, HRA, NPS, and old vs new regime with worked examples.</p>
        </article>
        <article class="guide-card">
          <h2><a href="/guides/old-vs-new-tax-regime-guide/">Old vs New Tax Regime</a></h2>
          <p>Which regime saves more tax at your salary — with slabs and deduction comparison.</p>
        </article>
        <article class="guide-card">
          <h2><a href="/guides/hra-exemption-guide/">HRA Exemption Guide</a></h2>
          <p>Claim House Rent Allowance under the old regime with the four Rule 2A metros.</p>
        </article>
        <article class="guide-card">
          <h2><a href="/guides/sip-investment-guide/">SIP Investment Guide</a></h2>
          <p>Start a mutual fund SIP from ₹500/month and understand compounding.</p>
        </article>
        <article class="guide-card">
          <h2><a href="/guides/emi-guide/">Home Loan EMI Guide</a></h2>
          <p>How EMI works, tenure impact, prepayment benefits, and affordability rules.</p>
        </article>
        <article class="guide-card">
          <h2><a href="/guides/epf-guide/">EPF Complete Guide</a></h2>
          <p>Contribution rates, last declared 8.25% for FY 2025-26, UAN, and withdrawals.</p>
        </article>
        <article class="guide-card">
          <h2><a href="/guides/gst-guide/">GST 2.0 Guide</a></h2>
          <p>5%, 18% and 40% slabs from 22 September 2025, inclusive pricing, and ITC.</p>
        </article>
        <article class="guide-card">
          <h2><a href="/guides/gratuity-guide/">Gratuity Guide</a></h2>
          <p>15/26 formula, five-year eligibility, ₹20 lakh cap, and Section 10(10).</p>
        </article>
        <article class="guide-card">
          <h2><a href="/guides/ppf-fd-guide/">PPF vs FD Guide</a></h2>
          <p>7.10% PPF for Q2 FY 2026-27 versus taxable FD interest, with engine numbers.</p>
        </article>
        <article class="guide-card">
          <h2><a href="/guides/fd-vs-sip-guide/">FD vs SIP Guide</a></h2>
          <p>When a bank deposit wins, when an equity SIP belongs, and the 10-year rupee gap.</p>
        </article>
        <article class="guide-card">
          <h2><a href="/guides/home-loan-prepayment-guide/">Home Loan Prepayment</a></h2>
          <p>RBI floating-rate rules, tenure vs EMI, and interest saved on real EMI math.</p>
        </article>
        <article class="guide-card">
          <h2><a href="/guides/retirement-planning-guide/">Retirement Planning Guide</a></h2>
          <p>Inflate today’s spend, then back out corpus and SIP — not a 25× slogan.</p>
        </article>
      </div>
      <p style="text-align:center;margin-top:24px;"><a href="/guides/" class="btn-ghost">View all guides →</a></p>
    </div>
  </section>
`;

function faqItem(q, a) {
  return (
    '        <div class="faq-item">\n          <h3>' +
    q +
    '</h3>\n          <p>' +
    a +
    '</p>\n        </div>'
  );
}

function articleWrap(body, faqTitle, faqs, cta) {
  return (
    '\n' +
    body +
    '\n\n      <section class="guide-faq">\n        <h2>' +
    faqTitle +
    '</h2>\n' +
    faqs.map(function (f) { return faqItem(f.q, f.a); }).join('\n') +
    '\n      </section>\n      <div class="guide-cta-bottom">\n' +
    cta +
    '\n      </div>\n    '
  );
}

const PPF = articleWrap(
  `      <p>PPF and bank FDs are both “safe” in the dinner-table sense. They are not interchangeable. PPF is a 15-year government scheme with a ₹1.5 lakh annual cap and EEE tax treatment. An FD is a bank contract: you pick the tenure, you pay tax on interest at your slab, and DICGC covers ₹5 lakh per bank per depositor — not the whole pile if you stacked deposits at one lender.</p>
      <p>This page uses the same deposit-then-interest loop as our <a href="/calculators/ppf/">PPF calculator</a> and the same A = P(1 + r/n)<sup>nt</sup> as the <a href="/calculators/fd/">FD calculator</a> (quarterly compounding unless you change it). It is an estimate. The notified PPF rate can move every quarter.</p>

      <h2>PPF rate in force (Q2 FY 2026-27)</h2>
      <p>The Ministry of Finance (Department of Economic Affairs) kept small-savings rates unchanged for 1 July–30 September 2026. Public Provident Fund stays at <strong>7.10% per annum</strong>, compounded annually, credited on the lowest balance between the 5th and the last day of each month. That is why a deposit on the 6th often waits a month to start earning. Source: DEA OM / SB Order 07/2026 dated 30 June 2026. Recheck the next quarterly circular before you treat a 15-year table as a promise.</p>
      <p>Limits are unchanged: minimum ₹500 a year, maximum ₹1.5 lakh a year across all PPF accounts you hold. One adult, one account. Loan window typically from year 3; partial withdrawal from year 7. After 15 years you can mature or extend in 5-year blocks — the rate still resets with the government, not with your extension form.</p>

      <h2>Worked PPF: ₹1.5 lakh every year for 15 years at 7.1%</h2>
      <p>Same method as the calculator: add the year’s deposit, then apply 7.1% to that new balance. Maturity <strong>₹40,68,209</strong>. You put in ₹22,50,000. Interest ₹18,18,209 — tax-free under current EEE rules. If you deposit only after the 5th each month, a real passbook will trail this table. If the notified rate falls, the table overstates.</p>

      <h2>Worked FD: ₹5 lakh at 7% for 5 years, quarterly</h2>
      <p>Cumulative FD: maturity <strong>₹7,07,389</strong>, interest ₹2,07,389. At a 30% slab you keep about ₹1,45,172 of that interest (tax ₹62,217, ignoring surcharge). Post-tax corpus ≈ <strong>₹6,45,172</strong>. A 5-year tax-saver FD can sit in 80C (old regime) but the interest is still taxable. TDS at 10% may apply once interest from one bank crosses the notified threshold — that is not the same as your final tax.</p>

      <h2>The new-regime twist</h2>
      <p>80C on the PPF deposit exists only on the old regime. Interest and maturity are still tax-free on the new regime. If Section 87A already makes your new-regime tax ₹0, stuffing PPF for “tax saving” does not cut TDS — it still locks a tax-free compounding sleeve, which an FD in the 20–30% slab does not.</p>

      <div class="when-grid">
        <div class="when-card use">
          <h3>Use PPF when</h3>
          <ul>
            <li>The goal is 15+ years (child’s college, retirement sleeve)</li>
            <li>You can deposit before the 5th and will not need the money in year 4</li>
            <li>You want EEE even if you correctly sit on the new regime</li>
          </ul>
        </div>
        <div class="when-card skip">
          <h3>Use an FD when</h3>
          <ul>
            <li>The goal is 1–5 years or you already maxed the ₹1.5 lakh PPF cap</li>
            <li>You need a known payout date more than a 15-year lock</li>
            <li>Emergency-fund tier-2 after 3–6 months in a liquid fund or savings</li>
          </ul>
        </div>
      </div>
      <p>Do not break a PPF for a car down-payment. Do not park next year’s rent in PPF. Senior-citizen extra FD rates still lose to PPF after tax in the 20–30% slab over a long horizon — run both calculators instead of memorising a slogan.</p>
      <p>Sources: Ministry of Finance small-savings rates Q2 FY 2026-27 (7.10% PPF); PPF Scheme rules on lock-in and the 5th-of-month interest convention; DICGC ₹5 lakh deposit insurance. Last verified 21 August 2026.</p>`,
  'Frequently Asked Questions',
  [
    { q: 'What is the PPF interest rate in August 2026?', a: '7.10% p.a. for Q2 FY 2026-27 (1 July–30 September 2026), unchanged from Q1, as notified by the Ministry of Finance on 30 June 2026. The rate is reviewed every quarter — do not freeze a 15-year projection.' },
    { q: 'Is PPF interest taxable?', a: 'No under current EEE rules: interest and maturity are tax-free. The deposit can get 80C (old regime, inside the ₹1.5 lakh bucket). New-regime taxpayers still get the tax-free interest; they do not get 80C on the deposit.' },
    { q: 'Is FD interest taxable?', a: 'Yes. It is added to your income and taxed at slab. A 5-year tax-saver FD may qualify for 80C (old regime) but interest remains taxable. TDS is an advance, not the final bill.' },
    { q: 'Can I have two PPF accounts?', a: 'No. One PPF account per adult. A parent may open one for a minor. Duplicate accounts are a problem until they are merged under the scheme rules.' },
    { q: 'PPF or FD for a 5-year goal?', a: 'FD (or a 5-year tax-saver FD if you are on the old regime and need 80C). PPF does not mature in 5 years; partial withdrawal starts only from year 7 and is capped.' }
  ],
  '        <p><strong>Compare PPF and FD with the same rupee</strong></p>\n        <p>Deposit-then-interest PPF table, or quarterly FD maturity — both in your browser.</p>\n        <p><a href="/calculators/ppf/" class="calc-btn" style="display:inline-block;text-decoration:none;margin-top:8px;">PPF Calculator →</a></p>'
);

const FDSIP = articleWrap(
  `      <p>An FD is a contract with a bank. A SIP is a standing instruction into a mutual fund. Comparing them as if they were two flavours of the same product is how wedding funds end up in mid-cap schemes and how retirement money sits in a 7% taxable deposit for 25 years.</p>
      <p>Numbers below use the same SIP future-value formula as our <a href="/calculators/sip/">SIP calculator</a> (end-of-month instalments, constant rate) and a monthly compounding approximation for an RD. Real bank RDs often compound quarterly; treat the RD column as close, not the passbook.</p>

      <h2>₹5,000 a month for 10 and 20 years</h2>
      <table class="data-table">
        <thead><tr><th>Product</th><th>Assumption</th><th>10 years</th><th>20 years</th></tr></thead>
        <tbody>
          <tr><td>Equity SIP</td><td>12% p.a.</td><td>₹11,61,695</td><td>₹49,95,740</td></tr>
          <tr><td>RD / monthly deposit</td><td>7% p.a.</td><td>₹8,70,472</td><td>₹26,19,827</td></tr>
        </tbody>
      </table>
      <p>You invest ₹6 lakh over 10 years and ₹12 lakh over 20. The 10-year gap is about ₹2.9 lakh in the SIP’s favour <em>if</em> 12% shows up. A 30–40% drawdown in year 8 can erase that gap on a goal that cannot wait. The 20-year gap is huge on paper and still not a guarantee.</p>

      <h2>Match the product to the date you need the money</h2>
      <ul>
        <li><strong>Under 1 year:</strong> savings account or liquid fund — not an FD break penalty, not equity.</li>
        <li><strong>1–3 years:</strong> FD or high-quality short-duration debt. Equity SIP is a gamble on the exit year.</li>
        <li><strong>3–7 years:</strong> hybrid / balanced advantage if you accept NAV noise; FD if the date is a wedding hall booking.</li>
        <li><strong>7+ years:</strong> equity SIP or step-up SIP for the growth sleeve; keep the emergency fund in FD/liquid anyway.</li>
      </ul>

      <h2>Tax is not a footnote</h2>
      <p>FD/RD interest is taxed at slab every year (TDS may already have been cut). Equity mutual fund taxation follows the current listed-equity rules — as of this writing, long-term gains above the notified exemption are taxed at the Finance Act rate (commonly discussed as 12.5% LTCG with a ₹1.25 lakh exemption). Debt-fund taxation changed in 2023 for many purchases: gains can be taxed at slab. Confirm the holding period and purchase date before you quote a blog.</p>

      <div class="when-grid">
        <div class="when-card use">
          <h3>Keep both</h3>
          <ul>
            <li>Emergency + near goals in FD/RD</li>
            <li>Retirement SIP running in parallel, even ₹500</li>
            <li>Bonus split: some to prepay/FD, some STP into equity if the horizon is long</li>
          </ul>
        </div>
        <div class="when-card skip">
          <h3>Do not</h3>
          <ul>
            <li>Put next year’s school fees in an equity SIP</li>
            <li>Keep a 25-year retirement corpus only in taxable FDs</li>
            <li>Treat “12%” as a bank rate</li>
          </ul>
        </div>
      </div>
      <p>Sources: SIP/RD math from the on-site engines (constant rate); DICGC ₹5 lakh; current Income-tax Act holding-period rules for funds. Last verified 21 August 2026. Past 12% is not a promise.</p>`,
  'Frequently Asked Questions',
  [
    { q: 'FD vs SIP — which gives higher returns?', a: 'An FD/RD at 6–7.5% is the contract rate. An equity SIP illustrated at 12% is a planning rate, not a deposit. Over 10 years at those two rates, ₹5,000/month is about ₹8.70 lakh (RD) vs ₹11.62 lakh (SIP). The SIP can finish lower if markets are ugly in the last years.' },
    { q: 'Is SIP as safe as an FD?', a: 'No. Equity NAV can fall 20–40% in a bad year. DICGC does not cover mutual funds. FDs at scheduled banks are insured up to ₹5 lakh per bank per depositor.' },
    { q: 'Should a beginner start with FD or SIP?', a: 'Build 3–6 months of expenses in a liquid fund or FD first. Then start an equity SIP for goals that are at least 7 years away. Do not skip the emergency sleeve.' },
    { q: 'RD vs SIP for a 5-year wedding?', a: 'RD or a debt fund is the usual fit. Five years is short for an equity-only SIP if the wedding date cannot move.' },
    { q: 'How is tax different?', a: 'FD interest is taxed at slab. Equity funds follow listed-equity LTCG/STCG rules for the year you sell. Many debt funds bought after April 2023 are taxed at slab. Check your purchase date.' }
  ],
  '        <p><strong>Run the 12% illustration yourself</strong></p>\n        <p>Change the rate. If 9% still beats your post-tax FD, the goal may still belong in equity. If it does not, use the FD calculator.</p>\n        <p><a href="/calculators/sip/" class="calc-btn" style="display:inline-block;text-decoration:none;margin-top:8px;">SIP Calculator →</a></p>'
);

const PREPAY = articleWrap(
  `      <p>On a reducing-balance home loan, interest is charged on what is still outstanding. Extra principal you pay this month never earns interest again. That is why ₹1 lakh in year 2 is worth more than ₹1 lakh in year 18, and why “I will prepay when the EMI feels easy” is usually the expensive order of operations.</p>
      <p>All rupee figures below use the same EMI formula as our <a href="/calculators/emi/">EMI calculator</a>: EMI = P × r × (1+r)<sup>n</sup> / ((1+r)<sup>n</sup> − 1), with r = annual rate / 12. Floating-rate resets, day-count, and fees are outside the formula — the bank letter wins.</p>

      <h2>Baseline: ₹50 lakh at 8.5% for 20 years</h2>
      <p>EMI <strong>₹43,391</strong>. Total paid ≈ ₹1.04 crore. Interest ≈ <strong>₹54,13,879</strong> — more than the principal. Same loan for 15 years: EMI ₹49,237, interest ≈ ₹38,62,656. You pay about ₹15.5 lakh extra interest to buy the lower 20-year EMI.</p>

      <h2>₹1 lakh extra after 24 months (₹40 lakh loan, keep EMI)</h2>
      <p>Start ₹40 lakh, 8.5%, 20 years. EMI ₹34,713. After 24 EMIs the balance is about ₹38.34 lakh. Pay ₹1 lakh extra and keep the same EMI: the loan finishes in <strong>228 months</strong> instead of 240, and interest falls by about <strong>₹3.41 lakh</strong>. The thin-blog claim of “₹2–3 lakh saved” is in the right neighbourhood; this is the engine number.</p>

      <h2>₹3 lakh on a ₹30 lakh outstanding, 20 years left</h2>
      <p>EMI on ₹30 lakh at 8.5% / 20 years is ₹26,035. Paying ₹3 lakh immediately and <em>keeping EMI the same</em> cuts about <strong>51 months</strong> and about <strong>₹10.5 lakh</strong> of interest. Asking the bank to cut EMI instead (same remaining tenure) drops the instalment by about <strong>₹2,600</strong> — cash-flow help, much less interest saved. Tenure reduction is the default unless you need the monthly room.</p>

      <h2>RBI: floating home loans to individuals</h2>
      <p>For floating-rate home loans to individual borrowers, lenders are not allowed to levy a prepayment or foreclosure charge. Fixed-rate loans can still carry 2–4% (read the sanction letter). Part-prepayment may have a lock-in or a minimum ticket — that is the lender’s board, not the EMI formula. Personal loans and some business loans are a different circular.</p>

      <h2>Tax (old regime only)</h2>
      <p>Section 24(b) caps self-occupied interest at ₹2 lakh. Prepaying reduces future interest — and can reduce that deduction. A 8.5% guaranteed saving still usually beats a 7% post-tax FD. On the new regime you do not get 24(b) on a self-occupied house the old-regime way; prepay vs SIP is then a pure rate-vs-volatility choice. Run old vs new on the <a href="/calculators/income-tax/">tax calculator</a> before you empty the bonus into principal.</p>
      <div class="omit-box">
        <h3>Order of operations</h3>
        <p>Emergency fund first. Then credit-card / high-rate personal loan. Then floating home-loan principal with tenure reduction. Keep the retirement SIP running — do not fund prepayment by stopping the only equity sleeve you have.</p>
      </div>
      <p>Sources: reducing-balance EMI identity used by Indian retail lenders; RBI instructions on foreclosure charges for floating-rate housing loans to individuals; Section 24(b). Last verified 21 August 2026.</p>`,
  'Frequently Asked Questions',
  [
    { q: 'Are there prepayment charges on floating-rate home loans?', a: 'RBI does not allow foreclosure/prepayment charges on floating-rate housing loans to individual borrowers. Fixed-rate loans may still charge. Confirm the sanction letter.' },
    { q: 'Should I reduce EMI or tenure after prepayment?', a: 'Tenure reduction saves more interest. On a ₹30 lakh / 8.5% / 20-year leftover, ₹3 lakh extra with the same EMI cut about 51 months and ₹10.5 lakh interest. Cutting EMI by ~₹2,600 keeps the long tenure.' },
    { q: 'Is prepayment better than a SIP?', a: 'Prepaying at 8.5% is a guaranteed 8.5% (before the old-regime 24(b) wrinkle). An equity SIP is a planning rate with drawdowns. Many people split a bonus after the emergency fund exists.' },
    { q: 'When is prepayment weakest?', a: 'Late in the tenure, when most of the EMI is already principal. The same rupee in year 2 retires more future interest than in year 18.' },
    { q: 'Can I use EPF to prepay?', a: 'EPF allows specified housing withdrawals if conditions are met. Breaking an FD to prepay makes sense when the post-tax FD rate is below the loan rate and you still have an emergency fund.' }
  ],
  '        <p><strong>See the interest line before you prepay</strong></p>\n        <p>Change tenure on the EMI calculator, then compare a shorter remaining term after a lump-sum.</p>\n        <p><a href="/calculators/emi/" class="calc-btn" style="display:inline-block;text-decoration:none;margin-top:8px;">EMI Calculator →</a></p>'
);

const GRAT = articleWrap(
  `      <p>Gratuity is not a monthly line on the payslip. It is a lump sum the employer owes when you leave after qualifying service, under the Payment of Gratuity Act, 1972 (establishments with 10 or more employees, in the usual case). Many CTC annexures still show a 4.81% accrual so the offer looks larger. That accrual is not in-hand and is not EPF.</p>

      <h2>Formula (covered employees)</h2>
      <p><strong>Gratuity = (last drawn basic + DA) × 15 × completed years / 26</strong>. The 26 is a working-day month. HRA, bonus, and special allowance are not wages for this formula. Death and disablement skip the five-year wait; ordinary resignation does not.</p>
      <table class="data-table">
        <thead><tr><th>Basic + DA</th><th>Years</th><th>15/26 result</th></tr></thead>
        <tbody>
          <tr><td>₹30,000</td><td>10</td><td>₹1,73,077</td></tr>
          <tr><td>₹40,000</td><td>12</td><td>₹2,76,923</td></tr>
          <tr><td>₹1,20,000</td><td>20</td><td>₹13,84,615</td></tr>
        </tbody>
      </table>
      <p>Same three rows as the <a href="/calculators/gratuity/">gratuity calculator</a>. The ₹20 lakh statutory ceiling (from March 2019 for many private-sector covered employees) still sits above ₹13.85 lakh in the third row. Hit the cap only with high wages and long service — then tax on the excess is a CA conversation under Section 10(10).</p>

      <h2>Five years means five years</h2>
      <p>4 years 11 months is usually zero statutory gratuity. Some employers round more than six months in the last year to a full year — that is standing orders / HR practice, not something this site will guess. Start-ups not covered by the Act may still write a similar formula into the offer; they may also write nothing.</p>

      <h2>Tax and CTC</h2>
      <p>For employees covered by the Act, Section 10(10) commonly exempts gratuity up to the notified cap (₹20 lakh alignment is the working figure). Government servants have a different exemption path. Amounts above the exempt slice are taxable as salary. Gratuity inside CTC is an employer liability, not a monthly credit — use the <a href="/calculators/salary/">salary calculator</a> for take-home, not this page.</p>
      <div class="when-grid">
        <div class="when-card use">
          <h3>Count it when</h3>
          <ul>
            <li>You are modelling a job switch near five years</li>
            <li>You are adding retirement assets (with EPF, not instead of EPF)</li>
            <li>You need a 15/26 estimate from last drawn basic + DA</li>
          </ul>
        </div>
        <div class="when-card skip">
          <h3>Do not treat it as</h3>
          <ul>
            <li>Monthly in-hand</li>
            <li>A substitute for the EPF passbook</li>
            <li>Tax advice near the ₹20 lakh cap</li>
          </ul>
        </div>
      </div>
      <p>Sources: Payment of Gratuity Act, 1972 (15/26); ₹20 lakh ceiling as in force since 2019 for specified private-sector employees; Section 10(10). Last verified 21 August 2026.</p>`,
  'Frequently Asked Questions',
  [
    { q: 'Is gratuity mandatory for every company?', a: 'The Act applies to establishments with 10 or more employees (typical coverage). Covered employees who complete five years of continuous service are entitled on resignation, retirement, death, or disablement. Smaller shops may still pay under contract.' },
    { q: 'Is gratuity taxable?', a: 'For many private-sector employees covered by the Act, exemption under Section 10(10) runs up to the notified cap (working figure ₹20 lakh). Above that, tax as salary. Government employees follow different limits.' },
    { q: 'Can I get gratuity before 5 years?', a: 'Generally no, except death or disablement, or a more generous company policy. Resigning at 4 years 11 months typically forfeits the statutory amount.' },
    { q: 'Why is gratuity in CTC but not in the bank?', a: 'It accrues as an employer liability and is paid when you exit after qualifying service. It is not a monthly credit.' },
    { q: 'Which salary goes into the formula?', a: 'Last drawn basic + DA. Not HRA, not bonus, not CTC.' }
  ],
  '        <p><strong>Estimate 15/26 from basic + DA</strong></p>\n        <p>Enter wages and years. The ₹20 lakh cap is applied in the tool.</p>\n        <p><a href="/calculators/gratuity/" class="calc-btn" style="display:inline-block;text-decoration:none;margin-top:8px;">Gratuity Calculator →</a></p>'
);

const RET = articleWrap(
  `      <p>Indian retirement math is inflated future spending, not “25 times today’s salary.” Healthcare and rent can outrun headline CPI. EPF helps; it is rarely the whole corpus. This guide follows the same steps as our <a href="/calculators/retirement/">retirement planner</a>: inflate today’s monthly spend to retirement, back out a 25-year corpus at a real return, then compute the SIP that reaches that corpus.</p>

      <h2>What the planner actually does</h2>
      <p>Expense at retirement = today’s monthly spend × (1 + inflation)<sup>years</sup>. Corpus = a 25-year annuity of that annual spend, discounted at <em>real</em> return, where real = (1 + return) / (1 + inflation) − 1. SIP uses the accumulation return you typed. Honest limitation: the form has <strong>one</strong> return box. The default placeholder is 12%. That 12% is also used after retirement. That is aggressive for a 60–85 drawdown. Re-run at 7% for a conservative corpus.</p>

      <h2>Worked: ₹40,000 a month, age 30 → 60, 6% inflation</h2>
      <p>Spend at 60 ≈ <strong>₹2,29,740 / month</strong> in future rupees (same 6% / 30 years as the calculator copy).</p>
      <ul>
        <li><strong>Planner at 12% (the placeholders):</strong> corpus ≈ <strong>₹3.64 crore</strong>, SIP ≈ <strong>₹10,314 / month</strong>.</li>
        <li><strong>25× rule on the same future annual spend:</strong> 25 × ₹2.29 lakh × 12 ≈ <strong>₹6.9 crore</strong> — much higher, because 25× is a 4% withdrawal, not a 12% post-retirement return.</li>
      </ul>
      <p>If you only remember one sentence: the ₹3.64 crore figure is not conservative. Drop the return assumption toward 7% and the corpus climbs toward the 25× world. Subtract EPF, NPS, and a paid-off house from the gap before you panic at the SIP line.</p>

      <h2>₹50,000 a month, same ages and 12%</h2>
      <p>Corpus ≈ ₹4.55 crore, SIP ≈ ₹12,893 / month. Linear in today’s spend. Understating lifestyle (ignoring parents’ health, rent if you do not own) is how people “finish” the form and still undersave.</p>

      <h2>After you retire</h2>
      <p>A 4% / SWP rule is a drawdown illustration, not a pension. Pair the SIP target with the <a href="/calculators/sip/">SIP calculator</a>, the drawdown with <a href="/calculators/swp/">SWP</a>, and sensitivity with <a href="/calculators/inflation/">inflation</a>. Last declared EPF rate is 8.25% for FY 2025-26; FY 2026-27 had not been notified as of 21 August 2026 — do not freeze 8.25% for 30 years.</p>
      <div class="when-grid">
        <div class="when-card use">
          <h3>Inputs that deserve honesty</h3>
          <ul>
            <li>Spend what you spend, plus a health buffer</li>
            <li>Use 10–12% only for the accumulation equity sleeve</li>
            <li>Re-run corpus at 7% post-retirement if the form only has one box</li>
          </ul>
        </div>
        <div class="when-card skip">
          <h3>What this will not do</h3>
          <ul>
            <li>Model NPS annuity purchase at exit</li>
            <li>Apply old vs new regime to EPF withdrawals</li>
            <li>Guarantee a mutual fund return</li>
          </ul>
        </div>
      </div>
      <p>Sources: planner identities on this site (inflated spend, real-return annuity, SIP); EPFO interest for FY 2025-26 at 8.25% (Ministry of Labour notification 1 July 2026). Last verified 21 August 2026.</p>`,
  'Frequently Asked Questions',
  [
    { q: 'How much corpus do I need to retire in India?', a: 'Inflate today’s monthly spend to retirement, then fund 20–30 years of that future spending. At ₹40,000/month, 6% inflation, 30 years, the 12% planner placeholder shows about ₹3.64 crore; a 25× rule on the same future spend is about ₹6.9 crore. Your number moves with rent, health, and whether the house is paid off.' },
    { q: 'Is ₹1 crore enough?', a: 'At 7% it is roughly ₹58,000 a month before tax if you start drawing now. In 2046 that rupee buys less. Metro rent and health usually say no unless you own the house and spend little.' },
    { q: 'What inflation should I use?', a: '6% for a general lifestyle line; 8–10% for a health sleeve if you model it separately. Underestimating inflation is the usual error.' },
    { q: 'Should I include EPF in the corpus?', a: 'Yes as a starting asset, then let the planner compute the gap. Do not count EPF both as “already done” and as something the SIP will also build.' },
    { q: 'What is SWP?', a: 'A systematic withdrawal from a mutual fund. It is not a guaranteed pension. Test sustainability on the SWP calculator; sequence-of-returns risk is real in the first five years of retirement.' }
  ],
  '        <p><strong>Inflate spend, then back out SIP</strong></p>\n        <p>Use 12% only if you mean it. Re-run at 7% before you treat the corpus as conservative.</p>\n        <p><a href="/calculators/retirement/" class="calc-btn" style="display:inline-block;text-decoration:none;margin-top:8px;">Retirement Planner →</a></p>'
);

function replaceArticle(file, inner) {
  const abs = path.join(ROOT, file);
  let html = fs.readFileSync(abs, 'utf8');
  if (!/<article class="guide-content">/.test(html)) {
    throw new Error('no article in ' + file);
  }
  html = html.replace(
    /<article class="guide-content">[\s\S]*?<\/article>/,
    '<article class="guide-content">' + inner + '</article>'
  );
  html = syncFaqSchema(html);
  fs.writeFileSync(abs, html);
  console.log('article', file);
}

function syncFaqSchema(html) {
  const faqs = [];
  const re = /<div class="faq-item">\s*<h3>([^<]+)<\/h3>\s*<p>([\s\S]*?)<\/p>/g;
  let m;
  while ((m = re.exec(html))) {
    faqs.push({
      '@type': 'Question',
      name: m[1].replace(/&amp;/g, '&'),
      acceptedAnswer: {
        '@type': 'Answer',
        text: m[2].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim()
      }
    });
  }
  if (!faqs.length) return html;
  return html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g, function (full, raw) {
    let data;
    try {
      data = JSON.parse(raw);
    } catch (e) {
      return full;
    }
    function walk(node) {
      if (!node || typeof node !== 'object') return;
      if (Array.isArray(node)) {
        node.forEach(walk);
        return;
      }
      if (node['@type'] === 'FAQPage') node.mainEntity = faqs;
      if (node['@graph']) walk(node['@graph']);
    }
    walk(data);
    return '<script type="application/ld+json">\n  ' + JSON.stringify(data, null, 2).replace(/\n/g, '\n  ') + '\n  </script>';
  });
}

function patchIndex() {
  const file = path.join(ROOT, 'index.html');
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(
    /<section class="section" id="tools">[\s\S]*?<footer class="footer">/,
    HOMEPAGE_SECTIONS + '\n  <footer class="footer">'
  );
  fs.writeFileSync(file, html);
  console.log('homepage catalog');
}

function patchPpfCalc() {
  const file = path.join(ROOT, 'calculators/ppf/index.html');
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(
    'The interest rate is notified every quarter (7.1% p.a. was in force for recent quarters — re-check the DEA/NSO circular before you treat a 15-year projection as fixed).',
    'The interest rate is notified every quarter. For Q2 FY 2026-27 (1 July–30 September 2026) PPF is 7.10% p.a. (Ministry of Finance, 30 June 2026). Recheck the next DEA circular before you treat a 15-year projection as fixed.'
  );
  fs.writeFileSync(file, html);
  console.log('ppf calculator rate note');
}

function patchEpfGuide() {
  const file = path.join(ROOT, 'guides/epf-guide/index.html');
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(
    'The EPFO board has declared an interest rate of <strong>8.25% per annum</strong> for FY 2025-26. This rate applies to the accumulated balance in your EPF account and is among the highest available on a government-backed, relatively low-risk instrument. Interest is calculated on the monthly running balance and credited once a year after approval by the Ministry of Finance.',
    'The last <strong>declared</strong> EPF interest rate is <strong>8.25% per annum for FY 2025-26</strong> (Ministry of Labour and Employment notification dated 1 July 2026). FY 2026-27 had not been notified as of 21 August 2026 — do not treat 8.25% as already locked for this year. Interest is calculated on the monthly running balance and credited after government approval.'
  );
  fs.writeFileSync(file, html);
  console.log('epf guide rate note');
}

patchIndex();
replaceArticle('guides/ppf-fd-guide/index.html', PPF);
replaceArticle('guides/fd-vs-sip-guide/index.html', FDSIP);
replaceArticle('guides/home-loan-prepayment-guide/index.html', PREPAY);
replaceArticle('guides/gratuity-guide/index.html', GRAT);
replaceArticle('guides/retirement-planning-guide/index.html', RET);
patchPpfCalc();
patchEpfGuide();
console.log('content pass done');
