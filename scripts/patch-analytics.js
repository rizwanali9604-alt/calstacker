/**
 * CalStacker — inject GA4 snippet into every HTML page.
 * Single source of truth for analytics. Re-run after adding new pages:
 *   node scripts/patch-analytics.js
 */
const fs = require('fs');
const path = require('path');

const MEASUREMENT_ID = 'G-RR873MXQNX';
const SNIPPET = `  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', '${MEASUREMENT_ID}');
  </script>`;

const root = path.join(__dirname, '..');
let patched = 0;
let skipped = 0;

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) {
      if (name === 'node_modules' || name === '.git') continue;
      walk(p);
    } else if (name.endsWith('.html')) {
      let html = fs.readFileSync(p, 'utf8');
      if (html.includes(MEASUREMENT_ID) || html.includes('googletagmanager.com/gtag/js')) {
        skipped++;
        continue;
      }
      const anchor = '  <link rel="stylesheet" href="/assets/css/style.css">';
      if (!html.includes(anchor)) {
        console.warn('skip (no stylesheet anchor):', p);
        skipped++;
        continue;
      }
      html = html.replace(anchor, anchor + '\n' + SNIPPET);
      fs.writeFileSync(p, html);
      console.log('patched', path.relative(root, p));
      patched++;
    }
  }
}

walk(root);
console.log(`done — patched ${patched}, skipped ${skipped}`);
