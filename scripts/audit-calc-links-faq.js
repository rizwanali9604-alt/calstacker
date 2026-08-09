/**
 * Verify calculator guide links and FAQ counts (Fix 2.2 / 2.3 audit).
 * Run: node scripts/audit-calc-links-faq.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const calcsDir = path.join(root, 'calculators');

const brokenGuides = [];
const faqReport = [];

for (const slug of fs.readdirSync(calcsDir)) {
  const file = path.join(calcsDir, slug, 'index.html');
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, 'utf8');

  const guideLinks = [...html.matchAll(/href="(\/guides\/[^"]+-guide\/)"[^>]*>Open Guide →/g)];
  for (const m of guideLinks) {
    const rel = m[1].replace(/^\//, '').replace(/\/$/, '');
    const target = path.join(root, rel.replace(/\//g, path.sep), 'index.html');
    if (!fs.existsSync(target)) {
      brokenGuides.push({ calc: slug, link: m[1] });
    }
  }

  const faqCount = (html.match(/class="faq-item"/g) || []).length;
  faqReport.push({ slug, faqCount });
}

console.log('=== Broken guide links ===');
if (brokenGuides.length === 0) {
  console.log('None — all Open Guide links resolve.');
} else {
  brokenGuides.forEach(b => console.log(`${b.calc} -> ${b.link}`));
}

console.log('\n=== FAQ counts ===');
faqReport.sort((a, b) => a.faqCount - b.faqCount);
faqReport.forEach(r => console.log(`${r.slug}: ${r.faqCount}`));

const thin = faqReport.filter(r => r.faqCount < 4);
console.log('\nPages with fewer than 4 FAQs:', thin.length ? thin.map(t => t.slug).join(', ') : 'none');
