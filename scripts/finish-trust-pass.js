/**
 * Finish trust/footer leftovers + remaining templated CTAs + leftover alerts.
 * Run: node scripts/finish-trust-pass.js
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}
function write(rel, html) {
  fs.writeFileSync(path.join(ROOT, rel), html);
}

const GUIDE_NAV_OLD = `<nav>
        <a href="/about/">About</a>
        <a href="/privacy/">Privacy</a>
        <a href="/#employee">Employee Tools</a>
        <a href="/#investor">Investor Tools</a>
      </nav>`;

const GUIDE_NAV_NEW = `<nav>
        <a href="/about/">About</a>
        <a href="/editorial-policy/">Editorial policy</a>
        <a href="/contact/">Contact</a>
        <a href="/privacy/">Privacy</a>
        <a href="/disclaimer/">Disclaimer</a>
      </nav>`;

const EPF_FOOTER_OLD = `<a href="/about/" style="color:#94A3B8;">About</a> ·
          <a href="/privacy/" style="color:#94A3B8;">Privacy</a> ·
          <a href="/#employee" style="color:#94A3B8;">Employee Tools</a> ·
          <a href="/#investor" style="color:#94A3B8;">Investor Tools</a>`;

const EPF_FOOTER_NEW = `<a href="/about/" style="color:#94A3B8;">About</a> ·
          <a href="/editorial-policy/" style="color:#94A3B8;">Editorial policy</a> ·
          <a href="/contact/" style="color:#94A3B8;">Contact</a> ·
          <a href="/privacy/" style="color:#94A3B8;">Privacy</a> ·
          <a href="/disclaimer/" style="color:#94A3B8;">Disclaimer</a>`;

const CTA = {
  epf: 'EPF interest is declared each year. The guide covers UAN, the wage ceiling, and when withdrawals stay tax-exempt.',
  fd: 'Bank FDs use their own compounding (usually quarterly). Compare the effective yield, not just the card rate.',
  rd: 'RD maturity depends on monthly compounding of each instalment. Banks may round interest differently.',
  ppf: 'PPF is a 15-year account with a ₹1.5 lakh annual cap. The guide compares lock-in versus FD liquidity.',
  gratuity: 'Gratuity uses 15/26 of last drawn wages × years (Payment of Gratuity Act), with current statutory caps.',
  lumpsum: 'This is a compound-growth illustration. Mutual-fund NAV path will not match a constant rate.',
  'step-up-sip': 'Step-up models an annual increase in SIP. Actual step-up dates follow your AMC mandate.',
  'compound-interest': 'Compounding frequency (monthly vs yearly) changes the effective yield more than people expect.',
  'simple-interest': 'Simple interest does not compound. Use it for some loans and deposits, not for mutual funds.',
  cagr: 'CAGR describes a lumpsum path. SIPs need XIRR because cash flows are many, not one.',
  swp: 'SWP illustrations assume a constant return while you withdraw. Sequence-of-returns risk is not modelled.',
  inflation: 'Inflation here is a constant rate you type. Real CPI will bounce year to year.',
  retirement: 'Corpus need is an estimate from current expenses, inflation, and years in retirement — not a pension quote.',
  'net-worth': 'Net worth is assets minus liabilities on a date you choose. It is not investable cash.'
};

const FACTORS = {
  epf: 'What actually moves EPF corpus',
  fd: 'What changes FD maturity',
  rd: 'What changes RD maturity',
  ppf: 'PPF rules that cap this result',
  gratuity: 'Inputs that change gratuity',
  lumpsum: 'Assumptions in this projection',
  'step-up-sip': 'What a step-up SIP depends on',
  'compound-interest': 'Compounding choices that matter',
  'simple-interest': 'When simple interest applies',
  cagr: 'How to read this CAGR',
  swp: 'What this SWP does not model',
  inflation: 'How to use an inflation rate',
  retirement: 'Levers in a retirement corpus',
  'net-worth': 'How to count assets and debts'
};

let n = 0;
function patchFile(rel, fn) {
  const before = read(rel);
  const after = fn(before);
  if (after !== before) {
    write(rel, after);
    n++;
    console.log('updated', rel);
  }
}

patchFile('about/index.html', (h) => {
  if (h.includes('footer') && !h.includes('href="/editorial-policy/">Editorial Policy')) {
    h = h.replace(
      '<li><a href="/disclaimer/">Disclaimer</a></li>',
      '<li><a href="/editorial-policy/">Editorial Policy</a></li>\n            <li><a href="/disclaimer/">Disclaimer</a></li>'
    );
  }
  return h;
});

patchFile('contact/index.html', (h) => {
  h = h.replace(
    '<p><a href="/privacy/">Privacy Policy</a> · <a href="/terms/">Terms of Service</a> · <a href="/disclaimer/">Disclaimer</a> · <a href="/about/">About CalStacker</a></p>',
    '<p><a href="/privacy/">Privacy Policy</a> · <a href="/terms/">Terms of Service</a> · <a href="/disclaimer/">Disclaimer</a> · <a href="/editorial-policy/">Editorial policy</a> · <a href="/about/">About CalStacker</a></p>'
  );
  h = h.replace(
    '<span><a href="/privacy/">Privacy</a> · <a href="/disclaimer/">Disclaimer</a></span>',
    '<span><a href="/privacy/">Privacy</a> · <a href="/editorial-policy/">Editorial</a> · <a href="/disclaimer/">Disclaimer</a></span>'
  );
  return h;
});

const guideFiles = [];
function walkGuides(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) {
      if (['emi', 'sip', 'salary', 'tax', 'hra'].includes(name) && !name.endsWith('-guide')) {
        const rel = path.relative(ROOT, full).replace(/\\/g, '/');
        if (!rel.includes('-guide')) continue;
      }
      walkGuides(full);
    } else if (name === 'index.html') {
      const rel = path.relative(ROOT, full).replace(/\\/g, '/');
      if (rel.startsWith('guides/') && !rel.includes('/10-lakh') && !rel.includes('/25-lakh') &&
          !rel.includes('/30-lakh') && !rel.includes('/50-lakh') && !rel.includes('per-month') &&
          !rel.includes('ctc-in-hand') && !rel.includes('ctc-breakdown') && !rel.includes('12-lakh') &&
          !rel.includes('zero-tax') && !rel.includes('bangalore')) {
        guideFiles.push(rel);
      }
    }
  }
}
walkGuides(path.join(ROOT, 'guides'));

for (const rel of guideFiles) {
  patchFile(rel, (h) => {
    h = h.replace(GUIDE_NAV_OLD, GUIDE_NAV_NEW);
    h = h.replace(EPF_FOOTER_OLD, EPF_FOOTER_NEW);
    return h;
  });
}

const alerts = [
  ['calculators/emi/index.html', "alert('Tenure must be at least 1 month');", "showCalcError('Tenure must be at least 1 month');"],
  ['calculators/retirement/index.html', "alert('Retirement age must be greater than current age');", "showCalcError('Retirement age must be greater than current age');"],
  ['calculators/ppf/index.html', "alert('Maximum annual PPF deposit is ₹1,50,000');", "showCalcError('Maximum annual PPF deposit is ₹1,50,000');"],
  ['calculators/epf/index.html', "alert('Retirement age must be greater than current age');", "showCalcError('Retirement age must be greater than current age');"]
];
for (const [rel, a, b] of alerts) {
  patchFile(rel, (h) => h.replace(a, b));
}

for (const [slug, cta] of Object.entries(CTA)) {
  const rel = 'calculators/' + slug + '/index.html';
  patchFile(rel, (h) => {
    if (FACTORS[slug]) {
      h = h.replace('<h3>Key Factors That Affect Your Result</h3>', '<h3>' + FACTORS[slug] + '</h3>');
    }
    h = h.replace('<p>In-depth guide with Indian examples, common mistakes, and FAQs.</p>', '<p>' + cta + '</p>');
    return h;
  });
}

patchFile('index.html', (h) => {
  if (h.includes('"@type": "WebSite"')) return h;
  const schema = `  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "CalStacker",
    "url": "https://calstacker.com/",
    "description": "Free EMI, SIP, salary, and income-tax calculators for India.",
    "publisher": {
      "@type": "Organization",
      "name": "CalStacker",
      "url": "https://calstacker.com/",
      "founder": { "@type": "Person", "name": "Rizwan Ali", "url": "https://calstacker.com/about/" }
    }
  }
  </script>
`;
  return h.replace('</head>', schema + '</head>');
});

patchFile('calculators/epf/index.html', (h) => h.replace(
  'For FY 2024-25 it was around 8.25% p.a. Rates change each year; this calculator uses 8.25% as an approximation.',
  'EPFO declared 8.25% for FY 2025-26. FY 2026-27 is notified later in the year; this calculator uses 8.25% until a new rate is published.'
));

console.log('files updated:', n);
try {
  const og = fs.statSync(path.join(ROOT, 'assets/img/og-share.png'));
  console.log('og-share.png bytes', og.size);
} catch (e) {
  console.log('MISSING og-share.png');
}
