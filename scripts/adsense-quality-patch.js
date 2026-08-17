/**
 * Sitewide HTML quality patch: skip link, Open Graph, nav ids,
 * footer editorial policy, Person author in guide schema.
 * Run: node scripts/adsense-quality-patch.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SKIP_DIR = new Set([
  'dashboard', 'data', 'blog', 'scripts', 'node_modules', '.git', '.wrangler'
]);
const SKIP_THIN = [
  path.join('guides', 'emi', '10-lakh-car-loan'),
  path.join('guides', 'emi', '25-lakh-10-years'),
  path.join('guides', 'emi', '30-lakh-15-years'),
  path.join('guides', 'emi', '50-lakh-20-years'),
  path.join('guides', 'sip', '5000-per-month-10-years'),
  path.join('guides', 'sip', '3000-per-month-20-years'),
  path.join('guides', 'sip', '10000-per-month-15-years'),
  path.join('guides', 'salary', '35000-ctc-in-hand'),
  path.join('guides', 'salary', '600000-ctc-breakdown'),
  path.join('guides', 'tax', '12-lakh-salary-old-vs-new'),
  path.join('guides', 'tax', 'zero-tax-12-lakh'),
  path.join('guides', 'hra', 'bangalore-25000-basic')
];

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (SKIP_DIR.has(name)) continue;
    const full = path.join(dir, name);
    const rel = path.relative(ROOT, full);
    if (SKIP_THIN.some((p) => rel === p || rel.startsWith(p + path.sep))) continue;
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (name === 'index.html' || name === '404.html') out.push(full);
  }
}

function escapeAttr(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function patch(html, file) {
  const titleM = html.match(/<title>([^<]+)<\/title>/i);
  const descM = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  const canM = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"\s*\/?>/i);
  const title = titleM ? titleM[1].trim() : 'CalStacker';
  const desc = descM ? descM[1].trim() : 'Free financial calculators for India.';
  const url = canM ? canM[1] : 'https://calstacker.com/';
  const img = 'https://calstacker.com/assets/img/og-share.png';

  if (!html.includes('og:title')) {
    const og = [
      '  <meta property="og:type" content="website">',
      '  <meta property="og:site_name" content="CalStacker">',
      '  <meta property="og:title" content="' + escapeAttr(title) + '">',
      '  <meta property="og:description" content="' + escapeAttr(desc) + '">',
      '  <meta property="og:url" content="' + escapeAttr(url) + '">',
      '  <meta property="og:image" content="' + img + '">',
      '  <meta property="og:image:alt" content="CalStacker — free finance calculators for India">',
      '  <meta name="twitter:card" content="summary_large_image">',
      '  <meta name="twitter:title" content="' + escapeAttr(title) + '">',
      '  <meta name="twitter:description" content="' + escapeAttr(desc) + '">',
      '  <meta name="twitter:image" content="' + img + '">'
    ].join('\n');
    if (canM) {
      html = html.replace(canM[0], canM[0] + '\n' + og);
    } else if (html.includes('</title>')) {
      html = html.replace('</title>', '</title>\n' + og);
    }
  }

  if (!html.includes('class="skip-link"')) {
    html = html.replace(/<body[^>]*>/, function (m) {
      return m + '\n  <a class="skip-link" href="#main-content">Skip to content</a>';
    });
  }

  if (!html.includes('id="site-nav-links"')) {
    html = html.replace(
      /<div class="nav-links">/,
      '<div class="nav-links" id="site-nav-links">'
    );
  }

  if (!html.includes('aria-controls="site-nav-links"')) {
    html = html.replace(
      /<button class="nav-toggle" aria-label="Toggle menu">/,
      '<button class="nav-toggle" aria-label="Toggle menu" aria-controls="site-nav-links" aria-expanded="false">'
    );
  }

  if (!html.includes('id="main-content"')) {
    const targets = [
      '<header class="calc-page-header">',
      '<header class="guide-header">',
      '<section class="hero">',
      '<main class="content-page">',
      '<main class="calc-interface">',
      '<div class="calc-interface">',
      '<div class="container guide-layout">'
    ];
    for (const t of targets) {
      if (html.includes(t)) {
        html = html.replace(t, t.replace(/<(header|section|main|div)/, '<$1 id="main-content"'));
        break;
      }
    }
  }

  if (!html.includes('/editorial-policy/')) {
    html = html.replace(
      /<li><a href="\/disclaimer\/">Disclaimer<\/a><\/li>/g,
      '<li><a href="/editorial-policy/">Editorial Policy</a></li>\n            <li><a href="/disclaimer/">Disclaimer</a></li>'
    );
  }

  html = html.replace(
    /"author": \{ "@type": "Organization", "name": "CalStacker" \}/g,
    '"author": { "@type": "Person", "name": "Rizwan Ali", "url": "https://calstacker.com/about/" }'
  );

  html = html.replace(/"dateModified": "2026-06-08"/g, '"dateModified": "2026-08-17"');

  html = html.replace(
    /No signup, instant results\./g,
    'No signup, instant estimates.'
  );

  return html;
}

const files = [];
walk(ROOT, files);
let n = 0;
for (const file of files) {
  const before = fs.readFileSync(file, 'utf8');
  const after = patch(before, file);
  if (after !== before) {
    fs.writeFileSync(file, after);
    n++;
    console.log('patched', path.relative(ROOT, file));
  }
}
console.log('Done. Updated', n, 'of', files.length, 'html files');
