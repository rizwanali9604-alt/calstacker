/**
 * Add data-partner to affiliate CTAs based on page path.
 * Run: node scripts/patch-affiliates.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

const PARTNER_BY_CALC = {
  'income-tax': 'cleartax',
  hra: 'cleartax',
  salary: 'zerodha',
  sip: 'groww',
  'step-up-sip': 'groww',
  lumpsum: 'zerodha',
  swp: 'zerodha',
  'net-worth': 'zerodha',
  gratuity: 'zerodha',
  epf: 'zerodha',
  retirement: 'angelone',
  emi: 'zerodha',
  fd: 'zerodha',
  ppf: 'zerodha',
  rd: 'zerodha',
  gst: 'cleartax',
  cagr: 'zerodha',
  'compound-interest': 'zerodha',
  'simple-interest': 'zerodha',
  inflation: 'zerodha'
};

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) {
      if (name === 'node_modules' || name === '.git') continue;
      walk(p);
    } else if (name === 'index.html' && p.includes('calculators')) {
      const slug = p.split(path.sep).slice(-2, -1)[0];
      const partner = PARTNER_BY_CALC[slug] || 'zerodha';
      let html = fs.readFileSync(p, 'utf8');
      html = html.replace(/class="aff-btn([^"]*)"/g, `class="aff-btn$1" data-partner="${partner}"`);
      if (!html.includes('monetization-config.js')) {
        const anchor = '  <script src="/assets/js/calc-core.js"></script>';
        html = html.replace(anchor, anchor + '\n  <script src="/assets/js/monetization-config.js"></script>');
      }
      fs.writeFileSync(p, html);
      console.log('patched', slug, '->', partner);
    }
  }
}

walk(path.join(root, 'calculators'));
console.log('done');
