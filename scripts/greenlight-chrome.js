/**
 * Unify published HTML chrome: consent stub, nav, footer, Person author, sitemap dates.
 * Does not publish dashboard/blog/thin scaled URLs.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TODAY = '2026-08-21';

const PERSON = {
  '@type': 'Person',
  name: 'Rizwan Ali',
  url: 'https://calstacker.com/about/'
};

const NAV_TOGGLE =
  '<button type="button" class="nav-toggle" aria-label="Open menu" aria-controls="site-nav-links" aria-expanded="false">\n' +
  '        <svg class="icon-menu" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>\n' +
  '        <svg class="icon-close" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>\n' +
  '      </button>';

const FOOTER = `  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="footer-logo">Cal<span>Stacker</span></div>
          <p>Free financial calculators for employees and investors. No signup, instant estimates.</p>
        </div>
        <div class="footer-col">
          <h4>Employee Tools</h4>
          <ul>
            <li><a href="/calculators/salary/">Salary Calculator</a></li>
            <li><a href="/calculators/income-tax/">Tax Calculator</a></li>
            <li><a href="/calculators/hra/">HRA Calculator</a></li>
            <li><a href="/calculators/emi/">EMI Calculator</a></li>
            <li><a href="/calculators/gratuity/">Gratuity Calculator</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Investor Tools</h4>
          <ul>
            <li><a href="/calculators/sip/">SIP Calculator</a></li>
            <li><a href="/calculators/lumpsum/">Lumpsum Calculator</a></li>
            <li><a href="/calculators/ppf/">PPF Calculator</a></li>
            <li><a href="/calculators/fd/">FD Calculator</a></li>
            <li><a href="/calculators/retirement/">Retirement Planner</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="/about/">About</a></li>
            <li><a href="/guides/">Guides</a></li>
            <li><a href="/contact/">Contact</a></li>
            <li><a href="/privacy/">Privacy Policy</a></li>
            <li><a href="/terms/">Terms of Service</a></li>
            <li><a href="/editorial-policy/">Editorial Policy</a></li>
            <li><a href="/disclaimer/">Disclaimer</a></li>
            <li><a href="/sitemap.xml">Sitemap</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 CalStacker.com — Free Financial Calculators</span>
        <span>Made for Indian employees &amp; investors</span>
      </div>
    </div>
  </footer>`;

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

function shouldSkip(rel) {
  return SKIP_PREFIX.some(function (p) {
    return rel === p.slice(0, -1) || rel.startsWith(p);
  });
}

function walk(dir, out) {
  out = out || [];
  fs.readdirSync(dir, { withFileTypes: true }).forEach(function (ent) {
    if (ent.name === 'node_modules' || ent.name === '.git' || ent.name === '.wrangler') return;
    const abs = path.join(dir, ent.name);
    const rel = path.relative(ROOT, abs).replace(/\\/g, '/');
    if (ent.isDirectory()) {
      if (shouldSkip(rel + '/')) return;
      walk(abs, out);
    } else if (ent.name.endsWith('.html') && !shouldSkip(rel)) {
      out.push(abs);
    }
  });
  return out;
}

function stripGtag(html) {
  html = html.replace(
    /\s*<!-- Google tag \(gtag\.js\) -->\s*<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-RR873MXQNX"><\/script>\s*<script>[\s\S]*?gtag\('config', 'G-RR873MXQNX'\);[\s\S]*?<\/script>/g,
    ''
  );
  html = html.replace(
    /\s*<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-RR873MXQNX"><\/script>\s*<script>[\s\S]*?gtag\('config', 'G-RR873MXQNX'\);[\s\S]*?<\/script>/g,
    ''
  );
  html = html.replace(
    /\s*<script>window\.dataLayer=window\.dataLayer\|\|\[\];function gtag\(\)\{dataLayer\.push\(arguments\);\}gtag\('js',new Date\(\)\);gtag\('config','G-RR873MXQNX'\);<\/script>/g,
    ''
  );
  return html;
}

function ensureConsentStub(html) {
  if (html.includes('/assets/js/consent-defaults.js')) return html;
  if (html.includes('pagead2.googlesyndication.com')) {
    return html.replace(
      /<script async src="https:\/\/pagead2\.googlesyndication\.com/,
      '<script src="/assets/js/consent-defaults.js"></script>\n  <script async src="https://pagead2.googlesyndication.com'
    );
  }
  return html.replace(
    /<link rel="stylesheet" href="\/assets\/css\/style\.css">/,
    '<link rel="stylesheet" href="/assets/css/style.css">\n  <script src="/assets/js/consent-defaults.js"></script>'
  );
}

function ensureCookieScript(html) {
  if (html.includes('/assets/js/cookie-consent.js')) return html;
  if (!html.includes('</body>')) return html;
  return html.replace('</body>', '  <script src="/assets/js/cookie-consent.js"></script>\n</body>');
}

function patchNav(html) {
  html = html.replace(
    /<a href="\/" class="nav-logo">CalStacker<\/a>/g,
    '<a href="/" class="nav-logo">Cal<span>Stacker</span></a>'
  );
  html = html.replace(
    /<button[^>]*class="nav-toggle"[^>]*>[\s\S]*?<\/button>/g,
    NAV_TOGGLE
  );
  return html;
}

function patchJsonLd(html) {
  return html.replace(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    function (full, raw) {
      var data;
      try {
        data = JSON.parse(raw);
      } catch (e) {
        return full;
      }
      function walkNode(node) {
        if (!node || typeof node !== 'object') return;
        if (Array.isArray(node)) {
          node.forEach(walkNode);
          return;
        }
        if (node['@type'] === 'Article') {
          node.author = PERSON;
        }
        if (node['@graph']) walkNode(node['@graph']);
      }
      walkNode(data);
      return '<script type="application/ld+json">\n  ' + JSON.stringify(data, null, 2).replace(/\n/g, '\n  ') + '\n  </script>';
    }
  );
}

function patchHtml(html) {
  html = stripGtag(html);
  html = ensureConsentStub(html);
  html = patchNav(html);
  html = html.replace(/<footer class="footer">[\s\S]*?<\/footer>/, FOOTER);
  html = patchJsonLd(html);
  html = html.replace(
    /<div class="calc-icon-wrap">🔗<\/div>/g,
    '<div class="calc-icon-wrap icon-link" aria-hidden="true"></div>'
  );
  html = ensureCookieScript(html);
  return html;
}

const files = walk(ROOT);
let n = 0;
files.forEach(function (file) {
  const before = fs.readFileSync(file, 'utf8');
  const after = patchHtml(before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    n++;
    console.log('patched', path.relative(ROOT, file));
  }
});

const sitemapPath = path.join(ROOT, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  let sm = fs.readFileSync(sitemapPath, 'utf8');
  sm = sm.replace(/<lastmod>2026-08-1[78]<\/lastmod>/g, '<lastmod>' + TODAY + '</lastmod>');
  fs.writeFileSync(sitemapPath, sm);
  console.log('patched sitemap.xml');
}

console.log('Done. Files changed:', n);
