/**
 * Inject analytics-events.js + ads-config.js before closing body on all HTML pages.
 * Run: node scripts/patch-analytics-events.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const SNIPPET = `  <script src="/assets/js/analytics-events.js"></script>
  <script src="/assets/js/ads-config.js"></script>`;

const CALC_TRACK = `
    if (typeof trackCalculate === 'function') trackCalculate(document.querySelector('.calc-page-title')?.textContent);`;

let patched = 0;

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) {
      if (name === 'node_modules' || name === '.git') continue;
      walk(p);
    } else if (name.endsWith('.html') && !p.includes('blog\\_template')) {
      let html = fs.readFileSync(p, 'utf8');
      if (html.includes('analytics-events.js')) continue;

      const navAnchor = '  <script src="/assets/js/nav.js"></script>';
      if (html.includes(navAnchor)) {
        html = html.replace(navAnchor, navAnchor + '\n' + SNIPPET);
      } else if (html.includes('</body>')) {
        html = html.replace('</body>', SNIPPET + '\n</body>');
      }

      if (p.includes('calculators') && html.includes('showResult();') && !html.includes('trackCalculate')) {
        html = html.replace(/showResult\(\);/g, 'showResult();' + CALC_TRACK);
      }

      fs.writeFileSync(p, html);
      console.log('patched', path.relative(root, p));
      patched++;
    }
  }
}

walk(root);
console.log('done —', patched, 'files');
