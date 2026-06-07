/**
 * Add related calculators block to top 5 calculator pages.
 * Run: node scripts/patch-related-links.js
 */
const fs = require('fs');
const path = require('path');

const RELATED = {
  emi: [
    { href: '/calculators/sip/', name: 'SIP Calculator', desc: 'Plan investments alongside EMIs' },
    { href: '/calculators/income-tax/', name: 'Tax Calculator', desc: 'Home loan 80C/24(b) tax impact' },
    { href: '/guides/emi/50-lakh-20-years/', name: '₹50L EMI Guide', desc: 'Pre-filled 20-year scenario' }
  ],
  sip: [
    { href: '/calculators/step-up-sip/', name: 'Step-Up SIP', desc: 'Increase SIP annually' },
    { href: '/calculators/lumpsum/', name: 'Lumpsum Calculator', desc: 'One-time vs SIP compare' },
    { href: '/guides/sip/5000-per-month-10-years/', name: '₹5K SIP Guide', desc: '10-year corpus projection' }
  ],
  'income-tax': [
    { href: '/calculators/salary/', name: 'Salary Calculator', desc: 'CTC to in-hand with TDS' },
    { href: '/calculators/hra/', name: 'HRA Calculator', desc: 'HRA exemption for old regime' },
    { href: '/guides/tax/12-lakh-salary-old-vs-new/', name: '₹12L Tax Guide', desc: 'Old vs new regime' }
  ],
  salary: [
    { href: '/calculators/income-tax/', name: 'Tax Calculator', desc: 'Regime comparison' },
    { href: '/calculators/hra/', name: 'HRA Calculator', desc: 'Rent allowance exemption' },
    { href: '/guides/salary/35000-ctc-in-hand/', name: '₹35K CTC Guide', desc: 'In-hand breakdown' }
  ],
  hra: [
    { href: '/calculators/income-tax/', name: 'Tax Calculator', desc: 'Apply HRA in tax calc' },
    { href: '/calculators/salary/', name: 'Salary Calculator', desc: 'Full pay breakdown' },
    { href: '/guides/hra/bangalore-25000-basic/', name: 'Bangalore HRA Guide', desc: 'Metro 50% rule' }
  ]
};

const BLOCK_START = '<!-- related-calculators -->';
const BLOCK_END = '<!-- /related-calculators -->';

function makeBlock(links) {
  const cards = links.map(l =>
    `<a href="${l.href}" class="calc-card" style="margin-bottom:8px;"><div class="calc-icon-wrap">🔗</div><div class="calc-info"><div class="calc-name">${l.name}</div><div class="calc-desc">${l.desc}</div></div><span class="calc-arrow">→</span></a>`
  ).join('');
  return `${BLOCK_START}
      <div style="margin-top:28px;padding-top:24px;border-top:1px solid var(--border);">
        <h3 style="font-size:16px;font-weight:700;margin-bottom:14px;">Related Tools</h3>
        <div class="calc-grid">${cards}</div>
      </div>
      ${BLOCK_END}`;
}

const root = path.join(__dirname, '..');
Object.keys(RELATED).forEach(slug => {
  const p = path.join(root, 'calculators', slug, 'index.html');
  if (!fs.existsSync(p)) return;
  let html = fs.readFileSync(p, 'utf8');
  const block = makeBlock(RELATED[slug]);
  if (html.includes(BLOCK_START)) {
    html = html.replace(new RegExp(BLOCK_START + '[\\s\\S]*?' + BLOCK_END), block);
  } else {
    html = html.replace('</div>\n  </div>\n\n  <div class="ad-slot">Advertisement</div>', '</div>\n      ' + block + '\n    </div>\n  </div>\n\n  <div class="ad-slot">Advertisement</div>');
    if (!html.includes(BLOCK_START)) {
      html = html.replace('<div class="affiliate-cta">', block + '\n\n      <div class="affiliate-cta">');
    }
  }
  fs.writeFileSync(p, html);
  console.log('related', slug);
});
console.log('done');
