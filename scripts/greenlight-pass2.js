/**
 * Greenlight pass 2: honest dates, stray </div>, <main> landmarks,
 * explainer depth, EPF year fix. Run: node scripts/greenlight-pass2.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const SKIP_PREFIX = [
  'dashboard/',
  'data/',
  'blog/',
  'scripts/',
  'guides/emi/',
  'guides/sip/',
  'guides/salary/',
  'guides/tax/',
  'guides/hra/'
];

function walk(dir, acc) {
  acc = acc || [];
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === '.git' || name === '.wrangler') continue;
    const fp = path.join(dir, name);
    const st = fs.statSync(fp);
    if (st.isDirectory()) walk(fp, acc);
    else if (name.endsWith('.html')) acc.push(fp);
  }
  return acc;
}

function rel(fp) {
  return path.relative(ROOT, fp).replace(/\\/g, '/');
}

function isPublished(fp) {
  const r = rel(fp);
  return !SKIP_PREFIX.some(function (p) {
    return r === p || r.startsWith(p);
  });
}

function removeStrayDivCloses(html) {
  let out = '';
  let i = 0;
  let depth = 0;
  const n = html.length;
  let skipped = 0;

  function sliceEq(s) {
    return html.slice(i, i + s.length).toLowerCase() === s;
  }

  while (i < n) {
    if (html.startsWith('<!--', i)) {
      const end = html.indexOf('-->', i + 4);
      const j = end < 0 ? n : end + 3;
      out += html.slice(i, j);
      i = j;
      continue;
    }
    if (sliceEq('<script')) {
      const end = html.toLowerCase().indexOf('</script>', i);
      const j = end < 0 ? n : end + 9;
      out += html.slice(i, j);
      i = j;
      continue;
    }
    if (sliceEq('<style')) {
      const end = html.toLowerCase().indexOf('</style>', i);
      const j = end < 0 ? n : end + 8;
      out += html.slice(i, j);
      i = j;
      continue;
    }
    if (sliceEq('</div') && /[\s>/]/.test(html[i + 5] || '>')) {
      const end = html.indexOf('>', i);
      const tag = html.slice(i, end + 1);
      if (depth > 0) {
        depth -= 1;
        out += tag;
      } else {
        skipped += 1;
      }
      i = end + 1;
      continue;
    }
    if (sliceEq('<div') && /[\s>]/.test(html[i + 4] || '')) {
      const end = html.indexOf('>', i);
      const tag = html.slice(i, end + 1);
      if (!/\/\s*>$/.test(tag)) depth += 1;
      out += tag;
      i = end + 1;
      continue;
    }
    out += html[i];
    i += 1;
  }
  return { html: out, skipped: skipped };
}

function wrapMain(html) {
  if (/<main\b[^>]*\bid\s*=\s*["']main-content["']/.test(html)) return html;

  html = html.replace(/\s*id="main-content"/g, '');

  function demoteMain(from, to) {
    if (!html.includes(from)) return;
    html = html.replace(from, to);
    html = html.replace('</main>', '</div>');
  }
  demoteMain('<main class="calc-interface">', '<div class="calc-interface">');
  demoteMain('<main class="content-page">', '<div class="content-page">');
  demoteMain('<main class="container"', '<div class="container"');
  if (html.includes('<section class="hero">') || html.includes('<section id="main-content" class="hero">')) {
    html = html.replace('<section id="main-content" class="hero">', '<section class="hero">');
    html = html.replace('<section class="hero">', '<main id="main-content">\n  <section class="hero">');
    const footer = html.search(/<footer class="footer">/);
    if (footer > -1 && !html.includes('<main id="main-content">')) {
      /* already inserted via replace */
    }
    if (footer > -1 && (html.match(/<main id="main-content">/g) || []).length === 1 && !html.slice(0, footer).includes('</main>')) {
      html = html.slice(0, footer) + '  </main>\n\n  ' + html.slice(footer);
    }
    return html;
  }

  const navClose = html.lastIndexOf('</nav>');
  const footer = html.search(/<footer class="footer">/);
  if (navClose < 0 || footer < 0) return html;
  if (html.includes('<main id="main-content">')) return html;
  return (
    html.slice(0, navClose + 6) +
    '\n\n  <main id="main-content">' +
    html.slice(navClose + 6, footer) +
    '\n  </main>\n\n  ' +
    html.slice(footer)
  );
}

const DATE_BY_FILE = {
  'calculators/income-tax/index.html': null, // already 17
  'calculators/salary/index.html': null,
  'calculators/gst/index.html': null, // GST 2.0 last verified 18
  'calculators/ppf/index.html': '21',
  'calculators/emi/index.html': { kind: 'updated', day: '18' },
  'calculators/sip/index.html': { kind: 'updated', day: '18' },
  'calculators/hra/index.html': null // Rule 2A last reviewed 17 August 2026
};

const CALC_DEFAULT_DAY = '18';

const GUIDE_DATES = {
  'guides/ppf-fd-guide/index.html': '21',
  'guides/fd-vs-sip-guide/index.html': '21',
  'guides/home-loan-prepayment-guide/index.html': '21',
  'guides/gratuity-guide/index.html': '21',
  'guides/retirement-planning-guide/index.html': '21',
  'guides/epf-guide/index.html': '21',
  'guides/gst-guide/index.html': '18',
  'guides/tax-saving-guide/index.html': '17',
  'guides/old-vs-new-tax-regime-guide/index.html': '17',
  'guides/hra-exemption-guide/index.html': '17',
  'guides/emi-guide/index.html': '18',
  'guides/salary-guide/index.html': '17',
  'guides/sip-investment-guide/index.html': '18'
};

const ISO = { '17': '2026-08-17', '18': '2026-08-18', '21': '2026-08-21' };

function applyDates(html, r) {
  if (r.startsWith('calculators/')) {
    const spec = DATE_BY_FILE[r];
    if (spec === null) return html;
    if (spec && spec.kind === 'updated') {
      html = html.replace(/Last updated \d{1,2} August 2026/g, 'Last updated ' + spec.day + ' August 2026');
      return html;
    }
    const day = (spec && spec.day) || (spec === '21' ? '21' : CALC_DEFAULT_DAY);
    if (typeof spec === 'string') {
      html = html.replace(/Last verified \d{1,2} August 2026/g, 'Last verified ' + spec + ' August 2026');
    } else {
      html = html.replace(/Last verified \d{1,2} August 2026/g, 'Last verified ' + day + ' August 2026');
    }
    return html;
  }
  if (GUIDE_DATES[r]) {
    const day = GUIDE_DATES[r];
    html = html.replace(/Last updated \d{1,2} August 2026/g, 'Last updated ' + day + ' August 2026');
    html = html.replace(/Last verified \d{1,2} August 2026/g, 'Last verified ' + day + ' August 2026');
    html = html.replace(/"dateModified": "2026-08-\d{2}"/g, '"dateModified": "' + ISO[day] + '"');
  }
  return html;
}

const DEPTH = {};

DEPTH.cagr = `
        <h3>Worked numbers, and the SIP trap</h3>
        <p>₹1,00,000 → ₹1,61,051 in 5 years is 10.00% CAGR. ₹1,00,000 → ₹1,76,234 in 5 years is about 12.00%. Those two are lumpsum paths. If you actually sent ₹5,000 a month, the “start” is not ₹3,00,000 of contributions and the “end” is not a CAGR problem — cash went in on 60 different dates. Pasting total invested as Start on this page will usually overstate the rate because later instalments had less time in the market.</p>
        <p>Another abuse: measuring a fund from 23 March 2020 (COVID low) to a later high, then shopping that CAGR against a category average that used calendar years. Write both dates. If you cannot name them, do not quote the percentage in an office chat.</p>
        <div class="omit-box">
          <h3>What this calculator will not do</h3>
          <p>It will not annualise a SIP, an STP, or a folio with withdrawals. It will not add dividends unless they are already inside End. It will not tell you whether 12% is “good” versus Nifty — that comparison needs the same window on the index.</p>
        </div>`;

DEPTH['step-up-sip'] = `
        <h3>How much of the extra corpus is just extra saving</h3>
        <p>Take ₹10,000 a month for 20 years at a flat 12% illustration: invested ₹24 lakh, corpus in the mid-₹90 lakh region on the annuity-due identity this site uses. Start at ₹10,000 and raise 10% each year: you will have sent far more than ₹24 lakh — often ~₹57 lakh of contributions — so a ₹2 crore-looking corpus is mostly a savings plan, not a better fund. If your hike is 6% (inflation-matching), the picture sits between those two.</p>
        <p>Cancel the step-up in year four and you do not “owe” the chart. Reset the mandate to a rupee amount you can keep through a job change. A 5% step-up you honour beats a 15% step-up you pause after the first bonus disappointment.</p>
        <p>Inflation still eats the later instalments’ purchasing power. Pair this page with the <a href="/calculators/inflation/">inflation calculator</a> if the goal is a house down-payment quoted in today’s crores.</p>`;

DEPTH.rd = `
        <h3>A five-year RD versus the same rupees in an FD ladder</h3>
        <p>₹5,000 × 60 months is ₹3,00,000 of your money either way. An RD credits each instalment for a shorter leftover tenor, so maturity sits only a modest amount above ₹3 lakh at mid-7% — useful for a known wedding date, not a retirement plan. A 5-year cumulative FD of the same ₹3 lakh on day one earns more because the whole principal compounds from month one — but you must have the ₹3 lakh now. Salaried cash flow is RD-shaped; a bonus is FD-shaped.</p>
        <p>Post office RD and bank RD are different circulars. Type the rate on your passbook, not a “best RD rates in India” headline that mixed senior-citizen tariffs with a 7-day teaser. Interest remains taxable at slab. There is no 80C on a standard bank RD.</p>
        <div class="when-grid">
          <div class="when-card use">
            <h3>RD belongs</h3>
            <ul>
              <li>Goal in 12–60 months with a date attached</li>
              <li>You will not skip standing instructions</li>
              <li>You want DICGC-style bank risk, not NAV risk</li>
            </ul>
          </div>
          <div class="when-card skip">
            <h3>Skip the RD</h3>
            <ul>
              <li>Horizon is 10+ years (SIP or PPF sleeve)</li>
              <li>You already max a tax-saver FD / PPF for 80C</li>
              <li>The “RD” is actually a chit or unregistered scheme</li>
            </ul>
          </div>
        </div>`;

DEPTH.inflation = `
        <h3>Two baskets, two rates</h3>
        <p>₹1,00,000 of today’s spending at 6% for 20 years is about ₹3.21 lakh in future rupees. The same ₹1,00,000 at 10% (a harsh education/health overlay) is about ₹6.73 lakh. That gap is why a single CPI number on a retirement form can look “done” while school-fee circulars still break the plan. Run the lifestyle line at 6% and a health/education sleeve at 8–10% if those costs are real in your household.</p>
        <p>Real return is not “SIP rate minus inflation” as a subtraction when rates are high: (1.12 / 1.06) − 1 ≈ 5.7%, not 6%. The SIP calculator’s corpus is still a future rupee. You cannot buy 2026 rent with it without this conversion.</p>
        <p>This page does not load MOSPI month-on-month CPI. It compounds the single rate you typed. For official history, use the MOSPI series; for a goal date, type the rate you actually fear, then a second run at RBI’s 4% target so you see the spread.</p>`;

DEPTH.gratuity = `
        <h3>4.81% in CTC is not a monthly credit</h3>
        <p>Offer letters often show gratuity as 4.81% of basic. That is an HR accrual identity (15/26 as a percent of annual basic), not money in your account. Stay 4 years 11 months at a covered establishment and the Act typically pays ₹0 even though CTC showed the line every year. That is why this calculator asks for last drawn basic + DA and completed years — not CTC.</p>
        <p>Payment is due within 30 days of the gratuity becoming payable under the Act. Nomination (Form F or the employer equivalent) matters for death cases. Dismissal for specified misconduct can lead to forfeiture — that is a legal process, not a manager’s mood. Shops below the usual 10-employee coverage, and true contractors, are outside the default Act story; then only the appointment letter counts.</p>
        <p>Government employees follow different exemption math. If you are near the ₹20 lakh statutory ceiling, stop treating this estimate as the tax-free amount and take the Form 16 / CA route. Longer walkthrough: <a href="/guides/gratuity-guide/">gratuity guide</a>.</p>`;

DEPTH['net-worth'] = `
        <h3>Three scoreboards, not one humblebrag number</h3>
        <p>Keep (1) full net worth including primary home equity, (2) ex-house liquid-ish net worth (EPF + PPF + NPS + funds + gold melt value − unsecured loans), and (3) cash + liquid funds covering 6 months of spend. A Bengaluru 32-year-old can look “rich” on (1) after a 20% down-payment and still have 19 days of runway on (3). FIRE-style internet charts that treat the flat as a corpus assume you will sell the roof.</p>
        <p>Update EPF from the passbook, not from last year’s CTC annexure. Mark funds at current NAV, not at invested amount. For the house, a conservative circle-rate or last registered comparable beats a broker’s “you can get X”. Vehicles: resale, not on-road invoice. Jewellery: melt, not making charges plus GST.</p>
        <p>Revolving credit-card balances belong in liabilities even if you “always pay in three months.” Family loans you intend to repay belong too. ESOPs: vested value minus a tax haircut, or you will flatter the number the week before a sale.</p>`;

DEPTH.retirement = `
        <h3>Why the 12% placeholder is not a conservative corpus</h3>
        <p>This form has one return box. The default 12% is also used after retirement unless you change it. That is an accumulation-equity assumption applied to a 60–85 drawdown — aggressive. Re-run the same spend and inflation at 7% post-retirement and the corpus climbs toward the 25× world. The ₹3.64 crore illustration for ₹40,000/month, 6% inflation, 30 years, 12% throughout is an identity check against the engine, not a recommendation.</p>
        <p>Subtract what you already have before you treat the SIP line as a moral failing: EPF passbook, NPS, a paid-off house (which removes rent from the spend), and a working spouse’s accumulation. Do not subtract the house and also delete rent if you would still need a roof.</p>
        <p>NPS annuity purchase at exit, medical inflation as a separate sleeve, and old-vs-new-regime tax on EPF withdrawals are outside this page. Pair with <a href="/calculators/swp/">SWP</a> for the drawdown cartoon and <a href="/guides/retirement-planning-guide/">the retirement guide</a> for the caveats.</p>`;

DEPTH['compound-interest'] = `
        <h3>Nominal rate versus what actually hits the passbook</h3>
        <p>₹1 lakh at a “8% FD” for 10 years is not one number. Annual compound ≈ ₹2.16 lakh. Quarterly (the usual Indian cumulative FD) ≈ ₹2.21 lakh. Daily compounding at the same 8% adds little versus quarterly — a 0.25% lower card rate wipes the frequency slogan. Always compare maturity rupees, then tax. This page does not withhold TDS or apply slab tax; the <a href="/calculators/fd/">FD calculator</a> is the product-shaped version of the same formula.</p>
        <p>Mutual-fund “12% CAGR” is not n = 12 in this formula. CAGR is a smoothed history between two portfolio values. Using this page to “grow” a SIP at 12% monthly compound is the wrong identity — use the <a href="/calculators/sip/">SIP calculator</a> (annuity due).</p>
        <p>Rule of 72 remains a teaching shortcut: 72 / 8 ≈ 9 years to double. It ignores tax, expense ratios, and the fact that 8% will not arrive as a constant. Use it to sanity-check a brochure, not to time a house purchase.</p>`;

DEPTH.lumpsum = `
        <h3>Bonus week versus the STP compromise</h3>
        <p>₹10 lakh left for 15 years at a constant 12% is about ₹54.7 lakh on FV = P(1+r)^t. The same ₹10 lakh the week before a 30% drawdown is ₹7 lakh of starting NAV — the table cannot show that. An STP (park in liquid / short-duration, move a slice to equity for 6–12 months) is a behaviour choice. It usually earns less than a perfect lumpsum at the low, and more than waiting in cash through a two-year rally.</p>
        <p>Do not deploy the emergency fund, the next 18 months of rent, or the house down-payment on this page’s 12% cartoon. Joining bonus after EPF and tax is the usual honest lumpsum. ESOP sale proceeds are also one cash flow — tax on the ESOP event is separate from later LTCG on the fund.</p>
        <p>Type a net return if you care about TER. A 12% category average with a 1.8% expense ratio is not 12% in your folio. Redemption tax (equity vs debt rules then in force) applies when you sell, not on this projection.</p>`;

DEPTH.epf = `
        <h3>EPS is not this corpus, and 8.25% is last year’s declared rate</h3>
        <p>On statutory capped wages, employer 12% of ₹15,000 splits: 8.33% of ₹15,000 toward EPS (pension) and the rest toward EPF. The number this calculator compounds is the EPF slice plus employee 12%, at the rate you type — not the EPS pension formula, not the commutation, not Section 10(12) tax on a premature withdrawal.</p>
        <p>EPFO declared <strong>8.25% for FY 2025-26</strong> (Ministry of Labour notification dated 1 July 2026). FY 2026-27 had not been notified as of 18 August 2026. Do not freeze 8.25% for a 30-year projection. Interest is declared yearly; this page is a constant-rate sketch.</p>
        <p>Transfer on job change via UAN. A casual final-settlement withdrawal resets compounding and can be taxable if service is short. Employee contribution can sit in 80C (old regime) inside the same ₹1.5 lakh bucket as PPF and ELSS — EPF already using ₹21,600 a year of that bucket is why “I will also max PPF” often does not fit.</p>`;

DEPTH.swp = `
        <h3>Why a flat-return chart cannot bless a 6% withdrawal</h3>
        <p>₹1 crore with ₹40,000 a month is 4.8% a year before inflation. ₹60,000 a month is 7.2%. If the fund’s sequence is −20%, −8%, +12% in the first three years, the rupee withdrawal eats more units up front than this flat 8% line shows. That is sequence-of-returns risk. Keep 1–2 years of expenses in liquid funds if this SWP is rent, not a spreadsheet hobby.</p>
        <p>Each SWP is a redemption. Only the gain slice is taxed (equity vs debt rules then in force). FD interest is taxed in full. That tax difference is why a debt-fund SWP can look better than a 7% FD in a 30% slab — and can still fall. Trinity’s 4% rule used US large-cap history and US inflation. Copying it into an Indian metro rent + health path is a category error.</p>
        <p>NPS has annuity rules at exit. Do not treat this mutual-fund walker as an NPS pension illustration.</p>`;

DEPTH.fd = `
        <h3>Laddering, TDS, and the ₹5 lakh insurance cap</h3>
        <p>One ₹20 lakh FD at a small-finance bank quoting 8.5% is not “safer because the rate is higher.” DICGC covers ₹5 lakh per bank per depositor (principal + interest) under current rules. Split across banks if the stack is larger. A 5-year tax-saver FD can use 80C (old regime) but interest is still taxable; ordinary FDs have no 80C.</p>
        <p>₹5 lakh at 7% quarterly for 5 years matures about ₹7.07 lakh before tax (same identity as this engine). At a 30% slab you keep roughly ₹1.45 lakh of the ₹2.07 lakh interest after tax + cess — post-tax yield is not the card rate. TDS at 10% (when the bank’s threshold is crossed) is an advance, not the final bill. Form 15G/15H if you are eligible.</p>
        <p>Premature break usually reprices the whole period, often minus 0.50–1.00%. Senior-citizen extra is a tariff: type the higher rate; the formula will not add 0.50% because you are 61. Compare EEE PPF when the money can lock 15 years: <a href="/guides/ppf-fd-guide/">PPF vs FD</a>.</p>`;

DEPTH.ppf = `
        <h3>The 5th-of-month rule versus this annual table</h3>
        <p>This engine adds the year’s deposit, then applies the rate you typed. A real PPF passbook credits interest on the lowest balance between the 5th and the last day of each month. A deposit on the 6th often waits a month to start earning. If you always fund after the 5th, the table overstates. If you skip the ₹500 minimum, the account can go into default — the maturity cartoon assumes every year was funded.</p>
        <p>Q2 FY 2026-27 (1 July–30 September 2026) PPF is 7.10% p.a. as notified by the Ministry of Finance on 30 June 2026. The rate is reviewed every quarter. A 15-year projection at 7.10% is not a contract. ₹1.5 lakh × 15 = ₹22.5 lakh of your money; the rest is interest under current EEE rules.</p>
        <p>80C on the deposit exists only on the old regime, inside the same ₹1.5 lakh bucket as EPF and ELSS. New-regime taxpayers still get tax-free interest and maturity; they do not get 80C on the contribution. One adult, one account. Walkthrough: <a href="/guides/ppf-fd-guide/">PPF vs FD guide</a>.</p>`;

DEPTH['simple-interest'] = `
        <h3>Translate a flat quote before you argue with the dealer</h3>
        <p>₹5 lakh at “8% flat” for 4 years: simple interest = ₹1,60,000, total payable ₹6.60 lakh, implied EMI ≈ ₹13,750 if split evenly. The same ₹5 lakh at 8% reducing-balance for 4 years costs about ₹85,000 of interest. The banner rate was never the bank rate. Ask for the reducing-balance / IRR figure, or paste principal, rate, and tenure into the <a href="/calculators/emi/">EMI calculator</a> and compare total interest.</p>
        <p>Some gold loans and informal products still quote simple interest. Education loans often accrue simple interest in the moratorium, then switch to reducing-balance EMIs — read the sanction letter rather than using this page for the full life of the loan. Prepaying a true simple-interest contract may not cut interest the way an EMI prepayment does, unless the contract says so.</p>
        <p>Enter 18 months as 1.5 years. Monthly interest on this page is total simple interest divided by months — a comparison aid, not how a reducing-balance loan books each month.</p>`;

const GRATUITY_EXTRA = `
      <h2>4.81% in the offer letter</h2>
      <p>Many CTC annexures show gratuity as 4.81% of basic. That is 15 ÷ 26 expressed as a yearly accrual so the offer looks larger. It is an employer liability, not a monthly credit. If you resign at 4 years 11 months from a covered establishment, the Act typically pays nothing even though CTC showed the line for four years. Run the <a href="/calculators/salary/">salary calculator</a> for in-hand; run this guide’s formula only when you model an exit after qualifying service.</p>
      <h2>Payment, nomination, forfeiture</h2>
      <p>The Act expects payment within 30 days of gratuity becoming due. File a nomination (Form F or the employer’s equivalent) so death cases are not stuck in HR. Forfeiture can apply after dismissal for specified misconduct — that is a legal process. Establishments under the usual 10-employee threshold, and some contractor arrangements, sit outside default coverage; then only the appointment letter creates a claim.</p>
      <h2>Rounding the last year</h2>
      <p>Standing orders often treat more than six months in the last year as a full year. This site will not guess your establishment’s rounding. Enter the years HR will actually use. Death and disablement skip the five-year wait; ordinary resignation does not. Government servants follow a different exemption path under Section 10(10) — do not copy the private-sector ₹20 lakh working figure onto a civil-service exit without a CA.</p>
`;

function injectDepth(html, slug) {
  const block = DEPTH[slug];
  if (!block) return html;
  if (html.includes('class="calc-depth"')) return html;
  const wrapped =
    '        <div class="calc-depth">\n' +
    block.trim() +
    '\n        </div>\n';
  if (!html.includes('class="editorial-byline"')) return html;
  return html.replace(
    /        <p class="editorial-byline">/,
    wrapped + '        <p class="editorial-byline">'
  );
}

function patchEpf(html) {
  html = html.replace(
    'Interest: 8.25% p.a. compounded monthly.',
    'Interest: last declared 8.25% p.a. for FY 2025-26 (not a freeze for FY 2026-27). Compounding here is a planning estimate.'
  );
  html = html.replace(
    '8.25% was notified for FY 2024-25; confirm the latest year on',
    '8.25% was notified for FY 2025-26 (Ministry of Labour, 1 July 2026); FY 2026-27 had not been notified as of 18 August 2026 — confirm the latest year on'
  );
  return html;
}

let files = walk(ROOT).filter(isPublished);
let n = 0;
const skipLog = [];

files.forEach(function (fp) {
  const r = rel(fp);
  let html = fs.readFileSync(fp, 'utf8');
  const before = html;

  const stray = removeStrayDivCloses(html);
  html = stray.html;
  if (stray.skipped) skipLog.push(r + ' stray</div>×' + stray.skipped);

  html = wrapMain(html);
  html = applyDates(html, r);

  const calcMatch = r.match(/^calculators\/([^/]+)\/index\.html$/);
  if (calcMatch) html = injectDepth(html, calcMatch[1]);
  if (r === 'calculators/epf/index.html') html = patchEpf(html);

  if (r === 'guides/gratuity-guide/index.html' && !html.includes('4.81% in the offer letter')) {
    html = html.replace(
      '<p>Sources: Payment of Gratuity Act, 1972',
      GRATUITY_EXTRA.trim() + '\n      <p>Sources: Payment of Gratuity Act, 1972'
    );
  }

  html = html.replace(/<\/section><section/g, '</section>\n\n  <section');
  html = html.replace(/\n{4,}/g, '\n\n\n');

  if (html !== before) {
    fs.writeFileSync(fp, html);
    n += 1;
    console.log('patched', r);
  }
});

console.log('Files changed:', n);
if (skipLog.length) {
  console.log('Stray closes removed:');
  skipLog.forEach(function (l) {
    console.log(' ', l);
  });
}
