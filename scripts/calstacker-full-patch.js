/**
 * CalStacker Parts 1-4 bulk patch: nav, titles, schema, affiliate CTAs.
 * Run: node scripts/calstacker-full-patch.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

const STANDARD_NAV = `  <nav class="nav">
    <div class="nav-inner">
      <a href="/" class="nav-logo">CalStacker</a>
      <div class="nav-links">
        <a href="/#employee" class="nav-link">Employee Tools</a>
        <a href="/#investor" class="nav-link">Investor Tools</a>
        <a href="/about/" class="nav-link">About</a>
        <a href="/calculators/emi/" class="nav-cta">
          EMI Calculator →
        </a>
      </div>
      <button class="nav-toggle" aria-label="Toggle menu">☰</button>
    </div>
  </nav>`;

const ADSENSE = `  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8332278513903196" crossorigin="anonymous"></script>`;

const CALCS = [
  { slug: 'emi', name: 'EMI Calculator', desc: 'Calculate monthly EMI for home, car, or personal loans', groww: false },
  { slug: 'sip', name: 'SIP Calculator', desc: 'Calculate returns on monthly SIP investments in mutual funds', groww: true },
  { slug: 'salary', name: 'Salary Calculator', desc: 'Convert CTC to in-hand salary with all deductions', groww: false },
  { slug: 'income-tax', name: 'Income Tax Calculator', desc: 'Compare tax liability under old and new regime', groww: false },
  { slug: 'hra', name: 'HRA Exemption Calculator', desc: 'Calculate HRA exemption for Indian salaried employees', groww: false },
  { slug: 'gratuity', name: 'Gratuity Calculator', desc: 'Calculate gratuity amount as per Payment of Gratuity Act', groww: false },
  { slug: 'epf', name: 'EPF Calculator', desc: 'Calculate EPF corpus and monthly contributions', groww: false },
  { slug: 'ppf', name: 'PPF Calculator', desc: 'Calculate PPF maturity amount and interest earned', groww: false },
  { slug: 'fd', name: 'FD Calculator', desc: 'Calculate fixed deposit maturity amount and interest', groww: false },
  { slug: 'rd', name: 'RD Calculator', desc: 'Calculate recurring deposit returns and maturity value', groww: false },
  { slug: 'gst', name: 'GST Calculator', desc: 'Calculate GST amount and total price with tax', groww: false },
  { slug: 'net-worth', name: 'Net Worth Calculator', desc: 'Calculate your total net worth from assets and liabilities', groww: false },
  { slug: 'retirement', name: 'Retirement Calculator', desc: 'Plan retirement corpus needed for financial independence', groww: true },
  { slug: 'lumpsum', name: 'Lumpsum Calculator', desc: 'Calculate returns on one-time lump sum investment', groww: true },
  { slug: 'step-up-sip', name: 'Step-up SIP Calculator', desc: 'Calculate returns on SIP with annual step-up increases', groww: true },
  { slug: 'compound-interest', name: 'Compound Interest Calculator', desc: 'Calculate compound interest for any investment', groww: true },
  { slug: 'simple-interest', name: 'Simple Interest Calculator', desc: 'Calculate simple interest for loans and deposits', groww: false },
  { slug: 'cagr', name: 'CAGR Calculator', desc: 'Calculate Compound Annual Growth Rate of any investment', groww: true },
  { slug: 'swp', name: 'SWP Calculator', desc: 'Calculate Systematic Withdrawal Plan for retirement income', groww: true },
  { slug: 'inflation', name: 'Inflation Calculator', desc: 'Calculate the impact of inflation on purchasing power', groww: false }
];

function affiliateBlock(groww) {
  let html = `<!-- AFFILIATE: replace href with your Zerodha affiliate URL from zerodha.com/open-account -->
<div class="affiliate-cta">
  <div class="aff-icon">📈</div>
  <div class="aff-text">
    <strong>Ready to invest your savings?</strong>
    <span>Open free Zerodha account — India's #1 stock broker</span>
  </div>
  <a href="#affiliate-link-needed" target="_blank"
     rel="noopener sponsored" class="aff-btn aff-zerodha">
    Open Account Free →
  </a>
</div>

<!-- AFFILIATE: replace href with your Angel One affiliate URL from angelone.in/partner -->
<div class="affiliate-cta" style="margin-top:10px;">
  <div class="aff-icon">💹</div>
  <div class="aff-text">
    <strong>Also try Angel One</strong>
    <span>Free demat account + smart research tools for investors</span>
  </div>
  <a href="#affiliate-link-needed" target="_blank"
     rel="noopener sponsored" class="aff-btn">
    Open Account →
  </a>
</div>`;
  if (groww) {
    html += `

<!-- AFFILIATE: replace href with your Groww referral URL from groww.in/refer -->
<div class="affiliate-cta" style="margin-top:10px;">
  <div class="aff-icon">🌱</div>
  <div class="aff-text">
    <strong>Start your first SIP today</strong>
    <span>Groww — invest in mutual funds with ₹500/month</span>
  </div>
  <a href="#affiliate-link-needed" target="_blank"
     rel="noopener sponsored" class="aff-btn aff-groww">
    Invest on Groww →
  </a>
</div>`;
  }
  return html;
}

function schemaBlock(name, slug, desc) {
  const obj = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    url: `https://calstacker.com/calculators/${slug}/`,
    description: desc,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }
  };
  return `\n  <script type="application/ld+json">\n${JSON.stringify(obj, null, 2)}\n  </script>`;
}

function patchNav(html) {
  return html.replace(/<nav class="nav">[\s\S]*?<\/nav>/, STANDARD_NAV);
}

function patchAdSense(html) {
  if (html.includes('pagead2.googlesyndication.com')) return html;
  return html.replace('</head>', ADSENSE + '\n</head>');
}

function patchCalcPage(filePath, calc) {
  let html = fs.readFileSync(filePath, 'utf8');
  const title = `${calc.name} Free Online — CalStacker`;

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
  html = patchNav(html);

  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/g, '');
  html = html.replace('</head>', schemaBlock(calc.name, calc.slug, calc.desc) + '\n</head>');

  html = html.replace(/<!-- AFFILIATE:[\s\S]*?(?=<div class="ad-slot"|<\/div>\s*<\/div>\s*\n\n\s*<div class="ad-slot"|<\/main>)/, '');
  html = html.replace(/<div class="affiliate-cta">[\s\S]*?<\/div>\s*(?:<div class="affiliate-cta"[\s\S]*?<\/div>\s*)*/, affiliateBlock(calc.groww) + '\n\n      ');

  html = patchAdSense(html);
  fs.writeFileSync(filePath, html);
  console.log('calc:', calc.slug);
}

function walkHtml(dir, fn) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) {
      if (name === 'node_modules' || name === '.git') continue;
      walkHtml(p, fn);
    } else if (name.endsWith('.html')) {
      fn(p);
    }
  }
}

let navCount = 0;
walkHtml(root, (p) => {
  let html = fs.readFileSync(p, 'utf8');
  const before = html;
  html = patchNav(html);
  html = patchAdSense(html);
  if (html !== before) {
    fs.writeFileSync(p, html);
    navCount++;
    console.log('nav+ads:', path.relative(root, p));
  }
});

for (const calc of CALCS) {
  patchCalcPage(path.join(root, 'calculators', calc.slug, 'index.html'), calc);
}

// Title fixes for static pages
const titleFixes = {
  'about/index.html': 'About CalStacker — Free Financial Calculators for India',
  'privacy/index.html': 'Privacy Policy — CalStacker',
  'guides/index.html': 'Financial Guides — CalStacker'
};
for (const [rel, title] of Object.entries(titleFixes)) {
  const p = path.join(root, rel);
  if (!fs.existsSync(p)) continue;
  let html = fs.readFileSync(p, 'utf8');
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
  fs.writeFileSync(p, html);
  console.log('title:', rel);
}

console.log('nav/ads patched:', navCount, 'files');
console.log('done');
