/**
 * Re-add affiliate CTAs with #affiliate-link-needed placeholders (Fix 2.1).
 * Run: node scripts/fix-affiliate-cta.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

const GROWW_CALCS = new Set([
  'sip', 'step-up-sip', 'lumpsum', 'retirement', 'cagr',
  'compound-interest', 'swp'
]);

function emiAffiliateBlock() {
  return `<!-- AFFILIATE: replace with real Zerodha/Angel One link once available -->
<div class="affiliate-cta">
  <div class="aff-icon">🏦</div>
  <div class="aff-text">
    <strong>Compare home loan rates from top banks</strong>
    <span>Check current offers before you sign — rates vary by lender and profile</span>
  </div>
  <a href="#affiliate-link-needed" target="_blank" rel="noopener sponsored" class="aff-btn">Check Rates →</a>
</div>

<!-- AFFILIATE: replace with real Zerodha/Angel One link once available -->
<div class="affiliate-cta" style="margin-top:10px;">
  <div class="aff-icon">📈</div>
  <div class="aff-text">
    <strong>Ready to invest your savings?</strong>
    <span>Open free Zerodha account — India's #1 stock broker</span>
  </div>
  <a href="#affiliate-link-needed" target="_blank" rel="noopener sponsored" class="aff-btn aff-zerodha">Open Account Free →</a>
</div>

<!-- AFFILIATE: replace with real Zerodha/Angel One link once available -->
<div class="affiliate-cta" style="margin-top:10px;">
  <div class="aff-icon">💹</div>
  <div class="aff-text">
    <strong>Also try Angel One</strong>
    <span>Free demat account + smart research tools for investors</span>
  </div>
  <a href="#affiliate-link-needed" target="_blank" rel="noopener sponsored" class="aff-btn">Open Account →</a>
</div>`;
}

function standardAffiliateBlock(groww) {
  let html = `<!-- AFFILIATE: replace with real Zerodha/Angel One link once available -->
<div class="affiliate-cta">
  <div class="aff-icon">📈</div>
  <div class="aff-text">
    <strong>Ready to invest your savings?</strong>
    <span>Open free Zerodha account — India's #1 stock broker</span>
  </div>
  <a href="#affiliate-link-needed" target="_blank" rel="noopener sponsored" class="aff-btn aff-zerodha">Open Account Free →</a>
</div>

<!-- AFFILIATE: replace with real Zerodha/Angel One link once available -->
<div class="affiliate-cta" style="margin-top:10px;">
  <div class="aff-icon">💹</div>
  <div class="aff-text">
    <strong>Also try Angel One</strong>
    <span>Free demat account + smart research tools for investors</span>
  </div>
  <a href="#affiliate-link-needed" target="_blank" rel="noopener sponsored" class="aff-btn">Open Account →</a>
</div>`;
  if (groww) {
    html += `

<!-- AFFILIATE: replace with real Zerodha/Angel One link once available -->
<div class="affiliate-cta" style="margin-top:10px;">
  <div class="aff-icon">🌱</div>
  <div class="aff-text">
    <strong>Start your first SIP today</strong>
    <span>Groww — invest in mutual funds with ₹500/month</span>
  </div>
  <a href="#affiliate-link-needed" target="_blank" rel="noopener sponsored" class="aff-btn aff-groww">Invest on Groww →</a>
</div>`;
  }
  return html;
}

function injectAffiliate(html, slug) {
  if (html.includes('affiliate-cta')) {
    // Fix any remaining href="#" in affiliate blocks
    const before = html;
    html = html.replace(/(<a[^>]*class="aff-btn[^"]*"[^>]*)href="#"/g, '$1href="#affiliate-link-needed"');
    html = html.replace(/href="#"(?=[^>]*class="aff-btn)/g, 'href="#affiliate-link-needed"');
    return { html, changed: html !== before, action: 'fixed-href' };
  }

  const block = slug === 'emi'
    ? emiAffiliateBlock()
    : standardAffiliateBlock(GROWW_CALCS.has(slug));

  const wrapped = `\n      ${block}\n`;

  if (html.includes('<!-- /related-calculators -->')) {
    html = html.replace('<!-- /related-calculators -->', `<!-- /related-calculators -->${wrapped}`);
    return { html, changed: true, action: 'inserted' };
  }
  if (html.includes('</main>')) {
    html = html.replace('</main>', `${wrapped}\n  </main>`);
    return { html, changed: true, action: 'inserted' };
  }
  return { html, changed: false, action: 'skipped' };
}

let fixed = 0;
const calcsDir = path.join(root, 'calculators');
for (const slug of fs.readdirSync(calcsDir)) {
  const file = path.join(calcsDir, slug, 'index.html');
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, 'utf8');
  const { html: next, changed, action } = injectAffiliate(html, slug);
  if (changed) {
    fs.writeFileSync(file, next);
    console.log(action + ':', slug);
    fixed++;
  } else {
    console.log('unchanged:', slug);
  }
}

// monetization-config.js placeholders
const monetPath = path.join(root, 'assets/js/monetization-config.js');
let monet = fs.readFileSync(monetPath, 'utf8');
const monetBefore = monet;
monet = monet.replace(/url: '#'/g, "url: '#affiliate-link-needed'");
if (monet !== monetBefore) {
  fs.writeFileSync(monetPath, monet);
  console.log('fixed: monetization-config.js');
  fixed++;
}

console.log('done —', fixed, 'files updated');
