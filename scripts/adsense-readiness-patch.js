/**
 * AdSense readiness patch — nav, footer, remove placeholders & broken affiliates.
 * Run: node scripts/adsense-readiness-patch.js
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
        <a href="/guides/" class="nav-link">Guides</a>
        <a href="/about/" class="nav-link">About</a>
        <a href="/contact/" class="nav-link">Contact</a>
        <a href="/calculators/emi/" class="nav-cta">
          EMI Calculator →
        </a>
      </div>
      <button class="nav-toggle" aria-label="Toggle menu">☰</button>
    </div>
  </nav>`;

const COMPANY_FOOTER_OLD = `<h4>Company</h4>
          <ul>
            <li><a href="/about/">About</a></li>
            <li><a href="/privacy/">Privacy Policy</a></li>
            <li><a href="/sitemap.xml">Sitemap</a></li>
          </ul>`;

const COMPANY_FOOTER_NEW = `<h4>Company</h4>
          <ul>
            <li><a href="/about/">About</a></li>
            <li><a href="/guides/">Guides</a></li>
            <li><a href="/contact/">Contact</a></li>
            <li><a href="/privacy/">Privacy Policy</a></li>
            <li><a href="/terms/">Terms of Service</a></li>
            <li><a href="/disclaimer/">Disclaimer</a></li>
            <li><a href="/sitemap.xml">Sitemap</a></li>
          </ul>`;

const THIN_PAGE_PATTERNS = [
  /[/\\]guides[/\\]emi[/\\][^/\\]+[/\\]index\.html$/,
  /[/\\]guides[/\\]sip[/\\][^/\\]+[/\\]index\.html$/,
  /[/\\]guides[/\\]salary[/\\](35000|600000)[^/\\]*[/\\]index\.html$/,
  /[/\\]guides[/\\]tax[/\\][^/\\]+[/\\]index\.html$/,
  /[/\\]guides[/\\]hra[/\\][^/\\]+[/\\]index\.html$/,
  /[/\\]blog[/\\]/
];

const GUIDE_LINK_REPLACEMENTS = {
  '/guides/emi/50-lakh-20-years/': '/guides/emi-guide/',
  '/guides/emi/30-lakh-15-years/': '/guides/emi-guide/',
  '/guides/emi/25-lakh-10-years/': '/guides/emi-guide/',
  '/guides/emi/10-lakh-car-loan/': '/guides/emi-guide/',
  '/guides/sip/5000-per-month-10-years/': '/guides/sip-investment-guide/',
  '/guides/sip/3000-per-month-20-years/': '/guides/sip-investment-guide/',
  '/guides/sip/10000-per-month-15-years/': '/guides/sip-investment-guide/',
  '/guides/salary/600000-ctc-breakdown/': '/guides/salary-guide/',
  '/guides/salary/35000-ctc-in-hand/': '/guides/salary-guide/',
  '/guides/tax/12-lakh-salary-old-vs-new/': '/guides/tax-saving-guide/',
  '/guides/tax/zero-tax-12-lakh/': '/guides/tax-saving-guide/',
  '/guides/hra/bangalore-25000-basic/': '/guides/tax-saving-guide/'
};

function isThinPage(filePath) {
  const normalized = filePath.replace(/\\/g, '/');
  return THIN_PAGE_PATTERNS.some((re) => re.test(normalized));
}

function patchNav(html) {
  return html.replace(/<nav class="nav">[\s\S]*?<\/nav>/, STANDARD_NAV);
}

function removeAdSlots(html) {
  html = html.replace(/<div class="container">\s*<div class="ad-slot">[\s\S]*?<\/div>\s*<\/div>\s*/g, '');
  html = html.replace(/<div class="ad-slot">[\s\S]*?<\/div>\s*/g, '');
  return html;
}

function removeAffiliates(html) {
  html = html.replace(/<!-- AFFILIATE:[\s\S]*?(?=(?:<\/div>\s*){0,3}(?:<div class="ad-slot|<\/main>|<section class|<div class="container">\s*\n\s*<section))/g, '');
  let prev;
  do {
    prev = html;
    html = html.replace(/<!-- AFFILIATE:[^\n]*\n/g, '');
    html = html.replace(/<div class="affiliate-cta"[\s\S]*?<\/div>\s*\n?/g, '');
  } while (html !== prev);
  return html;
}

function addNoindex(html) {
  if (html.includes('name="robots"')) {
    return html.replace(/<meta name="robots" content="[^"]*">/, '<meta name="robots" content="noindex, follow">');
  }
  return html.replace(
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <meta name="robots" content="noindex, follow">'
  );
}

function removeAdSense(html) {
  return html.replace(/\s*<script async src="https:\/\/pagead2\.googlesyndication\.com[^<]*<\/script>\s*/g, '\n');
}

function fixCanonicalDoubleSlash(html) {
  return html.replace(/href="(https:\/\/calstacker\.com\/[^"]+)\/\/"/g, 'href="$1/"');
}

function addCookieConsent(html) {
  if (html.includes('cookie-consent.js')) return html;
  if (html.includes('noindex, follow') || html.includes('noindex, nofollow')) return html;
  return html.replace('</body>', '  <script src="/assets/js/cookie-consent.js"></script>\n</body>');
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

let count = 0;
walkHtml(root, (p) => {
  let html = fs.readFileSync(p, 'utf8');
  const before = html;
  const rel = path.relative(root, p).replace(/\\/g, '/');
  const thin = isThinPage(p);

  html = patchNav(html);
  html = removeAdSlots(html);
  html = removeAffiliates(html);
  html = fixCanonicalDoubleSlash(html);

  for (const [oldLink, newLink] of Object.entries(GUIDE_LINK_REPLACEMENTS)) {
    html = html.split(oldLink).join(newLink);
  }

  html = html.replace(COMPANY_FOOTER_OLD, COMPANY_FOOTER_NEW);
  html = html.replace(/Built for employees & investors worldwide/g, 'Made for Indian employees & investors');
  html = html.replace(/Built for employees & investors\. No signup, instant results\./g, 'Free financial calculators for Indian employees and investors. No signup required.');

  if (thin || rel.startsWith('dashboard/')) {
    html = addNoindex(html);
    html = removeAdSense(html);
  }

  if (rel === 'dashboard/index.html') {
    html = addNoindex(html);
    html = removeAdSense(html);
  }

  if (!thin && !rel.startsWith('dashboard/')) {
    html = addCookieConsent(html);
  }

  if (html !== before) {
    fs.writeFileSync(p, html);
    count++;
    console.log('patched:', rel, thin ? '(noindex)' : '');
  }
});

console.log('Total patched:', count);
