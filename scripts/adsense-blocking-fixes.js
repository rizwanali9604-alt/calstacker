/**
 * AdSense blocking fixes 1–4, 6 (batch HTML patch)
 * Run: node scripts/adsense-blocking-fixes.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const PUB_ID = 'ca-pub-8332278519903196';
const PUB_RE = /ca-pub-83322785[0-9]{7}/g;

const STANDARD_NAV = `  <nav class="nav">
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
  </nav>`;

const HEADING_FIXES = {
  emi: 'How EMI Works for Home, Car & Personal Loans in India',
  sip: 'How SIP Returns Are Calculated (With Real Numbers)',
  salary: 'How CTC Becomes In-Hand Salary in India',
  'income-tax': 'How Old vs New Tax Regime Tax Is Calculated',
  hra: 'How HRA Exemption Is Calculated Under Section 10(13A)',
  gratuity: 'How Gratuity Is Calculated Under the Payment of Gratuity Act',
  epf: 'How EPF Contributions and Corpus Grow',
  ppf: 'How PPF Maturity Is Calculated in India',
  fd: 'How Fixed Deposit Interest Compounds',
  rd: 'How Recurring Deposit Maturity Is Calculated',
  gst: 'How GST Amount Is Calculated on Inclusive & Exclusive Prices',
  'net-worth': 'How to Calculate Your Net Worth Accurately',
  retirement: 'How Retirement Corpus Targets Are Estimated',
  lumpsum: 'How Lumpsum Mutual Fund Returns Compound',
  'step-up-sip': 'How Step-Up SIP Builds More Wealth Than Flat SIP',
  'compound-interest': 'How Compound Interest Grows Your Money Over Time',
  'simple-interest': 'How Simple Interest Differs From Reducing-Balance Interest',
  cagr: 'How CAGR Measures Investment Growth',
  swp: 'How SWP Provides Monthly Income From Mutual Funds',
  inflation: 'How Inflation Erodes Purchasing Power Over Time'
};

const INLINE_DISCLAIMER = `
        <p class="calc-inline-disclaimer" style="font-size:13px;color:var(--text-secondary);margin-top:16px;padding:12px;border-left:3px solid var(--border);line-height:1.5;">Results are estimates for education and planning only — not financial, tax, or investment advice. Confirm important decisions with a Chartered Accountant or SEBI-registered adviser. See our <a href="/disclaimer/">Disclaimer</a>.</p>`;

const CALC_BYLINE = `<p class="editorial-byline">Written by <a href="/about/">Rizwan Ali</a> · Last updated August 2026 · <a href="/about/">About the author</a></p>`;
const GUIDE_BYLINE = `<p class="editorial-byline" style="font-size:14px;color:var(--text-secondary);margin-top:8px;">Written by <a href="/about/">Rizwan Ali</a> · Last updated August 2026</p>`;

function walkHtml(dir, fn) {
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (name === 'node_modules' || name === '.git') continue;
      walkHtml(p, fn);
    } else if (name.endsWith('.html')) {
      fn(p);
    }
  }
}

function stripAffiliateCtas(html) {
  // Remove affiliate-cta blocks and preceding AFFILIATE comments
  html = html.replace(/\s*<!-- AFFILIATE:[\s\S]*?-->\s*<div class="affiliate-cta"[\s\S]*?<\/div>/g, '');
  // Orphaned ctas without comment
  html = html.replace(/\s*<div class="affiliate-cta"[\s\S]*?<\/div>/g, '');
  return html;
}

function patchNav(html) {
  return html.replace(/<nav class="nav">[\s\S]*?<\/nav>/, STANDARD_NAV);
}

function unifyPubId(html) {
  return html.replace(PUB_RE, 'ca-pub-' + PUB_ID.replace('ca-pub-', ''));
}

let stats = { files: 0, affiliateStripped: 0, headings: 0, disclaimers: 0, bylines: 0 };

// 1. Delete affiliate page
const affPath = path.join(root, 'affiliate', 'index.html');
if (fs.existsSync(affPath)) {
  fs.unlinkSync(affPath);
  console.log('deleted: affiliate/index.html');
}
try {
  const affDir = path.join(root, 'affiliate');
  if (fs.existsSync(affDir) && fs.readdirSync(affDir).length === 0) {
    fs.rmdirSync(affDir);
  }
} catch (_) {}

// Patch all HTML
walkHtml(root, (file) => {
  let html = fs.readFileSync(file, 'utf8');
  const before = html;

  html = patchNav(html);
  html = unifyPubId(html);

  // Remove Recommended from any remaining nav patterns
  html = html.replace(/\s*<a href="\/affiliate\/"[^>]*>Recommended<\/a>\s*/g, '\n');

  const isCalc = file.includes(`${path.sep}calculators${path.sep}`);
  const isGuide = file.includes(`${path.sep}guides${path.sep}`) && !file.endsWith(`${path.sep}guides${path.sep}index.html`);

  if (isCalc) {
    const hadAff = html.includes('affiliate-cta') || html.includes('#affiliate-link-needed');
    html = stripAffiliateCtas(html);
    if (hadAff) stats.affiliateStripped++;

    // Fix SEO headings
    const slug = path.basename(path.dirname(file));
    if (HEADING_FIXES[slug]) {
      const re = /(<section class="section-sm calc-seo-section">[\s\S]*?<h2>)Understanding [^<]+(<\/h2>)/;
      if (re.test(html)) {
        html = html.replace(re, `$1${HEADING_FIXES[slug]}$2`);
        stats.headings++;
      }
    }

    // Replace editorial byline
    if (html.includes('editorial-byline')) {
      html = html.replace(
        /<p class="editorial-byline">[\s\S]*?<\/p>/,
        CALC_BYLINE
      );
      stats.bylines++;
    }

    // Add inline disclaimer once near result-box end or before related tools
    if (!html.includes('calc-inline-disclaimer')) {
      if (html.includes('<!-- related-calculators -->')) {
        html = html.replace('<!-- related-calculators -->', INLINE_DISCLAIMER + '\n\n      <!-- related-calculators -->');
        stats.disclaimers++;
      } else if (html.includes('id="resultBox"')) {
        // insert after result box closing — fallback before </main>
        html = html.replace('</main>', INLINE_DISCLAIMER + '\n  </main>');
        stats.disclaimers++;
      }
    }
  }

  if (isGuide && !file.includes(`${path.sep}emi${path.sep}`) && !file.includes(`${path.sep}sip${path.sep}`) && !file.includes(`${path.sep}salary${path.sep}`) && !file.includes(`${path.sep}tax${path.sep}`) && !file.includes(`${path.sep}hra${path.sep}`)) {
    // Pillar guides only (not thin scenario pages)
    if (html.includes('guide-subtitle') && !html.includes('Written by <a href="/about/">Rizwan Ali</a>')) {
      html = html.replace(
        /(<p class="guide-subtitle">[\s\S]*?<\/p>)/,
        `$1\n      ${GUIDE_BYLINE}`
      );
      stats.bylines++;
    }
  }

  if (html !== before) {
    fs.writeFileSync(file, html);
    stats.files++;
    console.log('patched:', path.relative(root, file));
  }
});

console.log('\nStats:', JSON.stringify(stats, null, 2));
