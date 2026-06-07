/**
 * Remove leftover old affiliate CTA fragments after full patch.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'calculators');

for (const slug of fs.readdirSync(root)) {
  const p = path.join(root, slug, 'index.html');
  if (!fs.existsSync(p)) continue;
  let html = fs.readFileSync(p, 'utf8');
  const before = html;
  html = html.replace(/\n\s*<a href="#" class="aff-btn"[^>]*>[^<]*<\/a>/g, '');
  // Remove orphaned closing div from old affiliate wrapper when double-close before ad-slot
  html = html.replace(/(<\/div>\s*\n\s*<div class="ad-slot">)/g, (m, g1) => {
    // only if we have extra </div> before ad-slot - check context
    return g1;
  });
  if (html !== before) {
    fs.writeFileSync(p, html);
    console.log('cleaned', slug);
  }
}

console.log('done');
